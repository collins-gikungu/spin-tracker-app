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

</div>

);

};

export default WorkoutHistory;