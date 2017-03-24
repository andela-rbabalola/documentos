import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';


const Header = () => (
  <nav>
    <div className="nav-wrapper">
      <IndexLink to="/" className="brand-logo">Documentos</IndexLink>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  </nav>
  );

export default Header;
