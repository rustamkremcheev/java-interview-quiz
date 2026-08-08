import { AlgorithmProblem, ClarifyQuestion } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_PROBLEM: AlgorithmProblem = {
  id: 'alg_contains_duplicate',
  slug: 'contains-duplicate',
  title: {
    en: 'Contains Duplicate',
    ru: 'Содержит Дубликат'
  },
  summary: {
    en: 'Decide whether any value appears at least twice in an integer array.',
    ru: 'Определите, встречается ли какое-либо значение в массиве целых чисел как минимум дважды.'
  },
  statement: {
    en: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    ru: 'Дан массив целых чисел `nums`. Верните `true`, если какое-либо значение встречается как минимум дважды, и `false`, если все элементы различны.'
  },
  examples: [
    {
      id: 'ex_cd_1',
      input: 'nums = [1, 2, 3, 1]',
      output: 'true',
      explanation: {
        en: 'Value 1 appears twice.',
        ru: 'Значение 1 встречается дважды.'
      }
    },
    {
      id: 'ex_cd_2',
      input: 'nums = [1, 2, 3, 4]',
      output: 'false',
      explanation: {
        en: 'All values are distinct.',
        ru: 'Все значения различны.'
      }
    },
    {
      id: 'ex_cd_3',
      input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]',
      output: 'true',
      explanation: {
        en: 'Several values repeat.',
        ru: 'Несколько значений повторяются.'
      }
    }
  ],
  constraints: [
    {
      id: 'c_cd_1',
      text: {
        en: '`1 <= nums.length <= 10^5` in typical interview statements (empty arrays may still appear in local tests).',
        ru: '`1 <= nums.length <= 10^5` в типичных формулировках (пустые массивы всё же могут встречаться в локальных тестах).'
      }
    },
    {
      id: 'c_cd_2',
      text: {
        en: '`-10^9 <= nums[i] <= 10^9` — negatives and large magnitudes are allowed.',
        ru: '`-10^9 <= nums[i] <= 10^9` — отрицательные и большие значения допустимы.'
      }
    },
    {
      id: 'c_cd_3',
      text: {
        en: 'Return type is boolean — you do not need the duplicate value itself.',
        ru: 'Тип возврата — boolean; само значение дубликата возвращать не нужно.'
      }
    },
    {
      id: 'c_cd_4',
      text: {
        en: 'No explicit “O(1) memory only” constraint is stated unless a follow-up asks for it.',
        ru: 'Явного ограничения «только O(1) памяти» нет, пока follow-up этого не потребует.'
      }
    }
  ],
  patternFamilyId: 'pat_hashing_membership',
  difficulty: 'EASY',
  estimatedMinutes: 25,
  stages: [
    {
      id: 'stg_cd_clarify',
      type: 'CLARIFY',
      order: 1,
      title: { en: '1. Clarify', ru: '1. Уточнение' },
      instructions: {
        en: 'Identify decision-relevant constraints before choosing a technique.',
        ru: 'Определите ограничения, влияющие на выбор техники, до выбора подхода.'
      }
    },
    {
      id: 'stg_cd_strategy',
      type: 'STRATEGY',
      order: 2,
      title: { en: '2. Choose Strategy', ru: '2. Выбор Стратегии' },
      instructions: {
        en: 'Pick an approach and justify it. This workshop path continues with HashSet mechanics.',
        ru: 'Выберите подход и обоснуйте его. Путь этого воркшопа продолжается механикой HashSet.'
      }
    },
    {
      id: 'stg_cd_blueprint',
      type: 'BLUEPRINT',
      order: 3,
      title: { en: '3. Algorithm Blueprint', ru: '3. Чертёж Алгоритма' },
      instructions: {
        en: 'Assemble the control-flow blocks for the HashSet approach — no Java yet.',
        ru: 'Соберите блоки управления для подхода HashSet — пока без Java.'
      }
    },
    {
      id: 'stg_cd_mosaic',
      type: 'CODE_MOSAIC',
      order: 4,
      title: { en: '4. Code Mosaic', ru: '4. Кодовый Мозаика' },
      instructions: {
        en: 'Rebuild the Java solution from tiles. Discard lines that do not belong.',
        ru: 'Соберите Java-решение из плиток. Отбросьте строки, которые не принадлежат решению.'
      }
    },
    {
      id: 'stg_cd_trace',
      type: 'TRACE',
      order: 5,
      title: { en: '5. Execution Trace', ru: '5. Трассировка' },
      instructions: {
        en: 'Simulate the HashSet algorithm one step at a time.',
        ru: 'Просимулируйте алгоритм HashSet шаг за шагом.'
      }
    },
    {
      id: 'stg_cd_summary',
      type: 'SUMMARY',
      order: 6,
      title: { en: '6. Workshop Summary', ru: '6. Итоги Воркшопа' },
      instructions: {
        en: 'Review honest metrics and reflect on why a Set fits this problem.',
        ru: 'Просмотрите честные метрики и подумайте, почему Set подходит к этой задаче.'
      }
    }
  ],
  availability: 'AVAILABLE',
  provenanceNote: {
    en: 'Common public interview-preparation problem used to teach membership hashing. No company attribution.',
    ru: 'Распространённая публичная задача для подготовки к интервью, обучающая membership-хэшированию. Без атрибуции компании.'
  }
};

