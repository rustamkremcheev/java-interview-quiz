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

const PROBLEM_ID = 'alg_task_scheduler';
const TARGET_STRATEGY_ID = 'strat_ts_greedy_formula';
const SOLUTION_ID = 'sol_task_scheduler_greedy_formula';
const MOSAIC_ID = 'mos_ts_greedy_formula';

const problem = {
  id: PROBLEM_ID,
  slug: 'task-scheduler',
  title: { en: 'Task Scheduler', ru: 'Планировщик Задач' },
  summary: {
    en: 'Schedule CPU tasks with a cooldown so identical tasks are at least n units apart; find the minimum intervals needed.',
    ru: 'Распланируйте CPU-задачи с cooldown: одинаковые задачи не ближе чем на n единиц; найдите минимум интервалов.'
  },
  statement: {
    en: 'You are given a char array `tasks` where each character is a task type, and a non-negative integer `n` — the cooldown between two tasks of the same type. In one unit of time you may run any task or stay idle. Return the least number of units of time required to finish all tasks.',
    ru: 'Дан массив символов `tasks` (тип задачи) и неотрицательное целое `n` — cooldown между двумя задачами одного типа. За единицу времени можно выполнить любую задачу или простаивать. Верните минимальное число единиц времени, чтобы завершить все задачи.'
  },
  examples: [
    {
      id: 'ex_ts_1',
      input: 'tasks = ["A","A","A","B","B","B"], n = 2',
      output: '8',
      explanation: {
        en: 'One valid schedule: A → B → idle → A → B → idle → A → B (length 8).',
        ru: 'Один валидный план: A → B → idle → A → B → idle → A → B (длина 8).'
      }
    },
    {
      id: 'ex_ts_2',
      input: 'tasks = ["A","A","A","B","B","B"], n = 0',
      output: '6',
      explanation: {
        en: 'Cooldown 0 → no idle needed; answer equals tasks.length.',
        ru: 'Cooldown 0 → idle не нужны; ответ равен tasks.length.'
      }
    },
    {
      id: 'ex_ts_3',
      input: 'tasks = ["A","A","A","A","B","C","D"], n = 2',
      output: '10',
      explanation: {
        en: 'maxFreq=4 for A forces frame length; Math.max(tasks.length, formula) applies.',
        ru: 'maxFreq=4 для A задаёт длину рамки; применяется Math.max(tasks.length, formula).'
      }
    }
  ],
  constraints: [
    {
      id: 'c_ts_1',
      text: {
        en: '`1 <= tasks.length <= 10^4` in typical statements.',
        ru: '`1 <= tasks.length <= 10^4` в типичных формулировках.'
      }
    },
    {
      id: 'c_ts_2',
      text: {
        en: '`tasks[i]` is an uppercase English letter `A`–`Z`.',
        ru: '`tasks[i]` — заглавная английская буква `A`–`Z`.'
      }
    },
    {
      id: 'c_ts_3',
      text: {
        en: '`0 <= n <= 100` — cooldown may be zero.',
        ru: '`0 <= n <= 100` — cooldown может быть нулём.'
      }
    },
    {
      id: 'c_ts_4',
      text: {
        en: 'Idle slots count toward the returned length.',
        ru: 'Простои (idle) входят в возвращаемую длину.'
      }
    }
  ],
  patternFamilyId: 'pat_greedy',
  difficulty: 'MEDIUM' as const,
  estimatedMinutes: 30,
  stages: standardWorkshopStages('ts', {
    STRATEGY: {
      en: 'Compare the mathematical greedy frame formula with heap/simulation approaches.',
      ru: 'Сравните математическую жадную формулу рамок с подходами heap/симуляции.'
    },
    BLUEPRINT: {
      en: 'Assemble frequency → maxFreq/maxCount → frame formula blocks (no Java yet).',
      ru: 'Соберите блоки частоты → maxFreq/maxCount → формула рамок (пока без Java).'
    },
    TRACE: {
      en: 'Trace frequencies, maxFreq, maxCount, and the idle-frame formula on a small input.',
      ru: 'Проследите частоты, maxFreq, maxCount и формулу idle-рамок на небольшом входе.'
    }
  }),
  availability: 'AVAILABLE' as const,
  provenanceNote: {
    en: 'Common public interview-prep scheduling problem used to teach greedy frequency frames. No company attribution.',
    ru: 'Распространённая публичная задача планирования для обучения жадным частотным рамкам. Без атрибуции компании.'
  }
};

