import { useEffect, useState }
from 'react';

import API from '../services/api';

const WorkoutHistory = () => {

const [
workouts,
setWorkouts
] = useState([]);

const [
loading,
setLoading
] = useState(true);

useEffect(() => {

fetchWorkouts();

}, []);

const [
searchTerm,
setSearchTerm
] = useState('');

const [
timeFilter,
setTimeFilter
] = useState('all');

const [
currentPage,
setCurrentPage
] = useState(1);

const workoutsPerPage = 6;

const fetchWorkouts =
async () => {

try {

const response =
await API.get(
'/workouts'
);

setWorkouts(
response.data.workouts
);

}

catch(error){

console.error(
error
);

}

finally {

setLoading(false);

}

};

const filteredWorkouts =
workouts.filter(
(workout) => {

const term =
searchTerm.toLowerCase();

const matchesSearch = (

String(
workout.id
).includes(term)

||

String(
workout.distance_km
).includes(term)

||

String(
workout.calories
).includes(term)

||

new Date(
workout.created_at
)
.toLocaleDateString()
.toLowerCase()
.includes(term)

);

const workoutDate =
new Date(
workout.created_at
);

const today =
new Date();

let matchesTime =
true;

if(
timeFilter === 'week'
){

const weekAgo =
new Date();

weekAgo.setDate(
today.getDate() - 7
);

matchesTime =
workoutDate >= weekAgo;

}

if(
timeFilter === 'month'
){

const monthAgo =
new Date();

monthAgo.setMonth(
today.getMonth() - 1
);

matchesTime =
workoutDate >= monthAgo;

}

return (
matchesSearch &&
matchesTime
);

}
);

const indexOfLastWorkout =
currentPage *
workoutsPerPage;

const indexOfFirstWorkout =
indexOfLastWorkout -
workoutsPerPage;

const currentWorkouts =
filteredWorkouts.slice(
indexOfFirstWorkout,
indexOfLastWorkout
);

const totalPages =
Math.ceil(
filteredWorkouts.length /
workoutsPerPage
);

if(loading){

return (
<h2>
Loading Workouts...
</h2>
);

}

return (

<div
style={{
padding:'30px'
}}
>

<h1>
📜 Workout History
</h1>

<p>
Total Workouts:
{' '}
{workouts.length}
</p>

<input

type="text"

placeholder=
"🔍 Search by ID, distance, calories, or date"

value={searchTerm}

onChange={(e)=>

setSearchTerm(
e.target.value
)

}

style={{

width:'100%',

padding:'14px',

borderRadius:'12px',

border:'1px solid #ddd',

marginTop:'20px',

fontSize:'1rem'

}}

/>

<div
style={{
display:'flex',
gap:'10px',
marginTop:'15px',
flexWrap:'wrap'
}}
>

<select

value={timeFilter}

onChange={(e)=>

setTimeFilter(
e.target.value
)

}

style={{

padding:'12px',

borderRadius:'12px'

}}

>

<option value="all">

All Time

</option>

<option value="week">

Last 7 Days

</option>

<option value="month">

Last 30 Days

</option>

</select>

</div>

<p>

Showing

{' '}

{filteredWorkouts.length}

{' '}

of

{' '}

{workouts.length}

workouts

</p>

<div
style={{
display:'grid',
gridTemplateColumns:
'repeat(auto-fit,minmax(300px,1fr))',
gap:'20px',
marginTop:'30px'
}}
>

{currentWorkouts.map(
(workout,index)=>(

<div

key={workout.id}

className="stat-card"

style={{

padding:'20px',

borderRadius:'18px'

}}

>

<h3>

🚴 Workout #

{workout.id}

</h3>

<p>

📅 {' '}

{new Date(
workout.created_at
).toLocaleDateString()}

</p>

<hr />

<p>

📏 Distance:

{' '}

{workout.distance_km}

KM

</p>

<p>

🔥 Calories:

{' '}

{workout.calories}

</p>

<p>

⚡ RPM:

{' '}

{workout.rpm}

</p>

<p>

🔋 Power:

{' '}

{workout.power}

W

</p>

<p>

⏱ Duration:

{' '}

{Math.floor(
workout.duration_seconds / 60
)}

min

</p>

</div>

))
}

</div>

</div>

);

};

export default WorkoutHistory;