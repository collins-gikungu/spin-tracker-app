const workoutModel = require('../models/workoutModel');

const createWorkout = async (req, res) => {
  try {
    const {
      duration_minutes,
      duration_seconds,
      distance_miles,
      distance_km,
      calories,
      odometer,
      rpm,
      power,
    } = req.body;
    const userId = req.user.id;

    // Convert total duration to seconds
    const totalSeconds =
      parseInt(duration_minutes) * 60 +
      parseInt(duration_seconds);

    // Convert miles to kilometers (if distance_miles is provided)
    let distanceKm = null;
    let distanceMiles = null;
    
    if (distance_miles !== undefined && distance_miles !== null) {
      distanceKm =Number(distance_miles * 1.60934).toFixed(2);
      distanceMiles = distance_miles;
    } else if (distance_km !== undefined && distance_km !== null) {
      // Convert kilometers to miles (if distance_km is provided)
      distanceMiles = Number(distance_km * 0.621371).toFixed(2);
      distanceKm = distance_km;
    }

    const newWorkout = await workoutModel.createWorkout({
  duration_seconds: totalSeconds,
  distance_miles: distanceMiles,
  distance_km: distanceKm,
  calories,
  odometer,
  rpm,
  power,
  user_id: userId,
});

    res.status(201).json({
      message: 'Workout session created successfully',
      workout: newWorkout,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};
const getAllWorkouts = async (req, res) => {
  try {
    const userId =
req.user.id;

const workouts =

await workoutModel
.getAllWorkouts(
userId
);
    res.status(200).json({
      count: workouts.length,
      workouts,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};
const getWorkoutStats = async (req, res) => {
  try {
    const stats =
      await workoutModel.getWorkoutStats();

    res.status(200).json({
      stats,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};
const getWeeklySummary = async (req, res) => {
  try {
    const weeklySummary =
      await workoutModel.getWeeklySummary();

    res.status(200).json({
      weeklySummary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const monthlySummary =
      await workoutModel.getMonthlySummary();

    res.status(200).json({
      monthlySummary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutStats,
  getWeeklySummary,
  getMonthlySummary,
};