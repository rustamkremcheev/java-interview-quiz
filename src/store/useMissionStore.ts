import { create } from 'zustand';
import { ConfidenceLevel } from '../types/domain';

interface MissionState {
  currentStageId: string;
  hypothesisText: string;
  confidence: ConfidenceLevel;
  hintsRevealedIds: string[];
  bugHuntSelectedLines: number[];
  guidedSelectedOptions: string[];
  interviewResponseText: string;
  reflectionText: string;
  attemptSubmitted: boolean;

  setCurrentStageId: (stageId: string) => void;
  setHypothesisText: (text: string) => void;
  setConfidence: (confidence: ConfidenceLevel) => void;
  revealHint: (hintId: string) => void;
  toggleBugHuntLine: (lineNumber: number) => void;
  clearBugHuntLines: () => void;
  toggleGuidedOption: (optionId: string) => void;
  setInterviewResponseText: (text: string) => void;
  setReflectionText: (text: string) => void;
  setAttemptSubmitted: (submitted: boolean) => void;
  resetMissionState: (initialStageId: string) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  currentStageId: 'stg_intro',
  hypothesisText: '',
  confidence: 'UNSURE',
  hintsRevealedIds: [],
  bugHuntSelectedLines: [],
  guidedSelectedOptions: [],
  interviewResponseText: '',
  reflectionText: '',
  attemptSubmitted: false,

  setCurrentStageId: (stageId) => set({ currentStageId: stageId }),
  setHypothesisText: (text) => set({ hypothesisText: text }),
  setConfidence: (confidence) => set({ confidence }),
  revealHint: (hintId) => set((state) => ({
    hintsRevealedIds: state.hintsRevealedIds.includes(hintId)
      ? state.hintsRevealedIds
      : [...state.hintsRevealedIds, hintId]
  })),
  toggleBugHuntLine: (lineNumber) => set((state) => ({
    bugHuntSelectedLines: state.bugHuntSelectedLines.includes(lineNumber)
      ? state.bugHuntSelectedLines.filter((l) => l !== lineNumber)
      : [...state.bugHuntSelectedLines, lineNumber]
  })),
  clearBugHuntLines: () => set({ bugHuntSelectedLines: [] }),
  toggleGuidedOption: (optionId) => set((state) => ({
    guidedSelectedOptions: state.guidedSelectedOptions.includes(optionId)
      ? state.guidedSelectedOptions.filter((id) => id !== optionId)
      : [...state.guidedSelectedOptions, optionId]
  })),
  setInterviewResponseText: (text) => set({ interviewResponseText: text }),
  setReflectionText: (text) => set({ reflectionText: text }),
  setAttemptSubmitted: (submitted) => set({ attemptSubmitted: submitted }),
  resetMissionState: (initialStageId) => set({
    currentStageId: initialStageId,
    hypothesisText: '',
    confidence: 'UNSURE',
    hintsRevealedIds: [],
    bugHuntSelectedLines: [],
    guidedSelectedOptions: [],
    interviewResponseText: '',
    reflectionText: '',
    attemptSubmitted: false
  })
}));
