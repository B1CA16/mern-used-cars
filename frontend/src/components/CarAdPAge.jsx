/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import {
    FaBolt,
    FaBuilding,
    FaCheck,
    FaCogs,
    FaGasPump,
    FaPhone,
    FaRoad,
    FaUser,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaHeart, FaTrashCan, FaX } from "react-icons/fa6";
import NotFound from "./NotFound";
import Accordion from "./Accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CarAdPage = () => {
    const { id } = useParams();
    const {
        cars,
        formatNumber,
        fetchCars,
        fetchMostPopular,
        fetchMostRecent,
        setCars,
    } = useContext(CarContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mainSwiperRef = useRef(null);

    const {
        favoritesId,
        addToFavorites,
        removeFromFavorites,
        isAdmin,
        userData,
    } = useContext(AuthContext);

    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const car = cars.find((car) => car._id === id);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (car) {
            setIsFav(favoritesId.includes(car._id));
        }
    }, [favoritesId, car]);

    const handleAddToFavs = async () => {
        await addToFavorites(car);
        setIsFav(true);
    };

    const handleRemoveFromFavs = async () => {
        await removeFromFavorites(car._id);
        setIsFav(false);
    };

    useEffect(() => {
        const incrementViews = async () => {
            try {
                await axios.patch(
                    `http://localhost:4000/api/cars/${id}/countViews`
                );
            } catch (err) {
                console.error(err);
            }
        };

        incrementViews();
    }, [id]);

    const openFullscreen = (index) => {
        setActiveIndex(index);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        if (mainSwiperRef.current) {
            mainSwiperRef.current.slideTo(activeIndex);
        }
    };

    if (!car) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh]">
                <NotFound
                    title="Car Not Found"
                    message="We couldn't find the car you're looking for."
                    buttonText="Back to Cars"
                    link="/cars"
                />
            </div>
        );
    }

    const sections = [
        {
            title: "Audio & Multimedia",
            body: (
                <ul className="list-disc list-inside">
                    {car.extras.audio_and_multimedia.map((feature, index) => (
                        <li
                            key={index}
                            className="text-neutral-800 dark:text-neutral-200"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: "Comfort & Other Equipment",
            body: (
                <ul className="list-disc list-inside">
                    {car.extras.comfort_and_other_equipment.map(
                        (feature, index) => (
                            <li
                                key={index}
                                className="text-neutral-800 dark:text-neutral-200"
                            >
                                {feature}
                            </li>
                        )
                    )}
                </ul>
            ),
        },
        {
            title: "Electronic & Driving Assistance",
            body: (
                <ul className="list-disc list-inside">
                    {car.extras.electronic_and_driving_assistance.map(
                        (feature, index) => (
                            <li
                                key={index}
                                className="text-neutral-800 dark:text-neutral-200"
                            >
                                {feature}
                            </li>
                        )
                    )}
                </ul>
            ),
        },
        {
            title: "Safety",
            body: (
                <ul className="list-disc list-inside">
                    {car.extras.safety.map((feature, index) => (
                        <li
                            key={index}
                            className="text-neutral-800 dark:text-neutral-200"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    const remove = (carId) => {
        const userId = userData?._id;

        if (userId) {
            axios
                .delete(`${url}cars/${carId}`)
                .then(() => {
                    setCars((prevCars) =>
                        prevCars.filter((car) => car._id !== carId)
                    );
                    toast.success("Car removed successfully!");

                    navigate("/cars");

                    fetchCars();
                    fetchMostPopular();
                    fetchMostRecent();
                })
                .catch((error) => {
                    console.error("Error removing the car:", error);
                    toast.error("Error removing the car!");
                });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between px-4">
                <div className="flex gap-2 items-center">
                    <button onClick={() => navigate(-1)} className="font-light">
                        <FaChevronLeft
                            title="Go back"
                            className="mr-4 hover:text-neutral-700 hover:dark:text-neutral-300"
                        />
                    </button>
                    <a
                        className="hover:text-neutral-700 hover:dark:text-neutral-300 sm:text-base text-sm"
                        href="/cars"
                    >
                        Cars
                    </a>
                    &#183;
                    <a
                        className="hover:text-neutral-700 hover:dark:text-neutral-300 sm:text-base text-sm"
                        href={`/cars?make=${car.brand}`}
                    >
                        {car.brand}
                    </a>
                    &#183;
                    <a
                        className="font-semibold hover:text-neutral-700 hover:dark:text-neutral-300 sm:text-base text-sm"
                        href={`/cars?make=${car.brand}&model=${car.model}`}
                    >
                        {car.model}
                    </a>
                </div>
                {!isAdmin ? (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            isFav ? handleRemoveFromFavs() : handleAddToFavs();
                        }}
                        title={
                            isFav ? "Remove from favorites" : "Add to favorites"
                        }
                    >
                        <FaHeart
                            className={`text-lg sm:text-2xl cursor-pointer hover:scale-110 active:scale-95 transform transition-transform duration-300 ${
                                isFav
                                    ? "text-red-500 hover:text-red-700"
                                    : "text-white hover:text-neutral-200"
                            }`}
                        />
                    </div>
                ) : (
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
                )}
            </div>
            <div className="flex md:flex-row flex-col justify-between md:gap-8 gap-0">
                <div className="md:w-3/4 w-full p-4">
                    <div className="block md:hidden mt-4">
                        <h1 className="sm:text-3xl text-2xl font-bold">
                            {car.name}
                        </h1>
                        <div className="flex justify-between items-center">
                            <p className="mb-4 sm:text-base text-sm">
                                {car.month_of_registration} &#183;&nbsp;
                                {car.year} &#183;&nbsp;
                                {car.fixed_value
                                    ? "Fixed Value"
                                    : "Negotiable"}{" "}
                                &#183;&nbsp;
                                {car.financing_available
                                    ? "Financiable"
                                    : "Not Financiable"}
                            </p>
                            <h1 className="sm:text-3xl text-xl font-bold mb-4">
                                {formatNumber(car.price)}{" "}
                                <span className="sm:text-xl text-lg">EUR</span>
                            </h1>
                        </div>
                    </div>
                    <div className="w-full flex justify-center px-auto pb-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        {Array.isArray(car.images) ? (
                            <div className="w-full">
                                {/* Normal Slider */}
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    navigation
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[Navigation, Thumbs]}
                                    initialSlide={activeIndex}
                                    onSlideChange={(swiper) =>
                                        setActiveIndex(swiper.activeIndex)
                                    }
                                    onSwiper={(swiper) =>
                                        (mainSwiperRef.current = swiper)
                                    }
                                >
                                    {car.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${url}images/${image}`}
                                                    alt={`Car image ${
                                                        index + 1
                                                    }`}
                                                    className="max-w-full h-auto object-cover w-3/4 cursor-pointer"
                                                    onClick={() =>
                                                        openFullscreen(index)
                                                    }
                                                />
                                                <span className="mt-2 text-gray-500">
                                                    {index + 1}/
                                                    {car.images.length}
                                                </span>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Thumbnail Slider */}
                                <div className="lg:block hidden">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={16}
                                        slidesPerView={8}
                                        watchSlidesProgress
                                        freeMode
                                        modules={[Thumbs]}
                                        className="flex justify-start px-2"
                                    >
                                        {car.images.map((image, index) => (
                                            <SwiperSlide
                                                key={index}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex justify-center">
                                                    <img
                                                        src={`${url}images/${image}`}
                                                        alt={`Car image preview ${
                                                            index + 1
                                                        }`}
                                                        className={`max-w-full h-auto object-cover w-24 rounded-lg transition-all duration-300 ${
                                                            index ===
                                                            activeIndex
                                                                ? "border-4 border-blue-500 opacity-100"
                                                                : "opacity-50"
                                                        }`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Fullscreen Viewer */}
                                {isFullscreen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
                                        <div className="relative w-full h-full">
                                            <button
                                                onClick={closeFullscreen}
                                                className="absolute z-40 top-4 right-4 text-white text-2xl hover:cursor-pointer hover:text-neutral-200 active:scale-95 hover:scale-110 transition-all duration-300"
                                            >
                                                <FaX />
                                            </button>
                                            <Swiper
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                initialSlide={activeIndex}
                                                navigation
                                                modules={[Navigation]}
                                                onSlideChange={(swiper) =>
                                                    setActiveIndex(
                                                        swiper.activeIndex
                                                    )
                                                }
                                                className="w-full h-full"
                                            >
                                                {car.images.map(
                                                    (image, index) => (
                                                        <SwiperSlide
                                                            key={index}
                                                        >
                                                            <div className="flex justify-center">
                                                                <img
                                                                    src={`${url}images/${image}`}
                                                                    alt={`Fullscreen image ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="w-4/5 h-screen object-contain"
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                )}
                                            </Swiper>
                                            <div className="absolute bottom-4 right-4 text-white text-lg">
                                                {activeIndex + 1}/
                                                {car.images.length}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <img
                                    src={car.images}
                                    alt="Car image"
                                    className="max-w-full h-auto object-cover w-3/4"
                                />
                            </div>
                        )}
                    </div>
                    <hr className="my-4 border-neutral-200 dark:border-neutral-800" />

                    <div className="mt-8">
                        <h2 className="sm:text-2xl text-xl font-semibold mb-4">
                            Highlights
                        </h2>
                        <div className="flex justify-around gap-6 items-center mt-6 overflow-x-auto">
                            <div className="flex flex-col items-center justify-center">
                                <FaRoad className="mr-2 text-3xl mb-2" />
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Mileage
                                </p>
                                <span className="sm:text-xl text-base font-medium">
                                    {formatNumber(car.km)}
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <FaGasPump className="mr-2 text-3xl mb-2" />
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Fuel Type
                                </p>
                                <span className="sm:text-xl text-base font-medium">
                                    {car.fuel}
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <FaCogs className="mr-2 text-3xl mb-2" />
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Transmission
                                </p>
                                <span className="sm:text-xl text-base font-medium">
                                    {car.transmission}
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <svg
                                    className="mr-2 text-4xl mb-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="none" stroke="currentColor">
                                        <path
                                            fill="currentColor"
                                            d="M11 9h6v10h-6.5l-2 -2h-2.5v-6.5l1.5 -1.5Z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M17 13h4v-3h1v8h-1v-3h-4z"
                                        />
                                        <path d="M6 14h-4M2 11v6" />
                                        <path d="M11 9v-4M8 5h6" />
                                    </g>
                                </svg>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Displacement
                                </p>
                                <span className="sm:text-xl text-base font-medium">
                                    {car.cm3}
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <FaBolt className="mr-2 text-3xl mb-2" />
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Horsepower
                                </p>
                                <span className="sm:text-xl text-base font-medium">
                                    {car.hp}
                                </span>
                            </div>
                        </div>

                        <hr className="my-4 border-neutral-200 dark:border-neutral-800" />

                        <h2 className="sm:text-2xl text-xl font-semibold mb-4">
                            Car Description
                        </h2>
                        <p className="text-neutral-800 dark:text-neutral-200 text-lg">
                            {car.description}
                        </p>

                        <hr className="my-4 border-neutral-200 dark:border-neutral-800" />

                        <div className="mt-8">
                            <h2 className="sm:text-2xl text-xl font-semibold mb-4">
                                Details
                            </h2>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Brand</strong> {car.brand}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Model</strong> {car.model}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Version</strong> {car.version}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Year</strong> {car.year}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Segment</strong> {car.segment}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Month of Registration</strong>{" "}
                                    {car.month_of_registration}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Engine Capacity (cm³)</strong>{" "}
                                    {car.cm3}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Financing Available</strong>{" "}
                                    {car.financing_available ? "Yes" : "No"}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Warranty</strong> {car.warranty}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Previous Owners</strong>{" "}
                                    {car.previous_owners}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Service Book</strong>{" "}
                                    {car.service_book
                                        ? "Available"
                                        : "Not Available"}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Non-Smoker</strong>{" "}
                                    {car.non_smoker ? "Yes" : "No"}
                                </p>

                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Second Key</strong>{" "}
                                    {car.second_key ? "Yes" : "No"}
                                </p>
                                <p className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base mb-2">
                                    <strong>Vehicle Class</strong>{" "}
                                    {car.vehicle_class}
                                </p>
                            </div>
                        </div>

                        <hr className="my-4 border-neutral-200 dark:border-neutral-800" />

                        <div className="mt-8">
                            <h2 className="sm:text-2xl text-xl font-semibold mb-4">
                                Features & Extras
                            </h2>
                            <Accordion values={sections} />
                        </div>
                    </div>
                </div>

                <div className="md:w-1/4 w-full">
                    <hr className="md:hidden block m-4 border-neutral-200 dark:border-neutral-800" />

                    <div className="sticky md:top-8 top-0 p-4">
                        <div className="md:block hidden">
                            <h1 className="text-3xl font-bold mb-4">
                                {car.name}
                            </h1>
                            <p className="mb-4">
                                {car.month_of_registration} &#183;&nbsp;
                                {car.year} &#183;&nbsp;
                                {car.fixed_value
                                    ? "Fixed Value"
                                    : "Negotiable"}{" "}
                                &#183;&nbsp;
                                {car.financing_available
                                    ? "Financiable"
                                    : "Not Financiable"}
                            </p>
                            <h1 className="text-3xl font-bold mb-4">
                                {formatNumber(car.price)}{" "}
                                <span className="text-xl">EUR</span>
                            </h1>
                        </div>

                        <div className="flex flex-col mt-0 md:mt-12 rounded-md justify-center">
                            <h2 className="sm:text-2xl text-xl font-semibold mb-2">
                                Seller
                            </h2>
                            <div className="mb-1">
                                {car.owner.name ? (
                                    <div className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base">
                                        <p className="flex items-center gap-4 mb-1">
                                            <FaUser />
                                            {car.owner.name}
                                        </p>
                                        <p className="flex items-center gap-4">
                                            <FaPhone />
                                            {car.owner.phone}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-neutral-800 dark:text-neutral-200 sm:text-lg text-base">
                                        <p className="flex items-center gap-4 mb-1">
                                            <FaBuilding />
                                            {car.owner.company}
                                        </p>
                                        <p className="flex items-center gap-4">
                                            <FaPhone />
                                            {car.owner.phone}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {car.owner.verified ? (
                                <p className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200 sm:text-lg text-base">
                                    <FaCheck />
                                    Verified Seller
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarAdPage;
