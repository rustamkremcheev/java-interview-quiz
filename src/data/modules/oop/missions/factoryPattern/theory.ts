import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_FACTORY: TheoryArticle = {
  id: "art_theory_factory",
  topicIds: ["top_oop_27"],
  conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
  title: {
    en: "Factory Pattern & Creational Decoupling for Compliance Reports",
    ru: "Паттерн Factory и Creational Decoupling для Compliance-Отчётов"
  },
  summary: {
    en: "Factory Method (and the related simple factory) centralizes object creation so clients depend on ComplianceReport rather than Pdf/Csv/Xml concrete classes. Format-code validation belongs in the factory — silent default branches turn typos into regulatory mis-exports.",
    ru: "Factory Method (и related simple factory) централизует создание объектов, чтобы клиенты зависели от ComplianceReport, а не от конкретных Pdf/Csv/Xml классов. Валидация кодов формата принадлежит фабрике — тихие default-ветки превращают опечатки в регуляторные mis-exports."
  },
  sections: [
    {
      id: "sec_fa_definition",
      category: "DEFINITION",
      title: {
        en: "1. Factory Pattern: Centralizing Creation of ComplianceReport",
        ru: "1. Паттерн Factory: Централизация Создания ComplianceReport"
      },
      blocks: [
        {
          id: "blk_fa_def_1",
          type: "PARAGRAPH",
          content: {
            en: "The GoF Factory Method pattern defines an interface for creating an object, but lets subclasses (or a dedicated factory class in the simple-factory variant) decide which concrete class to instantiate. In the compliance domain, `ComplianceReportFactory.create(String formatCode)` returns `ComplianceReport` — the caller never names `PdfComplianceReport`, `CsvComplianceReport`, or `XmlComplianceReport`.",
            ru: "Паттерн GoF Factory Method определяет интерфейс создания объекта, но позволяет подклассам (или выделенному factory-классу в варианте simple factory) решать, какой конкретный класс инстанцировать. В compliance-домене `ComplianceReportFactory.create(String formatCode)` возвращает `ComplianceReport` — вызывающий код никогда не называет `PdfComplianceReport`, `CsvComplianceReport` или `XmlComplianceReport`."
          }
        },
        {
          id: "blk_fa_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Clients Depend on Abstractions",
            ru: "💡 Главная Ментальная Модель: Клиенты Зависят от Абстракций"
          },
          content: {
            en: "When ComplianceExportService scatters `new CsvComplianceReport()` across services, every new format (JSON, XBRL) requires hunting down every call site. A factory makes creation a single decision point: add one branch (or registry entry), keep exporters untouched. Creational decoupling means the *what to create* decision is separated from the *how to use the report* logic.",
            ru: "Когда ComplianceExportService разбрасывает `new CsvComplianceReport()` по сервисам, каждый новый формат (JSON, XBRL) требует поиска всех call site. Factory делает создание единой точкой решения: добавить одну ветку (или запись в registry), экспортёры не трогать. Creational decoupling означает: решение *что создать* отделено от логики *как использовать отчёт*."
          }
        }
      ]
    },
    {
      id: "sec_fa_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Mechanics: Format Codes, Validation, and Fail-Fast Creation",
        ru: "2. Механика: Коды Формата, Валидация и Fail-Fast Создание"
      },
      blocks: [
        {
          id: "blk_fa_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "A production ComplianceReportFactory typically normalizes the format code (`trim().toUpperCase()`), matches known values (`PDF`, `CSV`, `XML`), and constructs the matching implementation. Unknown or mistyped codes must throw (`IllegalArgumentException` or a domain `UnknownReportFormatException`) — never silently return PDF. The broken ComplianceExportService compared against `\"CVS\"` (typo) and fell through to `new PdfComplianceReport()`, which is exactly the anti-pattern Factory eliminates.",
            ru: "Продакшн ComplianceReportFactory обычно нормализует код формата (`trim().toUpperCase()`), сопоставляет известные значения (`PDF`, `CSV`, `XML`) и создаёт соответствующую реализацию. Неизвестные или с опечаткой коды должны бросать (`IllegalArgumentException` или доменный `UnknownReportFormatException`) — никогда молча не возвращать PDF. Сломанный ComplianceExportService сравнивал с `\"CVS\"` (опечатка) и падал в `new PdfComplianceReport()` — именно тот антипаттерн, который устраняет Factory."
          }
        },
        {
          id: "blk_fa_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Silent Default Branches Are Regulatory Bugs",
            ru: "⚙️ Тихие Default-Ветки — Регуляторные Баги"
          },
          content: {
            en: "```java\n// ANTI-PATTERN — silent wrong product\nif (\"PDF\".equals(format)) return new PdfComplianceReport();\nif (\"CVS\".equals(format)) return new CsvComplianceReport(); // typo!\nreturn new PdfComplianceReport(); // silent default\n\n// FACTORY — fail fast\nreturn switch (normalize(format)) {\n    case \"PDF\" -> new PdfComplianceReport();\n    case \"CSV\" -> new CsvComplianceReport();\n    case \"XML\" -> new XmlComplianceReport();\n    default -> throw new UnknownReportFormatException(format);\n};\n```\nUnit tests that only assert `report != null` will never catch the typo branch.",
            ru: "```java\n// АНТИПАТТЕРН — тихо неверный продукт\nif (\"PDF\".equals(format)) return new PdfComplianceReport();\nif (\"CVS\".equals(format)) return new CsvComplianceReport(); // опечатка!\nreturn new PdfComplianceReport(); // тихий default\n\n// FACTORY — fail fast\nreturn switch (normalize(format)) {\n    case \"PDF\" -> new PdfComplianceReport();\n    case \"CSV\" -> new CsvComplianceReport();\n    case \"XML\" -> new XmlComplianceReport();\n    default -> throw new UnknownReportFormatException(format);\n};\n```\nЮнит-тесты, проверяющие только `report != null`, никогда не поймают ветку с опечаткой."
          }
        },
        {
          id: "blk_fa_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Factory Method vs Simple Factory vs Abstract Factory",
            ru: "📜 Factory Method vs Simple Factory vs Abstract Factory"
          },
          content: {
            en: "Simple factory: one class with a static/instance `create(format)` method (sufficient for ComplianceReportExporter). Factory Method (GoF): creator hierarchy where subclasses override `createReport()`. Abstract Factory: families of related products (e.g., PDF+CSV writers for region US vs EU). For this mission, simple factory / Factory Method centralizing creation is the production fix; Abstract Factory is overkill until you need product families.",
            ru: "Simple factory: один класс со static/instance методом `create(format)` (достаточно для ComplianceReportExporter). Factory Method (GoF): иерархия creator, где подклассы переопределяют `createReport()`. Abstract Factory: семейства связанных продуктов (например, PDF+CSV writers для регионов US vs EU). Для этой миссии simple factory / Factory Method с централизацией создания — продакшн-фикс; Abstract Factory избыточен, пока не нужны семейства продуктов."
          }
        }
      ]
    },
    {
      id: "sec_fa_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Factory vs DI Registry vs Switch Everywhere",
        ru: "3. Компромиссы: Factory vs DI Registry vs Switch Повсюду"
      },
      blocks: [
        {
          id: "blk_fa_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Centralizing `new` in ComplianceReportFactory still keeps a switch/map of concrete classes inside the factory — that is intentional. The Open-Closed Principle is improved for *clients* (exporters), not necessarily for the factory itself. Extending formats without touching the factory requires a registry (`Map<String, Supplier<ComplianceReport>>`) or SPI/`ServiceLoader` — useful at plugin scale, heavier for three fixed regulatory formats.",
            ru: "Централизация `new` в ComplianceReportFactory всё ещё оставляет switch/map конкретных классов внутри фабрики — это намеренно. Open-Closed улучшается для *клиентов* (экспортёров), не обязательно для самой фабрики. Расширение форматов без правки фабрики требует registry (`Map<String, Supplier<ComplianceReport>>`) или SPI/`ServiceLoader` — полезно на plugin-масштабе, тяжелее для трёх фиксированных регуляторных форматов."
          }
        },
        {
          id: "blk_fa_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Related: Effective Java Item 1 Static Factory Methods",
            ru: "🔧 Связанное: Effective Java Item 1 Static Factory Methods"
          },
          content: {
            en: "Joshua Bloch's static factory methods (`ComplianceReport.ofPdf()`) name intent, can cache, and return subtypes — they are related but not identical to GoF Factory Method. A team might expose `ComplianceReports.csv()` as a static factory *and* route format-string selection through `ComplianceReportFactory.create(code)` for wire/config-driven exporters. Prefer both: named static factories for known call sites, validated factory for dynamic format codes from APIs.",
            ru: "Static factory methods Джошуа Блоха (`ComplianceReport.ofPdf()`) именуют намерение, могут кэшировать и возвращать подтипы — родственны, но не идентичны GoF Factory Method. Команда может предоставить `ComplianceReports.csv()` как static factory *и* направлять выбор по строке формата через `ComplianceReportFactory.create(code)` для wire/config-driven экспортёров. Предпочитайте оба: именованные static factories для известных call site, валидируемую factory для динамических кодов формата из API."
          }
        }
      ]
    },
    {
      id: "sec_fa_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Factory Pattern",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Паттерн Factory"
      },
      blocks: [
        {
          id: "blk_fa_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why not keep if-else with `new` inside ComplianceExportService?' — Model Answer: Creation logic duplicates across services, couples exporters to concrete classes, and makes format typos a silent product bug. Factory centralizes validation and returns the interface.",
            ru: "Доп. Вопрос 1: 'Почему не оставить if-else с `new` внутри ComplianceExportService?' — Модельный Ответ: Логика создания дублируется по сервисам, связывает экспортёры с конкретными классами и делает опечатки формата тихим продуктовым багом. Factory централизует валидацию и возвращает интерфейс."
          }
        },
        {
          id: "blk_fa_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Is this Factory Method or Abstract Factory?' — Model Answer: For one product type (ComplianceReport) selected by format code, it is simple factory / Factory Method. Abstract Factory would create families of related objects (e.g., ReportWriter + ReportValidator per region).",
            ru: "Доп. Вопрос 2: 'Это Factory Method или Abstract Factory?' — Модельный Ответ: Для одного типа продукта (ComplianceReport), выбираемого по коду формата, это simple factory / Factory Method. Abstract Factory создавала бы семейства связанных объектов (например, ReportWriter + ReportValidator на регион)."
          }
        },
        {
          id: "blk_fa_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'How does Factory relate to Dependency Injection?' — Model Answer: DI injects the factory (or a `Map` of suppliers) into ComplianceExportService. The service never calls `new` on report classes; the factory (or Spring beans) owns construction. Factory decides *which* implementation; DI decides *who provides* the factory.",
            ru: "Доп. Вопрос 3: 'Как Factory связана с Dependency Injection?' — Модельный Ответ: DI инжектит factory (или `Map` suppliers) в ComplianceExportService. Сервис никогда не вызывает `new` на классах отчётов; factory (или Spring beans) владеет конструкцией. Factory решает *какую* реализацию; DI решает *кто предоставляет* factory."
          }
        },
        {
          id: "blk_fa_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Should create() be static?' — Model Answer: Static `ComplianceReportFactory.create(code)` is fine for pure mapping with no dependencies. Instance factory is better when creation needs collaborators (templates, locale, watermarking service) — then inject the factory via constructor.",
            ru: "Доп. Вопрос 4: 'Должен ли create() быть static?' — Модельный Ответ: Static `ComplianceReportFactory.create(code)` уместен для чистого mapping без зависимостей. Instance factory лучше, когда созданию нужны коллабораторы (templates, locale, watermarking) — тогда инжектите factory через конструктор."
          }
        },
        {
          id: "blk_fa_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'What about switch expressions vs Map registry?' — Model Answer: Switch/expression is clear for a closed set of regulatory formats. A `Map<String, Supplier<ComplianceReport>>` registry supports runtime registration and Open-Closed extension without editing the factory class — prefer it when formats are pluggable.",
            ru: "Доп. Вопрос 5: 'Switch expressions vs Map registry?' — Модельный Ответ: Switch/expression ясен для закрытого набора регуляторных форматов. Registry `Map<String, Supplier<ComplianceReport>>` поддерживает runtime-регистрацию и OCP-расширение без правки класса фабрики — предпочитайте при pluggable форматах."
          }
        },
        {
          id: "blk_fa_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How do you test the factory?' — Model Answer: Table-driven tests: each valid code returns the expected runtime type (`instanceof CsvComplianceReport`); each invalid/typo code (`\"CVS\"`, `null`, `\"\"`) throws. Never test only non-null.",
            ru: "Доп. Вопрос 6: 'Как тестировать factory?' — Модельный Ответ: Table-driven тесты: каждый валидный код возвращает ожидаемый runtime-тип (`instanceof CsvComplianceReport`); каждый невалидный/опечатка (`\"CVS\"`, `null`, `\"\"`) бросает. Никогда не тестируйте только non-null."
          }
        },
        {
          id: "blk_fa_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Difference from Strategy pattern?' — Model Answer: Strategy encapsulates interchangeable *algorithms* used after the object exists. Factory encapsulates *which class to instantiate*. You may factory-create a Strategy implementation — they compose.",
            ru: "Доп. Вопрос 7: 'Отличие от Strategy?' — Модельный Ответ: Strategy инкапсулирует взаимозаменяемые *алгоритмы* после создания объекта. Factory инкапсулирует *какой класс инстанцировать*. Можно factory-создавать реализацию Strategy — паттерны композируются."
          }
        },
        {
          id: "blk_fa_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Why did production ship PDF for CSV without failing CI?' — Model Answer: The typo branch still returned a non-null ComplianceReport. Tests asserted export completed, not content-type/extension. Factory fail-fast plus content-type assertions would have blocked the release.",
            ru: "Доп. Вопрос 8: 'Почему в прод ушёл PDF вместо CSV без красного CI?' — Модельный Ответ: Ветка с опечаткой всё равно возвращала non-null ComplianceReport. Тесты проверяли завершение экспорта, не content-type/расширение. Factory fail-fast плюс assertions на content-type заблокировали бы релиз."
          }
        },
        {
          id: "blk_fa_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can the factory return cached instances?' — Model Answer: Only if reports are immutable/stateless. Most compliance reports hold filing data — prefer new instances per export. Caching belongs to static factories for value-like objects (Effective Java Item 1), not mutable report builders.",
            ru: "Доп. Вопрос 9: 'Может ли factory возвращать кэшированные экземпляры?' — Модельный Ответ: Только если отчёты immutable/stateless. Большинство compliance-отчётов держат данные filing — предпочитайте новые экземпляры на экспорт. Кэш — для static factories value-like объектов (Effective Java Item 1), не для мутабельных report builders."
          }
        },
        {
          id: "blk_fa_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How does this interact with Open-Closed Principle?' — Model Answer: Clients become closed for modification when formats are added. The factory (or registry) remains the extension point. True OCP for formats usually means registry/SPI, not an endless switch inside exporters.",
            ru: "Доп. Вопрос 10: 'Как это связано с Open-Closed Principle?' — Модельный Ответ: Клиенты становятся закрыты для модификации при добавлении форматов. Factory (или registry) остаётся точкой расширения. Настоящий OCP для форматов обычно значит registry/SPI, а не бесконечный switch в экспортёрах."
          }
        },
        {
          id: "blk_fa_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Would you put format validation in the controller instead?' — Model Answer: Validate at the boundary *and* in the factory. Controllers catch bad API input early; the factory is the last line of defense for any call path (batch jobs, schedulers, other services) that bypasses HTTP.",
            ru: "Доп. Вопрос 11: 'Валидировать формат в controller вместо factory?' — Модельный Ответ: Валидируйте на границе *и* в factory. Controllers ловят плохой API input рано; factory — последняя линия защиты для любого пути (batch, schedulers, другие сервисы), обходящего HTTP."
          }
        },
        {
          id: "blk_fa_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How would you migrate from scattered new without a big bang?' — Model Answer: Introduce ComplianceReportFactory, route new call sites through it, delete duplicated if-else gradually, add ArchUnit rule forbidding `new *ComplianceReport` outside the factory package, then remove the silent PDF default.",
            ru: "Доп. Вопрос 12: 'Как мигрировать с разбросанных new без big bang?' — Модельный Ответ: Ввести ComplianceReportFactory, провести новые call site через неё, постепенно удалить дублированные if-else, добавить ArchUnit-правило, запрещающее `new *ComplianceReport` вне пакета factory, затем убрать тихий PDF default."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_static_factory_methods"],
  sourceIds: ["src_gof_factory_method", "src_effective_java_item1", "src_baeldung_factory"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#factory-pattern", "#creational", "#compliance-reports"],
  estimatedMinutes: 18,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_FACTORY: readonly TheoryCheckpoint[] = [
  {
    id: "chk_fa_1",
    theoryArticleId: "art_theory_factory",
    question: {
      en: "What is the primary benefit of ComplianceReportFactory for ComplianceExportService?",
      ru: "В чём главная польза ComplianceReportFactory для ComplianceExportService?"
    },
    explanation: {
      en: "Clients depend on ComplianceReport and creation/validation is centralized — no scattered new of concrete report classes.",
      ru: "Клиенты зависят от ComplianceReport, а создание/валидация централизованы — без разбросанных new конкретных классов отчётов."
    },
    options: [
      {
        id: "opt_fa1_a",
        text: {
          en: "Centralizes creation and format validation so exporters depend on ComplianceReport, not concrete Pdf/Csv/Xml classes.",
          ru: "Централизует создание и валидацию формата, чтобы экспортёры зависели от ComplianceReport, а не от конкретных Pdf/Csv/Xml классов."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is creational decoupling via Factory Pattern.",
          ru: "Верно! Это creational decoupling через паттерн Factory."
        }
      },
      {
        id: "opt_fa1_b",
        text: {
          en: "Makes ComplianceReport instances immutable and thread-safe automatically.",
          ru: "Автоматически делает экземпляры ComplianceReport immutable и thread-safe."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Factory controls *creation*, not immutability or concurrency of the product.",
          ru: "Неверно. Factory управляет *созданием*, а не immutability или concurrency продукта."
        }
      },
      {
        id: "opt_fa1_c",
        text: {
          en: "Replaces the need for the ComplianceReport interface entirely.",
          ru: "Полностью устраняет необходимость в интерфейсе ComplianceReport."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The factory returns the interface — the abstraction is essential.",
          ru: "Неверно. Factory возвращает интерфейс — абстракция необходима."
        },
        misconceptionId: "err_factory_without_abstraction"
      }
    ],
    order: 1
  },
  {
    id: "chk_fa_2",
    theoryArticleId: "art_theory_factory",
    question: {
      en: "What should ComplianceReportFactory do when format code is the typo \"CVS\"?",
      ru: "Что должна делать ComplianceReportFactory при коде формата с опечаткой \"CVS\"?"
    },
    explanation: {
      en: "Fail fast with an exception — never silently default to PdfComplianceReport.",
      ru: "Fail-fast с исключением — никогда молча не дефолтить к PdfComplianceReport."
    },
    options: [
      {
        id: "opt_fa2_a",
        text: {
          en: "Throw UnknownReportFormatException (or IllegalArgumentException) after normalization.",
          ru: "Бросить UnknownReportFormatException (или IllegalArgumentException) после нормализации."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Fail-fast validation prevents silent PDF-for-CSV regulatory bugs.",
          ru: "Верно! Fail-fast валидация предотвращает тихие PDF-вместо-CSV регуляторные баги."
        }
      },
      {
        id: "opt_fa2_b",
        text: {
          en: "Return new PdfComplianceReport() as a safe default for unknown formats.",
          ru: "Вернуть new PdfComplianceReport() как безопасный default для неизвестных форматов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Silent PDF default is exactly the production bug in this mission.",
          ru: "Неверно. Тихий PDF default — именно продакшн-баг этой миссии."
        },
        misconceptionId: "err_silent_format_default"
      },
      {
        id: "opt_fa2_c",
        text: {
          en: "Return null and let ComplianceExportService skip the filing.",
          ru: "Вернуть null и позволить ComplianceExportService пропустить filing."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Returning null hides the error and risks NPE or skipped regulatory filings.",
          ru: "Неверно. Возврат null скрывает ошибку и рискует NPE или пропуском регуляторных filing."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_fa_3",
    theoryArticleId: "art_theory_factory",
    question: {
      en: "How does Factory Pattern differ from Abstract Factory in this compliance exporter scenario?",
      ru: "Чем Factory Pattern отличается от Abstract Factory в сценарии compliance-экспортёра?"
    },
    explanation: {
      en: "Factory creates one product type (ComplianceReport); Abstract Factory creates families of related products.",
      ru: "Factory создаёт один тип продукта (ComplianceReport); Abstract Factory создаёт семейства связанных продуктов."
    },
    options: [
      {
        id: "opt_fa3_a",
        text: {
          en: "Simple/Factory Method creates one ComplianceReport by format; Abstract Factory would create families of related products.",
          ru: "Simple/Factory Method создаёт один ComplianceReport по формату; Abstract Factory создавала бы семейства связанных продуктов."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! One product hierarchy vs families of related products.",
          ru: "Верно! Одна иерархия продукта vs семейства связанных продуктов."
        }
      },
      {
        id: "opt_fa3_b",
        text: {
          en: "They are identical — Abstract Factory is just another name for Factory Method.",
          ru: "Они идентичны — Abstract Factory просто другое имя для Factory Method."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. GoF treats them as distinct patterns with different intent and structure.",
          ru: "Неверно. GoF рассматривает их как разные паттерны с разным intent и структурой."
        },
        misconceptionId: "err_factory_vs_abstract_factory"
      },
      {
        id: "opt_fa3_c",
        text: {
          en: "Abstract Factory only works with Spring; Factory Method is for plain Java.",
          ru: "Abstract Factory работает только со Spring; Factory Method — для plain Java."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Both are language-agnostic design patterns, independent of Spring.",
          ru: "Неверно. Оба — language-agnostic паттерны проектирования, независимые от Spring."
        }
      }
    ],
    order: 3
  }
];
