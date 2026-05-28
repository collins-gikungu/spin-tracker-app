import { useState } from 'react';

import {
BrowserRouter,
Routes,
Route,
Navigate
}
from 'react-router-dom';

import Dashboard
from './pages/Dashboard';

import Login
from './pages/Login';

import Register
from './pages/Register';

import Profile
from './pages/Profile';

import {
ToastContainer
}
from 'react-toastify';

import
'react-toastify/dist/ReactToastify.css';

function App() {

const [user,setUser]=
useState(()=>{

const saved=
localStorage.getItem(
'user'
);

return saved
? JSON.parse(saved)
: null;

});

const handleLogin=
(userData)=>{

setUser(
userData
);

};

const handleLogout=
()=>{

localStorage.removeItem(
'token'
);

localStorage.removeItem(
'user'
);

setUser(
null
);

};

return(

<BrowserRouter>

<Routes>

<Route

path="/login"

element={

user

?

<Navigate
to="/"
/>

:

<Login
onLogin={
handleLogin
}
/>

}

/>

<Route
  path="/register"
  element={
    user ? (
      <Navigate to="/" />
    ) : (
      <Register
        onRegister={() =>
          window.location.href='/login'
        }
      />
    )
  }
/>

<Route
  path="/"
  element={
    user ? (
      <Dashboard
        user={user}
        onLogout={handleLogout}
      />
    ) : (
      <Navigate
        to="/login"
      />
    )
  }
/>

<Route

path="/profile"

element={

user

?

<Profile
onLogout={handleLogout}
/>

:

<Navigate
to="/login"
/>

}

/>

</Routes>

<ToastContainer

position="top-right"

autoClose={2500}

theme="colored"

/>

</BrowserRouter>

);

}

export default App;