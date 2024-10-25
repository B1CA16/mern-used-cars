import { useContext, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { FaMagnifyingGlass, FaSliders } from 'react-icons/fa6';
import { SearchContext } from '../context/SearchContext';
import { Link, useNavigate } from 'react-router-dom';
import { CarContext } from '../context/CarContext';

const FormComponent = () => {
  const { cars } = useContext(CarContext); 

  const {
    make, setMake,
    model, setModel,
    fromYear, setFromYear,
    untilYear, setUntilYear,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
  } = useContext(SearchContext);

  const navigate = useNavigate();

  const makes = useMemo(() => [...new Set(cars.map(car => car.brand))], [cars]);
  const models = useMemo(() => {
    return make ? [...new Set(cars.filter(car => car.brand === make).map(car => car.model))] : [];
  }, [cars, make]);

  const years = [2022, 2021, 2020, 2019]; 

  const handleFromYearChange = (event, newValue) => {
    if (newValue > untilYear) {
      setUntilYear(newValue);
    }
    setFromYear(newValue);
  };

  const handleUntilYearChange = (event, newValue) => {
    if (newValue < fromYear) {
      return;
    }
    setUntilYear(newValue);
  };

  const filteredUntilYears = useMemo(() => {
    return years.filter(year => year >= fromYear);
  }, [fromYear, years]);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (fromYear) params.set('fromYear', fromYear);
    if (untilYear) params.set('untilYear', untilYear);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate(`/cars?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl bg-white p-6 rounded-lg space-y-3">
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
            onChange={handleFromYearChange}
            renderInput={(params) => <TextField {...params} label="From Year" variant="standard" />}
            className="flex-1"
          />

          <Autocomplete
            freeSolo
            options={filteredUntilYears.map(year => year.toString())} 
            value={untilYear}
            onChange={handleUntilYearChange}
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
        <Link to='/cars' className="text-blue-500 flex-1 flex gap-2 items-center justify-center font-medium text-lg border-2 rounded-md border-transparent hover:scale-105 hover:border-neutral-400 group transition duration-300 hover:text-neutral-500">
          <FaSliders className='transform transition-transform duration-300 group-hover:scale-110' /> Advanced Search
        </Link>
        <button type="submit" className='flex-1 bg-red-600 text-white uppercase flex items-center font-medium justify-center text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300'>
          <FaMagnifyingGlass className='mr-2' />
          Search
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
