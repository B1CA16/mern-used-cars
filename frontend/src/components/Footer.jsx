import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-blue-700 py-10 text-white'>
      <div className='container mx-auto px-10'>
        {/* Descrição da empresa */}
        <div className='text-center'>
          <img className='w-48 mb-4 mx-auto' src="/LogoText.png" alt="Logo" />
          <p className=' text-lg max-w-2xl mx-auto'>
            Your trusted partner for finding the perfect car. Explore, compare, and buy with confidence.
          </p>
        </div>

        <div className='pt-10'>
          <div className='flex flex-col md:flex-row justify-around'>
            {/* Links úteis */}
            <div className='mb-8 md:mb-0'>
              <h4 className='text-lg font-semibold mb-4 text-yellow-400'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <a href="/" className='hover:text-yellow-400 transition duration-300'>Home</a>
                </li>
                <li>
                  <a href="/start-selling" className='hover:text-yellow-400 transition duration-300'>Start Selling</a>
                </li>
                <li>
                  <a href="/about-us" className='hover:text-yellow-400 transition duration-300'>About Us</a>
                </li>
                <li>
                  <a href="/contact" className='hover:text-yellow-400 transition duration-300'>Contact</a>
                </li>
              </ul>
            </div>

            {/* Informações de contato */}
            <div className='mb-8 md:mb-0'>
              <h4 className='text-lg font-semibold mb-4 text-yellow-400'>Contact Us</h4>
              <p className='flex gap-2 mb-2 items-center'>
                <FaPhone /> +123 456 789 012
              </p>
              <p className='flex gap-2 items-center'>
                <FaEnvelope /> info@SeconDrive.com
              </p>
            </div>

            {/* Redes sociais */}
            <div>
              <h4 className='text-lg font-semibold mb-4 text-yellow-400'>Follow Us</h4>
              <div className='flex flex-col gap-4'>
                <Link to='https://www.facebook.com' className='flex gap-2 items-center hover:text-yellow-400 transition duration-300'>
                  <FaFacebookF size={20} /> Facebook
                </Link>
                <Link to='https://www.twitter.com' className='flex gap-2 items-center hover:text-yellow-400 transition duration-300'>
                  <FaTwitter size={20} /> Twitter
                </Link>
                <Link to='https://www.instagram.com' className='flex gap-2 items-center hover:text-yellow-400 transition duration-300'>
                  <FaInstagram size={20} /> Instagram
                </Link>
                <Link to='https://www.linkedin.com' className='flex gap-2 items-center hover:text-yellow-400 transition duration-300'>
                  <FaLinkedinIn size={20} /> LinkedIn
                </Link>
              </div>
            </div>
          </div>

          {/* Direitos autorais */}
          <div className='text-center mt-10 text-neutral-300'>
            <p>&copy; {new Date().getFullYear()} SeconDrive. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
