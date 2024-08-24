import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <div className='bg-blue-700 flex justify-between p-2 px-10 items-center'>
        <Link to='/'>
          <img className='w-72' src="/LogoText.png" alt="Logo" />
        </Link>
        <div className='flex gap-8 items-center'>
          <Link 
            to="/start-selling" 
            className='text-lg flex items-center gap-2 px-5 py-[0.325rem] font-medium rounded-md border-2 border-transparent hover:border-neutral-300 hover:text-neutral-300 transition duration-300 group'>
            <FaPlus className='transform transition-transform duration-300 group-hover:scale-125' />
            Start selling
          </Link>
          <button className='bg-white text-blue-950 uppercase font-medium text-lg px-5 py-2 rounded-md hover:bg-neutral-200 transition-colors duration-300'>
            Sign In
          </button>
        </div>
      </div>
      {/* <div className='flex justify-between px-20'>
        <img className='w-56' src="/Wheel.png" alt="Wheel" />
        <img className='w-56' src="/Wheel.png" alt="Wheel" />
      </div> */}
    </div>
    
  );
}

export default Navbar;
