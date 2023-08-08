// React Imports
import React from "react";

// Style Imports
import "../CSS/LandingPage.css"; 

// Component Imports
import Navbar from "../Components/Navbar";
import SearcBar from "../Components/HomePage/SearchBar";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
import SlidingBoxs from "../Components/HomePage/SlidingBoxes";

// Page Component
const LandingPage = () => {
  const cards = [
    {
      title: "Get Airport Maps",
      description: "Find maps for different airports.",
    },
    {
      title: "View Delays",
      description: "Check real-time flight delays and updates.",
    },
    {
      title: "Get Airport Maps",
      description: "Find maps for different airports.",
    },
  ];

  return (
    <div>
      <Navbar />
      <SearcBar />
      <WeatherDisplay />
      <SlidingBoxs cards={cards} slideInterval={5000} /> {/* Include SlidingBoxs here */}
    </div>
  );
};

export default LandingPage;
