import {
  FixBuilderChallenge, BugHuntChallenge, InterviewAnswerChallenge, Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_API: FixBuilderChallenge = {
  id: "chl_api_fix_builder", type: "FIX_BUILDER", missionId: "mis_api_contract_design", stageId: "stg_api_practice",
  title: { en: "Fix Builder: The Breaking Payment API", ru: "Конструктор Исправления: Ломающий Payment API" },
  prompt: { en: "Evolve PaymentAuthorizationService so AuthorizationResult, DeclineReason, and null-vs-empty collection semantics stay behaviorally compatible — no silent client failures.", ru: "Эволюционируйте PaymentAuthorizationService так, чтобы AuthorizationResult, DeclineReason и семантика null-vs-empty коллекций оставались поведенчески совместимы — без тихих провалов клиентов." },
  difficulty: "SENIOR", assistanceLevel: "GUIDED",
  conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], topicIds: ["top_oop_34"],
  tags: ["#api", "#fix-builder"],
  hintIds: ["hnt_api_1", "hnt_api_2", "hnt_api_3", "hnt_api_4"],
  xpReward: 100, order: 7,
  payload: {
    baseCodeArtifactId: "art_api_broken",
    solutionCodeArtifactId: "art_api_solution",
    options: [
      {
        id: "opt_api_fix_1",
        text: {"en":"Document and keep AuthorizationResult for declines unless a versioned break is intentional; avoid silent switch to PaymentAuthorizationException.","ru":"Документировать и сохранять AuthorizationResult для declines, пока нет намеренного versioned break; избегать тихой замены на PaymentAuthorizationException."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_api_fix_2",
        text: {"en":"Pick null-vs-empty once for declineReasons (prefer empty list) and never flip without a migration.","ru":"Выбрать null-vs-empty один раз для declineReasons (предпочтительно empty list) и не менять без миграции."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_api_fix_3",
        text: {"en":"Change return semantics freely each sprint if unit tests inside the service still pass.","ru":"Свободно менять семантику возврата каждый спринт, если unit-тесты внутри сервиса ещё зелёные."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      },
      {
        id: "opt_api_fix_4",
        text: {"en":"Provide an adapter/compatibility layer when AuthorizationPolicy evolution must change client-visible behavior.","ru":"Дать adapter/compatibility layer, когда эволюция AuthorizationPolicy должна менять client-visible поведение."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_api_fix_5",
        text: {"en":"Return null collections to mean both \"unknown\" and \"no declines\" interchangeably.","ru":"Возвращать null-коллекции одновременно как \"unknown\" и \"no declines\"."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_API: BugHuntChallenge = {
  id: "chl_api_bughunt", type: "BUG_HUNT", missionId: "mis_api_contract_design", stageId: "stg_api_debug",
  title: { en: "Bug Hunt: The Breaking Payment API", ru: "Поиск Бага: Ломающий Payment API" },
  prompt: { en: "Click the defective line(s). Non-defect lines are distractors.", ru: "Нажмите дефектную строку(и). Остальные — дистракторы." },
  difficulty: "SENIOR", assistanceLevel: "APPLIED",
  conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], topicIds: ["top_oop_34"],
  tags: ["#api", "#bug-hunt"],
  hintIds: ["hnt_api_bug_1", "hnt_api_bug_2", "hnt_api_bug_3"],
  xpReward: 100, order: 10,
  payload: {
    baseCodeArtifactId: "art_api_bughunt",
    solutionCodeArtifactId: "art_api_solution",
    codeSnippet: `public AuthorizationResult authorize(AuthorizationRequest req) {\n    if (!policy.allows(req)) {\n        throw new PaymentAuthorizationException("DECLINED"); // Line 3 — BUG: was result.declined\n    }\n    return AuthorizationResult.approved(req.id(), List.of()); // ok\n}\npublic List<DeclineReason> reasons() { return this.reasons; } // may be null — BUG if contract said empty`,
    lines: [
      { lineNumber: 1, code: "public AuthorizationResult authorize(AuthorizationRequest req) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 2, code: "    if (!policy.allows(req)) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 3, code: "        throw new PaymentAuthorizationException(\"DECLINED\"); // Line 3 — BUG: was result.declined", isBug: true, explanation: {"en":"Line 3: Switching from AuthorizationResult.declined to exception breaks clients that handled result objects.","ru":"Строка 3: Замена AuthorizationResult.declined на exception ломает клиентов, обрабатывавших result."} },
      { lineNumber: 4, code: "    }", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 5, code: "    return AuthorizationResult.approved(req.id(), List.of()); // ok", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 6, code: "}", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 7, code: "public List<DeclineReason> reasons() { return this.reasons; } // may be null — BUG if contract said empty", isBug: true, explanation: {"en":"Line 7: Returning null when clients migrated to expect empty list (or vice versa) causes NPE/silent skips.","ru":"Строка 7: Возврат null, когда клиенты ждут empty list (или наоборот), даёт NPE/тихие пропуски."} }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_API: InterviewAnswerChallenge = {
  id: "chl_api_interview_answer", type: "INTERVIEW_ANSWER", missionId: "mis_api_contract_design", stageId: "stg_api_interview_a",
  title: { en: "Senior Interview Verbal Explanation", ru: "Устный Ответ на Senior-Интервью" },
  prompt: { en: "Evolve PaymentAuthorizationService so AuthorizationResult, DeclineReason, and null-vs-empty collection semantics stay behaviorally compatible — no silent client failures.", ru: "Эволюционируйте PaymentAuthorizationService так, чтобы AuthorizationResult, DeclineReason и семантика null-vs-empty коллекций оставались поведенчески совместимы — без тихих провалов клиентов." },
  difficulty: "SENIOR", assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], topicIds: ["top_oop_34"],
  tags: ["#api", "#interview"], hintIds: [], xpReward: 150, order: 9,
  payload: {
    targetQuestionId: "q_api_auth_01",
    rubricDimensions: ["ELEVATOR_PITCH", "MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [{"id":"cpt_api_contract","label":{"en":"api contract","ru":"api contract"},"keywords":["api","contract"]},{"id":"cpt_behavioral_compatibility","label":{"en":"behavioral compatibility","ru":"behavioral compatibility"},"keywords":["behavioral","compatibility"]},{"id":"cpt_null_vs_empty_collection","label":{"en":"null vs empty collection","ru":"null vs empty collection"},"keywords":["null","vs","empty","collection"]}],
    modelAnswer30s: {"en":"Elevator Pitch (30 sec): PaymentAuthorizationService broke clients by switching declines to exceptions and flipping null vs empty declineReasons. API contract is behavioral, not just signatures. Fix: stable AuthorizationResult semantics, empty-list policy, versioned breaks.","ru":"Elevator Pitch (30 сек): PaymentAuthorizationService сломал клиентов сменой declines на exceptions и переворотом null vs empty. API-контракт — поведенческий. Фикс: стабильная семантика AuthorizationResult, политика empty-list, versioned breaks."},
    modelAnswerDetailed: {"en":"Deep Mechanics (60 sec): PublishedInterface means clients depend on documented behavior. AuthorizationRequest/Result/DeclineReason form the contract with AuthorizationPolicy. Prefer empty collections over null (EJ). Exceptions vs result types are part of the contract — changing them is a break.","ru":"Глубокая Механика (60 сек): PublishedInterface значит клиенты зависят от документированного поведения. AuthorizationRequest/Result/DeclineReason — контракт с AuthorizationPolicy. Предпочитайте empty collections вместо null. Exceptions vs result — часть контракта."},
    modelAnswerTradeOffs: {"en":"Production Trade-offs (30 sec): Compatibility layers cost code; big-bang breaks cost incidents. Feature flags and dual-write of semantics can bridge releases. Communicate declineReasons emptiness in API docs/tests.","ru":"Продакшн Компромиссы (30 сек): Compatibility layers стоят кода; big-bang breaks стоят инцидентов. Feature flags и dual-write семантики мостят релизы. Документируйте emptiness declineReasons в API docs/тестах."},
    followUpQuestionText: {"en":"Interviewer Follow-Up: 'Empty list or Optional for decline reasons?'","ru":"Доп. Вопрос: 'Empty list или Optional для decline reasons?'"},
    followUpModelAnswerText: {"en":"Follow-up: For \"zero or more reasons\", empty list is usually clearest. Optional.of(list) adds noise; Optional empty vs empty list confuses. Use Optional for a single nullable value, not for collections.","ru":"Ответ: Для «ноль или больше причин» обычно яснее empty list. Optional.of(list) шумит; Optional empty vs empty list путает. Optional — для одного nullable значения, не для коллекций."}
  }
};

export const ALL_API_CONTRACT_DESIGN_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_API,
  APPLIED_BUG_HUNT_CHALLENGE_API,
  INTERVIEW_ANSWER_CHALLENGE_API
];
