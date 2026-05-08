const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

// POST workout
router.post('/', workoutController.createWorkout);

module.exports = router;