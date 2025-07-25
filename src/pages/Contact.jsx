import React, { useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  
  const handleSubmit = useCallback(async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please fill in all required fields'
      });
      return;
    }

    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch{
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  }, [formData]);

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="hero-content">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-subtitle">
            Ready to start your fitness journey? We're here to help you every step of the way.
          </p>
        </div>
        <div className="hero-gradient"></div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Let's Connect</h2>
          <p>
            Have questions about Fitzen? Want to share feedback or need support? 
            We'd love to hear from you!
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">
                <Mail size={24} />
              </div>
              <div className="method-info">
                <h3>Email Us</h3>
                <p>support@fitzen.app</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">
                <Phone size={24} />
              </div>
              <div className="method-info">
                <h3>Call Us</h3>
                <p>+91 9876543210</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">
                <MapPin size={24} />
              </div>
              <div className="method-info">
                <h3>Visit Us</h3>
                <p>Rishihood University<br />Delhi NCR, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="contact-form">
            <h2>Send us a Message</h2>
            
            {formStatus.error && (
              <div className="form-message error">
                <AlertCircle size={20} />
                <span>{formStatus.error}</span>
              </div>
            )}
            
            {formStatus.isSubmitted && (
              <div className="form-message success">
                <CheckCircle size={20} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button 
              type="button" 
              className="submit-btn"
              disabled={formStatus.isSubmitting}
              onClick={handleSubmit}
            >
              {formStatus.isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;