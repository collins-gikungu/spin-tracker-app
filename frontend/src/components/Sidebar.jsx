import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/sidebar.css";

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
    backgroundColor: isActiveRoute(path) ? '#1976d2' : 'transparent',
    color: isActiveRoute(path) ? 'white' : '#333',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: isActiveRoute(path) ? '#1976d2' : '#f0f0f0',
    }
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
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          background: '#fff',
        }}
      >
        <h2 style={{ marginBottom: '30px', color: '#1976d2' }}>
          Spin Tracker 🚴
        </h2>

        <Link
  to="/"
  style={navStyle('/')}
  onClick={() => setIsOpen(false)}
>
          🏠 Dashboard
        </Link>

        <Link to="/history" style={navStyle('/history')}>
          📜 History
        </Link>

        <Link to="/workouts" style={navStyle('/workouts')}>
          🚴 Workouts
        </Link>

        <Link to="/analytics" style={navStyle('/analytics')}>
          📊 Analytics
        </Link>

        <Link to="/goals" style={navStyle('/goals')}>
          🎯 Goals
        </Link>

        <Link to="/achievements" style={navStyle('/achievements')}>
          🏆 Achievements
        </Link>

        <Link to="/profile" style={navStyle('/profile')}>
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