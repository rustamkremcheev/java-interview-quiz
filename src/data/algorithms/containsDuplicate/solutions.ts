import { AlgorithmSolution } from '../../../types/algorithmLab';

/**
 * Canonical solutions for Contains Duplicate.
 * Only the HashSet workshop path is authored; sort/nested remain strategy choices
 * without a Mosaic solution yet (Strategy stage still routes to HashSet).
 */
export const CONTAINS_DUPLICATE_SOLUTIONS: readonly AlgorithmSolution[] = [
  {
    id: 'sol_contains_duplicate_hashset',
    problemId: 'alg_contains_duplicate',
    strategyId: 'strat_cd_hashset',
    version: 1,
    language: 'JAVA',
    javaVersion: '17',
    timeComplexity: 'O(n) avg',
    spaceComplexity: 'O(n)',
    explanation: {
      en: 'One pass with HashSet membership: add returns false when the value was already present.',
      ru: 'Один проход с HashSet: add возвращает false, если значение уже было.'
    },
    canonicalCode: `
public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();

    for (int number : nums) {
        if (!seen.add(number)) {
            return true;
        }
    }

    return false;
}
`.trim()
  }
];

export const CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID = 'strat_cd_hashset';
