const TrendCards = ({
  trends,
  theme
}) => {

  const trendItems = [

    {
      title:'Workouts',
      icon:'🔥',
      value:trends.workoutsTrend
    },

    {
      title:'Distance',
      icon:'🚴',
      value:trends.distanceTrend
    },

    {
      title:'RPM',
      icon:'⚡',
      value:trends.rpmTrend
    }

  ];

  return (

    <div
      style={{
        display:'grid',
        gridTemplateColumns:
          'repeat(auto-fit,minmax(220px,1fr))',
        gap:'20px'
      }}
    >

      {trendItems.map(
        (item,index) => {

          const positive =
            item.value >= 0;

          return (

            <div
              key={index}
              className="stat-card"
              style={{
                background:
                  theme.cardBackground,

                color:
                  theme.text,

                textAlign:'center',

                padding:'20px'
              }}
            >

              <div
                style={{
                  fontSize:'2.5rem'
                }}
              >
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <h2
                style={{
                  color:
                    positive
                    ? '#22c55e'
                    : '#ef4444'
                }}
              >
                {positive ? '+' : ''}
                {item.value}%
              </h2>

              <p>
                {positive
                  ? 'Improving'
                  : 'Declining'}
              </p>

            </div>

          );

        }
      )}

    </div>

  );

};

export default TrendCards;