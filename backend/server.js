import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import carRouter from "./routes/carRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import notificationRouter from "./routes/notificationRouter.js";

dotenv.config();

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//routes
app.use("/api/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/notifications", notificationRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
