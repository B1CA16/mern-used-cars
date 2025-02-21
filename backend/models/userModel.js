import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: {
            type: String,
            enum: ["dealer", "user", "admin"],
            default: "user",
        },
        phone: { type: String, default: "" },
        cars: [
            { type: mongoose.Schema.Types.ObjectId, ref: "car", default: [] },
        ],
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
        verified: { type: Boolean, default: false },
        joined: { type: Date, default: Date.now },
    },
    { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
