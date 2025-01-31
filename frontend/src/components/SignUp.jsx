import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
    const navigate = useNavigate();
    const { url, setToken } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });
    const [apiError, setApiError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
        setApiError("");
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        validateField(name);
    };

    const validateField = (field) => {
        let newFormErrors = { ...formErrors };
        switch (field) {
            case "email":
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(credentials.email)) {
                    newFormErrors.email = "Please enter a valid email address.";
                } else {
                    newFormErrors.email = "";
                }
                break;
            case "password":
                if (credentials.password.length <= 8) {
                    newFormErrors.password =
                        "Password must be at least 8 characters long.";
                } else {
                    newFormErrors.password = "";
                }
                break;
            case "confirmPassword":
                if (credentials.password !== credentials.confirmPassword) {
                    newFormErrors.confirmPassword = "Passwords do not match.";
                } else {
                    newFormErrors.confirmPassword = "";
                }
                break;
            case "phoneNumber":
                if (
                    credentials.phoneNumber.length < 6 ||
                    credentials.phoneNumber.length > 16
                ) {
                    newFormErrors.phoneNumber =
                        "Phone number must be between 6 and 16 characters.";
                } else {
                    newFormErrors.phoneNumber = "";
                }
                break;
            default:
                break;
        }
        setFormErrors(newFormErrors);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        let valid = true;
        let newFormErrors = { ...formErrors };

        if (!credentials.email || !formErrors.email) validateField("email");
        if (!credentials.password || !formErrors.password)
            validateField("password");
        if (!credentials.confirmPassword || !formErrors.confirmPassword)
            validateField("confirmPassword");
        if (!credentials.phoneNumber || !formErrors.phoneNumber)
            validateField("phoneNumber");

        for (let error in newFormErrors) {
            if (newFormErrors[error]) valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            const response = await axios.post(`${url}/register`, {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                phone: credentials.phoneNumber,
            });

            if (response.data.success) {
                setToken(response.data.token);
                navigate("/");
            } else {
                setApiError(response.data.message);
            }
        } catch (error) {
            setApiError("Something went wrong. Please try again.");
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
                            Sign Up
                        </h1>
                        <p className="text-center text-gray-600 mb-6">
                            Create your account.
                        </p>
                        {apiError && (
                            <p className="text-red-500 text-center">
                                {apiError}
                            </p>
                        )}
                        <form onSubmit={handleSignUp} className="space-y-5">
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
                                    label="Name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    required
                                    aria-label="Name"
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
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
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={credentials.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="password"
                                    required
                                    aria-label="Confirm Password"
                                    error={!!formErrors.confirmPassword}
                                    helperText={formErrors.confirmPassword}
                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={credentials.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="tel"
                                    required
                                    aria-label="Phone Number"
                                    error={!!formErrors.phoneNumber}
                                    helperText={formErrors.phoneNumber}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500 text-sm">
                                    Already have an account?
                                    <Link
                                        to="/signin"
                                        className="text-blue-600 hover:text-blue-800 ml-2"
                                    >
                                        Sign In
                                    </Link>
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white uppercase font-semibold text-lg px-5 py-3 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
        </div>
    );
};

export default SignUp;
