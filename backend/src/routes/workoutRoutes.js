const express = require('express');
const router = express.Router();

const workoutController =
  require('../controllers/workoutController');

// GET workout stats
router.get('/stats', workoutController.getWorkoutStats);
// GET weekly and monthly summaries
router.get('/weekly', workoutController.getWeeklySummary);
router.get('/monthly', workoutController.getMonthlySummary);
// GET all workouts
router.get('/', workoutController.getAllWorkouts);
// POST workout
router.post('/', workoutController.createWorkout);


module.exports = router;
