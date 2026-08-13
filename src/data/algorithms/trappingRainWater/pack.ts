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

const PROBLEM_ID = 'alg_trapping_rain_water';
const TARGET_STRATEGY_ID = 'strat_trw_two_pointers';
const SOLUTION_ID = 'sol_trapping_rain_water_two_pointers';
const MOSAIC_ID = 'mos_trw_two_pointers';

const problem = {
  id: PROBLEM_ID,
  slug: 'trapping-rain-water',
  title: { en: 'Trapping Rain Water', ru: 'Задержка Дождевой Воды' },
  summary: {
    en: 'Given elevation bars, compute how many units of water can be trapped after raining.',
    ru: 'Дан рельеф столбцами высот; посчитайте, сколько единиц воды удержится после дождя.'
  },
  statement: {
    en: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Water at index `i` is bounded by the shorter of the tallest bars to the left and to the right, minus `height[i]` (floored at 0).',
    ru: 'Даны `n` неотрицательных целых — карта высот, ширина каждого столбца 1. Вычислите, сколько воды удержится. Вода в индексе `i` ограничена минимумом самых высоких столбцов слева и справа минус `height[i]` (не ниже 0).'
  },
  examples: [
    {
      id: 'ex_trw_1',
      input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      output: '6',
      explanation: {
        en: 'Six units sit in the valleys between the peaks.',
        ru: 'Шесть единиц воды в «долинах» между пиками.'
      }
    },
    {
      id: 'ex_trw_2',
      input: 'height = [4,2,0,3,2,5]',
      output: '9',
      explanation: {
        en: 'Water fills between the left wall of 4 and the right wall of 5.',
        ru: 'Вода заполняет между левой стеной 4 и правой стеной 5.'
      }
    },
    {
      id: 'ex_trw_3',
      input: 'height = [1,0,1]',
      output: '1',
      explanation: {
        en: 'One unit trapped in the middle pit.',
        ru: 'Одна единица в средней яме.'
      }
    }
  ],
  constraints: [
    {
      id: 'c_trw_1',
      text: {
        en: '`n == height.length` and `1 <= n <= 2·10^4` in typical statements.',
        ru: '`n == height.length` и `1 <= n <= 2·10^4` в типичных формулировках.'
      }
    },
    {
      id: 'c_trw_2',
      text: {
        en: '`0 <= height[i] <= 10^5` — zero-height bars are allowed.',
        ru: '`0 <= height[i] <= 10^5` — столбцы нулевой высоты допустимы.'
      }
    },
    {
      id: 'c_trw_3',
      text: {
        en: 'Each bar has width 1; answer is total water units (integer).',
        ru: 'Ширина каждого столбца 1; ответ — целое число единиц воды.'
      }
    },
    {
      id: 'c_trw_4',
      text: {
        en: 'Water cannot flow diagonally through bars — only vertical columns matter.',
        ru: 'Вода не течёт по диагонали сквозь столбцы — важны только вертикальные колонки.'
      }
    }
  ],
  patternFamilyId: 'pat_two_pointers',
  difficulty: 'HARD' as const,
  estimatedMinutes: 35,
  stages: standardWorkshopStages('trw', {
    STRATEGY: {
      en: 'Compare brute per-index bounds, prefix/suffix maxima, and the two-pointer O(1)-space path.',
      ru: 'Сравните brute по индексам, prefix/suffix maxima и two-pointer путь с O(1) памятью.'
    },
    BLUEPRINT: {
      en: 'Assemble left/right + leftMax/rightMax water accumulation blocks (no Java yet).',
      ru: 'Соберите блоки left/right + leftMax/rightMax накопления воды (пока без Java).'
    },
    TRACE: {
      en: 'Step through left, right, leftMax, rightMax, and water on a classic elevation map.',
      ru: 'Пройдите left, right, leftMax, rightMax и water на классической карте высот.'
    }
  }),
  availability: 'AVAILABLE' as const,
  provenanceNote: {
    en: 'Common public interview-prep elevation problem used to teach two-pointer bounding maxima. No company attribution.',
    ru: 'Распространённая публичная задача о рельефе для обучения two-pointer с ограничивающими максимумами. Без атрибуции компании.'
  }
};

const clarify: readonly ClarifyQuestion[] = [
  {
    id: 'cq_trw_width',
    prompt: {
      en: 'What is the width of each elevation bar?',
      ru: 'Какова ширина каждого столбца высот?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_trw_width_1',
        text: { en: 'Exactly 1', ru: 'Ровно 1' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Water units equal trapped height difference per index.',
          ru: 'Верно. Единицы воды равны разнице высот на каждом индексе.'
        }
      },
      {
        id: 'cq_trw_width_var',
        text: { en: 'Variable — given separately', ru: 'Переменная — задаётся отдельно' },
        isCorrect: false,
        feedback: {
          en: 'Classic statement fixes width to 1.',
          ru: 'Классическая формулировка фиксирует ширину равной 1.'
        }
      }
    ]
  },
  {
    id: 'cq_trw_bound',
    prompt: {
      en: 'What bounds the water depth at index i?',
      ru: 'Что ограничивает глубину воды в индексе i?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_trw_bound_min',
        text: {
          en: 'min(tallest left, tallest right) − height[i] (if positive)',
          ru: 'min(макс. слева, макс. справа) − height[i] (если положительно)'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Water spills over the shorter bounding wall.',
          ru: 'Верно. Вода переливается через более низкую ограничивающую стену.'
        }
      },
      {
        id: 'cq_trw_bound_self',
        text: {
          en: 'Only the immediate neighbors height[i−1] and height[i+1]',
          ru: 'Только соседи height[i−1] и height[i+1]'
        },
        isCorrect: false,
        feedback: {
          en: 'Neighbors alone are insufficient — bounding walls may be farther away.',
          ru: 'Одних соседей недостаточно — ограничивающие стены могут быть дальше.'
        }
      }
    ]
  },
  {
    id: 'cq_trw_ends',
    prompt: {
      en: 'Can the leftmost or rightmost bar trap water above itself?',
      ru: 'Может ли крайний левый или правый столбец удерживать воду над собой?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_trw_ends_no',
        text: {
          en: 'No — water drains off either open side',
          ru: 'Нет — вода стекает с открытой стороны'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. A cell needs a strict bounding max on both sides.',
          ru: 'Верно. Ячейке нужен строгий ограничивающий max с обеих сторон.'
        }
      },
      {
        id: 'cq_trw_ends_yes',
        text: {
          en: 'Yes — ends can hold water if height[i] > 0',
          ru: 'Да — края держат воду, если height[i] > 0'
        },
        isCorrect: false,
        feedback: {
          en: 'Ends lack one side wall, so trapped water there is always 0.',
          ru: 'У краёв нет одной стены, поэтому вода там всегда 0.'
        }
      }
    ]
  },
  {
    id: 'cq_trw_zero',
    prompt: {
      en: 'Are zero-height bars allowed?',
      ru: 'Допустимы ли столбцы нулевой высоты?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_trw_zero_yes',
        text: {
          en: 'Yes — they create pits that may hold water',
          ru: 'Да — они создают ямы, где может быть вода'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Zeros are common in examples and still participate as indices.',
          ru: 'Верно. Нули часты в примерах и всё равно участвуют как индексы.'
        }
      },
      {
        id: 'cq_trw_zero_no',
        text: { en: 'No — heights are always positive', ru: 'Нет — высоты всегда положительны' },
        isCorrect: false,
        feedback: {
          en: 'Constraints allow 0.',
          ru: 'Ограничения допускают 0.'
        }
      }
    ]
  },
  {
    id: 'cq_trw_return',
    prompt: {
      en: 'What must the method return?',
      ru: 'Что должен вернуть метод?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_trw_return_sum',
        text: {
          en: 'Total trapped water units as an int',
          ru: 'Суммарное число единиц воды (int)'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Not per-index depths unless a follow-up asks.',
          ru: 'Верно. Не глубины по индексам, пока follow-up этого не потребует.'
        }
      },
      {
        id: 'cq_trw_return_arr',
        text: {
          en: 'An array of water depth at every index',
          ru: 'Массив глубины воды на каждом индексе'
        },
        isCorrect: false,
        feedback: {
          en: 'Over-specified. The contract is a single integer sum.',
          ru: 'Лишнее. Контракт — одно целое число-сумма.'
        }
      }
    ]
  }
];

