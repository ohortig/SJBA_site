import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@hooks';
import { Footer, LogoGallery } from '@components';
import './Home.css';

export const Home = () => {
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });

  // Newsletter form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Gallery rotation state
  const [currentImage, setCurrentImage] = useState(1);

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev >= 4 ? 1 : prev + 1));
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

  // Newsletter form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateNYUEmail = (email: string): boolean => {
    const nyuEmailPattern = /^[a-zA-Z0-9._%+-]+@(.*\.)?nyu\.edu$/;
    return nyuEmailPattern.test(email);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setSubmitMessage('Please fill out all fields.');
      return;
    }

    // Validate NYU email
    if (!validateNYUEmail(formData.email)) {
      setSubmitMessage('Please use a valid NYU email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Define the signup type
      interface NewsletterSignup {
        firstName: string;
        lastName: string;
        email: string;
        timestamp: string;
        id: number;
      }

      // Get existing signups from localStorage
      const existingSignupsJson = localStorage.getItem('sjba-newsletter-signups');
      let signups: NewsletterSignup[] = [];

      if (existingSignupsJson) {
        signups = JSON.parse(existingSignupsJson) as NewsletterSignup[];
      }

      // Check if email already exists
      const emailExists = signups.some(
        (signup) => signup.email.toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (emailExists) {
        setSubmitMessage('This email is already subscribed to our newsletter.');
        setIsSubmitting(false);
        return;
      }

      // Add new signup with timestamp
      const newSignup: NewsletterSignup = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        timestamp: new Date().toISOString(),
        id: Date.now(), // Simple ID generation
      };

      signups.push(newSignup);

      // Save to localStorage
      localStorage.setItem('sjba-newsletter-signups', JSON.stringify(signups));

      // Also log to console for development purposes
      console.log('Newsletter signup:', newSignup);
      console.log('All signups stored in localStorage:', signups);

      setSubmitMessage('Successfully signed up for the newsletter!');
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    handleNewsletterSubmit(e);
  };

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
            <span className="title-line-2">NYU Stern</span>
          </h1>
        </div>

        <div
          ref={speakersAnimation.elementRef}
          className={`link-section scale-in ${speakersAnimation.isVisible ? 'visible' : ''}`}
        >
          <Link to="/our-mission" className="our-mission-link">
            <span>Our Mission</span>
            <img src="/icons/arrow_top_right.png" alt="Arrow" className="our-mission-link-arrow" />
          </Link>
          <Link to="/events" className="speakers-link">
            <span>Our Previous Speakers</span>
            <img src="/icons/arrow_top_right.png" alt="Arrow" className="speakers-link-arrow" />
          </Link>
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

      <div className="section-divider"></div>

      <div className="split-content-container">
        <div className="content-section">
          <div className="text-container">
            <h2 className="section-title">The Jewish impact on the business world</h2>

            <div className="section-content">
              <p>
                The Jewish community has played a pivotal role in shaping modern business and
                finance. From pioneering investment banking to revolutionary entrepreneurship,
                Jewish professionals have left an indelible mark on industries worldwide. At SJBA,
                we celebrate this rich heritage while building the next generation of Jewish
                business leaders.
              </p>

              <p>
                Our organization provides a platform for networking, mentorship, and professional
                development within NYU's vibrant Jewish community. Through exclusive events, speaker
                series, and industry connections, we help members understand their cultural legacy
                while preparing them for successful careers in finance, consulting, technology, and
                beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-header">
              <img src="sjba_logo_clear.png" alt="SJBA Logo" className="newsletter-logo" />
              <h2>Join Our Newsletter</h2>
            </div>
            <p>
              Stay connected with SJBA and receive updates about upcoming events, speaker series,
              and opportunities exclusively for NYU students.
            </p>

            <form onSubmit={handleFormSubmit} className="newsletter-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group email-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="form-input email-input"
                  required
                />
                <button type="submit" className="newsletter-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing up...' : '→'}
                </button>
              </div>
              {submitMessage && (
                <div
                  className={`submit-message ${submitMessage.includes('Successfully') ? 'success' : 'error'}`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
