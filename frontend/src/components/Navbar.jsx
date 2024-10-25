import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <div className='bg-blue-700 flex justify-between p-2 px-10 items-center'>
        <Link to='/'>
          <img className='w-52 sm:w-72' src="/LogoText.png" alt="Logo" />
        </Link>
        <div className='flex gap-8 items-center'>
          <Link 
            to="/start-selling" 
            className='hidden text-sm md:text-lg md:flex text-white items-center gap-2 px-5 py-[0.325rem] font-medium rounded-md border-2 border-transparent hover:scale-105 hover:border-neutral-300 hover:text-neutral-300 transition duration-300 group'>
            <FaPlus className='transform transition-transform duration-300 group-hover:scale-110' />
            Start selling
          </Link>
          <Link to='/signin' className='bg-white text-blue-950 uppercase font-medium text-lg px-5 py-2 rounded-md hover:scale-105 hover:bg-neutral-200 transition duration-300'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default Navbar;
