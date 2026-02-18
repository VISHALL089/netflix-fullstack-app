# Netflix Full Stack Application

Complete production-ready Netflix-style movie browsing application.

## Project Structure

```
netflix-fullstack-app/
├── server/
│   ├── package.json
│   ├── .env
│   ├── index.js
│   ├── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── routes/
│       ├── authRoutes.js
│       └── movieRoutes.js
└── client/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        └── pages/
            ├── Login.js
            ├── Register.js
            ├── Home.js
            ├── Auth.css
            └── Home.css
```

## Setup Instructions

### IMPORTANT: Create Directory Structure First

Before running the application, create the following folder structure:

```
1. Create main project folder: netflix-fullstack-app
2. Inside it, create: server and client folders
3. Inside server, create: middleware and routes folders
4. Inside client, create: public and src folders
5. Inside src, create: pages folder
```

### Backend Setup

1. Copy all files with prefix `server-` to the `server/` directory:
   - `server-package.json` → `server/package.json`
   - `server.env` → `server/.env`
   - `server-index.js` → `server/index.js`
   - `server-db.js` → `server/db.js`
   - `server-authMiddleware.js` → `server/middleware/authMiddleware.js`
   - `server-authRoutes.js` → `server/routes/authRoutes.js`
   - `server-movieRoutes.js` → `server/routes/movieRoutes.js`

2. Navigate to server directory:
```bash
cd server
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm run dev
```

Backend runs on http://localhost:5000

### Frontend Setup

1. Copy all files with prefix `client-` to the `client/` directory:
   - `client-package.json` → `client/package.json`
   - `client-index.html` → `client/public/index.html`
   - `client-index.js` → `client/src/index.js`
   - `client-index.css` → `client/src/index.css`
   - `client-App.js` → `client/src/App.js`
   - `client-Login.js` → `client/src/pages/Login.js`
   - `client-Register.js` → `client/src/pages/Register.js`
   - `client-Home.js` → `client/src/pages/Home.js`
   - `client-Auth.css` → `client/src/pages/Auth.css`
   - `client-Home.css` → `client/src/pages/Home.css`

2. Navigate to client directory:
```bash
cd client
```

3. Install dependencies:
```bash
npm install
```

4. Start React app:
```bash
npm start
```

Frontend runs on http://localhost:3000

## Features

- User Registration (name, email, password, phone)
- User Login with JWT authentication (1 hour expiry)
- Protected movie browsing
- Popular movies from TMDB API
- Netflix-style dark UI
- Responsive grid layout
- Logout functionality

## API Endpoints

**Authentication:**
- POST `/api/register` - Register new user
- POST `/api/login` - Login user (returns JWT token)

**Movies:**
- GET `/api/movies` - Get popular movies (requires JWT token)

## Environment Variables

Backend `.env` file contains:
- `DATABASE_URL` - PostgreSQL connection (Aiven Cloud with SSL)
- `JWT_SECRET` - JWT signing secret
- `TMDB_API_KEY` - The Movie Database API key
- `PORT` - Server port (5000)

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire in 1 hour
- Protected routes with authentication middleware
- CORS enabled for cross-origin requests
- SSL connection to PostgreSQL database
- TMDB API key kept server-side only

## Technology Stack

**Backend:**
- Node.js + Express
- PostgreSQL (Aiven Cloud)
- bcrypt for password hashing
- jsonwebtoken for authentication
- axios for TMDB API calls
- cors for cross-origin support

**Frontend:**
- React 18
- React Router DOM for routing
- Axios for HTTP requests
- CSS for styling

## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  phone VARCHAR(15)
);
```

Table is automatically created on server startup.

## Usage Flow

1. User registers at `/register`
2. User logs in at `/login` (receives JWT token)
3. Token stored in localStorage
4. User redirected to `/home`
5. Home page fetches movies using token
6. If token invalid/expired, user redirected to login
7. User can logout to clear token

## Notes

- Backend must be running before frontend
- Database connection is established on server start
- Movies are fetched from TMDB popular endpoint
- All routes except register/login require authentication
