import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryColors = {
  strength: { bg: 'from-red-500/20 to-red-900/20', border: 'border-red-500/50', text: 'text-red-400', glow: 'shadow-red-500/30' },
  intelligence: { bg: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/50', text: 'text-blue-400', glow: 'shadow-blue-500/30' },
  discipline: { bg: 'from-amber-500/20 to-amber-900/20', border: 'border-amber-500/50', text: 'text-amber-400', glow: 'shadow-amber-500/30' },
  creativity: { bg: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/50', text: 'text-purple-400', glow: 'shadow-purple-500/30' },
  vitality: { bg: 'from-green-500/20 to-green-900/20', border: 'border-green-500/50', text: 'text-green-400', glow: 'shadow-green-500/30' },
  charisma: { bg: 'from-pink-500/20 to-pink-900/20', border: 'border-pink-500/50', text: 'text-pink-400', glow: 'shadow-pink-500/30' }
};

const categoryIcons = {
  strength: '💪',
  intelligence: '🧠',
  discipline: '⚔️',
  creativity: '✨',
  vitality: '💚',
  charisma: '💫'
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
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-lg border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-4 shadow-lg ${colors.glow}`}
    >
      {/* Scan lines overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}
      />
      
      {/* XP popup */}
      <AnimatePresence>
        {showXP && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: -60 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px rgba(255,200,0,0.8)' }}>
              +{totalXP} XP!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* Habit info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{categoryIcons[habit.skill_category]}</span>
            <h3 className="font-bold text-white truncate" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {habit.name}
            </h3>
          </div>
          
          {habit.description && (
            <p className="text-sm text-slate-400 mb-2 line-clamp-2">{habit.description}</p>
          )}
          
          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm">
            {/* Streak */}
            <div className="flex items-center gap-1">
              <Flame className={`w-4 h-4 ${habit.current_streak > 0 ? 'text-orange-400' : 'text-slate-500'}`} />
              <span className={habit.current_streak > 0 ? 'text-orange-400 font-bold' : 'text-slate-500'}>
                {habit.current_streak} day{habit.current_streak !== 1 ? 's' : ''}
              </span>
            </div>
            
            {/* XP reward */}
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">
                {totalXP} XP
                {streakBonus > 1 && (
                  <span className="text-xs ml-1 text-green-400">(x{streakBonus})</span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComplete}
            disabled={isCompletedToday}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
              isCompletedToday 
                ? 'bg-green-500/30 border-2 border-green-500 text-green-400' 
                : 'bg-slate-800 border-2 border-slate-600 text-slate-400 hover:border-green-500 hover:text-green-400'
            }`}
          >
            <Check className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(habit.id)}
            className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-800/50 border-2 border-slate-700 text-slate-500 hover:border-red-500 hover:text-red-400 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Best streak badge */}
      {habit.longest_streak > 0 && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-400">
          Best: {habit.longest_streak}🔥
        </div>
      )}
    </motion.div>
  );
}