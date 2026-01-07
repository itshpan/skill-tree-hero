import React from 'react';
import { motion } from 'framer-motion';

const avatarStyles = {
  warrior: {
    primary: '#FF0000',
    secondary: '#FFAA00',
    skin: '#FFCC99'
  },
  mage: {
    primary: '#0000FF',
    secondary: '#00FFFF',
    skin: '#FFCC99'
  },
  rogue: {
    primary: '#00FF00',
    secondary: '#FFFF00',
    skin: '#FFCC99'
  },
  sage: {
    primary: '#FF00FF',
    secondary: '#FFFFFF',
    skin: '#FFCC99'
  }
};

// Pixel grid for 8-bit style sprites (16x16 grid)
const sprites = {
  warrior: [
    '0000000000000000',
    '0000022222220000',
    '0000222222220000',
    '0000233333320000',
    '0003333333330000',
    '0003313313330000',
    '0003333333330000',
    '0003311113330000',
    '0000333333300000',
    '0011133331100000',
    '0001133331100000',
    '0001113311100000',
    '0001113311100000',
    '0001100001100000',
    '0011100001110000',
    '0011000000110000'
  ],
  mage: [
    '0000222222220000',
    '0002222222220000',
    '0022222222220000',
    '0002233333220000',
    '0003333333330000',
    '0003313313330000',
    '0003333333330000',
    '0003311113330000',
    '0000333333300000',
    '0002213322110000',
    '0022211122210000',
    '0002211122110000',
    '0001111111100000',
    '0001100001100000',
    '0011100001110000',
    '0011000000110000'
  ],
  rogue: [
    '0000000220000000',
    '0000002222000000',
    '0000222222220000',
    '0002233333220000',
    '0003333333330000',
    '0003313313330000',
    '0003333333330000',
    '0003311113330000',
    '0000333333300000',
    '0022213322110000',
    '0002211122110000',
    '0000211112200000',
    '0001111111100000',
    '0001100001100000',
    '0011100001110000',
    '0011000000110000'
  ],
  sage: [
    '0000222222220000',
    '0002222222222000',
    '0222222222222200',
    '0002233333220000',
    '0003333333330000',
    '0003313313330000',
    '0003333333330000',
    '0003311113330000',
    '0000333333300000',
    '0002213322110000',
    '0002211122110000',
    '0001211112100000',
    '0001111111100000',
    '0001100001100000',
    '0011100001110000',
    '0011000000110000'
  ]
};

export default function HeroAvatar({ style = 'warrior', level = 1, size = 160 }) {
  const colors = avatarStyles[style] || avatarStyles.warrior;
  const sprite = sprites[style] || sprites.warrior;
  const pixelSize = size / 16;
  
  const colorMap = {
    '0': 'transparent',
    '1': colors.primary,
    '2': colors.secondary,
    '3': colors.skin
  };
  
  return (
    <motion.div 
      className="relative mx-auto"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 10 }}
      style={{ width: size, height: size }}
    >
      {/* Pixelated glow */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle, ${colors.primary}40, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'scale(1.3)'
        }}
      />
      
      {/* Pixel grid */}
      <div 
        className="relative z-10 grid"
        style={{ 
          gridTemplateColumns: `repeat(16, ${pixelSize}px)`,
          imageRendering: 'pixelated',
          transform: 'scale(1)',
        }}
      >
        {sprite.map((row, y) => 
          row.split('').map((pixel, x) => (
            <motion.div
              key={`${x}-${y}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (y * 16 + x) * 0.002 }}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: colorMap[pixel],
                boxShadow: pixel !== '0' ? `0 0 ${pixelSize/2}px ${colorMap[pixel]}40` : 'none'
              }}
            />
          ))
        )}
      </div>
      
      {/* Level badge - pixel style */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="absolute -top-2 -right-2 px-3 py-1 font-bold text-black"
        style={{
          backgroundColor: '#FFFF00',
          boxShadow: '4px 4px 0 #FF0000, 4px 4px 0 1px #000',
          border: '2px solid #000',
          fontFamily: 'monospace',
          fontSize: size / 10,
          imageRendering: 'pixelated'
        }}
      >
        LV{level}
      </motion.div>
      
      {/* Pixel sparkle */}
      <motion.div 
        className="absolute -top-4 -left-4 text-yellow-400 font-bold"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ fontSize: size / 8, imageRendering: 'pixelated' }}
      >
        ★
      </motion.div>
    </motion.div>
  );
}