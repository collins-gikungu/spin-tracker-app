import { useEffect, useState } from 'react';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';
import StatsCards from '../components/StatsCards';
import ProgressChart from '../components/ProgressChart';
import API from '../services/api';
import '../styles/dashboard.css';
import {lightTheme,darkTheme,} from '../styles/theme';

const Dashboard = ({
user,
onLogout
}) => {
  const [workouts, setWorkouts] = useState(() => {

  try {

    const saved =
      localStorage.getItem(
        'workouts'
      );

    const parsed =
      saved
        ? JSON.parse(saved)
        : [];

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch {

    return [];

  }

});
const [stats, setStats] = useState(() => {
  const saved = localStorage.getItem('stats');
  return saved
    ? JSON.parse(saved)
    : {};
});
const [weeklyData, setWeeklyData] = useState(() => {
  const saved =
    localStorage.getItem('weeklyData');
  return saved
    ? JSON.parse(saved)
    : [];
});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('darkMode') === 'true';
});
const theme = darkMode
  ? darkTheme
  : lightTheme;

  useEffect(() => {

  const loadDashboard = async () => {

    setLoading(true);

    try {

      await Promise.all([
        fetchWorkouts(),
        fetchStats(),
        fetchWeeklyData(),
      ]);

    } catch (error) {

      console.error(
        'Dashboard load failed:',
        error
      );

    } finally {

      setLoading(false);

    }

  };

  loadDashboard();

}, []);

  const fetchWorkouts = async () => {

  try {

    const response =
      await API.get('/workouts');

    setWorkouts(
      response.data.workouts
    );

    localStorage.setItem(
  'workouts',
  JSON.stringify(
    response.data.workouts
  )
);

  } catch (error) {

    console.error(error);

  }

};

  const fetchStats = async () => {
  try {
    const response =
      await API.get('/workouts/stats');

    setStats(response.data.stats);
    localStorage.setItem(
  'stats',
  JSON.stringify(
    response.data.stats
  )
);

  } catch (error) {
    console.error(error);
  }
};

const fetchWeeklyData = async () => {
  try {
    const response =
      await API.get('/workouts/weekly');

    setWeeklyData(response.data.weeklySummary);
    localStorage.setItem(
  'weeklyData',
  JSON.stringify(
    response.data.weeklySummary
  )
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

if (
 loading &&
 (!workouts ||
  workouts.length === 0)
)
{
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
  backgroundColor: theme.background,
  minHeight: '100vh',
  transition: 'all 0.3s ease',
}}
>
      
     <h1
  className="dashboard-title"
  style={{
    color: theme.primary
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
      backgroundColor: theme.background,
      color: theme.primary,
      fontWeight: 'bold',
    }}
  >
    {darkMode
      ? '☀️ Light Mode'
      : '🌙 Dark Mode'}
  </button>
</div>
<div
style={{
textAlign:'center',
marginBottom:'20px'
}}
>

<p>

Welcome,
{user.username}
🚴

</p>

<button

onClick={
onLogout
}

style={{

padding:'10px',

border:'none',

borderRadius:'8px',

cursor:'pointer',

background:
'#d32f2f',

color:'white'

}}

>

Logout

</button>

</div>

      <StatsCards
  stats={stats}
  theme={theme}
/>
      <ProgressChart
  data={weeklyData}
  theme={theme}
/>
      <div className="dashboard-grid">
        <WorkoutForm
        theme={theme}
  fetchWorkouts={fetchWorkouts}
  fetchStats={fetchStats}
  fetchWeeklyData={fetchWeeklyData}
/>
        <WorkoutHistory
        theme={theme}
          workouts={workouts}
        />
      </div>
    </div>
  );
};

export default Dashboard;