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

const PROBLEM_ID = 'alg_container_with_most_water';
const TARGET_STRATEGY_ID = 'strat_cwmw_two_pointers';
const SOLUTION_ID = 'sol_container_with_most_water_two_pointers';
const MOSAIC_ID = 'mos_cwmw_two_pointers';

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
      en: 'Start at both ends; area is limited by the shorter wall, so advance that pointer to seek a taller wall.',
      ru: 'Старт с обоих концов; площадь ограничена более короткой стеной, поэтому двигаем этот указатель в поиске более высокой стены.'
    },
    canonicalCode: `
public int maxArea(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int best = 0;
    while (left < right) {
        int width = right - left;
        int area = Math.min(height[left], height[right]) * width;
        best = Math.max(best, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
}
`.trim()
  }
];

const STRATEGIES: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_cwmw_nested',
    problemId: PROBLEM_ID,
    title: { en: 'Check every pair of lines', ru: 'Проверить каждую пару линий' },
    description: {
      en: 'For every left < right, compute min(height)*width and track the max.',
      ru: 'Для каждой left < right считать min(height)*width и хранить максимум.'
    },
    timeClass: 'O(n²)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Correct but too slow for large n.',
      ru: 'Корректно, но слишком медленно для большого n.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'Exhaustive pairs', ru: 'Полный перебор пар' }
    ],
    unlocksBlueprint: false
  },
  {
    id: TARGET_STRATEGY_ID,
    problemId: PROBLEM_ID,
    title: { en: 'Two pointers from the ends', ru: 'Два указателя с концов' },
    description: {
      en: 'Widen-first: start widest, then move the shorter wall inward.',
      ru: 'Сначала ширина: старт с максимальной ширины, затем двигать более короткую стену внутрь.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Moving the taller wall cannot improve area at the current width — prove via the shorter-wall bottleneck.',
      ru: 'Движение более высокой стены не улучшит площадь при текущей ширине — доказательство через узкое место короткой стены.'
    },
    viability: 'TARGET',
    costBadges: [],
    justificationChips: [
      { en: 'Linear scan', ru: 'Линейный проход' },
      { en: 'Shorter wall moves', ru: 'Двигается короткая стена' },
      { en: 'Constant memory', ru: 'Константная память' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_cwmw_sort',
    problemId: PROBLEM_ID,
    title: { en: 'Sort heights first', ru: 'Сначала отсортировать высоты' },
    description: {
      en: 'Sort values or indices by height, then somehow rebuild width.',
      ru: 'Отсортировать значения или индексы по высоте, затем как-то восстановить ширину.'
    },
    timeClass: 'O(n log n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Sorting destroys the positional width information needed for the container.',
      ru: 'Сортировка уничтожает позиционную информацию о ширине, нужную для контейнера.'
    },
    viability: 'INVALID_FOR_SLICE',
    costBadges: ['MUTATES_OR_COPIES'],
    justificationChips: [
      { en: 'Loses index geometry', ru: 'Теряет геометрию индексов' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_cwmw_stack',
    problemId: PROBLEM_ID,
    title: { en: 'Monotonic stack of candidates', ru: 'Монотонный стек кандидатов' },
    description: {
      en: 'Maintain increasing heights as candidate left walls.',
      ru: 'Поддерживать растущие высоты как кандидатов левой стены.'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Overkill here — two pointers already exploit the width/height trade-off directly.',
      ru: 'Избыточно здесь — два указателя уже напрямую используют компромисс ширина/высота.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['EXTRA_MEMORY', 'HIDES_MECHANICS'],
    justificationChips: [
      { en: 'More machinery than needed', ru: 'Больше механизмов, чем нужно' }
    ],
    unlocksBlueprint: false
  }
];

const BLUEPRINT: BlueprintGraph = {
  id: 'bp_cwmw_two_pointers',
  problemId: PROBLEM_ID,
  strategyId: TARGET_STRATEGY_ID,
  nodes: [
    {
      id: 'bp_cwmw_ends',
      label: {
        en: 'Place left at start and right at end',
        ru: 'Поставить left в начало и right в конец'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_loop',
      label: { en: 'While left index is still left of right', ru: 'Пока left всё ещё левее right' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_area',
      label: {
        en: 'Compute area from min(heights) × (right - left)',
        ru: 'Посчитать площадь как min(высот) × (right - left)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_best',
      label: { en: 'Update the best area seen so far', ru: 'Обновить лучшую площадь на данный момент' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_move',
      label: {
        en: 'Advance the pointer at the shorter wall (either side if equal)',
        ru: 'Сдвинуть указатель у более короткой стены (любую сторону при равенстве)'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_return',
      label: { en: 'Return the best area', ru: 'Вернуть лучшую площадь' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cwmw_d_taller',
      label: { en: 'Always move the taller wall inward', ru: 'Всегда двигать более высокую стену внутрь' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'The taller wall is not the bottleneck; moving it only shrinks width under the same short height.',
        ru: 'Высокая стена не узкое место; её движение только сужает ширину при той же короткой высоте.'
      }
    },
    {
      id: 'bp_cwmw_d_avg',
      label: {
        en: 'Use average of the two heights as the water height',
        ru: 'Использовать среднее двух высот как высоту воды'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Water level is limited by the shorter line — min, not average.',
        ru: 'Уровень воды ограничен более короткой линией — min, не среднее.'
      }
    },
    {
      id: 'bp_cwmw_d_nested',
      label: { en: 'Nest a second loop over all right indices', ru: 'Вложить второй цикл по всем правым индексам' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'That returns to the quadratic pair scan.',
        ru: 'Это возврат к квадратичному перебору пар.'
      }
    }
  ],
  solutionOrder: [
    'bp_cwmw_ends',
    'bp_cwmw_loop',
    'bp_cwmw_area',
    'bp_cwmw_best',
    'bp_cwmw_move',
    'bp_cwmw_return'
  ]
};

const CLARIFY: readonly ClarifyQuestion[] = [
  {
    id: 'cq_cwmw_height',
    prompt: {
      en: 'What limits the water height between two lines?',
      ru: 'Что ограничивает высоту воды между двумя линиями?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cwmw_height_min',
        text: { en: 'The shorter of the two heights', ru: 'Меньшая из двух высот' },
        isCorrect: true,
        feedback: {
          en: 'Correct — water spills over the shorter wall.',
          ru: 'Верно — вода переливается через более короткую стену.'
        }
      },
      {
        id: 'cq_cwmw_height_max',
        text: { en: 'The taller of the two heights', ru: 'Большая из двух высот' },
        isCorrect: false,
        feedback: {
          en: 'The taller wall cannot hold water above the shorter one.',
          ru: 'Более высокая стена не удержит воду выше более короткой.'
        }
      }
    ]
  },
  {
    id: 'cq_cwmw_width',
    prompt: {
      en: 'How is width measured?',
      ru: 'Как измеряется ширина?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cwmw_width_diff',
        text: { en: 'rightIndex - leftIndex', ru: 'rightIndex - leftIndex' },
        isCorrect: true,
        feedback: {
          en: 'Correct. Indices are on the x-axis unit grid.',
          ru: 'Верно. Индексы лежат на единичной сетке оси x.'
        }
      },
      {
        id: 'cq_cwmw_width_plus',
        text: { en: 'rightIndex - leftIndex + 1', ru: 'rightIndex - leftIndex + 1' },
        isCorrect: false,
        feedback: {
          en: 'Inclusive counting overstates the gap between vertical lines.',
          ru: 'Включённый подсчёт завышает зазор между вертикальными линиями.'
        }
      }
    ]
  },
  {
    id: 'cq_cwmw_move',
    prompt: {
      en: 'After scoring the current pair, which pointer should move?',
      ru: 'После оценки текущей пары какой указатель двигать?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cwmw_move_short',
        text: {
          en: 'The one at the shorter wall (either if equal)',
          ru: 'Тот, что у более короткой стены (любой при равенстве)'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct — only a taller replacement for the short wall can beat the current area class.',
          ru: 'Верно — только более высокая замена короткой стены может превзойти текущий класс площади.'
        }
      },
      {
        id: 'cq_cwmw_move_tall',
        text: { en: 'Always the taller wall', ru: 'Всегда более высокую стену' },
        isCorrect: false,
        feedback: {
          en: 'Moving the tall wall keeps the short bottleneck and only shrinks width.',
          ru: 'Движение высокой стены сохраняет узкое место короткой и только сужает ширину.'
        }
      }
    ]
  },
  {
    id: 'cq_cwmw_slant',
    prompt: {
      en: 'Do the sides of the container need to be vertical lines from the array?',
      ru: 'Должны ли стороны контейнера быть вертикальными линиями из массива?'
    },
    multiSelect: false,
    options: [
      {
        id: 'cq_cwmw_slant_yes',
        text: {
          en: 'Yes — choose two indices; water sits between those vertical lines',
          ru: 'Да — выбрать два индекса; вода между этими вертикальными линиями'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct. You do not slant a wall between non-chosen indices.',
          ru: 'Верно. Нельзя «наклонить» стену между невыбранными индексами.'
        }
      },
      {
        id: 'cq_cwmw_slant_any',
        text: {
          en: 'No — any continuous terrain profile is fine',
          ru: 'Нет — подойдёт любой непрерывный профиль рельефа'
        },
        isCorrect: false,
        feedback: {
          en: 'The model is two vertical lines chosen from height[].',
          ru: 'Модель — две вертикальные линии, выбранные из height[].'
        }
      }
    ]
  }
];

const DISTRACTORS: readonly MosaicDistractor[] = [
  {
    id: 'mos_cwmw_d_taller',
    code: 'if (height[left] > height[right]) {',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Moves when left is taller — opposite of the shorter-wall rule.',
      ru: 'Двигает, когда left выше — противоположность правилу короткой стены.'
    }
  },
  {
    id: 'mos_cwmw_d_avg',
    code: 'int area = ((height[left] + height[right]) / 2) * width;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Average height is not how the container holds water — use min.',
      ru: 'Средняя высота — не то, как контейнер держит воду; нужен min.'
    }
  },
  {
    id: 'mos_cwmw_d_width',
    code: 'int width = right - left + 1;',
    indent: 2,
    role: 'DISTRACTOR_LOGIC',
    explanation: {
      en: 'Off-by-one on width between vertical lines.',
      ru: 'Ошибка на единицу в ширине между вертикальными линиями.'
    }
  },
  {
    id: 'mos_cwmw_d_nested',
    code: 'for (int j = left + 1; j < height.length; j++) {',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Nested pair scan — quadratic strategy.',
      ru: 'Вложенный перебор пар — квадратичная стратегия.'
    }
  },
  {
    id: 'mos_cwmw_d_both',
    code: 'left++; right--;',
    indent: 2,
    role: 'DISTRACTOR_INVARIANT',
    explanation: {
      en: 'Moving both pointers can skip the optimal pair.',
      ru: 'Движение обоих указателей может пропустить оптимальную пару.'
    }
  },
  {
    id: 'mos_cwmw_d_sort',
    code: 'Arrays.sort(height);',
    indent: 1,
    role: 'DISTRACTOR_STRATEGY',
    explanation: {
      en: 'Sorting destroys index positions required for width.',
      ru: 'Сортировка уничтожает позиции индексов, нужные для ширины.'
    }
  },
  {
    id: 'mos_cwmw_d_long',
    code: 'long best = 0;',
    indent: 1,
    role: 'DISTRACTOR_COMPILE',
    explanation: {
      en: 'Return type is int in this slice — keep best as int.',
      ru: 'Тип возврата в этом срезе — int; оставьте best как int.'
    }
  }
];

const ALTERNATIVE_NOTE = {
  en: 'Equal heights: moving either pointer is fine; this solution moves right when height[left] >= height[right].',
  ru: 'Равные высоты: можно двигать любой указатель; это решение двигает right, когда height[left] >= height[right].'
} as const;

const TRACE: TraceScenario = {
  id: 'tr_cwmw_main',
  problemId: PROBLEM_ID,
  kind: 'ARRAY_POINTERS',
  label: { en: 'Two pointers on [1,8,6,2,5,4,8,3,7]', ru: 'Два указателя на [1,8,6,2,5,4,8,3,7]' },
  inputSummary: {
    en: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7] → expect 49',
    ru: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7] → ожидаем 49'
  },
  arrayInput: [1, 8, 6, 2, 5, 4, 8, 3, 7],
  steps: [
    {
      id: 'tr_cwmw_0',
      title: { en: 'Widest pair first', ru: 'Сначала самая широкая пара' },
      narrative: {
        en: 'left=0 (h=1), right=8 (h=7). width=8, area=min(1,7)*8=8. Shorter wall is left.',
        ru: 'left=0 (h=1), right=8 (h=7). width=8, area=min(1,7)*8=8. Короткая стена — left.'
      },
      state: {
        left: '0',
        right: '8',
        height_left: '1',
        height_right: '7',
        width: '8',
        area: '8',
        best: '8',
        move: 'left++ (shorter)'
      },
      question: {
        en: 'Why move left instead of right?',
        ru: 'Почему двигать left, а не right?'
      },
      choices: [
        {
          id: 'short',
          text: {
            en: 'Left is shorter — only a taller left can improve',
            ru: 'Left короче — улучшить может только более высокий left'
          }
        },
        {
          id: 'tall',
          text: {
            en: 'Right is taller, so it should move',
            ru: 'Right выше, поэтому его надо двигать'
          }
        }
      ],
      correctChoiceId: 'short',
      feedbackCorrect: {
        en: 'With height capped at 1, shrinking width while keeping left=1 cannot beat area 8. Seek a taller left wall.',
        ru: 'При высоте, ограниченной 1, сужение ширины с left=1 не побьёт area 8. Ищем более высокий left.'
      },
      feedbackIncorrect: {
        en: 'Moving the tall wall keeps the bottleneck height 1 and only loses width.',
        ru: 'Движение высокой стены сохраняет узкое место высоты 1 и только теряет ширину.'
      },
      highlightIndex: 0
    },
    {
      id: 'tr_cwmw_1',
      title: { en: 'left=1, right=8', ru: 'left=1, right=8' },
      narrative: {
        en: 'Heights 8 and 7. width=7, area=7*7=49. best=49. Shorter is right (7).',
        ru: 'Высоты 8 и 7. width=7, area=7*7=49. best=49. Короче right (7).'
      },
      state: {
        left: '1',
        right: '8',
        height_left: '8',
        height_right: '7',
        width: '7',
        area: '49',
        best: '49',
        move: 'right-- (shorter)'
      },
      question: {
        en: 'What is the area of this pair?',
        ru: 'Какова площадь этой пары?'
      },
      choices: [
        { id: 'forty_nine', text: { en: '49', ru: '49' } },
        { id: 'fifty_six', text: { en: '56', ru: '56' } }
      ],
      correctChoiceId: 'forty_nine',
      feedbackCorrect: {
        en: 'min(8,7) × 7 = 49 — the eventual answer.',
        ru: 'min(8,7) × 7 = 49 — итоговый ответ.'
      },
      feedbackIncorrect: {
        en: 'Using max height 8 would overstate the water level.',
        ru: 'Использование max высоты 8 завысило бы уровень воды.'
      },
      highlightIndex: 8
    },
    {
      id: 'tr_cwmw_2',
      title: { en: 'Continue inward', ru: 'Продолжить внутрь' },
      narrative: {
        en: 'right moves to 7 (h=3). area=min(8,3)*6=18 < 49. Still move the shorter side (right).',
        ru: 'right переходит на 7 (h=3). area=min(8,3)*6=18 < 49. Снова двигаем короткую сторону (right).'
      },
      state: {
        left: '1',
        right: '7',
        height_left: '8',
        height_right: '3',
        width: '6',
        area: '18',
        best: '49',
        move: 'right-- (shorter)'
      },
      question: {
        en: 'Does best change on this step?',
        ru: 'Меняется ли best на этом шаге?'
      },
      choices: [
        { id: 'no', text: { en: 'No — 18 < 49', ru: 'Нет — 18 < 49' } },
        { id: 'yes', text: { en: 'Yes — overwrite with 18', ru: 'Да — перезаписать на 18' } }
      ],
      correctChoiceId: 'no',
      feedbackCorrect: {
        en: 'best keeps the historical maximum; smaller areas are ignored.',
        ru: 'best хранит исторический максимум; меньшие площади игнорируются.'
      },
      feedbackIncorrect: {
        en: 'Math.max(best, area) keeps 49.',
        ru: 'Math.max(best, area) сохраняет 49.'
      },
      highlightIndex: 7
    },
    {
      id: 'tr_cwmw_3',
      title: { en: 'Why shorter moves (proof sketch)', ru: 'Почему двигается короткая (набросок доказательства)' },
      narrative: {
        en: 'Invariant: any pair skipped by moving the short wall had width smaller and height ≤ old short wall, so area ≤ previous.',
        ru: 'Инвариант: любая пара, пропущенная движением короткой стены, имела меньшую ширину и высоту ≤ старой короткой стены, значит area ≤ предыдущей.'
      },
      state: {
        rule: 'move shorter wall',
        reason: 'height bottleneck',
        best: '49'
      },
      question: {
        en: 'If you moved the taller wall instead, what stays fixed?',
        ru: 'Если двигать более высокую стену, что остаётся фиксированным?'
      },
      choices: [
        {
          id: 'short_cap',
          text: {
            en: 'The short-wall height cap — width only shrinks',
            ru: 'Потолок высоты короткой стены — ширина только сужается'
          }
        },
        {
          id: 'width_grows',
          text: { en: 'Width grows automatically', ru: 'Ширина автоматически растёт' }
        }
      ],
      correctChoiceId: 'short_cap',
      feedbackCorrect: {
        en: 'That is why taller-wall moves are dominated — never helpful at the current step.',
        ru: 'Поэтому движения высокой стены доминируются — на текущем шаге бесполезны.'
      },
      feedbackIncorrect: {
        en: 'Pointers only move inward, so width never grows.',
        ru: 'Указатели двигаются только внутрь, ширина никогда не растёт.'
      },
      highlightIndex: 1
    }
  ],
  followUpQuestion: {
    en: 'For height = [1, 1], what is maxArea?',
    ru: 'Для height = [1, 1] чему равен maxArea?'
  },
  followUpChoices: [
    { id: 'one', text: { en: '1', ru: '1' } },
    { id: 'zero', text: { en: '0', ru: '0' } }
  ],
  followUpCorrectChoiceId: 'one',
  followUpFeedbackCorrect: {
    en: 'min(1,1) × (1-0) = 1.',
    ru: 'min(1,1) × (1-0) = 1.'
  },
  followUpFeedbackIncorrect: {
    en: 'Two lines one unit apart with height 1 still hold area 1.',
    ru: 'Две линии на расстоянии 1 с высотой 1 всё ещё дают площадь 1.'
  }
};

const HINTS: readonly AlgorithmHint[] = [
  {
    id: 'hnt_cwmw_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Start with maximum width; every move trades width for a chance at more height.',
      ru: 'Начните с максимальной ширины; каждый ход меняет ширину на шанс большей высоты.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cwmw_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'Always advance the shorter wall — that is the bottleneck.',
      ru: 'Всегда двигайте более короткую стену — это узкое место.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_cwmw_move'
  },
  {
    id: 'hnt_cwmw_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'area uses Math.min(height[left], height[right]) * (right - left).',
      ru: 'area использует Math.min(height[left], height[right]) * (right - left).'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cwmw_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'The if compares heights to decide left++ vs right--.',
      ru: 'if сравнивает высоты, чтобы выбрать left++ или right--.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cwmw_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'On the sample, the pair (index 1, index 8) yields 49 — remember why left moved first.',
      ru: 'На примере пара (индекс 1, индекс 8) даёт 49 — вспомните, почему сначала сдвинулся left.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cwmw_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'If the short wall never moves, you cannot discover a taller replacement for the bottleneck.',
      ru: 'Если короткая стена никогда не двигается, вы не найдёте более высокую замену узкому месту.'
    },
    revealType: 'NONE'
  }
];

