import React from "react";
import GoalTracking from "../components/GoalTracker";

const Goals = () => {
  return (
    <div
  style={{
    padding: "24px",
  }}
>
  <h1>🎯 Goals Center</h1>

  <p>
    Monitor your progress and stay focused
    on your fitness objectives.
  </p>

  <GoalTracking
    // same props as Dashboard
  />
</div>
  );
};

export default Goals;