import { AlgorithmProblem } from '../../types/algorithmLab';
import { CONTAINS_DUPLICATE_PROBLEM } from './containsDuplicate';

export interface PlannedAlgorithmPreview {
  readonly id: string;
  readonly slug: string;
  readonly title: { en: string; ru: string };
  readonly difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  readonly availability: 'COMING_SOON' | 'PLANNED';
}

export const ALGORITHM_PROBLEMS: readonly AlgorithmProblem[] = [
  CONTAINS_DUPLICATE_PROBLEM
];

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
    id: 'alg_group_anagrams',
    slug: 'group-anagrams',
    title: { en: 'Group Anagrams', ru: 'Group Anagrams' },
    difficulty: 'MEDIUM',
    availability: 'PLANNED'
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
