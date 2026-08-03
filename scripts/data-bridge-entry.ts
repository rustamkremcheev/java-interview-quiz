import { createHash } from 'crypto';
import { OOP_DATA_PACKAGE, OOP_TOPICS } from '../src/data/modules/oop/index';
import { ALL_MISSIONS, getMissionsForTopic, validateDataIntegrity } from '../src/data/index';

export function run() {
  const integrity = validateDataIntegrity();
  const topics = OOP_TOPICS;
  const missions = ALL_MISSIONS;
  const routes: Array<Record<string, unknown>> = [];
  const errors = [...integrity.errors];

  for (const topic of topics) {
    const topicPath = `/modules/object-oriented-programming/topics/${topic.slug}`;
    const listed = getMissionsForTopic(topic.id);
    if (topic.availability === 'AVAILABLE' && listed.length === 0) {
      errors.push(`Topic route ${topicPath} has no resolvable missions`);
    }
    for (const mid of topic.missionIds || []) {
      const m = missions.find((x) => x.id === mid);
      if (!m) {
        errors.push(`Topic ${topic.id} mission ${mid} missing from ALL_MISSIONS`);
        continue;
      }
      const missionPath = `/missions/${m.slug}`;
      const stages = OOP_DATA_PACKAGE.stages.filter((s) => s.missionId === m.id);
      const theory = stages.find((s) => s.type === 'THEORY') as { theoryArticleId?: string } | undefined;
      const article = theory?.theoryArticleId
        ? OOP_DATA_PACKAGE.theoryArticles.find((a) => a.id === theory.theoryArticleId)
        : undefined;
      const fix = OOP_DATA_PACKAGE.challenges.find((c) => c.missionId === m.id && c.type === 'FIX_BUILDER') as
        | { payload?: { baseCodeArtifactId?: string } }
        | undefined;
      const artifactId = fix?.payload?.baseCodeArtifactId;
      const artifact = artifactId
        ? OOP_DATA_PACKAGE.codeArtifacts.find((a) => a.id === artifactId)
        : undefined;
      const sourcesOk = (article?.sourceIds || []).every((id) =>
        OOP_DATA_PACKAGE.sources.some((s) => s.id === id)
      );
      routes.push({
        topicPath,
        missionPath,
        missionId: m.id,
        titleEn: m.title.en,
        stages: stages.length,
        hasTheory: !!article,
        hasArtifact: !!artifact,
        sourcesOk
      });
      if (!article) errors.push(`${m.id}: missing theory article`);
      if (!artifact) errors.push(`${m.id}: missing base code artifact`);
      if (!sourcesOk) errors.push(`${m.id}: source resolution failed`);
      if (stages.length < 13) errors.push(`${m.id}: only ${stages.length} stages`);
    }
  }

  // Near-duplicate detection across missions only (broken/solution twins within a mission are expected).
  const missionOfArtifact = new Map<string, string>();
  for (const c of OOP_DATA_PACKAGE.challenges) {
    const baseId = (c as { payload?: { baseCodeArtifactId?: string } }).payload?.baseCodeArtifactId;
    if (baseId) missionOfArtifact.set(baseId, c.missionId);
  }
  for (const a of OOP_DATA_PACKAGE.codeArtifacts) {
    const prefix = a.id.replace(/_(broken|solution|bughunt|annotated|supplement|counter).*$/i, '');
    // associate by shared prefix group later
    void prefix;
  }
  const hashes = new Map<string, string[]>();
  for (const a of OOP_DATA_PACKAGE.codeArtifacts) {
    const norm = a.sourceCode.replace(/\s+/g, ' ').slice(0, 280);
    const h = createHash('sha1').update(norm).digest('hex').slice(0, 12);
    if (!hashes.has(h)) hashes.set(h, []);
    hashes.get(h)!.push(a.id);
  }
  for (const [h, ids] of hashes) {
    if (ids.length < 2) continue;
    const prefixes = new Set(ids.map((id) => id.split('_').slice(0, 2).join('_')));
    // Same mission family shares art_<prefix>_* — ignore. Flag only when prefixes diverge.
    if (prefixes.size > 1) {
      errors.push(`Cross-mission near-duplicate code hash ${h}: ${ids.join(', ')}`);
    }
  }
  void missionOfArtifact;

  return {
    integrityValid: integrity.isValid,
    topicCount: topics.length,
    available: topics.filter((t) => t.availability === 'AVAILABLE').length,
    planned: topics.filter((t) => t.availability === 'PLANNED').length,
    missionCount: missions.length,
    routeCount: routes.length,
    errors,
    allRoutes: routes.map((r) => ({
      topic: r.topicPath,
      mission: r.missionPath,
      title: r.titleEn
    }))
  };
}
