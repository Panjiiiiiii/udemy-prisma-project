import { Request, Response } from "express";
import { CreateCartSchema, changeQuantitySchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Product, User } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const existingItem = await prismaClient.cartItem.findFirst({
    where : {
      userId : req.user.id,
      productId: product.id
    }
  })

  if(existingItem) {
    const updateCart = await prismaClient.cartItem.update({
      where : {
        id: existingItem.id
      },
      data : {
        quantity: existingItem.quantity + validatedData.quantity
      },
      include : {
        product : true
      }
    })
    res.json(updateCart)
  } else {    
    const cart = await prismaClient.cartItem.create({
      data: {
        userId: req.user.id,
        productId: product.id,
        quantity: validatedData.quantity,
      },
      include : {
        product : true
      }
    });
    res.json(cart);
  }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
    const existingcart = await prismaClient.cartItem.findFirst({
      where : {
        userId: req.user.id, 
        id: +req.params.id
      }
    })
    if(existingcart){
      const cartItem = await prismaClient.cartItem.delete({
        where: {
          id: existingcart.id,
        },
      });
      res.json({ sucess: true });
    } else {
      throw new NotFoundException('Cart product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = changeQuantitySchema.parse(req.body);
  const existingcart = await prismaClient.cartItem.findFirst({
    where : {
      userId: req.user.id, 
      id: +req.params.id
    }
  })
  if(existingcart){
    const updateCart = await prismaClient.cartItem.update({
      where: {
        id: existingcart.id,
      },
      data: {
        quantity: validatedData.quantity,
      },
    });
    res.json(updateCart);
  } else {
    throw new NotFoundException('Cart product not found', ErrorCode.PRODUCT_NOT_FOUND)
  }

};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
