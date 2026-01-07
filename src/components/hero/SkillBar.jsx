import React from 'react';
import { motion } from 'framer-motion';

const skillColors = {
  strength: { primary: '#FF0000', secondary: '#FF0000', icon: '█' },
  intelligence: { primary: '#0000FF', secondary: '#0000FF', icon: '▲' },
  discipline: { primary: '#FFFF00', secondary: '#FFFF00', icon: '♦' },
  creativity: { primary: '#FF00FF', secondary: '#FF00FF', icon: '★' },
  vitality: { primary: '#00FF00', secondary: '#00FF00', icon: '♥' },
  charisma: { primary: '#00FFFF', secondary: '#00FFFF', icon: '◆' }
};

export default function SkillBar({ skill, value, maxValue = 100 }) {
  const colors = skillColors[skill] || skillColors.strength;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const skillLevel = Math.floor(value / 10) + 1;
  
  return (
    <div className="relative">
      {/* Skill label */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span 
            className="text-2xl"
            style={{ 
              color: colors.primary,
              textShadow: `2px 2px 0 ${colors.primary}40`,
              imageRendering: 'pixelated'
            }}
          >
            {colors.icon}
          </span>
          <span 
            className="font-black uppercase tracking-wider text-sm"
            style={{ 
              fontFamily: 'monospace',
              color: '#FFFFFF',
              textShadow: `2px 2px 0 ${colors.primary}`,
              imageRendering: 'pixelated'
            }}
          >
            {skill}
          </span>
        </div>
        <div 
          className="px-2 py-1 font-black bg-black"
          style={{ 
            fontFamily: 'monospace',
            color: colors.primary,
            textShadow: `2px 2px 0 #000`,
            border: `3px solid ${colors.primary}`,
            boxShadow: `0 0 10px ${colors.primary}`,
            imageRendering: 'pixelated'
          }}
        >
          LV{String(skillLevel).padStart(2, '0')}
        </div>
      </div>
      
      {/* Progress bar container - pixel art style */}
      <div className="relative h-8 bg-black border-4 border-white overflow-hidden">
        {/* Inner border */}
        <div className="absolute inset-1 border-2 border-gray-700" />
        
        {/* Progress fill - blocky pixel style */}
        <motion.div
          className="h-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            background: `repeating-linear-gradient(90deg, ${colors.primary} 0px, ${colors.primary} 8px, ${colors.secondary} 8px, ${colors.secondary} 16px)`,
            boxShadow: `inset 0 0 20px ${colors.primary}80`,
            imageRendering: 'pixelated'
          }}
        />
        
        {/* Pixel segments */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r-4 border-black/50"
              style={{ imageRendering: 'pixelated' }}
            />
          ))}
        </div>
        
        {/* XP text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-xs font-black px-2 bg-black/80"
            style={{ 
              fontFamily: 'monospace',
              color: '#FFFFFF',
              textShadow: '2px 2px 0 #000',
              imageRendering: 'pixelated'
            }}
          >
            {value}/{maxValue}
          </span>
        </div>
      </div>
    </div>
  );
}