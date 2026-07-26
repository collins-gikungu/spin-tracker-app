import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const msPerDay = 24 * 60 * 60 * 1000;

const formatDate = (date) => date.toISOString().slice(0, 10);

const StreakCalendar = ({ workouts = [], theme = {} }) => {
  const dateCounts = useMemo(() => {
    const m = new Map();
    workouts.forEach((w) => {
      try {
        const d = new Date(w.created_at);
        const iso = formatDate(d);
        m.set(iso, (m.get(iso) || 0) + 1);
      } catch (e) {}
    });
    return m;
  }, [workouts]);

  const today = new Date();
  const startAnchor = new Date(today);
  startAnchor.setDate(startAnchor.getDate() - 364);
  // move back to previous Sunday so weeks align vertically like Duolingo/GitHub
  const start = new Date(startAnchor);
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  // build weeks (columns)
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + w * 7 + d);
      const iso = formatDate(dt);
      const inRange = dt >= startAnchor && dt <= today;
      const count = dateCounts.get(iso) || 0;
      week.push({ date: dt, iso, count, hasWorkout: count > 0, inRange });
    }
    weeks.push(week);
  }

  // compute current streak
  let currentStreak = 0;
  for (let i = 0; i < 365; i++) {
    const dt = new Date();
    dt.setDate(today.getDate() - i);
    const iso = formatDate(dt);
    if ((dateCounts.get(iso) || 0) > 0) currentStreak++;
    else break;
  }

  // compute longest streak
  let longest = 0;
  let run = 0;
  // iterate from oldest to newest
  for (let i = 364; i >= 0; i--) {
    const dt = new Date();
    dt.setDate(today.getDate() - i);
    const iso = formatDate(dt);
    if ((dateCounts.get(iso) || 0) > 0) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  const navigate = useNavigate();

  const [cellSize, setCellSize] = useState(12);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 420) setCellSize(10);
      else if (w < 768) setCellSize(12);
      else setCellSize(14);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // color scale like GitHub heatmap (0..4)
  const colors = [theme.cardBackground || '#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <h3 style={{ margin: 0, color: theme.text }}>Streak Calendar</h3>
          <p style={{ margin: '6px 0 0', color: theme.text, fontSize: 13 }}>
            Current streak: <strong style={{ color: theme.primary }}>{currentStreak}</strong> days • Longest: <strong style={{ color: theme.primary }}>{longest}</strong>
          </p>
        </div>
        <div style={{ color: theme.text, fontSize: 12 }}>
          Showing last 365 days
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {week.map((day, di) => {
              const count = day.count || 0;
              const level = Math.min(count, colors.length - 1);
              const bg = !day.inRange ? 'transparent' : colors[level];
              const border = day.inRange ? `1px solid ${theme.border || '#e6e6e6'}` : '1px solid transparent';
              const title = `${day.iso} — ${count} workout${count !== 1 ? 's' : ''}`;
              return (
                <div
                  key={di}
                  title={title}
                  onClick={() => {
                    if (!day.inRange) return;
                    navigate(`/history?date=${day.iso}`);
                  }}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 3,
                    background: bg,
                    border,
                    boxSizing: 'border-box',
                    opacity: day.inRange ? 1 : 0.2,
                    cursor: day.inRange ? 'pointer' : 'not-allowed'
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCalendar;
