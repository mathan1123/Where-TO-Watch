# TMDB API Integration Guide

## 🎬 What is TMDB?

**The Movie Database (TMDB)** is a free, crowd-sourced database of movies and TV shows.
- ✅ Free API access
- ✅ 500,000+ movies
- ✅ Real-time data
- ✅ Search, trending, genres, watch providers

API Docs: https://www.themoviedb.org/settings/api

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Free TMDB API Key
1. Go to: https://www.themoviedb.org/settings/api
2. Create an account (free)
3. Accept terms and conditions
4. Request an API key
5. Copy your API key (v3 Auth)

### Step 2: Add API Key to Environment
Create `.env.local` in project root:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

Example (don't use this):
```env
VITE_TMDB_API_KEY=abc123def456ghi789jkl012mno345pqr
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

That's it! 🎉 Your app now fetches real movies from TMDB.

---

## ✅ Verification

1. Open: http://localhost:5173
2. Look for the badge in header:
   - 🎬 **TMDB API** = Successfully connected (real data)
   - 📦 **Local Data** = Using fallback (development mode)

3. Open browser console: `F12`
4. Search for a movie → Check console for:
   ```
   ✅ Loaded from TMDB API: 20 movies
   ```

---

## 🔄 How It Works

```
User Search "Inception"
         ↓
   App.tsx (useMemo)
         ↓
   tmdbService.searchMovies()
         ↓
   TMDB API: /search/movie
         ↓
   JSON Response (real movie data)
         ↓
   Convert to Movie format
         ↓
   Display on UI
```

---

## 📋 TMDB Service Functions

### `searchMovies(query: string)`
Search for movies by title
```typescript
const results = await searchMovies('Inception');
// Returns: Array of matching movies with real data
```

### `getTrendingMovies()`
Get weekly trending movies
```typescript
const trending = await getTrendingMovies();
// Returns: 20 trending movies
```

### `getMoviesByPlatform(platform: string)`
Get movies available on specific platform
```typescript
const netflix = await getMoviesByPlatform('netflix');
// Returns: Movies available on Netflix
```

---

## 🎨 Features Enabled by TMDB

### ✅ Real Movie Data
- Actual movie posters from TMDB CDN
- Real ratings (IMDB-like scores)
- Real genres, languages, release dates
- Real synopsis/descriptions

### ✅ Search Functionality
- Search across 500,000+ movies
- Real-time results
- Smart filtering by title, genre

### ✅ Trending Movies
- Weekly trending movies
- Always updated
- Popular selections

### ✅ Platform Integration (Future)
- Where to watch (Netflix, Prime, etc.)
- Watch provider data
- Regional availability

---

## 🌐 Available Endpoints

### Trending (No search - just popular)
```
GET /trending/movie/week
Response: Top trending movies of the week
```

### Search
```
GET /search/movie?query=inception
Response: All movies matching "Inception"
```

### Discover by Genre
```
GET /discover/movie?with_genres=28,12
Response: Action + Adventure movies
```

### Watch Providers
```
GET /movie/{id}/watch/providers
Response: Where to watch this movie
```

---

## 🔐 Security Best Practices

### ❌ Don't Do This
```typescript
// DON'T hardcode API key in source code
const API_KEY = 'abc123...'; // ❌ EXPOSED

// DON'T push .env to GitHub
git add .env // ❌ NEVER DO THIS
```

### ✅ Do This
```typescript
// Use environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Add .env to .gitignore
echo ".env.local" >> .gitignore
```

### Setup for Production
```bash
# On Vercel/Netlify dashboard:
1. Settings → Environment Variables
2. Add: REACT_APP_TMDB_API_KEY = your_key
3. Redeploy
```

---

## 🎯 Rate Limits

TMDB free tier limits:
- **40 requests/10 seconds** per IP
- App implements **500ms debounce** to avoid hitting limit

```typescript
// Debounced to prevent too many API calls
const debounce = setTimeout(() => {
  fetchMovies();
}, 500); // Wait 500ms after user stops typing
```

---

## 📊 Comparison: Local vs TMDB

| Feature | Local Data | TMDB API |
|---------|-----------|----------|
| **Movies** | 20 hardcoded | 500,000+ |
| **Data Freshness** | Static | Real-time |
| **Search** | Client-side | Server-side |
| **Genres** | Limited | 20+ genres |
| **Language** | English only | Multi-language |
| **Ratings** | Demo values | Real IMDB scores |
| **Setup** | 0 minutes | 5 minutes |
| **Cost** | Free | Free |

---

## 🆘 Troubleshooting

### Issue: "Loading..." forever
```
Possible causes:
1. API key not set (check .env.local)
2. API key invalid/expired
3. Network issues
4. Rate limit exceeded

Solution:
- Check console (F12) for errors
- Verify API key in .env.local
- Wait 10 seconds before retrying
- Check https://www.themoviedb.org/settings/api
```

### Issue: Movies still showing local data
```
Solution:
- Restart dev server: npm run dev
- Hard refresh browser: Ctrl+Shift+R
- Check .env.local exists with valid key
- Look for 📦 Local Data badge (means TMDB not connected)
```

### Issue: API returning 401 Unauthorized
```
Solution:
- API key is invalid or expired
- Go to https://www.themoviedb.org/settings/api
- Generate a new API key
- Update .env.local
- Restart dev server
```

### Issue: CORS errors
```
Error: Access to XMLHttpRequest blocked by CORS policy
Solution:
- TMDB API supports CORS ✅
- Check browser console for actual error
- Verify API endpoint in tmdbService.ts
```

---

## 📁 Project Structure

```
src/
├── App.tsx (Uses TMDB service)
├── services/
│   └── tmdbService.ts (✨ NEW - TMDB integration)
├── data/
│   └── movies.ts (Fallback local data)
└── components/
    ├── MovieCard.tsx
    ├── SearchBar.tsx
    ├── FilterChips.tsx
    └── MovieModal.tsx
```

---

## 🚀 Advanced: Get Watch Providers

To show "where to watch" (Netflix, Prime, etc.):

```typescript
// In tmdbService.ts, uncomment the getWatchProviders function

export async function getWatchProviders(movieId: number): Promise<string[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  // Returns: ['netflix', 'prime', 'hotstar']
}
```

Then use in MovieModal:
```typescript
const providers = await getWatchProviders(movie.id);
```

---

## ✨ Future Enhancements

- [ ] Add real watch provider links
- [ ] User ratings and reviews
- [ ] Watchlist/Favorites
- [ ] Similar movie recommendations
- [ ] TV Shows integration
- [ ] Cast and crew information
- [ ] Certification ratings (PG, R, etc.)

---

## 📞 Support

- TMDB API Docs: https://www.themoviedb.org/settings/api
- Community Forum: https://www.themoviedb.org/talk
- Discord: https://discord.gg/P59uDTw

---

## 🎓 Learning Resources

- **API v3 Docs**: https://developers.themoviedb.org/3
- **React + TMDB**: Search on Medium/Dev.to
- **Movie App Tutorials**: YouTube "React TMDB API"

---

## 🏆 Next Steps

1. ✅ Get API key (5 min)
2. ✅ Add to .env.local (1 min)
3. ✅ Restart dev server (1 min)
4. ✅ Test with search (2 min)
5. ✅ Deploy to production (Vercel)

**Total setup time: 10 minutes** ⏱️

Start exploring 500,000+ movies! 🎬🍿
