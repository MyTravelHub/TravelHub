import React from 'react';
import '../CSS/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">TravelHub</a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/destinations">Destinations</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
