# Full-Stack Task Manager Application

A responsive full-stack task manager application with user authentication, dashboard analytics, priority-based task categorization, dynamic search filters, and light/dark theme compatibility.

## Tech Stack

### Frontend
- **React (v19)** with Vite (Fast HMR & build environment)
- **React Router (v7)** for client-side routing and navigation guards
- **Axios** with automatic auth token interceptors and 401 redirect handlers
- **React Hot Toast** for lightweight notifications
- **CSS3 Variables** for light/dark theme compatibility

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (ODM Schema modeling and validation)
- **JWT (JSON Web Tokens)** for stateless user authentication sessions
- **Bcryptjs** for secure password hashing
- **CORS** middleware integration for secure cross-origin API actions

---

## Directory Structure

```
├── backend/                  # Express REST API
│   ├── config/               # Database configuration
│   ├── controllers/          # Request handler controllers
│   ├── middleware/           # Protected route & error handlers
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API endpoint routing
│   ├── server.js             # Entry point file
│   └── package.json
│
├── task-manager-frontend/    # React Frontend
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── context/          # State auth providers
│   │   ├── pages/            # View pages (Dashboard, Profile, Tasks, Login)
│   │   └── services/         # Axios interceptors configuration
│   └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js installed locally
- MongoDB database instance (local or MongoDB Atlas cluster)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and specify the configuration:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd task-manager-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

---

## Deployment Instructions

### Backend (Render/Railway)
1. Link your GitHub repository (`https://github.com/aadithstanly19-alt/project`).
2. Specify the root directory as `backend`.
3. Set the build command: `npm install` and start command: `node server.js`.
4. Add the required Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Note the generated live backend URL (e.g. `https://your-backend.onrender.com`).

### Frontend (Vercel)
1. Link the same repository in Vercel.
2. Specify the root directory as `task-manager-frontend`.
3. Add the following Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com` (your live backend API URL).
4. Deploy the application.
