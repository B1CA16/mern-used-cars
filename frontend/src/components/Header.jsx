import { FaCar, FaDollarSign, FaSearch } from "react-icons/fa";
import FormComponent from "./FormComponent";
import BottomWheels from "./BottomWheels";

const Header = () => {
    return (
        <div>
            <div className="relative bg-blue-700 p-8 pt-14 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between ">
                <div className="flex justify-center xl:w-1/2 w-full mb-8 lg:mb-0">
                    <FormComponent />
                </div>

                {/* Right Section with Features */}
                <div className="bg-blue-800/50 flex flex-col justify-center items-center lg:items-start rounded-md p-10 z-30 text-white lg:text-left mx-auto">
                    <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center lg:text-left">
                        Find Your Perfect Car
                    </h1>
                    <p className="sm:text-lg text-base mb-8 text-center lg:text-left">
                        Explore our extensive inventory of used cars and find
                        the best deals in your area.
                    </p>

                    <div className="flex flex-col xs:flex-row items-center xs:items-start justify-center gap-4 w-full">
                        <div className="flex flex-col items-center text-center w-full xs:w-1/3 min-w-0">
                            <FaCar className="xs:text-[clamp(1.5rem,3vw,2rem)] text-4xl mb-2 text-yellow-400" />
                            <h3 className="xs:text-[clamp(0.9rem,2vw,1.25rem)] text-lg font-semibold mb-2">
                                Wide Selection
                            </h3>
                        </div>

                        <div className="flex flex-col items-center text-center w-full xs:w-1/3 min-w-0">
                            <FaDollarSign className="xs:text-[clamp(1.5rem,3vw,2rem)] text-4xl mb-2 text-yellow-400" />
                            <h3 className="xs:text-[clamp(0.9rem,2vw,1.25rem)] text-lg font-semibold mb-2">
                                Best Deals
                            </h3>
                        </div>

                        <div className="flex flex-col items-center text-center w-full xs:w-1/3 min-w-0">
                            <FaSearch className="xs:text-[clamp(1.5rem,3vw,2rem)] text-4xl mb-2 text-yellow-400" />
                            <h3 className="xs:text-[clamp(0.9rem,2vw,1.25rem)] text-lg font-semibold mb-2">
                                Easy Search
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>

            <BottomWheels />
        </div>
    );
};

export default Header;
