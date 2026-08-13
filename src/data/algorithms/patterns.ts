import { AlgorithmPatternFamily } from '../../types/algorithmLab';

export const ALGORITHM_PATTERN_FAMILIES: readonly AlgorithmPatternFamily[] = [
  {
    id: 'pat_hashing_membership',
    title: { en: 'Hashing / Membership', ru: 'Хэширование / Принадлежность' },
    description: {
      en: 'Detect presence, complements, or frequencies with hash-based structures.',
      ru: 'Обнаружение присутствия, дополнений или частот с помощью хэш-структур.'
    }
  },
  {
    id: 'pat_two_pointers',
    title: { en: 'Two Pointers', ru: 'Два указателя' },
    description: {
      en: 'Advance left/right (or read/write) pointers while preserving an invariant.',
      ru: 'Двигать левый/правый (или read/write) указатели, сохраняя инвариант.'
    }
  },
  {
    id: 'pat_sorting',
    title: { en: 'Sorting', ru: 'Сортировка' },
    description: {
      en: 'Sort first so neighboring structure or two-pointer scans become possible.',
      ru: 'Сначала отсортировать, чтобы стали возможны соседняя структура или two-pointer.'
    }
  },
  {
    id: 'pat_intervals',
    title: { en: 'Intervals', ru: 'Интервалы' },
    description: {
      en: 'Sort ranges and merge or sweep while tracking the active interval.',
      ru: 'Сортировать диапазоны и сливать/сканировать, отслеживая активный интервал.'
    }
  },
  {
    id: 'pat_hashing',
    title: { en: 'Hashing / Canonical Keys', ru: 'Хэширование / Канонические ключи' },
    description: {
      en: 'Group or look up items by a canonical signature (sorted key, frequency vector, remainder).',
      ru: 'Группировать или искать по канонической сигнатуре (sorted key, частоты, остаток).'
    }
  },
  {
    id: 'pat_prefix_suffix',
    title: { en: 'Prefix / Suffix Products', ru: 'Префикс / Суффикс произведения' },
    description: {
      en: 'Precompute running products (or sums) from both ends to answer range queries in linear time.',
      ru: 'Предвычислять бегущие произведения (или суммы) с обоих концов для линейных ответов.'
    }
  },
  {
    id: 'pat_matrix_traversal',
    title: { en: 'Matrix Traversal', ru: 'Обход матрицы' },
    description: {
      en: 'Walk a matrix by shrinking boundaries or directional rules.',
      ru: 'Обходить матрицу, сжимая границы или следуя правилам направления.'
    }
  },
  {
    id: 'pat_dynamic_programming',
    title: { en: 'Dynamic Programming', ru: 'Динамическое программирование' },
    description: {
      en: 'Reuse optimal sub-answers — e.g. best subarray ending here.',
      ru: 'Повторно использовать оптимальные подансайты — например лучший подмассив, оканчивающийся здесь.'
    }
  },
  {
    id: 'pat_greedy',
    title: { en: 'Greedy / Frequency', ru: 'Жадный / Частоты' },
    description: {
      en: 'Use counts and local optimal choices (idle slots, max frequency) to build a global schedule.',
      ru: 'Использовать счётчики и локально оптимальные выборы (idle, max frequency) для расписания.'
    }
  },
  {
    id: 'pat_prefix_sum',
    title: { en: 'Prefix Sum / Remainder', ru: 'Префиксные суммы / Остатки' },
    description: {
      en: 'Track prefix aggregates and map remainders to detect divisible subarrays.',
      ru: 'Отслеживать префиксные агрегаты и остатки, чтобы находить делимые подмассивы.'
    }
  }
];

export function getPatternFamilyById(id: string): AlgorithmPatternFamily | undefined {
  return ALGORITHM_PATTERN_FAMILIES.find((f) => f.id === id);
}
