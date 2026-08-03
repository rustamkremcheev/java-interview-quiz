/**
 * Full OOP module uniqueness + route integrity audit (programmatic; not browser E2E).
 */
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

// Load via vite-node isn't available; instead parse TypeScript exports by spawning tsc project through dynamic import of built... 
// Use a lightweight TS transpile via node --experimental or just duplicate validation by importing compiled? 
// Simpler: run validation through a small tsx-less approach — exec type-check already ensures compile;
// For runtime integrity, import from dist after build OR use esbuild-register.
// Here we shell out to a temporary vite-node alternative: read package and use dynamic import of ./src via ts-node unavailable.
// Fallback: duplicate key checks by grepping source files (reliable for IDs).

const root = path.resolve('src/data/modules/oop');

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function extractIds(file, patterns) {
  const text = fs.readFileSync(file, 'utf8');
  const found = [];
  for (const { label, re } of patterns) {
    let m;
    const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    while ((m = r.exec(text))) {
      found.push({ label, id: m[1], file });
    }
  }
  return found;
}

const patterns = [
  { label: 'mission', re: /id:\s*"(mis_[^"]+)"/ },
  { label: 'slug', re: /slug:\s*"([^"]+)"/ },
  { label: 'stage', re: /id:\s*"(stg_[^"]+)"/ },
  { label: 'challenge', re: /id:\s*"(chl_[^"]+)"/ },
  { label: 'artifact', re: /id:\s*"(art_[^"]+|code_[^"]+)"/ },
  { label: 'hint', re: /id:\s*"(hnt_[^"]+)"/ },
  { label: 'source', re: /id:\s*"(src_[^"]+)"/ },
  { label: 'mistake', re: /id:\s*"(err_[^"]+)"/ },
  { label: 'theory', re: /id:\s*"(art_theory_[^"]+)"/ },
  { label: 'topic', re: /id:\s*"(top_oop_\d+)"/ }
];

const files = walk(path.join(root, 'missions')).concat([
  path.join(root, 'topics.ts'),
  path.join(root, 'concepts.ts')
]);

const all = files.flatMap((f) => extractIds(f, patterns));
const errors = [];
const byLabel = new Map();

for (const item of all) {
  if (!byLabel.has(item.label)) byLabel.set(item.label, new Map());
  const map = byLabel.get(item.label);
  if (!map.has(item.id)) map.set(item.id, []);
  map.get(item.id).push(item.file);
}

for (const [label, map] of byLabel) {
  for (const [id, locs] of map) {
    const uniqueLocs = [...new Set(locs)];
    if (uniqueLocs.length > 1 || (locs.length > 1 && label !== 'topic' && label !== 'slug')) {
      // same file may declare id once; duplicates across files are the issue
      if (uniqueLocs.length > 1) {
        errors.push(`DUPLICATE ${label} '${id}' in:\n  - ${uniqueLocs.join('\n  - ')}`);
      }
    }
  }
}

// Topic mission wiring from topics.ts
const topicsText = fs.readFileSync(path.join(root, 'topics.ts'), 'utf8');
const topicBlocks = [...topicsText.matchAll(/id:\s*"(top_oop_\d+)"[\s\S]*?missionIds:\s*\[([^\]]*)\][\s\S]*?availability:\s*"(AVAILABLE|PLANNED)"/g)];
const missionIdsDeclared = new Set(
  all.filter((x) => x.label === 'mission').map((x) => x.id)
);

let available = 0;
let planned = 0;
for (const m of topicBlocks) {
  const topicId = m[1];
  const missionIds = [...m[2].matchAll(/"(mis_[^"]+)"/g)].map((x) => x[1]);
  const availability = m[3];
  if (availability === 'AVAILABLE') {
    available++;
    if (missionIds.length === 0) errors.push(`ACTIVE ${topicId} has empty missionIds`);
    for (const mid of missionIds) {
      if (!missionIdsDeclared.has(mid)) errors.push(`${topicId} → missing mission ${mid}`);
    }
  } else {
    planned++;
  }
}

// Density audit for new missions
function densityReport(dir) {
  const theory = fs.readFileSync(path.join(dir, 'theory.ts'), 'utf8');
  const paras = [...theory.matchAll(/en:\s*"((?:\\.|[^"\\])*)"/g)].map((m) => m[1]);
  const long = paras.filter((p) => p.length > 420);
  return { paragraphs: paras.length, longOver420: long.length };
}

const tradeDensity = densityReport(path.join(root, 'missions/seniorOopTradeoffs'));
const jolDensity = densityReport(path.join(root, 'missions/jvmMemoryObjectLayout'));

const report = {
  topicsAvailable: available,
  topicsPlanned: planned,
  missionCount: byLabel.get('mission')?.size ?? 0,
  duplicateErrors: errors,
  density: { trade: tradeDensity, jol: jolDensity }
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) {
  console.error('\nAUDIT FAILED with', errors.length, 'issues');
  process.exit(1);
}
console.log('\nAUDIT OK');
