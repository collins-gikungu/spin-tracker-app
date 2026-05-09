const pool = require('../config/db');

const createWorkout = async (workoutData) => {
  const {
    duration_seconds,
    distance_miles,
    distance_km,
    calories,
    odometer,
    rpm,
    power,
  } = workoutData;

  const result = await pool.query(
    `INSERT INTO workouts
    (
      duration_seconds,
      distance_miles,
      distance_km,
      calories,
      odometer,
      rpm,
      power
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      duration_seconds,
      distance_miles,
      distance_km,
      calories,
      odometer,
      rpm,
      power,
    ]
  );

  return result.rows[0];
};

const getAllWorkouts = async () => {
  const result = await pool.query(
    `SELECT * FROM workouts
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getWorkoutStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_workouts,
      COALESCE(SUM(calories), 0) AS total_calories,
      COALESCE(SUM(distance_km), 0) AS total_distance_km,
      COALESCE(SUM(duration_seconds), 0) AS total_duration_seconds,
      COALESCE(AVG(rpm), 0) AS average_rpm,
      COALESCE(AVG(power), 0) AS average_power
    FROM workouts
  `);

  return result.rows[0];
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutStats,
};