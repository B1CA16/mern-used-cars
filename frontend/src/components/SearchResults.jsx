import { useContext, useState, useMemo, useEffect } from "react";
import { CarContext } from "../context/CarContext";
import CarBannerCard from "./CarBannerCard";
import { FaChevronDown } from "react-icons/fa";
import NotFound from "./NotFound";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const SearchResults = () => {
  const [sortOption, setSortOption] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cars } = useContext(CarContext);

  const [filteredCars, setFilteredCars] = useState(cars || []);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 5;

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMake = params.get("make");
    const urlModel = params.get("model");
    const urlFromYear = params.get("fromYear");
    const urlUntilYear = params.get("untilYear");
    const urlFuel = params.get("fuel");
    const urlSegment = params.get("segment");
    const urlHpFrom = params.get("hpFrom");
    const urlHpTo = params.get("hpTo");
    const urlMinPrice = params.get("minPrice");
    const urlMaxPrice = params.get("maxPrice");
    const urlMileageFrom = params.get("mileageFrom");
    const urlMileageTo = params.get("mileageTo");

    let filtered = [...cars];

    if (urlMake) {
      filtered = filtered.filter(
        (car) => car.brand.toLowerCase() === urlMake.toLowerCase()
      );
    }
    if (urlModel) {
      filtered = filtered.filter(
        (car) => car.model.toLowerCase() === urlModel.toLowerCase()
      );
    }
    if (urlFuel) {
      filtered = filtered.filter(
        (car) => car.fuel.toLowerCase() === urlFuel.toLowerCase()
      );
    }
    if (urlFromYear) {
      filtered = filtered.filter((car) => car.year >= parseInt(urlFromYear));
    }
    if (urlUntilYear) {
      filtered = filtered.filter((car) => car.year <= parseInt(urlUntilYear));
    }
    if (urlMinPrice) {
      filtered = filtered.filter((car) => car.price >= parseFloat(urlMinPrice));
    }
    if (urlMaxPrice) {
      filtered = filtered.filter((car) => car.price <= parseFloat(urlMaxPrice));
    }
    if (urlMileageFrom) {
      filtered = filtered.filter((car) => car.km >= parseFloat(urlMileageFrom));
    }
    if (urlMileageTo) {
      filtered = filtered.filter((car) => car.km <= parseFloat(urlMileageTo));
    }
    if (urlSegment) {
      filtered = filtered.filter(
        (car) => car.segment.toLowerCase() === urlSegment.toLowerCase()
      );
    }
    if (urlHpFrom) {
      filtered = filtered.filter((car) => car.hp >= parseInt(urlHpFrom));
    }
    if (urlHpTo) {
      filtered = filtered.filter((car) => car.hp <= parseInt(urlHpTo));
    }

    setFilteredCars(filtered);
    setCurrentPage(0);
  }, [cars]);

  const sortedCars = useMemo(() => {
    if (!filteredCars || filteredCars.length === 0) return [];

    let sortedArray = [...filteredCars];

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
  }, [filteredCars, sortOption]);

  const handleSortSelect = (optionKey) => {
    setSortOption(optionKey);
    setDropdownOpen(false);
  };

  // Calculate the current cars to display
  const startIndex = currentPage * carsPerPage;
  const currentCars = sortedCars.slice(startIndex, startIndex + carsPerPage);
  const pageCount = Math.ceil(sortedCars.length / carsPerPage);

  // Handle page changes
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="most-popular-section px-2 sm:px-12 py-12">
      <div className="w-11/12 xl:w-3/4 mx-auto">
        <div className="flex justify-between px-4 items-center mb-6">
          <p className="text-lg">
            Showing <strong>{currentCars.length}</strong> of <strong>{sortedCars.length}</strong>{" "}
            {sortedCars.length === 1 ? "ad" : "ads"}
          </p>

          <div className="relative">
            <button
              id="dropdownSortButton"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {sortingOptions.find((option) => option.key === sortOption)
                ?.label || "Sort By"}
              <FaChevronDown className="ml-2 w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-neutral-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-neutral-700">
                  {sortingOptions.map((option) => (
                    <li key={option.key}>
                      <button
                        onClick={() => handleSortSelect(option.key)}
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

        <div>
          {currentCars.length === 0 ? (
            <NotFound title="No cars found" message="We couldn't find any cars matching your search." buttonText="Back to Cars" link="/cars" />
          ) : (
            currentCars.map((car) => (
              <div key={car.id} className="p-4">
                <CarBannerCard car={car} />
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {sortedCars.length > carsPerPage && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaChevronRight title="Next" className="text-xl pl-2" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<FaChevronLeft title="Previous" className="text-xl pr-2" />}
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
