import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_FA: FixBuilderChallenge = {
  id: "chl_fa_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_factory_pattern",
  stageId: "stg_fa_practice",
  title: {
    en: "Fix Builder: Centralize ComplianceReport Creation",
    ru: "Конструктор Исправления: Централизация Создания ComplianceReport"
  },
  prompt: {
    en: "ComplianceExportService scatters `new PdfComplianceReport()` / `new CsvComplianceReport()` / `new XmlComplianceReport()` with a silent PDF default. Select ALL structural building blocks required for a production Factory Pattern fix.",
    ru: "ComplianceExportService разбрасывает `new PdfComplianceReport()` / `new CsvComplianceReport()` / `new XmlComplianceReport()` с тихим PDF default. Выберите ВСЕ элементы, необходимые для продакшн-фикса через Factory Pattern."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
  topicIds: ["top_oop_27"],
  tags: ["#factory-pattern", "#creational", "#compliance"],
  hintIds: ["hnt_fa_1", "hnt_fa_2", "hnt_fa_3", "hnt_fa_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_fa_export_service_broken",
    solutionCodeArtifactId: "art_fa_factory_solution",
    options: [
      {
        id: "opt_fa_fix_1",
        text: {
          en: "Introduce ComplianceReportFactory.create(formatCode) returning ComplianceReport, with switch/map of PDF/CSV/XML and throw on unknown codes.",
          ru: "Ввести ComplianceReportFactory.create(formatCode), возвращающую ComplianceReport, со switch/map PDF/CSV/XML и throw на неизвестных кодах."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Centralized Factory Method / simple factory with fail-fast validation is the core fix.",
          ru: "Верно. Централизованная Factory Method / simple factory с fail-fast валидацией — ядро фикса."
        }
      },
      {
        id: "opt_fa_fix_2",
        text: {
          en: "Keep scattered new call sites but rename variables from pdfReport to report for clarity.",
          ru: "Оставить разбросанные new, но переименовать переменные из pdfReport в report для ясности."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Renaming does not remove coupling to concrete classes or the silent PDF default.",
          ru: "Неверно. Переименование не устраняет связность с конкретными классами и тихий PDF default."
        }
      },
      {
        id: "opt_fa_fix_3",
        text: {
          en: "Make ComplianceExportService depend only on ComplianceReport interface; obtain instances via the factory, never new concrete reports.",
          ru: "Заставить ComplianceExportService зависеть только от интерфейса ComplianceReport; получать экземпляры через factory, никогда не new конкретных отчётов."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Creational decoupling: exporters use the abstraction; factory owns concrete construction.",
          ru: "Верно. Creational decoupling: экспортёры используют абстракцию; factory владеет конкретной конструкцией."
        }
      },
      {
        id: "opt_fa_fix_4",
        text: {
          en: "On unrecognized format strings, return new PdfComplianceReport() so exports never fail.",
          ru: "На нераспознанных строках формата возвращать new PdfComplianceReport(), чтобы экспорт никогда не падал."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Silent PDF default caused the regulatory mis-export incident — always fail fast.",
          ru: "Неверно. Тихий PDF default вызвал инцидент mis-export — всегда fail-fast."
        }
      },
      {
        id: "opt_fa_fix_distractor_1",
        text: {
          en: "Delete CsvComplianceReport and XmlComplianceReport; force all filings through PDF only.",
          ru: "Удалить CsvComplianceReport и XmlComplianceReport; все filing только через PDF."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Regulators require multiple formats — removing products is not an architecture fix.",
          ru: "Неверно. Регуляторы требуют несколько форматов — удаление продуктов не архитектурный фикс."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_FA: BugHuntChallenge = {
  id: "chl_fa_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_factory_pattern",
  stageId: "stg_fa_debug",
  title: {
    en: "Bug Hunt: CVS Typo Silent PDF Fallthrough",
    ru: "Поиск Бага: Опечатка CVS → Тихий PDF Fallthrough"
  },
  prompt: {
    en: "ComplianceExportService compiles and unit tests pass, but CSV filings arrive as PDF. Click the line(s) responsible for the silent wrong product.",
    ru: "ComplianceExportService компилируется и юнит-тесты зелёные, но CSV filing приходят как PDF. Нажмите строку(и), ответственные за тихий неверный продукт."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
  topicIds: ["top_oop_27"],
  tags: ["#factory-pattern", "#bug-hunt", "#compliance"],
  hintIds: ["hnt_fa_bug_1", "hnt_fa_bug_2", "hnt_fa_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_fa_bughunt_export",
    solutionCodeArtifactId: "art_fa_factory_solution",
    codeSnippet: `public class ComplianceExportService {

    public ComplianceReport createReport(String format) {
        if ("PDF".equalsIgnoreCase(format)) {
            return new PdfComplianceReport(); // Line 4
        }
        if ("CVS".equalsIgnoreCase(format)) { // Line 6 — typo!
            return new CsvComplianceReport(); // Line 7
        }
        if ("XML".equalsIgnoreCase(format)) {
            return new XmlComplianceReport(); // Line 10
        }
        return new PdfComplianceReport(); // Line 12 — silent default
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class ComplianceExportService {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "    public ComplianceReport createReport(String format) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "        if (\"PDF\".equalsIgnoreCase(format)) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "            return new PdfComplianceReport();", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 6,
        code: "        if (\"CVS\".equalsIgnoreCase(format)) {",
        isBug: true,
        explanation: {
          en: "Line 6: Typo \"CVS\" instead of \"CSV\" — legitimate CSV requests never match this branch.",
          ru: "Строка 6: Опечатка \"CVS\" вместо \"CSV\" — легитимные CSV-запросы никогда не попадают в эту ветку."
        }
      },
      { lineNumber: 7, code: "            return new CsvComplianceReport();", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "        }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "        if (\"XML\".equalsIgnoreCase(format)) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "            return new XmlComplianceReport();", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "        }", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 12,
        code: "        return new PdfComplianceReport();",
        isBug: true,
        explanation: {
          en: "Line 12: Silent default-to-PDF — after the CVS typo, CSV requests fall through here with no exception.",
          ru: "Строка 12: Тихий default-to-PDF — после опечатки CVS CSV-запросы падают сюда без исключения."
        }
      },
      { lineNumber: 13, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 14, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_FA: InterviewAnswerChallenge = {
  id: "chl_fa_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_factory_pattern",
  stageId: "stg_fa_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Factory for Compliance Reports",
    ru: "Устный Ответ на Senior-Интервью: Factory для Compliance-Отчётов"
  },
  prompt: {
    en: "ComplianceExportService scatters new Pdf/Csv/XmlComplianceReport() and a typo silently shipped PDF when CSV was requested. Explain the root cause, Factory Pattern fix, and production trade-offs to the interviewer.",
    ru: "ComplianceExportService разбрасывает new Pdf/Csv/XmlComplianceReport(), а опечатка молча отправила PDF вместо CSV. Объясните интервьюеру корневую причину, фикс Factory Pattern и продакшн-компромиссы."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
  topicIds: ["top_oop_27"],
  tags: ["#factory-pattern", "#interview", "#compliance"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_fa_compliance_01",
    rubricDimensions: ["ELEVATOR_PITCH", "JLS_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_factory_pattern",
        label: { en: "Factory Method / Simple Factory", ru: "Factory Method / Simple Factory" },
        keywords: ["factory", "factory method", "simple factory", "ComplianceReportFactory", "create(", "фабрика", "factory pattern"]
      },
      {
        id: "cpt_creational_decoupling",
        label: { en: "Creational Decoupling from Concrete Classes", ru: "Creational Decoupling от Конкретных Классов" },
        keywords: ["decouple", "concrete", "new Pdf", "scattered new", "abstraction", "ComplianceReport", "развязка", "конкретн"]
      },
      {
        id: "cpt_fail_fast_format",
        label: { en: "Fail-Fast Format Validation", ru: "Fail-Fast Валидация Формата" },
        keywords: ["fail fast", "CVS", "typo", "unknown format", "IllegalArgument", "silent default", "опечатк", "валидац"]
      },
      {
        id: "cpt_abstract_factory_contrast",
        label: { en: "Factory vs Abstract Factory Contrast", ru: "Контраст Factory vs Abstract Factory" },
        keywords: ["abstract factory", "product family", "семейств", "vs factory"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): ComplianceExportService was coupled to concrete Pdf/Csv/Xml report classes via scattered new and fragile if-else. A CVS typo fell through to a silent PDF default, so CSV filings shipped wrong without exceptions. Fix: ComplianceReportFactory.create(format) returning ComplianceReport, validating codes and throwing on unknowns.",
      ru: "Elevator Pitch (30 сек): ComplianceExportService был связан с конкретными Pdf/Csv/Xml классами через разбросанные new и хрупкие if-else. Опечатка CVS падала в тихий PDF default — CSV filing уходили неверно без исключений. Фикс: ComplianceReportFactory.create(format), возвращающая ComplianceReport, валидирующая коды и бросающая на неизвестных."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Factory Method / simple factory centralizes the creational decision. Clients depend on ComplianceReport; only the factory names PdfComplianceReport, CsvComplianceReport, XmlComplianceReport. Normalize format codes, map known values, throw UnknownReportFormatException otherwise. This is creational decoupling — related to Effective Java Item 1 static factories for named construction, distinct from Abstract Factory which builds product families.",
      ru: "Глубокая Механика (60 сек): Factory Method / simple factory централизует creational-решение. Клиенты зависят от ComplianceReport; только factory называет PdfComplianceReport, CsvComplianceReport, XmlComplianceReport. Нормализуйте коды формата, сопоставьте известные, иначе throw UnknownReportFormatException. Это creational decoupling — родственно Effective Java Item 1 static factories для именованного создания, отлично от Abstract Factory, строящей семейства продуктов."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): A switch inside the factory still changes when formats are added — clients stay closed. For pluggable formats use a Map registry or SPI. Inject an instance factory when creation needs collaborators. Pair with ArchUnit forbidding new *ComplianceReport outside the factory package, and tests asserting runtime type plus content-type — never only non-null.",
      ru: "Продакшн Компромиссы (30 сек): Switch внутри factory всё ещё меняется при добавлении форматов — клиенты остаются закрыты. Для pluggable форматов — Map registry или SPI. Инжектите instance factory, когда созданию нужны коллабораторы. Добавьте ArchUnit, запрещающий new *ComplianceReport вне пакета factory, и тесты на runtime-тип плюс content-type — никогда только non-null."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Would Abstract Factory be a better fit here than simple factory?'",
      ru: "Доп. Вопрос Интервьюера: 'Был бы Abstract Factory здесь лучше, чем simple factory?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Not yet. We create one product type selected by format code — simple factory / Factory Method is enough. Abstract Factory pays off when we need families of related products (e.g., ReportWriter + SchemaValidator + Watermarker per region). Introducing Abstract Factory for three report classes alone is over-engineering.",
      ru: "Ответ на Доп. Вопрос: Пока нет. Мы создаём один тип продукта по коду формата — достаточно simple factory / Factory Method. Abstract Factory окупается, когда нужны семейства связанных продуктов (например, ReportWriter + SchemaValidator + Watermarker на регион). Вводить Abstract Factory только ради трёх классов отчётов — over-engineering."
    }
  }
};

export const ALL_FACTORY_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_FA,
  APPLIED_BUG_HUNT_CHALLENGE_FA,
  INTERVIEW_ANSWER_CHALLENGE_FA
];
