import { AlgorithmStrategyOption } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_STRATEGIES: readonly AlgorithmStrategyOption[] = [
  {
    id: 'strat_cd_nested',
    problemId: 'alg_contains_duplicate',
    title: { en: 'Nested loops', ru: 'Вложенные циклы' },
    description: {
      en: 'Compare every pair of indices until a match appears.',
      ru: 'Сравнивать каждую пару индексов, пока не найдётся совпадение.'
    },
    timeClass: 'O(n²)',
    spaceClass: 'O(1)',
    importantConstraint: {
      en: 'Fine for tiny n; too slow for n ≈ 10^5.',
      ru: 'Подходит для крошечного n; слишком медленно при n ≈ 10^5.'
    },
    viability: 'VALID_SUBOPTIMAL',
    costBadges: ['QUADRATIC_TIME'],
    justificationChips: [
      { en: 'No extra memory', ru: 'Без доп. памяти' },
      { en: 'Brute force first', ru: 'Сначала brute force' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_cd_sort',
    problemId: 'alg_contains_duplicate',
    title: { en: 'Sort and scan adjacent', ru: 'Сортировка и соседние элементы' },
    description: {
      en: 'Sort, then check whether any nums[i] equals nums[i+1].',
      ru: 'Отсортировать и проверить, равен ли nums[i] соседнему nums[i+1].'
    },
    timeClass: 'O(n log n)',
    spaceClass: 'O(1)–O(n)',
    importantConstraint: {
      en: 'Mutates input or needs a copy; good when memory is tight.',
      ru: 'Мутирует вход или требует копию; хорошо при жёсткой памяти.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['MUTATES_OR_COPIES'],
    justificationChips: [
      { en: 'Avoid HashSet memory', ru: 'Избежать памяти HashSet' },
      { en: 'Adjacent equals after sort', ru: 'Соседи равны после sort' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_cd_hashset',
    problemId: 'alg_contains_duplicate',
    title: { en: 'HashSet of seen values', ru: 'HashSet уже виденных значений' },
    description: {
      en: 'One pass: if add fails, the value was already present.',
      ru: 'Один проход: если add не удался, значение уже было.'
    },
    timeClass: 'O(n) avg',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Uses extra memory proportional to distinct values.',
      ru: 'Использует доп. память пропорционально числу различных значений.'
    },
    viability: 'TARGET',
    costBadges: ['EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Membership in average O(1)', ru: 'Принадлежность в среднем O(1)' },
      { en: 'Early exit on first duplicate', ru: 'Ранний выход на первом дубликате' },
      { en: 'One linear pass', ru: 'Один линейный проход' }
    ],
    unlocksBlueprint: true
  },
  {
    id: 'strat_cd_stream',
    problemId: 'alg_contains_duplicate',
    title: { en: 'Stream / distinct', ru: 'Stream / distinct' },
    description: {
      en: 'Compare stream distinct count to array length (or similar).',
      ru: 'Сравнить distinct count потока с длиной массива (или аналог).'
    },
    timeClass: 'O(n)',
    spaceClass: 'O(n)',
    importantConstraint: {
      en: 'Idiomatic Java, but hides the membership mechanics this workshop teaches.',
      ru: 'Идиоматичный Java, но скрывает механику принадлежности, которую учит воркшоп.'
    },
    viability: 'VALID_ALTERNATIVE',
    costBadges: ['HIDES_MECHANICS', 'EXTRA_MEMORY'],
    justificationChips: [
      { en: 'Concise library call', ru: 'Краткий вызов библиотеки' }
    ],
    unlocksBlueprint: false
  },
  {
    id: 'strat_cd_range',
    problemId: 'alg_contains_duplicate',
    title: { en: 'Range-based marking', ru: 'Маркировка по диапазону' },
    description: {
      en: 'Allocate a structure indexed by value when the value range is tiny.',
      ru: 'Выделить структуру с индексацией по значению, если диапазон мал.'
    },
    timeClass: 'O(n + R)',
    spaceClass: 'O(R)',
    importantConstraint: {
      en: 'Only valid when value range R is small and known — not true for ±10^9.',
      ru: 'Только если диапазон R мал и известен — неверно для ±10^9.'
    },
    viability: 'CONDITIONAL',
    costBadges: ['RANGE_DEPENDENT'],
    justificationChips: [
      { en: 'Tiny non-negative domain', ru: 'Крошечный неотрицательный домен' }
    ],
    unlocksBlueprint: false
  }
];
