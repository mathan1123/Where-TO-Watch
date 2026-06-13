# Production Setup Guide - Where to Watch?

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)               │
│                    http://localhost:5173                 │
│                                                           │
│  Tries to fetch from Backend API → Falls back to Local   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │   Backend API (Flask)       │
        │   http://localhost:5000     │
        │   /api/movies endpoint      │
        └─────────────┬───────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │   SQLite Database           │
        │   movies.db                 │
        │   (20 movies seeded)        │
        └─────────────────────────────┘
```

---

## ❌ Why Movies Don't Load in Production

### Issue 1: Python Not Installed
```
Error: Python was not found
```
**Solution**: Install Python 3.9+
- Download from: https://www.python.org/downloads/
- Or use Microsoft Store: `python3`

### Issue 2: Flask Backend Not Running
- The app tries to fetch from `http://localhost:5000/api/movies`
- If backend isn't running → falls back to local data
- In production, backend must be deployed (Render, Heroku, AWS, etc.)

### Issue 3: Database Not Initialized
- First run needs to initialize SQLite database
- Automatically seeds 20 movies on startup

---

## ✅ Setup for Development & Production

### Step 1: Install Python Dependencies
```bash
cd backend
python -m pip install -r requirements.txt
```

### Step 2: Start Backend Server
```bash
python app.py
```
Backend will start on `http://localhost:5000`

### Step 3: Start Frontend (Already Running)
```bash
npm run dev
```
Frontend will start on `http://localhost:5173`

### Step 4: Test API Connection
Visit: `http://localhost:5000/api/movies`
- Should return JSON array of 20 movies
- Browser will show the data loaded from backend

---

## 📋 API Endpoints

### Get All Movies
```
GET http://localhost:5000/api/movies
Response: [{ id, title, year, genre, language, rating, poster, platforms, description }, ...]
```

### Search Movies (Optional - implemented in frontend)
```
GET http://localhost:5000/api/movies?q=inception
Response: Filtered movies matching query
```

---

## 🚀 Production Deployment

### Option 1: Deploy to Render (Free)
```bash
# 1. Create account at https://render.com
# 2. Connect GitHub repo
# 3. Configure:
#    - Build Command: pip install -r requirements.txt
#    - Start Command: python app.py
#    - Environment: Python 3
# 4. Set PORT environment variable: 5000
```

### Option 2: Deploy to Vercel + Backend
- Frontend: Vercel (free)
- Backend: Render, Heroku, or AWS Lambda

### Option 3: Docker Deployment
```dockerfile
# Example Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

---

## 🔧 Fallback Strategy (Smart Loading)

The app implements a **smart fallback mechanism**:

```typescript
// App.tsx - Hybrid Loading
try {
  // 1. Try to load from backend API
  const response = await fetch('http://localhost:5000/api/movies');
  setMovies(apiData);
  console.log('✅ Loaded from backend API');
} catch (error) {
  // 2. If API fails, use local data
  setMovies(moviesData);
  console.log('⚠️ Using local fallback data');
}
```

**Benefits**:
- ✅ Works offline (local data)
- ✅ Works online (backend data)
- ✅ Seamless switching
- ✅ Better UX (always shows data)

---

## 📊 Database Schema

```sql
CREATE TABLE movies (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT,
  genre TEXT (JSON array),
  language VARCHAR(100),
  rating FLOAT,
  poster VARCHAR(255),
  platforms TEXT (JSON array),
  description TEXT
);
```

**Sample Record**:
```json
{
  "id": "m1",
  "title": "Vikram",
  "year": 2022,
  "genre": ["Action", "Thriller"],
  "language": "Tamil",
  "rating": 8.3,
  "poster": "https://images.unsplash.com/...",
  "platforms": ["hotstar", "zee5"],
  "description": "A special agent investigates a murder..."
}
```

---

## 🧪 Testing Production Setup

```bash
# Terminal 1: Start Backend
cd backend
python app.py
# Output: Running on http://localhost:5000

# Terminal 2: Start Frontend
npm run dev
# Output: Local: http://localhost:5173

# Terminal 3: Test API
curl http://localhost:5000/api/movies | python -m json.tool
```

## 🔐 Environment Variables

Create `.env.local` file in root (for Vite):
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Vite uses `VITE_` prefix (not `REACT_APP_`)

---

## 🎯 Current Status

| Component | Status | Details |
|-----------|--------|---------|
| Frontend | ✅ Running | Vite + React on port 5173 |
| Backend | ⚠️ Not Running | Python not installed, needs setup |
| Database | 🔒 Not Initialized | Will auto-initialize on backend start |
| Fallback Data | ✅ Active | 20 movies loaded locally |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Python not found" | Install Python from python.org or Microsoft Store |
| Backend not starting | Run: `python -m pip install -r requirements.txt` first |
| Port 5000 already in use | Change port in app.py or kill process: `lsof -ti:5000` |
| Movies still blank | Check browser console for errors, ensure backend is running |
| CORS errors | Flask already has CORS enabled in app.py |

---

## 📝 Summary

**Why movies don't load in production?**
1. Backend API not running (Python/Flask not set up)
2. Database not initialized
3. Frontend can't reach backend

**Current Solution**: Smart fallback ensures app always works:
- ✅ With backend → Real data from database
- ✅ Without backend → Local hardcoded data

**Next Step**: Install Python and run the backend to test full integration!
