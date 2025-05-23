import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutDropdown.css';

const AboutDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="about-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/about" className="nav-button nav-button--default dropdown-trigger">
        ABOUT US
        <span className="dropdown-arrow">▼</span>
      </Link>
      
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/our-mission" className="dropdown-item">
            Our Mission
          </Link>
          <Link to="/our-board" className="dropdown-item">
            Our Board
          </Link>
        </div>
      )}
    </div>
  );
};

export default AboutDropdown; 