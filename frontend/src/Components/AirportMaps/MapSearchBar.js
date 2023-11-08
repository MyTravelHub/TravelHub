import React, { useState } from 'react';
import './CSS/MapSearchBar.css'
import imagea from "../HomePage/Images/1.jpg";

function AirportSearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Search term:', searchTerm);
    };

    return (
        <div className="container">
            <main className="center">
                <h1>Airport Maps Search Page</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Go</button>
                </div>
                <div className="image-container">
                    {/* <img src={imagea} alt="Airport" /> */}
                    {/* Display Google Maps here, e.g., <div id="map"></div> */}
                </div>
            </main>
        </div>
    );
}

export default AirportSearchBar;
