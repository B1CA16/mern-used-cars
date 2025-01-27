import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import carRouter from "./routes/carRoute.js";

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//routes
app.use("/images", express.static("uploads"));
app.use("/api/cars", carRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
