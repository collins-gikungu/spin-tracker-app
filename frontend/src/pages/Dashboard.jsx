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
import { lightTheme, darkTheme } from '../styles/theme';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
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
  
  const [records, setRecords] = useState({});
  const [streaks, setStreaks] = useState({});
  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState({});
  const [coachingTips, setCoachingTips] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchWorkouts(),
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

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (loading && (!workouts || workouts.length === 0)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
  <AppLayout
    onLogout={onLogout}
    theme={theme}
  >
    <div className="dashboard-content">
        {/* 1. DashboardHero */}
        <DashboardHero user={user} streaks={streaks} records={records} theme={theme} />
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: theme.background,
              color: theme.primary,
              fontWeight: 'bold',
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p>Welcome, {user?.username} 🚴</p>
          <Link to="/profile">
            <button style={{
              padding: '10px',
              marginRight: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: theme.primary,
              color: 'white'
            }}>
              My Profile
            </button>
          </Link>
          <button
            onClick={onLogout}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: '#d32f2f',
              color: 'white'
            }}>
            Logout
          </button>
        </div>

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