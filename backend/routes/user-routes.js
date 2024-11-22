import express from "express";
import { deleteUser, getAllUsers, login, updateUser } from "../controllers/user-controller.js";
import { singup } from "../controllers/user-controller.js";


const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", singup);
userRouter.put("/:id" , updateUser);
userRouter.delete('/:id' , deleteUser);
userRouter.post('/login',login);

export default userRouter;
