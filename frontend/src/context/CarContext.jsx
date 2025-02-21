/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const url = import.meta.env.VITE_API_URL + "cars";
    const [cars, setCars] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [mostRecent, setMostRecent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setCars(data.data);
            } else {
                setError("Erro ao buscar carros.");
            }
        } catch (err) {
            setError("Erro de conexão com a API.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMostPopular = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url + "/most-popular");
            const data = await response.json();

            if (data.success) {
                setMostPopular(data.data);
            } else {
                setError("Erro ao buscar carros populares.");
            }
        } catch (err) {
            setError("Erro de conexão com a API.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMostRecent = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url + "/most-recent");
            const data = await response.json();

            if (data.success) {
                setMostRecent(data.data);
            } else {
                setError("Erro ao buscar carros recentes.");
            }
        } catch (err) {
            setError("Erro de conexão com a API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
        fetchMostPopular();
        fetchMostRecent();
    }, []);

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <CarContext.Provider
            value={{
                cars,
                setCars,
                mostPopular,
                mostRecent,
                loading,
                error,
                formatNumber,
                fetchCars,
                fetchMostPopular,
                fetchMostRecent,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};
