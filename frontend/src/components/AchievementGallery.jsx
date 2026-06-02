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

          </div>

        )
      )}

    </div>

  );

};

export default AchievementGallery;