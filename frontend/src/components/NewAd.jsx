import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import BottomWheels from "./BottomWheels";
import { AuthContext } from "../context/AuthContext";
import {
    FaArrowsRotate,
    FaCar,
    FaChevronDown,
    FaChevronUp,
    FaCircleInfo,
    FaClipboard,
    FaGear,
    FaImages,
    FaMapPin,
    FaSquareCheck,
    FaSquarePlus,
    FaUpload,
} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { toast } from "react-toastify";

const segments = [
    "SUV",
    "Sedan",
    "Hatchback",
    "Coupe",
    "Supercar",
    "Convertible",
    "Van",
];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "LPG"];

const extraCategories = {
    audio_and_multimedia: [
        "Bluetooth",
        "Apple CarPlay",
        "Android Auto",
        "Premium Sound System",
        "USB Ports",
        "Wireless Charging",
        "Satellite Radio",
        "Touchscreen Infotainment",
        "Voice Recognition",
        "Rear Entertainment System",
        "HD Radio",
        "Subwoofer",
        "Auxiliary Input",
    ],
    comfort_and_other_equipment: [
        "Heated Front Seats",
        "Dual-Zone Automatic Climate Control",
        "Power Sunroof",
        "Keyless Entry",
        "Ventilated Front Seats",
        "Massage Seats",
        "Adjustable Steering Wheel",
        "Memory Seats",
        "Ambient Lighting",
        "Power Adjustable Seats",
        "Wireless Phone Charging",
        "Power Rear Sunshade",
        "Cooled Cup Holders",
        "Auto-dimming Rearview Mirror",
    ],
    electronic_and_driving_assistance: [
        "Adaptive Cruise Control",
        "Lane Keeping Assist",
        "Blind Spot Monitoring",
        "Collision Mitigation Braking System",
        "Parking Sensors",
        "360-Degree Camera",
        "Rear Cross Traffic Alert",
        "Automatic High Beams",
        "Traffic Sign Recognition",
        "Night Vision",
        "Pedestrian Detection",
        "Forward Collision Warning",
        "Automatic Emergency Braking",
        "Traffic Jam Assist",
    ],
    safety: [
        "ABS",
        "Driver Airbag",
        "Passenger Airbag",
        "Side Airbags",
        "Traction Control",
        "Electronic Stability Control",
        "Rearview Camera",
        "Tire Pressure Monitoring System",
        "Front and Rear Parking Sensors",
        "Pedestrian Detection",
        "Anti-Theft Alarm System",
        "Roll-Over Protection",
        "Child Safety Locks",
        "Rear Door Child Safety Locks",
    ],
};

const inputExplanations = {
    brand: "🏷️ Specify the brand or manufacturer of the car (e.g., Honda, BMW, Toyota).",
    model: "📏 Enter the specific model name of the car (e.g., Civic, Corolla, X5).",
    version:
        "🔢 Indicate the version or trim level of the car (e.g., Touring, GT Line, Premium). Different trims may include various features and specifications.",
    segment:
        "🚙 Select the category that best describes the car's body style (e.g., Sedan, Hatchback, SUV, Coupe, Convertible).",
    year: "📅 Enter the year the car was manufactured. This is crucial for buyers to assess the car's age and value.",
    month_of_registration:
        "🗓️ Provide the exact month when the car was first registered (e.g., March). This helps determine warranty status and legal documentation.",
    km: "🛣️ Enter the total mileage (kilometers driven) of the car. A lower mileage generally indicates less wear and tear.",
    fuel: "⛽ Choose the type of fuel the car uses (e.g., Petrol, Diesel, Hybrid, Electric, LPG).",
    hp: "🐎 Specify the car's engine power in horsepower (hp). This helps buyers understand performance levels.",
    cm3: "⚙️ Enter the engine displacement in cubic centimeters (cm³) (e.g., 1996 for a 2.0L engine). A higher displacement often means more power but can also affect fuel consumption.",
    location:
        "📍 Provide the city or region where the car is currently available for sale (e.g., Porto, Lisbon). This helps buyers determine the convenience of viewing the car.",
    price: "💰 Enter the asking price of the car in euros (€). Ensure it reflects the market value for a competitive offer.",
    transmission:
        "🚦 Specify whether the car has an Automatic or Manual transmission. Some buyers prefer one over the other based on driving habits.",
    warranty:
        "🛡️ Indicate if the car is under a warranty period (e.g., Manufacturer Warranty - 24 months, Extended Warranty - 12 months).",
    previous_owners:
        "👤 Enter the number of previous owners. A lower number may indicate a well-maintained vehicle.",
    vehicle_class:
        "🏅 Define the vehicle's classification (e.g., Class 1 for smaller cars, Class 2 for SUVs and vans). This is important for toll and insurance purposes.",
    description:
        "📝 Provide a detailed description of the car, including features, conditions, any modifications, and reasons for selling. A well-written description increases buyer interest.",
    images: "📸 Upload up to 30 high-quality images showcasing different angles, interior, dashboard, tires, and any important details of the car.",
    financing_available:
        "💳 Check this box if financing options are available for buyers (e.g., through a bank or dealership).",
    fixed_value:
        "🔒 Select this if the price is non-negotiable. Otherwise, leave it unchecked to indicate openness to offers.",
    service_book:
        "📚 Check this box if the car has a complete service history record, which assures buyers of proper maintenance.",
    non_smoker:
        "🚭 Select this if the car was owned by a non-smoker. Some buyers specifically look for smoke-free interiors.",
    second_key:
        "🔑 Indicate if the car includes a second key. Many buyers prefer having a spare key for convenience and security.",
};

