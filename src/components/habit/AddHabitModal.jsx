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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border-2 border-cyan-500/50 bg-slate-900 p-6 shadow-2xl"
            style={{ 
              boxShadow: '0 0 40px rgba(0,255,255,0.2), inset 0 0 60px rgba(0,0,0,0.5)',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.02) 2px, rgba(0,255,255,0.02) 4px)'
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Header */}
            <div className="mb-6">
              <h2 
                className="text-2xl font-bold text-cyan-400"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: '0 0 20px rgba(0,255,255,0.5)'
                }}
              >
                NEW HABIT
              </h2>
              <p className="text-slate-400 text-sm mt-1">Begin your training, hero.</p>
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
              
              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Plus className="w-5 h-5 mr-2" />
                CREATE HABIT
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}