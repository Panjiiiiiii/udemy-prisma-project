import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth"
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders, listUserOrders } from "../controllers/order";
import adminMiddleware from "../middlewares/admin";

const orderRouter : Router = Router()

orderRouter.post('/', [authMiddleware], errorHandler(createOrder))
orderRouter.get('/', [authMiddleware], errorHandler(listOrders))
orderRouter.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder))
orderRouter.get('/index', [authMiddleware, adminMiddleware], errorHandler(listAllOrders))
orderRouter.get('/users/:id', [authMiddleware, adminMiddleware], errorHandler(listUserOrders))
orderRouter.put('/:id/status', [authMiddleware, adminMiddleware], errorHandler(changeStatus))
orderRouter.get('/:id', [authMiddleware], errorHandler(getOrderById))

export default orderRouter