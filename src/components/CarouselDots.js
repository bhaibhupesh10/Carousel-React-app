// CarouselDots.js

import React from 'react';

const CarouselDots = ({ dotStyles, containerStyles }) => {
  return (
    <div className="carousel-dots" style={containerStyles}>
       <span className="dot red" style={dotStyles}></span>
      <span className="dot yellow" style={dotStyles}></span>
      <span className="dot green" style={dotStyles}></span>
      <span className="dot blue" style={dotStyles}></span>
   
     </div>

  );
};

export default CarouselDots;
