const SmartCoach = ({
  tips,
  theme
}) => {

  if (
    !tips ||
    tips.length === 0
  ) {
    return null;
  }

  return (

    <div
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'15px'
      }}
    >

      {tips.map(
        (tip,index) => (

          <div
            key={index}
            className="stat-card"
            style={{
              background:
                theme.cardBackground,

              color:
                theme.text,

              padding:'20px',

              borderRadius:'16px'
            }}
          >

            <p
              style={{
                margin:0,
                fontSize:'1rem',
                lineHeight:'1.6'
              }}
            >
              {tip}
            </p>

          </div>

        )
      )}

    </div>

  );

};

export default SmartCoach;