import { useState } from 'react';
import API from '../services/api';

const Register=({onRegister})=>{

const[username,setUsername]=
useState('');

const[email,setEmail]=
useState('');

const[password,setPassword]=
useState('');

const[error,setError]=
useState('');

const handleSubmit=
async(e)=>{

e.preventDefault();

setError('');

try{

await API.post(

'/auth/register',

{
username,
email,
password
}

);

onRegister();

}

catch(error){

setError(

error.response?.data
?.message ||

'Register failed'

);

}

};

return(

<div
style={{
maxWidth:'400px',
margin:'50px auto',
padding:'30px'
}}
>

<h1>
Create Account 🚴
</h1>

{error&&(
<p>
{error}
</p>
)}

<form
onSubmit={handleSubmit}
>

<input

placeholder="Username"

value={username}

onChange={(e)=>

setUsername(
e.target.value
)

}

required

/>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

required

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

required

/>

<button
type="submit"
>

Create Account

</button>

</form>

</div>

);

};

export default Register;