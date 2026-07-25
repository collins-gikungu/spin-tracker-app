import { useState, useEffect } from 'react';
import API from '../services/api';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const heroSrc = '/image001.png';

const ResetPassword = ({ darkMode, toggleTheme }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
      setTokenValid(false);
    } else {
      setTokenValid(true);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await API.post('/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === false) {
    return (
      <div className="auth-page">
        <div className="auth-bg">
          <div className="blob one" />
          <div className="blob two" />
          <div className="blob three" />
        </div>

        <div className="auth-card">
          <div className="auth-form">
            <div className="auth-form-inner">
              <div style={{ textAlign: 'center' }}>
                <h2>Invalid Reset Link</h2>
                <p style={{ color: '#ef4444', marginTop: '16px' }}>
                  This password reset link is invalid or has expired.
                </p>
                <Link to="/forgot-password" style={{ marginTop: '24px', display: 'block', color: '#3b82f6' }}>
                  Request a new reset link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="blob one" />
        <div className="blob two" />
        <div className="blob three" />

        <div className="particle-wrap">
          <div className="particle" style={{ left: '12%', top: '80%', animationDelay: '0s' }} />
          <div className="particle" style={{ left: '28%', top: '70%', animationDelay: '1.2s' }} />
          <div className="particle" style={{ left: '48%', top: '88%', animationDelay: '2.4s' }} />
          <div className="particle" style={{ left: '72%', top: '82%', animationDelay: '3.6s' }} />
          <div className="particle" style={{ left: '86%', top: '68%', animationDelay: '4.4s' }} />
        </div>

        <img src={heroSrc} alt="bike hero" className="auth-hero" />
      </div>

      <div className="auth-card">
        <div className="auth-visual">
          <img src={heroSrc} alt="bike" className="auth-visual-hero-inline" />
          <div className="auth-visual-content">
            <span className="feature-chip">Create New Password</span>
            <h3>Secure your account</h3>
            <p>
              Enter a new password to regain access to your account and continue
              tracking your workouts.
            </p>
          </div>
        </div>

        <div className="auth-form">
          <div className="auth-form-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div>
                <h2>Create New Password</h2>
                <p>Enter your new password below.</p>
              </div>
              <button className="theme-toggle-btn" type="button" onClick={toggleTheme}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>

            {error && (
              <div style={{ color: '#ef4444', marginBottom: '14px' }}>{error}</div>
            )}

            {message && (
              <div style={{ color: '#10b981', marginBottom: '14px', backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '8px' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