const clarify: readonly ClarifyQuestion[] = [
  {
    id: 'cq_ts_cooldown',
    prompt: {
      en: 'What does cooldown `n` constrain?',
      ru: 'Что ограничивает cooldown `n`?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ts_cooldown_same',
        text: {
          en: 'Same task type must be at least n units apart',
          ru: 'Одинаковый тип задач — не ближе чем на n единиц'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Different letters may run back-to-back; only identical types need gaps.',
          ru: 'Верно. Разные буквы могут идти подряд; промежутки нужны только одинаковым типам.'
        }
      },
      {
        id: 'cq_ts_cooldown_any',
        text: {
          en: 'Any two tasks must be n units apart',
          ru: 'Любые две задачи должны быть на расстоянии n'
        },
        isCorrect: false,
        feedback: {
          en: 'Too strong — cooldown applies only to identical task types.',
          ru: 'Слишком жёстко — cooldown только для одинаковых типов.'
        }
      }
    ]
  },
  {
    id: 'cq_ts_idle',
    prompt: {
      en: 'May the schedule include idle units?',
      ru: 'Может ли расписание содержать idle?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ts_idle_yes',
        text: {
          en: 'Yes — idle is allowed and counts toward the answer',
          ru: 'Да — idle допустим и входит в ответ'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. When max frequency forces gaps, idle fills them.',
          ru: 'Верно. Когда max frequency требует промежутков, их заполняет idle.'
        }
      },
      {
        id: 'cq_ts_idle_no',
        text: {
          en: 'No — every unit must run a task',
          ru: 'Нет — в каждой единице должна быть задача'
        },
        isCorrect: false,
        feedback: {
          en: 'Incorrect. Idle is the tool that satisfies cooldown when no other task fits.',
          ru: 'Неверно. Idle — способ соблюсти cooldown, когда другой задачи нет.'
        }
      }
    ]
  },
  {
    id: 'cq_ts_n0',
    prompt: {
      en: 'If n = 0, what is the answer?',
      ru: 'Если n = 0, какой ответ?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ts_n0_len',
        text: {
          en: 'tasks.length — no gaps required',
          ru: 'tasks.length — промежутки не нужны'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Formula still works via Math.max(tasks.length, …).',
          ru: 'Верно. Формула всё равно работает через Math.max(tasks.length, …).'
        }
      },
      {
        id: 'cq_ts_n0_inf',
        text: {
          en: 'Always larger than tasks.length',
          ru: 'Всегда больше tasks.length'
        },
        isCorrect: false,
        feedback: {
          en: 'With n = 0, packing tasks densely is always optimal.',
          ru: 'При n = 0 плотная упаковка задач всегда оптимальна.'
        }
      }
    ]
  },
  {
    id: 'cq_ts_alphabet',
    prompt: {
      en: 'How many distinct task types are possible?',
      ru: 'Сколько различных типов задач возможно?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ts_alphabet_26',
        text: {
          en: 'At most 26 (A–Z) — fixed frequency array is fine',
          ru: 'Не больше 26 (A–Z) — фиксированный массив частот уместен'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. int[26] is the interview-standard frequency table.',
          ru: 'Верно. int[26] — стандартная частотная таблица на интервью.'
        }
      },
      {
        id: 'cq_ts_alphabet_unbounded',
        text: {
          en: 'Unbounded — must use a HashMap always',
          ru: 'Неограниченно — всегда нужен HashMap'
        },
        isCorrect: false,
        feedback: {
          en: 'Classic statement uses uppercase English letters only.',
          ru: 'Классическая формулировка использует только заглавные английские буквы.'
        }
      }
    ]
  },
  {
    id: 'cq_ts_return',
    prompt: {
      en: 'What must the method return?',
      ru: 'Что должен вернуть метод?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_ts_return_len',
        text: {
          en: 'Minimum total units of time (including idle)',
          ru: 'Минимум единиц времени (включая idle)'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. Not the schedule itself — only its length.',
          ru: 'Верно. Не само расписание — только его длина.'
        }
      },
      {
        id: 'cq_ts_return_seq',
        text: {
          en: 'One concrete sequence of tasks and idle markers',
          ru: 'Конкретную последовательность задач и idle'
        },
        isCorrect: false,
        feedback: {
          en: 'Over-specified. The contract is an integer length.',
          ru: 'Лишнее. Контракт — целочисленная длина.'
        }
      }
    ]
  }
];

