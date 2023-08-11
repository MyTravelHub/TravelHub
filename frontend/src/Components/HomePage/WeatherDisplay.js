import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: "",
    location: "Loading...",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const apiKey = '2e59fc1f006b4da5b8b133028230808';

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

          try {
            const response = await axios.get(apiUrl);
            const { current, location } = response.data;
            setWeatherData({
              temperature: current.temp_f,
              description: current.condition.text,
              location: location.name,
            });
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div className="weather-display">
      <h3>{weatherData.location}</h3>
      <p>Temperature: {weatherData.temperature}°F</p>
      <p>{weatherData.description}</p>
    </div>
  );
};

export default WeatherDisplay;
