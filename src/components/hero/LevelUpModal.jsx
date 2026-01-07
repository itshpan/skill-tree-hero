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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative text-center bg-black border-8 border-white p-2"
            style={{ imageRendering: 'pixelated' }}
          >
            <div className="border-8 border-yellow-400 bg-black p-8 md:p-12">
              {/* Pixel stars */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-400"
                  style={{
                    top: `${20 + i * 10}%`,
                    left: i % 2 === 0 ? '10%' : '90%',
                    imageRendering: 'pixelated'
                  }}
                  animate={{ 
                    opacity: [1, 0, 1],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                />
              ))}
              
              {/* Main content */}
              <div className="relative z-10">
                <motion.div
                  className="mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div 
                    className="text-8xl mx-auto"
                    style={{ 
                      color: '#FFFF00',
                      textShadow: '4px 4px 0 #FF0000',
                      imageRendering: 'pixelated'
                    }}
                  >
                    ★
                  </div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-black mb-4"
                  style={{ 
                    fontFamily: 'monospace',
                    color: '#FFFF00',
                    textShadow: '6px 6px 0 #FF0000, 6px 6px 0 2px #000',
                    imageRendering: 'pixelated'
                  }}
                >
                  LEVEL UP!
                </motion.h2>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="my-8 py-4 bg-red-600 border-4 border-white"
                  style={{ boxShadow: '0 0 30px #FF0000' }}
                >
                  <div 
                    className="text-8xl md:text-9xl font-black"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#FFFFFF',
                      textShadow: '8px 8px 0 #000',
                      imageRendering: 'pixelated'
                    }}
                  >
                    {String(newLevel).padStart(2, '0')}
                  </div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-cyan-400 text-xl font-black tracking-widest mb-8"
                  style={{ 
                    fontFamily: 'monospace',
                    textShadow: '2px 2px 0 #000'
                  }}
                >
                  &gt;&gt; POWER UP! &lt;&lt;
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-green-500 border-4 border-white font-black text-xl text-black"
                    style={{ 
                      fontFamily: 'monospace',
                      boxShadow: '8px 8px 0 #000, 0 0 30px #00FF00',
                      imageRendering: 'pixelated'
                    }}
                  >
                    ▶ CONTINUE
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}