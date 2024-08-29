import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarCard from './CarCard'; 

const RecentlyAdded = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1394,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const cars = [
    { id: 1, name: 'Lamborghini Huracán', year: 2017, km: '30 000', fuel: 'Gasoline', cv: 640, image: 'huracan.jpg', price: '270 000' },
    { id: 2, name: 'Nissan Micra', year: 2022, km: '45 000', fuel: 'Gasoline', cv: 90, image: 'micra.jpg', price: '15 500' },
    { id: 3, name: 'Opel Corsa', year: 2004, km: '225 000', fuel: 'Diesel', cv: 60, image: 'corsa.jpg', price: '3 200' },
    { id: 4, name: 'Renault Clio', year: 2023, km: '6 000', fuel: 'Hybrid (Gasoline)', cv: 145, image: 'clio.jpg', price: '27 000' },
    { id: 5, name: 'Mercedes-Benz C 220', year: 2019, km: '55 000', fuel: 'Diesel', cv: 194, image: 'c220.jpg', price: '36 900' },
  ];

  return (
    <div className="most-popular-section p-12">
      <h2 className="text-4xl font-bold mb-6 text-center">Recently Added Cars</h2>
      <Slider {...settings}>
        {cars.map(car => (
          <div className='p-4'>
            <CarCard key={car.id} car={car} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecentlyAdded;
