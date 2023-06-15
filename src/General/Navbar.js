import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import the PNG icon file
import icon from '../Planets/meteore.png';

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-icon">
          <img src={icon} alt="Icon" />
          <h1>Meteo(re)</h1>
        </div>
        <div>
        <ul>
          <li>
            <Link to="/la-meteore">Accueil</Link>
          </li>
          <li>
            <Link to="/planets">Planètes</Link>
          </li>
          <li>
            <Link to="/apod">Picture of the day</Link>
          </li>
          <li>
            <Link to="/game">A little game ?</Link>
          </li>

        </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
