import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BottomWheels from "./BottomWheels";
import CarBannerCard from "./CarBannerCard";
import NotFound from "./NotFound";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { favorites, userData, removeFromFavorites, isAdmin } =
        useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const carsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) return;
        if (favorites.length === 0) {
            setCurrentPage(0);
        }
    }, [favorites, userData]);

    const startIndex = currentPage * carsPerPage;
    const currentCars = favorites.slice(startIndex, startIndex + carsPerPage);
    const pageCount = Math.ceil(favorites.length / carsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleRemoveFromFavorites = (carId) => {
        removeFromFavorites(carId);
    };

    if (isAdmin) {
        navigate("/");
    }

    return (
        <div>
            <div className="relative bg-blue-700 pt-8 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto z-30">
                    <h1 className="text-4xl font-bold">Favorites</h1>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="most-popular-section px-2 sm:px-12 py-12">
                {userData ? (
                    favorites.length > 0 ? (
                        <div className="w-11/12 xl:w-3/4 mx-auto">
                            <p className="text-lg mb-4 pl-4">
                                Showing <strong>{currentCars.length}</strong> of{" "}
                                <strong>{favorites.length}</strong>
                                {favorites.length === 1
                                    ? " favorite"
                                    : " favorites"}
                            </p>
                            {currentCars.map((car) => (
                                <div key={car._id} className="p-4">
                                    <CarBannerCard
                                        car={car}
                                        onRemove={() =>
                                            handleRemoveFromFavorites(car._id)
                                        }
                                    />
                                </div>
                            ))}

                            {favorites.length > carsPerPage && (
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
                        <NotFound
                            title="No favorites found"
                            message="We couldn't find any cars in your favorites."
                            buttonText="Back to Cars"
                            link="/cars"
                        />
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default Favorites;
