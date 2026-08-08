import { MosaicDistractor, MosaicPuzzle } from '../../../types/algorithmLab';
import {
  generateMosaicFromSolution,
  resolveSolutionForStrategy
} from '../../../lib/algorithmLab/mosaicGenerator';
import {
  CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID,
  CONTAINS_DUPLICATE_SOLUTIONS
} from './solutions';

/** Authored educational distractors — not generated from canonicalCode. */
export const CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'mos_cd_d_sort',
    code: 'Arrays.sort(nums);',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Belongs to the sort strategy, not the HashSet solution.',
      ru: 'Относится к стратегии сортировки, не к решению HashSet.'
    }
  },
  {
    id: 'mos_cd_d_len',
    code: 'return nums.length > 1;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Compiles but is logically wrong — length does not imply duplicates.',
      ru: 'Компилируется, но логически неверно — длина не означает дубликаты.'
    }
  },
  {
    id: 'mos_cd_d_clear',
    code: 'seen.clear();',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Clearing the set each iteration destroys membership history.',
      ru: 'Очистка set на итерации уничтожает историю принадлежности.'
    }
  },
  {
    id: 'mos_cd_d_false_loop',
    code: 'return false;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Returning false inside the loop aborts too early.',
      ru: 'return false внутри цикла слишком рано прерывает поиск.'
    }
  },
  {
    id: 'mos_cd_d_add_true',
    code: 'if (seen.add(number)) { return true; }',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Inverted condition — add returns true for new values, not duplicates.',
      ru: 'Инвертированное условие — add возвращает true для новых значений, не дубликатов.'
    }
  },
  {
    id: 'mos_cd_d_prim',
    code: 'Set<int> seen = new HashSet<>();',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Does not compile — generics cannot use primitive `int`.',
      ru: 'Не компилируется — дженерики не принимают примитив `int`.'
    }
  },
  {
    id: 'mos_cd_d_list',
    code: 'list.add(number);',
    indent: 2,
    role: 'DISTRACTOR_IRRELEVANT',
    explanation: {
      en: 'Undefined list — wrong structure for membership.',
      ru: 'Неопределённый list — неверная структура для membership.'
    }
  },
  {
    id: 'mos_cd_d_nested',
    code: 'for (int j = i + 1; j < nums.length; j++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Nested-loop fragment from the O(n²) strategy.',
      ru: 'Фрагмент вложенного цикла из стратегии O(n²).'
    }
  }
];

export const CONTAINS_DUPLICATE_MOSAIC_ALTERNATIVE_NOTE = {
  en: 'Equivalent form: if (seen.contains(x)) return true; seen.add(x); — same idea, two calls instead of using add’s boolean result.',
  ru: 'Эквивалентная форма: if (seen.contains(x)) return true; seen.add(x); — та же идея, два вызова вместо boolean-результата add.'
} as const;

const MOSAIC_ID = 'mos_cd_hashset';

/** Resolve + generate Mosaic for a selected strategy (HashSet fallback for this slice). */
export function resolveContainsDuplicateMosaic(strategyId?: string): MosaicPuzzle {
  const solution = resolveSolutionForStrategy(
    CONTAINS_DUPLICATE_SOLUTIONS,
    strategyId,
    CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID
  );

  return generateMosaicFromSolution(solution, {
    mosaicId: MOSAIC_ID,
    distractors: CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS,
    alternativeNote: CONTAINS_DUPLICATE_MOSAIC_ALTERNATIVE_NOTE,
    difficulty: 'MEDIUM'
  });
}

/**
 * Default generated HashSet mosaic (for audits / imports that need a constant).
 * Required tiles and solutionOrder are generated — not hand-authored.
 */
export const CONTAINS_DUPLICATE_MOSAIC: MosaicPuzzle = resolveContainsDuplicateMosaic(
  CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID
);
