# Netflix Full Stack Application

A complete Netflix-style movie browsing application with user authentication.

## Architecture

- **Backend**: Node.js + Express (Port 5000)
- **Frontend**: React
- **Database**: PostgreSQL (Aiven Cloud)
- **API**: TMDB (The Movie Database)

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Features

- User Registration with name, email, password, and phone
- User Login with JWT authentication
- Protected movie browsing page
- Fetch popular movies from TMDB API
- Netflix-style dark UI
- Responsive grid layout

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Movies
- `GET /api/movies` - Get popular movies (Protected)

## Environment Variables

Backend (.env):
- DATABASE_URL - PostgreSQL connection string
- JWT_SECRET - Secret key for JWT
- TMDB_API_KEY - TMDB API key
- PORT - Server port (5000)

## Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire in 1 hour
- Protected routes with authentication middleware
- CORS enabled
- SSL connection to PostgreSQL database
