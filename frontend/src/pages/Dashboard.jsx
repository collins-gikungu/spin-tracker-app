import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';
import StatsCards from '../components/StatsCards';
import ProgressChart from '../components/ProgressChart';
import MonthlyChart from '../components/MonthlyChart';
import PersonalRecords from '../components/PersonalRecords';
import WorkoutStreaks from '../components/WorkoutStreaks';
import DashboardHero from '../components/DashboardHero';
import GoalTracker from '../components/GoalTracker';
import FitnessInsights from '../components/FitnessInsights';
import AchievementGallery from '../components/AchievementGallery';
import TrendCards from '../components/TrendCards';
import SmartCoach from '../components/SmartCoach';
import MilestonePanel from '../components/MilestonePanel';
import ActivityFeed from '../components/ActivityFeed';
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

  const [achievements, setAchievements] = useState([]);
  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState({});
  const [coachingTips, setCoachingTips ] = useState([]);
  const [milestones, setMilestones ] = useState([]);
  const [activities, setActivities ] = useState([]);
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
          fetchAchievements(),
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

  const fetchCoachingTips =
async () => {

try {

const response =
await API.get(
'/workouts/coaching'
);

setCoachingTips(
response.data.tips
);

}

catch(error){

console.error(
error
);

}

};

const fetchMilestones =
async () => {

try {

const response =
await API.get(
'/workouts/milestones'
);

setMilestones(
response.data.milestones
);

}

catch(error){

console.error(
error
);

}

};

const fetchActivity =
async () => {

try {

const response =
await API.get(
'/workouts/activity'
);

setActivities(
response.data.activities
);

}

catch(error){

console.error(
error
);

}

};

  const fetchAchievements = async () => {
    try {
      const response = await API.get('/workouts/achievements');
      setAchievements(response.data.achievements);
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

        {/* Section 1 - Workout Overview (delay: 0.1) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="section-title">Workout Overview</h2>
          <StatsCards stats={stats} theme={theme} />
        </motion.div>
        
        {/* Section 2 - Weekly Progress (delay: 0.2) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="section-title">Weekly Progress</h2>
          <ProgressChart data={weeklyData} theme={theme} />
        </motion.div>

        {/* Section 3 - Monthly Analytics (delay: 0.3) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="section-title">Monthly Analytics</h2>
          <MonthlyChart data={monthlyData} theme={theme} />
        </motion.div>

        {/* Section 4 - Personal Records (delay: 0.4) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="section-title">Personal Records 🏆</h2>
          <PersonalRecords records={records} theme={theme} />
        </motion.div>

        {/* Section 5 - Workout Consistency (delay: 0.5) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="section-title">Workout Consistency 🔥</h2>
          <WorkoutStreaks streaks={streaks} theme={theme} />
        </motion.div>

        {/* Section 6 - Goal Tracking (delay: 0.6) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="section-title">Goal Tracking 🎯</h2>
          <GoalTracker stats={stats} theme={theme} />
        </motion.div>

        {/* Section 7 - Fitness Insights (delay: 0.7) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="section-title">Fitness Insights 💡</h2>
          <FitnessInsights insights={insights} theme={theme} />
        </motion.div>

        {/* Section 8 - Performance Trends (delay: 0.75) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <h2 style={{ color: theme.primary }}>
            📈 Performance Trends
          </h2>
          <TrendCards trends={trends} theme={theme} />
        </motion.div>

        <motion.div
  className="page-section"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.78 }}
>

<h2
style={{
color:theme.primary
}}
>
🧠 Smart Coach
</h2>

<SmartCoach
tips={coachingTips}
theme={theme}
/>

</motion.div>

<motion.div
  className="page-section"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration:0.5,
    delay:0.79
  }}
>

<h2
style={{
color:theme.primary
}}
>
🎉 Milestones
</h2>

<MilestonePanel
milestones={milestones}
theme={theme}
/>

</motion.div>

<motion.div
  className="page-section"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration:0.5,
    delay:0.82
  }}
>

<h2
style={{
color:theme.primary
}}
>
🚴 Recent Activity
</h2>

<ActivityFeed
activities={activities}
theme={theme}
/>

</motion.div>

        {/* Section 9 - Achievements (delay: 0.8) */}
        <motion.div
          className="page-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="section-title" style={{ color: theme.primary }}>
            🏆 Achievements
          </h2>
          <AchievementGallery achievements={achievements} theme={theme} />
        </motion.div>

        {/* Grid sections with progressive delays */}
        <div className="dashboard-grid">
          {/* Section 10 - Add Workout (delay: 0.9) */}
          <motion.div
            className="page-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h2 className="section-title">Add Workout</h2>
            <WorkoutForm
              theme={theme}
              fetchWorkouts={fetchWorkouts}
              fetchStats={fetchStats}
              fetchWeeklyData={fetchWeeklyData}
            />
          </motion.div>
          
          {/* Section 11 - Workout History (delay: 1.0) */}
          <motion.div
            className="page-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h2 className="section-title">Workout History</h2>
            <WorkoutHistory theme={theme} workouts={workouts} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;