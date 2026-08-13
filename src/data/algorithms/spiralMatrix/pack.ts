/**
 * INTERPRETATION: classic Spiral Matrix — return all elements of an m×n matrix
 * in clockwise spiral order starting from the top-left corner (not generate a matrix).
 */
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

const PROBLEM_ID = 'alg_spiral_matrix';
const TARGET_STRATEGY_ID = 'strat_sm_boundaries';
const SOLUTION_ID = 'sol_spiral_matrix_boundaries';
const MOSAIC_ID = 'mos_sm_boundaries';

const SOLUTIONS: readonly AlgorithmSolution[] = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA',
    javaVersion: '17',
    timeComplexity: 'O(m·n)',
    spaceComplexity: 'O(1) extra (excl. result)',
    explanation: {
      en: 'Walk the outer layer with four bounds, then shrink top/bottom/left/right until the layer collapses.',
      ru: 'Обойти внешний слой четырьмя границами, затем сжимать top/bottom/left/right, пока слой не схлопнется.'
    },
    canonicalCode: `
public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    int top = 0;
    int bottom = matrix.length - 1;
    int left = 0;
    int right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int col = left; col <= right; col++) {
            result.add(matrix[top][col]);
        }
        top++;
        for (int row = top; row <= bottom; row++) {
            result.add(matrix[row][right]);
        }
        right--;
        if (top <= bottom) {
            for (int col = right; col >= left; col--) {
                result.add(matrix[bottom][col]);
            }
            bottom--;
        }
        if (left <= right) {
            for (int row = bottom; row >= top; row--) {
                result.add(matrix[row][left]);
            }
            left++;
        }
    }
    return result;
}
`.trim()
  }
];

const STRATEGIES: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_sm_visited',
    problemId: PROBLEM_ID,
    title: { en: 'Direction vectors + visited', ru: 'Векторы направлений + visited' },
    description: {
      en: 'Step in a direction; when blocked or visited, turn right.',
      ru: 'Шагать в направлении; при блоке или visited — повернуть направо.'
    },
    timeClass: 'O(m·n)',
    spaceClass: 'O(m·n)',
    importantConstraint: {
      en: 'Needs a visited matrix (or mutating input) to know when to turn.',
      ru: 'Нужна матрица visited (или мутация входа), чтобы знать, когда повернуть.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Natural simulation', ru: 'Естественная симуляция' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Shrinking layer boundaries', ru: 'Сжимающиеся границы слоя' },
    description: {
      en: 'Traverse top row → right col → bottom row → left col, then shrink bounds.',
      ru: 'Обойти верхнюю строку → правый столбец → нижнюю строку → левый столбец, затем сжать границы.'
    },
    timeClass: 'O(m·n)',
    spaceClass: 'O(1) extra',
    importantConstraint: {
      en: 'Guard bottom/left passes so single-row or single-column layers are not double-counted.',
      ru: 'Охранять нижний/левый проходы, чтобы однорядные/одностолбцовые слои не дублировались.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'No visited matrix', ru: 'Без матрицы visited' },
      { en: 'Clear layer invariant', ru: 'Ясный инвариант слоя' },
      { en: 'O(1) extra space', ru: 'O(1) доп. памяти' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_sm_recurse',
    problemId: PROBLEM_ID,
    title: { en: 'Recurse on inner submatrix', ru: 'Рекурсия по внутренней подматрице' },
    description: {
      en: 'Emit the outer ring, then recurse on the remaining (m-2)×(n-2) core.',
      ru: 'Вывести внешнее кольцо, затем рекурсия по оставшемуся ядру (m-2)×(n-2).'
    },
    timeClass: 'O(m·n)',
    spaceClass: 'O(min(m,n)) stack',
    importantConstraint: {
      en: 'Same idea as boundaries, but stack depth adds overhead.',
      ru: 'Та же идея, что границы, но глубина стека даёт overhead.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Layer recursion', ru: 'Рекурсия по слоям' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_sm_row_major',
    problemId: PROBLEM_ID,
    title: { en: 'Simple row-major flatten', ru: 'Простой обход по строкам' },
    description: {
      en: 'Append every cell left-to-right, top-to-bottom.',
      ru: 'Добавить каждую ячейку слева направо, сверху вниз.'
    },
    timeClass: 'O(m·n)',
    spaceClass: 'O(1) extra',
    importantConstraint: {
      en: 'Produces row order, not spiral order — wrong contract.',
      ru: 'Даёт порядок по строкам, не спираль — неверный контракт.'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: [],
    justificationChips: [
      { en: 'Wrong traversal order', ru: 'Неверный порядок обхода' }
    ],
    unlocksBlueprint: false
  }
];

const BLUEPRINT: BlueprintGraph = {
  id: 'bp_sm_boundaries',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_sm_bounds',
      label: {
        en: 'Initialize top, bottom, left, right from matrix size',
        ru: 'Инициализировать top, bottom, left, right по размеру матрицы'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_loop',
      label: {
        en: 'While the remaining rectangle is non-empty',
        ru: 'Пока оставшийся прямоугольник непуст'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_top',
      label: { en: 'Traverse top row left→right, then top++', ru: 'Обойти верхнюю строку left→right, затем top++' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_right',
      label: { en: 'Traverse right column top→bottom, then right--', ru: 'Обойти правый столбец top→bottom, затем right--' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_bottom',
      label: {
        en: 'If rows remain: traverse bottom right→left, then bottom--',
        ru: 'Если строки остались: обойти низ right→left, затем bottom--'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_left',
      label: {
        en: 'If cols remain: traverse left bottom→top, then left++',
        ru: 'Если столбцы остались: обойти левый bottom→top, затем left++'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_sm_d_visited',
      label: { en: 'Allocate a boolean visited[m][n]', ru: 'Выделить boolean visited[m][n]' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Visited marking is another strategy; boundaries avoid that matrix.',
        ru: 'Маркировка visited — другая стратегия; границы обходятся без этой матрицы.'
      }
    },
    {
      id: 'bp_sm_d_no_guard',
      label: {
        en: 'Always walk bottom and left without emptiness checks',
        ru: 'Всегда обходить низ и левый без проверок пустоты'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Single-row / single-column layers would double-count cells.',
        ru: 'Однорядные / одностолбцовые слои дважды посчитают ячейки.'
      }
    },
    {
      id: 'bp_sm_d_ccw',
      label: { en: 'Spiral counter-clockwise from the start', ru: 'Спираль против часовой с самого начала' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Classic spiral order starts clockwise along the top row.',
        ru: 'Классический spiral order начинается по часовой вдоль верхней строки.'
      }
    }
  ],
  solutionOrder: [
    'bp_sm_bounds',
    'bp_sm_loop',
    'bp_sm_top',
    'bp_sm_right',
    'bp_sm_bottom',
    'bp_sm_left'
  ]
};

const CLARIFY: readonly ClarifyQuestion[] = [
  {
    id: 'cq_sm_contract',
    prompt: {
      en: 'What does this problem ask you to return?',
      ru: 'Что просит вернуть эта задача?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_sm_contract_list',
        text: {
          en: 'All matrix values in clockwise spiral order',
          ru: 'Все значения матрицы в порядке спирали по часовой'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct — flatten the m×n matrix into a spiral sequence.',
          ru: 'Верно — развернуть матрицу m×n в спиральную последовательность.'
        }
      },
      {
        id: 'cq_sm_contract_generate',
        text: {
          en: 'Generate a new matrix filled 1..n² in spiral order',
          ru: 'Сгенерировать новую матрицу, заполненную 1..n² по спирали'
        },
        isCorrect: false,
        feedback: {
          en: 'That is a different classic problem (Spiral Matrix II).',
          ru: 'Это другая классическая задача (Spiral Matrix II).'
        }
      }
    ]
  },
  {
    id: 'cq_sm_shape',
    prompt: {
      en: 'Must the matrix be square?',
      ru: 'Должна ли матрица быть квадратной?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_sm_shape_rect',
        text: { en: 'No — any m×n rectangle is allowed', ru: 'Нет — допустим любой прямоугольник m×n' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Boundary guards matter most on non-square shapes.',
          ru: 'Верно. Охрана границ особенно важна на неквадратных формах.'
        }
      },
      {
        id: 'cq_sm_shape_square',
        text: { en: 'Yes — only n×n inputs appear', ru: 'Да — бывают только входы n×n' },
        isCorrect: false,
        feedback: {
          en: 'Rectangular matrices are in scope and expose off-by-one bugs.',
          ru: 'Прямоугольные матрицы в скоупе и выявляют off-by-one ошибки.'
        }
      }
    ]
  },
  {
    id: 'cq_sm_guard',
    prompt: {
      en: 'Why check `top <= bottom` before the bottom-row pass?',
      ru: 'Зачем проверять `top <= bottom` перед проходом нижней строки?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_sm_guard_dup',
        text: {
          en: 'Avoid revisiting the only remaining row after top++',
          ru: 'Не перечитывать единственную оставшуюся строку после top++'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. After advancing top, a single-row layer may already be exhausted.',
          ru: 'Верно. После увеличения top однорядный слой может быть уже исчерпан.'
        }
      },
      {
        id: 'cq_sm_guard_perf',
        text: { en: 'Only for asymptotic performance', ru: 'Только ради асимптотики' },
        isCorrect: false,
        feedback: {
          en: 'It is a correctness guard against duplicates, not a speed trick.',
          ru: 'Это охрана корректности от дубликатов, не трюк скорости.'
        }
      }
    ]
  },
  {
    id: 'cq_sm_empty',
    prompt: {
      en: 'What if the matrix has zero rows?',
      ru: 'Что если у матрицы ноль строк?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_sm_empty_list',
        text: { en: 'Return an empty list', ru: 'Вернуть пустой список' },
        isCorrect: true,
        feedback: {
          en: 'Correct. No cells to emit — empty result.',
          ru: 'Верно. Нет ячеек для вывода — пустой результат.'
        }
      },
      {
        id: 'cq_sm_empty_null',
        text: { en: 'Return null', ru: 'Вернуть null' },
        isCorrect: false,
        feedback: {
          en: 'Interview contracts usually prefer an empty collection over null.',
          ru: 'На интервью обычно предпочитают пустую коллекцию, а не null.'
        }
      }
    ]
  }
];

const DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'mos_sm_d_visited',
    code: 'boolean[][] visited = new boolean[matrix.length][matrix[0].length];',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Visited matrix belongs to the direction-simulation approach.',
      ru: 'Матрица visited относится к симуляции направлений.'
    }
  },
  {
    id: 'mos_sm_d_no_if_bottom',
    code: 'for (int col = right; col >= left; col--) {',
    indent: 2,
    role: 'DISTRACTOR_EDGE_CASE',
    explanation: {
      en: 'Bottom pass without `if (top <= bottom)` can duplicate a single remaining row.',
      ru: 'Нижний проход без `if (top <= bottom)` может продублировать единственную строку.'
    }
  },
  {
    id: 'mos_sm_d_wrong_inc',
    code: 'top--;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'After the top row, top must increase to shrink inward.',
      ru: 'После верхней строки top должен увеличиться, чтобы сжать внутрь.'
    }
  },
  {
    id: 'mos_sm_d_ccw',
    code: 'for (int row = top; row <= bottom; row++) { result.add(matrix[row][left]); }',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Starting down the left column breaks clockwise spiral order.',
      ru: 'Старт вниз по левому столбцу ломает порядок спирали по часовой.'
    }
  },
  {
    id: 'mos_sm_d_or',
    code: 'while (top < bottom || left < right) {',
    indent: 1,
    role: 'DISTRACTOR_INVARIANT',
    explanation: {
      en: 'Need both dimensions still valid (`&&`); `||` continues with an empty side.',
      ru: 'Нужны обе валидные стороны (`&&`); `||` продолжает с пустой стороной.'
    }
  },
  {
    id: 'mos_sm_d_set',
    code: 'Set<Integer> result = new HashSet<>();',
    indent: 1,
    role: 'DISTRACTOR_IRRELEVANT',
    explanation: {
      en: 'A set loses order and duplicates-by-mistake diagnostics.',
      ru: 'Set теряет порядок и диагностику ошибочных дубликатов.'
    }
  },
  {
    id: 'mos_sm_d_prim_list',
    code: 'List<int> result = new ArrayList<>();',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Does not compile — use List<Integer>, not List<int>.',
      ru: 'Не компилируется — нужен List<Integer>, не List<int>.'
    }
  }
];

const ALTERNATIVE_NOTE = {
  en: 'Equivalent: simulate with (dr, dc) turns and a visited[][] — same order, more memory.',
  ru: 'Эквивалент: симуляция с поворотами (dr, dc) и visited[][] — тот же порядок, больше памяти.'
} as const;

const TRACE: TraceScenario = {
  id: 'tr_sm_main',
  problemId: PROBLEM_ID,
  kind: 'MATRIX_BOUNDARIES',
  label: { en: 'Spiral on 3×3', ru: 'Спираль на 3×3' },
  inputSummary: {
    en: 'matrix = [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]',
    ru: 'matrix = [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]'
  },
  steps: [
    {
      id: 'tr_sm_0',
      title: { en: 'Initial bounds', ru: 'Начальные границы' },
      narrative: {
        en: '3×3 matrix. top=0, bottom=2, left=0, right=2. Result empty.',
        ru: 'Матрица 3×3. top=0, bottom=2, left=0, right=2. Result пуст.'
      },
      state: {
        top: '0',
        bottom: '2',
        left: '0',
        right: '2',
        result: '[]'
      },
      question: {
        en: 'Which cells does the first top-row pass emit?',
        ru: 'Какие ячейки выдаёт первый проход верхней строки?'
      },
      choices: [
        { id: 'top', text: { en: '1, 2, 3', ru: '1, 2, 3' } },
        { id: 'left', text: { en: '1, 4, 7', ru: '1, 4, 7' } }
      ],
      correctChoiceId: 'top',
      feedbackCorrect: {
        en: 'Top row left→right is 1,2,3; then top becomes 1.',
        ru: 'Верхняя строка left→right: 1,2,3; затем top становится 1.'
      },
      feedbackIncorrect: {
        en: 'Clockwise spiral starts across the top row, not down the left column.',
        ru: 'Спираль по часовой начинается вдоль верхней строки, не вниз по левому столбцу.'
      }
    },
    {
      id: 'tr_sm_1',
      title: { en: 'After top and right', ru: 'После верха и права' },
      narrative: {
        en: 'Emitted 1,2,3 then 6,9. Bounds: top=1, right=1, bottom=2, left=0.',
        ru: 'Выдано 1,2,3 затем 6,9. Границы: top=1, right=1, bottom=2, left=0.'
      },
      state: {
        top: '1',
        bottom: '2',
        left: '0',
        right: '1',
        result: '[1, 2, 3, 6, 9]'
      },
      question: {
        en: 'Bottom pass (right→left) adds which values?',
        ru: 'Нижний проход (right→left) добавляет какие значения?'
      },
      choices: [
        { id: 'eight_seven', text: { en: '8, 7', ru: '8, 7' } },
        { id: 'seven_eight', text: { en: '7, 8', ru: '7, 8' } }
      ],
      correctChoiceId: 'eight_seven',
      feedbackCorrect: {
        en: 'From col right=1 to left=0 on row 2: 8 then 7.',
        ru: 'От col right=1 до left=0 на строке 2: 8 затем 7.'
      },
      feedbackIncorrect: {
        en: 'Direction is right→left, so 8 comes before 7.',
        ru: 'Направление right→left, поэтому 8 раньше 7.'
      }
    },
    {
      id: 'tr_sm_2',
      title: { en: 'Left column then shrink', ru: 'Левый столбец и сжатие' },
      narrative: {
        en: 'After bottom--, bottom=1. Left pass bottom→top adds 4. Then left++ → 1.',
        ru: 'После bottom-- bottom=1. Левый проход bottom→top добавляет 4. Затем left++ → 1.'
      },
      state: {
        top: '1',
        bottom: '1',
        left: '1',
        right: '1',
        result: '[1, 2, 3, 6, 9, 8, 7, 4]'
      },
      question: {
        en: 'What remains for the next layer?',
        ru: 'Что остаётся для следующего слоя?'
      },
      choices: [
        { id: 'center', text: { en: 'Only the center cell 5', ru: 'Только центральная ячейка 5' } },
        { id: 'done', text: { en: 'Nothing — spiral is finished', ru: 'Ничего — спираль закончена' } }
      ],
      correctChoiceId: 'center',
      feedbackCorrect: {
        en: 'top=bottom=left=right=1 → one cell left: 5.',
        ru: 'top=bottom=left=right=1 → осталась одна ячейка: 5.'
      },
      feedbackIncorrect: {
        en: 'The 1×1 core still satisfies top<=bottom && left<=right.',
        ru: 'Ядро 1×1 всё ещё удовлетворяет top<=bottom && left<=right.'
      }
    },
    {
      id: 'tr_sm_3',
      title: { en: 'Final center', ru: 'Финальный центр' },
      narrative: {
        en: 'Top pass emits 5; after top++ the rectangle is empty.',
        ru: 'Верхний проход выдаёт 5; после top++ прямоугольник пуст.'
      },
      state: {
        top: '2',
        bottom: '1',
        left: '1',
        right: '1',
        result: '[1, 2, 3, 6, 9, 8, 7, 4, 5]'
      },
      question: {
        en: 'Is the final order correct?',
        ru: 'Верен ли итоговый порядок?'
      },
      choices: [
        { id: 'yes', text: { en: 'Yes — [1,2,3,6,9,8,7,4,5]', ru: 'Да — [1,2,3,6,9,8,7,4,5]' } },
        { id: 'no', text: { en: 'No — center should come earlier', ru: 'Нет — центр должен быть раньше' } }
      ],
      correctChoiceId: 'yes',
      feedbackCorrect: {
        en: 'Outer ring first, then the single remaining center.',
        ru: 'Сначала внешнее кольцо, затем единственный оставшийся центр.'
      },
      feedbackIncorrect: {
        en: 'Center is the innermost layer, emitted last.',
        ru: 'Центр — самый внутренний слой, выводится последним.'
      }
    }
  ],
  followUpQuestion: {
    en: 'For a 1×3 matrix [[1,2,3]], what is spiral order?',
    ru: 'Для матрицы 1×3 [[1,2,3]] какой spiral order?'
  },
  followUpChoices: [
    { id: 'row', text: { en: '[1, 2, 3]', ru: '[1, 2, 3]' } },
    { id: 'dup', text: { en: '[1, 2, 3, 2, 1]', ru: '[1, 2, 3, 2, 1]' } }
  ],
  followUpCorrectChoiceId: 'row',
  followUpFeedbackCorrect: {
    en: 'Top pass takes the only row; bottom/left guards skip — no duplicates.',
    ru: 'Верхний проход берёт единственную строку; охраны bottom/left пропускают — без дубликатов.'
  },
  followUpFeedbackIncorrect: {
    en: 'Without emptiness guards you would re-walk the same row.',
    ru: 'Без проверок пустоты вы бы снова прошли ту же строку.'
  }
};

const HINTS: readonly AlgorithmHint[] = [
  {
    id: 'hnt_sm_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Four integers bound the remaining unread rectangle.',
      ru: 'Четыре целых ограничивают ещё не прочитанный прямоугольник.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_sm_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'Order inside a layer: top row, right col, bottom row, left col.',
      ru: 'Порядок внутри слоя: верх, правый, низ, левый.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_sm_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'Revealing first block: initialize the four bounds.',
      ru: 'Открываем первый блок: инициализировать четыре границы.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_sm_bounds'
  },
  {
    id: 'hnt_sm_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'After top++ and right--, wrap bottom and left passes in emptiness checks.',
      ru: 'После top++ и right-- оберните нижний и левый проходы проверками пустоты.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_sm_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'Loop condition needs both `top <= bottom` and `left <= right`.',
      ru: 'Условие цикла требует и `top <= bottom`, и `left <= right`.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_sm_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'On 3×3, watch bounds shrink from 0..2 to the single center cell.',
      ru: 'На 3×3 смотрите, как границы сжимаются от 0..2 к одной центральной ячейке.'
    },
    revealType: 'NONE'
  }
];

export const SPIRAL_MATRIX_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'spiral-matrix',
    title: { en: 'Spiral Matrix', ru: 'Спиральная матрица' },
    summary: {
      en: 'Return every value of an m×n matrix in clockwise spiral order.',
      ru: 'Вернуть каждое значение матрицы m×n в порядке спирали по часовой стрелке.'
    },
    statement: {
      en: 'Given an `m x n` matrix, return all elements of the matrix in spiral order. Start at the top-left cell and walk clockwise: across the top row, down the right column, back across the bottom row, up the left column, then continue on the next inner layer until every cell is visited exactly once.',
      ru: 'Дана матрица `m x n`. Верните все элементы матрицы в порядке спирали. Начните с верхней левой ячейки и идите по часовой: вдоль верхней строки, вниз по правому столбцу, обратно по нижней строке, вверх по левому столбцу, затем продолжайте на следующем внутреннем слое, пока каждая ячейка не будет посещена ровно один раз.'
    },
    examples: [
      {
        id: 'ex_sm_1',
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
        explanation: {
          en: 'Outer ring first, then the center 5.',
          ru: 'Сначала внешнее кольцо, затем центр 5.'
        }
      },
      {
        id: 'ex_sm_2',
        input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation: {
          en: 'Rectangular layers still shrink with the same four bounds.',
          ru: 'Прямоугольные слои сжимаются теми же четырьмя границами.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_sm_1',
        text: {
          en: '`m == matrix.length`, `n == matrix[i].length`',
          ru: '`m == matrix.length`, `n == matrix[i].length`'
        }
      },
      {
        id: 'c_sm_2',
        text: {
          en: '`1 <= m, n <= 10` in many statements; algorithm should still be general for larger grids.',
          ru: '`1 <= m, n <= 10` во многих формулировках; алгоритм должен оставаться общим и для больших сеток.'
        }
      },
      {
        id: 'c_sm_3',
        text: {
          en: '`-100 <= matrix[i][j] <= 100`',
          ru: '`-100 <= matrix[i][j] <= 100`'
        }
      }
    ],
    patternFamilyId: 'pat_matrix_traversal',
    difficulty: 'MEDIUM',
    estimatedMinutes: 30,
    stages: standardWorkshopStages('sm', {
      STRATEGY: {
        en: 'Compare visited+direction simulation with shrinking boundary layers.',
        ru: 'Сравните симуляцию visited+направление со сжимающимися границами слоёв.'
      },
      BLUEPRINT: {
        en: 'Order the four side passes and their bound updates before Java appears.',
        ru: 'Упорядочите четыре прохода сторон и обновления границ до появления Java.'
      },
      TRACE: {
        en: 'Watch top/bottom/left/right shrink on [[1,2,3],[4,5,6],[7,8,9]].',
        ru: 'Наблюдайте сжатие top/bottom/left/right на [[1,2,3],[4,5,6],[7,8,9]].'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-preparation problem for matrix layer traversal. No company attribution.',
      ru: 'Распространённая публичная задача для подготовки к интервью про обход слоёв матрицы. Без атрибуции компании.'
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
    en: 'Mosaic complete. Four bounds shrink after each clockwise ring.',
    ru: 'Мозаика собрана. Четыре границы сжимаются после каждого кольца по часовой.'
  },
  blueprintHelp: {
    en: 'Assemble spiral layer blocks. Java is still hidden.',
    ru: 'Соберите блоки спирального слоя. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: bounds → loop → top → right → guarded bottom → guarded left.',
    ru: 'Чертёж верен: границы → цикл → верх → право → охраняемый низ → охраняемый левый.'
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
    en: 'When does skipping the bottom or left pass become necessary?',
    ru: 'Когда становится необходимым пропустить нижний или левый проход?'
  },
  summary: {
    corePattern: {
      en: 'Matrix traversal by shrinking boundaries — emit one layer, then move inward.',
      ru: 'Обход матрицы сжатием границ — вывести слой, затем сдвинуться внутрь.'
    },
    invariant: {
      en: 'Everything outside [top..bottom] × [left..right] is already in the result; the remaining rectangle is unread.',
      ru: 'Всё вне [top..bottom] × [left..right] уже в результате; оставшийся прямоугольник ещё не прочитан.'
    },
    timeComplexity: 'O(m·n)',
    spaceComplexity: 'O(1) extra (excl. result)',
    commonMistake: {
      en: 'Omitting emptiness guards and double-counting the last row or column.',
      ru: 'Пропустить проверки пустоты и дважды посчитать последнюю строку или столбец.'
    },
    recognitionCue: {
      en: '“Return matrix values in spiral order” / layer peel.',
      ru: '«Вернуть значения матрицы в порядке спирали» / снятие слоёв.'
    }
  }
};
