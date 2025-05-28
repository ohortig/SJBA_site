import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Footer from '../components/Footer';
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
          Building Jewish Community at NYU. Developing Future Leaders.
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

      <Footer />
    </div>
  );
};

export default Home;