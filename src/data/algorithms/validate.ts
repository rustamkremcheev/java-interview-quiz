import { LocalizedText } from '../../types/domain';
import {
  generateMosaicFromSolution,
  requiredTileId
} from '../../lib/algorithmLab/mosaicGenerator';
import { validateMosaicAssembly } from '../../lib/algorithmLab/mosaicValidator';
import {
  CONTAINS_DUPLICATE_BLUEPRINT,
  CONTAINS_DUPLICATE_CLARIFY,
  CONTAINS_DUPLICATE_HINTS,
  CONTAINS_DUPLICATE_MOSAIC,
  CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS,
  CONTAINS_DUPLICATE_PROBLEM,
  CONTAINS_DUPLICATE_SOLUTIONS,
  CONTAINS_DUPLICATE_STRATEGIES,
  CONTAINS_DUPLICATE_TRACE_MAIN,
  resolveContainsDuplicateMosaic
} from './containsDuplicate';
import { ALGORITHM_PROBLEMS, PLANNED_ALGORITHM_PREVIEWS } from './registry';
import {
  FIXTURE_LINEAR_SEARCH_DISTRACTORS,
  FIXTURE_LINEAR_SEARCH_SOLUTION
} from './__fixtures__/linearSearchSolution';

function hasBoth(text: LocalizedText | undefined, path: string, errors: string[]): void {
  if (!text?.en?.trim()) errors.push(`Missing EN at ${path}`);
  if (!text?.ru?.trim()) errors.push(`Missing RU at ${path}`);
}

function assertUnique(ids: string[], label: string, errors: string[]): void {
  const seen = new Map<string, number>();
  for (const id of ids) seen.set(id, (seen.get(id) ?? 0) + 1);
  for (const [id, count] of seen) {
    if (count > 1) errors.push(`Duplicate ${label} '${id}'`);
  }
}

