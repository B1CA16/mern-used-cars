import { createContext, useState, useEffect } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/car_data.json')
      .then((response) => response.json())
      .then((data) => setCars(data.cars))
      .catch((error) => console.error('Error fetching car data: ', error));
  }, []);

  return (
    <CarContext.Provider value={cars}>
      {children}
    </CarContext.Provider>
  );
};
