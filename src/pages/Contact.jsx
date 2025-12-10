import React, { useState } from 'react';
import { ValidationRegex, validateField } from '../utils/validation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactTypes = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'support', name: 'Customer Support' },
    { id: 'partnership', name: 'Partnership' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'complaint', name: 'Complaint' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation using regex
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      const nameValidation = validateField('name', formData.name.trim());
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.message;
      }
    }

    // Email validation using regex
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailValidation = validateField('email', formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.message;
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <section style={{
          background: 'linear-gradient(135deg, var(--success) 0%, #388e3c 100%)',
          color: 'white',
          padding: '6rem 5% 4rem',
          textAlign: 'center'
        }}>
          <div className="container">
            <div style={{ fontSize: '4rem', marginBottom: '2rem', color: 'white' }}>✓</div>
            <h1 style={{ marginBottom: '1rem' }}>Message Sent Successfully!</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              Send Another Message
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '6rem 5% 4rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Get in Touch</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ margin: 0 }}>Send us a Message</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div style={{
                    background: '#fef2f2',
                    color: 'var(--error)',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1.5rem'
                  }}>
                    {errors.submit}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Inquiry Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {contactTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && <div className="form-error">{errors.subject}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input ${errors.message ? 'error' : ''}`}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    style={{ resize: 'vertical' }}
                  />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Contact Information</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--primary)20',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'var(--primary)'
                    }}>
                      @
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email</div>
                      <div style={{ color: 'var(--gray-600)' }}>support@waveverse.com</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--primary)20',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'var(--primary)'
                    }}>
                      ☎
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Phone</div>
                      <div style={{ color: 'var(--gray-600)' }}>+91 9363752456</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--primary)20',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'var(--primary)'
                    }}>
                      ●
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Address</div>
                      <div style={{ color: 'var(--gray-600)' }}>
                        No. 45, Avinashi Road<br />
                        Peelamedu, Coimbatore - 641004
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--primary)20',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'var(--primary)'
                    }}>
                      ◐
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Business Hours</div>
                      <div style={{ color: 'var(--gray-600)' }}>
                        Mon - Fri: 8:00 AM - 8:00 PM<br />
                        Sat - Sun: 9:00 AM - 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Frequently Asked Questions</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                      How fast is delivery?
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      We offer express delivery in 30 minutes for most areas.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                      What's your return policy?
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      100% satisfaction guarantee. Contact us within 24 hours for any issues.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                      Do you deliver to my area?
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      Enter your zip code at checkout to see if we deliver to your location.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;