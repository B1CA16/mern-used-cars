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
import { CarContext } from "../context/CarContext";
import { useNavigate } from "react-router-dom";

const MyAds = () => {
    const url = import.meta.env.VITE_API_URL;
    const { userData, isAdmin } = useContext(AuthContext);
    const { fetchCars, fetchMostPopular, fetchMostRecent } =
        useContext(CarContext);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptLoadingId, setAcceptLoadingId] = useState(null);
    const [rejectLoadingId, setRejectLoadingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const carsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const userId = userData?._id;

        if (userId) {
            setLoading(true);
            axios
                .get(`${url}cars/pending`)
                .then((response) => {
                    setCars(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching cars:", error);
                    setLoading(false);
                });
        }
    }, [userData, url]);

    const acceptCar = (carId) => {
        setAcceptLoadingId(carId);
        axios
            .patch(`${url}cars/accept/${carId}`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.filter((car) => car._id !== carId)
                );
                toast.success("Car accepted successfully!");
                fetchCars();
                fetchMostPopular();
                fetchMostRecent();
            })
            .catch((error) => {
                console.error("Error accepting the car:", error);
                toast.error("Error accepting the car!");
            })
            .finally(() => setAcceptLoadingId(null));
    };

    const rejectCar = (carId) => {
        setRejectLoadingId(carId);
        axios
            .delete(`${url}cars/reject/${carId}`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.filter((car) => car._id !== carId)
                );
                toast.success("Car rejected successfully!");
                fetchCars();
                fetchMostPopular();
                fetchMostRecent();
            })
            .catch((error) => {
                console.error("Error rejecting the car:", error);
                toast.error("Error rejecting the car!");
            })
            .finally(() => setRejectLoadingId(null));
    };

    const startIndex = currentPage * carsPerPage;
    const currentCars = cars.slice(startIndex, startIndex + carsPerPage);
    const pageCount = Math.ceil(cars.length / carsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    if (userData && !isAdmin) {
        navigate("/");
    }

    return (
        <div>
            <div className="relative bg-blue-700 pt-8 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto z-30">
                    <h1 className="text-4xl font-bold">Pending Ads</h1>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="most-popular-section px-2 sm:px-12 py-12">
                {!loading ? (
                    <div className="w-11/12 xl:w-3/4 mx-auto">
                        <p className="text-lg mb-4 pl-4">
                            Showing <strong>{currentCars.length}</strong> of{" "}
                            <strong>{cars.length}</strong>{" "}
                            {cars.length === 1 ? "ad" : "ads"}
                        </p>

                        {cars.length === 0 ? (
                            <NotFound
                                title="No pending cars"
                                message="There are no pending cars at the moment."
                                buttonText="Back to Cars"
                                link="/cars"
                            />
                        ) : (
                            currentCars.map((car) => (
                                <div key={car._id} className="p-4">
                                    <CarBannerCard
                                        pending={true}
                                        car={car}
                                        reject={rejectCar}
                                        accept={acceptCar}
                                        disabled={true}
                                        acceptLoading={
                                            acceptLoadingId === car._id
                                        }
                                        rejectLoading={
                                            rejectLoadingId === car._id
                                        }
                                    />
                                </div>
                            ))
                        )}

                        {cars.length > carsPerPage && (
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
