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
    const userId =
req.user.id;

const stats =

await workoutModel
.getWorkoutStats(
userId
);

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
    const userId =
req.user.id;

const weeklySummary =

await workoutModel
.getWeeklySummary(
userId
);

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
   const userId =
req.user.id;

const monthlySummary =

await workoutModel
.getMonthlySummary(
userId
);

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
const getPersonalRecords =
async (req,res) => {

try {

const userId =
req.user.id;

const records =

await workoutModel
.getPersonalRecords(
userId
);

res.status(200)
.json({

records

});

}

catch(error){

console.error(
error
);

res
.status(500)
.json({

message:
'Server error'

});

}

};
const getWorkoutStreaks =
async (req,res) => {

try {

const userId =
req.user.id;

const streaks =

await workoutModel
.getWorkoutStreaks(
userId
);

res.status(200)
.json({

streaks

});

}

catch(error){

console.error(
error
);

res
.status(500)
.json({

message:
'Server error'

});

}

};
const getWorkoutInsights =
async (req,res) => {

try {

const userId =
req.user.id;

const data =
await workoutModel
.getWorkoutInsightsData(
userId
);
const totalDistance =
Number(
data.stats.total_distance_km
);
const insights = [];

const avgRPM =
Number(
data.stats.average_rpm
);

const totalWorkouts =
Number(
data.stats.total_workouts
);

const activeDays =
data.workoutDays.length;

if(activeDays >= 3){

insights.push(
'🔥 Great consistency! You are building a strong riding habit.'
);

}

if(avgRPM >= 90){

insights.push(
'⚡ Excellent cadence. Your average RPM is above 90.'
);

}

if(totalWorkouts >= 10){

insights.push(
'🏆 Congratulations! You have completed more than 10 workouts.'
);

}

if(totalWorkouts >= 25){

insights.push(
'🚴 Incredible dedication! You have completed more than 25 workouts.'
);

}
if(totalDistance >= 100){

insights.push(
'🌍 Milestone reached! You have ridden more than 100 km in total.'
);

}

if(
avgRPM >= 90 &&
totalWorkouts >= 10
){

insights.push(
'⚡ Strong rider profile! You combine excellent cadence with consistent training.'
);

}

if(insights.length === 0){

insights.push(
'🚴 Keep riding. The more workouts you log, the smarter your coaching insights become.'
);

}

res.status(200).json({
insights
});

}

catch(error){

console.error(error);

res.status(500).json({
message:'Server error'
});

}

};
const getAchievements =
async (req,res) => {

try {

const userId =
req.user.id;

const data =
await workoutModel
.getAchievementData(
userId
);

const achievements = [];

const totalWorkouts =
Number(
data.total_workouts
);

const avgRPM =
Number(
data.average_rpm
);

const totalDistance =
Number(
data.total_distance_km
);

achievements.push({

icon:'🚴',

title:'First Ride',

description:
'Complete your first workout',

unlocked:
totalWorkouts >= 1,

progress:
Math.min(totalWorkouts,1),

target:1

});

achievements.push({

icon:'🏆',

title:'Dedicated Rider',

description:
'Complete 10 workouts',

unlocked:
totalWorkouts >= 10,

progress:
Math.min(totalWorkouts,10),

target:10

});

achievements.push({

icon:'⚡',

title:'Cadence Master',

description:
'Maintain an average RPM above 90',

unlocked:
avgRPM >= 90,

progress:
Math.round(avgRPM),

target:90

});

achievements.push({

icon:'🌍',

title:'100 KM Rider',

description:
'Ride more than 100 km',

unlocked:
totalDistance >= 100,

progress:
Math.round(totalDistance),

target:100

});

achievements.push({

icon:'🔥',

title:'Elite Cyclist',

description:
'Complete 25 workouts',

unlocked:
totalWorkouts >= 25,

progress:
Math.min(totalWorkouts,25),

target:25

});

res.status(200).json({
achievements
});

}

catch(error){

console.error(error);

res.status(500).json({
message:'Server error'
});

}

};
const getWorkoutTrends =
async (req,res) => {

try {

const userId =
req.user.id;

const data =
await workoutModel
.getWorkoutTrends(
userId
);

const calculateTrend =
(
current,
previous
) => {

current =
Number(current);

previous =
Number(previous);

if(previous === 0){

return current > 0
? 100
: 0;

}

return Number(

(
(
current -
previous
)
/
previous
)
*
100

).toFixed(1);

};

res.status(200).json({

workoutsTrend:

calculateTrend(
data.current_workouts,
data.previous_workouts
),

distanceTrend:

calculateTrend(
data.current_distance,
data.previous_distance
),

rpmTrend:

calculateTrend(
data.current_rpm,
data.previous_rpm
)

});

}

catch(error){

console.error(
error
);

res.status(500).json({

message:
'Server error'

});

}

};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutStats,
  getWeeklySummary,
  getMonthlySummary,
  getPersonalRecords,
  getWorkoutStreaks,
  getWorkoutInsights,
  getAchievements,
  getWorkoutTrends,
};