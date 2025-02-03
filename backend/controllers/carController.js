import { create } from "domain";
import carModel from "../models/carModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import mongoose from "mongoose";

// Add a new car
const addCar = async (req, res) => {
    const image_filenames = req.files
        ? req.files.map((file) => file.filename)
        : [];

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
        await car.save();
        res.json({ success: true, message: "Car added successfully" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// List all cars
/*
const getCars = async (req, res) => {
    try {
        const {
            make,
            model,
            fromYear,
            untilYear,
            minPrice,
            maxPrice,
            fuel,
            mileageFrom,
            mileageTo,
            segment,
            hpFrom,
            hpTo,
            page = 1,
            limit = 10,
            sortBy = "default",
        } = req.query;

        const query = {};

        if (make) query.brand = make;
        if (model) query.model = model;
        if (fromYear) query.year = { $gte: Number(fromYear) };
        if (untilYear) query.year = { ...query.year, $lte: Number(untilYear) };
        if (minPrice) query.price = { $gte: Number(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
        if (fuel) query.fuel = fuel;
        if (mileageFrom) query.km = { $gte: Number(mileageFrom) };
        if (mileageTo) query.km = { ...query.km, $lte: Number(mileageTo) };
        if (segment) query.segment = segment;
        if (hpFrom) query.hp = { $gte: Number(hpFrom) };
        if (hpTo) query.hp = { ...query.hp, $lte: Number(hpTo) };

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let sortQuery = {};
        switch (sortBy) {
            case "price_high":
                sortQuery = { price: -1 };
                break;
            case "price_low":
                sortQuery = { price: 1 };
                break;
            case "km_high":
                sortQuery = { km: -1 };
                break;
            case "km_low":
                sortQuery = { km: 1 };
                break;
            case "hp_high":
                sortQuery = { hp: -1 };
                break;
            case "hp_low":
                sortQuery = { hp: 1 };
                break;
            case "default":
            default:
                sortQuery = {};
                break;
        }

        const cars = await carModel
            .find(query)
            .skip(skip)
            .limit(limitNumber)
            .sort(sortQuery);
        const totalCars = await carModel.countDocuments(query);

        res.json({
            success: true,
            total: totalCars,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalCars / limitNumber),
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
*/
const getCars = async (req, res) => {
    try {
        const cars = await carModel.find({});

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

// Remove one car
const removeCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await carModel.findById(id);

        if (!car) {
            return res
                .status(404)
                .json({ success: false, message: "Car not found" });
        }

        if (car.image) {
            fs.unlink(`uploads/${car.image}`, (err) => {
                if (err) console.error("Error removing image:", err);
            });
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

export { addCar, getCars, getCarById, removeCar };
