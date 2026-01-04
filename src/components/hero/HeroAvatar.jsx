import React from 'react';
import { motion } from 'framer-motion';

const avatarStyles = {
  warrior: {
    hair: '#FF6B9D',
    outfit: '#FF4757',
    accent: '#FFE66D'
  },
  mage: {
    hair: '#A55EEA',
    outfit: '#5352ED',
    accent: '#70A1FF'
  },
  rogue: {
    hair: '#2ED573',
    outfit: '#1E3799',
    accent: '#F8B739'
  },
  sage: {
    hair: '#FFF',
    outfit: '#747D8C',
    accent: '#00D2D3'
  }
};

export default function HeroAvatar({ style = 'warrior', level = 1, size = 200 }) {
  const colors = avatarStyles[style] || avatarStyles.warrior;
  const scale = size / 200;
  
  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width: size, height: size }}
    >
      {/* Retro glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60"
        style={{ 
          background: `linear-gradient(135deg, ${colors.hair}, ${colors.accent})`,
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Main avatar container */}
      <svg viewBox="0 0 200 200" className="relative z-10" style={{ width: size, height: size }}>
        {/* Background circle with scan lines effect */}
        <defs>
          <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
            <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          </pattern>
          <linearGradient id={`hairGrad-${style}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.hair} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Body/outfit */}
        <ellipse cx="100" cy="180" rx="50" ry="30" fill={colors.outfit} filter="url(#glow)" />
        
        {/* Neck */}
        <rect x="90" y="130" width="20" height="25" fill="#FFD9B3" />
        
        {/* Face */}
        <ellipse cx="100" cy="100" rx="45" ry="50" fill="#FFD9B3" />
        
        {/* Hair - 80s anime style spiky */}
        <path 
          d={`M55 100 
              Q 40 60, 70 40 
              Q 80 20, 100 25 
              Q 120 20, 130 40 
              Q 160 60, 145 100
              Q 140 80, 130 85
              Q 125 70, 115 80
              Q 105 65, 100 80
              Q 95 65, 85 80
              Q 75 70, 70 85
              Q 60 80, 55 100`}
          fill={`url(#hairGrad-${style})`}
          filter="url(#glow)"
        />
        
        {/* Eyes - big anime style */}
        <ellipse cx="80" cy="95" rx="12" ry="14" fill="#FFF" />
        <ellipse cx="120" cy="95" rx="12" ry="14" fill="#FFF" />
        <ellipse cx="82" cy="97" rx="8" ry="10" fill={colors.outfit} />
        <ellipse cx="122" cy="97" rx="8" ry="10" fill={colors.outfit} />
        <ellipse cx="84" cy="95" rx="3" ry="4" fill="#FFF" />
        <ellipse cx="124" cy="95" rx="3" ry="4" fill="#FFF" />
        
        {/* Eyebrows */}
        <path d="M68 78 Q 80 72, 92 78" stroke="#333" strokeWidth="3" fill="none" />
        <path d="M108 78 Q 120 72, 132 78" stroke="#333" strokeWidth="3" fill="none" />
        
        {/* Mouth */}
        <path d="M90 120 Q 100 128, 110 120" stroke="#333" strokeWidth="2" fill="none" />
        
        {/* Level badge */}
        <circle cx="160" cy="40" r="20" fill={colors.accent} filter="url(#glow)" />
        <text x="160" y="46" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="16">
          {level}
        </text>
        
        {/* Scan lines overlay */}
        <rect x="0" y="0" width="200" height="200" fill="url(#scanlines)" opacity="0.3" />
      </svg>
      
      {/* Animated sparkles */}
      <motion.div 
        className="absolute top-4 right-4 text-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✧
      </motion.div>
    </motion.div>
  );
}