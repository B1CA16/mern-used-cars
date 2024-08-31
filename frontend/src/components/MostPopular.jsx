import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarCard from './CarCard'; 

const MostPopular = () => {
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
    { id: 1, name: 'Toyota Corolla', year: 2019, km: '30 000', fuel: 'Gasoline', hp: 132, image: 'corolla.jpg', price: '15 000' },
    { id: 2, name: 'Honda Civic', year: 2018, km: '45 000', fuel: 'Diesel', hp: 158, image: 'civic.jpg', price: '40 500' },
    { id: 3, name: 'Ford Focus', year: 2020, km: '25 000', fuel: 'Gasoline', hp: 160, image: 'focus.jpg', price: '19 200' },
    { id: 4, name: 'BMW X5', year: 2017, km: '60 000', fuel: 'Diesel', hp: 300, image: 'x5.jpg', price: '34 900' },
    { id: 5, name: 'Nissan Juke', year: 2021, km: '10 000', fuel: 'Electric', hp: 110, image: 'juke.jpg', price: '26 300' },
  ];

  return (
    <div className="most-popular-section px-2 sm:px-12 py-12">
      <h2 className="text-4xl font-bold mb-6 text-center">Most Popular Cars</h2>
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

export default MostPopular;
