import {
  FixBuilderChallenge, BugHuntChallenge, InterviewAnswerChallenge, Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_DEC: FixBuilderChallenge = {
  id: "chl_dec_fix_builder", type: "FIX_BUILDER", missionId: "mis_decorator_pattern", stageId: "stg_dec_practice",
  title: { en: "Fix Builder: The Missing Audit Layer", ru: "Конструктор Исправления: Пропущенный Audit-Слой" },
  prompt: { en: "Compose AuditedFundsTransferGateway, RetryingFundsTransferGateway, and AuthorizedFundsTransferGateway around CoreFundsTransferGateway so audit is never dropped when retry/auth wrappers are applied.", ru: "Скомпонуйте AuditedFundsTransferGateway, RetryingFundsTransferGateway и AuthorizedFundsTransferGateway вокруг CoreFundsTransferGateway так, чтобы audit не терялся при обёртках retry/auth." },
  difficulty: "SENIOR", assistanceLevel: "GUIDED",
  conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], topicIds: ["top_oop_31"],
  tags: ["#dec", "#fix-builder"],
  hintIds: ["hnt_dec_1", "hnt_dec_2", "hnt_dec_3", "hnt_dec_4"],
  xpReward: 100, order: 7,
  payload: {
    baseCodeArtifactId: "art_dec_broken",
    solutionCodeArtifactId: "art_dec_solution",
    options: [
      {
        id: "opt_dec_fix_1",
        text: {"en":"Implement AuditedFundsTransferGateway as a FundsTransferGateway decorator that delegates to a wrapped gateway.","ru":"Реализовать AuditedFundsTransferGateway как декоратор FundsTransferGateway, делегирующий обёрнутому gateway."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_dec_fix_2",
        text: {"en":"Compose Authorize/Audit/Retry/Core explicitly so AuditedFundsTransferGateway is never omitted.","ru":"Явно скомпоновать Authorize/Audit/Retry/Core так, чтобы AuditedFundsTransferGateway никогда не опускался."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_dec_fix_3",
        text: {"en":"Put audit only inside CoreFundsTransferGateway and delete the audited decorator to simplify.","ru":"Оставить audit только внутри CoreFundsTransferGateway и удалить audited decorator ради упрощения."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      },
      {
        id: "opt_dec_fix_4",
        text: {"en":"Document and test decorator order (e.g., auth outside, audit around core/retry as designed).","ru":"Документировать и тестировать порядок декораторов (например, auth снаружи, audit вокруг core/retry по дизайну)."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_dec_fix_5",
        text: {"en":"Inherit RetryingFundsTransferGateway from CoreFundsTransferGateway instead of decorating.","ru":"Наследовать RetryingFundsTransferGateway от CoreFundsTransferGateway вместо декорирования."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_DEC: BugHuntChallenge = {
  id: "chl_dec_bughunt", type: "BUG_HUNT", missionId: "mis_decorator_pattern", stageId: "stg_dec_debug",
  title: { en: "Bug Hunt: The Missing Audit Layer", ru: "Поиск Бага: Пропущенный Audit-Слой" },
  prompt: { en: "Click the defective line(s). Non-defect lines are distractors.", ru: "Нажмите дефектную строку(и). Остальные — дистракторы." },
  difficulty: "SENIOR", assistanceLevel: "APPLIED",
  conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], topicIds: ["top_oop_31"],
  tags: ["#dec", "#bug-hunt"],
  hintIds: ["hnt_dec_bug_1", "hnt_dec_bug_2", "hnt_dec_bug_3"],
  xpReward: 100, order: 10,
  payload: {
    baseCodeArtifactId: "art_dec_bughunt",
    solutionCodeArtifactId: "art_dec_solution",
    codeSnippet: `FundsTransferGateway gw =\n    new RetryingFundsTransferGateway(\n        new AuthorizedFundsTransferGateway(new CoreFundsTransferGateway())); // Line 3 — BUG: missing Audited\ngw.transfer(request);`,
    lines: [
      { lineNumber: 1, code: "FundsTransferGateway gw =", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 2, code: "    new RetryingFundsTransferGateway(", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 3, code: "        new AuthorizedFundsTransferGateway(new CoreFundsTransferGateway())); // Line 3 — BUG: missing Audited", isBug: true, explanation: {"en":"Line 3: Composition omits AuditedFundsTransferGateway — transfers succeed without audit.","ru":"Строка 3: В композиции нет AuditedFundsTransferGateway — переводы без audit."} },
      { lineNumber: 4, code: "gw.transfer(request);", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_DEC: InterviewAnswerChallenge = {
  id: "chl_dec_interview_answer", type: "INTERVIEW_ANSWER", missionId: "mis_decorator_pattern", stageId: "stg_dec_interview_a",
  title: { en: "Senior Interview Verbal Explanation", ru: "Устный Ответ на Senior-Интервью" },
  prompt: { en: "Compose AuditedFundsTransferGateway, RetryingFundsTransferGateway, and AuthorizedFundsTransferGateway around CoreFundsTransferGateway so audit is never dropped when retry/auth wrappers are applied.", ru: "Скомпонуйте AuditedFundsTransferGateway, RetryingFundsTransferGateway и AuthorizedFundsTransferGateway вокруг CoreFundsTransferGateway так, чтобы audit не терялся при обёртках retry/auth." },
  difficulty: "SENIOR", assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], topicIds: ["top_oop_31"],
  tags: ["#dec", "#interview"], hintIds: [], xpReward: 150, order: 9,
  payload: {
    targetQuestionId: "q_dec_audit_01",
    rubricDimensions: ["ELEVATOR_PITCH", "MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [{"id":"cpt_decorator_pattern","label":{"en":"decorator pattern","ru":"decorator pattern"},"keywords":["decorator","pattern"]},{"id":"cpt_decorator_order","label":{"en":"decorator order","ru":"decorator order"},"keywords":["decorator","order"]},{"id":"cpt_decorator_vs_proxy","label":{"en":"decorator vs proxy","ru":"decorator vs proxy"},"keywords":["decorator","vs","proxy"]}],
    modelAnswer30s: {"en":"Elevator Pitch (30 sec): Retry/Auth wrappers were composed without AuditedFundsTransferGateway, so transfers lacked audit. Fix: Decorator stack on FundsTransferGateway with explicit order. Decorator adds responsibilities; Proxy controls access. Distinct from general composition-over-inheritance teaching mission.","ru":"Elevator Pitch (30 сек): Обёртки Retry/Auth собрали без AuditedFundsTransferGateway — переводы без audit. Фикс: стек Decorator на FundsTransferGateway с явным порядком. Decorator добавляет обязанности; Proxy контролирует доступ."},
    modelAnswerDetailed: {"en":"Deep Mechanics (60 sec): Each decorator implements FundsTransferGateway, holds a delegate, adds behavior before/after transfer. Order changes semantics (audit retries vs audit final result). Keep CoreFundsTransferGateway free of cross-cutting concerns when using decorators.","ru":"Глубокая Механика (60 сек): Каждый декоратор реализует FundsTransferGateway, держит delegate, добавляет поведение до/после transfer. Порядок меняет семантику. Ядро без cross-cutting, когда используете декораторы."},
    modelAnswerTradeOffs: {"en":"Production Trade-offs (30 sec): Deep decorator stacks are flexible but harder to debug; prefer clear composition roots and tests for order. Inheritance explosion is worse for retry×audit×auth combinations.","ru":"Продакшн Компромиссы (30 сек): Глубокие стеки гибкие, но сложнее в отладке; явный composition root и тесты порядка. Взрыв наследования хуже для комбинаций retry×audit×auth."},
    followUpQuestionText: {"en":"Interviewer Follow-Up: 'Decorator vs Proxy for authorization?'","ru":"Доп. Вопрос: 'Decorator vs Proxy для authorization?'"},
    followUpModelAnswerText: {"en":"Follow-up: Authorization is often discussed as Proxy (access control). In this stack AuthorizedFundsTransferGateway acts as a decorating wrapper adding an auth check responsibility — clarify intent: if it only controls access to an expensive/remote core, Proxy framing fits; if it stacks with audit/retry as peer wrappers, Decorator composition is the practical model.","ru":"Ответ: Authorization часто как Proxy (контроль доступа). В этом стеке AuthorizedFundsTransferGateway — обёртка, добавляющая auth-обязанность — уточняйте intent: контроль доступа к ядру ≈ Proxy; стек с audit/retry как peer wrappers ≈ Decorator."}
  }
};

export const ALL_DECORATOR_PATTERN_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_DEC,
  APPLIED_BUG_HUNT_CHALLENGE_DEC,
  INTERVIEW_ANSWER_CHALLENGE_DEC
];
