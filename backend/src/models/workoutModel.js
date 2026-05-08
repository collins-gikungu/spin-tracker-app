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

module.exports = {
  createWorkout,
  getAllWorkouts,
};