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

## 🔌 API Overview

Spin Tracker uses a RESTful backend API built with **Node.js** and **Express**.

The API handles:

- 🔐 User authentication
- 👤 User profiles
- 🏋️ Workout tracking
- 📊 Workout statistics
- 🏆 Achievements and milestones
- 🔥 Workout streaks
- 📈 Performance trends
- 🧠 Fitness insights and coaching
- 📅 Weekly and monthly summaries
- 🔑 Password management and password recovery

### 🌐 API Base URL

#### Local Development


http://localhost:5000/api


#### Production


https://spin-tracker-api.onrender.com/api


> ℹ️ The production API is currently hosted on Render, while the production PostgreSQL database is hosted on Neon.

---

## 🔐 Authentication Endpoints

Authentication endpoints are available under:


/api/auth


### Register

Create a new Spin Tracker account.

http
POST /api/auth/register


Request body:

json
{
  "username": "your_username",
  "email": "you@example.com",
  "password": "your_password"
}


---

### Login

Authenticate an existing user and receive a JWT access token.

http
POST /api/auth/login


Request body:

json
{
  "email": "you@example.com",
  "password": "your_password"
}


The returned token is used to authenticate protected API requests.

---

### Get Profile

Retrieve the authenticated user's profile.

http
GET /api/auth/profile


Requires:

http
Authorization: Bearer <token>


---

### Update Profile

Update the authenticated user's profile information.

http
PUT /api/auth/profile


Requires:

http
Authorization: Bearer <token>


---

### Update Avatar

Update the authenticated user's profile avatar.

http
POST /api/auth/avatar


Requires:

http
Authorization: Bearer <token>


---

### Change Password

Change the authenticated user's password.

http
PUT /api/auth/password


Requires:

http
Authorization: Bearer <token>


---

### Forgot Password

Request a password-reset email.

http
POST /api/auth/forgot-password


Request body:

json
{
  "email": "you@example.com"
}


---

### Reset Password

Reset a user's password using a valid password-reset token.

http
POST /api/auth/reset-password


Request body:

json
{
  "token": "password_reset_token",
  "newPassword": "new_password"
}


---

## 🚴 Workout Endpoints

Workout endpoints are available under:


/api/workouts


All workout endpoints require authentication unless otherwise stated.

### Get All Workouts

Retrieve the authenticated user's workout history.

http
GET /api/workouts


Requires:

http
Authorization: Bearer <token>


---

### Create Workout

Record a new cycling workout.

http
POST /api/workouts


Requires:

http
Authorization: Bearer <token>


---

### Get Workout by ID

Retrieve details for a specific workout.

http
GET /api/workouts/:id


Requires:

http
Authorization: Bearer <token>


---

## 📊 Statistics & Performance Endpoints

### Workout Statistics

Retrieve overall workout statistics.

http
GET /api/workouts/stats


---

### Personal Records

Retrieve the user's personal workout records.

http
GET /api/workouts/records


---

### Workout Streaks

Retrieve current and historical workout streak information.

http
GET /api/workouts/streaks


---

### Weekly Summary

Retrieve weekly workout performance data.

http
GET /api/workouts/weekly


---

### Monthly Summary

Retrieve monthly workout performance data.

http
GET /api/workouts/monthly


---

### Fitness Insights

Retrieve workout-based fitness insights.

http
GET /api/workouts/insights


---

### Smart Coaching

Retrieve personalized coaching recommendations.

http
GET /api/workouts/coaching


---

### Milestones

Retrieve workout milestones and progress.

http
GET /api/workouts/milestones


---

### Performance Trends

Retrieve workout performance trend data.

http
GET /api/workouts/trends


---

### Achievements

Retrieve earned and available workout achievements.

http
GET /api/workouts/achievements


---

### Recent Activity

Retrieve recent workout activity.

http
GET /api/workouts/activity


---

## 🔒 API Authentication

Protected endpoints use **JSON Web Tokens (JWT)**.

After successful authentication, the frontend stores the returned token and includes it in subsequent API requests using the following HTTP header:

http
Authorization: Bearer <token>


The backend validates the token before allowing access to protected resources.

This keeps user-specific workout data isolated between accounts.

---

## 🧪 API Testing

The API can be tested locally using **Thunder Client** or another REST API testing tool.

A typical authentication flow is:


1. Register a user
       ↓
2. Login
       ↓
3. Receive JWT token
       ↓
4. Include token in protected requests
       ↓
5. Access workouts and analytics


Example production health check:

https://spin-tracker-api.onrender.com


Expected response:


Spin Tracker API is running 🚴


---

## 🗂️ API Route Summary

| Category          | Endpoint                     | Method | Authentication |
| ----------------- | ---------------------------- | -----: | :------------: |
| Authentication    | `/api/auth/register`         |   POST |        ❌       |
| Authentication    | `/api/auth/login`            |   POST |        ❌       |
| Profile           | `/api/auth/profile`          |    GET |        ✅       |
| Profile           | `/api/auth/profile`          |    PUT |        ✅       |
| Avatar            | `/api/auth/avatar`           |   POST |        ✅       |
| Password          | `/api/auth/password`         |    PUT |        ✅       |
| Password Recovery | `/api/auth/forgot-password`  |   POST |        ❌       |
| Password Recovery | `/api/auth/reset-password`   |   POST |        ❌       |
| Workouts          | `/api/workouts`              |    GET |        ✅       |
| Workouts          | `/api/workouts`              |   POST |        ✅       |
| Workout Details   | `/api/workouts/:id`          |    GET |        ✅       |
| Statistics        | `/api/workouts/stats`        |    GET |        ✅       |
| Records           | `/api/workouts/records`      |    GET |        ✅       |
| Streaks           | `/api/workouts/streaks`      |    GET |        ✅       |
| Weekly Summary    | `/api/workouts/weekly`       |    GET |        ✅       |
| Monthly Summary   | `/api/workouts/monthly`      |    GET |        ✅       |
| Insights          | `/api/workouts/insights`     |    GET |        ✅       |
| Coaching          | `/api/workouts/coaching`     |    GET |        ✅       |
| Milestones        | `/api/workouts/milestones`   |    GET |        ✅       |
| Trends            | `/api/workouts/trends`       |    GET |        ✅       |
| Achievements      | `/api/workouts/achievements` |    GET |        ✅       |
| Activity          | `/api/workouts/activity`     |    GET |        ✅       |

---

## 🛡️ Security

Spin Tracker uses several security measures to protect user accounts and application data:

* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Authenticated user-specific database queries
* Environment variables for sensitive configuration
* CORS configuration for approved frontend origins
* HTTPS for production communication

Sensitive credentials are never intended to be stored in the repository.

---





