import { useEffect, useState } from 'react';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';
import StatsCards from '../components/StatsCards';

import API from '../services/api';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchWorkouts();
    fetchStats();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response =
        await API.get('/workouts');

      setWorkouts(response.data.workouts);

    } catch (error) {
      console.error(error);
    }
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

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#1565c0',
          marginBottom: '30px',
        }}
      >
        Spin Tracker Dashboard 🚴
      </h1>

      <StatsCards stats={stats} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '20px',
        }}
      >
        <WorkoutForm
  fetchWorkouts={fetchWorkouts}
  fetchStats={fetchStats}
/>

        <WorkoutHistory
          workouts={workouts}
        />
      </div>
    </div>
  );
};

export default Dashboard;