/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/CarContext";

const CarCard = ({ car }) => {
    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/car/${car.id}`);
    };

    const { formatNumber } = useContext(CarContext);

    return (
        <div
            onClick={handleNavigate}
            className="dark:bg-neutral-800 rounded-lg overflow-hidden hover:cursor-pointer shadow transform transition-transform duration-300 hover:scale-105"
        >
            <img
                src={url + "images/" + car.images[0]}
                alt={car.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold truncate">{car.name}</h3>
                <p className="text-neutral-800 dark:text-neutral-400">
                    {car.year} &#x2022; {formatNumber(car.km)} km
                </p>
                <p className="text-neutral-800 dark:text-neutral-400 truncate">
                    {car.fuel} &#x2022; {car.hp} HP
                </p>
                <p className="text-blue-700 font-semibold text-xl mt-2">
                    {formatNumber(car.price)}{" "}
                    <span className="text-sm">EUR</span>
                </p>
            </div>
        </div>
    );
};

export default CarCard;
