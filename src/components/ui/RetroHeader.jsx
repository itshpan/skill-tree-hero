import React from 'react';
import { motion } from 'framer-motion';

export default function RetroHeader({ heroStats }) {
  const xpToNextLevel = 100 - (heroStats?.total_xp || 0) % 100;
  const currentLevelProgress = ((heroStats?.total_xp || 0) % 100);
  
  return (
    <div className="relative overflow-hidden bg-black p-1" style={{ imageRendering: 'pixelated' }}>
      {/* Outer border - arcade style */}
      <div className="border-4 border-white">
        <div className="border-4 border-purple-600 bg-black p-4 md:p-6">
          {/* Pixel grid background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(#FF00FF 2px, transparent 2px),
                linear-gradient(90deg, #FF00FF 2px, transparent 2px)
              `,
              backgroundSize: '16px 16px',
              imageRendering: 'pixelated'
            }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo/Title */}
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="text-3xl md:text-5xl font-black tracking-widest"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#00FF00',
                  textShadow: '4px 4px 0 #FF00FF, 8px 8px 0 #FFFF00',
                  imageRendering: 'pixelated'
                }}
              >
                HABIT QUEST
              </motion.h1>
              <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
                <span className="text-yellow-400 text-xl">★</span>
                <p className="text-cyan-400 text-xs md:text-sm tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>
                  INSERT COIN TO CONTINUE
                </p>
                <span className="text-yellow-400 text-xl">★</span>
              </div>
            </div>
            
            {/* Level & XP display */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Level - arcade score style */}
              <div className="text-center">
                <div className="text-xs text-red-500 font-bold mb-1" style={{ fontFamily: 'monospace' }}>1UP</div>
                <div 
                  className="px-4 py-2 bg-black border-4 border-red-500"
                  style={{ boxShadow: '0 0 20px #FF0000' }}
                >
                  <motion.div
                    key={heroStats?.level}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-black text-white"
                    style={{ 
                      fontFamily: 'monospace',
                      textShadow: '2px 2px 0 #FF0000',
                      imageRendering: 'pixelated'
                    }}
                  >
                    {String(heroStats?.level || 1).padStart(2, '0')}
                  </motion.div>
                </div>
              </div>
              
              {/* XP Bar - arcade style */}
              <div className="w-40 md:w-56">
                <div className="flex justify-between text-xs font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                  <span className="text-yellow-400">EXP</span>
                  <span className="text-white">{currentLevelProgress}/100</span>
                </div>
                <div className="h-6 bg-black border-4 border-yellow-400 overflow-hidden relative">
                  <motion.div
                    className="h-full"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #00FF00 0px, #00FF00 8px, #FFFF00 8px, #FFFF00 16px)',
                      boxShadow: 'inset 0 0 20px #00FF00',
                      imageRendering: 'pixelated'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentLevelProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Pixel segments */}
                  <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex-1 border-r-2 border-black/50" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Score display */}
              <div className="text-center hidden md:block">
                <div className="text-xs text-cyan-400 font-bold mb-1" style={{ fontFamily: 'monospace' }}>SCORE</div>
                <div 
                  className="px-3 py-2 bg-black border-4 border-cyan-400"
                  style={{ boxShadow: '0 0 20px #00FFFF' }}
                >
                  <div 
                    className="text-xl font-black text-white"
                    style={{ 
                      fontFamily: 'monospace',
                      textShadow: '2px 2px 0 #00FFFF'
                    }}
                  >
                    {String(heroStats?.total_xp || 0).padStart(6, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Corner pixels */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute top-2 right-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
        </div>
      </div>
    </div>
  );
}