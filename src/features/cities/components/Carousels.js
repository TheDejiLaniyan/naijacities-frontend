import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ImageCarousel({city}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='d-flex justify-content-center'>
        {
          // city.images.forEach((img, i) => {
            <Carousel activeIndex={index}  onSelect={handleSelect} className='city-carousel__container' >
              <Carousel.Item className="city-carousel__items">
                <img
                  className="city-carousel__images"
                  src={city.images?.url}

                  alt="First slide"
                />
              </Carousel.Item> 
                <Carousel.Caption>
                  <h3>{city.name}</h3>
                </Carousel.Caption>
            </Carousel>
          // })
        }
    </div>
  );
}

export default ImageCarousel