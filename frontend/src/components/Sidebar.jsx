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

  const navStyle = (path) => ({
    display: 'block',
    padding: '12px 16px',
    marginBottom: '10px',
    borderRadius: '8px',
    textDecoration: 'none',
    backgroundColor: isActiveRoute(path) ? effectiveTheme.primary : 'transparent',
    color: isActiveRoute(path) ? '#ffffff' : effectiveTheme.text,
    fontWeight: '700',
    transition: 'all 0.3s ease',
  });

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

      {isOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setIsOpen(false)}
  />
)}

      <div
        className={isOpen ? 'sidebar open' : 'sidebar'}
        style={{
          padding: '20px',
          boxShadow: '2px 0 10px rgba(0,0,0,0.08)',
          background: effectiveTheme.card,
          color: effectiveTheme.text,
        }}
      >
        <h2 style={{ marginBottom: '30px', color: effectiveTheme.primary }}>
         Spin Tracker 🚴
        </h2>

        <Link
  to="/"
  style={navStyle('/')}
  onClick={() => setIsOpen(false)}
>
          🏠 Dashboard
        </Link>

        <Link to="/history" style={navStyle('/history')}
        onClick={() => setIsOpen(false)}>
          📜 History
        </Link>

        <Link to="/workouts" style={navStyle('/workouts')}
        onClick={() => setIsOpen(false)}>
          🚴 Workouts
        </Link>

        <Link to="/analytics" style={navStyle('/analytics')}
        onClick={() => setIsOpen(false)}>
          📊 Analytics
        </Link>

        <Link to="/goals" style={navStyle('/goals')}
        onClick={() => setIsOpen(false)}>
          🎯 Goals
        </Link>

        <Link to="/achievements" style={navStyle('/achievements')}
        onClick={() => setIsOpen(false)}>
          🏆 Achievements
        </Link>

        <Link to="/profile" style={navStyle('/profile')}
        onClick={() => setIsOpen(false)}>
          👤 Profile
        </Link>

        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px',
            background: '#d32f2f',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;