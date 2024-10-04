import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarCard from './CarCard'; 
import { useEffect, useState } from 'react';

const MostPopular = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/car_data.json')
      .then((response) => response.json())
      .then((data) => setCars(data.cars))
      .catch((error) => console.error("Error fetching car data: ", error));
  }, []);

  console.log(cars);

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

  return (
    <div className="most-popular-section px-2 sm:px-12 py-12">
      <h2 className="text-4xl font-bold mb-6 text-center">Most Popular Cars</h2>
      <Slider {...settings}>
        {cars.slice(0, 5).map(car => (
          <div key={car.id} className='p-4'>
            <CarCard car={car} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MostPopular;
