import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect(
            "mongodb+srv://admin:123@cluster0.o7apb.mongodb.net/SeconDrive"
        )
        .then(() => {
            console.log("DB Connected");
        });
};
