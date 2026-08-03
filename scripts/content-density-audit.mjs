/**
 * Reusable content-density audit for mission theory/challenge prose.
 * Reports long paragraphs; does not auto-rewrite historical missions.
 *
 * Usage: node scripts/content-density-audit.mjs [missionFolder...]
 * Default: seniorOopTradeoffs jvmMemoryObjectLayout
 */
import fs from 'fs';
import path from 'path';

const root = path.resolve('src/data/modules/oop/missions');
const targets = process.argv.slice(2);
const folders = targets.length
  ? targets
  : ['seniorOopTradeoffs', 'jvmMemoryObjectLayout'];

const LONG = 420;

function auditFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const text = fs.readFileSync(filePath, 'utf8');
  const strings = [...text.matchAll(/(?:en|ru):\s*"((?:\\.|[^"\\])*)"/g)].map((m) =>
    m[1].replace(/\\n/g, '\n')
  );
  const long = strings.filter((s) => s.length > LONG);
  const callouts = (text.match(/type:\s*"CALLOUT"/g) || []).length;
  const warnings = (text.match(/type:\s*"WARNING"/g) || []).length;
  return {
    file: path.basename(filePath),
    stringCount: strings.length,
    longOver: long.length,
    longest: strings.reduce((n, s) => Math.max(n, s.length), 0),
    callouts,
    warnings
  };
}

const report = {};
for (const folder of folders) {
  const dir = path.join(root, folder);
  report[folder] = {
    theory: auditFile(path.join(dir, 'theory.ts')),
    challenges: auditFile(path.join(dir, 'challenges.ts')),
    mission: auditFile(path.join(dir, 'mission.ts'))
  };
}

console.log(JSON.stringify(report, null, 2));
const bad = Object.values(report).some(
  (r) => (r.theory?.longOver || 0) > 3 || (r.challenges?.longOver || 0) > 5
);
if (bad) {
  console.error('Density warning: consider shorter paragraphs / more callouts');
  process.exit(2);
}
console.log('Density audit OK for sampled missions');
