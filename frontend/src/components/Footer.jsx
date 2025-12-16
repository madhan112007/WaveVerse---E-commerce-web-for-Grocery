import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--gray-800)',
      color: 'white',
      padding: '3rem 5% 1rem'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--primary)'
            }}>
              WaveVerse
            </div>
            <p style={{
              color: 'var(--gray-300)',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Fresh groceries delivered to your doorstep in 30 minutes. 
              Supporting local farmers and sustainable agriculture.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                f
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                t
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                i
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              color: 'white',
              fontSize: '1.125rem'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/recipes', label: 'Recipes' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.to}
                    style={{
                      color: 'var(--gray-300)',
                      textDecoration: 'none',
                      transition: 'var(--transition)',
                      fontSize: '0.875rem'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--gray-300)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              color: 'white',
              fontSize: '1.125rem'
            }}>
              Customer Service
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { label: 'Help Center', to: '/help-center' },
                { label: 'Track Your Order', to: '/track-order' },
                { label: 'Returns & Refunds', to: '/returns' },
                { label: 'Shipping Info', to: '/shipping-info' },
                { label: 'FAQ', to: '/faq' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.to}
                    style={{
                      color: 'var(--gray-300)',
                      textDecoration: 'none',
                      transition: 'var(--transition)',
                      fontSize: '0.875rem'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--gray-300)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              color: 'white',
              fontSize: '1.125rem'
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--gray-300)',
                fontSize: '0.875rem'
              }}>
                <span>@</span>
                <span>support@waveverse.com</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--gray-300)',
                fontSize: '0.875rem'
              }}>
                <span>☎</span>
                <span>+91 9363752456</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                color: 'var(--gray-300)',
                fontSize: '0.875rem'
              }}>
                <span>●</span>
                <span>No. 45, Avinashi Road<br />Peelamedu, Coimbatore - 641004</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--gray-300)',
                fontSize: '0.875rem'
              }}>
                <span>◐</span>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div style={{
          background: 'var(--gray-700)',
          padding: '2rem',
          borderRadius: 'var(--border-radius-lg)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            Stay Updated
          </h3>
          <p style={{
            color: 'var(--gray-300)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            Subscribe to our newsletter for exclusive deals and fresh recipe ideas
          </p>
          <form style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '400px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                fontSize: '0.875rem'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--gray-700)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            color: 'var(--gray-400)',
            fontSize: '0.875rem'
          }}>
            © {currentYear} WaveVerse. All rights reserved.
          </div>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <a
              href="#"
              style={{
                color: 'var(--gray-400)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: 'var(--gray-400)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}
            >
              Terms of Service
            </a>
            <a
              href="#"
              style={{
                color: 'var(--gray-400)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}
            >
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--gray-700)'
        }}>
          <div style={{
            color: 'var(--gray-400)',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            We Accept
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {['VISA', 'BANK', 'UPI', 'CASH'].map((icon, index) => (
              <div
                key={index}
                style={{
                  width: '50px',
                  height: '32px',
                  background: 'var(--gray-700)',
                  borderRadius: 'var(--border-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;