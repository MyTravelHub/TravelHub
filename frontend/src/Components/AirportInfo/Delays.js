import React, { useState, useEffect } from 'react';
import DelaysFilter from './DelaysFilter';
import './CSS/Delays.css';

const apiKey = '';
const airlinesApiUrl = 'https://airlabs.co/api/v9/airlines?api_key=' + apiKey;

const Delays = () => {
  const [delayData, setDelayData] = useState([]);
  const [airlines, setAirlines] = useState({});
  const [selectedAirline, setSelectedAirline] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [selectedAirportName, setSelectedAirportName] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const responseAirlines = await fetch(airlinesApiUrl);
        if (responseAirlines.ok) {
          const data = await responseAirlines.json();
          const airlinesMap = {};
          data.response.forEach(airline => {
            airlinesMap[airline.iata_code] = airline.name;
          });
          setAirlines(airlinesMap);
        }
      } catch (error) {
        console.error('Error fetching airlines data:', error);
      }
    }

    fetchAirlines();
  }, []);

  // Fetch and update delay data
  useEffect(() => {
    async function fetchDelays() {
      if (selectedAirport) {
        try {
          const delaysApiUrl = `https://airlabs.co/api/v9/delays?delay=60&type=departures&dep_iata=${selectedAirport}&api_key=${apiKey}`;
          const responseDelays = await fetch(delaysApiUrl);
          if (responseDelays.ok) {
            const delays = await responseDelays.json();
            setDelayData(delays.response);
            setSelectedAirportName(delays.request.params.dep_iata);
          }
        } catch (error) {
          console.error('Error fetching delay data:', error);
        }
      }
    }

    fetchDelays();
  }, [selectedAirport]);

  // Filter and render delays
  const filteredDelays = delayData.filter(delay =>
    !selectedAirline || delay.airline_iata === selectedAirline
  );

  return (
    <div className="main-container">
      <div className="airport-delays-container">
        <h1 className="title">{`${selectedAirportName} Airport Delays`}</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter airport name (JFK, LAX, etc.)"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button onClick={() => setSelectedAirport(searchInput)}>Search</button>
        </div>
        </div>
        <DelaysFilter
          delayData={delayData}
          selectedAirline={selectedAirline}
          onChange={setSelectedAirline}
        />
        <table className="delay-table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Flight Number</th>
              <th>Delay</th>
            </tr>
          </thead>
          <tbody>
            {filteredDelays.map((delay, index) => (
              <tr key={index}>
                <td>{airlines[delay.airline_iata]}</td>
                <td>{delay.flight_number}</td>
                <td>
                  {delay.delayed > 60
                    ? `${Math.floor(delay.delayed / 60)}h ${delay.delayed % 60}m`
                    : `${delay.delayed} mins`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default Delays;
