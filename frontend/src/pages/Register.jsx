import { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const heroSrc = '/image001.png';

const Register = ({ onRegister, darkMode, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('/auth/register', {
        username,
        email,
        password,
      });
      onRegister();
    } catch (error) {
      setError(error.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="blob one" />
        <div className="blob two" />
        <div className="blob three" />

        <div className="particle-wrap">
          <div className="particle" style={{ left: '10%', top: '78%', animationDelay: '0s' }} />
          <div className="particle" style={{ left: '34%', top: '72%', animationDelay: '1.1s' }} />
          <div className="particle" style={{ left: '52%', top: '86%', animationDelay: '2.8s' }} />
          <div className="particle" style={{ left: '70%', top: '80%', animationDelay: '3.9s' }} />
        </div>

        <img src={heroSrc} alt="bike hero" className="auth-hero" />
      </div>
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-left">
            <img src={heroSrc} alt="bike" className="auth-visual-hero-inline" />
            <span className="feature-chip">Discover a better ride</span>
          </div>
          <div className="auth-visual-right">
            <div className="auth-visual-content">
              <h3>Register and start tracking</h3>
              <p>
                Create your account to access intelligent analytics, set new targets,
                and enjoy an elevated cycling experience.
              </p>
            </div>
          </div>
        </div>

        <div className="auth-form">
          <div className="auth-form-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div>
                <h2>Create your account</h2>
                <p>Set up your profile and gain access to personalized tools.</p>
              </div>
              <button className="theme-toggle-btn" type="button" onClick={toggleTheme}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>

            {error && (
              <div style={{ color: '#ef4444', marginBottom: '14px' }}>{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Create Account</button>
            </form>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
