import React from 'react';
import './CSS/MapSearchBar.css'
import imagea from "../HomePage/Images/1.jpg";

function AirportSearchBar() {
    return (
        <div className="container">
            <main className="center">
                <h1>Airport Maps Search Page</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search..." />
                    <button>Go</button>
                </div>
                <div className="image-container">
                    {/* <img src={imagea} alt="Airport" /> */}
                </div>
            </main>
        </div>
    );
}

export default AirportSearchBar;
