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
    user_id,
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
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      duration_seconds,
      distance_miles,
      distance_km,
      calories,
      odometer,
      rpm,
      power,
      user_id,
    ]
  );

  return result.rows[0];
};
const getAllWorkouts = async (
  userId
) => {

  const result =
  await pool.query(

  `SELECT *

   FROM workouts

   WHERE user_id=$1

   ORDER BY created_at DESC`,

   [userId]

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
const getWeeklySummary = async () => {
  const result = await pool.query(`
    SELECT
      DATE_TRUNC('week', workout_date) AS week_start,
      COUNT(*) AS total_workouts,
      COALESCE(SUM(calories), 0) AS total_calories,
      COALESCE(SUM(distance_km), 0) AS total_distance_km,
      COALESCE(SUM(duration_seconds), 0) AS total_duration_seconds
    FROM workouts
    GROUP BY week_start
    ORDER BY week_start DESC
  `);

  return result.rows;
};
const getMonthlySummary = async () => {
  const result = await pool.query(`
    SELECT
      DATE_TRUNC('month', workout_date) AS month_start,
      COUNT(*) AS total_workouts,
      COALESCE(SUM(calories), 0) AS total_calories,
      COALESCE(SUM(distance_km), 0) AS total_distance_km,
      COALESCE(SUM(duration_seconds), 0) AS total_duration_seconds
    FROM workouts
    GROUP BY month_start
    ORDER BY month_start DESC
  `);

  return result.rows;
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutStats,
  getWeeklySummary,
  getMonthlySummary,
};