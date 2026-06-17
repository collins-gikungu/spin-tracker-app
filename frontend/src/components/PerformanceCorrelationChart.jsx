import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const PerformanceCorrelationChart = ({ data, theme }) => {
  const getPerformanceLabel = (duration, calories) => {
  const caloriesPerMinute = calories / duration;

  if (caloriesPerMinute > 11) {
    return "⚡ Peak Performance";
  }

  if (caloriesPerMinute >= 8) {
    return "🔥 Strong Effort";
  }

  return "🚴 Steady Ride";
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
        ⚡ Performance Correlation
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
          />

          <XAxis
            type="number"
            dataKey="duration"
            name="Duration"
            unit=" min"
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#475569",
            }}
          />

          <YAxis
            type="number"
            dataKey="calories"
            name="Calories"
            unit=" kcal"
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#475569",
            }}
          />

          <Tooltip
  cursor={{ strokeDasharray: "3 3" }}
  content={({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const workout = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor:
            theme === "dark" ? "#0f172a" : "#ffffff",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          border:
            theme === "dark"
              ? "1px solid #334155"
              : "1px solid #e2e8f0",
        }}
      >
        <p style={{ margin: "0 0 8px 0" }}>
          ⏱️ Duration: {workout.duration} min
        </p>

        <p style={{ margin: "0 0 8px 0" }}>
          🔥 Calories: {workout.calories} kcal
        </p>

        <p style={{ margin: 0, fontWeight: "600" }}>
          {getPerformanceLabel(
            workout.duration,
            workout.calories
          )}
        </p>
      </div>
    );
  }}
/>

          <Scatter
            name="Workouts"
            data={data}
            fill="#3b82f6"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceCorrelationChart;