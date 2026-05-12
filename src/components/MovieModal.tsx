import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Play, Calendar, Globe, Film } from 'lucide-react';
import { Movie } from '../data/movies';
import { platforms } from '../data/platforms';
interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}
export function MovieModal({ movie, onClose }: MovieModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [movie]);
  if (!movie) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        

        {/* Modal Content */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar bg-[#111] rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
            
            <X size={20} />
          </button>

          {/* Poster Section (Left on Desktop, Top on Mobile) */}
          <div className="w-full md:w-2/5 relative aspect-[2/3] md:aspect-auto md:min-h-[500px]">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#111]" />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-white">
                  {movie.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <Calendar size={14} />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <Globe size={14} />
                <span>{movie.language}</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g) =>
              <span
                key={g}
                className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/80">
                
                  {g}
                </span>
              )}
            </div>

            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              {movie.description}
            </p>

            <div className="mt-auto">
              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Film size={16} />
                Available on
              </h4>

              <div className="flex flex-col gap-3">
                {movie.platforms.map((platformId) => {
                  const platform = platforms[platformId];
                  if (!platform) return null;
                  return (
                    <a
                      key={platformId}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-between w-full p-4 rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: `${platform.color}15`,
                        border: `1px solid ${platform.color}30`
                      }}>
                      
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg"
                          style={{
                            backgroundColor: platform.color,
                            color: platform.textColor
                          }}>
                          
                          {platform.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white text-lg">
                          {platform.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Watch Now</span>
                        <Play size={16} className="fill-current" />
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${platform.color}20, transparent)`
                        }} />
                      
                    </a>);

                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

}