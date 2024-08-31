import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [sortOption, setSortOption] = useState('Default');

  const sortingOptions = [
    'Default',
    'Price: Higher',
    'Price: Lower',
    'KM: Higher',
    'KM: Lower',
    'HorsePower: Higher',
    'HorsePower: Lower',
  ];

  return (
    <div className="most-popular-section px-2 sm:px-12 py-12">
      <div className='flex justify-center gap-2 items-center'>
        <Link to='/' className='hover:text-neutral-800 dark:hover:text-neutral-400'>Home</Link>
        &#x2022;
        <Link to='/cars' className='text-blue-700 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300'>Cars</Link>
      </div>
      <h2 className="text-4xl font-bold mb-6 text-center">Cars</h2>

      <div className="flex justify-around items-center mb-6">
        <p className="text-lg">Showing <strong>10,437 ads</strong></p>
        <div className="flex items-center">
          <label htmlFor="sort-by" className="mr-4 text-lg font-medium">Sort by:</label>
          <select
            id="sort-by"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-neutral-300 rounded-lg dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          >
            {sortingOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
