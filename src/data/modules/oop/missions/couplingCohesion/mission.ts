import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_cc_intro",
  missionId: "mis_coupling_cohesion",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where a Slack alert-channel hotfix in ReconciliationService forced a full retest of JDBC ledger reads and PDF report generation — change amplification from tight coupling and low cohesion.",
    ru: "Изучите инцидент на продакшене, где хотфикс Slack-канала алертов в ReconciliationService вынудил полный ретест JDBC-чтения ledger и генерации PDF — усиление изменений из-за tight coupling и низкой cohesion."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_cc_problem",
  missionId: "mis_coupling_cohesion",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine ReconciliationService: one class validates requests, hits the ledger DB, generates a PDF report, publishes alerts, and retries — changing the alert channel recompiles and retests DB and PDF paths that never changed.",
    ru: "Изучите ReconciliationService: один класс валидирует запросы, ходит в ledger DB, генерирует PDF-отчёт, публикует алерты и делает retry — смена канала алертов перекомпилирует и ретестирует пути DB и PDF, которые не менялись."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_cc_think",
  missionId: "mis_coupling_cohesion",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: How would you measure coupling vs cohesion in ReconciliationService, and why does an alert-channel change amplify into DB and PDF retests?",
    ru: "Сформулируйте гипотезу: как измерить coupling vs cohesion в ReconciliationService, и почему смена канала алертов усиливается до ретеста DB и PDF?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_cc_help",
  missionId: "mis_coupling_cohesion",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to coupling/cohesion theory, change-amplification metrics, and interface-based decomposition of reconciliation concerns.",
    ru: "Бесштрафной переход к теории coupling/cohesion, метрикам усиления изменений и декомпозиции reconciliation через интерфейсы."
  }
};

const stage5: TheoryStage = {
  id: "stg_cc_theory",
  missionId: "mis_coupling_cohesion",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering coupling metrics, cohesion, interface decomposition of ReconciliationService, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о метриках coupling, cohesion, интерфейсной декомпозиции ReconciliationService и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_coupling_cohesion"
};

const stage6: BaseMissionStage = {
  id: "stg_cc_visual",
  missionId: "mis_coupling_cohesion",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Coupling Blast-Radius Visualization", ru: "6. Визуализация Blast Radius Coupling" },
  instructions: {
    en: "Compare the monolith blast radius (alert change → retest validate/DB/PDF/retry) against high-cohesion modules behind interfaces: ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher, thin ReconciliationCoordinator.",
    ru: "Сравните blast radius монолита (смена алерта → ретест validate/DB/PDF/retry) с высоко-cohesive модулями за интерфейсами: ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher, тонкий ReconciliationCoordinator."
  }
};

const stage7: PracticeStage = {
  id: "stg_cc_practice",
  missionId: "mis_coupling_cohesion",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to decompose ReconciliationService into high-cohesion collaborators with low coupling via interfaces.",
    ru: "Соберите элементы кода для декомпозиции ReconciliationService на высоко-cohesive коллабораторы с низким coupling через интерфейсы."
  },
  challengeId: "chl_cc_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_cc_interview_q",
  missionId: "mis_coupling_cohesion",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about measuring coupling/cohesion and decomposing ReconciliationService to stop change amplification.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования об измерении coupling/cohesion и декомпозиции ReconciliationService для остановки усиления изменений."
  },
  interviewQuestionId: "q_cc_recon_01",
  challengeId: "chl_cc_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_cc_interview_a",
  missionId: "mis_coupling_cohesion",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Coupling/Cohesion Metrics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Метрики Coupling/Cohesion + Продакшн Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_cc_recon_01",
  challengeId: "chl_cc_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_cc_debug",
  missionId: "mis_coupling_cohesion",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Shared Mutable Coupling", ru: "10. Поиск Бага: Shared Mutable Coupling" },
  instructions: {
    en: "Identify the line(s) in ReconciliationService where alert-channel plumbing mutates shared report/DB state — the coupling that amplified a Slack hotfix into PDF corruption.",
    ru: "Найдите строку(и) в ReconciliationService, где проводка канала алертов мутирует общее состояние report/DB — coupling, усиливший Slack-хотфикс до порчи PDF."
  },
  challengeId: "chl_cc_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_cc_related",
  missionId: "mis_coupling_cohesion",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to OOP anti-patterns, SOLID / dependency inversion, and encapsulation boundaries.",
    ru: "Исследуйте связи Графа Знаний к антипаттернам ООП, SOLID / dependency inversion и границам инкапсуляции."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_cc_results",
  missionId: "mis_coupling_cohesion",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_cc_reflection",
  missionId: "mis_coupling_cohesion",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that couples alert-channel changes to DB/PDF retest blast radius in favor of high-cohesion modules behind interfaces.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, связывающий смену канала алертов с blast radius ретеста DB/PDF, в пользу высоко-cohesive модулей за интерфейсами."
  }
};

