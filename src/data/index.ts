import { MODULES_REGISTRY } from './modules/registry';
import { OOP_DATA_PACKAGE, OOP_TOPICS, BANK_ACCOUNT_MISSION } from './modules/oop';
import { Module, Topic, Mission } from '../types/domain';

export * from './modules/registry';
export * from './modules/oop';

export const ALL_MODULES: readonly Module[] = MODULES_REGISTRY;
export const ALL_TOPICS: readonly Topic[] = [...OOP_TOPICS];
export const ALL_MISSIONS: readonly Mission[] = [BANK_ACCOUNT_MISSION];

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
