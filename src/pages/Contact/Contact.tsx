import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { SocialLink } from '@components';
import { dataService } from '@api';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form and return errors
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Send data to backend
      await dataService.contact.submitContactForm({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        message: formData.message.trim(),
      });

      // Show success toast
      toast.success('Message sent successfully!');

      // Clear the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="contact-title">Contact Us</h1>
          <p>Feel free to contact us if you have any questions or concerns!</p>
          <p>
            We are always open to corporate partnerships, events, and outside speakers. Reach out
            for further details.
          </p>

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
              iconSrc="/icons/linkedin-logo.png"
              alt="LinkedIn"
            />
            <SocialLink
              href="https://www.instagram.com/nyusjba/"
              platform="instagram"
              name="Instagram"
              handle="@nyusjba"
              iconSrc="/icons/instagram-logo.png"
              alt="Instagram"
            />
          </div>
        </div>

        <div className="contact-form">
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
          >
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
                    className={errors.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="field-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
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
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
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
                className={errors.message ? 'input-error' : ''}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? '...' : '→'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
