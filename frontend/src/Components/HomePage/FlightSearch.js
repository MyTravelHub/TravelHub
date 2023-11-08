import React, { useState } from 'react';
import FullWidthTextField from './FullWidthTextField'; // Import the FullWidthTextField component
import TextField from '@mui/material/TextField';

const FlightSearch = () => {
  // Define state variables to store flight data and user input
  const [flightData, setFlightData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the flight search
  const handleFlightSearch = async () => {
    try {
      // Clear any previous error messages
      setError(null);

      // Set loading state to true
      setLoading(true);

      // Split the search input into airline IATA and flight number
      const [airlineIATA, flightNumber] = searchInput.split(' ');

      // Combine airline IATA and flight number into flight_iata
      const flightIATA = airlineIATA + flightNumber;

      // Make the API request
      const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
      const apiUrl = `https://airlabs.co/api/v9/flight?flight_iata=${flightIATA}&api_key=${apiKey}`;

      const response = await fetch(apiUrl);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Flight information not found');
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the API response
      console.log('API Response:', data);

      // Set the flight data in state
      setFlightData(data);

      // Reset loading state
      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setFlightData(null);
      setLoading(false);
    }
  };

  return (
    <div className="flight-search">
      <h2>Flight Search</h2>
      <p></p>
      {/* Use the FullWidthTextField component here */}
      <FullWidthTextField
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSearch={handleFlightSearch}
        loading={loading}
      />

      {error && <p className="error">{error}</p>}

      {flightData && (
        <div className="flight-details">
          {/* Display flight data here */}
          <h2>Flight Information</h2>
          <p>Flight ICAO: {flightData.response.airline_icao || 'N/A'}</p>
          <p>Departure City: {flightData.response.dep_city || 'N/A'}</p>
          <p>Departure Gate: {flightData.response.dep_gate || 'N/A'}</p>
          <p>Arrival City: {flightData.response.arr_city || 'N/A'}</p>
          <p>Arrival Gate: {flightData.response.arr_gate || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
