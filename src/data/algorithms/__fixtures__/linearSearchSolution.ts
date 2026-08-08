import { AlgorithmSolution, MosaicDistractor } from '../../../types/algorithmLab';

/**
 * Synthetic fixture only — proves the mosaic generator is not hardcoded
 * to Contains Duplicate. Not registered in the Algorithm Lab UI/registry.
 */
export const FIXTURE_LINEAR_SEARCH_SOLUTION: AlgorithmSolution = {
  id: 'sol_fixture_linear_search',
  problemId: 'alg_fixture_linear_search',
  strategyId: 'strat_fixture_linear',
  version: 1,
  language: 'JAVA',
  javaVersion: '17',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  canonicalCode: `
public int indexOf(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }

    return -1;
}
`.trim()
};

export const FIXTURE_LINEAR_SEARCH_DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'dist_fixture_return_zero',
    code: 'return 0;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Always returning index 0 is incorrect.',
      ru: 'Всегда возвращать индекс 0 неверно.'
    }
  }
];
