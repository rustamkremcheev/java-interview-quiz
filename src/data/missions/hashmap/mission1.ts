import { Mission } from '../../../types/mission';

export const mission1: Mission = {
  id: 'hashmap-disappearing-payment',
  topicId: 'hashmap',
  topicTitle: {
    en: 'Java Core: HashMap & Immutability',
    ru: 'Java Core: HashMap и неизменяемость'
  },
  title: {
    en: 'Mission 1: The Disappearing Payment',
    ru: 'Миссия 1: Исчезнувший платеж'
  },
  subtitle: {
    en: 'Mutable HashMap keys causing production lookup failures',
    ru: 'Изменяемые ключи HashMap как причина сбоев поиска на продакшене'
  },
  description: {
    en: 'Investigate why payment records exist in memory during heap dumps but cannot be retrieved using containsKey() or get() after status updates.',
    ru: 'Расследуйте, почему записи платежей существуют в памяти при дампе кучи, но не могут быть получены через containsKey() или get() после обновления статуса.'
  },
  estimatedMinutes: 15,
  concepts: ['hashmap-buckets', 'hashcode-contract', 'mutable-key', 'immutable-key'],
  stages: [
    {
      stageId: 'm1-s1',
      type: 'scenario',
      title: { en: '1. Production Scenario', ru: '1. Сценарий на продакшене' },
      hints: [],
      content: {
        scenarioTitle: {
          en: 'High-Volume Payment Reconciliation Alert',
          ru: 'Алерт сверки высоконагруженного платежного сервиса'
        },
        scenarioStory: {
          en: `At 14:00 UTC during peak volume, the payment reconciliation engine began firing high-severity alerts.

A payment object was created and inserted into a shared \`HashMap<PaymentKey, Payment>\` cache with an initial status of \`PENDING\`. Later, an event listener updated the payment status field to \`COMPLETED\`.

When the reconciliation system attempted to fetch the payment using \`paymentMap.get(key)\` or verify existence using \`paymentMap.containsKey(key)\`, HashMap returned \`null\` and \`false\`. However, inspecting the heap dump revealed that the entry was still physically stored inside the table array!`,
          ru: `В 14:00 UTC во время пиковой нагрузки система сверки платежей начала генерировать алерты высокой важности.

Объект платежа был создан и помещен в общий кэш \`HashMap<PaymentKey, Payment>\` с начальным статусом \`PENDING\`. Позже обработчик событий обновил поле статуса платежа на \`COMPLETED\`.

Когда система сверки попыталась получить платеж через \`paymentMap.get(key)\` или проверить его наличие через \`paymentMap.containsKey(key)\`, HashMap вернул \`null\` и \`false\`. Однако инспекция дампа памяти показала, что запись всё еще физически находится внутри массива таблицы!`
        },
        scenarioContext: {
          en: 'Your task: Diagnose why changing a key field causes the entry to "disappear" from HashMap lookup operations and fix the issue permanently.',
          ru: 'Ваша задача: Выяснить, почему изменение поля ключа приводит к "исчезновению" записи из поиска HashMap, и исправить проблему.'
        }
      }
    },
    {
      stageId: 'm1-s2',
      type: 'primer',
      title: { en: '2. Concept Primer', ru: '2. Базовый конспект' },
      hints: [],
      content: {
        primerTitle: {
          en: 'How HashMap Bucket Routing Works',
          ru: 'Как работает маршрутизация по бакетам в HashMap'
        },
        primerSummary: {
          en: `HashMap stores entries in an internal node array \`Node<K,V>[] table\`.

1. **Insertion**: When \`put(key, value)\` is called, HashMap calls \`key.hashCode()\`, applies a bitwise spread hash function, and calculates the target bucket index: \`index = (table.length - 1) & hash\`. The entry is stored in that specific bucket node.
2. **Key Mutation**: If a key object is mutable and a field participating in \`hashCode()\` changes after insertion, the object remains physically stored in the original bucket index where it was first placed.
3. **Lookup Failure**: When \`get(key)\` or \`containsKey(key)\` is subsequently called, HashMap re-evaluates \`key.hashCode()\`. Because the field value changed, it calculates a DIFFERENT bucket index. HashMap checks that new bucket, finds nothing (or a different node), and returns \`null\`.`,
          ru: `HashMap хранит записи во внутреннем массиве узлов \`Node<K,V>[] table\`.

1. **Вставка**: При вызове \`put(key, value)\` HashMap вызывает \`key.hashCode()\`, применяет функцию сжатия хэша и вычисляет индекс целевого бакета: \`index = (table.length - 1) & hash\`. Запись сохраняется в этом бакете.
2. **Изменение ключа**: Если объект ключа изменяем и поле, участвующее в \`hashCode()\`, меняется после вставки, объект остается физически сохраненным в том бакете, куда был изначально помещен.
3. **Сбой поиска**: При последующем вызове \`get(key)\` или \`containsKey(key)\` HashMap заново вычисляет \`key.hashCode()\`. Поскольку значение поля изменилось, вычисляется ДРУГОЙ индекс бакета. HashMap проверяет этот новый бакет, ничего там не находит (или находит другой узел) и возвращает \`null\`.`
        },
        primerDiagramSteps: [
          {
            title: { en: 'Step 1: put(key, val)', ru: 'Шаг 1: put(key, val)' },
            desc: { en: 'hashCode() = 101 -> Bucket Index #5. Entry stored at Node #5.', ru: 'hashCode() = 101 -> Индекс бакета #5. Запись сохранена в Node #5.' }
          },
          {
            title: { en: 'Step 2: Key field mutates', ru: 'Шаг 2: Поле ключа изменяется' },
            desc: { en: 'key.status = "COMPLETED". Entry remains sitting in Bucket #5.', ru: 'key.status = "COMPLETED". Запись остается лежать в Бакете #5.' }
          },
          {
            title: { en: 'Step 3: get(key)', ru: 'Шаг 3: get(key)' },
            desc: { en: 'hashCode() recalculated = 208 -> Bucket Index #12. Bucket #12 is empty! Returns null.', ru: 'Новый hashCode() = 208 -> Индекс бакета #12. Бакет #12 пуст! Возвращается null.' }
          }
        ]
      }
    },
    {
      stageId: 'm1-s3',
      type: 'puzzle',
      title: { en: '3. Guided Causal Chain Puzzle', ru: '3. Пазл причинно-следственной связи' },
      hints: [
        { en: 'Think about which action happens first when inserting into HashMap.', ru: 'Подумайте, какое действие происходит первым при вставке в HashMap.' },
        { en: 'Does mutating a key field automatically move the entry to a new bucket index in memory?', ru: 'Перемещает ли изменение поля ключа запись в новый бакет памяти автоматически?' },
        { en: 'HashMap recalculates bucket index dynamically on lookup using current field values.', ru: 'HashMap динамически пересчитывает индекс бакета при поиске, используя текущие значения полей.' }
      ],
      content: {
        puzzleInstruction: {
          en: 'Arrange the events into the correct chronological order explaining why the payment lookup failed. Reject distractor cards!',
          ru: 'Расположите события в правильном хронологическом порядке, объясняющем причину сбоя поиска. Отклоните ложные карточки!'
        },
        puzzleItems: [
          {
            id: 'step-1',
            text: {
              en: 'PaymentKey with status="PENDING" is inserted into HashMap.',
              ru: 'PaymentKey со статусом="PENDING" вставляется в HashMap.'
            },
            correctOrder: 1
          },
          {
            id: 'step-2',
            text: {
              en: 'HashMap executes key.hashCode() and stores entry in Bucket #4.',
              ru: 'HashMap выполняет key.hashCode() и сохраняет запись в Бакет #4.'
            },
            correctOrder: 2
          },
          {
            id: 'step-3',
            text: {
              en: 'Payment status is modified from "PENDING" to "COMPLETED".',
              ru: 'Статус платежа меняется с "PENDING" на "COMPLETED".'
            },
            correctOrder: 3
          },
          {
            id: 'step-4',
            text: {
              en: 'key.hashCode() returns a new integer because status participated in hashCode().',
              ru: 'key.hashCode() возвращает новое целое число, так как status участвовал в hashCode().'
            },
            correctOrder: 4
          },
          {
            id: 'step-5',
            text: {
              en: 'get(key) derives Bucket #11 instead of Bucket #4, causing lookup failure.',
              ru: 'get(key) вычисляет Бакет #11 вместо Бакета #4, выпадая в сбой поиска.'
            },
            correctOrder: 5
          },
          {
            id: 'distractor-1',
            text: {
              en: 'HashMap physically moves the entry node to Bucket #11 immediately upon key mutation.',
              ru: 'HashMap физически перемещает узел записи в Бакет #11 сразу при изменении ключа.'
            },
            isDistractor: true
          },
          {
            id: 'distractor-2',
            text: {
              en: 'HashMap automatically triggers rehash() when key property setters are called.',
              ru: 'HashMap автоматически вызывает rehash() при вызове сеттеров свойств ключа.'
            },
            isDistractor: true
          }
        ]
      }
    },
    {
      stageId: 'm1-s4',
      type: 'bughunt',
      title: { en: '4. Bug Hunt Challenge', ru: '4. Поиск бага в коде' },
      hints: [
        { en: 'Look at the class modifiers and field mutability in PaymentKey.', ru: 'Посмотрите на модификаторы класса и изменяемость полей в PaymentKey.' },
        { en: 'Check which fields participate in equals() and hashCode().', ru: 'Проверьте, какие поля участвуют в equals() и hashCode().' }
      ],
      content: {
        bugHuntInstruction: {
          en: 'Select the line(s) in this Java implementation responsible for the key mutation bug.',
          ru: 'Выберите строку(и) в этой реализации Java, ответственную за баг изменения ключа.'
        },
        bugHuntCode: `public class PaymentKey {
    private final String paymentId;
    private String status;

    public PaymentKey(String paymentId, String status) {
        this.paymentId = paymentId;
        this.status = status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentKey that = (PaymentKey) o;
        return Objects.equals(paymentId, that.paymentId) &&
               Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(paymentId, status);
    }
}`,
        bugHuntLines: [
          { lineNumber: 1, code: 'public class PaymentKey {', isBug: false, explanation: { en: 'Class declaration.', ru: 'Декларация класса.' } },
          { lineNumber: 2, code: '    private final String paymentId;', isBug: false, explanation: { en: 'paymentId is immutable (final).', ru: 'paymentId неизменяем (final).' } },
          { lineNumber: 3, code: '    private String status;', isBug: true, explanation: { en: 'CRITICAL BUG: Mutable non-final field used in hashCode() and equals()!', ru: 'КРИТИЧЕСКИЙ БАГ: Изменяемое non-final поле используется в hashCode() и equals()!' } },
          { lineNumber: 4, code: '', isBug: false, explanation: { en: '', ru: '' } },
          { lineNumber: 9, code: '    public void setStatus(String status) {', isBug: true, explanation: { en: 'DANGEROUS SETTER: Allows mutating key state after insertion into HashMap.', ru: 'ОПАСНЫЙ СЕТТЕР: Позволяет менять состояние ключа после вставки в HashMap.' } },
          { lineNumber: 10, code: '        this.status = status;', isBug: true, explanation: { en: 'Mutating status breaks hashCode stability.', ru: 'Изменение статуса ломает стабильность hashCode.' } },
          { lineNumber: 23, code: '    public int hashCode() {', isBug: false, explanation: { en: 'hashCode implementation syntax is valid.', ru: 'Синтаксис реализации hashCode корректен.' } },
          { lineNumber: 24, code: '        return Objects.hash(paymentId, status);', isBug: true, explanation: { en: 'CRITICAL BUG: Participating mutable field status in hash code generation.', ru: 'КРИТИЧЕСКИЙ БАГ: Включение изменяемого поля status в генерацию хэш-кода.' } }
        ]
      }
    },
    {
      stageId: 'm1-s5',
      type: 'fixbuilder',
      title: { en: '5. Fix Builder Challenge', ru: '5. Конструктор исправления' },
      hints: [
        { en: 'Immutable objects make the safest HashMap keys.', ru: 'Неизменяемые объекты являются самыми безопасными ключами HashMap.' },
        { en: 'If key fields must mutate, should those mutable fields be part of equals() and hashCode()?', ru: 'Если поля ключа должны меняться, должны ли они входить в equals() и hashCode()?' }
      ],
      content: {
        fixBuilderInstruction: {
          en: 'Select ALL production-safe solutions and REJECT dangerous quick fixes.',
          ru: 'Выберите ВСЕ безопасные для продакшена решения и ОТКЛОНИТЕ опасные быстрые костыли.'
        },
        fixOptions: [
          {
            id: 'fix-1',
            text: {
              en: 'Make PaymentKey completely immutable (final class, all fields private final, no setters or use Java 17 record).',
              ru: 'Сделать PaymentKey полностью неизменяемым (final класс, все поля private final, без сеттеров или использовать Java 17 record).'
            },
            isCorrect: true,
            explanation: {
              en: 'Best practice: Immutability guarantees that hashCode() remains 100% stable across the entire lifetime of the key.',
              ru: 'Лучшая практика: Неизменяемость гарантирует, что hashCode() остается на 100% стабильным на протяжении всего жизненного цикла ключа.'
            }
          },
          {
            id: 'fix-2',
            text: {
              en: 'Remove mutable field `status` from equals() and hashCode(), leaving only immutable `paymentId`.',
              ru: 'Удалить изменяемое поле `status` из equals() и hashCode(), оставив только неизменяемый `paymentId`.'
            },
            isCorrect: true,
            explanation: {
              en: 'Valid alternative: Equals/hashCode rely exclusively on stable identity fields.',
              ru: 'Допустимый вариант: Equals/hashCode опираются исключительно на стабильные идентифицирующие поля.'
            }
          },
          {
            id: 'fix-3',
            text: {
              en: 'Replace HashMap with ConcurrentHashMap.',
              ru: 'Заменить HashMap на ConcurrentHashMap.'
            },
            isCorrect: false,
            explanation: {
              en: 'INCORRECT: ConcurrentHashMap provides thread safety, NOT key hash stability under field mutation!',
              ru: 'НЕВЕРНО: ConcurrentHashMap обеспечивает потокобезопасность, а НЕ стабильность хэша ключа при изменении его полей!'
            }
          },
          {
            id: 'fix-4',
            text: {
              en: 'Re-execute `map.put(key, value)` immediately every time `key.setStatus()` is invoked.',
              ru: 'Повторно вызывать `map.put(key, value)` сразу при каждом вызове `key.setStatus()`.'
            },
            isCorrect: false,
            explanation: {
              en: 'DANGEROUS: Leaves orphaned phantom entries under old buckets in memory, causing severe memory leaks and race conditions.',
              ru: 'ОПАСНО: Оставляет осиротевшие фантомные записи в старых бакетах памяти, вызывания утечки памяти и состояние гонки.'
            }
          }
        ]
      }
    },
    {
      stageId: 'm1-s6',
      type: 'tradeoff',
      title: { en: '6. Senior Engineering Trade-Off', ru: '6. Архитектурный компромисс' },
      hints: [],
      content: {
        tradeOffQuestion: {
          en: 'In a microservices system using JPA/Hibernate entities as domain keys, how should equality (equals & hashCode) be designed for HashMap compatibility?',
          ru: 'В микросервисной системе с JPA/Hibernate сущностями, как следует проектировать равенство (equals & hashCode) для совместимости с HashMap?'
        },
        tradeOffOptions: [
          {
            id: 'to-1',
            text: {
              en: 'Use a generated Database Primary Key (@GeneratedValue Long id).',
              ru: 'Использовать сгенерированный первичный ключ БД (@GeneratedValue Long id).'
            },
            isCorrect: false,
            feedback: {
              en: 'Risk: Transient entities before entity persist have id=null! Inserting a transient entity into a Set/Map and persisting it later mutates its id from null to non-null, breaking hashCode bucket routing.',
              ru: 'Риск: Несохраненные (transient) сущности до сохранения имеют id=null! Вставка такой сущности в Set/Map с последующим сохранением меняет id с null на число, ломая бакеты HashMap.'
            }
          },
          {
            id: 'to-2',
            text: {
              en: 'Use a immutable Natural Business Key (e.g. UUID, transactionRef, accountNo) generated at object creation time.',
              ru: 'Использовать неизменяемый естественный бизнес-ключ (например, UUID, transactionRef), создаваемый в момент конструирования.'
            },
            isCorrect: true,
            feedback: {
              en: 'RECOMMENDED: Natural business keys exist prior to persistence and remain strictly immutable throughout entity lifecycle, guaranteeing stable hashCode in HashMaps.',
              ru: 'РЕКОМЕНДУЕТСЯ: Естественные бизнес-ключи существуют до сохранения и остаются строго неизменяемыми на протяжении всего цикла жизни сущности.'
            }
          },
          {
            id: 'to-3',
            text: {
              en: 'Include all entity table fields in equals() and hashCode().',
              ru: 'Включать абсолютно все поля таблицы сущности в equals() и hashCode().'
            },
            isCorrect: false,
            feedback: {
              en: 'Antipattern: Any update to any entity field will mutate hashCode and break Map lookups, plus lazy-loaded fields trigger N+1 queries.',
              ru: 'Антипаттерн: Любое обновление любого поля сущности изменит hashCode и сломает поиск в Map, плюс ленивые поля вызовут N+1 запросы.'
            }
          }
        ]
      }
    },
    {
      stageId: 'm1-s7',
      type: 'interview',
      title: { en: '7. Senior Interview Challenge', ru: '7. Интервью-ответ (Senior)' },
      hints: [],
      content: {
        interviewQuestion: {
          en: 'Interviewer: "We observed payments disappearing from our HashMap after status updates. Explain to me what happened at the JVM/HashMap level and how you will resolve it."',
          ru: 'Интервьюер: "Мы заметили, что платежи исчезают из HashMap после обновления статуса. Объясните мне, что произошло на уровне JVM/HashMap и как вы это исправите."'
        },
        expectedConcepts: [
          {
            id: 'mutable-key',
            label: { en: 'Mutable Key Field', ru: 'Изменяемое поле ключа' },
            keywords: ['mutable', 'mutation', 'mutated', 'setter', 'changed field', 'изменяемый']
          },
          {
            id: 'hashcode-changed',
            label: { en: 'hashCode recalculated / changed', ru: 'hashCode изменился' },
            keywords: ['hashcode', 'hash code', 'recalculate', 're-evaluat', 'different hash', 'хэш']
          },
          {
            id: 'bucket-routing',
            label: { en: 'Bucket Index mismatch', ru: 'Несовпадение индекса бакета' },
            keywords: ['bucket', 'index', 'table', 'slot', 'бакет', 'ячейка']
          },
          {
            id: 'immutable-fix',
            label: { en: 'Immutability / Record solution', ru: 'Решение через неизменяемость / Record' },
            keywords: ['immutable', 'final', 'record', 'unmodifiable', 'business key', 'неизменяемый']
          },
          {
            id: 'concurrenthashmap-myth',
            label: { en: 'ConcurrentHashMap does not fix hashCode mutation', ru: 'ConcurrentHashMap не чинит изменение hashCode' },
            keywords: ['concurrenthashmap', 'thread safety', 'not a fix', 'thread-safe']
          }
        ]
      }
    },
    {
      stageId: 'm1-s8',
      type: 'reference',
      title: { en: '8. Reference Model Answer', ru: '8. Эталонный ответ' },
      hints: [],
      content: {
        referenceShortAnswer: {
          en: '"The payment disappeared from lookup because the key object was mutable and its status field participated in hashCode generation. When the status changed from PENDING to COMPLETED, the key\'s hashCode changed. HashMap stored the entry under the original bucket derived during put(), but subsequent get() calls calculated a new bucket index based on the updated status. Because HashMap looked in the wrong bucket, it returned null even though the node remained in memory. The solution is to make key objects strictly immutable using final fields or Java 17 records."',
          ru: '"Платеж исчез при поиске, потому что объект ключа был изменяемым и его поле status участвовало в генерации hashCode. Когда статус изменился с PENDING на COMPLETED, хэш-код ключа изменился. HashMap сохранил запись в исходном бакете, полученном во время put(), но последующие вызовы get() вычисляли новый индекс бакета на основе обновленного статуса. Из-за поиска не в том бакете HashMap вернул null, хотя узел остался в памяти. Решение — сделать объекты ключей строго неизменяемыми с помощью полей final или Java 17 record."'
        },
        referenceDetailedAnswer: {
          en: `### Key Senior Engineering Takeaways:
1. **Entry storage vs Bucket derivation**: HashMap calculates bucket index: \`index = (n - 1) & hash(key)\`. Entry storage is static once placed; key hashCode calculation is dynamic on every invocation.
2. **Memory Leak Hazard**: Mutated keys create phantom references in memory that cannot be garbage collected or queried normally.
3. **Java 17 Records**: Use \`public record PaymentKey(String paymentId) {}\` which automatically generates final fields, canonical constructors, and immutable \`equals()\`/\`hashCode()\`.`,
          ru: `### Главные инсайды Senior-инженера:
1. **Хранение записи vs Вычисление бакета**: HashMap вычисляет индекс: \`index = (n - 1) & hash(key)\`. Место хранения записи статично, а вычисление hashCode ключа динамично при каждом вызове.
2. **Утечка памяти**: Измененные ключи создают фантомные ссылки в памяти, которые не могут быть собраны сборщиком мусора или найдены обычным путем.
3. **Java 17 Records**: Используйте \`public record PaymentKey(String paymentId) {}\`, который автоматически генерирует final поля, канонический конструктор и неизменяемые \`equals()\`/\`hashCode()\`.`
        },
        commonMistake: {
          en: 'Common Weak Candidate Answer: Claiming that HashMap physically moves entries between buckets automatically or recommending ConcurrentHashMap without realizing key mutation breaks ConcurrentHashMap identically.',
          ru: 'Частая ошибка слабых кандидатов: Утверждать, что HashMap автоматически перемещает записи между бакетами, или рекомендовать ConcurrentHashMap, не понимая, что изменение ключа ломает ConcurrentHashMap точно так же.'
        },
        followUpQuestion: {
          en: 'Interviewer Follow-Up: "What if business logic requires looking up payments by status? How would you design the cache structure?"',
          ru: 'Дополнительный вопрос интервьюера: "Что если бизнес-логика требует поиска платежей по статусу? Как вы спроектируете структуру кэша?"'
        },
        followUpModelAnswer: {
          en: '"I would separate identity from index. Use an immutable PaymentId as the primary map key (Map<PaymentId, Payment>). To support status queries, maintain a secondary index structure such as Map<PaymentStatus, Set<PaymentId>>, updating the secondary index transactionally when status changes."',
          ru: '"Я бы отделил идентичность от индекса. Использовал бы неизменяемый PaymentId в качестве основного ключа мапы (Map<PaymentId, Payment>). Для поддержки запросов по статусу вел бы вторичный индекс Map<PaymentStatus, Set<PaymentId>>, обновляя его транзакционно при смене статуса."'
        },
        modelJavaCode: `// Ideal Modern Java 17+ Implementation
public record PaymentKey(String paymentId) {
    public PaymentKey {
        Objects.requireNonNull(paymentId, "paymentId must not be null");
    }
}

// Service Usage
public class PaymentCache {
    private final Map<PaymentKey, Payment> cache = new ConcurrentHashMap<>();

    public void putPayment(Payment payment) {
        // Key is immutable; status updates on Payment value do not break key routing
        cache.put(new PaymentKey(payment.getPaymentId()), payment);
    }

    public Optional<Payment> getPayment(String paymentId) {
        return Optional.ofNullable(cache.get(new PaymentKey(paymentId)));
    }
}`
      }
    },
    {
      stageId: 'm1-s9',
      type: 'reflection',
      title: { en: '9. Production Rule Reflection', ru: '9. Производственное правило' },
      hints: [],
      content: {
        reflectionPrompt: {
          en: 'What architectural rule will you enforce in your team code reviews after this incident?',
          ru: 'Какое архитектурное правило вы введете на код-ревью в вашей команде после этого инцидента?'
        }
      }
    },
    {
      stageId: 'm1-s10',
      type: 'results',
      title: { en: '10. Mission Results & XP', ru: '10. Итоги миссии и XP' },
      hints: [],
      content: {}
    }
  ]
};
