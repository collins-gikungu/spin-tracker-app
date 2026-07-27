import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import WorkoutHistory from './pages/WorkoutHistory';
import WorkoutDetails from './pages/WorkoutDetails';
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Achievements from "./pages/Achievements";
import Workouts from "./pages/Workouts";
import Community from "./pages/Community";
import ProtectedRoute from "./components/ProtectedRoute";
import { lightTheme, darkTheme } from './styles/theme';

import {
  ToastContainer
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark-theme', darkMode);
    document.documentElement.classList.toggle('light-theme', !darkMode);
  }, [darkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (

<BrowserRouter>

<Routes>

<Route
path="/login"
element={
  user ? (
    <Navigate to="/" />
  ) : (
    <Login
      onLogin={handleLogin}
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />
  )
}
/>
<Route
  path="/register"
  element={
    user ? (
      <Navigate to="/" />
    ) : (
      <Register
        onRegister={() => window.location.href = '/login'}
        theme={theme}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    )
  }
/>

<Route
  path="/forgot-password"
  element={
    user ? (
      <Navigate to="/" />
    ) : (
      <ForgotPassword
        theme={theme}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    )
  }
/>

<Route
  path="/reset-password"
  element={
    user ? (
      <Navigate to="/" />
    ) : (
      <ResetPassword
        theme={theme}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    )
  }
/>

<Route
  path="/"
  element={
    <ProtectedRoute user={user}>
      <Dashboard
        user={user}
        onLogout={handleLogout}
        theme={theme}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute user={user}>
      <Profile onLogout={handleLogout} />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute user={user}>
      <WorkoutHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/history/:id"
  element={
    <ProtectedRoute user={user}>
      <WorkoutDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute user={user}>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/goals"
  element={
    <ProtectedRoute user={user}>
      <Goals />
    </ProtectedRoute>
  }
/>

<Route
  path="/achievements"
  element={
    <ProtectedRoute user={user}>
      <Achievements />
    </ProtectedRoute>
  }
/>

<Route
  path="/workouts"
  element={
    <ProtectedRoute user={user}>
      <Workouts />
    </ProtectedRoute>
  }
/>

<Route
  path="/community"
  element={
    <ProtectedRoute user={user}>
      <Community onLogout={handleLogout} />
    </ProtectedRoute>
  }
/>

</Routes>

<ToastContainer

position="top-right"

autoClose={2500}

theme="colored"

/>

</BrowserRouter>

);

}

export default App;