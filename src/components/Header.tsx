import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/sjba_logo.jpeg';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SJBA Logo" className="logo-image" />
          </Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/e-board">E-Board</Link></li>
          <li><Link to="/programs">Programs</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 