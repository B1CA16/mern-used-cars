import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, enum: ["dealer", "user"], default: "user" },
        phone: { type: String, default: "" },
        cars: { type: Object, default: {} },
        favorites: { type: Array, default: [] },
        verified: { type: Boolean, default: false },
        joined: { type: Date, default: Date.now },
    },
    { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
