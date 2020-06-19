import React from 'react';
import '../assets/main.scss';
import app_logo from '../assets/images/app-logo.png';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <ul className="navbar-items">
          <li className="app-logo"><img src={app_logo} alt="App Logo"/></li>
          <li className="app-title"><h4>Rick and Morty</h4></li>
          <li className="nav-link"><NavLink to='/characters'>Characters</NavLink></li>
          <li className="nav-link"><NavLink to='/locations'>Locations</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
