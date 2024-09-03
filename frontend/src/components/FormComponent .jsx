import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { FaSliders } from 'react-icons/fa6';
import { SearchContext } from '../context/SearchContext';

const FormComponent = () => {
  const {
    make, setMake,
    model, setModel,
    fromYear, setFromYear,
    untilYear, setUntilYear,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
  } = useContext(SearchContext);

  // Sample data
  const makes = ['Toyota', 'Honda', 'Ford'];
  const models = ['Camry', 'Civic', 'F-150'];
  const years = [2023, 2022, 2021, 2020, 2019];

  return (
    <form className="w-full max-w-xl bg-white p-6 rounded-lg space-y-3">
      <h1 className='text-neutral-900 text-2xl font-medium'>What car are you looking for?</h1>
      
      <div className="flex flex-wrap gap-4">
        {/* Make */}
        <Autocomplete
          freeSolo
          options={makes}
          value={make}
          onChange={(event, newValue) => setMake(newValue)}
          renderInput={(params) => <TextField {...params} label="Make" variant="standard" />}
          className="flex-1"
        />

        {/* Model */}
        <Autocomplete
          freeSolo
          options={models}
          value={model}
          onChange={(event, newValue) => setModel(newValue)}
          renderInput={(params) => <TextField {...params} label="Model" variant="standard" />}
          className="flex-1"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Year Range */}
        <div className="flex flex-1 gap-4">
          <Autocomplete
            freeSolo
            options={years.map(year => year.toString())}
            value={fromYear}
            onChange={(event, newValue) => setFromYear(newValue)}
            renderInput={(params) => <TextField {...params} label="From Year" variant="standard" />}
            className="flex-1"
          />

          <Autocomplete
            freeSolo
            options={years.map(year => year.toString())}
            value={untilYear}
            onChange={(event, newValue) => setUntilYear(newValue)}
            renderInput={(params) => <TextField {...params} label="Until Year" variant="standard" />}
            className="flex-1"
          />
        </div>

        {/* Price Range */}
        <div className="flex flex-1 gap-4">
          <TextField
            fullWidth
            variant="standard"
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>
      </div>

      {/* Search */}
      <div className='flex flex-wrap gap-4'>
        <a href="#" className="text-blue-500 flex-1 flex gap-2 items-center justify-center font-medium text-lg border-2 rounded-md border-transparent hover:scale-105 hover:border-neutral-400 group transition duration-300 hover:text-neutral-500">
          <FaSliders className='transform transition-transform duration-300 group-hover:scale-110' /> Advanced Search
        </a>
        <button className='flex-1 bg-red-600 text-white uppercase font-medium text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300'>
          Search
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
