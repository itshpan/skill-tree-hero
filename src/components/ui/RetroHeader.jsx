import React from 'react';
import { motion } from 'framer-motion';

export default function RetroHeader({ heroStats }) {
  const xpToNextLevel = 100 - (heroStats?.total_xp || 0) % 100;
  const currentLevelProgress = ((heroStats?.total_xp || 0) % 100);
  
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-4 md:p-6">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Scan line animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,255,255,0.02) 50%)',
          backgroundSize: '100% 4px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '0px 4px'] }}
        transition={{ repeat: Infinity, duration: 0.1, ease: 'linear' }}
      />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo/Title */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold tracking-wider"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #00FFFF, #FF6B9D, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))'
            }}
          >
            HABIT QUEST
          </motion.h1>
          <p className="text-cyan-400/60 text-xs md:text-sm tracking-widest mt-1">
            BECOME THE HERO OF YOUR LIFE
          </p>
        </div>
        
        {/* Level & XP display */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Level */}
          <div className="text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wider">Level</div>
            <motion.div
              key={heroStats?.level}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-3xl md:text-4xl font-bold text-cyan-400"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 30px rgba(0,255,255,0.8)'
              }}
            >
              {heroStats?.level || 1}
            </motion.div>
          </div>
          
          {/* XP Bar */}
          <div className="w-40 md:w-56">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>XP</span>
              <span>{currentLevelProgress}/100</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 border border-cyan-500/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00FFFF, #FF6B9D)',
                  boxShadow: '0 0 15px rgba(0,255,255,0.5)'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${currentLevelProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 text-right">
              {xpToNextLevel} XP to next level
            </div>
          </div>
          
          {/* Total XP */}
          <div className="text-center hidden md:block">
            <div className="text-xs text-slate-500 uppercase tracking-wider">Total XP</div>
            <div 
              className="text-xl font-bold text-yellow-400"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {heroStats?.total_xp || 0}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />
    </div>
  );
}