export const COUPLING_COHESION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const COUPLING_COHESION_MISSION: Mission = {
  id: "mis_coupling_cohesion",
  primaryTopicId: "top_oop_18",
  secondaryTopicIds: ["top_oop_32", "top_oop_23", "top_oop_05"],
  slug: "reconciliation-service-change-amplification",
  title: {
    en: "Change Amplification: Coupling and Cohesion in ReconciliationService",
    ru: "Усиление Изменений: Coupling и Cohesion в ReconciliationService"
  },
  description: {
    en: "Measure and fix change amplification in ReconciliationService — a low-cohesion monolith that validates, hits the ledger DB, generates PDF reports, publishes alerts, and retries. Changing the alert channel forces retesting DB and PDF paths. Decompose into high-cohesion modules (ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher) behind interfaces with a thin ReconciliationCoordinator.",
    ru: "Измерьте и устраните усиление изменений в ReconciliationService — монолите с низкой cohesion, который валидирует, ходит в ledger DB, генерирует PDF, публикует алерты и делает retry. Смена канала алертов вынуждает ретестить пути DB и PDF. Декомпозируйте на высоко-cohesive модули (ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher) за интерфейсами с тонким ReconciliationCoordinator."
  },
  scenarioIntroduction: {
    en: "Ops demanded Slack instead of email for reconciliation mismatch alerts. An engineer edited ReconciliationService.publishAlert(...) — the same 1800-line class that validates batches, opens JDBC connections, renders PDF summaries, and runs retry loops. CI rebuilt and re-ran the full suite: ledger repository tests, PDF golden files, and retry backoff fixtures all turned red from an unrelated shared mutable ReportContext mutated by the alert branch. The root cause is not 'Slack is hard' — it is change amplification from high coupling and low cohesion: one reason to change (alert channel) dragged four unrelated reasons into the blast radius.",
    ru: "Ops потребовали Slack вместо email для алертов о mismatch сверки. Инженер правил ReconciliationService.publishAlert(...) — тот же класс на 1800 строк, который валидирует батчи, открывает JDBC, рендерит PDF и крутит retry. CI пересобрал и прогнал полный suite: тесты ledger repository, PDF golden files и фикстуры retry backoff покраснели из-за несвязанного shared mutable ReportContext, мутируемого веткой алертов. Корневая причина не в «сложности Slack» — в усилении изменений из-за высокого coupling и низкой cohesion: одна причина меняться (канал алертов) втянула четыре несвязанные в blast radius."
  },
  engineeringProblem: {
    en: "ReconciliationService.reconcile(batch) validates, loads ledger rows via JDBC, generates a PDF report, publishes alerts, and retries transient failures — five reasons to change in one class (low cohesion). Concrete dependencies (DataSource, PdfRenderer, SmtpClient) create high afferent/efferent coupling: editing alert delivery recompiles and retests DB and PDF. Solution: extract ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher behind interfaces; keep a thin ReconciliationCoordinator that orchestrates. Measure success by blast radius — an alert-channel swap must not force DB/PDF retests.",
    ru: "ReconciliationService.reconcile(batch) валидирует, грузит строки ledger через JDBC, генерирует PDF, публикует алерты и ретраит транзиентные сбои — пять причин меняться в одном классе (низкая cohesion). Конкретные зависимости (DataSource, PdfRenderer, SmtpClient) создают высокий afferent/efferent coupling: правка доставки алертов перекомпилирует и ретестирует DB и PDF. Решение: выделить ReconciliationValidator, LedgerRepository, ReconciliationReporter, AlertPublisher за интерфейсами; оставить тонкий ReconciliationCoordinator для оркестрации. Успех измерять blast radius — смена канала алертов не должна форсить ретест DB/PDF."
  },
  learningObjectives: [
    {
      en: "Distinguish coupling (inter-module change dependency) from cohesion (intra-module responsibility focus) with measurable reasoning",
      ru: "Различать coupling (межмодульная зависимость изменений) и cohesion (фокус обязанностей внутри модуля) с измеримой аргументацией"
    },
    {
      en: "Quantify change amplification: alert-channel edits that force DB/PDF retests as a coupling smell",
      ru: "Квантифицировать усиление изменений: правки канала алертов, форсящие ретест DB/PDF, как smell coupling"
    },
    {
      en: "Decompose ReconciliationService into high-cohesion collaborators behind interfaces with a thin coordinator",
      ru: "Декомпозировать ReconciliationService на высоко-cohesive коллабораторы за интерфейсами с тонким coordinator"
    },
    {
      en: "Explain how low coupling via interfaces shrinks blast radius without claiming 'God Class bad' as the only argument",
      ru: "Объяснить, как низкий coupling через интерфейсы сужает blast radius без аргумента «God Class плох» как единственного"
    }
  ],
  requiredConceptIds: ["cpt_coupling", "cpt_cohesion"],
  recommendedConceptIds: ["cpt_interface_contracts", "cpt_dependency_inversion"],
  stageIds: COUPLING_COHESION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_cc_fix_builder", "chl_cc_bughunt", "chl_cc_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
