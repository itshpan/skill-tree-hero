import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryColors = {
  strength: { bg: 'bg-red-600', border: 'border-red-500', text: 'text-white', glow: '#FF0000' },
  intelligence: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-white', glow: '#0000FF' },
  discipline: { bg: 'bg-yellow-500', border: 'border-yellow-400', text: 'text-black', glow: '#FFFF00' },
  creativity: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-white', glow: '#FF00FF' },
  vitality: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-white', glow: '#00FF00' },
  charisma: { bg: 'bg-cyan-500', border: 'border-cyan-400', text: 'text-black', glow: '#00FFFF' }
};

const categoryIcons = {
  strength: '█',
  intelligence: '▲',
  discipline: '♦',
  creativity: '★',
  vitality: '♥',
  charisma: '◆'
};

export default function HabitCard({ habit, onComplete, onDelete, isCompletedToday }) {
  const [showXP, setShowXP] = useState(false);
  const colors = categoryColors[habit.skill_category] || categoryColors.strength;
  const streakBonus = Math.min(Math.floor(habit.current_streak / 7) + 1, 5);
  const totalXP = habit.xp_reward * streakBonus;
  
  const handleComplete = () => {
    if (!isCompletedToday) {
      setShowXP(true);
      onComplete(habit);
      setTimeout(() => setShowXP(false), 2000);
    }
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-black border-4 border-white p-1"
      style={{ imageRendering: 'pixelated' }}
    >
      <div className={`border-4 ${colors.border} ${colors.bg} p-4 relative`}
        style={{ boxShadow: `0 0 20px ${colors.glow}` }}
      >
      {/* Pixel pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px)',
          imageRendering: 'pixelated'
        }}
      />
      
      {/* XP popup - arcade style */}
      <AnimatePresence>
        {showXP && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: -60 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          >
            <span 
              className="text-3xl font-black px-3 py-1 bg-black border-4 border-yellow-400"
              style={{ 
                fontFamily: 'monospace',
                color: '#FFFF00',
                textShadow: '3px 3px 0 #FF0000',
                boxShadow: '0 0 30px #FFFF00',
                imageRendering: 'pixelated'
              }}
            >
              +{totalXP}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* Habit info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-2xl"
              style={{ 
                color: colors.glow,
                textShadow: `2px 2px 0 #000`,
                imageRendering: 'pixelated'
              }}
            >
              {categoryIcons[habit.skill_category]}
            </span>
            <h3 
              className={`font-black truncate ${colors.text}`}
              style={{ 
                fontFamily: 'monospace',
                textShadow: '2px 2px 0 #000',
                imageRendering: 'pixelated'
              }}
            >
              {habit.name.toUpperCase()}
            </h3>
          </div>
          
          {habit.description && (
            <p className="text-xs mb-2 line-clamp-2" style={{ fontFamily: 'monospace', color: '#CCCCCC' }}>
              {habit.description}
            </p>
          )}
          
          {/* Stats row - arcade style */}
          <div className="flex items-center gap-3 text-sm">
            {/* Streak */}
            <div 
              className={`px-2 py-1 border-2 ${habit.current_streak > 0 ? 'border-orange-500 bg-orange-500/20' : 'border-gray-600 bg-gray-600/20'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              <span 
                className={`font-black ${habit.current_streak > 0 ? 'text-orange-400' : 'text-gray-500'}`}
                style={{ 
                  fontFamily: 'monospace',
                  textShadow: habit.current_streak > 0 ? '1px 1px 0 #000' : 'none'
                }}
              >
                🔥{habit.current_streak}
              </span>
            </div>
            
            {/* XP reward */}
            <div 
              className="px-2 py-1 border-2 border-yellow-400 bg-yellow-400/20"
              style={{ imageRendering: 'pixelated' }}
            >
              <span 
                className="font-black text-yellow-400"
                style={{ 
                  fontFamily: 'monospace',
                  textShadow: '1px 1px 0 #000'
                }}
              >
                ⚡{totalXP}
                {streakBonus > 1 && (
                  <span className="text-xs ml-1 text-green-400">x{streakBonus}</span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Actions - arcade buttons */}
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComplete}
            disabled={isCompletedToday}
            className={`w-14 h-14 border-4 flex items-center justify-center font-black text-2xl ${
              isCompletedToday 
                ? 'bg-green-500 border-green-300 text-white' 
                : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-green-600 hover:border-green-400'
            }`}
            style={{ 
              imageRendering: 'pixelated',
              boxShadow: isCompletedToday ? '0 0 20px #00FF00' : '0 4px 0 #000'
            }}
          >
            ✓
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(habit.id)}
            className="w-14 h-14 border-4 bg-gray-700 border-gray-500 text-red-500 hover:bg-red-600 hover:border-red-400 flex items-center justify-center font-black text-2xl"
            style={{ 
              imageRendering: 'pixelated',
              boxShadow: '0 4px 0 #000'
            }}
          >
            ✕
          </motion.button>
        </div>
      </div>
      </div>
      
      {/* Best streak badge - pixel style */}
      {habit.longest_streak > 0 && (
        <div 
          className="absolute -top-2 -right-2 px-2 py-1 bg-black border-2 border-orange-500 text-xs font-black text-orange-400"
          style={{ 
            fontFamily: 'monospace',
            imageRendering: 'pixelated',
            boxShadow: '0 0 10px #FF6600'
          }}
        >
          MAX:{habit.longest_streak}
        </div>
      )}
    </motion.div>
  );
}