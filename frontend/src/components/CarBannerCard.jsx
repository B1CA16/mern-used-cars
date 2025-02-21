/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import {
    FaTachometerAlt,
    FaGasPump,
    FaCogs,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

const CarBannerCard = ({ car, myAds, remove }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/car/${car._id}`);
    };

    const url = import.meta.env.VITE_API_URL;

    const { formatNumber } = useContext(CarContext);
    const { favoritesId, addToFavorites, removeFromFavorites, isAdmin } =
        useContext(AuthContext);

    const [isFav, setIsFav] = useState(favoritesId.includes(car._id));

    const handleAddToFavs = async () => {
        await addToFavorites(car);
        setIsFav(true);
    };

    const handleRemoveFromFavs = async () => {
        await removeFromFavorites(car._id);
        setIsFav(false);
    };

    useEffect(() => {
        setIsFav(favoritesId.includes(car._id));
    }, [favoritesId, car._id]);

    return (
        <div
            onClick={handleNavigate}
            className="dark:bg-neutral-800 bg-white rounded-lg overflow-hidden hover:cursor-pointer shadow transform transition-transform duration-300 hover:scale-105 flex flex-wrap sm:flex-nowrap"
        >
            <img
                src={url + "images/" + car.images[0]}
                alt={car.name}
                className="w-full sm:w-48 md:w-60 lg:w-72 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold truncate">
                        {car.name}
                    </h3>
                    <div className="text-neutral-800 dark:text-neutral-400 flex gap-2 text-sm md:text-base">
                        <p>{car.cm3} cm³</p>
                        <p>&#x2022; {car.hp} HP</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 my-2 text-md md:text-lg text-neutral-800 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                        <FaTachometerAlt />
                        <span>{formatNumber(car.km)} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGasPump />
                        <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCogs />
                        <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{car.year}</span>
                    </div>
                </div>
                <div className="text-neutral-800 dark:text-neutral-400 flex items-center gap-2 text-sm md:text-base">
                    <FaMapMarkerAlt />
                    <span>{car.location}</span>
                </div>
            </div>
            <div className="p-4 flex flex-col items-end justify-between">
                <p className="text-blue-700 dark:text-blue-400 font-semibold text-lg sm:text-xl">
                    {formatNumber(car.price)}{" "}
                    <span className="text-sm">EUR</span>
                </p>
                {myAds ||
                    (isAdmin && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                remove(car._id);
                            }}
                            className="bg-red-500 hover:bg-red-700 p-2 rounded-lg text-xl cursor-pointer hover:scale-110 active:scale-95 transform transition-transform duration-300"
                            title="Remove ad"
                        >
                            <FaTrashCan className="text-white" />
                        </div>
                    ))}
                {!myAds && !isFav && !isAdmin && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToFavs();
                        }}
                        title="Add to favorites"
                    >
                        <FaHeart className="text-white hover:text-neutral-200 text-lg sm:text-xl cursor-pointer hover:scale-110 active:scale-95 transform transition-transform duration-300" />
                    </div>
                )}
                {isFav && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromFavs();
                        }}
                        title="Remove from favorites"
                    >
                        <FaHeart className="text-red-500 hover:text-red-700 text-lg sm:text-xl cursor-pointer hover:scale-110 active:scale-95 transform transition-transform duration-300" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarBannerCard;
