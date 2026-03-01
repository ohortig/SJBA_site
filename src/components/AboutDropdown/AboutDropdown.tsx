import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';
import './AboutDropdown.css';

interface AboutDropdownProps {
  onClose?: () => void;
}

const dropdownVariants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 },
};

export const AboutDropdown = ({ onClose }: AboutDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(1024);
  const shouldReduceMotion = useReducedMotion();

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

  return (
    <div className="about-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="nav-button nav-button--default dropdown-trigger">
        ABOUT US
        <motion.span
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
        >
          ▼
        </motion.span>
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          >
            <Link to="/our-mission" className="dropdown-item" onClick={handleLinkClick}>
              Our Mission
            </Link>
            <Link to="/our-board" className="dropdown-item" onClick={handleLinkClick}>
              Our Board
            </Link>
            <Link to="/our-members" className="dropdown-item" onClick={handleLinkClick}>
              Our Members
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
