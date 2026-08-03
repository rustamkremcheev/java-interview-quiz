import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_DYNAMIC_DISPATCH: readonly CodeArtifact[] = [
  {
    id: "art_dd_risk_event",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "RiskEvent Record — Hot-Loop Payload",
      ru: "Record RiskEvent — Полезная Нагрузка Hot Loop"
    },
    sourceCode: `package com.risk.pricing;

/**
 * Immutable market risk event processed at ~1M/sec.
 */
public record RiskEvent(
        String eventId,
        String portfolioId,
        long exposureCents
) {}`,
    annotations: [
      {
        id: "ann_risk_event_1",
        startLine: 6,
        endLine: 10,
        category: "WHY_IT_EXISTS",
        title: { en: "Compact Hot-Path Payload", ru: "Компактная Нагрузка Hot Path" },
        explanation: {
          en: "Record keeps the event immutable and allocation-friendly for the risk pricing hot loop.",
          ru: "Record сохраняет событие неизменяемым и дружелюбным к аллокациям для hot loop risk pricing."
        },
        conceptDemonstrated: "cpt_dynamic_dispatch"
      }
    ],
    relatedQuestionIds: ["q_dd_risk_01"],
    conceptIds: ["cpt_dynamic_dispatch"],
    tags: ["#risk-event", "#record"]
  },
  {
    id: "art_dd_risk_handler_hierarchy",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "RiskHandler Interface & Concrete Exposure Handlers",
      ru: "Интерфейс RiskHandler и Конкретные Exposure Handlers"
    },
    sourceCode: `package com.risk.pricing;

/**
 * Polymorphic risk evaluation contract.
 * Production also registers FxSpotHandler, RepoHaircutHandler,
 * OptionGreekHandler, SwapDv01Handler, FutureMarginHandler (8 total).
 */
public interface RiskHandler {
    long evaluate(RiskEvent event);

    /** Trap: static methods HIDE — they do not override. */
    static long evaluateStatic(RiskEvent event) {
        return event.exposureCents(); // naive base pricing
    }
}

public final class CardExposureHandler implements RiskHandler {
    @Override
    public long evaluate(RiskEvent event) {
        return event.exposureCents() * 12 / 10; // card multiplier
    }

    static long evaluateStatic(RiskEvent event) {
        return event.exposureCents() * 12 / 10;
    }
}

public final class WireExposureHandler implements RiskHandler {
    @Override
    public long evaluate(RiskEvent event) {
        return event.exposureCents() + 250_00L; // wire fixed add-on (cents)
    }
}

public final class AchExposureHandler implements RiskHandler {
    @Override
    public long evaluate(RiskEvent event) {
        return Math.max(0L, event.exposureCents() - 50_00L);
    }
}`,
    annotations: [
      {
        id: "ann_handler_1",
        startLine: 9,
        endLine: 9,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Instance evaluate — Dynamic Dispatch", ru: "Instance evaluate — Динамическая Диспетчеризация" },
        explanation: {
          en: "Instance evaluate is selected at runtime via invokeinterface when called on a RiskHandler reference.",
          ru: "Instance evaluate выбирается в runtime через invokeinterface при вызове на ссылке RiskHandler."
        },
        conceptDemonstrated: "cpt_invokevirtual"
      },
      {
        id: "ann_handler_2",
        startLine: 11,
        endLine: 14,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Static evaluateStatic Hiding Trap", ru: "Ловушка Скрытия Static evaluateStatic" },
        explanation: {
          en: "Static evaluateStatic on the interface/base hides; CardExposureHandler.evaluateStatic is NOT an override.",
          ru: "Static evaluateStatic на интерфейсе/базе скрывает; CardExposureHandler.evaluateStatic — НЕ override."
        },
        conceptDemonstrated: "cpt_dynamic_dispatch"
      }
    ],
    relatedQuestionIds: ["q_dd_risk_01"],
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    tags: ["#risk-handler", "#invokeinterface"]
  },
  {
    id: "art_dd_processor_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: RiskEventProcessor Static Helper Hot Loop",
      ru: "Исходный Нарушенный Код: Hot Loop RiskEventProcessor со Static Helper"
    },
    sourceCode: `package com.risk.pricing;

/**
 * BROKEN: static helper + ignored receiver → invokestatic path.
 * Also: one field typed RiskHandler fed by 8 concrete types → megamorphic site.
 */
public final class RiskEventProcessor {

    private final RiskHandler handler;

    public RiskEventProcessor(RiskHandler handler) {
        this.handler = handler;
    }

    public long process(RiskEvent event) {
        // ⚠️ Cleanup PR introduced static utility "for consistency"
        return RiskHandlers.evaluate(handler, event);
    }
}

final class RiskHandlers {
    private RiskHandlers() {}

    static long evaluate(RiskHandler handler, RiskEvent event) {
        // BUG: compile-time bind to interface static — handler unused for dispatch
        return RiskHandler.evaluateStatic(event);
    }
}`,
    annotations: [
      {
        id: "ann_broken_dd_1",
        startLine: 16,
        endLine: 18,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Static Helper in Hot Loop", ru: "Static Helper в Hot Loop" },
        explanation: {
          en: "Lines 16-18: process() routes through RiskHandlers.evaluate — outer call is invokestatic, not polymorphic instance dispatch.",
          ru: "Строки 16-18: process() идёт через RiskHandlers.evaluate — внешний вызов invokestatic, не полиморфная instance-диспетчеризация."
        },
        problemSolved: {
          en: "Must call handler.evaluate(event) for invokeinterface dynamic dispatch.",
          ru: "Нужно вызывать handler.evaluate(event) для динамической диспетчеризации invokeinterface."
        },
        conceptDemonstrated: "cpt_dynamic_dispatch"
      },
      {
        id: "ann_broken_dd_2",
        startLine: 27,
        endLine: 30,
        category: "PRODUCTION_RISK",
        title: { en: "evaluateStatic Ignores Receiver", ru: "evaluateStatic Игнорирует Получателя" },
        explanation: {
          en: "Lines 27-30: RiskHandler.evaluateStatic(event) always runs base pricing — Card/Wire/Ach multipliers never apply.",
          ru: "Строки 27-30: RiskHandler.evaluateStatic(event) всегда выполняет базовый pricing — множители Card/Wire/Ach никогда не применяются."
        },
        conceptDemonstrated: "cpt_invokevirtual"
      }
    ],
    relatedQuestionIds: ["q_dd_risk_01"],
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    tags: ["#invokestatic", "#hot-loop", "#bug"]
  },
  {
    id: "art_dd_processor_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Polymorphic evaluate + Sealed Split Sites",
      ru: "Продакшн Фикс: Полиморфный evaluate + Sealed Split Sites"
    },
    sourceCode: `package com.risk.pricing;

/**
 * Correctness: instance polymorphic evaluate (invokeinterface).
 * Performance: sealed hierarchy + channel-specific processors keep sites mono/bi.
 */
public sealed interface RiskHandler permits
        CardExposureHandler, WireExposureHandler, AchExposureHandler,
        FxSpotHandler, RepoHaircutHandler, OptionGreekHandler,
        SwapDv01Handler, FutureMarginHandler {

    long evaluate(RiskEvent event);
}

public final class RiskEventProcessor {
    private final RiskHandler handler;

    public RiskEventProcessor(RiskHandler handler) {
        this.handler = handler;
    }

    public long process(RiskEvent event) {
        return handler.evaluate(event); // invokeinterface — dynamic dispatch
    }
}

/** Split call site example: card channel stays monomorphic. */
public final class CardRiskEventProcessor {
    private final CardExposureHandler handler;

    public CardRiskEventProcessor(CardExposureHandler handler) {
        this.handler = handler;
    }

    public long process(RiskEvent event) {
        return handler.evaluate(event); // monomorphic invokevirtual/interface
    }
}`,
    annotations: [
      {
        id: "ann_sol_dd_1",
        startLine: 18,
        endLine: 20,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Polymorphic Instance Call Restored", ru: "Восстановлен Полиморфный Instance-Вызов" },
        explanation: {
          en: "Lines 18-20: handler.evaluate(event) emits invokeinterface and selects the concrete override at runtime.",
          ru: "Строки 18-20: handler.evaluate(event) эмитит invokeinterface и выбирает конкретный override в runtime."
        },
        problemSolved: {
          en: "Eliminates invokestatic static-binding bug and restores Card/Wire/Ach pricing logic.",
          ru: "Устраняет баг static-binding invokestatic и восстанавливает логику pricing Card/Wire/Ach."
        },
        conceptDemonstrated: "cpt_invokevirtual"
      },
      {
        id: "ann_sol_dd_2",
        startLine: 24,
        endLine: 34,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Monomorphic Split Call Site", ru: "Мономорфный Split Call Site" },
        explanation: {
          en: "CardRiskEventProcessor holds CardExposureHandler — HotSpot sees one receiver type and can inline aggressively.",
          ru: "CardRiskEventProcessor держит CardExposureHandler — HotSpot видит один тип получателя и может агрессивно inline."
        },
        conceptDemonstrated: "cpt_dynamic_dispatch"
      }
    ],
    relatedQuestionIds: ["q_dd_risk_01"],
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    tags: ["#invokeinterface", "#sealed", "#monomorphic"]
  },
  {
    id: "art_dd_exposure_router_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: ExposureRouter Static Binding",
      ru: "Код для Поиска Бага: Static Binding в ExposureRouter"
    },
    sourceCode: `package com.risk.pricing;

public final class ExposureRouter {

    public long route(RiskHandler handler, RiskEvent event) {
        // BUG: static helper + evaluateStatic — no polymorphic dispatch
        return RiskHandlers.evaluate(handler, event);
    }
}

final class RiskHandlers {
    private RiskHandlers() {}

    static long evaluate(RiskHandler handler, RiskEvent event) {
        return RiskHandler.evaluateStatic(event);
    }
}`,
    annotations: [
      {
        id: "ann_bug_dd_1",
        startLine: 5,
        endLine: 7,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Static Helper Entry Point", ru: "Точка Входа Static Helper" },
        explanation: {
          en: "Line 6: RiskHandlers.evaluate is invokestatic. Should be return handler.evaluate(event).",
          ru: "Строка 6: RiskHandlers.evaluate — invokestatic. Должно быть return handler.evaluate(event)."
        },
        problemSolved: {
          en: "Demonstrates that static utilities break dynamic dispatch even when a handler parameter is present.",
          ru: "Демонстрирует, что static utilities ломают динамическую диспетчеризацию даже при наличии параметра handler."
        },
        conceptDemonstrated: "cpt_dynamic_dispatch"
      },
      {
        id: "ann_bug_dd_2",
        startLine: 14,
        endLine: 16,
        category: "PRODUCTION_RISK",
        title: { en: "Ignored Receiver + Static Hiding", ru: "Игнорируемый Получатель + Static Hiding" },
        explanation: {
          en: "Line 15: RiskHandler.evaluateStatic ignores handler entirely — CardExposureHandler never runs.",
          ru: "Строка 15: RiskHandler.evaluateStatic полностью игнорирует handler — CardExposureHandler никогда не выполняется."
        },
        conceptDemonstrated: "cpt_invokevirtual"
      }
    ],
    relatedQuestionIds: ["q_dd_risk_01"],
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    tags: ["#bug-hunt", "#invokestatic", "#static-hiding"]
  }
];
