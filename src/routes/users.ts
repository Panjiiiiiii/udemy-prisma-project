import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, changeUserRole, deleteAddress, getUsersById, listAddress, listUsers, updateUser } from "../controllers/users";
import adminMiddleware from "../middlewares/admin";

const userRouter:Router = Router()

userRouter.post('/address', [authMiddleware], errorHandler(addAddress))
userRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress))
userRouter.get('/address', [authMiddleware], errorHandler(listAddress))
userRouter.put('/', [authMiddleware], errorHandler(updateUser))
userRouter.put('/:id/role', [authMiddleware,adminMiddleware], errorHandler(changeUserRole))
userRouter.get('/', [authMiddleware,adminMiddleware], errorHandler(listUsers))
userRouter.get('/:id', [authMiddleware,adminMiddleware], errorHandler(getUsersById))

export default userRouter