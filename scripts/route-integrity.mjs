import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import * as esbuild from 'esbuild';

const outfile = path.resolve('scripts/.tmp-data-bridge.mjs');

await esbuild.build({
  entryPoints: [path.resolve('scripts/data-bridge-entry.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile,
  packages: 'external',
  logLevel: 'error'
});

const mod = await import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
const result = mod.run();
fs.writeFileSync('scripts/.route-integrity-report.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify({
  integrityValid: result.integrityValid,
  topicCount: result.topicCount,
  available: result.available,
  planned: result.planned,
  missionCount: result.missionCount,
  routeCount: result.routeCount,
  errorCount: result.errors.length,
  errors: result.errors.slice(0, 40)
}, null, 2));

if (result.errors.length) {
  console.error('ROUTE INTEGRITY FAILED:', result.errors.length);
  process.exit(1);
}
console.log('ROUTE INTEGRITY OK —', result.routeCount, 'topic/mission paths resolved');
