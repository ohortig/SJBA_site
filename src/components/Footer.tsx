import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Footer.css';

const Footer = () => {
  const footerAnimation = useScrollAnimation({ threshold: 0.05 });

  return (
    <footer 
      ref={footerAnimation.elementRef}
      className={`footer-section fade-in ${footerAnimation.isVisible ? 'visible' : ''}`}
    >
      <div className="footer-content">
        <div className={`footer-links stagger-children ${footerAnimation.isVisible ? 'visible' : ''}`}>
          <div className="footer-column stagger-item">
            <h3>Programs</h3>
            <Link to="/programs">All Programs</Link>
          </div>
          
          <div className="footer-column stagger-item">
            <h3>Events</h3>
            <Link to="/events">Upcoming Events</Link>
            <Link to="/events">Past Speakers</Link>
          </div>
          
          <div className="footer-column stagger-item">
            <h3>About Us</h3>
            <Link to="/about">Overview</Link>
            <Link to="/our-mission">Our Mission</Link>
            <Link to="/our-board">Our Board</Link>
          </div>
          
          <div className="footer-column stagger-item">
            <h3>Connect</h3>
            <Link to="/contact">Contact Us</Link>
            <Link to="/contact">Join SJBA</Link>
          </div>
        </div>
        
        <div className={`footer-social slide-left ${footerAnimation.isVisible ? 'visible' : ''}`}>
          <h3>Where to find us</h3>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/company/sjba/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <div className="social-icon-placeholder">
                <img src="/logos/linkedin_logo.png" alt="LinkedIn" className="social-icon" />
              </div>
              <div className="social-text">
                <span className="social-name">LinkedIn</span>
                <span className="social-handle">@sjba</span>
              </div>
            </a>
            
            <a 
              href="https://www.instagram.com/nyusjba/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <div className="social-icon-placeholder">
                <img src="/logos/instagram_logo.png" alt="Instagram" className="social-icon" />
              </div>
              <div className="social-text">
                <span className="social-name">Instagram</span>
                <span className="social-handle">@nyusjba</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-address">
          <p>
            Stern Jewish Business Association<br />
            44 West 4th Street<br />
            New York, NY 10012 USA
          </p>
        </div>
        
        <div className="footer-copyright">
          <p>Copyright © 2025 Stern Jewish Business Association.<br />
             All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 