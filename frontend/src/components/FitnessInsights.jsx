const FitnessInsights = ({
insights,
theme
}) => {

return (

<div
style={{

display:'flex',
flexDirection:'column',
gap:'15px'

}}
>

{insights.map(
(insight,index)=>(

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

<p
style={{
margin:0,
fontSize:'1rem',
lineHeight:'1.6'
}}
>

{insight}

</p>

</div>

))

}

</div>

);

};

export default FitnessInsights;