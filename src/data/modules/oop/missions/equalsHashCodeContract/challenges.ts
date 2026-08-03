import { Challenge } from '../../../../../types/domain';

export const ALL_EQUALS_HASHCODE_CHALLENGES: readonly Challenge[] = [
  {
    id: "chl_payment_key_fix_builder",
    type: "FIX_BUILDER",
    missionId: "mis_equals_hashcode_contract",
    stageId: "stg_eh_practice",
    title: {
      en: "Fix Builder: Reconstructing PaymentKey & HashMap Safety",
      ru: "Конструктор Исправления: Сборка Безопасного PaymentKey"
    },
    prompt: {
      en: "Select ALL production-safe solutions to solve the HashMap key lookup failure and REJECT dangerous quick fixes.",
      ru: "Выберите ВСЕ безопасные решения для устранения сбоя поиска в HashMap и ОТКЛОНИТЕ опасные быстрые костыли."
    },
    difficulty: "SENIOR",
    assistanceLevel: "GUIDED",
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
    topicIds: ["top_oop_20"],
    tags: ["#equals", "#hashcode", "#immutability", "#records"],
    hintIds: ["hnt_eh_01", "hnt_eh_02"],
    xpReward: 100,
    order: 1,
    payload: {
      baseCodeArtifactId: "art_code_broken_payment_key",
      solutionCodeArtifactId: "art_code_fixed_payment_key_record",
      options: [
        {
          id: "fix_opt_1",
          text: {
            en: "Make PaymentKey completely immutable by using a Java 17 record or final class with private final fields and no setters.",
            ru: "Сделать PaymentKey полностью неизменяемым через Java 17 record или final-класс с private final полями без сеттеров."
          },
          isCorrect: true,
          explanation: {
            en: "BEST PRACTICE: Immutability guarantees that hashCode() remains 100% stable across the entire lifetime of the key in HashMap.",
            ru: "ЛУЧШАЯ ПРАКТИКА: Неизменяемость гарантирует, что hashCode() остается на 100% стабильным в течение всего времени жизни ключа в HashMap."
          }
        },
        {
          id: "fix_opt_2",
          text: {
            en: "Separate identity from payload: use immutable `transactionId` as the map key, and store mutable status inside the value record.",
            ru: "Отделить идентичность от данных: использовать неизменяемый `transactionId` как ключ мапы, а мутабельный статус хранить в значении."
          },
          isCorrect: true,
          explanation: {
            en: "RECOMMENDED ARCHITECTURE: Key hashCode depends exclusively on immutable transaction identity, making cache lookups 100% reliable.",
            ru: "РЕКОМЕНДУЕМАЯ АРХИТЕКТУРА: Хэш-код ключа зависит только от неизменяемой идентичности транзакции, делая поиск в кэше 100% надежным."
          }
        },
        {
          id: "fix_opt_3",
          text: {
            en: "Replace HashMap with ConcurrentHashMap to make key hash calculations thread-safe.",
            ru: "Заменить HashMap на ConcurrentHashMap для потокобезопасного вычисления хэша ключей."
          },
          isCorrect: false,
          explanation: {
            en: "INCORRECT: ConcurrentHashMap guarantees table node thread safety, NOT key hash stability under field mutation!",
            ru: "НЕВЕРНО: ConcurrentHashMap обеспечивает потокобезопасность структуры, но НЕ стабильность хэша ключа при изменении его полей!"
          }
        },
        {
          id: "fix_opt_4",
          text: {
            en: "Re-execute `map.put(key, value)` immediately every time `key.setStatus()` is invoked.",
            ru: "Повторно вызывать `map.put(key, value)` сразу при каждом вызове `key.setStatus()`."
          },
          isCorrect: false,
          explanation: {
            en: "DANGEROUS: Leaves orphaned phantom entries under old buckets in memory, causing severe memory leaks and race conditions.",
            ru: "ОПАСНО: Оставляет осиротевшие фантомные записи в старых бакетах памяти, вызывая утечки памяти и состояние гонки."
          }
        }
      ]
    }
  },
  {
    id: "chl_payment_key_bughunt",
    type: "BUG_HUNT",
    missionId: "mis_equals_hashcode_contract",
    stageId: "stg_eh_debug",
    title: {
      en: "Applied Bug Hunt: PaymentKey Key Mutation Vulnerability",
      ru: "Поиск Бага: Изменение Поля Ключа PaymentKey"
    },
    prompt: {
      en: "Select the line(s) in this Java implementation responsible for the key mutation bug in HashMap lookups.",
      ru: "Выберите строку(и) в реализации Java, ответственную за баг изменения ключа при поиске в HashMap."
    },
    difficulty: "SENIOR",
    assistanceLevel: "APPLIED",
    conceptIds: ["cpt_mutable_key_disaster", "cpt_hashcode_contract"],
    topicIds: ["top_oop_20"],
    tags: ["#bug-hunt", "#mutable-key"],
    hintIds: ["hnt_eh_03"],
    xpReward: 100,
    order: 2,
    payload: {
      baseCodeArtifactId: "art_code_broken_payment_key",
      solutionCodeArtifactId: "art_code_fixed_payment_key_record",
      codeSnippet: `public class PaymentKey {\n    private final String transactionId;\n    private String status;\n\n    public PaymentKey(String transactionId, String status) {\n        this.transactionId = transactionId;\n        this.status = status;\n    }\n\n    public void setStatus(String status) {\n        this.status = status;\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(transactionId, status);\n    }\n}`,
      lines: [
        {
          lineNumber: 3,
          code: "    private String status;",
          isBug: true,
          explanation: {
            en: "CRITICAL BUG: Non-final mutable field used in hashCode() generation.",
            ru: "КРИТИЧЕСКИЙ БАГ: Мутабельное non-final поле используется в hashCode()."
          }
        },
        {
          lineNumber: 10,
          code: "    public void setStatus(String status) {",
          isBug: true,
          explanation: {
            en: "DANGEROUS SETTER: Mutates key state after insertion into HashMap.",
            ru: "ОПАСНЫЙ СЕТТЕР: Изменяет состояние ключа после вставки в HashMap."
          }
        },
        {
          lineNumber: 16,
          code: "        return Objects.hash(transactionId, status);",
          isBug: true,
          explanation: {
            en: "CRITICAL BUG: Including mutable field status inside hashCode() calculation.",
            ru: "КРИТИЧЕСКИЙ БАГ: Включение мутабельного поля status в вычисление hashCode()."
          }
        }
      ]
    }
  },
  {
    id: "chl_payment_key_interview_answer",
    type: "INTERVIEW_ANSWER",
    missionId: "mis_equals_hashcode_contract",
    stageId: "stg_eh_interview_a",
    title: {
      en: "Senior Interview Challenge: Explaining HashMap Lookup Failure",
      ru: "Сценарий Senior-Интервью: Объяснение Сбоя Поиска в HashMap"
    },
    prompt: {
      en: "Formulate your 90-second structured verbal response explaining why payment records disappeared from HashMap lookup after status updates.",
      ru: "Сформулируйте структурированный 90-секундный устный ответ с объяснением причины исчезновения платежа из поиска HashMap."
    },
    difficulty: "SENIOR",
    assistanceLevel: "INTERVIEW",
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
    topicIds: ["top_oop_20"],
    tags: ["#interview", "#equals-hashCode"],
    hintIds: [],
    xpReward: 100,
    order: 3,
    payload: {
      targetQuestionId: "q_payment_key_equals_01",
      rubricDimensions: ["Elevator Pitch (Problem identification)", "JVM Mechanics (Bucket formula)", "Architectural Solution & Trade-offs"],
      expectedConcepts: [
        {
          id: "cpt_mutable_key_disaster",
          label: { en: "Mutable Key Field Mutation", ru: "Мутация Поля Ключа" },
          keywords: ["mutable", "mutation", "mutated", "setter", "changed field", "изменяемый", "мутировал"]
        },
        {
          id: "cpt_hashcode_contract",
          label: { en: "hashCode Recalculation", ru: "Перерасчет hashCode" },
          keywords: ["hashcode", "hash code", "recalculate", "re-evaluat", "different hash", "хэш"]
        },
        {
          id: "cpt_bucket_routing",
          label: { en: "Bucket Index Mismatch", ru: "Несовпадение Индекса Бакета" },
          keywords: ["bucket", "index", "table", "slot", "бакет", "ячейка"]
        },
        {
          id: "cpt_immutability_fix",
          label: { en: "Immutability / Java 17 Record Solution", ru: "Решение через Record / Неизменяемость" },
          keywords: ["immutable", "final", "record", "unmodifiable", "business key", "неизменяемый"]
        },
        {
          id: "cpt_concurrenthashmap_myth",
          label: { en: "ConcurrentHashMap Does Not Fix Key Mutation", ru: "ConcurrentHashMap не чинит мутацию ключа" },
          keywords: ["concurrenthashmap", "thread safety", "not a fix", "thread-safe"]
        }
      ],
      modelAnswer30s: {
        en: "The payment record disappeared from lookup because the key object was mutable and its status field participated in hashCode() generation. Mutating status altered the key's hash code, causing HashMap to look in a different bucket index during get() calls while the entry remained stranded in heap memory.",
        ru: "Запись платежа исчезла при поиске, потому что ключ был мутабельным и его статус участвовал в hashCode(). Изменение статуса изменило хэш-код ключа, из-за чего get() ищет в другом бакете, пока узел лежит в памяти."
      },
      modelAnswerDetailed: {
        en: "When put() was called, HashMap computed `index = (n-1) & hash` and placed the node into Bucket #4. Later, when status updated from PENDING to COMPLETED, key.hashCode() changed. On calling get(key), HashMap computed a new index (Bucket #11), searched Bucket #11, found nothing, and returned null—even though the node physically sat in Bucket #4.",
        ru: "При вызове put() HashMap вычислил `index = (n-1) & hash` и поместил узел в Бакет #4. Позже при смене статуса с PENDING на COMPLETED key.hashCode() изменился. При вызове get(key) HashMap вычислил новый индекс (Бакет #11), искал в Бакете #11, ничего не нашел и вернул null."
      },
      modelAnswerTradeOffs: {
        en: "Replacing HashMap with ConcurrentHashMap does NOT fix this because thread safety does not stabilize key hashCode calculations. The production fix is to make key objects strictly immutable using Java 17 records (`public record PaymentKey(String transactionId) {}`) or separating identity from payload.",
        ru: "Замена на ConcurrentHashMap НЕ решает проблему, так как потокобезопасность не делает hashCode() ключа стабильным. Продакт-фикс — сделать ключи строго неизменяемыми через Java 17 record (`public record PaymentKey(String transactionId) {}`) или отделить идентичность от данных."
      },
      followUpQuestionText: {
        en: "Interviewer Follow-Up: 'What if business logic requires looking up payments by status? How would you design the cache structure?'",
        ru: "Вопрос интервьюера: 'Что если бизнес-логика требует поиска платежей по статусу? Как вы спроектируете структуру кэша?'"
      },
      followUpModelAnswerText: {
        en: "Model Answer: Use an immutable transactionId as the primary key (Map<PaymentKey, PaymentRecord>). To support status queries, maintain a secondary index structure such as Map<PaymentStatus, Set<PaymentKey>>, updating the secondary index transactionally when status changes.",
        ru: "Ответ: Использовать неизменяемый transactionId как основной ключ (Map<PaymentKey, PaymentRecord>). Для поиска по статусу вести вторичный индекс Map<PaymentStatus, Set<PaymentKey>>, обновляемый транзакционно при смене статуса."
      }
    }
  }
];
