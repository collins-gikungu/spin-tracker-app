import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GoalTracker from "../components/GoalTracker";
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Goals = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadGoals = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchStats(),
        ]);
      } catch (error) {
        console.error('Goals load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGoals();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get('/workouts/stats');
      setStats(response.data.stats);
      localStorage.setItem('stats', JSON.stringify(response.data.stats));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading goals...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: theme.background,
        minHeight: '100vh'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: theme.text }}>🎯 Goals Center</h1>
          <p style={{ color: theme.text }}>
            Monitor your progress and stay focused on your fitness objectives.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: theme.cardBackground,
            color: theme.primary,
            fontWeight: 'bold',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Section 1 - Goal Tracking (delay: 0.1) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🎯 Goal Tracking
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Progress Towards Your Goals
          </span>
        </div>
        <GoalTracker stats={stats} theme={theme} />
      </motion.div>
    </div>
  );
};

export default Goals;