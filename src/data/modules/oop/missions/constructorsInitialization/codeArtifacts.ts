import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_CONSTRUCTORS_INITIALIZATION: readonly CodeArtifact[] = [
  {
    id: "art_ci_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: Counterparty & TradeSettlementTerms",
      ru: "Доменные Типы: Counterparty и TradeSettlementTerms"
    },
    sourceCode: `package com.bank.trades.registration;

public record Counterparty(String lei, String name) {
    public Counterparty {
        if (lei == null || lei.isBlank()) {
            throw new IllegalArgumentException("lei required");
        }
    }
}

public record TradeSettlementTerms(String ccy, String ssiCode, int settlementDays) {
    public TradeSettlementTerms {
        if (ccy == null || ccy.isBlank()) {
            throw new IllegalArgumentException("ccy required");
        }
        if (settlementDays < 0) {
            throw new IllegalArgumentException("settlementDays >= 0");
        }
    }
}`,
    annotations: [
      {
        id: "ann_ci_domain_1",
        startLine: 3,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Required Dependencies of TradeRegistration", ru: "Обязательные Зависимости TradeRegistration" },
        explanation: {
          en: "A published TradeRegistration without Counterparty / TradeSettlementTerms is not a valid trade — construction must finish before registry visibility.",
          ru: "Опубликованный TradeRegistration без Counterparty / TradeSettlementTerms — невалидная сделка; construction должен завершиться до видимости в registry."
        },
        conceptDemonstrated: "cpt_safe_construction"
      }
    ],
    relatedQuestionIds: ["q_ci_this_escape_01"],
    conceptIds: ["cpt_safe_construction"],
    tags: ["#counterparty", "#settlement-terms"]
  },
  {
    id: "art_ci_registration_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: This-Escape TradeRegistration",
      ru: "Исходный Нарушенный Код: This-Escape TradeRegistration"
    },
    sourceCode: `package com.bank.trades.registration;

/**
 * BUG: registers this before fields are set; calls overridable validate() from constructor.
 */
public class TradeRegistration {
    private Counterparty counterparty;
    private TradeSettlementTerms settlementTerms;
    private final TradeValidator validator;

    public TradeRegistration(
            TradeRegistry registry,
            TradeValidator validator,
            Counterparty counterparty,
            TradeSettlementTerms settlementTerms) {
        this.validator = validator;
        registry.register(this);
        this.counterparty = counterparty;
        this.settlementTerms = settlementTerms;
        validate();
    }

    protected void validate() {
        validator.requireComplete(counterparty, settlementTerms);
    }

    public Counterparty getCounterparty() { return counterparty; }
    public TradeSettlementTerms getSettlementTerms() { return settlementTerms; }
}`,
    annotations: [
      {
        id: "ann_broken_ci_1",
        startLine: 18,
        endLine: 18,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Early register(this)", ru: "Ранний register(this)" },
        explanation: {
          en: "this escapes to TradeRegistry before Counterparty and TradeSettlementTerms are assigned.",
          ru: "this утекает в TradeRegistry до присвоения Counterparty и TradeSettlementTerms."
        },
        conceptDemonstrated: "cpt_this_escape"
      },
      {
        id: "ann_broken_ci_2",
        startLine: 21,
        endLine: 21,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Overridable validate() from Ctor", ru: "Переопределяемый validate() из Ctor" },
        explanation: {
          en: "Subclass overrides can run before subclass fields initialize — Effective Java Item 19 hazard.",
          ru: "Override subclass могут выполниться до инициализации полей subclass — опасность Effective Java Item 19."
        },
        conceptDemonstrated: "cpt_constructor_init_order"
      }
    ],
    relatedQuestionIds: ["q_ci_this_escape_01"],
    conceptIds: ["cpt_this_escape", "cpt_constructor_init_order"],
    tags: ["#counter-example", "#this-escape"]
  },
  {
    id: "art_ci_registry",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "TradeRegistry: Shared Publication Point",
      ru: "TradeRegistry: Точка Общей Публикации"
    },
    sourceCode: `package com.bank.trades.registration;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class TradeRegistry {
    private final List<TradeRegistration> trades = new CopyOnWriteArrayList<>();
    private final List<TradeRegistrationListener> listeners = new ArrayList<>();

    public void register(TradeRegistration trade) {
        trades.add(trade);
        for (TradeRegistrationListener listener : listeners) {
            listener.onRegistered(trade);
        }
    }

    public void addListener(TradeRegistrationListener listener) {
        listeners.add(listener);
    }
}

@FunctionalInterface
interface TradeRegistrationListener {
    void onRegistered(TradeRegistration trade);
}`,
    annotations: [
      {
        id: "ann_ci_registry_1",
        startLine: 11,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Listeners Observe Immediately", ru: "Listeners Наблюдают Сразу" },
        explanation: {
          en: "register stores and notifies — any this passed mid-constructor becomes visible half-initialized.",
          ru: "register сохраняет и уведомляет — любой this, переданный mid-constructor, становится видимым полуинициализированным."
        },
        conceptDemonstrated: "cpt_this_escape"
      }
    ],
    relatedQuestionIds: ["q_ci_this_escape_01"],
    conceptIds: ["cpt_this_escape"],
    tags: ["#trade-registry"]
  },
  {
    id: "art_ci_registration_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed TradeRegistration: Factory Then Register",
      ru: "Исправленный TradeRegistration: Factory Затем Register"
    },
    sourceCode: `package com.bank.trades.registration;

public final class TradeRegistration {
    private final Counterparty counterparty;
    private final TradeSettlementTerms settlementTerms;

    private TradeRegistration(Counterparty counterparty, TradeSettlementTerms settlementTerms) {
        this.counterparty = counterparty;
        this.settlementTerms = settlementTerms;
        validateInvariants();
    }

    public static TradeRegistration createAndRegister(
            TradeRegistry registry,
            TradeValidator validator,
            Counterparty counterparty,
            TradeSettlementTerms settlementTerms) {
        validator.requireComplete(counterparty, settlementTerms);
        TradeRegistration built = new TradeRegistration(counterparty, settlementTerms);
        registry.register(built);
        return built;
    }

    private void validateInvariants() {
        if (counterparty == null || settlementTerms == null) {
            throw new IllegalStateException("incomplete trade");
        }
    }

    public Counterparty getCounterparty() { return counterparty; }
    public TradeSettlementTerms getSettlementTerms() { return settlementTerms; }
}`,
    annotations: [
      {
        id: "ann_sol_ci_1",
        startLine: 13,
        endLine: 21,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Register After Construction Completes", ru: "Register После Завершения Construction" },
        explanation: {
          en: "new returns only after fields and private validation finish — then registry sees a complete object.",
          ru: "new возвращается только после полей и private validation — затем registry видит полный объект."
        },
        conceptDemonstrated: "cpt_safe_construction"
      }
    ],
    relatedQuestionIds: ["q_ci_this_escape_01"],
    conceptIds: ["cpt_safe_construction", "cpt_this_escape"],
    tags: ["#solution", "#factory"]
  },
  {
    id: "art_ci_registration_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Escape + Overridable Validate",
      ru: "Сниппет Bug Hunt: Escape + Переопределяемый Validate"
    },
    sourceCode: `public TradeRegistration(TradeRegistry registry, Counterparty cpty, TradeSettlementTerms terms) {
    registry.register(this);
    this.counterparty = cpty;
    this.settlementTerms = terms;
    validate();
}`,
    annotations: [
      {
        id: "ann_bug_ci_1",
        startLine: 2,
        endLine: 2,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "This Escape Register", ru: "Register с This Escape" },
        explanation: {
          en: "This is the publication point that leaks a half-initialized TradeRegistration.",
          ru: "Это точка публикации, утекающая полуинициализированный TradeRegistration."
        },
        conceptDemonstrated: "cpt_this_escape"
      }
    ],
    relatedQuestionIds: ["q_ci_this_escape_01"],
    conceptIds: ["cpt_this_escape", "cpt_constructor_init_order"],
    tags: ["#bug-hunt"]
  }
];
