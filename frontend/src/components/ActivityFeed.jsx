const ActivityFeed = ({
  activities,
  theme
}) => {

  if (
    !activities ||
    activities.length === 0
  ) {
    return null;
  }

  return (

    <div
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'15px',
         maxHeight:'500px',
        overflowY:'auto',
      }}
    >

      {activities.map(
        (activity,index) => (

          <div
            key={index}
            className="stat-card"
            style={{
              background:
                theme.cardBackground,

              color:
                theme.text,

              padding:'18px',

              borderRadius:'16px',

              display:'flex',
              alignItems:'center',
              gap:'15px'
            }}
          >

            <div
              style={{
                fontSize:'2rem'
              }}
            >
              {activity.icon}
            </div>

            <div
              style={{
                flex:1
              }}
            >

              <h4
                style={{
                  margin:'0 0 5px 0'
                }}
              >
                {activity.title}
              </h4>

              <p
                style={{
                  margin:0,
                  opacity:0.8
                }}
              >
                {activity.description}
              </p>

              <small
                style={{
                  opacity:0.6
                }}
              >
                {new Date(
                  activity.date
                ).toLocaleDateString()}
              </small>

            </div>

          </div>

        )
      )}

    </div>

  );

};

export default ActivityFeed;