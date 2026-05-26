const express = require('express');

const router = express.Router();

const workoutController =
require('../controllers/workoutController');

const authMiddleware =
require('../middleware/authMiddleware');


// GET workout stats
router.get(
'/stats',
authMiddleware,
workoutController.getWorkoutStats
);


// GET weekly summary
router.get(
'/weekly',
authMiddleware,
workoutController.getWeeklySummary
);


// GET monthly summary
router.get(
'/monthly',
authMiddleware,
workoutController.getMonthlySummary
);


// GET all workouts
router.get(
'/',
authMiddleware,
workoutController.getAllWorkouts
);


// POST workout
router.post(
'/',
authMiddleware,
workoutController.createWorkout
);


module.exports = router;