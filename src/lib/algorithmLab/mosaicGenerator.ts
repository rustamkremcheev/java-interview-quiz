import type {
  AlgorithmSolution,
  LocalizedText,
  MosaicDifficulty,
  MosaicDistractor,
  MosaicPuzzle,
  MosaicTile
} from '../../types/algorithmLab';

export interface ParsedCanonicalLine {
  readonly originalIndex: number;
  readonly code: string;
  readonly indentationLevel: number;
}

export interface GenerateMosaicOptions {
  readonly mosaicId: string;
  readonly distractors?: readonly MosaicDistractor[];
  readonly alternativeNote: LocalizedText;
  /** Production default is MEDIUM (one logical Java line per tile). */
  readonly difficulty?: MosaicDifficulty;
  /**
   * Optional presentation shuffle. Defaults to identity — UI may shuffle.
   * Tests can inject a deterministic shuffle.
   */
  readonly shufflePresentation?: <T>(items: readonly T[]) => T[];
}

export interface GeneratedMosaicPuzzle extends MosaicPuzzle {
  readonly requiredTiles: readonly MosaicTile[];
  readonly presentationTiles: readonly MosaicTile[];
}

const DEFAULT_REQUIRED_EXPLANATION: LocalizedText = {
  en: 'Required line from the canonical solution.',
  ru: 'Обязательная строка канонического решения.'
};

/**
 * Normalize endings and split into non-empty logical lines.
 * Blank formatting-only lines are dropped from the puzzle.
 */
export function parseCanonicalLines(canonicalCode: string): ParsedCanonicalLine[] {
  const normalized = canonicalCode.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawLines = normalized.split('\n');
  const result: ParsedCanonicalLine[] = [];

  for (const raw of rawLines) {
    if (raw.trim().length === 0) continue;
    const indentationLevel = measureIndentationLevel(raw);
    result.push({
      originalIndex: result.length,
      code: raw.trimStart().replace(/\s+$/g, ''),
      indentationLevel
    });
  }

  return result;
}

/** 4 spaces (or one tab) = one indent level — matches existing Mosaic UI. */
export function measureIndentationLevel(line: string): number {
  let spaces = 0;
  for (const ch of line) {
    if (ch === ' ') spaces += 1;
    else if (ch === '\t') spaces += 4;
    else break;
  }
  return Math.floor(spaces / 4);
}

export function requiredTileId(solutionId: string, lineIndex: number): string {
  return `${solutionId}_line_${String(lineIndex + 1).padStart(3, '0')}`;
}

/**
 * Build REQUIRED tiles + solutionOrder from a canonical AlgorithmSolution.
 * Distractors are mixed into the tile catalog; presentation may be shuffled.
 *
 * EASY/HARD are reserved extension points — only MEDIUM is implemented.
 */
export function generateMosaicFromSolution(
  solution: AlgorithmSolution,
  options: GenerateMosaicOptions
): GeneratedMosaicPuzzle {
  const difficulty = options.difficulty ?? 'MEDIUM';
  if (difficulty !== 'MEDIUM') {
    throw new Error(
      `Mosaic difficulty '${difficulty}' is not implemented yet. Use MEDIUM (line-based).`
    );
  }

  if (!solution.canonicalCode?.trim()) {
    throw new Error(`AlgorithmSolution '${solution.id}' has empty canonicalCode`);
  }

  const lines = parseCanonicalLines(solution.canonicalCode);
  if (lines.length === 0) {
    throw new Error(`AlgorithmSolution '${solution.id}' produced zero mosaic lines`);
  }

  const requiredTiles: MosaicTile[] = lines.map((line) => ({
    id: requiredTileId(solution.id, line.originalIndex),
    code: line.code,
    indent: line.indentationLevel,
    role: 'REQUIRED' as const,
    explanation: DEFAULT_REQUIRED_EXPLANATION,
    originalIndex: line.originalIndex
  }));

  const solutionOrder = requiredTiles.map((t) => t.id);
  const distractors = options.distractors ?? [];

  for (const d of distractors) {
    if (solutionOrder.includes(d.id)) {
      throw new Error(`Distractor id '${d.id}' collides with generated solutionOrder`);
    }
  }

  const distractorTiles: MosaicTile[] = distractors.map((d) => ({
    id: d.id,
    code: d.code,
    indent: d.indent,
    role: d.role,
    explanation: d.explanation
  }));

  // Canonical catalog: required in order, then authored distractors (immutable order).
  const catalogTiles: MosaicTile[] = [...requiredTiles, ...distractorTiles];
  const shuffle = options.shufflePresentation ?? (<T>(items: readonly T[]) => [...items]);
  const presentationTiles = shuffle(catalogTiles);

  return {
    id: options.mosaicId,
    problemId: solution.problemId,
    strategyId: solution.strategyId,
    solutionId: solution.id,
    solutionVersion: solution.version,
    difficulty,
    tiles: catalogTiles,
    requiredTiles,
    solutionOrder,
    presentationTiles,
    alternativeNote: options.alternativeNote
  };
}

export function resolveSolutionForStrategy(
  solutions: readonly AlgorithmSolution[],
  strategyId: string | undefined,
  fallbackStrategyId?: string
): AlgorithmSolution {
  if (strategyId) {
    const match = solutions.find((s) => s.strategyId === strategyId);
    if (match) return match;
  }
  if (fallbackStrategyId) {
    const fallback = solutions.find((s) => s.strategyId === fallbackStrategyId);
    if (fallback) return fallback;
  }
  if (solutions.length === 1) return solutions[0];
  throw new Error(
    `No AlgorithmSolution for strategy '${strategyId ?? 'undefined'}' ` +
      `(available: ${solutions.map((s) => s.id).join(', ') || 'none'})`
  );
}
