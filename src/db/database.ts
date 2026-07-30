import Dexie, { Table } from 'dexie';
import { Attempt, ConceptMastery, SpacedReviewItem, UserProgress, UserSettings, ReflectionNote, ConfidenceLevel } from '../types/user';

export class AppDatabase extends Dexie {
  attempts!: Table<Attempt, number>;
  mastery!: Table<ConceptMastery, string>;
  reviews!: Table<SpacedReviewItem, number>;
  userProgress!: Table<UserProgress, number>;
  settings!: Table<UserSettings, number>;
  reflectionNotes!: Table<ReflectionNote, number>;

  constructor() {
    super('JavaMissionControlDB');
    this.version(1).stores({
      attempts: '++id, missionId, stageId, createdAt',
      mastery: '&conceptId, masteryScore, nextReviewTime',
      reviews: '++id, conceptId, dueTime, status',
      userProgress: '++id',
      settings: '++id',
      reflectionNotes: '++id, missionId, createdAt'
    });
  }
}

export const db = new AppDatabase();

/**
 * TRANSPARENT CONCEPT MASTERY & SPACED REPETITION ALGORITHM
 * 
 * Mastery score formula (0 to 100):
 * - Starts at 0 points.
 * - Correct attempt (Confident, 0 hints): +25 points
 * - Correct attempt (Unsure, 0 hints): +18 points
 * - Correct attempt (With hints): +10 points
 * - Incorrect attempt (Unsure / Guessing): -10 points
 * - Incorrect attempt (CONFIDENT): -25 points (Heavy penalty for overconfidence on flawed concepts!)
 * 
 * Spaced Repetition Intervals:
 * - Incorrect answer: Review in 10 minutes (0.007 days)
 * - Correct with 2+ hints: Review in 1 day
 * - Correct with 1 hint: Review in 2 days
 * - Correct without hints: Review in 4 days
 * - High mastery (>=80) & correct: Review in 7 days
 */
export async function updateConceptMastery(
  conceptIds: string[],
  correct: boolean,
  confidence: ConfidenceLevel,
  hintsUsed: number
): Promise<void> {
  const now = new Date();
  
  for (const conceptId of conceptIds) {
    let record = await db.mastery.get(conceptId);
    
    if (!record) {
      record = {
        conceptId,
        attempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
        confidentMistakes: 0,
        hintsUsed: 0,
        lastPracticedTime: now.toISOString(),
        masteryScore: 0,
        nextReviewTime: now.toISOString()
      };
    }

    record.attempts += 1;
    record.hintsUsed += hintsUsed;
    record.lastPracticedTime = now.toISOString();

    let scoreDelta = 0;
    let nextReviewMinutes = 1440 * 4; // Default 4 days

    if (correct) {
      record.correctAttempts += 1;
      if (confidence === 'confident' && hintsUsed === 0) {
        scoreDelta = 25;
        nextReviewMinutes = record.masteryScore >= 80 ? 1440 * 7 : 1440 * 4;
      } else if (confidence === 'unsure' && hintsUsed === 0) {
        scoreDelta = 18;
        nextReviewMinutes = 1440 * 2;
      } else {
        scoreDelta = 10;
        nextReviewMinutes = 1440 * 1;
      }
    } else {
      record.incorrectAttempts += 1;
      if (confidence === 'confident') {
        record.confidentMistakes += 1;
        scoreDelta = -25; // High penalty for confident mistake
      } else {
        scoreDelta = -10;
      }
      nextReviewMinutes = 10; // Review in 10 minutes
    }

    record.masteryScore = Math.max(0, Math.min(100, record.masteryScore + scoreDelta));
    
    const nextReviewDate = new Date(now.getTime() + nextReviewMinutes * 60 * 1000);
    record.nextReviewTime = nextReviewDate.toISOString();

    await db.mastery.put(record);
  }
}

/**
 * Initialize default settings & user progress if empty
 */
export async function initializeDatabaseDefaults(): Promise<{ settings: UserSettings; progress: UserProgress }> {
  let settings = await db.settings.get(1);
  if (!settings) {
    settings = {
      id: 1,
      languageMode: 'en',
      reducedMotion: false,
      soundEnabled: true
    };
    await db.settings.put(settings);
  }

  let progress = await db.userProgress.get(1);
  if (!progress) {
    progress = {
      id: 1,
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedMissionIds: [],
      totalPracticeMinutes: 0
    };
    await db.userProgress.put(progress);
  }

  return { settings, progress };
}

/**
 * JSON Export & Import Utilities
 */
export async function exportUserDataJSON(): Promise<string> {
  const attempts = await db.attempts.toArray();
  const mastery = await db.mastery.toArray();
  const reviews = await db.reviews.toArray();
  const userProgress = await db.userProgress.toArray();
  const settings = await db.settings.toArray();
  const reflectionNotes = await db.reflectionNotes.toArray();

  const exportObject = {
    version: 1,
    exportedAt: new Date().toISOString(),
    attempts,
    mastery,
    reviews,
    userProgress,
    settings,
    reflectionNotes
  };

  return JSON.stringify(exportObject, null, 2);
}

export async function importUserDataJSON(jsonString: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object' || !data.version) {
      throw new Error('Invalid export file format');
    }

    await db.transaction('rw', [db.attempts, db.mastery, db.reviews, db.userProgress, db.settings, db.reflectionNotes], async () => {
      if (Array.isArray(data.attempts)) {
        await db.attempts.clear();
        await db.attempts.bulkAdd(data.attempts);
      }
      if (Array.isArray(data.mastery)) {
        await db.mastery.clear();
        await db.mastery.bulkPut(data.mastery);
      }
      if (Array.isArray(data.reviews)) {
        await db.reviews.clear();
        await db.reviews.bulkAdd(data.reviews);
      }
      if (Array.isArray(data.userProgress)) {
        await db.userProgress.clear();
        await db.userProgress.bulkPut(data.userProgress);
      }
      if (Array.isArray(data.settings)) {
        await db.settings.clear();
        await db.settings.bulkPut(data.settings);
      }
      if (Array.isArray(data.reflectionNotes)) {
        await db.reflectionNotes.clear();
        await db.reflectionNotes.bulkAdd(data.reflectionNotes);
      }
    });

    return true;
  } catch (err) {
    console.error('Import failed:', err);
    return false;
  }
}
