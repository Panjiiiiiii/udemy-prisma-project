import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";

const userRouter:Router = Router()

userRouter.post('/address', [authMiddleware], errorHandler(addAddress))
userRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress))
userRouter.get('/address', [authMiddleware], errorHandler(listAddress))
userRouter.put('/', [authMiddleware], errorHandler(updateUser))

export default userRouter