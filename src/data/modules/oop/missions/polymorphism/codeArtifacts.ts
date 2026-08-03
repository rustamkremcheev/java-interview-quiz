import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_POLYMORPHISM: readonly CodeArtifact[] = [
  {
    id: "art_poly_transaction_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Transaction Hierarchy (Card / Wire / Ach / Instant)",
      ru: "Иерархия Transaction (Card / Wire / Ach / Instant)"
    },
    sourceCode: `package com.bank.pipeline;

/** Payment transaction subtypes cleared by TransactionPipeline. */
public interface Transaction {
    String id();
    long amountCents();
}

public record CardTransaction(String id, long amountCents, String panToken) implements Transaction {}

public record WireTransaction(String id, long amountCents, String bic, boolean overnight) implements Transaction {}

public record AchTransaction(String id, long amountCents, String routingNumber) implements Transaction {}

/** Added for Instant rail — type exists, but broken pipeline may still ignore it. */
public record InstantTransaction(String id, long amountCents, String railCode) implements Transaction {}`,
    annotations: [
      {
        id: "ann_poly_types_1",
        startLine: 4,
        endLine: 7,
        category: "WHY_IT_EXISTS",
        title: { en: "Common Transaction Contract", ru: "Общий Контракт Transaction" },
        explanation: {
          en: "Clients should depend on Transaction — the smell appears when TransactionPipeline still instanceof-chains every concrete record.",
          ru: "Клиенты должны зависеть от Transaction — smell появляется, когда TransactionPipeline всё ещё instanceof-цепочкой обходит каждый concrete record."
        },
        conceptDemonstrated: "cpt_polymorphism"
      },
      {
        id: "ann_poly_types_2",
        startLine: 18,
        endLine: 19,
        category: "PRODUCTION_RISK",
        title: { en: "Instant Exists in Hierarchy", ru: "Instant Существует в Иерархии" },
        explanation: {
          en: "Shipping InstantTransaction without polymorphic process()/handler (or updating the type switch) is the classic missing-branch incident.",
          ru: "Выкат InstantTransaction без полиморфного process()/handler (или без обновления type switch) — классический инцидент пропущенной ветки."
        },
        conceptDemonstrated: "cpt_type_switch_smell"
      }
    ],
    relatedQuestionIds: ["q_poly_txn_01"],
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    tags: ["#transaction", "#polymorphism", "#instanceof"]
  },
  {
    id: "art_poly_pipeline_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: TransactionPipeline instanceof Explosion",
      ru: "Исходный Нарушенный Код: Взрыв instanceof в TransactionPipeline"
    },
    sourceCode: `package com.bank.pipeline;

/**
 * TYPE-SWITCH SMELL + PRODUCTION BUG CLASS:
 * Every new Transaction subtype edits this class.
 * InstantTransaction exists but is not listed — Instant rail FAILED.
 */
public class TransactionPipeline {

    public ProcessResult process(Transaction txn) {
        if (txn instanceof CardTransaction card) {
            return clearCard(card);
        } else if (txn instanceof WireTransaction wire) {
            return clearWire(wire);
        } else if (txn instanceof AchTransaction ach) {
            return clearAch(ach);
        } else {
            // InstantTransaction lands here after Instant rail launch
            return ProcessResult.failed("UNSUPPORTED_TYPE: " + txn.getClass().getName());
        }
    }

    private ProcessResult clearCard(CardTransaction t) { /* card network */ return ProcessResult.ok(t.id()); }
    private ProcessResult clearWire(WireTransaction t) { /* wire cutoff */ return ProcessResult.ok(t.id()); }
    private ProcessResult clearAch(AchTransaction t) { /* ACH batch */ return ProcessResult.ok(t.id()); }
}`,
    annotations: [
      {
        id: "ann_broken_poly_1",
        startLine: 11,
        endLine: 20,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Giant instanceof Type Switch", ru: "Гигантский Type Switch на instanceof" },
        explanation: {
          en: "All rail clearing lives behind type tests — adding InstantTransaction requires modifying TransactionPipeline (type-switch smell).",
          ru: "Весь clearing рейлов за type tests — добавление InstantTransaction требует правки TransactionPipeline (smell type-switch)."
        },
        problemSolved: {
          en: "Centralized type inspection is brittle under hierarchy growth and rail launches.",
          ru: "Централизованная инспекция типов хрупка при росте иерархии и запуске рейлов."
        },
        conceptDemonstrated: "cpt_type_switch_smell"
      },
      {
        id: "ann_broken_poly_2",
        startLine: 17,
        endLine: 19,
        category: "PRODUCTION_RISK",
        title: { en: "Missing Instant Branch", ru: "Пропущенная Ветка Instant" },
        explanation: {
          en: "InstantTransaction falls to else → UNSUPPORTED_TYPE even though the class already implements Transaction.",
          ru: "InstantTransaction падает в else → UNSUPPORTED_TYPE, хотя класс уже реализует Transaction."
        },
        conceptDemonstrated: "cpt_polymorphism"
      }
    ],
    relatedQuestionIds: ["q_poly_txn_01"],
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    tags: ["#instanceof", "#type-switch-smell", "#pipeline"]
  },
  {
    id: "art_poly_handler_contract",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Polymorphic process() on Transaction",
      ru: "Полиморфный process() на Transaction"
    },
    sourceCode: `package com.bank.pipeline;

public interface Transaction {
    String id();
    long amountCents();
    ProcessResult process(PipelineContext ctx);
}

public record CardTransaction(String id, long amountCents, String panToken) implements Transaction {
    @Override
    public ProcessResult process(PipelineContext ctx) {
        return ctx.cardNetwork().clear(id, amountCents, panToken);
    }
}

public record WireTransaction(String id, long amountCents, String bic, boolean overnight) implements Transaction {
    @Override
    public ProcessResult process(PipelineContext ctx) {
        return ctx.wireGateway().clear(id, amountCents, bic, overnight);
    }
}

public record AchTransaction(String id, long amountCents, String routingNumber) implements Transaction {
    @Override
    public ProcessResult process(PipelineContext ctx) {
        return ctx.achBatch().enqueue(id, amountCents, routingNumber);
    }
}

public record InstantTransaction(String id, long amountCents, String railCode) implements Transaction {
    @Override
    public ProcessResult process(PipelineContext ctx) {
        return ctx.instantRail().clear(id, amountCents, railCode);
    }
}`,
    annotations: [
      {
        id: "ann_poly_iface_1",
        startLine: 3,
        endLine: 7,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Substitutable process Contract", ru: "Подставляемый Контракт process" },
        explanation: {
          en: "Transaction.process is the polymorphic contract — clients depend on this abstraction, not on Card/Wire/Ach casts.",
          ru: "Transaction.process — полиморфный контракт: клиенты зависят от этой абстракции, а не от cast'ов Card/Wire/Ach."
        },
        conceptDemonstrated: "cpt_polymorphism"
      },
      {
        id: "ann_poly_iface_2",
        startLine: 30,
        endLine: 35,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Instant Brings Its Own Behavior", ru: "Instant Несёт Своё Поведение" },
        explanation: {
          en: "InstantTransaction.process is shipped with the type — TransactionPipeline need not add an instanceof branch.",
          ru: "InstantTransaction.process поставляется с типом — TransactionPipeline не нужно добавлять ветку instanceof."
        },
        conceptDemonstrated: "cpt_type_switch_smell"
      }
    ],
    relatedQuestionIds: ["q_poly_txn_01"],
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    tags: ["#polymorphism", "#process", "#transaction"]
  },
  {
    id: "art_poly_pipeline_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Thin Pipeline + Polymorphic process()",
      ru: "Продакшн Фикс: Тонкий Pipeline + Полиморфный process()"
    },
    sourceCode: `package com.bank.pipeline;

import java.util.Objects;

/**
 * Thin orchestrator — closed for modification when InstantTransaction is added.
 * Alternative: visitor accept(handler) or Class→TransactionHandler registry at composition root.
 */
public class TransactionPipeline {

    private final PipelineContext context;

    public TransactionPipeline(PipelineContext context) {
        this.context = Objects.requireNonNull(context);
    }

    public ProcessResult process(Transaction txn) {
        Objects.requireNonNull(txn, "txn");
        // Design-level polymorphism: no instanceof sprawl
        return txn.process(context);
    }
}

/** Optional alternative when processing must stay outside the entity. */
public final class TransactionHandlerRegistry {

    private final java.util.Map<Class<? extends Transaction>, TransactionHandler> handlers;

    public TransactionHandlerRegistry(
            java.util.Map<Class<? extends Transaction>, TransactionHandler> handlers) {
        this.handlers = java.util.Map.copyOf(handlers);
    }

    public ProcessResult process(Transaction txn, PipelineContext ctx) {
        TransactionHandler handler = handlers.get(txn.getClass());
        if (handler == null) {
            throw new IllegalArgumentException("No handler registered for " + txn.getClass().getName());
        }
        return handler.handle(txn, ctx);
    }
}

@FunctionalInterface
interface TransactionHandler {
    ProcessResult handle(Transaction txn, PipelineContext ctx);
}`,
    annotations: [
      {
        id: "ann_sol_poly_1",
        startLine: 14,
        endLine: 18,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Delegate Without Type Inspection", ru: "Делегирование Без Инспекции Типа" },
        explanation: {
          en: "process only delegates to txn.process(context) — Instant cannot be forgotten at this call site.",
          ru: "process только делегирует в txn.process(context) — Instant нельзя забыть на этом call site."
        },
        problemSolved: {
          en: "Eliminates instanceof explosion and missing-branch Instant failures.",
          ru: "Устраняет взрыв instanceof и падения Instant из-за пропущенной ветки."
        },
        conceptDemonstrated: "cpt_polymorphism"
      },
      {
        id: "ann_sol_poly_2",
        startLine: 22,
        endLine: 38,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Handler Registry Alternative", ru: "Альтернатива Handler Registry" },
        explanation: {
          en: "When clearing must stay outside the domain model, register handlers at composition root and fail-fast — still no hot-path instanceof sprawl.",
          ru: "Когда clearing должен остаться вне доменной модели, регистрируйте handlers в composition root и fail-fast — всё ещё без sprawl instanceof в горячем пути."
        },
        problemSolved: {
          en: "Keeps type-switch smell out of the pipeline while allowing infrastructure-side handlers.",
          ru: "Держит smell type-switch вне pipeline, позволяя infrastructure-side handlers."
        },
        conceptDemonstrated: "cpt_type_switch_smell"
      }
    ],
    relatedQuestionIds: ["q_poly_txn_01"],
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    tags: ["#polymorphism", "#pipeline", "#handler-registry"]
  },
  {
    id: "art_poly_pipeline_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Instant Falls to else",
      ru: "Код для Поиска Бага: Instant Падает в else"
    },
    sourceCode: `package com.bank.pipeline;

public class TransactionPipeline {

    public ProcessResult process(Transaction txn) {
        if (txn instanceof CardTransaction card) {
            return clearCard(card);
        }
        if (txn instanceof WireTransaction wire) {
            return clearWire(wire);
        }
        if (txn instanceof AchTransaction ach) {
            return clearAch(ach);
        }
        // InstantTransaction never matched — falls to else
        return ProcessResult.failed("UNSUPPORTED_TYPE");
    }

    private ProcessResult clearCard(CardTransaction t) { return ProcessResult.ok(t.id()); }
    private ProcessResult clearWire(WireTransaction t) { return ProcessResult.ok(t.id()); }
    private ProcessResult clearAch(AchTransaction t) { return ProcessResult.ok(t.id()); }
}`,
    annotations: [
      {
        id: "ann_bug_poly_1",
        startLine: 15,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "No InstantTransaction Branch", ru: "Нет Ветки InstantTransaction" },
        explanation: {
          en: "Closed instanceof set ends at Ach — InstantTransaction hits UNSUPPORTED_TYPE despite implementing Transaction.",
          ru: "Закрытый набор instanceof заканчивается на Ach — InstantTransaction получает UNSUPPORTED_TYPE, несмотря на implements Transaction."
        },
        problemSolved: {
          en: "Demonstrates why type-switch pipelines break when new subtypes ship without call-site updates.",
          ru: "Демонстрирует, почему type-switch pipeline ломаются, когда новые подтипы выкатывают без обновления call site."
        },
        conceptDemonstrated: "cpt_type_switch_smell"
      }
    ],
    relatedQuestionIds: ["q_poly_txn_01"],
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    tags: ["#bug-hunt", "#instanceof", "#instant"]
  }
];
