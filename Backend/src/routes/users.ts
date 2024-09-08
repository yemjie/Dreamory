import Router from "express";
import { createUser, getUserInfo, updateUser } from "../handler/users";

const userRouter = Router();

userRouter.post("/", getUserInfo);
userRouter.post("/create", createUser);
userRouter.post("/update/:id", updateUser);

export default userRouter;
