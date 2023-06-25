import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import icon from '../Planets/meteore.png';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='toutNavbar'>
      
    <nav className={`navbar ${isActive ? 'active' : ''}`}>
      <div className={`navbar-icon ${isActive ? 'to-align' : ''}`}>
        <img src={icon} alt="Icon" />
        <h1>Meteo(re)</h1>
      </div>
      <div className={`hamburger ${isActive ? 'active to-align' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
        <div className="navbar-none">
          <ul className="nav-menu">
            <li className="nav-link">
              <Link to="/la-meteore" onClick={toggleMenu}>
                Accueil
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/planets" onClick={toggleMenu}>
                Planètes
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/apod" onClick={toggleMenu}>
                Picture of the day
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/game" onClick={toggleMenu}>
                A little game ?
              </Link>
            </li>
          </ul>
        </div>

    </nav>
    {isActive && (
        <div className="mobile-menu">
          <ul className="nav-menu">
            <li className="nav-link">
              <Link style={{color:"white", textDecoration:"none"}} to="/la-meteore" onClick={toggleMenu}>
                Accueil
              </Link>
            </li>
            <li className="nav-link">
              <Link style={{color:"white", textDecoration:"none"}} to="/planets" onClick={toggleMenu}>
                Planètes
              </Link>
            </li>
            <li className="nav-link">
              <Link style={{color:"white", textDecoration:"none"}} to="/apod" onClick={toggleMenu}>
                Picture of the day
              </Link>
            </li>
            <li id="le-dernier" className="nav-link">
              <Link style={{color:"white", textDecoration:"none"}} to="/game" onClick={toggleMenu}>
                A little game ?
              </Link>
            </li>
          </ul>
        </div>
      )}
    
    </div>
    
  );
}

export default Navbar;
