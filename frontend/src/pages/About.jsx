import React from 'react';
import meee1 from '../assets/meee1.jpeg';
import surya from '../assets/surya.jpeg';
import amma from '../assets/amma.jpeg';

const About = () => {
  const team = [
    {
      name: 'Madhan S',
      role: 'Founder & CEO',
      image: meee1,
      bio: 'Passionate about sustainable farming and bringing fresh produce to communities.'
    },
    {
      name: 'Ajay Surya',
      role: 'Head of Operations',
      image: surya,
      bio: 'Expert in supply chain management with 10+ years in the grocery industry.'
    },
    {
      name: 'Saraswathi',
      role: 'Quality Assurance Manager',
      image: amma,
      bio: 'Ensures every product meets our high standards for freshness and quality.'
    }
  ];

  const values = [
    {
      title: 'Sustainability',
      description: 'We partner with local farms that practice sustainable agriculture, reducing our carbon footprint and supporting eco-friendly farming methods.',
      color: '#16a34a'
    },
    {
      title: 'Community',
      description: 'Supporting local farmers and communities is at the heart of what we do. We believe in building strong relationships that benefit everyone.',
      color: '#2563eb'
    },
    {
      title: 'Quality',
      description: 'Every product is carefully selected and inspected to ensure you receive only the freshest, highest-quality groceries.',
      color: '#d97706'
    },
    {
      title: 'Innovation',
      description: 'We leverage technology to make grocery shopping more convenient, efficient, and enjoyable for our customers.',
      color: '#7c3aed'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '6rem 5% 4rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '1.5rem' }}>About WaveVerse</h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9, 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're revolutionizing grocery delivery by connecting communities with fresh, 
            sustainable produce while supporting local farmers and reducing food waste.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
                Our Story
              </h2>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#1f2937' }}>
                Founded in 2020, WaveVerse began as a simple idea: what if grocery shopping 
                could be both convenient and sustainable? Our founders, frustrated with the 
                lack of fresh, local options in traditional grocery delivery, set out to 
                create something different.
              </p>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#1f2937' }}>
                Today, we partner with over 50 local farms and producers to bring you the 
                freshest groceries while supporting sustainable agriculture practices. Every 
                order helps reduce food waste and supports local communities.
              </p>
              <div style={{
                background: 'var(--gray-50)',
                padding: '1.5rem',
                borderRadius: 'var(--border-radius-lg)',
                borderLeft: '4px solid var(--primary)'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontStyle: 'italic',
                  color: 'var(--gray-700)'
                }}>
                  "We believe that everyone deserves access to fresh, healthy food, 
                  and that supporting local farmers creates stronger communities."
                </p>
                <p style={{ 
                  margin: '0.5rem 0 0', 
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  fontWeight: '600'
                }}>
                  - Madhan S, Founder & CEO
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                alt="Fresh produce at local farm"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 'var(--border-radius-xl)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ background: 'var(--gray-50)', padding: '6rem 5%' }}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {values.map((value, index) => (
              <div key={index} className="card" style={{ textAlign: 'center', height: '100%' }}>
                <div className="card-body">
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: value.color, 
                    borderRadius: '50%', 
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%' }}></div>
                  </div>
                  <h3 style={{ 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--gray-600)', 
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {team.map((member, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '0 auto 1.5rem',
                      border: '4px solid var(--primary)20'
                    }}
                  />
                  <h3 style={{ 
                    color: 'var(--primary-dark)', 
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{ 
                    color: 'var(--primary)', 
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {member.role}
                  </p>
                  <p style={{ 
                    color: 'var(--gray-600)', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '6rem 5%'
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Impact
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                50+
              </div>
              <p style={{ opacity: 0.9, margin: 0 }}>Local Farm Partners</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                10,000+
              </div>
              <p style={{ opacity: 0.9, margin: 0 }}>Happy Customers</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                95%
              </div>
              <p style={{ opacity: 0.9, margin: 0 }}>Customer Satisfaction</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                30min
              </div>
              <p style={{ opacity: 0.9, margin: 0 }}>Average Delivery Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <div className="container">
          <div style={{
            background: 'var(--gray-50)',
            padding: '3rem',
            borderRadius: 'var(--border-radius-xl)',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: 'var(--primary-dark)', 
              marginBottom: '1.5rem',
              fontSize: '2rem'
            }}>
              Our Mission
            </h2>
            <p style={{ 
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--gray-700)',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              To make fresh, sustainable groceries accessible to everyone while building 
              stronger communities and supporting local farmers. We're not just delivering 
              food – we're delivering a better future for our planet and our communities.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                background: 'var(--primary)20',
                color: 'var(--primary)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Sustainable
              </span>
              <span style={{
                background: 'var(--primary)20',
                color: 'var(--primary)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Community-Focused
              </span>
              <span style={{
                background: 'var(--primary)20',
                color: 'var(--primary)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Quality-First
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;