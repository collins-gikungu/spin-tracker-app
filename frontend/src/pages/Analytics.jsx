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
      <h1>📊 Analytics Center</h1>

<p>
  Explore workout trends, consistency,
  performance correlations, and intensity
  analytics.
</p>
    </div>
  );
};

export default Analytics;