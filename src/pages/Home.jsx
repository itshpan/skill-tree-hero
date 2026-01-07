import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Swords, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

import RetroHeader from '@/components/ui/RetroHeader';
import HeroAvatar from '@/components/hero/HeroAvatar';
import SkillTree from '@/components/hero/SkillTree';
import HabitCard from '@/components/habit/HabitCard';
import AddHabitModal from '@/components/habit/AddHabitModal';
import LevelUpModal from '@/components/hero/LevelUpModal';

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const queryClient = useQueryClient();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Fetch habits
  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: () => base44.entities.Habit.list()
  });
  
  // Fetch hero stats
  const { data: heroStatsArr = [] } = useQuery({
    queryKey: ['heroStats'],
    queryFn: () => base44.entities.HeroStats.list()
  });
  
  // Fetch today's completions
  const { data: completions = [] } = useQuery({
    queryKey: ['completions', today],
    queryFn: () => base44.entities.CompletionLog.filter({ completion_date: today })
  });
  
  const heroStats = heroStatsArr[0];
  const completedHabitIds = completions.map(c => c.habit_id);
  
  // Initialize hero stats if not exists
  useEffect(() => {
    const initHero = async () => {
      if (heroStatsArr.length === 0) {
        await base44.entities.HeroStats.create({
          hero_name: 'Hero',
          total_xp: 0,
          level: 1,
          strength: 0,
          intelligence: 0,
          discipline: 0,
          creativity: 0,
          vitality: 0,
          charisma: 0,
          avatar_style: 'warrior'
        });
        queryClient.invalidateQueries({ queryKey: ['heroStats'] });
      }
    };
    initHero();
  }, [heroStatsArr.length, queryClient]);
  
  // Create habit mutation
  const createHabit = useMutation({
    mutationFn: (data) => base44.entities.Habit.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
  });
  
  // Delete habit mutation
  const deleteHabit = useMutation({
    mutationFn: (id) => base44.entities.Habit.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
  });
  
  // Complete habit handler
  const handleComplete = async (habit) => {
    const streakBonus = Math.min(Math.floor(habit.current_streak / 7) + 1, 5);
    const xpEarned = habit.xp_reward * streakBonus;
    
    // Check if completing yesterday or today continues streak
    const lastCompleted = habit.last_completed;
    const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
    const isStreakContinued = lastCompleted === yesterday || lastCompleted === today;
    const newStreak = isStreakContinued ? habit.current_streak + 1 : 1;
    
    // Update habit
    await base44.entities.Habit.update(habit.id, {
      current_streak: newStreak,
      longest_streak: Math.max(habit.longest_streak, newStreak),
      total_completions: habit.total_completions + 1,
      last_completed: today
    });
    
    // Log completion
    await base44.entities.CompletionLog.create({
      habit_id: habit.id,
      completion_date: today,
      xp_earned: xpEarned,
      streak_bonus: streakBonus
    });
    
    // Update hero stats
    if (heroStats) {
      const newTotalXP = (heroStats.total_xp || 0) + xpEarned;
      const newLevel = Math.floor(newTotalXP / 100) + 1;
      const skillXP = (heroStats[habit.skill_category] || 0) + xpEarned;
      
      await base44.entities.HeroStats.update(heroStats.id, {
        total_xp: newTotalXP,
        level: newLevel,
        [habit.skill_category]: skillXP
      });
      
      // Check for level up
      if (newLevel > (heroStats.level || 1)) {
        setNewLevel(newLevel);
        setShowLevelUp(true);
      }
    }
    
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    queryClient.invalidateQueries({ queryKey: ['heroStats'] });
    queryClient.invalidateQueries({ queryKey: ['completions'] });
  };
  
  const activeHabits = habits.filter(h => h.is_active);
  const completedToday = completedHabitIds.length;
  const totalHabits = activeHabits.length;
  
  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,0,255,0.05) 4px, rgba(255,0,255,0.05) 8px),
          repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,255,255,0.05) 4px, rgba(0,255,255,0.05) 8px)
        `,
        backgroundSize: '80px 80px',
        imageRendering: 'pixelated'
      }}
    >
      {/* CRT overlay effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          imageRendering: 'pixelated'
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <RetroHeader heroStats={heroStats} />
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Hero & Skills */}
          <div className="space-y-6">
            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-black border-4 border-white p-1 text-center"
              style={{ imageRendering: 'pixelated' }}
            >
              <div className="border-4 border-pink-500 bg-black p-6">
              <div 
                className="text-xs font-black uppercase tracking-wider mb-2"
                style={{ fontFamily: 'monospace', color: '#FF00FF', textShadow: '2px 2px 0 #000' }}
              >
                PLAYER 1
              </div>
              <HeroAvatar 
                style={heroStats?.avatar_style || 'warrior'} 
                level={heroStats?.level || 1}
                size={160}
              />
              <h3 
                className="text-xl font-black mt-4"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#FFFF00',
                  textShadow: '3px 3px 0 #FF0000',
                  imageRendering: 'pixelated'
                }}
              >
                {(heroStats?.hero_name || 'Hero').toUpperCase()}
              </h3>
              
              {/* Daily progress - arcade style */}
              <div className="mt-4 p-3 bg-black border-4 border-cyan-400">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-black" style={{ fontFamily: 'monospace', color: '#00FFFF' }}>DAILY</span>
                  <span className="font-black" style={{ fontFamily: 'monospace', color: '#FFFFFF' }}>
                    {completedToday}/{totalHabits}
                  </span>
                </div>
                <div className="h-4 bg-gray-800 border-2 border-white overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #00FFFF 0px, #00FFFF 4px, #FF00FF 4px, #FF00FF 8px)',
                      imageRendering: 'pixelated'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: totalHabits > 0 ? `${(completedToday / totalHabits) * 100}%` : '0%' }}
                  />
                </div>
              </div>
              </div>
            </motion.div>
            
            {/* Skill tree */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SkillTree heroStats={heroStats} />
            </motion.div>
          </div>
          
          {/* Right column - Habits */}
          <div className="lg:col-span-2 space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Swords className="w-6 h-6 text-cyan-400" />
                <h2 
                  className="text-xl font-bold text-cyan-400 tracking-wider"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  DAILY QUESTS
                </h2>
              </div>
              
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Plus className="w-5 h-5 mr-2" />
                NEW HABIT
              </Button>
            </div>
            
            {/* Date display */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            
            {/* Habits list */}
            {activeHabits.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50"
              >
                <Trophy className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-400 mb-2">No Habits Yet</h3>
                <p className="text-slate-500 mb-6">Start your hero's journey by creating your first habit!</p>
                <Button
                  onClick={() => setShowAddModal(true)}
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Habit
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence>
                  {activeHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onComplete={handleComplete}
                      onDelete={(id) => deleteHabit.mutate(id)}
                      isCompletedToday={completedHabitIds.includes(habit.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {/* Stats footer - arcade scoreboard */}
            {activeHabits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black border-4 border-white p-1"
                style={{ imageRendering: 'pixelated' }}
              >
                <div className="border-4 border-yellow-400 bg-black p-4 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div 
                      className="text-3xl font-black"
                      style={{ 
                        fontFamily: 'monospace',
                        color: '#FF6600',
                        textShadow: '2px 2px 0 #000'
                      }}
                    >
                      {String(habits.reduce((max, h) => Math.max(max, h.current_streak || 0), 0)).padStart(2, '0')}
                    </div>
                    <div className="text-xs font-bold mt-1" style={{ fontFamily: 'monospace', color: '#CCCCCC' }}>STREAK</div>
                  </div>
                  <div className="w-1 h-12 bg-white" />
                  <div className="text-center">
                    <div 
                      className="text-3xl font-black"
                      style={{ 
                        fontFamily: 'monospace',
                        color: '#00FF00',
                        textShadow: '2px 2px 0 #000'
                      }}
                    >
                      {String(habits.reduce((sum, h) => sum + (h.total_completions || 0), 0)).padStart(3, '0')}
                    </div>
                    <div className="text-xs font-bold mt-1" style={{ fontFamily: 'monospace', color: '#CCCCCC' }}>TOTAL</div>
                  </div>
                  <div className="w-1 h-12 bg-white" />
                  <div className="text-center">
                    <div 
                      className="text-3xl font-black"
                      style={{ 
                        fontFamily: 'monospace',
                        color: '#00FFFF',
                        textShadow: '2px 2px 0 #000'
                      }}
                    >
                      {String(activeHabits.length).padStart(2, '0')}
                    </div>
                    <div className="text-xs font-bold mt-1" style={{ fontFamily: 'monospace', color: '#CCCCCC' }}>QUESTS</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(data) => createHabit.mutate(data)}
      />
      
      <LevelUpModal
        isOpen={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={newLevel}
      />
    </div>
  );
}