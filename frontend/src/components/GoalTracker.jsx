import { useState,useEffect }
from 'react';

const GoalTracker = ({
stats,
theme
}) => {

const [distanceGoal,
setDistanceGoal] =
useState(25);

const [calorieGoal,
setCalorieGoal] =
useState(1000);

const [workoutGoal,
setWorkoutGoal] =
useState(5);

useEffect(()=>{

const savedGoals =

JSON.parse(
localStorage.getItem(
'fitnessGoals'
)
);

if(savedGoals){

setDistanceGoal(
savedGoals.distanceGoal
);

setCalorieGoal(
savedGoals.calorieGoal
);

setWorkoutGoal(
savedGoals.workoutGoal
);

}

},[]);

useEffect(()=>{

localStorage.setItem(

'fitnessGoals',

JSON.stringify({

distanceGoal,
calorieGoal,
workoutGoal

})

);

},

[
distanceGoal,
calorieGoal,
workoutGoal
]

);

const distanceProgress =

Math.min(

(
stats.total_distance_km /
distanceGoal
)*100,

100

);

const calorieProgress =

Math.min(

(
stats.total_calories /
calorieGoal
)*100,

100

);

const workoutProgress =

Math.min(

(
stats.total_workouts /
workoutGoal
)*100,

100

);

const ProgressBar = ({
progress
}) => (

<div
style={{

background:'#e5e7eb',

borderRadius:'999px',

height:'14px',

overflow:'hidden',

marginTop:'8px'

}}
>

<div

style={{

width:`${progress}%`,

background:
'linear-gradient(90deg,#1976d2,#42a5f5)',

height:'100%',

transition:
'width 0.4s ease'

}}

></div>

</div>

);

return(

<div>

<div

style={{

display:'grid',

gridTemplateColumns:
'repeat(auto-fit,minmax(250px,1fr))',

gap:'20px'

}}

>

<div
className="stat-card"
style={{
background:theme.cardBackground
}}
>

<h3>
🚴 Distance Goal
</h3>

<input

type="number"

value={distanceGoal}

onChange={(e)=>
setDistanceGoal(
Number(e.target.value)
)
}

style={{

width:'100%',

padding:'10px',

marginTop:'10px',

borderRadius:'10px',

border:'1px solid #ccc'

}}

/>

<p>

{stats.total_distance_km || 0}
km /
{distanceGoal}km

</p>

<ProgressBar
progress={distanceProgress}
/>

</div>

<div
className="stat-card"
style={{
background:theme.cardBackground
}}
>

<h3>
🔥 Calories Goal
</h3>

<input

type="number"

value={calorieGoal}

onChange={(e)=>
setCalorieGoal(
Number(e.target.value)
)
}

style={{

width:'100%',

padding:'10px',

marginTop:'10px',

borderRadius:'10px',

border:'1px solid #ccc'

}}

/>

<p>

{stats.total_calories || 0}
/
{calorieGoal}

</p>

<ProgressBar
progress={calorieProgress}
/>

</div>

<div
className="stat-card"
style={{
background:theme.cardBackground
}}
>

<h3>
🏆 Workout Goal
</h3>

<input

type="number"

value={workoutGoal}

onChange={(e)=>
setWorkoutGoal(
Number(e.target.value)
)
}

style={{

width:'100%',

padding:'10px',

marginTop:'10px',

borderRadius:'10px',

border:'1px solid #ccc'

}}

/>

<p>

{stats.total_workouts || 0}
/
{workoutGoal}
workouts

</p>

<ProgressBar
progress={workoutProgress}
/>

</div>

</div>

</div>

);

};

export default GoalTracker;