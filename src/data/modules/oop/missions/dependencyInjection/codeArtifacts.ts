import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_DEPENDENCY_INJECTION: readonly CodeArtifact[] = [
  {
    id: "art_settlement_orchestrator_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Field-Injected SettlementOrchestrator",
      ru: "Исходный Нарушенный Код: Field-Injected SettlementOrchestrator"
    },
    sourceCode: `package com.enterprise.payments.settlement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * PRODUCTION BUG: Field @Autowired leaves fxRates/ledger null under plain \`new\`.
 * settle() also hard-wires LiveFxRateGateway — DIP violation + unmockable FX path.
 */
public interface FxRateGateway {
    Money convert(Money amount, String targetCurrency);
    Rate getMidRate(String base, String quote);
}

public class LiveFxRateGateway implements FxRateGateway {
    @Override
    public Money convert(Money amount, String targetCurrency) {
        // hits live FX HTTP API
        return amount; // simplified
    }

    @Override
    public Rate getMidRate(String base, String quote) {
        return Rate.of(base, quote, "1.0");
    }
}

public interface LedgerGateway {
    void post(String accountId, Money amount);
}

public record SettlementRequest(String id, String accountId, Money amount, String targetCurrency) {}
public record SettlementReceipt(String requestId, Money settled) {}
public record Money(long amountCents, String currency) {}
public record Rate(String base, String quote, String mid) {
    static Rate of(String base, String quote, String mid) {
        return new Rate(base, quote, mid);
    }
}

@Service
public class SettlementOrchestrator {

    // ⚠️ VULNERABILITY: Field injection — null when constructed with \`new\` in unit tests
    @Autowired
    private FxRateGateway fxRates;

    // ⚠️ VULNERABILITY: Hidden mandatory collaborator — hard to mock without Spring/reflection
    @Autowired
    private LedgerGateway ledger;

    // No constructor — Spring populates fields; unit tests do not

    public SettlementReceipt settle(SettlementRequest request) {
        FxRateGateway rates = fxRates;
        if (rates == null) {
            // ⚠️ VULNERABILITY: Hard-wired concrete adapter — DIP violation
            rates = new LiveFxRateGateway();
        }
        Rate mid = rates.getMidRate(request.amount().currency(), request.targetCurrency());
        Money converted = rates.convert(request.amount(), request.targetCurrency());
        ledger.post(request.accountId(), converted);
        return new SettlementReceipt(request.id(), converted);
    }
}`,
    annotations: [
      {
        id: "ann_broken_di_1",
        startLine: 52,
        endLine: 54,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Field @Autowired FxRateGateway", ru: "Field @Autowired FxRateGateway" },
        explanation: {
          en: "fxRates is populated only by the Spring container. Unit tests calling `new SettlementOrchestrator()` leave it null → NPE on getMidRate/convert.",
          ru: "fxRates заполняет только Spring-контейнер. Юнит-тесты с `new SettlementOrchestrator()` оставляют null → NPE на getMidRate/convert."
        },
        problemSolved: {
          en: "Exposes that mandatory FX collaborator is invisible in the type signature.",
          ru: "Показывает, что обязательный FX-коллаборатор невидим в сигнатуре типа."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_broken_di_2",
        startLine: 56,
        endLine: 58,
        category: "PRODUCTION_RISK",
        title: { en: "Hidden LedgerGateway Field Injection", ru: "Скрытый Field Injection LedgerGateway" },
        explanation: {
          en: "ledger is likewise null outside Spring. Mocking requires ReflectionTestUtils or a full @SpringBootTest — slow and brittle.",
          ru: "ledger также null вне Spring. Моки требуют ReflectionTestUtils или полный @SpringBootTest — медленно и хрупко."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_broken_di_3",
        startLine: 65,
        endLine: 68,
        category: "PRODUCTION_RISK",
        title: { en: "new LiveFxRateGateway() Hard-Wire", ru: "Жёсткий new LiveFxRateGateway()" },
        explanation: {
          en: "Fallback constructs a concrete low-level FX adapter inside high-level settle() — violates DIP, prevents stubbing rates, risks live HTTP in tests.",
          ru: "Fallback создаёт конкретный низкоуровневый FX-адаптер внутри высокоуровневого settle() — нарушает DIP, мешает stub курсов, рискует live HTTP в тестах."
        },
        conceptDemonstrated: "cpt_dependency_inversion"
      }
    ],
    relatedQuestionIds: ["q_di_settlement_01"],
    conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
    tags: ["#dependency-injection", "#field-injection", "#settlement"]
  },
  {
    id: "art_settlement_orchestrator_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Constructor-Injected SettlementOrchestrator",
      ru: "Продакшн Рефакторинг: Constructor-Injected SettlementOrchestrator"
    },
    sourceCode: `package com.enterprise.payments.settlement;

import java.util.Objects;
import org.springframework.stereotype.Service;

/**
 * Production-safe: constructor injection, final fields, DIP ports only.
 */
public interface FxRateGateway {
    Money convert(Money amount, String targetCurrency);
    Rate getMidRate(String base, String quote);
}

public interface LedgerGateway {
    void post(String accountId, Money amount);
}

public record SettlementRequest(String id, String accountId, Money amount, String targetCurrency) {}
public record SettlementReceipt(String requestId, Money settled) {}
public record Money(long amountCents, String currency) {}
public record Rate(String base, String quote, String mid) {}

/**
 * Live adapter lives at the edge — wired by the composition root, never \`new\`'d in settle().
 */
public class LiveFxRateGateway implements FxRateGateway {
    @Override
    public Money convert(Money amount, String targetCurrency) {
        return amount; // simplified live FX
    }

    @Override
    public Rate getMidRate(String base, String quote) {
        return new Rate(base, quote, "1.0");
    }
}

@Service
public class SettlementOrchestrator {

    private final FxRateGateway fxRates;
    private final LedgerGateway ledger;

    // Single constructor — Spring auto-wires; unit tests pass mocks directly
    public SettlementOrchestrator(FxRateGateway fxRates, LedgerGateway ledger) {
        this.fxRates = Objects.requireNonNull(fxRates, "fxRates required");
        this.ledger = Objects.requireNonNull(ledger, "ledger required");
    }

    public SettlementReceipt settle(SettlementRequest request) {
        fxRates.getMidRate(request.amount().currency(), request.targetCurrency());
        Money converted = fxRates.convert(request.amount(), request.targetCurrency());
        ledger.post(request.accountId(), converted);
        return new SettlementReceipt(request.id(), converted);
    }
}`,
    annotations: [
      {
        id: "ann_sol_di_1",
        startLine: 42,
        endLine: 43,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "private final Collaborator Fields", ru: "private final Поля Коллабораторов" },
        explanation: {
          en: "Final fields cannot be left half-wired after construction. Orchestrator state is immutable regarding collaborators.",
          ru: "Final-поля нельзя оставить полусвязанными после создания. Состояние оркестратора неизменяемо относительно коллабораторов."
        },
        problemSolved: {
          en: "Eliminates null field-injected collaborators in unit tests.",
          ru: "Устраняет null field-injected коллабораторов в юнит-тестах."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_sol_di_2",
        startLine: 46,
        endLine: 49,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Constructor Injection", ru: "Constructor Injection" },
        explanation: {
          en: "Explicit constructor documents mandatory FxRateGateway and LedgerGateway. Tests: `new SettlementOrchestrator(mockFx, mockLedger)`.",
          ru: "Явный конструктор документирует обязательные FxRateGateway и LedgerGateway. Тесты: `new SettlementOrchestrator(mockFx, mockLedger)`."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_sol_di_3",
        startLine: 52,
        endLine: 56,
        category: "WHY_IT_EXISTS",
        title: { en: "No in-method new — DIP Ports Only", ru: "Без new в методе — Только Порты DIP" },
        explanation: {
          en: "settle() uses only injected abstractions. LiveFxRateGateway is supplied by the composition root, enabling stubs and Clean Architecture boundaries.",
          ru: "settle() использует только внедрённые абстракции. LiveFxRateGateway поставляет composition root — стабы и границы Clean Architecture."
        },
        conceptDemonstrated: "cpt_dependency_inversion"
      }
    ],
    relatedQuestionIds: ["q_di_settlement_01"],
    conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
    tags: ["#dependency-injection", "#constructor-injection", "#dip", "#settlement"]
  },
  {
    id: "art_settlement_orchestrator_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: SettlementOrchestrator Field Injection",
      ru: "Код для Поиска Бага: Field Injection в SettlementOrchestrator"
    },
    sourceCode: `package com.enterprise.payments.settlement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettlementOrchestrator {

    @Autowired
    private FxRateGateway fxRates; // null under plain new!

    @Autowired
    private LedgerGateway ledger; // hidden mandatory dep!

    public SettlementReceipt settle(SettlementRequest request) {
        FxRateGateway rates = fxRates;
        if (rates == null) {
            rates = new LiveFxRateGateway(); // DIP violation!
        }
        Money converted = rates.convert(request.amount(), request.targetCurrency());
        ledger.post(request.accountId(), converted);
        return new SettlementReceipt(request.id(), converted);
    }
}`,
    annotations: [
      {
        id: "ann_bug_di_1",
        startLine: 9,
        endLine: 9,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Null Field-Injected FX Gateway", ru: "Null Field-Injected FX Gateway" },
        explanation: {
          en: "fxRates stays null when unit tests instantiate with `new` — classic field-injection NPE.",
          ru: "fxRates остаётся null при инстанцировании через `new` в юнит-тестах — классический NPE field injection."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_bug_di_2",
        startLine: 12,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Hidden Ledger Field Injection", ru: "Скрытый Field Injection Ledger" },
        explanation: {
          en: "ledger is a mandatory collaborator invisible in constructors — hard to mock and easy to leave unset.",
          ru: "ledger — обязательный коллаборатор, невидимый в конструкторах — сложно мокать и легко не выставить."
        },
        conceptDemonstrated: "cpt_dependency_injection"
      },
      {
        id: "ann_bug_di_3",
        startLine: 17,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Hard-Wired LiveFxRateGateway", ru: "Жёсткий LiveFxRateGateway" },
        explanation: {
          en: "`new LiveFxRateGateway()` couples high-level settle() to a concrete adapter — DIP break and unmockable FX.",
          ru: "`new LiveFxRateGateway()` связывает высокоуровневый settle() с конкретным адаптером — поломка DIP и немокаемый FX."
        },
        conceptDemonstrated: "cpt_dependency_inversion"
      }
    ],
    relatedQuestionIds: ["q_di_settlement_01"],
    conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
    tags: ["#dependency-injection", "#bughunt", "#settlement"]
  }
];
