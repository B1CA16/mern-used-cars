import React from 'react';
import FormComponent from './FormComponent ';


const Header = () => {
  return (
    <div>
      <div className="relative min-h-44 bg-blue-700 p-8 py-20 flex flex-col justify-center items-center">
        <FormComponent />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-700 transform origin-bottom-right -skew-y-2"></div>
      </div>

      <div className='bg-blue-500 h-40'></div>
      <div className='flex justify-between px-20'>
        <div className='flex justify-center items-center'>
          <img className='w-56' src="/Wheel.png" alt="Wheel" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='w-56' src="/Wheel.png" alt="Wheel" />
        </div>
      </div>
    </div>
  );
}

export default Header;