function validateSolutionsAndMosaic(errors: string[]): void {
  const strategies = CONTAINS_DUPLICATE_STRATEGIES;
  const strategyIds = new Set(strategies.map((s) => s.id));
  const solutions = CONTAINS_DUPLICATE_SOLUTIONS;

  assertUnique(solutions.map((s) => s.id), 'AlgorithmSolution.id', errors);

  for (const solution of solutions) {
    if (!solution.canonicalCode?.trim()) {
      errors.push(`AlgorithmSolution ${solution.id} has empty canonicalCode`);
    }
    if (solution.language !== 'JAVA') {
      errors.push(`AlgorithmSolution ${solution.id} language must be JAVA`);
    }
    if (!solution.javaVersion?.trim()) {
      errors.push(`AlgorithmSolution ${solution.id} missing javaVersion`);
    }
    if (!Number.isInteger(solution.version) || solution.version < 1) {
      errors.push(`AlgorithmSolution ${solution.id} has invalid version`);
    }
    if (!strategyIds.has(solution.strategyId)) {
      errors.push(`AlgorithmSolution ${solution.id} references unknown strategy ${solution.strategyId}`);
    }

    let generated;
    try {
      generated = generateMosaicFromSolution(solution, {
        mosaicId: `mos_validate_${solution.id}`,
        distractors:
          solution.id === 'sol_contains_duplicate_hashset'
            ? CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS
            : [],
        alternativeNote: { en: 'n/a', ru: 'n/a' },
        difficulty: 'MEDIUM'
      });
    } catch (err) {
      errors.push(
        `Mosaic generation failed for ${solution.id}: ${err instanceof Error ? err.message : String(err)}`
      );
      continue;
    }

    assertUnique(generated.requiredTiles.map((t) => t.id), 'generated required tile', errors);
    assertUnique([...generated.solutionOrder], 'generated solutionOrder', errors);

    if (generated.requiredTiles.length !== generated.solutionOrder.length) {
      errors.push(`${solution.id}: requiredTiles length != solutionOrder length`);
    }

    for (let i = 0; i < generated.requiredTiles.length; i += 1) {
      const tile = generated.requiredTiles[i];
      const expectedId = requiredTileId(solution.id, i);
      if (tile.id !== expectedId) {
        errors.push(`${solution.id}: unstable tile id at ${i}: got ${tile.id}, expected ${expectedId}`);
      }
      if (generated.solutionOrder[i] !== tile.id) {
        errors.push(`${solution.id}: solutionOrder[${i}] != requiredTiles[${i}].id`);
      }
      if (tile.role !== 'REQUIRED') {
        errors.push(`${solution.id}: generated tile ${tile.id} is not REQUIRED`);
      }
    }

    const braceTiles = generated.requiredTiles.filter((t) => t.code === '}');
    const braceIds = new Set(braceTiles.map((t) => t.id));
    if (braceTiles.length > 1 && braceIds.size !== braceTiles.length) {
      errors.push(`${solution.id}: duplicate IDs among identical '}' tiles`);
    }
  }

  const distractors = CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS;
  assertUnique(distractors.map((d) => d.id), 'distractor', errors);

  let mosaic;
  try {
    mosaic = resolveContainsDuplicateMosaic('strat_cd_hashset');
  } catch (err) {
    errors.push(
      `Selected Mosaic solution missing/failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return;
  }

  if (mosaic.solutionId !== 'sol_contains_duplicate_hashset') {
    errors.push('Selected Mosaic solution must be sol_contains_duplicate_hashset for this slice');
  }
  if (mosaic.solutionOrder.length !== 9) {
    errors.push(`Expected 9 generated mosaic lines, got ${mosaic.solutionOrder.length}`);
  }

  const generatedIds = new Set(mosaic.solutionOrder);
  for (const d of distractors) {
    if (generatedIds.has(d.id)) {
      errors.push(`Distractor ${d.id} collides with generated solutionOrder`);
    }
    if (mosaic.solutionOrder.includes(d.id)) {
      errors.push(`Distractor ${d.id} appears in generated solutionOrder`);
    }
    hasBoth(d.explanation, `${d.id}.explanation`, errors);
  }

  assertUnique(mosaic.tiles.map((t) => t.id), 'mosaic tile', errors);

  // Behavioral checks on the closed validator
  if (!validateMosaicAssembly(mosaic.solutionOrder, mosaic).correct) {
    errors.push('Canonical generated order must validate as correct');
  }
  if (mosaic.solutionOrder.length >= 2) {
    const swapped = [...mosaic.solutionOrder];
    [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
    if (validateMosaicAssembly(swapped, mosaic).correct) {
      errors.push('Swapped required lines must fail validation');
    }
  }
  if (distractors[0]) {
    const withDistractor = [...mosaic.solutionOrder, distractors[0].id];
    if (validateMosaicAssembly(withDistractor, mosaic).correct) {
      errors.push('Assembly with distractor must fail validation');
    }
  }
  if (mosaic.solutionOrder.length > 0) {
    const missing = mosaic.solutionOrder.slice(0, -1);
    if (validateMosaicAssembly(missing, mosaic).correct) {
      errors.push('Missing required line must fail validation');
    }
  }

  // Constant export must match resolver for default strategy
  if (CONTAINS_DUPLICATE_MOSAIC.solutionOrder.join('|') !== mosaic.solutionOrder.join('|')) {
    errors.push('CONTAINS_DUPLICATE_MOSAIC constant diverges from resolver');
  }
}

function validateSyntheticFixture(errors: string[]): void {
  let puzzle;
  try {
    puzzle = generateMosaicFromSolution(FIXTURE_LINEAR_SEARCH_SOLUTION, {
      mosaicId: 'mos_fixture_linear_search',
      distractors: FIXTURE_LINEAR_SEARCH_DISTRACTORS,
      alternativeNote: { en: 'fixture', ru: 'fixture' },
      difficulty: 'MEDIUM'
    });
  } catch (err) {
    errors.push(
      `Synthetic fixture generation failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return;
  }

  if (puzzle.solutionId !== 'sol_fixture_linear_search') {
    errors.push('Fixture mosaic must keep its own solutionId');
  }
  if (puzzle.solutionOrder[0] !== 'sol_fixture_linear_search_line_001') {
    errors.push('Fixture IDs must be stable and fixture-specific');
  }
  if (puzzle.requiredTiles.some((t) => t.id.startsWith('sol_contains_duplicate'))) {
    errors.push('Fixture mosaic must not reuse Contains Duplicate tile IDs');
  }
  if (!validateMosaicAssembly(puzzle.solutionOrder, puzzle).correct) {
    errors.push('Fixture canonical order must validate');
  }
  // Expected line count for the tiny linear-search method (blank lines stripped)
  if (puzzle.solutionOrder.length !== 8) {
    errors.push(`Fixture expected 8 lines, got ${puzzle.solutionOrder.length}`);
  }
}

export function validateAlgorithmLabContent(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  assertUnique(ALGORITHM_PROBLEMS.map((p) => p.id), 'AlgorithmProblem.id', errors);
  assertUnique(ALGORITHM_PROBLEMS.map((p) => p.slug), 'AlgorithmProblem.slug', errors);

  for (const problem of ALGORITHM_PROBLEMS) {
    hasBoth(problem.title, `${problem.id}.title`, errors);
    hasBoth(problem.statement, `${problem.id}.statement`, errors);
    hasBoth(problem.provenanceNote, `${problem.id}.provenance`, errors);
    assertUnique(problem.stages.map((s) => s.id), 'stage', errors);
    for (const stage of problem.stages) {
      hasBoth(stage.title, `${stage.id}.title`, errors);
    }

    const companyClaim = /\b(appeared at|asked at|from (Google|Meta|Amazon|Apple|Netflix|Citi|Bloomberg))\b/i;
    const blob = `${problem.title.en} ${problem.statement.en} ${problem.provenanceNote.en}`;
    if (companyClaim.test(blob)) {
      errors.push(`${problem.id} has unverified company attribution`);
    }
  }

  const strategies = CONTAINS_DUPLICATE_STRATEGIES;
  assertUnique(strategies.map((s) => s.id), 'strategy', errors);
  for (const s of strategies) {
    hasBoth(s.title, `${s.id}.title`, errors);
    hasBoth(s.description, `${s.id}.description`, errors);
  }

  const bp = CONTAINS_DUPLICATE_BLUEPRINT;
  assertUnique(bp.nodes.map((n) => n.id), 'blueprint node', errors);
  for (const id of bp.solutionOrder) {
    const node = bp.nodes.find((n) => n.id === id);
    if (!node) errors.push(`Blueprint solution references missing node ${id}`);
    else if (node.role !== 'REQUIRED') errors.push(`Blueprint solution includes non-required ${id}`);
  }
  for (const node of bp.nodes) {
    if (node.role === 'DISTRACTOR' && bp.solutionOrder.includes(node.id)) {
      errors.push(`Distractor ${node.id} appears in solutionOrder`);
    }
  }

  validateSolutionsAndMosaic(errors);
  validateSyntheticFixture(errors);

  const trace = CONTAINS_DUPLICATE_TRACE_MAIN;
  for (const step of trace.steps) {
    if (step.index > 0 && JSON.stringify(step.setBefore) !== JSON.stringify(trace.steps[step.index - 1].setAfter)) {
      errors.push(`Trace step ${step.id} setBefore does not match previous setAfter`);
    }
  }
  if (trace.input[3] !== 4) {
    errors.push('Primary trace must use second 4 as duplicate');
  }
  const last = trace.steps[trace.steps.length - 1];
  if (last?.operation !== 'DUPLICATE_FOUND' || last.returns !== true) {
    errors.push('Primary trace must end with duplicate found → true');
  }

  for (const q of CONTAINS_DUPLICATE_CLARIFY) {
    hasBoth(q.prompt, `${q.id}.prompt`, errors);
    if (!q.options.some((o) => o.isCorrect)) errors.push(`Clarify ${q.id} has no correct option`);
  }

  for (const h of CONTAINS_DUPLICATE_HINTS) {
    hasBoth(h.text, `${h.id}.text`, errors);
  }

  for (const preview of PLANNED_ALGORITHM_PREVIEWS) {
    if (ALGORITHM_PROBLEMS.some((p) => p.slug === preview.slug)) {
      errors.push(`Planned preview slug collides with available problem ${preview.slug}`);
    }
  }

  if (CONTAINS_DUPLICATE_PROBLEM.slug !== 'contains-duplicate') {
    errors.push('Contains Duplicate slug must be contains-duplicate');
  }

  if (errors.length > 0) {
    console.error('Algorithm Lab validation errors:', errors);
  }

  return { isValid: errors.length === 0, errors };
}

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  validateAlgorithmLabContent();
}
