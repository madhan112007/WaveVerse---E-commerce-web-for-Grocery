import React, { useState, useEffect } from 'react';

const Privacy = () => {
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
          }}>Privacy Policy</h1>
          <p className="hero-text" style={{ 
            fontSize: '1.3rem', 
            opacity: 0.95
          }}>
            Your privacy matters to us - Last updated: January 2024
          </p>
        </div>
      </section>

      <div className="container container-padding" style={{ padding: '2rem 1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>1. Information We Collect</h2>
            <p style={{ marginBottom: '1rem', color: '#fff' }}>We collect information you provide directly to us, such as:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Name, email address, and phone number</li>
              <li>Delivery address and payment information</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
            <p style={{ color: '#fff' }}>We use the information we collect to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Process and deliver your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Provide customer support</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>3. Information Sharing</h2>
            <p style={{ color: '#fff' }}>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>To delivery partners for order fulfillment</li>
              <li>To payment processors for transaction processing</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>4. Data Security</h2>
            <p style={{ color: '#fff' }}>We implement appropriate security measures to protect your personal information:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Secure payment processing through trusted providers</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>5. Cookies and Tracking</h2>
            <p style={{ color: '#fff' }}>We use cookies and similar technologies to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Remember your preferences and login information</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve our website functionality</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>6. Your Rights</h2>
            <p style={{ color: '#fff' }}>You have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>7. Data Retention</h2>
            <p style={{ color: '#fff' }}>We retain your personal information for as long as necessary to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: '#fff' }}>
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>8. Children's Privacy</h2>
            <p style={{ color: '#fff' }}>Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.</p>
          </section>

          <section className="section-card" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>9. Changes to Privacy Policy</h2>
            <p style={{ color: '#fff' }}>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section className="section-card" style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title" style={{ color: '#4CAF50', marginBottom: '1rem' }}>10. Contact Us</h2>
            <p style={{ color: '#fff' }}>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'none', color: '#fff' }}>
              <li>Email: privacy@waveverse.com</li>
              <li>Phone: +91 9363752456</li>
              <li>Address: No. 45, Avinashi Road, Peelamedu, Coimbatore - 641004</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;