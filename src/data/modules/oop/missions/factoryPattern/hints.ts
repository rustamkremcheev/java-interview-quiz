import { Hint } from '../../../../../types/domain';

export const HINTS_FACTORY: readonly Hint[] = [
  {
    id: "hnt_fa_1",
    challengeId: "chl_fa_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Count how many call sites construct PdfComplianceReport, CsvComplianceReport, or XmlComplianceReport directly — that duplication is the Factory smell.",
      ru: "Направляющая Подсказка: Посчитайте, сколько call site напрямую создают PdfComplianceReport, CsvComplianceReport или XmlComplianceReport — это дублирование и запах Factory."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_fa_2",
    challengeId: "chl_fa_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Factory Method / simple factory returns the ComplianceReport interface and owns the decision of which concrete class to instantiate.",
      ru: "Напоминание Концепции: Factory Method / simple factory возвращает интерфейс ComplianceReport и владеет решением, какой конкретный класс инстанцировать."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_fa_3",
    challengeId: "chl_fa_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Validate normalized format codes (PDF/CSV/XML) inside ComplianceReportFactory.create — throw on unknown codes instead of defaulting to PDF.",
      ru: "Механика Работы: Валидируйте нормализованные коды формата (PDF/CSV/XML) внутри ComplianceReportFactory.create — бросайте на неизвестных кодах вместо default-to-PDF."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_fa_4",
    challengeId: "chl_fa_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: ComplianceReport report = ComplianceReportFactory.create(formatCode); — exporters never call new Pdf/Csv/XmlComplianceReport().",
      ru: "Структура Решения: ComplianceReport report = ComplianceReportFactory.create(formatCode); — экспортёры никогда не вызывают new Pdf/Csv/XmlComplianceReport()."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_fa_bug_1",
    challengeId: "chl_fa_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: CSV filings become PDF with no exception. Which branch should match \"CSV\" but does not?",
      ru: "Направляющая Подсказка: CSV filing становятся PDF без исключения. Какая ветка должна совпадать с \"CSV\", но не совпадает?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_fa_bug_2",
    challengeId: "chl_fa_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: A typo in a string literal (\"CVS\") plus a silent default branch turns a format mismatch into the wrong product — not a compile error.",
      ru: "Напоминание Концепции: Опечатка в строковом литерале (\"CVS\") плюс тихая default-ветка превращает несовпадение формата в неверный продукт — не в ошибку компиляции."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_fa_bug_3",
    challengeId: "chl_fa_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Line 6 compares \"CVS\" (typo); line 12 silently returns new PdfComplianceReport() for unmatched CSV requests.",
      ru: "Структура Решения: Строка 6 сравнивает \"CVS\" (опечатка); строка 12 молча возвращает new PdfComplianceReport() для несовпавших CSV-запросов."
    },
    xpPenalty: 50,
    order: 3
  }
];
