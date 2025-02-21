import { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import {
    FaPlus,
    FaUser,
    FaHeart,
    FaSignOutAlt,
    FaUserCircle,
    FaCar,
    FaBell,
} from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

dayjs.locale("pt");

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const { token, logout, userData, isAdmin } = useContext(AuthContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);

    const profileMenuRef = useRef(null);
    const notificationsMenuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (userData?._id) {
            const socket = io("http://localhost:4000");

            socket.emit("join-room", userData._id);
            console.log(`User ${userData._id} joined room`);

            socket.on("notification", (notification) => {
                setNotifications((prevNotifications) => {
                    const updatedNotifications = [
                        notification,
                        ...prevNotifications,
                    ];

                    const hasUnreadNotifications = updatedNotifications.some(
                        (notification) => !notification.isRead
                    );

                    setHasUnread(hasUnreadNotifications);

                    return updatedNotifications;
                });

                toast.info(`New Notification: ${notification.message}`);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [userData]);

    useEffect(() => {
        if (userData?._id) {
            axios
                .get(`${API_URL}notifications/${userData._id}`)
                .then((response) => {
                    if (response.data.success) {
                        const fetchedNotifications = response.data.data;

                        setNotifications(fetchedNotifications);

                        const hasUnreadNotifications =
                            fetchedNotifications.some(
                                (notification) => !notification.isRead
                            );

                        setHasUnread(hasUnreadNotifications);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao obter notificações:", error);
                });
        }
    }, [userData]);

    const handleNotificationClick = async (notificationId) => {
        try {
            await axios.patch(`${API_URL}notifications/${notificationId}/read`);

            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );

            const hasUnreadNotifications = notifications.some(
                (notification) =>
                    notification._id !== notificationId && !notification.isRead
            );

            setHasUnread(hasUnreadNotifications);
        } catch (error) {
            console.error("Erro ao marcar notificação como lida:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }

            if (
                notificationsMenuRef.current &&
                !notificationsMenuRef.current.contains(event.target)
            ) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
    }, [location]);

    useEffect(() => {
        const hasUnreadNotifications = notifications.some(
            (notification) => !notification.isRead
        );

        setHasUnread(hasUnreadNotifications);
    }, [notifications]);

    return (
        <div>
            <div className="bg-blue-700 flex justify-between p-2 px-10 items-center relative">
                <Link to="/">
                    <img
                        className="w-44 sm:w-72"
                        src="/LogoText.png"
                        alt="Logo"
                    />
                </Link>

                <div className="flex gap-8 items-center">
                    <Link
                        to="/start-selling"
                        className="hidden text-sm md:text-lg sm:flex text-white items-center gap-2 px-5 py-[0.325rem] font-medium rounded-md border-2 border-transparent hover:scale-105 hover:border-neutral-300 hover:text-neutral-300 transition duration-300 group"
                    >
                        <FaPlus className="transform transition-transform duration-300 group-hover:scale-110" />
                        Start selling
                    </Link>

                    {token && (
                        <div className="relative">
                            <div
                                className="relative cursor-pointer"
                                onClick={() =>
                                    setIsNotificationsOpen(!isNotificationsOpen)
                                }
                            >
                                <FaBell className="text-white text-3xl hover:scale-105 transition-all duration-300" />
                                {hasUnread && (
                                    <span className="absolute top-0 right-0 bg-red-500 border-4 border-blue-700 w-4 h-4 rounded-full"></span>
                                )}
                            </div>

                            {isNotificationsOpen && (
                                <div
                                    ref={notificationsMenuRef}
                                    className="absolute right-0 mt-2 w-64 bg-white h-[calc(100vh-100px)] overflow-y-scroll shadow-md text-neutral-800 rounded-lg overflow-hidden z-50"
                                >
                                    {notifications.length === 0 ? (
                                        <p className="p-3 text-center text-sm text-neutral-600">
                                            No notifications
                                        </p>
                                    ) : (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification._id}
                                                onClick={() =>
                                                    !notification.isRead &&
                                                    handleNotificationClick(
                                                        notification._id
                                                    )
                                                }
                                                className={`px-4 py-3 text-sm transition duration-300 flex flex-col ${
                                                    notification.isRead
                                                        ? "text-neutral-500"
                                                        : "cursor-pointer font-bold hover:bg-neutral-200"
                                                }`}
                                            >
                                                <div
                                                    className="flex items-center justify-between"
                                                    title={
                                                        !notification.isRead
                                                            ? "Mark as read"
                                                            : ""
                                                    }
                                                >
                                                    <p className="flex-1">
                                                        {notification.message}
                                                    </p>
                                                    {!notification.isRead && (
                                                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-neutral-500">
                                                    {dayjs(
                                                        notification.createdAt
                                                    ).format(
                                                        "DD/MM/YYYY HH:mm"
                                                    )}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {token ? (
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <FaUser className="text-white text-3xl hover:scale-105 transition-all duration-300" />
                            </div>

                            {isProfileOpen && (
                                <div
                                    ref={profileMenuRef}
                                    className="absolute right-0 mt-2 w-48 bg-white shadow-md text-neutral-800 rounded-lg overflow-hidden z-50"
                                >
                                    {!isAdmin ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaUserCircle className="text-blue-600" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/favorites"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaHeart className="text-red-500" />
                                                Favorites
                                            </Link>
                                            <Link
                                                to="/my-ads"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaCar className="text-yellow-500" />
                                                My Ads
                                            </Link>
                                            <Link
                                                to="/create-ad"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaPlus className="text-green-500" />
                                                New Ad
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaUserCircle className="text-blue-600" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/pending-ads"
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 transition duration-300"
                                            >
                                                <FaCar className="text-yellow-500" />
                                                Pending Ads
                                            </Link>
                                        </>
                                    )}
                                    <hr />
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-200 transition duration-300"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/signin"
                            className="bg-white text-blue-950 uppercase font-medium text-lg px-5 py-2 rounded-md hover:scale-105 transition duration-300"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
