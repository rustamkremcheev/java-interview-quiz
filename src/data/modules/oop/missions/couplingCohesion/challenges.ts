import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_CC: FixBuilderChallenge = {
  id: "chl_cc_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_coupling_cohesion",
  stageId: "stg_cc_practice",
  title: {
    en: "Fix Builder: Decompose ReconciliationService for Low Coupling",
    ru: "Конструктор Исправления: Декомпозиция ReconciliationService для Низкого Coupling"
  },
  prompt: {
    en: "ReconciliationService mixes validate, JDBC, PDF, alerts, and retry — a Slack alert hotfix forced DB/PDF retests. Select ALL structural building blocks required for high-cohesion modules with low coupling via interfaces and a thin coordinator.",
    ru: "ReconciliationService смешивает validate, JDBC, PDF, алерты и retry — Slack-хотфикс алертов форсил ретест DB/PDF. Выберите ВСЕ элементы для высоко-cohesive модулей с низким coupling через интерфейсы и тонкий coordinator."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_coupling", "cpt_cohesion"],
  topicIds: ["top_oop_18"],
  tags: ["#coupling", "#cohesion", "#reconciliation"],
  hintIds: ["hnt_cc_1", "hnt_cc_2", "hnt_cc_3", "hnt_cc_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_cc_recon_service_broken",
    solutionCodeArtifactId: "art_cc_recon_service_solution",
    options: [
      {
        id: "opt_cc_fix_1",
        text: {
          en: "Extract ReconciliationValidator, LedgerRepository, ReconciliationReporter, and AlertPublisher as focused collaborators (high cohesion per concern).",
          ru: "Выделить ReconciliationValidator, LedgerRepository, ReconciliationReporter и AlertPublisher как сфокусированные коллабораторы (высокая cohesion на concern)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. One primary reason to change per module restores functional cohesion.",
          ru: "Верно. Одна основная причина меняться на модуль восстанавливает функциональную cohesion."
        }
      },
      {
        id: "opt_cc_fix_2",
        text: {
          en: "Depend on AlertPublisher / LedgerRepository interfaces (ports); wire Slack/JDBC adapters at the composition root.",
          ru: "Зависеть от интерфейсов AlertPublisher / LedgerRepository (порты); связывать Slack/JDBC адаптеры в composition root."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Interface dependency shrinks blast radius so alert-channel swaps do not recompile DB/PDF modules.",
          ru: "Верно. Зависимость от интерфейсов сужает blast radius — смена канала алертов не перекомпилирует модули DB/PDF."
        }
      },
      {
        id: "opt_cc_fix_3",
        text: {
          en: "Keep a thin ReconciliationCoordinator that sequences validate → load → report → alert and owns retry policy.",
          ru: "Оставить тонкий ReconciliationCoordinator, выстраивающий validate → load → report → alert и владеющий политикой retry."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Orchestration stays cohesive as application policy without owning JDBC/PDF/SMTP details.",
          ru: "Верно. Оркестрация остаётся cohesive как application policy без владения деталями JDBC/PDF/SMTP."
        }
      },
      {
        id: "opt_cc_fix_4",
        text: {
          en: "Make ReconciliationService extend DataSource and SmtpClient so persistence and alerts are inherited.",
          ru: "Сделать ReconciliationService наследником DataSource и SmtpClient, чтобы persistence и алерты наследовались."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Inheritance from infrastructure maximizes coupling and destroys cohesion.",
          ru: "Неверно. Наследование от инфраструктуры максимизирует coupling и разрушает cohesion."
        }
      },
      {
        id: "opt_cc_fix_distractor_1",
        text: {
          en: "Extract private inner PdfHelper and AlertHelper that still mutate a shared ReportContext on the outer service.",
          ru: "Вынести private inner PdfHelper и AlertHelper, которые по-прежнему мутируют общий ReportContext на внешнем сервисе."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Fake extraction — content coupling via shared mutable state keeps change amplification.",
          ru: "Неверно. Фальшивое извлечение — content coupling через shared mutable state сохраняет усиление изменений."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_CC: BugHuntChallenge = {
  id: "chl_cc_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_coupling_cohesion",
  stageId: "stg_cc_debug",
  title: {
    en: "Bug Hunt: Alert Branch Clears Rows Before PDF Render",
    ru: "Поиск Бага: Ветка Алертов Чистит Rows до Рендера PDF"
  },
  prompt: {
    en: "After the Slack alert hotfix, PDF reports shipped empty while alerts looked fine. Click the line(s) where alert-channel plumbing mutates shared ReportContext used by PDF — the coupling edge that amplified the change.",
    ru: "После Slack-хотфикса алертов PDF-отчёты уходили пустыми, а алерты выглядели нормально. Нажмите строку(и), где проводка канала алертов мутирует общий ReportContext, используемый PDF — ребро coupling, усилившее изменение."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_coupling", "cpt_cohesion"],
  topicIds: ["top_oop_18"],
  tags: ["#coupling", "#bug-hunt", "#change-amplification"],
  hintIds: ["hnt_cc_bug_1", "hnt_cc_bug_2", "hnt_cc_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_cc_recon_service_bughunt",
    solutionCodeArtifactId: "art_cc_recon_service_solution",
    codeSnippet: `public ReconciliationResult reconcile(ReconciliationBatch batch) {
    ReportContext ctx = new ReportContext();
    validate(batch); // Line 3
    ctx.rows = ledger.load(batch.period()); // Line 4
    if (hasMismatches(ctx.rows)) {
        ctx.channelTag = "SLACK"; // Line 6 — alert concern writes shared ctx
        publishAlert(ctx); // Line 7
        ctx.rows.clear(); // Line 8 — BUG: clears data PDF still needs
    }
    byte[] pdf = pdfRenderer.render(ctx); // Line 10 — empty after clear
    return new ReconciliationResult(pdf, ctx.channelTag);
}`,
    lines: [
      { lineNumber: 1, code: "public ReconciliationResult reconcile(ReconciliationBatch batch) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    ReportContext ctx = new ReportContext();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "    validate(batch);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    ctx.rows = ledger.load(batch.period());", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    if (hasMismatches(ctx.rows)) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 6,
        code: "        ctx.channelTag = \"SLACK\";",
        isBug: true,
        explanation: {
          en: "Line 6: Alert concern mutates shared ReportContext — couples notification channel to the report model PDF will consume.",
          ru: "Строка 6: Concern алертов мутирует общий ReportContext — связывает канал нотификации с report-моделью, которую потребит PDF."
        }
      },
      { lineNumber: 7, code: "        publishAlert(ctx);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 8,
        code: "        ctx.rows.clear();",
        isBug: true,
        explanation: {
          en: "Line 8: Alert path clears ledger rows 'to save memory' before PDF render — content coupling; Slack hotfix empties reports.",
          ru: "Строка 8: Путь алертов чистит rows ledger «для экономии памяти» до рендера PDF — content coupling; Slack-хотфикс опустошает отчёты."
        }
      },
      { lineNumber: 9, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 10,
        code: "    byte[] pdf = pdfRenderer.render(ctx);",
        isBug: true,
        explanation: {
          en: "Line 10: PDF consumes the same mutable ctx after alert side effects — demonstrates change amplification across concerns.",
          ru: "Строка 10: PDF потребляет тот же мутабельный ctx после side effects алертов — демонстрирует усиление изменений между concerns."
        }
      },
      { lineNumber: 11, code: "    return new ReconciliationResult(pdf, ctx.channelTag);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 12, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_CC: InterviewAnswerChallenge = {
  id: "chl_cc_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_coupling_cohesion",
  stageId: "stg_cc_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Coupling & Cohesion Metrics",
    ru: "Устный Ответ на Senior-Интервью: Метрики Coupling и Cohesion"
  },
  prompt: {
    en: "Your ReconciliationService forced a full DB/PDF retest after a Slack alert-channel hotfix. Explain coupling vs cohesion, how you measure change amplification, and your production decomposition (validator, ledger port, reporter, alert port, thin coordinator) to the interviewer.",
    ru: "ReconciliationService форсил полный ретест DB/PDF после Slack-хотфикса канала алертов. Объясните интервьюеру coupling vs cohesion, как вы измеряете усиление изменений и ваш продакшн-рефакторинг (validator, ledger port, reporter, alert port, тонкий coordinator)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_coupling", "cpt_cohesion"],
  topicIds: ["top_oop_18"],
  tags: ["#coupling", "#cohesion", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_cc_recon_01",
    rubricDimensions: ["ELEVATOR_PITCH", "COUPLING_COHESION_METRICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_coupling",
        label: { en: "Coupling & Change Amplification", ru: "Coupling и Усиление Изменений" },
        keywords: ["coupling", "change amplification", "blast radius", "зависимость", "усиление изменений", "blast radius"]
      },
      {
        id: "cpt_cohesion",
        label: { en: "Cohesion", ru: "Cohesion" },
        keywords: ["cohesion", "single reason", "функциональная", "связность", "одна причина"]
      },
      {
        id: "cpt_ports",
        label: { en: "Interface Ports / Separated Collaborators", ru: "Интерфейсные Порты / Разделённые Коллабораторы" },
        keywords: ["AlertPublisher", "LedgerRepository", "interface", "port", "порт", "интерфейс"]
      },
      {
        id: "cpt_coordinator",
        label: { en: "Thin ReconciliationCoordinator", ru: "Тонкий ReconciliationCoordinator" },
        keywords: ["coordinator", "orchestrat", "ReconciliationCoordinator", "координатор", "оркестрац"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): ReconciliationService packs validate, JDBC, PDF, alerts, and retry — low cohesion (five reasons to change) and high coupling (Slack hotfix reds DB/PDF CI). That is change amplification, not just 'God Class'. Fix: high-cohesion modules — ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher — behind interfaces, with a thin ReconciliationCoordinator. Alert-channel swaps stay in the alert adapter blast radius.",
      ru: "Elevator Pitch (30 сек): ReconciliationService смешивает validate, JDBC, PDF, алерты и retry — низкая cohesion (пять причин меняться) и высокий coupling (Slack-хотфикс краснит CI DB/PDF). Это усиление изменений, не просто «God Class». Фикс: высоко-cohesive модули — ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher — за интерфейсами, с тонким ReconciliationCoordinator. Смены канала алертов остаются в blast radius адаптера алертов."
    },
    modelAnswerDetailed: {
      en: "Deep Metrics (60 sec): Coupling = if changing A forces changing/retesting B. Cohesion = responsibilities inside a module belong together. Signals here: shared mutable ReportContext (alert clears rows PDF needs), concrete DataSource/PdfRenderer/SmtpClient on one type, CI suites that must run for alert-only PRs. Decomposition: immutable AlertPayload / ReportModel; ports for ledger and alerts; coordinator sequences validate → load → report → alert and owns retry. Success metric: SlackWebhookAlertPublisher change does not recompile reporter or repository tests.",
      ru: "Глубокие Метрики (60 сек): Coupling = если изменение A форсит изменение/ретест B. Cohesion = обязанности внутри модуля принадлежат друг другу. Сигналы здесь: shared mutable ReportContext (alert чистит rows для PDF), конкретные DataSource/PdfRenderer/SmtpClient на одном типе, CI suites для alert-only PR. Декомпозиция: immutable AlertPayload / ReportModel; порты ledger и alerts; coordinator выстраивает validate → load → report → alert и владеет retry. Метрика успеха: смена SlackWebhookAlertPublisher не перекомпилирует тесты reporter или repository."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Avoid fake inner-class extraction that keeps shared mutable state. Avoid over-decomposition of a stable 3-step script. Cut seams where change rates diverge (ops alert channels vs compliance PDF vs schema SQL). Encode coupling budget with ArchUnit: alert packages must not depend on javax.sql / PDF libs. Wire adapters at composition root.",
      ru: "Продакшн Компромиссы (30 сек): Избегать фальшивого extract во inner classes с shared mutable state. Избегать over-decomposition стабильного 3-шагового скрипта. Резать швы там, где темпы изменений расходятся (ops-каналы алертов vs compliance PDF vs schema SQL). Закодировать budget coupling через ArchUnit: пакеты alert не зависят от javax.sql / PDF. Связывать адаптеры в composition root."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'How is your answer different from just saying it is a God Class?'",
      ru: "Доп. Вопрос Интервьюера: 'Чем ваш ответ отличается от простого «это God Class»?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: God Class is a symptom label. I quantified five reasons to change, named the alert→PDF content-coupling edge on ReportContext, and defined a success metric — alert-channel PRs must not force DB/PDF retests. The refactor targets coupling/cohesion metrics and blast radius, not line count alone.",
      ru: "Ответ на Доп. Вопрос: God Class — ярлык симптома. Я квантифицировал пять причин меняться, назвал ребро content-coupling alert→PDF на ReportContext и задал метрику успеха — PR канала алертов не должны форсить ретест DB/PDF. Рефакторинг целится в метрики coupling/cohesion и blast radius, не только в число строк."
    }
  }
};

export const ALL_COUPLING_COHESION_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_CC,
  APPLIED_BUG_HUNT_CHALLENGE_CC,
  INTERVIEW_ANSWER_CHALLENGE_CC
];
