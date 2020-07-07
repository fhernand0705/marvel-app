import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
          <li className="nav-item">
            <NavLink to='/characters' className="nav-item-link">
              Characters
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/locations' className="nav-item-link">
              Locations
            </NavLink>
          </li>
          <li className="col"></li>
          <li className="dropdown-wrapper">
            <NavDropdown title="Get Schwifty" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">
                <NavLink to='/characters' className="dropdown-item">Characters</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">
                <NavLink to='/locations' className="dropdown-item">Locations</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
