import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const PublicProfile = ({ onLogout }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/social/profile/${userId}`);
        setUser(response.data.user);
        setSummary(response.data.summary);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const styles = useMemo(() => ({
    container: {
      padding: '16px 16px 32px',
      maxWidth: '960px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      color: theme.text,
    },
    card: {
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border || '#e2e8f0'}`,
      borderRadius: '20px',
      padding: '18px',
      marginBottom: '16px',
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
    },
  }), [theme]);

  if (loading) {
    return (
      <AppLayout onLogout={onLogout} theme={theme} darkMode={darkMode} toggleTheme={() => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem('darkMode', String(next));
      }}>
        <div style={styles.container}>Loading profile...</div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout onLogout={onLogout} theme={theme} darkMode={darkMode} toggleTheme={() => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem('darkMode', String(next));
      }}>
        <div style={styles.container}>This profile could not be found.</div>
      </AppLayout>
    );
  }

  const stats = summary?.stats || {};
  const streak = summary?.streak || {};
  const personalRecords = {
    longestDistanceKm: Number(stats.longest_distance || 0),
    highestCalories: Number(stats.highest_calories || 0),
    highestRpm: Number(stats.highest_rpm || 0),
    highestPower: Number(stats.highest_power || 0),
  };

  return (
    <AppLayout onLogout={onLogout} theme={theme} darkMode={darkMode} toggleTheme={() => {
      const next = !darkMode;
      setDarkMode(next);
      localStorage.setItem('darkMode', String(next));
    }}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>{user.username}</h2>
          <p style={{ color: theme.secondaryText, marginTop: '-6px' }}>Public performance profile</p>
        </div>

        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <div><strong>{Number(stats.total_workouts || 0)}</strong><br />Workouts</div>
            <div><strong>{Number(stats.total_distance_km || 0).toFixed(1)} km</strong><br />Distance</div>
            <div><strong>{Number(stats.total_calories || 0)}</strong><br />Calories</div>
            <div><strong>{Math.round(Number(stats.total_duration_seconds || 0) / 3600)}h</strong><br />Time</div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>Streaks</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <div><strong>{streak.currentStreak || 0}</strong><br />Current streak</div>
            <div><strong>{streak.longestStreak || 0}</strong><br />Longest streak</div>
            <div><strong>{streak.activeDays || 0}</strong><br />Active days</div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>Personal records</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <div><strong>{personalRecords.longestDistanceKm.toFixed(1)} km</strong><br />Longest ride</div>
            <div><strong>{personalRecords.highestCalories}</strong><br />Highest calories</div>
            <div><strong>{personalRecords.highestRpm}</strong><br />Highest RPM</div>
            <div><strong>{personalRecords.highestPower}</strong><br />Highest power</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PublicProfile;
