// FormComponent.js
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FaSliders } from 'react-icons/fa6';

const FormComponent = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [untilYear, setUntilYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMakeChange = (event) => setMake(event.target.value);
  const handleModelChange = (event) => setModel(event.target.value);
  const handleFromYearChange = (event) => setFromYear(event.target.value);
  const handleUntilYearChange = (event) => setUntilYear(event.target.value);
  const handleMinPriceChange = (event) => setMinPrice(event.target.value);
  const handleMaxPriceChange = (event) => setMaxPrice(event.target.value);

  return (
    <form className="w-full max-w-xl bg-white p-6 rounded-lg space-y-4">
      <h1 className='text-neutral-900 text-2xl font-medium'>What car are you looking for?</h1>
      <div className="flex space-x-6">
        {/* Brand */}
        <FormControl fullWidth variant="standard">
          <InputLabel id="make-label">Brand</InputLabel>
          <Select
            labelId="make-label"
            id="make"
            value={make}
            label="Brand"
            onChange={handleMakeChange}
          >
            <MenuItem value={'Toyota'}>Toyota</MenuItem>
            <MenuItem value={'Honda'}>Honda</MenuItem>
            <MenuItem value={'Ford'}>Ford</MenuItem>
          </Select>
        </FormControl>

        {/* Model */}
        <FormControl fullWidth variant="standard">
          <InputLabel id="model-label">Model</InputLabel>
          <Select
            labelId="model-label"
            id="model"
            value={model}
            label="Model"
            onChange={handleModelChange}
          >
            <MenuItem value={'Camry'}>Camry</MenuItem>
            <MenuItem value={'Civic'}>Civic</MenuItem>
            <MenuItem value={'F-150'}>F-150</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex space-x-6">
        {/* Year Range */}
        <div className="flex flex-1 space-x-3">
          <FormControl fullWidth variant="standard">
            <InputLabel id="from-year-label">From Year</InputLabel>
            <Select
              labelId="from-year-label"
              id="from-year"
              value={fromYear}
              label="From Year"
              onChange={handleFromYearChange}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              {/* Add more years as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel id="until-year-label">Until Year</InputLabel>
            <Select
              labelId="until-year-label"
              id="until-year"
              value={untilYear}
              label="Until Year"
              onChange={handleUntilYearChange}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              {/* Add more years as needed */}
            </Select>
          </FormControl>
        </div>

        {/* Price Range */}
        <div className="flex flex-1 space-x-3">
          <TextField
            fullWidth
            variant="standard"
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* Search */}
      <div className='flex space-x-6 pt-6 justify-between'>
        <a href="#" className="text-blue-500 flex-1 flex gap-2 items-center justify-center font-medium text-lg border-2 rounded-md border-transparent hover:scale-105 hover:border-neutral-400 group transition duration-300 hover:text-neutral-500">
          <FaSliders /> Advanced Search
        </a>
        <button className='flex-1 bg-red-600 text-white uppercase font-medium text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300'>
          Search
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
