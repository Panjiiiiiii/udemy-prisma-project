import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import userRouter from "./users";
import cartRoutes from "./cart";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productsRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/carts', cartRoutes)


export default rootRouter;