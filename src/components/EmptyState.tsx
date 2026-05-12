import { Film, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
interface EmptyStateProps {
  type: 'no-results' | 'no-platform';
  query?: string;
}
export function EmptyState({ type, query }: EmptyStateProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center">
      
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {type === 'no-results' ?
        <SearchX size={40} className="text-white/40" /> :

        <Film size={40} className="text-white/40" />
        }
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        {type === 'no-results' ? 'No movies found' : 'Nothing on this platform'}
      </h3>

      <p className="text-white/50 max-w-md mx-auto">
        {type === 'no-results' ?
        `We couldn't find any matches for "${query}". Try searching for another movie like "Vikram", "Inception", or "Jailer".` :
        "We don't have any movies listed for this platform right now. Try selecting 'All Platforms' or searching directly."}
      </p>
    </motion.div>);

}