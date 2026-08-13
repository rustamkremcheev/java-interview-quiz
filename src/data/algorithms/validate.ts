import { LocalizedText } from '../../types/domain';
import { generateMosaicFromSolution, requiredTileId } from '../../lib/algorithmLab/mosaicGenerator';
import { validateMosaicAssembly } from '../../lib/algorithmLab/mosaicValidator';
import { ALL_WORKSHOP_PACKS } from './packs/catalog';
import { ALGORITHM_PATTERN_FAMILIES } from './patterns';
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

const VALID_DIFFICULTIES = new Set(['EASY', 'MEDIUM', 'HARD']);
const PATTERN_IDS = new Set(ALGORITHM_PATTERN_FAMILIES.map((p) => p.id));

function validatePack(pack: (typeof ALL_WORKSHOP_PACKS)[number], errors: string[]): void {
  const problem = pack.problem;
  const prefix = problem.id;

  hasBoth(problem.title, `${prefix}.title`, errors);
  hasBoth(problem.statement, `${prefix}.statement`, errors);
  hasBoth(problem.summary, `${prefix}.summary`, errors);
  hasBoth(problem.provenanceNote, `${prefix}.provenance`, errors);
  if (!VALID_DIFFICULTIES.has(problem.difficulty)) {
    errors.push(`${prefix}: invalid difficulty ${problem.difficulty}`);
  }
  if (!PATTERN_IDS.has(problem.patternFamilyId)) {
    errors.push(`${prefix}: unknown patternFamilyId ${problem.patternFamilyId}`);
  }
  if (problem.stages.length !== 6) {
    errors.push(`${prefix}: expected 6 stages`);
  }

  const companyClaim = /\b(appeared at|asked at|from (Google|Meta|Amazon|Apple|Netflix|Citi|Bloomberg|JPMorgan))\b/i;
  const blob = `${problem.title.en} ${problem.statement.en} ${problem.provenanceNote.en}`;
  if (companyClaim.test(blob)) {
    errors.push(`${prefix} has unverified company attribution`);
  }

  assertUnique(pack.strategies.map((s) => s.id), `${prefix} strategy`, errors);
  const strategyIds = new Set(pack.strategies.map((s) => s.id));
  if (!strategyIds.has(pack.targetStrategyId)) {
    errors.push(`${prefix}: targetStrategyId missing from strategies`);
  }
  const target = pack.strategies.find((s) => s.id === pack.targetStrategyId);
  if (target && !target.unlocksBlueprint) {
    errors.push(`${prefix}: target strategy must unlocksBlueprint`);
  }

  for (const s of pack.strategies) {
    hasBoth(s.title, `${s.id}.title`, errors);
    hasBoth(s.description, `${s.id}.description`, errors);
  }

  assertUnique(pack.blueprint.nodes.map((n) => n.id), `${prefix} blueprint node`, errors);
  for (const id of pack.blueprint.solutionOrder) {
    const node = pack.blueprint.nodes.find((n) => n.id === id);
    if (!node) errors.push(`${prefix}: blueprint missing node ${id}`);
    else if (node.role !== 'REQUIRED') errors.push(`${prefix}: blueprint solution includes non-required ${id}`);
  }

  assertUnique(pack.solutions.map((s) => s.id), `${prefix} solution`, errors);
  if (pack.solutions.length < 1) {
    errors.push(`${prefix}: needs at least one AlgorithmSolution`);
  }

  for (const solution of pack.solutions) {
    if (!solution.canonicalCode?.trim()) {
      errors.push(`${solution.id}: empty canonicalCode`);
    }
    if (solution.language !== 'JAVA' || !solution.javaVersion?.trim()) {
      errors.push(`${solution.id}: invalid Java metadata`);
    }
    if (!strategyIds.has(solution.strategyId)) {
      errors.push(`${solution.id}: unknown strategy ${solution.strategyId}`);
    }
  }

  assertUnique(pack.distractors.map((d) => d.id), `${prefix} distractor`, errors);
  for (const d of pack.distractors) {
    hasBoth(d.explanation, `${d.id}.explanation`, errors);
  }

  let mosaic;
  try {
    mosaic = pack.resolveMosaic(pack.targetStrategyId);
  } catch (err) {
    errors.push(
      `${prefix}: mosaic generation failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return;
  }

  assertUnique(mosaic.tiles.map((t) => t.id), `${prefix} mosaic tile`, errors);
  assertUnique([...mosaic.solutionOrder], `${prefix} solutionOrder`, errors);

  for (let i = 0; i < mosaic.solutionOrder.length; i += 1) {
    const expected = requiredTileId(mosaic.solutionId, i);
    if (mosaic.solutionOrder[i] !== expected) {
      errors.push(`${prefix}: unstable generated id at ${i}`);
    }
  }

  const generated = new Set(mosaic.solutionOrder);
  for (const d of pack.distractors) {
    if (generated.has(d.id)) {
      errors.push(`${prefix}: distractor ${d.id} collides with generated order`);
    }
  }

  if (!validateMosaicAssembly(mosaic.solutionOrder, mosaic).correct) {
    errors.push(`${prefix}: canonical mosaic order must validate`);
  }
  if (mosaic.solutionOrder.length >= 2) {
    const swapped = [...mosaic.solutionOrder];
    [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
    if (validateMosaicAssembly(swapped, mosaic).correct) {
      errors.push(`${prefix}: swapped mosaic order must fail`);
    }
  }

  const trace = pack.trace;
  if (!trace.kind) errors.push(`${prefix}: trace missing kind`);
  if (trace.steps.length < 1) errors.push(`${prefix}: trace needs steps`);
  for (const step of trace.steps) {
    hasBoth(step.title, `${step.id}.title`, errors);
    hasBoth(step.question, `${step.id}.question`, errors);
    if (!step.choices.some((c) => c.id === step.correctChoiceId)) {
      errors.push(`${step.id}: correctChoiceId not in choices`);
    }
  }
  if (!trace.followUpChoices.some((c) => c.id === trace.followUpCorrectChoiceId)) {
    errors.push(`${prefix}: follow-up correct choice missing`);
  }

  for (const q of pack.clarify) {
    hasBoth(q.prompt, `${q.id}.prompt`, errors);
    if (!q.options.some((o) => o.isCorrect)) errors.push(`${q.id}: no correct option`);
  }
  for (const h of pack.hints) {
    hasBoth(h.text, `${h.id}.text`, errors);
  }
  hasBoth(pack.summary.corePattern, `${prefix}.summary.corePattern`, errors);
  hasBoth(pack.reflectionPrompt, `${prefix}.reflection`, errors);
}

function validateSyntheticFixture(errors: string[]): void {
  try {
    const puzzle = generateMosaicFromSolution(FIXTURE_LINEAR_SEARCH_SOLUTION, {
      mosaicId: 'mos_fixture_linear_search',
      distractors: FIXTURE_LINEAR_SEARCH_DISTRACTORS,
      alternativeNote: { en: 'fixture', ru: 'fixture' },
      difficulty: 'MEDIUM'
    });
    if (puzzle.solutionOrder.length !== 8) {
      errors.push(`Fixture expected 8 lines, got ${puzzle.solutionOrder.length}`);
    }
    if (!validateMosaicAssembly(puzzle.solutionOrder, puzzle).correct) {
      errors.push('Fixture canonical order must validate');
    }
  } catch (err) {
    errors.push(`Synthetic fixture failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export function validateAlgorithmLabContent(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  assertUnique(ALGORITHM_PROBLEMS.map((p) => p.id), 'AlgorithmProblem.id', errors);
  assertUnique(ALGORITHM_PROBLEMS.map((p) => p.slug), 'AlgorithmProblem.slug', errors);

  if (ALL_WORKSHOP_PACKS.length !== 12) {
    errors.push(`Expected 12 workshop packs, found ${ALL_WORKSHOP_PACKS.length}`);
  }

  for (const pack of ALL_WORKSHOP_PACKS) {
    validatePack(pack, errors);
  }

  validateSyntheticFixture(errors);

  for (const preview of PLANNED_ALGORITHM_PREVIEWS) {
    if (ALGORITHM_PROBLEMS.some((p) => p.slug === preview.slug)) {
      errors.push(`Planned preview slug collides with available problem ${preview.slug}`);
    }
  }

  if (errors.length > 0) {
    console.error('Algorithm Lab validation errors:', errors);
  }

  return { isValid: errors.length === 0, errors };
}

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  validateAlgorithmLabContent();
}
