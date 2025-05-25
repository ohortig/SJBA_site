import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import arrowIcon from '../assets/icons/arrow_top_right.png';
import goldmanSachsLogo from '../assets/logos/goldman_sachs_logo.png';
import jpmorganLogo from '../assets/logos/jpmorgan_logo.jpg';
import morganStanleyLogo from '../assets/logos/morgan_stanley_logo.jpg';
import blackstoneLogo from '../assets/logos/blackstone_logo.png';
import sequoiaLogo from '../assets/logos/sequoia_logo.png';
import mckinseyLogo from '../assets/logos/mckinsey_logo.jpg';
import ackmanZiffLogo from '../assets/logos/ackman_ziff_logo.jpg';
import axomPartnersLogo from '../assets/logos/axom_partners_logo.jpg';
import bankOfAmericaLogo from '../assets/logos/bank_of_america_logo.png';
import carterPierceLogo from '../assets/logos/carter_pierce_logo.png';
import cushmanWakefieldLogo from '../assets/logos/cushman_and_wakefield_logo.png';
import declarationPartnersLogo from '../assets/logos/declaration_partners_logo.jpg';
import deutscheBankLogo from '../assets/logos/deutsche_bank_logo.png';
import edenGlobalPartnersLogo from '../assets/logos/eden_global_partners_logo.jpeg';
import ftiConsultingLogo from '../assets/logos/FTI_consulting_logo.png';
import hsbcLogo from '../assets/logos/HSBC_logo.png';
import ibmLogo from '../assets/logos/IBM_logo.png';
import kkrLogo from '../assets/logos/KKR_logo.png';
import logosCapitalLogo from '../assets/logos/logos_capital_logo.png';
import palantirLogo from '../assets/logos/palantir.png';
import ubsLogo from '../assets/logos/UBS_logo.png';
import './Home.css';

const Home = () => {
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });
  const contentAnimation = useScrollAnimation({ threshold: 0.2 });
  const footerAnimation = useScrollAnimation({ threshold: 0.1 });

  // Updated logos with all available logo files
  const logos = [
    { name: 'Goldman Sachs', src: goldmanSachsLogo, hasImage: true },
    { name: 'JPMorgan Chase', src: jpmorganLogo, hasImage: true },
    { name: 'Morgan Stanley', src: morganStanleyLogo, hasImage: true },
    { name: 'Blackstone', src: blackstoneLogo, hasImage: true },
    { name: 'Sequoia Capital', src: sequoiaLogo, hasImage: true },
    { name: 'McKinsey & Company', src: mckinseyLogo, hasImage: true },
    { name: 'Ackman-Ziff', src: ackmanZiffLogo, hasImage: true },
    { name: 'Axom Partners', src: axomPartnersLogo, hasImage: true },
    { name: 'Bank of America', src: bankOfAmericaLogo, hasImage: true },
    { name: 'Carter Pierce', src: carterPierceLogo, hasImage: true },
    { name: 'Cushman & Wakefield', src: cushmanWakefieldLogo, hasImage: true },
    { name: 'Declaration Partners', src: declarationPartnersLogo, hasImage: true },
    { name: 'Deutsche Bank', src: deutscheBankLogo, hasImage: true },
    { name: 'Eden Global Partners', src: edenGlobalPartnersLogo, hasImage: true },
    { name: 'FTI Consulting', src: ftiConsultingLogo, hasImage: true },
    { name: 'HSBC', src: hsbcLogo, hasImage: true },
    { name: 'IBM', src: ibmLogo, hasImage: true },
    { name: 'KKR', src: kkrLogo, hasImage: true },
    { name: 'Logos Capital', src: logosCapitalLogo, hasImage: true },
    { name: 'Palantir', src: palantirLogo, hasImage: true },
    { name: 'UBS', src: ubsLogo, hasImage: true }
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
              {logo.hasImage ? (
                <>
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="company-logo"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.currentTarget;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        target.style.display = 'none';
                        fallback.style.display = 'block';
                      }
                    }}
                  />
                  <span className="logo-fallback" style={{ display: 'none' }}>
                    {logo.name}
                  </span>
                </>
              ) : (
                <span className="logo-text">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`set2-${index}`} className="logo-item">
              {logo.hasImage ? (
                <>
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="company-logo"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        target.style.display = 'none';
                        fallback.style.display = 'block';
                      }
                    }}
                  />
                  <span className="logo-fallback" style={{ display: 'none' }}>
                    {logo.name}
                  </span>
                </>
              ) : (
                <span className="logo-text">
                  {logo.name}
                </span>
              )}
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