import { LanguageMode, LocalizedText } from './mission';

export type ConfidenceLevel = 'confident' | 'unsure' | 'guessing';

export interface Attempt {
  id?: number;
  missionId: string;
  stageId: string;
  challengeType: string;
  answer: unknown;
  correct: boolean;
  confidence: ConfidenceLevel;
  hintsUsed: number;
  createdAt: string;
}

export interface ConceptMastery {
  conceptId: string;
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  confidentMistakes: number;
  hintsUsed: number;
  lastPracticedTime: string;
  masteryScore: number; // 0 to 100
  nextReviewTime: string;
}

export interface SpacedReviewItem {
  id?: number;
  conceptId: string;
  missionId: string;
  stageId: string;
  title: LocalizedText;
  dueTime: string;
  status: 'due' | 'completed';
}

export interface UserProgress {
  id?: number;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedMissionIds: string[];
  totalPracticeMinutes: number;
}

export interface UserSettings {
  id?: number;
  languageMode: LanguageMode;
  reducedMotion: boolean;
  soundEnabled: boolean;
}

export interface ReflectionNote {
  id?: number;
  missionId: string;
  note: string;
  createdAt: string;
}
