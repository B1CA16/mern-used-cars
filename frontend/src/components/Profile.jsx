import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
    FaHeart,
    FaCar,
    FaPlus,
    FaSignOutAlt,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaShieldAlt,
    FaPen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import BottomWheels from "./BottomWheels";
import { FaFloppyDisk } from "react-icons/fa6";

const Profile = () => {
    const { userData, setUserData, logout, url, isAdmin } =
        useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        type: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                type: userData.type,
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, type } = formData;

        try {
            const response = await axios.patch(
                `${url}/${userData._id}`,
                { name, email, phone, type },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.data.success) {
                setUserData(response.data.user);
                setIsEditing(false);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating the profile", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const parsedDate = new Date(dateString);

        if (isNaN(parsedDate)) {
            console.error("Invalid date:", dateString);
            return "";
        }

        const options = { year: "numeric", month: "long", day: "numeric" };
        return parsedDate.toLocaleDateString("en-GB", options);
    };

    return (
        <>
            <div className="relative bg-blue-700 pt-8 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto z-30">
                    <h1 className="text-4xl font-bold">Your Profile</h1>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="max-w-4xl mx-auto p-6 transition-all duration-300">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                                />
                            </div>
                            {!isAdmin ? (
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                        User Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                                    >
                                        <option value="user">User</option>
                                        <option value="dealer">Dealer</option>
                                    </select>
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                type="submit"
                                className="bg-neutral-700 text-white uppercase flex items-center font-medium text-base px-8 py-2 rounded-md hover:scale-105 hover:bg-neutral-600 transition duration-300"
                            >
                                <FaFloppyDisk className="mr-2" />
                                Save Changes
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-neutral-300 text-neutral-800 uppercase flex items-center font-medium text-base px-8 py-2 rounded-md hover:scale-105 hover:bg-neutral-200 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm mx-auto">
                            <p className="flex items-center mb-4 gap-2 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                                <FaUser
                                    title="Name"
                                    className="text-2xl mr-2"
                                />
                                <span>{userData?.name}</span>
                                <span className="text-neutral-600 dark:text-neutral-500">
                                    ({userData?.type})
                                </span>
                            </p>
                            <p className="flex items-center mb-4 gap-4 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                                <FaEnvelope
                                    title="E-mail"
                                    className="text-2xl"
                                />
                                <span>{userData?.email}</span>
                            </p>
                            <p className="flex items-center mb-4 gap-4 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                                <FaPhone
                                    title="Phone Number"
                                    className="text-2xl"
                                />
                                <span>{userData?.phone}</span>
                            </p>
                            <p className="flex items-center mb-4 gap-4 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                                <FaCalendarAlt
                                    title="Joined"
                                    className="text-2xl"
                                />
                                <span>{formatDate(userData?.joined)}</span>
                            </p>
                            <p className="flex items-center gap-4 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                                <FaShieldAlt
                                    title="Verified"
                                    className="text-2xl"
                                />
                                <span>
                                    {userData?.verified
                                        ? "Verified"
                                        : "Not Verified"}
                                </span>
                            </p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white uppercase flex items-center font-medium text-base px-8 py-2 rounded-md hover:scale-105 hover:bg-blue-500 transition duration-300"
                            >
                                <FaPen className="mr-2" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-center dark:text-white text-black mb-4">
                        Quick Access to Your Actions
                    </h2>
                    <div className="space-y-3">
                        {!isAdmin ? (
                            <>
                                <Link
                                    to="/favorites"
                                    className="flex items-center gap-2 px-4 py-3 bg-neutral-200/75 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-700/50 hover:scale-105 transition duration-300"
                                >
                                    <FaHeart className="text-red-500 group-hover:scale-110" />
                                    Favorites
                                </Link>
                                <Link
                                    to="/my-ads"
                                    className="flex items-center gap-2 px-4 py-3 bg-neutral-200/75 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-700/50 hover:scale-105 transition duration-300"
                                >
                                    <FaCar className="text-yellow-500 group-hover:scale-110" />
                                    My Ads
                                </Link>
                                <Link
                                    to="/create-ad"
                                    className="flex items-center gap-2 px-4 py-3 bg-neutral-200/75 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-700/50 hover:scale-105 transition duration-300"
                                >
                                    <FaPlus className="text-green-500 group-hover:scale-110" />
                                    New Ad
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/pending-ads"
                                className="flex items-center gap-2 px-4 py-3 bg-neutral-200/75 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-700/50 hover:scale-105 transition duration-300"
                            >
                                <FaCar className="text-yellow-500 group-hover:scale-110" />
                                Pending Ads
                            </Link>
                        )}
                        <button
                            onClick={logout}
                            className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-500 bg-neutral-200/75 dark:bg-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-700/50 hover:scale-105 hover:font-medium transition duration-300 group rounded-lg"
                        >
                            <FaSignOutAlt className="group-hover:scale-110" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
