import { create } from 'zustand';
import { LanguageMode, UserPreferences } from '../types/domain';
import { db, initializeDatabaseDefaults } from '../db/database';

interface AppState {
  languageMode: LanguageMode;
  xp: number;
  level: number;
  streak: number;
  codeCommentsMode: "CLEAN" | "ANNOTATED";
  timerEnabled: boolean;
  reducedMotion: boolean;
  sidebarOpen: boolean;
  sidebarActiveTab: "THEORY" | "CONCEPTS" | "MISTAKES" | "TAGS" | "INTERVIEW_TIPS" | "REFERENCES";
  sidebarSelectedTag: string | null;
  isInitialized: boolean;

  setLanguageMode: (mode: LanguageMode) => Promise<void>;
  setCodeCommentsMode: (mode: "CLEAN" | "ANNOTATED") => Promise<void>;
  setTimerEnabled: (enabled: boolean) => Promise<void>;
  setReducedMotion: (enabled: boolean) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  toggleSidebar: (open?: boolean) => void;
  openSidebarWithTag: (tag: string) => void;
  setSidebarActiveTab: (tab: AppState['sidebarActiveTab']) => void;
  initializeStore: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  languageMode: 'en',
  xp: 0,
  level: 1,
  streak: 1,
  codeCommentsMode: 'ANNOTATED',
  timerEnabled: false,
  reducedMotion: false,
  sidebarOpen: false,
  sidebarActiveTab: 'THEORY',
  sidebarSelectedTag: null,
  isInitialized: false,

  setLanguageMode: async (mode) => {
    set({ languageMode: mode });
    try {
      await db.userPreferences.update('local-user', { languageMode: mode });
    } catch (err) {
      console.warn('Failed to update language mode in Dexie:', err);
    }
  },

  setCodeCommentsMode: async (mode) => {
    set({ codeCommentsMode: mode });
    try {
      await db.userPreferences.update('local-user', { codeCommentsMode: mode });
    } catch (err) {
      console.warn('Failed to update code comments mode in Dexie:', err);
    }
  },

  setTimerEnabled: async (enabled) => {
    set({ timerEnabled: enabled });
    try {
      await db.userPreferences.update('local-user', { timerEnabled: enabled });
    } catch (err) {
      console.warn('Failed to update timer setting in Dexie:', err);
    }
  },

  setReducedMotion: async (enabled) => {
    set({ reducedMotion: enabled });
    try {
      await db.userPreferences.update('local-user', { reducedMotion: enabled });
    } catch (err) {
      console.warn('Failed to update reduced motion in Dexie:', err);
    }
  },

  addXP: async (amount) => {
    const currentXP = get().xp + amount;
    const newLevel = Math.floor(currentXP / 100) + 1;
    set({ xp: currentXP, level: newLevel });
  },

  toggleSidebar: (open) => {
    set((state) => ({ sidebarOpen: open !== undefined ? open : !state.sidebarOpen }));
  },

  openSidebarWithTag: (tag) => {
    set({
      sidebarOpen: true,
      sidebarActiveTab: 'TAGS',
      sidebarSelectedTag: tag
    });
  },

  setSidebarActiveTab: (tab) => {
    set({ sidebarActiveTab: tab });
  },

  initializeStore: async () => {
    const { preferences } = await initializeDatabaseDefaults();
    set({
      languageMode: preferences.languageMode,
      codeCommentsMode: preferences.codeCommentsMode,
      timerEnabled: preferences.timerEnabled,
      reducedMotion: preferences.reducedMotion,
      isInitialized: true
    });
  }
}));
