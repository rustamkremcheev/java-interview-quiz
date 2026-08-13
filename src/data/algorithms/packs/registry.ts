import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { ALL_WORKSHOP_PACKS } from './catalog';

export function getAllWorkshopPacks(): readonly AlgorithmWorkshopPack[] {
  return ALL_WORKSHOP_PACKS;
}

export function getWorkshopPackByProblemId(problemId: string): AlgorithmWorkshopPack | undefined {
  return ALL_WORKSHOP_PACKS.find((p) => p.problem.id === problemId);
}

export function getWorkshopPackBySlug(slug: string): AlgorithmWorkshopPack | undefined {
  return ALL_WORKSHOP_PACKS.find((p) => p.problem.slug === slug || p.problem.id === slug);
}
