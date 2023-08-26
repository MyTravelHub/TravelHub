// React Imports
import React from "react";

// Style Imports
import "../CSS/LandingPage.css";

// Component Imports
import Navbar from "../Components/Navbar";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
import MainHomeContainer from "../Components/HomePage/MainContainer";

// Page Component
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <MainHomeContainer />
      <WeatherDisplay />
    </div>
  );
};

export default LandingPage;
