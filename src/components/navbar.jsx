import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to='/characters'>Characters</NavLink></li>
        <li><NavLink to='/locations'>Locations</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
