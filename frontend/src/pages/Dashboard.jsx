import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../components/StatsCards';
import ProgressChart from '../components/ProgressChart';
import MonthlyChart from '../components/MonthlyChart';
import PersonalRecords from '../components/PersonalRecords';
import WorkoutStreaks from '../components/WorkoutStreaks';
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
import Sidebar from '../components/Sidebar';
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
  const [weeklyData, setWeeklyData] = useState(() => {
    const saved = localStorage.getItem('weeklyData');
    return saved ? JSON.parse(saved) : [];
  });

  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState({});
  const [coachingTips, setCoachingTips] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [activities, setActivities] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
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
          fetchWeeklyData(),
          fetchMonthlyData(),
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

  const fetchWeeklyData = async () => {
    try {
      const response = await API.get('/workouts/weekly');
      setWeeklyData(response.data.weeklySummary);
      localStorage.setItem('weeklyData', JSON.stringify(response.data.weeklySummary));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await API.get('/workouts/monthly');
      const formattedData = response.data.monthlySummary.map(item => ({
        month: new Date(item.month_start).toLocaleString('default', { month: 'short' }),
        distance: Number(item.total_distance_km)
      }));
      setMonthlyData(formattedData);
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
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      backgroundColor: theme.background,
      minHeight: '100vh'
    }}>
      <Sidebar onLogout={onLogout} />
      
      <div className="dashboard-content" style={{ flex: 1, padding: '20px' }}>
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

        {/* HealthScore */}
        <motion.div
          className="page-section"
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:0.5,
            delay:0.2
          }}
        >
          <HealthScore
            stats={stats}
            streaks={streaks}
            achievements={[]}
            theme={theme}
          />
        </motion.div>

        {/* QuickActions */}
        <motion.div
          className="page-section"
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:0.5,
            delay:0.25
          }}
        >
          <div className="section-header">
            <h2
              className="section-title"
              style={{
                color: theme.primary
              }}
            >
              ⚡ Quick Actions
            </h2>
            <span
              className="section-subtitle"
            >
              Shortcuts
            </span>
          </div>
          <QuickActions
            theme={theme}
          />
        </motion.div>

        {/* Section 1 - Workout Overview (delay: 0.1) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📊 Workout Overview
            </h2>
            <span className="section-subtitle">
              Total Statistics
            </span>
          </div>
          <StatsCards stats={stats} theme={theme} />
        </motion.div>
        
        {/* Section 2 - Weekly Progress (delay: 0.2) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📈 Weekly Progress
            </h2>
            <span className="section-subtitle">
              Last 7 Days Performance
            </span>
          </div>
          <ProgressChart data={weeklyData} theme={theme} />
        </motion.div>

        {/* Section 3 - Monthly Analytics (delay: 0.3) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📅 Monthly Analytics
            </h2>
            <span className="section-subtitle">
              Monthly Distance Trends
            </span>
          </div>
          <MonthlyChart data={monthlyData} theme={theme} />
        </motion.div>

        {/* Section 4 - Personal Records (delay: 0.4) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🏆 Personal Records
            </h2>
            <span className="section-subtitle">
              Your Best Performances
            </span>
          </div>
          <PersonalRecords records={records} theme={theme} />
        </motion.div>

        {/* Section 5 - Workout Consistency (delay: 0.5) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🔥 Workout Consistency
            </h2>
            <span className="section-subtitle">
              Current Streak & Activity
            </span>
          </div>
          <WorkoutStreaks streaks={streaks} theme={theme} />
        </motion.div>

        {/* Section 6 - Fitness Insights (delay: 0.6) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              💡 Fitness Insights
            </h2>
            <span className="section-subtitle">
              Personalized Recommendations
            </span>
          </div>
          <FitnessInsights insights={insights} theme={theme} />
        </motion.div>

        {/* Section 7 - Performance Trends (delay: 0.7) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              📈 Performance Trends
            </h2>
            <span className="section-subtitle">
              Last 7 Days
            </span>
          </div>
          <TrendCards trends={trends} theme={theme} />
        </motion.div>

        {/* Section 8 - Smart Coach (delay: 0.8) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🧠 Smart Coach
            </h2>
            <span className="section-subtitle">
              AI-Powered Guidance
            </span>
          </div>
          <SmartCoach tips={coachingTips} theme={theme} />
        </motion.div>

        {/* Section 9 - Milestones (delay: 0.85) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🎉 Milestones
            </h2>
            <span className="section-subtitle">
              Your Journey Highlights
            </span>
          </div>
          <MilestonePanel milestones={milestones} theme={theme} />
        </motion.div>

        {/* Section 10 - Recent Activity (delay: 0.9) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.primary }}>
              🚴 Recent Activity
            </h2>
            <span className="section-subtitle">
              Latest Workouts
            </span>
          </div>
          <ActivityFeed activities={activities} theme={theme} />
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;