import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ValidationRegex, validateField } from '../utils/validation';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Name validation using regex
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else {
      const nameValidation = validateField('name', formData.name.trim());
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.message;
      }
    }

    // Email validation using regex
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailValidation = validateField('email', formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.message;
      }
    }

    // Phone validation using regex
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneValidation = validateField('phone', formData.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.message;
      }
    }

    // Password validation using regex
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validateField('password', formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      await signup({
        name: formData.name.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      });
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return '#f44336';
    if (strength <= 3) return '#ff9800';
    if (strength <= 4) return '#2196f3';
    return '#4caf50';
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '500px',
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
            <h1 style={{ margin: 0, fontSize: '1.875rem' }}>Join WaveVerse!</h1>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
              Create your account and start shopping
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '2rem' }}>
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
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
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
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Account Type *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                  {formData.role === 'user' 
                    ? 'Shop for groceries and manage your orders'
                    : 'Manage products, orders, and users'
                  }
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.25rem'
                    }}>
                      <div style={{
                        flex: 1,
                        height: '4px',
                        background: 'var(--gray-200)',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(getPasswordStrength() / 5) * 100}%`,
                          height: '100%',
                          background: getStrengthColor(getPasswordStrength()),
                          transition: 'var(--transition)'
                        }}></div>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: getStrengthColor(getPasswordStrength()),
                        fontWeight: '600'
                      }}>
                        {getStrengthText(getPasswordStrength())}
                      </span>
                    </div>
                  </div>
                )}
                
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
              </div>

              <div className="form-group">
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    style={{ marginTop: '0.25rem' }}
                  />
                  <span style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                    I agree to the{' '}
                    <Link to="/terms" style={{ color: 'var(--primary)' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" style={{ color: 'var(--primary)' }}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && <div className="form-error">{errors.agreeToTerms}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
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
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;