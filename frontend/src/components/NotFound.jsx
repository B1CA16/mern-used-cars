import { FaCarCrash } from "react-icons/fa";

const NotFound = ({ title, message, buttonText, link }) => {
    return (
        <div className="flex flex-col items-center justify-center my-20 text-red-600 text-lg">
            <FaCarCrash className="text-7xl text-neutral-400 mb-6" />
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                {title}
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
                {message}
            </p>
            {buttonText && link && (
                <a
                    href={link}
                    className="mt-6 px-6 py-3 bg-blue-700 text-white font-medium text-lg rounded-md hover:bg-blue-600 hover:scale-105 transition duration-300"
                >
                    {buttonText}
                </a>
            )}
        </div>
    );
};

export default NotFound;
