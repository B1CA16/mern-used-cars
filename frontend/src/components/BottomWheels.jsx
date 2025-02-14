import React from "react";

const BottomWheels = () => {
    return (
        <>
            <div className="bg-blue-500 lg:h-40 md:h-32 sm:h-28 h-24"></div>
            <div className="flex justify-between xl:px-20 lg:px-16 md:px-12 sm:px-8 px-4">
                <div className="flex justify-center items-center">
                    <img
                        className="xl:w-56 md:w-52 sm:w-48 w-44"
                        src="/Wheel.png"
                        alt="Wheel"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <img
                        className="xl:w-56 md:w-52 sm:w-48 w-44"
                        src="/Wheel.png"
                        alt="Wheel"
                    />
                </div>
            </div>
        </>
    );
};

export default BottomWheels;
