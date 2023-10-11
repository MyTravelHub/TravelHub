// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import axios from 'axios';

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchStatus, setSearchStatus] = useState('');
//   const [airportSuggestions, setAirportSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const validateSearchQuery = (query) => {
//     return query.length >= 3 && query.length <= 30;
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion.name);
//     setAirportSuggestions([]); // Close the suggestion list when a suggestion is clicked
//   };

//   useEffect(() => {
//     const fetchAirportSuggestions = async () => {
//       if (!validateSearchQuery(searchQuery)) {
//         setAirportSuggestions([]);
//         return;
//       }

//       try {
//         const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
//         const response = await axios.get(
//           `https://airlabs.co/api/v9/suggest?q=${searchQuery}&api_key=${apiKey}`
//         );

//         if (response.data.airports) {
//           const airportSuggestions = response.data.airports.map((airport) => ({
//             name: `${airport.name} ${airport.iata_code} Delays`,
//           }));
//           setAirportSuggestions(airportSuggestions);
//         } else {
//           setAirportSuggestions([]);
//         }

//         // Console log the API response
//         console.log('API Response:', response.data);
//       } catch (error) {
//         console.error('Error fetching airport suggestions', error);
//       }
//     };

//     if (searchQuery) {
//       fetchAirportSuggestions();
//     } else {
//       setAirportSuggestions([]);
//     }
//   }, [searchQuery]);

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateSearchQuery(searchQuery)) {
//       setSearchStatus('Search query must be between 3 and 30 characters');
//       return;
//     }

//     if (searchQuery.toLowerCase().includes('delays')) {
//       const airportCode = searchQuery.match(/\b[A-Z]{3}\b/);
//       if (airportCode) {
//         const airportCodeString = airportCode[0];
//         navigate(`/AirportDelays/${airportCodeString}`);
//       } else {
//         setSearchStatus('Invalid airport code');
//       }
//     } else {
//       try {
//         const selectedAirport = airportSuggestions.find(
//           (airport) => airport.name === searchQuery
//         );

//         if (selectedAirport) {
//           setSearchStatus(`Selected: ${selectedAirport.name}`);
//         } else {
//           setSearchStatus('No matching airport found');
//         }
//       } catch (error) {
//         setSearchStatus('Error processing search');
//       }
//     }
//   };

//   return (
//     <div className="search-bar">
//       <form onSubmit={handleSearchSubmit}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={8}>
//             <Box
//               sx={{
//                 width: '100%',
//               }}
//             >
//               <TextField
//                 fullWidth
//                 label="Search Anything Here"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoComplete="on"
//               />
//               {airportSuggestions.length > 0 && (
//                 <div className="suggestions">
//                   {airportSuggestions.map((suggestion, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleSuggestionClick(suggestion)}
//                       className="suggestion-item"
//                     >
//                       {suggestion.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Box>
//           </Grid>
//           <Grid item xs={4}>
//             <Button
//               variant="contained"
//               className="search-bttn"
//               type="submit"
//               fullWidth
//             >
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <p>{searchStatus}</p>
//     </div>
//   );
// };

// export default SearchBar;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';

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
    setAirportSuggestions([]); // Close the suggestion list when a suggestion is clicked
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
        // Send the query to the backend if "delay" or "delays" is not in the query
        const response = await axios.post('http://localhost:5000/search', {
          query: searchQuery,
        });

        // Handle the response from the backend as needed
        console.log('Backend Response:', response.data);

        setSearchStatus('Search query sent to the backend');
      } catch (error) {
        setSearchStatus('Error sending query to the backend');
      }
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TextField
                fullWidth
                label="Search Anything Here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="on"
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
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="search-bttn"
              type="submit"
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <p>{searchStatus}</p>
    </div>
  );
};

export default SearchBar;
