// React Imports
import React from "react";

// Style Imports
import "../CSS/LandingPage.css";

// Component Imports
import Navbar from "../Components/Navbar";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
import MainHomeContainer from "../Components/HomePage/MainContainer";
import SearchBar from "../Components/HomePage/SearchBar";

// Page Component
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <MainHomeContainer />
      <WeatherDisplay />
      <SearchBar />
    </div>
  );
};

export default LandingPage;
