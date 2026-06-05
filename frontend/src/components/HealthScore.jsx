const HealthScore = ({
  stats,
  streaks,
  achievements,
  theme
}) => {

  const totalWorkouts =
    Number(
      stats?.total_workouts || 0
    );

  const totalDistance =
    Number(
      stats?.total_distance_km || 0
    );

  const activeDays =
    Number(
      streaks?.activeDays || 0
    );

  const unlockedAchievements =
    achievements?.filter(
      achievement =>
        achievement.unlocked
    ).length || 0;

  let score = 0;

  score += Math.min(
    totalWorkouts * 2,
    30
  );

  score += Math.min(
    totalDistance / 2,
    30
  );

  score += Math.min(
    activeDays * 2,
    20
  );

  score += Math.min(
    unlockedAchievements * 5,
    20
  );

  score = Math.round(score);

  let rating =
    'Beginner';

  if(score >= 80)
    rating = 'Excellent';

  else if(score >= 60)
    rating = 'Great';

  else if(score >= 40)
    rating = 'Good';

  return (

    <div
      className="stat-card"
      style={{
        background:
          theme.cardBackground,

        color:
          theme.text,

        textAlign:'center',

        padding:'25px'
      }}
    >

      <h3>
        🔥 Health Score
      </h3>

      <h1
        style={{
          margin:'10px 0',
          color:
            theme.primary
        }}
      >
        {score}/100
      </h1>

      <p>
        {rating}
      </p>

    </div>

  );

};

export default HealthScore;