import { useEffect, useState } from 'react';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';
import StatsCards from '../components/StatsCards';
import ProgressChart from '../components/ProgressChart';
import API from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('darkMode') === 'true';
});

  useEffect(() => {
    fetchWorkouts();
    fetchStats();
    fetchWeeklyData();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response =
        await API.get('/workouts');

      setWorkouts(response.data.workouts);

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
  try {
    const response =
      await API.get('/workouts/stats');

    setStats(response.data.stats);

  } catch (error) {
    console.error(error);
  }
};

const fetchWeeklyData = async () => {
  try {
    const response =
      await API.get('/workouts/weekly');

    setWeeklyData(
      response.data.weeklySummary
    );

  } catch (error) {
    console.error(error);
  }
};

const toggleTheme = () => {
  const newTheme = !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    'darkMode',
    newTheme
  );
};

if (loading) {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <h2>Loading dashboard...</h2>
    </div>
  );
}
  return (
    <div
  className="dashboard-container"
  style={{
    backgroundColor: darkMode
      ? '#121212'
      : '#f4f7fb',

    minHeight: '100vh',

    transition:
      'background-color 0.3s ease',
  }}
>
      
     <h1
  className="dashboard-title"
  style={{
    color: darkMode
      ? '#90caf9'
      : '#1565c0',
  }}
>
        Spin Tracker Dashboard 🚴
      </h1>
      <div
  style={{
    textAlign: 'center',
    marginBottom: '20px',
  }}
>
  <button
    onClick={toggleTheme}
    style={{
      padding: '10px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: darkMode
        ? '#90caf9'
        : '#1565c0',
      color: darkMode
        ? '#121212'
        : 'white',
      fontWeight: 'bold',
    }}
  >
    {darkMode
      ? '☀️ Light Mode'
      : '🌙 Dark Mode'}
  </button>
</div>

      <StatsCards
  stats={stats}
  darkMode={darkMode}
/>
      <ProgressChart
  data={weeklyData}
  darkMode={darkMode}
/>
      <div className="dashboard-grid">
        <WorkoutForm
        darkMode={darkMode}
  fetchWorkouts={fetchWorkouts}
  fetchStats={fetchStats}
  fetchWeeklyData={fetchWeeklyData}
/>
        <WorkoutHistory
        darkMode={darkMode}
          workouts={workouts}
        />
      </div>
    </div>
  );
};

export default Dashboard;