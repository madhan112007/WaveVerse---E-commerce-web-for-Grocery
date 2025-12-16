import React, { useState, useEffect } from 'react';

const QuantityModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      setQuantity(1);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const totalPrice = (product.price * quantity).toFixed(2);
  const savings = product.originalPrice ? ((product.originalPrice - product.price) * quantity).toFixed(2) : 0;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(5px)'
      }}
      onClick={handleOverlayClick}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          transform: animate ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: animate ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ×
          </button>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</div>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add to Cart</h3>
        </div>

        {/* Product Info */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'center'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '12px',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '1.1rem',
                color: 'var(--gray-800)'
              }}>
                {product.name}
              </h4>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: 'var(--primary-dark)',
                  fontSize: '1.1rem'
                }}>
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{
                    textDecoration: 'line-through',
                    color: 'var(--gray-400)',
                    fontSize: '0.9rem'
                  }}>
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: '600',
              color: 'var(--gray-700)'
            }}>
              Quantity
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              background: 'var(--gray-50)',
              padding: '1rem',
              borderRadius: '15px'
            }}>
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  border: 'none',
                  background: quantity <= 1 ? 'var(--gray-200)' : 'var(--primary)',
                  color: quantity <= 1 ? 'var(--gray-400)' : 'white',
                  fontSize: '1.5rem',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  if (quantity > 1) e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                −
              </button>

              <div style={{
                minWidth: '60px',
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--primary-dark)'
              }}>
                {quantity}
              </div>

              <button
                onClick={handleIncrement}
                disabled={quantity >= 99}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  border: 'none',
                  background: quantity >= 99 ? 'var(--gray-200)' : 'var(--primary)',
                  color: quantity >= 99 ? 'var(--gray-400)' : 'white',
                  fontSize: '1.5rem',
                  cursor: quantity >= 99 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  if (quantity < 99) e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: savings > 0 ? '0.5rem' : 0
            }}>
              <span style={{ color: 'var(--gray-600)' }}>
                Total ({quantity} {quantity === 1 ? 'item' : 'items'})
              </span>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--primary-dark)'
              }}>
                ₹{totalPrice}
              </span>
            </div>
            {savings > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.875rem'
              }}>
                <span style={{ color: 'var(--success)' }}>You save</span>
                <span style={{ 
                  color: 'var(--success)', 
                  fontWeight: '600' 
                }}>
                  ₹{savings}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ 
                flex: 2,
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                border: 'none'
              }}
            >
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;