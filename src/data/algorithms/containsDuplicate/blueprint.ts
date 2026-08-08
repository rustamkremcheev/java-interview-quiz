import { BlueprintGraph } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_BLUEPRINT: BlueprintGraph = {
  id: 'bp_cd_hashset',
  problemId: 'alg_contains_duplicate',
  strategyId: 'strat_cd_hashset',
  nodes: [
    {
      id: 'bp_cd_create',
      label: { en: 'Create empty seen-set', ru: 'Создать пустой seen-set' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_iterate',
      label: { en: 'Iterate through each number', ru: 'Пройти по каждому числу' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_check',
      label: {
        en: 'Ask whether number is already in seen-set',
        ru: 'Спросить, есть ли число уже в seen-set'
      },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_return_true',
      label: { en: 'Return true when already seen', ru: 'Вернуть true, если уже видели' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_add',
      label: { en: 'Add new number to seen-set', ru: 'Добавить новое число в seen-set' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_return_false',
      label: { en: 'Return false after full scan', ru: 'Вернуть false после полного прохода' },
      role: 'REQUIRED'
    },
    {
      id: 'bp_cd_d_sort',
      label: { en: 'Sort the array', ru: 'Отсортировать массив' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Sorting is another strategy, not part of the HashSet control flow.',
        ru: 'Сортировка — другая стратегия, не часть потока HashSet.'
      }
    },
    {
      id: 'bp_cd_d_clear',
      label: { en: 'Clear the set during each iteration', ru: 'Очищать set на каждой итерации' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Clearing destroys membership memory — duplicates would never be detected.',
        ru: 'Очистка уничтожает память о виденных — дубликаты не обнаружатся.'
      }
    },
    {
      id: 'bp_cd_d_len',
      label: {
        en: 'Return true when array length > 1',
        ru: 'Вернуть true, если длина массива > 1'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Length alone does not prove a duplicate exists.',
        ru: 'Одна только длина не доказывает наличие дубликата.'
      }
    },
    {
      id: 'bp_cd_d_rec',
      label: { en: 'Search recursively', ru: 'Искать рекурсивно' },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Recursion is unnecessary overhead for linear membership scanning.',
        ru: 'Рекурсия — лишний overhead для линейного membership-сканирования.'
      }
    },
    {
      id: 'bp_cd_d_add_first',
      label: {
        en: 'Add every value before checking it',
        ru: 'Добавлять каждое значение до проверки'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'With HashSet.add, check-and-add is one operation; “add then check” wording invites bugs in other APIs.',
        ru: 'С HashSet.add проверка и добавление — одна операция; формулировка «сначала add» провоцирует ошибки в других API.'
      }
    },
    {
      id: 'bp_cd_d_false_early',
      label: {
        en: 'Return false inside the first iteration',
        ru: 'Вернуть false на первой итерации'
      },
      role: 'DISTRACTOR',
      distractorExplanation: {
        en: 'Returning false early aborts before later duplicates can appear.',
        ru: 'Ранний false прерывает поиск до появления более поздних дубликатов.'
      }
    }
  ],
  // Conceptual order: create → iterate → check → return true OR add → after loop return false
  // For linear assembler we use the canonical teaching order with check before add,
  // and return-true as the branch taken on hit; return-false last.
  solutionOrder: [
    'bp_cd_create',
    'bp_cd_iterate',
    'bp_cd_check',
    'bp_cd_return_true',
    'bp_cd_add',
    'bp_cd_return_false'
  ]
};
