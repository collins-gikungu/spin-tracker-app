const StatsCards = ({ stats, darkMode }) => {

  const formatDuration = (seconds) => {
    const totalSeconds = Number(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        marginBottom: '25px',
      }}
    >
      <div style={getCardStyle(darkMode)}>
        <h3>Total Workouts</h3>
        <p style={valueStyle(darkMode)}>
          {stats.total_workouts || 0}
        </p>
      </div>

      <div style={getCardStyle(darkMode)}>
        <h3>Total Calories</h3>
        <p style={valueStyle(darkMode)}>
          {Number(stats.total_calories || 0).toFixed(1)}
        </p>
      </div>

      <div style={getCardStyle(darkMode)}>
        <h3>Total Distance</h3>
        <p style={valueStyle(darkMode)}>
          {Number(stats.total_distance_km || 0).toFixed(1)} km
        </p>
      </div>

      <div style={getCardStyle(darkMode)}>
        <h3>Total Time</h3>
        <p style={valueStyle(darkMode)}>
          {formatDuration(stats.total_duration_seconds || 0)}
        </p>
      </div>
    </div>
  );
};

const getCardStyle = (darkMode) => ({
  background: darkMode ? '#1e1e1e' : 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
});

const valueStyle = (darkMode) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: darkMode ? '#f5f5f5' : '#000',
});

export default StatsCards;