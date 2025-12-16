import React, { useState } from 'react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: 'Orders & Delivery',
      icon: '📦',
      faqs: [
        {
          question: 'How fast is delivery?',
          answer: 'We offer express delivery in 30 minutes for most areas in Coimbatore. Standard delivery takes 1-2 hours depending on your location and order size.'
        },
        {
          question: 'What is the minimum order amount?',
          answer: 'The minimum order amount is ₹200. Orders above ₹500 qualify for free delivery.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! You can track your order in real-time through your account dashboard or using the tracking link sent via SMS.'
        },
        {
          question: 'What if I miss my delivery?',
          answer: 'Our delivery partner will call you before arrival. If you miss the delivery, we can reschedule for a small fee or you can collect from our store.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: '💳',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery for orders above ₹500.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No hidden charges! You only pay for products, delivery fee (if applicable), and taxes. All charges are clearly shown before checkout.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Yes, we offer full refunds for damaged or wrong items. Refunds are processed within 3-5 business days to your original payment method.'
        }
      ]
    },
    {
      category: 'Products & Quality',
      icon: '🥬',
      faqs: [
        {
          question: 'How do you ensure product freshness?',
          answer: 'We source directly from local farms and have strict quality checks. All perishable items are stored in temperature-controlled environments.'
        },
        {
          question: 'What if I receive expired products?',
          answer: 'We guarantee fresh products. If you receive expired items, contact us immediately for a full refund or replacement.'
        },
        {
          question: 'Do you have organic products?',
          answer: 'Yes! We have a wide range of certified organic fruits, vegetables, and other products clearly marked in our catalog.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      icon: '👤',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on Sign Up, fill in your details, verify your phone number, and start shopping immediately!'
        },
        {
          question: 'Can I change my delivery address?',
          answer: 'Yes, you can add multiple addresses in your profile and choose different addresses for each order.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.category, icon: category.icon }))
  );

  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
          <h1 style={{ marginBottom: '1rem' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Find quick answers to common questions about WaveVerse
          </p>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search FAQs..."
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
        {searchTerm ? (
          /* Search Results */
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>
              Search Results ({filteredFaqs.length})
            </h2>
            {filteredFaqs.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <h3>No results found</h3>
                <p>Try different keywords or browse categories below</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-primary"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="card">
                    <div
                      className="card-body"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleFaq(`search-${index}`)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--primary)',
                            marginBottom: '0.5rem'
                          }}>
                            {faq.icon} {faq.category}
                          </div>
                          <h3 style={{ margin: 0 }}>{faq.question}</h3>
                        </div>
                        <span style={{ fontSize: '1.5rem' }}>
                          {openFaq === `search-${index}` ? '−' : '+'}
                        </span>
                      </div>
                      {openFaq === `search-${index}` && (
                        <div style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid var(--gray-200)',
                          color: 'var(--gray-700)'
                        }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Category View */
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                  <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                    {category.category}
                  </h2>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  {category.faqs.map((faq, faqIndex) => {
                    const faqId = `${categoryIndex}-${faqIndex}`;
                    return (
                      <div
                        key={faqIndex}
                        style={{
                          borderBottom: faqIndex < category.faqs.length - 1 ? '1px solid var(--gray-200)' : 'none'
                        }}
                      >
                        <div
                          style={{
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                          onClick={() => toggleFaq(faqId)}
                        >
                          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                            {faq.question}
                          </h3>
                          <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                            {openFaq === faqId ? '−' : '+'}
                          </span>
                        </div>
                        {openFaq === faqId && (
                          <div style={{
                            padding: '0 1.5rem 1.5rem',
                            color: 'var(--gray-700)',
                            lineHeight: '1.6'
                          }}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <div className="card" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div className="card-body">
            <h3>Still have questions?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary">Contact Support</a>
              <a href="/help-center" className="btn btn-outline">Help Center</a>
              <a href="tel:+919363752456" className="btn btn-outline">Call Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;