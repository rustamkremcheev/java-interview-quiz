// Authoritative Domain Types conforming to DATA_MODEL.md

export type LanguageCode = "en" | "ru";
export type LanguageMode = "en" | "ru" | "bilingual";

export interface LocalizedText {
  readonly en: string;
  readonly ru: string;
}

export interface OptionalLocalizedText {
  readonly en?: string;
  readonly ru?: string;
}

export type DifficultyTier = "FOUNDATION" | "APPLIED" | "SENIOR" | "STAFF";

// Rich Content Model
export type RichBlockType =
  | "PARAGRAPH"
  | "HEADING"
  | "BULLET_LIST"
  | "NUMBERED_LIST"
  | "CALLOUT"
  | "WARNING"
  | "TABLE"
  | "DIAGRAM_REF"
  | "CODE_REF";

export interface BaseRichBlock {
  readonly id: string;
  readonly type: RichBlockType;
}

export interface ParagraphBlock extends BaseRichBlock {
  readonly type: "PARAGRAPH";
  readonly content: LocalizedText;
}

export interface HeadingBlock extends BaseRichBlock {
  readonly type: "HEADING";
  readonly level: 1 | 2 | 3 | 4;
  readonly text: LocalizedText;
}

export interface CalloutBlock extends BaseRichBlock {
  readonly type: "CALLOUT" | "WARNING";
  readonly title?: LocalizedText;
  readonly content: LocalizedText;
}

export interface CodeRefBlock extends BaseRichBlock {
  readonly type: "CODE_REF";
  readonly codeArtifactId: string;
  readonly displayMode: "CLEAN" | "ANNOTATED";
}

export interface DiagramRefBlock extends BaseRichBlock {
  readonly type: "DIAGRAM_REF";
  readonly visualizationId: string;
}

export type RichContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | CalloutBlock
  | CodeRefBlock
  | DiagramRefBlock;

// Curriculum Entities
export interface Module {
  readonly id: string;
  readonly slug: string;
  readonly title: LocalizedText;
  readonly shortTitle: LocalizedText;
  readonly description: LocalizedText;
  readonly icon: string;
  readonly difficultyRange: {
    readonly min: DifficultyTier;
    readonly max: DifficultyTier;
  };
  readonly estimatedMinutes: number;
  readonly topicIds: readonly string[];
  readonly tags: readonly string[];
  readonly order: number;
  readonly availability: "AVAILABLE" | "BETA" | "COMING_SOON" | "PREVIEW";
  readonly version: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly codingExerciseCount?: number;
  readonly interviewQuestionCount?: number;
}

export interface Topic {
  readonly id: string;
  readonly moduleId: string;
  readonly slug: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly learningObjectives: readonly LocalizedText[];
  readonly prerequisiteTopicIds: readonly string[];
  readonly relatedTopicIds: readonly string[];
  readonly missionIds: readonly string[];
  readonly canonicalTags: readonly string[];
  readonly estimatedMinutes: number;
  readonly difficulty: DifficultyTier;
  readonly order: number;
  readonly sourceIds: readonly string[];
  readonly availability?: "AVAILABLE" | "LOCKED" | "COMING_SOON" | "PLANNED";
  readonly questionCount?: number;
}

export interface Mission {
  readonly id: string;
  readonly primaryTopicId: string;
  readonly secondaryTopicIds: readonly string[];
  readonly slug: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly scenarioIntroduction: LocalizedText;
  readonly engineeringProblem: LocalizedText;
  readonly learningObjectives: readonly LocalizedText[];
  readonly requiredConceptIds: readonly string[];
  readonly recommendedConceptIds: readonly string[];
  readonly stageIds: readonly string[];
  readonly challengeIds: readonly string[];
  readonly estimatedMinutes: number;
  readonly difficulty: DifficultyTier;
  readonly xpReward: number;
  readonly version: string;
}

