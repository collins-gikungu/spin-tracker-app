import { useEffect, useRef, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const heroSrc = '/image001.png';

const Login = ({ onLogin, darkMode, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.6 + 0.7,
      speedX: (Math.random() - 0.5) * 0.16,
      speedY: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.35 + 0.12,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const aurora = ctx.createLinearGradient(0, 0, width, height);
      aurora.addColorStop(0, 'rgba(255, 120, 100, 0.06)');
      aurora.addColorStop(0.5, 'rgba(70, 170, 255, 0.04)');
      aurora.addColorStop(1, 'rgba(180, 140, 255, 0.06)');
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -10 || particle.x > width + 10) particle.speedX *= -1;
        if (particle.y < -10 || particle.y > height + 10) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
        ctx.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const other = particles[nextIndex];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        }
      });

      const orbitX = width * 0.5 + Math.sin(time / 4800) * width * 0.16;
      const orbitY = height * 0.36 + Math.cos(time / 5600) * height * 0.12;
      const glow = ctx.createRadialGradient(orbitX, orbitY, 0, orbitX, orbitY, 220);
      glow.addColorStop(0, 'rgba(255,255,255,0.15)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(orbitX, orbitY, 220, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

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
        <canvas ref={canvasRef} className="auth-canvas" aria-hidden="true" />
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
              <br />
              <Link to="/forgot-password" style={{ fontSize: '0.9em', marginTop: '8px', display: 'block' }}>Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
