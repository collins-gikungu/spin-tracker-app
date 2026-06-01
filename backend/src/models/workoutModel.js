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
    user_id,
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
      power,
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      duration_seconds,
      distance_miles,
      distance_km,
      calories,
      odometer,
      rpm,
      power,
      user_id,
    ]
  );

  return result.rows[0];
};
const getAllWorkouts = async (
  userId
) => {

  const result =
  await pool.query(

  `SELECT *

   FROM workouts

   WHERE user_id=$1

   ORDER BY created_at DESC`,

   [userId]

  );

  return result.rows;

};
const getWorkoutStats =
async (userId) => {

const result =
await pool.query(

`
SELECT

COUNT(*) AS total_workouts,

COALESCE(
SUM(calories),
0
) AS total_calories,

COALESCE(
SUM(distance_km),
0
) AS total_distance_km,

COALESCE(
SUM(duration_seconds),
0
) AS total_duration_seconds,

COALESCE(
AVG(rpm),
0
) AS average_rpm,

COALESCE(
AVG(power),
0
) AS average_power

FROM workouts

WHERE user_id=$1

`,

[userId]

);

return result.rows[0];

};
const getWeeklySummary =
async (userId) => {

const result =
await pool.query(

`
SELECT

DATE_TRUNC(
'week',
workout_date
)

AS week_start,

COUNT(*)
AS total_workouts,

COALESCE(
SUM(calories),
0
)

AS total_calories,

COALESCE(
SUM(distance_km),
0
)

AS total_distance_km,

COALESCE(
SUM(duration_seconds),
0
)

AS total_duration_seconds

FROM workouts

WHERE user_id=$1

GROUP BY week_start

ORDER BY week_start DESC

`,

[userId]

);

return result.rows;

};
const getMonthlySummary =
async (userId) => {

const result =
await pool.query(

`
SELECT

DATE_TRUNC(
'month',
workout_date
)

AS month_start,

COUNT(*)
AS total_workouts,

COALESCE(
SUM(calories),
0
)

AS total_calories,

COALESCE(
SUM(distance_km),
0
)

AS total_distance_km,

COALESCE(
SUM(duration_seconds),
0
)

AS total_duration_seconds

FROM workouts

WHERE user_id=$1

GROUP BY month_start

ORDER BY month_start DESC

`,

[userId]

);

return result.rows;

};
const getPersonalRecords =
async (userId) => {

const result =
await pool.query(

`

SELECT

MAX(duration_seconds)
AS longest_workout,

MAX(calories)
AS highest_calories,

MAX(rpm)
AS highest_rpm,

MAX(power)
AS highest_power,

MAX(distance_km)
AS longest_distance

FROM workouts

WHERE user_id=$1

`,

[userId]

);

return result.rows[0];

};
const getWorkoutStreaks =
async (userId) => {

const result =
await pool.query(

`

SELECT DISTINCT
DATE(created_at)
AS workout_day

FROM workouts

WHERE user_id=$1

ORDER BY workout_day ASC

`,

[userId]

);

const workoutDays =
result.rows.map(
row => new Date(row.workout_day)
);

if(workoutDays.length===0){

return {

currentStreak:0,
longestStreak:0,
activeDays:0

};

}

let currentStreak = 1;
let longestStreak = 1;

for(
let i=1;
i<workoutDays.length;
i++
){

const previous =
new Date(
workoutDays[i-1]
);

const current =
new Date(
workoutDays[i]
);

const diffTime =
current - previous;

const diffDays =
diffTime /
(1000*60*60*24);

if(diffDays===1){

currentStreak++;

if(
currentStreak >
longestStreak
){

longestStreak =
currentStreak;

}

}

else{

currentStreak = 1;

}

}

return {

currentStreak,
longestStreak,

activeDays:
workoutDays.length

};

};
const getWorkoutInsightsData =
async (userId) => {

  const statsResult =
  await pool.query(
    `
    SELECT
      COUNT(*) AS total_workouts,
      COALESCE(AVG(rpm),0) AS average_rpm,
      COALESCE(SUM(distance_km),0) AS total_distance_km
    FROM workouts
    WHERE user_id = $1
    `,
    [userId]
  );

  const streakResult =
  await pool.query(
    `
    SELECT DISTINCT
    DATE(created_at) AS workout_day
    FROM workouts
    WHERE user_id = $1
    ORDER BY workout_day ASC
    `,
    [userId]
  );

  return {
    stats: statsResult.rows[0],
    workoutDays: streakResult.rows
  };

};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutStats,
  getWeeklySummary,
  getMonthlySummary,
  getPersonalRecords,
  getWorkoutStreaks,
  getWorkoutInsightsData,
};