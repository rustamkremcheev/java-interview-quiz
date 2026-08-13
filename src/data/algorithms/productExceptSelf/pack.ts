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

const PROBLEM_ID = 'alg_product_except_self';
const TARGET_STRATEGY_ID = 'strat_pes_output_suffix';
const SOLUTION_ID = 'sol_product_except_self_prefix_suffix';
const MOSAIC_ID = 'mos_pes_prefix_suffix';

const SOLUTIONS: readonly AlgorithmSolution[] = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA',
    javaVersion: '17',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) extra (excl. output)',
    explanation: {
      en: 'Store left products in the output, then multiply by a rolling right product — no division, linear time.',
      ru: 'Левые произведения в output, затем умножение на бегущее правое — без деления, линейное время.'
    },
    canonicalCode: `
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] output = new int[n];
    output[0] = 1;
    for (int i = 1; i < n; i++) {
        output[i] = output[i - 1] * nums[i - 1];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        output[i] *= suffix;
        suffix *= nums[i];
    }
    return output;
}
`.trim()
  }
];

const STRATEGIES: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_pes_nested',
    problemId: PROBLEM_ID,
    title: { en: 'Nested product loops', ru: 'Вложенные циклы произведений' },
    description: {
      en: 'For each index i, multiply every nums[j] where j ≠ i.',
      ru: 'Для каждого i перемножить все nums[j], где j ≠ i.'
    },
    timeClass: 'O(n²)',
    spaceClass: 'O(1) extra',
    importantConstraint: {
      en: 'Too slow when n approaches 10^5.',
      ru: 'Слишком медленно при n около 10^5.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'Obvious first attempt', ru: 'Очевидная первая попытка' },
      { en: 'No extra arrays', ru: 'Без доп. массивов' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_pes_two_arrays',
    problemId: PROBLEM_ID,
    title: { en: 'Prefix and suffix arrays', ru: 'Массивы префикса и суффикса' },
    description: {
      en: 'Build left[i] and right[i], then answer[i] = left[i] * right[i].',
      ru: 'Построить left[i] и right[i], затем answer[i] = left[i] * right[i].'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Clear idea, but uses two extra arrays beyond the output.',
      ru: 'Ясная идея, но два доп. массива сверх выходного.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Separate prefix/suffix tables', ru: 'Отдельные таблицы prefix/suffix' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Output as prefix + rolling suffix', ru: 'Output как prefix + бегущий suffix' },
    description: {
      en: 'Write left products into output, then multiply by a single rolling right product.',
      ru: 'Записать левые произведения в output, затем умножить на одно бегущее правое.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1) extra',
    importantConstraint: {
      en: 'Output space is allowed; no division; zeros are handled naturally.',
      ru: 'Память output допустима; без деления; нули обрабатываются естественно.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'No division', ru: 'Без деления' },
      { en: 'Linear time', ru: 'Линейное время' },
      { en: 'O(1) extra besides output', ru: 'O(1) доп. кроме output' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_pes_division',
    problemId: PROBLEM_ID,
    title: { en: 'Total product then divide', ru: 'Общее произведение и деление' },
    description: {
      en: 'Compute product of all elements and divide by nums[i] for each index.',
      ru: 'Посчитать произведение всех элементов и делить на nums[i] для каждого индекса.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1) extra',
    importantConstraint: {
      en: 'Breaks on zeros and is usually forbidden by the “no division” rule.',
      ru: 'Ломается на нулях и обычно запрещено правилом «без деления».'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: [],
    justificationChips: [
      { en: 'Division forbidden / zeros', ru: 'Деление запрещено / нули' }
    ],
    unlocksBlueprint: false
  }
];

const BLUEPRINT: BlueprintGraph = {
  id: 'bp_pes_prefix_suffix',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_pes_alloc',
      label: { en: 'Allocate output array of length n', ru: 'Выделить output длины n' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_seed_left',
      label: { en: 'Seed output[0] = 1 (empty left product)', ru: 'Задать output[0] = 1 (пустое левое произведение)' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_left_pass',
      label: {
        en: 'Left-to-right: fill output[i] with product of nums[0..i-1]',
        ru: 'Слева направо: заполнить output[i] произведением nums[0..i-1]'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_suffix_init',
      label: { en: 'Start rolling suffix product at 1', ru: 'Начать бегущий suffix с 1' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_right_pass',
      label: {
        en: 'Right-to-left: multiply output[i] by current suffix, then fold nums[i] into suffix',
        ru: 'Справа налево: умножить output[i] на текущий suffix, затем включить nums[i] в suffix'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_return',
      label: { en: 'Return the completed output array', ru: 'Вернуть заполненный output' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_pes_d_divide',
      label: { en: 'Divide total product by nums[i]', ru: 'Делить общее произведение на nums[i]' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Division is forbidden and fails when zeros appear.',
        ru: 'Деление запрещено и ломается при нулях.'
      }
    },
    {
      id: 'bp_pes_d_skip_self',
      label: {
        en: 'Nested loop that skips index i on each outer step',
        ru: 'Вложенный цикл, пропускающий индекс i на каждом внешнем шаге'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'That is the quadratic strategy, not the prefix/suffix path.',
        ru: 'Это квадратичная стратегия, не путь prefix/suffix.'
      }
    },
    {
      id: 'bp_pes_d_zero_special',
      label: {
        en: 'Special-case zeros before computing products',
        ru: 'Отдельно обработать нули до вычисления произведений'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Prefix/suffix already handles zeros without special branches.',
        ru: 'Prefix/suffix уже обрабатывает нули без особых веток.'
      }
    }
  ],
  solutionOrder: [
    'bp_pes_alloc',
    'bp_pes_seed_left',
    'bp_pes_left_pass',
    'bp_pes_suffix_init',
    'bp_pes_right_pass',
    'bp_pes_return'
  ]
};

const CLARIFY: readonly ClarifyQuestion[] = [
  {
    id: 'cq_pes_division',
    prompt: {
      en: 'Is division by nums[i] allowed for this workshop path?',
      ru: 'Допустимо ли деление на nums[i] для пути этого воркшопа?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_pes_division_no',
        text: { en: 'No — solve without division', ru: 'Нет — решать без деления' },
        isCorrect: true,
        feedback: {
          en: 'Correct. The classic follow-up forbids division and still wants O(n).',
          ru: 'Верно. Классический follow-up запрещает деление и всё ещё хочет O(n).'
        }
      },
      {
        id: 'cq_pes_division_yes',
        text: { en: 'Yes — totalProduct / nums[i] is fine', ru: 'Да — totalProduct / nums[i] нормально' },
        isCorrect: false,
        feedback: {
          en: 'Not for this slice — zeros and the no-division rule break that approach.',
          ru: 'Не для этого среза — нули и запрет деления ломают подход.'
        }
      }
    ]
  },
  {
    id: 'cq_pes_space',
    prompt: {
      en: 'What memory budget is the target solution aiming for?',
      ru: 'Какой бюджет памяти у целевого решения?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_pes_space_o1',
        text: {
          en: 'O(1) extra besides the output array',
          ru: 'O(1) дополнительно кроме выходного массива'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Reusing output for left products keeps extra space constant.',
          ru: 'Верно. Повторное использование output для левых произведений даёт константную доп. память.'
        }
      },
      {
        id: 'cq_pes_space_on',
        text: { en: 'Must allocate two full prefix/suffix arrays', ru: 'Обязательно два полных массива prefix/suffix' },
        isCorrect: false,
        feedback: {
          en: 'That works but is not the space-optimized target path.',
          ru: 'Это работает, но не целевой путь с оптимизацией памяти.'
        }
      }
    ]
  },
  {
    id: 'cq_pes_zeros',
    prompt: {
      en: 'Can the input contain zeros?',
      ru: 'Может ли вход содержать нули?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_pes_zeros_yes',
        text: { en: 'Yes — zero and multiple zeros are allowed', ru: 'Да — один и несколько нулей допустимы' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Prefix/suffix products handle zeros without special-case division logic.',
          ru: 'Верно. Prefix/suffix обрабатывает нули без особой логики деления.'
        }
      },
      {
        id: 'cq_pes_zeros_no',
        text: { en: 'No — all values are non-zero', ru: 'Нет — все значения ненулевые' },
        isCorrect: false,
        feedback: {
          en: 'Zeros are common in constraints and break division-based shortcuts.',
          ru: 'Нули обычны в ограничениях и ломают shortcut через деление.'
        }
      }
    ]
  },
  {
    id: 'cq_pes_output',
    prompt: {
      en: 'What must answer[i] represent?',
      ru: 'Что должно означать answer[i]?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_pes_output_except',
        text: {
          en: 'Product of every nums[j] with j ≠ i',
          ru: 'Произведение всех nums[j] при j ≠ i'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct — exclude the element at i, not include it.',
          ru: 'Верно — исключить элемент на i, не включать его.'
        }
      },
      {
        id: 'cq_pes_output_prefix',
        text: { en: 'Only the prefix product ending at i', ru: 'Только префиксное произведение до i' },
        isCorrect: false,
        feedback: {
          en: 'Prefix alone is incomplete; you still need the suffix contribution.',
          ru: 'Одного prefix недостаточно; нужна ещё вкладка suffix.'
        }
      }
    ]
  }
];

const DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'mos_pes_d_divide',
    code: 'output[i] = total / nums[i];',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Division path — forbidden and unsafe with zeros.',
      ru: 'Путь через деление — запрещён и опасен при нулях.'
    }
  },
  {
    id: 'mos_pes_d_include_self',
    code: 'output[i] = output[i - 1] * nums[i];',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Includes nums[i] in the left product — answer must exclude self.',
      ru: 'Включает nums[i] в левое произведение — ответ должен исключать себя.'
    }
  },
  {
    id: 'mos_pes_d_suffix_order',
    code: 'suffix *= nums[i]; output[i] *= suffix;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Wrong update order — multiplies by nums[i] before applying the old suffix.',
      ru: 'Неверный порядок — умножает на nums[i] до применения старого suffix.'
    }
  },
  {
    id: 'mos_pes_d_start_zero',
    code: 'output[0] = 0;',
    indent: 1,
    role: 'DISTRACTOR_EDGE_CASE',
    explanation: {
      en: 'Left product of an empty range is 1, not 0.',
      ru: 'Левое произведение пустого диапазона — 1, не 0.'
    }
  },
  {
    id: 'mos_pes_d_nested',
    code: 'for (int j = 0; j < n; j++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Nested-loop fragment from the quadratic approach.',
      ru: 'Фрагмент вложенного цикла из квадратичного подхода.'
    }
  },
  {
    id: 'mos_pes_d_new_prefix',
    code: 'int[] prefix = new int[n];',
    indent: 1,
    role: 'DISTRACTOR_COMPLEXITY',
    explanation: {
      en: 'Extra prefix array — the target reuses output instead.',
      ru: 'Лишний массив prefix — цель переиспользует output.'
    }
  },
  {
    id: 'mos_pes_d_long',
    code: 'long suffix = 1;',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Type mismatch risk when multiplying into int[] without casts — stick to int for this slice.',
      ru: 'Риск несовпадения типов при умножении в int[] без приведения — в этом срезе остаёмся на int.'
    }
  }
];

