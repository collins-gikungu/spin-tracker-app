import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;
  const insights = [];

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await API.get(`/workouts/${id}`);
      setWorkout(response.data.workout);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (workout) {
    if (workout.distance_km >= 20) {
      insights.push('🏆 Long-distance achievement! Excellent endurance ride.');
    }

    if (workout.rpm >= 90) {
      insights.push('⚡ Outstanding cadence performance during this session.');
    }

    if (workout.calories >= 500) {
      insights.push('🔥 High-intensity effort detected. Great work!');
    }

    if (workout.duration_seconds >= 3600) {
      insights.push('🚴 Impressive endurance session lasting over an hour.');
    }

    if (insights.length === 0) {
      insights.push('💡 Solid ride! Keep building consistency.');
    }
  }

  if (loading) {
    return (
      <AppLayout theme={theme}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: theme.text }}>Loading Workout...</h2>
        </div>
      </AppLayout>
    );
  }

  if (!workout) {
    return (
      <AppLayout theme={theme}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: theme.text }}>Workout not found</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout theme={theme}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ color: theme.text }}>🚴 Workout #{workout.id}</h1>
            <p style={{ color: theme.text }}>
              📅 {new Date(workout.created_at).toLocaleString()}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            backgroundColor: theme.cardBackground,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${theme.border || '#eee'}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <p style={{ color: theme.text }}>
                <strong>⏱ Duration:</strong>{' '}
                {Math.floor(workout.duration_seconds / 60)} minutes
              </p>
              <p style={{ color: theme.text }}>
                <strong>📏 Distance:</strong> {workout.distance_km} KM
              </p>
              <p style={{ color: theme.text }}>
                <strong>🔥 Calories:</strong> {workout.calories}
              </p>
            </div>
            <div>
              <p style={{ color: theme.text }}>
                <strong>⚡ RPM:</strong> {workout.rpm}
              </p>
              <p style={{ color: theme.text }}>
                <strong>🔋 Power:</strong> {workout.power} W
              </p>
              <p style={{ color: theme.text }}>
                <strong>🛣 Odometer:</strong> {workout.odometer}
              </p>
            </div>
          </div>

          <hr style={{ borderColor: theme.border || '#ddd', margin: '20px 0' }} />

          <h2 style={{ color: theme.primary }}>💡 Session Insights</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '20px'
          }}>
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="stat-card"
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  backgroundColor: theme.input || '#f5f5f5',
                  color: theme.text,
                  border: `1px solid ${theme.border || '#eee'}`,
                }}
              >
                {insight}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default WorkoutDetails;