import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const WorkoutConsistencyChart = ({ data, theme }) => {
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
    </div>
  );
};

export default WorkoutConsistencyChart;