import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import { io } from "../server.js";

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        const notification = new Notification({ userId, message });
        await notification.save();

        io.to(userId).emit("new-notification", notification);

        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating notification",
            error,
        });
    }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({
            createdAt: -1,
        });

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving notifications",
            error,
        });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, message: "Notification not found" });
        }

        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error marking notification as read",
            error,
        });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndDelete(
            notificationId
        );

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, message: "Notification not found" });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting notification",
            error,
        });
    }
};

export {
    createNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification,
};
