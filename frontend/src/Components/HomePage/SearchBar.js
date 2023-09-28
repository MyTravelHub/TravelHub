import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery.toLowerCase().includes('delays')) {
      // Extract the airport code from the search query
      const airportCode = searchQuery.match(/\b[A-Z]{3}\b/);
      if (airportCode) {
        const airportCodeString = airportCode[0];
        navigate(`/AirportDelays/${airportCodeString}`); // Use navigate
      } else {
        setSearchStatus('Invalid airport code');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchQuery }),
        });

        if (response.ok) {
          setSearchStatus('Query sent to backend');
        } else {
          setSearchStatus('Failed to send query');
        }
      } catch (error) {
        setSearchStatus('Error sending query');
      }
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search"
        />
        <button className="search-bttn" type="submit">
          Search
        </button>
      </form>
      <p>{searchStatus}</p>
    </div>
  );
};

export default SearchBar;
