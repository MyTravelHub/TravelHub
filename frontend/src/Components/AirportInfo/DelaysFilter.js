import React from 'react';
import './CSS/DelayFilter.css';

const DelaysFilter = ({ delayData, selectedAirline, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  // Extract unique airline IATA codes from delayData
  const uniqueAirlineCodes = [...new Set(delayData.map((delay) => delay.airline_iata))];

  // Create an object with unique airline IATA codes and their corresponding names
  const filteredAirlines = uniqueAirlineCodes.reduce((obj, iataCode) => {
    const airline = delayData.find((delay) => delay.airline_iata === iataCode);
    if (airline) {
      obj[iataCode] = airline.airline_iata;
    }
    return obj;
  }, {});

  return (
    <div className="airline-filter">
      <label htmlFor="airlineSelect">Filter by Airline:</label>
      <select id="airlineSelect" value={selectedAirline} onChange={handleChange}>
        <option value="">All Airlines</option>
        {Object.entries(filteredAirlines).map(([iataCode, airlineName]) => (
          <option key={iataCode} value={iataCode}>
            {airlineName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DelaysFilter;
