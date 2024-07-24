import React from 'react';
import './Header.css';
// Header.js


const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">Stock Portfolio Tracker</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#" className="nav-link">Home</a></li>
            <li><a href="#" className="nav-link">Portfolio</a></li>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Sign Up/Login</a></li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;