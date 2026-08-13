import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';
import { standardWorkshopStages } from '../shared/standardStages';

const PROBLEM_ID = 'alg_merge_intervals';
const TARGET_STRATEGY_ID = 'strat_mi_sort_merge';
const SOLUTION_ID = 'sol_merge_intervals_sort_merge';
const MOSAIC_ID = 'mos_mi_sort_merge';

const MERGE_INTERVALS_SOLUTIONS = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA' as const,
    javaVersion: '17',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    explanation: {
      en: 'Sort by start, then merge into a growing result list when the next interval overlaps the last merged end.',
      ru: 'Сортировка по start, затем слияние в растущий result, когда следующий интервал пересекается с концом последнего.'
    },
    canonicalCode: `
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}
`.trim()
  }
];

const MERGE_INTERVALS_DISTRACTORS = [
  {
    id: 'mos_mi_d_sort_end',
    code: 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));',
    indent: 1,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Sorting by end breaks the left-to-right merge invariant; sort by start.',
      ru: 'Сортировка по end ломает инвариант слияния слева направо; сортируйте по start.'
    }
  },
  {
    id: 'mos_mi_d_always_add',
    code: 'merged.add(interval);',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Always adding skips the overlap merge branch.',
      ru: 'Всегда добавлять пропускает ветку слияния пересечений.'
    }
  },
  {
    id: 'mos_mi_d_min',
    code: 'merged.get(merged.size() - 1)[1] = Math.min(merged.get(merged.size() - 1)[1], interval[1]);',
    indent: 3,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Merged end must be the max of the two ends, not the min.',
      ru: 'Конец слияния — max двух концов, не min.'
    }
  },
  {
    id: 'mos_mi_d_nested',
    code: 'for (int j = i + 1; j < intervals.length; j++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Pairwise nested merging is a different, usually slower approach.',
      ru: 'Попарное вложенное слияние — другой, обычно более медленный подход.'
    }
  },
  {
    id: 'mos_mi_d_compile',
    code: 'return merged.toArray();',
    indent: 1,
    role: 'DISTRACTOR_COMPILE' as const,
    explanation: {
      en: 'Needs a typed array argument: new int[merged.size()][].',
      ru: 'Нужен типизированный аргумент: new int[merged.size()][].'
    }
  },
  {
    id: 'mos_mi_d_strict',
    code: 'if (merged.isEmpty() || merged.get(merged.size() - 1)[1] <= interval[0]) {',
    indent: 2,
    role: 'DISTRACTOR_EDGE_CASE' as const,
    explanation: {
      en: 'Using <= treats touching intervals as disjoint; classic merge usually merges when ends touch (depends on statement — here overlap uses < so equals merges).',
      ru: '<= считает касающиеся интервалы раздельными; классическое слияние обычно сливает касание (здесь условие с < сливает равные границы).'
    }
  },
  {
    id: 'mos_mi_d_irrelevant',
    code: 'Collections.reverse(merged);',
    indent: 1,
    role: 'DISTRACTOR_IRRELEVANT' as const,
    explanation: {
      en: 'Reversing the result is unrelated to correct merging.',
      ru: 'Разворот результата не связан с корректным слиянием.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Equivalent: keep a current interval object and flush it when a gap appears; same sort-by-start idea.',
  ru: 'Эквивалент: держать текущий interval-объект и сбрасывать его при разрыве; та же идея sort-by-start.'
};

export const MERGE_INTERVALS_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'merge-intervals',
    title: { en: 'Merge Intervals', ru: 'Слияние Интервалов' },
    summary: {
      en: 'Merge all overlapping intervals into a minimal non-overlapping cover.',
      ru: 'Слить все пересекающиеся интервалы в минимальное непокрывающее пересечений покрытие.'
    },
    statement: {
      en: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      ru: 'Дан массив `intervals`, где `intervals[i] = [starti, endi]`. Слейте все пересекающиеся интервалы и верните массив непересекающихся интервалов, покрывающих весь вход.'
    },
    examples: [
      {
        id: 'ex_mi_1',
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: {
          en: '[1,3] and [2,6] overlap, so they merge into [1,6].',
          ru: '[1,3] и [2,6] пересекаются, поэтому сливаются в [1,6].'
        }
      },
      {
        id: 'ex_mi_2',
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: {
          en: 'Touching at 4 counts as overlap for this merge.',
          ru: 'Касание в 4 считается пересечением для этого слияния.'
        }
      },
      {
        id: 'ex_mi_3',
        input: 'intervals = [[1,4],[0,4]]',
        output: '[[0,4]]',
        explanation: {
          en: 'After sorting by start, [0,4] absorbs [1,4].',
          ru: 'После сортировки по start [0,4] поглощает [1,4].'
        }
      }
    ],
    constraints: [
      {
        id: 'c_mi_1',
        text: {
          en: '`1 <= intervals.length <= 10^4` typically.',
          ru: '`1 <= intervals.length <= 10^4` обычно.'
        }
      },
      {
        id: 'c_mi_2',
        text: {
          en: '`intervals[i].length == 2` and `starti <= endi`.',
          ru: '`intervals[i].length == 2` и `starti <= endi`.'
        }
      },
      {
        id: 'c_mi_3',
        text: {
          en: 'Input may be unsorted; overlapping and nested intervals are allowed.',
          ru: 'Вход может быть неотсортирован; пересечения и вложенность допустимы.'
        }
      }
    ],
    patternFamilyId: 'pat_intervals',
    difficulty: 'MEDIUM',
    estimatedMinutes: 30,
    stages: standardWorkshopStages('mi', {
      STRATEGY: {
        en: 'Compare approaches; this workshop continues with sort-by-start then linear merge.',
        ru: 'Сравните подходы; воркшоп продолжается sort-by-start и линейным слиянием.'
      },
      BLUEPRINT: {
        en: 'Assemble conceptual merge blocks before Java appears.',
        ru: 'Соберите концептуальные блоки слияния до появления Java.'
      },
      TRACE: {
        en: 'Sweep sorted intervals and decide append vs extend on each step.',
        ru: 'Просканируйте отсортированные интервалы и на каждом шаге решайте: append или extend.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-style intervals problem for teaching sort-then-merge. No company attribution.',
      ru: 'Распространённая публичная interview-задача на интервалы для обучения sort-then-merge. Без атрибуции компании.'
    }
  },
  clarify: [
    {
      id: 'cq_mi_touch',
      prompt: {
        en: 'If one interval ends where the next starts (e.g. [1,4] and [4,5]), should they merge?',
        ru: 'Если один интервал заканчивается там, где начинается следующий (напр. [1,4] и [4,5]), нужно ли сливать?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mi_touch_yes',
          text: { en: 'Yes — touching endpoints merge', ru: 'Да — касающиеся границы сливаются' },
          isCorrect: true,
          feedback: {
            en: 'Correct for the classic merge-intervals statement.',
            ru: 'Верно для классической формулировки merge-intervals.'
          }
        },
        {
          id: 'cq_mi_touch_no',
          text: { en: 'No — only strict overlaps merge', ru: 'Нет — сливаются только строгие пересечения' },
          isCorrect: false,
          feedback: {
            en: 'Classic merge treats end == next start as overlapping.',
            ru: 'Классическое слияние считает end == next start пересечением.'
          }
        }
      ]
    },
    {
      id: 'cq_mi_sorted',
      prompt: {
        en: 'Is the input guaranteed to be sorted by start?',
        ru: 'Гарантирован ли вход, отсортированный по start?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mi_sorted_no',
          text: { en: 'No — you must sort first', ru: 'Нет — сначала нужно отсортировать' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Sorting by start is the enabling step for a linear merge.',
            ru: 'Верно. Сортировка по start — ключевой шаг для линейного слияния.'
          }
        },
        {
          id: 'cq_mi_sorted_yes',
          text: { en: 'Yes — already ordered', ru: 'Да — уже упорядочен' },
          isCorrect: false,
          feedback: {
            en: 'Do not assume order; examples often arrive shuffled.',
            ru: 'Не предполагайте порядок; примеры часто приходят перемешанными.'
          }
        }
      ]
    },
    {
      id: 'cq_mi_nested',
      prompt: {
        en: 'Can one interval be completely inside another?',
        ru: 'Может ли один интервал полностью лежать внутри другого?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mi_nested_yes',
          text: {
            en: 'Yes — merge extends (or keeps) the wider end',
            ru: 'Да — слияние расширяет (или сохраняет) более широкий конец'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. Math.max on ends handles containment.',
            ru: 'Верно. Math.max по концам обрабатывает вложенность.'
          }
        },
        {
          id: 'cq_mi_nested_no',
          text: { en: 'No — inputs never nest', ru: 'Нет — входы никогда не вложены' },
          isCorrect: false,
          feedback: {
            en: 'Nesting is a common case; your merge branch must cover it.',
            ru: 'Вложенность обычна; ветка слияния должна её покрывать.'
          }
        }
      ]
    },
    {
      id: 'cq_mi_empty',
      prompt: {
        en: 'What if intervals is empty?',
        ru: 'Что если intervals пуст?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mi_empty_ok',
          text: { en: 'Return an empty array', ru: 'Вернуть пустой массив' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Sort + empty loop naturally yields [].',
            ru: 'Верно. Sort + пустой цикл естественно даёт [].'
          }
        },
        {
          id: 'cq_mi_empty_err',
          text: { en: 'Throw — empty input is invalid', ru: 'Бросить исключение — пустой вход невалиден' },
          isCorrect: false,
          feedback: {
            en: 'Empty is a valid edge; return empty coverage.',
            ru: 'Пустой вход валиден; верните пустое покрытие.'
          }
        }
      ]
    }
  ],
  strategies: [
    {
      id: 'strat_mi_brute',
      problemId: PROBLEM_ID,
      title: { en: 'Repeated pairwise merge', ru: 'Повторное попарное слияние' },
      description: {
        en: 'Keep scanning for any overlapping pair and merge until none remain.',
        ru: 'Повторять поиск любой пересекающейся пары и сливать, пока пересечений не останется.'
      },
      timeClass: 'O(n²) or worse',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Harder to control termination and uniqueness cleanly.',
        ru: 'Сложнее контролировать завершение и уникальность.'
      },
      viability: 'VALID_SUBOPTIMAL',
      costBadges: ['QUADRATIC_TIME'],
      justificationChips: [
        { en: 'No upfront sort', ru: 'Без предварительного sort' }
      ],
      unlocksBlueprint: false
    },
    {
      id: TARGET_STRATEGY_ID,
      problemId: PROBLEM_ID,
      title: { en: 'Sort by start, merge linearly', ru: 'Sort по start, линейное слияние' },
      description: {
        en: 'Sort intervals by start time, then either append a disjoint interval or extend the last end.',
        ru: 'Отсортировать по start, затем либо добавить непересекающийся интервал, либо расширить последний end.'
      },
      timeClass: 'O(n log n)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Correctness hinges on processing in start order.',
        ru: 'Корректность зависит от обработки в порядке start.'
      },
      viability: 'TARGET',
      costBadges: ['MUTATES_OR_COPIES'],
      justificationChips: [
        { en: 'Standard interval sweep', ru: 'Стандартный interval sweep' },
        { en: 'One linear pass after sort', ru: 'Один линейный проход после sort' },
        { en: 'Handles nesting via max end', ru: 'Вложенность через max end' }
      ],
      unlocksBlueprint: true
    },
    {
      id: 'strat_mi_tree',
      problemId: PROBLEM_ID,
      title: { en: 'Interval tree / ordered map', ru: 'Interval tree / ordered map' },
      description: {
        en: 'Maintain merged coverage in a balanced tree keyed by ranges.',
        ru: 'Поддерживать покрытие в сбалансированном дереве по диапазонам.'
      },
      timeClass: 'O(n log n)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Overkill for offline merge of a static list.',
        ru: 'Избыточно для офлайн-слияния статического списка.'
      },
      viability: 'VALID_ALTERNATIVE',
      costBadges: ['HIDES_MECHANICS', 'EXTRA_MEMORY'],
      justificationChips: [
        { en: 'Useful for online updates', ru: 'Полезно для online-обновлений' }
      ],
      unlocksBlueprint: false
    },
    {
      id: 'strat_mi_sort_end',
      problemId: PROBLEM_ID,
      title: { en: 'Sort only by end', ru: 'Сортировать только по end' },
      description: {
        en: 'Order by finishing time and try to merge — breaks the usual append/extend rule.',
        ru: 'Упорядочить по времени конца и пытаться сливать — ломает обычное правило append/extend.'
      },
      timeClass: 'O(n log n)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Wrong enabling order for this merge algorithm.',
        ru: 'Неверный порядок для этого алгоритма слияния.'
      },
      viability: 'INVALID_FOR_SLICE',
      costBadges: [],
      justificationChips: [
        { en: 'Wrong sort key', ru: 'Неверный ключ сортировки' }
      ],
      unlocksBlueprint: false
    }
  ],
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint: {
    id: 'bp_mi_sort_merge',
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    nodes: [
      {
        id: 'bp_mi_sort',
        label: { en: 'Sort intervals by start', ru: 'Отсортировать интервалы по start' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mi_init',
        label: { en: 'Create an empty merged result list', ru: 'Создать пустой список merged' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mi_scan',
        label: { en: 'Scan each interval in order', ru: 'Сканировать каждый интервал по порядку' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mi_decide',
        label: {
          en: 'If disjoint from last merged — append; else extend last end with max',
          ru: 'Если не пересекается с последним — append; иначе расширить end через max'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mi_d_sort_end',
        label: { en: 'Sort intervals by end only', ru: 'Сортировать интервалы только по end' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'End-order does not support this linear merge decision.',
          ru: 'Порядок по end не поддерживает это линейное решение о слиянии.'
        }
      },
      {
        id: 'bp_mi_d_intersect_all',
        label: { en: 'Intersect all intervals into one', ru: 'Пересечь все интервалы в один' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'The task is union/merge of overlaps, not global intersection.',
          ru: 'Задача — объединение/слияние пересечений, не глобальное пересечение.'
        }
      },
      {
        id: 'bp_mi_d_drop',
        label: { en: 'Drop any interval that overlaps', ru: 'Отбросить любой пересекающийся интервал' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'Overlaps must be fused, not discarded.',
          ru: 'Пересечения нужно сливать, а не отбрасывать.'
        }
      }
    ],
    solutionOrder: ['bp_mi_sort', 'bp_mi_init', 'bp_mi_scan', 'bp_mi_decide']
  },
  solutions: MERGE_INTERVALS_SOLUTIONS,
  distractors: MERGE_INTERVALS_DISTRACTORS,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. Sort by start, then append or extend by max end.',
    ru: 'Мозаика собрана. Sort по start, затем append или extend через max end.'
  },
  blueprintHelp: {
    en: 'Assemble sort-then-merge blocks. Java is still hidden.',
    ru: 'Соберите блоки sort-then-merge. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: sort by start → empty result → scan → append or extend.',
    ru: 'Чертёж верен: sort по start → пустой result → scan → append или extend.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions: MERGE_INTERVALS_SOLUTIONS,
    distractors: MERGE_INTERVALS_DISTRACTORS,
    alternativeNote: mosaicAlternativeNote,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace: {
    id: 'tr_mi_main',
    problemId: PROBLEM_ID,
    kind: 'INTERVAL_SWEEP',
    label: { en: 'Primary trace', ru: 'Основная трассировка' },
    inputSummary: {
      en: 'After sort: [[1,3],[2,6],[8,10],[15,18]]',
      ru: 'После sort: [[1,3],[2,6],[8,10],[15,18]]'
    },
    steps: [
      {
        id: 'tr_mi_0',
        title: { en: 'Seed with [1,3]', ru: 'Старт с [1,3]' },
        narrative: {
          en: 'merged is empty, so the first interval is appended.',
          ru: 'merged пуст, поэтому первый интервал добавляется.'
        },
        state: { current: '[1,3]', merged: '[[1,3]]', decision: 'append' },
        question: {
          en: 'Why append instead of merge?',
          ru: 'Почему append, а не merge?'
        },
        choices: [
          { id: 'empty', text: { en: 'Result is empty — nothing to extend', ru: 'Результат пуст — нечего расширять' } },
          { id: 'sorted', text: { en: 'Because the array is sorted', ru: 'Потому что массив отсортирован' } }
        ],
        correctChoiceId: 'empty',
        feedbackCorrect: {
          en: 'First interval always seeds the merged list.',
          ru: 'Первый интервал всегда инициализирует список merged.'
        },
        feedbackIncorrect: {
          en: 'Sorting enables later decisions; the immediate reason is an empty result.',
          ru: 'Сортировка нужна дальше; непосредственная причина — пустой result.'
        }
      },
      {
        id: 'tr_mi_1',
        title: { en: 'Meet [2,6]', ru: 'Встречаем [2,6]' },
        narrative: {
          en: 'Last end is 3; next start is 2 — they overlap.',
          ru: 'Последний end = 3; следующий start = 2 — есть пересечение.'
        },
        state: { current: '[2,6]', lastEnd: '3', nextStart: '2', decision: 'extend' },
        question: {
          en: 'What becomes the new last end?',
          ru: 'Каким станет новый last end?'
        },
        choices: [
          { id: 'six', text: { en: '6 (max of 3 and 6)', ru: '6 (max из 3 и 6)' } },
          { id: 'three', text: { en: '3 (keep the old end)', ru: '3 (оставить старый end)' } }
        ],
        correctChoiceId: 'six',
        feedbackCorrect: {
          en: 'Extend with Math.max → merged last interval is [1,6].',
          ru: 'Расширяем через Math.max → последний интервал [1,6].'
        },
        feedbackIncorrect: {
          en: 'Keeping 3 would drop coverage of [2,6].',
          ru: 'Оставляя 3, вы теряете покрытие [2,6].'
        }
      },
      {
        id: 'tr_mi_2',
        title: { en: 'Meet [8,10]', ru: 'Встречаем [8,10]' },
        narrative: {
          en: 'Last end is 6; next start is 8 — a gap.',
          ru: 'Последний end = 6; следующий start = 8 — разрыв.'
        },
        state: { current: '[8,10]', lastEnd: '6', nextStart: '8', decision: 'append' },
        question: {
          en: 'How do we know these are disjoint?',
          ru: 'Как понять, что они не пересекаются?'
        },
        choices: [
          {
            id: 'gap',
            text: { en: 'lastEnd < nextStart (6 < 8)', ru: 'lastEnd < nextStart (6 < 8)' }
          },
          { id: 'len', text: { en: 'Because length is 2', ru: 'Потому что длина равна 2' } }
        ],
        correctChoiceId: 'gap',
        feedbackCorrect: {
          en: 'The disjoint test is lastEnd < nextStart → append a new interval.',
          ru: 'Тест непересечения: lastEnd < nextStart → добавить новый интервал.'
        },
        feedbackIncorrect: {
          en: 'Interval width is irrelevant; compare last end to next start.',
          ru: 'Ширина интервала не важна; сравнивайте last end с next start.'
        }
      },
      {
        id: 'tr_mi_3',
        title: { en: 'Meet [15,18]', ru: 'Встречаем [15,18]' },
        narrative: {
          en: 'Another gap after 10 — append again.',
          ru: 'Ещё один разрыв после 10 — снова append.'
        },
        state: { current: '[15,18]', merged: '[[1,6],[8,10],[15,18]]', decision: 'append' },
        question: {
          en: 'Final merged coverage?',
          ru: 'Итоговое покрытие после слияния?'
        },
        choices: [
          { id: 'ok', text: { en: '[[1,6],[8,10],[15,18]]', ru: '[[1,6],[8,10],[15,18]]' } },
          { id: 'one', text: { en: '[[1,18]]', ru: '[[1,18]]' } }
        ],
        correctChoiceId: 'ok',
        feedbackCorrect: {
          en: 'Gaps prevent a single mega-interval.',
          ru: 'Разрывы не дают одного гигантского интервала.'
        },
        feedbackIncorrect: {
          en: 'Do not merge across gaps.',
          ru: 'Не сливайте через разрывы.'
        }
      }
    ],
    followUpQuestion: {
      en: 'After sorting [[1,4],[4,5]], do they merge?',
      ru: 'После сортировки [[1,4],[4,5]] — сливаются ли они?'
    },
    followUpChoices: [
      { id: 'yes', text: { en: 'Yes → [[1,5]]', ru: 'Да → [[1,5]]' } },
      { id: 'no', text: { en: 'No → [[1,4],[4,5]]', ru: 'Нет → [[1,4],[4,5]]' } }
    ],
    followUpCorrectChoiceId: 'yes',
    followUpFeedbackCorrect: {
      en: 'lastEnd 4 is not < nextStart 4, so extend to 5.',
      ru: 'lastEnd 4 не < nextStart 4, поэтому расширяем до 5.'
    },
    followUpFeedbackIncorrect: {
      en: 'Touching endpoints merge under the classic rule used here.',
      ru: 'Касающиеся границы сливаются по классическому правилу здесь.'
    }
  },
  hints: [
    {
      id: 'hnt_mi_bp_1',
      stageType: 'BLUEPRINT',
      level: 1,
      text: {
        en: 'Without sorting by start, a single left-to-right pass cannot decide merges safely.',
        ru: 'Без сортировки по start один проход слева направо не может безопасно решать о слияниях.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mi_bp_2',
      stageType: 'BLUEPRINT',
      level: 2,
      text: {
        en: 'Reveal first block: Sort intervals by start.',
        ru: 'Открываем первый блок: Отсортировать интервалы по start.'
      },
      revealType: 'BLOCK',
      revealTargetId: 'bp_mi_sort'
    },
    {
      id: 'hnt_mi_mos_1',
      stageType: 'CODE_MOSAIC',
      level: 1,
      text: {
        en: 'Disjoint test uses lastEnd < nextStart; otherwise Math.max the ends.',
        ru: 'Тест непересечения: lastEnd < nextStart; иначе Math.max концов.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mi_mos_2',
      stageType: 'CODE_MOSAIC',
      level: 2,
      text: {
        en: 'Return type needs merged.toArray(new int[merged.size()][]).',
        ru: 'Тип возврата требует merged.toArray(new int[merged.size()][]).'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mi_tr_1',
      stageType: 'TRACE',
      level: 1,
      text: {
        en: 'On the sample, only [1,3] and [2,6] merge; the later intervals stay separate.',
        ru: 'В примере сливаются только [1,3] и [2,6]; поздние интервалы остаются раздельными.'
      },
      revealType: 'NONE'
    }
  ],
  reflectionPrompt: {
    en: 'Why is sorting by start the enabling step for a single linear merge pass?',
    ru: 'Почему сортировка по start — ключевой шаг для одного линейного прохода слияния?'
  },
  summary: {
    corePattern: {
      en: 'Intervals — sort by start, then sweep while merging into the active tail.',
      ru: 'Интервалы — sort по start, затем sweep со слиянием в активный хвост.'
    },
    invariant: {
      en: 'After processing a prefix, merged holds a non-overlapping cover of that prefix in start order.',
      ru: 'После обработки префикса merged хранит непересекающееся покрытие этого префикса в порядке start.'
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    commonMistake: {
      en: 'Sorting by end, or using min instead of max when extending the active interval.',
      ru: 'Сортировка по end или min вместо max при расширении активного интервала.'
    },
    recognitionCue: {
      en: '“Overlapping ranges → produce a minimal disjoint cover.”',
      ru: '«Пересекающиеся диапазоны → минимальное непересекающееся покрытие.»'
    }
  }
};
