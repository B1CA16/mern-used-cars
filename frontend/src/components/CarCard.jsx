import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="dark:bg-neutral-800 rounded-lg overflow-hidden hover:cursor-pointer shadow transform transition-transform duration-300 hover:scale-105">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold truncate">{car.name}</h3>
        <p className="text-neutral-800 dark:text-neutral-400">{car.year} &#x2022; {car.km} km</p>
        <p className="text-neutral-800 dark:text-neutral-400">{car.fuel} &#x2022; {car.cv} CV</p>
        <p className="text-blue-700 font-semibold text-xl mt-2">{car.price} <span className='text-sm'>EUR</span></p>
      </div>
    </div>
  );
}

export default CarCard;
