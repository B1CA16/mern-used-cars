import { create } from "domain";
import carModel from "../models/carModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import mongoose from "mongoose";

// Adicionar um novo carro
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

// Obter carros mais populares (10 carros com mais visualizações)
const getMostPopular = async (req, res) => {
    try {
        const cars = await carModel
            .find({})
            .sort({ views: -1 }) // Ordenar por visualizações de forma decrescente
            .limit(10); // Limitar a 10 carros

        res.json({
            success: true,
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Obter carros mais recentes (10 carros mais recentes)
const getMostRecent = async (req, res) => {
    try {
        const cars = await carModel
            .find({})
            .sort({ created_at: -1 }) // Ordenar por data de criação de forma decrescente
            .limit(10); // Limitar a 10 carros

        res.json({
            success: true,
            data: cars,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Obter todos os carros
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

// Obter carro por ID
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

// Remover um carro
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

export {
    addCar,
    getCars,
    getCarById,
    removeCar,
    getMostPopular,
    getMostRecent,
};
