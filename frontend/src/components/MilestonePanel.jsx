const MilestonePanel = ({
  milestones,
  theme
}) => {

  if (
    !milestones ||
    milestones.length === 0
  ) {
    return null;
  }

  return (

    <div
      style={{
        display:'grid',
        gridTemplateColumns:
          'repeat(auto-fit,minmax(280px,1fr))',
        gap:'20px'
      }}
    >

      {milestones.map(
        (milestone,index) => (

          <div
            key={index}
            className="stat-card"
            style={{
              background:
                theme.cardBackground,

              color:
                theme.text,

              textAlign:'center',

              padding:'24px',

              borderRadius:'18px',

              border:
                '2px solid rgba(255,215,0,0.3)',

              boxShadow:
                '0 8px 24px rgba(255,215,0,0.15)'
            }}
          >

            <div
              style={{
                fontSize:'3rem',
                marginBottom:'10px'
              }}
            >
              {milestone.icon}
            </div>

            <h3>
              {milestone.title}
            </h3>

            <p>
              {milestone.message}
            </p>

          </div>

        )
      )}

    </div>

  );

};

export default MilestonePanel;