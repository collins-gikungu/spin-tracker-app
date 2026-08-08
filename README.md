# 🚴 Spin Tracker App

> A modern full-stack fitness tracking application built for indoor cycling and spin-bike enthusiasts.

Spin Tracker is a full-stack web application designed to help users record, monitor, and analyze their indoor cycling workouts.

The application allows users to track important workout metrics such as duration, distance, calories burned, cadence (RPM), power, and odometer readings while providing dashboards, analytics, personal records, achievements, goals, workout history, and social features to make training more engaging.

---

## 🌐 Live Application

**Frontend:**  
https://spinbiketracker.netlify.app

**Backend API:**  
https://spin-tracker-api.onrender.com

---

## ✨ Features

### 🔐 Authentication & Account Management

- User registration and login
- Secure password hashing
- JWT-based authentication
- Protected application routes
- Logout functionality
- Forgot-password workflow
- Password reset functionality
- Persistent authenticated sessions

### 🚴 Workout Tracking

Record and manage indoor cycling workouts including:

- Workout duration
- Distance in miles and kilometers
- Calories burned
- Odometer readings
- RPM / cadence
- Power output
- Workout timestamps

### 📊 Dashboard & Statistics

The dashboard provides an overview of training activity including:

- Total workouts
- Total distance
- Total calories burned
- Total workout duration
- Training streaks
- Personal records
- Fitness insights
- Milestones
- Recent activity
- Goal progress

### 📈 Analytics

Dedicated analytics functionality provides visual representations of workout performance and progress.

The application includes charts for areas such as:

- Distance trends
- Calories burned
- Workout duration
- Performance correlations
- Workout consistency
- Workout intensity distribution

### 🏆 Goals, Achievements & Milestones

Users can stay motivated through:

- Training goals
- Progress tracking
- Achievements
- Personal milestones
- Workout streaks
- Personal records

### 🏋️ Workout History

Users can:

- Browse previous workouts
- View detailed workout information
- Review historical performance
- Track long-term progress

### 👥 Community & Social Features

Spin Tracker also includes social functionality allowing users to:

- Search for other users
- Send friend requests
- Accept or decline requests
- Manage connections
- Create groups
- Add members to groups
- View public profiles
- Share workout statistics with other users

### 🎨 User Experience

- Responsive interface
- Dark mode
- Light mode
- Animated UI elements
- Loading states and feedback
- Toast notifications
- Dedicated pages for major dashboard features
- Mobile-friendly layouts

---

## 🛠️ Tech Stack

### Frontend

- React 19
- React Router
- Axios
- Recharts
- Framer Motion
- React CountUp
- React Toastify
- Create React App / React Scripts

### Backend

- Node.js
- Express.js
- PostgreSQL
- `pg` PostgreSQL client
- JWT
- bcrypt
- Nodemailer
- CORS
- dotenv

### Database

- PostgreSQL
- Neon PostgreSQL for production

### Deployment

- Netlify — Frontend
- Render — Backend API
- Neon — Production PostgreSQL database

### Development Tools

- Visual Studio Code
- Git
- GitHub
- pgAdmin
- Thunder Client
- npm

---

## 🏗️ Architecture

Spin Tracker follows a separated full-stack architecture:

                    ┌─────────────────────────┐
                    │     React Frontend      │
                    │                         │
                    │  Netlify Deployment     │
                    └────────────┬────────────┘
                                 │
                                 │ HTTPS / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │     Express Backend     │
                    │                         │
                    │  Render Deployment      │
                    └────────────┬────────────┘
                                 │
                                 │ PostgreSQL
                                 ▼
                    ┌─────────────────────────┐
                    │    Neon PostgreSQL      │
                    │                         │
                    │   Production Database   │
                    └─────────────────────────┘
---


## ⚙️ Installation & Local Development

### 📋 Prerequisites

Before running Spin Tracker locally, make sure you have the following installed:

- Node.js
- npm
- PostgreSQL
- Git
- Visual Studio Code (recommended)

You can verify your Node.js and npm installations with:

bash
node --version
npm --version


### 📥 Clone the Repository

Clone the repository to your local machine:

bash
git clone https://github.com/collins-gikungu/spin-tracker-app.git


Navigate into the project:

bash
cd spin-tracker-app


### 🔧 Backend Setup

Navigate to the backend directory:

bash
cd backend


Install the backend dependencies:

bash
npm install


### 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:


backend/
└── .env


Add the required environment variables:

env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:3000


> ⚠️ **Security:** Never commit your `.env` file or expose database credentials, JWT secrets, or other private credentials publicly.

For local PostgreSQL configurations that do not use `DATABASE_URL`, the backend also supports individual database settings:

env
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name


The application prioritizes `DATABASE_URL` when it is available.

### ▶️ Start the Backend

From the `backend` directory:

bash
npm start


The API will run locally on:

http://localhost:5000


You can verify that the backend is running by visiting:


http://localhost:5000


You should receive:


Spin Tracker API is running 🚴


### 💻 Frontend Setup

Open a second terminal and navigate to the frontend directory:

bash
cd frontend


Install the frontend dependencies:

bash
npm install


Start the React development server:

bash
npm start


The frontend will normally be available at:

http://localhost:3000


### 🔄 Running the Full Application Locally

Spin Tracker requires both the frontend and backend to be running.

#### Terminal 1 — Backend

bash
cd backend
npm start


#### Terminal 2 — Frontend

bash
cd frontend
npm start


Then open:


http://localhost:3000


### 🏗️ Creating a Production Frontend Build

To create an optimized production build:

bash
cd frontend
npm run build


The compiled application will be generated inside:


frontend/build/


The production build can then be deployed to a static hosting platform such as Netlify.

### 🧪 Testing

The frontend test script can be executed with:

bash
cd frontend
npm test


The backend API can be tested using an API testing client such as Thunder Client.

### 🔒 Environment & Security Notes

Production credentials must never be stored directly in the source code.

The following types of information should remain private:

* Database connection strings
* Database passwords
* JWT secrets
* Email credentials
* API keys
* Other deployment secrets

For production deployments, configure these values through the hosting platform's environment-variable settings.

---


