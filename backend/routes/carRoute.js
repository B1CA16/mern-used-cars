import express from "express";
import {
    addCar,
    getCars,
    removeCar,
    getCarById,
    getMostPopular,
    getMostRecent,
    countView,
    acceptCar,
    rejectCar,
    getAllPendingCars,
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

carRouter.get("/most-popular", getMostPopular);
carRouter.get("/most-recent", getMostRecent);
carRouter.post("/", upload.array("images", 30), addCar);
carRouter.get("/", getCars);
carRouter.get("/pending", getAllPendingCars);
carRouter.get("/:id", getCarById);
carRouter.patch("/:id/countViews", countView);
carRouter.patch("/accept/:id", acceptCar);
carRouter.delete("/reject/:id", rejectCar);
carRouter.delete("/:id", removeCar);

export default carRouter;
