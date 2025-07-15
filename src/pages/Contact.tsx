import React, { useState } from 'react';
import { SocialLink } from '@components';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields are filled
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission
      setTimeout(() => {
        // Log the form data (in a real app, this would be sent to a server)
        console.log('Contact form submitted:', formData);
        
        setSubmitMessage('Message sent.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
      console.error('Contact form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="board-title">Contact Us</h1>
          
          <p>Feel free to contact us if you have any questions or concerns!</p>
          
          <p>We are always open to corporate partnerships, events, and outside speakers. Reach out for further details.</p>
          
          <div className="contact-details">
            <a href="mailto:sjba@stern.nyu.edu" className="email-link">
            sjba@stern.nyu.edu
            </a>
            
            <div className="address">
              <p>44 West 4th Street</p>
              <p>New York, NY 10012</p>
            </div>
          </div>
          
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
        
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Name <span className="required">(required)</span>
              </label>
              <div className="name-fields">
                <div className="field-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">(required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                Message <span className="required">(required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : '→'}
            </button>
            
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('Message sent.') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 