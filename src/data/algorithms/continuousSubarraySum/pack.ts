import {
  AlgorithmWorkshopPack,
  AlgorithmHint,
  AlgorithmSolution,
  AlgorithmStrategyOption,
  BlueprintGraph,
  ClarifyQuestion,
  MosaicDistractor,
  TraceScenario,
  WorkshopSummaryContent
} from '../../../types/algorithmLab';
import { standardWorkshopStages } from '../shared/standardStages';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';

const PROBLEM_ID = 'alg_continuous_subarray_sum';
const TARGET_STRATEGY_ID = 'strat_css_prefix_remainder';
const SOLUTION_ID = 'sol_continuous_subarray_sum_prefix_remainder';
const MOSAIC_ID = 'mos_css_prefix_remainder';

const problem = {
  id: PROBLEM_ID,
  slug: 'continuous-subarray-sum',
  title: { en: 'Continuous Subarray Sum', ru: 'Непрерывная Сумма Подмассива' },
  summary: {
    en: 'Decide whether a contiguous subarray of length at least 2 has a sum that is a multiple of k.',
    ru: 'Определите, существует ли непрерывный подмассив длины ≥ 2, сумма которого кратна k.'
  },
  statement: {
    en: 'Given an integer array `nums` and an integer `k`, return `true` if `nums` has a continuous (contiguous) subarray of size at least two whose elements sum to a multiple of `k` (that is, sum = n·k for some integer n), otherwise return `false`.',
    ru: 'Дан массив целых `nums` и целое `k`. Верните `true`, если есть непрерывный подмассив длины не меньше двух, сумма элементов которого кратна `k` (sum = n·k для целого n), иначе `false`.'
  },
  examples: [
    {
      id: 'ex_css_1',
      input: 'nums = [23,2,4,6,7], k = 6',
      output: 'true',
      explanation: {
        en: 'Subarray [2,4] sums to 6, a multiple of 6.',
        ru: 'Подмассив [2,4] даёт сумму 6 — кратно 6.'
      }
    },
    {
      id: 'ex_css_2',
      input: 'nums = [23,2,6,4,7], k = 6',
      output: 'true',
      explanation: {
        en: 'Subarray [23,2,6,4,7] sums to 42 = 7·6; shorter multiples also exist.',
        ru: 'Подмассив [23,2,6,4,7] даёт 42 = 7·6; есть и более короткие кратные.'
      }
    },
    {
      id: 'ex_css_3',
      input: 'nums = [23,2,6,4,7], k = 13',
      output: 'false',
      explanation: {
        en: 'No contiguous subarray of length ≥ 2 is a multiple of 13.',
        ru: 'Нет непрерывного подмассива длины ≥ 2, сумма которого кратна 13.'
      }
    }
  ],
  constraints: [
    {
      id: 'c_css_1',
      text: {
        en: '`1 <= nums.length <= 10^5` in typical statements.',
        ru: '`1 <= nums.length <= 10^5` в типичных формулировках.'
      }
    },
    {
      id: 'c_css_2',
      text: {
        en: '`0 <= nums[i] <= 10^9` — zeros are allowed.',
        ru: '`0 <= nums[i] <= 10^9` — нули допустимы.'
      }
    },
    {
      id: 'c_css_3',
      text: {
        en: '`0 <= k <= 10^9` — treat k = 0 / k = 1 carefully in clarify.',
        ru: '`0 <= k <= 10^9` — осторожно с k = 0 / k = 1 в уточнении.'
      }
    },
    {
      id: 'c_css_4',
      text: {
        en: 'Subarray must be contiguous and length ≥ 2.',
        ru: 'Подмассив должен быть непрерывным и длины ≥ 2.'
      }
    }
  ],
  patternFamilyId: 'pat_prefix_sum',
  difficulty: 'MEDIUM' as const,
  estimatedMinutes: 30,
  stages: standardWorkshopStages('css', {
    STRATEGY: {
      en: 'Compare brute subarray sums with the prefix-remainder map that preserves earliest indices.',
      ru: 'Сравните brute суммы подмассивов с картой prefix-остатков, сохраняющей earliest indices.'
    },
    BLUEPRINT: {
      en: 'Assemble prefix % k → earliest index map → length ≥ 2 check blocks (no Java yet).',
      ru: 'Соберите блоки prefix % k → карта earliest index → проверка длины ≥ 2 (пока без Java).'
    },
    TRACE: {
      en: 'Trace running prefix remainders and why the earliest index for a remainder must be kept.',
      ru: 'Проследите остатки префикса и почему нужно хранить earliest index для остатка.'
    }
  }),
  availability: 'AVAILABLE' as const,
  provenanceNote: {
    en: 'Common public interview-prep prefix/remainder problem used to teach earliest-index maps. No company attribution.',
    ru: 'Распространённая публичная задача prefix/остатков для обучения картам earliest index. Без атрибуции компании.'
  }
};

const clarify: readonly ClarifyQuestion[] = [
  {
    id: 'cq_css_len',
    prompt: {
      en: 'What is the minimum subarray length that counts?',
      ru: 'Какова минимальная длина подмассива, которая засчитывается?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_len_2',
        text: { en: 'At least 2', ru: 'Не меньше 2' },
        isCorrect: true,
        feedback: {
          en: 'Correct. A single element equal to a multiple of k is not enough.',
          ru: 'Верно. Одного элемента, кратного k, недостаточно.'
        }
      },
      {
        id: 'cq_css_len_1',
        text: { en: 'Length 1 is enough', ru: 'Достаточно длины 1' },
        isCorrect: false,
        feedback: {
          en: 'The statement requires size at least two.',
          ru: 'Условие требует размер не меньше двух.'
        }
      }
    ]
  },
  {
    id: 'cq_css_contig',
    prompt: {
      en: 'Must the subarray be contiguous?',
      ru: 'Должен ли подмассив быть непрерывным?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_contig_yes',
        text: {
          en: 'Yes — continuous means contiguous indices',
          ru: 'Да — continuous значит непрерывные индексы'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Subsequence (skipping elements) does not qualify.',
          ru: 'Верно. Подпоследовательность с пропусками не подходит.'
        }
      },
      {
        id: 'cq_css_contig_no',
        text: {
          en: 'No — any subset of elements is fine',
          ru: 'Нет — подойдёт любое подмножество'
        },
        isCorrect: false,
        feedback: {
          en: 'Subset/subsequence is a different problem.',
          ru: 'Подмножество/подпоследовательность — другая задача.'
        }
      }
    ]
  },
  {
    id: 'cq_css_k1',
    prompt: {
      en: 'If k = 1, when is the answer true?',
      ru: 'Если k = 1, когда ответ true?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_k1_ge2',
        text: {
          en: 'Whenever nums.length ≥ 2 (every integer sum is a multiple of 1)',
          ru: 'Когда nums.length ≥ 2 (любая целая сумма кратна 1)'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Every integer is  n·1; only the length ≥ 2 constraint remains.',
          ru: 'Верно. Любое целое = n·1; остаётся только ограничение длины ≥ 2.'
        }
      },
      {
        id: 'cq_css_k1_never',
        text: {
          en: 'Never — k = 1 is invalid input',
          ru: 'Никогда — k = 1 недопустимый вход'
        },
        isCorrect: false,
        feedback: {
          en: 'k = 1 is allowed and makes almost every long enough array true.',
          ru: 'k = 1 допустим и делает почти любой достаточно длинный массив true.'
        }
      }
    ]
  },
  {
    id: 'cq_css_k0',
    prompt: {
      en: 'What about k = 0?',
      ru: 'Что насчёт k = 0?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_k0_careful',
        text: {
          en: 'Clarify with interviewer — modulo by zero is undefined; often look for a contiguous zero-sum of length ≥ 2 or treat as edge',
          ru: 'Уточнить у интервьюера — % 0 не определён; часто ищут нулевую сумму длины ≥ 2 или считают edge'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Do not silently crash on `% k` when k is 0; state the assumed policy.',
          ru: 'Верно. Нельзя молча падать на `% k` при k = 0; озвучьте принятую политику.'
        }
      },
      {
        id: 'cq_css_k0_mod',
        text: {
          en: 'Just compute prefix % 0 as usual',
          ru: 'Просто считать prefix % 0 как обычно'
        },
        isCorrect: false,
        feedback: {
          en: 'Division/modulo by zero is undefined — must special-case or reject.',
          ru: 'Деление/остаток от нуля не определены — нужен special-case или отказ.'
        }
      }
    ]
  },
  {
    id: 'cq_css_multiple',
    prompt: {
      en: 'Does “multiple of k” include 0?',
      ru: 'Входит ли 0 в «кратные k»?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_multiple_yes',
        text: {
          en: 'Yes — sum 0 = 0·k counts (e.g. [0,0])',
          ru: 'Да — сумма 0 = 0·k засчитывается (например [0,0])'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Two consecutive zeros are a classic true case when k ≠ 0.',
          ru: 'Верно. Два подряд нуля — классический true-кейс при k ≠ 0.'
        }
      },
      {
        id: 'cq_css_multiple_no',
        text: {
          en: 'No — only positive multiples',
          ru: 'Нет — только положительные кратные'
        },
        isCorrect: false,
        feedback: {
          en: '0 is an integer multiple of k.',
          ru: '0 — целое кратное k.'
        }
      }
    ]
  },
  {
    id: 'cq_css_neg_mod',
    prompt: {
      en: 'Why might the solution normalize `remainder` when it is negative?',
      ru: 'Зачем решению нормализовать отрицательный `remainder`?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_css_neg_mod_java',
        text: {
          en: 'Java % can be negative; map keys must be in [0, k−1]',
          ru: 'В Java % может быть отрицательным; ключи карты в [0, k−1]'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Adding k when remainder < 0 keeps the map consistent.',
          ru: 'Верно. Прибавление k при remainder < 0 делает карту согласованной.'
        }
      },
      {
        id: 'cq_css_neg_mod_never',
        text: {
          en: 'Remainders are never negative under these constraints',
          ru: 'При этих ограничениях остатки никогда не отрицательны'
        },
        isCorrect: false,
        feedback: {
          en: 'With non-negative nums and positive k, prefix % k is non-negative — but defensive normalization is still interview-safe.',
          ru: 'При неотрицательных nums и положительном k prefix % k ≥ 0 — но защитная нормализация всё равно безопасна на интервью.'
        }
      }
    ]
  }
];

