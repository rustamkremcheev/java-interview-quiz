import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_DECORATOR_PATTERN: TheoryArticle = {
  id: "art_theory_decorator_pattern",
  topicIds: ["top_oop_31"],
  conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"],
  title: {"en":"Composable Decorators for FundsTransferGateway","ru":"Композируемые Декораторы для FundsTransferGateway"},
  summary: {"en":"Compose AuditedFundsTransferGateway, RetryingFundsTransferGateway, and AuthorizedFundsTransferGateway around CoreFundsTransferGateway so audit is never dropped when retry/auth wrappers are applied.","ru":"Скомпонуйте AuditedFundsTransferGateway, RetryingFundsTransferGateway и AuthorizedFundsTransferGateway вокруг CoreFundsTransferGateway так, чтобы audit не терялся при обёртках retry/auth."},
  sections: [
    {
      id: "sec_dec_definition", category: "DEFINITION",
      title: { en: "1. Definition & Core Model", ru: "1. Определение и Базовая Модель" },
      blocks: [
        { id: "blk_dec_def_1", type: "PARAGRAPH", content: {"en":"FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway is the core. Decorators: Audited, Retrying, Authorized — each implements FundsTransferGateway and delegates. Order matters: typically Authorize → Audit → Retry → Core (or document chosen order). Decorator ≠ Proxy (proxy controls access/lazy; decorator adds responsibilities).","ru":"FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway — ядро. Декораторы: Audited, Retrying, Authorized — каждый реализует FundsTransferGateway и делегирует. Порядок важен. Decorator ≠ Proxy."} },
        { id: "blk_dec_def_2", type: "CALLOUT", title: { en: "💡 Core Mental Model", ru: "💡 Главная Ментальная Модель" }, content: {"en":"Elevator Pitch (30 sec): Retry/Auth wrappers were composed without AuditedFundsTransferGateway, so transfers lacked audit. Fix: Decorator stack on FundsTransferGateway with explicit order. Decorator adds responsibilities; Proxy controls access. Distinct from general composition-over-inheritance teaching mission.","ru":"Elevator Pitch (30 сек): Обёртки Retry/Auth собрали без AuditedFundsTransferGateway — переводы без audit. Фикс: стек Decorator на FundsTransferGateway с явным порядком. Decorator добавляет обязанности; Proxy контролирует доступ."} }
      ]
    },
    {
      id: "sec_dec_mechanics", category: "MECHANICS",
      title: { en: "2. Mechanics", ru: "2. Механика" },
      blocks: [
        { id: "blk_dec_mech_1", type: "PARAGRAPH", content: {"en":"Deep Mechanics (60 sec): Each decorator implements FundsTransferGateway, holds a delegate, adds behavior before/after transfer. Order changes semantics (audit retries vs audit final result). Keep CoreFundsTransferGateway free of cross-cutting concerns when using decorators.","ru":"Глубокая Механика (60 сек): Каждый декоратор реализует FundsTransferGateway, держит delegate, добавляет поведение до/после transfer. Порядок меняет семантику. Ядро без cross-cutting, когда используете декораторы."} },
        { id: "blk_dec_mech_2", type: "WARNING", title: { en: "⚙️ Production Failure Mode", ru: "⚙️ Продакшн Режим Отказа" }, content: {"en":"Funds transfers gained Retrying and Authorized wrappers. Ops discovered transfers succeeded without audit rows — AuditedFundsTransferGateway was left out of the composition, or placed inside retry so failures/retries were not audited correctly. Distinct from composition-over-inheritance mission: here the GoF Decorator stack on FundsTransferGateway is the focus.","ru":"У funds transfers появились обёртки Retrying и Authorized. Ops обнаружил успешные переводы без audit rows — AuditedFundsTransferGateway выпал из композиции или стоял внутри retry так, что failures/retries аудитились неверно. Отличие от composition-over-inheritance: фокус на стеке GoF Decorator для FundsTransferGateway."} }
      ]
    },
    {
      id: "sec_dec_tradeoffs", category: "TRADE_OFFS",
      title: { en: "3. Trade-offs", ru: "3. Компромиссы" },
      blocks: [
        { id: "blk_dec_trade_1", type: "PARAGRAPH", content: {"en":"Production Trade-offs (30 sec): Deep decorator stacks are flexible but harder to debug; prefer clear composition roots and tests for order. Inheritance explosion is worse for retry×audit×auth combinations.","ru":"Продакшн Компромиссы (30 сек): Глубокие стеки гибкие, но сложнее в отладке; явный composition root и тесты порядка. Взрыв наследования хуже для комбинаций retry×audit×auth."} }
      ]
    },
    {
      id: "sec_dec_interview_followups", category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-Up Questions", ru: "4. Дополнительные Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_dec_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What interface do all funds-transfer decorators share?' — Model Answer: FundsTransferGateway.",
            ru: "Доп. Вопрос 1: 'What interface do all funds-transfer decorators share?' — Модельный Ответ: FundsTransferGateway."
          }
        },
        {
          id: "blk_dec_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Why does order matter?' — Model Answer: It changes whether you audit attempts, successes, auth failures, etc.",
            ru: "Доп. Вопрос 2: 'Why does order matter?' — Модельный Ответ: It changes whether you audit attempts, successes, auth failures, etc."
          }
        },
        {
          id: "blk_dec_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Decorator vs inheritance for retry+audit?' — Model Answer: Decorators combine without class explosion.",
            ru: "Доп. Вопрос 3: 'Decorator vs inheritance for retry+audit?' — Модельный Ответ: Decorators combine without class explosion."
          }
        },
        {
          id: "blk_dec_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Decorator vs Proxy?' — Model Answer: Decorator adds responsibilities; Proxy controls access/lazy/remote representation.",
            ru: "Доп. Вопрос 4: 'Decorator vs Proxy?' — Модельный Ответ: Decorator adds responsibilities; Proxy controls access/lazy/remote representation."
          }
        },
        {
          id: "blk_dec_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Where is composition root?' — Model Answer: Where you new/wire Authorize→Audit→Retry→Core.",
            ru: "Доп. Вопрос 5: 'Where is composition root?' — Модельный Ответ: Where you new/wire Authorize→Audit→Retry→Core."
          }
        },
        {
          id: "blk_dec_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How to test AuditedFundsTransferGateway?' — Model Answer: Wrap a fake core; assert audit port called with TransferResult.",
            ru: "Доп. Вопрос 6: 'How to test AuditedFundsTransferGateway?' — Модельный Ответ: Wrap a fake core; assert audit port called with TransferResult."
          }
        },
        {
          id: "blk_dec_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Can decorators be Spring beans?' — Model Answer: Yes — decorate the gateway bean in configuration.",
            ru: "Доп. Вопрос 7: 'Can decorators be Spring beans?' — Модельный Ответ: Yes — decorate the gateway bean in configuration."
          }
        },
        {
          id: "blk_dec_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'What if audit must see retries?' — Model Answer: Place Audited outside Retry (or audit both with two layers) — document choice.",
            ru: "Доп. Вопрос 8: 'What if audit must see retries?' — Модельный Ответ: Place Audited outside Retry (or audit both with two layers) — document choice."
          }
        },
        {
          id: "blk_dec_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Missing audit smell in review?' — Model Answer: Composition that constructs Retry/Auth/Core without Audited.",
            ru: "Доп. Вопрос 9: 'Missing audit smell in review?' — Модельный Ответ: Composition that constructs Retry/Auth/Core without Audited."
          }
        },
        {
          id: "blk_dec_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'When reject a PR?' — Model Answer: Omitting AuditedFundsTransferGateway from the production wiring.",
            ru: "Доп. Вопрос 10: 'When reject a PR?' — Модельный Ответ: Omitting AuditedFundsTransferGateway from the production wiring."
          }
        },
        {
          id: "blk_dec_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Java I/O analogy?' — Model Answer: BufferedInputStream wrapping FileInputStream — same structural idea.",
            ru: "Доп. Вопрос 11: 'Java I/O analogy?' — Модельный Ответ: BufferedInputStream wrapping FileInputStream — same structural idea."
          }
        },
        {
          id: "blk_dec_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Same as composition-over-inheritance mission?' — Model Answer: No — that mission teaches preferring composition generally; this is GoF Decorator on FundsTransferGateway.",
            ru: "Доп. Вопрос 12: 'Same as composition-over-inheritance mission?' — Модельный Ответ: No — that mission teaches preferring composition generally; this is GoF Decorator on FundsTransferGateway."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_dec_gof","src_dec_hfdp","src_dec_baeldung","src_dec_oracle_io"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#dec", "#oop"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_DECORATOR_PATTERN: readonly TheoryCheckpoint[] = [
  {
    id: "chk_dec_1",
    theoryArticleId: "art_theory_decorator_pattern",
    question: { en: "Checkpoint 1: key idea for The Missing Audit Layer?", ru: "Проверка 1: ключевая идея для Пропущенный Audit-Слой?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_dec1_a", text: { en: "Implement AuditedFundsTransferGateway as a FundsTransferGateway decorator that delegates to a wrapped gateway.", ru: "Реализовать AuditedFundsTransferGateway как декоратор FundsTransferGateway, делегирующий обёрнутому gateway." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_dec1_b", text: { en: "Put audit only inside CoreFundsTransferGateway and delete the audited decorator to simplify.", ru: "Оставить audit только внутри CoreFundsTransferGateway и удалить audited decorator ради упрощения." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_dec1_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_dec_2",
    theoryArticleId: "art_theory_decorator_pattern",
    question: { en: "Checkpoint 2: key idea for The Missing Audit Layer?", ru: "Проверка 2: ключевая идея для Пропущенный Audit-Слой?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_dec2_a", text: { en: "Implement AuditedFundsTransferGateway as a FundsTransferGateway decorator that delegates to a wrapped gateway.", ru: "Реализовать AuditedFundsTransferGateway как декоратор FundsTransferGateway, делегирующий обёрнутому gateway." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_dec2_b", text: { en: "Put audit only inside CoreFundsTransferGateway and delete the audited decorator to simplify.", ru: "Оставить audit только внутри CoreFundsTransferGateway и удалить audited decorator ради упрощения." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_dec2_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 2
  },
  {
    id: "chk_dec_3",
    theoryArticleId: "art_theory_decorator_pattern",
    question: { en: "Checkpoint 3: key idea for The Missing Audit Layer?", ru: "Проверка 3: ключевая идея для Пропущенный Audit-Слой?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_dec3_a", text: { en: "Implement AuditedFundsTransferGateway as a FundsTransferGateway decorator that delegates to a wrapped gateway.", ru: "Реализовать AuditedFundsTransferGateway как декоратор FundsTransferGateway, делегирующий обёрнутому gateway." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_dec3_b", text: { en: "Put audit only inside CoreFundsTransferGateway and delete the audited decorator to simplify.", ru: "Оставить audit только внутри CoreFundsTransferGateway и удалить audited decorator ради упрощения." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_dec3_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_dec_4",
    theoryArticleId: "art_theory_decorator_pattern",
    question: { en: "Checkpoint 4: key idea for The Missing Audit Layer?", ru: "Проверка 4: ключевая идея для Пропущенный Audit-Слой?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_dec4_a", text: { en: "Implement AuditedFundsTransferGateway as a FundsTransferGateway decorator that delegates to a wrapped gateway.", ru: "Реализовать AuditedFundsTransferGateway как декоратор FundsTransferGateway, делегирующий обёрнутому gateway." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_dec4_b", text: { en: "Put audit only inside CoreFundsTransferGateway and delete the audited decorator to simplify.", ru: "Оставить audit только внутри CoreFundsTransferGateway и удалить audited decorator ради упрощения." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_dec4_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
