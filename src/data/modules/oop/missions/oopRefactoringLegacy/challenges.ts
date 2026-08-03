import {
  FixBuilderChallenge, BugHuntChallenge, InterviewAnswerChallenge, Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_LEG: FixBuilderChallenge = {
  id: "chl_leg_fix_builder", type: "FIX_BUILDER", missionId: "mis_oop_refactoring_legacy", stageId: "stg_leg_practice",
  title: { en: "Fix Builder: The Untestable Loan Decision Engine", ru: "Конструктор Исправления: Нетестируемый Loan Decision Engine" },
  prompt: { en: "Introduce characterization tests and seams (ApplicantLookupPort, DecisionAuditPort) so LegacyCreditDecisionEngine can be incrementally refactored around CreditFacilityApplication and CreditPolicy without a big-bang rewrite.", ru: "Введите characterization-тесты и seams (ApplicantLookupPort, DecisionAuditPort), чтобы инкрементально рефакторить LegacyCreditDecisionEngine вокруг CreditFacilityApplication и CreditPolicy без big-bang rewrite." },
  difficulty: "STAFF", assistanceLevel: "GUIDED",
  conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], topicIds: ["top_oop_35"],
  tags: ["#leg", "#fix-builder"],
  hintIds: ["hnt_leg_1", "hnt_leg_2", "hnt_leg_3", "hnt_leg_4"],
  xpReward: 100, order: 7,
  payload: {
    baseCodeArtifactId: "art_leg_broken",
    solutionCodeArtifactId: "art_leg_solution",
    options: [
      {
        id: "opt_leg_fix_1",
        text: {"en":"Add characterization tests that lock current LegacyCreditDecisionEngine decisions on CreditFacilityApplication fixtures before changing CreditPolicy.","ru":"Добавить characterization-тесты, фиксирующие текущие решения LegacyCreditDecisionEngine на фикстурах CreditFacilityApplication до изменения CreditPolicy."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_leg_fix_2",
        text: {"en":"Extract ApplicantLookupPort and DecisionAuditPort seams; inject fakes in tests.","ru":"Извлечь seams ApplicantLookupPort и DecisionAuditPort; инжектить fake в тестах."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_leg_fix_3",
        text: {"en":"Big-bang rewrite the engine to a new microservices stack before any tests exist.","ru":"Сделать big-bang rewrite движка в microservices до любых тестов."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      },
      {
        id: "opt_leg_fix_4",
        text: {"en":"Refactor incrementally toward CreditFacilityDecision purity while keeping production behavior green under characterization coverage.","ru":"Инкрементально рефакторить к чистоте CreditFacilityDecision, держа прод-поведение зелёным под characterization-покрытием."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_leg_fix_5",
        text: {"en":"Rename everything to SharedLendingDto and delete audit to simplify testing.","ru":"Переименовать всё в SharedLendingDto и удалить audit ради упрощения тестов."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_LEG: BugHuntChallenge = {
  id: "chl_leg_bughunt", type: "BUG_HUNT", missionId: "mis_oop_refactoring_legacy", stageId: "stg_leg_debug",
  title: { en: "Bug Hunt: The Untestable Loan Decision Engine", ru: "Поиск Бага: Нетестируемый Loan Decision Engine" },
  prompt: { en: "Click the defective line(s). Non-defect lines are distractors.", ru: "Нажмите дефектную строку(и). Остальные — дистракторы." },
  difficulty: "STAFF", assistanceLevel: "APPLIED",
  conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], topicIds: ["top_oop_35"],
  tags: ["#leg", "#bug-hunt"],
  hintIds: ["hnt_leg_bug_1", "hnt_leg_bug_2", "hnt_leg_bug_3"],
  xpReward: 100, order: 10,
  payload: {
    baseCodeArtifactId: "art_leg_bughunt",
    solutionCodeArtifactId: "art_leg_solution",
    codeSnippet: `public CreditFacilityDecision decide(CreditFacilityApplication app) {\n    ApplicantRow row = JdbcApplicantDao.find(app.applicantId()); // Line 2 — BUG: hardwired I/O\n    boolean ok = CreditPolicyStatic.eval(row, app);\n    AuditStatic.write(app.id(), ok); // Line 4 — BUG: static audit seam missing\n    return ok ? CreditFacilityDecision.approve(app.id()) : CreditFacilityDecision.deny(app.id());\n}`,
    lines: [
      { lineNumber: 1, code: "public CreditFacilityDecision decide(CreditFacilityApplication app) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 2, code: "    ApplicantRow row = JdbcApplicantDao.find(app.applicantId()); // Line 2 — BUG: hardwired I/O", isBug: true, explanation: {"en":"Line 2: Hardwired JDBC lookup — no seam for tests or alternate sources.","ru":"Строка 2: Жёсткий JDBC lookup — нет seam для тестов."} },
      { lineNumber: 3, code: "    boolean ok = CreditPolicyStatic.eval(row, app);", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 4, code: "    AuditStatic.write(app.id(), ok); // Line 4 — BUG: static audit seam missing", isBug: true, explanation: {"en":"Line 4: Static audit call prevents faking DecisionAuditPort in characterization tests.","ru":"Строка 4: Static audit мешает подменить DecisionAuditPort в characterization-тестах."} },
      { lineNumber: 5, code: "    return ok ? CreditFacilityDecision.approve(app.id()) : CreditFacilityDecision.deny(app.id());", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 6, code: "}", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_LEG: InterviewAnswerChallenge = {
  id: "chl_leg_interview_answer", type: "INTERVIEW_ANSWER", missionId: "mis_oop_refactoring_legacy", stageId: "stg_leg_interview_a",
  title: { en: "Senior Interview Verbal Explanation", ru: "Устный Ответ на Senior-Интервью" },
  prompt: { en: "Introduce characterization tests and seams (ApplicantLookupPort, DecisionAuditPort) so LegacyCreditDecisionEngine can be incrementally refactored around CreditFacilityApplication and CreditPolicy without a big-bang rewrite.", ru: "Введите characterization-тесты и seams (ApplicantLookupPort, DecisionAuditPort), чтобы инкрементально рефакторить LegacyCreditDecisionEngine вокруг CreditFacilityApplication и CreditPolicy без big-bang rewrite." },
  difficulty: "STAFF", assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], topicIds: ["top_oop_35"],
  tags: ["#leg", "#interview"], hintIds: [], xpReward: 150, order: 9,
  payload: {
    targetQuestionId: "q_leg_seam_01",
    rubricDimensions: ["ELEVATOR_PITCH", "MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [{"id":"cpt_characterization_test","label":{"en":"characterization test","ru":"characterization test"},"keywords":["characterization","test"]},{"id":"cpt_seam_extraction","label":{"en":"seam extraction","ru":"seam extraction"},"keywords":["seam","extraction"]},{"id":"cpt_incremental_refactoring","label":{"en":"incremental refactoring","ru":"incremental refactoring"},"keywords":["incremental","refactoring"]}],
    modelAnswer30s: {"en":"Elevator Pitch (30 sec): LegacyCreditDecisionEngine was untestable due to JDBC/static audit. We add characterization tests, extract ApplicantLookupPort/DecisionAuditPort seams, and incrementally refactor CreditPolicy for CreditFacilityApplication — no big-bang. Feathers WELC, not anti-pattern bingo.","ru":"Elevator Pitch (30 сек): LegacyCreditDecisionEngine был нетестируем из-за JDBC/static audit. Добавляем characterization-тесты, извлекаем seams ApplicantLookupPort/DecisionAuditPort и инкрементально рефакторим CreditPolicy для CreditFacilityApplication — без big-bang."},
    modelAnswerDetailed: {"en":"Deep Mechanics (60 sec): A seam is a place to alter behavior without editing in that place — ports/fakes. Characterization tests document actual behavior, even oddities. Then refactor with confidence. CreditFacilityDecision becomes the pure outcome; infrastructure sits behind ports.","ru":"Глубокая Механика (60 сек): Seam — место изменить поведение без правки в том месте — ports/fakes. Characterization-тесты документируют фактическое поведение. Затем рефакторинг с уверенностью. CreditFacilityDecision — чистый исход; инфраструктура за портами."},
    modelAnswerTradeOffs: {"en":"Production Trade-offs (30 sec): Characterization locks bugs too — decide which to preserve vs fix. Seam extraction has mechanical risk; keep steps tiny. Strangler approaches help if a parallel path is needed.","ru":"Продакшн Компромиссы (30 сек): Characterization фиксирует и баги — решите, что сохранять. Извлечение seam рискованно механически; шаги мелкие. Strangler помогает при параллельном пути."},
    followUpQuestionText: {"en":"Interviewer Follow-Up: 'How is this different from the anti-patterns mission?'","ru":"Доп. Вопрос: 'Чем это отличается от миссии антипаттернов?'"},
    followUpModelAnswerText: {"en":"Follow-up: Anti-patterns mission catalogs God Class/anemic smells. This mission is operational legacy surgery: characterization tests + seams + incremental refactor under production constraints for credit decisions.","ru":"Ответ: Миссия антипаттернов каталогизирует God Class/anemic smells. Эта — операционная legacy-хирургия: characterization + seams + инкрементальный рефакторинг под прод-ограничениями для credit decisions."}
  }
};

export const ALL_OOP_REFACTORING_LEGACY_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_LEG,
  APPLIED_BUG_HUNT_CHALLENGE_LEG,
  INTERVIEW_ANSWER_CHALLENGE_LEG
];
