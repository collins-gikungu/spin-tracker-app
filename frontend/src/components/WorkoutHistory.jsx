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
    <div>
      <h2>Workout History</h2>

      {workouts.length === 0 ? (
        <p>No workouts recorded yet.</p>
      ) : (
        workouts.map((workout) => (
          <div
            key={workout.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
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