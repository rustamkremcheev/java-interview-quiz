import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_TRADE: FixBuilderChallenge = {
  id: "chl_trade_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_senior_oop_tradeoffs",
  stageId: "stg_trade_practice",
  title: {
    en: "Fix Builder: Trade-off Matrix for PlatformPaymentHandler",
    ru: "Конструктор Исправления: Матрица Компромиссов PlatformPaymentHandler"
  },
  prompt: {
    en: "Constraints: high PaymentMethod volatility + fraud/audit/retry seams. Select ALL appropriate design elements; reject deep inheritance as default and 'always Strategy' slogans.",
    ru: "Ограничения: высокая volatility PaymentMethod + seams fraud/audit/retry. Выберите ВСЕ уместные элементы; отклоните глубокое наследование как default и слоган «always Strategy»."
  },
  difficulty: "STAFF",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_design_tradeoffs", "cpt_constraint_driven_design", "cpt_overengineering_smell"],
  topicIds: ["top_oop_36"],
  tags: ["#design-tradeoffs", "#constraint-driven-design", "#platform-payment-handler"],
  hintIds: ["hnt_trade_1", "hnt_trade_2", "hnt_trade_3", "hnt_trade_4"],
  xpReward: 120,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_trade_handler_broken",
    solutionCodeArtifactId: "art_trade_handler_solution",
    options: [
      {
        id: "opt_trade_fix_1",
        text: {
          en: "Keep PlatformPaymentHandler as a thin orchestrator: PaymentCommand → PaymentPolicy / PaymentRiskPolicy → PaymentResult.",
          ru: "Оставить PlatformPaymentHandler тонким оркестратором: PaymentCommand → PaymentPolicy / PaymentRiskPolicy → PaymentResult."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Orchestration stays thin; varying rules live in policies.",
          ru: "Верно. Оркестрация тонкая; меняющиеся правила — в policies."
        }
      },
      {
        id: "opt_trade_fix_2",
        text: {
          en: "Model PaymentMethod / risk variance with replaceable PaymentPolicy and PaymentRiskPolicy strategies (not a five-level subclass tree).",
          ru: "Моделировать вариативность PaymentMethod / risk сменяемыми стратегиями PaymentPolicy и PaymentRiskPolicy (не пятиуровневым деревом подклассов)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Strategies match high independent volatility.",
          ru: "Верно. Strategies соответствуют высокой независимой volatility."
        }
      },
      {
        id: "opt_trade_fix_3",
        text: {
          en: "Register ordered audit/fraud/retry wraps in PaymentExtensionRegistry at known PaymentWorkflow seams.",
          ru: "Регистрировать упорядоченные audit/fraud/retry wraps в PaymentExtensionRegistry на известных seams PaymentWorkflow."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Decorators belong at explicit, ordered seams.",
          ru: "Верно. Decorators — на явных упорядоченных seams."
        }
      },
      {
        id: "opt_trade_fix_wrong_1",
        text: {
          en: "Default to AbstractPaymentBase with Card/Wire/Wallet subclasses stacked five levels deep for every regional rail.",
          ru: "По умолчанию AbstractPaymentBase с Card/Wire/Wallet подклассами на пять уровней для каждого регионального rail."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Deep inheritance is the wrong default under high method volatility.",
          ru: "Неверно. Глубокое наследование — неверный default при высокой volatility методов."
        }
      },
      {
        id: "opt_trade_fix_wrong_2",
        text: {
          en: "Apply Strategy to every method call 'because GoF' — even for stable helpers that never vary.",
          ru: "Вешать Strategy на каждый вызов «потому что GoF» — даже на стабильные helpers без вариации."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. 'Always Strategy' is an overengineering slogan, not a constraint.",
          ru: "Неверно. «Always Strategy» — слоган overengineering, не ограничение."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_TRADE: BugHuntChallenge = {
  id: "chl_trade_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_senior_oop_tradeoffs",
  stageId: "stg_trade_debug",
  title: {
    en: "Bug Hunt: Architecture Smells in Payment Hierarchy",
    ru: "Поиск Бага: Architecture Smells в Payment Hierarchy"
  },
  prompt: {
    en: "Click the smell lines: deep hierarchy declaration, god abstract payment base, and an unnecessary marker interface that buys no seam.",
    ru: "Нажмите строки-smells: объявление глубокой иерархии, god abstract payment base и лишний marker interface без seam."
  },
  difficulty: "STAFF",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_overengineering_smell", "cpt_design_tradeoffs"],
  topicIds: ["top_oop_36"],
  tags: ["#bug-hunt", "#overengineering-smell"],
  hintIds: ["hnt_trade_bug_1", "hnt_trade_bug_2", "hnt_trade_bug_3"],
  xpReward: 120,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_trade_handler_bughunt",
    solutionCodeArtifactId: "art_trade_handler_solution",
    codeSnippet: `public abstract class AbstractPaymentBase { // Line 1 — god abstract base
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
public interface PaymentThing {} // Line 14 — unnecessary marker
public class CardRailL1 extends AbstractPaymentBase { /* ... */ }
public class CardRailL2 extends CardRailL1 { /* ... */ }
public class CardRailL3 extends CardRailL2 { /* ... */ }
public class CardRailL4 extends CardRailL3 { /* ... */ }
public class CardRailL5 extends CardRailL4 implements PaymentThing { // Line 19 — deep hierarchy
    @Override protected PaymentResult executeCore() { return PaymentResult.ok(); }
}`,
    lines: [
      {
        lineNumber: 1,
        code: "public abstract class AbstractPaymentBase {",
        isBug: true,
        explanation: {
          en: "Line 1: God abstract payment base absorbs audit/fraud/retry and forces subclass coupling.",
          ru: "Строка 1: God abstract payment base вбирает audit/fraud/retry и форсирует coupling подклассов."
        }
      },
      { lineNumber: 2, code: "    protected PaymentCommand command;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "    protected abstract PaymentResult executeCore();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    protected void audit() { /* shared god hook */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    protected void fraud() { /* shared god hook */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "    protected void retry() { /* shared god hook */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "    public final PaymentResult run() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "        audit(); fraud();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "        PaymentResult r = executeCore();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "        retry();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 11, code: "        return r;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 14,
        code: "public interface PaymentThing {}",
        isBug: true,
        explanation: {
          en: "Line 14: Empty marker interface — ceremony without a substitution seam.",
          ru: "Строка 14: Пустой marker interface — ceremony без seam подстановки."
        }
      },
      { lineNumber: 15, code: "public class CardRailL1 extends AbstractPaymentBase { /* ... */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 16, code: "public class CardRailL2 extends CardRailL1 { /* ... */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 17, code: "public class CardRailL3 extends CardRailL2 { /* ... */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 18, code: "public class CardRailL4 extends CardRailL3 { /* ... */ }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 19,
        code: "public class CardRailL5 extends CardRailL4 implements PaymentThing {",
        isBug: true,
        explanation: {
          en: "Line 19: Five-level hierarchy + useless marker — deep inheritance smell under volatile rails.",
          ru: "Строка 19: Пятиуровневая иерархия + бесполезный marker — smell глубокого inheritance при volatile rails."
        }
      },
      { lineNumber: 20, code: "    @Override protected PaymentResult executeCore() { return PaymentResult.ok(); }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 21, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_TRADE: InterviewAnswerChallenge = {
  id: "chl_trade_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_senior_oop_tradeoffs",
  stageId: "stg_trade_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Payment Platform Trade-offs",
    ru: "Устный Ответ на Senior-Интервью: Компромиссы Платёжной Платформы"
  },
  prompt: {
    en: "In ~90 seconds: name constraints for PlatformPaymentHandler, recommend a shape, and state when you would change it. No universal winner.",
    ru: "За ~90 секунд: назовите ограничения для PlatformPaymentHandler, порекомендуйте форму и скажите, когда измените решение. Без универсального победителя."
  },
  difficulty: "STAFF",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_design_tradeoffs", "cpt_constraint_driven_design", "cpt_overengineering_smell"],
  topicIds: ["top_oop_36"],
  tags: ["#interview", "#design-tradeoffs"],
  hintIds: [],
  xpReward: 180,
  order: 9,
  payload: {
    targetQuestionId: "q_trade_payment_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_constraint_driven_design",
        label: { en: "Constraint-Driven Design", ru: "Constraint-Driven Design" },
        keywords: ["constraint", "volatility", "audit", "retry", "ограничен", "volatility", "audit", "retry"]
      },
      {
        id: "cpt_design_tradeoffs",
        label: { en: "Design Trade-offs", ru: "Design Trade-offs" },
        keywords: ["trade-off", "tradeoff", "recommend", "composition", "strategy", "компромисс", "рекоменд", "композиц", "strategy"]
      },
      {
        id: "cpt_overengineering_smell",
        label: { en: "Overengineering Smell", ru: "Overengineering Smell" },
        keywords: ["deep inheritance", "always strategy", "overengineer", "глубок", "always strategy", "overengineer"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (~30s): Constraints are monthly PaymentMethod variants, fraud/audit hooks, and retryable PaymentWorkflow. I reject deep AbstractPaymentBase trees and 'always Strategy' as defaults. PlatformPaymentHandler stays a thin orchestrator over PaymentPolicy / PaymentRiskPolicy with PaymentExtensionRegistry for ordered wraps.",
      ru: "Elevator Pitch (~30с): Ограничения — ежемесячные варианты PaymentMethod, fraud/audit hooks и retryable PaymentWorkflow. Отклоняю глубокие деревья AbstractPaymentBase и «always Strategy» как default. PlatformPaymentHandler — тонкий оркестратор над PaymentPolicy / PaymentRiskPolicy с PaymentExtensionRegistry для упорядоченных wraps."
    },
    modelAnswerDetailed: {
      en: "Mechanics (~40s): High independent volatility belongs in strategies, not subclass levels. Audit/fraud/retry are cross-cuts — decorate at known seams so order is explicit. PaymentCommand/PaymentResult can stay lean; invariants live in PaymentPolicy/PaymentWorkflow. Interface-per-class without substitution reasons is ceremony. Factories construct; they do not replace the argument.",
      ru: "Механика (~40с): Высокая независимая volatility — в strategies, не в уровнях подклассов. Audit/fraud/retry — cross-cuts; декорируйте на известных seams с явным порядком. PaymentCommand/PaymentResult могут быть lean; инварианты — в PaymentPolicy/PaymentWorkflow. Interface-per-class без причин подстановки — ceremony. Factories собирают; они не заменяют аргумент."
    },
    modelAnswerTradeOffs: {
      en: "When I'd change it (~20s): If rails are few and forever stable, a shallow Template Method can beat Strategy ceremony. If decorator order becomes unreadable, collapse wraps or push to infrastructure middleware. No single universal winner — reverse when the constraint set flips.",
      ru: "Когда изменю (~20с): Если rails мало и навсегда стабильны, неглубокий Template Method может победить ceremony Strategy. Если порядок decorator становится нечитаемым — схлопните wraps или унесите в infrastructure middleware. Универсального победителя нет — пересматривайте, когда набор ограничений переворачивается."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Leadership says more interfaces means cleaner architecture. How do you respond?'",
      ru: "Доп. Вопрос: 'Leadership говорит, что больше интерфейсов — чище архитектура. Как ответите?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Interfaces earn their keep when there is a real substitution or test seam. Counting interfaces is not Clean Architecture. I'd keep ports where PaymentPolicy/PaymentRiskPolicy/extensions vary; delete PaymentThing-style markers that buy nothing.",
      ru: "Ответ на Доп. Вопрос: Интерфейсы окупаются при реальной подстановке или test seam. Подсчёт интерфейсов — не Clean Architecture. Оставлю ports там, где варьируются PaymentPolicy/PaymentRiskPolicy/extensions; удалю markers вроде PaymentThing, которые ничего не покупают."
    }
  }
};

export const ALL_SENIOR_OOP_TRADEOFFS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_TRADE,
  APPLIED_BUG_HUNT_CHALLENGE_TRADE,
  INTERVIEW_ANSWER_CHALLENGE_TRADE
];
