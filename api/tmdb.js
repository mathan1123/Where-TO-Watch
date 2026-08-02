// Vercel Serverless Function - TMDB API Proxy
// This runs on the server, so no CORS issues on mobile or any browser!
// Set TMDB_API_KEY in Vercel Dashboard → Project Settings → Environment Variables

export default async function handler(req, res) {
  // Allow CORS from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    return res.status(500).json({
      status_message: 'TMDB_API_KEY not configured in Vercel environment variables.',
      status_code: 7,
    });
  }

  // req.url example: /api/tmdb/trending/movie/week?language=en-US&api_key=xxx
  const urlPath = req.url || '';

  // Strip /api/tmdb prefix to get the TMDB path
  const tmdbPath = urlPath.replace(/^\/api\/tmdb/, '') || '/';

  // Split path and query string
  const [pathname, qs] = tmdbPath.split('?');
  const params = new URLSearchParams(qs || '');

  // Always use the server-side API key (more secure, removes frontend one)
  params.delete('api_key');
  params.set('api_key', TMDB_API_KEY);

  const targetUrl = `https://api.themoviedb.org/3${pathname}?${params.toString()}`;

  console.log(`[TMDB Proxy] → ${pathname}`);

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    // Cache responses for 5 minutes to reduce API calls
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('[TMDB Proxy] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from TMDB API' });
  }
}
