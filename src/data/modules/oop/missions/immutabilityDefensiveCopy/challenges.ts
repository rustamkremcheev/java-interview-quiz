import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_IMM: FixBuilderChallenge = {
  id: "chl_imm_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_immutability_defensive_copy",
  stageId: "stg_imm_practice",
  title: {
    en: "Fix Reference Leak Vulnerability in CustomerSnapshot",
    ru: "Исправление Утечки Ссылок в CustomerSnapshot"
  },
  prompt: {
    en: "Refactor the broken Money, Transaction, and CustomerSnapshot to achieve deep immutability. Select the necessary structural building blocks to prevent settlement corruption via mutable List, BigDecimal, and Date reference leaks.",
    ru: "Проведите рефакторинг Money, Transaction и CustomerSnapshot для глубокой неизменяемости. Выберите блоки для предотвращения порчи settlement через утечки мутабельных ссылок List, BigDecimal и Date."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_immutability", "cpt_defensive_copying"],
  topicIds: ["top_oop_22"],
  tags: ["#immutability", "#defensive-copying", "#payment-reconciliation"],
  hintIds: ["hnt_imm_1", "hnt_imm_2", "hnt_imm_3", "hnt_imm_4"],
  xpReward: 250,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_customer_snapshot_broken",
    solutionCodeArtifactId: "art_customer_snapshot_solution",
    options: [
      {
        id: "opt_imm_fix_1",
        text: {
          en: "Apply defensive copy in CustomerSnapshot constructor: this.transactions = List.copyOf(transactions);",
          ru: "Применить защитное копирование в конструкторе CustomerSnapshot: this.transactions = List.copyOf(transactions);"
        },
        isCorrect: true,
        explanation: {
          en: "Correct. List.copyOf creates an independent immutable snapshot, preventing aliasing attacks and getTransactions().add(fakeTxn).",
          ru: "Верно. List.copyOf создает независимый неизменяемый снимок, предотвращая aliasing-атаки и getTransactions().add(fakeTxn)."
        }
      },
      {
        id: "opt_imm_fix_2",
        text: {
          en: "Replace mutable BigDecimal Money with an immutable Money record using long amountCents, and replace java.util.Date with java.time.Instant for bookedAt.",
          ru: "Заменить мутабельный BigDecimal Money на неизменяемый Money record с long amountCents, а java.util.Date — на java.time.Instant для bookedAt."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Long cents and Instant are inherently immutable — no setTime() or shared mutable BigDecimal reference leaks.",
          ru: "Верно. Long cents и Instant по природе неизменяемы — нет setTime() и утечек мутабельного BigDecimal."
        }
      },
      {
        id: "opt_imm_fix_3",
        text: {
          en: "Return immutable collection views from getters — transactions is already List.copyOf, so getTransactions() returns an unmodifiable list.",
          ru: "Возвращать неизменяемые представления коллекций из геттеров — transactions уже List.copyOf, поэтому getTransactions() возвращает неизменяемый список."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. When internal storage is already immutable via List.copyOf, getter output is safe. snapshot.getTransactions().add() throws UnsupportedOperationException.",
          ru: "Верно. Когда внутреннее хранилище уже неизменяемо через List.copyOf, выход геттера безопасен. snapshot.getTransactions().add() выбросит UnsupportedOperationException."
        }
      },
      {
        id: "opt_imm_fix_distractor_1",
        text: {
          en: "Add synchronized keyword to getTransactions() and getTotalExposure() to make the snapshot thread-safe.",
          ru: "Добавить synchronized к getTransactions() и getTotalExposure() для потокобезопасности снимка."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronizing getters does not prevent external mutation of returned mutable List, Money, or Date references.",
          ru: "Неверно. Синхронизация геттеров не предотвращает внешнюю мутацию возвращаемых мутабельных ссылок List, Money или Date."
        }
      },
      {
        id: "opt_imm_fix_distractor_2",
        text: {
          en: "Keep returning internal ArrayList and BigDecimal from getters but add @Immutable annotation for static analysis.",
          ru: "Продолжать возвращать внутренние ArrayList и BigDecimal из геттеров, но добавить аннотацию @Immutable для статического анализа."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Annotations do not change runtime behavior. External callers can still invoke getTransactions().add(fakeTxn).",
          ru: "Неверно. Аннотации не меняют поведение в runtime. Внешний код по-прежнему может вызвать getTransactions().add(fakeTxn)."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_IMM: BugHuntChallenge = {
  id: "chl_imm_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_immutability_defensive_copy",
  stageId: "stg_imm_debug",
  title: {
    en: "Bug Hunt: Identify CustomerSnapshot Reference Leaks",
    ru: "Поиск Бага: Утечки Ссылок в CustomerSnapshot"
  },
  prompt: {
    en: "Inspect the Money, Transaction, and CustomerSnapshot classes below. Click on the exact line(s) in the code viewer that leak mutable List, BigDecimal, or Date references, enabling settlement corruption in the reconciliation service.",
    ru: "Изучите классы Money, Transaction и CustomerSnapshot ниже. Нажмите на строку(и) в редакторе кода, где утекают мутабельные ссылки List, BigDecimal или Date, позволяя порчу settlement в сервисе сверки."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_defensive_copying", "cpt_immutability"],
  topicIds: ["top_oop_22"],
  tags: ["#defensive-copying", "#immutability", "#bughunt"],
  hintIds: ["hnt_imm_bug_1", "hnt_imm_bug_2", "hnt_imm_bug_3", "hnt_imm_bug_4"],
  xpReward: 250,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_customer_snapshot_bughunt",
    solutionCodeArtifactId: "art_customer_snapshot_solution",
    codeSnippet: `import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal getAmount() {
        return amount; // Line 16
    }

    public String getCurrency() { return currency; }
}

public final class Transaction {
    private final String id;
    private final Money amount;
    private final Date bookedAt;

    public Transaction(String id, Money amount, Date bookedAt) {
        this.id = id;
        this.amount = amount;
        this.bookedAt = bookedAt; // Line 29
    }

    public Date getBookedAt() {
        return bookedAt; // Line 33
    }
}

public final class CustomerSnapshot {
    private final String customerId;
    private final List<Transaction> transactions;
    private final Money totalExposure;

    public CustomerSnapshot(String customerId, List<Transaction> transactions, Money totalExposure) {
        this.customerId = Objects.requireNonNull(customerId);
        this.transactions = new ArrayList<>(transactions);
        this.totalExposure = totalExposure;
    }

    public List<Transaction> getTransactions() {
        return transactions; // Line 49
    }

    public Money getTotalExposure() {
        return totalExposure;
    }
}`,
    lines: [
      { lineNumber: 1, code: "import java.math.BigDecimal;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "import java.util.ArrayList;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "import java.util.Date;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "import java.util.List;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "import java.util.Objects;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "public class Money {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "    private final BigDecimal amount;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "    private final String currency;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "    public Money(BigDecimal amount, String currency) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "        this.amount = amount;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "        this.currency = currency;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 14, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 15, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 16, code: "    public BigDecimal getAmount() {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 17,
        code: "        return amount;",
        isBug: true,
        explanation: {
          en: "Line 17 returns internal BigDecimal. Shared mutable monetary references let fraud/ops corrupt Money values that feed settlement totals.",
          ru: "Строка 17 возвращает внутренний BigDecimal. Общие мутабельные денежные ссылки позволяют fraud/ops портить значения Money для settlement."
        }
      },
      { lineNumber: 18, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 19, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 20, code: "    public String getCurrency() { return currency; }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 21, code: "}", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 22, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 23, code: "public final class Transaction {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 24, code: "    private final String id;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 25, code: "    private final Money amount;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 26, code: "    private final Date bookedAt;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 27, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 28, code: "    public Transaction(String id, Money amount, Date bookedAt) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 29, code: "        this.id = id;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 30, code: "        this.amount = amount;", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 31,
        code: "        this.bookedAt = bookedAt;",
        isBug: true,
        explanation: {
          en: "Line 31 stores external mutable Date reference directly! Caller can invoke bookedAt.setTime(0) after construction, rewriting reconciliation timelines.",
          ru: "Строка 31 сохраняет внешнюю мутабельную ссылку Date напрямую! Вызывающий может вызвать bookedAt.setTime(0) после создания, переписывая таймлайн сверки."
        }
      },
      { lineNumber: 32, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 33, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 34, code: "    public Date getBookedAt() {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 35,
        code: "        return bookedAt;",
        isBug: true,
        explanation: {
          en: "Line 35 returns internal Date reference directly! Callers can invoke getBookedAt().setTime(0), corrupting transaction booking times used in settlement.",
          ru: "Строка 35 возвращает внутреннюю ссылку Date напрямую! Вызывающий может вызвать getBookedAt().setTime(0), портя время бронирования транзакций для settlement."
        }
      },
      { lineNumber: 36, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 37, code: "}", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 38, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 39, code: "public final class CustomerSnapshot {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 40, code: "    private final String customerId;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 41, code: "    private final List<Transaction> transactions;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 42, code: "    private final Money totalExposure;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 43, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 44, code: "    public CustomerSnapshot(String customerId, List<Transaction> transactions, Money totalExposure) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 45, code: "        this.customerId = Objects.requireNonNull(customerId);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 46, code: "        this.transactions = new ArrayList<>(transactions);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 47, code: "        this.totalExposure = totalExposure;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 48, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 49, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 50, code: "    public List<Transaction> getTransactions() {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 51,
        code: "        return transactions;",
        isBug: true,
        explanation: {
          en: "Line 51 returns internal mutable ArrayList directly! Fraud/ops invoked snapshot.getTransactions().add(fakeTxn), corrupting cached settlement totals.",
          ru: "Строка 51 возвращает внутренний мутабельный ArrayList напрямую! Fraud/ops вызвал snapshot.getTransactions().add(fakeTxn), портя кэшированные settlement-итоги."
        }
      },
      { lineNumber: 52, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 53, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 54, code: "    public Money getTotalExposure() {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 55, code: "        return totalExposure;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 56, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 57, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_IMM: InterviewAnswerChallenge = {
  id: "chl_imm_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_immutability_defensive_copy",
  stageId: "stg_imm_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Immutability vs private final",
    ru: "Устный Ответ на Senior-Интервью: Неизменяемость vs private final"
  },
  prompt: {
    en: "Our CustomerSnapshot has all fields declared private final, yet fraud/ops code corrupted settlement totals by calling getTransactions().add(fakeTxn) and mutating Money via a leaked BigDecimal. Explain why private final did not guarantee immutability and how you would fix it.",
    ru: "CustomerSnapshot имеет все поля private final, но fraud/ops код испортил settlement-итоги через getTransactions().add(fakeTxn) и мутацию Money через утекший BigDecimal. Объясните, почему private final не гарантировал неизменяемость и как вы это исправите."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_immutability", "cpt_defensive_copying", "cpt_encapsulation"],
  topicIds: ["top_oop_22"],
  tags: ["#immutability", "#defensive-copying", "#interview-tradeoffs"],
  hintIds: [],
  xpReward: 300,
  order: 9,
  payload: {
    targetQuestionId: "q_imm_snapshot_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_immutability",
        label: { en: "Deep vs Shallow Immutability", ru: "Глубокая vs Поверхностная Неизменяемость" },
        keywords: ["immutable", "immutability", "final", "deep", "shallow", "неизменяем", "final"]
      },
      {
        id: "cpt_defensive_copying",
        label: { en: "Defensive Copying on Input & Output", ru: "Защитное Копирование на Входе и Выходе" },
        keywords: ["defensive copy", "List.copyOf", "unmodifiable", "защитное копирование", "copyOf"]
      },
      {
        id: "cpt_mutable_reference_leak",
        label: { en: "Mutable Reference Leak via Getters", ru: "Утечка Мутабельной Ссылки через Геттеры" },
        keywords: ["reference leak", "getter", "getTransactions", "add", "BigDecimal", "утечка", "геттер"]
      },
      {
        id: "cpt_instant_over_date",
        label: { en: "Immutable Money + Instant over Date/BigDecimal", ru: "Неизменяемый Money + Instant вместо Date/BigDecimal" },
        keywords: ["Instant", "Date", "Money", "cents", "BigDecimal", "setTime"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): private final only prevents reassigning the reference variable — it does NOT make the referenced object immutable. CustomerSnapshot leaked its internal ArrayList through getTransactions(), and Money leaked mutable BigDecimal while Transaction stored mutable Date. Fraud/ops mutated those objects directly: getTransactions().add(fakeTxn) and Date.setTime(). No setter on CustomerSnapshot was ever called, yet settlement totals were corrupted.",
      ru: "Elevator Pitch (30 сек): private final лишь запрещает переприсвоение ссылки — он НЕ делает объект по ссылке неизменяемым. CustomerSnapshot утекал внутренний ArrayList через getTransactions(), Money утекал мутабельный BigDecimal, а Transaction хранил мутабельный Date. Fraud/ops мутировал эти объекты напрямую: getTransactions().add(fakeTxn) и Date.setTime(). Сеттер CustomerSnapshot не вызывался, но settlement-итоги были испорчены."
    },
    modelAnswerDetailed: {
      en: "Deep Technical Mechanics (60 sec): True immutability requires deep unmodifiable state. Fix: apply List.copyOf(transactions) in the CustomerSnapshot constructor for an independent immutable snapshot. Model Money as a record with long amountCents — no mutable BigDecimal. Replace java.util.Date with java.time.Instant — Instant has no setTime() mutator. For getter output, since List.copyOf produces an unmodifiable list internally, getTransactions() safely returns the immutable view. Per Effective Java Item 50, defend both constructor input and getter output boundaries.",
      ru: "Глубокая Механика (60 сек): Подлинная неизменяемость требует глубокого неизменяемого состояния. Фикс: List.copyOf(transactions) в конструкторе CustomerSnapshot для независимого снимка. Моделировать Money как record с long amountCents — без мутабельного BigDecimal. Заменить java.util.Date на java.time.Instant — у Instant нет мутатора setTime(). Для выхода геттера, поскольку List.copyOf создает неизменяемый список, getTransactions() безопасно возвращает это представление. Согласно Effective Java Item 50 — защищать обе границы: вход конструктора и выход геттера."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Defensive copying adds minor heap allocation per construction, negligible for reconciliation snapshots but worth noting in ultra-hot paths. List.copyOf is O(n) in transaction count — acceptable for typical customer exposures. Java 17 Money records with long cents avoid BigDecimal allocation and mutation hazards. ArchUnit tests enforcing 'no getter returns mutable type' are more reliable than @Immutable annotations alone.",
      ru: "Продакшн Компромиссы (30 сек): Защитное копирование добавляет небольшую аллокацию при создании — несущественно для reconciliation-снимков, но важно в ultra-hot путях. List.copyOf — O(n) по числу транзакций — приемлемо для типичных экспозиций клиента. Java 17 Money record с long cents избегает аллокаций BigDecimal и рисков мутации. ArchUnit-тесты 'геттер не возвращает мутабельный тип' надежнее одних аннотаций @Immutable."
    },
    followUpQuestionText: {
      en: "Follow-up Question: 'Would a Java 17 record automatically fix this CustomerSnapshot bug?'",
      ru: "Дополнительный Вопрос: 'Исправит ли Java 17 record автоматически этот баг CustomerSnapshot?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: No. Records provide shallow immutability — component references cannot be reassigned, but mutable component types remain mutable. A record with List<Transaction> transactions and Date bookedAt would still leak unless the compact constructor applies transactions = List.copyOf(transactions), Money uses immutable long cents, and bookedAt is Instant. Records eliminate boilerplate but do NOT replace defensive copying discipline for mutable component types.",
      ru: "Ответ на Доп. Вопрос: Нет. Record обеспечивает поверхностную неизменяемость — ссылки компонентов нельзя переприсвоить, но мутабельные типы компонентов остаются мутабельными. Record с List<Transaction> transactions и Date bookedAt все равно будет утекать, если компактный конструктор не применит transactions = List.copyOf(transactions), Money не использует неизменяемые long cents, а bookedAt не заменен на Instant. Record убирает boilerplate, но НЕ заменяет дисциплину защитного копирования для мутабельных компонентов."
    }
  }
};

export const ALL_IMMUTABILITY_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_IMM,
  APPLIED_BUG_HUNT_CHALLENGE_IMM,
  INTERVIEW_ANSWER_CHALLENGE_IMM
];
