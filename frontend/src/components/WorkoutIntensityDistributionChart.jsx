import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

const WorkoutIntensityDistributionChart = ({
  data,
  theme,
}) => {
    const getIntensityInsight = () => {
  if (!data || data.length === 0) {
    return "🚴 Start recording workouts to analyze your training intensity.";
  }

  const totalWorkouts = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  if (totalWorkouts === 0) {
    return "🚴 Complete your first workout to unlock intensity analytics.";
  }

  const dominantIntensity = data.reduce((highest, current) =>
    current.value > highest.value ? current : highest
  );

  switch (dominantIntensity.name) {
    case "High Intensity":
      return "⚡ Most of your workouts are high intensity. Make sure recovery is part of your routine.";

    case "Moderate Intensity":
      return "🔥 Your training is centered around moderate intensity efforts, providing a strong balance of challenge and sustainability.";

    case "Low Intensity":
      return "🚴 Low intensity workouts dominate your training. Consider adding occasional higher intensity sessions for variety.";

    default:
      return "📊 Keep tracking workouts to build a richer intensity profile.";
  }
};
  return (
    <div
      style={{
        background:
          theme === "dark"
            ? "#1e293b"
            : "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        marginTop: "24px",
        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0,0,0,0.35)"
            : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color:
            theme === "dark"
              ? "#f8fafc"
              : "#0f172a",
        }}
      >
        🔥 Workout Intensity Distribution
      </h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutIntensityDistributionChart;