import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    FaPlus,
    FaUser,
    FaHeart,
    FaSignOutAlt,
    FaUserCircle,
    FaCar,
} from "react-icons/fa";

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                        className="hidden text-sm md:text-lg md:flex text-white items-center gap-2 px-5 py-[0.325rem] font-medium rounded-md border-2 border-transparent hover:scale-105 hover:border-neutral-300 hover:text-neutral-300 transition duration-300 group"
                    >
                        <FaPlus className="transform transition-transform duration-300 group-hover:scale-110" />
                        Start selling
                    </Link>

                    {token ? (
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <FaUser className="text-white text-3xl hover:scale-105 active:scale-95 transition-all duration-300" />
                            </div>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md  text-neutral-800 rounded-lg overflow-hidden z-50">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 hover:scale-105 hover:font-medium transition duration-300 group"
                                    >
                                        <FaUserCircle className="text-blue-600 group-hover:scale-110" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/favorites"
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 hover:scale-105 hover:font-medium transition duration-300 group"
                                    >
                                        <FaHeart className="text-red-500 group-hover:scale-110" />
                                        Favorites
                                    </Link>
                                    <Link
                                        to="/my-ads"
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 hover:scale-105 hover:font-medium transition duration-300 group"
                                    >
                                        <FaCar className="text-yellow-500 group-hover:scale-110" />
                                        My Ads
                                    </Link>
                                    <Link
                                        to="/create-ad"
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-200 hover:scale-105 hover:font-medium transition duration-300 group"
                                    >
                                        <FaPlus className="text-green-500 group-hover:scale-110" />
                                        New Ad
                                    </Link>
                                    <hr className="px-2" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-red-200 text-red-600 hover:scale-105 hover:font-medium transition duration-300 group"
                                    >
                                        <FaSignOutAlt className="group-hover:scale-110" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/signin"
                            className="bg-white text-blue-950 uppercase font-medium text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-neutral-200 hover::sca transition duration-300"
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
