/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { SearchContext } from "./SearchContext";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const url = import.meta.env.VITE_API_URL + "cars";
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCars, setTotalCars] = useState(0);

    const {
        make,
        model,
        fromYear,
        untilYear,
        minPrice,
        maxPrice,
        fuel,
        mileageFrom,
        mileageTo,
        segment,
        hpFrom,
        hpTo,
        sortBy,
    } = useContext(SearchContext);

    const fetchCars = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                make: make || "",
                model: model || "",
                fromYear: fromYear || "",
                untilYear: untilYear || "",
                minPrice: minPrice || "",
                maxPrice: maxPrice || "",
                fuel: fuel || "",
                mileageFrom: mileageFrom || "",
                mileageTo: mileageTo || "",
                segment: segment || "",
                hpFrom: hpFrom || "",
                hpTo: hpTo || "",
                page: page,
                sortBy: sortBy || "default",
            });

            const response = await fetch(`${url}?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setCars(data.data);
                setTotalPages(data.totalPages);
                setTotalCars(data.total);
            } else {
                setError("Erro ao buscar carros.");
            }
            console.log("Cars: ", cars);
            console.log("Page: ", page);
        } catch (err) {
            setError("Erro de conexão com a API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [
        make,
        model,
        fromYear,
        untilYear,
        minPrice,
        maxPrice,
        fuel,
        mileageFrom,
        mileageTo,
        segment,
        hpFrom,
        hpTo,
        sortBy,
        page,
    ]);

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const nextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <CarContext.Provider
            value={{
                cars,
                loading,
                error,
                formatNumber,
                page,
                setPage,
                totalPages,
                totalCars,
                nextPage,
                prevPage,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};