export type MissionStageType =
  | "MISSION_INTRODUCTION"
  | "REAL_ENGINEERING_PROBLEM"
  | "THINK_YOURSELF"
  | "NEED_HELP"
  | "THEORY"
  | "VISUALIZATION"
  | "INTERACTIVE_PRACTICE"
  | "INTERVIEW_QUESTION"
  | "INTERVIEW_ANSWER"
  | "DEBUG_COUNTER_EXAMPLE"
  | "RELATED_TOPICS"
  | "MISSION_RESULTS"
  | "REFLECTION";

export interface BaseMissionStage {
  readonly id: string;
  readonly missionId: string;
  readonly type: MissionStageType;
  readonly order: number;
  readonly title: LocalizedText;
  readonly instructions?: LocalizedText;
}

export interface TheoryStage extends BaseMissionStage {
  readonly type: "THEORY";
  readonly theoryArticleId: string;
}

export interface PracticeStage extends BaseMissionStage {
  readonly type: "INTERACTIVE_PRACTICE" | "DEBUG_COUNTER_EXAMPLE";
  readonly challengeId: string;
}

export interface InterviewStage extends BaseMissionStage {
  readonly type: "INTERVIEW_QUESTION" | "INTERVIEW_ANSWER";
  readonly interviewQuestionId: string;
  readonly challengeId: string;
}

export type MissionStage = BaseMissionStage | TheoryStage | PracticeStage | InterviewStage;

// Knowledge Graph
export type EdgeType =
  | "REQUIRES"
  | "RELATED_TO"
  | "CONTRASTS_WITH"
  | "APPLIES_TO"
  | "EXPLAINS"
  | "TESTED_BY"
  | "DEMONSTRATED_BY"
  | "FIXES"
  | "CAUSES"
  | "DEEPER_THAN";

export interface Concept {
  readonly id: string;
  readonly slug: string;
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly topicIds: readonly string[];
  readonly canonicalTag: string;
  readonly prerequisiteConceptIds: readonly string[];
}

export interface KnowledgeEdge {
  readonly id: string;
  readonly sourceNodeId: string;
  readonly targetNodeId: string;
  readonly edgeType: EdgeType;
  readonly weight: number;
}

export interface Tag {
  readonly id: string;
  readonly slug: string;
  readonly displayName: LocalizedText;
  readonly canonicalConceptId?: string;
  readonly category: "LANGUAGE_FEATURE" | "OOP" | "CONCURRENCY" | "JVM" | "ARCHITECTURE";
}

// Theory & Content
export type VerificationStatus =
  | "UNVERIFIED"
  | "SOURCE_CONFIRMED"
  | "TECHNICALLY_VERIFIED"
  | "MULTI_SOURCE_CONFIRMED"
  | "REJECTED";

export interface TheorySection {
  readonly id: string;
  readonly category:
    | "DEFINITION"
    | "MOTIVATION"
    | "MENTAL_MODEL"
    | "MECHANICS"
    | "TRADE_OFFS"
    | "PRODUCTION_USE"
    | "COMMON_MISTAKES"
    | "INTERVIEW_GUIDANCE";
  readonly title: LocalizedText;
  readonly blocks: readonly RichContentBlock[];
}

export interface TheoryArticle {
  readonly id: string;
  readonly topicIds: readonly string[];
  readonly conceptIds: readonly string[];
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly sections: readonly TheorySection[];
  readonly prerequisiteConceptIds: readonly string[];
  readonly sourceIds: readonly string[];
  readonly verificationStatus: VerificationStatus;
  readonly tags: readonly string[];
  readonly estimatedMinutes: number;
  readonly version: string;
}

export interface TheoryCheckpointOption {
  readonly id: string;
  readonly text: LocalizedText;
  readonly isCorrect: boolean;
  readonly feedback: LocalizedText;
  readonly misconceptionId?: string;
}

