import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="website-name">Horizon Hospitals</h1>
      </div>
      <div className="header-right">
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#departments">Departments</a>
          <a href="#blog">Blog</a>
          <a href="#doctors">Doctors</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
