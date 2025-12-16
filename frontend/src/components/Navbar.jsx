import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartTotals } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            WaveVerse
          </Link>

          {/* Desktop Navigation */}
          <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                to="/" 
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/recipes" 
                className={`navbar-link ${isActive('/recipes') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>

            {/* Cart Link */}
            <li>
              <Link 
                to="/cart" 
                className={`navbar-link ${isActive('/cart') ? 'active' : ''}`}
                onClick={closeMenu}
                style={{ position: 'relative' }}
              >
                Cart
                {cartTotals.itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--error)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600'
                  }}>
                    {cartTotals.itemCount > 99 ? '99+' : cartTotals.itemCount}
                  </span>
                )}
              </Link>
            </li>

            {/* User Authentication Links */}
            {user ? (
              <li className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 navbar-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <span>{user.name}</span>
                  <span style={{ fontSize: '0.8rem' }}>▼</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: 'white',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--shadow-lg)',
                      minWidth: '200px',
                      zIndex: 1000,
                      marginTop: '0.5rem'
                    }}
                  >
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                      <div style={{ fontWeight: '600' }}>{user.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                        {user.email}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        marginTop: '0.25rem'
                      }}>
                        {user.role}
                      </div>
                    </div>
                    
                    {isAdmin() && (
                      <>
                        <Link 
                          to="/admin" 
                          style={{
                            display: 'block',
                            padding: '0.75rem 1rem',
                            color: 'var(--gray-700)',
                            textDecoration: 'none',
                            transition: 'var(--transition)'
                          }}
                          onMouseOver={(e) => e.target.style.background = 'var(--gray-50)'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                        <Link 
                          to="/admin/add-product" 
                          style={{
                            display: 'block',
                            padding: '0.75rem 1rem',
                            color: 'var(--gray-700)',
                            textDecoration: 'none',
                            transition: 'var(--transition)'
                          }}
                          onMouseOver={(e) => e.target.style.background = 'var(--gray-50)'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                          onClick={() => setShowUserMenu(false)}
                        >
                          Add Product
                        </Link>
                        <Link 
                          to="/admin/manage-products" 
                          style={{
                            display: 'block',
                            padding: '0.75rem 1rem',
                            color: 'var(--gray-700)',
                            textDecoration: 'none',
                            transition: 'var(--transition)'
                          }}
                          onMouseOver={(e) => e.target.style.background = 'var(--gray-50)'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                          onClick={() => setShowUserMenu(false)}
                        >
                          Manage Products
                        </Link>
                        <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--gray-200)' }} />
                      </>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--error)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onMouseOver={(e) => e.target.style.background = 'var(--gray-50)'}
                      onMouseOut={(e) => e.target.style.background = 'transparent'}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className="btn btn-primary btn-sm"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;