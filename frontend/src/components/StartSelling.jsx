import React from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaDollarSign,
  FaCamera,
  FaClipboardList,
  FaRegIdCard,
} from "react-icons/fa";

const StartSelling = () => {
  return (
    <div>
      <div className="relative bg-blue-700 p-8 pt-14 pb-24 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
        <div className="text-center text-white space-y-4 mx-auto">
          <h1 className="text-4xl font-bold">Start Selling Your Car Today!</h1>
          <p className="text-lg">
            Join our platform to connect with serious buyers and sell your car
            easily and quickly.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
      </div>
      <div className="bg-blue-500 h-40"></div>
      <div className="flex justify-between px-20">
        <div className="flex justify-center items-center">
          <img className="w-56" src="/Wheel.png" alt="Wheel" />
        </div>
        <div className="flex justify-center items-center">
          <img className="w-56" src="/Wheel.png" alt="Wheel" />
        </div>
      </div>

      <div className="w-11/12 mx-auto my-12 px-6 sm:px-16">
        <h2 className="text-4xl font-bold mb-12 text-center">
          What You Need to Start Selling
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <FaCar size={24} className="text-yellow-400" />,
              title: "Vehicle Details",
              description:
                "Have all the essential details ready, including make, model, year, and mileage.",
            },
            {
              icon: <FaCamera size={24} className="text-yellow-400" />,
              title: "Quality Photos",
              description:
                "Capture clear images of your car from multiple angles to attract more buyers.",
            },
            {
              icon: <FaRegIdCard size={24} className="text-yellow-400" />,
              title: "ID Verification",
              description:
                "Verify your identity to add credibility to your ad and build trust with buyers.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-md shadow text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="relative rounded-md my-12 bg-cover bg-center text-white py-0 banner:py-20"
          style={{ backgroundImage: "url('/road2.jpg')" }}
        >
          <div className="bg-blue-700/70 p-10 backdrop-blur-sm rounded-md mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">Why Sell with Us?</h2>
            <p className="text-lg mb-6">
              Maximize your sale price, reach thousands of potential buyers, and
              enjoy a hassle-free selling process.
            </p>
            <Link
              to="/create-ad"
              className="bg-yellow-400 text-blue-900 flex items-center justify-center mx-auto w-48 h-12 rounded-md font-semibold hover:scale-105 hover:bg-yellow-500 transition-transform duration-300"
            >
              Create an Ad
            </Link>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-12 text-center">
          Tips for a Successful Sale
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <FaClipboardList size={24} className="text-yellow-400" />,
              title: "Detailed Description",
              description:
                "Write a thorough description, including any recent maintenance or unique features.",
            },
            {
              icon: <FaDollarSign size={24} className="text-yellow-400" />,
              title: "Competitive Pricing",
              description:
                "Research market prices to set a fair and competitive price that attracts buyers.",
            },
            {
              icon: <FaCamera size={24} className="text-yellow-400" />,
              title: "Highlight Condition",
              description:
                "Showcase the car’s current condition with both interior and exterior photos.",
            },
          ].map((tip, index) => (
            <div
              key={index}
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-md shadow text-center"
            >
              <div className="flex justify-center mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {tip.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartSelling;
