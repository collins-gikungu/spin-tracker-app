const WorkoutHistory = ({ workouts }) => {

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
        <div
  style={{
    textAlign: 'center',
    padding: '30px',
    color: '#777',
  }}
>
  <h3>No workouts yet 🚴</h3>

  <p>
    Start tracking your spin sessions
    to see progress here.
  </p>
</div>
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
              <strong>Odometer:</strong>{' '}
              {workout.odometer}
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