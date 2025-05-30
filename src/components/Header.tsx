import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavButton from './NavButton';
import AboutDropdown from './AboutDropdown';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src="/sjba_logo_full.png" alt="SJBA Logo" className="logo-image" />
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