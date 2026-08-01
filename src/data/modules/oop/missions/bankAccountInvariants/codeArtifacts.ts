import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_BANK_ACCOUNT: readonly CodeArtifact[] = [
  {
    id: "art_bank_account_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Unprotected BankAccount",
      ru: "Исходный Нарушенный Код: BankAccount Без Защиты"
    },
    sourceCode: `public class BankAccount {
    // ⚠️ VULNERABILITY 1: Public field allows arbitrary direct external mutation
    public double balance;
    
    // ⚠️ VULNERABILITY 2: Constructor allows creating account with negative balance
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
}`,
    annotations: [
      {
        id: "ann_broken_1",
        startLine: 2,
        endLine: 3,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Public Field Exposure", ru: "Публичный Доступ к Полю" },
        explanation: {
          en: "Making balance public destroys state encapsulation. Any external code can assign account.balance = -999999 without validation.",
          ru: "Публичный доступ к полю balance уничтожает инкапсуляцию. Любой внешний код может записать account.balance = -999999 без проверки."
        },
        problemSolved: {
          en: "Exposes class state directly to external corruption.",
          ru: "Напрямую открывает состояние класса для нелегитимного изменения."
        },
        conceptDemonstrated: "cpt_encapsulation"
      },
      {
        id: "ann_broken_2",
        startLine: 6,
        endLine: 8,
        category: "PRODUCTION_RISK",
        title: { en: "Floating-Point Precision & Missing Guards", ru: "Ошибки Плавающей Точки и Отсутствие Проверок" },
        explanation: {
          en: "double precision introduces IEEE 754 rounding errors during money operations, and initialBalance is not checked for negative amounts.",
          ru: "Тип double привносит ошибки округления по IEEE 754 в финансовых операциях, а initialBalance не проверяется на отрицательное значение."
        },
        conceptDemonstrated: "cpt_monetary_representation"
      }
    ],
    relatedQuestionIds: [],
    conceptIds: ["cpt_encapsulation", "cpt_access_modifiers"],
    tags: ["#encapsulation", "#access-modifiers"]
  },
  {
    id: "art_bank_account_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Encapsulated BankAccount",
      ru: "Продакшн Рефакторинг: Инкапсулированный BankAccount"
    },
    sourceCode: `import java.util.Objects;

public final class BankAccount {
    private final String accountId;
    private long balanceInCents; // Stores monetary sub-units to eliminate float errors

    public BankAccount(String accountId, long initialBalanceInCents) {
        if (initialBalanceInCents < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountId = Objects.requireNonNull(accountId, "Account ID cannot be null");
        this.balanceInCents = initialBalanceInCents;
    }

    public String getAccountId() {
        return accountId;
    }

    public long getBalanceInCents() {
        return balanceInCents;
    }

    // Controlled state transition method (Deposit)
    public void deposit(long amountInCents) {
        if (amountInCents <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        this.balanceInCents += amountInCents;
    }

    // Controlled state transition method (Withdrawal)
    public void withdraw(long amountInCents) {
        if (amountInCents <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amountInCents > this.balanceInCents) {
            throw new IllegalStateException("Insufficient funds for withdrawal");
        }
        this.balanceInCents -= amountInCents;
    }
}`,
    annotations: [
      {
        id: "ann_sol_1",
        startLine: 4,
        endLine: 5,
        category: "WHY_IT_EXISTS",
        title: { en: "Private Fields & Long Cents", ru: "Приватные Поля и Цент-Баланс" },
        explanation: {
          en: "Fields are private, preventing direct mutation. Storing balance as long cents guarantees exact integer arithmetic without IEEE 754 float drift.",
          ru: "Поля сделаны приватными для защиты от прямой мутации. Хранение баланса в long центах гарантирует точную целочисленную арифметику."
        },
        problemSolved: {
          en: "Fixes IEEE 754 floating-point precision loss.",
          ru: "Устраняет потери точности при расчетах с плавающей точкой."
        },
        conceptDemonstrated: "cpt_monetary_representation"
      },
      {
        id: "ann_sol_2",
        startLine: 7,
        endLine: 12,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Constructor Guard Invariant Validation", ru: "Валидация Инвариантов в Конструкторе" },
        explanation: {
          en: "Enforcing preconditions in the constructor guarantees an invalid BankAccount instance can NEVER be instantiated.",
          ru: "Проверка предусловий в конструкторе гарантирует, что нелегитимный объект BankAccount НИКОГДА не будет создан."
        },
        conceptDemonstrated: "cpt_invariants"
      },
      {
        id: "ann_sol_3",
        startLine: 23,
        endLine: 38,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Controlled Behavior Methods over Public Setters", ru: "Методы Поведения Вместо Публичных Сеттеров" },
        explanation: {
          en: "deposit() and withdraw() enforce domain rules before mutating state, replacing dangerous unrestricted setters with explicit business behaviors.",
          ru: "deposit() и withdraw() проверяют доменные правила перед изменением состояния, заменяя опасные сеттеры на явное бизнес-поведение."
        },
        conceptDemonstrated: "cpt_encapsulation"
      }
    ],
    relatedQuestionIds: [],
    conceptIds: ["cpt_encapsulation", "cpt_invariants", "cpt_monetary_representation"],
    tags: ["#encapsulation", "#invariants", "#money"]
  },
  {
    id: "art_account_period_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: AccountPeriod Reference Leak",
      ru: "Код для Поиска Бага: Утечка Ссылки в AccountPeriod"
    },
    sourceCode: `import java.util.Date;

public final class AccountPeriod {
    private final Date startDate;
    private final Date endDate;

    public AccountPeriod(Date startDate, Date endDate) {
        if (startDate.after(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        // Line 10: Assigning mutable reference directly!
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Date getStartDate() {
        // Line 16: Returning internal mutable reference directly!
        return startDate;
    }
}`,
    annotations: [
      {
        id: "ann_bug_leak_1",
        startLine: 10,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Mutable Object Reference Leak in Constructor", ru: "Утечка Ссылки на Мутабельный Объект в Конструкторе" },
        explanation: {
          en: "Storing external java.util.Date references directly allows external caller code to mutate the Date instance after object construction, bypassing startDate.after(endDate) validation!",
          ru: "Сохранение внешней ссылки java.util.Date позволяет внешнему коду изменить дату после создания объекта, обходя валидацию!"
        },
        problemSolved: {
          en: "Direct assignment leaks internal state control.",
          ru: "Прямое присвоение приводит к потере контроля над внутренним состоянием."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      },
      {
        id: "ann_bug_leak_2",
        startLine: 16,
        endLine: 18,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Getter Mutable Reference Leak", ru: "Утечка Мутабельной Ссылки в Геттере" },
        explanation: {
          en: "Returning internal Date reference directly allows callers to invoke startDate.setTime(0), corrupting the period invariant externally.",
          ru: "Возврат ссылки на Date позволяет внешнему коду вызвать startDate.setTime(0), ломая инвариант периода извне."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      }
    ],
    relatedQuestionIds: [],
    conceptIds: ["cpt_defensive_copying", "cpt_encapsulation"],
    tags: ["#defensive-copying", "#invariants"]
  }
];
