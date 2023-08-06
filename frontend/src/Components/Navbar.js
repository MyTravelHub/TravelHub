import React from 'react';
import '../CSS/Navbar.css';
import logoImage from '../Images/logo.png';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <img src={logoImage} alt="TravelHub" />
        </a>
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
