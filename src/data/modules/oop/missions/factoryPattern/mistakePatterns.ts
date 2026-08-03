import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_FACTORY: readonly MistakePattern[] = [
  {
    id: "err_scattered_new_concrete",
    code: "ERR_SCATTERED_NEW_CONCRETE",
    title: {
      en: "Scattered new of Concrete Report Classes",
      ru: "Разбросанные new Конкретных Классов Отчётов"
    },
    description: {
      en: "Constructing PdfComplianceReport, CsvComplianceReport, or XmlComplianceReport directly from multiple exporters instead of routing creation through ComplianceReportFactory.",
      ru: "Создание PdfComplianceReport, CsvComplianceReport или XmlComplianceReport напрямую из нескольких экспортёров вместо маршрутизации создания через ComplianceReportFactory."
    },
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    exampleIncorrectReasoning: {
      en: "Calling new CsvComplianceReport() at each export site is fine because the class name documents the format.",
      ru: "Вызов new CsvComplianceReport() на каждом export site нормален, потому что имя класса документирует формат."
    },
    correctedReasoning: {
      en: "Scattered new couples clients to concrete classes and duplicates format selection. Centralize in ComplianceReportFactory returning ComplianceReport.",
      ru: "Разбросанные new связывают клиентов с конкретными классами и дублируют выбор формата. Централизуйте в ComplianceReportFactory, возвращающей ComplianceReport."
    },
    remediationMissionIds: ["mis_factory_pattern"]
  },
  {
    id: "err_silent_format_default",
    code: "ERR_SILENT_FORMAT_DEFAULT",
    title: {
      en: "Silent Default-to-PDF on Unknown Format Codes",
      ru: "Тихий Default-to-PDF на Неизвестных Кодах Формата"
    },
    description: {
      en: "Falling through unrecognized or mistyped format strings to new PdfComplianceReport() instead of failing fast with an exception.",
      ru: "Fallthrough нераспознанных или с опечаткой строк формата в new PdfComplianceReport() вместо fail-fast исключения."
    },
    conceptIds: ["cpt_factory_pattern"],
    exampleIncorrectReasoning: {
      en: "Defaulting to PDF keeps exports from failing when someone typos the format code.",
      ru: "Default к PDF не даёт экспорту упасть при опечатке в коде формата."
    },
    correctedReasoning: {
      en: "Silent defaults ship the wrong regulatory product. Factory must throw UnknownReportFormatException (or equivalent) for unknown codes.",
      ru: "Тихие defaults отправляют неверный регуляторный продукт. Factory должна бросать UnknownReportFormatException (или эквивалент) на неизвестных кодах."
    },
    remediationMissionIds: ["mis_factory_pattern"]
  },
  {
    id: "err_format_string_typo_branch",
    code: "ERR_FORMAT_STRING_TYPO_BRANCH",
    title: {
      en: "Format String Typo in Creation Branch (CVS vs CSV)",
      ru: "Опечатка Строки Формата в Ветке Создания (CVS vs CSV)"
    },
    description: {
      en: "Comparing format codes against a mistyped literal such as \"CVS\" so legitimate \"CSV\" requests never select CsvComplianceReport.",
      ru: "Сравнение кодов формата с ошибочным литералом вроде \"CVS\", из-за чего легитимные \"CSV\"-запросы никогда не выбирают CsvComplianceReport."
    },
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    exampleIncorrectReasoning: {
      en: "String equality in if-else is enough; typos will be obvious in code review.",
      ru: "Строковое равенство в if-else достаточно; опечатки будут очевидны на код-ревью."
    },
    correctedReasoning: {
      en: "Centralize codes in a tested factory (enum/constants + table-driven tests asserting runtime type for CSV/PDF/XML and exceptions for typos like CVS).",
      ru: "Централизуйте коды в протестированной factory (enum/constants + table-driven тесты на runtime-тип для CSV/PDF/XML и exceptions для опечаток вроде CVS)."
    },
    remediationMissionIds: ["mis_factory_pattern"]
  },
  {
    id: "err_factory_without_abstraction",
    code: "ERR_FACTORY_WITHOUT_ABSTRACTION",
    title: {
      en: "Factory Returning Concrete Types to Clients",
      ru: "Factory, Возвращающая Конкретные Типы Клиентам"
    },
    description: {
      en: "Exposing createPdf()/createCsv() return types as concrete classes so exporters still depend on implementations instead of ComplianceReport.",
      ru: "Публикация createPdf()/createCsv() с возвращаемыми конкретными типами, из-за чего экспортёры всё ещё зависят от реализаций вместо ComplianceReport."
    },
    conceptIds: ["cpt_creational_decoupling", "cpt_factory_pattern"],
    exampleIncorrectReasoning: {
      en: "Returning PdfComplianceReport from the factory is fine because callers need PDF-specific methods.",
      ru: "Возврат PdfComplianceReport из factory нормален, потому что вызывающим нужны PDF-specific методы."
    },
    correctedReasoning: {
      en: "Return ComplianceReport (or a narrow product interface). PDF-specific behavior belongs behind the interface or a segregated capability — not leaked concrete types.",
      ru: "Возвращайте ComplianceReport (или узкий product-интерфейс). PDF-specific поведение — за интерфейсом или segregated capability, не утечкой конкретных типов."
    },
    remediationMissionIds: ["mis_factory_pattern"]
  },
  {
    id: "err_factory_vs_abstract_factory",
    code: "ERR_FACTORY_VS_ABSTRACT_FACTORY",
    title: {
      en: "Confusing Factory Method with Abstract Factory",
      ru: "Путаница Factory Method с Abstract Factory"
    },
    description: {
      en: "Treating simple format-to-ComplianceReport selection as requiring a full Abstract Factory of product families.",
      ru: "Считая, что простой выбор format→ComplianceReport требует полного Abstract Factory семейств продуктов."
    },
    conceptIds: ["cpt_factory_pattern"],
    exampleIncorrectReasoning: {
      en: "Any Factory Pattern usage must introduce AbstractFactory, AbstractProductA, and AbstractProductB hierarchies.",
      ru: "Любое использование Factory Pattern должно вводить иерархии AbstractFactory, AbstractProductA и AbstractProductB."
    },
    correctedReasoning: {
      en: "Simple factory / Factory Method fits one product type selected by format code. Abstract Factory is for families of related products — overkill for Pdf/Csv/Xml alone.",
      ru: "Simple factory / Factory Method подходит для одного типа продукта по коду формата. Abstract Factory — для семейств связанных продуктов; избыточен только для Pdf/Csv/Xml."
    },
    remediationMissionIds: ["mis_factory_pattern"]
  }
];
