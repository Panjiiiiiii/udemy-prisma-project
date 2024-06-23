import { Request, Response } from "express";
import { CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Product } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req:Request, res:Response) => {
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where : {
                id:validatedData.productId
            }
        })
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
    const cart = await prismaClient.cartItem.create({
        data : {
            userId : req.user.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    })
    res.json(cart)
}

export const deleteItemFromCart = async (req:Request, res:Response) => {
    const cartItem = await prismaClient.cartItem.delete({
        where : {
            id: +req.params.id
        }
    })
    res.json({sucess:true, data:cartItem})
}

export const changeQuantity = async (req:Request, res:Response) => {

}

export const getCart = async (req:Request, res:Response) => {

}