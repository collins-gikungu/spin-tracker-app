const WorkoutStreaks = ({
streaks,
theme
}) => {

const cards = [

{
title:
'Current Streak 🔥',

value:
`${streaks.currentStreak || 0} days`
},

{
title:
'Longest Streak 🏆',

value:
`${streaks.longestStreak || 0} days`
},

{
title:
'Active Workout Days 🚴',

value:
streaks.activeDays || 0
}

];

return(

<div
className="stats-grid"
>

{cards.map((card,index)=>(

<div

key={index}

className="stat-card"

style={{

background:
theme.cardBackground,

color:
theme.text

}}

>

<h3>{card.title}</h3>

<h2>{card.value}</h2>

</div>

))}

</div>

);

};

export default WorkoutStreaks;