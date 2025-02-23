import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import carRouter from "./routes/carRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import notificationRouter from "./routes/notificationRouter.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://yoursecondrive.netlify.app",
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Routes
app.use("/api/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/notifications", notificationRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

// WebSocket connection handler
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-room", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(
        `Server started on https://secondrive-backend.onrender.com:${port}`
    );
});

export { io };
