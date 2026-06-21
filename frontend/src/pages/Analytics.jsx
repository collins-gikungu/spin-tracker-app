import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from "../components/AppLayout";
import ProgressChart from '../components/ProgressChart';
import MonthlyChart from '../components/MonthlyChart';
import DistanceTrendChart from "../components/DistanceTrendChart";
import CaloriesTrendChart from "../components/CaloriesTrendChart";
import DurationTrendChart from "../components/DurationTrendChart";
import PerformanceCorrelationChart from "../components/PerformanceCorrelationChart";
import WorkoutConsistencyChart from "../components/WorkoutConsistencyChart";
import WorkoutIntensityDistributionChart from "../components/WorkoutIntensityDistributionChart";
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Analytics = () => {
  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem('workouts');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [weeklyData, setWeeklyData] = useState(() => {
    const saved = localStorage.getItem('weeklyData');
    return saved ? JSON.parse(saved) : [];
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  // Calculate trend data from workouts
  const distanceTrendData = workouts
    .slice()
    .reverse()
    .slice(-7)
    .map((workout) => ({
      date: new Date(workout.created_at).toLocaleDateString(),
      distance: Number(workout.distance_km)
    }));

  const caloriesTrendData = workouts
    .slice()
    .reverse()
    .slice(-7)
    .map((workout) => ({
      date: new Date(workout.created_at).toLocaleDateString(),
      calories: Number(workout.calories),
    }));

  const durationTrendData = workouts
    .slice()
    .reverse()
    .slice(-7)
    .map((workout) => ({
      date: new Date(workout.created_at).toLocaleDateString(),
      duration: Number(workout.duration_seconds),
    }));

  // Calculate performance correlation data from workouts
  const performanceCorrelationData = workouts
    .slice()
    .reverse()
    .slice(-20)
    .map((workout) => {
      const durationMinutes = Math.round(Number(workout.duration_seconds) / 60);
      
      return {
        duration: durationMinutes,
        calories: Number(workout.calories),
      };
    })
    .filter(
      (workout) =>
        !isNaN(workout.duration) &&
        !isNaN(workout.calories) &&
        workout.duration > 0 &&
        workout.calories > 0
    );

  // Calculate workout consistency data
  const workoutConsistencyData = (() => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const workoutCounts = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    workouts.forEach((workout) => {
      const date = new Date(workout.created_at);
      const dayIndex = (date.getDay() + 6) % 7;
      workoutCounts[daysOfWeek[dayIndex]] += 1;
    });

    return daysOfWeek.map((day) => ({
      day,
      count: workoutCounts[day],
    }));
  })();

  // Calculate workout intensity distribution data
  const workoutIntensityDistributionData = (() => {
    let lowIntensity = 0;
    let moderateIntensity = 0;
    let highIntensity = 0;

    workouts.forEach((workout) => {
      const duration = Math.round(Number(workout.duration_seconds) / 60);
      const calories = Number(workout.calories);

      if (
        !duration ||
        !calories ||
        isNaN(duration) ||
        isNaN(calories) ||
        duration === 0
      ) {
        return;
      }

      const caloriesPerMinute = calories / duration;

      if (caloriesPerMinute > 11) {
        highIntensity += 1;
      } else if (caloriesPerMinute >= 8) {
        moderateIntensity += 1;
      } else {
        lowIntensity += 1;
      }
    });

    return [
      {
        name: "Low Intensity",
        value: lowIntensity,
      },
      {
        name: "Moderate Intensity",
        value: moderateIntensity,
      },
      {
        name: "High Intensity",
        value: highIntensity,
      },
    ];
  })();

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchWorkouts(),
          fetchWeeklyData(),
          fetchMonthlyData(),
        ]);
      } catch (error) {
        console.error('Analytics load failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await API.get('/workouts');
      setWorkouts(response.data.workouts);
      localStorage.setItem('workouts', JSON.stringify(response.data.workouts));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeeklyData = async () => {
    try {
      const response = await API.get('/workouts/weekly');
      setWeeklyData(response.data.weeklySummary);
      localStorage.setItem('weeklyData', JSON.stringify(response.data.weeklySummary));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await API.get('/workouts/monthly');
      const formattedData = response.data.monthlySummary.map(item => ({
        month: new Date(item.month_start).toLocaleString('default', { month: 'short' }),
        distance: Number(item.total_distance_km)
      }));
      setMonthlyData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (loading && (!workouts || workouts.length === 0)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  return (
  <AppLayout
    theme={theme}
  >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: theme.text }}>📊 Analytics Center</h1>
          <p style={{ color: theme.text }}>
            Explore workout trends, consistency, performance correlations, and intensity analytics.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: theme.cardBackground,
            color: theme.primary,
            fontWeight: 'bold',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Section 1 - Weekly Progress (delay: 0.05) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📈 Weekly Progress
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Last 7 Days Performance
          </span>
        </div>
        <ProgressChart data={weeklyData} theme={theme} />
      </motion.div>

      {/* Section 2 - Monthly Analytics (delay: 0.1) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📅 Monthly Analytics
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Monthly Distance Trends
          </span>
        </div>
        <MonthlyChart data={monthlyData} theme={theme} />
      </motion.div>

      {/* Section 3 - Distance Trend Chart (delay: 0.15) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📏 Distance Trend
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Last 7 Workouts
          </span>
        </div>
        <DistanceTrendChart data={distanceTrendData} theme={theme} />
      </motion.div>

      {/* Section 4 - Calories Trend Chart (delay: 0.2) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            🔥 Calories Trend
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Last 7 Workouts
          </span>
        </div>
        <CaloriesTrendChart data={caloriesTrendData} theme={theme} />
      </motion.div>

      {/* Section 5 - Duration Trend Chart (delay: 0.25) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            ⏱️ Duration Trend
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Last 7 Workouts
          </span>
        </div>
        <DurationTrendChart data={durationTrendData} theme={theme} />
      </motion.div>

      {/* Section 6 - Performance Correlation (delay: 0.3) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📊 Performance Correlation
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Duration vs Calories
          </span>
        </div>
        <PerformanceCorrelationChart data={performanceCorrelationData} theme={theme} />
      </motion.div>

      {/* Section 7 - Workout Consistency (delay: 0.35) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📊 Workout Consistency
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Weekly Distribution
          </span>
        </div>
        <WorkoutConsistencyChart data={workoutConsistencyData} theme={theme} />
      </motion.div>

      {/* Section 8 - Workout Intensity Distribution (delay: 0.4) */}
      <motion.div
        className="page-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: theme.primary }}>
            📊 Workout Intensity Distribution
          </h2>
          <span className="section-subtitle" style={{ color: theme.text }}>
            Low, Moderate, High Intensity
          </span>
        </div>
        <WorkoutIntensityDistributionChart data={workoutIntensityDistributionData} theme={theme} />
      </motion.div>
    </AppLayout>
  );
};

export default Analytics;