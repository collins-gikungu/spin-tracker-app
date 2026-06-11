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

const CaloriesTrendChart = ({ data, theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`trend-chart-card ${
        isDark ? "trend-chart-dark" : "trend-chart-light"
      }`}
    >
      <h3 className="trend-chart-title">
        🔥 Calories Burn Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#444" : "#ddd"}
          />

          <XAxis
            dataKey="date"
            stroke={isDark ? "#ccc" : "#666"}
          />

          <YAxis
            stroke={isDark ? "#ccc" : "#666"}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: "none",
              borderRadius: "12px",
              color: isDark ? "#ffffff" : "#111827",
            }}
          />

          <Line
            type="monotone"
            dataKey="calories"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CaloriesTrendChart;