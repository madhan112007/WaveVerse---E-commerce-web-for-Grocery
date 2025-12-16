import React, { useState } from 'react';

const Returns = () => {
  const [selectedTab, setSelectedTab] = useState('policy');
  const [formData, setFormData] = useState({
    orderId: '',
    itemName: '',
    reason: '',
    description: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      const response = await fetch('http://localhost:5000/api/returns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Return request submitted successfully! We will contact you soon.');
        setFormData({
          orderId: '',
          itemName: '',
          reason: '',
          description: '',
          contactNumber: ''
        });
      } else {
        setMessage(data.message || 'Failed to submit return request');
      }
    } catch (error) {
      setMessage('Failed to submit return request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const returnReasons = [
    'Product damaged during delivery',
    'Wrong item delivered',
    'Product quality not as expected',
    'Missing items from order',
    'Product expired or near expiry',
    'Changed my mind',
    'Other'
  ];

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
          <h1 style={{ marginBottom: '1rem' }}>Returns & Refunds</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Easy returns and quick refunds for your peace of mind
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--gray-200)',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'policy', name: 'Return Policy' },
            { id: 'process', name: 'Return Process' },
            { id: 'form', name: 'Request Return' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                background: 'none',
                borderBottom: selectedTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                color: selectedTab === tab.id ? 'var(--primary)' : 'var(--gray-600)',
                fontWeight: selectedTab === tab.id ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Return Policy */}
        {selectedTab === 'policy' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
              <div className="card-header">
                <h2 style={{ margin: 0 }}>Our Return Policy</h2>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--success)' }}>✅ 100% Satisfaction Guarantee</h3>
                    <p>We stand behind the quality of our products. If you're not completely satisfied, we'll make it right.</p>
                  </div>

                  <div>
                    <h3 style={{ color: 'var(--primary)' }}>⏰ Return Window</h3>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li><strong>Fresh Produce:</strong> 24 hours from delivery</li>
                      <li><strong>Dairy Products:</strong> 24 hours from delivery</li>
                      <li><strong>Packaged Goods:</strong> 7 days from delivery</li>
                      <li><strong>Non-perishables:</strong> 15 days from delivery</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ color: 'var(--warning)' }}>📋 Return Conditions</h3>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li>Items must be in original condition</li>
                      <li>Perishable items must be reported within 24 hours</li>
                      <li>Original packaging required for packaged goods</li>
                      <li>Photos may be required for quality issues</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ color: 'var(--success)' }}>💰 Refund Process</h3>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li>Full refund for damaged or wrong items</li>
                      <li>Store credit for quality concerns</li>
                      <li>Refunds processed within 3-5 business days</li>
                      <li>Original payment method will be credited</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Return Process */}
        {selectedTab === 'process' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
              <div className="card-header">
                <h2 style={{ margin: 0 }}>How to Return Items</h2>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    {
                      step: 1,
                      title: 'Contact Us',
                      description: 'Call us at +91 9363752456 or use the return form below within the return window.',
                      icon: '📞'
                    },
                    {
                      step: 2,
                      title: 'Provide Details',
                      description: 'Share your order ID, item details, and reason for return. Photos may be required.',
                      icon: '📝'
                    },
                    {
                      step: 3,
                      title: 'Schedule Pickup',
                      description: 'We\'ll arrange a free pickup from your location at your convenience.',
                      icon: '🚚'
                    },
                    {
                      step: 4,
                      title: 'Quality Check',
                      description: 'Our team will inspect the returned items and verify the return reason.',
                      icon: '🔍'
                    },
                    {
                      step: 5,
                      title: 'Refund Processing',
                      description: 'Once approved, your refund will be processed within 3-5 business days.',
                      icon: '💳'
                    }
                  ].map(step => (
                    <div key={step.step} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      background: 'var(--gray-50)',
                      borderRadius: 'var(--border-radius-lg)'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: '700'
                      }}>
                        {step.step}
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>
                          {step.icon} {step.title}
                        </h3>
                        <p style={{ margin: 0, color: 'var(--gray-700)' }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Return Form */}
        {selectedTab === 'form' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card">
              <div className="card-header">
                <h2 style={{ margin: 0 }}>Request a Return</h2>
              </div>
              <div className="card-body">
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Order ID *</label>
                    <input
                      type="text"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your order ID"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Item Name *</label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Which item do you want to return?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Reason for Return *</label>
                    <select 
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a reason</option>
                      {returnReasons.map((reason, index) => (
                        <option key={index} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-input"
                      rows="4"
                      placeholder="Please provide more details about the issue"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number *</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your phone number"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Return Request'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
              <div className="card-body">
                <h3>Need Immediate Help?</h3>
                <p style={{ marginBottom: '1rem' }}>
                  Call our customer service team for faster assistance
                </p>
                <a href="tel:+919363752456" className="btn btn-outline">
                  📞 Call +91 9363752456
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Returns;