const ALTERNATIVE_NOTE = {
  en: 'Equivalent: keep separate prefix[] and suffix[] arrays, then answer[i] = prefix[i] * suffix[i]. Same math, more memory.',
  ru: 'Эквивалент: отдельные prefix[] и suffix[], затем answer[i] = prefix[i] * suffix[i]. Та же математика, больше памяти.'
} as const;

const TRACE: TraceScenario = {
  id: 'tr_pes_main',
  problemId: PROBLEM_ID,
  kind: 'PREFIX_SUFFIX',
  label: { en: 'Prefix then suffix on [1,2,3,4]', ru: 'Prefix затем suffix на [1,2,3,4]' },
  inputSummary: {
    en: 'nums = [1, 2, 3, 4] → expect [24, 12, 8, 6]',
    ru: 'nums = [1, 2, 3, 4] → ожидаем [24, 12, 8, 6]'
  },
  arrayInput: [1, 2, 3, 4],
  steps: [
    {
      id: 'tr_pes_0',
      title: { en: 'After left pass', ru: 'После левого прохода' },
      narrative: {
        en: 'output starts as left products: [1, 1, 2, 6]. suffix is still unused.',
        ru: 'output начинается как левые произведения: [1, 1, 2, 6]. suffix ещё не использован.'
      },
      state: {
        pass: 'left',
        output: '[1, 1, 2, 6]',
        suffix: '(not started)'
      },
      question: {
        en: 'What is output[2] after the left-to-right pass?',
        ru: 'Чему равен output[2] после прохода слева направо?'
      },
      choices: [
        { id: 'two', text: { en: '2 (= 1×2)', ru: '2 (= 1×2)' } },
        { id: 'six', text: { en: '6 (= 1×2×3)', ru: '6 (= 1×2×3)' } }
      ],
      correctChoiceId: 'two',
      feedbackCorrect: {
        en: 'output[2] must be product of nums[0..1] = 1×2 = 2.',
        ru: 'output[2] — произведение nums[0..1] = 1×2 = 2.'
      },
      feedbackIncorrect: {
        en: 'Index 2 excludes nums[2]; left product is only 1×2.',
        ru: 'Индекс 2 исключает nums[2]; левое произведение только 1×2.'
      },
      highlightIndex: 2
    },
    {
      id: 'tr_pes_1',
      title: { en: 'Right pass at i = 3', ru: 'Правый проход при i = 3' },
      narrative: {
        en: 'suffix = 1. Multiply output[3] by suffix, then fold nums[3] into suffix.',
        ru: 'suffix = 1. Умножаем output[3] на suffix, затем включаем nums[3] в suffix.'
      },
      state: {
        i: '3',
        output_before: '[1, 1, 2, 6]',
        suffix_before: '1',
        output_after: '[1, 1, 2, 6]',
        suffix_after: '4'
      },
      question: {
        en: 'After processing i = 3, what is suffix?',
        ru: 'После обработки i = 3 чему равен suffix?'
      },
      choices: [
        { id: 'one', text: { en: '1', ru: '1' } },
        { id: 'four', text: { en: '4', ru: '4' } }
      ],
      correctChoiceId: 'four',
      feedbackCorrect: {
        en: 'output[3] *= 1 stays 6; then suffix becomes 1 × nums[3] = 4.',
        ru: 'output[3] *= 1 остаётся 6; затем suffix = 1 × nums[3] = 4.'
      },
      feedbackIncorrect: {
        en: 'After applying the empty right product, suffix absorbs nums[3] → 4.',
        ru: 'После пустого правого произведения suffix вбирает nums[3] → 4.'
      },
      highlightIndex: 3
    },
    {
      id: 'tr_pes_2',
      title: { en: 'Right pass at i = 2', ru: 'Правый проход при i = 2' },
      narrative: {
        en: 'output[2] was 2; multiply by suffix 4 → 8. Then suffix *= 3 → 12.',
        ru: 'output[2] был 2; умножаем на suffix 4 → 8. Затем suffix *= 3 → 12.'
      },
      state: {
        i: '2',
        output: '[1, 1, 8, 6]',
        suffix: '12'
      },
      question: {
        en: 'What is output[2] after this step?',
        ru: 'Чему равен output[2] после этого шага?'
      },
      choices: [
        { id: 'eight', text: { en: '8', ru: '8' } },
        { id: 'twenty_four', text: { en: '24', ru: '24' } }
      ],
      correctChoiceId: 'eight',
      feedbackCorrect: {
        en: 'Left product 2 × right product 4 = 8.',
        ru: 'Левое 2 × правое 4 = 8.'
      },
      feedbackIncorrect: {
        en: '24 is the final answer for index 0, not index 2.',
        ru: '24 — итоговый ответ для индекса 0, не для 2.'
      },
      highlightIndex: 2
    },
    {
      id: 'tr_pes_3',
      title: { en: 'Finish i = 1 then i = 0', ru: 'Завершить i = 1 и i = 0' },
      narrative: {
        en: 'i=1: 1×12 → 12, suffix→24. i=0: 1×24 → 24. Final output [24,12,8,6].',
        ru: 'i=1: 1×12 → 12, suffix→24. i=0: 1×24 → 24. Итог [24,12,8,6].'
      },
      state: {
        output: '[24, 12, 8, 6]',
        suffix: '24'
      },
      question: {
        en: 'What is the final answer array?',
        ru: 'Какой итоговый массив ответа?'
      },
      choices: [
        { id: 'ok', text: { en: '[24, 12, 8, 6]', ru: '[24, 12, 8, 6]' } },
        { id: 'bad', text: { en: '[1, 2, 6, 24]', ru: '[1, 2, 6, 24]' } }
      ],
      correctChoiceId: 'ok',
      feedbackCorrect: {
        en: 'Each position is left×right excluding self.',
        ru: 'Каждая позиция — left×right без себя.'
      },
      feedbackIncorrect: {
        en: 'That looks like cumulative products, not products-except-self.',
        ru: 'Это похоже на накопительные произведения, не product-except-self.'
      },
      highlightIndex: 0
    }
  ],
  followUpQuestion: {
    en: 'For nums = [0, 4, 5], what is answer[0]?',
    ru: 'Для nums = [0, 4, 5] чему равен answer[0]?'
  },
  followUpChoices: [
    { id: 'twenty', text: { en: '20', ru: '20' } },
    { id: 'zero', text: { en: '0', ru: '0' } }
  ],
  followUpCorrectChoiceId: 'twenty',
  followUpFeedbackCorrect: {
    en: 'Exclude the zero at index 0 → 4×5 = 20. No division needed.',
    ru: 'Исключаем ноль на индексе 0 → 4×5 = 20. Деление не нужно.'
  },
  followUpFeedbackIncorrect: {
    en: 'answer[0] excludes nums[0], so the product of the rest is 20.',
    ru: 'answer[0] исключает nums[0], произведение остальных — 20.'
  }
};

