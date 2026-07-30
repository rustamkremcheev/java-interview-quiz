import { Mission } from '../../../types/mission';

export const mission3: Mission = {
  id: 'concurrenthashmap-mutable-key-myth',
  topicId: 'hashmap',
  topicTitle: {
    en: 'Java Core: HashMap & Immutability',
    ru: 'Java Core: HashMap и неизменяемость'
  },
  title: {
    en: 'Mission 3: The Concurrent Fix That Did Not Fix It',
    ru: 'Миссия 3: Потокобезопасный "фикс", который ничего не починил'
  },
  subtitle: {
    en: 'Thread safety vs Key hash stability in ConcurrentHashMap',
    ru: 'Потокобезопасность против стабильности хэша ключа в ConcurrentHashMap'
  },
  description: {
    en: 'Deconstruct a common senior candidate misconception: swapping HashMap with ConcurrentHashMap to solve mutable key corruption.',
    ru: 'Разберите распространенное заблуждение кандидатов: замена HashMap на ConcurrentHashMap для решения проблемы изменяемых ключей.'
  },
  estimatedMinutes: 14,
  concepts: ['thread-safety-vs-correctness', 'concurrenthashmap', 'mutable-key', 'atomicity'],
  stages: [
    {
      stageId: 'm3-s1',
      type: 'scenario',
      title: { en: '1. Production Scenario', ru: '1. Сценарий на продакшене' },
      hints: [],
      content: {
        scenarioTitle: {
          en: 'The Misguided Concurrency Refactoring',
          ru: 'Ошибочный рефакторинг потокобезопасности'
        },
        scenarioStory: {
          en: `Following the disappearing payment incident (Mission 1), a junior-mid engineer filed a pull request:

"Replaced HashMap with ConcurrentHashMap to guarantee thread-safe lookups and prevent key corruption in multi-threaded payment processing."

The PR was merged. However, 24 hours later, reconciliation alerts flared up again with identical disappearing key symptoms! Why didn't ConcurrentHashMap solve it?`,
          ru: `После инцидента с исчезновением платежей (Миссия 1), разработчик отправляет PR:

"Заменил HashMap на ConcurrentHashMap для обеспечения потокобезопасного поиска и предотвращения порчи ключей при многопоточной обработке."

PR смержили. Однако через 24 часа алерты сверки снова вспыхнули с абсолютно теми же симптомами исчезновения ключей! Почему ConcurrentHashMap не помог?`
        },
        scenarioContext: {
          en: 'Your task: Explain the crucial distinction between thread safety (concurrency control) and logical equality/hash stability.',
          ru: 'Ваша задача: Объяснить ключевое различие между потокобезопасностью (контролем конкурентности) и логическим равенством/стабильностью хэша.'
        }
      }
    },
    {
      stageId: 'm3-s2',
      type: 'primer',
      title: { en: '2. Concept Primer', ru: '2. Базовый конспект' },
      hints: [],
      content: {
        primerTitle: {
          en: 'Thread Safety vs Key Hash Stability',
          ru: 'Потокобезопасность против стабильности хэша'
        },
        primerSummary: {
          en: `1. **What ConcurrentHashMap Guarantees**:
- Thread safety without blocking the entire table (synchronized segments or CAS / volatile table nodes).
- Safe concurrent reading and writing without corruption of internal table data structures (no infinite loops or missing link pointers).

2. **What ConcurrentHashMap DOES NOT Guarantee**:
- It CANNOT fix broken key logic or mutated hashCode!
- If a key object mutates its internal state after insertion, \`ConcurrentHashMap.get(key)\` evaluates key.hashCode() dynamically, derives a different bucket, and returns null just like standard HashMap!`,
          ru: `1. **Что гарантирует ConcurrentHashMap**:
- Потокобезопасность без блокировки всей таблицы (сегменты или CAS / volatile узлы).
- Безопасное параллельное чтение и запись без повреждения внутренних структур таблицы (без бесконечных циклов или потерянных указателей).

2. **Что ConcurrentHashMap НЕ гарантирует**:
- Он НЕ МОЖЕТ исправить сломанную логику ключа или измененный hashCode!
- Если объект ключа меняет состояние после вставки, \`ConcurrentHashMap.get(key)\` динамически вычисляет key.hashCode(), получает другой бакет и возвращает null точно так же, как стандартный HashMap!`
        },
        primerDiagramSteps: [
          {
            title: { en: 'ConcurrentHashMap', ru: 'ConcurrentHashMap' },
            desc: { en: 'Provides lock-free / fine-grained thread safe table access.', ru: 'Обеспечивает потокобезопасный доступ к таблице без блокировок.' }
          },
          {
            title: { en: 'Mutable Key', ru: 'Изменяемый ключ' },
            desc: { en: 'Key state changes -> hashCode changes -> Bucket lookup mismatch.', ru: 'Состояние меняется -> hashCode меняется -> Рассогласование бакетов.' }
          },
          {
            title: { en: 'Conclusion', ru: 'Вывод' },
            desc: { en: 'ConcurrentHashMap cannot magically protect key hash stability!', ru: 'ConcurrentHashMap не может волшебным образом защитить стабильность хэша ключа!' }
          }
        ]
      }
    },
    {
      stageId: 'm3-s3',
      type: 'puzzle',
      title: { en: '3. Guided Causal Chain Puzzle', ru: '3. Пазл причинно-следственной связи' },
      hints: [
        { en: 'Does ConcurrentHashMap intercept property mutations on key objects?', ru: 'Перехватывает ли ConcurrentHashMap изменение свойств объектов-ключей?' }
      ],
      content: {
        puzzleInstruction: {
          en: 'Build the causal chain explaining why ConcurrentHashMap failed to fix the key mutation bug.',
          ru: 'Постройте цепочку причинно-следственной связи, объясняющую, почему ConcurrentHashMap не решил проблему изменения ключа.'
        },
        puzzleItems: [
          {
            id: 'step-1',
            text: {
              en: 'Mutable key is inserted into ConcurrentHashMap under Bucket #2.',
              ru: 'Изменяемый ключ вставляется в ConcurrentHashMap в Бакет #2.'
            },
            correctOrder: 1
          },
          {
            id: 'step-2',
            text: {
              en: 'Thread B mutates key property (e.g. status).',
              ru: 'Поток B меняет свойство ключа (например, статус).'
            },
            correctOrder: 2
          },
          {
            id: 'step-3',
            text: {
              en: 'Thread C calls ConcurrentHashMap.get(key).',
              ru: 'Поток C вызывает ConcurrentHashMap.get(key).'
            },
            correctOrder: 3
          },
          {
            id: 'step-4',
            text: {
              en: 'ConcurrentHashMap executes mutated key.hashCode() and routes to Bucket #7.',
              ru: 'ConcurrentHashMap выполняет измененный key.hashCode() и идет в Бакет #7.'
            },
            correctOrder: 4
          },
          {
            id: 'step-5',
            text: {
              en: 'Lookup fails with null despite ConcurrentHashMap thread safety.',
              ru: 'Поиск возвращает null, несмотря на потокобезопасность ConcurrentHashMap.'
            },
            correctOrder: 5
          },
          {
            id: 'distractor-1',
            text: {
              en: 'ConcurrentHashMap throws ConcurrentModificationException when keys mutate.',
              ru: 'ConcurrentHashMap выбрасывает ConcurrentModificationException при изменении ключей.'
            },
            isDistractor: true
          }
        ]
      }
    },
    {
      stageId: 'm3-s4',
      type: 'bughunt',
      title: { en: '4. Bug Hunt Challenge', ru: '4. Поиск бага в коде' },
      hints: [],
      content: {
        bugHuntInstruction: {
          en: 'Identify the false assumption in this refactored code snippet.',
          ru: 'Найдите ложное предположение в этом фрагменте рефакторинга.'
        },
        bugHuntCode: `public class PaymentService {
    // Supposed fix by using ConcurrentHashMap
    private final Map<MutablePaymentKey, Payment> cache = new ConcurrentHashMap<>();

    public void process(MutablePaymentKey key, Payment payment) {
        cache.put(key, payment);
        key.setStatus("PROCESSED"); // MUTATION STILL OCCURS!
    }
}`,
        bugHuntLines: [
          { lineNumber: 3, code: '    private final Map<MutablePaymentKey, Payment> cache = new ConcurrentHashMap<>();', isBug: true, explanation: { en: 'FALSE FIX: ConcurrentHashMap does not solve key mutation corruption.', ru: 'ЛОЖНЫЙ ФИКС: ConcurrentHashMap не решает проблему порчи из-за изменения ключей.' } },
          { lineNumber: 7, code: '        key.setStatus("PROCESSED"); // MUTATION STILL OCCURS!', isBug: true, explanation: { en: 'CRITICAL BUG: Mutating key after put corrupts hash bucket lookup!', ru: 'КРИТИЧЕСКИЙ БАГ: Изменение ключа после put портит поиск по бакетам!' } }
        ]
      }
    },
    {
      stageId: 'm3-s5',
      type: 'fixbuilder',
      title: { en: '5. Fix Builder Challenge', ru: '5. Конструктор исправления' },
      hints: [],
      content: {
        fixBuilderInstruction: {
          en: 'Select the TRUE solution for concurrent caching with key integrity.',
          ru: 'Выберите ИСТИННОЕ решение для потокобезопасного кэширования с целостностью ключей.'
        },
        fixOptions: [
          {
            id: 'fix-1',
            text: {
              en: 'Use ConcurrentHashMap TOGETHER WITH strictly immutable keys (e.g. Java 17 records).',
              ru: 'Использовать ConcurrentHashMap ВМЕСТЕ со строго неизменяемыми ключами (например, Java 17 records).'
            },
            isCorrect: true,
            explanation: { en: 'Combines thread-safe map operations with guaranteed key hash stability.', ru: 'Объединяет потокобезопасные операции мапы с гарантированной стабильностью хэша ключей.' }
          },
          {
            id: 'fix-2',
            text: {
              en: 'Wrap HashMap in Collections.synchronizedMap() without fixing key immutability.',
              ru: 'Обернуть HashMap в Collections.synchronizedMap() без исправления неизменяемости ключа.'
            },
            isCorrect: false,
            explanation: { en: 'Incorrect: Synchronization does not fix hashCode stability.', ru: 'Неверно: Синхронизация не исправляет стабильность hashCode.' }
          }
        ]
      }
    },
    {
      stageId: 'm3-s6',
      type: 'tradeoff',
      title: { en: '6. Senior Engineering Trade-Off', ru: '6. Архитектурный компромисс' },
      hints: [],
      content: {
        tradeOffQuestion: {
          en: 'What is the primary difference between ConcurrentHashMap and Collections.synchronizedMap() under high concurrency?',
          ru: 'В чем главное отличие ConcurrentHashMap от Collections.synchronizedMap() при высокой нагрузке?'
        },
        tradeOffOptions: [
          {
            id: 'to-1',
            text: {
              en: 'ConcurrentHashMap uses fine-grained bucket locks (or CAS operations) allowing concurrent reads/writes; synchronizedMap locks the entire map instance on every operation.',
              ru: 'ConcurrentHashMap использует гранулированные блокировки бакетов (или CAS), допуская параллельные чтения/записи; synchronizedMap блокирует всю мапу целиком на каждую операцию.'
            },
            isCorrect: true,
            feedback: { en: 'Correct: SynchronizedMap creates a severe thread contention bottleneck under high concurrency.', ru: 'Верно: SynchronizedMap создает узкое место и борьбу потоков при высокой нагрузке.' }
          }
        ]
      }
    },
    {
      stageId: 'm3-s7',
      type: 'interview',
      title: { en: '7. Senior Interview Challenge', ru: '7. Интервью-ответ (Senior)' },
      hints: [],
      content: {
        interviewQuestion: {
          en: 'Interviewer: "Can replacing HashMap with ConcurrentHashMap solve key lookup failures caused by mutable key fields? Why or why not?"',
          ru: 'Интервьюер: "Может ли замена HashMap на ConcurrentHashMap решить проблему сбоев поиска из-за изменяемых полей ключа? Почему да или нет?"'
        },
        expectedConcepts: [
          {
            id: 'thread-safety-vs-correctness',
            label: { en: 'Thread Safety vs Key Correctness', ru: 'Потокобезопасность против корректности ключа' },
            keywords: ['thread safety', 'concurrency', 'correctness', 'different concerns', 'потокобезопасность']
          },
          {
            id: 'concurrenthashmap-mechanics',
            label: { en: 'ConcurrentHashMap Bucket Mechanics', ru: 'Механика бакетов ConcurrentHashMap' },
            keywords: ['concurrenthashmap', 'bucket', 'hashcode', 'recalculate', 'null']
          },
          {
            id: 'immutability-requirement',
            label: { en: 'Immutability Requirement', ru: 'Требование неизменяемости' },
            keywords: ['immutable', 'record', 'final fields', 'неизменяемость']
          }
        ]
      }
    },
    {
      stageId: 'm3-s8',
      type: 'reference',
      title: { en: '8. Reference Model Answer', ru: '8. Эталонный ответ' },
      hints: [],
      content: {
        referenceShortAnswer: {
          en: '"No. ConcurrentHashMap addresses thread safety and concurrency control; it does not protect against logical key corruption. If a key object mutates after insertion, its hashCode changes. When get() is invoked, ConcurrentHashMap re-evaluates the key\'s hashCode and computes a new bucket index, resulting in lookup failure regardless of map thread safety. To fix lookup failures, keys must be made strictly immutable regardless of which Map implementation is used."',
          ru: '"Нет. ConcurrentHashMap решает задачи потокобезопасности и контроля конкурентности; он не защищает от порчи логики ключа. Если объект ключа меняется после вставки, его hashCode меняется. При вызове get() ConcurrentHashMap заново вычисляет hashCode ключа и рассчитывает новый индекс бакета, что приводит к сбою поиска независимо от потокобезопасности мапы. Чтобы исправить сбои поиска, ключи должны быть строго неизменяемыми независимо от используемой реализации Map."'
        },
        referenceDetailedAnswer: {
          en: 'Senior takeaway: Concurrency abstractions solve race conditions; domain immutability solves identity integrity.',
          ru: 'Инсайт Senior: Абстракции конкурентности решают состояние гонки; неизменяемость домена решает целостность идентичности.'
        },
        commonMistake: {
          en: 'Confusing thread safety with logical immutability.',
          ru: 'Путаница между потокобезопасностью и логической неизменяемостью.'
        },
        followUpQuestion: {
          en: 'Interviewer: "How does ConcurrentHashMap achieve lock-free reads in Java 8+?"',
          ru: 'Интервьюер: "Как ConcurrentHashMap достигает чтения без блокировок в Java 8+?"'
        },
        followUpModelAnswer: {
          en: '"By using volatile node references (`val` and `next` pointers are volatile) and lock-free CAS (Compare-And-Swap) operations for bucket insertion, falling back to synchronized on individual bucket head nodes during collisions."',
          ru: '"Путем использования volatile ссылок на узлы (указатели `val` и `next` объявлены как volatile) и операций CAS (Compare-And-Swap) без блокировок для вставки в бакет, возвращаясь к блокировке synchronized на головном узле бакета только при коллизиях."'
        },
        modelJavaCode: `// Robust Concurrent Cache
public class ThreadSafeCache<K, V> {
    private final ConcurrentHashMap<K, V> map = new ConcurrentHashMap<>();

    public void put(K key, V value) {
        // Enforce key immutability at design time (e.g. record type K)
        map.put(Objects.requireNonNull(key), Objects.requireNonNull(value));
    }
}`
      }
    },
    {
      stageId: 'm3-s9',
      type: 'reflection',
      title: { en: '9. Production Rule Reflection', ru: '9. Производственное правило' },
      hints: [],
      content: {
        reflectionPrompt: {
          en: 'State the rule for distinguishing concurrency fixes from immutability fixes.',
          ru: 'Сформулируйте правило разграничения фиксов конкурентности и фиксов неизменяемости.'
        }
      }
    },
    {
      stageId: 'm3-s10',
      type: 'results',
      title: { en: '10. Mission Results & XP', ru: '10. Итоги миссии и XP' },
      hints: [],
      content: {}
    }
  ]
};
