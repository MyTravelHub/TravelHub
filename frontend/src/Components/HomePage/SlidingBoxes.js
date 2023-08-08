import React, { useState, useEffect } from "react";

const SlidingBoxs = ({ cards, slideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % cards.length
      );
    }, slideInterval);

    return () => {
      clearInterval(timer);
    };
  }, [cards.length, slideInterval]);

  return (
    <div className="sliding-box-container">
      <div
        className="sliding-box-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="sliding-box">
            <div className="sliding-box-text">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingBoxs;
