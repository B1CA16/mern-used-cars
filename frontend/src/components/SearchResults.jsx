import { useContext, useState, useMemo } from "react";
import { CarContext } from "../context/CarContext";
import CarBannerCard from "./CarBannerCard";
import { FaChevronDown } from "react-icons/fa";

const SearchResults = () => {
    const [sortOption, setSortOption] = useState("default");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sortingOptions = useMemo(
        () => [
            { label: "Default", key: "default" },
            { label: "Price: Higher", key: "price_high" },
            { label: "Price: Lower", key: "price_low" },
            { label: "KM: Higher", key: "km_high" },
            { label: "KM: Lower", key: "km_low" },
            { label: "HorsePower: Higher", key: "hp_high" },
            { label: "HorsePower: Lower", key: "hp_low" },
        ],
        []
    );

    const {cars} = useContext(CarContext);

    const sortedCars = useMemo(() => {
        if (!cars || cars.length === 0) return [];

        let sortedArray = [...cars];

        switch (sortOption) {
            case "price_high":
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case "price_low":
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case "km_high":
                sortedArray.sort((a, b) => b.km - a.km);
                break;
            case "km_low":
                sortedArray.sort((a, b) => a.km - b.km);
                break;
            case "hp_high":
                sortedArray.sort((a, b) => b.hp - a.hp);
                break;
            case "hp_low":
                sortedArray.sort((a, b) => a.hp - b.hp);
                break;
            default:
                sortedArray.sort((a, b) => a.id - b.id);
                break;
        }

        return sortedArray;
    }, [cars, sortOption]);

    const handleSortSelect = (optionKey) => {
        setSortOption(optionKey);
        setDropdownOpen(false);
    };

    return (
        <div className="most-popular-section px-2 sm:px-12 py-12">
            <div className="w-11/12 xl:w-3/4 mx-auto">
                <div className="flex justify-between px-4 items-center mb-6">
                    <p className="text-lg">
                        Showing <strong>{sortedCars.length}</strong> ads
                    </p>

                    <div className="relative">
                        <button
                            id="dropdownSortButton"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-700 dark:hover:bg-blue-500"
                            type="button"
                        >
                            {sortingOptions.find(
                                (option) => option.key === sortOption
                            )?.label || "Sort By"}
                            <FaChevronDown className="ml-2 w-4 h-4" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-neutral-100 rounded-lg shadow w-44 dark:bg-neutral-700">
                                <ul
                                    key={Math.random()}
                                    className="py-2 text-sm text-neutral-700 dark:text-neutral-200"
                                >
                                    {sortingOptions.map((option) => (
                                        <li key={option.key}>
                                            <button
                                                onClick={() =>
                                                    handleSortSelect(option.key)
                                                }
                                                className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white w-full text-left"
                                            >
                                                {option.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    {sortedCars.map((car) => (
                        <div key={car.id} className="p-4">
                            <CarBannerCard car={car} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
