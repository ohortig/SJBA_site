import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/sjba_logo_full.png';
import NavButton from './NavButton';
import AboutDropdown from './AboutDropdown';
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

        <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
          <NavButton to="/events">EVENTS</NavButton>
          <NavButton to="/programs">PROGRAMS</NavButton>
          <AboutDropdown />
          <NavButton to="/contact" variant="primary">CONTACT US</NavButton>
        </div>
      </nav>
    </header>
  );
};

export default Header; 