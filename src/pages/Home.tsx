import React from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../assets/icons/arrow_top_right.png';
import './Home.css';

const Home = () => {
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
      <div className="hero-section">
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

      <div className="speakers-link-section">
        <Link to="/events" className="speakers-link">
          <span>Learn about our previous speakers</span>
          <img src={arrowIcon} alt="Arrow" className="speakers-link-arrow" />
        </Link>
      </div>

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <div className="placeholder-image">
              <span>Previous Session Image</span>
            </div>
          </div>
          
          <div className="text-container">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;