const strategies: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_ts_brute_sim',
    problemId: PROBLEM_ID,
    title: { en: 'Naive time-slot simulation', ru: 'Наивная симуляция слотов' },
    description: {
      en: 'Advance time unit by unit, always picking a ready task (or idle).',
      ru: 'Идти по единицам времени, каждый раз выбирая готовую задачу (или idle).'
    },
    timeClass: 'O(time · Σ)',
    spaceClass: 'O(Σ)',
    importantConstraint: {
      en: 'Works but can be slow to reason about and easy to mis-implement under pressure.',
      ru: 'Работает, но сложно рассуждать и легко ошибиться под давлением.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['HIDES_MECHANICS'],
    justificationChips: [
      { en: 'Literal schedule model', ru: 'Буквальная модель расписания' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_ts_heap',
    problemId: PROBLEM_ID,
    title: { en: 'Max-heap / cooldown queue simulation', ru: 'Симуляция max-heap / cooldown queue' },
    description: {
      en: 'Always schedule the currently most frequent available task; park cooling tasks in a queue.',
      ru: 'Всегда планировать самую частую доступную задачу; остывающие держать в очереди.'
    },
    timeClass: 'O(time · log Σ)',
    spaceClass: 'O(Σ)',
    importantConstraint: {
      en: 'Valid and builds the schedule explicitly; more moving parts than the formula.',
      ru: 'Валидно и явно строит расписание; больше деталей, чем у формулы.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Explicit schedule', ru: 'Явное расписание' },
      { en: 'Priority + cooldown queue', ru: 'Приоритет + cooldown-очередь' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Greedy frequency frame formula', ru: 'Жадная формула частотных рамок' },
    description: {
      en: 'Count frequencies; let parts = maxFreq−1, partLength = n+1, then Math.max(tasks.length, parts·partLength + maxCount).',
      ru: 'Посчитать частоты; parts = maxFreq−1, partLength = n+1, затем Math.max(tasks.length, parts·partLength + maxCount).'
    },
    timeClass: 'O(n + Σ)',
    spaceClass: 'O(Σ)',
    importantConstraint: {
      en: 'Interview-standard closed form — must still take Math.max with tasks.length when idles are unnecessary.',
      ru: 'Стандартная закрытая форма — всё равно нужен Math.max с tasks.length, когда idle не нужны.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'maxFreq frames the idles', ru: 'maxFreq задаёт idle-рамки' },
      { en: 'maxCount fills the last column', ru: 'maxCount заполняет последний столбец' },
      { en: 'O(n) after counting', ru: 'O(n) после подсчёта' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_ts_sort_only',
    problemId: PROBLEM_ID,
    title: { en: 'Sort tasks lexicographically', ru: 'Сортировать задачи лексикографически' },
    description: {
      en: 'Sort the char array and hope adjacent identical letters are spaced — does not enforce cooldown.',
      ru: 'Отсортировать массив и надеяться, что одинаковые буквы разъедутся — cooldown не обеспечивает.'
    },
    timeClass: 'O(n log n)',
    spaceClass: 'O(1)–O(n)',
    importantConstraint: {
      en: 'Sorting alone does not produce a valid cooldown schedule.',
      ru: 'Одна сортировка не даёт валидного расписания с cooldown.'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: ['MUTATES_OR_COPIES'],
    justificationChips: [
      { en: 'Ignores cooldown math', ru: 'Игнорирует математику cooldown' }
    ],
    unlocksBlueprint: false
  }
];

const blueprint: BlueprintGraph = {
  id: 'bp_ts_greedy_formula',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_ts_count',
      label: { en: 'Count frequency of each task type', ru: 'Посчитать частоту каждого типа' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_max_freq',
      label: { en: 'Find maxFreq among frequencies', ru: 'Найти maxFreq среди частот' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_max_count',
      label: {
        en: 'Count how many types share maxFreq (maxCount)',
        ru: 'Посчитать, сколько типов имеют maxFreq (maxCount)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_parts',
      label: {
        en: 'Compute parts = maxFreq − 1 and partLength = n + 1',
        ru: 'Вычислить parts = maxFreq − 1 и partLength = n + 1'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_min_len',
      label: {
        en: 'minLength = parts · partLength + maxCount',
        ru: 'minLength = parts · partLength + maxCount'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_max_tasks',
      label: {
        en: 'Return Math.max(tasks.length, minLength)',
        ru: 'Вернуть Math.max(tasks.length, minLength)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_ts_d_heap',
      label: { en: 'Push every task into a max-heap', ru: 'Положить каждую задачу в max-heap' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Heap simulation is another strategy, not part of the closed-form control flow.',
        ru: 'Heap-симуляция — другая стратегия, не часть потока закрытой формулы.'
      }
    },
    {
      id: 'bp_ts_d_idle_only',
      label: {
        en: 'Return only the number of idle slots',
        ru: 'Вернуть только число idle-слотов'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Answer is total time units, not idle count alone.',
        ru: 'Ответ — полное число единиц времени, не только idle.'
      }
    },
    {
      id: 'bp_ts_d_skip_max',
      label: {
        en: 'Return minLength without comparing to tasks.length',
        ru: 'Вернуть minLength без сравнения с tasks.length'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'When tasks fill all gaps, formula undercounts — Math.max is required.',
        ru: 'Когда задачи заполняют все промежутки, формула занижает — нужен Math.max.'
      }
    },
    {
      id: 'bp_ts_d_sort',
      label: { en: 'Sort the task array first', ru: 'Сначала отсортировать массив задач' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Sorting is irrelevant to the frequency-frame formula.',
        ru: 'Сортировка не нужна для формулы частотных рамок.'
      }
    }
  ],
  solutionOrder: [
    'bp_ts_count',
    'bp_ts_max_freq',
    'bp_ts_max_count',
    'bp_ts_parts',
    'bp_ts_min_len',
    'bp_ts_max_tasks'
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
      en: 'Frame the densest task: (maxFreq−1) groups of size (n+1), then append maxCount tasks that share maxFreq; never shorter than tasks.length.',
      ru: 'Рамка самой частой задачи: (maxFreq−1) групп размера (n+1), затем maxCount задач с maxFreq; не короче tasks.length.'
    },
    canonicalCode: `
public int leastInterval(char[] tasks, int n) {
    int[] freq = new int[26];
    for (char task : tasks) {
        freq[task - 'A']++;
    }
    int maxFreq = 0;
    for (int count : freq) {
        maxFreq = Math.max(maxFreq, count);
    }
    int maxCount = 0;
    for (int count : freq) {
        if (count == maxFreq) {
            maxCount++;
        }
    }
    int parts = maxFreq - 1;
    int partLength = n + 1;
    int minLength = parts * partLength + maxCount;
    return Math.max(tasks.length, minLength);
}
`.trim()
  }
];

const distractors: readonly MosaicDistractor[] = [
  {
    id: 'mos_ts_d_heap',
    code: 'PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Heap simulation path — not part of the closed-form solution.',
      ru: 'Путь heap-симуляции — не часть закрытой формулы.'
    }
  },
  {
    id: 'mos_ts_d_no_max',
    code: 'return minLength;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Skips Math.max with tasks.length — wrong when idles are unnecessary.',
      ru: 'Пропускает Math.max с tasks.length — ошибка, когда idle не нужны.'
    }
  },
  {
    id: 'mos_ts_d_parts_wrong',
    code: 'int parts = maxFreq;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Frame count is maxFreq − 1 gaps between maxFreq occurrences, not maxFreq.',
      ru: 'Число рамок — maxFreq − 1 промежутков между вхождениями, не maxFreq.'
    }
  },
  {
    id: 'mos_ts_d_part_len',
    code: 'int partLength = n;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Each frame is n cooldown slots plus one task slot → n + 1.',
      ru: 'Каждая рамка — n слотов cooldown плюс один слот задачи → n + 1.'
    }
  },
  {
    id: 'mos_ts_d_map',
    code: 'Map<Character, Integer> freq = new HashMap<>();',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'HashMap works, but the canonical tile set uses int[26].',
      ru: 'HashMap работает, но канонические плитки используют int[26].'
    }
  },
  {
    id: 'mos_ts_d_idle_only',
    code: 'return parts * n;',
    indent: 1,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Returns a rough idle estimate, not total schedule length.',
      ru: 'Возвращает грубую оценку idle, не полную длину расписания.'
    }
  },
  {
    id: 'mos_ts_d_compile',
    code: 'int[] freq = new int[];',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Does not compile — array creation needs a dimension.',
      ru: 'Не компилируется — созданию массива нужна размерность.'
    }
  },
  {
    id: 'mos_ts_d_sort',
    code: 'Arrays.sort(tasks);',
    indent: 1,
    role: 'DISTRACTOR_IRRELEVANT',
    explanation: {
      en: 'Sorting tasks does not compute the formula.',
      ru: 'Сортировка tasks не вычисляет формулу.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Heap/cooldown-queue simulation yields the same length and can emit the schedule; this workshop targets the O(n) frame formula.',
  ru: 'Симуляция heap/cooldown-queue даёт ту же длину и может выдать расписание; этот воркшоп целится в O(n) формулу рамок.'
} as const;

const trace: TraceScenario = {
  id: 'tr_ts_main',
  problemId: PROBLEM_ID,
  kind: 'FREQUENCY_STATE',
  label: { en: 'Primary frequency-frame trace', ru: 'Основная трассировка частотных рамок' },
  inputSummary: {
    en: 'tasks = [A,A,A,B,B,B], n = 2',
    ru: 'tasks = [A,A,A,B,B,B], n = 2'
  },
  steps: [
    {
      id: 'tr_ts_0',
      title: { en: 'Count frequencies', ru: 'Подсчёт частот' },
      narrative: {
        en: 'Scan tasks into freq[26]. A and B each appear three times.',
        ru: 'Сканируем tasks в freq[26]. A и B встречаются по три раза.'
      },
      state: { 'freq[A]': '3', 'freq[B]': '3', n: '2', tasksLength: '6' },
      question: {
        en: 'What is maxFreq after counting?',
        ru: 'Чему равен maxFreq после подсчёта?'
      },
      choices: [
        { id: 'three', text: { en: '3', ru: '3' } },
        { id: 'six', text: { en: '6', ru: '6' } }
      ],
      correctChoiceId: 'three',
      feedbackCorrect: {
        en: 'Both A and B have frequency 3 → maxFreq = 3.',
        ru: 'И A, и B имеют частоту 3 → maxFreq = 3.'
      },
      feedbackIncorrect: {
        en: 'maxFreq is the highest single-type count (3), not the total length.',
        ru: 'maxFreq — наибольшая частота одного типа (3), не общая длина.'
      }
    },
    {
      id: 'tr_ts_1',
      title: { en: 'Count maxCount', ru: 'Подсчёт maxCount' },
      narrative: {
        en: 'maxFreq = 3. How many letters share that peak?',
        ru: 'maxFreq = 3. Сколько букв делят этот пик?'
      },
      state: { maxFreq: '3', maxCount: '?', 'freq[A]': '3', 'freq[B]': '3' },
      question: {
        en: 'What is maxCount?',
        ru: 'Чему равен maxCount?'
      },
      choices: [
        { id: 'one', text: { en: '1', ru: '1' } },
        { id: 'two', text: { en: '2', ru: '2' } }
      ],
      correctChoiceId: 'two',
      feedbackCorrect: {
        en: 'A and B both equal maxFreq → maxCount = 2.',
        ru: 'И A, и B равны maxFreq → maxCount = 2.'
      },
      feedbackIncorrect: {
        en: 'Two types share frequency 3.',
        ru: 'Два типа имеют частоту 3.'
      }
    },
    {
      id: 'tr_ts_2',
      title: { en: 'Build the frame', ru: 'Построить рамку' },
      narrative: {
        en: 'parts = maxFreq − 1 = 2; partLength = n + 1 = 3.',
        ru: 'parts = maxFreq − 1 = 2; partLength = n + 1 = 3.'
      },
      state: { parts: '2', partLength: '3', maxCount: '2' },
      question: {
        en: 'What is minLength = parts · partLength + maxCount?',
        ru: 'Чему равен minLength = parts · partLength + maxCount?'
      },
      choices: [
        { id: 'eight', text: { en: '8', ru: '8' } },
        { id: 'six', text: { en: '6', ru: '6' } }
      ],
      correctChoiceId: 'eight',
      feedbackCorrect: {
        en: '2 · 3 + 2 = 8 — two frames of size 3, then the final column of two peak tasks.',
        ru: '2 · 3 + 2 = 8 — две рамки размера 3, затем финальный столбец из двух пиковых задач.'
      },
      feedbackIncorrect: {
        en: '2 · 3 + 2 = 8, not tasks.length alone.',
        ru: '2 · 3 + 2 = 8, не просто tasks.length.'
      }
    },
    {
      id: 'tr_ts_3',
      title: { en: 'Clamp with tasks.length', ru: 'Сравнить с tasks.length' },
      narrative: {
        en: 'minLength = 8, tasks.length = 6. Final answer uses Math.max.',
        ru: 'minLength = 8, tasks.length = 6. Итог через Math.max.'
      },
      state: { minLength: '8', tasksLength: '6', answer: '?' },
      question: {
        en: 'What does the method return?',
        ru: 'Что возвращает метод?'
      },
      choices: [
        { id: 'eight', text: { en: '8', ru: '8' } },
        { id: 'six', text: { en: '6', ru: '6' } }
      ],
      correctChoiceId: 'eight',
      feedbackCorrect: {
        en: 'Math.max(6, 8) = 8 — two idle slots are required.',
        ru: 'Math.max(6, 8) = 8 — нужны два idle-слота.'
      },
      feedbackIncorrect: {
        en: 'Formula forces length 8; packing into 6 would violate cooldown.',
        ru: 'Формула требует длину 8; упаковка в 6 нарушит cooldown.'
      }
    }
  ],
  followUpQuestion: {
    en: 'For the same tasks with n = 0, what is the answer?',
    ru: 'Для тех же tasks при n = 0 какой ответ?'
  },
  followUpChoices: [
    { id: 'six', text: { en: '6', ru: '6' } },
    { id: 'eight', text: { en: '8', ru: '8' } }
  ],
  followUpCorrectChoiceId: 'six',
  followUpFeedbackCorrect: {
    en: 'No cooldown → Math.max(6, formula) collapses to tasks.length = 6.',
    ru: 'Без cooldown → Math.max(6, formula) даёт tasks.length = 6.'
  },
  followUpFeedbackIncorrect: {
    en: 'With n = 0, idle frames shrink; answer is 6.',
    ru: 'При n = 0 idle-рамки сжимаются; ответ 6.'
  }
};

const hints: readonly AlgorithmHint[] = [
  {
    id: 'hnt_ts_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Start from frequencies — the densest task type sets the skeleton.',
      ru: 'Начните с частот — самый частый тип задаёт скелет.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'After maxFreq, count how many types share that peak (maxCount).',
      ru: 'После maxFreq посчитайте, сколько типов делят этот пик (maxCount).'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'parts = maxFreq−1, partLength = n+1, then add maxCount and clamp with tasks.length.',
      ru: 'parts = maxFreq−1, partLength = n+1, затем добавить maxCount и сравнить с tasks.length.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_bp_4',
    stageType: 'BLUEPRINT',
    level: 4,
    text: {
      en: 'Revealing the first block: Count frequency of each task type.',
      ru: 'Открываем первый блок: Посчитать частоту каждого типа.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_ts_count'
  },
  {
    id: 'hnt_ts_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'Use int[26] indexed by task − \'A\', then three linear scans over freq.',
      ru: 'Используйте int[26] с индексом task − \'A\', затем три линейных прохода по freq.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'Critical return: Math.max(tasks.length, parts * partLength + maxCount).',
      ru: 'Ключевой return: Math.max(tasks.length, parts * partLength + maxCount).'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_mos_3',
    stageType: 'CODE_MOSAIC',
    level: 3,
    text: {
      en: 'Reveal one required tile: the frequency array declaration.',
      ru: 'Открываем одну обязательную плитку: объявление массива частот.'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_002`
  },
  {
    id: 'hnt_ts_mos_4',
    stageType: 'CODE_MOSAIC',
    level: 4,
    text: {
      en: 'Reveal the final return line tile.',
      ru: 'Открываем плитку финального return.'
    },
    revealType: 'TILE',
    revealTargetId: `${SOLUTION_ID}_line_019`
  },
  {
    id: 'hnt_ts_mos_5',
    stageType: 'CODE_MOSAIC',
    level: 5,
    text: {
      en: 'Full solution reveal is available as a last resort after prior hints.',
      ru: 'Полное раскрытие решения доступно как крайняя мера после предыдущих подсказок.'
    },
    revealType: 'FULL'
  },
  {
    id: 'hnt_ts_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'Track freq, maxFreq, and maxCount before multiplying frames.',
      ru: 'Следите за freq, maxFreq и maxCount до умножения рамок.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_ts_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'For [A,A,A,B,B,B], n=2 → minLength 8 beats tasks.length 6.',
      ru: 'Для [A,A,A,B,B,B], n=2 → minLength 8 больше tasks.length 6.'
    },
    revealType: 'NONE'
  }
];

const summary: WorkshopSummaryContent = {
  corePattern: {
    en: 'Greedy frequency frames — densest task type forces (maxFreq−1)·(n+1) + maxCount units.',
    ru: 'Жадные частотные рамки — самый частый тип задаёт (maxFreq−1)·(n+1) + maxCount единиц.'
  },
  invariant: {
    en: 'Any valid schedule is at least as long as the frame built from maxFreq/maxCount, and never shorter than the number of tasks.',
    ru: 'Любое валидное расписание не короче рамки из maxFreq/maxCount и не короче числа задач.'
  },
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  commonMistake: {
    en: 'Returning the formula without Math.max(tasks.length, …), or using partLength = n instead of n+1.',
    ru: 'Вернуть формулу без Math.max(tasks.length, …) или взять partLength = n вместо n+1.'
  },
  recognitionCue: {
    en: '“Cooldown between identical tasks” / minimize time with forced gaps → frequency greedy.',
    ru: '«Cooldown между одинаковыми задачами» / минимизировать время с обязательными паузами → жадность по частотам.'
  }
};

export const TASK_SCHEDULER_PACK: AlgorithmWorkshopPack = {
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
    en: 'Mosaic complete. Frame length = (maxFreq−1)·(n+1)+maxCount, clamped by tasks.length.',
    ru: 'Мозаика собрана. Длина рамки = (maxFreq−1)·(n+1)+maxCount, ограничена tasks.length.'
  },
  blueprintHelp: {
    en: 'Assemble frequency-frame logic blocks. Java is still hidden.',
    ru: 'Соберите логические блоки частотных рамок. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: count → maxFreq → maxCount → parts/partLength → minLength → Math.max.',
    ru: 'Чертёж верен: count → maxFreq → maxCount → parts/partLength → minLength → Math.max.'
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
    en: 'When does the formula undercount without Math.max(tasks.length, minLength)?',
    ru: 'Когда формула занижает ответ без Math.max(tasks.length, minLength)?'
  },
  summary
};

export const TASK_SCHEDULER_DEFAULT_SOLUTION_STRATEGY_ID = TARGET_STRATEGY_ID;
export const TASK_SCHEDULER_SOLUTION_ID = SOLUTION_ID;
