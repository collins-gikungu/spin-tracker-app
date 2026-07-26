import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import StreakCalendar from '../components/StreakCalendar';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  const workoutsPerPage = 6;

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter]);

  const fetchWorkouts = async () => {
    try {
      const response = await API.get('/workouts');
      setWorkouts(response.data.workouts);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      String(workout.id).includes(term) ||
      String(workout.distance_km).includes(term) ||
      String(workout.calories).includes(term) ||
      new Date(workout.created_at).toLocaleDateString().toLowerCase().includes(term)
    );

    const workoutDate = new Date(workout.created_at);
    const today = new Date();
    let matchesTime = true;

    if (timeFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      matchesTime = workoutDate >= weekAgo;
    }

    if (timeFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      matchesTime = workoutDate >= monthAgo;
    }

    return (matchesSearch && matchesTime);
  });

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);
  const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage);

  if (loading) {
    return (
      <AppLayout theme={theme}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: theme.text }}>Loading Workouts...</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout theme={theme}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
          {/* Streak calendar */}
          <StreakCalendar workouts={workouts} theme={theme} />
            <h1 style={{ color: theme.text }}>📜 Workout History</h1>
            <p style={{ color: theme.text }}>
              Total Workouts: {workouts.length}
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

        <input
          type="text"
          placeholder="🔍 Search by ID, distance, calories, or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: `1px solid ${theme.border || '#ddd'}`,
            backgroundColor: theme.input || '#fff',
            color: theme.text,
            marginTop: '20px',
            fontSize: '1rem'
          }}
        />

        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '15px',
          flexWrap: 'wrap'
        }}>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: `1px solid ${theme.border || '#ddd'}`,
              backgroundColor: theme.input || '#fff',
              color: theme.text
            }}
          >
            <option value="all">All Time</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>

        <p style={{ color: theme.text }}>
          Showing {filteredWorkouts.length} of {workouts.length} workouts
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          {currentWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="stat-card"
              onClick={() => navigate(`/history/${workout.id}`)}
              style={{
                cursor: 'pointer',
                padding: '20px',
                borderRadius: '18px',
                transition: 'all 0.3s ease',
                backgroundColor: theme.cardBackground || '#fff',
                color: theme.text,
                border: `1px solid ${theme.border || '#eee'}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ color: theme.primary }}>🚴 Workout #{workout.id}</h3>
              <p>📅 {new Date(workout.created_at).toLocaleDateString()}</p>
              <hr style={{ borderColor: theme.border || '#ddd' }} />
              <p>📏 Distance: {workout.distance_km} KM</p>
              <p>🔥 Calories: {workout.calories}</p>
              <p>⚡ RPM: {workout.rpm}</p>
              <p>🔋 Power: {workout.power} W</p>
              <p>⏱ Duration: {Math.floor(workout.duration_seconds / 60)} min</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          marginTop: '30px'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: `1px solid ${theme.border || '#ddd'}`,
              backgroundColor: currentPage === 1 ? '#f0f0f0' : theme.primary,
              color: currentPage === 1 ? '#999' : 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ⬅ Previous
          </button>

          <span style={{ fontSize: '1rem', fontWeight: '500', color: theme.text }}>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: `1px solid ${theme.border || '#ddd'}`,
              backgroundColor: (currentPage === totalPages || totalPages === 0) ? '#f0f0f0' : theme.primary,
              color: (currentPage === totalPages || totalPages === 0) ? '#999' : 'white',
              cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Next ➡
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkoutHistory;