import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const categories = [
  { value: 'strength', label: 'Strength', icon: '💪', desc: 'Physical fitness & power' },
  { value: 'intelligence', label: 'Intelligence', icon: '🧠', desc: 'Learning & mental growth' },
  { value: 'discipline', label: 'Discipline', icon: '⚔️', desc: 'Consistency & willpower' },
  { value: 'creativity', label: 'Creativity', icon: '✨', desc: 'Art & innovation' },
  { value: 'vitality', label: 'Vitality', icon: '💚', desc: 'Health & wellness' },
  { value: 'charisma', label: 'Charisma', icon: '💫', desc: 'Social & communication' }
];

export default function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skill_category: '',
    xp_reward: 10
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.skill_category) {
      onAdd({
        ...formData,
        current_streak: 0,
        longest_streak: 0,
        total_completions: 0,
        is_active: true
      });
      setFormData({ name: '', description: '', skill_category: '', xp_reward: 10 });
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-black border-8 border-white p-2"
          style={{ imageRendering: 'pixelated' }}
          >
          <div className="border-8 border-cyan-400 bg-black p-6" style={{ boxShadow: '0 0 40px #00FFFF' }}>
            {/* Close button - arcade style */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 border-4 border-white text-white font-black text-2xl flex items-center justify-center"
              style={{ imageRendering: 'pixelated', boxShadow: '0 0 20px #FF0000' }}
            >
              ✕
            </button>
            
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 
                className="text-3xl font-black"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#00FFFF',
                  textShadow: '4px 4px 0 #FF00FF',
                  imageRendering: 'pixelated'
                }}
              >
                NEW QUEST
              </h2>
              <p className="text-yellow-400 text-sm mt-2 font-bold" style={{ fontFamily: 'monospace' }}>
                &gt; PRESS START &lt;
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-slate-300">Habit Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Morning Workout"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  required
                />
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label className="text-slate-300">Description (optional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What does this habit involve?"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 resize-none"
                  rows={2}
                />
              </div>
              
              {/* Skill Category */}
              <div className="space-y-2">
                <Label className="text-slate-300">Skill Tree</Label>
                <Select
                  value={formData.skill_category}
                  onValueChange={(value) => setFormData({ ...formData, skill_category: value })}
                  required
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-cyan-500">
                    <SelectValue placeholder="Choose a skill to level up" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {categories.map((cat) => (
                      <SelectItem 
                        key={cat.value} 
                        value={cat.value}
                        className="text-white focus:bg-slate-700 focus:text-cyan-400"
                      >
                        <div className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                          <span className="text-xs text-slate-400">- {cat.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* XP Reward */}
              <div className="space-y-2">
                <Label className="text-slate-300">Base XP Reward</Label>
                <Select
                  value={formData.xp_reward.toString()}
                  onValueChange={(value) => setFormData({ ...formData, xp_reward: parseInt(value) })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="5" className="text-white focus:bg-slate-700">5 XP - Quick task</SelectItem>
                    <SelectItem value="10" className="text-white focus:bg-slate-700">10 XP - Normal</SelectItem>
                    <SelectItem value="20" className="text-white focus:bg-slate-700">20 XP - Challenging</SelectItem>
                    <SelectItem value="30" className="text-white focus:bg-slate-700">30 XP - Intense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Submit - arcade button */}
              <button
                type="submit"
                className="w-full bg-green-500 border-4 border-white hover:bg-green-400 text-black font-black py-4 text-xl mt-4"
                style={{ 
                  fontFamily: 'monospace',
                  imageRendering: 'pixelated',
                  boxShadow: '0 6px 0 #006600, 0 0 30px #00FF00'
                }}
              >
                ▶ START QUEST
              </button>
            </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}