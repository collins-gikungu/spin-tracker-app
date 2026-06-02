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

  return (

    <div
      style={{
        display:'grid',
        gridTemplateColumns:
          'repeat(auto-fit,minmax(250px,1fr))',
        gap:'20px'
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

              padding:'20px',

              borderRadius:'16px',

              textAlign:'center',

              boxShadow:
                '0 8px 24px rgba(0,0,0,0.12)'
            }}
          >

            <div
              style={{
                fontSize:'3rem',
                marginBottom:'10px'
              }}
            >
              {achievement.icon}
            </div>

            <h3>
  {achievement.title}
</h3>

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

✅ Unlocked

</p>

) : (

<p
style={{
fontWeight:'bold'
}}
>

🔒 {achievement.progress} / {achievement.target}

</p>

)}

</div>
<div
style={{

width:'100%',

height:'10px',

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
? '#22c55e'
: theme.primary,

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