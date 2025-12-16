import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    cartTotals, 
    incrementQuantity, 
    decrementQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <section style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '4rem 5% 2rem',
          textAlign: 'center'
        }}>
          <div className="container">
            <h1>Shopping Cart</h1>
          </div>
        </section>

        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem', color: 'var(--gray-400)' }}>⌕</div>
          <h2>Your cart is empty</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '4rem 5% 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1>Shopping Cart</h1>
          <p style={{ opacity: 0.9 }}>
            {cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="cart-grid">
          {/* Cart Items */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h2>Cart Items</h2>
              <button
                onClick={clearCart}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--error)' }}
              >
                Clear Cart
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div key={item.id} className="card">
                  <div className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: 'var(--border-radius)',
                        flexShrink: 0
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>
                          ${item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span style={{
                            textDecoration: 'line-through',
                            color: 'var(--gray-400)',
                            fontSize: '0.875rem'
                          }}>
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <span style={{
                        background: 'var(--primary)20',
                        color: 'var(--primary)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        textTransform: 'capitalize'
                      }}>
                        {item.category}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ minWidth: '35px', padding: '0.25rem' }}
                        >
                          -
                        </button>
                        <span style={{
                          minWidth: '40px',
                          textAlign: 'center',
                          fontWeight: '600'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ minWidth: '35px', padding: '0.25rem' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div style={{
                        textAlign: 'right',
                        minWidth: '80px'
                      }}>
                        <div style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </div>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--success)'
                          }}>
                            Save ₹{((item.originalPrice - item.price) * item.quantity).toFixed(0)}
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--error)' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="card" style={{ position: 'sticky', top: '2rem' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Order Summary</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Subtotal ({cartTotals.itemCount} items)</span>
                  <span>₹{cartTotals.subtotal}</span>
                </div>

                {cartTotals.savings > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--success)'
                  }}>
                    <span>You Save</span>
                    <span>-₹{cartTotals.savings}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Shipping</span>
                  <span>
                    {cartTotals.shipping === 0 ? (
                      <span style={{ color: 'var(--success)' }}>FREE</span>
                    ) : (
                      `₹${cartTotals.shipping}`
                    )}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Tax</span>
                  <span>₹{cartTotals.tax}</span>
                </div>

                <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--gray-200)' }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '700'
                }}>
                  <span>Total</span>
                  <span>₹{cartTotals.total}</span>
                </div>

                {cartTotals.subtotal < 50 && (
                  <div style={{
                    background: 'var(--warning)20',
                    color: 'var(--warning)',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>
                    Add ₹{(500 - cartTotals.subtotal).toFixed(0)} more for FREE shipping!
                  </div>
                )}

                <Link 
                  to="/checkout" 
                  className="btn btn-primary w-full btn-lg"
                  style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                >
                  Proceed to Checkout
                </Link>

                <Link 
                  to="/products" 
                  className="btn btn-outline w-full"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;