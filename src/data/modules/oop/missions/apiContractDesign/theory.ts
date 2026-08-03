import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_API_CONTRACT_DESIGN: TheoryArticle = {
  id: "art_theory_api_contract_design",
  topicIds: ["top_oop_34"],
  conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"],
  title: {"en":"API Contracts & Behavioral Compatibility","ru":"API-Контракты и Behavioral Compatibility"},
  summary: {"en":"Evolve PaymentAuthorizationService so AuthorizationResult, DeclineReason, and null-vs-empty collection semantics stay behaviorally compatible — no silent client failures.","ru":"Эволюционируйте PaymentAuthorizationService так, чтобы AuthorizationResult, DeclineReason и семантика null-vs-empty коллекций оставались поведенчески совместимы — без тихих провалов клиентов."},
  sections: [
    {
      id: "sec_api_definition", category: "DEFINITION",
      title: { en: "1. Definition & Core Model", ru: "1. Определение и Базовая Модель" },
      blocks: [
        { id: "blk_api_def_1", type: "PARAGRAPH", content: {"en":"API contract includes signatures and behavioral promises: null vs empty lists, exception vs result objects, AuthorizationPolicy meaning. Evolve with versioning, adapters, or documented compatibility rules. Fowler PublishedInterface: treat the exposed surface as a commitment.","ru":"API-контракт включает сигнатуры и поведенческие обещания: null vs empty, exception vs result, смысл AuthorizationPolicy. Эволюционируйте версионированием, адаптерами или документированными правилами совместимости. Fowler PublishedInterface."} },
        { id: "blk_api_def_2", type: "CALLOUT", title: { en: "💡 Core Mental Model", ru: "💡 Главная Ментальная Модель" }, content: {"en":"Elevator Pitch (30 sec): PaymentAuthorizationService broke clients by switching declines to exceptions and flipping null vs empty declineReasons. API contract is behavioral, not just signatures. Fix: stable AuthorizationResult semantics, empty-list policy, versioned breaks.","ru":"Elevator Pitch (30 сек): PaymentAuthorizationService сломал клиентов сменой declines на exceptions и переворотом null vs empty. API-контракт — поведенческий. Фикс: стабильная семантика AuthorizationResult, политика empty-list, versioned breaks."} }
      ]
    },
    {
      id: "sec_api_mechanics", category: "MECHANICS",
      title: { en: "2. Mechanics", ru: "2. Механика" },
      blocks: [
        { id: "blk_api_mech_1", type: "PARAGRAPH", content: {"en":"Deep Mechanics (60 sec): PublishedInterface means clients depend on documented behavior. AuthorizationRequest/Result/DeclineReason form the contract with AuthorizationPolicy. Prefer empty collections over null (EJ). Exceptions vs result types are part of the contract — changing them is a break.","ru":"Глубокая Механика (60 сек): PublishedInterface значит клиенты зависят от документированного поведения. AuthorizationRequest/Result/DeclineReason — контракт с AuthorizationPolicy. Предпочитайте empty collections вместо null. Exceptions vs result — часть контракта."} },
        { id: "blk_api_mech_2", type: "WARNING", title: { en: "⚙️ Production Failure Mode", ru: "⚙️ Продакшн Режим Отказа" }, content: {"en":"PaymentAuthorizationService changed declineReasons from null (none) to empty list, and started throwing PaymentAuthorizationException where clients expected AuthorizationResult.declined(...). Clients NPEd or missed declines. Published interface evolved without behavioral compatibility.","ru":"PaymentAuthorizationService сменил declineReasons с null (нет причин) на empty list и начал бросать PaymentAuthorizationException там, где клиенты ждали AuthorizationResult.declined(...). Клиенты ловили NPE или пропускали declines. Published interface эволюционировал без behavioral compatibility."} }
      ]
    },
    {
      id: "sec_api_tradeoffs", category: "TRADE_OFFS",
      title: { en: "3. Trade-offs", ru: "3. Компромиссы" },
      blocks: [
        { id: "blk_api_trade_1", type: "PARAGRAPH", content: {"en":"Production Trade-offs (30 sec): Compatibility layers cost code; big-bang breaks cost incidents. Feature flags and dual-write of semantics can bridge releases. Communicate declineReasons emptiness in API docs/tests.","ru":"Продакшн Компромиссы (30 сек): Compatibility layers стоят кода; big-bang breaks стоят инцидентов. Feature flags и dual-write семантики мостят релизы. Документируйте emptiness declineReasons в API docs/тестах."} }
      ]
    },
    {
      id: "sec_api_interview_followups", category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-Up Questions", ru: "4. Дополнительные Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_api_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is an API contract beyond signatures?' — Model Answer: Documented pre/postconditions, error model, null/empty semantics, threading, idempotence.",
            ru: "Доп. Вопрос 1: 'What is an API contract beyond signatures?' — Модельный Ответ: Documented pre/postconditions, error model, null/empty semantics, threading, idempotence."
          }
        },
        {
          id: "blk_api_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Why is null vs empty a compatibility issue?' — Model Answer: Clients branch differently; flipping causes NPE or missed declines.",
            ru: "Доп. Вопрос 2: 'Why is null vs empty a compatibility issue?' — Модельный Ответ: Clients branch differently; flipping causes NPE or missed declines."
          }
        },
        {
          id: "blk_api_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'PublishedInterface meaning?' — Model Answer: A surface you promised to clients — change carefully.",
            ru: "Доп. Вопрос 3: 'PublishedInterface meaning?' — Модельный Ответ: A surface you promised to clients — change carefully."
          }
        },
        {
          id: "blk_api_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'When is throwing PaymentAuthorizationException OK?' — Model Answer: When documented as the failure model for that version — not as a silent swap from results.",
            ru: "Доп. Вопрос 4: 'When is throwing PaymentAuthorizationException OK?' — Модельный Ответ: When documented as the failure model for that version — not as a silent swap from results."
          }
        },
        {
          id: "blk_api_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'How to evolve AuthorizationPolicy safely?' — Model Answer: Additions, adapters, dual semantics briefly, then remove with a version bump.",
            ru: "Доп. Вопрос 5: 'How to evolve AuthorizationPolicy safely?' — Модельный Ответ: Additions, adapters, dual semantics briefly, then remove with a version bump."
          }
        },
        {
          id: "blk_api_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Consumer-driven contract tests?' — Model Answer: Yes — client tests assert declineReasons emptiness and decline paths.",
            ru: "Доп. Вопрос 6: 'Consumer-driven contract tests?' — Модельный Ответ: Yes — client tests assert declineReasons emptiness and decline paths."
          }
        },
        {
          id: "blk_api_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Result object vs exception for declines?' — Model Answer: Pick one per operation and keep it; declines as results are common for expected business outcomes.",
            ru: "Доп. Вопрос 7: 'Result object vs exception for declines?' — Модельный Ответ: Pick one per operation and keep it; declines as results are common for expected business outcomes."
          }
        },
        {
          id: "blk_api_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Should approve return null reasons?' — Model Answer: Prefer empty list, never null, for collection-valued reasons.",
            ru: "Доп. Вопрос 8: 'Should approve return null reasons?' — Модельный Ответ: Prefer empty list, never null, for collection-valued reasons."
          }
        },
        {
          id: "blk_api_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Versioning strategies?' — Model Answer: URL/header version, separate types, or compatibility DTOs.",
            ru: "Доп. Вопрос 9: 'Versioning strategies?' — Модельный Ответ: URL/header version, separate types, or compatibility DTOs."
          }
        },
        {
          id: "blk_api_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'When reject a PR?' — Model Answer: Unannounced exception swap or null↔empty flip on declineReasons.",
            ru: "Доп. Вопрос 10: 'When reject a PR?' — Модельный Ответ: Unannounced exception swap or null↔empty flip on declineReasons."
          }
        },
        {
          id: "blk_api_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Effective Java empty collection guidance?' — Model Answer: Prefer empty arrays/collections over null returns.",
            ru: "Доп. Вопрос 11: 'Effective Java empty collection guidance?' — Модельный Ответ: Prefer empty arrays/collections over null returns."
          }
        },
        {
          id: "blk_api_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Silent failure example?' — Model Answer: Client checks reasons.isEmpty() after you started returning null — or vice versa.",
            ru: "Доп. Вопрос 12: 'Silent failure example?' — Модельный Ответ: Client checks reasons.isEmpty() after you started returning null — or vice versa."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_api_ej_contracts","src_api_fowler_published","src_api_baeldung_optional","src_api_oracle_list"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#api", "#oop"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_API_CONTRACT_DESIGN: readonly TheoryCheckpoint[] = [
  {
    id: "chk_api_1",
    theoryArticleId: "art_theory_api_contract_design",
    question: { en: "Checkpoint 1: key idea for The Breaking Payment API?", ru: "Проверка 1: ключевая идея для Ломающий Payment API?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_api1_a", text: { en: "Document and keep AuthorizationResult for declines unless a versioned break is intentional; avoid silent switch to PaymentAuthorizationException.", ru: "Документировать и сохранять AuthorizationResult для declines, пока нет намеренного versioned break; избегать тихой замены на PaymentAuthorizationException." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_api1_b", text: { en: "Change return semantics freely each sprint if unit tests inside the service still pass.", ru: "Свободно менять семантику возврата каждый спринт, если unit-тесты внутри сервиса ещё зелёные." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_api1_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_api_2",
    theoryArticleId: "art_theory_api_contract_design",
    question: { en: "Checkpoint 2: key idea for The Breaking Payment API?", ru: "Проверка 2: ключевая идея для Ломающий Payment API?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_api2_a", text: { en: "Document and keep AuthorizationResult for declines unless a versioned break is intentional; avoid silent switch to PaymentAuthorizationException.", ru: "Документировать и сохранять AuthorizationResult для declines, пока нет намеренного versioned break; избегать тихой замены на PaymentAuthorizationException." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_api2_b", text: { en: "Change return semantics freely each sprint if unit tests inside the service still pass.", ru: "Свободно менять семантику возврата каждый спринт, если unit-тесты внутри сервиса ещё зелёные." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_api2_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 2
  },
  {
    id: "chk_api_3",
    theoryArticleId: "art_theory_api_contract_design",
    question: { en: "Checkpoint 3: key idea for The Breaking Payment API?", ru: "Проверка 3: ключевая идея для Ломающий Payment API?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_api3_a", text: { en: "Document and keep AuthorizationResult for declines unless a versioned break is intentional; avoid silent switch to PaymentAuthorizationException.", ru: "Документировать и сохранять AuthorizationResult для declines, пока нет намеренного versioned break; избегать тихой замены на PaymentAuthorizationException." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_api3_b", text: { en: "Change return semantics freely each sprint if unit tests inside the service still pass.", ru: "Свободно менять семантику возврата каждый спринт, если unit-тесты внутри сервиса ещё зелёные." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_api3_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_api_4",
    theoryArticleId: "art_theory_api_contract_design",
    question: { en: "Checkpoint 4: key idea for The Breaking Payment API?", ru: "Проверка 4: ключевая идея для Ломающий Payment API?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_api4_a", text: { en: "Document and keep AuthorizationResult for declines unless a versioned break is intentional; avoid silent switch to PaymentAuthorizationException.", ru: "Документировать и сохранять AuthorizationResult для declines, пока нет намеренного versioned break; избегать тихой замены на PaymentAuthorizationException." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_api4_b", text: { en: "Change return semantics freely each sprint if unit tests inside the service still pass.", ru: "Свободно менять семантику возврата каждый спринт, если unit-тесты внутри сервиса ещё зелёные." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_api4_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
