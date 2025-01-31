import express from "express";
import {
    addCar,
    getCars,
    removeCar,
    getCarById,
} from "../controllers/carController.js";
import multer from "multer";

const carRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

carRouter.post("/", upload.array("images", 30), addCar);
carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.delete("/:id", removeCar);

export default carRouter;
