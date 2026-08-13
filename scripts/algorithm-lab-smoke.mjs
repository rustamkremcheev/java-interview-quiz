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
import { ALL_WORKSHOP_PACKS } from '../src/data/algorithms/packs/catalog';
import { validateMosaicAssembly } from '../src/lib/algorithmLab/mosaicValidator';

export function run() {
  const integrity = validateAlgorithmLabContent();
  const errors = [...integrity.errors];

  if (ALGORITHM_PROBLEMS.length !== 12) {
    errors.push('expected 12 registered problems, got ' + ALGORITHM_PROBLEMS.length);
  }

  const mosaicReport = [];
  for (const pack of ALL_WORKSHOP_PACKS) {
    const problem = getAlgorithmProblemBySlug(pack.problem.slug);
    if (!problem) errors.push('missing registry entry for ' + pack.problem.slug);
    if (problem?.stages.length !== 6) errors.push(pack.problem.slug + ': expected 6 stages');

    let mosaic;
    try {
      mosaic = pack.resolveMosaic(pack.targetStrategyId);
    } catch (err) {
      errors.push(pack.problem.slug + ': mosaic resolve failed');
      continue;
    }

    if (!validateMosaicAssembly(mosaic.solutionOrder, mosaic).correct) {
      errors.push(pack.problem.slug + ': canonical mosaic must pass');
    }
    if (mosaic.solutionOrder.length >= 2) {
      const swapped = [...mosaic.solutionOrder];
      [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
      if (validateMosaicAssembly(swapped, mosaic).correct) {
        errors.push(pack.problem.slug + ': swapped mosaic must fail');
      }
    }

    mosaicReport.push({
      slug: pack.problem.slug,
      solutionId: mosaic.solutionId,
      tiles: mosaic.solutionOrder.length,
      distractors: pack.distractors.length,
      traceKind: pack.trace.kind
    });
  }

  return {
    ok: errors.length === 0,
    problemCount: ALGORITHM_PROBLEMS.length,
    packCount: ALL_WORKSHOP_PACKS.length,
    mosaics: mosaicReport,
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
