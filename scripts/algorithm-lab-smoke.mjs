import * as esbuild from 'esbuild';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const entry = path.resolve('scripts/algorithm-lab-bridge.ts');
const outfile = path.resolve('scripts/.tmp-alg-bridge.mjs');

fs.writeFileSync(
  entry,
  `
import { validateAlgorithmLabContent } from '../src/data/algorithms/validate';
import { ALGORITHM_PROBLEMS, getAlgorithmProblemBySlug } from '../src/data/algorithms/registry';
import { CONTAINS_DUPLICATE_BLUEPRINT, CONTAINS_DUPLICATE_MOSAIC, CONTAINS_DUPLICATE_TRACE_MAIN, CONTAINS_DUPLICATE_SOLUTIONS } from '../src/data/algorithms/containsDuplicate';

export function run() {
  const integrity = validateAlgorithmLabContent();
  const problem = getAlgorithmProblemBySlug('contains-duplicate');
  const errors = [...integrity.errors];
  if (!problem) errors.push('contains-duplicate slug missing');
  if (problem?.stages.length !== 6) errors.push('expected 6 stages');
  if (CONTAINS_DUPLICATE_BLUEPRINT.solutionOrder.length !== 6) errors.push('blueprint solution length');
  if (CONTAINS_DUPLICATE_MOSAIC.solutionOrder.length !== 9) errors.push('mosaic solution length');
  if (!CONTAINS_DUPLICATE_MOSAIC.solutionId) errors.push('mosaic missing solutionId');
  if (CONTAINS_DUPLICATE_SOLUTIONS.length < 1) errors.push('expected at least one AlgorithmSolution');
  if (CONTAINS_DUPLICATE_TRACE_MAIN.steps.at(-1)?.returns !== true) errors.push('trace final return');
  return {
    ok: errors.length === 0,
    problemCount: ALGORITHM_PROBLEMS.length,
    stages: problem?.stages.map((s) => s.type),
    mosaicSolutionId: CONTAINS_DUPLICATE_MOSAIC.solutionId,
    errors
  };
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
console.log('ALGORITHM LAB SMOKE OK');
