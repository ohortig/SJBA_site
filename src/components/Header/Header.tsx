import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavButton, AboutDropdown } from '@components';
import './Header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/sjba_logo_full.png" alt="SJBA Logo" className="logo-image" />
          </Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
          <NavButton to="/events" onClick={closeMenu}>EVENTS</NavButton>
          <NavButton to="/programs" onClick={closeMenu}>PROGRAMS</NavButton>
          <AboutDropdown onClose={closeMenu} />
          <NavButton to="/contact" variant="primary" onClick={closeMenu}>CONTACT US</NavButton>
        </div>
      </nav>
    </header>
  );
};