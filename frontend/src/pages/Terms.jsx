import React, { useState, useEffect } from 'react';

const Terms = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      {/* Snow Animation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-10px',
              left: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: 'white',
              borderRadius: '50%',
              animation: `fall ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.8
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .hero-text { font-size: 1.1rem !important; }
          .section-card { padding: 1rem !important; margin-bottom: 1rem !important; }
          .section-title { font-size: 1.25rem !important; }
          .hero-section { padding: 4rem 5% 3rem !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2rem !important; }
          .hero-text { font-size: 1rem !important; }
          .container-padding { padding: 1rem 0.5rem !important; }
          .hero-section { padding: 3rem 3% 2rem !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '6rem 5% 4rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ 
            marginBottom: '1rem', 
            fontSize: '3.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>Terms of Service</h1>
          <p className="hero-text" style={{ 
            fontSize: '1.3rem', 
            opacity: 0.95
          }}>
            Your trust is our foundation - Last updated: January 2024
          </p>
        </div>
      </section>

      <div className="container container-padding" style={{ padding: '2rem 1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
            <p style={{ color: '#fff' }}>By accessing and using WaveVerse, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>2. Service Description</h2>
            <p style={{ color: '#fff' }}>WaveVerse is an online grocery delivery platform that connects customers with fresh, quality groceries delivered to their doorstep in Coimbatore, India.</p>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>3. User Accounts</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>4. Orders and Payment</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>All orders are subject to availability and confirmation</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be made at the time of order placement</li>
              <li>We accept UPI, cards, net banking, and cash on delivery</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>5. Delivery</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Delivery times are estimates and may vary due to circumstances beyond our control</li>
              <li>You must be available to receive deliveries at the specified address</li>
              <li>Risk of loss passes to you upon delivery</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>6. Returns and Refunds</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Fresh produce must be reported within 24 hours of delivery</li>
              <li>Packaged goods can be returned within 7 days</li>
              <li>Refunds will be processed within 3-5 business days</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>7. Prohibited Uses</h2>
            <p style={{ color: '#fff' }}>You may not use our service:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>8. Limitation of Liability</h2>
            <p style={{ color: '#fff' }}>WaveVerse shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>9. Changes to Terms</h2>
            <p style={{ color: '#fff' }}>We reserve the right to update these terms at any time. Changes will be effective immediately upon posting on our website.</p>
          </section>

          <section className="section-card" style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>10. Contact Information</h2>
            <p style={{ color: '#fff' }}>If you have any questions about these Terms of Service, please contact us:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'none', color: '#fff' }}>
              <li>Email: support@waveverse.com</li>
              <li>Phone: +91 9363752456</li>
              <li>Address: No. 45, Avinashi Road, Peelamedu, Coimbatore - 641004</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;