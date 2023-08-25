import React, { useState } from 'react';

const SearchBar = () => {
  // State to store the search query and search status
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Function to handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the backend's /search route
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }), // Send the search query in the request body
      });

      // Update search status based on the response
      if (response.ok) {
        setSearchStatus('Query sent to backend');
      } else {
        setSearchStatus('Failed to send query');
      }
    } catch (error) {
      setSearchStatus('Error sending query');
    }
  };

  return (
    <div>
      {/* Form to capture user's search query */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button type="submit">Search</button>
      </form>
      {/* Display search status */}
      <p>{searchStatus}</p>
    </div>
  );
};

export default SearchBar;
