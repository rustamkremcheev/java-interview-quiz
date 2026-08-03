import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_IDM: FixBuilderChallenge = {
  id: "chl_idm_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_interface_default_methods",
  stageId: "stg_idm_practice",
  title: {
    en: "Fix Builder: Resolve Default Method Diamond Conflict",
    ru: "Конструктор Исправления: Разрешение Конфликта Default-Методов Ромба"
  },
  prompt: {
    en: "PaymentReconciliationService fails to compile after framework upgrade. Select ALL structural building blocks required to resolve the unrelated defaults for auditLog() from Auditable and Traceable per JLS 9.4.1.2.",
    ru: "PaymentReconciliationService не компилируется после обновления фреймворка. Выберите ВСЕ элементы, необходимые для разрешения unrelated defaults для auditLog() из Auditable и Traceable согласно JLS 9.4.1.2."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
  topicIds: ["top_oop_09"],
  tags: ["#default-methods", "#diamond-problem", "#jls-9412"],
  hintIds: ["hnt_idm_1", "hnt_idm_2", "hnt_idm_3", "hnt_idm_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_idm_reconciliation_broken",
    solutionCodeArtifactId: "art_idm_reconciliation_solution",
    options: [
      {
        id: "opt_idm_fix_1",
        text: {
          en: "@Override public void auditLog() { Auditable.super.auditLog(); Traceable.super.auditLog(); }",
          ru: "@Override public void auditLog() { Auditable.super.auditLog(); Traceable.super.auditLog(); }"
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Explicit override with super-qualified calls to BOTH interface defaults resolves JLS 9.4.1.2 diamond conflict and preserves dual audit trails.",
          ru: "Верно. Явное переопределение с super-qualified вызовами ОБОИХ defaults интерфейсов разрешает конфликт ромба JLS 9.4.1.2 и сохраняет двойной аудит-трейл."
        }
      },
      {
        id: "opt_idm_fix_2",
        text: {
          en: "Remove either Auditable or Traceable from the implements clause to eliminate the conflict.",
          ru: "Удалить Auditable или Traceable из implements для устранения конфликта."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Removing a required compliance or observability contract breaks regulatory audit coverage or distributed tracing — not a production-safe fix.",
          ru: "Неверно. Удаление обязательного compliance или observability контракта ломает регуляторный аудит или distributed tracing — не продакшн-безопасный фикс."
        }
      },
      {
        id: "opt_idm_fix_3",
        text: {
          en: "Add synchronized keyword to auditLog() to serialize compliance and trace writes.",
          ru: "Добавить synchronized к auditLog() для сериализации compliance и trace записей."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronization does not resolve compile-time default method inheritance conflicts.",
          ru: "Неверно. Synchronized не разрешает compile-time конфликты наследования default-методов."
        }
      },
      {
        id: "opt_idm_fix_4",
        text: {
          en: "Extract AuditFacade bean with explicit auditCompliance() and emitTrace() methods, removing marker interfaces with conflicting defaults.",
          ru: "Извлечь AuditFacade bean с явными auditCompliance() и emitTrace(), удалив marker-интерфейсы с конфликтующими defaults."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Composition-based audit facade eliminates diamond conflicts entirely and makes audit ordering explicit — preferred senior architecture.",
          ru: "Верно. Composition-based audit facade полностью устраняет конфликты ромба и делает порядок аудита явным — предпочтительная Senior-архитектура."
        }
      },
      {
        id: "opt_idm_fix_distractor_1",
        text: {
          en: "@Override public void auditLog() { } // empty override silences compiler",
          ru: "@Override public void auditLog() { } // пустое переопределение заглушает компилятор"
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Empty override compiles but silently drops BOTH compliance audit DB writes AND distributed trace spans — a regulatory violation.",
          ru: "Неверно. Пустое переопределение компилируется, но молча отбрасывает И compliance audit DB записи, И distributed trace spans — нарушение регуляторики."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_IDM: BugHuntChallenge = {
  id: "chl_idm_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_interface_default_methods",
  stageId: "stg_idm_debug",
  title: {
    en: "Bug Hunt: SettlementProcessor Silent Audit Trail Loss",
    ru: "Поиск Бага: Тихая Потеря Аудит-Трейла в SettlementProcessor"
  },
  prompt: {
    en: "SettlementProcessor resolved the compile error but production audit logs show missing compliance records. Click the line(s) responsible for dropping the Auditable default auditLog() behavior.",
    ru: "SettlementProcessor устранил ошибку компиляции, но в продакшн audit logs отсутствуют compliance записи. Нажмите строку(и), ответственные за потерю default auditLog() из Auditable."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
  topicIds: ["top_oop_09"],
  tags: ["#default-methods", "#bug-hunt", "#audit"],
  hintIds: ["hnt_idm_bug_1", "hnt_idm_bug_2", "hnt_idm_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_idm_settlement_processor_bughunt",
    solutionCodeArtifactId: "art_idm_reconciliation_solution",
    codeSnippet: `public class SettlementProcessor implements Auditable, Traceable {

    @Override
    public void auditLog() {
        Traceable.super.auditLog(); // Line 5
    }

    public void processSettlement(Settlement settlement) {
        auditLog();
        // settlement processing logic...
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class SettlementProcessor implements Auditable, Traceable {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "    @Override", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "    public void auditLog() {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 5,
        code: "        Traceable.super.auditLog();",
        isBug: true,
        explanation: {
          en: "Line 5 invokes ONLY Traceable.super.auditLog() — the Auditable compliance DB write is never called! Production shows trace spans but zero compliance audit records.",
          ru: "Строка 5 вызывает ТОЛЬКО Traceable.super.auditLog() — запись в compliance DB из Auditable никогда не вызывается! В продакшене есть trace spans, но ноль compliance audit records."
        }
      },
      { lineNumber: 6, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "    public void processSettlement(Settlement settlement) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "        auditLog();", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_IDM: InterviewAnswerChallenge = {
  id: "chl_idm_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_interface_default_methods",
  stageId: "stg_idm_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Default Method Diamond Conflict",
    ru: "Устный Ответ на Senior-Интервью: Конфликт Default-Методов Ромба"
  },
  prompt: {
    en: "Your payment service fails to compile after upgrading two internal SDKs. PaymentReconciliationService implements Auditable and Traceable — both now have default void auditLog(). Explain the root cause, JLS resolution rules, and your production fix to the interviewer.",
    ru: "Платежный сервис не компилируется после обновления двух internal SDK. PaymentReconciliationService реализует Auditable и Traceable — оба теперь имеют default void auditLog(). Объясните интервьюеру корневую причину, правила JLS и ваш продакшн-фикс."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
  topicIds: ["top_oop_09"],
  tags: ["#default-methods", "#diamond-problem", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_idm_payment_01",
    rubricDimensions: ["ELEVATOR_PITCH", "JLS_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_default_methods",
        label: { en: "Default Method Diamond Conflict", ru: "Конфликт Default-Методов Ромба" },
        keywords: ["default method", "default methods", "diamond", "unrelated defaults", "inherits unrelated", "default-метод", "ромб"]
      },
      {
        id: "cpt_jls_9412",
        label: { en: "JLS 9.4.1.2 Resolution Rules", ru: "Правила Разрешения JLS 9.4.1.2" },
        keywords: ["jls", "9.4.1.2", "most specific", "class wins", "override", "explicit override", "jls 9.4"]
      },
      {
        id: "cpt_interface_super",
        label: { en: "Super-Qualified Default Invocation", ru: "Super-Qualified Вызов Default" },
        keywords: ["Auditable.super", "Traceable.super", "interface.super", "super-qualified", "super.auditLog"]
      },
      {
        id: "cpt_composition_facade",
        label: { en: "Composition Audit Facade Alternative", ru: "Альтернатива Audit Facade через Композицию" },
        keywords: ["composition", "facade", "AuditFacade", "decouple", "композиция", "фасад"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): After the SDK upgrade, both Auditable and Traceable added default void auditLog() with unrelated implementations. PaymentReconciliationService inherits both defaults, triggering JLS 9.4.1.2 compile error because neither interface subtypes the other. The fix is an explicit override delegating to Auditable.super.auditLog() and Traceable.super.auditLog().",
      ru: "Elevator Pitch (30 сек): После обновления SDK оба Auditable и Traceable добавили default void auditLog() с несвязанными реализациями. PaymentReconciliationService наследует оба defaults, вызывая ошибку JLS 9.4.1.2, так как ни один интерфейс не subtyping другой. Фикс — явное переопределение с делегированием Auditable.super.auditLog() и Traceable.super.auditLog()."
    },
    modelAnswerDetailed: {
      en: "Deep JLS Mechanics (60 sec): JLS 9.4.1.2 defines three resolution tiers. Rule 1: class methods win over defaults. Rule 2: most specific interface default wins when subtyping exists. Rule 3: unrelated sibling interfaces with same-signature defaults require explicit override. Super-qualified syntax InterfaceName.super.method() is the only way to invoke a specific default from an overriding class. An empty override compiles but drops all audit behavior silently.",
      ru: "Глубокая Механика JLS (60 сек): JLS 9.4.1.2 определяет три уровня разрешения. Правило 1: методы класса побеждают defaults. Правило 2: default наиболее специфичного интерфейса побеждает при subtyping. Правило 3: несвязанные «братские» интерфейсы с defaults одинаковой сигнатуры требуют явного переопределения. Super-qualified синтаксис InterfaceName.super.method() — единственный способ вызвать конкретный default из переопределяющего класса. Пустое override компилируется, но молча отбрасывает всё audit-поведение."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Chaining super-qualified calls couples the service to both SDK default implementations — silent behavior changes on future minor releases. Senior alternative: extract AuditFacade with injected ComplianceAuditor and TraceEmitter beans, removing marker interfaces entirely. More boilerplate, but zero diamond conflicts and explicit audit ordering for regulatory compliance.",
      ru: "Продакшн Компромиссы (30 сек): Цепочка super-qualified вызовов связывает сервис с default-реализациями обоих SDK — тихие изменения поведения в будущих минорных релизах. Senior-альтернатива: извлечь AuditFacade с инжектированными ComplianceAuditor и TraceEmitter beans, удалив marker-интерфейсы. Больше шаблона, но ноль конфликтов ромба и явный порядок аудита для регуляторики."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'What if Traceable extended Auditable in the next SDK release — would your fix still be needed?'",
      ru: "Доп. Вопрос Интервьюера: 'Что если в следующем релизе SDK Traceable начнет расширять Auditable — ваш фикс все еще нужен?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: No. JLS 9.4.1.2 rule 2 would apply — Traceable as the most specific subinterface wins automatically. PaymentReconciliationService would inherit Traceable's default auditLog() without explicit override. However, we'd lose Auditable's compliance DB write unless we still call Auditable.super.auditLog() in an override to chain both behaviors.",
      ru: "Ответ на Доп. Вопрос: Нет. Применилось бы правило 2 JLS 9.4.1.2 — Traceable как наиболее специфичный subinterface побеждает автоматически. PaymentReconciliationService унаследовал бы default auditLog() из Traceable без явного override. Однако мы потеряем запись compliance DB из Auditable, если не вызовем Auditable.super.auditLog() в override для цепочки обоих поведений."
    }
  }
};

export const ALL_INTERFACE_DEFAULT_METHODS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_IDM,
  APPLIED_BUG_HUNT_CHALLENGE_IDM,
  INTERVIEW_ANSWER_CHALLENGE_IDM
];
