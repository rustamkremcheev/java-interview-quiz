import { MODULES_REGISTRY } from './modules/registry';
import {
  OOP_DATA_PACKAGE,
  OOP_TOPICS,
  BANK_ACCOUNT_MISSION,
  EQUALS_HASHCODE_MISSION,
  IMMUTABILITY_DEFENSIVE_COPY_MISSION,
  COMPOSITION_MISSION,
  LISKOV_SUBSTITUTION_MISSION,
  OBJECT_CREATION_BUILDER_MISSION,
  INTERFACE_DEFAULT_METHODS_MISSION,
  DYNAMIC_DISPATCH_MISSION,
  METHOD_OVERRIDING_COVARIANT_MISSION,
  METHOD_OVERLOADING_MISSION,
  DEPENDENCY_INJECTION_MISSION,
  STRATEGY_PATTERN_MISSION,
  FACTORY_PATTERN_MISSION,
  OOP_ANTI_PATTERNS_MISSION
} from './modules/oop';
import { Module, Topic, Mission } from '../types/domain';

export * from './modules/registry';
export * from './modules/oop';

export const ALL_MODULES: readonly Module[] = MODULES_REGISTRY;
export const ALL_TOPICS: readonly Topic[] = [...OOP_TOPICS];
export const ALL_MISSIONS: readonly Mission[] = [
  BANK_ACCOUNT_MISSION,
  EQUALS_HASHCODE_MISSION,
  IMMUTABILITY_DEFENSIVE_COPY_MISSION,
  COMPOSITION_MISSION,
  LISKOV_SUBSTITUTION_MISSION,
  OBJECT_CREATION_BUILDER_MISSION,
  INTERFACE_DEFAULT_METHODS_MISSION,
  DYNAMIC_DISPATCH_MISSION,
  METHOD_OVERRIDING_COVARIANT_MISSION,
  METHOD_OVERLOADING_MISSION,
  DEPENDENCY_INJECTION_MISSION,
  STRATEGY_PATTERN_MISSION,
  FACTORY_PATTERN_MISSION,
  OOP_ANTI_PATTERNS_MISSION
];

export function getModuleBySlug(slug: string): Module | undefined {
  return ALL_MODULES.find((m) => m.slug === slug || m.id === slug);
}

export function getTopicBySlug(moduleSlug: string, topicSlug: string): Topic | undefined {
  return ALL_TOPICS.find((t) => (t.slug === topicSlug || t.id === topicSlug));
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

const TOPIC_MISSION_ASSIGNMENTS: Record<string, string> = {
  top_oop_05: 'mis_bank_account_invariants',
  top_oop_09: 'mis_interface_default_methods',
  top_oop_12: 'mis_dynamic_dispatch',
  top_oop_14: 'mis_method_overloading',
  top_oop_15: 'mis_method_overriding_covariant',
  top_oop_16: 'mis_composition_over_inheritance',
  top_oop_20: 'mis_equals_hashcode_contract',
  top_oop_22: 'mis_immutability_defensive_copy',
  top_oop_23: 'mis_liskov_substitution_principle',
  top_oop_24: 'mis_dependency_injection',
  top_oop_25: 'mis_object_creation_builder',
  top_oop_26: 'mis_strategy_pattern',
  top_oop_27: 'mis_factory_pattern',
  top_oop_32: 'mis_oop_anti_patterns'
};

export function validateDataIntegrity(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const activeTopicIdsWithMissions = Object.keys(TOPIC_MISSION_ASSIGNMENTS);

  for (const topic of ALL_TOPICS) {
    for (const missionId of topic.missionIds || []) {
      const exists = ALL_MISSIONS.some((m) => m.id === missionId);
      if (!exists) {
        errors.push(`Topic '${topic.id}' (${topic.slug}) references non-existent missionId '${missionId}'`);
      }
    }
  }

  for (const mission of ALL_MISSIONS) {
    if (mission.primaryTopicId) {
      const topicExists = ALL_TOPICS.some((t) => t.id === mission.primaryTopicId);
      if (!topicExists) {
        errors.push(`Mission '${mission.id}' references non-existent primaryTopicId '${mission.primaryTopicId}'`);
      }
    }
  }

  for (const [topicId, missionId] of Object.entries(TOPIC_MISSION_ASSIGNMENTS)) {
    const topic = OOP_TOPICS.find((t) => t.id === topicId);
    if (!topic?.missionIds.includes(missionId)) {
      errors.push(`Topic '${topicId}' missing '${missionId}'`);
    }
  }

  for (const topic of ALL_TOPICS) {
    if (!activeTopicIdsWithMissions.includes(topic.id) && topic.missionIds && topic.missionIds.length > 0) {
      errors.push(`Topic '${topic.id}' (${topic.slug}) has missionIds when it should be empty`);
    }
  }

  if (OOP_DATA_PACKAGE.missions.length !== ALL_MISSIONS.length) {
    errors.push(
      `OOP_DATA_PACKAGE.missions (${OOP_DATA_PACKAGE.missions.length}) does not match ALL_MISSIONS (${ALL_MISSIONS.length})`
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
