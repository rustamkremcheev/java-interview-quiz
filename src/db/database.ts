import Dexie, { Table } from 'dexie';
import {
  UserAttempt,
  ConceptMastery,
  ReviewItem,
  MissionProgress,
  UserPreferences,
  ReflectionNote,
  UserMistakeRecord,
  ConfidenceLevel,
  EvaluationResult,
  LanguageMode
} from '../types/domain';

export class AppDatabase extends Dexie {
  attempts!: Table<UserAttempt, number>;
  conceptMastery!: Table<ConceptMastery, string>;
  reviewItems!: Table<ReviewItem, number>;
  missionProgress!: Table<MissionProgress, string>;
  userPreferences!: Table<UserPreferences, string>;
  reflectionNotes!: Table<ReflectionNote, number>;
  userMistakes!: Table<UserMistakeRecord, number>;

  constructor() {
    super('JavaMissionControlDB');
    this.version(2).stores({
      attempts: '++id, userId, challengeId, missionId, submittedAt',
      conceptMastery: '[userId+conceptId], state, nextReviewDueAt',
      reviewItems: '++id, [userId+conceptId], dueAt, status',
      missionProgress: '[userId+missionId], state, lastActivityAt',
      userPreferences: 'userId',
      reflectionNotes: '++id, userId, missionId, createdAt',
      userMistakes: '++id, [userId+mistakePatternId], resolved'
    });
  }
}

export const db = new AppDatabase();

const DEFAULT_USER_ID = 'local-user';

export async function initializeDatabaseDefaults(): Promise<{
  preferences: UserPreferences;
  missionProgress: MissionProgress[];
}> {
  try {
    let prefs = await db.userPreferences.get(DEFAULT_USER_ID);
    if (!prefs) {
      prefs = {
        userId: DEFAULT_USER_ID,
        languageMode: 'en',
        reducedMotion: false,
        codeCommentsMode: 'ANNOTATED',
        timerEnabled: false,
        theme: 'DARK_TECHNICAL',
        schemaVersion: 1
      };
      await db.userPreferences.put(prefs);
    }

    const progressList = await db.missionProgress.where('userId').equals(DEFAULT_USER_ID).toArray();
    return { preferences: prefs, missionProgress: progressList };
  } catch (err) {
    console.warn('IndexedDB unavailable, using in-memory fallbacks:', err);
    const fallbackPrefs: UserPreferences = {
      userId: DEFAULT_USER_ID,
      languageMode: 'en',
      reducedMotion: false,
      codeCommentsMode: 'ANNOTATED',
      timerEnabled: false,
      theme: 'DARK_TECHNICAL',
      schemaVersion: 1
    };
    return { preferences: fallbackPrefs, missionProgress: [] };
  }
}

export async function recordUserAttempt(attempt: Omit<UserAttempt, 'id'>): Promise<void> {
  try {
    await db.attempts.add(attempt);
  } catch (err) {
    console.warn('Failed to persist attempt to Dexie:', err);
  }
}

export async function updateConceptMastery(
  conceptIds: readonly string[],
  correctness: "CORRECT" | "PARTIALLY_CORRECT" | "INCORRECT",
  confidence: ConfidenceLevel,
  hintsUsedCount: number
): Promise<void> {
  const now = new Date();
  const userId = DEFAULT_USER_ID;

  try {
    for (const conceptId of conceptIds) {
      let record = await db.conceptMastery.get([userId, conceptId]);

      if (!record) {
        record = {
          userId,
          conceptId,
          score: 0,
          independentCorrectAttempts: 0,
          confidentIncorrectAttempts: 0,
          lastPracticedAt: now.toISOString(),
          nextReviewDueAt: now.toISOString(),
          state: "EXPOSED"
        };
      }

      let scoreDelta = 0;
      let reviewIntervalHours = 24 * 4;

      if (correctness === "CORRECT") {
        if (confidence === "CONFIDENT" && hintsUsedCount === 0) {
          scoreDelta = 25;
          record = { ...record, independentCorrectAttempts: record.independentCorrectAttempts + 1 };
          reviewIntervalHours = record.score >= 80 ? 24 * 7 : 24 * 4;
        } else if (confidence === "UNSURE" && hintsUsedCount === 0) {
          scoreDelta = 18;
          reviewIntervalHours = 24 * 2;
        } else {
          scoreDelta = 10;
          reviewIntervalHours = 24 * 1;
        }
      } else {
        if (confidence === "CONFIDENT") {
          scoreDelta = -25;
          record = { ...record, confidentIncorrectAttempts: record.confidentIncorrectAttempts + 1 };
          reviewIntervalHours = 1; // Heavy penalty: review within 1 hour!
        } else {
          scoreDelta = -10;
          reviewIntervalHours = 12;
        }
      }

      const newScore = Math.max(0, Math.min(100, record.score + scoreDelta));
      let newState = record.state;
      if (newScore >= 90) newState = "MASTERED";
      else if (newScore >= 75) newState = "INTERVIEW_READY";
      else if (newScore >= 50) newState = "RELIABLE";
      else if (newScore >= 25) newState = "DEVELOPING";
      else newState = "EXPOSED";

      const nextDue = new Date(now.getTime() + reviewIntervalHours * 60 * 60 * 1000);

      await db.conceptMastery.put({
        ...record,
        score: newScore,
        state: newState,
        lastPracticedAt: now.toISOString(),
        nextReviewDueAt: nextDue.toISOString()
      });

      // Schedule spaced review item if incorrect or confident mistake
      if (correctness !== "CORRECT" || confidence === "UNSURE") {
        await db.reviewItems.add({
          userId,
          conceptId,
          missionId: "mis_bank_account_invariants",
          dueAt: nextDue.toISOString(),
          intervalDays: reviewIntervalHours / 24,
          reviewReason: confidence === "CONFIDENT" ? "CONFIDENT_MISTAKE" : "INCORRECT_ANSWER",
          attemptsCount: 1,
          status: "DUE"
        });
      }
    }
  } catch (err) {
    console.warn('Failed to update concept mastery in Dexie:', err);
  }
}

