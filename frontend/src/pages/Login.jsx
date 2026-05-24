import { useState } from 'react';
import API from '../services/api';

const Login = ({ onLogin }) => {

const [email,setEmail]=useState('');

const [password,setPassword]=
useState('');

const [error,setError]=
useState('');

const handleSubmit=async(e)=>{

e.preventDefault();

setError('');

try{

const response=
await API.post(

'/auth/login',

{
email,
password
}

);

localStorage.setItem(

'token',

response.data.token

);

localStorage.setItem(

'user',

JSON.stringify(
response.data.user
)

);

onLogin(
response.data.user
);

}

catch(error){

setError(

error.response?.data
?.message ||

'Login failed'

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
Spin Tracker Login 🚴
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

Login

</button>

</form>

</div>

);

};

export default Login;