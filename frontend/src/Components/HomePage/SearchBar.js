import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/SearchBar.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const navigate = useNavigate();

  const validateSearchQuery = (query) => {
    return query.length >= 3 && query.length <= 30;
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setAirportSuggestions([]);
  };

  useEffect(() => {
    const fetchAirportSuggestions = async () => {
      if (!validateSearchQuery(searchQuery)) {
        setAirportSuggestions([]);
        return;
      }

      try {
        const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
        const response = await axios.get(
          `https://airlabs.co/api/v9/suggest?q=${searchQuery}&api_key=${apiKey}`
        );

        if (response.data.airports) {
          const airportSuggestions = response.data.airports.map((airport) => ({
            name: `${airport.name} ${airport.iata_code} Delays`,
          }));
          setAirportSuggestions(airportSuggestions);
        } else {
          setAirportSuggestions([]);
        }

        // Console log the API response
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error fetching airport suggestions', error);
      }
    };

    if (searchQuery) {
      fetchAirportSuggestions();
    } else {
      setAirportSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery.toLowerCase().includes('delays')) {
      const airportCode = searchQuery.match(/\b[A-Z]{3}\b/);
      if (airportCode) {
        const airportCodeString = airportCode[0];
        navigate(`/AirportDelays/${airportCodeString}`);
      } else {
        setSearchStatus('Invalid airport code');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/search', {
          query: searchQuery,
        });
        console.log('Backend Response:', response.data);
      } catch (error) {
        alert('Error sending query to the backend');
      }
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <div className="custom-textfield-container">
          <input
            type="text"
            className="custom-textfield"
            placeholder="Search Airport Delays, Bag Info, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          {airportSuggestions.length > 0 && (
            <div className="suggestions">
              {airportSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
      <p>{searchStatus}</p>
    </div>
  );
};

export default SearchBar;

