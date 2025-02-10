import express from "express";
import {
    loginUser,
    registerUser,
    getUser,
    editUser,
    addToFavourite,
    removeFromFavourite,
    getUserFavorites,
    getUserCars,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", editUser);
userRouter.patch("/:id/favorites", addToFavourite);
userRouter.patch("/:id/remove-favorite", removeFromFavourite);
userRouter.get("/:id/favorites", getUserFavorites);
userRouter.get("/:id/my-ads", getUserCars);

export default userRouter;
