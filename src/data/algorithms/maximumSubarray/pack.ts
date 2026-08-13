import {
  AlgorithmWorkshopPack,
  AlgorithmSolution,
  BlueprintGraph,
  ClarifyQuestion,
  AlgorithmHint,
  AlgorithmStrategyOption,
  MosaicDistractor,
  TraceScenario
} from '../../../types/algorithmLab';
import { standardWorkshopStages } from '../shared/standardStages';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';

const PROBLEM_ID = 'alg_maximum_subarray';
const TARGET_STRATEGY_ID = 'strat_ms_kadane';
const SOLUTION_ID = 'sol_maximum_subarray_kadane';
const MOSAIC_ID = 'mos_ms_kadane';

const SOLUTIONS: readonly AlgorithmSolution[] = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA',
    javaVersion: '17',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation: {
      en: 'Kadane: at each index, either extend the best subarray ending here or start fresh at nums[i].',
      ru: 'Кадане: на каждом индексе либо продлить лучший подмассив, оканчивающийся здесь, либо начать заново с nums[i].'
    },
    canonicalCode: `
public int maxSubArray(int[] nums) {
    int bestEndingHere = nums[0];
    int bestSoFar = nums[0];
    for (int i = 1; i < nums.length; i++) {
        bestEndingHere = Math.max(nums[i], bestEndingHere + nums[i]);
        bestSoFar = Math.max(bestSoFar, bestEndingHere);
    }
    return bestSoFar;
}
`.trim()
  }
];

