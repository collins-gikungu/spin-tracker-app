const DashboardHero = ({
user,
streaks,
records,
theme
}) => {

const motivationalMessages = [
  'Keep pushing your limits 🚴',
  'Consistency builds champions 🔥',
  'Every ride makes you stronger 💪',
  'Small progress is still progress 📈',
  'Your future self will thank you 🌟'
];

const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

return (
  <div
    style={{
      background: 'linear-gradient(135deg, #4f7cff 0%, #00c2ff 45%, #19c37d 100%)',
      borderRadius: '28px',
      padding: '32px',
      marginBottom: '30px',
      color: 'white',
      boxShadow: '0 20px 45px rgba(79, 124, 255, 0.28)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.22), transparent 28%)' }} />

    <div style={{ position: 'relative', zIndex: 1 }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px', lineHeight: 1.1 }}>
        Welcome back, {user?.username || 'athlete'} 🚴
      </h1>

      <p style={{ fontSize: '1.02rem', opacity: 0.95, marginBottom: '24px', maxWidth: '680px' }}>
        {randomMessage}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.18)', padding: '16px 18px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.26)' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', opacity: 0.9 }}>🔥 Current Streak</h3>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{streaks.currentStreak || 0} Days</h2>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.18)', padding: '16px 18px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.26)' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', opacity: 0.9 }}>🏆 Best Calories</h3>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{records.highest_calories || 0}</h2>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.18)', padding: '16px 18px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.26)' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', opacity: 0.9 }}>🚴 Longest Distance</h3>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{records.longest_distance || 0} km</h2>
        </div>
      </div>
    </div>
  </div>
);
};

export default DashboardHero;