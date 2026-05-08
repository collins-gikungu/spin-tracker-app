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
    const workouts =
      await workoutModel.getAllWorkouts();

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

module.exports = {
  createWorkout,
  getAllWorkouts,
};