const STRATEGIES: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_ms_nested',
    problemId: PROBLEM_ID,
    title: { en: 'Enumerate all subarrays', ru: 'Перебрать все подмассивы' },
    description: {
      en: 'For every i..j range, sum the segment and track the maximum.',
      ru: 'Для каждого диапазона i..j суммировать сегмент и хранить максимум.'
    },
    timeClass: 'O(n²)–O(n³)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Fine for tiny n; too slow for typical n ≈ 10^5.',
      ru: 'Подходит для крошечного n; слишком медленно при типичном n ≈ 10^5.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'Brute force baseline', ru: 'Базовый brute force' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Kadane running DP', ru: 'Бегущее DP Кадане' },
    description: {
      en: 'Track best subarray ending at i and the global best in one left-to-right pass.',
      ru: 'Хранить лучший подмассив, оканчивающийся в i, и глобальный лучший за один проход слева направо.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Must initialize from nums[0] so all-negative arrays still return the largest element.',
      ru: 'Нужно инициализировать от nums[0], чтобы массивы из отрицательных всё ещё возвращали наибольший элемент.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'One linear pass', ru: 'Один линейный проход' },
      { en: 'Constant extra memory', ru: 'Константная доп. память' },
      { en: 'Handles all-negative', ru: 'Обрабатывает все отрицательные' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_ms_dnc',
    problemId: PROBLEM_ID,
    title: { en: 'Divide and conquer', ru: 'Разделяй и властвуй' },
    description: {
      en: 'Solve left/right halves and combine with a crossing mid segment.',
      ru: 'Решить левую/правую половины и объединить с сегментом через mid.'
    },
    timeClass: 'O(n log n)',
    spaceClass: 'O(log n)',
    importantConstraint: {
      en: 'Valid interview alternative, but heavier than Kadane for this slice.',
      ru: 'Валидная альтернатива на интервью, но тяжелее Кадане для этого среза.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Classic D&C teaching path', ru: 'Классический учебный путь D&C' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_ms_prefix',
    problemId: PROBLEM_ID,
    title: { en: 'Prefix sums + min prefix', ru: 'Префиксные суммы + min prefix' },
    description: {
      en: 'answer = max over i of (prefix[i] - min prefix before i).',
      ru: 'ответ = max по i от (prefix[i] − min prefix до i).'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1)–O(n)',
    importantConstraint: {
      en: 'Same asymptotics; Kadane is the tighter teaching invariant for this workshop.',
      ru: 'Та же асимптотика; Кадане — более жёсткий учебный инвариант для воркшопа.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: [],
    justificationChips: [
      { en: 'Prefix-min viewpoint', ru: 'Взгляд через prefix-min' }
    ],
    unlocksBlueprint: false
  }
];

const BLUEPRINT: BlueprintGraph = {
  id: 'bp_ms_kadane',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_ms_init',
      label: {
        en: 'Initialize bestEndingHere and bestSoFar from nums[0]',
        ru: 'Инициализировать bestEndingHere и bestSoFar из nums[0]'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ms_scan',
      label: { en: 'Scan each later index i from 1..n-1', ru: 'Сканировать каждый следующий индекс i от 1..n-1' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ms_extend',
      label: {
        en: 'Choose extend previous ending vs start new at nums[i]',
        ru: 'Выбрать: продлить предыдущее окончание или начать заново с nums[i]'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ms_global',
      label: {
        en: 'Update global best with the ending-here best',
        ru: 'Обновить глобальный лучший значением ending-here'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ms_return',
      label: { en: 'Return bestSoFar', ru: 'Вернуть bestSoFar' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ms_d_zero',
      label: {
        en: 'Initialize bests to 0 (assume a non-negative answer)',
        ru: 'Инициализировать лучшие нулём (допустить неотрицательный ответ)'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Fails on all-negative arrays where the answer is the largest (least negative) element.',
        ru: 'Ломается на массивах из отрицательных, где ответ — наибольший (наименее отрицательный) элемент.'
      }
    },
    {
      id: 'bp_ms_d_empty',
      label: { en: 'Allow an empty subarray with sum 0', ru: 'Допустить пустой подмассив с суммой 0' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'This problem requires a non-empty subarray.',
        ru: 'Эта задача требует непустой подмассив.'
      }
    },
    {
      id: 'bp_ms_d_reset_only',
      label: {
        en: 'Reset the running sum whenever it is positive',
        ru: 'Сбрасывать бегущую сумму, когда она положительна'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'You reset when the running sum is negative — positive prefixes should be kept.',
        ru: 'Сбрасывают, когда бегущая сумма отрицательна — положительные префиксы нужно сохранять.'
      }
    }
  ],
  solutionOrder: [
    'bp_ms_init',
    'bp_ms_scan',
    'bp_ms_extend',
    'bp_ms_global',
    'bp_ms_return'
  ]
};

const CLARIFY: readonly ClarifyQuestion[] = [
  {
    id: 'cq_ms_empty',
    prompt: {
      en: 'Is an empty subarray allowed?',
      ru: 'Допустим ли пустой подмассив?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ms_empty_no',
        text: { en: 'No — subarray must be non-empty', ru: 'Нет — подмассив должен быть непустым' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Even if every value is negative, return the largest element.',
          ru: 'Верно. Даже если все значения отрицательны, верните наибольший элемент.'
        }
      },
      {
        id: 'cq_ms_empty_yes',
        text: { en: 'Yes — empty sum 0 can beat negatives', ru: 'Да — пустая сумма 0 может бить отрицательные' },
        isCorrect: false,
        feedback: {
          en: 'Not for this classic statement — non-empty is required.',
          ru: 'Не для этой классической формулировки — нужен непустой.'
        }
      }
    ]
  },
  {
    id: 'cq_ms_contiguous',
    prompt: {
      en: 'Must the chosen elements be contiguous?',
      ru: 'Должны ли выбранные элементы быть непрерывными?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ms_contiguous_yes',
        text: { en: 'Yes — a contiguous subarray', ru: 'Да — непрерывный подмассив' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Subsequence (skipping elements) is a different problem.',
          ru: 'Верно. Подпоследовательность (с пропусками) — другая задача.'
        }
      },
      {
        id: 'cq_ms_contiguous_no',
        text: { en: 'No — any subset is fine', ru: 'Нет — подойдёт любое подмножество' },
        isCorrect: false,
        feedback: {
          en: 'Subset/subsequence would change the algorithm entirely.',
          ru: 'Подмножество/подпоследовательность полностью меняют алгоритм.'
        }
      }
    ]
  },
  {
    id: 'cq_ms_negative',
    prompt: {
      en: 'What should happen when every number is negative?',
      ru: 'Что должно произойти, если все числа отрицательные?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ms_negative_max',
        text: {
          en: 'Return the largest (least negative) element',
          ru: 'Вернуть наибольший (наименее отрицательный) элемент'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct — that single element is the best non-empty subarray.',
          ru: 'Верно — этот один элемент и есть лучший непустой подмассив.'
        }
      },
      {
        id: 'cq_ms_negative_zero',
        text: { en: 'Return 0', ru: 'Вернуть 0' },
        isCorrect: false,
        feedback: {
          en: 'Returning 0 implies an empty subarray, which is not allowed.',
          ru: 'Возврат 0 подразумевает пустой подмассив, что недопустимо.'
        }
      }
    ]
  },
  {
    id: 'cq_ms_init',
    prompt: {
      en: 'Why initialize from nums[0] instead of 0?',
      ru: 'Почему инициализировать от nums[0], а не от 0?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ms_init_neg',
        text: {
          en: 'So all-negative inputs do not collapse to 0',
          ru: 'Чтобы входы из отрицательных не схлопывались в 0'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Zero as a seed quietly allows an empty answer.',
          ru: 'Верно. Ноль как seed тихо допускает пустой ответ.'
        }
      },
      {
        id: 'cq_ms_init_speed',
        text: { en: 'Only because it is slightly faster', ru: 'Только потому что чуть быстрее' },
        isCorrect: false,
        feedback: {
          en: 'It is a correctness choice for the non-empty contract.',
          ru: 'Это выбор корректности для контракта непустого подмассива.'
        }
      }
    ]
  }
];

const DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'mos_ms_d_zero_init',
    code: 'int bestEndingHere = 0;',
    indent: 1,
    role: 'DISTRACTOR_EDGE_CASE',
    explanation: {
      en: 'Zero init breaks all-negative arrays under a non-empty contract.',
      ru: 'Инициализация нулём ломает массивы из отрицательных при непустом контракте.'
    }
  },
  {
    id: 'mos_ms_d_min',
    code: 'bestEndingHere = Math.min(nums[i], bestEndingHere + nums[i]);',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Kadane maximizes the ending sum — min is the wrong aggregator.',
      ru: 'Кадане максимизирует сумму окончания — min неверный агрегатор.'
    }
  },
  {
    id: 'mos_ms_d_only_add',
    code: 'bestEndingHere = bestEndingHere + nums[i];',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Forgets the option to restart at nums[i] when the prefix is harmful.',
      ru: 'Забывает вариант начать заново с nums[i], когда префикс вреден.'
    }
  },
  {
    id: 'mos_ms_d_nested',
    code: 'for (int j = i; j < nums.length; j++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Nested enumeration fragment — quadratic strategy.',
      ru: 'Фрагмент вложенного перебора — квадратичная стратегия.'
    }
  },
  {
    id: 'mos_ms_d_array',
    code: 'int[] dp = new int[nums.length];',
    indent: 1,
    role: 'DISTRACTOR_COMPLEXITY',
    explanation: {
      en: 'Full DP array is unnecessary — two scalars suffice.',
      ru: 'Полный DP-массив не нужен — достаточно двух скаляров.'
    }
  },
  {
    id: 'mos_ms_d_start_zero',
    code: 'for (int i = 0; i < nums.length; i++) {',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'If you start at 0 after seeding from nums[0], you double-process index 0 unless careful.',
      ru: 'Если стартовать с 0 после seed из nums[0], индекс 0 обработается дважды без осторожности.'
    }
  },
  {
    id: 'mos_ms_d_return_ending',
    code: 'return bestEndingHere;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Must return the global best, not only the best ending at the last index.',
      ru: 'Нужно вернуть глобальный лучший, не только лучший в конце последнего индекса.'
    }
  }
];

