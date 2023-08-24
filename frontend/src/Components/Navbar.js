import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <span className="logo-text">POKE</span>
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/AirportDelays">Delays</Link>
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
