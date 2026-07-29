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

        <div className="auth-speedlines" aria-hidden="true">
          <div className="auth-speedline" style={{ top: '18%', left: '8%', animationDuration: '7.2s' }} />
          <div className="auth-speedline" style={{ top: '38%', left: '12%', animationDuration: '9.4s' }} />
          <div className="auth-speedline" style={{ top: '64%', left: '6%', animationDuration: '8.8s' }} />
          <div className="auth-speedline" style={{ top: '24%', left: '36%', animationDuration: '10.2s' }} />
        </div>

        <img src={heroSrc} alt="bike hero" className="auth-hero" />
      </div>
      <div className="auth-card">
        <div className="auth-visual">
          <svg viewBox="0 0 640 420" className="auth-visual-hero-inline" role="img" aria-label="Cycling dashboard illustration">
            <defs>
              <linearGradient id="trackGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="panelGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <rect x="40" y="44" width="560" height="332" rx="24" fill="rgba(10, 13, 28, 0.65)" stroke="rgba(255,255,255,0.18)" />
            <path d="M110 300C180 180 250 150 320 150C390 150 460 190 530 300" stroke="url(#trackGlow)" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="180" cy="240" r="46" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <circle cx="450" cy="240" r="46" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <circle cx="180" cy="240" r="16" fill="#fff" />
            <circle cx="450" cy="240" r="16" fill="#fff" />
            <rect x="205" y="164" width="152" height="94" rx="18" fill="url(#panelGlow)" opacity="0.96" />
            <path d="M250 180L302 180L328 214L302 248H250L224 214Z" fill="#0f172a" opacity="0.7" />
            <path d="M330 176L390 176" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            <path d="M295 242L340 272" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            <rect x="108" y="88" width="116" height="36" rx="18" fill="rgba(255,255,255,0.16)" />
            <rect x="412" y="86" width="86" height="28" rx="14" fill="rgba(255,255,255,0.16)" />
            <path d="M120 104H196" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
            <path d="M430 100H470" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          </svg>
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
