import React from "react";

const WeatherDisplay = () => {
  // Sample weather data for demonstration purposes
  const weatherData = {
    temperature: 25,
    description: "Sunny",
    location: "Your Current Location",
  };
  return (
    <div className="weather-display">
      {/* Your weather display code goes here */}
      <h3>{weatherData.location}</h3>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>{weatherData.description}</p>
    </div>
  );
};

export default WeatherDisplay;
