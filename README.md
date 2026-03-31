# Skill Tree Hero

A gamified habit tracker that turns your daily habits into RPG quests. Complete habits, earn XP, level up your hero, and grow your skill tree — all wrapped in a retro arcade aesthetic.

## Features

### Hero System
- Create and customize your hero with 4 avatar styles (Warrior, Mage, Rogue, Sage)
- Gain experience points (XP) and level up (100 XP per level)
- Track your total score and progression over time

### Daily Quests (Habits)
- Create habits as daily quests, each assigned to a skill category
- Set difficulty-based XP rewards (5, 10, 20, or 30 XP)
- Mark quests complete each day to earn XP
- Habits reset daily so you can build consistent routines

### Skill Tree
Six RPG-style attributes that grow as you complete related habits:

| Skill | Description |
|-------|-------------|
| Strength | Physical fitness & power |
| Intelligence | Learning & mental growth |
| Discipline | Consistency & willpower |
| Creativity | Art & innovation |
| Vitality | Health & wellness |
| Charisma | Social & communication |

Each skill levels up independently (every 10 XP), giving you a visual breakdown of where you're investing effort.

### Streak System
Maintain daily streaks on each habit to earn XP multipliers:

| Streak Days | Multiplier |
|-------------|------------|
| 0–6 | 1x |
| 7+ | 2x |
| 14+ | 3x |
| 21+ | 4x |
| 28+ | 5x |

### Progression & Rewards
- XP popups and animations on quest completion
- Level-up celebration modal
- Arcade-style scoreboards showing streaks, total completions, and quest count
- Daily progress bar tracking completed vs. total quests

## Tech Stack

- **React** 18 with Vite
- **Tailwind CSS** with retro arcade styling (neon colors, CRT scanlines, pixel fonts)
- **Radix UI** for accessible component primitives
- **Framer Motion** for animations
- **React Query** for data fetching and caching
- **React Hook Form** + **Zod** for form handling and validation
- **Base44** platform for backend (auth, database, hosting)

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd skill-tree-hero

# Install dependencies
npm install
```

### Environment Setup

Create an `.env.local` file in the project root:

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

### Running Locally

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Lint
npm run lint
npm run lint:fix

# Type check
npm run typecheck
```

The app will be available at `http://localhost:5173`.

### Publishing

Changes pushed to the repo are reflected in the Base44 Builder. To publish, open [Base44.com](http://Base44.com) and click Publish.

## Project Structure

```
src/
  api/              # Base44 SDK client
  components/
    hero/           # HeroAvatar, LevelUpModal, SkillBar, SkillTree
    habit/          # HabitCard, AddHabitModal
    ui/             # Radix UI primitives, RetroHeader
  hooks/            # Custom hooks (mobile detection)
  lib/              # Auth, routing, utilities
  pages/            # Home (main app page)
  utils/            # Shared utilities
```

## Documentation & Support

- Base44 Docs: [docs.base44.com](https://docs.base44.com/Integrations/Using-GitHub)
- Support: [app.base44.com/support](https://app.base44.com/support)
