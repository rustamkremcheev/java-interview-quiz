import * as esbuild from 'esbuild';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const entry = path.resolve('scripts/mosaic-generator-bridge.ts');
const outfile = path.resolve('scripts/.tmp-mosaic-generator.mjs');

fs.writeFileSync(
  entry,
  `
import { generateMosaicFromSolution, requiredTileId } from '../src/lib/algorithmLab/mosaicGenerator';
import { validateMosaicAssembly } from '../src/lib/algorithmLab/mosaicValidator';
import { sanitizeMosaicProgress } from '../src/lib/algorithmLab/mosaicMigration';
import {
  CONTAINS_DUPLICATE_MOSAIC,
  CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS,
  CONTAINS_DUPLICATE_SOLUTIONS,
  resolveContainsDuplicateMosaic
} from '../src/data/algorithms/containsDuplicate';
import {
  FIXTURE_LINEAR_SEARCH_DISTRACTORS,
  FIXTURE_LINEAR_SEARCH_SOLUTION
} from '../src/data/algorithms/__fixtures__/linearSearchSolution';
export function run() {
  const errors = [];
  const solution = CONTAINS_DUPLICATE_SOLUTIONS[0];
  const mosaic = resolveContainsDuplicateMosaic('strat_cd_hashset');

  if (mosaic.solutionOrder.length !== 9) {
    errors.push('CD: expected 9 generated lines');
  }
  for (let i = 0; i < mosaic.solutionOrder.length; i++) {
    const expected = requiredTileId(solution.id, i);
    if (mosaic.solutionOrder[i] !== expected) errors.push('CD: unstable id at ' + i);
  }

  const braces = mosaic.tiles.filter((t) => t.role === 'REQUIRED' && t.code === '}');
  if (new Set(braces.map((t) => t.id)).size !== braces.length) {
    errors.push('CD: } tiles must have distinct IDs');
  }

  if (!validateMosaicAssembly(mosaic.solutionOrder, mosaic).correct) {
    errors.push('CD: canonical order must pass');
  }

  const swapped = [...mosaic.solutionOrder];
  [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  if (validateMosaicAssembly(swapped, mosaic).correct) errors.push('CD: swap must fail');

  const withDist = [...mosaic.solutionOrder, CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS[0].id];
  if (validateMosaicAssembly(withDist, mosaic).correct) errors.push('CD: distractor must fail');

  const missing = mosaic.solutionOrder.slice(0, -1);
  if (validateMosaicAssembly(missing, mosaic).correct) errors.push('CD: missing line must fail');

  // Legacy ID migration
  const legacy = {
    userId: 'local-user',
    problemId: 'alg_contains_duplicate',
    currentStageType: 'CODE_MOSAIC',
    completedStageTypes: [],
    strategyJustificationChipIds: [],
    strategyChanged: false,
    previousStrategyIds: [],
    clarifySelectedOptionIds: [],
    blueprintOrder: [],
    blueprintDiscardedIds: [],
    blueprintAttempts: 0,
    mosaicOrder: ['mos_cd_sig', 'mos_cd_init'],
    mosaicDiscardedIds: ['mos_cd_d_clear'],
    mosaicAttempts: 0,
    mosaicCorrectDiscards: 0,
    traceStepIndex: 0,
    traceCorrectSteps: 0,
    traceTotalAnswered: 0,
    hintsUsedByStage: {},
    reflectionText: '',
    masteryState: 'ASSEMBLING',
    markedForReview: false,
    startedAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString()
  };
  const migrated = sanitizeMosaicProgress(legacy, mosaic);
  if (migrated.mosaicOrder[0] !== 'sol_contains_duplicate_hashset_line_001') {
    errors.push('migration: mos_cd_sig not mapped');
  }
  if (migrated.mosaicDiscardedIds[0] !== 'mos_cd_d_clear') {
    errors.push('migration: distractor id should remain');
  }

  // Synthetic second solution
  const fixture = generateMosaicFromSolution(FIXTURE_LINEAR_SEARCH_SOLUTION, {
    mosaicId: 'mos_fixture',
    distractors: FIXTURE_LINEAR_SEARCH_DISTRACTORS,
    alternativeNote: { en: 'f', ru: 'f' }
  });
  if (fixture.solutionOrder.length !== 8) errors.push('fixture: expected 8 lines');
  if (fixture.solutionOrder[0] !== 'sol_fixture_linear_search_line_001') {
    errors.push('fixture: wrong first id');
  }
  if (fixture.requiredTiles.some((t) => t.id.includes('contains_duplicate'))) {
    errors.push('fixture: must not hardcode CD ids');
  }
  if (!validateMosaicAssembly(fixture.solutionOrder, fixture).correct) {
    errors.push('fixture: order must pass');
  }

  // Constant export consistency
  if (CONTAINS_DUPLICATE_MOSAIC.solutionId !== mosaic.solutionId) {
    errors.push('constant export solutionId mismatch');
  }

  // No string-heuristic validation in validator path (order IDs only)
  const falseLoopDistractor = CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS.find((d) => d.id === 'mos_cd_d_false_loop');
  if (!falseLoopDistractor) errors.push('missing false-loop distractor');
  else if (mosaic.solutionOrder.includes(falseLoopDistractor.id)) {
    errors.push('false-loop distractor must never be in solutionOrder');
  }

  return { ok: errors.length === 0, errors, cdLines: mosaic.solutionOrder.length, fixtureLines: fixture.solutionOrder.length };
}
`
);

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile,
  packages: 'external',
  logLevel: 'error'
});

const mod = await import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
const result = mod.run();
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
console.log('MOSAIC GENERATOR TEST OK');
