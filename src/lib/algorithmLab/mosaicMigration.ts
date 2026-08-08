import { MosaicPuzzle, WorkshopProgress } from '../../types/algorithmLab';

/**
 * Migration decision (Contains Duplicate HashSet v1):
 *
 * Pre-generator Mosaic used hand-authored IDs (`mos_cd_sig`, …).
 * Generator now emits deterministic `sol_*_line_NNN` IDs.
 *
 * On load we:
 * 1. Map known legacy required + distractor IDs → current IDs when possible
 * 2. Drop unknown IDs (never crash)
 * 3. If solutionId/version mismatch or no mappable placement remains after
 *    filtering orphaned required IDs inconsistently — reset only mosaic
 *    placement fields while preserving the rest of workshop progress
 *
 * Unrelated progress (clarify, strategy, blueprint, trace, hints) is kept.
 */

/** Legacy required tile IDs → generated line IDs for sol_contains_duplicate_hashset v1. */
export const LEGACY_CONTAINS_DUPLICATE_HASHSET_TILE_MAP: Readonly<Record<string, string>> = {
  mos_cd_sig: 'sol_contains_duplicate_hashset_line_001',
  mos_cd_init: 'sol_contains_duplicate_hashset_line_002',
  mos_cd_for: 'sol_contains_duplicate_hashset_line_003',
  mos_cd_if: 'sol_contains_duplicate_hashset_line_004',
  mos_cd_true: 'sol_contains_duplicate_hashset_line_005',
  mos_cd_if_close: 'sol_contains_duplicate_hashset_line_006',
  mos_cd_for_close: 'sol_contains_duplicate_hashset_line_007',
  mos_cd_false: 'sol_contains_duplicate_hashset_line_008',
  mos_cd_method_close: 'sol_contains_duplicate_hashset_line_009',
  // Distractors keep stable authored ids; listed for completeness / passthrough
  mos_cd_d_sort: 'mos_cd_d_sort',
  mos_cd_d_len: 'mos_cd_d_len',
  mos_cd_d_clear: 'mos_cd_d_clear',
  mos_cd_d_false_loop: 'mos_cd_d_false_loop',
  mos_cd_d_add_true: 'mos_cd_d_add_true',
  mos_cd_d_prim: 'mos_cd_d_prim',
  mos_cd_d_list: 'mos_cd_d_list',
  mos_cd_d_nested: 'mos_cd_d_nested'
};

function mapTileId(id: string, puzzle: MosaicPuzzle): string | null {
  const known = new Set(puzzle.tiles.map((t) => t.id));
  if (known.has(id)) return id;

  const mapped = LEGACY_CONTAINS_DUPLICATE_HASHSET_TILE_MAP[id];
  if (mapped && known.has(mapped)) return mapped;

  return null;
}

function remapIds(ids: readonly string[], puzzle: MosaicPuzzle): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    const next = mapTileId(id, puzzle);
    if (!next || seen.has(next)) continue;
    seen.add(next);
    out.push(next);
  }
  return out;
}

export function sanitizeMosaicProgress(
  progress: WorkshopProgress,
  puzzle: MosaicPuzzle
): WorkshopProgress {
  const solutionMismatch =
    (progress.mosaicSolutionId != null && progress.mosaicSolutionId !== puzzle.solutionId) ||
    (progress.mosaicSolutionVersion != null &&
      progress.mosaicSolutionVersion !== puzzle.solutionVersion);

  if (solutionMismatch) {
    return {
      ...progress,
      mosaicOrder: [],
      mosaicDiscardedIds: [],
      mosaicSolutionId: puzzle.solutionId,
      mosaicSolutionVersion: puzzle.solutionVersion
    };
  }

  const hadLegacyIds =
    progress.mosaicOrder.some((id) => id in LEGACY_CONTAINS_DUPLICATE_HASHSET_TILE_MAP) ||
    progress.mosaicDiscardedIds.some((id) => id in LEGACY_CONTAINS_DUPLICATE_HASHSET_TILE_MAP);

  const mosaicOrder = remapIds(progress.mosaicOrder, puzzle);
  const mosaicDiscardedIds = remapIds(progress.mosaicDiscardedIds, puzzle).filter(
    (id) => !mosaicOrder.includes(id)
  );

  const known = new Set(puzzle.tiles.map((t) => t.id));
  const droppedUnknown =
    progress.mosaicOrder.some((id) => mapTileId(id, puzzle) == null) ||
    progress.mosaicDiscardedIds.some((id) => mapTileId(id, puzzle) == null);

  // If legacy remap produced nothing while user had placement, keep empty (safe reset of mosaic only).
  const shouldStampSolution =
    progress.mosaicSolutionId !== puzzle.solutionId ||
    progress.mosaicSolutionVersion !== puzzle.solutionVersion ||
    hadLegacyIds ||
    droppedUnknown;

  return {
    ...progress,
    mosaicOrder,
    mosaicDiscardedIds,
    mosaicSolutionId: shouldStampSolution ? puzzle.solutionId : progress.mosaicSolutionId ?? puzzle.solutionId,
    mosaicSolutionVersion: shouldStampSolution
      ? puzzle.solutionVersion
      : progress.mosaicSolutionVersion ?? puzzle.solutionVersion
  };
}
