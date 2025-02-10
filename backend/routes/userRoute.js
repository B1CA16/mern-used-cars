import express from "express";
import {
    loginUser,
    registerUser,
    getUser,
    editUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", editUser);

export default userRouter;
