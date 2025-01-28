import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
    const { name, email, password, type } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userType =
            type && ["dealer", "user"].includes(type) ? type : "user";

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            type: userType,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const { password, ...userData } = user.toObject();
        res.json({ success: true, user: userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

export { loginUser, registerUser, getUser };
