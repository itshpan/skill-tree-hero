import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LevelUpModal({ isOpen, onClose, newLevel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={onClose}
        >
          {/* Particle effects */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%',
                scale: 0
              }}
              animate={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{
                boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700'
              }}
            />
          ))}
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative text-center"
          >
            {/* Glowing ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                transform: 'scale(3)'
              }}
              animate={{ 
                scale: [3, 3.5, 3],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            
            {/* Main content */}
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="mb-4"
              >
                <Star 
                  className="w-24 h-24 mx-auto text-yellow-400" 
                  fill="currentColor"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.8))' }}
                />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: '0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4)'
                }}
              >
                LEVEL UP!
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-7xl md:text-9xl font-bold"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  background: 'linear-gradient(135deg, #FFD700, #FF6B9D, #A55EEA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.5))'
                }}
              >
                {newLevel}
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-cyan-400 text-lg mt-4 tracking-widest"
              >
                YOUR POWER GROWS STRONGER
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-8 py-3 text-lg"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  CONTINUE
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}