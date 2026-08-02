import { Movie } from '../data/movies';

// Get your free API key from: https://www.themoviedb.org/settings/api
// Use Vite's import.meta.env (not process.env)
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';

// Use proxy in development (Vite proxy) and production (Vercel serverless function)
// This avoids CORS issues on all devices including mobile!
const TMDB_BASE_URL = import.meta.env.DEV
  ? '/tmdb-api'
  : '/api/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Platform mapping (TMDB provider IDs to our platform names)
const PLATFORM_MAP: Record<number, string> = {
  8: 'netflix',
  119: 'prime',
  2100: 'prime', // Prime Video with Ads
  2: 'appletv',
  350: 'appletv', // Apple TV
  337: 'hotstar', // Disney+ Hotstar / Disney
  122: 'hotstar', // Hotstar
  384: 'hotstar', // Hotstar
  2336: 'hotstar', // JioHotstar
  237: 'sonyliv', // Sony Liv
  232: 'zee5', // Zee5
  532: 'aha', // aha
  220: 'jiocinema' // JioCinema
};

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  genres?: Array<{ id: number; name: string }>;
  genre_ids?: number[];
  vote_average: number;
  overview: string;
  poster_path: string | null;
  original_language: string;
  watch_providers?: {
    results: {
      [key: string]: {
        providers: Array<{ provider_id: number; provider_name: string }>;
      };
    };
  };
}

interface TMDBGenre {
  id: number;
  name: string;
}

let genreMap: Record<number, string> = {};

// Fetch with timeout helper
async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Fetch genre list
async function fetchGenres(): Promise<Record<number, string>> {
  if (Object.keys(genreMap).length > 0) return genreMap;

  try {
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await response.json();
    
    const map: Record<number, string> = {};
    data.genres?.forEach((genre: TMDBGenre) => {
      map[genre.id] = genre.name;
    });
    
    genreMap = map;
    return genreMap;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return {};
  }
}

// Search movies by query
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    );
    const data = await response.json();
    
    const genres = await fetchGenres();
    const movieResults = (data.results || []).slice(0, 12);
    
    // Batch watch provider calls with concurrency limit of 5
    const movies = await batchWithProviders(movieResults, genres);
    
    return movies;
  } catch (error) {
    console.error('Failed to search movies:', error);
    return [];
  }
}

// Get trending movies
export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      console.error('TMDB trending API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.status_code) {
      // TMDB error response (e.g., invalid API key)
      console.error('TMDB API Error:', data.status_message);
      return [];
    }

    const genres = await fetchGenres();
    const movieResults = (data.results || []).slice(0, 16);
    
    // Batch watch provider calls with concurrency limit of 5
    const movies = await batchWithProviders(movieResults, genres);
    
    return movies;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return [];
  }
}

// Get movies by platform (genre-based approximation)
export async function getMoviesByPlatform(platform: string): Promise<Movie[]> {
  try {
    const genreIds = getGenresByPlatform(platform);
    const genreStr = genreIds.join(',');
    
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreStr}&language=en-US&sort_by=popularity.desc`
    );
    const data = await response.json();
    
    const genres = await fetchGenres();
    const movieResults = (data.results || []).slice(0, 16);
    
    const movies = await batchWithProviders(movieResults, genres, platform);
    
    return movies;
  } catch (error) {
    console.error(`Failed to fetch ${platform} movies:`, error);
    return [];
  }
}

// Batch API calls with concurrency limit to avoid rate limiting / mobile slowness
async function batchWithProviders(
  movieResults: TMDBMovie[],
  genres: Record<number, string>,
  forcePlatform?: string
): Promise<Movie[]> {
  const CONCURRENCY = 4; // Max 4 parallel watch-provider calls at a time
  const results: Movie[] = [];

  for (let i = 0; i < movieResults.length; i += CONCURRENCY) {
    const batch = movieResults.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (movie: TMDBMovie) => {
        const movieObj = tmdbToMovie(movie, genres);
        movieObj.platforms = await getWatchProviders(movie.id);
        // Ensure the selected platform is included if filtering by platform
        if (forcePlatform && !movieObj.platforms.includes(forcePlatform)) {
          movieObj.platforms.push(forcePlatform);
        }
        return movieObj;
      })
    );
    results.push(...batchResults);
  }

  return results;
}

// Get movie watch providers (where to watch)
async function getWatchProviders(movieId: number): Promise<string[]> {
  try {
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`,
      5000 // 5s timeout per provider call
    );
    const data = await response.json();
    
    const providers: string[] = [];
    
    // Check Indian watch providers first
    const inData = data.results?.IN;
    if (inData) {
      const allINProviders = [
        ...(inData.flatrate || []),
        ...(inData.rent || []),
        ...(inData.buy || [])
      ];
      
      allINProviders.forEach((provider: any) => {
        const platformName = PLATFORM_MAP[provider.provider_id];
        if (platformName && !providers.includes(platformName)) {
          providers.push(platformName);
        }
      });
    }
    
    // Check US watch providers as a fallback
    if (providers.length === 0) {
      const usData = data.results?.US;
      if (usData) {
        const allUSProviders = [
          ...(usData.flatrate || []),
          ...(usData.rent || []),
          ...(usData.buy || [])
        ];
        
        allUSProviders.forEach((provider: any) => {
          const platformName = PLATFORM_MAP[provider.provider_id];
          if (platformName && !providers.includes(platformName)) {
            providers.push(platformName);
          }
        });
      }
    }
    
    return providers.length > 0 ? providers : [];
  } catch (error) {
    console.error('Failed to fetch watch providers:', error);
    return [];
  }
}

// Convert TMDB movie to our Movie format
function tmdbToMovie(tmdbMovie: TMDBMovie, genres: Record<number, string>): Movie {
  const genreIds = tmdbMovie.genre_ids || [];
  const genreNames = genreIds
    .map(id => genres[id])
    .filter(Boolean);

  const releaseYear = tmdbMovie.release_date 
    ? new Date(tmdbMovie.release_date).getFullYear() 
    : new Date().getFullYear();

  return {
    id: String(tmdbMovie.id),
    title: tmdbMovie.title,
    year: releaseYear,
    genre: genreNames.length > 0 ? genreNames : ['Movie'],
    language: tmdbMovie.original_language.toUpperCase(),
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    poster: tmdbMovie.poster_path 
      ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : 'https://placehold.co/500x750?text=No+Poster',
    platforms: [],
    description: tmdbMovie.overview || 'No description available.'
  };
}

// Helper: Get genres by platform
function getGenresByPlatform(platform: string): number[] {
  const platformGenres: Record<string, number[]> = {
    netflix: [28, 35, 18, 878], // Action, Comedy, Drama, Sci-Fi
    prime: [28, 53, 18], // Action, Thriller, Drama
    hotstar: [28, 18, 12], // Action, Drama, Adventure
    jiocinema: [27, 53], // Horror, Thriller
    sonyliv: [28, 53], // Action, Thriller
    zee5: [28, 18], // Action, Drama
    appletv: [878, 18], // Sci-Fi, Drama
    disney: [16, 10751], // Animation, Family
  };
  
  return platformGenres[platform] || [28]; // Default: Action
}

// Helper: Check if API is configured
export function isTMDBConfigured(): boolean {
  return TMDB_API_KEY !== 'YOUR_API_KEY_HERE' && TMDB_API_KEY.length > 10;
}

export function getTMDBApiKey(): string {
  return TMDB_API_KEY;
}
