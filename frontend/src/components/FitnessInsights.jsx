const getCategory = (insight) => {
  if (insight.includes('🔥')) {
    return {
      title: 'Motivation',
      emoji: '🔥'
    };
  }

  if (insight.includes('⚡')) {
    return {
      title: 'Performance',
      emoji: '⚡'
    };
  }

  if (insight.includes('🏆') || insight.includes('🌍') || insight.includes('🚴')) {
    return {
      title: 'Achievement',
      emoji: '🏆'
    };
  }

  return {
    title: 'Insight',
    emoji: '💡'
  };
};

const FitnessInsights = ({ insights, theme }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      {insights.map((insight, index) => {
        const category = getCategory(insight);
        
        return (
          <div
            key={index}
            className="stat-card"
            style={{
              background: theme.cardBackground,
              color: theme.text,
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
            }}
          >
            <div
              style={{
                width: '50px',
                height: '4px',
                borderRadius: '999px',
                marginBottom: '12px',
                background: theme.primary
              }}
            />
            <h4
              style={{
                marginBottom: '12px',
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                opacity: 0.8
              }}
            >
              {category.emoji} {category.title}
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '1.05rem',
                fontWeight: '500',
                lineHeight: '1.8'
              }}
            >
              {insight}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FitnessInsights;