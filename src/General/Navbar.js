import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import the PNG icon file
import icon from '../Planets/meteore.png';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-icon">
          <img src={icon} alt="Icon" />
          <h1>Meteo(re)</h1>
        </div>
  
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isActive ? 'active' : ''}`}></span>
          <span className={`bar ${isActive ? 'active' : ''}`}></span>
          <span className={`bar ${isActive ? 'active' : ''}`}></span>
        </div>
        <ul className={`nav-menu ${isActive ? 'active' : ''}`}>
          <li className="nav-link" onClick={closeMenu}>
            <Link to="/la-meteore">Accueil</Link>
          </li>
          <li className="nav-link" onClick={closeMenu}>
            <Link to="/planets">Planètes</Link>
          </li>
          <li className="nav-link" onClick={closeMenu}>
            <Link to="/apod">Picture of the day</Link>
          </li>
          <li className="nav-link" onClick={closeMenu}>
            <Link to="/game">A little game ?</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
