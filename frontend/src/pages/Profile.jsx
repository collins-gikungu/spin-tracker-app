import {
useEffect,
useState
}
from 'react';

import API
from '../services/api';

const Profile = () => {

const [profile,setProfile]=
useState(null);

const [loading,setLoading]=
useState(true);

useEffect(()=>{

fetchProfile();

},[]);

const fetchProfile=
async()=>{

try{

const response=
await API.get(
'/auth/profile'
);

setProfile(
response.data.user
);

}

catch(error){

console.error(
error
);

}

setLoading(false);

};

if(loading){

return(

<div
style={{
textAlign:'center',
marginTop:'50px'
}}
>

<h2>
Loading profile...
</h2>

</div>

);

}

return(

<div
style={{
maxWidth:'600px',
margin:'40px auto',
padding:'30px',
borderRadius:'12px',
boxShadow:
'0 4px 12px rgba(0,0,0,0.1)'
}}
>

<h1>
My Profile 🚴
</h1>

<p>

<strong>
Username:
</strong>

{' '}

{profile.username}

</p>

<p>

<strong>
Email:
</strong>

{' '}

{profile.email}

</p>

<p>

<strong>
Member Since:
</strong>

{' '}

{new Date(
profile.created_at
).toLocaleDateString()}

</p>

</div>

);

};

export default Profile;