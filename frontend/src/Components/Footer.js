import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <div className="Footer-Container">
      <div className="footer-links">
        <ul>
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
      </div>
      <div className="footer-info">
        <p>Contact us at: example@email.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      <div className="footer-social">
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} POKE Travel Hub. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
