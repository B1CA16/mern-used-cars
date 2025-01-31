import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    segment: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month_of_registration: {
        type: String,
        required: true,
    },
    km: {
        type: Number,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    },
    cm3: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    financing_available: {
        type: Boolean,
        required: true,
    },
    fixed_value: {
        type: Boolean,
        required: true,
    },
    warranty: {
        type: String,
        required: true,
    },
    previous_owners: {
        type: Number,
        required: true,
    },
    service_book: {
        type: Boolean,
        required: true,
    },
    non_smoker: {
        type: Boolean,
        required: true,
    },
    second_key: {
        type: Boolean,
        required: true,
    },
    vehicle_class: {
        type: String,
        required: true,
    },
    extras: {
        audio_and_multimedia: [
            {
                type: String,
            },
        ],
        comfort_and_other_equipment: [
            {
                type: String,
            },
        ],
        electronic_and_driving_assistance: [
            {
                type: String,
            },
        ],
        safety: [
            {
                type: String,
            },
        ],
    },
    views: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const carModel = mongoose.models.car || mongoose.model("car", carSchema);

export default carModel;
