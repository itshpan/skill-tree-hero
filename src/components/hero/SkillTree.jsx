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
    <div className="relative p-6 rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 
            className="text-xl font-bold text-purple-400 tracking-wider"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 15px rgba(168,85,247,0.5)'
            }}
          >
            SKILL TREE
          </h2>
          <p className="text-slate-500 text-sm">Level up through daily habits</p>
        </div>
        
        {/* Total power level */}
        <div className="text-right">
          <div className="text-xs text-slate-500 uppercase tracking-wider">Power Level</div>
          <motion.div
            key={totalLevel}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #FFD700, #FF6B9D, #A55EEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.5))'
            }}
          >
            {totalLevel}
          </motion.div>
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
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 rounded-br-xl" />
    </div>
  );
}