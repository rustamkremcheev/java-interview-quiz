import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_fa_intro",
  missionId: "mis_factory_pattern",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the compliance export incident below where CSV regulatory filings were silently delivered as PDF binaries.",
    ru: "Изучите инцидент экспорта compliance-отчётов, где CSV-файлы для регулятора молча уходили как PDF-бинарники."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_fa_problem",
  missionId: "mis_factory_pattern",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine ComplianceExportService — scattered `new PdfComplianceReport()`, `new CsvComplianceReport()`, and `new XmlComplianceReport()` driven by fragile format-string if-else chains.",
    ru: "Изучите ComplianceExportService — разбросанные `new PdfComplianceReport()`, `new CsvComplianceReport()` и `new XmlComplianceReport()` на хрупких if-else цепочках по строкам формата."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_fa_think",
  missionId: "mis_factory_pattern",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why did a single typo in a format string cause CSV requests to produce PdfComplianceReport without any exception?",
    ru: "Сформулируйте гипотезу: почему одна опечатка в строке формата привела к созданию PdfComplianceReport на CSV-запросах без исключения?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_fa_help",
  missionId: "mis_factory_pattern",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to deep theory on Factory Method / simple factory, creational decoupling, and format-code validation.",
    ru: "Бесштрафной переход к теории Factory Method / simple factory, creational decoupling и валидации кодов формата."
  }
};

const stage5: TheoryStage = {
  id: "stg_fa_theory",
  missionId: "mis_factory_pattern",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering Factory Method, creational decoupling, validation of format codes, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о Factory Method, creational decoupling, валидации кодов формата и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_factory"
};

const stage6: BaseMissionStage = {
  id: "stg_fa_visual",
  missionId: "mis_factory_pattern",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Factory Decoupling Visualization", ru: "6. Визуализация Развязки через Factory" },
  instructions: {
    en: "Compare client code coupled to concrete Pdf/Csv/Xml report classes against ComplianceReportFactory returning the ComplianceReport interface.",
    ru: "Сравните клиентский код, связанный с конкретными Pdf/Csv/Xml классами, и ComplianceReportFactory, возвращающий интерфейс ComplianceReport."
  }
};

const stage7: PracticeStage = {
  id: "stg_fa_practice",
  missionId: "mis_factory_pattern",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to centralize ComplianceReport creation and validate format codes in ComplianceReportFactory.",
    ru: "Соберите элементы кода для централизации создания ComplianceReport и валидации кодов формата в ComplianceReportFactory."
  },
  challengeId: "chl_fa_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_fa_interview_q",
  missionId: "mis_factory_pattern",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about scattered `new` keywords and Factory Pattern for compliance report exporters.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о разбросанных `new` и паттерне Factory для экспортёров compliance-отчётов."
  },
  interviewQuestionId: "q_fa_compliance_01",
  challengeId: "chl_fa_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_fa_interview_a",
  missionId: "mis_factory_pattern",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Factory Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Factory + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_fa_compliance_01",
  challengeId: "chl_fa_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_fa_debug",
  missionId: "mis_factory_pattern",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Format Typo Silent PDF", ru: "10. Поиск Бага: Опечатка Формата → Тихий PDF" },
  instructions: {
    en: "Identify the line in ComplianceExportService where a format-string typo silently creates PdfComplianceReport when CSV was requested.",
    ru: "Найдите строку в ComplianceExportService, где опечатка в строке формата молча создаёт PdfComplianceReport вместо запрошенного CSV."
  },
  challengeId: "chl_fa_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_fa_related",
  missionId: "mis_factory_pattern",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to object creation patterns, dependency injection, and interface contracts.",
    ru: "Исследуйте связи Графа Знаний для перехода к паттернам создания объектов, dependency injection и контрактам интерфейсов."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_fa_results",
  missionId: "mis_factory_pattern",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_fa_reflection",
  missionId: "mis_factory_pattern",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which Factory Pattern rule you will enforce in code reviews for report exporters.",
    ru: "Напишите 1 предложение о том, какое правило Factory Pattern вы введёте на код-ревью для экспортёров отчётов."
  }
};

export const FACTORY_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const FACTORY_PATTERN_MISSION: Mission = {
  id: "mis_factory_pattern",
  primaryTopicId: "top_oop_27",
  secondaryTopicIds: ["top_oop_25", "top_oop_09", "top_oop_24"],
  slug: "compliance-report-factory-leak",
  title: {
    en: "Scattered new Keywords: Factory Pattern for ComplianceReportExporter",
    ru: "Разбросанные new: Паттерн Factory для ComplianceReportExporter"
  },
  description: {
    en: "Eliminate scattered `new PdfComplianceReport()` / `new CsvComplianceReport()` / `new XmlComplianceReport()` call sites in ComplianceExportService by introducing ComplianceReportFactory with centralized format-code validation — stopping silent PDF-for-CSV mis-exports.",
    ru: "Устраните разбросанные `new PdfComplianceReport()` / `new CsvComplianceReport()` / `new XmlComplianceReport()` в ComplianceExportService, введя ComplianceReportFactory с централизованной валидацией кодов формата — остановив тихие PDF-вместо-CSV экспорты."
  },
  scenarioIntroduction: {
    en: "At 14:17 UTC the compliance filing desk rejected overnight exports: regulators expected pipe-delimited CSV but received PDF binaries. ComplianceExportService had grown if-else chains of `new PdfComplianceReport()`, `new CsvComplianceReport()`, and `new XmlComplianceReport()` across three microservices. A typo comparing format to `\"CVS\"` instead of `\"CSV\"` fell through to the PDF default branch — no exception, green unit tests that only asserted non-null reports, and 312 misfiled filings before detection.",
    ru: "В 14:17 UTC compliance desk отклонил ночные экспорты: регулятор ждал pipe-delimited CSV, а получил PDF-бинарники. ComplianceExportService оброс if-else цепочками `new PdfComplianceReport()`, `new CsvComplianceReport()` и `new XmlComplianceReport()` в трёх микросервисах. Опечатка сравнения формата с `\"CVS\"` вместо `\"CSV\"` падала в ветку PDF по умолчанию — без исключения, зелёные юнит-тесты, проверяющие только non-null, и 312 неверных filing до обнаружения."
  },
  engineeringProblem: {
    en: "Clients are coupled to concrete PdfComplianceReport, CsvComplianceReport, and XmlComplianceReport classes. Format selection is duplicated if-else logic with a silent default-to-PDF branch on unrecognized strings. Wrong format codes never fail fast. Solution: Factory Method / simple factory (`ComplianceReportFactory.create(formatCode)`) that validates known codes (PDF/CSV/XML), throws on unknown formats, and returns the ComplianceReport interface so exporters depend on the abstraction.",
    ru: "Клиенты связаны с конкретными PdfComplianceReport, CsvComplianceReport и XmlComplianceReport. Выбор формата — дублированные if-else с тихой веткой default-to-PDF на неизвестных строках. Неверные коды формата не fail-fast. Решение: Factory Method / simple factory (`ComplianceReportFactory.create(formatCode)`), валидирующая известные коды (PDF/CSV/XML), бросающая на неизвестных форматах и возвращающая интерфейс ComplianceReport, чтобы экспортёры зависели от абстракции."
  },
  learningObjectives: [
    {
      en: "Explain why scattered `new ConcreteClass()` couples clients to implementations and blocks format evolution",
      ru: "Объяснять, почему разбросанные `new ConcreteClass()` связывают клиентов с реализациями и блокируют эволюцию форматов"
    },
    {
      en: "Apply Factory Method / simple factory to centralize ComplianceReport creation behind ComplianceReportFactory",
      ru: "Применять Factory Method / simple factory для централизации создания ComplianceReport за ComplianceReportFactory"
    },
    {
      en: "Validate format codes fail-fast instead of silent default-to-PDF fallthrough on typos",
      ru: "Валидировать коды формата fail-fast вместо тихого default-to-PDF при опечатках"
    },
    {
      en: "Contrast Factory with Abstract Factory and Static Factory Methods (Effective Java Item 1)",
      ru: "Сравнивать Factory с Abstract Factory и Static Factory Methods (Effective Java Item 1)"
    }
  ],
  requiredConceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
  recommendedConceptIds: ["cpt_static_factory_methods", "cpt_dependency_inversion"],
  stageIds: FACTORY_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_fa_fix_builder", "chl_fa_bughunt", "chl_fa_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
