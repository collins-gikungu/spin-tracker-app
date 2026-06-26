import { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const heroSrc = '/image001.png';

const Login = ({ onLogin, darkMode, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
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
          <div className="auth-visual-content">
            <span className="feature-chip">Modern ride tracking</span>
            <h3>Take every spin further</h3>
            <p>
              Sign in to review performance, stay motivated, and keep your
              training plan aligned with your goals.
            </p>
          </div>
        </div>

        <div className="auth-form">
          <div className="auth-form-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div>
                <h2>Login to Spin Tracker</h2>
                <p>Secure access to your workouts, stats, and goals.</p>
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
              <button type="submit">Login</button>
            </form>

            <div className="auth-footer">
              No account yet? <Link to="/register">Create one now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
