import React, { useState } from 'react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'other'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'orders', name: 'Orders & Delivery', icon: '📦' },
    { id: 'payment', name: 'Payment & Billing', icon: '💳' },
    { id: 'account', name: 'Account & Profile', icon: '👤' },
    { id: 'products', name: 'Products & Quality', icon: '🥬' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' }
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How fast is delivery?',
      answer: 'We offer express delivery in 30 minutes for most areas in Coimbatore. Standard delivery takes 1-2 hours.'
    },
    {
      category: 'orders',
      question: 'Can I track my order?',
      answer: 'Yes! You can track your order in real-time through your account dashboard or the tracking link sent via SMS.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery for orders above ₹500.'
    },
    {
      category: 'products',
      question: 'Are your products fresh?',
      answer: 'Absolutely! We source directly from local farms and ensure all products meet our quality standards before delivery.'
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click on Sign Up, fill in your details, and verify your phone number. You can start shopping immediately!'
    },
    {
      category: 'technical',
      question: 'The app is not working properly',
      answer: 'Try refreshing the page or clearing your browser cache. If issues persist, contact our support team.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Support request submitted successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: 'other'
        });
        setShowContactForm(false);
      } else {
        setMessage(data.message || 'Failed to submit support request');
      }
    } catch (error) {
      setMessage('Failed to submit support request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '4rem 5% 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Help Center</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Find answers to your questions and get the help you need
          </p>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem'
            }}>
              🔍
            </span>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Categories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '1rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.icon}</div>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No results found</h3>
              <p>Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="card">
                  <div className="card-body">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                      {faq.question}
                    </h3>
                    <p style={{ margin: 0, lineHeight: '1.6' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="card" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div className="card-body">
            <h3>Still need help?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Can't find what you're looking for? Our support team is here to help!
            </p>
            {message && (
              <div style={{
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: 'var(--border-radius)',
                background: message.includes('successfully') ? 'var(--success)20' : 'var(--error)20',
                color: message.includes('successfully') ? 'var(--success)' : 'var(--error)',
                border: `1px solid ${message.includes('successfully') ? 'var(--success)' : 'var(--error)'}`
              }}>
                {message}
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowContactForm(!showContactForm)} className="btn btn-primary">
                {showContactForm ? 'Hide Form' : 'Contact Support'}
              </button>
              <a href="tel:+919363752456" className="btn btn-outline">Call Us</a>
            </div>
          </div>
        </div>

        {/* Support Form */}
        {showContactForm && (
          <div className="card" style={{ marginTop: '2rem', maxWidth: '600px', margin: '2rem auto 0' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Contact Support</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="orders">Orders & Delivery</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="account">Account & Profile</option>
                    <option value="products">Products & Quality</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="4"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;