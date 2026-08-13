import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';
import { standardWorkshopStages } from '../shared/standardStages';

const PROBLEM_ID = 'alg_three_sum';
const TARGET_STRATEGY_ID = 'strat_ts_sort_two_pointers';
const SOLUTION_ID = 'sol_three_sum_sort_two_pointers';
const MOSAIC_ID = 'mos_ts_sort_two_pointers';

const THREE_SUM_SOLUTIONS = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA' as const,
    javaVersion: '17',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) extra (excluding output)',
    explanation: {
      en: 'Sort, fix i, then two-pointer search for pairs that sum to -nums[i], skipping duplicates.',
      ru: 'Сортировка, зафиксировать i, затем two-pointer поиск пар с суммой -nums[i], пропуская дубликаты.'
    },
    canonicalCode: `
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue;
        }
        int left = i + 1;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(List.of(nums[i], nums[left], nums[right]));
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) {
                    left++;
                }
                while (left < right && nums[right] == nums[right + 1]) {
                    right--;
                }
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
`.trim()
  }
];

const THREE_SUM_DISTRACTORS = [
  {
    id: 'mos_ts_d_nested3',
    code: 'for (int k = j + 1; k < nums.length; k++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Third nested loop is the O(n³) brute force, not the two-pointer target.',
      ru: 'Третий вложенный цикл — brute force O(n³), не целевой two-pointer.'
    }
  },
  {
    id: 'mos_ts_d_no_skip',
    code: 'if (i > 0 && nums[i] != nums[i - 1]) { continue; }',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Inverted skip condition — continues on unique values and keeps duplicates.',
      ru: 'Инвертированный skip — continue на уникальных и оставляет дубликаты.'
    }
  },
  {
    id: 'mos_ts_d_hash',
    code: 'Set<Integer> need = new HashSet<>();',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Hash-set pair search is another approach; this mosaic teaches sorted two pointers.',
      ru: 'Поиск пары через HashSet — другой подход; мозаика учит sorted two pointers.'
    }
  },
  {
    id: 'mos_ts_d_wrong_bounds',
    code: 'int right = nums.length;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'right must be length - 1; length is out of bounds.',
      ru: 'right должен быть length - 1; length выходит за границы.'
    }
  },
  {
    id: 'mos_ts_d_compile',
    code: 'result.add(nums[i], nums[left], nums[right]);',
    indent: 4,
    role: 'DISTRACTOR_COMPILE' as const,
    explanation: {
      en: 'Does not compile — List.add takes one element, not three ints.',
      ru: 'Не компилируется — List.add принимает один элемент, не три int.'
    }
  },
  {
    id: 'mos_ts_d_return_early',
    code: 'return result;',
    indent: 4,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Returning inside the while aborts before other triplets are found.',
      ru: 'return внутри while прерывает поиск остальных троек.'
    }
  },
  {
    id: 'mos_ts_d_edge',
    code: 'if (nums[i] > 0) { break; }',
    indent: 2,
    role: 'DISTRACTOR_EDGE_CASE' as const,
    explanation: {
      en: 'Optional optimization after sort, but not required in the canonical teaching form — and easy to misuse.',
      ru: 'Опциональная оптимизация после sort, но не обязательна в каноне — легко ошибиться.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'You may use Arrays.asList(...) instead of List.of(...); skip-duplicate loops are the critical uniqueness logic.',
  ru: 'Можно использовать Arrays.asList(...) вместо List.of(...); циклы skip-duplicate — ключевая логика уникальности.'
};

export const THREE_SUM_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'three-sum',
    title: { en: '3Sum', ru: '3Sum' },
    summary: {
      en: 'Find all unique triplets that sum to zero.',
      ru: 'Найти все уникальные тройки, сумма которых равна нулю.'
    },
    statement: {
      en: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.',
      ru: 'Дан массив целых чисел `nums`. Верните все тройки `[nums[i], nums[j], nums[k]]` такие, что индексы различны и сумма равна 0. Набор решений не должен содержать дубликатов троек.'
    },
    examples: [
      {
        id: 'ex_ts_1',
        input: 'nums = [-1, 0, 1, 2, -1, -4]',
        output: '[[-1, -1, 2], [-1, 0, 1]]',
        explanation: {
          en: 'Two distinct triplets sum to zero.',
          ru: 'Две различные тройки дают сумму ноль.'
        }
      },
      {
        id: 'ex_ts_2',
        input: 'nums = [0, 1, 1]',
        output: '[]',
        explanation: {
          en: 'No triplet sums to zero.',
          ru: 'Нет тройки с суммой ноль.'
        }
      },
      {
        id: 'ex_ts_3',
        input: 'nums = [0, 0, 0]',
        output: '[[0, 0, 0]]',
        explanation: {
          en: 'One triplet of zeros; duplicates must be collapsed.',
          ru: 'Одна тройка нулей; дубликаты нужно схлопнуть.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_ts_1',
        text: {
          en: '`3 <= nums.length <= 3000` in typical statements.',
          ru: '`3 <= nums.length <= 3000` в типичных формулировках.'
        }
      },
      {
        id: 'c_ts_2',
        text: {
          en: '`-10^5 <= nums[i] <= 10^5` — negatives and duplicates are common.',
          ru: '`-10^5 <= nums[i] <= 10^5` — отрицательные и дубликаты обычны.'
        }
      },
      {
        id: 'c_ts_3',
        text: {
          en: 'Output triplets must be unique as multisets; order of triplets usually unconstrained.',
          ru: 'Тройки в ответе уникальны как мультимножества; порядок троек обычно не фиксирован.'
        }
      }
    ],
    patternFamilyId: 'pat_two_pointers',
    difficulty: 'MEDIUM',
    estimatedMinutes: 35,
    stages: standardWorkshopStages('ts', {
      STRATEGY: {
        en: 'Compare approaches; this workshop continues with sort + fixed i + two pointers.',
        ru: 'Сравните подходы; воркшоп продолжается путём sort + фиксированный i + two pointers.'
      },
      BLUEPRINT: {
        en: 'Assemble conceptual blocks for sorting, fixing i, and scanning pairs — no Java yet.',
        ru: 'Соберите концептуальные блоки сортировки, фиксации i и сканирования пар — пока без Java.'
      },
      TRACE: {
        en: 'Trace fixed i with left/right pointers on a sorted example that needs duplicate skips.',
        ru: 'Трассируйте фиксированный i с left/right на отсортированном примере со skip дубликатов.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Classic public interview-style three-sum problem for teaching sorted two pointers and duplicate skipping. No company attribution.',
      ru: 'Классическая публичная interview-задача 3Sum для обучения sorted two pointers и skip дубликатов. Без атрибуции компании.'
    }
  },
  clarify: [
    {
      id: 'cq_ts_unique',
      prompt: {
        en: 'May the answer list contain the same triplet more than once?',
        ru: 'Может ли ответ содержать одну и ту же тройку более одного раза?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ts_unique_no',
          text: { en: 'No — triplets must be unique', ru: 'Нет — тройки должны быть уникальны' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Duplicate values in input force explicit skip logic after sorting.',
            ru: 'Верно. Дубликаты во входе требуют явного skip после сортировки.'
          }
        },
        {
          id: 'cq_ts_unique_yes',
          text: { en: 'Yes — every index combination is fine', ru: 'Да — любая комбинация индексов допустима' },
          isCorrect: false,
          feedback: {
            en: 'The contract forbids duplicate triplets in the solution set.',
            ru: 'Контракт запрещает дубликаты троек в наборе решений.'
          }
        }
      ]
    },
    {
      id: 'cq_ts_indices',
      prompt: {
        en: 'Can the same array index be used twice in one triplet?',
        ru: 'Можно ли использовать один индекс массива дважды в одной тройке?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ts_indices_no',
          text: { en: 'No — i, j, k must be pairwise distinct', ru: 'Нет — i, j, k попарно различны' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Values may equal, but indices may not reuse the same position.',
            ru: 'Верно. Значения могут совпадать, но индексы — нет.'
          }
        },
        {
          id: 'cq_ts_indices_yes',
          text: { en: 'Yes — reuse is allowed if values sum to zero', ru: 'Да — reuse допустим, если сумма 0' },
          isCorrect: false,
          feedback: {
            en: 'Reusing one index would invent a triplet that is not three elements.',
            ru: 'Повтор индекса создаёт тройку, которой нет как три элемента.'
          }
        }
      ]
    },
    {
      id: 'cq_ts_mutate',
      prompt: {
        en: 'Is sorting (mutating) the input array acceptable?',
        ru: 'Допустима ли сортировка (мутация) входного массива?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ts_mutate_yes',
          text: {
            en: 'Yes for the classic ask — mention it, or copy if order must stay',
            ru: 'Да для классического запроса — упомяните или скопируйте, если порядок важен'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. Interview solutions usually sort in place unless told otherwise.',
            ru: 'Верно. На интервью обычно сортируют на месте, если не сказано иное.'
          }
        },
        {
          id: 'cq_ts_mutate_no',
          text: { en: 'Never — input order is sacred', ru: 'Никогда — порядок входа священен' },
          isCorrect: false,
          feedback: {
            en: 'The classic statement does not forbid sorting; clarify if a follow-up forbids mutation.',
            ru: 'Классическое условие не запрещает sort; уточните, если follow-up запрещает мутацию.'
          }
        }
      ]
    },
    {
      id: 'cq_ts_target',
      prompt: {
        en: 'Is the target sum always zero, or a parameter?',
        ru: 'Целевая сумма всегда ноль или параметр?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ts_target_zero',
          text: { en: 'Classic 3Sum targets zero', ru: 'Классический 3Sum целится в ноль' },
          isCorrect: true,
          feedback: {
            en: 'Correct for this workshop. Generalized k-sum / target variants are follow-ups.',
            ru: 'Верно для этого воркшопа. Обобщения k-sum / target — follow-up.'
          }
        },
        {
          id: 'cq_ts_target_any',
          text: { en: 'Any target is required by the base statement', ru: 'Базовое условие требует любой target' },
          isCorrect: false,
          feedback: {
            en: 'Base 3Sum is sum-to-zero; other targets are a related problem.',
            ru: 'Базовый 3Sum — сумма в ноль; другие target — родственная задача.'
          }
        }
      ]
    }
  ],
  strategies: [
    {
      id: 'strat_ts_brute',
      problemId: PROBLEM_ID,
      title: { en: 'Triple nested loops', ru: 'Тройные вложенные циклы' },
      description: {
        en: 'Enumerate all index triples and filter sum == 0, then dedupe with a set.',
        ru: 'Перебрать все тройки индексов, отфильтровать sum == 0, затем дедуплицировать set-ом.'
      },
      timeClass: 'O(n³)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Too slow for n up to a few thousand.',
        ru: 'Слишком медленно при n до нескольких тысяч.'
      },
      viability: 'VALID_SUBOPTIMAL',
      costBadges: ['QUADRATIC_TIME'],
      justificationChips: [
        { en: 'Obvious correctness', ru: 'Очевидная корректность' },
        { en: 'Cubic time', ru: 'Кубическое время' }
      ],
      unlocksBlueprint: false
    },
    {
      id: TARGET_STRATEGY_ID,
      problemId: PROBLEM_ID,
      title: { en: 'Sort + fix i + two pointers', ru: 'Sort + fix i + два указателя' },
      description: {
        en: 'Sort, then for each i run left/right to find pairs summing to -nums[i], skipping duplicates.',
        ru: 'Отсортировать, затем для каждого i искать left/right пары с суммой -nums[i], пропуская дубликаты.'
      },
      timeClass: 'O(n²)',
      spaceClass: 'O(1) extra',
      importantConstraint: {
        en: 'Duplicate skipping after sort is mandatory for a unique solution set.',
        ru: 'Skip дубликатов после sort обязателен для уникального набора решений.'
      },
      viability: 'TARGET',
      costBadges: ['MUTATES_OR_COPIES'],
      justificationChips: [
        { en: 'Standard interview path', ru: 'Стандартный interview-путь' },
        { en: 'O(n²) after sort', ru: 'O(n²) после sort' },
        { en: 'Explicit dedupe', ru: 'Явная дедупликация' }
      ],
      unlocksBlueprint: true
    },
    {
      id: 'strat_ts_hash',
      problemId: PROBLEM_ID,
      title: { en: 'Fix two indices + HashSet', ru: 'Фикс двух индексов + HashSet' },
      description: {
        en: 'For each pair, probe whether -(a+b) was seen; carefully track uniqueness.',
        ru: 'Для каждой пары проверить, видели ли -(a+b); аккуратно отслеживать уникальность.'
      },
      timeClass: 'O(n²)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Same time class but heavier uniqueness bookkeeping and extra memory.',
        ru: 'Тот же класс времени, но тяжелее учёт уникальности и доп. память.'
      },
      viability: 'VALID_ALTERNATIVE',
      costBadges: ['EXTRA_MEMORY'],
      justificationChips: [
        { en: 'Hash membership for complement', ru: 'Hash membership для дополнения' }
      ],
      unlocksBlueprint: false
    },
    {
      id: 'strat_ts_stream',
      problemId: PROBLEM_ID,
      title: { en: 'Library combinations API', ru: 'Библиотечный combinations API' },
      description: {
        en: 'Generate combinations via helpers and filter — hides the pointer mechanics.',
        ru: 'Генерировать комбинации хелперами и фильтровать — скрывает механику указателей.'
      },
      timeClass: 'O(n³) typical',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Not interview-idiomatic for teaching two pointers.',
        ru: 'Неидиоматично для интервью и обучения two pointers.'
      },
      viability: 'INVALID_FOR_SLICE',
      costBadges: ['HIDES_MECHANICS'],
      justificationChips: [
        { en: 'Hides mechanics', ru: 'Скрывает механику' }
      ],
      unlocksBlueprint: false
    }
  ],
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint: {
    id: 'bp_ts_sort_two_pointers',
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    nodes: [
      {
        id: 'bp_ts_sort',
        label: { en: 'Sort the array', ru: 'Отсортировать массив' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ts_fix_i',
        label: { en: 'Fix index i and skip duplicate i values', ru: 'Зафиксировать i и пропустить дубликаты i' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ts_pointers',
        label: {
          en: 'Set left = i+1 and right = last index',
          ru: 'Установить left = i+1 и right = последний индекс'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ts_move',
        label: {
          en: 'Move left/right by comparing sum to zero; collect hits',
          ru: 'Двигать left/right, сравнивая сумму с нулём; собирать попадания'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ts_skip',
        label: {
          en: 'After a hit, skip duplicate left/right values',
          ru: 'После попадания пропустить дубликаты left/right'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ts_d_hash_only',
        label: { en: 'Only use a HashSet of all values', ru: 'Использовать только HashSet всех значений' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'A lone set does not enumerate unique ordered triples cleanly.',
          ru: 'Один set не перечисляет уникальные упорядоченные тройки чисто.'
        }
      },
      {
        id: 'bp_ts_d_stop_first',
        label: { en: 'Return after the first triplet', ru: 'Вернуть после первой тройки' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'The problem asks for all unique triplets, not just existence.',
          ru: 'Задача просит все уникальные тройки, не только существование.'
        }
      },
      {
        id: 'bp_ts_d_unsorted',
        label: { en: 'Run two pointers on the unsorted array', ru: 'Запустить two pointers на неотсортированном массиве' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'Monotone left/right movement requires sorted order.',
          ru: 'Монотонное движение left/right требует отсортированного порядка.'
        }
      }
    ],
    solutionOrder: ['bp_ts_sort', 'bp_ts_fix_i', 'bp_ts_pointers', 'bp_ts_move', 'bp_ts_skip']
  },
  solutions: THREE_SUM_SOLUTIONS,
  distractors: THREE_SUM_DISTRACTORS,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. Sort, fix i, two-pointer sum, skip duplicates.',
    ru: 'Мозаика собрана. Sort, fix i, two-pointer сумма, skip дубликатов.'
  },
  blueprintHelp: {
    en: 'Assemble sorted two-pointer blocks. Java is still hidden.',
    ru: 'Соберите блоки sorted two-pointer. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: sort → fix i → pointers → move on sum → skip duplicates.',
    ru: 'Чертёж верен: sort → fix i → указатели → движение по сумме → skip дубликатов.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions: THREE_SUM_SOLUTIONS,
    distractors: THREE_SUM_DISTRACTORS,
    alternativeNote: mosaicAlternativeNote,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace: {
    id: 'tr_ts_main',
    problemId: PROBLEM_ID,
    kind: 'ARRAY_POINTERS',
    label: { en: 'Primary trace', ru: 'Основная трассировка' },
    inputSummary: {
      en: 'After sort: nums = [-4, -1, -1, 0, 1, 2]',
      ru: 'После sort: nums = [-4, -1, -1, 0, 1, 2]'
    },
    arrayInput: [-4, -1, -1, 0, 1, 2],
    steps: [
      {
        id: 'tr_ts_0',
        title: { en: 'i at -4', ru: 'i на -4' },
        narrative: {
          en: 'Fix i=0 (value -4). Need left/right pair summing to 4.',
          ru: 'Фиксируем i=0 (значение -4). Нужна пара left/right с суммой 4.'
        },
        state: { i: '0', nums_i: '-4', left: '1', right: '5', sum: '-4 + -1 + 2 = -3' },
        question: {
          en: 'sum = -3 < 0 — which pointer moves?',
          ru: 'sum = -3 < 0 — какой указатель двигаем?'
        },
        choices: [
          { id: 'left', text: { en: 'Increase left', ru: 'Увеличить left' } },
          { id: 'right', text: { en: 'Decrease right', ru: 'Уменьшить right' } }
        ],
        correctChoiceId: 'left',
        feedbackCorrect: {
          en: 'Too small → need a larger middle value → left++.',
          ru: 'Слишком мало → нужно большее среднее → left++.'
        },
        feedbackIncorrect: {
          en: 'Decreasing right makes the sum even smaller.',
          ru: 'Уменьшение right делает сумму ещё меньше.'
        },
        highlightIndex: 0
      },
      {
        id: 'tr_ts_1',
        title: { en: 'i moves to first -1', ru: 'i на первый -1' },
        narrative: {
          en: 'After exhausting i=-4, fix i at first -1. left/right hunt for sum 1.',
          ru: 'После i=-4 фиксируем i на первом -1. left/right ищут сумму 1.'
        },
        state: { i: '1', nums_i: '-1', left: '2', right: '5', targetPair: '1' },
        question: {
          en: 'With left on second -1 and right on 2, sum = 0. What next?',
          ru: 'left на втором -1, right на 2, sum = 0. Что дальше?'
        },
        choices: [
          {
            id: 'record',
            text: { en: 'Record [-1,-1,2], then advance and skip dupes', ru: 'Записать [-1,-1,2], затем сдвинуть и skip дублей' }
          },
          { id: 'ignore', text: { en: 'Ignore because values repeat', ru: 'Игнорировать из-за повторов значений' } }
        ],
        correctChoiceId: 'record',
        feedbackCorrect: {
          en: '[-1,-1,2] is a valid unique triplet; then skip duplicate left/right.',
          ru: '[-1,-1,2] — валидная уникальная тройка; затем skip дублей left/right.'
        },
        feedbackIncorrect: {
          en: 'Equal values are allowed across different indices.',
          ru: 'Равные значения допустимы на разных индексах.'
        },
        highlightIndex: 1
      },
      {
        id: 'tr_ts_2',
        title: { en: 'Still i=-1: find [-1,0,1]', ru: 'Всё ещё i=-1: найти [-1,0,1]' },
        narrative: {
          en: 'Continue with same i; left/right can still form another zero sum.',
          ru: 'Продолжаем с тем же i; left/right ещё могут дать сумму 0.'
        },
        state: { i: '1', nums_i: '-1', left: '3', right: '4', sum: '-1 + 0 + 1 = 0' },
        question: {
          en: 'Should [-1, 0, 1] be added?',
          ru: 'Нужно ли добавить [-1, 0, 1]?'
        },
        choices: [
          { id: 'yes', text: { en: 'Yes — another distinct triplet', ru: 'Да — ещё одна различная тройка' } },
          { id: 'no', text: { en: 'No — already found a triplet for this i', ru: 'Нет — для этого i тройка уже есть' } }
        ],
        correctChoiceId: 'yes',
        feedbackCorrect: {
          en: 'Collect all unique triplets for each i while left < right.',
          ru: 'Собираем все уникальные тройки для каждого i, пока left < right.'
        },
        feedbackIncorrect: {
          en: 'One hit does not end the inner scan.',
          ru: 'Одно попадание не завершает внутренний скан.'
        },
        highlightIndex: 3
      },
      {
        id: 'tr_ts_3',
        title: { en: 'Skip duplicate i', ru: 'Пропуск дубликата i' },
        narrative: {
          en: 'Next i would land on the second -1 — same as previous fixed value.',
          ru: 'Следующий i попал бы на второй -1 — то же значение, что и раньше.'
        },
        state: { i: '2', nums_i: '-1', prev: '-1', action: 'continue' },
        question: {
          en: 'Why skip this i?',
          ru: 'Почему пропускаем этот i?'
        },
        choices: [
          {
            id: 'dup',
            text: { en: 'Same nums[i] as i-1 would regenerate the same triplets', ru: 'Тот же nums[i], что у i-1, снова даст те же тройки' }
          },
          { id: 'neg', text: { en: 'Negative values are invalid anchors', ru: 'Отрицательные якоря недопустимы' } }
        ],
        correctChoiceId: 'dup',
        feedbackCorrect: {
          en: 'Duplicate i values after sort recreate identical triplet sets.',
          ru: 'Дубликаты i после sort воспроизводят те же наборы троек.'
        },
        feedbackIncorrect: {
          en: 'Negatives are essential anchors; the issue is duplication.',
          ru: 'Отрицательные якоря нужны; проблема именно в дубликате.'
        },
        highlightIndex: 2
      }
    ],
    followUpQuestion: {
      en: 'For sorted nums = [0, 0, 0, 0], how many triplets are returned?',
      ru: 'Для отсортированного nums = [0, 0, 0, 0] сколько троек вернётся?'
    },
    followUpChoices: [
      { id: 'one', text: { en: 'One: [0,0,0]', ru: 'Одна: [0,0,0]' } },
      { id: 'many', text: { en: 'Four identical [0,0,0]', ru: 'Четыре одинаковых [0,0,0]' } }
    ],
    followUpCorrectChoiceId: 'one',
    followUpFeedbackCorrect: {
      en: 'Skip logic collapses every zero-triplet into a single unique result.',
      ru: 'Логика skip схлопывает все нулевые тройки в один уникальный результат.'
    },
    followUpFeedbackIncorrect: {
      en: 'Without skipping duplicates you would emit repeats — the contract forbids that.',
      ru: 'Без skip дубликатов вы бы эмитили повторы — контракт это запрещает.'
    }
  },
  hints: [
    {
      id: 'hnt_ts_bp_1',
      stageType: 'BLUEPRINT',
      level: 1,
      text: {
        en: 'Sorting first turns the inner search into a classic two-pointer pair sum.',
        ru: 'Сортировка превращает внутренний поиск в классическую pair-sum на двух указателях.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ts_bp_2',
      stageType: 'BLUEPRINT',
      level: 2,
      text: {
        en: 'First required block: sort the array.',
        ru: 'Первый обязательный блок: отсортировать массив.'
      },
      revealType: 'BLOCK',
      revealTargetId: 'bp_ts_sort'
    },
    {
      id: 'hnt_ts_mos_1',
      stageType: 'CODE_MOSAIC',
      level: 1,
      text: {
        en: 'Watch for continue when i > 0 && nums[i] == nums[i - 1].',
        ru: 'Ищите continue при i > 0 && nums[i] == nums[i - 1].'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ts_mos_2',
      stageType: 'CODE_MOSAIC',
      level: 2,
      text: {
        en: 'After recording a hit, both left++ and right-- need their own duplicate-skip loops.',
        ru: 'После записи попадания и left++, и right-- нуждаются в своих циклах skip дубликатов.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ts_tr_1',
      stageType: 'TRACE',
      level: 1,
      text: {
        en: 'On the sorted sample, i=-4 never hits; the productive i is the first -1.',
        ru: 'На отсортированном примере i=-4 не даёт попаданий; продуктивный i — первый -1.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ts_tr_2',
      stageType: 'TRACE',
      level: 2,
      text: {
        en: 'If sum is too small, only left moves; if too large, only right moves.',
        ru: 'Если сумма слишком мала — двигается только left; если велика — только right.'
      },
      revealType: 'NONE'
    }
  ],
  reflectionPrompt: {
    en: 'Why does sorting enable both O(n²) pair search and clean duplicate elimination?',
    ru: 'Почему сортировка даёт и O(n²) поиск пар, и чистую дедупликацию?'
  },
  summary: {
    corePattern: {
      en: 'Two pointers after sort — fix one index, shrink a window for the complement pair.',
      ru: 'Два указателя после sort — зафиксировать индекс, сужать окно для комплементарной пары.'
    },
    invariant: {
      en: 'For a fixed i, every unchecked pair with sum 0 lies between left and right on the sorted array.',
      ru: 'Для фиксированного i все непроверенные пары с суммой 0 лежат между left и right в отсортированном массиве.'
    },
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) extra (excluding output)',
    commonMistake: {
      en: 'Forgetting to skip duplicate i / left / right values and emitting repeated triplets.',
      ru: 'Забыть skip дубликатов i / left / right и эмитить повторные тройки.'
    },
    recognitionCue: {
      en: '“All unique k-tuples summing to a target” with n large enough that n³ dies.',
      ru: '«Все уникальные k-кортежи с суммой target», когда n³ уже не проходит.'
    }
  }
};
