import React, { useState } from 'react';
import { useScrollAnimation } from '@hooks';
import { dataService } from '../../api/dataService';
import type { NewsletterSignup as NewsletterSignupType } from '../../types/NewsletterSignup';
import './NewsletterSignup.css';

interface NewsletterFormData {
  firstName: string;
  lastName: string;
  year: string;
  college: string;
  email: string;
}

export const NewsletterSignup: React.FC = () => {
  const newsletterAnimation = useScrollAnimation({ threshold: 0.2 });

  // Newsletter form state
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: '',
    lastName: '',
    year: '',
    college: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Newsletter form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateNYUEmail = (email: string): boolean => {
    const nyuEmailPattern = /^[a-zA-Z0-9._%+-]+@(.*\.)?nyu\.edu$/;
    return nyuEmailPattern.test(email);
  };

  const validateYear = (year: string): boolean => {
    const trimmedYear = year.trim();
    return /^\d{4}$/.test(trimmedYear);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitNewsletter();
  };

  const submitNewsletter = async () => {
    // Validate all fields are filled
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.year.trim() || !formData.college.trim() || !formData.email.trim()) {
      setSubmitMessage('Please fill out all fields.');
      return;
    }

    // Validate NYU email
    if (!validateNYUEmail(formData.email)) {
      setSubmitMessage('Please use a valid NYU email address.');
      return;
    }

    // Validate year
    if (!validateYear(formData.year)) {
      setSubmitMessage('Please enter a valid graduation year');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const signupData: NewsletterSignupType = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        year: formData.year.trim(),
        college: formData.college.trim(),
        email: formData.email.trim().toLowerCase()
      };

      const response = await dataService.newsletter.signup(signupData);
      
      if (response.success) {
        setSubmitMessage('Successfully signed up for the newsletter!');
        setFormData({ firstName: '', lastName: '', year: '', college: '', email: '' });
      } else {
        setSubmitMessage(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('409') || error.message.toLowerCase().includes('already')) {
          setSubmitMessage('This email is already subscribed to our newsletter.');
        } else if (error.message.includes('400')) {
          setSubmitMessage('Please check your information and try again.');
        } else {
          setSubmitMessage('An error occurred. Please try again.');
        }
      } else {
        setSubmitMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={newsletterAnimation.elementRef}
      className={`newsletter-section ${newsletterAnimation.isVisible ? 'visible' : ''}`}
    >
      <div className="newsletter-content">
        <div className="newsletter-header">
          <img src="sjba_logo_clear.png" alt="SJBA Logo" className="newsletter-logo" />
          <h2>Join Our Newsletter</h2>
        </div>
        <p>
          Stay connected with SJBA and receive updates about upcoming events, 
          speaker series, and opportunities exclusively for NYU students.
        </p>
        
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
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
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Graduation year"
                  className="form-input"
                  pattern="^(20[2-3][0-9])$"
                  title="Enter your graduation year"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="" disabled>Select college</option>
                  <option value="CAS">College of Arts & Science</option>
                  <option value="Stern">Stern School of Business</option>
                  <option value="Tandon">Tandon School of Engineering</option>
                  <option value="LS">Liberal Studies</option>
                  <option value="GLS">Global Liberal Studies</option>
                  <option value="Steinhardt">Steinhardt School</option>
                  <option value="Tisch">Tisch School of the Arts</option>
                  <option value="Gallatin">Gallatin School</option>
                  <option value="Silver">Silver School of Social Work</option>
                  <option value="Nursing">Rory Meyers College of Nursing</option>
                  <option value="Dentistry">College of Dentistry</option>
                  <option value="Global">NYU Global Programs</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group email-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="NYU email address"
                className="form-input email-input"
                required
              />
              <button 
                type="submit" 
                className="newsletter-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : '→'}
              </button>
            </div>
          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('Successfully') ? 'success' : 'error'}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
