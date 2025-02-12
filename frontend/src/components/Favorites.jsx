import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BottomWheels from "./BottomWheels";
import CarBannerCard from "./CarBannerCard";
import NotFound from "./NotFound";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Favorites = () => {
    const url = import.meta.env.VITE_API_URL;
    const { userData } = useContext(AuthContext);
    const [favoriteCars, setFavoriteCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const carsPerPage = 5;

    useEffect(() => {
        const userId = userData?._id;

        if (userId) {
            setLoading(true);
            axios
                .get(`${url}user/${userId}/favorites`)
                .then((response) => {
                    setFavoriteCars(response.data.favorites || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching favorite cars:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userData, url]);

    const addToFavorites = (carId) => {
        const userId = userData?._id;

        if (userId) {
            axios
                .patch(`${url}user/${userId}/favorites`, { carId })
                .then(() => {
                    setFavoriteCars((prevCars) => {
                        return [...prevCars, { _id: carId }];
                    });
                    toast.success("Car added to favorites!");
                })
                .catch((error) => {
                    console.error("Error adding to favorites:", error);
                    toast.error("Error adding to favorites!");
                });
        }
    };

    const removeFromFavorites = (carId) => {
        const userId = userData?._id;

        if (userId) {
            axios
                .patch(`${url}user/${userId}/remove-favorite`, { carId })
                .then(() => {
                    setFavoriteCars((prevCars) =>
                        prevCars.filter((car) => car._id !== carId)
                    );
                    toast.success("Car removed from favorites!");
                })
                .catch((error) => {
                    console.error("Error removing from favorites:", error);
                    toast.error("Error removing from favorites!");
                });
        }
    };

    const startIndex = currentPage * carsPerPage;
    const currentCars = favoriteCars.slice(
        startIndex,
        startIndex + carsPerPage
    );
    const pageCount = Math.ceil(favoriteCars.length / carsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <div className="relative bg-blue-700 pt-8 pb-20 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto">
                    <h1 className="text-4xl font-bold">Favorites</h1>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="most-popular-section px-2 sm:px-12 py-12">
                {!loading ? (
                    <div className="w-11/12 xl:w-3/4 mx-auto">
                        <p className="text-lg mb-4 pl-4">
                            Showing <strong>{currentCars.length}</strong> of{" "}
                            <strong>{favoriteCars.length}</strong>{" "}
                            {favoriteCars.length === 1
                                ? "favorite"
                                : "favorites"}
                        </p>

                        {favoriteCars.length === 0 ? (
                            <NotFound
                                title="No favorites found"
                                message="We couldn't find any cars in your favorites."
                                buttonText="Back to Cars"
                                link="/cars"
                            />
                        ) : (
                            currentCars.map((car) => (
                                <div key={car._id} className="p-4">
                                    <CarBannerCard
                                        favs={true}
                                        car={car}
                                        addToFavs={addToFavorites}
                                        removeFromFavs={removeFromFavorites}
                                        isFav={favoriteCars.some(
                                            (fav) => fav._id === car._id
                                        )}
                                    />
                                </div>
                            ))
                        )}

                        {favoriteCars.length > carsPerPage && (
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

export default Favorites;
