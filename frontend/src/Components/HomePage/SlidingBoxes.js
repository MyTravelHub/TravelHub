import React, { useState, useEffect } from "react";

const SlidingBoxs = ({ cards, slideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Duplicate the cards to create an endless loop effect
  const duplicatedCards = [...cards, ...cards];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % duplicatedCards.length
      );
    }, slideInterval);

    return () => {
      clearInterval(timer);
    };
  }, [duplicatedCards.length, slideInterval]);

  return (
    <div className="sliding-box-container">
      <div
        className="sliding-box-wrapper"
        style={{ transform: `translateX(-${currentIndex * 170}px)` }}
      >
        {duplicatedCards.map((card, index) => (
          <div key={index} className="sliding-box">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingBoxs;
