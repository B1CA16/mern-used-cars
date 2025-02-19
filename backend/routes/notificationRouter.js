import express from "express";
import {
    createNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post("/", createNotification);
notificationRouter.get("/:userId", getUserNotifications);
notificationRouter.patch("/:notificationId/read", markAsRead);
notificationRouter.delete("/:notificationId", deleteNotification);

export default notificationRouter;
