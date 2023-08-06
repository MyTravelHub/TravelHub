import React from "react";
import Navbar from "../Components/Navbar";
import "../CSS/LandingPage.css"; // Import the LandingPage CSS
import backgroundImg from "../Images/logo.png"; // Import the background image

const LandingPage = () => {
  // Sample weather data for demonstration purposes
  const weatherData = {
    temperature: 25,
    description: "Sunny",
    location: "Your Current Location",
  };

  return (
    <div>
      <Navbar />
      <div
        className="search-bar"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="search-container">
          <form action="/" method="get">
            <label htmlFor="header-search">
              <span className="visually-hidden">Search blog posts</span>
            </label>
            <input
              type="text"
              id="header-search"
              placeholder="I need to find..."
              name="s"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="weather-display">
        {/* Your weather display code goes here */}
        <h3>{weatherData.location}</h3>
        <p>Temperature: {weatherData.temperature}°C</p>
        <p>{weatherData.description}</p>
      </div>
    </div>
  );
};

export default LandingPage;
