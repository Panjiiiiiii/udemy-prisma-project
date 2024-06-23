import { Router } from "express";
import authRoutes from "./auth";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)


export default rootRouter;


/*  1. user management
        a. list users
        c. get user by id
        b. change user role
    2. order management
        a. list all orders (filter on status)
        b. change order status
        c. list all orders of given user
    3. products
        a. search api for products (for both users and admins) -> full text search   
*/