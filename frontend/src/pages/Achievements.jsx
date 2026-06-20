import React from "react";
import AchievementGallery from "../components/AchievementGallery";

const Achievements = () => {
  return (
    <div
  style={{
    padding: "24px",
  }}
>
  <h1>🏆 Achievements Center</h1>

  <p>
    Celebrate milestones, unlock badges,
    and track your fitness accomplishments.
  </p>

  <AchievementGallery
    // same props as Dashboard
  />
</div>
  );
};

export default Achievements;