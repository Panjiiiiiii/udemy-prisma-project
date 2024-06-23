import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";

const productsRouter:Router = Router()

productsRouter.post('/',[authMiddleware, adminMiddleware],errorHandler(createProduct))
productsRouter.put('/:id',[authMiddleware, adminMiddleware],errorHandler(updateProduct))
productsRouter.delete('/:id',[authMiddleware, adminMiddleware],errorHandler(deleteProduct))
productsRouter.get('/',[authMiddleware, adminMiddleware],errorHandler(listProducts))
productsRouter.get('/:id',[authMiddleware, adminMiddleware],errorHandler(getProductById))


export default productsRouter