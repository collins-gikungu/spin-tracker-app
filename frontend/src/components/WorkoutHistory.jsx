import { useNavigate } from 'react-router-dom';

const WorkoutHistory = ({ workouts, theme }) => {
  const navigate = useNavigate();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div
      style={{
        background: theme.card,
        color: theme.text,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2>Workout History</h2>

      {workouts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            color: theme.text,
          }}
        >
          <h3>No workouts yet 🚴</h3>
          <p>Start tracking your spin sessions to see progress here.</p>
        </div>
      ) : (
        workouts.map((workout) => (
          <div
            key={workout.id}
            className="stat-card"
            onClick={() => navigate(`/history/${workout.id}`)}
            style={{
              cursor: 'pointer',
              padding: '20px',
              borderRadius: '18px',
              transition: 'all 0.3s ease',
              backgroundColor: theme.input,
              border: `1px solid ${theme.border}`,
              color: theme.text,
              marginBottom: '15px',
            }}
          >
            <p>
              <strong>Date:</strong>{' '}
              {new Date(workout.workout_date).toLocaleDateString()}
            </p>

            <p>
              <strong>Duration:</strong>{' '}
              {formatDuration(workout.duration_seconds)}
            </p>

            <p>
              <strong>Distance:</strong> {workout.distance_km} km
            </p>

            <p>
              <strong>Calories:</strong> {workout.calories}
            </p>

            <p>
              <strong>Odometer:</strong> {workout.odometer}
            </p>

            <p>
              <strong>RPM:</strong> {workout.rpm}
            </p>

            <p>
              <strong>Power:</strong> {workout.power}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutHistory;