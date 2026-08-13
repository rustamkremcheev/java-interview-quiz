import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';
import { standardWorkshopStages } from '../shared/standardStages';

const PROBLEM_ID = 'alg_move_zeros';
const TARGET_STRATEGY_ID = 'strat_mz_read_write';
const SOLUTION_ID = 'sol_move_zeros_read_write';
const MOSAIC_ID = 'mos_mz_read_write';

const MOVE_ZEROS_SOLUTIONS = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA' as const,
    javaVersion: '17',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation: {
      en: 'Read/write two pointers: copy non-zeros forward, then fill the tail with zeros.',
      ru: 'Два указателя read/write: копировать ненули вперёд, затем заполнить хвост нулями.'
    },
    canonicalCode: `
public void moveZeroes(int[] nums) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
        if (nums[read] != 0) {
            nums[write] = nums[read];
            write++;
        }
    }
    while (write < nums.length) {
        nums[write] = 0;
        write++;
    }
}
`.trim()
  }
];

const MOVE_ZEROS_DISTRACTORS = [
  {
    id: 'mos_mz_d_sort',
    code: 'Arrays.sort(nums);',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Sorting destroys the required relative order of non-zero values.',
      ru: 'Сортировка разрушает требуемый относительный порядок ненулевых значений.'
    }
  },
  {
    id: 'mos_mz_d_extra',
    code: 'int[] copy = new int[nums.length];',
    indent: 1,
    role: 'DISTRACTOR_COMPLEXITY' as const,
    explanation: {
      en: 'Extra array is valid but not the O(1)-space target path.',
      ru: 'Доп. массив допустим, но не целевой путь с O(1) памятью.'
    }
  },
  {
    id: 'mos_mz_d_swap_zero',
    code: 'if (nums[read] == 0) { nums[write] = nums[read]; write++; }',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Writes zeros forward — opposite of packing non-zeros to the front.',
      ru: 'Пишет нули вперёд — наоборот от упаковки ненулей в начало.'
    }
  },
  {
    id: 'mos_mz_d_break',
    code: 'break;',
    indent: 3,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Breaking early leaves later non-zeros unmoved.',
      ru: 'Ранний break оставляет более поздние ненули неперемещёнными.'
    }
  },
  {
    id: 'mos_mz_d_prim',
    code: 'List<Integer> buffer = new ArrayList<>();',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Collect-then-rewrite is another strategy, not the in-place read/write solution.',
      ru: 'Сбор-и-перезапись — другая стратегия, не in-place read/write решение.'
    }
  },
  {
    id: 'mos_mz_d_wrong_fill',
    code: 'nums[write] = 1;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Tail must be filled with zeros, not ones.',
      ru: 'Хвост нужно заполнять нулями, не единицами.'
    }
  },
  {
    id: 'mos_mz_d_irrelevant',
    code: 'Collections.reverse(Arrays.asList(nums));',
    indent: 1,
    role: 'DISTRACTOR_IRRELEVANT' as const,
    explanation: {
      en: 'Reversing is unrelated to moving zeros.',
      ru: 'Разворот не связан с переносом нулей.'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Swap-based variant (swap non-zero with write) is equivalent if you carefully advance write only on non-zeros.',
  ru: 'Вариант со swap (обмен ненуля с write) эквивалентен, если аккуратно двигать write только на ненулях.'
};

export const MOVE_ZEROS_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'move-zeros',
    title: { en: 'Move Zeroes', ru: 'Переместить Нули' },
    summary: {
      en: 'Move all zeros to the end in-place while preserving the order of non-zero values.',
      ru: 'Переместить все нули в конец на месте, сохраняя порядок ненулевых значений.'
    },
    statement: {
      en: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.',
      ru: 'Дан массив целых чисел `nums`. Переместите все `0` в конец, сохранив относительный порядок ненулевых элементов. Сделайте это на месте, без копии массива.'
    },
    examples: [
      {
        id: 'ex_mz_1',
        input: 'nums = [0, 1, 0, 3, 12]',
        output: '[1, 3, 12, 0, 0]',
        explanation: {
          en: 'Non-zeros keep order; zeros sink to the end.',
          ru: 'Ненули сохраняют порядок; нули уходят в конец.'
        }
      },
      {
        id: 'ex_mz_2',
        input: 'nums = [0]',
        output: '[0]',
        explanation: {
          en: 'Single zero stays put.',
          ru: 'Один ноль остаётся на месте.'
        }
      },
      {
        id: 'ex_mz_3',
        input: 'nums = [1, 2, 3]',
        output: '[1, 2, 3]',
        explanation: {
          en: 'No zeros — array unchanged.',
          ru: 'Нулей нет — массив без изменений.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_mz_1',
        text: {
          en: '`1 <= nums.length <= 10^4` in typical statements.',
          ru: '`1 <= nums.length <= 10^4` в типичных формулировках.'
        }
      },
      {
        id: 'c_mz_2',
        text: {
          en: '`-2^31 <= nums[i] <= 2^31 - 1` — any int, not only 0/1.',
          ru: '`-2^31 <= nums[i] <= 2^31 - 1` — любое int, не только 0/1.'
        }
      },
      {
        id: 'c_mz_3',
        text: {
          en: 'In-place mutation required; relative order of non-zeros must be preserved.',
          ru: 'Требуется мутация на месте; относительный порядок ненулей должен сохраняться.'
        }
      }
    ],
    patternFamilyId: 'pat_two_pointers',
    difficulty: 'EASY',
    estimatedMinutes: 20,
    stages: standardWorkshopStages('mz', {
      STRATEGY: {
        en: 'Compare approaches; this workshop continues with the read/write two-pointer path.',
        ru: 'Сравните подходы; этот воркшоп продолжается путём двух указателей read/write.'
      },
      BLUEPRINT: {
        en: 'Assemble the logical blocks for packing non-zeros, then filling zeros — no Java yet.',
        ru: 'Соберите логические блоки упаковки ненулей и заполнения нулей — пока без Java.'
      },
      TRACE: {
        en: 'Step through read/write pointers on a mixed zero/non-zero array.',
        ru: 'Пройдите указатели read/write на смешанном массиве нулей и ненулей.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-style array problem for teaching in-place two pointers. No company attribution.',
      ru: 'Распространённая публичная interview-задача на массивы для обучения in-place two pointers. Без атрибуции компании.'
    }
  },
  clarify: [
    {
      id: 'cq_mz_inplace',
      prompt: {
        en: 'May you allocate a second array of the same length?',
        ru: 'Можно ли выделить второй массив той же длины?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mz_inplace_no',
          text: {
            en: 'No — the classic ask is in-place (O(1) extra space)',
            ru: 'Нет — классический запрос in-place (O(1) доп. памяти)'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. A copy-based rewrite is easier but not the target constraint.',
            ru: 'Верно. Перезапись через копию проще, но не целевое ограничение.'
          }
        },
        {
          id: 'cq_mz_inplace_yes',
          text: { en: 'Yes — any extra memory is fine', ru: 'Да — любая доп. память допустима' },
          isCorrect: false,
          feedback: {
            en: 'The problem asks for an in-place solution without copying the array.',
            ru: 'Задача просит решение на месте без копирования массива.'
          }
        }
      ]
    },
    {
      id: 'cq_mz_order',
      prompt: {
        en: 'Must the relative order of non-zero elements stay the same?',
        ru: 'Должен ли относительный порядок ненулевых элементов сохраниться?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mz_order_yes',
          text: { en: 'Yes — stable order among non-zeros', ru: 'Да — стабильный порядок среди ненулей' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Sorting zeros to the end by any means that reorders non-zeros is wrong.',
            ru: 'Верно. Любой способ, который переупорядочивает ненули, неверен.'
          }
        },
        {
          id: 'cq_mz_order_no',
          text: { en: 'No — any permutation with zeros at the end is OK', ru: 'Нет — любая перестановка с нулями в конце ОК' },
          isCorrect: false,
          feedback: {
            en: 'Order of non-zeros is part of the contract.',
            ru: 'Порядок ненулей — часть контракта.'
          }
        }
      ]
    },
    {
      id: 'cq_mz_return',
      prompt: {
        en: 'What does the method return?',
        ru: 'Что возвращает метод?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mz_return_void',
          text: { en: 'void — mutate nums in place', ru: 'void — мутировать nums на месте' },
          isCorrect: true,
          feedback: {
            en: 'Correct. Callers inspect the same array after the call.',
            ru: 'Верно. Вызывающий смотрит тот же массив после вызова.'
          }
        },
        {
          id: 'cq_mz_return_arr',
          text: { en: 'A new int[] with zeros moved', ru: 'Новый int[] с перемещёнными нулями' },
          isCorrect: false,
          feedback: {
            en: 'Typical signature is void; mutation is the deliverable.',
            ru: 'Типичная сигнатура — void; результат — мутация.'
          }
        }
      ]
    },
    {
      id: 'cq_mz_all_zero',
      prompt: {
        en: 'What if every element is already zero?',
        ru: 'Что если каждый элемент уже ноль?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_mz_all_zero_ok',
          text: {
            en: 'No-op is fine — write never advances on non-zeros, then refill is a full zero pass',
            ru: 'No-op нормален — write не двигается на ненулях, затем полное заполнение нулями'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. The algorithm still terminates with an all-zero array.',
            ru: 'Верно. Алгоритм всё равно завершается с массивом из нулей.'
          }
        },
        {
          id: 'cq_mz_all_zero_err',
          text: { en: 'Must throw — invalid input', ru: 'Нужно бросить исключение — неверный вход' },
          isCorrect: false,
          feedback: {
            en: 'All zeros is a valid edge case, not an error.',
            ru: 'Все нули — валидный крайний случай, не ошибка.'
          }
        }
      ]
    }
  ],
  strategies: [
    {
      id: 'strat_mz_copy',
      problemId: PROBLEM_ID,
      title: { en: 'Build a new array', ru: 'Собрать новый массив' },
      description: {
        en: 'Copy non-zeros into a buffer, pad with zeros, then copy back.',
        ru: 'Скопировать ненули в буфер, дополнить нулями, затем скопировать обратно.'
      },
      timeClass: 'O(n)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Uses O(n) extra memory — violates the in-place ask.',
        ru: 'Использует O(n) доп. памяти — нарушает требование in-place.'
      },
      viability: 'VALID_SUBOPTIMAL',
      costBadges: ['EXTRA_MEMORY'],
      justificationChips: [
        { en: 'Easy to reason about', ru: 'Легко рассуждать' },
        { en: 'Extra buffer', ru: 'Доп. буфер' }
      ],
      unlocksBlueprint: false
    },
    {
      id: TARGET_STRATEGY_ID,
      problemId: PROBLEM_ID,
      title: { en: 'Read/write two pointers', ru: 'Два указателя read/write' },
      description: {
        en: 'Advance read over the array; write packs non-zeros forward; fill the rest with zeros.',
        ru: 'Двигать read по массиву; write упаковывает ненули вперёд; остаток заполнить нулями.'
      },
      timeClass: 'O(n)',
      spaceClass: 'O(1)',
      importantConstraint: {
        en: 'Must preserve non-zero order while using constant extra space.',
        ru: 'Нужно сохранить порядок ненулей при константной доп. памяти.'
      },
      viability: 'TARGET',
      costBadges: [],
      justificationChips: [
        { en: 'In-place O(1) space', ru: 'In-place O(1) память' },
        { en: 'Stable non-zero order', ru: 'Стабильный порядок ненулей' },
        { en: 'Single linear scan + fill', ru: 'Один линейный проход + заполнение' }
      ],
      unlocksBlueprint: true
    },
    {
      id: 'strat_mz_swap',
      problemId: PROBLEM_ID,
      title: { en: 'Swap non-zeros into place', ru: 'Swap ненулей на место' },
      description: {
        en: 'When read sees a non-zero, swap it with the write index and advance write.',
        ru: 'Когда read видит ненуль, обменять его с write и сдвинуть write.'
      },
      timeClass: 'O(n)',
      spaceClass: 'O(1)',
      importantConstraint: {
        en: 'Also valid; workshop mosaic uses the assign-then-fill form.',
        ru: 'Тоже валидно; мозаика воркшопа использует форму assign-then-fill.'
      },
      viability: 'VALID_ALTERNATIVE',
      costBadges: [],
      justificationChips: [
        { en: 'Same asymptotic cost', ru: 'Та же асимптотика' },
        { en: 'Swap instead of fill loop', ru: 'Swap вместо цикла заполнения' }
      ],
      unlocksBlueprint: false
    },
    {
      id: 'strat_mz_sort',
      problemId: PROBLEM_ID,
      title: { en: 'Custom sort (zeros last)', ru: 'Кастомная сортировка (нули в конце)' },
      description: {
        en: 'Sort with a comparator that pushes zeros after non-zeros.',
        ru: 'Сортировать компаратором, который ставит нули после ненулей.'
      },
      timeClass: 'O(n log n)',
      spaceClass: 'O(1)–O(n)',
      importantConstraint: {
        en: 'Slower and may reorder equal non-zeros depending on sort stability.',
        ru: 'Медленнее и может переупорядочить равные ненули в зависимости от стабильности.'
      },
      viability: 'INVALID_FOR_SLICE',
      costBadges: ['MUTATES_OR_COPIES'],
      justificationChips: [
        { en: 'Unnecessary n log n', ru: 'Лишний n log n' }
      ],
      unlocksBlueprint: false
    }
  ],
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint: {
    id: 'bp_mz_read_write',
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    nodes: [
      {
        id: 'bp_mz_init',
        label: { en: 'Set write pointer to 0', ru: 'Установить write-указатель в 0' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mz_scan',
        label: { en: 'Scan each index with read', ru: 'Сканировать каждый индекс через read' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mz_copy',
        label: {
          en: 'When value is non-zero, copy it to write and advance write',
          ru: 'Если значение ненулевое — скопировать в write и сдвинуть write'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mz_fill',
        label: { en: 'Fill remaining positions with zeros', ru: 'Заполнить оставшиеся позиции нулями' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_mz_d_sort',
        label: { en: 'Sort the entire array', ru: 'Отсортировать весь массив' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'Sorting is a different (and weaker) approach, not this control flow.',
          ru: 'Сортировка — другой (и более слабый) подход, не этот поток управления.'
        }
      },
      {
        id: 'bp_mz_d_delete',
        label: { en: 'Delete zeros from a dynamic list', ru: 'Удалять нули из динамического списка' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'List deletion changes the structure; the target path mutates the given array.',
          ru: 'Удаление из списка меняет структуру; целевой путь мутирует данный массив.'
        }
      },
      {
        id: 'bp_mz_d_count',
        label: { en: 'Only count zeros and return the count', ru: 'Только посчитать нули и вернуть число' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'The task is to rearrange values, not report a count.',
          ru: 'Задача — переставить значения, а не вернуть счётчик.'
        }
      }
    ],
    solutionOrder: ['bp_mz_init', 'bp_mz_scan', 'bp_mz_copy', 'bp_mz_fill']
  },
  solutions: MOVE_ZEROS_SOLUTIONS,
  distractors: MOVE_ZEROS_DISTRACTORS,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. write packs non-zeros; the tail is zero-filled.',
    ru: 'Мозаика собрана. write упаковывает ненули; хвост заполняется нулями.'
  },
  blueprintHelp: {
    en: 'Assemble read/write packing blocks. Java is still hidden.',
    ru: 'Соберите блоки упаковки read/write. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: init write → scan read → copy non-zeros → fill zeros.',
    ru: 'Чертёж верен: init write → scan read → копировать ненули → заполнить нули.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions: MOVE_ZEROS_SOLUTIONS,
    distractors: MOVE_ZEROS_DISTRACTORS,
    alternativeNote: mosaicAlternativeNote,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace: {
    id: 'tr_mz_main',
    problemId: PROBLEM_ID,
    kind: 'ARRAY_POINTERS',
    label: { en: 'Primary trace', ru: 'Основная трассировка' },
    inputSummary: {
      en: 'nums = [0, 1, 0, 3, 12]',
      ru: 'nums = [0, 1, 0, 3, 12]'
    },
    arrayInput: [0, 1, 0, 3, 12],
    steps: [
      {
        id: 'tr_mz_0',
        title: { en: 'read=0, value 0', ru: 'read=0, значение 0' },
        narrative: {
          en: 'write = 0. nums[0] is 0 — skip copy.',
          ru: 'write = 0. nums[0] равен 0 — копирование пропускаем.'
        },
        state: { read: '0', write: '0', value: '0', action: 'skip' },
        question: {
          en: 'Does write advance on a zero?',
          ru: 'Двигается ли write на нуле?'
        },
        choices: [
          { id: 'no', text: { en: 'No — only non-zeros advance write', ru: 'Нет — write двигают только ненули' } },
          { id: 'yes', text: { en: 'Yes — always advance write', ru: 'Да — всегда двигать write' } }
        ],
        correctChoiceId: 'no',
        feedbackCorrect: {
          en: 'Zeros are ignored in the packing pass; write stays at 0.',
          ru: 'Нули игнорируются в проходе упаковки; write остаётся 0.'
        },
        feedbackIncorrect: {
          en: 'Advancing write on zeros would leave holes of zeros in the front.',
          ru: 'Сдвиг write на нулях оставил бы дыры из нулей в начале.'
        },
        highlightIndex: 0
      },
      {
        id: 'tr_mz_1',
        title: { en: 'read=1, value 1', ru: 'read=1, значение 1' },
        narrative: {
          en: 'Non-zero 1 is copied to index write=0; write becomes 1.',
          ru: 'Ненуль 1 копируется в индекс write=0; write становится 1.'
        },
        state: { read: '1', write: '0→1', value: '1', nums: '[1, 1, 0, 3, 12]' },
        question: {
          en: 'Where is the next non-zero written?',
          ru: 'Куда запишется следующий ненуль?'
        },
        choices: [
          { id: 'at1', text: { en: 'Index 1 (current write)', ru: 'Индекс 1 (текущий write)' } },
          { id: 'at0', text: { en: 'Index 0 again', ru: 'Снова индекс 0' } }
        ],
        correctChoiceId: 'at1',
        feedbackCorrect: {
          en: 'After copying 1, write points at the next free slot: 1.',
          ru: 'После копирования 1 write указывает на следующий свободный слот: 1.'
        },
        feedbackIncorrect: {
          en: 'write advanced after the copy, so the next write target is 1.',
          ru: 'write сдвинулся после копирования, следующая цель — 1.'
        },
        highlightIndex: 1
      },
      {
        id: 'tr_mz_2',
        title: { en: 'read=2, value 0', ru: 'read=2, значение 0' },
        narrative: {
          en: 'Another zero — packing pass skips; write stays 1.',
          ru: 'Снова ноль — проход упаковки пропускает; write остаётся 1.'
        },
        state: { read: '2', write: '1', value: '0', action: 'skip' },
        question: {
          en: 'Is the array finished after the packing loop?',
          ru: 'Закончен ли массив после цикла упаковки?'
        },
        choices: [
          {
            id: 'not_yet',
            text: { en: 'Not yet — still need to process remaining reads / fill zeros', ru: 'Ещё нет — остались read / заполнение нулей' }
          },
          { id: 'done', text: { en: 'Yes — stop now', ru: 'Да — остановиться сейчас' } }
        ],
        correctChoiceId: 'not_yet',
        feedbackCorrect: {
          en: 'Continue scanning 3 and 12, then zero-fill from write.',
          ru: 'Продолжить сканирование 3 и 12, затем zero-fill от write.'
        },
        feedbackIncorrect: {
          en: 'Stopping early leaves later non-zeros unmoved and the tail dirty.',
          ru: 'Ранняя остановка оставляет поздние ненули и «грязный» хвост.'
        },
        highlightIndex: 2
      },
      {
        id: 'tr_mz_3',
        title: { en: 'After packing: write=3', ru: 'После упаковки: write=3' },
        narrative: {
          en: 'Packed [1, 3, 12, …]. write=3 marks where zeros begin.',
          ru: 'Упаковано [1, 3, 12, …]. write=3 — начало нулей.'
        },
        state: { write: '3', packed: '[1, 3, 12, 3, 12]', next: 'zero-fill' },
        question: {
          en: 'What should indices 3 and 4 become?',
          ru: 'Чем должны стать индексы 3 и 4?'
        },
        choices: [
          { id: 'zeros', text: { en: '0 and 0', ru: '0 и 0' } },
          { id: 'keep', text: { en: 'Leave 3 and 12 as-is', ru: 'Оставить 3 и 12 как есть' } }
        ],
        correctChoiceId: 'zeros',
        feedbackCorrect: {
          en: 'Fill from write to the end with zeros → [1, 3, 12, 0, 0].',
          ru: 'Заполнить от write до конца нулями → [1, 3, 12, 0, 0].'
        },
        feedbackIncorrect: {
          en: 'Stale values past write must be overwritten with zeros.',
          ru: 'Устаревшие значения после write нужно перезаписать нулями.'
        },
        highlightIndex: 3
      }
    ],
    followUpQuestion: {
      en: 'For nums = [0, 0, 1], what is the array after the algorithm?',
      ru: 'Для nums = [0, 0, 1] каким станет массив после алгоритма?'
    },
    followUpChoices: [
      { id: 'ok', text: { en: '[1, 0, 0]', ru: '[1, 0, 0]' } },
      { id: 'bad', text: { en: '[0, 0, 1]', ru: '[0, 0, 1]' } }
    ],
    followUpCorrectChoiceId: 'ok',
    followUpFeedbackCorrect: {
      en: '1 packs to front; two zeros fill the tail.',
      ru: '1 упаковывается вперёд; два нуля заполняют хвост.'
    },
    followUpFeedbackIncorrect: {
      en: 'Non-zero must move before the zeros.',
      ru: 'Ненуль должен оказаться перед нулями.'
    }
  },
  hints: [
    {
      id: 'hnt_mz_bp_1',
      stageType: 'BLUEPRINT',
      level: 1,
      text: {
        en: 'Think of write as the next free slot for a non-zero value.',
        ru: 'Думайте о write как о следующем свободном слоте для ненуля.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mz_bp_2',
      stageType: 'BLUEPRINT',
      level: 2,
      text: {
        en: 'First block: initialize write to 0, then scan with read.',
        ru: 'Первый блок: инициализировать write = 0, затем сканировать read.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mz_bp_3',
      stageType: 'BLUEPRINT',
      level: 3,
      text: {
        en: 'Revealing the first block: Set write pointer to 0.',
        ru: 'Открываем первый блок: Установить write-указатель в 0.'
      },
      revealType: 'BLOCK',
      revealTargetId: 'bp_mz_init'
    },
    {
      id: 'hnt_mz_mos_1',
      stageType: 'CODE_MOSAIC',
      level: 1,
      text: {
        en: 'The packing loop only assigns when nums[read] != 0.',
        ru: 'Цикл упаковки присваивает только когда nums[read] != 0.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mz_mos_2',
      stageType: 'CODE_MOSAIC',
      level: 2,
      text: {
        en: 'After the for-loop, a while-loop zeros out from write to the end.',
        ru: 'После for идёт while, обнуляющий от write до конца.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_mz_tr_1',
      stageType: 'TRACE',
      level: 1,
      text: {
        en: 'On [0,1,0,3,12], write only advances when reading 1, 3, then 12.',
        ru: 'На [0,1,0,3,12] write двигается только при чтении 1, 3 и 12.'
      },
      revealType: 'NONE'
    }
  ],
  reflectionPrompt: {
    en: 'What invariant does the write pointer protect during the packing pass?',
    ru: 'Какой инвариант защищает указатель write во время прохода упаковки?'
  },
  summary: {
    corePattern: {
      en: 'Two pointers (read/write) — pack kept elements forward, rewrite the discarded region.',
      ru: 'Два указателя (read/write) — упаковать нужные элементы вперёд, перезаписать отброшенную область.'
    },
    invariant: {
      en: 'Indices [0 .. write) hold the non-zeros seen so far in original order.',
      ru: 'Индексы [0 .. write) содержат уже встреченные ненули в исходном порядке.'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    commonMistake: {
      en: 'Advancing write on zeros, or forgetting the final zero-fill after packing.',
      ru: 'Двигать write на нулях или забыть финальное заполнение нулями после упаковки.'
    },
    recognitionCue: {
      en: '“Partition / compact in place while preserving order of a subset.”',
      ru: '«Partition / уплотнить на месте, сохранив порядок подмножества.»'
    }
  }
};
