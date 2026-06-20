import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AchievementGallery from "../components/AchievementGallery";
import MilestonePanel from "../components/MilestonePanel";
import ActivityFeed from "../components/ActivityFeed";
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [activities, setActivities] = useState([]);
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
    const loadAchievements = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchAchievements(),
          fetchMilestones(),
          fetchActivity(),
          fetchStats(),
        ]);
      } catch (error) {
        console.error('Achievements load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await API.get('/workouts/achievements');
      setAchievements(response.data.achievements);
      console.log('Achievements fetched:', response.data.achievements);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchMilestones = async () => {
    try {
      const response = await API.get('/workouts/milestones');
      setMilestones(response.data.milestones);
      console.log('Milestones fetched:', response.data.milestones);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await API.get('/workouts/activity');
      setActivities(response.data.activities);
      console.log('Activities fetched:', response.data.activities);
    } catch(error) {
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

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  // Calculate achievement stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const unlockedPercentage = totalAchievements > 0 
    ? Math.round((unlockedAchievements / totalAchievements) * 100) 
    : 0;

  // Calculate milestone stats
  const totalMilestones = milestones.length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading achievements...</h2>
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
          <h1 style={{ color: theme.text }}>🏆 Achievements Center</h1>
          <p style={{ color: theme.text }}>
            Celebrate milestones, unlock badges, and track your fitness accomplishments.
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

      {/* Achievement Stats Cards */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📊 Achievement Stats
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Your Progress Overview
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div
            style={{
              background: theme.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: theme.text, marginBottom: '10px' }}>🏅 Total Achievements</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: theme.primary }}>
              {totalAchievements}
            </p>
          </div>
          <div
            style={{
              background: theme.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: theme.text, marginBottom: '10px' }}>🔓 Unlocked</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>
              {unlockedAchievements}
            </p>
          </div>
          <div
            style={{
              background: theme.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: theme.text, marginBottom: '10px' }}>📈 Completion</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
              {unlockedPercentage}%
            </p>
          </div>
          <div
            style={{
              background: theme.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: theme.text, marginBottom: '10px' }}>🎯 Milestones</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>
              {totalMilestones}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 1 - Achievements (delay: 0.1) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🏆 Achievements
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Unlocked Badges & Awards
          </span>
        </div>
        <AchievementGallery achievements={achievements} theme={theme} />
      </motion.div>

      {/* Section 2 - Milestones (delay: 0.2) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🎉 Milestones
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Your Journey Highlights
          </span>
        </div>
        <MilestonePanel milestones={milestones} theme={theme} />
      </motion.div>

      {/* Section 3 - Recent Activity (delay: 0.3) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🚴 Recent Activity
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Latest Workouts
          </span>
        </div>
        <ActivityFeed activities={activities} theme={theme} />
      </motion.div>
    </div>
  );
};

export default Achievements;