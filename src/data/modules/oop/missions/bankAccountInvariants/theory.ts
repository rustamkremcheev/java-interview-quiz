import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_BANK_ACCOUNT: TheoryArticle = {
  id: "art_theory_encapsulation",
  topicIds: ["top_oop_05"],
  conceptIds: ["cpt_encapsulation", "cpt_invariants", "cpt_access_modifiers", "cpt_defensive_copying"],
  title: {
    en: "Encapsulation & Domain Invariant Protection",
    ru: "Инкапсуляция и Защита Доменных Инвариантов"
  },
  summary: {
    en: "True encapsulation is the protection of class state invariants through access boundaries and pre-condition validation, not merely wrapping private fields in public getters and setters.",
    ru: "Истинная инкапсуляция — это защита инвариантов состояния класса через границы доступа и валидацию предусловий, а не просто приватные поля с публичными геттерами и сеттерами."
  },
  sections: [
    {
      id: "sec_definition",
      category: "DEFINITION",
      title: {
        en: "1. What Encapsulation Actually Means",
        ru: "1. Что На самом Деле Означает Инкапсуляция"
      },
      blocks: [
        {
          id: "blk_def_1",
          type: "PARAGRAPH",
          content: {
            en: "In junior interviews, encapsulation is frequently misdefined as 'making fields private and generating public getters and setters.' In enterprise backend engineering, this definition is incorrect and dangerous.",
            ru: "На джуниор-интервью инкапсуляцию часто ошибочно определяют как 'сделать поля приватными и сгенерировать публичные геттеры и сеттеры'. В корпоративной разработке это определение неверно и опасно."
          }
        },
        {
          id: "blk_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: State Invariant Protection",
            ru: "💡 Главная Ментальная Модель: Защита Инвариантов"
          },
          content: {
            en: "Encapsulation is the deliberate protection of domain invariants. An invariant is a rule that must hold true for an object to be considered valid (e.g., BankAccount balance cannot be negative).",
            ru: "Инкапсуляция — это осознанная защита инвариантов домена. Инвариант — это правило, которое должно оставаться истинным для признания объекта легитимным (например, баланс счета не может быть отрицательным)."
          }
        }
      ]
    },
    {
      id: "sec_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. The Setter Invariant Bypass Risk",
        ru: "2. Опасность Обхода Инвариантов через Сеттеры"
      },
      blocks: [
        {
          id: "blk_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Providing an unrestricted public setBalance(double balance) method bypasses state protection just as severely as making the field public. Any external caller can force an account into a corrupted negative balance state.",
            ru: "Публичный метод setBalance(double balance) без ограничений обходит защиту состояния так же критично, как и публичное поле. Любой внешний вызов может принудительно перевести счет в отрицательный баланс."
          }
        },
        {
          id: "blk_mech_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: Floating-Point Precision Loss",
            ru: "⚠️ Продакшн Риск: Потеря Точности Плавающей Точки"
          },
          content: {
            en: "Representing currency as double introduces IEEE 754 floating-point rounding errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Enterprise financial services represent balance as long cents or BigDecimal.",
            ru: "Использование double для денег ведет к ошибкам округления по IEEE 754 (0.1 + 0.2 = 0.30000000000000004). Банковские системы используют long (в центах) или BigDecimal."
          }
        }
      ]
    },
    {
      id: "sec_defensive_copy",
      category: "TRADE_OFFS",
      title: {
        en: "3. Defensive Copying for Mutable References",
        ru: "3. Защитное Копирование для Мутабельных Ссылок"
      },
      blocks: [
        {
          id: "blk_def_copy_1",
          type: "PARAGRAPH",
          content: {
            en: "Declaring a field `private final Date startDate;` prevents re-assigning the reference variable itself, but DOES NOT prevent external code from invoking startDate.setTime(0). Defensive copying must clone mutable objects when passed into constructors or returned from getters.",
            ru: "Объявление поля `private final Date startDate;` запрещает изменять саму ссылку, но НЕ запрещает внешнему коду вызывать startDate.setTime(0). Защитное копирование должно клонировать мутабельные объекты в конструкторе и геттере."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_book_effective_java"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#encapsulation", "#invariants", "#money", "#defensive-copying"],
  estimatedMinutes: 12,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_BANK_ACCOUNT: readonly TheoryCheckpoint[] = [
  {
    id: "chk_encap_1",
    theoryArticleId: "art_theory_encapsulation",
    question: {
      en: "What is the primary engineering objective of class encapsulation?",
      ru: "В чем заключается главная инженерная цель инкапсуляции класса?"
    },
    explanation: {
      en: "Encapsulation protects domain invariants by validating preconditions and restricting illegal state access.",
      ru: "Инкапсуляция защищает доменные инварианты, проверяя предусловия и ограничивая нелегитимный доступ."
    },
    options: [
      {
        id: "opt_chk1_a",
        text: {
          en: "To make all class fields private and generate public getters and setters for all of them.",
          ru: "Сделать все поля класса приватными и сгенерировать для всех них публичные геттеры и сеттеры."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Unrestricted getters and setters expose internal fields without protecting state invariants.",
          ru: "Неверно. Неограниченные геттеры и сеттеры открывают поля без защиты инвариантов состояния."
        },
        misconceptionId: "err_setter_invariant_bypass"
      },
      {
        id: "opt_chk1_b",
        text: {
          en: "To protect domain state invariants and enforce valid state transitions through controlled methods.",
          ru: "Защищать инварианты состояния домена и обеспечивать корректные переходы через управляемые методы."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Encapsulation ensures that an object instance can NEVER enter an illegal or corrupted state.",
          ru: "Верно! Инкапсуляция гарантирует, что объект НИКОГДА не перейдет в нелегитимное или поврежденное состояние."
        }
      },
      {
        id: "opt_chk1_c",
        text: {
          en: "To reduce object memory footprint on the JVM Heap.",
          ru: "Уменьшить занимаемый объем памяти объектом на Heap в JVM."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Encapsulation is a design principle for safety and maintainability, not Heap memory reduction.",
          ru: "Неверно. Инкапсуляция — это принцип проектирования для безопасности, а не для экономии памяти в куче."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_encap_2",
    theoryArticleId: "art_theory_encapsulation",
    question: {
      en: "Why is a public setter `setBalance(double balance)` dangerous for a financial BankAccount entity?",
      ru: "Почему публичный сеттер `setBalance(double balance)` опасен для банковской сущности BankAccount?"
    },
    explanation: {
      en: "Direct setters allow external code to bypass business rules and set negative balances or invalid amounts.",
      ru: "Прямые сеттеры позволяют внешнему коду обходить бизнес-правила и устанавливать отрицательный баланс."
    },
    options: [
      {
        id: "opt_chk2_a",
        text: {
          en: "It allows external callers to bypass domain rules and force negative balances without validation.",
          ru: "Он позволяет внешнему коду обходить доменные правила и принудительно устанавливать отрицательный баланс."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Controlled methods like deposit() and withdraw() should be used instead of unrestricted setters.",
          ru: "Верно! Вместо произвольных сеттеров должны использоваться доменные методы deposit() и withdraw()."
        }
      },
      {
        id: "opt_chk2_b",
        text: {
          en: "Because Java method names beginning with 'set' trigger automatic garbage collection pauses.",
          ru: "Потому что имена методов на 'set' вызывают автоматические паузы сборщика мусора."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Method naming conventions have no impact on Garbage Collection behavior.",
          ru: "Неверно. Имена методов не влияют на работу сборщика мусора."
        }
      },
      {
        id: "opt_chk2_c",
        text: {
          en: "Because setters automatically make all internal fields thread-safe.",
          ru: "Потому что сеттеры автоматически делают все внутренние поля многопоточно безопасными."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Setters actually increase race condition risks in concurrent environments.",
          ru: "Неверно. Сеттеры напротив повышают риск состояния гонки в многопоточной среде."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_encap_3",
    theoryArticleId: "art_theory_encapsulation",
    question: {
      en: "What does `private final Date startDate;` guarantee regarding immutability?",
      ru: "Что гарантирует объявление `private final Date startDate;` в плане неизменяемости?"
    },
    explanation: {
      en: "`final` prevents changing the reference variable itself, but external callers can still mutate the internal state of java.util.Date unless defensive copies are made.",
      ru: "`final` запрещает изменять саму ссылку, но внешний код может изменить содержимое java.util.Date, если не сделана защитная копия."
    },
    options: [
      {
        id: "opt_chk3_a",
        text: {
          en: "It guarantees the Date object itself is 100% immutable and cannot be mutated by anyone.",
          ru: "Это гарантирует, что сам объект Date на 100% неизменяем и никоим образом не может быть изменен."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. final reference != immutable object. java.util.Date has mutable methods like setTime().",
          ru: "Неверно. final ссылка != неизменяемый объект. Класс java.util.Date имеет мутирующие методы вроде setTime()."
        },
        misconceptionId: "err_mutable_reference_leak"
      },
      {
        id: "opt_chk3_b",
        text: {
          en: "It only prevents re-assigning the `startDate` reference variable to point to a different Date instance.",
          ru: "Это запрещает лишь переприсвоение переменной `startDate` другой ссылки на другой объект Date."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! To achieve true immutability with Date, you must use defensive copying or modern java.time.Instant/LocalDate.",
          ru: "Верно! Для истинной неизменяемости с Date нужно применять защитное копирование или использовать java.time.Instant/LocalDate."
        }
      }
    ],
    order: 3
  }
];
