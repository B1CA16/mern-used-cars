import React from "react";
import { Link } from "react-router-dom";
import {
    FaCar,
    FaDollarSign,
    FaCamera,
    FaClipboardList,
    FaRegIdCard,
} from "react-icons/fa";
import TipCard from "./TipCard"; // Import the TipCard component
import HomeBanner from "./HomeBanner";
import BottomWheels from "./BottomWheels";

const StartSelling = () => {
    const sellingRequirements = [
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
    ];

    const sellingTips = [
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
    ];

    return (
        <div>
            <div className="relative bg-blue-700 pt-8 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 px-8 mx-auto z-30">
                    <h1 className="text-4xl font-bold">
                        Start Selling Your Car Today!
                    </h1>
                    <p className="text-lg">
                        Join our platform to connect with serious buyers and
                        sell your car easily and quickly.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            {/* <div className="relative bg-blue-700 p-8 pt-14 pb-24 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
        <div className="text-center text-white space-y-4 mx-auto">
          <h1 className="text-4xl font-bold">Start Selling Your Car Today!</h1>
          <p className="text-lg">
            Join our platform to connect with serious buyers and sell your car
            easily and quickly.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
      </div>
      <BottomWheels /> */}

            <div className="w-11/12 mx-auto my-12 px-6 sm:px-16">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    What You Need to Start Selling
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {sellingRequirements.map((item, index) => (
                        <TipCard key={index} tip={item} />
                    ))}
                </div>

                <HomeBanner
                    image="/road2.jpg"
                    title="Why Sell with Us?"
                    description="Maximize your sale price, reach thousands of potential buyers, and enjoy a hassle-free selling process."
                    buttonText="Create an Ad"
                    buttonLink="/create-ad"
                />

                <h2 className="text-3xl font-bold mb-12 text-center">
                    Tips for a Successful Sale
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {sellingTips.map((tip, index) => (
                        <TipCard key={index} tip={tip} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StartSelling;
