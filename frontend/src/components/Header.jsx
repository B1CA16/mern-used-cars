import { FaCar, FaDollarSign, FaSearch } from "react-icons/fa";
import FormComponent from "./FormComponent";

const Header = () => {
  return (
    <div>
      <div className="relative bg-blue-700 p-8 pt-14 pb-32 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between ">
        <div className="flex justify-center xl:w-1/2 w-full mb-8 lg:mb-0">
          <FormComponent />
        </div>

        {/* Right Section with Features */}
        <div className="bg-blue-800/50 flex flex-col justify-center items-center lg:items-start rounded-md p-10 text-white lg:text-left mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center lg:text-left">
            Find Your Perfect Car
          </h1>
          <p className="text-lg mb-8 text-center lg:text-left">
            Explore our extensive inventory of used cars and find the best deals
            in your area.
          </p>

          <div className="flex flex-row flex-wrap justify-center gap-8 w-full">
            <div className="flex flex-col items-center text-center w-1/3 lg:w-1/4 max-w-[200px]">
              <FaCar className="text-4xl mb-2 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            </div>

            <div className="flex flex-col items-center text-center w-1/3 lg:w-1/4 max-w-[200px]">
              <FaDollarSign className="text-4xl mb-2 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
            </div>

            <div className="flex flex-col items-center text-center w-1/3 lg:w-1/4 max-w-[200px]">
              <FaSearch className="text-4xl mb-2 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
            </div>
          </div>
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
    </div>
  );
};

export default Header;
