const StatsCards = ({ stats }) => {

  const formatDuration = (seconds) => {
    const totalSeconds = Number(seconds);

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(4, 1fr)',
        gap: '15px',
        marginBottom: '25px',
      }}
    >

      <div style={cardStyle}>
        <h3>Total Workouts</h3>

        <p style={valueStyle}>
          {stats.total_workouts || 0}
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Total Calories</h3>

        <p style={valueStyle}>
          {Number(
            stats.total_calories || 0
          ).toFixed(1)}
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Total Distance</h3>

        <p style={valueStyle}>
          {Number(
            stats.total_distance_km || 0
          ).toFixed(1)} km
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Total Time</h3>

        <p style={valueStyle}>
          {formatDuration(
            stats.total_duration_seconds || 0
          )}
        </p>
      </div>

    </div>
  );
};

const cardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow:
    '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const valueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1565c0',
};

export default StatsCards;