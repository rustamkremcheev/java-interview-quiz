import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { CONTAINS_DUPLICATE_PROBLEM, CONTAINS_DUPLICATE_CLARIFY } from './problem';
import { CONTAINS_DUPLICATE_STRATEGIES } from './strategies';
import { CONTAINS_DUPLICATE_BLUEPRINT } from './blueprint';
import { CONTAINS_DUPLICATE_SOLUTIONS, CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID } from './solutions';
import {
  CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS,
  CONTAINS_DUPLICATE_MOSAIC_ALTERNATIVE_NOTE,
  resolveContainsDuplicateMosaic
} from './mosaic';
import { CONTAINS_DUPLICATE_TRACE } from './trace';
import { CONTAINS_DUPLICATE_HINTS } from './hints';

export const CONTAINS_DUPLICATE_PACK: AlgorithmWorkshopPack = {
  problem: CONTAINS_DUPLICATE_PROBLEM,
  clarify: CONTAINS_DUPLICATE_CLARIFY,
  strategies: CONTAINS_DUPLICATE_STRATEGIES,
  targetStrategyId: CONTAINS_DUPLICATE_DEFAULT_SOLUTION_STRATEGY_ID,
  blueprint: CONTAINS_DUPLICATE_BLUEPRINT,
  solutions: CONTAINS_DUPLICATE_SOLUTIONS,
  distractors: CONTAINS_DUPLICATE_MOSAIC_DISTRACTORS,
  mosaicId: 'mos_cd_hashset',
  mosaicAlternativeNote: CONTAINS_DUPLICATE_MOSAIC_ALTERNATIVE_NOTE,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. !seen.add(number) detects an already-present value.',
    ru: 'Мозаика собрана. !seen.add(number) детектирует уже существующее значение.'
  },
  blueprintHelp: {
    en: 'Assemble HashSet logic blocks. Java is still hidden.',
    ru: 'Соберите логические блоки HashSet. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: memory → loop → check → early true / add → false.',
    ru: 'Чертёж верен: память → цикл → проверка → ранний true / add → false.'
  },
  resolveMosaic: resolveContainsDuplicateMosaic,
  trace: CONTAINS_DUPLICATE_TRACE,
  hints: CONTAINS_DUPLICATE_HINTS,
  reflectionPrompt: {
    en: 'What clue in the problem tells you that a Set may be useful?',
    ru: 'Какая подсказка в условии говорит, что Set может быть полезен?'
  },
  summary: {
    corePattern: {
      en: 'Hashing / membership — detect repeats with a seen-set in one pass.',
      ru: 'Хэширование / принадлежность — искать повторы через seen-set за один проход.'
    },
    invariant: {
      en: 'After processing a prefix, the set contains exactly the distinct values seen so far.',
      ru: 'После обработки префикса set содержит ровно различные значения, встреченные до сих пор.'
    },
    timeComplexity: 'O(n) average',
    spaceComplexity: 'O(n)',
    commonMistake: {
      en: 'Using add’s boolean upside-down, or returning false inside the loop too early.',
      ru: 'Инвертировать boolean от add или слишком рано вернуть false внутри цикла.'
    },
    recognitionCue: {
      en: '“Does any value appear twice?” / membership against history.',
      ru: '«Встречается ли значение дважды?» / membership относительно истории.'
    }
  }
};
