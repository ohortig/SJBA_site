import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';
import './AboutDropdown.css';

interface AboutDropdownProps {
  onClose?: () => void;
}

export const AboutDropdown = ({ onClose }: AboutDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(1024);

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
        <Link
          to="/our-mission"
          className="nav-button nav-button--default"
          onClick={handleLinkClick}
        >
          OUR MISSION
        </Link>
        <Link to="/our-board" className="nav-button nav-button--default" onClick={handleLinkClick}>
          OUR BOARD
        </Link>
        <Link
          to="/our-members"
          className="nav-button nav-button--default"
          onClick={handleLinkClick}
        >
          OUR MEMBERS
        </Link>
      </>
    );
  }

  // On desktop, render dropdown
  return (
    <div className="about-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="nav-button nav-button--default dropdown-trigger">
        ABOUT US
        <span className="dropdown-arrow">▼</span>
      </span>

      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/our-mission" className="dropdown-item" onClick={handleLinkClick}>
            Our Mission
          </Link>
          <Link to="/our-board" className="dropdown-item" onClick={handleLinkClick}>
            Our Board
          </Link>
          <Link to="/our-members" className="dropdown-item" onClick={handleLinkClick}>
            Our Members
          </Link>
        </div>
      )}
    </div>
  );
};
