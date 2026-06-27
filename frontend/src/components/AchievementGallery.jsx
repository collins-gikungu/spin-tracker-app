const AchievementGallery = ({
  achievements,
  theme
}) => {

  if (
    !achievements ||
    achievements.length === 0
  ) {
    return null;
  }
console.log(
'Achievements:',
achievements
);
  return (

    <div
      style={{
        display:'grid',
gridTemplateColumns:
'repeat(auto-fit, minmax(220px, 1fr))',
        gap:'16px'
      }}
    >

      {achievements.map(
        (achievement,index) => (

          <div
            key={index}
            className="stat-card"
            style={{
  background:
    theme.cardBackground,

  color:
    theme.text,

  padding:'24px',

  borderRadius:'20px',

  textAlign:'center',

  boxShadow:
    achievement.unlocked
      ? '0 10px 30px rgba(34,197,94,0.25)'
      : '0 8px 20px rgba(0,0,0,0.10)',

  border:
    achievement.unlocked
      ? '2px solid #22c55e'
      : '1px solid rgba(0,0,0,0.08)',

  opacity:
    achievement.unlocked
      ? 1
      : 0.88,

  transition:
    'all 0.3s ease',

  cursor:'pointer'
}}
          >

            <div
style={{
fontSize:'3.5rem',
marginBottom:'15px'
}}
>
              {achievement.icon}
            </div>

            <h3
style={{
marginBottom:'8px',
fontSize:'1.2rem',
fontWeight:'700'
}}
>
{achievement.title}
</h3>
<p
style={{
fontSize:'0.8rem',
textTransform:'uppercase',
letterSpacing:'1px',
fontWeight:'600',
opacity:0.7,
marginBottom:'12px'
}}
>
{achievement.unlocked
? 'Achievement Unlocked'
: 'In Progress'}
</p>

<p>
  {achievement.description}
</p>

<div
style={{
marginTop:'12px'
}}
>

{achievement.unlocked ? (

<p
style={{
fontWeight:'bold'
}}
>

🏆 Unlocked

</p>

) : (

<p
style={{
fontWeight:'bold'
}}
>

🎯 {achievement.progress} / {achievement.target}
</p>

)}

</div>
<div
style={{

width:'100%',

height:'12px',

background:'#ddd',

borderRadius:'999px',

overflow:'hidden',

marginTop:'10px'

}}
>

<div
style={{

width: `${
(
achievement.progress /
achievement.target
) * 100
}%`,

height:'100%',

background:
achievement.unlocked
? 'linear-gradient(90deg,#22c55e,#16a34a)'
: `linear-gradient(
90deg,
${theme.primary},
#60a5fa
)`,

transition:
'width 0.5s ease'

}}
/>

</div>

          </div>

        )
      )}

    </div>

  );

};

export default AchievementGallery;