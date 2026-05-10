import { useEffect, useState } from 'react';
import API from '../services/api';

const WorkoutHistory = () => {
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}m ${secs}s`;
  };

  return (
    <div
  style={{
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow:
      '0 2px 8px rgba(0,0,0,0.1)',
  }}
>
      <h2>Workout History</h2>

      {workouts.length === 0 ? (
        <p>No workouts recorded yet.</p>
      ) : (
        workouts.map((workout) => (
          <div
            key={workout.id}
           style={{
         border: '1px solid #e0e0e0',
         padding: '15px',
         marginBottom: '15px',
         borderRadius: '10px',
         backgroundColor: '#fafafa',
}}
          >
            <p>
              <strong>Date:</strong>{' '}
              {new Date(
                workout.workout_date
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Duration:</strong>{' '}
              {formatDuration(
                workout.duration_seconds
              )}
            </p>

            <p>
              <strong>Distance:</strong>{' '}
              {workout.distance_km} km
            </p>

            <p>
              <strong>Calories:</strong>{' '}
              {workout.calories}
            </p>

            <p>
              <strong>RPM:</strong>{' '}
              {workout.rpm}
            </p>

            <p>
              <strong>Power:</strong>{' '}
              {workout.power}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutHistory;