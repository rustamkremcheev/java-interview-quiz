import { MODULES_REGISTRY } from './modules/registry';
import { OOP_DATA_PACKAGE, OOP_TOPICS } from './modules/oop';
import { Module, Topic, Mission, LocalizedText } from '../types/domain';

export * from './modules/registry';
export * from './modules/oop';

export const ALL_MODULES: readonly Module[] = MODULES_REGISTRY;
export const ALL_TOPICS: readonly Topic[] = [...OOP_TOPICS];
export const ALL_MISSIONS: readonly Mission[] = OOP_DATA_PACKAGE.missions;

/**
 * Canonical mistake-pattern ID aliases for IndexedDB compatibility after de-duplication.
 * Historical rows may still store the canonical shared id `err_static_hiding_as_override`.
 */
export const MISTAKE_PATTERN_ID_ALIASES: Readonly<Record<string, string>> = {
  err_static_hiding_as_override_overriding: 'err_static_hiding_as_override'
};

export function resolveMistakePatternId(id: string): string {
  return MISTAKE_PATTERN_ID_ALIASES[id] ?? id;
}

export function getModuleBySlug(slug: string): Module | undefined {
  return ALL_MODULES.find((m) => m.slug === slug || m.id === slug);
}

export function getTopicBySlug(_moduleSlug: string, topicSlug: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.slug === topicSlug || t.id === topicSlug);
}

export function getMissionBySlug(slug: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.slug === slug || m.id === slug);
}

export function getMissionById(id: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.id === id || m.slug === id);
}

export function getMissionsForTopic(topicIdOrSlug: string): Mission[] {
  const topic = ALL_TOPICS.find((t) => t.id === topicIdOrSlug || t.slug === topicIdOrSlug);
  if (!topic || !topic.missionIds || topic.missionIds.length === 0) {
    return [];
  }
  return ALL_MISSIONS.filter((m) => topic.missionIds.includes(m.id));
}

function hasBothLocales(text: LocalizedText | undefined, path: string, errors: string[]): void {
  if (!text) {
    errors.push(`Missing LocalizedText at ${path}`);
    return;
  }
  if (!text.en?.trim()) errors.push(`Missing EN text at ${path}`);
  if (!text.ru?.trim()) errors.push(`Missing RU text at ${path}`);
}

function assertUniqueIds(ids: string[], label: string, errors: string[]): void {
  const seen = new Map<string, number>();
  for (const id of ids) {
    seen.set(id, (seen.get(id) ?? 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count > 1) errors.push(`Duplicate ${label} id '${id}' (${count}×)`);
  }
}

const REQUIRED_STAGE_TYPES = [
  'MISSION_INTRODUCTION',
  'REAL_ENGINEERING_PROBLEM',
  'THINK_YOURSELF',
  'NEED_HELP',
  'THEORY',
  'VISUALIZATION',
  'INTERACTIVE_PRACTICE',
  'INTERVIEW_QUESTION',
  'INTERVIEW_ANSWER',
  'DEBUG_COUNTER_EXAMPLE',
  'RELATED_TOPICS',
  'MISSION_RESULTS',
  'REFLECTION'
] as const;

export function validateDataIntegrity(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const pkg = OOP_DATA_PACKAGE;

  const missionById = new Map(pkg.missions.map((m) => [m.id, m]));
  const topicById = new Map(ALL_TOPICS.map((t) => [t.id, t]));
  const challengeById = new Map(pkg.challenges.map((c) => [c.id, c]));
  const artifactById = new Map(pkg.codeArtifacts.map((a) => [a.id, a]));
  const sourceById = new Map(pkg.sources.map((s) => [s.id, s]));
  const theoryById = new Map(pkg.theoryArticles.map((a) => [a.id, a]));

  assertUniqueIds(pkg.missions.map((m) => m.id), 'Mission', errors);
  assertUniqueIds(pkg.missions.map((m) => m.slug), 'Mission.slug', errors);
  assertUniqueIds(pkg.stages.map((s) => s.id), 'Stage', errors);
  assertUniqueIds(pkg.challenges.map((c) => c.id), 'Challenge', errors);
  assertUniqueIds(pkg.codeArtifacts.map((a) => a.id), 'CodeArtifact', errors);
  assertUniqueIds(pkg.hints.map((h) => h.id), 'Hint', errors);
  assertUniqueIds(pkg.sources.map((s) => s.id), 'Source', errors);
  assertUniqueIds(pkg.mistakePatterns.map((m) => m.id), 'MistakePattern', errors);
  assertUniqueIds(pkg.theoryArticles.map((a) => a.id), 'TheoryArticle', errors);
  assertUniqueIds(ALL_TOPICS.map((t) => t.id), 'Topic', errors);

  for (const topic of ALL_TOPICS) {
    hasBothLocales(topic.title, `topic ${topic.id}.title`, errors);
    hasBothLocales(topic.description, `topic ${topic.id}.description`, errors);

    for (const missionId of topic.missionIds || []) {
      if (!missionById.has(missionId)) {
        errors.push(`Topic '${topic.id}' references non-existent missionId '${missionId}'`);
      }
    }

    if (topic.availability === 'AVAILABLE') {
      if (!topic.missionIds || topic.missionIds.length === 0) {
        errors.push(`Active topic '${topic.id}' has no missions`);
      }
    }
  }

  for (const mission of pkg.missions) {
    hasBothLocales(mission.title, `mission ${mission.id}.title`, errors);
    hasBothLocales(mission.description, `mission ${mission.id}.description`, errors);

    if (mission.primaryTopicId && !topicById.has(mission.primaryTopicId)) {
      errors.push(`Mission '${mission.id}' references non-existent primaryTopicId '${mission.primaryTopicId}'`);
    }

    const primary = topicById.get(mission.primaryTopicId);
    if (primary && !primary.missionIds.includes(mission.id)) {
      errors.push(`Mission '${mission.id}' primary topic '${mission.primaryTopicId}' does not list the mission`);
    }

    const owners = ALL_TOPICS.filter((t) => t.missionIds?.includes(mission.id));
    if (owners.length === 0) {
      errors.push(`Mission '${mission.id}' is not listed on any Topic.missionIds`);
    }
    for (const owner of owners) {
      if (owner.id !== mission.primaryTopicId) {
        errors.push(`Mission '${mission.id}' listed on non-primary topic '${owner.id}'`);
      }
    }

    const missionStages = pkg.stages.filter((s) => s.missionId === mission.id);
    if (missionStages.length < 13) {
      errors.push(`Mission '${mission.id}' has ${missionStages.length} stages (expected ≥13)`);
    }

    const stageTypes = new Set(missionStages.map((s) => s.type));
    for (const t of REQUIRED_STAGE_TYPES) {
      if (!stageTypes.has(t)) {
        errors.push(`Mission '${mission.id}' missing stage type ${t}`);
      }
    }

    const theoryStage = missionStages.find((s) => s.type === 'THEORY') as { theoryArticleId?: string } | undefined;
    if (theoryStage?.theoryArticleId && !theoryById.has(theoryStage.theoryArticleId)) {
      errors.push(`Mission '${mission.id}' theory stage references missing article '${theoryStage.theoryArticleId}'`);
    }

    const challenges = pkg.challenges.filter((c) => c.missionId === mission.id);
    const types = new Set(challenges.map((c) => c.type));
    for (const need of ['FIX_BUILDER', 'BUG_HUNT', 'INTERVIEW_ANSWER'] as const) {
      if (!types.has(need)) {
        errors.push(`Mission '${mission.id}' missing challenge type ${need}`);
      }
    }

    for (const ch of challenges) {
      hasBothLocales(ch.prompt, `challenge ${ch.id}.prompt`, errors);
      if (ch.type === 'FIX_BUILDER') {
        const baseId = (ch as { payload?: { baseCodeArtifactId?: string } }).payload?.baseCodeArtifactId;
        if (baseId && !artifactById.has(baseId)) {
          errors.push(`Challenge '${ch.id}' baseCodeArtifactId '${baseId}' missing`);
        }
      }
    }

    for (const stage of missionStages) {
      const artifactId = (stage as { codeArtifactId?: string }).codeArtifactId;
      if (artifactId && !artifactById.has(artifactId)) {
        errors.push(`Stage '${stage.id}' codeArtifactId '${artifactId}' missing`);
      }
      const challengeId = (stage as { challengeId?: string }).challengeId;
      if (challengeId && !challengeById.has(challengeId)) {
        errors.push(`Stage '${stage.id}' challengeId '${challengeId}' missing`);
      }
    }
  }

  for (const article of pkg.theoryArticles) {
    hasBothLocales(article.title, `theory ${article.id}.title`, errors);
    for (const sourceId of article.sourceIds || []) {
      if (!sourceById.has(sourceId)) {
        errors.push(`Theory '${article.id}' references missing source '${sourceId}'`);
      }
    }
  }

  for (const hint of pkg.hints) {
    hasBothLocales(hint.text, `hint ${hint.id}.text`, errors);
    if (!challengeById.has(hint.challengeId)) {
      errors.push(`Hint '${hint.id}' references missing challenge '${hint.challengeId}'`);
    }
  }

  for (const ref of pkg.sourceReferences) {
    if (!sourceById.has(ref.sourceId)) {
      errors.push(`SourceReference points to missing source '${ref.sourceId}'`);
    }
  }

  for (const artifact of pkg.codeArtifacts) {
    if (!artifact.sourceCode?.trim()) {
      errors.push(`CodeArtifact '${artifact.id}' has empty sourceCode`);
    }
  }

  if (pkg.missions.length !== ALL_MISSIONS.length) {
    errors.push(
      `OOP_DATA_PACKAGE.missions (${pkg.missions.length}) does not match ALL_MISSIONS (${ALL_MISSIONS.length})`
    );
  }

  if (errors.length > 0) {
    console.error('Data Integrity Validation Errors:', errors);
  }

  return { isValid: errors.length === 0, errors };
}

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  validateDataIntegrity();
}
