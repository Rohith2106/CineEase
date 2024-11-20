import express from "express";
import { getAllUsers } from "../controllers/user-controller.js";
import { singup } from "../controllers/user-controller.js";


const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", singup);
export default userRouter;
