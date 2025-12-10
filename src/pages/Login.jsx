import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ValidationRegex, validateField } from '../utils/validation';

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
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem 1rem'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
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
          <div style={{ padding: '2rem' }}>
            {/* Demo Credentials */}
            <div style={{
              background: 'var(--gray-50)',
              padding: '1rem',
              borderRadius: 'var(--border-radius)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <strong>Demo Credentials:</strong><br />
              Admin: admin@waveverse.com / admin123<br />
              User: user@example.com / user123
            </div>

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
  );
};

export default Login;