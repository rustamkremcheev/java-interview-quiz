import { AlgorithmProblem } from '../../types/algorithmLab';
import { ALL_WORKSHOP_PACKS } from './packs/catalog';

export interface PlannedAlgorithmPreview {
  readonly id: string;
  readonly slug: string;
  readonly title: { en: string; ru: string };
  readonly difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  readonly availability: 'COMING_SOON' | 'PLANNED';
}

export const ALGORITHM_PROBLEMS: readonly AlgorithmProblem[] = ALL_WORKSHOP_PACKS.map(
  (pack) => pack.problem
);

/** Remaining curriculum teasers not yet authored as full workshops. */
export const PLANNED_ALGORITHM_PREVIEWS: readonly PlannedAlgorithmPreview[] = [
  {
    id: 'alg_two_sum',
    slug: 'two-sum',
    title: { en: 'Two Sum', ru: 'Two Sum' },
    difficulty: 'EASY',
    availability: 'COMING_SOON'
  },
  {
    id: 'alg_valid_anagram',
    slug: 'valid-anagram',
    title: { en: 'Valid Anagram', ru: 'Valid Anagram' },
    difficulty: 'EASY',
    availability: 'COMING_SOON'
  },
  {
    id: 'alg_longest_consecutive',
    slug: 'longest-consecutive-sequence',
    title: { en: 'Longest Consecutive Sequence', ru: 'Longest Consecutive Sequence' },
    difficulty: 'MEDIUM',
    availability: 'PLANNED'
  }
];

export function getAlgorithmProblemBySlug(slug: string): AlgorithmProblem | undefined {
  return ALGORITHM_PROBLEMS.find((p) => p.slug === slug || p.id === slug);
}

export function getAvailableAlgorithmProblems(): readonly AlgorithmProblem[] {
  return ALGORITHM_PROBLEMS.filter((p) => p.availability === 'AVAILABLE');
}
