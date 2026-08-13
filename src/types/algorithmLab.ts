import { LocalizedText } from './domain';

export type { LocalizedText };

export type AlgorithmStageType =
  | 'CLARIFY'
  | 'STRATEGY'
  | 'BLUEPRINT'
  | 'CODE_MOSAIC'
  | 'TRACE'
  | 'SUMMARY';

export type MosaicTileRole =
  | 'REQUIRED'
  | 'DISTRACTOR_COMPILE'
  | 'DISTRACTOR_LOGIC'
  | 'DISTRACTOR_STRATEGY'
  | 'DISTRACTOR_IRRELEVANT'
  | 'DISTRACTOR_COMPLEXITY'
  | 'DISTRACTOR_INVARIANT'
  | 'DISTRACTOR_EDGE_CASE';

/** Mosaic tile granularity derived from a canonical solution. MEDIUM is production. */
export type MosaicDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type StrategyViability =
  | 'TARGET'
  | 'VALID_SUBOPTIMAL'
  | 'VALID_ALTERNATIVE'
  | 'CONDITIONAL'
  | 'INVALID_FOR_SLICE';

export type CostBadgeKind =
  | 'QUADRATIC_TIME'
  | 'MUTATES_OR_COPIES'
  | 'EXTRA_MEMORY'
  | 'HIDES_MECHANICS'
  | 'RANGE_DEPENDENT';

export type WorkshopMasteryState =
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'ASSEMBLING'
  | 'SIMULATING'
  | 'WORKSHOP_COMPLETE';

export interface AlgorithmConstraint {
  readonly id: string;
  readonly text: LocalizedText;
}

export interface AlgorithmExample {
  readonly id: string;
  readonly input: string;
  readonly output: string;
  readonly explanation: LocalizedText;
}

export interface AlgorithmStage {
  readonly id: string;
  readonly type: AlgorithmStageType;
  readonly order: number;
  readonly title: LocalizedText;
  readonly instructions: LocalizedText;
}

export interface AlgorithmProblem {
  readonly id: string;
  readonly slug: string;
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly statement: LocalizedText;
  readonly examples: readonly AlgorithmExample[];
  readonly constraints: readonly AlgorithmConstraint[];
  readonly patternFamilyId: string;
  readonly difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  readonly estimatedMinutes: number;
  readonly stages: readonly AlgorithmStage[];
  readonly availability: 'AVAILABLE' | 'COMING_SOON' | 'PLANNED';
  readonly provenanceNote: LocalizedText;
}

export interface AlgorithmStrategyOption {
  readonly id: string;
  readonly problemId: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly timeClass: string;
  readonly spaceClass: string;
  readonly importantConstraint: LocalizedText;
  readonly viability: StrategyViability;
  readonly costBadges: readonly CostBadgeKind[];
  readonly justificationChips: readonly LocalizedText[];
  readonly unlocksBlueprint: boolean;
}

export interface BlueprintNode {
  readonly id: string;
  readonly label: LocalizedText;
  readonly role: 'REQUIRED' | 'DISTRACTOR';
  readonly distractorExplanation?: LocalizedText;
}

export interface BlueprintGraph {
  readonly id: string;
  readonly problemId: string;
  readonly strategyId: string;
  readonly nodes: readonly BlueprintNode[];
  readonly solutionOrder: readonly string[];
}

/** Canonical Java solution — source of truth for Code Mosaic generation. */
export interface AlgorithmSolution {
  readonly id: string;
  readonly problemId: string;
  readonly strategyId: string;
  /** Bump when canonical lines change in a way that invalidates persisted tile IDs. */
  readonly version: number;
  readonly language: 'JAVA';
  readonly javaVersion: string;
  readonly canonicalCode: string;
  readonly explanation?: LocalizedText;
  readonly timeComplexity?: string;
  readonly spaceComplexity?: string;
}

export interface MosaicTile {
  readonly id: string;
  readonly code: string;
  readonly indent: number;
  readonly role: MosaicTileRole;
  readonly explanation: LocalizedText;
  /** 0-based index among generated required lines; absent for distractors. */
  readonly originalIndex?: number;
}

/** Authored pedagogical incorrect tiles — never auto-generated. */
export interface MosaicDistractor {
  readonly id: string;
  readonly code: string;
  readonly indent: number;
  readonly role: Exclude<MosaicTileRole, 'REQUIRED'>;
  readonly explanation: LocalizedText;
}

/**
 * Runtime Mosaic puzzle. `solutionOrder` is generated from AlgorithmSolution
 * and must not be hand-authored for required lines.
 */
export interface MosaicPuzzle {
  readonly id: string;
  readonly problemId: string;
  readonly strategyId: string;
  readonly solutionId: string;
  readonly solutionVersion: number;
  readonly difficulty: MosaicDifficulty;
  readonly tiles: readonly MosaicTile[];
  readonly solutionOrder: readonly string[];
  readonly alternativeNote: LocalizedText;
}

/** Reusable execution-trace visualization/kinds — problem data chooses one. */
export type TraceKind =
  | 'HASH_STATE'
  | 'ARRAY_POINTERS'
  | 'INTERVAL_SWEEP'
  | 'PREFIX_SUFFIX'
  | 'RUNNING_DP'
  | 'MATRIX_BOUNDARIES'
  | 'FREQUENCY_STATE'
  | 'PREFIX_REMAINDER';

export interface TraceChoice {
  readonly id: string;
  readonly text: LocalizedText;
}

