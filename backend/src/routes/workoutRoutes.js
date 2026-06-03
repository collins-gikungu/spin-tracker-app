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

router.get(

'/records',

authMiddleware,

workoutController
.getPersonalRecords

);

router.get(

'/streaks',

authMiddleware,

workoutController
.getWorkoutStreaks

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

router.get(
'/insights',
authMiddleware,
workoutController.getWorkoutInsights
);

router.get(
'/trends',
authMiddleware,
workoutController.getWorkoutTrends
);

router.get(
'/achievements',
authMiddleware,
workoutController.getAchievements
);


// POST workout
router.post(
'/',
authMiddleware,
workoutController.createWorkout
);


module.exports = router;