export async function recordMistakeOccurrence(
  mistakePatternId: string,
  wasConfident: boolean
): Promise<void> {
  const userId = DEFAULT_USER_ID;
  const now = new Date().toISOString();
  try {
    const existing = await db.userMistakes.where('[userId+mistakePatternId]').equals([userId, mistakePatternId]).first();
    if (existing) {
      await db.userMistakes.update(existing.id!, {
        occurrenceCount: existing.occurrenceCount + 1,
        confidentMistakeCount: wasConfident ? existing.confidentMistakeCount + 1 : existing.confidentMistakeCount,
        lastSeenAt: now,
        resolved: false
      });
    } else {
      await db.userMistakes.add({
        userId,
        mistakePatternId,
        occurrenceCount: 1,
        confidentMistakeCount: wasConfident ? 1 : 0,
        lastSeenAt: now,
        resolved: false
      });
    }
  } catch (err) {
    console.warn('Failed to record mistake pattern:', err);
  }
}

export async function saveMissionProgress(progress: MissionProgress): Promise<void> {
  try {
    await db.missionProgress.put(progress);
  } catch (err) {
    console.warn('Failed to save mission progress:', err);
  }
}

export async function saveReflectionNote(missionId: string, responseText: string): Promise<void> {
  try {
    await db.reflectionNotes.add({
      userId: DEFAULT_USER_ID,
      missionId,
      responseText,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Failed to save reflection note:', err);
  }
}

export async function exportUserDataJSON(): Promise<string> {
  try {
    const attempts = await db.attempts.toArray();
    const mastery = await db.conceptMastery.toArray();
    const reviews = await db.reviewItems.toArray();
    const missionProgress = await db.missionProgress.toArray();
    const preferences = await db.userPreferences.toArray();
    const reflectionNotes = await db.reflectionNotes.toArray();
    const mistakes = await db.userMistakes.toArray();

    const exportData = {
      exportFormatVersion: "1.0",
      exportedAt: new Date().toISOString(),
      preferences: preferences[0] || null,
      missionProgress,
      conceptMastery: mastery,
      attempts,
      reviews,
      reflectionNotes,
      mistakes
    };

    return JSON.stringify(exportData, null, 2);
  } catch (err) {
    console.error('Export error:', err);
    throw err;
  }
}

export async function importUserDataJSON(jsonString: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') return false;

    await db.transaction(
      'rw',
      [
        db.attempts,
        db.conceptMastery,
        db.reviewItems,
        db.missionProgress,
        db.userPreferences,
        db.reflectionNotes,
        db.userMistakes
      ],
      async () => {
        if (data.preferences) {
          await db.userPreferences.clear();
          await db.userPreferences.put(data.preferences);
        }
        if (Array.isArray(data.missionProgress)) {
          await db.missionProgress.clear();
          await db.missionProgress.bulkPut(data.missionProgress);
        }
        if (Array.isArray(data.conceptMastery)) {
          await db.conceptMastery.clear();
          await db.conceptMastery.bulkPut(data.conceptMastery);
        }
        if (Array.isArray(data.attempts)) {
          await db.attempts.clear();
          await db.attempts.bulkAdd(data.attempts);
        }
        if (Array.isArray(data.reviews)) {
          await db.reviewItems.clear();
          await db.reviewItems.bulkAdd(data.reviews);
        }
        if (Array.isArray(data.reflectionNotes)) {
          await db.reflectionNotes.clear();
          await db.reflectionNotes.bulkAdd(data.reflectionNotes);
        }
        if (Array.isArray(data.mistakes)) {
          await db.userMistakes.clear();
          await db.userMistakes.bulkAdd(data.mistakes);
        }
      }
    );

    return true;
  } catch (err) {
    console.error('Import error:', err);
    return false;
  }
}

export async function resetUserData(): Promise<void> {
  await db.transaction(
    'rw',
    [
      db.attempts,
      db.conceptMastery,
      db.reviewItems,
      db.missionProgress,
      db.reflectionNotes,
      db.userMistakes
    ],
    async () => {
      await db.attempts.clear();
      await db.conceptMastery.clear();
      await db.reviewItems.clear();
      await db.missionProgress.clear();
      await db.reflectionNotes.clear();
      await db.userMistakes.clear();
    }
  );
}
