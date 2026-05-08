const express = require('express');
const router = express.Router();

const workoutController =
  require('../controllers/workoutController');

// GET all workouts
router.get('/', workoutController.getAllWorkouts);

// POST workout
router.post('/', workoutController.createWorkout);

module.exports = router;