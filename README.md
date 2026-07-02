# 🎬 Where to Watch? - Movie OTT Finder

A modern movie discovery app that helps you **find where to watch** your favorite movies across Netflix, Prime Video, Disney+ Hotstar, and more!

## ✨ Features

- 🔍 **Search** across 500,000+ movies (TMDB integration)
- 🎯 **Filter** by OTT platforms (Netflix, Prime, Hotstar, etc.)
- ⭐ **Real ratings** and descriptions
- 🎨 **Beautiful UI** with smooth animations
- 📱 **Responsive design** (mobile & desktop)
- 💾 **Offline-first** - works without backend
- 🚀 **Lightning fast** - instant search & filtering

## 🎯 Tech Stack

### Frontend
- **React 18** + **TypeScript** for robust UI
- **Vite** for blazing-fast dev server & builds
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations

### Backend (Optional)
- **Flask** (Python) - Movie API server
- **SQLite** - Movie database
- **CORS** - Cross-origin requests support

### Data Sources
- **TMDB API** - 500,000+ real movies (primary)
- **Local data** - 20 demo movies (fallback)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- (Optional) Python 3.9+ for backend

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Add TMDB API Key (Optional but Recommended)
1. Get free API key from: https://www.themoviedb.org/settings/api
2. Create `.env.local` file in project root:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

### Step 3: Start Dev Server
```bash
npm run dev
```

Open: https://where-to-watch-47xy.vercel.app/

---

## 📊 Architecture

```
┌─────────────────────────────────────┐
│        Frontend (React + Vite)       │
│   http://localhost:5173             │
│                                      │
│  [Search] [Filters] [Movie Grid]   │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────────────────────┐
        │  Try TMDB API First?        │
        │  (API key configured?)      │
        └──────┬───────────────────┬──┘
         YES │               NO │
             │                  │
    ┌────────▼─────┐    ┌───────▼────┐
    │ TMDB API     │    │ Local Data │
    │ 500K+ movies│    │ 20 movies  │
    └────────┬─────┘    └───────┬────┘
             │                  │
             └──────────┬───────┘
                        │
             ┌──────────▼──────────┐
             │ Display on UI       │
             │ Search & Filtering  │
             └─────────────────────┘
```

---

## 📁 Project Structure

```
Where-TO-Watch/
├── src/
│   ├── App.tsx                 # Main app (data fetching + filtering)
│   ├── index.tsx               # React entry point
│   ├── services/
│   │   └── tmdbService.ts      # ✨ TMDB API integration
│   ├── components/
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── FilterChips.tsx     # Platform filters
│   │   ├── MovieCard.tsx       # Movie card component
│   │   ├── MovieModal.tsx      # Movie detail modal
│   │   ├── PlatformBadge.tsx   # Platform badge
│   │   └── EmptyState.tsx      # Empty state UI
│   └── data/
│       ├── movies.ts           # Local demo data (20 movies)
│       └── platforms.ts        # Platform definitions
├── backend/
│   ├── app.py                  # Flask API server
│   └── requirements.txt         # Python dependencies
├── public/
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md                   # 👈 You are here
├── TMDB_QUICK_START.md         # TMDB setup (5 min)
├── TMDB_API_SETUP.md           # TMDB detailed guide
└── PRODUCTION_SETUP.md         # Production deployment guide
```

---

## 🎯 How It Works

### Search Flow
```
User types "Inception"
         ↓
   App detects input change
         ↓
   Debounce 500ms (prevent API spam)
         ↓
   TMDB API: /search/movie
         ↓
   Returns 20 matching movies
         ↓
   Convert to Movie format
         ↓
   Display in grid
```

### Platform Filter Flow
```
User clicks "Netflix"
         ↓
   updateFilter('netflix')
         ↓
   TMDB API: /discover/movie?genre=netflix
         ↓
   Returns Netflix movies
         ↓
   Display filtered grid
```

---

## 🔐 Configuration

### Environment Variables

Create `.env.local` in project root:

```env
# TMDB API Configuration (free tier)
VITE_TMDB_API_KEY=your_api_key_here
```

**Getting API Key:**
1. Visit: https://www.themoviedb.org/settings/api
2. Create free account
3. Request API key (v3 Auth)
4. Add to `.env.local`

**Note**: API key is NOT in version control (.env.local is in .gitignore)

---

## 🎨 UI Features

### Movie Card
- Poster image from TMDB
- Movie title
- Rating (1-10)
- Release year
- Available platforms

### Movie Modal
- Full poster
- Title, year, language
- Rating & genres
- Full description
- Available OTT platforms with links

### Filter Chips
- All Platforms
- Netflix
- Prime Video
- Disney+ Hotstar
- JioCinema
- Sony LIV
- ZEE5
- Aha
- Apple TV+

### Search Bar
- Real-time search
- Placeholder suggestions
- Clear button

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# https://vercel.com/new

# 3. Set environment variable
# VITE_TMDB_API_KEY = your_key

# 4. Deploy!
```

### Backend Deployment (Render/Heroku)
See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [TMDB_QUICK_START.md](./TMDB_QUICK_START.md) | 5-min quick setup |
| [TMDB_API_SETUP.md](./TMDB_API_SETUP.md) | Detailed TMDB integration |
| [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) | Deploy to production |

---

## 🎓 Learning Resources

### Frontend
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/

### TMDB
- API Docs: https://www.themoviedb.org/settings/api
- Community: https://www.themoviedb.org/talk
- Tutorials: Search "React TMDB API" on Medium/YouTube

---

## 🛠️ Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Lint with ESLint
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 🆘 Troubleshooting

### Movies Not Showing
1. Check browser console (F12)
2. Verify `.env.local` has TMDB API key
3. Hard refresh: `Ctrl+Shift+R`
4. Restart dev server: `npm run dev`

### Search Not Working
1. Ensure TMDB API key is valid
2. Check rate limit (max 40 requests/10 sec)
3. Search with 2+ characters

### Styling Issues
1. Restart dev server
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Rebuild: `npm run build`

See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md#troubleshooting) for more solutions.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Created with ❤️ for movie lovers

---

## 🎬 Status

- ✅ Frontend complete
- ✅ TMDB integration complete
- ✅ Search functionality working
- ✅ Platform filters working
- ✅ Responsive design done
- 🔄 Backend (optional) - setup guide provided

---

## 🚀 Quick Links

- **Live Demo**: https://where-to-watch-47xy.vercel.app/
- **TMDB API**: https://www.themoviedb.org/settings/api
- **Get Started**: See [TMDB_QUICK_START.md](./TMDB_QUICK_START.md)

---

**Enjoy discovering movies! 🍿🎬**
