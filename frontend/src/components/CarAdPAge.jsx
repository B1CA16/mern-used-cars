import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import Slider from "react-slick";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarAdPage = () => {
  const { id } = useParams();
  const cars = useContext(CarContext);
  const [openIndex, setOpenIndex] = useState(null);

  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <img src="/Logo.png" alt="logo" className="w-20 h-20 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Car Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn't find the car you're looking for.
        </p>
        <Link
          to="/cars"
          className="mt-6 px-6 py-3 bg-blue-700 text-white font-medium text-lg rounded-md hover:bg-blue-600 hover:scale-105 transition duration-300"
        >
          Back to Cars
        </Link>
      </div>
    );
  }

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Audio & Multimedia",
      content: (
        <ul className="list-disc list-inside">
          {car.extras.audio_and_multimedia.map((feature, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {feature}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Comfort & Other Equipment",
      content: (
        <ul className="list-disc list-inside">
          {car.extras.comfort_and_other_equipment.map((feature, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {feature}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Electronic & Driving Assistance",
      content: (
        <ul className="list-disc list-inside">
          {car.extras.electronic_and_driving_assistance.map(
            (feature, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {feature}
              </li>
            )
          )}
        </ul>
      ),
    },
    {
      title: "Safety",
      content: (
        <ul className="list-disc list-inside">
          {car.extras.safety.map((feature, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
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
      <div className="flex justify-between gap-8">
        <div className="w-3/4 p-4">
          <div className="w-full flex justify-center px-auto bg-neutral-100 dark:bg-neutral-800 rounded-md">
            {Array.isArray(car.image) ? (
              <Slider {...sliderSettings}>
                {car.image.map((image, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={image}
                      alt={`Car image ${index + 1}`}
                      className="max-w-full h-auto object-cover w-3/4"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex justify-center">
                <img
                  src={car.image}
                  alt="Car image"
                  className="max-w-full h-auto object-cover w-3/4"
                />
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Car Description</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {car.description}
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Brand</strong> {car.brand}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Model</strong> {car.model}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Version</strong> {car.version}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Month of Registration</strong>{" "}
                  {car.month_of_registration}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Engine Capacity (cm³)</strong> {car.cm3}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Financing Available</strong>{" "}
                  {car.financing_available ? "Yes" : "No"}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Warranty</strong> {car.warranty}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Previous Owners</strong> {car.previous_owners}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Service Book</strong>{" "}
                  {car.service_book ? "Available" : "Not Available"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Non-Smoker</strong> {car.non_smoker ? "Yes" : "No"}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Second Key</strong> {car.second_key ? "Yes" : "No"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                  <strong>Vehicle Class</strong> {car.vehicle_class}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Features & Extras</h2>
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="mb-4 bg-white dark:bg-neutral-800 p-4 rounded-md shadow hover:bg-neutral-100 hover:dark:bg-neutral-700/50 group transition-all duration-300"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200 group-hover:text-neutral-900/90 dark:group-hover:text-neutral-100/90">
                      {section.title}
                    </h3>
                    {openIndex === index ? (
                      <FaChevronUp className="text-gray-700 dark:text-gray-300" />
                    ) : (
                      <FaChevronDown className="text-gray-700 dark:text-gray-300" />
                    )}
                  </div>
                  {openIndex === index && (
                    <div className="mt-4">{section.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/4">
          <div className="sticky top-8 p-4">
            <div>
              <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
              <p className="mb-4">
                {car.year} &#183;
                {car.fixed_value ? "Fixed Value" : "Negotiable"} &#183;
                {car.financing_available ? "Financiable" : "Not Financiable"}
              </p>
              <h1 className="text-3xl font-bold mb-4">
                {car.price} <span className="text-xl">EUR</span>
              </h1>
            </div>
            

            <div className="flex flex-col mt-12 rounded-md justify-center">
              <h2 className="text-2xl font-semibold mb-2">Seller</h2>
              {car.owner.name ? (
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Owner</strong> {car.owner.name} - {car.owner.phone}
                </p>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Company</strong> {car.owner.company} -{" "}
                  {car.owner.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarAdPage;
