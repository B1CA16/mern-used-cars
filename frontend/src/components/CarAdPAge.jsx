import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import { FaExclamationTriangle } from 'react-icons/fa';

const CarAdPage = () => {
  const { id } = useParams(); 
  const cars = useContext(CarContext); 

  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <FaExclamationTriangle className="text-yellow-500 text-7xl mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Car Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">We couldn't find the car you're looking for.</p>
        <Link to="/cars" className="mt-6 px-6 py-3 bg-blue-700 text-white font-medium text-lg rounded-md hover:bg-blue-600 hover:scale-105 transition duration-300">
          Back to Cars
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>ID: {car.id}</h1>
    </div>
  );
};

export default CarAdPage;
