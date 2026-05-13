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
    <div className="dashboard-container">
      
     <h1 className="dashboard-title">
        Spin Tracker Dashboard 🚴
      </h1>

      <StatsCards stats={stats} />
      <ProgressChart data={weeklyData} />
      <div className="dashboard-grid">
        <WorkoutForm
  fetchWorkouts={fetchWorkouts}
  fetchStats={fetchStats}
  fetchWeeklyData={fetchWeeklyData}
/>
        <WorkoutHistory
          workouts={workouts}
        />
      </div>
    </div>
  );
};

export default Dashboard;