const ALTERNATIVE_NOTE = {
  en: 'Equivalent scalar form: if (sum < 0) sum = nums[i]; else sum += nums[i]; — same restart idea.',
  ru: 'Эквивалентная скалярная форма: if (sum < 0) sum = nums[i]; else sum += nums[i]; — та же идея перезапуска.'
} as const;

const TRACE: TraceScenario = {
  id: 'tr_ms_main',
  problemId: PROBLEM_ID,
  kind: 'RUNNING_DP',
  label: { en: 'Kadane on a short mixed array', ru: 'Кадане на коротком смешанном массиве' },
  inputSummary: {
    en: 'nums = [-2, 1, -3, 4, -1, 2, 1] → expect 6 (subarray [4,-1,2,1])',
    ru: 'nums = [-2, 1, -3, 4, -1, 2, 1] → ожидаем 6 (подмассив [4,-1,2,1])'
  },
  arrayInput: [-2, 1, -3, 4, -1, 2, 1],
  steps: [
    {
      id: 'tr_ms_0',
      title: { en: 'Seed from nums[0]', ru: 'Seed из nums[0]' },
      narrative: {
        en: 'bestEndingHere = bestSoFar = -2.',
        ru: 'bestEndingHere = bestSoFar = -2.'
      },
      state: {
        i: '0',
        bestEndingHere: '-2',
        bestSoFar: '-2'
      },
      question: {
        en: 'Why is the seed -2 instead of 0?',
        ru: 'Почему seed равен -2, а не 0?'
      },
      choices: [
        {
          id: 'nonempty',
          text: { en: 'Non-empty subarray — must consider nums[0]', ru: 'Непустой подмассив — нужно учесть nums[0]' }
        },
        {
          id: 'faster',
          text: { en: 'Only a micro-optimization', ru: 'Только микрооптимизация' }
        }
      ],
      correctChoiceId: 'nonempty',
      feedbackCorrect: {
        en: 'Seeding with 0 would invent an empty subarray.',
        ru: 'Seed нулём изобретал бы пустой подмассив.'
      },
      feedbackIncorrect: {
        en: 'This is correctness for all-negative / first-element cases.',
        ru: 'Это корректность для случаев all-negative / первого элемента.'
      },
      highlightIndex: 0
    },
    {
      id: 'tr_ms_1',
      title: { en: 'i = 1 (value 1)', ru: 'i = 1 (значение 1)' },
      narrative: {
        en: 'max(1, -2+1) = 1. Global best becomes 1.',
        ru: 'max(1, -2+1) = 1. Глобальный лучший становится 1.'
      },
      state: {
        i: '1',
        nums_i: '1',
        bestEndingHere: '1',
        bestSoFar: '1',
        choice: 'restart'
      },
      question: {
        en: 'Did Kadane extend or restart?',
        ru: 'Кадане продлил или перезапустил?'
      },
      choices: [
        { id: 'restart', text: { en: 'Restart at 1', ru: 'Перезапуск на 1' } },
        { id: 'extend', text: { en: 'Extend -2+1', ru: 'Продлить -2+1' } }
      ],
      correctChoiceId: 'restart',
      feedbackCorrect: {
        en: 'Starting fresh at 1 beats carrying the negative prefix.',
        ru: 'Новый старт на 1 лучше, чем тащить отрицательный префикс.'
      },
      feedbackIncorrect: {
        en: 'max(1, -1) chooses 1 — a restart.',
        ru: 'max(1, -1) выбирает 1 — перезапуск.'
      },
      highlightIndex: 1
    },
    {
      id: 'tr_ms_2',
      title: { en: 'Arrive at 4', ru: 'Приход к 4' },
      narrative: {
        en: 'After -3, bestEndingHere restarts at 4; bestSoFar becomes 4.',
        ru: 'После -3 bestEndingHere перезапускается на 4; bestSoFar становится 4.'
      },
      state: {
        i: '3',
        nums_i: '4',
        bestEndingHere: '4',
        bestSoFar: '4'
      },
      question: {
        en: 'What is bestSoFar right after processing 4?',
        ru: 'Чему равен bestSoFar сразу после обработки 4?'
      },
      choices: [
        { id: 'four', text: { en: '4', ru: '4' } },
        { id: 'one', text: { en: '1', ru: '1' } }
      ],
      correctChoiceId: 'four',
      feedbackCorrect: {
        en: 'The new ending-here value 4 becomes the global best.',
        ru: 'Новое значение ending-here 4 становится глобальным лучшим.'
      },
      feedbackIncorrect: {
        en: '1 was an earlier local best; 4 improves it.',
        ru: '1 был более ранним локальным лучшим; 4 улучшает его.'
      },
      highlightIndex: 3
    },
    {
      id: 'tr_ms_3',
      title: { en: 'Build [4,-1,2,1]', ru: 'Собрать [4,-1,2,1]' },
      narrative: {
        en: 'Extend through -1,2,1 → ending sums 3,5,6. bestSoFar = 6.',
        ru: 'Продлеваем через -1,2,1 → суммы окончания 3,5,6. bestSoFar = 6.'
      },
      state: {
        bestEndingHere: '6',
        bestSoFar: '6',
        segment: '[4, -1, 2, 1]'
      },
      question: {
        en: 'Final answer for this input?',
        ru: 'Итоговый ответ для этого входа?'
      },
      choices: [
        { id: 'six', text: { en: '6', ru: '6' } },
        { id: 'seven', text: { en: '7', ru: '7' } }
      ],
      correctChoiceId: 'six',
      feedbackCorrect: {
        en: '4 + (-1) + 2 + 1 = 6 is the maximum contiguous sum.',
        ru: '4 + (-1) + 2 + 1 = 6 — максимальная непрерывная сумма.'
      },
      feedbackIncorrect: {
        en: 'Skipping -1 would make a subsequence, not a subarray.',
        ru: 'Пропуск -1 дал бы подпоследовательность, не подмассив.'
      },
      highlightIndex: 6
    }
  ],
  followUpQuestion: {
    en: 'For nums = [-2, -1], what does Kadane return?',
    ru: 'Для nums = [-2, -1] что вернёт Кадане?'
  },
  followUpChoices: [
    { id: 'neg_one', text: { en: '-1', ru: '-1' } },
    { id: 'zero', text: { en: '0', ru: '0' } }
  ],
  followUpCorrectChoiceId: 'neg_one',
  followUpFeedbackCorrect: {
    en: 'All-negative → best non-empty subarray is the largest element -1.',
    ru: 'Все отрицательные → лучший непустой подмассив — наибольший элемент -1.'
  },
  followUpFeedbackIncorrect: {
    en: '0 would mean an empty subarray, which this problem forbids.',
    ru: '0 означал бы пустой подмассив, который эта задача запрещает.'
  }
};

