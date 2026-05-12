import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative w-full max-w-2xl mx-auto z-10">
      <motion.div
        animate={{
          boxShadow: isFocused ?
          '0 0 0 2px rgba(99, 102, 241, 0.5), 0 10px 30px -10px rgba(0,0,0,0.5)' :
          '0 4px 20px -10px rgba(0,0,0,0.5)',
          scale: isFocused ? 1.02 : 1
        }}
        transition={{
          duration: 0.2
        }}
        className="relative flex items-center w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        
        <div className="pl-5 pr-3 text-white/50">
          <Search size={22} className={isFocused ? 'text-indigo-400' : ''} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a movie (e.g., Vikram, Inception)..."
          className="w-full py-4 bg-transparent text-white placeholder-white/40 outline-none text-lg font-medium" />
        

        {value &&
        <button
          onClick={() => onChange('')}
          className="px-5 text-white/50 hover:text-white transition-colors">
          
            <X size={20} />
          </button>
        }
      </motion.div>

      {/* Decorative glow behind search bar */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full opacity-50" />
    </div>);

}