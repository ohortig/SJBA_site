import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import arrowIcon from '../assets/icons/arrow_top_right.png';
import './Home.css';

const Home = () => {
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });
  const contentAnimation = useScrollAnimation({ threshold: 0.2 });
  const footerAnimation = useScrollAnimation({ threshold: 0.1 });

  // Sample company logos - you can replace these with actual logo URLs
  const logos = [
    'Goldman Sachs',
    'JPMorgan Chase', 
    'Morgan Stanley',
    'Blackstone',
    'KKR',
    'Apollo',
    'Citigroup',
    'Bank of America',
    'Wells Fargo',
    'Deutsche Bank',
    'Barclays',
    'Credit Suisse',
    'UBS',
    'Rothschild & Co',
    'Lazard',
    'Evercore',
    'Moelis & Company',
    'Centerview Partners',
    'PJT Partners',
    'Guggenheim Partners'
  ];

  return (
    <div className="page-container">
      <div 
        ref={heroAnimation.elementRef}
        className={`hero-section slide-up ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        <h1 className="main-title">
          We bring together Jewish New York's professional community.
        </h1>
      </div>
      
      <div className="logo-gallery-container">
        <div className="logo-gallery">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={`set1-${index}`} className="logo-item">
              {logo}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`set2-${index}`} className="logo-item">
              {logo}
            </div>
          ))}
        </div>
      </div>

      <div 
        ref={speakersAnimation.elementRef}
        className={`speakers-link-section scale-in ${speakersAnimation.isVisible ? 'visible' : ''}`}
      >
        <Link to="/events" className="speakers-link">
          <span>Learn about our previous speakers</span>
          <img src={arrowIcon} alt="Arrow" className="speakers-link-arrow" />
        </Link>
      </div>

      {/* Section Divider */}
      <div className="section-divider"></div>

      <div 
        ref={contentAnimation.elementRef}
        className={`content-section ${contentAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="content-grid">
          <div className={`image-container slide-right ${contentAnimation.isVisible ? 'visible' : ''}`}>
            <div className="placeholder-image">
              <span>Previous Session Image</span>
            </div>
          </div>
          
          <div className={`text-container slide-left ${contentAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="section-title">
              Come learn about the Jewish impact on the business world
            </h2>
            
            <div className="section-content">
              <p>
                The Jewish community has played a pivotal role in shaping modern business 
                and finance. From pioneering investment banking to revolutionary 
                entrepreneurship, Jewish professionals have left an indelible mark on 
                industries worldwide. At SJBA, we celebrate this rich heritage while 
                building the next generation of Jewish business leaders.
              </p>
              
              <p>
                Our organization provides a platform for networking, mentorship, and 
                professional development within NYU's vibrant Jewish community. Through 
                exclusive events, speaker series, and industry connections, we help 
                members understand their cultural legacy while preparing them for 
                successful careers in finance, consulting, technology, and beyond.
              </p>
              
              <div className="join-button-container">
                <Link to="/contact" className="join-button">
                  <span>Join us</span>
                  <img src={arrowIcon} alt="Arrow" className="join-button-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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
                  {/* LinkedIn logo will go here */}
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
                  {/* Instagram logo will go here */}
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
            <p>Copyright © 2025 Stern Jewish Business Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;