import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import logoImage from "../Images/logo.png";

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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/AirlineInfo">Airline Info</Link>
        </li>
        <li>
          <Link to="/Airports">Airports</Link>
        </li>
        <li>
          <Link to="/Other">Other</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