const HINTS: readonly AlgorithmHint[] = [
  {
    id: 'hnt_pes_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Think of answer[i] as (product to the left of i) × (product to the right of i).',
      ru: 'Думайте об answer[i] как (произведение слева от i) × (произведение справа от i).'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_pes_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'First fill output with left products; then sweep from the right with one suffix variable.',
      ru: 'Сначала заполните output левыми произведениями; затем пройдите справа одной переменной suffix.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_pes_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'Revealing first block: allocate the output array.',
      ru: 'Открываем первый блок: выделить output.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_pes_alloc'
  },
  {
    id: 'hnt_pes_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'Seed output[0] = 1 before the left loop — empty product identity.',
      ru: 'Задайте output[0] = 1 до левого цикла — единица пустого произведения.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_pes_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'In the right loop: multiply by suffix first, then update suffix with nums[i].',
      ru: 'В правом цикле: сначала умножьте на suffix, затем обновите suffix через nums[i].'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_pes_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'After the left pass on [1,2,3,4], output should be [1,1,2,6].',
      ru: 'После левого прохода на [1,2,3,4] output должен быть [1,1,2,6].'
    },
    revealType: 'NONE'
  }
];

export const PRODUCT_EXCEPT_SELF_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'product-except-self',
    title: { en: 'Product of Array Except Self', ru: 'Произведение массива без себя' },
    summary: {
      en: 'Build an array where each index holds the product of all other elements — without division.',
      ru: 'Построить массив, где каждый индекс хранит произведение всех остальных элементов — без деления.'
    },
    statement: {
      en: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. The product fits in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation. Aim for O(1) extra space besides the output array.',
      ru: 'Дан массив целых `nums`. Верните массив `answer`, где `answer[i]` равно произведению всех элементов `nums`, кроме `nums[i]`. Произведение помещается в 32-битное целое. Нужен алгоритм O(n) без операции деления. Стремитесь к O(1) дополнительной памяти кроме выходного массива.'
    },
    examples: [
      {
        id: 'ex_pes_1',
        input: 'nums = [1, 2, 3, 4]',
        output: '[24, 12, 8, 6]',
        explanation: {
          en: '24 = 2×3×4, 12 = 1×3×4, 8 = 1×2×4, 6 = 1×2×3.',
          ru: '24 = 2×3×4, 12 = 1×3×4, 8 = 1×2×4, 6 = 1×2×3.'
        }
      },
      {
        id: 'ex_pes_2',
        input: 'nums = [-1, 1, 0, -3, 3]',
        output: '[0, 0, 9, 0, 0]',
        explanation: {
          en: 'A single zero forces every other answer entry to 0; answer at the zero index is the product of the rest.',
          ru: 'Один ноль обнуляет остальные ответы; на позиции нуля — произведение остальных.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_pes_1',
        text: {
          en: '`2 <= nums.length <= 10^5`',
          ru: '`2 <= nums.length <= 10^5`'
        }
      },
      {
        id: 'c_pes_2',
        text: {
          en: '`-30 <= nums[i] <= 30`; product of any prefix/suffix fits in 32-bit int.',
          ru: '`-30 <= nums[i] <= 30`; произведение любого prefix/suffix помещается в 32-битное int.'
        }
      },
      {
        id: 'c_pes_3',
        text: {
          en: 'Division is not allowed; O(n) time is required.',
          ru: 'Деление запрещено; требуется время O(n).'
        }
      }
    ],
    patternFamilyId: 'pat_prefix_suffix',
    difficulty: 'MEDIUM',
    estimatedMinutes: 30,
    stages: standardWorkshopStages('pes', {
      STRATEGY: {
        en: 'Compare nested products, two-array prefix/suffix, and the O(1)-extra rolling-suffix path.',
        ru: 'Сравните вложенные произведения, два массива prefix/suffix и путь с бегущим suffix без доп. памяти.'
      },
      BLUEPRINT: {
        en: 'Order left-product fill, then rolling right multiply — still no Java syntax.',
        ru: 'Упорядочите заполнение левых произведений, затем умножение бегущим правым — пока без Java.'
      },
      TRACE: {
        en: 'Watch output and suffix evolve on [1, 2, 3, 4].',
        ru: 'Наблюдайте эволюцию output и suffix на [1, 2, 3, 4].'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-preparation problem for prefix/suffix products. No company attribution.',
      ru: 'Распространённая публичная задача для подготовки к интервью про prefix/suffix произведения. Без атрибуции компании.'
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
    en: 'Mosaic complete. Left products in output, then rolling suffix multiplies — no division.',
    ru: 'Мозаика собрана. Левые произведения в output, затем бегущий suffix умножает — без деления.'
  },
  blueprintHelp: {
    en: 'Assemble prefix/suffix product blocks. Java is still hidden.',
    ru: 'Соберите блоки prefix/suffix произведений. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: allocate → seed left → left pass → suffix → right pass → return.',
    ru: 'Чертёж верен: выделить → seed left → левый проход → suffix → правый проход → return.'
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
    en: 'Why does writing left products into the output array still leave room for a rolling right product?',
    ru: 'Почему запись левых произведений в output всё ещё оставляет место для бегущего правого произведения?'
  },
  summary: {
    corePattern: {
      en: 'Prefix / suffix products — answer[i] = left(i) × right(i) without division.',
      ru: 'Prefix / suffix произведения — answer[i] = left(i) × right(i) без деления.'
    },
    invariant: {
      en: 'After the left pass, output[i] is the product of all elements strictly left of i; the right pass multiplies the product of all elements strictly right of i.',
      ru: 'После левого прохода output[i] — произведение строго слева от i; правый проход домножает произведение строго справа от i.'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) extra (excl. output)',
    commonMistake: {
      en: 'Updating suffix before multiplying into output (includes self), or seeding output[0] with 0.',
      ru: 'Обновить suffix до умножения в output (включает себя) или задать output[0] = 0.'
    },
    recognitionCue: {
      en: '“Product of all except self” + no division + linear time.',
      ru: '«Произведение всех кроме себя» + без деления + линейное время.'
    }
  }
};
