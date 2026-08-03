import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_OBSERVER_PATTERN: TheoryArticle = {
  id: "art_theory_observer_pattern",
  topicIds: ["top_oop_30"],
  conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"],
  title: {"en":"Observer Lifecycle & Exception Isolation","ru":"Lifecycle Observer и Изоляция Исключений"},
  summary: {"en":"Fix TransactionEventPublisher subscription lifecycle so ComplianceAlertObserver is not registered twice and observer exceptions cannot kill AuditObserver/FraudAnalyticsObserver notifications.","ru":"Исправьте lifecycle подписок TransactionEventPublisher, чтобы ComplianceAlertObserver не регистрировался дважды и исключения observer не убивали уведомления AuditObserver/FraudAnalyticsObserver."},
  sections: [
    {
      id: "sec_obs_definition", category: "DEFINITION",
      title: { en: "1. Definition & Core Model", ru: "1. Определение и Базовая Модель" },
      blocks: [
        { id: "blk_obs_def_1", type: "PARAGRAPH", content: {"en":"TransactionEventPublisher maintains Subscriptions of TransactionObserver. subscribe/unsubscribe must be idempotent or reference-counted; notifyObservers must isolate exceptions per observer. ComplianceAlertObserver, AuditObserver, FraudAnalyticsObserver are in-process listeners — not message-broker consumers.","ru":"TransactionEventPublisher держит Subscriptions TransactionObserver. subscribe/unsubscribe должны быть идемпотентны или reference-counted; notifyObservers должен изолировать исключения per observer. ComplianceAlertObserver, AuditObserver, FraudAnalyticsObserver — in-process listeners, не брокеры."} },
        { id: "blk_obs_def_2", type: "CALLOUT", title: { en: "💡 Core Mental Model", ru: "💡 Главная Ментальная Модель" }, content: {"en":"Elevator Pitch (30 sec): Duplicate compliance alerts came from double subscribe without unsubscribe; missing audit from a throwing observer aborting notify. Fix: Subscription lifecycle + per-observer exception isolation in TransactionEventPublisher. In-process Observer, not Kafka.","ru":"Elevator Pitch (30 сек): Дубли compliance — от double subscribe без unsubscribe; пропуск audit — от падающего observer, обрывающего notify. Фикс: lifecycle Subscription + изоляция исключений в TransactionEventPublisher. In-process Observer, не Kafka."} }
      ]
    },
    {
      id: "sec_obs_mechanics", category: "MECHANICS",
      title: { en: "2. Mechanics", ru: "2. Механика" },
      blocks: [
        { id: "blk_obs_mech_1", type: "PARAGRAPH", content: {"en":"Deep Mechanics (60 sec): Subject holds observers; subscribe/unsubscribe manage identity. Duplicates fire twice. notify must not let one failure stop others — isolate, log, continue. Subscription tokens clarify ownership of registration.","ru":"Глубокая Механика (60 сек): Subject держит observers; subscribe/unsubscribe управляют identity. Дубли стреляют дважды. notify не должен давать одному сбою остановить других — isolate, log, continue. Токены Subscription проясняют владение регистрацией."} },
        { id: "blk_obs_mech_2", type: "WARNING", title: { en: "⚙️ Production Failure Mode", ru: "⚙️ Продакшн Режим Отказа" }, content: {"en":"In-process transaction monitoring (not Kafka) fired duplicate compliance alerts after redeploy: ComplianceAlertObserver subscribed twice because unsubscribe was never called. Separately, a throwing FraudAnalyticsObserver aborted the notify loop, skipping AuditObserver. Classic Observer lifecycle and exception-isolation failures.","ru":"In-process мониторинг транзакций (не Kafka) слал дубли compliance alerts после redeploy: ComplianceAlertObserver подписался дважды — unsubscribe не вызывался. Отдельно падающий FraudAnalyticsObserver обрывал notify-цикл, пропуская AuditObserver. Классические сбои lifecycle Observer и изоляции исключений."} }
      ]
    },
    {
      id: "sec_obs_tradeoffs", category: "TRADE_OFFS",
      title: { en: "3. Trade-offs", ru: "3. Компромиссы" },
      blocks: [
        { id: "blk_obs_trade_1", type: "PARAGRAPH", content: {"en":"Production Trade-offs (30 sec): Sync in-process observers are simple but couple latency; async handoff adds complexity. Exception isolation hides observer bugs unless you metric/alert on failures. Prefer idempotent subscribe.","ru":"Продакшн Компромиссы (30 сек): Sync in-process observers просты, но связывают latency; async усложняет. Изоляция исключений скрывает баги observer без метрик. Предпочитайте идемпотентный subscribe."} }
      ]
    },
    {
      id: "sec_obs_interview_followups", category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-Up Questions", ru: "4. Дополнительные Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_obs_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What causes duplicate Observer notifications?' — Model Answer: Registering the same observer twice without unsubscribe/dedupe.",
            ru: "Доп. Вопрос 1: 'What causes duplicate Observer notifications?' — Модельный Ответ: Registering the same observer twice without unsubscribe/dedupe."
          }
        },
        {
          id: "blk_obs_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How do you unsubscribe cleanly?' — Model Answer: Return a Subscription token and call unsubscribe/close on shutdown.",
            ru: "Доп. Вопрос 2: 'How do you unsubscribe cleanly?' — Модельный Ответ: Return a Subscription token and call unsubscribe/close on shutdown."
          }
        },
        {
          id: "blk_obs_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why isolate exceptions in notify?' — Model Answer: One failing observer must not skip AuditObserver and others.",
            ru: "Доп. Вопрос 3: 'Why isolate exceptions in notify?' — Модельный Ответ: One failing observer must not skip AuditObserver and others."
          }
        },
        {
          id: "blk_obs_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Observer vs Kafka?' — Model Answer: In-process subject/observers vs distributed broker consumers — different problem.",
            ru: "Доп. Вопрос 4: 'Observer vs Kafka?' — Модельный Ответ: In-process subject/observers vs distributed broker consumers — different problem."
          }
        },
        {
          id: "blk_obs_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Should subscribe be idempotent?' — Model Answer: Yes, or use a Set identity / reference counting.",
            ru: "Доп. Вопрос 5: 'Should subscribe be idempotent?' — Модельный Ответ: Yes, or use a Set identity / reference counting."
          }
        },
        {
          id: "blk_obs_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'WeakReference observers?' — Model Answer: Sometimes for UI listeners; banking auditors usually want explicit lifecycle.",
            ru: "Доп. Вопрос 6: 'WeakReference observers?' — Модельный Ответ: Sometimes for UI listeners; banking auditors usually want explicit lifecycle."
          }
        },
        {
          id: "blk_obs_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Order of notification guarantees?' — Model Answer: Document if order matters; do not rely on HashSet iteration order.",
            ru: "Доп. Вопрос 7: 'Order of notification guarantees?' — Модельный Ответ: Document if order matters; do not rely on HashSet iteration order."
          }
        },
        {
          id: "blk_obs_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How to test ComplianceAlertObserver?' — Model Answer: Unit-test the observer; integration-test publisher with fakes and duplicate-subscribe cases.",
            ru: "Доп. Вопрос 8: 'How to test ComplianceAlertObserver?' — Модельный Ответ: Unit-test the observer; integration-test publisher with fakes and duplicate-subscribe cases."
          }
        },
        {
          id: "blk_obs_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'What if observers mutate the event?' — Model Answer: Prefer immutable events so observers cannot corrupt shared state.",
            ru: "Доп. Вопрос 9: 'What if observers mutate the event?' — Модельный Ответ: Prefer immutable events so observers cannot corrupt shared state."
          }
        },
        {
          id: "blk_obs_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'When reject a PR?' — Model Answer: Unconditional observers.add without dedupe, or bare notify without try/catch.",
            ru: "Доп. Вопрос 10: 'When reject a PR?' — Модельный Ответ: Unconditional observers.add without dedupe, or bare notify without try/catch."
          }
        },
        {
          id: "blk_obs_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Push vs pull Observer?' — Model Answer: Push passes event data; pull lets observers query subject — pick intentionally.",
            ru: "Доп. Вопрос 11: 'Push vs pull Observer?' — Модельный Ответ: Push passes event data; pull lets observers query subject — pick intentionally."
          }
        },
        {
          id: "blk_obs_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Memory leaks from forgotten unsubscribe?' — Model Answer: Forgotten unsubscribe keeps observers alive — classic leak and duplicate risk.",
            ru: "Доп. Вопрос 12: 'Memory leaks from forgotten unsubscribe?' — Модельный Ответ: Forgotten unsubscribe keeps observers alive — classic leak and duplicate risk."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_obs_gof_observer","src_obs_hfdp","src_obs_baeldung","src_obs_oracle_beans"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#obs", "#oop"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OBSERVER_PATTERN: readonly TheoryCheckpoint[] = [
  {
    id: "chk_obs_1",
    theoryArticleId: "art_theory_observer_pattern",
    question: { en: "Checkpoint 1: key idea for The Duplicate Compliance Alert?", ru: "Проверка 1: ключевая идея для Дублирующий Compliance Alert?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_obs1_a", text: { en: "Track Subscriptions and make subscribe idempotent (or return a Subscription token used to unsubscribe).", ru: "Вести Subscriptions и сделать subscribe идемпотентным (или возвращать токен Subscription для unsubscribe)." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_obs1_b", text: { en: "Push all alerts through Kafka topics instead of fixing in-process Observer lifecycle.", ru: "Прогнать все alerts через Kafka вместо фикса in-process lifecycle Observer." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_obs1_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_obs_2",
    theoryArticleId: "art_theory_observer_pattern",
    question: { en: "Checkpoint 2: key idea for The Duplicate Compliance Alert?", ru: "Проверка 2: ключевая идея для Дублирующий Compliance Alert?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_obs2_a", text: { en: "Track Subscriptions and make subscribe idempotent (or return a Subscription token used to unsubscribe).", ru: "Вести Subscriptions и сделать subscribe идемпотентным (или возвращать токен Subscription для unsubscribe)." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_obs2_b", text: { en: "Push all alerts through Kafka topics instead of fixing in-process Observer lifecycle.", ru: "Прогнать все alerts через Kafka вместо фикса in-process lifecycle Observer." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_obs2_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 2
  },
  {
    id: "chk_obs_3",
    theoryArticleId: "art_theory_observer_pattern",
    question: { en: "Checkpoint 3: key idea for The Duplicate Compliance Alert?", ru: "Проверка 3: ключевая идея для Дублирующий Compliance Alert?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_obs3_a", text: { en: "Track Subscriptions and make subscribe idempotent (or return a Subscription token used to unsubscribe).", ru: "Вести Subscriptions и сделать subscribe идемпотентным (или возвращать токен Subscription для unsubscribe)." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_obs3_b", text: { en: "Push all alerts through Kafka topics instead of fixing in-process Observer lifecycle.", ru: "Прогнать все alerts через Kafka вместо фикса in-process lifecycle Observer." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_obs3_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_obs_4",
    theoryArticleId: "art_theory_observer_pattern",
    question: { en: "Checkpoint 4: key idea for The Duplicate Compliance Alert?", ru: "Проверка 4: ключевая идея для Дублирующий Compliance Alert?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_obs4_a", text: { en: "Track Subscriptions and make subscribe idempotent (or return a Subscription token used to unsubscribe).", ru: "Вести Subscriptions и сделать subscribe идемпотентным (или возвращать токен Subscription для unsubscribe)." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_obs4_b", text: { en: "Push all alerts through Kafka topics instead of fixing in-process Observer lifecycle.", ru: "Прогнать все alerts через Kafka вместо фикса in-process lifecycle Observer." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_obs4_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
