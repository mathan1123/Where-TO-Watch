import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { FilterChips } from './components/FilterChips';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { EmptyState } from './components/EmptyState';
import { Movie } from './data/movies';
export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzdmY2NhYzllMzQxY2FjZDJiNzhmOTI3Njk3ZDAxOSIsIm5iZiI6MTc3ODM5MTgxOS44ODQsInN1YiI6IjZhMDAxYjBiNTg0ZjA1NmUyNzMxNmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SoIW-61mDX_3rPxaOvpYapyBOvFpPPnKm_9rMIQn5bU';
    const controller = new AbortController();

    const fetchGenreMap = async () => {
      try {
        const genreRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
          },
          signal: controller.signal
        });

        const genreData = await genreRes.json();
        const map: Record<number, string> = {};
        if (genreData.genres) {
          genreData.genres.forEach((g: any) => {
            map[g.id] = g.name;
          });
        }
        setGenreMap(map);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Failed to load TMDB genres:', err);
        }
      }
    };

    fetchGenreMap();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzdmY2NhYzllMzQxY2FjZDJiNzhmOTI3Njk3ZDAxOSIsIm5iZiI6MTc3ODM5MTgxOS44ODQsInN1YiI6IjZhMDAxYjBiNTg0ZjA1NmUyNzMxNmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SoIW-61mDX_3rPxaOvpYapyBOvFpPPnKm_9rMIQn5bU';
    const platformOptions = ['netflix', 'prime', 'hotstar', 'zee5', 'sonyliv', 'jiocinema'];
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = "https://where-to-watch-99hz.onrender.com/api/movies"
        
        const moviesRes = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
          },
          signal: controller.signal
        });

        const moviesData = await moviesRes.json();
        const mappedMovies: Movie[] = (moviesData.results || []).map((tmdbMovie: any) => {
          const numPlatforms = Math.floor(Math.random() * 3) + 1;
          const shuffled = [...platformOptions].sort(() => 0.5 - Math.random());
          const moviePlatforms = shuffled.slice(0, numPlatforms);

          return {
            id: String(tmdbMovie.id),
            title: tmdbMovie.title || tmdbMovie.name || 'Unknown Title',
            year: tmdbMovie.release_date ? parseInt(tmdbMovie.release_date.substring(0, 4)) : new Date().getFullYear(),
            genre: tmdbMovie.genre_ids ? tmdbMovie.genre_ids.map((id: number) => genreMap[id] || 'Unknown') : ['Unknown'],
            language: tmdbMovie.original_language ? tmdbMovie.original_language.toUpperCase() : 'Unknown',
            rating: tmdbMovie.vote_average || 0,
            poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
            platforms: moviePlatforms,
            description: tmdbMovie.overview || 'No description available.'
          };
        });

        setMovies(mappedMovies);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Failed to fetch movies from TMDB:', err);
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [searchQuery, genreMap]);

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // Filter logic
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesPlatform = selectedPlatform ? movie.platforms.includes(selectedPlatform) : true;
      return matchesPlatform;
    });
  }, [movies, selectedPlatform]);
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Header / Hero Section */}
      <header className="relative pt-20 pb-10 px-4 md:pt-32 md:pb-16 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Where to Watch?
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Find out which OTT platform is streaming your favorite movies.
            Search across Netflix, Prime, Hotstar, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: 'easeOut'
          }}
          className="w-full max-w-3xl mx-auto">
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        {/* Filters */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.6,
            delay: 0.4
          }}
          className="mb-8">
          
          <FilterChips
            selectedPlatform={selectedPlatform}
            onSelectPlatform={setSelectedPlatform} />
          
        </motion.div>

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-white/90">
            {searchQuery ?
            'Search Results' :
            selectedPlatform ?
            'Platform Highlights' :
            'Trending Now'}
          </h2>
          <span className="text-sm font-medium text-white/40">
            {filteredMovies.length}{' '}
            {filteredMovies.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>

        {/* Movie Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : filteredMovies.length > 0 ?
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          
            <AnimatePresence mode="popLayout">
              {filteredMovies.map((movie) =>
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie} />

            )}
            </AnimatePresence>
          </motion.div> :

        <EmptyState
          type={searchQuery ? 'no-results' : 'no-platform'}
          query={searchQuery} />

        }
      </main>

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)} />
      
    </div>);

}