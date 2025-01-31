import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
    const { url, setToken } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
        setError("");
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        validateField(name);
    };

    const validateField = (field) => {
        let newFormErrors = { ...formErrors };

        if (field === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(credentials.email)) {
                newFormErrors.email = "Please enter a valid email address.";
            } else {
                newFormErrors.email = "";
            }
        }

        if (field === "password") {
            if (!credentials.password) {
                newFormErrors.password = "Password cannot be empty.";
            } else {
                newFormErrors.password = "";
            }
        }

        setFormErrors(newFormErrors);
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        setError("");

        validateField("email");
        validateField("password");

        if (formErrors.email || formErrors.password) {
            return;
        }

        try {
            const response = await axios.post(url + "/login", credentials);
            if (response.data.success) {
                setToken(response.data.token);
                navigate("/");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen bg-blue-500">
            <Link className="fixed top-2 left-10 z-20" to="/">
                <img className="w-52 sm:w-72" src="/LogoText.png" alt="Logo" />
            </Link>
            <div className="relative bg-blue-700 h-[50vh]">
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg space-y-4 px-8">
                        <h1 className="text-neutral-900 text-3xl font-bold text-center">
                            Sign In
                        </h1>
                        <p className="text-center text-gray-600 mb-6">
                            Please sign in to your account.
                        </p>
                        {error && (
                            <p className="text-red-500 text-center">{error}</p>
                        )}
                        <form onSubmit={handleSignIn} className="space-y-5">
                            <div className="flex flex-col gap-4">
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="email"
                                    required
                                    aria-label="Email"
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="password"
                                    required
                                    aria-label="Password"
                                    error={!!formErrors.password}
                                    helperText={formErrors.password}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500 text-sm">
                                    Don't have an account?
                                    <Link
                                        to="/signup"
                                        className="text-blue-600 hover:text-blue-800 ml-2"
                                    >
                                        Sign Up
                                    </Link>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white uppercase font-semibold text-lg px-5 py-3 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
        </div>
    );
};

export default SignIn;
