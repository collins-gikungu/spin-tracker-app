import { useNavigate }
from 'react-router-dom';

const QuickActions = ({
theme
}) => {

const navigate =
useNavigate();

const actions = [

{
icon:'➕',
label:'Log Workout',
path:'/workouts'
},

{
icon:'📜',
label:'History',
path:'/history'
},

{
icon:'🎯',
label:'Goals',
path:'/goals'
},

{
icon:'👤',
label:'Profile',
path:'/profile'
}

];

return (

<div
style={{
display:'grid',
gridTemplateColumns:
'repeat(auto-fit,minmax(180px,1fr))',
gap:'15px'
}}
>

{actions.map(
(action,index)=>(

<button

key={index}

onClick={()=>
navigate(
action.path
)
}

style={{

background:
theme.cardBackground,

color:
theme.text,

border:'none',

padding:'18px',

borderRadius:'16px',

cursor:'pointer',

fontSize:'1rem',

fontWeight:'600',

transition:
'all 0.3s ease'

}}

>

<div
style={{
fontSize:'2rem'
}}
>
{action.icon}
</div>

<div>
{action.label}
</div>

</button>

))
}

</div>

);

};

export default QuickActions;