const NewAd = () => {
    const { userData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        owner: userData ? userData?._id : null,
        name: "",
        brand: "",
        model: "",
        version: "",
        segment: "",
        year: "",
        month_of_registration: "",
        km: "",
        fuel: "",
        hp: "",
        cm3: "",
        location: "",
        images: [],
        price: "",
        transmission: "",
        description: "",
        financing_available: false,
        fixed_value: false,
        warranty: "",
        previous_owners: "",
        service_book: false,
        non_smoker: false,
        second_key: false,
        vehicle_class: "",
        extras: {
            audio_and_multimedia: [],
            comfort_and_other_equipment: [],
            electronic_and_driving_assistance: [],
            safety: [],
        },
    });
    const [selectedInput, setSelectedInput] = useState(null);

    const [openCategories, setOpenCategories] = useState({});

    const [imagePreviews, setImagePreviews] = useState([]);

    const { fetchCars } = useContext(CarContext);

    const navigate = useNavigate();

    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setSelectedInput(name);
    };

    useEffect(() => {
        if (formData.brand && formData.model) {
            const generatedName = `${formData.brand} ${formData.model}`;
            if (formData.name !== generatedName) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: generatedName,
                }));
            }
        }
    }, [formData.name, formData.brand, formData.model]);

    const handleExtrasChange = (category, value) => {
        setFormData((prevData) => {
            const updatedExtras = { ...prevData.extras };
            if (updatedExtras[category].includes(value)) {
                updatedExtras[category] = updatedExtras[category].filter(
                    (item) => item !== value
                );
            } else {
                updatedExtras[category] = [...updatedExtras[category], value];
            }
            return { ...prevData, extras: updatedExtras };
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 30) {
            alert("You can only upload up to 30 images.");
            return;
        }
        setFormData({ ...formData, images: files });
        setSelectedInput("images");
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 30) {
            alert("You can only upload up to 30 images.");
            return;
        }

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previews]);

        handleImageChange(e);
    };

    const removeImage = (index) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedFiles = formData.images.filter((_, i) => i !== index);

        setImagePreviews(updatedPreviews);
        setFormData((prev) => ({ ...prev, images: updatedFiles }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        for (const key in formData) {
            if (key !== "extras" && key !== "images") {
                formDataToSend.append(key, formData[key]);
            }
        }

        for (const category in formData.extras) {
            formData.extras[category].forEach((value) => {
                formDataToSend.append(category, value);
            });
        }

        formData.images.forEach((image) => {
            formDataToSend.append("images", image);
        });

        try {
            const response = await axios.post(
                "http://localhost:4000/api/cars",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                fetchCars();
                toast.success("Ad created successfully!");
                navigate(`/car/${response.data.car._id}`);
            } else {
                toast.error(`Error: ${response.data.message}`);
                console.error("Error creating ad:", response.data.message);
            }
        } catch (error) {
            toast.error("Error creating ad: " + error.message);
            console.error("Error creating ad:", error);
        }
    };

    return (
        <>
            <div className="relative bg-blue-700 pt-8 lg:pb-16 md:pb-12 sm:pb-10 pb-8 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
                <div className="text-center text-white space-y-4 mx-auto z-30">
                    <h1 className="text-4xl font-bold">Create Ad</h1>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
            </div>
            <BottomWheels />
            <div className="flex flex-col-reverse sm:flex-row max-w-6xl mx-auto mt-8 min-h-screen">
                <div className="flex-1 overflow-y-auto z-0">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-3xl mx-auto p-6 space-y-6 rounded-lg"
                    >
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaCar /> Basic Information
                            </h2>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("brand")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("model")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Version"
                                name="version"
                                value={formData.version}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("version")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Year"
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("year")}
                            />
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaGear /> Technical Details
                            </h2>
                            <FormControl fullWidth className="mb-4">
                                <InputLabel>Segment</InputLabel>
                                <Select
                                    name="segment"
                                    value={formData.segment}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    onFocus={() => setSelectedInput("segment")}
                                >
                                    {segments.map((segment) => (
                                        <MenuItem key={segment} value={segment}>
                                            {segment}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Month of Registration"
                                name="month_of_registration"
                                value={formData.month_of_registration}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() =>
                                    setSelectedInput("month_of_registration")
                                }
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Mileage (km)"
                                name="km"
                                type="number"
                                value={formData.km}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("km")}
                            />
                            <FormControl fullWidth className="mb-4">
                                <InputLabel>Fuel Type</InputLabel>
                                <Select
                                    name="fuel"
                                    value={formData.fuel}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    onFocus={() => setSelectedInput("fuel")}
                                >
                                    {fuelTypes.map((fuel) => (
                                        <MenuItem key={fuel} value={fuel}>
                                            {fuel}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Horsepower (hp)"
                                name="hp"
                                type="number"
                                value={formData.hp}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("hp")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Engine Displacement (cm³)"
                                name="cm3"
                                type="number"
                                value={formData.cm3}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("cm3")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Transmission"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("transmission")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Vehicle Class"
                                name="vehicle_class"
                                value={formData.vehicle_class}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() =>
                                    setSelectedInput("vehicle_class")
                                }
                            />
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaMapPin /> Location & Pricing
                            </h2>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("location")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("price")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Warranty"
                                name="warranty"
                                value={formData.warranty}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("warranty")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Previous Owners"
                                name="previous_owners"
                                type="number"
                                value={formData.previous_owners}
                                onChange={handleChange}
                                required
                                className="mb-4"
                                onFocus={() =>
                                    setSelectedInput("previous_owners")
                                }
                            />
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaClipboard /> Description
                            </h2>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                                className="mb-4"
                                onFocus={() => setSelectedInput("description")}
                            />
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaImages /> Images
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Upload Images (Max 30)
                                </label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onFocus={() =>
                                            setSelectedInput("images")
                                        }
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <FaUpload className="text-3xl text-gray-400" />
                                        <p className="text-gray-600">
                                            Drag & drop images here or{" "}
                                            <span className="text-blue-500 font-semibold">
                                                browse
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Supported formats: JPEG, PNG, GIF
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTimes className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaSquarePlus /> Extras
                            </h2>
                            {Object.entries(extraCategories).map(
                                ([category, options]) => (
                                    <div key={category} className="mb-4">
                                        <div
                                            className="flex justify-between items-center cursor-pointer p-2 rounded-lg group"
                                            onClick={() =>
                                                toggleCategory(category)
                                            }
                                        >
                                            <h3 className="text-lg font-semibold text-neutral-700 group-hover:text-neutral-800">
                                                {category.replace(/_/g, " ")}
                                            </h3>
                                            {openCategories[category] ? (
                                                <FaChevronUp className="text-neutral-800 group-hover:scale-125 transition-transform duration-300" />
                                            ) : (
                                                <FaChevronDown className="text-neutral-800 group-hover:scale-125 transition-transform duration-300" />
                                            )}
                                        </div>
                                        {openCategories[category] && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 px-2">
                                                {options.map((option) => (
                                                    <FormControlLabel
                                                        className="text-neutral-700"
                                                        key={option}
                                                        control={
                                                            <Checkbox
                                                                checked={formData.extras[
                                                                    category
                                                                ].includes(
                                                                    option
                                                                )}
                                                                onChange={() =>
                                                                    handleExtrasChange(
                                                                        category,
                                                                        option
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={option}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="space-y-3 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl dark:text-neutral-800 font-bold mb-4 flex items-center gap-2">
                                <FaSquareCheck /> Availability Options
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white dark:text-neutral-700">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                formData.financing_available
                                            }
                                            onChange={handleChange}
                                            name="financing_available"
                                        />
                                    }
                                    label="Financing Available"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.fixed_value}
                                            onChange={handleChange}
                                            name="fixed_value"
                                        />
                                    }
                                    label="Fixed Price"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.service_book}
                                            onChange={handleChange}
                                            name="service_book"
                                        />
                                    }
                                    label="Service Book"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.non_smoker}
                                            onChange={handleChange}
                                            name="non_smoker"
                                        />
                                    }
                                    label="Non-Smoker"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.second_key}
                                            onChange={handleChange}
                                            name="second_key"
                                        />
                                    }
                                    label="Second Key"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 pt-5">
                            <a
                                href="/create-ad"
                                className="text-neutral-100 w-full flex gap-2 leading-4 text-center sm:leading-8 px-5 py-2 items-center justify-center font-medium text-base sm:text-lg border-2 rounded-md border-transparent hover:scale-105 hover:border-neutral-400 group transition duration-300 hover:text-neutral-500"
                            >
                                <FaArrowsRotate className="transform transition-transform duration-300 group-hover:scale-110" />{" "}
                                Clear Choices
                            </a>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white w-full uppercase flex items-center font-medium justify-center mx-auto text-base sm:text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-blue-500 transition duration-300"
                            >
                                Create Ad
                            </button>
                        </div>
                    </form>
                </div>
                <div className="dark:bg-neutral-900 bg-white w-full sm:w-64 md:w-64 lg:w-72 xl:w-80 px-6 py-4 sticky top-0 sm:top-10 shadow shadow-neutral-900 sm:shadow-none overflow-auto z-30 max-h-[90vh]">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <FaCircleInfo /> Explanation
                        </h3>
                        <p className="dark:text-neutral-300 text-neutral-700">
                            {selectedInput
                                ? inputExplanations[selectedInput]
                                : "Here you can find explanations for each input field."}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewAd;
