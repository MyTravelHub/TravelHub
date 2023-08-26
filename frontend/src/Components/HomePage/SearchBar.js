import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

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
        <button className="search-bttn" type="submit">Search</button>
      </form>
      <p>{searchStatus}</p>
    </div>
  );
};

export default SearchBar;
