import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [untilYear, setUntilYear] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuel, setFuel] = useState(null);
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [segment, setSegment] = useState(null);
  const [hpFrom, setHpFrom] = useState('');
  const [hpTo, setHpTo] = useState('');

  const contextValue = {
    make, setMake,
    model, setModel,
    fromYear, setFromYear,
    untilYear, setUntilYear,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    fuel, setFuel,
    mileageFrom, setMileageFrom,
    mileageTo, setMileageTo,
    segment, setSegment,
    hpFrom, setHpFrom,
    hpTo, setHpTo,
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
