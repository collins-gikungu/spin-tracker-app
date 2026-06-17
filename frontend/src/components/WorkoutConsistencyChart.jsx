import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const WorkoutConsistencyChart = ({ data, theme }) => {
    const getConsistencyInsight = () => {
        const getBarColor = (count, maxCount) => {
  if (count === maxCount && count > 0) {
    return "#f59e0b";
  }

  if (count >= Math.max(2, maxCount - 1)) {
    return "#ef4444";
  }

  return "#3b82f6";
};
const maxWorkoutCount = Math.max(
  ...data.map((day) => day.count),
  0
);
  if (!data || data.length === 0) {
    return "🚴 Start logging workouts to build your consistency profile.";
  }

  const highestDay = data.reduce((best, current) =>
    current.count > best.count ? current : best
  );

  const totalWorkouts = data.reduce(
    (sum, day) => sum + day.count,
    0
  );

  if (totalWorkouts === 0) {
    return "🚴 Complete your first workout to begin consistency tracking.";
  }

  if (highestDay.count >= 4) {
    return `🏆 ${highestDay.day} is your strongest training day. You're building a powerful routine!`;
  }

  if (highestDay.count >= 2) {
    return `🔥 ${highestDay.day} appears to be your most consistent workout day. Keep the momentum going!`;
  }

  return "📅 You're still building workout habits. Consistency compounds over time.";
};
  return (
    <div
      style={{
        background: theme === "dark" ? "#1e293b" : "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0,0,0,0.35)"
            : "0 4px 20px rgba(0,0,0,0.08)",
        marginTop: "24px",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: theme === "dark" ? "#f8fafc" : "#0f172a",
          fontWeight: "600",
        }}
      >
        📅 Workout Consistency
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
          />

          <XAxis
            dataKey="day"
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#475569",
            }}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#475569",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor:
                theme === "dark" ? "#0f172a" : "#ffffff",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
      <div
  style={{
    marginTop: "20px",
    padding: "14px",
    borderRadius: "12px",
    background:
      theme === "dark"
        ? "rgba(59,130,246,0.15)"
        : "#eff6ff",
    color:
      theme === "dark"
        ? "#e2e8f0"
        : "#1e293b",
    fontWeight: "500",
  }}
>
  {getConsistencyInsight()}
</div>
    </div>
  );
};

export default WorkoutConsistencyChart;