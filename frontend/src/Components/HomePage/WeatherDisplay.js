import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Weather.css";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";
import FlightSearch from "./FlightSearch"; // Import the FlightSearch component

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: "",
    location: "Loading...",
    icon: "",
  });

  const [forecastData, setForecastData] = useState([]);
  // Function to convert a date string to a day of the week
  const getDayName = (dateString) => {
    const options = { weekday: "long" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderWeatherIcon = (iconName) => {
    switch (iconName) {
      case "01d":
        return <WiDaySunny />;
      case "02d":
        return <WiCloudy />;
      case "10d":
        return <WiRain />;
      case "13d":
        return <WiSnow />;
      default:
        return <WiDaySunny />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
            const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

            try {
              const currentResponse = await axios.get(currentApiUrl);
              const forecastResponse = await axios.get(forecastApiUrl);

              const { main, weather, name } = currentResponse.data;
              setWeatherData({
                temperature: main.temp,
                description: weather[0].description,
                location: name,
                icon: weather[0].icon,
              });

              // Parse the forecast data from the response
              const forecastDays = parseForecastData(forecastResponse.data.list);
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
    };

    fetchData();
  }, []);

  const parseForecastData = (forecastList) => {
    const forecastDays = {};
    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!forecastDays[date]) {
        forecastDays[date] = {
          temperatures: [],
          descriptions: [],
          icons: [],
        };
      }
      forecastDays[date].temperatures.push(item.main.temp);
      forecastDays[date].descriptions.push(item.weather[0].description);
      forecastDays[date].icons.push(item.weather[0].icon);
    });

    // Convert the grouped forecast data into an array with day names
    const forecastArray = Object.keys(forecastDays).map((date) => ({
      dayName: getDayName(date),
      temperatures: forecastDays[date].temperatures,
      descriptions: forecastDays[date].descriptions,
      icons: forecastDays[date].icons,
    }));

    // Limit the forecast to the next 3 days
    return forecastArray.slice(0, 3);
  };

  return (
    <div className="weather-display">
      <div className="forecast-and-flight">
        <div className="forecast-data">
          <h4>3-Day Forecast</h4>
          <div className="forecast">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-day">
                <h5>{day.dayName}</h5>
                <div className="weather-icon">{renderWeatherIcon(day.icons[0])}</div>
                <p>High: {Math.max(...day.temperatures)}°F</p>
                <p>Low: {Math.min(...day.temperatures)}°F</p>
                <p>{day.descriptions[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flight-search">
          <FlightSearch />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
