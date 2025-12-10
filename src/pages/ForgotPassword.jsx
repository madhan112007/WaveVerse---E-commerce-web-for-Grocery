import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ValidationRegex, validateField } from '../utils/validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { forgotPassword } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    // Email validation using regex
    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      const emailValidation = validateField('email', email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (success) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        padding: '2rem 1rem'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'white',
            borderRadius: 'var(--border-radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--success) 0%, #388e3c 100%)',
              color: 'white',
              padding: '2rem'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Check Your Email!</h1>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--gray-600)' }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="btn btn-outline"
                >
                  Try Different Email
                </button>
                <Link to="/login" className="btn btn-primary">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
            <h1 style={{ margin: 0, fontSize: '1.875rem' }}>Forgot Password?</h1>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
              No worries, we'll send you reset instructions
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
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
                style={{ marginBottom: '1rem' }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <Link 
                to="/login" 
                className="btn btn-ghost w-full"
                style={{ textAlign: 'center' }}
              >
                ← Back to Login
              </Link>
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--gray-200)'
            }}>
              <p style={{ margin: 0, color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;