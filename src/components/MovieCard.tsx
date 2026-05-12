import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Movie } from '../data/movies';
import { PlatformBadge } from './PlatformBadge';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(({ movie, onClick }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.9
      }}
      whileHover={{
        y: -8,
        scale: 1.02
      }}
      transition={{
        duration: 0.3
      }}
      onClick={() => onClick(movie)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl">
      
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy" />
        

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {movie.platforms.map((platformId) =>
          <PlatformBadge key={platformId} platformId={platformId} showName />
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-white">
            {movie.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold text-white leading-tight mb-1 line-clamp-1 group-hover:text-glow">
          {movie.title}
        </h3>

        <div className="flex items-center text-xs text-white/70 gap-2 mb-2">
          <span>{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{movie.language}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="truncate">{movie.genre[0]}</span>
        </div>
      </div>
    </motion.div>);
});