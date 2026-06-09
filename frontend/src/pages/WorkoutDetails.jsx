import {
  useEffect,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import API
  from '../services/api';

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const insights = [];

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await API.get(`/workouts/${id}`);
      setWorkout(response.data.workout);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (workout) {
    if (workout.distance_km >= 20) {
      insights.push('🏆 Long-distance achievement! Excellent endurance ride.');
    }

    if (workout.rpm >= 90) {
      insights.push('⚡ Outstanding cadence performance during this session.');
    }

    if (workout.calories >= 500) {
      insights.push('🔥 High-intensity effort detected. Great work!');
    }

    if (workout.duration_seconds >= 3600) {
      insights.push('🚴 Impressive endurance session lasting over an hour.');
    }

    if (insights.length === 0) {
      insights.push('💡 Solid ride! Keep building consistency.');
    }
  }

  if (loading) {
    return <h2>Loading Workout...</h2>;
  }

  if (!workout) {
    return <h2>Workout not found</h2>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>🚴 Workout #{workout.id}</h1>
      <p>📅 {new Date(workout.created_at).toLocaleString()}</p>
      <hr />

      <p>⏱ Duration: {Math.floor(workout.duration_seconds / 60)} minutes</p>
      <p>📏 Distance: {workout.distance_km} KM</p>
      <p>🔥 Calories: {workout.calories}</p>
      <p>⚡ RPM: {workout.rpm}</p>
      <p>🔋 Power: {workout.power} W</p>
      <p>🛣 Odometer: {workout.odometer}</p>

      <hr />

      <h2>💡 Session Insights</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
      }}>
        {insights.map((insight, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ padding: '15px' }}
          >
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetails;