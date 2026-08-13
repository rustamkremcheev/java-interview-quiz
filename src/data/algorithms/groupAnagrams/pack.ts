import { AlgorithmWorkshopPack } from '../../../types/algorithmLab';
import { buildMosaicResolver } from '../shared/buildMosaicResolver';
import { standardWorkshopStages } from '../shared/standardStages';

const PROBLEM_ID = 'alg_group_anagrams';
const TARGET_STRATEGY_ID = 'strat_ga_sorted_key';
const SOLUTION_ID = 'sol_group_anagrams_sorted_key';
const MOSAIC_ID = 'mos_ga_sorted_key';

const GROUP_ANAGRAMS_SOLUTIONS = [
  {
    id: SOLUTION_ID,
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    version: 1,
    language: 'JAVA' as const,
    javaVersion: '17',
    timeComplexity: 'O(n · k log k)',
    spaceComplexity: 'O(n · k)',
    explanation: {
      en: 'Canonical key = sorted characters of each word; HashMap buckets words that share a key.',
      ru: 'Канонический ключ = отсортированные символы слова; HashMap группирует слова с одним ключом.'
    },
    canonicalCode: `
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String word : strs) {
        char[] chars = word.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(word);
    }
    return new ArrayList<>(groups.values());
}
`.trim()
  }
];

const GROUP_ANAGRAMS_DISTRACTORS = [
  {
    id: 'mos_ga_d_freq',
    code: 'int[] freq = new int[26];',
    indent: 2,
    role: 'DISTRACTOR_STRATEGY' as const,
    explanation: {
      en: 'Frequency-vector keys are a valid alternative strategy, not this sorted-key mosaic.',
      ru: 'Ключи из вектора частот — валидная альтернатива, не эта мозаика sorted-key.'
    }
  },
  {
    id: 'mos_ga_d_sort_word',
    code: 'Arrays.sort(strs);',
    indent: 1,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Sorting the array of words does not group anagrams; sort each word’s characters.',
      ru: 'Сортировка массива слов не группирует анаграммы; сортируйте символы каждого слова.'
    }
  },
  {
    id: 'mos_ga_d_put_blind',
    code: 'groups.put(key, List.of(word));',
    indent: 2,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Blind put replaces the list and drops earlier words in the group.',
      ru: 'Слепой put заменяет список и теряет ранее добавленные слова группы.'
    }
  },
  {
    id: 'mos_ga_d_compile',
    code: 'Map<String, List<String>> groups = new HashMap<String, String>();',
    indent: 1,
    role: 'DISTRACTOR_COMPILE' as const,
    explanation: {
      en: 'Value type must be List<String>, not String.',
      ru: 'Тип значения должен быть List<String>, не String.'
    }
  },
  {
    id: 'mos_ga_d_return_keys',
    code: 'return new ArrayList<>(groups.keySet());',
    indent: 1,
    role: 'DISTRACTOR_LOGIC' as const,
    explanation: {
      en: 'Must return the grouped word lists (values), not the sorted keys.',
      ru: 'Нужно вернуть списки слов (values), не отсортированные ключи.'
    }
  },
  {
    id: 'mos_ga_d_invariant',
    code: 'if (word.isEmpty()) { continue; }',
    indent: 2,
    role: 'DISTRACTOR_EDGE_CASE' as const,
    explanation: {
      en: 'Empty strings are valid anagrams of each other and should still be grouped.',
      ru: 'Пустые строки — валидные анаграммы друг друга и должны группироваться.'
    }
  },
  {
    id: 'mos_ga_d_irrelevant',
    code: 'word = word.toLowerCase();',
    indent: 2,
    role: 'DISTRACTOR_IRRELEVANT' as const,
    explanation: {
      en: 'Case folding is not part of the classic statement (inputs are usually lowercase).',
      ru: 'Приведение регистра не входит в классическое условие (обычно уже lowercase).'
    }
  }
];

const mosaicAlternativeNote = {
  en: 'Frequency-count key (26-int signature) avoids k log k sort per word; same HashMap grouping idea.',
  ru: 'Ключ из частот (сигнатура 26 int) избегает k log k сортировки на слово; та же идея группировки HashMap.'
};

export const GROUP_ANAGRAMS_PACK: AlgorithmWorkshopPack = {
  problem: {
    id: PROBLEM_ID,
    slug: 'group-anagrams',
    title: { en: 'Group Anagrams', ru: 'Группировка Анаграмм' },
    summary: {
      en: 'Group words that are anagrams of each other using a canonical key.',
      ru: 'Сгруппировать слова-анаграммы с помощью канонического ключа.'
    },
    statement: {
      en: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word formed by rearranging the letters of another word, using all original letters exactly once.',
      ru: 'Дан массив строк `strs`. Сгруппируйте анаграммы вместе. Порядок ответа любой. Анаграмма — слово, полученное перестановкой букв другого слова с использованием всех исходных букв ровно один раз.'
    },
    examples: [
      {
        id: 'ex_ga_1',
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: {
          en: 'Three anagram families; group order may vary.',
          ru: 'Три семейства анаграмм; порядок групп может различаться.'
        }
      },
      {
        id: 'ex_ga_2',
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: {
          en: 'Single empty string forms its own group.',
          ru: 'Одна пустая строка образует свою группу.'
        }
      },
      {
        id: 'ex_ga_3',
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: {
          en: 'Trivial single-letter group.',
          ru: 'Тривиальная группа из одной буквы.'
        }
      }
    ],
    constraints: [
      {
        id: 'c_ga_1',
        text: {
          en: '`1 <= strs.length <= 10^4` typically.',
          ru: '`1 <= strs.length <= 10^4` обычно.'
        }
      },
      {
        id: 'c_ga_2',
        text: {
          en: '`0 <= strs[i].length <= 100` — empty strings allowed.',
          ru: '`0 <= strs[i].length <= 100` — пустые строки допустимы.'
        }
      },
      {
        id: 'c_ga_3',
        text: {
          en: 'Characters are usually lowercase English letters in the classic statement.',
          ru: 'В классической формулировке символы обычно — строчные английские буквы.'
        }
      }
    ],
    patternFamilyId: 'pat_hashing',
    difficulty: 'MEDIUM',
    estimatedMinutes: 30,
    stages: standardWorkshopStages('ga', {
      STRATEGY: {
        en: 'Compare keying strategies; this workshop continues with sorted-string HashMap keys.',
        ru: 'Сравните стратегии ключей; воркшоп продолжается HashMap с sorted-string ключами.'
      },
      BLUEPRINT: {
        en: 'Assemble conceptual grouping blocks before Java syntax.',
        ru: 'Соберите концептуальные блоки группировки до синтаксиса Java.'
      },
      TRACE: {
        en: 'Watch how each word’s sorted key lands in a HashMap bucket.',
        ru: 'Наблюдайте, как sorted-ключ каждого слова попадает в bucket HashMap.'
      }
    }),
    availability: 'AVAILABLE',
    provenanceNote: {
      en: 'Common public interview-style hashing problem for teaching canonical keys. No company attribution.',
      ru: 'Распространённая публичная interview-задача на хэширование для обучения каноническим ключам. Без атрибуции компании.'
    }
  },
  clarify: [
    {
      id: 'cq_ga_order',
      prompt: {
        en: 'Does the order of groups (or words inside a group) matter?',
        ru: 'Важен ли порядок групп (или слов внутри группы)?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ga_order_any',
          text: { en: 'Any order is acceptable', ru: 'Любой порядок допустим' },
          isCorrect: true,
          feedback: {
            en: 'Correct. HashMap iteration order is fine for the classic ask.',
            ru: 'Верно. Порядок итерации HashMap подходит для классического запроса.'
          }
        },
        {
          id: 'cq_ga_order_sorted',
          text: { en: 'Groups must be lexicographically sorted', ru: 'Группы должны быть лексикографически отсортированы' },
          isCorrect: false,
          feedback: {
            en: 'Not required unless a follow-up asks for sorted output.',
            ru: 'Не требуется, пока follow-up не попросит отсортированный вывод.'
          }
        }
      ]
    },
    {
      id: 'cq_ga_empty',
      prompt: {
        en: 'Are empty strings valid inputs / anagrams?',
        ru: 'Допустимы ли пустые строки как вход / анаграммы?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ga_empty_yes',
          text: {
            en: 'Yes — empty strings group together under the empty key',
            ru: 'Да — пустые строки группируются под пустым ключом'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. Do not skip empty words.',
            ru: 'Верно. Не пропускайте пустые слова.'
          }
        },
        {
          id: 'cq_ga_empty_no',
          text: { en: 'No — ignore empty strings', ru: 'Нет — игнорировать пустые строки' },
          isCorrect: false,
          feedback: {
            en: 'Empty strings must appear in the output grouping.',
            ru: 'Пустые строки должны появиться в группировке ответа.'
          }
        }
      ]
    },
    {
      id: 'cq_ga_key',
      prompt: {
        en: 'What property must two words share to be grouped?',
        ru: 'Какое свойство должны разделять два слова, чтобы попасть в одну группу?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ga_key_same',
          text: {
            en: 'The same multiset of characters (same canonical signature)',
            ru: 'Одно и то же мультимножество символов (одна каноническая сигнатура)'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. Sorting letters (or a frequency vector) builds that signature.',
            ru: 'Верно. Сортировка букв (или вектор частот) строит эту сигнатуру.'
          }
        },
        {
          id: 'cq_ga_key_prefix',
          text: { en: 'They share a common prefix', ru: 'Они имеют общий префикс' },
          isCorrect: false,
          feedback: {
            en: 'Prefixes are unrelated to anagram equality.',
            ru: 'Префиксы не связаны с равенством анаграмм.'
          }
        }
      ]
    },
    {
      id: 'cq_ga_mutate',
      prompt: {
        en: 'Must the original word strings remain unchanged in the output lists?',
        ru: 'Должны ли исходные строки слов остаться неизменными в списках ответа?'
      },
      multiSelect: false,
      options: [
        {
          id: 'cq_ga_mutate_yes',
          text: {
            en: 'Yes — return the original words; only the key uses a sorted copy',
            ru: 'Да — возвращать исходные слова; sorted-копия только для ключа'
          },
          isCorrect: true,
          feedback: {
            en: 'Correct. Sort a char[] copy to build the key; add the original word to the list.',
            ru: 'Верно. Сортируйте копию char[] для ключа; в список добавляйте исходное слово.'
          }
        },
        {
          id: 'cq_ga_mutate_sorted',
          text: { en: 'No — store the sorted form of each word', ru: 'Нет — хранить отсортированную форму каждого слова' },
          isCorrect: false,
          feedback: {
            en: 'Output should contain the original strings from the input.',
            ru: 'В ответе должны быть исходные строки из входа.'
          }
        }
      ]
    }
  ],
  strategies: [
    {
      id: 'strat_ga_pairwise',
      problemId: PROBLEM_ID,
      title: { en: 'Pairwise anagram checks', ru: 'Попарные проверки анаграмм' },
      description: {
        en: 'Compare every word to every other with sorting or counting; cluster manually.',
        ru: 'Сравнивать каждое слово с каждым через sort/count; кластеризовать вручную.'
      },
      timeClass: 'O(n² · k log k)',
      spaceClass: 'O(n · k)',
      importantConstraint: {
        en: 'Too slow once n grows to 10^4.',
        ru: 'Слишком медленно при n до 10^4.'
      },
      viability: 'VALID_SUBOPTIMAL',
      costBadges: ['QUADRATIC_TIME'],
      justificationChips: [
        { en: 'No hash map needed', ru: 'Hash map не нужен' }
      ],
      unlocksBlueprint: false
    },
    {
      id: TARGET_STRATEGY_ID,
      problemId: PROBLEM_ID,
      title: { en: 'Sorted-string HashMap key', ru: 'HashMap-ключ из sorted-строки' },
      description: {
        en: 'For each word, sort its characters to form a key and append the word to that bucket.',
        ru: 'Для каждого слова отсортировать символы в ключ и добавить слово в соответствующий bucket.'
      },
      timeClass: 'O(n · k log k)',
      spaceClass: 'O(n · k)',
      importantConstraint: {
        en: 'Key construction cost is dominated by sorting each word of length k.',
        ru: 'Стоимость ключа доминируется сортировкой каждого слова длины k.'
      },
      viability: 'TARGET',
      costBadges: ['EXTRA_MEMORY'],
      justificationChips: [
        { en: 'Canonical signature via sort', ru: 'Каноническая сигнатура через sort' },
        { en: 'Simple HashMap grouping', ru: 'Простая группировка HashMap' },
        { en: 'Interview-friendly', ru: 'Удобно на интервью' }
      ],
      unlocksBlueprint: true
    },
    {
      id: 'strat_ga_freq',
      problemId: PROBLEM_ID,
      title: { en: 'Frequency-vector key', ru: 'Ключ из вектора частот' },
      description: {
        en: 'Build a 26-count signature (or similar) as the map key instead of sorting.',
        ru: 'Строить сигнатуру из 26 счётчиков (или аналог) как ключ map вместо сортировки.'
      },
      timeClass: 'O(n · k)',
      spaceClass: 'O(n · k)',
      importantConstraint: {
        en: 'Faster per word when alphabet is small and fixed.',
        ru: 'Быстрее на слово при маленьком фиксированном алфавите.'
      },
      viability: 'VALID_ALTERNATIVE',
      costBadges: ['EXTRA_MEMORY', 'RANGE_DEPENDENT'],
      justificationChips: [
        { en: 'Avoid k log k sort', ru: 'Избежать k log k sort' },
        { en: 'Alphabet-dependent', ru: 'Зависит от алфавита' }
      ],
      unlocksBlueprint: false
    },
    {
      id: 'strat_ga_prime',
      problemId: PROBLEM_ID,
      title: { en: 'Prime-product fingerprint', ru: 'Отпечаток произведением простых' },
      description: {
        en: 'Map letters to primes and multiply — collision/overflow risks make it fragile.',
        ru: 'Сопоставить буквы простым и перемножить — риск коллизий/переполнения делает подход хрупким.'
      },
      timeClass: 'O(n · k)',
      spaceClass: 'O(n)',
      importantConstraint: {
        en: 'Not safe for interview correctness without big integers.',
        ru: 'Небезопасно для корректности на интервью без big integers.'
      },
      viability: 'CONDITIONAL',
      costBadges: ['RANGE_DEPENDENT'],
      justificationChips: [
        { en: 'Clever but fragile', ru: 'Умно, но хрупко' }
      ],
      unlocksBlueprint: false
    }
  ],
  targetStrategyId: TARGET_STRATEGY_ID,
  blueprint: {
    id: 'bp_ga_sorted_key',
    problemId: PROBLEM_ID,
    strategyId: TARGET_STRATEGY_ID,
    nodes: [
      {
        id: 'bp_ga_map',
        label: { en: 'Create empty map from key → list of words', ru: 'Создать пустую map ключ → список слов' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ga_loop',
        label: { en: 'Iterate each word in the input', ru: 'Пройти по каждому слову входа' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ga_key',
        label: {
          en: 'Build canonical key by sorting the word’s characters',
          ru: 'Построить канонический ключ сортировкой символов слова'
        },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ga_add',
        label: { en: 'Append the original word to that key’s list', ru: 'Добавить исходное слово в список этого ключа' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ga_return',
        label: { en: 'Return all lists from the map', ru: 'Вернуть все списки из map' },
        role: 'REQUIRED'
      },
      {
        id: 'bp_ga_d_sort_array',
        label: { en: 'Sort the array of words lexicographically', ru: 'Отсортировать массив слов лексикографически' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'Sorting words does not place anagrams next to each other reliably (e.g. eat vs tea).',
          ru: 'Сортировка слов не ставит анаграммы рядом надёжно (напр. eat vs tea).'
        }
      },
      {
        id: 'bp_ga_d_compare_all',
        label: { en: 'Compare every pair of words directly', ru: 'Напрямую сравнить каждую пару слов' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'Pairwise clustering is another strategy and not this map-key flow.',
          ru: 'Попарная кластеризация — другая стратегия, не этот поток map-ключей.'
        }
      },
      {
        id: 'bp_ga_d_store_key',
        label: { en: 'Store only the sorted keys as the answer', ru: 'Хранить в ответе только отсортированные ключи' },
        role: 'DISTRACTOR',
        distractorExplanation: {
          en: 'The answer must be groups of original words, not the keys.',
          ru: 'Ответ — группы исходных слов, не ключи.'
        }
      }
    ],
    solutionOrder: ['bp_ga_map', 'bp_ga_loop', 'bp_ga_key', 'bp_ga_add', 'bp_ga_return']
  },
  solutions: GROUP_ANAGRAMS_SOLUTIONS,
  distractors: GROUP_ANAGRAMS_DISTRACTORS,
  mosaicId: MOSAIC_ID,
  mosaicAlternativeNote,
  mosaicSuccessMessage: {
    en: 'Mosaic complete. Sorted char key → HashMap buckets → list of groups.',
    ru: 'Мозаика собрана. Sorted char ключ → bucket-ы HashMap → список групп.'
  },
  blueprintHelp: {
    en: 'Assemble canonical-key grouping blocks. Java is still hidden.',
    ru: 'Соберите блоки группировки по каноническому ключу. Java ещё скрыт.'
  },
  blueprintSuccessMessage: {
    en: 'Blueprint correct: map → loop → sorted key → append word → return values.',
    ru: 'Чертёж верен: map → цикл → sorted ключ → добавить слово → вернуть values.'
  },
  resolveMosaic: buildMosaicResolver({
    mosaicId: MOSAIC_ID,
    solutions: GROUP_ANAGRAMS_SOLUTIONS,
    distractors: GROUP_ANAGRAMS_DISTRACTORS,
    alternativeNote: mosaicAlternativeNote,
    targetStrategyId: TARGET_STRATEGY_ID
  }),
  trace: {
    id: 'tr_ga_main',
    problemId: PROBLEM_ID,
    kind: 'HASH_STATE',
    label: { en: 'Primary trace', ru: 'Основная трассировка' },
    inputSummary: {
      en: 'strs = ["eat","tea","tan","ate","nat","bat"]',
      ru: 'strs = ["eat","tea","tan","ate","nat","bat"]'
    },
    steps: [
      {
        id: 'tr_ga_0',
        title: { en: 'Word "eat"', ru: 'Слово "eat"' },
        narrative: {
          en: 'Sort characters of eat → key "aet". Start a new group.',
          ru: 'Сортировка символов eat → ключ "aet". Новая группа.'
        },
        state: { word: 'eat', key: 'aet', groups: '{aet=[eat]}' },
        question: {
          en: 'What is the map key for "eat"?',
          ru: 'Какой ключ map у "eat"?'
        },
        choices: [
          { id: 'aet', text: { en: '"aet"', ru: '"aet"' } },
          { id: 'eat', text: { en: '"eat" (unchanged)', ru: '"eat" (без изменений)' } }
        ],
        correctChoiceId: 'aet',
        feedbackCorrect: {
          en: 'Sorting letters yields the canonical key aet.',
          ru: 'Сортировка букв даёт канонический ключ aet.'
        },
        feedbackIncorrect: {
          en: 'Using the raw word as key would never merge anagrams.',
          ru: 'Сырое слово как ключ никогда не объединит анаграммы.'
        }
      },
      {
        id: 'tr_ga_1',
        title: { en: 'Word "tea"', ru: 'Слово "tea"' },
        narrative: {
          en: 'tea also sorts to aet — append to the existing list.',
          ru: 'tea тоже сортируется в aet — добавить в существующий список.'
        },
        state: { word: 'tea', key: 'aet', groups: '{aet=[eat, tea]}' },
        question: {
          en: 'Does "tea" create a new map entry?',
          ru: 'Создаёт ли "tea" новую запись в map?'
        },
        choices: [
          { id: 'no', text: { en: 'No — same key, append to list', ru: 'Нет — тот же ключ, append в список' } },
          { id: 'yes', text: { en: 'Yes — new key "tea"', ru: 'Да — новый ключ "tea"' } }
        ],
        correctChoiceId: 'no',
        feedbackCorrect: {
          en: 'computeIfAbsent finds aet and appends tea.',
          ru: 'computeIfAbsent находит aet и добавляет tea.'
        },
        feedbackIncorrect: {
          en: 'Anagrams share one key; they must share one list.',
          ru: 'Анаграммы делят один ключ; значит один список.'
        }
      },
      {
        id: 'tr_ga_2',
        title: { en: 'Word "tan"', ru: 'Слово "tan"' },
        narrative: {
          en: 'tan sorts to ant — a fresh bucket.',
          ru: 'tan сортируется в ant — новый bucket.'
        },
        state: { word: 'tan', key: 'ant', groups: '{aet=[eat, tea], ant=[tan]}' },
        question: {
          en: 'Why is "tan" not in the aet group?',
          ru: 'Почему "tan" не в группе aet?'
        },
        choices: [
          {
            id: 'sig',
            text: { en: 'Different character multiset → different key', ru: 'Другое мультимножество символов → другой ключ' }
          },
          { id: 'len', text: { en: 'Because it comes later in the array', ru: 'Потому что оно позже в массиве' } }
        ],
        correctChoiceId: 'sig',
        feedbackCorrect: {
          en: 'Keys encode letter multisets; ant ≠ aet.',
          ru: 'Ключи кодируют мультимножества букв; ant ≠ aet.'
        },
        feedbackIncorrect: {
          en: 'Position in the array does not decide grouping.',
          ru: 'Позиция в массиве не определяет группировку.'
        }
      },
      {
        id: 'tr_ga_3',
        title: { en: 'Words "ate", "nat", "bat"', ru: 'Слова "ate", "nat", "bat"' },
        narrative: {
          en: 'ate → aet; nat → ant; bat → abt. Three families complete.',
          ru: 'ate → aet; nat → ant; bat → abt. Три семейства готовы.'
        },
        state: {
          word: 'bat',
          key: 'abt',
          groups: '{aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}'
        },
        question: {
          en: 'What does the method return?',
          ru: 'Что возвращает метод?'
        },
        choices: [
          {
            id: 'values',
            text: { en: 'The map’s values — the three word lists', ru: 'values map — три списка слов' }
          },
          {
            id: 'keys',
            text: { en: 'The keys aet, ant, abt', ru: 'Ключи aet, ant, abt' }
          }
        ],
        correctChoiceId: 'values',
        feedbackCorrect: {
          en: 'new ArrayList<>(groups.values()) yields the grouped original words.',
          ru: 'new ArrayList<>(groups.values()) даёт сгруппированные исходные слова.'
        },
        feedbackIncorrect: {
          en: 'Keys are internal; callers want the lists of original strings.',
          ru: 'Ключи внутренние; вызывающему нужны списки исходных строк.'
        }
      }
    ],
    followUpQuestion: {
      en: 'For strs = ["", "b", ""], how many groups?',
      ru: 'Для strs = ["", "b", ""] сколько групп?'
    },
    followUpChoices: [
      { id: 'two', text: { en: 'Two: ["",""] and ["b"]', ru: 'Две: ["",""] и ["b"]' } },
      { id: 'three', text: { en: 'Three singleton groups', ru: 'Три одиночные группы' } }
    ],
    followUpCorrectChoiceId: 'two',
    followUpFeedbackCorrect: {
      en: 'Both empty strings share the empty key; "b" is alone.',
      ru: 'Обе пустые строки делят пустой ключ; "b" отдельно.'
    },
    followUpFeedbackIncorrect: {
      en: 'Identical empty keys must land in one group.',
      ru: 'Одинаковые пустые ключи должны попасть в одну группу.'
    }
  },
  hints: [
    {
      id: 'hnt_ga_bp_1',
      stageType: 'BLUEPRINT',
      level: 1,
      text: {
        en: 'Anagrams are equal after you normalize letter order — that normalization is your map key.',
        ru: 'Анаграммы равны после нормализации порядка букв — эта нормализация и есть ключ map.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ga_bp_2',
      stageType: 'BLUEPRINT',
      level: 2,
      text: {
        en: 'Reveal first block: Create empty map from key → list of words.',
        ru: 'Открываем первый блок: Создать пустую map ключ → список слов.'
      },
      revealType: 'BLOCK',
      revealTargetId: 'bp_ga_map'
    },
    {
      id: 'hnt_ga_mos_1',
      stageType: 'CODE_MOSAIC',
      level: 1,
      text: {
        en: 'Sort a char[] copy; construct String key; never sort the original String in place.',
        ru: 'Сортируйте копию char[]; соберите String-ключ; не сортируйте исходную String на месте.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ga_mos_2',
      stageType: 'CODE_MOSAIC',
      level: 2,
      text: {
        en: 'computeIfAbsent(key, …) creates the list once, then add(word) appends the original.',
        ru: 'computeIfAbsent(key, …) создаёт список один раз, затем add(word) добавляет оригинал.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ga_tr_1',
      stageType: 'TRACE',
      level: 1,
      text: {
        en: 'eat / tea / ate share key aet; tan / nat share ant; bat is alone under abt.',
        ru: 'eat / tea / ate делят ключ aet; tan / nat — ant; bat один под abt.'
      },
      revealType: 'NONE'
    },
    {
      id: 'hnt_ga_tr_2',
      stageType: 'TRACE',
      level: 2,
      text: {
        en: 'Returning groups.values() — not keySet() — is the final step.',
        ru: 'Финальный шаг — вернуть groups.values(), не keySet().'
      },
      revealType: 'NONE'
    }
  ],
  reflectionPrompt: {
    en: 'When would you prefer a frequency-vector key over sorting each word?',
    ru: 'Когда предпочтительнее ключ из вектора частот, а не сортировка каждого слова?'
  },
  summary: {
    corePattern: {
      en: 'Hashing with canonical keys — map equal signatures to the same bucket.',
      ru: 'Хэширование с каноническими ключами — одинаковые сигнатуры в один bucket.'
    },
    invariant: {
      en: 'After processing a prefix, each map entry holds exactly the input words whose letters match that key.',
      ru: 'После обработки префикса каждая запись map содержит ровно те входные слова, чьи буквы соответствуют ключу.'
    },
    timeComplexity: 'O(n · k log k)',
    spaceComplexity: 'O(n · k)',
    commonMistake: {
      en: 'Putting a fresh singleton list on every word (wiping the group) or returning keys instead of values.',
      ru: 'Кладсть новый singleton-список на каждое слово (затирая группу) или возвращать keys вместо values.'
    },
    recognitionCue: {
      en: '“Group items that are equal under a rearrangement / signature.”',
      ru: '«Сгруппировать элементы, равные с точностью до перестановки / сигнатуры.»'
    }
  }
};
