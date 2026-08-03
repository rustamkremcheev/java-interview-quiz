import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_OOP_REFACTORING_LEGACY: TheoryArticle = {
  id: "art_theory_oop_refactoring_legacy",
  topicIds: ["top_oop_35"],
  conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"],
  title: {"en":"Seams & Characterization Tests for Legacy Credit Decisions","ru":"Seams и Characterization-Тесты для Legacy Credit Decisions"},
  summary: {"en":"Introduce characterization tests and seams (ApplicantLookupPort, DecisionAuditPort) so LegacyCreditDecisionEngine can be incrementally refactored around CreditFacilityApplication and CreditPolicy without a big-bang rewrite.","ru":"Введите characterization-тесты и seams (ApplicantLookupPort, DecisionAuditPort), чтобы инкрементально рефакторить LegacyCreditDecisionEngine вокруг CreditFacilityApplication и CreditPolicy без big-bang rewrite."},
  sections: [
    {
      id: "sec_leg_definition", category: "DEFINITION",
      title: { en: "1. Definition & Core Model", ru: "1. Определение и Базовая Модель" },
      blocks: [
        { id: "blk_leg_def_1", type: "PARAGRAPH", content: {"en":"Extract ApplicantLookupPort and DecisionAuditPort; wrap LegacyCreditDecisionEngine behind tests that lock current behavior (characterization); refactor CreditPolicy decision path toward CreditFacilityDecision incrementally. Do not big-bang rewrite.","ru":"Извлеките ApplicantLookupPort и DecisionAuditPort; оберните LegacyCreditDecisionEngine тестами, фиксирующими текущее поведение (characterization); инкрементально рефакторьте путь CreditPolicy к CreditFacilityDecision. Без big-bang rewrite."} },
        { id: "blk_leg_def_2", type: "CALLOUT", title: { en: "💡 Core Mental Model", ru: "💡 Главная Ментальная Модель" }, content: {"en":"Elevator Pitch (30 sec): LegacyCreditDecisionEngine was untestable due to JDBC/static audit. We add characterization tests, extract ApplicantLookupPort/DecisionAuditPort seams, and incrementally refactor CreditPolicy for CreditFacilityApplication — no big-bang. Feathers WELC, not anti-pattern bingo.","ru":"Elevator Pitch (30 сек): LegacyCreditDecisionEngine был нетестируем из-за JDBC/static audit. Добавляем characterization-тесты, извлекаем seams ApplicantLookupPort/DecisionAuditPort и инкрементально рефакторим CreditPolicy для CreditFacilityApplication — без big-bang."} }
      ]
    },
    {
      id: "sec_leg_mechanics", category: "MECHANICS",
      title: { en: "2. Mechanics", ru: "2. Механика" },
      blocks: [
        { id: "blk_leg_mech_1", type: "PARAGRAPH", content: {"en":"Deep Mechanics (60 sec): A seam is a place to alter behavior without editing in that place — ports/fakes. Characterization tests document actual behavior, even oddities. Then refactor with confidence. CreditFacilityDecision becomes the pure outcome; infrastructure sits behind ports.","ru":"Глубокая Механика (60 сек): Seam — место изменить поведение без правки в том месте — ports/fakes. Characterization-тесты документируют фактическое поведение. Затем рефакторинг с уверенностью. CreditFacilityDecision — чистый исход; инфраструктура за портами."} },
        { id: "blk_leg_mech_2", type: "WARNING", title: { en: "⚙️ Production Failure Mode", ru: "⚙️ Продакшн Режим Отказа" }, content: {"en":"LegacyCreditDecisionEngine decides CreditFacilityApplication outcomes with hardcoded JDBC and static audit calls — untestable in CI. Product needs CreditPolicy changes weekly. Feathers-style seams and characterization tests enable incremental refactoring. Distinct from anti-patterns catalog mission: focus is WELC seams under production constraints. Domain uses CreditFacilityApplication — not SharedLendingDto.","ru":"LegacyCreditDecisionEngine решает исходы CreditFacilityApplication с hardcoded JDBC и static audit — нетестируемо в CI. Продукту нужны еженедельные изменения CreditPolicy. Seams и characterization-тесты по Feathers включают инкрементальный рефакторинг. Отличие от антипаттернов: фокус на seams WELC. Домен: CreditFacilityApplication — не SharedLendingDto."} }
      ]
    },
    {
      id: "sec_leg_tradeoffs", category: "TRADE_OFFS",
      title: { en: "3. Trade-offs", ru: "3. Компромиссы" },
      blocks: [
        { id: "blk_leg_trade_1", type: "PARAGRAPH", content: {"en":"Production Trade-offs (30 sec): Characterization locks bugs too — decide which to preserve vs fix. Seam extraction has mechanical risk; keep steps tiny. Strangler approaches help if a parallel path is needed.","ru":"Продакшн Компромиссы (30 сек): Characterization фиксирует и баги — решите, что сохранять. Извлечение seam рискованно механически; шаги мелкие. Strangler помогает при параллельном пути."} }
      ]
    },
    {
      id: "sec_leg_interview_followups", category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-Up Questions", ru: "4. Дополнительные Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_leg_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is a characterization test?' — Model Answer: A test that locks current behavior so refactoring can proceed safely.",
            ru: "Доп. Вопрос 1: 'What is a characterization test?' — Модельный Ответ: A test that locks current behavior so refactoring can proceed safely."
          }
        },
        {
          id: "blk_leg_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What is a seam (Feathers)?' — Model Answer: A place where you can alter behavior without editing that place — e.g., inject a port.",
            ru: "Доп. Вопрос 2: 'What is a seam (Feathers)?' — Модельный Ответ: A place where you can alter behavior without editing that place — e.g., inject a port."
          }
        },
        {
          id: "blk_leg_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why not big-bang rewrite?' — Model Answer: High risk, long dark period, no safety net — production constraints forbid it.",
            ru: "Доп. Вопрос 3: 'Why not big-bang rewrite?' — Модельный Ответ: High risk, long dark period, no safety net — production constraints forbid it."
          }
        },
        {
          id: "blk_leg_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'ApplicantLookupPort role?' — Model Answer: Seam for loading applicant data without hardcoded JDBC in the engine.",
            ru: "Доп. Вопрос 4: 'ApplicantLookupPort role?' — Модельный Ответ: Seam for loading applicant data without hardcoded JDBC in the engine."
          }
        },
        {
          id: "blk_leg_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'DecisionAuditPort role?' — Model Answer: Seam for audit side effects so tests can fake/verify writes.",
            ru: "Доп. Вопрос 5: 'DecisionAuditPort role?' — Модельный Ответ: Seam for audit side effects so tests can fake/verify writes."
          }
        },
        {
          id: "blk_leg_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How tiny should steps be?' — Model Answer: Small enough to keep characterization green each step.",
            ru: "Доп. Вопрос 6: 'How tiny should steps be?' — Модельный Ответ: Small enough to keep characterization green each step."
          }
        },
        {
          id: "blk_leg_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Preserve buggy behavior?' — Model Answer: Sometimes temporarily — then fix with an intentional, tested behavior change.",
            ru: "Доп. Вопрос 7: 'Preserve buggy behavior?' — Модельный Ответ: Sometimes temporarily — then fix with an intentional, tested behavior change."
          }
        },
        {
          id: "blk_leg_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'CreditFacilityApplication vs SharedLendingDto?' — Model Answer: This mission standardizes on CreditFacilityApplication naming to avoid collisions.",
            ru: "Доп. Вопрос 8: 'CreditFacilityApplication vs SharedLendingDto?' — Модельный Ответ: This mission standardizes on CreditFacilityApplication naming to avoid collisions."
          }
        },
        {
          id: "blk_leg_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Strangler Fig relevance?' — Model Answer: Grow a new path beside legacy and switch traffic gradually if needed.",
            ru: "Доп. Вопрос 9: 'Strangler Fig relevance?' — Модельный Ответ: Grow a new path beside legacy and switch traffic gradually if needed."
          }
        },
        {
          id: "blk_leg_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'When reject a PR?' — Model Answer: Rewrites without tests or hardwired JDBC left in place when a port was required.",
            ru: "Доп. Вопрос 10: 'When reject a PR?' — Модельный Ответ: Rewrites without tests or hardwired JDBC left in place when a port was required."
          }
        },
        {
          id: "blk_leg_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'DI vs static calls?' — Model Answer: Replace static DAO/audit with injected ports for testability.",
            ru: "Доп. Вопрос 11: 'DI vs static calls?' — Модельный Ответ: Replace static DAO/audit with injected ports for testability."
          }
        },
        {
          id: "blk_leg_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'First test you write?' — Model Answer: A characterization test on a known CreditFacilityApplication → CreditFacilityDecision pair.",
            ru: "Доп. Вопрос 12: 'First test you write?' — Модельный Ответ: A characterization test on a known CreditFacilityApplication → CreditFacilityDecision pair."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_leg_feathers_welc","src_leg_fowler_refactoring","src_leg_fowler_strangler","src_leg_baeldung_legacy"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#leg", "#oop"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OOP_REFACTORING_LEGACY: readonly TheoryCheckpoint[] = [
  {
    id: "chk_leg_1",
    theoryArticleId: "art_theory_oop_refactoring_legacy",
    question: { en: "Checkpoint 1: key idea for The Untestable Loan Decision Engine?", ru: "Проверка 1: ключевая идея для Нетестируемый Loan Decision Engine?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_leg1_a", text: { en: "Add characterization tests that lock current LegacyCreditDecisionEngine decisions on CreditFacilityApplication fixtures before changing CreditPolicy.", ru: "Добавить characterization-тесты, фиксирующие текущие решения LegacyCreditDecisionEngine на фикстурах CreditFacilityApplication до изменения CreditPolicy." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_leg1_b", text: { en: "Big-bang rewrite the engine to a new microservices stack before any tests exist.", ru: "Сделать big-bang rewrite движка в microservices до любых тестов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_leg1_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_leg_2",
    theoryArticleId: "art_theory_oop_refactoring_legacy",
    question: { en: "Checkpoint 2: key idea for The Untestable Loan Decision Engine?", ru: "Проверка 2: ключевая идея для Нетестируемый Loan Decision Engine?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_leg2_a", text: { en: "Add characterization tests that lock current LegacyCreditDecisionEngine decisions on CreditFacilityApplication fixtures before changing CreditPolicy.", ru: "Добавить characterization-тесты, фиксирующие текущие решения LegacyCreditDecisionEngine на фикстурах CreditFacilityApplication до изменения CreditPolicy." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_leg2_b", text: { en: "Big-bang rewrite the engine to a new microservices stack before any tests exist.", ru: "Сделать big-bang rewrite движка в microservices до любых тестов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_leg2_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 2
  },
  {
    id: "chk_leg_3",
    theoryArticleId: "art_theory_oop_refactoring_legacy",
    question: { en: "Checkpoint 3: key idea for The Untestable Loan Decision Engine?", ru: "Проверка 3: ключевая идея для Нетестируемый Loan Decision Engine?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_leg3_a", text: { en: "Add characterization tests that lock current LegacyCreditDecisionEngine decisions on CreditFacilityApplication fixtures before changing CreditPolicy.", ru: "Добавить characterization-тесты, фиксирующие текущие решения LegacyCreditDecisionEngine на фикстурах CreditFacilityApplication до изменения CreditPolicy." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_leg3_b", text: { en: "Big-bang rewrite the engine to a new microservices stack before any tests exist.", ru: "Сделать big-bang rewrite движка в microservices до любых тестов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_leg3_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_leg_4",
    theoryArticleId: "art_theory_oop_refactoring_legacy",
    question: { en: "Checkpoint 4: key idea for The Untestable Loan Decision Engine?", ru: "Проверка 4: ключевая идея для Нетестируемый Loan Decision Engine?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_leg4_a", text: { en: "Add characterization tests that lock current LegacyCreditDecisionEngine decisions on CreditFacilityApplication fixtures before changing CreditPolicy.", ru: "Добавить characterization-тесты, фиксирующие текущие решения LegacyCreditDecisionEngine на фикстурах CreditFacilityApplication до изменения CreditPolicy." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_leg4_b", text: { en: "Big-bang rewrite the engine to a new microservices stack before any tests exist.", ru: "Сделать big-bang rewrite движка в microservices до любых тестов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_leg4_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
