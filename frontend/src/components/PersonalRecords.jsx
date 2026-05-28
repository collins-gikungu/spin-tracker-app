const PersonalRecords = ({
records,
theme
}) => {

const cards = [

{
title:
'Longest Workout',

value:

records
.longest_workout

? `${Math.floor(
records.longest_workout / 60
)} mins`

: '0'

},

{
title:
'Highest Calories',

value:

records
.highest_calories || 0

},

{
title:
'Highest RPM',

value:

records
.highest_rpm || 0

},

{
title:
'Highest Power',

value:

records
.highest_power || 0

},

{
title:
'Longest Distance',

value:

records
.longest_distance

? `${records.longest_distance} km`

: '0 km'

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

export default PersonalRecords;