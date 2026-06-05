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
        background: theme.cardBackground,
        color: theme.text,
        textAlign: 'center',
        padding: '25px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px'
          }}
        >
          <svg width="180" height="180">
            <circle
              cx="90"
              cy="90"
              r="75"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="90"
              cy="90"
              r="75"
              stroke={theme.primary}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 75}
              strokeDashoffset={2 * Math.PI * 75 * (1 - score / 100)}
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <h1
              style={{
                margin: 0,
                color: theme.primary
              }}
            >
              {score}
            </h1>
            <p
              style={{
                margin: 0
              }}
            >
              /100
            </p>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h3>
            🔥 Health Score
          </h3>
          <p>
            {rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;