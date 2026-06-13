import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { FilterChips } from './components/FilterChips';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { EmptyState } from './components/EmptyState';
import { Movie, moviesData } from './data/movies';
import { searchMovies, getTrendingMovies, getMoviesByPlatform, isTMDBConfigured } from './services/tmdbService';

export function App() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [usingTMDB, setUsingTMDB] = useState(false);

  // Fetch movies on component mount or when filters change
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let results: Movie[] = [];

        // Try TMDB first if configured
        if (isTMDBConfigured()) {
          if (searchQuery.trim()) {
            // Search mode
            results = await searchMovies(searchQuery);
          } else if (selectedPlatform) {
            // Platform filter mode
            results = await getMoviesByPlatform(selectedPlatform);
          } else {
            // Trending mode
            results = await getTrendingMovies();
          }

          if (results.length > 0) {
            setMovies(results);
            setUsingTMDB(true);
            console.log('✅ Loaded from TMDB API:', results.length, 'movies');
            return;
          }
        }

        // Fallback to local data if TMDB fails or not configured
        setMovies(moviesData);
        setUsingTMDB(false);
        console.log('⚠️ Using local data:', moviesData.length, 'movies');
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies(moviesData);
        setUsingTMDB(false);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 500); // Debounce to avoid too many API calls

    return () => clearTimeout(debounce);
  }, [searchQuery, selectedPlatform]);

  // Note: For TMDB, filtering is handled server-side via API calls
  // For local data, we still do client-side filtering
  const filteredMovies = useMemo(() => {
    if (usingTMDB) {
      // TMDB already returns filtered results via API
      return movies;
    }

    // Client-side filtering for local data
    let results = movies;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(query) ||
          movie.description.toLowerCase().includes(query) ||
          movie.genre.some(g => g.toLowerCase().includes(query))
        );
      });
    }

    if (selectedPlatform) {
      results = results.filter((movie) =>
        movie.platforms.includes(selectedPlatform)
      );
    }

    return results;
  }, [movies, searchQuery, selectedPlatform, usingTMDB]);

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
          <div className="flex justify-center gap-2 mb-4">
            {usingTMDB ? (
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                🎬 TMDB API
              </span>
            ) : (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                📦 Local Data
              </span>
            )}
          </div>
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
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white/60 text-sm">Loading movies from API...</p>
          </div>
        ) : filteredMovies.length > 0 ? (
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
          </motion.div>
        ) : (
        <EmptyState
          type={searchQuery ? 'no-results' : 'no-platform'}
          query={searchQuery} />
        )}
      </main>

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)} />
      
    </div>);

}