/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const url = "http://localhost:4000/api/user";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                localStorage.setItem("token", token);
                try {
                    const decodedToken = jwtDecode(token);
                    const response = await fetch(url + "/" + decodedToken.id);
                    if (response.ok) {
                        const user = await response.json();
                        setUserData(user.user);
                    } else {
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Erro ao decodificar o token", error);
                    setUserData(null);
                }
            } else {
                localStorage.removeItem("token");
                setUserData(null);
            }
        };

        fetchUserData();
    }, [token]);

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        setUserData(null);
    };

    return (
        <AuthContext.Provider
            value={{ url, token, setToken, userData, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