const HINTS: readonly AlgorithmHint[] = [
  {
    id: 'hnt_ms_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'At each index ask: is the previous ending sum still worth keeping?',
      ru: 'На каждом индексе спросите: стоит ли ещё хранить предыдущую сумму окончания?'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ms_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'Initialize both trackers from nums[0], not from zero.',
      ru: 'Инициализируйте оба трекера из nums[0], не из нуля.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_ms_init'
  },
  {
    id: 'hnt_ms_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'The core line is Math.max(nums[i], bestEndingHere + nums[i]).',
      ru: 'Ключевая строка — Math.max(nums[i], bestEndingHere + nums[i]).'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ms_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'Update bestSoFar after refreshing bestEndingHere on every iteration.',
      ru: 'Обновляйте bestSoFar после обновления bestEndingHere на каждой итерации.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ms_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'Watch the restart at 4 after the dip through -3.',
      ru: 'Смотрите перезапуск на 4 после провала через -3.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ms_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'Follow-up [-2,-1] checks that you never invent an empty sum of 0.',
      ru: 'Follow-up [-2,-1] проверяет, что вы не изобретаете пустую сумму 0.'
    },
    revealType: 'NONE'
  }
];

export const MAXIMUM_SUBARRAY_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'maximum-subarray',
    title: { en: 'Maximum Subarray', ru: 'Максимальный подмассив' },
    summary: {
      en: 'Find the contiguous subarray with the largest sum (Kadane’s algorithm).',
      ru: 'Найти непрерывный подмассив с наибольшей суммой (алгоритм Кадане).'
    },
    statement: {
      en: 'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum, and return that sum.',
      ru: 'Дан массив целых `nums`. Найдите непрерывный подмассив (содержащий хотя бы одно число) с наибольшей суммой и верните эту сумму.'
    },
    examples: [
      {
        id: 'ex_ms_1',
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: {
          en: 'Subarray [4, -1, 2, 1] has the largest sum 6.',
          ru: 'Подмассив [4, -1, 2, 1] имеет наибольшую сумму 6.'
        }
      },
      {
        id: 'ex_ms_2',
        input: 'nums = [1]',
        output: '1',
        explanation: {
          en: 'Single-element array — the answer is that element.',
          ru: 'Массив из одного элемента — ответ и есть этот элемент.'
        }
      },
      {
        id: 'ex_ms_3',
        input: 'nums = [-2, -1]',
        output: '-1',
        explanation: {
          en: 'All negative — return the largest element, not 0.',
          ru: 'Все отрицательные — вернуть наибольший элемент, не 0.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_ms_1',
        text: {
          en: '`1 <= nums.length <= 10^5`',
          ru: '`1 <= nums.length <= 10^5`'
        }
      },
      {
        id: 'c_ms_2',
        text: {
          en: '`-10^4 <= nums[i] <= 10^4`',
          ru: '`-10^4 <= nums[i] <= 10^4`'
        }
      },
      {
        id: 'c_ms_3',
        text: {
          en: 'Subarray must be non-empty and contiguous.',
          ru: 'Подмассив должен быть непустым и непрерывным.'
        }
      }
    ],
    patternFamilyId: 'pat_dynamic_programming',
    difficulty: 'MEDIUM',
    estimatedMinutes: 25,
    stages: standardWorkshopStages('ms', {
      STRATEGY: {
        en: 'Compare brute-force ranges with Kadane’s one-pass DP.',
        ru: 'Сравните перебор диапазонов с однопроходным DP Кадане.'
      },
      BLUEPRINT: {
        en: 'Assemble restart-vs-extend logic before seeing Java.',
        ru: 'Соберите логику restart-vs-extend до появления Java.'
      },
      TRACE: {
        en: 'Step through bestEndingHere / bestSoFar on a mixed array, then an all-negative follow-up.',
        ru: 'Пройдите bestEndingHere / bestSoFar на смешанном массиве, затем follow-up из отрицательных.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-preparation problem for running DP / Kadane. No company attribution.',
      ru: 'Распространённая публичная задача для подготовки к интервью про бегущее DP / Кадане. Без атрибуции компании.'
    }
  },
  clarify: CLARIFY,
  strategies: STRATEGIES,
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint: BLUEPRINT,
  solutions: SOLUTIONS,
  distractors: DISTRACTORS,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote: ALTERNATIVE_NOTE,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. Restart vs extend keeps the best ending-here sum.',
    ru: 'Мозаика собрана. Restart vs extend хранит лучшую сумму ending-here.'
  },
  blueprintHelp: {
    en: 'Assemble Kadane control-flow blocks. Java is still hidden.',
    ru: 'Соберите блоки управления Кадане. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: seed → scan → extend/restart → update global → return.',
    ru: 'Чертёж верен: seed → скан → extend/restart → обновить глобальный → return.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions: SOLUTIONS,
    distractors: DISTRACTORS,
    alternativeNote: ALTERNATIVE_NOTE,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace: TRACE,
  hints: HINTS,
  reflectionPrompt: {
    en: 'In one sentence, when should Kadane abandon the previous ending sum?',
    ru: 'Одним предложением: когда Кадане должен бросить предыдущую сумму окончания?'
  },
  summary: {
    corePattern: {
      en: 'Running DP — best subarray ending here, plus a global max.',
      ru: 'Бегущее DP — лучший подмассив, оканчивающийся здесь, плюс глобальный max.'
    },
    invariant: {
      en: 'bestEndingHere is the maximum sum among subarrays that end at the current index.',
      ru: 'bestEndingHere — максимальная сумма среди подмассивов, оканчивающихся в текущем индексе.'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    commonMistake: {
      en: 'Initializing bests to 0, which fails when every element is negative.',
      ru: 'Инициализация лучших нулём, что ломается, когда каждый элемент отрицателен.'
    },
    recognitionCue: {
      en: '“Maximum sum contiguous subarray” / extend-or-restart.',
      ru: '«Максимальная сумма непрерывного подмассива» / extend-or-restart.'
    }
  }
};
