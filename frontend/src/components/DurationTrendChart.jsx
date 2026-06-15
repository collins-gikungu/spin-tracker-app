import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const DurationTrendChart = ({ data, theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        backgroundColor: isDark
          ? "#1f2937"
          : "#ffffff",

        padding: "24px",

        borderRadius: "20px",

        boxShadow: isDark
          ? "0 10px 30px rgba(0, 0, 0, 0.35)"
          : "0 10px 30px rgba(0, 0, 0, 0.08)",

        marginTop: "24px",

        transition: "all 0.3s ease",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",

          color: isDark
            ? "#f9fafb"
            : "#111827",

          fontSize: "1.25rem",

          fontWeight: "700",

          display: "flex",

          alignItems: "center",

          gap: "10px",
        }}
      >
        ⏱️ Duration Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#444" : "#ddd"}
          />

          <XAxis
            dataKey="date"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => [
              `${value} mins`,
              "Duration",
            ]}
            labelFormatter={(label) =>
              `Workout Date: ${label}`
            }
            contentStyle={{
              backgroundColor: isDark
                ? "#111827"
                : "#ffffff",

              border: "none",

              borderRadius: "14px",

              boxShadow:
                "0 4px 20px rgba(0,0,0,0.15)",

              color: isDark
                ? "#ffffff"
                : "#111827",
            }}
          />

          <Line
            type="monotone"
            dataKey="duration"
            stroke="#10b981"
            strokeWidth={4}
            dot={{
              r: 5,
              strokeWidth: 2,
              fill: "#ffffff",
            }}
            activeDot={{
              r: 8,
              stroke: "#10b981",
              strokeWidth: 3,
              fill: "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DurationTrendChart;