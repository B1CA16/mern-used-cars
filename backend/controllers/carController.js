import { create } from "domain";
import carModel from "../models/carModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add a new car
const addCar = async (req, res) => {
    const image_filenames = [];

    if (req.files) {
        for (const file of req.files) {
            const inputPath = file.path;
            const outputPath = path.join(
                __dirname,
                "../uploads",
                `temp_${file.filename}`
            );

            try {
                const metadata = await sharp(inputPath).metadata();

                const newWidth = 1280;
                const newHeight = Math.round((newWidth * 9) / 16);

                await sharp(inputPath)
                    .resize(newWidth, newHeight)
                    .toFile(outputPath);

                fs.renameSync(outputPath, inputPath);

                image_filenames.push(file.filename);
            } catch (err) {
                console.error("Error redimensioning image:", err);
                return res.json({
                    success: false,
                    message: "Error processing image",
                });
            }
        }
    }

    const car = new carModel({
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        version: req.body.version,
        segment: req.body.segment,
        year: req.body.year,
        month_of_registration: req.body.month_of_registration,
        km: req.body.km,
        fuel: req.body.fuel,
        hp: req.body.hp,
        cm3: req.body.cm3,
        location: req.body.location,
        images: image_filenames,
        price: req.body.price,
        transmission: req.body.transmission,
        owner: req.body.owner,
        description: req.body.description,
        financing_available: req.body.financing_available,
        fixed_value: req.body.fixed_value,
        warranty: req.body.warranty,
        previous_owners: req.body.previous_owners,
        service_book: req.body.service_book,
        non_smoker: req.body.non_smoker,
        second_key: req.body.second_key,
        vehicle_class: req.body.vehicle_class,
        extras: {
            audio_and_multimedia: req.body.audio_and_multimedia || [],
            comfort_and_other_equipment:
                req.body.comfort_and_other_equipment || [],
            electronic_and_driving_assistance:
                req.body.electronic_and_driving_assistance || [],
            safety: req.body.safety || [],
        },
        created_at: new Date(),
    });

    try {
        const savedCar = await car.save();

        const user = await userModel.findById(req.body.owner);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        user.cars.push(savedCar._id);
        await user.save();

        res.json({
            success: true,
            message: "Car added successfully",
            car: savedCar,
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// Get the most popular ads
const getMostPopular = async (req, res) => {
    try {
        const cars = await carModel
            .find({ accepted: true })
            .sort({ views: -1 })
            .limit(10);

        res.json({
            success: true,
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get the most recent ads
const getMostRecent = async (req, res) => {
    try {
        const cars = await carModel
            .find({ accepted: true })
            .sort({ created_at: -1 })
            .limit(10);

        res.json({
            success: true,
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all cars
const getCars = async (req, res) => {
    try {
        const cars = await carModel
            .find({ accepted: true })
            .populate("owner", "name email type phone");

        res.json({
            success: true,
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get car by ID
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const car = await carModel
            .findById(id)
            .populate("owner", "name phone verified");

        if (!car) {
            return res
                .status(404)
                .json({ success: false, message: "Car not found" });
        }

        if (!car.owner) {
            return res.status(404).json({
                success: false,
                message: "Owner not found",
            });
        }

        res.json({ success: true, data: car });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove car
const removeCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await carModel.findById(id);

        if (!car) {
            return res
                .status(404)
                .json({ success: false, message: "Car not found" });
        }

        if (car.images && car.images.length > 0) {
            car.images.forEach((image) => {
                fs.unlink(`uploads/${image}`, (err) => {
                    if (err) {
                        console.error(`Error removing image ${image}:`, err);
                    }
                });
            });
        }

        const user = await userModel.findOne({ cars: id });
        if (user) {
            user.cars = user.cars.filter((carId) => carId.toString() !== id);
            await user.save();
        }

        await carModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Car removed successfully" });
    } catch (err) {
        console.error("Error removing car:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};

const countView = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedAd = await carModel.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedAd) {
            return res.status(404).json({ message: "Anúncio não encontrado" });
        }

        res.status(200).json(updatedAd);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar visualizações",
            error,
        });
    }
};

// Accept a car
const acceptCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid car ID format",
            });
        }

        const car = await carModel.findByIdAndUpdate(
            id,
            { accepted: true },
            { new: true }
        );

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.json({
            success: true,
            message: "Car accepted successfully",
            car,
        });
    } catch (err) {
        console.error("Error accepting car:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};

export {
    addCar,
    getCars,
    getCarById,
    removeCar,
    getMostPopular,
    getMostRecent,
    countView,
    acceptCar,
};
