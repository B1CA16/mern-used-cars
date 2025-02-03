/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import Slider from "react-slick";
import {
    FaBolt,
    FaBuilding,
    FaCheck,
    FaChevronDown,
    FaChevronUp,
    FaCogs,
    FaGasPump,
    FaPhone,
    FaRoad,
    FaUser,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaHeart } from "react-icons/fa6";
import NotFound from "./NotFound";
import Accordion from "./Accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarAdPage = () => {
    const { id } = useParams();
    const { cars, formatNumber } = useContext(CarContext);
    const [openIndex, setOpenIndex] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const car = cars.find((car) => car._id === id);

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

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handleSlideChange = (swiper) => {
        setCurrentImageIndex(swiper.activeIndex);
    };

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                <div>
                    <FaHeart
                        title="Add to favorites"
                        className="hover:text-neutral-700 hover:dark:text-neutral-300 text-2xl cursor-pointer hover:scale-110"
                    />
                </div>
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
                    <div className="w-full flex justify-center px-auto bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        {Array.isArray(car.images) ? (
                            <div className="w-full">
                                {/* Swiper para a imagem principal */}
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    onSlideChange={handleSlideChange} // Atualiza o estado quando o slide muda
                                    className="mb-4"
                                >
                                    {car.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex justify-center">
                                                <img
                                                    src={
                                                        url +
                                                        "images/" +
                                                        car.images[
                                                            currentImageIndex
                                                        ]
                                                    }
                                                    alt={`Car image ${
                                                        currentImageIndex + 1
                                                    }`}
                                                    className="max-w-full h-auto object-cover w-3/4"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Swiper para as miniaturas (preview das próximas imagens) */}
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    className="flex justify-center"
                                >
                                    {car.images.map((image, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleThumbnailClick(index)
                                            } // Alterar imagem principal ao clicar
                                        >
                                            <div className="flex justify-center">
                                                <img
                                                    src={
                                                        url + "images/" + image
                                                    }
                                                    alt={`Car image preview ${
                                                        index + 1
                                                    }`}
                                                    className="max-w-full h-auto object-cover w-24 rounded-lg"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
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