const strategies: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_css_brute',
    problemId: PROBLEM_ID,
    title: { en: 'Brute all subarrays', ru: 'Brute по всем подмассивам' },
    description: {
      en: 'For every i < j, sum nums[i..j] and test divisibility by k.',
      ru: 'Для каждой пары i < j суммировать nums[i..j] и проверять делимость на k.'
    },
    timeClass: 'O(n²)–O(n³)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Too slow for n ≈ 10^5.',
      ru: 'Слишком медленно при n ≈ 10^5.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'Direct definition', ru: 'Прямое определение' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Prefix sum remainders + earliest index', ru: 'Остатки prefix sum + earliest index' },
    description: {
      en: 'Map remainder → first index; same remainder with index gap ≥ 2 means a divisible subarray.',
      ru: 'Карта remainder → первый индекс; тот же remainder с разрывом индексов ≥ 2 значит делимый подмассив.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(min(n, k))',
    importantConstraint: {
      en: 'Must keep the earliest index for each remainder — overwriting can hide a valid length ≥ 2 window.',
      ru: 'Нужно хранить earliest index для каждого remainder — перезапись может скрыть окно длины ≥ 2.'
    },
    viability: 'TARGET',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'prefix[j]−prefix[i] ≡ 0 (mod k)', ru: 'prefix[j]−prefix[i] ≡ 0 (mod k)' },
      { en: 'Seed map with (0 → −1)', ru: 'Инициализация карты (0 → −1)' },
      { en: 'Preserve earliest index', ru: 'Сохранять earliest index' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_css_overwrite',
    problemId: PROBLEM_ID,
    title: { en: 'Remainder map that overwrites indices', ru: 'Карта остатков с перезаписью индексов' },
    description: {
      en: 'Always store the latest index for a remainder — breaks length ≥ 2 detection.',
      ru: 'Всегда писать последний индекс для остатка — ломает детект длины ≥ 2.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(min(n, k))',
    importantConstraint: {
      en: 'Looks similar to the target but is incorrect for this length constraint.',
      ru: 'Похоже на целевой подход, но неверно из‑за ограничения длины.'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Overwrites hide long windows', ru: 'Перезапись скрывает длинные окна' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_css_set_only',
    problemId: PROBLEM_ID,
    title: { en: 'Set of seen remainders only', ru: 'Только Set виденных остатков' },
    description: {
      en: 'Track whether a remainder appeared, without indices — cannot enforce length ≥ 2.',
      ru: 'Помнить, встречался ли остаток, без индексов — нельзя обеспечить длину ≥ 2.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(min(n, k))',
    importantConstraint: {
      en: 'Insufficient: adjacent same remainder can be length 1 (e.g. adding a multiple of k once).',
      ru: 'Недостаточно: соседний тот же remainder может дать длину 1 (например, добавили кратное k один раз).'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Needs indices for gap ≥ 2', ru: 'Нужны индексы для разрыва ≥ 2' }
    ],
    unlocksBlueprint: false
  }
];

const blueprint: BlueprintGraph = {
  id: 'bp_css_prefix_remainder',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_css_seed',
      label: {
        en: 'Seed map with remainder 0 → index −1',
        ru: 'Инициализировать карту: остаток 0 → индекс −1'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_loop',
      label: { en: 'Scan each index, grow prefix sum', ru: 'Идти по индексам, накапливая prefix' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_rem',
      label: {
        en: 'Compute remainder = prefix % k (normalize if negative)',
        ru: 'Вычислить remainder = prefix % k (нормализовать если < 0)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_lookup',
      label: {
        en: 'Look up earliest index for this remainder',
        ru: 'Найти earliest index для этого remainder'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_gap',
      label: {
        en: 'If seen and i − seen ≥ 2, return true',
        ru: 'Если видели и i − seen ≥ 2, вернуть true'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_store',
      label: {
        en: 'Else if unseen, store remainder → i (do not overwrite)',
        ru: 'Иначе если не видели — записать remainder → i (не перезаписывать)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_false',
      label: { en: 'Return false after the scan', ru: 'Вернуть false после прохода' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_css_d_overwrite',
      label: {
        en: 'Always overwrite the map with the latest index',
        ru: 'Всегда перезаписывать карту последним индексом'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Overwriting loses the earliest index needed for length ≥ 2.',
        ru: 'Перезапись теряет earliest index, нужный для длины ≥ 2.'
      }
    },
    {
      id: 'bp_css_d_set',
      label: {
        en: 'Store remainders in a Set without indices',
        ru: 'Хранить остатки в Set без индексов'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Without indices you cannot enforce the length ≥ 2 rule.',
        ru: 'Без индексов нельзя обеспечить правило длины ≥ 2.'
      }
    },
    {
      id: 'bp_css_d_mod_zero',
      label: {
        en: 'Ignore k = 0 and always compute prefix % k',
        ru: 'Игнорировать k = 0 и всегда считать prefix % k'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Modulo by zero is undefined — must clarify / special-case.',
        ru: 'Остаток от деления на ноль не определён — нужно уточнить / special-case.'
      }
    },
    {
      id: 'bp_css_d_len1',
      label: {
        en: 'Return true when a single nums[i] % k == 0',
        ru: 'Вернуть true, если один nums[i] % k == 0'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Length-1 multiples do not satisfy the problem.',
        ru: 'Кратные длины 1 условию не удовлетворяют.'
      }
    }
  ],
  solutionOrder: [
    'bp_css_seed',
    'bp_css_loop',
    'bp_css_rem',
    'bp_css_lookup',
    'bp_css_gap',
    'bp_css_store',
    'bp_css_false'
  ]
};

const solutions: readonly AlgorithmSolution[] = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA',
    javaVersion: '17',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, k))',
    explanation: {
      en: 'Equal prefix remainders mean the middle sum is divisible by k; keep the earliest index so a gap of at least 2 is possible.',
      ru: 'Равные остатки prefix означают, что сумма середины делится на k; храните earliest index, чтобы возможен разрыв ≥ 2.'
    },
    canonicalCode: `
public boolean checkSubarraySum(int[] nums, int k) {
    Map<Integer, Integer> firstIndex = new HashMap<>();
    firstIndex.put(0, -1);
    int prefix = 0;
    for (int i = 0; i < nums.length; i++) {
        prefix += nums[i];
        int remainder = prefix % k;
        if (remainder < 0) {
            remainder += k;
        }
        Integer seen = firstIndex.get(remainder);
        if (seen != null) {
            if (i - seen >= 2) {
                return true;
            }
        } else {
            firstIndex.put(remainder, i);
        }
    }
    return false;
}
`.trim()
  }
];

const distractors: readonly MosaicDistractor[] = [
  {
    id: 'mos_css_d_overwrite',
    code: 'firstIndex.put(remainder, i);',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Unconditional put overwrites the earliest index — place it only in the else branch.',
      ru: 'Безусловный put перезаписывает earliest index — он должен быть только в else.'
    }
  },
  {
    id: 'mos_css_d_set',
    code: 'Set<Integer> seenRem = new HashSet<>();',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'A Set cannot enforce length ≥ 2 without indices.',
      ru: 'Set не обеспечивает длину ≥ 2 без индексов.'
    }
  },
  {
    id: 'mos_css_d_gap1',
    code: 'if (i - seen >= 1) {',
    indent: 3,
    role: 'DISTRACTOR_EDGE_CASE',
    explanation: {
      en: 'Gap ≥ 1 allows length-1 windows when remainder repeats after one step.',
      ru: 'Разрыв ≥ 1 допускает окна длины 1 при повторе remainder через один шаг.'
    }
  },
  {
    id: 'mos_css_d_no_seed',
    code: 'firstIndex.put(0, 0);',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Wrong sentinel — must seed 0 → −1 so a multiple prefix of length ≥ 2 can succeed.',
      ru: 'Неверный сентинел — нужно 0 → −1, иначе кратный префикс длины ≥ 2 не сработает.'
    }
  },
  {
    id: 'mos_css_d_mod_abs',
    code: 'int remainder = Math.abs(prefix % k);',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'abs is the wrong normalization when k is negative; prefer remainder += k when < 0.',
      ru: 'abs — неверная нормализация при отрицательном k; лучше remainder += k при < 0.'
    }
  },
  {
    id: 'mos_css_d_compile',
    code: 'Map<int, int> firstIndex = new HashMap<>();',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Does not compile — generics need Integer, not primitive int.',
      ru: 'Не компилируется — дженерикам нужен Integer, не примитив int.'
    }
  },
  {
    id: 'mos_css_d_return_i',
    code: 'return i - seen >= 2;',
    indent: 3,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Returning the boolean expression can yield false too early while a later window succeeds.',
      ru: 'Возврат boolean-выражения может дать false слишком рано, пока позже окно ещё возможно.'
    }
  },
  {
    id: 'mos_css_d_sort',
    code: 'Arrays.sort(nums);',
    indent: 1,
    role: 'DISTRACTOR_IRRELEVANT',
    explanation: {
      en: 'Sorting destroys contiguous subarray structure.',
      ru: 'Сортировка уничтожает структуру непрерывного подмассива.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Equivalent idea: store first occurrence of each prefix % k; never overwrite. Length check is i − firstIndex ≥ 2.',
  ru: 'Эквивалентная идея: хранить первое вхождение каждого prefix % k; никогда не перезаписывать. Проверка длины: i − firstIndex ≥ 2.'
} as const;

const NUMS = [23, 2, 4, 6, 7] as const;

const trace: TraceScenario = {
  id: 'tr_css_main',
  problemId: PROBLEM_ID,
  kind: 'PREFIX_REMAINDER',
  label: { en: 'Primary prefix-remainder trace', ru: 'Основная трассировка prefix-остатков' },
  inputSummary: {
    en: 'nums = [23,2,4,6,7], k = 6',
    ru: 'nums = [23,2,4,6,7], k = 6'
  },
  arrayInput: [...NUMS],
  steps: [
    {
      id: 'tr_css_0',
      title: { en: 'Seed the map', ru: 'Инициализация карты' },
      narrative: {
        en: 'firstIndex starts with 0 → −1 so a prefix that is itself a multiple of k can form a valid subarray from the start.',
        ru: 'firstIndex стартует с 0 → −1, чтобы префикс, сам кратный k, мог образовать валидный подмассив с начала.'
      },
      state: { map: '{0 → -1}', prefix: '0', k: '6' },
      question: {
        en: 'Why store index −1 for remainder 0?',
        ru: 'Зачем хранить индекс −1 для остатка 0?'
      },
      choices: [
        {
          id: 'prefix_from_start',
          text: {
            en: 'So a multiple prefix of length ≥ 2 yields i − (−1) ≥ 2',
            ru: 'Чтобы кратный префикс длины ≥ 2 дал i − (−1) ≥ 2'
          }
        },
        {
          id: 'pretty',
          text: { en: 'Only for nicer printing', ru: 'Только для красивого вывода' }
        }
      ],
      correctChoiceId: 'prefix_from_start',
      feedbackCorrect: {
        en: 'At i = 1, gap from −1 is 2 — the shortest valid window from the start.',
        ru: 'При i = 1 разрыв от −1 равен 2 — кратчайшее валидное окно с начала.'
      },
      feedbackIncorrect: {
        en: 'The −1 sentinel makes length arithmetic work for prefixes.',
        ru: 'Сентинел −1 делает арифметику длины корректной для префиксов.'
      },
      highlightIndex: 0
    },
    {
      id: 'tr_css_1',
      title: { en: 'Visit 23', ru: 'Посетить 23' },
      narrative: {
        en: 'prefix = 23, remainder = 23 % 6 = 5. Remainder 5 is unseen → store 5 → 0.',
        ru: 'prefix = 23, remainder = 23 % 6 = 5. Остаток 5 новый → записать 5 → 0.'
      },
      state: { i: '0', prefix: '23', remainder: '5', map: '{0 → -1, 5 → 0}', action: 'store' },
      question: {
        en: 'Should we return true at i = 0?',
        ru: 'Нужно ли вернуть true при i = 0?'
      },
      choices: [
        { id: 'no', text: { en: 'No — first occurrence only', ru: 'Нет — только первое вхождение' } },
        { id: 'yes', text: { en: 'Yes — 23 is nonzero', ru: 'Да — 23 ненулевое' } }
      ],
      correctChoiceId: 'no',
      feedbackCorrect: {
        en: 'No prior same remainder with gap ≥ 2; continue.',
        ru: 'Нет прежнего того же remainder с разрывом ≥ 2; продолжаем.'
      },
      feedbackIncorrect: {
        en: 'A single element never satisfies length ≥ 2 by itself here.',
        ru: 'Один элемент сам по себе здесь не даёт длину ≥ 2.'
      },
      highlightIndex: 0
    },
    {
      id: 'tr_css_2',
      title: { en: 'Visit 2', ru: 'Посетить 2' },
      narrative: {
        en: 'prefix = 25, remainder = 25 % 6 = 1. Unseen → store 1 → 1.',
        ru: 'prefix = 25, remainder = 25 % 6 = 1. Новый → записать 1 → 1.'
      },
      state: { i: '1', prefix: '25', remainder: '1', map: '{0 → -1, 5 → 0, 1 → 1}', action: 'store' },
      question: {
        en: 'If remainder 1 appeared again later, which stored index must we keep?',
        ru: 'Если остаток 1 появится снова позже, какой сохранённый индекс нужно оставить?'
      },
      choices: [
        { id: 'earliest', text: { en: 'Index 1 (earliest)', ru: 'Индекс 1 (earliest)' } },
        { id: 'latest', text: { en: 'Always the newest index', ru: 'Всегда самый новый индекс' } }
      ],
      correctChoiceId: 'earliest',
      feedbackCorrect: {
        en: 'Preserving earliest maximizes the chance that i − seen ≥ 2.',
        ru: 'Сохранение earliest максимизирует шанс, что i − seen ≥ 2.'
      },
      feedbackIncorrect: {
        en: 'Overwriting with a later index can make the gap look too small.',
        ru: 'Перезапись более поздним индексом может сделать разрыв слишком маленьким.'
      },
      highlightIndex: 1
    },
    {
      id: 'tr_css_3',
      title: { en: 'Visit 4 — hit remainder 5', ru: 'Посетить 4 — попадание в остаток 5' },
      narrative: {
        en: 'prefix = 29, remainder = 29 % 6 = 5. Seen earlier at index 0. Gap = 2 − 0 = 2.',
        ru: 'prefix = 29, remainder = 29 % 6 = 5. Ранее на индексе 0. Разрыв = 2 − 0 = 2.'
      },
      state: {
        i: '2',
        prefix: '29',
        remainder: '5',
        seen: '0',
        gap: '2',
        map: '{0 → -1, 5 → 0, 1 → 1}',
        subarray: '[2,4]'
      },
      question: {
        en: 'What does the method return now?',
        ru: 'Что метод возвращает сейчас?'
      },
      choices: [
        { id: 'true', text: { en: 'true — divisible subarray length 2', ru: 'true — делимый подмассив длины 2' } },
        { id: 'continue', text: { en: 'Keep scanning', ru: 'Продолжить сканирование' } }
      ],
      correctChoiceId: 'true',
      feedbackCorrect: {
        en: 'i − seen ≥ 2 and same remainder ⇒ sum(nums[1..2]) = 6 is a multiple of k.',
        ru: 'i − seen ≥ 2 и тот же remainder ⇒ sum(nums[1..2]) = 6 кратна k.'
      },
      feedbackIncorrect: {
        en: 'Gap of 2 is enough — return true immediately.',
        ru: 'Разрыва 2 достаточно — сразу вернуть true.'
      },
      highlightIndex: 2
    }
  ],
  followUpQuestion: {
    en: 'Why must we NOT overwrite firstIndex when a remainder is already present but i − seen < 2?',
    ru: 'Почему НЕЛЬЗЯ перезаписывать firstIndex, если remainder уже есть, но i − seen < 2?'
  },
  followUpChoices: [
    {
      id: 'keep_earliest',
      text: {
        en: 'Keep earliest so a later index can still form gap ≥ 2',
        ru: 'Оставить earliest, чтобы более поздний индекс ещё мог дать разрыв ≥ 2'
      }
    },
    {
      id: 'must_overwrite',
      text: {
        en: 'Must overwrite — latest index is always better',
        ru: 'Нужно перезаписать — последний индекс всегда лучше'
      }
    }
  ],
  followUpCorrectChoiceId: 'keep_earliest',
  followUpFeedbackCorrect: {
    en: 'Leaving the early index untouched is the whole point of earliest-index preservation.',
    ru: 'Не трогать ранний индекс — вся суть сохранения earliest index.'
  },
  followUpFeedbackIncorrect: {
    en: 'Overwriting to i when gap is 1 often blocks a valid later window.',
    ru: 'Перезапись на i при разрыве 1 часто блокирует валидное позднее окно.'
  }
};

const hints: readonly AlgorithmHint[] = [
  {
    id: 'hnt_css_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Seed the remainder map with 0 → −1 before scanning.',
      ru: 'Инициализируйте карту остатков 0 → −1 до сканирования.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'Same remainder twice with index gap ≥ 2 means the middle sum is divisible by k.',
      ru: 'Тот же remainder дважды с разрывом индексов ≥ 2 значит сумма середины делится на k.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'Only put into the map when the remainder is unseen — never overwrite.',
      ru: 'Пишите в карту только если remainder ещё не встречался — никогда не перезаписывайте.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_bp_4',
    stageType: 'BLUEPRINT',
    level: 4,
    text: {
      en: 'Revealing the first block: Seed map with remainder 0 → index −1.',
      ru: 'Открываем первый блок: Инициализировать карту: остаток 0 → индекс −1.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_css_seed'
  },
  {
    id: 'hnt_css_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'HashMap firstIndex; put(0, -1); then loop with prefix and remainder.',
      ru: 'HashMap firstIndex; put(0, -1); затем цикл с prefix и remainder.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'Critical structure: if (seen != null) { if (i - seen >= 2) return true; } else { put }.',
      ru: 'Ключевая структура: if (seen != null) { if (i - seen >= 2) return true; } else { put }.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_mos_3',
    stageType: 'CODE_MOSAIC',
    level: 3,
    text: {
      en: 'Reveal the seed tile firstIndex.put(0, -1).',
      ru: 'Открываем плитку инициализации firstIndex.put(0, -1).'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_003`
  },
  {
    id: 'hnt_css_mos_4',
    stageType: 'CODE_MOSAIC',
    level: 4,
    text: {
      en: 'Reveal the length-check tile i - seen >= 2.',
      ru: 'Открываем плитку проверки длины i - seen >= 2.'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_013`
  },
  {
    id: 'hnt_css_mos_5',
    stageType: 'CODE_MOSAIC',
    level: 5,
    text: {
      en: 'Full solution reveal is available as a last resort after prior hints.',
      ru: 'Полное раскрытие решения доступно как крайняя мера после предыдущих подсказок.'
    },
    revealType: 'FULL'
  },
  {
    id: 'hnt_css_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'Watch remainder collisions: 23 and 29 both leave remainder 5.',
      ru: 'Следите за коллизиями остатков: 23 и 29 дают remainder 5.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_css_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'Earliest index for 5 stays 0 — that is what makes gap 2 at i = 2.',
      ru: 'Earliest index для 5 остаётся 0 — поэтому при i = 2 разрыв равен 2.'
    },
    revealType: 'NONE'
  }
];

const summary: WorkshopSummaryContent = {
  corePattern: {
    en: 'Prefix remainders — equal prefix % k with earliest-index gap ≥ 2 detects a divisible contiguous sum.',
    ru: 'Остатки prefix — равные prefix % k с разрывом earliest-index ≥ 2 детектируют делимую непрерывную сумму.'
  },
  invariant: {
    en: 'firstIndex[r] is the smallest index i where prefix(i) % k == r (plus the 0 → −1 sentinel).',
    ru: 'firstIndex[r] — наименьший индекс i, где prefix(i) % k == r (плюс сентинел 0 → −1).'
  },
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(min(n, k))',
  commonMistake: {
    en: 'Overwriting map indices, forgetting put(0,−1), or accepting length-1 multiples.',
    ru: 'Перезапись индексов в карте, забытый put(0,−1) или принятие кратных длины 1.'
  },
  recognitionCue: {
    en: '“Contiguous sum multiple of k” / length ≥ 2 → prefix % k + earliest index map.',
    ru: '«Непрерывная сумма кратна k» / длина ≥ 2 → prefix % k + карта earliest index.'
  }
};

export const CONTINUOUS_SUBARRAY_SUM_PACK: AlgorithmWorkshopPack = {
  problem,
  clarify,
  strategies,
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint,
  solutions,
  distractors,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. Earliest remainder index + gap ≥ 2 finds a multiple subarray.',
    ru: 'Мозаика собрана. Earliest index остатка + разрыв ≥ 2 находит кратный подмассив.'
  },
  blueprintHelp: {
    en: 'Assemble prefix-remainder logic blocks. Java is still hidden.',
    ru: 'Соберите логические блоки prefix-остатков. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: seed → loop → remainder → lookup → gap ≥ 2 / store earliest → false.',
    ru: 'Чертёж верен: seed → loop → remainder → lookup → разрыв ≥ 2 / store earliest → false.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions,
    distractors,
    alternativeNote: mosaicAlternativeNote,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace,
  hints,
  reflectionPrompt: {
    en: 'Why does overwriting a remainder’s index with a later one break length ≥ 2 detection?',
    ru: 'Почему перезапись индекса остатка более поздним ломает детект длины ≥ 2?'
  },
  summary
};

export const CONTINUOUS_SUBARRAY_SUM_DEFAULT_SOLUTION_STRATEGY_ID = TARGET_STRATEGY_ID;
export const CONTINUOUS_SUBARRAY_SUM_SOLUTION_ID = SOLUTION_ID;
