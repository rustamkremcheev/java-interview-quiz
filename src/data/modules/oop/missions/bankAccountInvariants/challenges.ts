import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE: FixBuilderChallenge = {
  id: "chl_bank_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_bank_account_invariants",
  stageId: "stg_practice",
  title: {
    en: "Fix Invariant Bypass Vulnerability",
    ru: "Исправление Уязвимости Обхода Инвариантов"
  },
  prompt: {
    en: "Refactor the broken BankAccount class to enforce encapsulation. Select the necessary structural building blocks to protect state invariants and eliminate floating-point representation bugs.",
    ru: "Проведите рефакторинг класса BankAccount для обеспечения инкапсуляции. Выберите необходимые блоки для защиты инвариантов и устранения ошибок плавающей точки."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_encapsulation", "cpt_invariants", "cpt_monetary_representation"],
  topicIds: ["top_oop_05"],
  tags: ["#encapsulation", "#invariants", "#money"],
  hintIds: ["hnt_bank_1", "hnt_bank_2", "hnt_bank_3", "hnt_bank_4"],
  xpReward: 250,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_bank_account_broken",
    solutionCodeArtifactId: "art_bank_account_solution",
    options: [
      {
        id: "opt_fix_1",
        text: {
          en: "Make fields private final String accountId and private long balanceInCents;",
          ru: "Сделать поля private final String accountId и private long balanceInCents;"
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Private fields prevent direct external mutation, and long cents eliminates float precision drift.",
          ru: "Верно. Приватные поля блокируют прямую мутацию, а long центы устраняют погрешность float."
        }
      },
      {
        id: "opt_fix_2",
        text: {
          en: "Add precondition check in constructor: if (initialBalanceInCents < 0) throw new IllegalArgumentException();",
          ru: "Добавить проверку предусловия в конструкторе: if (initialBalanceInCents < 0) throw new IllegalArgumentException();"
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Precondition guards guarantee that invalid instances can never be created.",
          ru: "Верно. Проверка предусловий гарантирует, что нелегитимный объект никогда не будет создан."
        }
      },
      {
        id: "opt_fix_3",
        text: {
          en: "Replace unrestricted public setBalance(double) with validated deposit(long) and withdraw(long) methods.",
          ru: "Заменить сеттер setBalance(double) на доменные методы deposit(long) и withdraw(long) с проверками."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Behavior-oriented methods enforce state transitions and business rules.",
          ru: "Верно. Методы поведения обеспечивают контроль переходов состояний и бизнес-правила."
        }
      },
      {
        id: "opt_fix_distractor_1",
        text: {
          en: "Keep fields public but synchronize all method accesses using synchronized keyword.",
          ru: "Оставить поля публичными, но синхронизировать доступ ключом synchronized."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronizing methods does not prevent callers from directly mutating public fields (account.balance = -100).",
          ru: "Неверно. Синхронизация методов не мешает вызовам напрямую менять публичные поля (account.balance = -100)."
        }
      },
      {
        id: "opt_fix_distractor_2",
        text: {
          en: "Add a public setBalance(double balance) method without validation to allow easy balance updates.",
          ru: "Добавить публичный сеттер setBalance(double balance) без валидации для удобного обновления баланса."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Unrestricted setters bypass invariant protection and introduce floating-point errors.",
          ru: "Неверно. Неограниченные сеттеры обходят защиту инвариантов и вносят ошибки плавающей точки."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE: BugHuntChallenge = {
  id: "chl_bank_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_bank_account_invariants",
  stageId: "stg_debug",
  title: {
    en: "Bug Hunt: Identify Mutable Reference Leak",
    ru: "Поиск Бага: Поиск Утечки Мутабельной Ссылки"
  },
  prompt: {
    en: "Inspect the AccountPeriod class below. Click on the exact line(s) in the code viewer that introduce a reference leak vulnerability, allowing external callers to corrupt class state.",
    ru: "Изучите класс AccountPeriod ниже. Нажмите на строку(и) в редакторе кода, которые содержат уязвимость утечки ссылки, позволяющую внешнему коду нарушить состояние класса."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_defensive_copying", "cpt_encapsulation"],
  topicIds: ["top_oop_05"],
  tags: ["#defensive-copying", "#invariants"],
  hintIds: ["hnt_bug_1", "hnt_bug_2", "hnt_bug_3", "hnt_bug_4"],
  xpReward: 250,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_account_period_bughunt",
    solutionCodeArtifactId: "art_bank_account_solution",
    codeSnippet: `import java.util.Date;

public final class AccountPeriod {
    private final Date startDate;
    private final Date endDate;

    public AccountPeriod(Date startDate, Date endDate) {
        if (startDate.after(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        this.startDate = startDate; // Line 10
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate; // Line 16
    }
}`,
    lines: [
      { lineNumber: 1, code: "import java.util.Date;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "public final class AccountPeriod {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "    private final Date startDate;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "    private final Date endDate;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "    public AccountPeriod(Date startDate, Date endDate) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "        if (startDate.after(endDate)) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "            throw new IllegalArgumentException(\"Start date cannot be after end date\");", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 10,
        code: "        this.startDate = startDate;",
        isBug: true,
        explanation: {
          en: "Line 10 stores the external mutable Date reference directly! External code can modify the Date object later, bypassing the startDate.after(endDate) guard.",
          ru: "Строка 10 сохраняет внешнюю мутабельную ссылку Date напрямую! Внешний код может изменить объект Date позже, обойдя проверку."
        }
      },
      { lineNumber: 11, code: "        this.endDate = endDate;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 14, code: "    public Date getStartDate() {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 15,
        code: "        return startDate;",
        isBug: true,
        explanation: {
          en: "Line 15 returns internal Date reference directly! Callers can invoke getStartDate().setTime(0), mutating internal class state externally.",
          ru: "Строка 15 возвращает внутреннюю ссылку Date напрямую! Вызывающий код может вызвать getStartDate().setTime(0), нарушая состояние извне."
        }
      },
      { lineNumber: 16, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 17, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE: InterviewAnswerChallenge = {
  id: "chl_bank_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_bank_account_invariants",
  stageId: "stg_interview",
  title: {
    en: "Senior Interview Verbal Explanation: Encapsulation vs Getters/Setters",
    ru: "Устный Ответ на Senior-Интервью: Инкапсуляция vs Геттеры/Сеттеры"
  },
  prompt: {
    en: "How do you explain the fundamental difference between encapsulation and data hiding to a developer who claims 'making fields private and adding getters/setters is encapsulation'?",
    ru: "Как вы объясните принципиальную разницу между инкапсуляцией и сокрытием данных разработчику, который утверждает, что 'приватные поля с геттерами и сеттерами — это и есть инкапсуляция'?"
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_encapsulation", "cpt_invariants", "cpt_access_modifiers"],
  topicIds: ["top_oop_05"],
  tags: ["#encapsulation", "#invariants", "#interview-tradeoffs"],
  hintIds: [],
  xpReward: 300,
  order: 9,
  payload: {
    targetQuestionId: "q_bank_encap_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_invariants",
        label: { en: "State Invariants Protection", ru: "Защита Инвариантов Состояния" },
        keywords: ["invariant", "invariants", "state protection", "valid state", "precondition", "guard", "инвариант", "состояние"]
      },
      {
        id: "cpt_encapsulation",
        label: { en: "Behavior Methods over Setters", ru: "Методы Поведения Вместо Сеттеров" },
        keywords: ["setter", "setters", "behavior", "business behavior", "deposit", "withdraw", "mutation", "сеттер", "поведение"]
      },
      {
        id: "cpt_defensive_copying",
        label: { en: "Defensive Copying & Immutability", ru: "Защитное Копирование и Неизменяемость" },
        keywords: ["defensive copy", "mutable reference", "record", "immutability", "защитное копирование", "мутабельный"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Encapsulation is NOT merely making fields private and adding getters and setters. True encapsulation is the protection of class state invariants. Unrestricted setters expose internal state to arbitrary external corruption just as severely as public fields. Encapsulation guarantees an object instance can never exist in an invalid state.",
      ru: "Elevator Pitch (30 сек): Инкапсуляция — это НЕ просто приватные поля с геттерами и сеттерами. Истинная инкапсуляция — это защита доменных инвариантов класса. Неограниченные сеттеры ломают инварианты так же, как и публичные поля. Инкапсуляция гарантирует, что объект никогда не окажется в нелегитимном состоянии."
    },
    modelAnswerDetailed: {
      en: "Deep Technical Mechanics (60 sec): In enterprise Java, we enforce encapsulation by validating preconditions inside constructors and substituting arbitrary setters with explicit domain behaviors (e.g. deposit() / withdraw()). When working with mutable reference objects like java.util.Date, encapsulation requires defensive copying on both input and output to prevent reference leaks.",
      ru: "Глубокая Механика (60 сек): В enterprise Java мы обеспечиваем инкапсуляцию валидацией предусловий в конструкторе и заменой произвольных сеттеров на доменное поведение (например, deposit() / withdraw()). При работе с мутабельными ссылками (java.util.Date) инкапсуляция требует защитного копирования на входе и выходе."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Defensive copying introduces minor heap allocation overhead, which is negligible for domain entities but critical in ultra-low-latency zero-GC trading paths where java.time.Instant or primitives should be favored. In modern Java 17+, Records provide auto-generated canonical constructor validation.",
      ru: "Продакшн Компромиссы (30 сек): Защитное копирование создает небольшие накладные расходы на аллокацию в куче, что несущественно для доменных объектов, но важно в low-latency торговых системах, где предпочитают примитивы или java.time.Instant. В Java 17+ Records предоставляют встроенную валидацию в каноническом конструкторе."
    },
    followUpQuestionText: {
      en: "Follow-up Question: If an interviewer asks 'How do Java 17 Records impact encapsulation compared to traditional JavaBean classes with getters/setters?' how do you answer?",
      ru: "Дополнительный Вопрос: Если интервьюер спросит 'Как Records в Java 17 влияют на инкапсуляцию по сравнению с классическими JavaBean с геттерами/сеттерами?', как вы ответите?"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Records are transparent data carriers that lack setters entirely (fields are private final). Encapsulation in Records is achieved via Compact Constructors, which validate state invariants before the instance is initialized.",
      ru: "Ответ на Доп. Вопрос: Records — это прозрачные носители данных без сеттеров (поля private final). Инкапсуляция в Records достигается через Компактные Конструкторы, проверяющие инварианты до инициализации экземпляра."
    }
  }
};

export const ALL_BANK_ACCOUNT_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE,
  APPLIED_BUG_HUNT_CHALLENGE,
  INTERVIEW_ANSWER_CHALLENGE
];
