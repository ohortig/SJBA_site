import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@hooks';
import { Footer, LogoGallery, NewsletterSignup } from '@components';
import './Home.css';

export const Home = () => {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });
  const contentAnimation = useScrollAnimation({ threshold: 0.2 });

  // Gallery rotation state
  const [currentImage, setCurrentImage] = useState(1);

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev >= 4 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle navigation dot clicks
  const handleDotClick = (imageNumber: number) => {
    setCurrentImage(imageNumber);
  };

  // Update active states
  useEffect(() => {
    // Update gallery images
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.nav-dot');
    
    images.forEach((img, index) => {
      if (index + 1 === currentImage) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    dots.forEach((dot, index) => {
      if (index + 1 === currentImage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }, [currentImage]);


  return (
    <div className="page-container">
      <div 
        ref={heroAnimation.elementRef}
        className={`hero-section slide-up ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        {/* Rotating Gallery Background */}
        <div className="rotating-gallery-background">
          <div className="gallery-image-container">
            <div className="gallery-image active" data-image="1">
              <img src="/gallery/sjba-gallery-1.JPG" alt="SJBA Community Building" />
            </div>
            <div className="gallery-image" data-image="2">
              <img src="/gallery/sjba-gallery-2.JPG" alt="SJBA Professional Development" />
            </div>
            <div className="gallery-image" data-image="3">
              <img src="/gallery/sjba-gallery-3.JPG" alt="SJBA Networking Excellence" />
            </div>
            <div className="gallery-image" data-image="4">
              <img src="/gallery/sjba-gallery-4.JPG" alt="SJBA Leadership Growth" />
            </div>
          </div>
          <div className="gallery-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          {/* Main Title */}
          <h1 className="main-title">
            <span className="title-line-1">Building Jewish Community</span>
            <span className="title-connector">at</span>
            <span className="title-line-2">NYU</span>
          </h1>
        </div>

        {/* Gallery Navigation Dots */}
        <div className="gallery-navigation">
          <div className="nav-dot active" data-target="1" onClick={() => handleDotClick(1)}></div>
          <div className="nav-dot" data-target="2" onClick={() => handleDotClick(2)}></div>
          <div className="nav-dot" data-target="3" onClick={() => handleDotClick(3)}></div>
          <div className="nav-dot" data-target="4" onClick={() => handleDotClick(4)}></div>
        </div>
      </div>

      <LogoGallery />

      <div 
        ref={speakersAnimation.elementRef}
        className={`speakers-link-section scale-in ${speakersAnimation.isVisible ? 'visible' : ''}`}
      >
        <Link to="/events" className="speakers-link">
          <span>Learn about our previous speakers</span>
          <img src="/icons/arrow_top_right.png" alt="Arrow" className="speakers-link-arrow" />
        </Link>
      </div>

      <div className="section-divider"></div>

      <div 
        ref={contentAnimation.elementRef}
        className={`content-section ${contentAnimation.isVisible ? 'visible' : ''}`}
      >
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
              <div className="join-board-buttons">
                <Link to="/contact" className="join-board-btn primary">
                  <span>Join Us</span>
                  <img src="/icons/arrow_top_right.png" alt="Arrow" className="join-board-btn-arrow" />
                </Link>
                <Link to="/OurMission" className="join-board-btn secondary">
                  <span>Our Mission</span>
                  <img src="/icons/arrow_top_right.png" alt="Arrow" className="join-board-btn-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      <NewsletterSignup />

      <Footer />
    </div>
  );
};