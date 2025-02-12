/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const url = "http://localhost:4000/api/user";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favoritesId, setFavoritesId] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                localStorage.setItem("token", token);
                try {
                    const decodedToken = jwtDecode(token);
                    const response = await axios.get(
                        `${url}/${decodedToken.id}`
                    );
                    if (response.status === 200) {
                        setUserData(response.data.user);
                        fetchFavorites(response.data.user._id);
                    }
                } catch (error) {
                    console.error("Error decoding token", error);
                    setUserData(null);
                }
            } else {
                localStorage.removeItem("token");
                setUserData(null);
                setFavorites([]);
            }
        };

        fetchUserData();
    }, [token]);

    const fetchFavorites = async (userId) => {
        if (!userId) return;
        try {
            const response = await axios.get(`${url}/${userId}/favorites`);
            if (response.status === 200) {
                setFavorites(response.data.favorites || []);
                setFavoritesId(response.data.favorites.map((car) => car._id));
            } else {
                console.error("Failed to fetch favorites");
            }
        } catch (error) {
            console.error("Error fetching favorites", error);
        }
    };

    const addToFavorites = async (carId) => {
        if (userData && carId) {
            try {
                const response = await axios.patch(
                    `${url}/${userData._id}/favorites`,
                    { carId }
                );

                if (response.data.success) {
                    setFavoritesId((prevFavorites) => [
                        ...prevFavorites,
                        carId,
                    ]);
                    console.log("Added to favorites:", carId);
                    toast.success(
                        response.data.message || "Added to favorites!"
                    );
                } else {
                    toast.error(
                        response.data.message || "Failed to add to favorites."
                    );
                }
            } catch (error) {
                toast.error("Error adding to favorites.");
                console.error("Error adding to favorites", error);
            }
        }
    };

    const removeFromFavorites = async (carId) => {
        if (userData && carId) {
            try {
                const response = await axios.patch(
                    `${url}/${userData._id}/remove-favorite`,
                    { carId }
                );

                if (response.data.success) {
                    setFavoritesId((prevFavorites) =>
                        prevFavorites.filter((id) => id !== carId)
                    );
                    console.log("Removed from favorites:", carId);
                    toast.info(
                        response.data.message || "Removed from favorites."
                    );
                } else {
                    toast.error(
                        response.data.message ||
                            "Failed to remove from favorites."
                    );
                }
            } catch (error) {
                toast.error("Error removing from favorites.");
                console.error("Error removing from favorites", error);
            }
        }
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        setUserData(null);
        setFavorites([]);
    };

    return (
        <AuthContext.Provider
            value={{
                url,
                token,
                setToken,
                userData,
                setUserData,
                logout,
                favorites,
                favoritesId,
                setFavorites,
                setFavoritesId,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
