export type LanguageMode = 'en' | 'ru' | 'bilingual';

export interface LocalizedText {
  en: string;
  ru: string;
}

export type StageType = 
  | 'scenario' 
  | 'primer' 
  | 'puzzle' 
  | 'bughunt' 
  | 'fixbuilder' 
  | 'tradeoff' 
  | 'interview' 
  | 'reference' 
  | 'reflection' 
  | 'results';

export interface PuzzleItem {
  id: string;
  text: LocalizedText;
  isDistractor?: boolean;
  correctOrder?: number;
}

export interface BugLine {
  lineNumber: number;
  code: string;
  isBug: boolean;
  explanation: LocalizedText;
}

export interface FixOption {
  id: string;
  text: LocalizedText;
  isCorrect: boolean;
  explanation: LocalizedText;
}

export interface TradeOffOption {
  id: string;
  text: LocalizedText;
  isCorrect: boolean;
  feedback: LocalizedText;
}

export interface ExpectedConcept {
  id: string;
  label: LocalizedText;
  keywords: string[];
}

export interface MissionStageContent {
  // Scenario stage
  scenarioTitle?: LocalizedText;
  scenarioStory?: LocalizedText;
  scenarioContext?: LocalizedText;

  // Concept Primer stage
  primerTitle?: LocalizedText;
  primerSummary?: LocalizedText;
  primerDiagramSteps?: { title: LocalizedText; desc: LocalizedText }[];

  // Guided Puzzle stage
  puzzleInstruction?: LocalizedText;
  puzzleItems?: PuzzleItem[];

  // Bug Hunt stage
  bugHuntInstruction?: LocalizedText;
  bugHuntCode?: string;
  bugHuntLines?: BugLine[];

  // Fix Builder stage
  fixBuilderInstruction?: LocalizedText;
  fixOptions?: FixOption[];

  // Trade-Off stage
  tradeOffQuestion?: LocalizedText;
  tradeOffOptions?: TradeOffOption[];

  // Interview stage
  interviewQuestion?: LocalizedText;
  expectedConcepts?: ExpectedConcept[];

  // Reference Answer stage
  referenceShortAnswer?: LocalizedText;
  referenceDetailedAnswer?: LocalizedText;
  commonMistake?: LocalizedText;
  followUpQuestion?: LocalizedText;
  followUpModelAnswer?: LocalizedText;
  modelJavaCode?: string;

  // Reflection stage
  reflectionPrompt?: LocalizedText;
}

export interface MissionStage {
  stageId: string;
  type: StageType;
  title: LocalizedText;
  hints: LocalizedText[];
  content: MissionStageContent;
}

export interface Mission {
  id: string;
  topicId: string;
  topicTitle: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  estimatedMinutes: number;
  concepts: string[];
  stages: MissionStage[];
}