export const CONTAINER_WITH_MOST_WATER_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'container-with-most-water',
    title: { en: 'Container With Most Water', ru: 'Контейнер с наибольшим количеством воды' },
    summary: {
      en: 'Choose two vertical lines that form a container holding the maximum water.',
      ru: 'Выбрать две вертикальные линии, образующие контейнер с максимальным объёмом воды.'
    },
    statement: {
      en: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.',
      ru: 'Дан массив целых `height` длины `n`. Нарисованы `n` вертикальных линий с концами `(i, 0)` и `(i, height[i])`. Найдите две линии, которые вместе с осью x образуют контейнер, содержащий больше всего воды. Верните максимальное количество воды. Контейнер нельзя наклонять.'
    },
    examples: [
      {
        id: 'ex_cwmw_1',
        input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        output: '49',
        explanation: {
          en: 'Lines at index 1 (height 8) and index 8 (height 7) give min(8,7) × 7 = 49.',
          ru: 'Линии в индексе 1 (высота 8) и индексе 8 (высота 7) дают min(8,7) × 7 = 49.'
        }
      },
      {
        id: 'ex_cwmw_2',
        input: 'height = [1, 1]',
        output: '1',
        explanation: {
          en: 'Only one pair: width 1, height 1.',
          ru: 'Только одна пара: ширина 1, высота 1.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_cwmw_1',
        text: {
          en: '`n == height.length`',
          ru: '`n == height.length`'
        }
      },
      {
        id: 'c_cwmw_2',
        text: {
          en: '`2 <= n <= 10^5`',
          ru: '`2 <= n <= 10^5`'
        }
      },
      {
        id: 'c_cwmw_3',
        text: {
          en: '`0 <= height[i] <= 10^4`',
          ru: '`0 <= height[i] <= 10^4`'
        }
      }
    ],
    patternFamilyId: 'pat_two_pointers',
    difficulty: 'MEDIUM',
    estimatedMinutes: 25,
    stages: standardWorkshopStages('cwmw', {
      STRATEGY: {
        en: 'Compare exhaustive pairs with the two-pointer shorter-wall advance.',
        ru: 'Сравните полный перебор пар с двух указателями и сдвигом короткой стены.'
      },
      BLUEPRINT: {
        en: 'Order ends → area → best → move-shorter before Java appears.',
        ru: 'Упорядочите концы → area → best → сдвиг короткой до появления Java.'
      },
      TRACE: {
        en: 'Track left/right/width/area/best and justify each move on the classic sample.',
        ru: 'Отслеживайте left/right/width/area/best и обосновывайте каждый ход на классическом примере.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-preparation problem for two-pointer geometry. No company attribution.',
      ru: 'Распространённая публичная задача для подготовки к интервью про геометрию двух указателей. Без атрибуции компании.'
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
    en: 'Mosaic complete. Shorter wall moves — width shrinks only when the bottleneck can improve.',
    ru: 'Мозаика собрана. Двигается короткая стена — ширина сужается только когда узкое место может улучшиться.'
  },
  blueprintHelp: {
    en: 'Assemble two-pointer container blocks. Java is still hidden.',
    ru: 'Соберите блоки контейнера с двумя указателями. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: ends → loop → area → best → move shorter → return.',
    ru: 'Чертёж верен: концы → цикл → area → best → сдвиг короткой → return.'
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
    en: 'Explain why moving the taller pointer cannot beat the area you just computed for the current width.',
    ru: 'Объясните, почему движение более высокого указателя не может побить площадь, только что посчитанную для текущей ширины.'
  },
  summary: {
    corePattern: {
      en: 'Two pointers from the ends — move the shorter wall to search for height.',
      ru: 'Два указателя с концов — двигать короткую стену в поиске высоты.'
    },
    invariant: {
      en: 'Every discarded pointer position is dominated: any pair using that short wall with smaller width cannot exceed the area already seen.',
      ru: 'Каждая отброшенная позиция указателя доминируется: любая пара с этой короткой стеной и меньшей шириной не превзойдёт уже виденную площадь.'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    commonMistake: {
      en: 'Moving the taller wall, or using max/average instead of min for water height.',
      ru: 'Двигать более высокую стену или брать max/среднее вместо min для высоты воды.'
    },
    recognitionCue: {
      en: '“Max area between two vertical lines” / width–height trade-off.',
      ru: '«Максимальная площадь между двумя вертикальными линиями» / компромисс ширина–высота.'
    }
  }
};
