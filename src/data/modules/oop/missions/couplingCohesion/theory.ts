import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_COUPLING_COHESION: TheoryArticle = {
  id: "art_theory_coupling_cohesion",
  topicIds: ["top_oop_18"],
  conceptIds: ["cpt_coupling", "cpt_cohesion"],
  title: {
    en: "Coupling, Cohesion & Change Amplification in Reconciliation",
    ru: "Coupling, Cohesion и Усиление Изменений в Reconciliation"
  },
  summary: {
    en: "Coupling measures how a change in one module forces changes or retests in others. Cohesion measures whether a module's responsibilities belong together. ReconciliationService packs validate + DB + PDF + alert + retry into one class — low cohesion, high coupling — so a Slack alert hotfix amplifies into JDBC and PDF retests. Fix by high-cohesion modules behind interfaces and a thin coordinator.",
    ru: "Coupling измеряет, насколько изменение одного модуля форсит изменения или ретесты других. Cohesion измеряет, принадлежат ли обязанности модуля друг другу. ReconciliationService смешивает validate + DB + PDF + alert + retry в одном классе — низкая cohesion, высокий coupling — поэтому Slack-хотфикс алертов усиливается до ретеста JDBC и PDF. Фикс: высоко-cohesive модули за интерфейсами и тонкий coordinator."
  },
  sections: [
    {
      id: "sec_cc_definition",
      category: "DEFINITION",
      title: {
        en: "1. Coupling vs Cohesion: Two Orthogonal Metrics",
        ru: "1. Coupling vs Cohesion: Две Ортогональные Метрики"
      },
      blocks: [
        {
          id: "blk_cc_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Coupling is inter-module interdependence. Fowler frames it simply: if changing one module requires changing another, coupling exists. Some coupling is necessary (modules must communicate); the goal is to control it — prefer narrow interfaces over concrete JDBC/PDF/SMTP types. Cohesion is intra-module focus: a cohesive class does one thing well (Head First OOA&D). High cohesion and low coupling reinforce each other: when each module has one reason to change, fewer cross-module edits are forced.",
            ru: "Coupling — межмодульная взаимозависимость. Fowler формулирует просто: если изменение одного модуля требует изменения другого, coupling есть. Некоторый coupling необходим (модули должны общаться); цель — контролировать его — предпочитать узкие интерфейсы конкретным типам JDBC/PDF/SMTP. Cohesion — фокус внутри модуля: cohesive-класс делает одно дело хорошо (Head First OOA&D). Высокая cohesion и низкий coupling усиливают друг друга: когда у каждого модуля одна причина меняться, меньше форсированных правок между модулями."
          }
        },
        {
          id: "blk_cc_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Mental Model: Blast Radius, Not Just 'God Class Bad'",
            ru: "💡 Ментальная Модель: Blast Radius, Не Только «God Class Плох»"
          },
          content: {
            en: "God Class is a symptom label. Senior reasoning names the metrics: How many distinct reasons to change live in this class? (cohesion) When I change alert delivery, which other paths must recompile and retest? (coupling / change amplification). If alert → DB and alert → PDF edges exist in the dependency graph, the blast radius is too large — even if the class is 'only' 400 lines.",
            ru: "God Class — ярлык симптома. Senior-аргументация называет метрики: Сколько различных причин меняться в этом классе? (cohesion) Когда я меняю доставку алертов, какие ещё пути нужно перекомпилировать и ретестить? (coupling / усиление изменений). Если в графе зависимостей есть рёбра alert → DB и alert → PDF, blast radius слишком велик — даже если класс «всего» 400 строк."
          }
        }
      ]
    },
    {
      id: "sec_cc_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Measuring Amplification & Decomposing ReconciliationService",
        ru: "2. Измерение Amplification и Декомпозиция ReconciliationService"
      },
      blocks: [
        {
          id: "blk_cc_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Practical coupling signals for ReconciliationService: (1) Change amplification — PR that swaps SmtpClient for SlackWebhookClient also touches PDF golden tests. (2) Efferent coupling — class depends on many concrete types (DataSource, PdfRenderer, SmtpClient, RetryPolicy). (3) Shared mutable state — ReportContext mutated by alert and PDF branches. Cohesion signals: method clusters that never call each other (validate* vs renderPdf* vs publishAlert*) living in one type.",
            ru: "Практические сигналы coupling для ReconciliationService: (1) Усиление изменений — PR, меняющий SmtpClient на SlackWebhookClient, трогает и PDF golden-тесты. (2) Efferent coupling — класс зависит от многих конкретных типов (DataSource, PdfRenderer, SmtpClient, RetryPolicy). (3) Shared mutable state — ReportContext мутируется ветками alert и PDF. Сигналы cohesion: кластеры методов, которые никогда не вызывают друг друга (validate* vs renderPdf* vs publishAlert*), живущие в одном типе."
          }
        },
        {
          id: "blk_cc_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Shared Mutable ReportContext: Hidden Coupling Edge",
            ru: "⚙️ Shared Mutable ReportContext: Скрытое Ребро Coupling"
          },
          content: {
            en: "In the incident, publishAlert set `reportContext.channelTag = \"SLACK\"` and cleared `reportContext.rows` 'to save memory' before PDF finished rendering. That is content coupling via shared mutable state — not just 'too many methods'. Decomposition must eliminate cross-concern mutation: AlertPublisher receives an immutable AlertPayload; ReconciliationReporter owns its own render model.",
            ru: "В инциденте publishAlert ставил `reportContext.channelTag = \"SLACK\"` и очищал `reportContext.rows` «для экономии памяти» до окончания PDF. Это content coupling через shared mutable state — не просто «слишком много методов». Декомпозиция должна убрать кросс-concern мутацию: AlertPublisher получает immutable AlertPayload; ReconciliationReporter владеет своей render-моделью."
          }
        },
        {
          id: "blk_cc_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Target Shape: High Cohesion Modules + Thin Coordinator",
            ru: "📜 Целевая Форма: Высоко-Cohesive Модули + Тонкий Coordinator"
          },
          content: {
            en: "Extract: `ReconciliationValidator` (rules only), `LedgerRepository` (persistence port), `ReconciliationReporter` (PDF/report), `AlertPublisher` (notification port). `ReconciliationCoordinator.reconcile` sequences validate → load → report → alert with retries as an application policy — depending on interfaces, not concrete JDBC/SMTP. Success metric: changing SlackWebhookAlertPublisher does not recompile LedgerRepository or ReconciliationReporter tests.",
            ru: "Выделите: `ReconciliationValidator` (только правила), `LedgerRepository` (порт persistence), `ReconciliationReporter` (PDF/отчёт), `AlertPublisher` (порт нотификаций). `ReconciliationCoordinator.reconcile` выстраивает validate → load → report → alert с retry как application policy — зависит от интерфейсов, не от конкретного JDBC/SMTP. Метрика успеха: смена SlackWebhookAlertPublisher не перекомпилирует тесты LedgerRepository или ReconciliationReporter."
          }
        }
      ]
    },
    {
      id: "sec_cc_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Decomposition Granularity vs Wiring Cost",
        ru: "3. Компромиссы: Гранулярность Декомпозиции vs Стоимость Wiring"
      },
      blocks: [
        {
          id: "blk_cc_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Over-decomposition (six one-method classes for a stable 3-step script) adds DI wiring without shrinking real blast radius. Under-decomposition (keep PDF + alert in one 'NotificationAndReportService') preserves the amplification edge. Prefer seams where reasons to change diverge: alert channels change with ops tooling; PDF layout with compliance; ledger SQL with schema. Clean Architecture ports/adapters encode the same idea: policy depends inward on abstractions.",
            ru: "Over-decomposition (шесть классов с одним методом для стабильного 3-шагового скрипта) добавляет DI wiring без сужения реального blast radius. Under-decomposition (оставить PDF + alert в одном 'NotificationAndReportService') сохраняет ребро amplification. Предпочитайте швы, где причины меняться расходятся: каналы алертов — с ops tooling; layout PDF — с compliance; SQL ledger — со схемой. Порты/адаптеры Clean Architecture кодируют ту же идею: policy зависит внутрь от абстракций."
          }
        },
        {
          id: "blk_cc_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Measuring Progress Without Vanity Metrics",
            ru: "🔧 Измерение Прогресса Без Vanity-Метрик"
          },
          content: {
            en: "Line count alone is weak. Prefer: (1) number of distinct change reasons per class, (2) CI jobs that turn red when only AlertPublisher changes, (3) ability to unit-test validator without DataSource. ArchUnit can forbid `..alert..` packages from depending on `javax.sql` / PDF libraries — encoding the coupling budget in CI.",
            ru: "Один line count слаб. Предпочитайте: (1) число различных причин меняться на класс, (2) CI jobs, краснеющие когда меняется только AlertPublisher, (3) возможность юнит-тестить validator без DataSource. ArchUnit может запретить пакетам `..alert..` зависеть от `javax.sql` / PDF-библиотек — кодируя budget coupling в CI."
          }
        }
      ]
    },
    {
      id: "sec_cc_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Coupling & Cohesion",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Coupling и Cohesion"
      },
      blocks: [
        {
          id: "blk_cc_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Define coupling vs cohesion in one sentence each.' — Model Answer: Coupling is how strongly modules depend on each other so a change ripples; cohesion is how strongly responsibilities inside one module belong together.",
            ru: "Доп. Вопрос 1: 'Определите coupling vs cohesion по одному предложению.' — Модельный Ответ: Coupling — насколько сильно модули зависят друг от друга так, что изменение распространяется; cohesion — насколько обязанности внутри одного модуля принадлежат друг другу."
          }
        },
        {
          id: "blk_cc_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How do you measure change amplification on ReconciliationService?' — Model Answer: Track PRs that intended one concern (alert channel) but forced edits/retests of unrelated concerns (JDBC, PDF). Count CI suites that must run for an alert-only change.",
            ru: "Доп. Вопрос 2: 'Как измерить усиление изменений на ReconciliationService?' — Модельный Ответ: Трекать PR, целившиеся в один concern (канал алертов), но форсившие правки/ретесты несвязанных (JDBC, PDF). Считать CI suites, которые должны бежать для alert-only изменения."
          }
        },
        {
          id: "blk_cc_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Is every large class a cohesion problem?' — Model Answer: No. Size correlates but the metric is reasons to change and relatedness of methods. A large pure algorithm with one reason can be cohesive; a small class mixing SMTP and SQL is not.",
            ru: "Доп. Вопрос 3: 'Каждый ли большой класс — проблема cohesion?' — Модельный Ответ: Нет. Размер коррелирует, но метрика — причины меняться и связанность методов. Большой чистый алгоритм с одной причиной может быть cohesive; маленький класс, смешивающий SMTP и SQL — нет."
          }
        },
        {
          id: "blk_cc_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'How do interfaces lower coupling here?' — Model Answer: Coordinator depends on AlertPublisher / LedgerRepository abstractions. Slack vs email adapters change without recompiling coordinator or reporter. Separated Interface (Fowler) keeps policy free of delivery details.",
            ru: "Доп. Вопрос 4: 'Как интерфейсы снижают coupling здесь?' — Модельный Ответ: Coordinator зависит от абстракций AlertPublisher / LedgerRepository. Адаптеры Slack vs email меняются без перекомпиляции coordinator или reporter. Separated Interface (Fowler) держит policy свободной от деталей доставки."
          }
        },
        {
          id: "blk_cc_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Where should retries live?' — Model Answer: Retry policy is an application/orchestration concern on the coordinator (or a dedicated RetryExecutor collaborator), not inside LedgerRepository SQL or PDF rendering — keep persistence and reporting cohesive.",
            ru: "Доп. Вопрос 5: 'Где жить retry?' — Модельный Ответ: Политика retry — application/orchestration concern на coordinator (или отдельный RetryExecutor), не внутри SQL LedgerRepository или рендера PDF — persistence и reporting остаются cohesive."
          }
        },
        {
          id: "blk_cc_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How is this different from the God Class anti-pattern mission?' — Model Answer: God Class names the symptom. Here we quantify coupling/cohesion and optimize blast radius of a Slack channel change — metrics and decomposition seams, not only 'split the big class'.",
            ru: "Доп. Вопрос 6: 'Чем это отличается от миссии про антипаттерн God Class?' — Модельный Ответ: God Class именует симптом. Здесь мы квантифицируем coupling/cohesion и оптимизируем blast radius смены Slack-канала — метрики и швы декомпозиции, не только «разрезать большой класс»."
          }
        },
        {
          id: "blk_cc_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'What is content coupling via ReportContext?' — Model Answer: One concern mutates another's internal data (alert clears rows used by PDF). Even after method extraction, shared mutable bags reintroduce coupling — pass immutable payloads instead.",
            ru: "Доп. Вопрос 7: 'Что такое content coupling через ReportContext?' — Модельный Ответ: Один concern мутирует внутренние данные другого (alert чистит rows для PDF). Даже после extract method shared mutable bags возвращают coupling — передавайте immutable payloads."
          }
        },
        {
          id: "blk_cc_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How does Clean Architecture apply?' — Model Answer: Use-case/coordinator in the inner circle depends on ports (LedgerRepository, AlertPublisher). JDBC and Slack adapters implement ports outward. Frameworks are details; policy stays stable when channels change.",
            ru: "Доп. Вопрос 8: 'Как применяется Clean Architecture?' — Модельный Ответ: Use-case/coordinator во внутреннем круге зависит от портов (LedgerRepository, AlertPublisher). JDBC и Slack адаптеры реализуют порты снаружи. Фреймворки — детали; policy стабильна при смене каналов."
          }
        },
        {
          id: "blk_cc_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can high cohesion increase coupling?' — Model Answer: Rarely if seams are right. Wrong cut (one 'cohesive' Utils class used everywhere) creates a hub of efferent coupling. Cohesion of a junk drawer is fake — functional cohesion matters.",
            ru: "Доп. Вопрос 9: 'Может ли высокая cohesion повысить coupling?' — Модельный Ответ: Редко при правильных швах. Неверный разрез (один 'cohesive' Utils, используемый везде) создаёт хаб efferent coupling. Cohesion свалки — фейк; важна функциональная cohesion."
          }
        },
        {
          id: "blk_cc_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'What ArchUnit rule would you add?' — Model Answer: Forbid `..reconciliation.alert..` from depending on `javax.sql` / PDF packages; forbid reporter from depending on Slack/SMTP SDKs. Encode the coupling budget in CI.",
            ru: "Доп. Вопрос 10: 'Какое правило ArchUnit добавить?' — Модельный Ответ: Запретить `..reconciliation.alert..` зависеть от `javax.sql` / PDF-пакетов; запретить reporter зависеть от Slack/SMTP SDK. Закодировать budget coupling в CI."
          }
        },
        {
          id: "blk_cc_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'How do you unit-test after decomposition?' — Model Answer: Validator tests need no DataSource. Reporter tests feed fixture rows. AlertPublisher tests assert payload formatting. Coordinator tests mock ports and assert order/retry — no combinatorial JDBC×PDF×Slack matrix in one class.",
            ru: "Доп. Вопрос 11: 'Как юнит-тестировать после декомпозиции?' — Модельный Ответ: Тестам validator не нужен DataSource. Тесты reporter кормят fixture rows. Тесты AlertPublisher проверяют форматирование payload. Тесты coordinator мокают порты и проверяют порядок/retry — без комбинаторной матрицы JDBC×PDF×Slack в одном классе."
          }
        },
        {
          id: "blk_cc_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'When would you keep a single class?' — Model Answer: Stable script with one owner, no divergent change rates, and no shared mutable cross-talk — measure first. Once alert channels churn independently of ledger SQL, extract the seam.",
            ru: "Доп. Вопрос 12: 'Когда оставить один класс?' — Модельный Ответ: Стабильный скрипт с одним владельцем, без расходящихся темпов изменений и без shared mutable cross-talk — сначала измерьте. Как только каналы алертов меняются независимо от SQL ledger — вынесите шов."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_interface_contracts"],
  sourceIds: [
    "src_hf_ooad_coupling_cohesion",
    "src_clean_architecture_cc",
    "src_fowler_coupling",
    "src_fowler_separated_interface"
  ],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#coupling", "#cohesion", "#change-amplification", "#reconciliation"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_COUPLING_COHESION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_cc_1",
    theoryArticleId: "art_theory_coupling_cohesion",
    question: {
      en: "What is the clearest coupling signal when swapping ReconciliationService's alert channel to Slack?",
      ru: "Какой самый ясный сигнал coupling при смене канала алертов ReconciliationService на Slack?"
    },
    explanation: {
      en: "Change amplification: an alert-only edit forces recompilation/retest of unrelated DB and PDF paths.",
      ru: "Усиление изменений: правка только алертов форсит перекомпиляцию/ретест несвязанных путей DB и PDF."
    },
    options: [
      {
        id: "opt_cc1_a",
        text: {
          en: "The alert change forces retesting of JDBC ledger and PDF report paths that did not change.",
          ru: "Смена алертов форсит ретест путей JDBC ledger и PDF, которые не менялись."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That blast radius is change amplification from high coupling.",
          ru: "Верно! Этот blast radius — усиление изменений из-за высокого coupling."
        }
      },
      {
        id: "opt_cc1_b",
        text: {
          en: "Slack webhooks are slower than SMTP, so coupling increases latency.",
          ru: "Slack webhooks медленнее SMTP, поэтому coupling увеличивает latency."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Coupling is about change interdependence, not network latency.",
          ru: "Неверно. Coupling — про взаимозависимость изменений, не про сетевую latency."
        }
      },
      {
        id: "opt_cc1_c",
        text: {
          en: "Any class over 500 lines is illegally coupled by the Java Language Specification.",
          ru: "Любой класс длиннее 500 строк незаконно связан по спецификации языка Java."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. JLS does not ban large classes; the issue is design metrics, not language law.",
          ru: "Неверно. JLS не запрещает большие классы; проблема в метриках дизайна, не в законе языка."
        },
        misconceptionId: "err_cc_size_equals_coupling"
      }
    ],
    order: 1
  },
  {
    id: "chk_cc_2",
    theoryArticleId: "art_theory_coupling_cohesion",
    question: {
      en: "Which decomposition best raises cohesion while lowering coupling for ReconciliationService?",
      ru: "Какая декомпозиция лучше повышает cohesion и снижает coupling для ReconciliationService?"
    },
    explanation: {
      en: "Separate validator, ledger port, reporter, alert port; thin coordinator depends on interfaces.",
      ru: "Разделить validator, ledger port, reporter, alert port; тонкий coordinator зависит от интерфейсов."
    },
    options: [
      {
        id: "opt_cc2_a",
        text: {
          en: "ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher + thin ReconciliationCoordinator behind interfaces.",
          ru: "ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher + тонкий ReconciliationCoordinator за интерфейсами."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! One reason to change per module; coordinator couples only to abstractions.",
          ru: "Верно! Одна причина меняться на модуль; coordinator связан только с абстракциями."
        }
      },
      {
        id: "opt_cc2_b",
        text: {
          en: "Move PDF and alert into private inner classes but keep shared mutable ReportContext on the outer service.",
          ru: "Вынести PDF и alert в private inner classes, но оставить shared mutable ReportContext на внешнем сервисе."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Inner classes with shared mutable state keep content coupling and amplification.",
          ru: "Неверно. Inner classes с shared mutable state сохраняют content coupling и amplification."
        },
        misconceptionId: "err_cc_fake_extract_shared_state"
      },
      {
        id: "opt_cc2_c",
        text: {
          en: "Make ReconciliationService extend DataSource so JDBC methods are inherited for free.",
          ru: "Сделать ReconciliationService наследником DataSource, чтобы JDBC-методы наследовались бесплатно."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Inheritance from infrastructure increases coupling and destroys cohesion.",
          ru: "Неверно. Наследование от инфраструктуры повышает coupling и разрушает cohesion."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_cc_3",
    theoryArticleId: "art_theory_coupling_cohesion",
    question: {
      en: "Why is cohesion not the same as 'small class size'?",
      ru: "Почему cohesion — это не то же самое, что «маленький размер класса»?"
    },
    explanation: {
      en: "Cohesion is about relatedness of responsibilities / single reason to change, not line count.",
      ru: "Cohesion — про связанность обязанностей / единую причину меняться, не про число строк."
    },
    options: [
      {
        id: "opt_cc3_a",
        text: {
          en: "A small class mixing SQL and SMTP is low cohesion; a larger single-purpose validator can be high cohesion.",
          ru: "Маленький класс, смешивающий SQL и SMTP — низкая cohesion; больший single-purpose validator может иметь высокую cohesion."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Functional relatedness and reasons to change define cohesion.",
          ru: "Верно! Функциональная связанность и причины меняться определяют cohesion."
        }
      },
      {
        id: "opt_cc3_b",
        text: {
          en: "Cohesion is defined as lines of code divided by number of imports.",
          ru: "Cohesion определяется как число строк кода, делённое на число import."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That vanity ratio is not the cohesion definition used in OOA&D.",
          ru: "Неверно. Этот vanity-коэффициент — не определение cohesion из OOA&D."
        }
      },
      {
        id: "opt_cc3_c",
        text: {
          en: "Any class with more than three methods is definitionally low cohesion.",
          ru: "Любой класс с более чем тремя методами по определению имеет низкую cohesion."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Method count alone does not determine cohesion.",
          ru: "Неверно. Одно число методов не определяет cohesion."
        },
        misconceptionId: "err_cc_size_equals_coupling"
      }
    ],
    order: 3
  }
];
