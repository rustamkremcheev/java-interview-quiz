import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_ABSTRACT_CLASSES: readonly CodeArtifact[] = [
  {
    id: "art_ac_settlement_context",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "SettlementContext & SettlementResult",
      ru: "SettlementContext и SettlementResult"
    },
    sourceCode: `package com.bank.settlement;

/** Immutable settlement request (amounts in minor units / cents). */
public record SettlementContext(
        String settlementId,
        String rail, // CARD | WIRE
        long amountCents,
        String currencyCode,
        String merchantId
) {
    public SettlementContext {
        if (amountCents <= 0) {
            throw new IllegalArgumentException("amountCents must be > 0");
        }
    }
}

/** Outcome of a settlement attempt. */
public record SettlementResult(
        String settlementId,
        boolean captured,
        boolean audited,
        String captureReference
) {
    public static SettlementResult ok(CaptureReceipt receipt, boolean audited) {
        return new SettlementResult(receipt.settlementId(), true, audited, receipt.reference());
    }
}

public record Authorization(String authCode, long authorizedCents) {}
public record CaptureReceipt(String settlementId, String reference, long capturedCents) {}`,
    annotations: [
      {
        id: "ann_ac_ctx_1",
        startLine: 4,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Settlement Input Contract", ru: "Входной Контракт Settlement" },
        explanation: {
          en: "SettlementContext is the immutable input to AbstractSettlementProcessor.settle — rail-specific processors share this shape.",
          ru: "SettlementContext — неизменяемый вход AbstractSettlementProcessor.settle; rail-specific процессоры делят эту форму."
        },
        conceptDemonstrated: "cpt_abstract_class"
      }
    ],
    relatedQuestionIds: ["q_ac_settlement_01"],
    conceptIds: ["cpt_abstract_class"],
    tags: ["#settlement", "#abstract-class"]
  },
  {
    id: "art_ac_settlement_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Overridable settle() & Protected Flag Mutation",
      ru: "Исходный Нарушенный Код: Переопределяемый settle() и Мутация Protected-Флага"
    },
    sourceCode: `package com.bank.settlement;

/**
 * BROKEN EXTENSION CONTRACT:
 * settle() is overridable — Wire skips audit.
 * protected audited flag — Card short-circuits without calling audit().
 */
public abstract class AbstractSettlementProcessor {

    protected final AuditLedger ledger;
    protected boolean audited; // ⚠️ undocumented protected mutable state

    protected AbstractSettlementProcessor(AuditLedger ledger) {
        this.ledger = ledger;
    }

    /** Intended lifecycle — but NOT final. */
    public SettlementResult settle(SettlementContext ctx) {
        validate(ctx);
        Authorization auth = authorize(ctx);
        CaptureReceipt receipt = capture(ctx, auth);
        audit(ctx, receipt);
        return SettlementResult.ok(receipt, audited);
    }

    protected void validate(SettlementContext ctx) {
        if (ctx.amountCents() > 50_000_00 && ctx.rail().equals("WIRE")) {
            throw new IllegalArgumentException("WIRE amount exceeds policy");
        }
    }

    protected abstract Authorization authorize(SettlementContext ctx);

    protected abstract CaptureReceipt capture(SettlementContext ctx, Authorization auth);

    protected void audit(SettlementContext ctx, CaptureReceipt receipt) {
        ledger.append(ctx.settlementId(), receipt.reference());
        audited = true;
    }
}

public class WireSettlementProcessor extends AbstractSettlementProcessor {

    public WireSettlementProcessor(AuditLedger ledger) {
        super(ledger);
    }

    /** Fast path — skips audit (production incident). */
    @Override
    public SettlementResult settle(SettlementContext ctx) {
        validate(ctx);
        Authorization auth = authorize(ctx);
        CaptureReceipt receipt = capture(ctx, auth);
        return SettlementResult.ok(receipt, false); // no audit!
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) {
        return new Authorization("WIRE-" + ctx.settlementId(), ctx.amountCents());
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {
        return new CaptureReceipt(ctx.settlementId(), "WCAP-" + auth.authCode(), auth.authorizedCents());
    }
}

public class CardSettlementProcessor extends AbstractSettlementProcessor {

    public CardSettlementProcessor(AuditLedger ledger) {
        super(ledger);
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) {
        return new Authorization("CARD-" + ctx.settlementId(), ctx.amountCents());
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {
        audited = true; // ⚠️ illegal protected mutation — fake audit
        return new CaptureReceipt(ctx.settlementId(), "CCAP-" + auth.authCode(), auth.authorizedCents());
    }
}`,
    annotations: [
      {
        id: "ann_broken_ac_1",
        startLine: 18,
        endLine: 24,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Non-Final settle() Skeleton", ru: "Не-Final Скелет settle()" },
        explanation: {
          en: "settle() can be overridden — Wire replaces the lifecycle and omits audit.",
          ru: "settle() можно переопределить — Wire подменяет lifecycle и опускает audit."
        },
        problemSolved: {
          en: "Lifecycle steps are advisory, not enforced by the type system.",
          ru: "Шаги lifecycle рекомендательны, а не enforced системой типов."
        },
        conceptDemonstrated: "cpt_template_hooks"
      },
      {
        id: "ann_broken_ac_2",
        startLine: 11,
        endLine: 12,
        category: "PRODUCTION_RISK",
        title: { en: "Undocumented Protected Mutable State", ru: "Недокументированное Protected Мутабельное Состояние" },
        explanation: {
          en: "Card sets audited=true inside capture without calling audit() — compliance sees a flag without a ledger write.",
          ru: "Card выставляет audited=true внутри capture без вызова audit() — compliance видит флаг без записи в ledger."
        },
        conceptDemonstrated: "cpt_abstract_class"
      }
    ],
    relatedQuestionIds: ["q_ac_settlement_01"],
    conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
    tags: ["#hook-bypass", "#protected-state", "#settlement"]
  },
  {
    id: "art_ac_settlement_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Final settle() + Documented Protected Hooks",
      ru: "Продакшн Фикс: Final settle() + Документированные Protected-Хуки"
    },
    sourceCode: `package com.bank.settlement;

/**
 * Extension contract (Effective Java Item 19):
 * - settle() is FINAL — do not override.
 * - Subclasses implement authorize() and capture() ONLY.
 * - validate/audit are private; no protected mutable audit flags.
 * - Constructor injects AuditLedger; do not call hooks from constructor.
 */
public abstract class AbstractSettlementProcessor {

    private final AuditLedger ledger;

    protected AbstractSettlementProcessor(AuditLedger ledger) {
        this.ledger = java.util.Objects.requireNonNull(ledger);
    }

    /** Template skeleton — always validate → authorize → capture → audit. */
    public final SettlementResult settle(SettlementContext ctx) {
        validate(ctx);
        Authorization auth = authorize(ctx);
        CaptureReceipt receipt = capture(ctx, auth);
        audit(ctx, receipt);
        return SettlementResult.ok(receipt, true);
    }

    private void validate(SettlementContext ctx) {
        if (ctx.amountCents() > 50_000_00 && "WIRE".equals(ctx.rail())) {
            throw new IllegalArgumentException("WIRE amount exceeds policy");
        }
    }

    /** Hook: rail-specific authorization. Must not call audit. */
    protected abstract Authorization authorize(SettlementContext ctx);

    /** Hook: rail-specific capture. Must not mutate audit state. */
    protected abstract CaptureReceipt capture(SettlementContext ctx, Authorization auth);

    private void audit(SettlementContext ctx, CaptureReceipt receipt) {
        ledger.append(ctx.settlementId(), receipt.reference());
    }
}

public final class WireSettlementProcessor extends AbstractSettlementProcessor {

    public WireSettlementProcessor(AuditLedger ledger) {
        super(ledger);
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) {
        return new Authorization("WIRE-" + ctx.settlementId(), ctx.amountCents());
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {
        return new CaptureReceipt(ctx.settlementId(), "WCAP-" + auth.authCode(), auth.authorizedCents());
    }
}

public final class CardSettlementProcessor extends AbstractSettlementProcessor {

    public CardSettlementProcessor(AuditLedger ledger) {
        super(ledger);
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) {
        return new Authorization("CARD-" + ctx.settlementId(), ctx.amountCents());
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {
        return new CaptureReceipt(ctx.settlementId(), "CCAP-" + auth.authCode(), auth.authorizedCents());
    }
}`,
    annotations: [
      {
        id: "ann_sol_ac_1",
        startLine: 18,
        endLine: 24,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Final Lifecycle Skeleton", ru: "Final Lifecycle-Скелет" },
        explanation: {
          en: "final settle() always runs audit after capture — Wire cannot install a fast path that skips compliance.",
          ru: "final settle() всегда вызывает audit после capture — Wire не может поставить fast path без compliance."
        },
        problemSolved: {
          en: "Eliminates settle() override bypass and missing audit trails.",
          ru: "Устраняет обход через override settle() и отсутствующие audit trails."
        },
        conceptDemonstrated: "cpt_template_hooks"
      },
      {
        id: "ann_sol_ac_2",
        startLine: 8,
        endLine: 14,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Abstract Class Holds State + Constructor", ru: "Абстрактный Класс Держит State + Конструктор" },
        explanation: {
          en: "Private ledger field + protected constructor — abstract class justified vs interface; documented hooks only.",
          ru: "Private поле ledger + protected конструктор — абстрактный класс оправдан vs interface; только документированные хуки."
        },
        problemSolved: {
          en: "Shared collaborators without duplicated audit wiring; no protected fake-audit flags.",
          ru: "Общие коллабораторы без дублирования audit-wiring; нет protected fake-audit флагов."
        },
        conceptDemonstrated: "cpt_abstract_class"
      }
    ],
    relatedQuestionIds: ["q_ac_settlement_01"],
    conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
    tags: ["#final-settle", "#protected-hooks", "#abstract-class"]
  },
  {
    id: "art_ac_settlement_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Wire Overrides settle() Skipping Audit",
      ru: "Код для Поиска Бага: Wire Переопределяет settle() без Audit"
    },
    sourceCode: `package com.bank.settlement;

public class WireSettlementProcessor extends AbstractSettlementProcessor {

    public WireSettlementProcessor(AuditLedger ledger) {
        super(ledger);
    }

    @Override
    public SettlementResult settle(SettlementContext ctx) {
        validate(ctx);
        Authorization auth = authorize(ctx);
        CaptureReceipt receipt = capture(ctx, auth);
        return SettlementResult.ok(receipt); // BUG: skips audit
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) {
        return wireAuthorize(ctx);
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {
        return wireCapture(ctx, auth);
    }

    private Authorization wireAuthorize(SettlementContext ctx) {
        return new Authorization("WIRE-" + ctx.settlementId(), ctx.amountCents());
    }

    private CaptureReceipt wireCapture(SettlementContext ctx, Authorization auth) {
        return new CaptureReceipt(ctx.settlementId(), "WCAP-" + auth.authCode(), auth.authorizedCents());
    }
}`,
    annotations: [
      {
        id: "ann_bug_ac_1",
        startLine: 9,
        endLine: 14,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "settle() Override Bypasses Audit", ru: "Override settle() Обходит Audit" },
        explanation: {
          en: "Wire replaces the skeleton and returns after capture — ledger never receives an append for WIRE settlements.",
          ru: "Wire подменяет скелет и возвращается после capture — ledger никогда не получает append для WIRE-settlements."
        },
        problemSolved: {
          en: "Shows why the public lifecycle method must be final on the abstract class.",
          ru: "Показывает, почему публичный lifecycle-метод на абстрактном классе должен быть final."
        },
        conceptDemonstrated: "cpt_template_hooks"
      }
    ],
    relatedQuestionIds: ["q_ac_settlement_01"],
    conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
    tags: ["#bug-hunt", "#hook-bypass", "#settlement"]
  }
];
