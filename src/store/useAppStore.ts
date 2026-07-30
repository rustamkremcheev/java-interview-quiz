import { create } from 'zustand';
import { LanguageMode } from '../types/mission';
import { ConfidenceLevel } from '../types/user';
import { db, initializeDatabaseDefaults } from '../db/database';

export type LevelMode = 'guided' | 'applied' | 'interview';

interface AppState {
  languageMode: LanguageMode;
  xp: number;
  level: number;
  streak: number;
  confidence: ConfidenceLevel;
  levelMode: LevelMode;
  isInitialized: boolean;

  setLanguageMode: (mode: LanguageMode) => Promise<void>;
  setConfidence: (confidence: ConfidenceLevel) => void;
  setLevelMode: (mode: LevelMode) => void;
  addXP: (amount: number) => Promise<void>;
  initializeStore: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  languageMode: 'en',
  xp: 0,
  level: 1,
  streak: 1,
  confidence: 'unsure',
  levelMode: 'guided',
  isInitialized: false,

  setLanguageMode: async (mode) => {
    set({ languageMode: mode });
    const settings = await db.settings.get(1);
    if (settings) {
      await db.settings.update(1, { languageMode: mode });
    }
  },

  setConfidence: (confidence) => {
    set({ confidence });
  },

  setLevelMode: (mode) => {
    set({ levelMode: mode });
  },

  addXP: async (amount) => {
    const currentXP = get().xp + amount;
    // Calculate level: 100 XP per level
    const newLevel = Math.floor(currentXP / 100) + 1;
    set({ xp: currentXP, level: newLevel });

    const progress = await db.userProgress.get(1);
    if (progress) {
      await db.userProgress.update(1, { xp: currentXP, level: newLevel });
    }
  },

  initializeStore: async () => {
    const { settings, progress } = await initializeDatabaseDefaults();
    set({
      languageMode: settings.languageMode,
      xp: progress.xp,
      level: progress.level,
      streak: progress.streak,
      isInitialized: true
    });
  }
}));
