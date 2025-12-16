import React from 'react';

const ShippingInfo = () => {
  const deliveryZones = [
    { area: 'Peelamedu', time: '20-30 mins', charge: 'Free' },
    { area: 'Gandhipuram', time: '25-35 mins', charge: 'Free' },
    { area: 'RS Puram', time: '30-40 mins', charge: 'Free' },
    { area: 'Saibaba Colony', time: '25-35 mins', charge: 'Free' },
    { area: 'Race Course', time: '30-40 mins', charge: '₹20' },
    { area: 'Singanallur', time: '35-45 mins', charge: '₹30' }
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
          <h1 style={{ marginBottom: '1rem' }}>Shipping Information</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Fast, reliable delivery across Coimbatore
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Delivery Promise */}
        <div className="card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="card-body" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚚</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
              Express Delivery in 30 Minutes
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>
              Get your fresh groceries delivered to your doorstep in just 30 minutes. 
              We guarantee freshness and quality with every order.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Delivery Areas */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>📍 Delivery Areas</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {deliveryZones.map((zone, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'var(--gray-50)',
                    borderRadius: 'var(--border-radius)'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{zone.area}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        {zone.time}
                      </div>
                    </div>
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: zone.charge === 'Free' ? 'var(--success)' : 'var(--warning)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {zone.charge}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'var(--primary)10',
                borderRadius: 'var(--border-radius)',
                fontSize: '0.875rem'
              }}>
                <strong>Note:</strong> Free delivery on orders above ₹500. 
                Delivery charges apply for orders below ₹500.
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>⚡ Delivery Options</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  padding: '1.5rem',
                  border: '2px solid var(--success)',
                  borderRadius: 'var(--border-radius-lg)',
                  background: 'var(--success)05'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚀</span>
                    <strong style={{ color: 'var(--success)' }}>Express Delivery</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    Get your order in 20-30 minutes. Perfect for urgent needs.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  border: '2px solid var(--primary)',
                  borderRadius: 'var(--border-radius-lg)',
                  background: 'var(--primary)05'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📅</span>
                    <strong style={{ color: 'var(--primary)' }}>Scheduled Delivery</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    Choose your preferred delivery time slot. Available 8 AM - 8 PM.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  border: '2px solid var(--warning)',
                  borderRadius: 'var(--border-radius-lg)',
                  background: 'var(--warning)05'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏪</span>
                    <strong style={{ color: 'var(--warning)' }}>Store Pickup</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    Collect your order from our store. No delivery charges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Guidelines */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3 style={{ margin: 0 }}>📋 Delivery Guidelines</h3>
          </div>
          <div className="card-body">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h4 style={{ color: 'var(--primary)' }}>🕐 Delivery Hours</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                  <li>Saturday - Sunday: 9:00 AM - 6:00 PM</li>
                  <li>Public Holidays: 10:00 AM - 4:00 PM</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary)' }}>📦 Order Requirements</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Minimum order: ₹200</li>
                  <li>Free delivery: Orders above ₹500</li>
                  <li>Express delivery: Orders above ₹300</li>
                  <li>Maximum order: ₹5000 per delivery</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary)' }}>🏠 Delivery Instructions</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Provide accurate address and landmarks</li>
                  <li>Be available during delivery window</li>
                  <li>Check items before accepting delivery</li>
                  <li>Report issues within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Delivery */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="card-body">
            <h3>Questions about Delivery?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Our customer service team is here to help with any delivery-related queries.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+919363752456" className="btn btn-primary">
                📞 Call Support
              </a>
              <a href="/contact" className="btn btn-outline">
                💬 Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;