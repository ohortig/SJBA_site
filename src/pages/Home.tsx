import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });
  const contentAnimation = useScrollAnimation({ threshold: 0.2 });

  const logos = [
    { name: 'Goldman Sachs', src: '/logos/goldman_sachs_logo.png', hasImage: true },
    { name: 'JPMorgan Chase', src: '/logos/jpmorgan_logo.jpg', hasImage: true },
    { name: 'Morgan Stanley', src: '/logos/morgan_stanley_logo.jpg', hasImage: true },
    { name: 'Blackstone', src: '/logos/blackstone_logo.png', hasImage: true },
    { name: 'Sequoia Capital', src: '/logos/sequoia_logo.png', hasImage: true },
    { name: 'McKinsey & Company', src: '/logos/mckinsey_logo.jpg', hasImage: true },
    { name: 'Ackman-Ziff', src: '/logos/ackman_ziff_logo.jpg', hasImage: true },
    { name: 'Axom Partners', src: '/logos/axom_partners_logo.jpg', hasImage: true },
    { name: 'Bank of America', src: '/logos/bank_of_america_logo.png', hasImage: true },
    { name: 'Carter Pierce', src: '/logos/carter_pierce_logo.png', hasImage: true },
    { name: 'Cushman & Wakefield', src: '/logos/cushman_and_wakefield_logo.png', hasImage: true },
    { name: 'Declaration Partners', src: '/logos/declaration_partners_logo.jpg', hasImage: true },
    { name: 'Deutsche Bank', src: '/logos/deutsche_bank_logo.png', hasImage: true },
    { name: 'Eden Global Partners', src: '/logos/eden_global_partners_logo.jpeg', hasImage: true },
    { name: 'FTI Consulting', src: '/logos/FTI_consulting_logo.png', hasImage: true },
    { name: 'HSBC', src: '/logos/HSBC_logo.png', hasImage: true },
    { name: 'IBM', src: '/logos/IBM_logo.png', hasImage: true },
    { name: 'KKR', src: '/logos/KKR_logo.png', hasImage: true },
    { name: 'Logos Capital', src: '/logos/logos_capital_logo.png', hasImage: true },
    { name: 'Palantir', src: '/logos/palantir.png', hasImage: true },
    { name: 'UBS', src: '/logos/UBS_logo.png', hasImage: true }
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
          <img src="/icons/arrow_top_right.png" alt="Arrow" className="speakers-link-arrow" />
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
                  <img src="/icons/arrow_top_right.png" alt="Arrow" className="join-button-arrow" />
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