export interface TheoryCheckpoint {
  readonly id: string;
  readonly theoryArticleId: string;
  readonly question: LocalizedText;
  readonly explanation: LocalizedText;
  readonly options: readonly TheoryCheckpointOption[];
  readonly order: number;
}

export interface Visualization {
  readonly id: string;
  readonly type: "STATIC_DIAGRAM" | "INTERACTIVE_MEMORY_MAP" | "SEQUENCE_FLOW" | "STATE_TRANSITION";
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly configJson: string;
}

// Source Provenance
export type ProvenanceClassification =
  | "REAL_INTERVIEW_REPORT"
  | "REPEATED_INTERVIEW_PATTERN"
  | "CURATED_INTERVIEW_BANK"
  | "OFFICIAL_LANGUAGE_EDGE_CASE"
  | "BOOK_DERIVED_EXERCISE"
  | "GENERATED_PRACTICE_VARIATION";

export type ReliabilityLevel = "HIGH" | "MEDIUM" | "LOW" | "UNVERIFIED";

export interface Source {
  readonly id: string;
  readonly platform:
    | "Glassdoor"
    | "interviewing.io"
    | "LeetCode_Discuss"
    | "Reddit"
    | "Baeldung"
    | "Oracle_Java_Docs"
    | "JLS"
    | "JVMS"
    | "OpenJDK"
    | "Book";
  readonly title: string;
  readonly url?: string;
  readonly company?: string;
  readonly reliability: ReliabilityLevel;
  readonly accessedDate: string;
}

export interface SourceReference {
  readonly sourceId: string;
  readonly relationshipType: "DIRECT_REPORT" | "SPECIFICATION_AUTHORITY" | "ADAPTED_PATTERN" | "BOOK_THEORY_SUPPORT";
  readonly directQuotationUsed: boolean;
  readonly notes?: string;
}

export interface InterviewQuestion {
  readonly id: string;
  readonly slug: string;
  readonly questionText: LocalizedText;
  readonly context?: LocalizedText;
  readonly primaryTopicId: string;
  readonly relatedTopicIds: readonly string[];
  readonly requiredConceptIds: readonly string[];
  readonly tags: readonly string[];
  readonly careerDifficulty: DifficultyTier;
  readonly expectedAnswerOutline: LocalizedText;
  readonly expectedConcepts: readonly string[];
  readonly commonWeaknessPatterns: readonly LocalizedText[];
  readonly likelyFollowUpQuestionIds: readonly string[];
  readonly codeArtifactIds: readonly string[];
  readonly sourceReferences: readonly SourceReference[];
  readonly provenanceClassification: ProvenanceClassification;
  readonly verificationState: VerificationStatus;
  readonly companyContext?: {
    readonly companyName: string;
    readonly reportedRoles: readonly string[];
    readonly verified: boolean;
  };
  readonly version: string;
}

// Code Artifacts
export type CodeType =
  | "QUESTION_CODE"
  | "ANNOTATED_CODE"
  | "CORRECT_SOLUTION"
  | "COUNTER_EXAMPLE"
  | "SUPPLEMENTARY_EXAMPLE"
  | "FOLLOW_UP_CODE";

export type AnnotationCategory =
  | "WHY_IT_EXISTS"
  | "PROBLEM_IN_ORIGINAL_CODE"
  | "HOW_IT_FIXES_THE_PROBLEM"
  | "INTERVIEW_CONCEPT"
  | "TRADE_OFF"
  | "PRODUCTION_RISK"
  | "COMMON_MISTAKE";

export interface CodeAnnotation {
  readonly id: string;
  readonly startLine: number;
  readonly endLine: number;
  readonly category: AnnotationCategory;
  readonly title: LocalizedText;
  readonly explanation: LocalizedText;
  readonly problemSolved?: LocalizedText;
  readonly conceptDemonstrated?: string;
}

