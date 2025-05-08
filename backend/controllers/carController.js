import carModel from "../models/carModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import { io } from "../server.js";
import axios from "axios";
import cloudinary from "cloudinary";
import fs from "fs";

// Add a new car
const addCar = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.json({ success: false, message: "No image file uploaded" });
    }

    try {
        const image_urls = [];
        let thumbnail_url = "";

        const uploadPromises = req.files.map(async (file, index) => {
            try {
                console.log("Processing file:", file.path);

                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                    folder: "cars",
                    fetch_format: "auto",
                    transformation: [
                        { width: 1280, height: 720, crop: "fill" },
                    ],
                });

                image_urls.push(result.secure_url);

                if (index === 0) {
                    const thumbnailResult = await cloudinary.uploader.upload(
                        file.path,
                        {
                            resource_type: "auto",
                            folder: "cars/thumbnails",
                            transformation: [
                                {
                                    width: 400,
                                    height: 225,
                                    crop: "fill",
                                },
                            ],
                        }
                    );

                    thumbnail_url = thumbnailResult.secure_url;
                    console.log("Thumbnail URL set:", thumbnail_url);
                }

                fs.unlinkSync(file.path);
                console.log("Temporary file removed:", file.path);
            } catch (err) {
                console.error("Error uploading image to Cloudinary:", err);
            }
        });

        await Promise.all(uploadPromises);

        if (image_urls.length === 0) {
            return res.json({
                success: false,
                message: "Failed to upload any images",
            });
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
            images: image_urls,
            thumbnail: thumbnail_url || "",
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
        console.error("Main error in addCar:", err);
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
            for (const imageUrl of car.images) {
                try {
                    const publicId = extractPublicIdFromUrl(imageUrl);
                    if (publicId) {
                        await cloudinary.uploader
                            .destroy(publicId)
                            .then((result) => console.log(result));
                    }
                } catch (error) {
                    console.error(
                        `Error removing image from Cloudinary: ${error}`
                    );
                }
            }
        }

        if (car.thumbnail) {
            try {
                const thumbnailPublicId = extractPublicIdFromUrl(car.thumbnail);
                if (thumbnailPublicId) {
                    await cloudinary.uploader
                        .destroy(thumbnailPublicId)
                        .then((result) => console.log(result));
                }
            } catch (error) {
                console.error(
                    `Error removing thumbnail from Cloudinary: ${error}`
                );
            }
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

        const message = `Your car listing "${car.name}" has been accepted!`;

        io.to(car.owner.toString()).emit("notification", { message });
        console.log(`Notification sent via WebSocket to user ${car.owner}`);

        try {
            await axios.post(
                "https://secondrive-backend.onrender.com/api/notifications",
                {
                    userId: car.owner,
                    message,
                }
            );
            console.log(`Notification sent via API to user ${car.owner}`);
        } catch (error) {
            console.error("Error sending notification via API:", error);
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

// Reject a car
const rejectCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid car ID format",
            });
        }

        const car = await carModel.findById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        if (car.images && car.images.length > 0) {
            for (const imageUrl of car.images) {
                try {
                    const publicId = extractPublicIdFromUrl(imageUrl);
                    if (publicId) {
                        await cloudinary.uploader
                            .destroy(publicId)
                            .then((result) => console.log(result));
                    }
                } catch (error) {
                    console.error(
                        `Error removing image from Cloudinary: ${error}`
                    );
                }
            }
        }

        if (car.thumbnail) {
            try {
                const thumbnailPublicId = extractPublicIdFromUrl(car.thumbnail);
                if (thumbnailPublicId) {
                    await cloudinary.uploader
                        .destroy(thumbnailPublicId)
                        .then((result) => console.log(result));
                }
            } catch (error) {
                console.error(
                    `Error removing thumbnail from Cloudinary: ${error}`
                );
            }
        }

        await carModel.findByIdAndDelete(id);

        const message = `Your car listing "${car.name}" has been rejected and removed.`;

        io.to(car.owner.toString()).emit("notification", { message });
        console.log(`Notification sent via WebSocket to user ${car.owner}`);

        try {
            await axios.post(
                "https://secondrive-backend.onrender.com/api/notifications",
                {
                    userId: car.owner,
                    message,
                }
            );
            console.log(`Notification sent via API to user ${car.owner}`);
        } catch (error) {
            console.error("Error sending notification via API:", error);
        }

        res.json({
            success: true,
            message: "Car rejected and removed successfully",
        });
    } catch (err) {
        console.error("Error rejecting car:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};

// Get all pending cars
const getAllPendingCars = async (req, res) => {
    try {
        const pendingCars = await carModel
            .find({ accepted: false })
            .populate("owner", "name email type phone");

        res.json({
            success: true,
            data: pendingCars,
        });
    } catch (err) {
        console.error("Error getting pending cars:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Function to extract public ID from URL
const extractPublicIdFromUrl = (url) => {
    try {
        const uploadIndex = url.indexOf("/upload/");
        if (uploadIndex === -1) return null;

        let path = url.substring(uploadIndex + 8);

        const queryIndex = path.indexOf("?");
        if (queryIndex !== -1) {
            path = path.substring(0, queryIndex);
        }

        path = path.replace(/^v\d+\//, "");

        path = path.replace(/\.[^/.]+$/, "");

        console.log(`URL: ${url} -> Public ID: ${path}`);
        return path;
    } catch (error) {
        console.error("Error extracting public ID:", error);
        return null;
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
    getAllPendingCars,
    rejectCar,
};
