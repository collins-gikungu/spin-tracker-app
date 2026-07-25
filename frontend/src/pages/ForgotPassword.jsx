import { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const heroSrc = '/image001.png';

const ForgotPassword = ({ darkMode, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await API.post('/auth/forgot-password', { email });
      setSubmitted(true);
      setMessage('Check your email for password reset instructions');
      setEmail('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

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
            <span className="feature-chip">Password Recovery</span>
            <h3>Get back on track</h3>
            <p>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
        </div>

        <div className="auth-form">
          <div className="auth-form-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div>
                <h2>Reset Password</h2>
                <p>Enter your email to receive reset instructions.</p>
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

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            ) : null}

            <div className="auth-footer">
              Remember your password? <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