export interface CodeArtifact {
  readonly id: string;
  readonly type: CodeType;
  readonly language: "java";
  readonly javaVersion: "17" | "21";
  readonly title: LocalizedText;
  readonly sourceCode: string;
  readonly annotations: readonly CodeAnnotation[];
  readonly relatedQuestionIds: readonly string[];
  readonly conceptIds: readonly string[];
  readonly tags: readonly string[];
}

// Challenges
export type AssistanceLevel = "GUIDED" | "APPLIED" | "INTERVIEW";

export type ChallengeType =
  | "SEQUENCE_PUZZLE"
  | "CAUSE_EFFECT_PUZZLE"
  | "MATCHING_PUZZLE"
  | "MULTIPLE_CHOICE"
  | "MULTI_SELECT"
  | "BUG_HUNT"
  | "FIX_BUILDER"
  | "CODE_READING"
  | "OUTPUT_PREDICTION"
  | "TRADE_OFF_CHALLENGE"
  | "SHORT_ANSWER"
  | "INTERVIEW_ANSWER"
  | "REFLECTION_PROMPT";

export interface BaseChallenge {
  readonly id: string;
  readonly type: ChallengeType;
  readonly missionId: string;
  readonly stageId: string;
  readonly title: LocalizedText;
  readonly prompt: LocalizedText;
  readonly difficulty: DifficultyTier;
  readonly assistanceLevel: AssistanceLevel;
  readonly conceptIds: readonly string[];
  readonly topicIds: readonly string[];
  readonly tags: readonly string[];
  readonly sourceQuestionId?: string;
  readonly hintIds: readonly string[];
  readonly xpReward: number;
  readonly order: number;
}

export interface SequencePuzzleItem {
  readonly id: string;
  readonly text: LocalizedText;
  readonly isDistractor?: boolean;
}

export interface SequencePuzzleChallenge extends BaseChallenge {
  readonly type: "SEQUENCE_PUZZLE";
  readonly payload: {
    readonly items: readonly SequencePuzzleItem[];
    readonly correctOrderIds: readonly string[];
  };
}

export interface FixBuilderOption {
  readonly id: string;
  readonly text: LocalizedText;
  readonly isCorrect: boolean;
  readonly explanation: LocalizedText;
}

export interface FixBuilderChallenge extends BaseChallenge {
  readonly type: "FIX_BUILDER";
  readonly payload: {
    readonly baseCodeArtifactId: string;
    readonly solutionCodeArtifactId: string;
    readonly options: readonly FixBuilderOption[];
  };
}

export interface BugHuntLine {
  readonly lineNumber: number;
  readonly code: string;
  readonly isBug: boolean;
  readonly explanation: LocalizedText;
}

export interface BugHuntChallenge extends BaseChallenge {
  readonly type: "BUG_HUNT";
  readonly payload: {
    readonly baseCodeArtifactId: string;
    readonly solutionCodeArtifactId: string;
    readonly codeSnippet: string;
    readonly lines: readonly BugHuntLine[];
  };
}

export interface ExpectedConceptKeyword {
  readonly id: string;
  readonly label: LocalizedText;
  readonly keywords: readonly string[];
}

export interface InterviewAnswerChallenge extends BaseChallenge {
  readonly type: "INTERVIEW_ANSWER";
  readonly payload: {
    readonly targetQuestionId: string;
    readonly rubricDimensions: readonly string[];
    readonly expectedConcepts: readonly ExpectedConceptKeyword[];
    readonly modelAnswer30s: LocalizedText;
    readonly modelAnswerDetailed: LocalizedText;
    readonly modelAnswerTradeOffs: LocalizedText;
    readonly followUpQuestionText: LocalizedText;
    readonly followUpModelAnswerText: LocalizedText;
  };
}

export type Challenge =
  | SequencePuzzleChallenge
  | FixBuilderChallenge
  | BugHuntChallenge
  | InterviewAnswerChallenge
  | BaseChallenge;

