import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutDropdown.css';

interface AboutDropdownProps {
  onClose?: () => void;
}

export const AboutDropdown = ({ onClose }: AboutDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // On mobile, render separate menu items
  if (isMobile) {
    return (
      <>
        <Link to="/about" className="nav-button nav-button--default" onClick={handleLinkClick}>
          ABOUT US
        </Link>
        <Link to="/our-mission" className="nav-button nav-button--default" onClick={handleLinkClick}>
          OUR MISSION
        </Link>
        <Link to="/our-board" className="nav-button nav-button--default" onClick={handleLinkClick}>
          OUR BOARD
        </Link>
      </>
    );
  }

  // On desktop, render dropdown
  return (
    <div 
      className="about-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/about" className="nav-button nav-button--default dropdown-trigger" onClick={handleLinkClick}>
        ABOUT US
        <span className="dropdown-arrow">▼</span>
      </Link>
      
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/our-mission" className="dropdown-item" onClick={handleLinkClick}>
            Our Mission
          </Link>
          <Link to="/our-board" className="dropdown-item" onClick={handleLinkClick}>
            Our Board
          </Link>
        </div>
      )}
    </div>
  );
};