const strategies: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_trw_brute',
    problemId: PROBLEM_ID,
    title: { en: 'Brute: scan left/right max per index', ru: 'Brute: left/right max на каждый индекс' },
    description: {
      en: 'For each i, scan left and right for bounding maxima, then add trapped depth.',
      ru: 'Для каждого i сканировать влево/вправо за максимумами и добавить глубину.'
    },
    timeClass: 'O(n²)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Correct but too slow for n ≈ 2·10^4.',
      ru: 'Верно, но слишком медленно при n ≈ 2·10^4.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'Direct definition', ru: 'Прямое определение' },
      { en: 'No extra arrays', ru: 'Без доп. массивов' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_trw_prefix_suffix',
    problemId: PROBLEM_ID,
    title: { en: 'Prefix / suffix maxima arrays', ru: 'Массивы prefix / suffix maxima' },
    description: {
      en: 'Precompute leftMax[i] and rightMax[i], then water[i] = min(left, right) − height[i].',
      ru: 'Предвычислить leftMax[i] и rightMax[i], затем water[i] = min(left, right) − height[i].'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Linear and clear; uses two extra arrays (or one plus a reverse pass).',
      ru: 'Линейно и понятно; два доп. массива (или один плюс обратный проход).'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Explicit bounding walls', ru: 'Явные ограничивающие стены' },
      { en: 'Easy to verify', ru: 'Легко проверить' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Two pointers with running maxima', ru: 'Два указателя с бегущими максимумами' },
    description: {
      en: 'Advance the side with the smaller height; that side’s running max is a safe water ceiling.',
      ru: 'Двигать сторону с меньшей высотой; её бегущий max — безопасный потолок воды.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Invariant: the shorter side decides how much water can be added before moving that pointer.',
      ru: 'Инвариант: более низкая сторона решает, сколько воды добавить, до сдвига указателя.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'O(1) extra memory', ru: 'O(1) доп. памяти' },
      { en: 'leftMax / rightMax online', ru: 'leftMax / rightMax на лету' },
      { en: 'One pass', ru: 'Один проход' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_trw_stack',
    problemId: PROBLEM_ID,
    title: { en: 'Monotonic stack of indices', ru: 'Монотонный стек индексов' },
    description: {
      en: 'Pop lower bars when a taller right wall appears; add trapped rectangular layers.',
      ru: 'Выталкивать более низкие столбцы при появлении правой стены; добавлять прямоугольные слои.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Valid alternative; different mechanics than the two-pointer workshop path.',
      ru: 'Валидная альтернатива; другая механика, чем two-pointer путь воркшопа.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY', 'HIDES_MECHANICS'],
    justificationChips: [
      { en: 'Layer-by-layer trapping', ru: 'Задержка слой за слоем' }
    ],
    unlocksBlueprint: false
  }
];

const blueprint: BlueprintGraph = {
  id: 'bp_trw_two_pointers',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_trw_init',
      label: {
        en: 'Init left, right, leftMax, rightMax, water = 0',
        ru: 'Инициализировать left, right, leftMax, rightMax, water = 0'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_loop',
      label: { en: 'While left < right', ru: 'Пока left < right' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_compare',
      label: {
        en: 'Compare height[left] with height[right]',
        ru: 'Сравнить height[left] с height[right]'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_update_max',
      label: {
        en: 'Update that side’s running max (leftMax or rightMax)',
        ru: 'Обновить бегущий max этой стороны (leftMax или rightMax)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_add_water',
      label: {
        en: 'Else add (sideMax − height[side]) to water',
        ru: 'Иначе добавить (sideMax − height[side]) к water'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_move',
      label: {
        en: 'Move the pointer on the shorter side inward',
        ru: 'Сдвинуть указатель более низкой стороны внутрь'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_return',
      label: { en: 'Return water', ru: 'Вернуть water' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_trw_d_arrays',
      label: {
        en: 'Allocate leftMax[] and rightMax[] arrays',
        ru: 'Выделить массивы leftMax[] и rightMax[]'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Prefix/suffix arrays are another strategy, not the O(1)-space two-pointer flow.',
        ru: 'Prefix/suffix массивы — другая стратегия, не поток two-pointer с O(1) памятью.'
      }
    },
    {
      id: 'bp_trw_d_both',
      label: {
        en: 'Always move both left and right each iteration',
        ru: 'Каждую итерацию двигать и left, и right'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Moving both breaks the shorter-side invariant and skips cells.',
        ru: 'Движение обеих сторон ломает инвариант и пропускает ячейки.'
      }
    },
    {
      id: 'bp_trw_d_avg',
      label: {
        en: 'Add average of neighbors as water',
        ru: 'Добавлять среднее соседей как воду'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Water uses bounding maxima, not neighbor averages.',
        ru: 'Вода считается по ограничивающим максимумам, не по среднему соседей.'
      }
    },
    {
      id: 'bp_trw_d_sort',
      label: { en: 'Sort the height array first', ru: 'Сначала отсортировать height' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Sorting destroys spatial structure required for trapping.',
        ru: 'Сортировка уничтожает пространственную структуру, нужную для удержания воды.'
      }
    }
  ],
  solutionOrder: [
    'bp_trw_init',
    'bp_trw_loop',
    'bp_trw_compare',
    'bp_trw_update_max',
    'bp_trw_add_water',
    'bp_trw_move',
    'bp_trw_return'
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
    spaceComplexity: 'O(1)',
    explanation: {
      en: 'Process the shorter side each step: its running max is a proven ceiling, so trapped depth can be added immediately.',
      ru: 'На каждом шаге обрабатывать более низкую сторону: её бегущий max — доказанный потолок, глубину можно добавить сразу.'
    },
    canonicalCode: `
public int trap(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
}
`.trim()
  }
];

const distractors: readonly MosaicDistractor[] = [
  {
    id: 'mos_trw_d_arrays',
    code: 'int[] leftMax = new int[height.length];',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Prefix-array strategy — not the O(1)-space two-pointer solution.',
      ru: 'Стратегия prefix-массива — не two-pointer решение с O(1) памятью.'
    }
  },
  {
    id: 'mos_trw_d_both',
    code: 'left++; right--;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Moving both pointers skips indices and breaks the invariant.',
      ru: 'Сдвиг обоих указателей пропускает индексы и ломает инвариант.'
    }
  },
  {
    id: 'mos_trw_d_ge',
    code: 'if (height[left] <= height[right]) {',
    indent: 2,
    role: 'DISTRACTOR_EDGE_CASE',
    explanation: {
      en: 'Canonical form uses strict < on the left branch; ties are handled on the right.',
      ru: 'Каноническая форма использует строгое < на левой ветке; равенство обрабатывается справа.'
    }
  },
  {
    id: 'mos_trw_d_add_height',
    code: 'water += height[left];',
    indent: 4,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Must add leftMax − height[left], not the bar height itself.',
      ru: 'Нужно добавлять leftMax − height[left], не саму высоту столбца.'
    }
  },
  {
    id: 'mos_trw_d_sort',
    code: 'Arrays.sort(height);',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Sorting destroys the elevation map geometry.',
      ru: 'Сортировка уничтожает геометрию карты высот.'
    }
  },
  {
    id: 'mos_trw_d_compile',
    code: 'int leftMax;',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Local variable used later without initialization — does not compile.',
      ru: 'Локальная переменная используется без инициализации — не компилируется.'
    }
  },
  {
    id: 'mos_trw_d_mid',
    code: 'int mid = (left + right) / 2;',
    indent: 2,
    role: 'DISTRACTOR_IRRELEVANT',
    explanation: {
      en: 'Binary-search midpoint is unrelated to trapping water.',
      ru: 'Середина для binary search не связана с удержанием воды.'
    }
  },
  {
    id: 'mos_trw_d_abs',
    code: 'water += Math.abs(height[left] - height[right]);',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Neighbor difference is not the trapped-water formula.',
      ru: 'Разность соседей — не формула удержанной воды.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Prefix/suffix maxima arrays are equally correct in O(n) time with O(n) space; this workshop targets the two-pointer O(1)-space form.',
  ru: 'Массивы prefix/suffix maxima столь же верны за O(n) время и O(n) память; воркшоп целится в two-pointer форму с O(1) памятью.'
} as const;

/** Classic map; steps highlight key leftMax/rightMax/water transitions (not every micro-move). */
const HEIGHT = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] as const;

const trace: TraceScenario = {
  id: 'tr_trw_main',
  problemId: PROBLEM_ID,
  kind: 'ARRAY_POINTERS',
  label: { en: 'Primary two-pointer water trace', ru: 'Основная two-pointer трассировка воды' },
  inputSummary: {
    en: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    ru: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]'
  },
  arrayInput: [...HEIGHT],
  steps: [
    {
      id: 'tr_trw_0',
      title: { en: 'Start at ends', ru: 'Старт с краёв' },
      narrative: {
        en: 'left=0 (h=0), right=11 (h=1). leftMax=rightMax=water=0. height[left] < height[right], so process left.',
        ru: 'left=0 (h=0), right=11 (h=1). leftMax=rightMax=water=0. height[left] < height[right] → обрабатываем left.'
      },
      state: {
        left: '0',
        right: '11',
        leftMax: '0',
        rightMax: '0',
        water: '0',
        heightLeft: '0',
        heightRight: '1'
      },
      question: {
        en: 'height[left] is 0 and leftMax is 0 — what happens?',
        ru: 'height[left]=0 и leftMax=0 — что происходит?'
      },
      choices: [
        {
          id: 'raise_max',
          text: { en: 'Set leftMax = 0, then left++', ru: 'leftMax = 0, затем left++' }
        },
        {
          id: 'add_water',
          text: { en: 'Add water immediately', ru: 'Сразу добавить воду' }
        }
      ],
      correctChoiceId: 'raise_max',
      feedbackCorrect: {
        en: 'height[left] >= leftMax → raise/keep leftMax, no water on the open edge.',
        ru: 'height[left] >= leftMax → обновить leftMax, на открытом краю воды нет.'
      },
      feedbackIncorrect: {
        en: 'When height equals/exceeds leftMax, update the max — do not add water.',
        ru: 'Когда height ≥ leftMax, обновляем max — воду не добавляем.'
      },
      highlightIndex: 0
    },
    {
      id: 'tr_trw_1',
      title: { en: 'Raise leftMax at index 1', ru: 'Поднять leftMax на индексе 1' },
      narrative: {
        en: 'left=1 (h=1), right=11 (h=1). Tie → else branch processes right. Then later left side will matter again.',
        ru: 'left=1 (h=1), right=11 (h=1). Ничья → else обрабатывает right. Потом снова важна левая сторона.'
      },
      state: {
        left: '1',
        right: '11',
        leftMax: '0',
        rightMax: '0',
        water: '0',
        heightLeft: '1',
        heightRight: '1'
      },
      question: {
        en: 'On a tie (height[left] == height[right]), which side does the canonical code move?',
        ru: 'При равенстве (height[left] == height[right]) какую сторону двигает канонический код?'
      },
      choices: [
        { id: 'right', text: { en: 'Right (else branch)', ru: 'Правую (ветка else)' } },
        { id: 'left', text: { en: 'Left (if branch)', ru: 'Левую (ветка if)' } }
      ],
      correctChoiceId: 'right',
      feedbackCorrect: {
        en: 'Condition is strict < ; equality falls into the else branch and decrements right.',
        ru: 'Условие строгое < ; равенство попадает в else и уменьшает right.'
      },
      feedbackIncorrect: {
        en: 'if uses height[left] < height[right], so ties go to the right side.',
        ru: 'if использует height[left] < height[right], поэтому ничья — на правой стороне.'
      },
      highlightIndex: 11
    },
    {
      id: 'tr_trw_2',
      title: { en: 'First trapped unit', ru: 'Первая единица воды' },
      narrative: {
        en: 'After early updates: left=2 (h=0), leftMax=1, right still on a taller/equal wall. Process left: 0 < leftMax → add 1.',
        ru: 'После ранних обновлений: left=2 (h=0), leftMax=1, справа стена не ниже. Обрабатываем left: 0 < leftMax → +1.'
      },
      state: {
        left: '2',
        right: '10',
        leftMax: '1',
        rightMax: '1',
        water: '0',
        heightLeft: '0',
        heightRight: '2'
      },
      question: {
        en: 'How much water is added at index 2?',
        ru: 'Сколько воды добавляется в индексе 2?'
      },
      choices: [
        { id: 'one', text: { en: '1 (leftMax − 0)', ru: '1 (leftMax − 0)' } },
        { id: 'zero', text: { en: '0', ru: '0' } }
      ],
      correctChoiceId: 'one',
      feedbackCorrect: {
        en: 'water becomes 1. Shorter-side leftMax proves a ceiling of 1.',
        ru: 'water становится 1. leftMax более низкой стороны даёт потолок 1.'
      },
      feedbackIncorrect: {
        en: 'height 0 under leftMax 1 traps exactly one unit.',
        ru: 'Высота 0 при leftMax 1 удерживает ровно одну единицу.'
      },
      highlightIndex: 2
    },
    {
      id: 'tr_trw_3',
      title: { en: 'Raise leftMax at peak 2', ru: 'Поднять leftMax на пике 2' },
      narrative: {
        en: 'left reaches index 3 with height 2. leftMax was 1 → update leftMax to 2; no water added on a new high.',
        ru: 'left на индексе 3 с высотой 2. leftMax был 1 → leftMax = 2; на новом максимуме воду не добавляем.'
      },
      state: {
        left: '3',
        right: '10',
        leftMax: '1',
        rightMax: '1',
        water: '1',
        heightLeft: '2',
        heightRight: '2'
      },
      question: {
        en: 'After processing index 3 on the left path, what is leftMax?',
        ru: 'После обработки индекса 3 на левом пути чему равен leftMax?'
      },
      choices: [
        { id: 'two', text: { en: '2', ru: '2' } },
        { id: 'one', text: { en: '1', ru: '1' } }
      ],
      correctChoiceId: 'two',
      feedbackCorrect: {
        en: 'New high updates leftMax; water stays 1 until later valleys.',
        ru: 'Новый максимум обновляет leftMax; water остаётся 1 до следующих долин.'
      },
      feedbackIncorrect: {
        en: 'height[3]=2 >= leftMax → leftMax becomes 2.',
        ru: 'height[3]=2 >= leftMax → leftMax становится 2.'
      },
      highlightIndex: 3
    },
    {
      id: 'tr_trw_4',
      title: { en: 'Accumulate toward 6', ru: 'Накопить до 6' },
      narrative: {
        en: 'Continuing the algorithm fills valleys at indices 4–6 and later pockets until pointers meet. Final water is 6.',
        ru: 'Продолжая алгоритм, заполняем долины на индексах 4–6 и далее, пока указатели не встретятся. Итог water = 6.'
      },
      state: {
        left: '6',
        right: '7',
        leftMax: '2',
        rightMax: '3',
        water: '6',
        note: 'pointers about to meet'
      },
      question: {
        en: 'What is the total water for this elevation map?',
        ru: 'Сколько всего воды на этой карте высот?'
      },
      choices: [
        { id: 'six', text: { en: '6', ru: '6' } },
        { id: 'nine', text: { en: '9', ru: '9' } }
      ],
      correctChoiceId: 'six',
      feedbackCorrect: {
        en: 'Classic answer: 6 units trapped.',
        ru: 'Классический ответ: 6 единиц.'
      },
      feedbackIncorrect: {
        en: 'This map traps 6, not 9 (9 is the [4,2,0,3,2,5] example).',
        ru: 'Эта карта удерживает 6, не 9 (9 — пример [4,2,0,3,2,5]).'
      },
      highlightIndex: 6
    }
  ],
  followUpQuestion: {
    en: 'For height = [1,0,1], what is trap(height)?',
    ru: 'Для height = [1,0,1] чему равен trap(height)?'
  },
  followUpChoices: [
    { id: 'one', text: { en: '1', ru: '1' } },
    { id: 'zero', text: { en: '0', ru: '0' } }
  ],
  followUpCorrectChoiceId: 'one',
  followUpFeedbackCorrect: {
    en: 'Middle pit of depth 1 under walls of height 1 → 1.',
    ru: 'Средняя яма глубины 1 под стенами высоты 1 → 1.'
  },
  followUpFeedbackIncorrect: {
    en: 'Index 1 traps min(1,1) − 0 = 1.',
    ru: 'Индекс 1 удерживает min(1,1) − 0 = 1.'
  }
};

const hints: readonly AlgorithmHint[] = [
  {
    id: 'hnt_trw_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Pointers start at both ends with running leftMax/rightMax and a water accumulator.',
      ru: 'Указатели стартуют с обоих концов с бегущими leftMax/rightMax и аккумулятором water.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'Always process the shorter side — that side’s max is a safe ceiling.',
      ru: 'Всегда обрабатывайте более низкую сторону — её max безопасный потолок.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'If height[side] >= sideMax, raise the max; else add sideMax − height[side].',
      ru: 'Если height[side] >= sideMax — поднять max; иначе добавить sideMax − height[side].'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_bp_4',
    stageType: 'BLUEPRINT',
    level: 4,
    text: {
      en: 'Revealing the first block: Init left, right, leftMax, rightMax, water = 0.',
      ru: 'Открываем первый блок: Инициализировать left, right, leftMax, rightMax, water = 0.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_trw_init'
  },
  {
    id: 'hnt_trw_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'Five locals before the loop: left, right, leftMax, rightMax, water.',
      ru: 'Пять локальных до цикла: left, right, leftMax, rightMax, water.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'Branch on height[left] < height[right]; each branch either updates max or adds water, then moves that pointer.',
      ru: 'Ветка по height[left] < height[right]; каждая либо обновляет max, либо добавляет воду, затем двигает указатель.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_mos_3',
    stageType: 'CODE_MOSAIC',
    level: 3,
    text: {
      en: 'Reveal the while-loop header tile.',
      ru: 'Открываем плитку заголовка while.'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_007`
  },
  {
    id: 'hnt_trw_mos_4',
    stageType: 'CODE_MOSAIC',
    level: 4,
    text: {
      en: 'Reveal the water accumulation line on the left branch.',
      ru: 'Открываем строку накопления воды на левой ветке.'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_012`
  },
  {
    id: 'hnt_trw_mos_5',
    stageType: 'CODE_MOSAIC',
    level: 5,
    text: {
      en: 'Full solution reveal is available as a last resort after prior hints.',
      ru: 'Полное раскрытие решения доступно как крайняя мера после предыдущих подсказок.'
    },
    revealType: 'FULL'
  },
  {
    id: 'hnt_trw_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'Watch leftMax/rightMax/water in the state panel as pointers move.',
      ru: 'Следите за leftMax/rightMax/water в панели состояния при движении указателей.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_trw_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'First trapped unit appears at index 2 once leftMax is 1.',
      ru: 'Первая единица воды появляется в индексе 2, когда leftMax уже 1.'
    },
    revealType: 'NONE'
  }
];

const summary: WorkshopSummaryContent = {
  corePattern: {
    en: 'Two pointers — process the shorter side; its running max is a safe water ceiling.',
    ru: 'Два указателя — обрабатывать более низкую сторону; её бегущий max — безопасный потолок воды.'
  },
  invariant: {
    en: 'While left < right, water added on the shorter side never exceeds the opposite side’s current height (as a bounding wall).',
    ru: 'Пока left < right, вода на более низкой стороне не превышает текущую высоту противоположной стороны (как стену).'
  },
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  commonMistake: {
    en: 'Moving both pointers, or using only immediate neighbors instead of running maxima.',
    ru: 'Двигать оба указателя или использовать только соседей вместо бегущих максимумов.'
  },
  recognitionCue: {
    en: '“How much water between bars?” / need both-side bounds → two pointers or prefix/suffix maxima.',
    ru: '«Сколько воды между столбцами?» / нужны границы с обеих сторон → two pointers или prefix/suffix maxima.'
  }
};

export const TRAPPING_RAIN_WATER_PACK: AlgorithmWorkshopPack = {
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
    en: 'Mosaic complete. Shorter side + running max decides trapped depth in O(1) space.',
    ru: 'Мозаика собрана. Более низкая сторона + бегущий max задают глубину за O(1) памяти.'
  },
  blueprintHelp: {
    en: 'Assemble two-pointer water logic blocks. Java is still hidden.',
    ru: 'Соберите логические блоки two-pointer для воды. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: init → while → compare → update max / add water → move → return.',
    ru: 'Чертёж верен: init → while → compare → update max / add water → move → return.'
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
    en: 'Why is it safe to decide water on the shorter side before seeing the rest of that side?',
    ru: 'Почему безопасно решать воду на более низкой стороне, не видя остаток этой стороны?'
  },
  summary
};

export const TRAPPING_RAIN_WATER_DEFAULT_SOLUTION_STRATEGY_ID = TARGET_STRATEGY_ID;
export const TRAPPING_RAIN_WATER_SOLUTION_ID = SOLUTION_ID;
