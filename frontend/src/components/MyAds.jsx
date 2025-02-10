import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BottomWheels from "./BottomWheels";
import CarBannerCard from "./CarBannerCard";
import NotFound from "./NotFound";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const MyAds = () => {
    const url = import.meta.env.VITE_API_URL;
    const { userData } = useContext(AuthContext);
    const [myCars, setMyCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const carsPerPage = 5;

    useEffect(() => {
        const userId = userData?._id;

        if (userId) {
            axios
                .get(`${url}user/${userId}/my-ads`)
                .then((response) => {
                    setMyCars(response.data.cars);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching cars:", error);
                    setLoading(false);
                });
        }
    }, [userData, url]);

    const remove = (carId) => {
        const userId = userData?._id;

        if (userId) {
            const previousCarCount = myCars.length;

            axios
                .delete(`${url}cars/${carId}`)
                .then(() => {
                    setMyCars((prevCars) =>
                        prevCars.filter((car) => car._id !== carId)
                    );
                    toast.success("Car removed successfully!");

                    if (previousCarCount % 5 === 1 && currentPage > 0) {
                        setCurrentPage(currentPage - 1);
                    }
                })
                .catch((error) => {
                    console.error("Error removing the car:", error);
                    toast.error("Error removing the car!");
                });
        }
    };

    const startIndex = currentPage * carsPerPage;
    const currentCars = myCars.slice(startIndex, startIndex + carsPerPage);
    const pageCount = Math.ceil(myCars.length / carsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <div className="relative bg-blue-700 pt-8 pb-20 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto">
                    <h1 className="text-4xl font-bold">My Ads</h1>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="most-popular-section px-2 sm:px-12 py-12">
                {!loading ? (
                    <div className="w-11/12 xl:w-3/4 mx-auto">
                        <p className="text-lg mb-4 pl-4">
                            Showing <strong>{currentCars.length}</strong> of{" "}
                            <strong>{myCars.length}</strong>{" "}
                            {myCars.length === 1 ? "ad" : "ads"}
                        </p>

                        {myCars.length === 0 ? (
                            <NotFound
                                title="No cars found"
                                message="We couldn't find any cars matching your search."
                                buttonText="Back to Cars"
                                link="/cars"
                            />
                        ) : (
                            currentCars.map((car) => (
                                <div key={car._id} className="p-4">
                                    <CarBannerCard
                                        myAds={true}
                                        car={car}
                                        remove={remove}
                                    />
                                </div>
                            ))
                        )}

                        {myCars.length > carsPerPage && (
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
                                pageCount={pageCount}
                                previousLabel={
                                    <FaChevronLeft
                                        title="Previous"
                                        className="text-xl scroll-pr-16"
                                    />
                                }
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
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default MyAds;
