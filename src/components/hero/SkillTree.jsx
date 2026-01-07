import React from 'react';
import { motion } from 'framer-motion';
import SkillBar from './SkillBar';

const skills = ['strength', 'intelligence', 'discipline', 'creativity', 'vitality', 'charisma'];

export default function SkillTree({ heroStats }) {
  const totalLevel = skills.reduce((sum, skill) => {
    const level = Math.floor((heroStats?.[skill] || 0) / 10) + 1;
    return sum + level;
  }, 0);
  
  return (
    <div className="relative bg-black border-4 border-white p-1" style={{ imageRendering: 'pixelated' }}>
      <div className="border-4 border-purple-600 bg-black p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 
              className="text-xl font-black tracking-wider"
              style={{ 
                fontFamily: 'monospace',
                color: '#FF00FF',
                textShadow: '3px 3px 0 #000',
                imageRendering: 'pixelated'
              }}
            >
              SKILL TREE
            </h2>
            <p className="text-gray-400 text-xs font-bold" style={{ fontFamily: 'monospace' }}>
              TRAIN DAILY
            </p>
          </div>
          
          {/* Total power level - arcade score style */}
          <div className="text-right">
            <div className="text-xs text-cyan-400 font-bold mb-1" style={{ fontFamily: 'monospace' }}>PWR</div>
            <div 
              className="px-3 py-2 bg-black border-4 border-yellow-400"
              style={{ boxShadow: '0 0 15px #FFFF00' }}
            >
              <motion.div
                key={totalLevel}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#FFFF00',
                  textShadow: '3px 3px 0 #FF0000',
                  imageRendering: 'pixelated'
                }}
              >
                {String(totalLevel).padStart(3, '0')}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Skills grid */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillBar 
                skill={skill} 
                value={(heroStats?.[skill] || 0) % 100} 
                maxValue={100}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Decorative corner pixels */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute top-2 right-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-white" style={{ imageRendering: 'pixelated' }} />
      </div>
    </div>
  );
}