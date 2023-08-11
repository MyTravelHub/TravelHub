import React, { useState } from 'react';
import './CSS/SearchBar.css';

const SearcBar = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/search?q=${query}`);
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar" style={{ backgroundColor: '#cecece' }}>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="I need to find..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div>{answer}</div>
      </div>
    </div>
  );
};

export default SearcBar;
