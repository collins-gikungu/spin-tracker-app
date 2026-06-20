import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';
import WorkoutStreaks from '../components/WorkoutStreaks';
import StatsCards from '../components/StatsCards';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Workouts = () => {
  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem('workouts');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {};
  });

  const [streaks, setStreaks] = useState({});

  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchWorkouts(),
          fetchStats(),
          fetchStreaks(),
        ]);
      } catch (error) {
        console.error('Workouts load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await API.get('/workouts');
      setWorkouts(response.data.workouts);
      localStorage.setItem('workouts', JSON.stringify(response.data.workouts));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await API.get('/workouts/stats');
      setStats(response.data.stats);
      localStorage.setItem('stats', JSON.stringify(response.data.stats));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStreaks = async () => {
    try {
      const response = await API.get('/workouts/streaks');
      setStreaks(response.data.streaks);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (loading && (!workouts || workouts.length === 0)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading workouts...</h2>
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
          <h1 style={{ color: theme.text }}>🚴 Workouts Hub</h1>
          <p style={{ color: theme.text }}>
            Manage workouts, review ride history, and track session performance.
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

      {/* Section 1 - Workout Overview (delay: 0.05) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📊 Workout Overview
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Total Statistics
          </span>
        </div>
        <StatsCards stats={stats} theme={theme} />
      </motion.div>

      {/* Section 2 - Workout Consistency (delay: 0.1) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🔥 Workout Consistency
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Current Streak & Activity
          </span>
        </div>
        <WorkoutStreaks streaks={streaks} theme={theme} />
      </motion.div>

      {/* Grid sections with progressive delays */}
      <div className="dashboard-grid">
        {/* Section 3 - Add Workout (delay: 0.15) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              ➕ Add Workout
            </h2>
            <span className="section-subtitle" style={{ color: theme.text }}>
              Log Your Session
            </span>
          </div>
          <WorkoutForm
            theme={theme}
            fetchWorkouts={fetchWorkouts}
            fetchStats={fetchStats}
            fetchWeeklyData={() => {}} // Pass empty function since we don't need weekly data here
          />
        </motion.div>

        {/* Section 4 - Workout History (delay: 0.2) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📜 Workout History
            </h2>
            <span className="section-subtitle" style={{ color: theme.text }}>
              Recent Rides
            </span>
          </div>
          <WorkoutHistory theme={theme} workouts={workouts} />
        </motion.div>
      </div>
    </div>
  );
};

export default Workouts;