export const CONTAINS_DUPLICATE_CLARIFY: readonly ClarifyQuestion[] = [
  {
    id: 'cq_cd_empty',
    prompt: {
      en: 'May the array be empty in practice / local edge tests?',
      ru: 'Может ли массив быть пустым на практике / в локальных edge-тестах?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_empty_yes',
        text: { en: 'Yes — treat empty as no duplicate (false)', ru: 'Да — пустой массив = нет дубликата (false)' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Even if some statements say length ≥ 1, defending empty → false is interview-safe.',
          ru: 'Верно. Даже если в условии length ≥ 1, защитный empty → false безопасен на интервью.'
        }
      },
      {
        id: 'cq_cd_empty_crash',
        text: { en: 'No — empty arrays never appear', ru: 'Нет — пустые массивы не встречаются' },
        isCorrect: false,
        feedback: {
          en: 'Risky assumption. Prefer defining empty behavior explicitly.',
          ru: 'Рискованное допущение. Лучше явно определить поведение для empty.'
        }
      }
    ]
  },
  {
    id: 'cq_cd_neg',
    prompt: {
      en: 'Are negative values allowed?',
      ru: 'Допустимы ли отрицательные значения?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_neg_yes',
        text: { en: 'Yes — full integer range', ru: 'Да — полный диапазон целых' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Negatives rule out tiny non-negative bitsets / array marking.',
          ru: 'Верно. Отрицательные исключают крошечные bitset / marking только для неотрицательных.'
        }
      },
      {
        id: 'cq_cd_neg_no',
        text: { en: 'No — only non-negative', ru: 'Нет — только неотрицательные' },
        isCorrect: false,
        feedback: {
          en: 'Constraints allow negatives. Range-based marking is not generally safe.',
          ru: 'Ограничения допускают отрицательные. Range-based marking в общем случае небезопасен.'
        }
      }
    ]
  },
  {
    id: 'cq_cd_bool',
    prompt: {
      en: 'What must the method return?',
      ru: 'Что должен вернуть метод?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_bool_only',
        text: { en: 'Only a boolean (duplicate exists?)', ru: 'Только boolean (есть ли дубликат?)' },
        isCorrect: true,
        feedback: {
          en: 'Correct. You do not need the value or indices unless a follow-up asks.',
          ru: 'Верно. Значение или индексы не нужны, пока follow-up этого не потребует.'
        }
      },
      {
        id: 'cq_cd_bool_value',
        text: { en: 'The duplicated value itself', ru: 'Само продублированное значение' },
        isCorrect: false,
        feedback: {
          en: 'Over-specified. The contract is boolean presence.',
          ru: 'Лишнее. Контракт — наличие (boolean).'
        }
      }
    ]
  },
  {
    id: 'cq_cd_early',
    prompt: {
      en: 'Is an early return allowed when a duplicate is found?',
      ru: 'Допустим ли ранний return при нахождении дубликата?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_early_yes',
        text: { en: 'Yes — stop at first duplicate', ru: 'Да — остановиться на первом дубликате' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Early exit is valid and preferred for this boolean contract.',
          ru: 'Верно. Ранний выход допустим и предпочтителен для boolean-контракта.'
        }
      },
      {
        id: 'cq_cd_early_no',
        text: { en: 'No — must always scan the entire array', ru: 'Нет — всегда нужно просмотреть весь массив' },
        isCorrect: false,
        feedback: {
          en: 'Unnecessary. Once true is known, further scanning adds no information.',
          ru: 'Не обязательно. Когда true уже известен, дальнейший просмотр ничего не даёт.'
        }
      }
    ]
  },
  {
    id: 'cq_cd_order',
    prompt: {
      en: 'Must the original input order remain unchanged?',
      ru: 'Должен ли исходный порядок массива остаться неизменным?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_order_unspecified',
        text: {
          en: 'Not stated — sorting would mutate unless you copy first',
          ru: 'Не сказано — сортировка мутирует, если не копировать'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Sorting is allowed only if mutation/copy trade-offs are acceptable.',
          ru: 'Верно. Сортировка допустима только если приемлемы мутация/копия.'
        }
      },
      {
        id: 'cq_cd_order_must',
        text: { en: 'Order must always be preserved by the statement', ru: 'Условие всегда требует сохранить порядок' },
        isCorrect: false,
        feedback: {
          en: 'The classic statement does not forbid sorting, but mutation is a real trade-off.',
          ru: 'Классическое условие не запрещает сортировку, но мутация — реальный компромисс.'
        }
      }
    ]
  },
  {
    id: 'cq_cd_mem',
    prompt: {
      en: 'Is a strict memory restriction stated?',
      ru: 'Заявлено ли жёсткое ограничение по памяти?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cd_mem_no',
        text: { en: 'No — O(n) extra memory is acceptable unless follow-up', ru: 'Нет — O(n) доп. памяти допустима без follow-up' },
        isCorrect: true,
        feedback: {
          en: 'Correct. HashSet is fair; O(1) space is a common follow-up, not the base ask.',
          ru: 'Верно. HashSet уместен; O(1) памяти — частый follow-up, не базовый запрос.'
        }
      },
      {
        id: 'cq_cd_mem_yes',
        text: { en: 'Yes — must use O(1) extra memory', ru: 'Да — только O(1) дополнительной памяти' },
        isCorrect: false,
        feedback: {
          en: 'Not stated in the base problem. That would push toward sorting.',
          ru: 'В базовой задаче не сказано. Тогда ближе сортировка.'
        }
      }
    ]
  }
];
