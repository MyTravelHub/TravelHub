// WeatherDisplay.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Weather.css";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: "",
    location: "Loading...",
    icon: "",
  });

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const currentApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
          const forecastApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`;

          try {
            const currentResponse = await axios.get(currentApiUrl);
            const forecastResponse = await axios.get(forecastApiUrl);

            const { current, location } = currentResponse.data;
            setWeatherData({
              temperature: current.temp_f,
              description: current.condition.text,
              location: location.name,
              icon: current.condition.icon,
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

  const renderWeatherIcon = (iconName) => {
    switch (iconName) {
      case "1000":
        return <WiDaySunny />;
      case "1003":
        return <WiCloudy />;
      case "1006":
      case "1009":
        return <WiRain />;
      case "1063":
      case "1066":
        return <WiSnow />;
      default:
        return <WiDaySunny />;
    }
  };

  return (
    <div className="weather-display">
      <h3>{weatherData.location}</h3>
      <div className="current-weather">
        <div className="current-data">
          <div className="weather-icon">
            {renderWeatherIcon(weatherData.icon)}
          </div>
          <div>
            <h4>Current Temperature</h4>
            <p>Temperature: {weatherData.temperature}°F</p>
            <p>{weatherData.description}</p>
          </div>
        </div>
        <div className="forecast-data">
          <h4>12-Hour Forecast</h4>
          {/* Add your 12-hour forecast content here */}
        </div>
      </div>
      <div className="forecast">
        <h4>3-Day Forecast</h4>
        <div className="forecast">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="weather-icon">
                {renderWeatherIcon(day.day.condition.icon)}
              </div>
              <h5>{formatDateToDayOfWeek(day.date)}</h5>
              <p>Max Temp: {day.day.maxtemp_f}°F</p>
              <p>Min Temp: {day.day.mintemp_f}°F</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatDateToDayOfWeek = (dateString) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
};

export default WeatherDisplay;
