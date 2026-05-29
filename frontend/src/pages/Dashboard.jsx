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
import API from '../services/api';
import '../styles/dashboard.css';
import Sidebar from '../components/Sidebar';
import { lightTheme, darkTheme } from '../styles/theme';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  // REMOVED: const [user, setUser] = useState(null); ← DELETE THIS LINE
  
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

  // REMOVED: const savedUser = JSON.parse(localStorage.getItem('user'));
  // REMOVED: setUser(savedUser); ← This was outside any function and causing errors

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
duration:0.5
}}

>
          <h2 className="section-title">Workout Overview</h2>
          <StatsCards stats={stats} theme={theme} />
        </motion.div>
        
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
duration:0.5
}}

>
  <h2 className="section-title">
    Weekly Progress
  </h2>

  <ProgressChart
    data={weeklyData}
    theme={theme}
  />
</motion.div>

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
duration:0.5
}}

>
  <h2 className="section-title">
    Monthly Analytics
  </h2>

  <MonthlyChart
    data={monthlyData}
    theme={theme}
  />
</motion.div>

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
duration:0.5
}}

>
          <h2 className="section-title">Personal Records 🏆</h2>
          <PersonalRecords records={records} theme={theme} />
        </motion.div>

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
duration:0.5
}}

>
          <h2 className="section-title">Workout Consistency 🔥</h2>
          <WorkoutStreaks streaks={streaks} theme={theme} />
        </motion.div>

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
duration:0.5
}}

>
<h2 className="section-title">Goal Tracking 🎯</h2>
<GoalTracker stats={stats} theme={theme} />
</motion.div>

        <div className="dashboard-grid">
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
duration:0.5
}}

>
            <h2 className="section-title">Add Workout</h2>
            <WorkoutForm
              theme={theme}
              fetchWorkouts={fetchWorkouts}
              fetchStats={fetchStats}
              fetchWeeklyData={fetchWeeklyData}
            />
          </motion.div>
          
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
duration:0.5
}}

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