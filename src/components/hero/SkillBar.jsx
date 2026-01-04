import React from 'react';
import { motion } from 'framer-motion';

const skillColors = {
  strength: { primary: '#FF4757', secondary: '#FF6B81', icon: '💪' },
  intelligence: { primary: '#5352ED', secondary: '#70A1FF', icon: '🧠' },
  discipline: { primary: '#FFA502', secondary: '#FFBE76', icon: '⚔️' },
  creativity: { primary: '#A55EEA', secondary: '#D980FA', icon: '✨' },
  vitality: { primary: '#2ED573', secondary: '#7BED9F', icon: '💚' },
  charisma: { primary: '#FF6B9D', secondary: '#FFB8D0', icon: '💫' }
};

export default function SkillBar({ skill, value, maxValue = 100 }) {
  const colors = skillColors[skill] || skillColors.strength;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const skillLevel = Math.floor(value / 10) + 1;
  
  return (
    <div className="relative group">
      {/* Skill label */}
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{colors.icon}</span>
          <span 
            className="font-bold uppercase tracking-wider text-sm"
            style={{ 
              color: colors.primary,
              textShadow: `0 0 10px ${colors.primary}40`
            }}
          >
            {skill}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">LV</span>
          <span 
            className="font-bold text-lg"
            style={{ 
              color: colors.primary,
              textShadow: `0 0 10px ${colors.primary}`
            }}
          >
            {skillLevel}
          </span>
        </div>
      </div>
      
      {/* Progress bar container */}
      <div className="relative h-6 rounded-sm overflow-hidden bg-slate-900 border-2 border-slate-700">
        {/* Scan lines overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
          }}
        />
        
        {/* Progress fill */}
        <motion.div
          className="h-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            boxShadow: `0 0 20px ${colors.primary}80, inset 0 1px 0 rgba(255,255,255,0.3)`
          }}
        >
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              width: '50%'
            }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </motion.div>
        
        {/* Segment markers */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r border-slate-700/50 last:border-r-0"
            />
          ))}
        </div>
        
        {/* XP text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-xs font-bold text-white drop-shadow-lg"
            style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}
          >
            {value} / {maxValue} XP
          </span>
        </div>
      </div>
    </div>
  );
}