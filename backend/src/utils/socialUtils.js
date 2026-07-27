const formatStatsSnapshot = (stats = {}) => ({
  workouts: Number(stats.total_workouts || 0),
  distanceKm: Number(stats.total_distance_km || 0),
  calories: Number(stats.total_calories || 0),
  hours: Math.round(Number(stats.total_duration_seconds || 0) / 3600),
});

module.exports = {
  formatStatsSnapshot,
};
