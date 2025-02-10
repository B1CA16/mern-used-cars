import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-32">
            <FaSpinner className="text-blue-500 animate-spin text-6xl" />
        </div>
    );
};

export default Loader;
