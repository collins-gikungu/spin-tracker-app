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