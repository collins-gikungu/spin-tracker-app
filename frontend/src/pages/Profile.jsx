import {
useEffect,
useState
}
from 'react';
import Sidebar
from '../components/Sidebar';
import API
from '../services/api';

const Profile = ({
onLogout
}) => {

const [profile,setProfile]=
useState(null);

const [username,setUsername]=
useState('');

const [email,setEmail]=
useState('');

const [loading,setLoading]=
useState(true);

const [message,setMessage]=
useState('');

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

setUsername(
response.data.user.username
);

setEmail(
response.data.user.email
);

}

catch(error){

console.error(
error
);

}

setLoading(false);

};

const handleSubmit=
async(e)=>{

e.preventDefault();

setMessage('');

try{

const response=
await API.put(

'/auth/profile',

{
username,
email
}

);

setProfile(
response.data.user
);

setMessage(
'Profile updated successfully 🚴'
);

localStorage.setItem(

'user',

JSON.stringify(
response.data.user
)

);

}

catch(error){

console.error(
error
);

setMessage(
'Update failed'
);

}

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

display:'flex',

minHeight:'100vh',

background:'#f5f7fb'

}}
>

<Sidebar
onLogout={onLogout}
/>

<div
style={{

flex:1,

padding:'40px'

}}
>

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

{message&&(

<p>

{message}

</p>

)}

<form
onSubmit={handleSubmit}
>

<label>
Username
</label>

<input

type="text"

value={username}

onChange={(e)=>

setUsername(
e.target.value
)

}

required

style={{
width:'100%',
padding:'10px',
marginBottom:'20px'
}}

/>

<label>
Email
</label>

<input

type="email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

required

style={{
width:'100%',
padding:'10px',
marginBottom:'20px'
}}

/>

<p>

<strong>
Member Since:
</strong>

{' '}

{new Date(
profile.created_at
).toLocaleDateString()}

</p>

<button

type="submit"

style={{

padding:'12px 20px',

border:'none',

borderRadius:'8px',

cursor:'pointer'

}}

>

Save Changes

</button>

</form>

</div>
</div>
</div>
);

};

export default Profile;