import express from "express";
import {
    addCar,
    getCars,
    removeCar,
    getCarById,
} from "../controllers/carController.js";
import multer from "multer";

const carRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        // Generate a unique filename by appending a timestamp to the original filename
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Routes for managing cars
carRouter.post("/", upload.single("image"), addCar); // Route to add a new car
carRouter.get("/", getCars); // Route to list all cars
carRouter.get("/:id", getCarById); // Route to get details of a specific car by ID
carRouter.delete("/:id", removeCar); // Route to remove a car by ID

export default carRouter;
