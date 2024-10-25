import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    const handleSignIn = (event) => {
        event.preventDefault();
        console.log("Sign In");
    };

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-blue-500">
            <Link className="fixed top-2 left-10 z-20" to='/'>
                <img className='w-52 sm:w-72' src="/LogoText.png" alt="Logo" />
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
                        <form
                            onSubmit={(e) => handleSignIn(e, credentials)}
                            className="space-y-5"
                        >
                            <div className="flex flex-col gap-4">
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Username"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    aria-label="Username"
                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                    aria-label="Password"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <a
                                    href="#"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Forgot password?
                                </a>
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
