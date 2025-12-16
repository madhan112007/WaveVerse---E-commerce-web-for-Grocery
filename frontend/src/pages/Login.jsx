import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ValidationRegex, validateField } from '../utils/validation';
import API_BASE_URL from '../config/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};

    // Email validation using regex
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailValidation = validateField('email', formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.message;
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Also store in sessionStorage for AuthContext
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.firstName} ${data.user.lastName}`,
          role: data.user.role || 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.firstName + ' ' + data.user.lastName)}&background=6fbf73&color=fff`
        };
        
        sessionStorage.setItem('waveverse_user', JSON.stringify(userData));
        
        // Force page reload to update AuthContext
        alert(`Login successful! Welcome ${data.user.role === 'admin' ? 'Admin' : 'User'}!`);
        
        // Redirect and reload
        if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = from;
        }
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .login-container { flex-direction: column !important; }
          .login-left { min-height: 40vh !important; }
          .login-right { padding: 1rem !important; }
          .login-form { max-width: 100% !important; }
          .login-title { font-size: 2rem !important; }
          .login-text { font-size: 1rem !important; }
        }
        @media (max-width: 480px) {
          .login-left { min-height: 30vh !important; padding: 1rem !important; }
          .login-form-content { padding: 1rem !important; }
        }
      `}</style>
      <div className="login-container" style={{ 
        minHeight: '100vh', 
        display: 'flex',
        background: '#f8f9fa'
      }}>
      {/* Left Side - Image */}
      <div className="login-left" style={{
        flex: 1,
        backgroundImage: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(56, 142, 60, 0.8) 100%), url("https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1000&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '2rem',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h1 className="login-title" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>WaveVerse</h1>
          <p className="login-text" style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.6' }}>
            Fresh groceries delivered to your doorstep in 30 minutes. Join thousands of satisfied customers!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right" style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div className="login-form" style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          borderRadius: 'var(--border-radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{ margin: 0, fontSize: '1.875rem' }}>Welcome Back!</h1>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
              Sign in to your WaveVerse account
            </p>
          </div>

          {/* Form */}
          <div className="login-form-content" style={{ padding: '2rem' }}>


            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div style={{
                  background: '#fef2f2',
                  color: 'var(--error)',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '1rem',
                  fontSize: '0.875rem'
                }}>
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--gray-500)'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--gray-200)'
            }}>
              <p style={{ margin: 0, color: 'var(--gray-600)' }}>
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;