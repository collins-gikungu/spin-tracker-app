import { useEffect, useState } from 'react';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';

import API from '../services/api';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
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
        />

        <WorkoutHistory
          workouts={workouts}
        />
      </div>
    </div>
  );
};

export default Dashboard;