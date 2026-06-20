import {
useState
}
from 'react';

import {
Link,
useLocation
}
from 'react-router-dom';

const Sidebar = ({
onLogout
}) => {
const [isOpen,setIsOpen]=
useState(false);
const location =
useLocation();

const navStyle = (
path
) => ({

display:'block',

padding:'12px 16px',

marginBottom:'10px',

borderRadius:'8px',

textDecoration:'none',

backgroundColor:

location.pathname===path

? '#1976d2'

: 'transparent',

color:

location.pathname===path

? 'white'

: '#333',

fontWeight:'bold',

transition:
'all 0.3s ease'

});

return(
    <>

<button

onClick={()=>
setIsOpen(!isOpen)
}

className="mobile-menu-btn"

>

☰

</button>

<div
className={
isOpen
? 'sidebar open'
: 'sidebar'
}
style={{

width:'250px',

minHeight:'100vh',

padding:'20px',

boxShadow:
'2px 0 10px rgba(0,0,0,0.1)',

background:'#fff',

position:'sticky',

top:0

}}
>

<h2
style={{
marginBottom:'30px'
}}
>

Spin Tracker 🚴

</h2>

<Link
to="/"
style={navStyle('/')}
>

Dashboard

</Link>

<Link
to="/profile"
style={navStyle('/profile')}
>

Profile

</Link>

<Link
  to="/workouts"
  style={navStyle('/workouts')}
>
  🚴 Workouts
</Link>

<Link
  to="/analytics"
  style={navStyle('/analytics')}
>
  📊 Analytics
</Link>

<Link
  to="/goals"
  style={navStyle('/goals')}
>
  🎯 Goals
</Link>

<button

onClick={
onLogout
}

style={{

width:'100%',

padding:'12px',

border:'none',

borderRadius:'8px',

cursor:'pointer',

marginTop:'20px',

background:'#d32f2f',

color:'white',

fontWeight:'bold'

}}

>

Logout

</button>

</div>

</>
);

};

export default Sidebar;