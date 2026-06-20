import React from "react";
import DistanceTrendChart from "../components/DistanceTrendChart";
import CaloriesTrendChart from "../components/CaloriesTrendChart";
import DurationTrendChart from "../components/DurationTrendChart";
import PerformanceCorrelationChart from "../components/PerformanceCorrelationChart";
import WorkoutConsistencyChart from "../components/WorkoutConsistencyChart";
import WorkoutIntensityDistributionChart from "../components/WorkoutIntensityDistributionChart";

const Analytics = () => {
  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <h1>📊 Analytics</h1>

      <p>
        Advanced workout analytics and trends
        will appear here.
      </p>
    </div>
  );
};

export default Analytics;