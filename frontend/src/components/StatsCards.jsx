import CountUp from 'react-countup';

const StatsCards = ({ stats, theme }) => {
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
      <div className="stat-card stat-card--pulse" style={getCardStyle(theme)}>
        <h3>Total Workouts</h3>
        <p style={valueStyle(theme)}>
          <CountUp
            end={Number(stats.total_workouts) || 0}
            duration={2}
            separator=","
            decimals={stats.total_workouts % 1 !== 0 ? 1 : 0}
          />
        </p>
      </div>

      <div className="stat-card stat-card--pulse" style={getCardStyle(theme)}>
        <h3>Total Calories</h3>
        <p style={valueStyle(theme)}>
          <CountUp
            end={Number(stats.total_calories) || 0}
            duration={2}
            separator=","
            decimals={stats.total_calories % 1 !== 0 ? 1 : 0}
          />
        </p>
      </div>

      <div className="stat-card stat-card--pulse" style={getCardStyle(theme)}>
        <h3>Total Distance</h3>
        <p style={valueStyle(theme)}>
          <CountUp
            end={Number(stats.total_distance_km) || 0}
            duration={2}
            separator=","
            decimals={stats.total_distance_km % 1 !== 0 ? 1 : 0}
          /> km
        </p>
      </div>

      <div className="stat-card stat-card--pulse" style={getCardStyle(theme)}>
        <h3>Total Time</h3>
        <p style={valueStyle(theme)}>
          {formatDuration(stats.total_duration_seconds || 0)}
        </p>
      </div>
    </div>
  );
};

const getCardStyle = (theme) => ({
  background: theme.card,
  color: theme.text,
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  padding: '20px',
});

const valueStyle = (theme) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.primary,
  marginTop: '10px',
});

export default StatsCards;