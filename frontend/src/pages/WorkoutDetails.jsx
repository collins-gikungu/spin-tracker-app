import {
useEffect,
useState
}
from 'react';

import {
useParams
}
from 'react-router-dom';

import API
from '../services/api';

const WorkoutDetails = () => {

const { id } =
useParams();

const [
workout,
setWorkout
] = useState(null);

const [
loading,
setLoading
] = useState(true);

useEffect(() => {

fetchWorkout();

}, [id]);

const fetchWorkout =
async () => {

try {

const response =
await API.get(
`/workouts/${id}`
);

setWorkout(
response.data.workout
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

if(loading){

return (
<h2>
Loading Workout...
</h2>
);

}

if(!workout){

return (
<h2>
Workout not found
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

🚴 Workout #

{workout.id}

</h1>

<p>

📅

{' '}

{
new Date(
workout.created_at
)
.toLocaleString()
}

</p>

<hr />

<p>

⏱ Duration:

{' '}

{
Math.floor(
workout.duration_seconds / 60
)
}

minutes

</p>

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

🛣 Odometer:

{' '}

{workout.odometer}

</p>

</div>

);

};

export default WorkoutDetails;