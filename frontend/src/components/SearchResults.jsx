import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarBannerCard from "./CarBannerCard";

const SearchResults = () => {
  const [sortOption, setSortOption] = useState("Default");

  const sortingOptions = [
    "Default",
    "Price: Higher",
    "Price: Lower",
    "KM: Higher",
    "KM: Lower",
    "HorsePower: Higher",
    "HorsePower: Lower",
  ];

  const cars = [
    {
      id: 1,
      name: "Toyota Corolla",
      year: 2019,
      km: "30 000",
      fuel: "Gasoline",
      hp: 132,
      cm3: 1798,
      transmission: "Automatic",
      location: "New York, NY",
      image: "corolla.jpg",
      price: "15 000",
    },
    {
      id: 2,
      name: "Honda Civic",
      year: 2018,
      km: "45 000",
      fuel: "Diesel",
      hp: 158,
      cm3: 1496,
      transmission: "Manual",
      location: "Los Angeles, CA",
      image: "civic.jpg",
      price: "40 500",
    },
    {
      id: 3,
      name: "Ford Focus",
      year: 2020,
      km: "25 000",
      fuel: "Gasoline",
      hp: 160,
      cm3: 1999,
      transmission: "Automatic",
      location: "Chicago, IL",
      image: "focus.jpg",
      price: "19 200",
    },
    {
      id: 4,
      name: "BMW X5",
      year: 2017,
      km: "60 000",
      fuel: "Diesel",
      hp: 300,
      cm3: 2993,
      transmission: "Automatic",
      location: "Miami, FL",
      image: "x5.jpg",
      price: "34 900",
    },
    {
      id: 5,
      name: "Nissan Juke",
      year: 2021,
      km: "10 000",
      fuel: "Electric",
      hp: 110,
      cm3: 0,
      transmission: "Automatic",
      location: "San Francisco, CA",
      image: "juke.jpg",
      price: "26 300",
    },
  ];

  return (
    <div className="most-popular-section px-2 sm:px-12 py-12">
      <div className="flex justify-center gap-2 items-center">
        <Link
          to="/"
          className="hover:text-neutral-800 dark:hover:text-neutral-400"
        >
          Home
        </Link>
        &#x2022;
        <Link
          to="/cars"
          className="text-blue-700 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Cars
        </Link>
      </div>
      <h2 className="text-4xl font-bold mb-6 text-center">Cars</h2>

      <div className="w-11/12 xl:w-3/4 mx-auto">
        <div className="flex justify-between px-4 items-center mb-6">
          <p className="text-lg">
            Showing <strong>10,437 ads</strong>
          </p>
          <div className="flex items-center">
            <label htmlFor="sort-by" className="mr-4 text-lg font-medium">
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-neutral-300 rounded-lg dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            >
              {sortingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {cars.map((car) => (
            <div className="p-4">
              <CarBannerCard key={car.id} car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
