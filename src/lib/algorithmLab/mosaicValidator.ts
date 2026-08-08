import { MosaicPuzzle } from '../../types/algorithmLab';

export type MosaicValidationFailureReason =
  | 'ORDER_MISMATCH'
  | 'DISTRACTOR_PRESENT'
  | 'MISSING_REQUIRED'
  | 'EXTRA_TILE'
  | 'UNKNOWN_TILE';

export interface MosaicValidationResult {
  readonly correct: boolean;
  readonly reason?: MosaicValidationFailureReason;
  /** First distractor id on the rail, if any. */
  readonly distractorId?: string;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/**
 * Closed-puzzle check: assembled required IDs must exactly equal generated solutionOrder.
 * No Java parsing, string heuristics, or compilation.
 */
export function validateMosaicAssembly(
  assembledIds: readonly string[],
  puzzle: Pick<MosaicPuzzle, 'solutionOrder' | 'tiles'>
): MosaicValidationResult {
  const distractorIds = new Set(
    puzzle.tiles.filter((t) => t.role !== 'REQUIRED').map((t) => t.id)
  );
  const requiredSet = new Set(puzzle.solutionOrder);
  const knownIds = new Set(puzzle.tiles.map((t) => t.id));

  for (const id of assembledIds) {
    if (!knownIds.has(id)) {
      return { correct: false, reason: 'UNKNOWN_TILE' };
    }
  }

  const distractorsOnRail = assembledIds.filter((id) => distractorIds.has(id));
  if (distractorsOnRail.length > 0) {
    return {
      correct: false,
      reason: 'DISTRACTOR_PRESENT',
      distractorId: distractorsOnRail[0]
    };
  }

  for (const id of assembledIds) {
    if (!requiredSet.has(id)) {
      return { correct: false, reason: 'EXTRA_TILE' };
    }
  }

  if (assembledIds.length < puzzle.solutionOrder.length) {
    return { correct: false, reason: 'MISSING_REQUIRED' };
  }

  if (assembledIds.length > puzzle.solutionOrder.length) {
    return { correct: false, reason: 'EXTRA_TILE' };
  }

  if (!arraysEqual(assembledIds, puzzle.solutionOrder)) {
    return { correct: false, reason: 'ORDER_MISMATCH' };
  }

  return { correct: true };
}
