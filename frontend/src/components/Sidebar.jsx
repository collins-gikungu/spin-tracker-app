import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/sidebar.css";

const Sidebar = ({ onLogout, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const effectiveTheme = theme || {
    card: '#ffffff',
    text: '#111827',
    primary: '#1976d2',
    secondaryText: '#64748b',
  };

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navClassName = (path) => `nav-link ${isActiveRoute(path) ? 'active' : ''}`;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-btn"
        style={{
          display: 'none',
          padding: '10px 15px',
          fontSize: '24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
        }}
      >
        ☰
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <div
        className={isOpen ? 'sidebar open' : 'sidebar'}
        style={{
          background: effectiveTheme.card,
          color: effectiveTheme.text,
        }}
      >
        <div className="brand">
          <div className="brand-badge">🚴</div>
          <div>
            <h2>Spin Tracker</h2>
            <p>Fitness OS</p>
          </div>
        </div>

        <Link to="/" className={navClassName('/')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">🏠</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/history" className={navClassName('/history')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">📜</span>
          <span>History</span>
        </Link>

        <Link to="/workouts" className={navClassName('/workouts')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">⚙️</span>
          <span>Workouts</span>
        </Link>

        <Link to="/analytics" className={navClassName('/analytics')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">📊</span>
          <span>Analytics</span>
        </Link>

        <Link to="/goals" className={navClassName('/goals')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">🎯</span>
          <span>Goals</span>
        </Link>

        <Link to="/achievements" className={navClassName('/achievements')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">🏆</span>
          <span>Achievements</span>
        </Link>

        <Link to="/profile" className={navClassName('/profile')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </Link>

        <Link to="/community" className={navClassName('/community')} onClick={() => setIsOpen(false)}>
          <span className="nav-icon">🤝</span>
          <span>Community</span>
        </Link>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;