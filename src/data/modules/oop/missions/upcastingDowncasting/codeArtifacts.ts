import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_UPCASTING_DOWNCASTING: readonly CodeArtifact[] = [
  {
    id: "art_cast_fraud_event_hierarchy",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "FraudEvent Hierarchy & FraudEvidence",
      ru: "Иерархия FraudEvent и FraudEvidence"
    },
    sourceCode: `package com.bank.fraud;

/** Base fraud signal accepted by FraudInvestigationService (upcast target). */
public abstract class FraudEvent {
    private final String eventId;
    private final String channel;
    private final long amountCents;

    protected FraudEvent(String eventId, String channel, long amountCents) {
        this.eventId = eventId;
        this.channel = channel;
        this.amountCents = amountCents;
    }

    public String eventId() { return eventId; }
    public String channel() { return channel; }
    public long amountCents() { return amountCents; }
}

public final class CardFraudEvent extends FraudEvent {
    private final String panLast4;
    private final String mcc;

    public CardFraudEvent(String eventId, long amountCents, String panLast4, String mcc) {
        super(eventId, "CARD", amountCents);
        this.panLast4 = panLast4;
        this.mcc = mcc;
    }

    public String panLast4() { return panLast4; }
    public String mcc() { return mcc; }
}

public final class WireFraudEvent extends FraudEvent {
    private final String wireReference;
    private final String beneficiaryBank;

    public WireFraudEvent(String eventId, long amountCents, String wireReference, String beneficiaryBank) {
        super(eventId, "WIRE", amountCents);
        this.wireReference = wireReference;
        this.beneficiaryBank = beneficiaryBank;
    }

    public String wireReference() { return wireReference; }
    public String beneficiaryBank() { return beneficiaryBank; }
}

public final class AchFraudEvent extends FraudEvent {
    private final String routingNumber;
    private final String companyId;

    public AchFraudEvent(String eventId, long amountCents, String routingNumber, String companyId) {
        super(eventId, "ACH", amountCents);
        this.routingNumber = routingNumber;
        this.companyId = companyId;
    }

    public String routingNumber() { return routingNumber; }
    public String companyId() { return companyId; }
}

/** Investigation output assembled from subtype-specific fields. */
public record FraudEvidence(String kind, String primaryRef, String secondaryRef) {
    public static FraudEvidence ofCard(String panLast4, String mcc) {
        return new FraudEvidence("CARD", panLast4, mcc);
    }
    public static FraudEvidence ofWire(String wireReference, String beneficiaryBank) {
        return new FraudEvidence("WIRE", wireReference, beneficiaryBank);
    }
    public static FraudEvidence ofAch(String routingNumber, String companyId) {
        return new FraudEvidence("ACH", routingNumber, companyId);
    }
}`,
    annotations: [
      {
        id: "ann_cast_hier_1",
        startLine: 4,
        endLine: 20,
        category: "WHY_IT_EXISTS",
        title: { en: "Upcast API Boundary", ru: "API-Граница Upcast" },
        explanation: {
          en: "FraudEvent is the safe widening type for the investigation pipeline — Card, Wire, and ACH all upcast here.",
          ru: "FraudEvent — безопасный widening-тип для pipeline расследования: Card, Wire и ACH все upcast'ятся сюда."
        },
        conceptDemonstrated: "cpt_upcasting"
      },
      {
        id: "ann_cast_hier_2",
        startLine: 54,
        endLine: 66,
        category: "INTERVIEW_CONCEPT",
        title: { en: "New ACH Subtype Breaks Cast Assumptions", ru: "Новый Подтип ACH Ломает Допущения Cast'ов" },
        explanation: {
          en: "AchFraudEvent is a valid FraudEvent but neither CardFraudEvent nor WireFraudEvent — blind downcasts explode.",
          ru: "AchFraudEvent — валидный FraudEvent, но ни CardFraudEvent, ни WireFraudEvent — слепые downcast взрываются."
        },
        conceptDemonstrated: "cpt_downcasting"
      }
    ],
    relatedQuestionIds: ["q_cast_fraud_01"],
    conceptIds: ["cpt_upcasting", "cpt_downcasting"],
    tags: ["#fraud-event", "#hierarchy", "#upcasting"]
  },
  {
    id: "art_cast_investigation_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Blind Downcasts in FraudInvestigationService",
      ru: "Исходный Нарушенный Код: Слепые Downcast в FraudInvestigationService"
    },
    sourceCode: `package com.bank.fraud;

/**
 * PRODUCTION BUG CLASS (02:00):
 * Accepts FraudEvent (safe upcast) then blind-casts to Card/Wire.
 * AchFraudEvent → ClassCastException.
 */
public class FraudInvestigationService {

    public FraudEvidence investigate(FraudEvent event) {
        String channel = event.channel();
        if ("CARD".equals(channel)) {
            CardFraudEvent card = (CardFraudEvent) event; // unsafe without instanceof
            return FraudEvidence.ofCard(card.panLast4(), card.mcc());
        }
        if ("WIRE".equals(channel)) {
            WireFraudEvent wire = (WireFraudEvent) event;
            return FraudEvidence.ofWire(wire.wireReference(), wire.beneficiaryBank());
        }
        // ⚠️ ACH (and anything else) incorrectly assumed to be CARD
        CardFraudEvent fallback = (CardFraudEvent) event;
        return FraudEvidence.ofCard(fallback.panLast4(), fallback.mcc());
    }
}`,
    annotations: [
      {
        id: "ann_broken_cast_1",
        startLine: 12,
        endLine: 16,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Channel String + Blind Cast", ru: "Строка Канала + Слепой Cast" },
        explanation: {
          en: "String discriminator and runtime type can diverge; cast is not guarded by instanceof.",
          ru: "Строковый дискриминатор и runtime-тип могут расходиться; cast не защищён instanceof."
        },
        problemSolved: {
          en: "Shows why compile-time FraudEvent acceptance does not make every downcast safe.",
          ru: "Показывает, почему принятие FraudEvent на компиляции не делает каждый downcast безопасным."
        },
        conceptDemonstrated: "cpt_downcasting"
      },
      {
        id: "ann_broken_cast_2",
        startLine: 22,
        endLine: 24,
        category: "PRODUCTION_RISK",
        title: { en: "ACH Fallback Card Cast", ru: "Fallback Card Cast для ACH" },
        explanation: {
          en: "AchFraudEvent hits (CardFraudEvent) event → ClassCastException at 02:00.",
          ru: "AchFraudEvent попадает в (CardFraudEvent) event → ClassCastException в 02:00."
        },
        conceptDemonstrated: "cpt_downcasting"
      }
    ],
    relatedQuestionIds: ["q_cast_fraud_01"],
    conceptIds: ["cpt_upcasting", "cpt_downcasting"],
    tags: ["#classcastexception", "#unsafe-cast", "#fraud"]
  },
  {
    id: "art_cast_pattern_matching_fix",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Interim Fix: Pattern Matching instanceof",
      ru: "Временный Фикс: Pattern Matching instanceof"
    },
    sourceCode: `package com.bank.fraud;

/** Safer local fix — still a type switch, but no blind casts. */
public class FraudInvestigationService {

    public FraudEvidence investigate(FraudEvent event) {
        if (event instanceof CardFraudEvent card) {
            return FraudEvidence.ofCard(card.panLast4(), card.mcc());
        }
        if (event instanceof WireFraudEvent wire) {
            return FraudEvidence.ofWire(wire.wireReference(), wire.beneficiaryBank());
        }
        if (event instanceof AchFraudEvent ach) {
            return FraudEvidence.ofAch(ach.routingNumber(), ach.companyId());
        }
        throw new IllegalArgumentException("Unsupported fraud event: " + event.getClass().getName());
    }
}`,
    annotations: [
      {
        id: "ann_cast_pm_1",
        startLine: 6,
        endLine: 16,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Pattern Matching Binds Safely", ru: "Pattern Matching Привязывает Безопасно" },
        explanation: {
          en: "Test + cast + binding in one expression; AchFraudEvent matches its own branch instead of crashing on Card cast.",
          ru: "Проверка + cast + привязка в одном выражении; AchFraudEvent матчится на свою ветку вместо краша на Card cast."
        },
        conceptDemonstrated: "cpt_downcasting"
      }
    ],
    relatedQuestionIds: ["q_cast_fraud_01"],
    conceptIds: ["cpt_downcasting"],
    tags: ["#pattern-matching", "#instanceof"]
  },
  {
    id: "art_cast_investigation_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Polymorphic extractEvidence()",
      ru: "Продакшн Фикс: Полиморфный extractEvidence()"
    },
    sourceCode: `package com.bank.fraud;

/** Domain types own evidence extraction — no casts in the service. */
public abstract class FraudEvent {
    private final String eventId;
    private final String channel;
    private final long amountCents;

    protected FraudEvent(String eventId, String channel, long amountCents) {
        this.eventId = eventId;
        this.channel = channel;
        this.amountCents = amountCents;
    }

    public String eventId() { return eventId; }
    public String channel() { return channel; }
    public long amountCents() { return amountCents; }

    /** Subtypes override — callers never downcast. */
    public abstract FraudEvidence extractEvidence();
}

public final class CardFraudEvent extends FraudEvent {
    private final String panLast4;
    private final String mcc;

    public CardFraudEvent(String eventId, long amountCents, String panLast4, String mcc) {
        super(eventId, "CARD", amountCents);
        this.panLast4 = panLast4;
        this.mcc = mcc;
    }

    @Override
    public FraudEvidence extractEvidence() {
        return FraudEvidence.ofCard(panLast4, mcc);
    }
}

public final class WireFraudEvent extends FraudEvent {
    private final String wireReference;
    private final String beneficiaryBank;

    public WireFraudEvent(String eventId, long amountCents, String wireReference, String beneficiaryBank) {
        super(eventId, "WIRE", amountCents);
        this.wireReference = wireReference;
        this.beneficiaryBank = beneficiaryBank;
    }

    @Override
    public FraudEvidence extractEvidence() {
        return FraudEvidence.ofWire(wireReference, beneficiaryBank);
    }
}

public final class AchFraudEvent extends FraudEvent {
    private final String routingNumber;
    private final String companyId;

    public AchFraudEvent(String eventId, long amountCents, String routingNumber, String companyId) {
        super(eventId, "ACH", amountCents);
        this.routingNumber = routingNumber;
        this.companyId = companyId;
    }

    @Override
    public FraudEvidence extractEvidence() {
        return FraudEvidence.ofAch(routingNumber, companyId);
    }
}

/** Thin service — closed for modification when new fraud rails ship. */
public class FraudInvestigationService {

    public FraudEvidence investigate(FraudEvent event) {
        return event.extractEvidence();
    }
}`,
    annotations: [
      {
        id: "ann_sol_cast_1",
        startLine: 18,
        endLine: 19,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Abstract Hook Replaces Casts", ru: "Abstract Hook Заменяет Cast'ы" },
        explanation: {
          en: "extractEvidence() moves subtype field access into overrides — ClassCastException paths disappear.",
          ru: "extractEvidence() переносит доступ к полям подтипа в overrides — пути ClassCastException исчезают."
        },
        problemSolved: {
          en: "Eliminates blind downcasts and channel-string drift in FraudInvestigationService.",
          ru: "Устраняет слепые downcast и дрейф строк channel в FraudInvestigationService."
        },
        conceptDemonstrated: "cpt_downcasting"
      },
      {
        id: "ann_sol_cast_2",
        startLine: 78,
        endLine: 84,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Service Delegates via Upcast Reference", ru: "Сервис Делегирует через Upcast-Ссылку" },
        explanation: {
          en: "investigate() keeps FraudEvent (upcast) and uses dynamic dispatch — no narrowing required.",
          ru: "investigate() сохраняет FraudEvent (upcast) и использует dynamic dispatch — сужение не нужно."
        },
        problemSolved: {
          en: "New AchFraudEvent (or future rails) work without editing the service.",
          ru: "Новый AchFraudEvent (или будущие рейлы) работают без правки сервиса."
        },
        conceptDemonstrated: "cpt_upcasting"
      }
    ],
    relatedQuestionIds: ["q_cast_fraud_01"],
    conceptIds: ["cpt_upcasting", "cpt_downcasting", "cpt_polymorphism"],
    tags: ["#polymorphism", "#extract-evidence", "#no-cast"]
  },
  {
    id: "art_cast_investigation_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: ACH Hits Card Fallback Cast",
      ru: "Код для Поиска Бага: ACH Попадает в Fallback Card Cast"
    },
    sourceCode: `package com.bank.fraud;

public class FraudInvestigationService {

    public FraudEvidence investigate(FraudEvent event) {
        String channel = event.channel();
        if ("CARD".equals(channel)) {
            CardFraudEvent card = (CardFraudEvent) event;
            return FraudEvidence.ofCard(card.panLast4(), card.mcc());
        }
        if ("WIRE".equals(channel)) {
            WireFraudEvent wire = (WireFraudEvent) event;
            return FraudEvidence.ofWire(wire.wireReference(), wire.beneficiaryBank());
        }
        // BUG: AchFraudEvent falls through to CARD cast
        CardFraudEvent fallback = (CardFraudEvent) event;
        return FraudEvidence.ofCard(fallback.panLast4(), fallback.mcc());
    }
}`,
    annotations: [
      {
        id: "ann_bug_cast_1",
        startLine: 15,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "ACH Fallback Downcast", ru: "Fallback Downcast для ACH" },
        explanation: {
          en: "AchFraudEvent is not a CardFraudEvent — this line throws ClassCastException at 02:00.",
          ru: "AchFraudEvent не является CardFraudEvent — эта строка бросает ClassCastException в 02:00."
        },
        problemSolved: {
          en: "Demonstrates unsafe downcast after a channel string miss for the new ACH rail.",
          ru: "Демонстрирует небезопасный downcast после промаха строки channel для нового ACH-рейла."
        },
        conceptDemonstrated: "cpt_downcasting"
      }
    ],
    relatedQuestionIds: ["q_cast_fraud_01"],
    conceptIds: ["cpt_upcasting", "cpt_downcasting"],
    tags: ["#bug-hunt", "#classcastexception", "#ach"]
  }
];
