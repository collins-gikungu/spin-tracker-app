const express = require('express');
const router = express.Router();

const workoutController =
  require('../controllers/workoutController');

//GET workout stats
  router.get('/stats', workoutController.getWorkoutStats);
// GET all workouts
router.get('/', workoutController.getAllWorkouts);
// POST workout
router.post('/', workoutController.createWorkout);

module.exports = router;