/** One interactive step: show algorithm-specific state, ask one question. */
export interface TraceStep {
  readonly id: string;
  readonly title: LocalizedText;
  readonly narrative: LocalizedText;
  /** Algorithm-specific state keys → display values (left/right, prefix, etc.). */
  readonly state: Readonly<Record<string, string>>;
  readonly question: LocalizedText;
  readonly choices: readonly TraceChoice[];
  readonly correctChoiceId: string;
  readonly feedbackCorrect: LocalizedText;
  readonly feedbackIncorrect: LocalizedText;
  /** Optional filmstrip highlight when `arrayInput` is present. */
  readonly highlightIndex?: number;
  /** Optional set values for HASH_STATE visualizations. */
  readonly setValues?: readonly number[];
  readonly highlightSetValue?: number | null;
}

export interface TraceScenario {
  readonly id: string;
  readonly problemId: string;
  readonly kind: TraceKind;
  readonly label: LocalizedText;
  readonly inputSummary: LocalizedText;
  /** Optional numeric array for filmstrip when useful. */
  readonly arrayInput?: readonly number[];
  readonly steps: readonly TraceStep[];
  readonly followUpQuestion: LocalizedText;
  readonly followUpChoices: readonly TraceChoice[];
  readonly followUpCorrectChoiceId: string;
  readonly followUpFeedbackCorrect: LocalizedText;
  readonly followUpFeedbackIncorrect: LocalizedText;
}

export interface WorkshopSummaryContent {
  readonly corePattern: LocalizedText;
  readonly invariant: LocalizedText;
  readonly timeComplexity: string;
  readonly spaceComplexity: string;
  readonly commonMistake: LocalizedText;
  readonly recognitionCue: LocalizedText;
}

/** Full workshop content pack for one algorithm problem. */
export interface AlgorithmWorkshopPack {
  readonly problem: AlgorithmProblem;
  readonly clarify: readonly ClarifyQuestion[];
  readonly strategies: readonly AlgorithmStrategyOption[];
  /** Strategy that unlocks the canonical Mosaic / Blueprint path. */
  readonly targetStrategyId: string;
  readonly blueprint: BlueprintGraph;
  readonly solutions: readonly AlgorithmSolution[];
  readonly distractors: readonly MosaicDistractor[];
  readonly mosaicId: string;
  readonly mosaicAlternativeNote: LocalizedText;
  readonly mosaicSuccessMessage: LocalizedText;
  readonly blueprintHelp: LocalizedText;
  readonly blueprintSuccessMessage: LocalizedText;
  readonly resolveMosaic: (strategyId?: string) => MosaicPuzzle;
  readonly trace: TraceScenario;
  readonly hints: readonly AlgorithmHint[];
  readonly reflectionPrompt: LocalizedText;
  readonly summary: WorkshopSummaryContent;
}

export interface ClarifyQuestion {
  readonly id: string;
  readonly prompt: LocalizedText;
  readonly options: readonly {
    readonly id: string;
    readonly text: LocalizedText;
    readonly isCorrect: boolean;
    readonly feedback: LocalizedText;
  }[];
  readonly multiSelect: boolean;
}

export interface AlgorithmHint {
  readonly id: string;
  readonly stageType: AlgorithmStageType;
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly text: LocalizedText;
  readonly revealType: 'NONE' | 'TILE' | 'BLOCK' | 'SECTION' | 'FULL';
  readonly revealTargetId?: string;
}

export interface WorkshopStageResult {
  readonly stageType: AlgorithmStageType;
  readonly completed: boolean;
  readonly attempts: number;
  readonly hintsUsed: number;
  readonly accuracy?: number;
  readonly completedAt?: string;
}

export interface WorkshopAttempt {
  readonly id: string;
  readonly userId: string;
  readonly problemId: string;
  readonly stageType: AlgorithmStageType;
  readonly submittedAt: string;
  readonly payloadJson: string;
  readonly correct: boolean;
}

export interface WorkshopProgress {
  readonly userId: string;
  readonly problemId: string;
  readonly currentStageType: AlgorithmStageType;
  readonly completedStageTypes: readonly AlgorithmStageType[];
  readonly selectedStrategyId?: string;
  readonly strategyJustificationChipIds: readonly string[];
  readonly strategyChanged: boolean;
  readonly previousStrategyIds: readonly string[];
  readonly clarifySelectedOptionIds: readonly string[];
  readonly blueprintOrder: readonly string[];
  readonly blueprintDiscardedIds: readonly string[];
  readonly blueprintAttempts: number;
  /** Assembled mosaic tile IDs (rail order). Resolved against generated tiles. */
  readonly mosaicOrder: readonly string[];
  readonly mosaicDiscardedIds: readonly string[];
  /** Solution the current mosaic placement was built against. */
  readonly mosaicSolutionId?: string;
  readonly mosaicSolutionVersion?: number;
  readonly mosaicAttempts: number;
  readonly mosaicCorrectDiscards: number;
  readonly traceStepIndex: number;
  readonly traceCorrectSteps: number;
  readonly traceTotalAnswered: number;
  /** Selected follow-up choice id (legacy boolean may appear in old IndexedDB rows). */
  readonly followUpTraceAnswer?: string | boolean;
  readonly followUpTraceCorrect?: boolean;
  readonly hintsUsedByStage: Readonly<Partial<Record<AlgorithmStageType, number>>>;
  readonly reflectionText: string;
  readonly masteryState: WorkshopMasteryState;
  readonly markedForReview: boolean;
  readonly startedAt: string;
  readonly lastActivityAt: string;
  readonly bestCompletedAt?: string;
}

export interface AlgorithmPatternFamily {
  readonly id: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
}
