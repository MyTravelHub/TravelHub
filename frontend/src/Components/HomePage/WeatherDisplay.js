import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Weather.css";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: "",
    location: "Loading...",
  });

  const [forecastData, setForecastData] = useState([]); // Store forecast data
  const [activeTab, setActiveTab] = useState("current"); // Default to showing current weather

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const currentApiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
          const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`; // Adjusted URL for forecast data

          try {
            const currentResponse = await axios.get(currentApiUrl);
            const forecastResponse = await axios.get(forecastApiUrl);

            const { current, location } = currentResponse.data;
            setWeatherData({
              temperature: current.temp_f,
              description: current.condition.text,
              location: location.name,
            });

            const forecastDays = forecastResponse.data.forecast.forecastday;
            setForecastData(forecastDays);
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
      <div className="tab-buttons">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current
        </button>
        <button
          className={activeTab === "3day" ? "active" : ""}
          onClick={() => setActiveTab("3day")}
        >
          3-Day Forecast
        </button>
        <button
          className={activeTab === "5day" ? "active" : ""}
          onClick={() => setActiveTab("5day")}
        >
          5-Day Forecast
        </button>
        <button
          className={activeTab === "7day" ? "active" : ""}
          onClick={() => setActiveTab("7day")}
        >
          7-Day Forecast
        </button>
      </div>
      {activeTab === "current" && (
        <>
          <h3>{weatherData.location}</h3>
          <p>Temperature: {weatherData.temperature}°F</p>
          <p>{weatherData.description}</p>
        </>
      )}
      {activeTab !== "current" && (
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-day">
              <h4>{day.date}</h4>
              <p>Max Temp: {day.day.maxtemp_f}°F</p>
              <p>Min Temp: {day.day.mintemp_f}°F</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
