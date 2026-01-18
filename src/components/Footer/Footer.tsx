import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@hooks';
import { SocialLink } from '@components';
import './Footer.css';

export const Footer = () => {
  const footerAnimation = useScrollAnimation({ threshold: 0.02 });

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
            <Link to="/events">Events & Speakers</Link>
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
            <SocialLink
              href="https://www.linkedin.com/company/sjba/"
              platform="linkedin"
              name="LinkedIn"
              handle="@sjba"
              iconSrc="/logos/linkedin_logo.png"
              alt="LinkedIn"
            />
            <SocialLink
              href="https://www.instagram.com/nyusjba/"
              platform="instagram"
              name="Instagram"
              handle="@nyusjba"
              iconSrc="/logos/instagram_logo.png"
              alt="Instagram"
            />
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
          <p>Copyright © {new Date().getFullYear()} Stern Jewish Business Association.<br />
             All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};