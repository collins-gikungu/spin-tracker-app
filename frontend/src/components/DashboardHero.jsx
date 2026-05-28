const DashboardHero = ({
user,
streaks,
records,
theme
}) => {

const motivationalMessages = [

'Keep pushing your limits 🚴',

'Consistency builds champions 🔥',

'Every ride makes you stronger 💪',

'Small progress is still progress 📈',

'Your future self will thank you 🌟'

];

const randomMessage =

motivationalMessages[
Math.floor(
Math.random() *
motivationalMessages.length
)
];

return(

<div

style={{

background:

'linear-gradient(135deg,#1976d2,#42a5f5)',

borderRadius:'24px',

padding:'35px',

marginBottom:'30px',

color:'white',

boxShadow:
'0 10px 30px rgba(25,118,210,0.3)'

}}

>

<h1
style={{
fontSize:'2.5rem',
marginBottom:'10px'
}}
>

Welcome back,
{user?.username} 🚴

</h1>

<p
style={{
fontSize:'1.1rem',
opacity:0.95,
marginBottom:'25px'
}}
>

{randomMessage}

</p>

<div

style={{

display:'grid',

gridTemplateColumns:
'repeat(auto-fit,minmax(180px,1fr))',

gap:'20px'

}}

>

<div>

<h3>
🔥 Current Streak
</h3>

<h2>
{streaks.currentStreak || 0} Days
</h2>

</div>

<div>

<h3>
🏆 Best Calories
</h3>

<h2>
{records.highest_calories || 0}
</h2>

</div>

<div>

<h3>
🚴 Longest Distance
</h3>

<h2>
{records.longest_distance || 0} km
</h2>

</div>

</div>

</div>

);

};

export default DashboardHero;