// Hints
export interface Hint {
  readonly id: string;
  readonly challengeId: string;
  readonly level: 1 | 2 | 3 | 4;
  readonly text: LocalizedText;
  readonly xpPenalty: number;
  readonly order: number;
}

// User Persistence Models
export type ConfidenceLevel = "CONFIDENT" | "UNSURE" | "GUESSING";

export interface EvaluationResult {
  readonly correctness: "CORRECT" | "PARTIALLY_CORRECT" | "INCORRECT";
  readonly score: number; // 0.0 - 1.0
  readonly feedback: LocalizedText;
  readonly matchedConceptIds: readonly string[];
  readonly missingConceptIds: readonly string[];
  readonly detectedMistakePatternIds: readonly string[];
}

export interface UserAttempt {
  readonly id?: number;
  readonly userId: string;
  readonly challengeId: string;
  readonly missionId: string;
  readonly stageId: string;
  readonly challengeType: ChallengeType;
  readonly answerPayloadJson: string;
  readonly submittedAt: string;
  readonly durationMs: number;
  readonly confidence: ConfidenceLevel;
  readonly hintsUsedCount: number;
  readonly hintsUsedIds: readonly string[];
  readonly evaluation: EvaluationResult;
  readonly xpAwarded: number;
}

export type MissionState = "NOT_STARTED" | "LEARNING" | "PRACTICING" | "INTERVIEW_READY" | "MASTERED";

export interface MissionProgress {
  readonly userId: string;
  readonly missionId: string;
  readonly state: MissionState;
  readonly currentStageId: string;
  readonly completedStageIds: readonly string[];
  readonly hypothesisText?: string;
  readonly startedAt: string;
  readonly lastActivityAt: string;
  readonly completedAt?: string;
  readonly masteredAt?: string;
  readonly completionPercentage: number;
  readonly bestScore: number;
  readonly totalAttempts: number;
}

export type MasteryState = "UNSEEN" | "EXPOSED" | "DEVELOPING" | "RELIABLE" | "INTERVIEW_READY" | "MASTERED";

export interface ConceptMastery {
  readonly userId: string;
  readonly conceptId: string;
  readonly score: number;
  readonly independentCorrectAttempts: number;
  readonly confidentIncorrectAttempts: number;
  readonly lastPracticedAt: string;
  readonly nextReviewDueAt: string;
  readonly state: MasteryState;
}

export interface MistakePattern {
  readonly id: string;
  readonly code: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly conceptIds: readonly string[];
  readonly exampleIncorrectReasoning: LocalizedText;
  readonly correctedReasoning: LocalizedText;
  readonly remediationMissionIds: readonly string[];
}

export interface UserMistakeRecord {
  readonly id?: number;
  readonly userId: string;
  readonly mistakePatternId: string;
  readonly occurrenceCount: number;
  readonly confidentMistakeCount: number;
  readonly lastSeenAt: string;
  readonly resolved: boolean;
}

export interface ReviewItem {
  readonly id?: number;
  readonly userId: string;
  readonly conceptId: string;
  readonly missionId: string;
  readonly dueAt: string;
  readonly intervalDays: number;
  readonly reviewReason: "INCORRECT_ANSWER" | "CONFIDENT_MISTAKE" | "SCHEDULED_RETENTION";
  readonly attemptsCount: number;
  readonly status: "DUE" | "COMPLETED";
}

export interface ReflectionNote {
  readonly id?: number;
  readonly userId: string;
  readonly missionId: string;
  readonly responseText: string;
  readonly createdAt: string;
}

export interface UserPreferences {
  readonly userId: string;
  readonly languageMode: LanguageMode;
  readonly reducedMotion: boolean;
  readonly codeCommentsMode: "CLEAN" | "ANNOTATED";
  readonly timerEnabled: boolean;
  readonly theme: "DARK_TECHNICAL";
  readonly schemaVersion: number;
}
