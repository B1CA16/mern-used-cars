import { useContext, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { SearchContext } from '../context/SearchContext';
import { CarContext } from '../context/CarContext';

const AdvancedSearch = () => {
  const { cars } = useContext(CarContext); 

  const {
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
  } = useContext(SearchContext);

  
  const makes = useMemo(() => [...new Set(cars.map(car => car.brand))], [cars]);
  const models = useMemo(() => {
    return make ? [...new Set(cars.filter(car => car.brand === make).map(car => car.model))] : [];
  }, [cars, make]);

  const fuels = useMemo(() => [...new Set(cars.map(car => car.fuel))], [cars]);
  const segments = ['SUV', 'Sedan', 'Hatchback', 'Coupe']; 
  const years = [2022, 2021, 2020, 2019]; 

  const handleFromYearChange = (event, newValue) => {
    if (!untilYear || newValue <= untilYear) {
      setFromYear(newValue);
    }
  };

  const handleUntilYearChange = (event, newValue) => {
    if (!fromYear || newValue >= fromYear) {
      setUntilYear(newValue);
    }
  };

  return (
    <div>
      <div className="relative bg-blue-700 p-8 pt-14 pb-32 flex flex-col-reverse xl:flex-row gap-12 items-center lg:justify-between">
        <div className="flex justify-center w-full mb-8 lg:mb-0">
          <form className="w-full max-w-7xl bg-white p-6 rounded-lg space-y-4">
            <h1 className='text-neutral-900 text-2xl font-medium'>Advanced Search</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Make */}
              <Autocomplete
                freeSolo
                options={makes}
                value={make}
                onChange={(event, newValue) => setMake(newValue)}
                renderInput={(params) => <TextField {...params} label="Make" variant="standard" />}
                className="w-full"
              />

              {/* Model */}
              <Autocomplete
                freeSolo
                options={models}
                value={model}
                onChange={(event, newValue) => setModel(newValue)}
                renderInput={(params) => <TextField {...params} label="Model" variant="standard" />}
                className="w-full"
                disabled={!make} 
              />

              {/* Year Range */}
              <Autocomplete
                freeSolo
                options={years.map(year => year.toString())}
                value={fromYear}
                onChange={handleFromYearChange}
                renderInput={(params) => <TextField {...params} label="From Year" variant="standard" />}
                className="w-full"
              />
              <Autocomplete
                freeSolo
                options={years.map(year => year.toString())}
                value={untilYear}
                onChange={handleUntilYearChange}
                renderInput={(params) => <TextField {...params} label="Until Year" variant="standard" />}
                className="w-full"
              />

              {/* Fuel Type */}
              <Autocomplete
                freeSolo
                options={fuels}
                value={fuel}
                onChange={(event, newValue) => setFuel(newValue)}
                renderInput={(params) => <TextField {...params} label="Fuel Type" variant="standard" />}
                className="w-full"
              />

              {/* Segment */}
              <Autocomplete
                freeSolo
                options={segments}
                value={segment}
                onChange={(event, newValue) => setSegment(newValue)}
                renderInput={(params) => <TextField {...params} label="Segment" variant="standard" />}
                className="w-full"
              />

              {/* Horsepower Range */}
              <TextField
                fullWidth
                variant="standard"
                label="Horsepower From"
                type="number"
                value={hpFrom}
                onChange={(event) => setHpFrom(event.target.value)}
              />
              <TextField
                fullWidth
                variant="standard"
                label="Horsepower To"
                type="number"
                value={hpTo}
                onChange={(event) => setHpTo(event.target.value)}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Price Range */}
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

              {/* Mileage Range */}
              <TextField
                fullWidth
                variant="standard"
                label="Mileage From"
                type="number"
                value={mileageFrom}
                onChange={(event) => setMileageFrom(event.target.value)}
              />
              <TextField
                fullWidth
                variant="standard"
                label="Mileage To"
                type="number"
                value={mileageTo}
                onChange={(event) => setMileageTo(event.target.value)}
              />
            </div>

            {/* Search Buttons */}
            <div className="w-full flex justify-end mt-4">
              <button className='bg-red-600 text-white uppercase font-medium text-lg px-20 py-2 rounded-md hover:scale-105 hover:bg-red-500 transition duration-300'>
                Search ({cars.length} ads)
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
      </div>

      <div className="bg-blue-500 h-40"></div>
      <div className="flex justify-between px-20">
        <div className="flex justify-center items-center">
          <img className="w-56" src="/Wheel.png" alt="Wheel" />
        </div>
        <div className="flex justify-center items-center">
          <img className="w-56" src="/Wheel.png" alt="Wheel" />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
