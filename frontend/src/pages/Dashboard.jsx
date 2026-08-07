import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../components/StatsCards';
import DashboardHero from '../components/DashboardHero';
import FitnessInsights from '../components/FitnessInsights';
import TrendCards from '../components/TrendCards';
import SmartCoach from '../components/SmartCoach';
import MilestonePanel from '../components/MilestonePanel';
import ActivityFeed from '../components/ActivityFeed';
import HealthScore from '../components/HealthScore';
import QuickActions from '../components/QuickActions';
import API from '../services/api';
import '../styles/dashboard.css';
import AppLayout from "../components/AppLayout";

const Dashboard = ({ user, onLogout, theme, darkMode, toggleTheme }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [records, setRecords] = useState({});
  const [streaks, setStreaks] = useState({});
  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState({});
  const [coachingTips, setCoachingTips] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    'Loading stats…',
    'Syncing data…',
    'Analyzing trends…',
    'Preparing insights…'
  ];

  useEffect(() => {
    if (!loading) return;

    const messageTimer = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);

    return () => clearInterval(messageTimer);
  }, [loading, loadingMessages.length]);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchStats(),
          fetchRecords(),
          fetchStreaks(),
          fetchInsights(),
          fetchTrends(),
          fetchCoachingTips(),
          fetchMilestones(),
          fetchActivity(),
        ]);
      } catch (error) {
        console.error('Dashboard load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
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

  const fetchRecords = async () => {
    try {
      const response = await API.get('/workouts/records');
      setRecords(response.data.records);
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

  const fetchInsights = async () => {
    try {
      const response = await API.get('/workouts/insights');
      setInsights(response.data.insights);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchCoachingTips = async () => {
    try {
      const response = await API.get('/workouts/coaching');
      setCoachingTips(response.data.tips);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchMilestones = async () => {
    try {
      const response = await API.get('/workouts/milestones');
      setMilestones(response.data.milestones);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await API.get('/workouts/activity');
      setActivities(response.data.activities);
    } catch(error) {
      console.error(error);
    }
  };

  const fetchTrends = async () => {
    try {
      const response = await API.get('/workouts/trends');
      setTrends(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loader-shell">
        <div className="loader-particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="loader-particle"
              style={{
                left: `${(index * 13) % 100}%`,
                top: `${(index * 17) % 100}%`,
                width: `${(index % 3) + 4}px`,
                height: `${(index % 3) + 4}px`,
                animationDelay: `${index * 0.28}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="dashboard-loader"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="loader-cyclist-wrap"
            animate={{ y: [0, -8, 0], rotate: [0, -7, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="loader-cyclist">🚴</span>
          </motion.div>

          <motion.div
            className="loader-orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <span className="orbit-dot dot-three" />
          </motion.div>

          <motion.div
            className="loader-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <span className="loader-icon">⚡</span>
            <span>Spin Tracker</span>
          </motion.div>

          <motion.h2
            className="loader-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            Preparing your dashboard
          </motion.h2>

          <motion.p
            key={loadingMessages[loadingMessageIndex]}
            className="loader-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {loadingMessages[loadingMessageIndex]}
          </motion.p>

          <div className="loader-bar">
            <motion.div
              className="loader-bar-fill"
              initial={{ width: '12%' }}
              animate={{ width: ['12%', '42%', '72%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AppLayout
      onLogout={onLogout}
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    >
      <div
        className="dashboard-content"
        style={{
          flex: 1,
          padding: '20px',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* 1. DashboardHero */}
        <DashboardHero user={user} streaks={streaks} records={records} theme={theme} />

        {/* 2. HealthScore */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <HealthScore
            stats={stats}
            streaks={streaks}
            achievements={[]}
            theme={theme}
          />
        </motion.div>

        {/* 3. QuickActions */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              ⚡ Quick Actions
            </h2>
            <span className="section-subtitle">Shortcuts</span>
          </div>
          <QuickActions theme={theme} />
        </motion.div>

        {/* 4. StatsCards */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📊 Workout Overview
            </h2>
            <span className="section-subtitle">Total Statistics</span>
          </div>
          <StatsCards stats={stats} theme={theme} />
        </motion.div>

        {/* 5. FitnessInsights */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              💡 Fitness Insights
            </h2>
            <span className="section-subtitle">Personalized Recommendations</span>
          </div>
          <FitnessInsights insights={insights} theme={theme} />
        </motion.div>

        {/* 6. TrendCards */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📈 Performance Trends
            </h2>
            <span className="section-subtitle">Last 7 Days</span>
          </div>
          <TrendCards trends={trends} theme={theme} />
        </motion.div>

        {/* 7. SmartCoach */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🧠 Smart Coach
            </h2>
            <span className="section-subtitle">AI-Powered Guidance</span>
          </div>
          <SmartCoach tips={coachingTips} theme={theme} />
        </motion.div>

        {/* 8. MilestonePanel */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🎉 Milestones
            </h2>
            <span className="section-subtitle">Your Journey Highlights</span>
          </div>
          <MilestonePanel milestones={milestones} theme={theme} />
        </motion.div>

        {/* 9. ActivityFeed */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🚴 Recent Activity
            </h2>
            <span className="section-subtitle">Latest Workouts</span>
          </div>
          <ActivityFeed activities={activities} theme={theme} />
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;