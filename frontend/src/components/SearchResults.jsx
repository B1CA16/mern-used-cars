import { useContext, useState } from "react";
import { CarContext } from "../context/CarContext";
import { SearchContext } from "../context/SearchContext";
import CarBannerCard from "./CarBannerCard";
import { FaChevronDown } from "react-icons/fa";
import NotFound from "./NotFound";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const SearchResults = () => {
    const { cars, setPage, loading, totalCars, totalPages } =
        useContext(CarContext);
    const { sortBy, setSortBy } = useContext(SearchContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sortingOptions = [
        { label: "Default", key: "default" },
        { label: "Price: Higher", key: "price_high" },
        { label: "Price: Lower", key: "price_low" },
        { label: "KM: Higher", key: "km_high" },
        { label: "KM: Lower", key: "km_low" },
        { label: "HorsePower: Higher", key: "hp_high" },
        { label: "HorsePower: Lower", key: "hp_low" },
    ];

    const handleSortSelect = (optionKey) => {
        setSortBy(optionKey);
        setDropdownOpen(false);
    };

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    return (
        <div className="most-popular-section px-2 sm:px-12 py-12">
            <div className="w-11/12 xl:w-3/4 mx-auto">
                <div className="flex justify-between px-4 items-center mb-6">
                    <p className="text-lg">
                        Showing <strong>{cars.length}</strong> of{" "}
                        <strong>{totalCars}</strong>{" "}
                        {totalCars === 1 ? "ad" : "ads"}
                    </p>

                    <div className="relative">
                        <button
                            id="dropdownSortButton"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            {sortingOptions.find(
                                (option) => option.key === sortBy
                            )?.label || "Sort By"}
                            <FaChevronDown className="ml-2 w-4 h-4" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-neutral-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-neutral-700">
                                    {sortingOptions.map((option) => (
                                        <li key={option.key}>
                                            <button
                                                onClick={() =>
                                                    handleSortSelect(option.key)
                                                }
                                                className="block px-4 py-2 hover:bg-neutral-100 w-full text-left"
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

                {loading ? (
                    <div className="flex justify-center items-center">
                        <FaSpinner className="animate-spin text-6xl my-20" />
                    </div>
                ) : (
                    <div>
                        {cars.length === 0 ? (
                            <NotFound
                                title="No cars found"
                                message="We couldn't find any cars matching your search."
                                buttonText="Back to Cars"
                                link="/cars"
                            />
                        ) : (
                            cars.map((car, index) => (
                                <div key={car.id || index} className="p-4">
                                    <CarBannerCard car={car} />
                                </div>
                            ))
                        )}
                    </div>
                )}

                {totalCars > 10 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={
                            <FaChevronRight
                                title="Next"
                                className="text-xl pl-2"
                            />
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel={
                            <FaChevronLeft
                                title="Previous"
                                className="text-xl scroll-pr-16"
                            />
                        }
                        renderOnZeroPageCount={null}
                        containerClassName="flex justify-center items-center my-4 space-x-2"
                        pageClassName="mx-1"
                        pageLinkClassName="px-4 py-2 rounded-md dark:hover:bg-neutral-800/50 hover:bg-neutral-100/50"
                        previousClassName="mx-1"
                        previousLinkClassName="px-4 py-2 rounded-md hover:text-yellow-500"
                        nextClassName="mx-1"
                        nextLinkClassName="px-4 py-2 rounded-md hover:text-yellow-500"
                        activeClassName="font-bold dark:text-white bg-neutral-100 dark:bg-neutral-800 rounded-md py-1"
                    />
                )}
            </div>
        </div>
    );
};

export default SearchResults;
