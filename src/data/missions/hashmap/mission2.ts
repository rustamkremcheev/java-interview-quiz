import { Mission } from '../../../types/mission';

export const mission2: Mission = {
  id: 'hashset-duplicate-customer',
  topicId: 'hashmap',
  topicTitle: {
    en: 'Java Core: HashMap & Immutability',
    ru: 'Java Core: HashMap и неизменяемость'
  },
  title: {
    en: 'Mission 2: The Duplicate Customer',
    ru: 'Миссия 2: Дубликат клиента'
  },
  subtitle: {
    en: 'Inconsistent equals() & hashCode() causing HashSet duplicate violations',
    ru: 'Несогласованные equals() и hashCode() как причина дубликатов в HashSet'
  },
  description: {
    en: 'Investigate why a HashSet contains duplicate Customer objects with identical business keys in production.',
    ru: 'Расследуйте, почему HashSet содержит дубликаты объектов Customer с идентичными бизнес-ключами на продакшене.'
  },
  estimatedMinutes: 12,
  concepts: ['equals-contract', 'hashcode-contract', 'hashset-duplicates'],
  stages: [
    {
      stageId: 'm2-s1',
      type: 'scenario',
      title: { en: '1. Production Scenario', ru: '1. Сценарий на продакшене' },
      hints: [],
      content: {
        scenarioTitle: {
          en: 'Customer Registration Deduplication Failure',
          ru: 'Сбой дедупликации регистрации клиентов'
        },
        scenarioStory: {
          en: `A high-scale banking user service uses a \`Set<Customer>\` (backed by HashSet) to ensure unique customer registrations within a session.

QA reported that two Customer instances with identical \`customerId\` ("CUST-9901") and \`email\` ("alex@bank.com") were both successfully added to the set!

Database batch insertion failed downstream with unique key constraint violations because HashSet allowed duplicates!`,
          ru: `Банковский сервис пользователей использует \`Set<Customer>\` (на базе HashSet) для обеспечения уникальности регистраций в рамках сессии.

QA сообщил, что два экземпляра Customer с одинаковыми \`customerId\` ("CUST-9901") и \`email\` ("alex@bank.com") были успешно добавлены в сет!

Пакетная вставка в БД в дальнейшем упала с ошибкой уникального ключа, так как HashSet пропустил дубликаты!`
        },
        scenarioContext: {
          en: 'Your task: Diagnose why HashSet accepted two logically equal objects and fix the equals/hashCode implementation.',
          ru: 'Ваша задача: Выяснить, почему HashSet принял два логически равных объекта, и исправить реализацию equals/hashCode.'
        }
      }
    },
    {
      stageId: 'm2-s2',
      type: 'primer',
      title: { en: '2. Concept Primer', ru: '2. Базовый конспект' },
      hints: [],
      content: {
        primerTitle: {
          en: 'HashSet Contract & Equality Mechanics',
          ru: 'Контракт HashSet и механика равенства'
        },
        primerSummary: {
          en: `HashSet is a wrapper around a \`HashMap<E, Object>\`.

1. **Contract Rule**: If two objects are equal according to \`equals(Object)\`, calling \`hashCode()\` on each MUST produce the SAME integer result.
2. **Default Object Behavior**: Default \`java.lang.Object.hashCode()\` derives a hash from the object's internal memory address.
3. **The Trap**: If a developer overrides \`equals()\` (comparing fields) but FAILS to override \`hashCode()\`, two separate object instances with identical field values will be assigned DIFFERENT bucket indices. HashSet checks bucket A, finds nothing, and inserts the duplicate without ever executing \`equals()\`.`,
          ru: `HashSet — это обертка над \`HashMap<E, Object>\`.

1. **Правило контракта**: Если два объекта равны по \`equals(Object)\`, вызов \`hashCode()\` для каждого из них ДОЛЖЕН давать ОДИНАКОВЫЙ результат.
2. **Поведение Object по умолчанию**: \`java.lang.Object.hashCode()\` вычисляет хэш на основе адреса в памяти.
3. **Ловушка**: Если разработчик переопределяет \`equals()\` (сравнивая поля), но НЕ переопределяет \`hashCode()\`, двум разным экземплярам объектов с одинаковыми полями будут назначены РАЗНЫЕ бакеты. HashSet проверяет бакет А, ничего не находит и вставляет дубликат, даже не вызывая \`equals()\`.`
        },
        primerDiagramSteps: [
          {
            title: { en: 'Customer A (id: 101)', ru: 'Customer A (id: 101)' },
            desc: { en: 'Default hashCode = 948291 -> Routed to Bucket #3.', ru: 'Default hashCode = 948291 -> Направлен в Бакет #3.' }
          },
          {
            title: { en: 'Customer B (id: 101)', ru: 'Customer B (id: 101)' },
            desc: { en: 'Default hashCode = 310928 -> Routed to Bucket #9. Bucket #9 is empty -> Inserted!', ru: 'Default hashCode = 310928 -> Направлен в Бакет #9. Бакет #9 пуст -> Вставлен!' }
          },
          {
            title: { en: 'Result', ru: 'Результат' },
            desc: { en: 'equals() was NEVER called because they landed in different buckets!', ru: 'equals() НИКОГДА не вызывался, так как они попали в разные бакеты!' }
          }
        ]
      }
    },
    {
      stageId: 'm2-s3',
      type: 'puzzle',
      title: { en: '3. Guided Causal Chain Puzzle', ru: '3. Пазл причинно-следственной связи' },
      hints: [
        { en: 'What does default Object.hashCode() rely on?', ru: 'На что опирается стандартный Object.hashCode()?' },
        { en: 'Does HashSet call equals() if two objects land in separate buckets?', ru: 'Вызывает ли HashSet equals(), если объекты попали в разные бакеты?' }
      ],
      content: {
        puzzleInstruction: {
          en: 'Arrange the causal steps explaining why HashSet permitted duplicate customer records.',
          ru: 'Расположите шаги причинно-следственной связи, объясняющие, почему HashSet допустил дубликаты клиентов.'
        },
        puzzleItems: [
          {
            id: 'step-1',
            text: {
              en: 'Customer instance A ("CUST-1") is added to HashSet.',
              ru: 'Экземпляр Customer A ("CUST-1") добавляется в HashSet.'
            },
            correctOrder: 1
          },
          {
            id: 'step-2',
            text: {
              en: 'Default Object.hashCode() assigns Bucket #3 based on memory location of instance A.',
              ru: 'Дефолтный Object.hashCode() назначает Бакет #3 на основе адреса в памяти экземпляра A.'
            },
            correctOrder: 2
          },
          {
            id: 'step-3',
            text: {
              en: 'Customer instance B (also "CUST-1") is added to HashSet.',
              ru: 'Экземпляр Customer B (тоже "CUST-1") добавляется в HashSet.'
            },
            correctOrder: 3
          },
          {
            id: 'step-4',
            text: {
              en: 'Instance B gets Bucket #8 because memory address differs from instance A.',
              ru: 'Экземпляр B получает Бакет #8, так как его адрес в памяти отличается от A.'
            },
            correctOrder: 4
          },
          {
            id: 'step-5',
            text: {
              en: 'HashSet checks Bucket #8, finds no nodes, skips equals() check, and inserts duplicate.',
              ru: 'HashSet проверяет Бакет #8, не находит узлов, пропускает проверку equals() и вставляет дубликат.'
            },
            correctOrder: 5
          },
          {
            id: 'distractor-1',
            text: {
              en: 'equals() returned false because customer emails did not match.',
              ru: 'equals() вернул false, так как email клиентов не совпали.'
            },
            isDistractor: true
          }
        ]
      }
    },
    {
      stageId: 'm2-s4',
      type: 'bughunt',
      title: { en: '4. Bug Hunt Challenge', ru: '4. Поиск бага в коде' },
      hints: [
        { en: 'Compare equals() method with hashCode() implementation.', ru: 'Сравните метод equals() с реализацией hashCode().' }
      ],
      content: {
        bugHuntInstruction: {
          en: 'Identify the flaw in this Customer class implementation.',
          ru: 'Найдите изъян в реализации этого класса Customer.'
        },
        bugHuntCode: `public class Customer {
    private final String customerId;
    private final String email;

    public Customer(String customerId, String email) {
        this.customerId = customerId;
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(customerId, customer.customerId) &&
               Objects.equals(email, customer.email);
    }

    // Missing hashCode() override!
}`,
        bugHuntLines: [
          { lineNumber: 10, code: '    @Override', isBug: false, explanation: { en: 'equals() overridden correctly.', ru: 'equals() переопределен верно.' } },
          { lineNumber: 17, code: '    // Missing hashCode() override!', isBug: true, explanation: { en: 'CRITICAL BUG: Overriding equals() without overriding hashCode() violates the Contract!', ru: 'КРИТИЧЕСКИЙ БАГ: Переопределение equals() без hashCode() нарушает контракт!' } }
        ]
      }
    },
    {
      stageId: 'm2-s5',
      type: 'fixbuilder',
      title: { en: '5. Fix Builder Challenge', ru: '5. Конструктор исправления' },
      hints: [],
      content: {
        fixBuilderInstruction: {
          en: 'Select ALL valid fixes for the equals/hashCode contract violation.',
          ru: 'Выберите ВСЕ правильные решения нарушения контракта equals/hashCode.'
        },
        fixOptions: [
          {
            id: 'fix-1',
            text: {
              en: 'Implement hashCode() in Customer using Objects.hash(customerId, email).',
              ru: 'Реализовать hashCode() в Customer через Objects.hash(customerId, email).'
            },
            isCorrect: true,
            explanation: { en: 'Ensures equal objects generate identical hash codes.', ru: 'Гарантирует, что равные объекты дают одинаковые хэш-коды.' }
          },
          {
            id: 'fix-2',
            text: {
              en: 'Convert Customer to a Java 17 record: `public record Customer(String customerId, String email) {}`.',
              ru: 'Преобразовать Customer в Java 17 record: `public record Customer(String customerId, String email) {}`.'
            },
            isCorrect: true,
            explanation: { en: 'Record automatically generates matching equals and hashCode for all components.', ru: 'Record автоматически генерирует согласованные equals и hashCode для всех компонентов.' }
          },
          {
            id: 'fix-3',
            text: {
              en: 'Replace HashSet with a List and filter duplicates manually using streams.',
              ru: 'Заменить HashSet на List и фильтровать дубликаты вручную через стримы.'
            },
            isCorrect: false,
            explanation: { en: 'Performance antipattern: O(N) lookup instead of O(1) hash lookup.', ru: 'Антипаттерн производительности: поиск O(N) вместо O(1).' }
          }
        ]
      }
    },
    {
      stageId: 'm2-s6',
      type: 'tradeoff',
      title: { en: '6. Senior Engineering Trade-Off', ru: '6. Архитектурный компромисс' },
      hints: [],
      content: {
        tradeOffQuestion: {
          en: 'When should hashCode() include a subset of fields rather than all class fields?',
          ru: 'Когда hashCode() должен включать подмножество полей, а не все поля класса?'
        },
        tradeOffOptions: [
          {
            id: 'to-1',
            text: {
              en: 'When a subset of fields uniquely identifies the entity (e.g. immutable business id) while other fields are mutable metadata.',
              ru: 'Когда подмножество полей уникально идентифицирует сущность (например, неизменяемый бизнес-ID), а другие поля являются изменяемыми метаданными.'
            },
            isCorrect: true,
            feedback: { en: 'Correct: Base equality strictly on business identity to prevent hashCode mutation when metadata changes.', ru: 'Верно: Базируйте равенство строго на бизнес-идентичности, чтобы избежать изменения hashCode при смене метаданных.' }
          },
          {
            id: 'to-2',
            text: {
              en: 'Always include every single field in hashCode() regardless of mutability.',
              ru: 'Всегда включать абсолютно каждое поле в hashCode(), независимо от изменяемости.'
            },
            isCorrect: false,
            feedback: { en: 'Incorrect: Including mutable fields causes hash map lookup corruption.', ru: 'Неверно: Включение изменяемых полей ведет к повреждению поиска в хэш-мапе.' }
          }
        ]
      }
    },
    {
      stageId: 'm2-s7',
      type: 'interview',
      title: { en: '7. Senior Interview Challenge', ru: '7. Интервью-ответ (Senior)' },
      hints: [],
      content: {
        interviewQuestion: {
          en: 'Interviewer: "What is the general contract between equals() and hashCode() in Java, and what breaks if you override equals() without hashCode()?"',
          ru: 'Интервьюер: "Каков общий контракт между equals() и hashCode() в Java, и что ломается, если переопределить equals() без hashCode()?"'
        },
        expectedConcepts: [
          {
            id: 'equals-contract',
            label: { en: 'Equals & HashCode Contract', ru: 'Контракт Equals и HashCode' },
            keywords: ['contract', 'equal objects', 'same hashcode', 'контракт', 'равные объекты']
          },
          {
            id: 'bucket-placement',
            label: { en: 'Different Buckets Routing', ru: 'Маршрутизация в разные бакеты' },
            keywords: ['bucket', 'memory address', 'different bucket', 'бакет']
          },
          {
            id: 'hashset-duplicates',
            label: { en: 'HashSet / HashMap Duplicate Corruption', ru: 'Дубликаты в HashSet / HashMap' },
            keywords: ['duplicate', 'hashset', 'hashmap', 'duplication', 'дубликат']
          }
        ]
      }
    },
    {
      stageId: 'm2-s8',
      type: 'reference',
      title: { en: '8. Reference Model Answer', ru: '8. Эталонный ответ' },
      hints: [],
      content: {
        referenceShortAnswer: {
          en: '"The contract states that if two objects are equal according to equals(), they MUST produce the exact same hashCode(). If you override equals() without overriding hashCode(), equal objects will inherit Object.hashCode() based on memory address and land in different hash buckets. As a result, HashSet and HashMap will fail to detect equality, inserting duplicate records into sets and failing lookups in maps."',
          ru: '"Контракт гласит: если два объекта равны согласно equals(), они ОБЯЗАНЫ давать одинаковый hashCode(). Если переопределить equals() без hashCode(), равные объекты унаследуют Object.hashCode() на основе адреса в памяти и попадут в разные бакеты. В результате HashSet и HashMap не смогу определить равенство, что приведет к дубликатам в сетах и сбоям поиска в мапах."'
        },
        referenceDetailedAnswer: {
          en: 'Always enforce equals/hashCode consistency using Java 17 records or IDE generation verified in unit tests.',
          ru: 'Всегда обеспечивайте согласованность equals/hashCode с помощью Java 17 records или генерации IDE, проверенной юнит-тестами.'
        },
        commonMistake: {
          en: 'Claiming that unequal objects must have different hashCodes. False! Different objects CAN share the same hashCode (hash collision).',
          ru: 'Утверждать, что не равные объекты должны иметь разные hashCode. Это неверно! Разные объекты МОГУТ иметь одинаковый hashCode (коллизия хэшей).'
        },
        followUpQuestion: {
          en: 'Interviewer: "What happens if two unequal objects return the same hashCode?"',
          ru: 'Интервьюер: "Что произойдет, если два не равных объекта вернут одинаковый hashCode?"'
        },
        followUpModelAnswer: {
          en: '"This is a hash collision. HashMap handles collisions by storing entries in a linked list (or red-black tree if bucket size exceeds TREEIFY_THRESHOLD = 8) under the same bucket. HashMap then calls equals() to find the exact target node."',
          ru: '"Это коллизия хэшей. HashMap обрабатывает коллизии, сохраняя записи в связном списке (или красно-черном дереве, если размер бакета превышает TREEIFY_THRESHOLD = 8) внутри одного бакета. Затем HashMap вызывает equals() для поиска нужного узла."'
        },
        modelJavaCode: `public record Customer(String customerId, String email) {
    public Customer {
        Objects.requireNonNull(customerId);
        Objects.requireNonNull(email);
    }
}`
      }
    },
    {
      stageId: 'm2-s9',
      type: 'reflection',
      title: { en: '9. Production Rule Reflection', ru: '9. Производственное правило' },
      hints: [],
      content: {
        reflectionPrompt: {
          en: 'Write down a personal checklist item for creating model classes in Java.',
          ru: 'Запишите пункт личного чек-листа при создании доменных классов на Java.'
        }
      }
    },
    {
      stageId: 'm2-s10',
      type: 'results',
      title: { en: '10. Mission Results & XP', ru: '10. Итоги миссии и XP' },
      hints: [],
      content: {}
    }
  ]
};
