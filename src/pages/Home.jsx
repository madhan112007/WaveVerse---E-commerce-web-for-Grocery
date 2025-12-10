import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantityModal from '../components/QuantityModal';

const Home = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowQuantityModal(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };
  const categories = [
    { name: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop' },
    { name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop' },
    { name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop' },
    { name: 'Fresh Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop' }
  ];

  const deals = [
    {
      name: 'Organic Red Apples',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
      oldPrice: '₹180',
      price: '₹125',
      discount: '30%'
    },
    {
      name: 'Farm Fresh Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
      oldPrice: '₹65',
      price: '₹48',
      discount: '25%'
    },
    {
      name: 'Whole Wheat Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      oldPrice: '₹85',
      price: '₹50',
      discount: '40%'
    },
    {
      name: 'Free Range Eggs',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
      oldPrice: '₹220',
      price: '₹175',
      discount: '20%'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            padding: '10px 25px',
            borderRadius: '30px',
            marginBottom: '2rem',
            fontWeight: '600'
          }}>
            Express Delivery in 30 Minutes
          </div>
          <h1>Fresh Groceries at Your Doorstep</h1>
          <p>Organic produce, farm-fresh dairy, and quality essentials delivered faster than ever</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '16px 45px', fontSize: '1.1rem' }}>
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 5%', background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Why Choose WaveVerse?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              { title: 'Farm to Table', desc: 'Direct sourcing from local farms ensuring maximum freshness', color: '#16a34a' },
              { title: 'Smart Shopping List', desc: 'AI-powered recommendations based on your preferences', color: '#2563eb' },
              { title: 'Price Drop Alerts', desc: 'Get notified when your favorite items go on sale', color: '#d97706' },
              { title: 'Zero Waste Program', desc: 'Return packaging for recycling and earn loyalty points', color: '#059669' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                border: `3px solid ${feature.color}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: feature.color
                }}></div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: feature.color }}>{feature.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.8' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '100px 5%' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Shop by Category</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {categories.map((category, index) => (
              <Link 
                to="/products" 
                key={index}
                style={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '2rem',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section style={{ padding: '100px 5%', background: 'linear-gradient(135deg, #fff5e6 0%, #ffe6f0 100%)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Flash Deals - Today Only!</h2>
          </div>
          <div className="products-grid">
            {deals.map((product, index) => (
              <div key={index} className="product-card">
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#ff4757',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  zIndex: 1
                }}>
                  {product.discount} OFF
                </div>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                    <span style={{ textDecoration: 'line-through', color: '#999' }}>{product.oldPrice}</span>
                    <span className="product-price">{product.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCartClick({
                      id: index + 1,
                      name: product.name,
                      price: parseFloat(product.price.replace('₹', '')),
                      originalPrice: parseFloat(product.oldPrice.replace('₹', '')),
                      image: product.image,
                      category: 'deals',
                      inStock: true
                    })}
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{
        padding: '80px 5%',
        background: 'linear-gradient(135deg, #6fbf73 0%, #2d5016 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get ₹200 Off Your First Order!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95 }}>
            Subscribe to our newsletter for exclusive deals, recipes, and healthy eating tips
          </p>
          <form style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: '15px 25px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem'
              }}
            />
            <button type="submit" className="btn" style={{
              background: 'white',
              color: '#2d5016',
              padding: '15px 35px',
              borderRadius: '50px',
              fontWeight: '600'
            }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Quantity Modal */}
      <QuantityModal
        product={selectedProduct}
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;