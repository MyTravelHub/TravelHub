// React Imports
import React from "react";

// Style Imports
import "../CSS/LandingPage.css"; 

// Component Imports
import Navbar from "../Components/Navbar";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
import SlidingBoxs from "../Components/HomePage/SlidingBoxes";
import MainHomeContainer from "../Components/HomePage/MainContainer";

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
      <MainHomeContainer />
      <WeatherDisplay />
      <SlidingBoxs cards={cards} slideInterval={9000} />
    </div>
  );
};

export default LandingPage;
