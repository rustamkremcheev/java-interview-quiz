import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_SENIOR_OOP_TRADEOFFS: readonly CodeArtifact[] = [
  {
    id: "art_trade_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: PaymentCommand, PaymentMethod, PaymentResult",
      ru: "Доменные Типы: PaymentCommand, PaymentMethod, PaymentResult"
    },
    sourceCode: `package com.platform.payments.core;

public enum PaymentMethod { CARD, WIRE, WALLET }

public record PaymentCommand(String paymentId, PaymentMethod method, long amountCents) {
    public PaymentCommand {
        if (paymentId == null || paymentId.isBlank()) {
            throw new IllegalArgumentException("paymentId required");
        }
        if (amountCents <= 0) {
            throw new IllegalArgumentException("amountCents must be positive");
        }
    }
}

public record PaymentResult(boolean success, String code, String message) {
    public static PaymentResult ok() {
        return new PaymentResult(true, "OK", "accepted");
    }

    public static PaymentResult decline(String code, String message) {
        return new PaymentResult(false, code, message);
    }
}`,
    annotations: [
      {
        id: "ann_trade_domain_1",
        startLine: 5,
        endLine: 14,
        category: "WHY_IT_EXISTS",
        title: { en: "Lean Edge Command", ru: "Lean Edge Command" },
        explanation: {
          en: "PaymentCommand stays a lean carrier; varying rules belong in PaymentPolicy / PaymentWorkflow, not endless inheritance.",
          ru: "PaymentCommand остаётся lean carrier; меняющиеся правила — в PaymentPolicy / PaymentWorkflow, не в бесконечном inheritance."
        },
        conceptDemonstrated: "cpt_design_tradeoffs"
      }
    ],
    relatedQuestionIds: ["q_trade_payment_01"],
    conceptIds: ["cpt_design_tradeoffs"],
    tags: ["#payment-command", "#domain"]
  },
  {
    id: "art_trade_handler_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Deep Hierarchy + God Abstract Base",
      ru: "Исходный Нарушенный Код: Глубокая Иерархия + God Abstract Base"
    },
    sourceCode: `package com.platform.payments.legacy;

/** Smell: god abstract base + deep CardRail hierarchy. */
public abstract class AbstractPaymentBase {
    protected PaymentCommand command;

    protected abstract PaymentResult executeCore();

    protected void audit() { /* embedded cross-cut */ }
    protected void fraud() { /* embedded cross-cut */ }
    protected void retry() { /* embedded cross-cut */ }

    public final PaymentResult run() {
        audit();
        fraud();
        PaymentResult result = executeCore();
        retry();
        return result;
    }
}

public interface PaymentThing { /* marker — no seam */ }

public class CardRailL1 extends AbstractPaymentBase {
    @Override protected PaymentResult executeCore() { return PaymentResult.ok(); }
}
public class CardRailL2 extends CardRailL1 {}
public class CardRailL3 extends CardRailL2 {}
public class CardRailL4 extends CardRailL3 {}
public class CardRailL5 extends CardRailL4 implements PaymentThing {}`,
    annotations: [
      {
        id: "ann_trade_broken_1",
        startLine: 4,
        endLine: 22,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "God Abstract Base", ru: "God Abstract Base" },
        explanation: {
          en: "Audit/fraud/retry baked into the base couples every rail subclass to one rigid skeleton.",
          ru: "Audit/fraud/retry, зашитые в базу, связывают каждый rail-подкласс с одним жёстким скелетом."
        },
        conceptDemonstrated: "cpt_overengineering_smell"
      },
      {
        id: "ann_trade_broken_2",
        startLine: 28,
        endLine: 33,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Deep Hierarchy", ru: "Глубокая Иерархия" },
        explanation: {
          en: "Five levels for CardRail grow change cost without buying independent variation points.",
          ru: "Пять уровней CardRail повышают цену изменений без независимых точек вариации."
        },
        conceptDemonstrated: "cpt_overengineering_smell"
      }
    ],
    relatedQuestionIds: ["q_trade_payment_01"],
    conceptIds: ["cpt_overengineering_smell"],
    tags: ["#counter-example", "#deep-inheritance"]
  },
  {
    id: "art_trade_policies",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PaymentPolicy, PaymentRiskPolicy, PaymentExtensionRegistry",
      ru: "PaymentPolicy, PaymentRiskPolicy, PaymentExtensionRegistry"
    },
    sourceCode: `package com.platform.payments.core;

import java.util.ArrayList;
import java.util.List;
import java.util.function.UnaryOperator;

public interface PaymentPolicy {
    PaymentResult authorize(PaymentCommand command);
}

public interface PaymentRiskPolicy {
    boolean accept(PaymentCommand command);
}

public interface PaymentWorkflow {
    PaymentResult execute(PaymentCommand command);
}

/** Ordered decorator/extension seam for audit, fraud, retry. */
public final class PaymentExtensionRegistry {
    private final List<UnaryOperator<PaymentWorkflow>> extensions = new ArrayList<>();

    public PaymentExtensionRegistry register(UnaryOperator<PaymentWorkflow> extension) {
        extensions.add(extension);
        return this;
    }

    public PaymentWorkflow apply(PaymentWorkflow core) {
        PaymentWorkflow current = core;
        for (UnaryOperator<PaymentWorkflow> extension : extensions) {
            current = extension.apply(current);
        }
        return current;
    }
}`,
    annotations: [
      {
        id: "ann_trade_pol_1",
        startLine: 7,
        endLine: 13,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Strategies Where Volatility Lives", ru: "Strategies Там, Где Volatility" },
        explanation: {
          en: "PaymentPolicy / PaymentRiskPolicy vary independently of PlatformPaymentHandler orchestration.",
          ru: "PaymentPolicy / PaymentRiskPolicy меняются независимо от оркестрации PlatformPaymentHandler."
        },
        conceptDemonstrated: "cpt_constraint_driven_design"
      },
      {
        id: "ann_trade_pol_2",
        startLine: 19,
        endLine: 33,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Ordered Extension Seams", ru: "Упорядоченные Extension Seams" },
        explanation: {
          en: "Registry makes audit/fraud/retry order explicit without a god abstract base.",
          ru: "Registry делает порядок audit/fraud/retry явным без god abstract base."
        },
        conceptDemonstrated: "cpt_design_tradeoffs"
      }
    ],
    relatedQuestionIds: ["q_trade_payment_01"],
    conceptIds: ["cpt_constraint_driven_design", "cpt_design_tradeoffs"],
    tags: ["#strategy", "#decorator", "#registry"]
  },
  {
    id: "art_trade_handler_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PlatformPaymentHandler: Thin Orchestrator",
      ru: "PlatformPaymentHandler: Тонкий Оркестратор"
    },
    sourceCode: `package com.platform.payments.core;

public final class PlatformPaymentHandler {
    private final PaymentPolicy paymentPolicy;
    private final PaymentRiskPolicy riskPolicy;
    private final PaymentWorkflow workflow;

    public PlatformPaymentHandler(
            PaymentPolicy paymentPolicy,
            PaymentRiskPolicy riskPolicy,
            PaymentExtensionRegistry extensions,
            PaymentWorkflow coreWorkflow) {
        this.paymentPolicy = paymentPolicy;
        this.riskPolicy = riskPolicy;
        this.workflow = extensions.apply(coreWorkflow);
    }

    public PaymentResult handle(PaymentCommand command) {
        if (!riskPolicy.accept(command)) {
            return PaymentResult.decline("RISK", "rejected by risk policy");
        }
        PaymentResult authorized = paymentPolicy.authorize(command);
        if (!authorized.success()) {
            return authorized;
        }
        return workflow.execute(command);
    }
}`,
    annotations: [
      {
        id: "ann_trade_sol_1",
        startLine: 18,
        endLine: 28,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Constraint-Fit Orchestration", ru: "Оркестрация под Ограничения" },
        explanation: {
          en: "Handler composes policies and an extended workflow — no deep hierarchy, no 'Strategy on every line'.",
          ru: "Handler компонует policies и расширенный workflow — без глубокой иерархии и без «Strategy на каждой строке»."
        },
        conceptDemonstrated: "cpt_constraint_driven_design"
      }
    ],
    relatedQuestionIds: ["q_trade_payment_01"],
    conceptIds: ["cpt_constraint_driven_design", "cpt_design_tradeoffs"],
    tags: ["#solution", "#platform-payment-handler"]
  },
  {
    id: "art_trade_handler_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Hierarchy Smells",
      ru: "Сниппет Bug Hunt: Hierarchy Smells"
    },
    sourceCode: `public abstract class AbstractPaymentBase {
    protected PaymentCommand command;
    protected abstract PaymentResult executeCore();
    protected void audit() { /* shared god hook */ }
    protected void fraud() { /* shared god hook */ }
    protected void retry() { /* shared god hook */ }
    public final PaymentResult run() {
        audit(); fraud();
        PaymentResult r = executeCore();
        retry();
        return r;
    }
}
public interface PaymentThing {}
public class CardRailL1 extends AbstractPaymentBase { /* ... */ }
public class CardRailL2 extends CardRailL1 { /* ... */ }
public class CardRailL3 extends CardRailL2 { /* ... */ }
public class CardRailL4 extends CardRailL3 { /* ... */ }
public class CardRailL5 extends CardRailL4 implements PaymentThing {
    @Override protected PaymentResult executeCore() { return PaymentResult.ok(); }
}`,
    annotations: [
      {
        id: "ann_trade_bug_1",
        startLine: 1,
        endLine: 1,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Smell Anchor", ru: "Якорь Smell" },
        explanation: {
          en: "Flag the god base, the empty marker, and the L5 extends line as architecture defects.",
          ru: "Отметьте god base, пустой marker и строку L5 extends как архитектурные дефекты."
        },
        conceptDemonstrated: "cpt_overengineering_smell"
      }
    ],
    relatedQuestionIds: ["q_trade_payment_01"],
    conceptIds: ["cpt_overengineering_smell"],
    tags: ["#bug-hunt"]
  }
];
