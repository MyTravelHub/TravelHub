import React, { useState } from 'react';
import './CSS/MainHomeContainer.css';
import imagea from "./Images/1.jpg";
import imageb from "./Images/2.jpg";
import imagec from "./Images/3.jpg";
import SearchBar from './SearchBar';

const images = [imagea, imageb, imagec]; 

const MainHomeContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="main-home-container">
      <div className="carousel-container">
        <div className="carousel">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
            >
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
          <button className="carousel-button prev" onClick={handlePrev}>
            Previous
          </button>
          <button className="carousel-button next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <div className="search-container">
        <p className="search-text"></p>
        <SearchBar />
      </div>
    </div>
  );
};


export default MainHomeContainer;
