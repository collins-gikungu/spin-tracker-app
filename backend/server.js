const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./src/routes/authRoutes');

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.104:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

const isLocalDevOrigin = (origin) => {
  if (!origin) return true;

  try {
    const { hostname, port } = new URL(origin);
    const isLocalhostHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
    const isPrivateNetworkHost = /^192\.168\./.test(hostname) || /^10\./.test(hostname) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname);

    return (isLocalhostHost || isPrivateNetworkHost) && (!port || port === '3000' || port === '3001' || port === '5173');
  } catch {
    return false;
  }
};

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Routes
const workoutRoutes = require('./src/routes/workoutRoutes');

app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Spin Tracker API is running 🚴');
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});