import { Hint } from '../../../../../types/domain';

export const HINTS_OVERRIDING_COVARIANT: readonly Hint[] = [
  {
    id: "hnt_ov_1",
    challengeId: "chl_ov_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Compare parameter types — InvoiceRepository uses findById(String), but the broken subclass uses findById(InvoiceKey). Same name ≠ override.",
      ru: "Направляющая Подсказка: Сравните типы параметров — InvoiceRepository использует findById(String), а сломанный подкласс — findById(InvoiceKey). Одинаковое имя ≠ override."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ov_2",
    challengeId: "chl_ov_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Effective Java Item 40 — @Override forces javac to reject non-override-equivalent signatures instead of accepting a silent overload.",
      ru: "Напоминание Концепции: Effective Java Item 40 — @Override заставляет javac отклонять не-override-equivalent сигнатуры вместо принятия тихой перегрузки."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ov_3",
    challengeId: "chl_ov_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: A legal covariant override keeps String as the parameter, returns CorporateInvoice (subtype of Invoice), and must not broaden checked exceptions.",
      ru: "Механика Работы: Легальный ковариантный override сохраняет параметр String, возвращает CorporateInvoice (подтип Invoice) и не должен расширять checked-исключения."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ov_4",
    challengeId: "chl_ov_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: @Override public CorporateInvoice findById(String id) throws InvoiceNotFoundException { return loadCorporateInvoice(id); }",
      ru: "Структура Решения: @Override public CorporateInvoice findById(String id) throws InvoiceNotFoundException { return loadCorporateInvoice(id); }"
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ov_bug_1",
    challengeId: "chl_ov_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: BillingLookupService calls findById through an InvoiceRepository reference. Which CorporateInvoiceRepository method is never selected by polymorphic dispatch?",
      ru: "Направляющая Подсказка: BillingLookupService вызывает findById через ссылку InvoiceRepository. Какой метод CorporateInvoiceRepository никогда не выбирается полиморфной диспетчеризацией?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ov_bug_2",
    challengeId: "chl_ov_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Missing @Override plus a different parameter type creates an overload. The parent findById(String) remains the method invoked via InvoiceRepository.",
      ru: "Напоминание Концепции: Отсутствие @Override плюс другой тип параметра создаёт перегрузку. Родительский findById(String) остаётся методом, вызываемым через InvoiceRepository."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ov_bug_3",
    challengeId: "chl_ov_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Line with public CorporateInvoice findById(InvoiceKey id) is the silent overload — it never overrides findById(String).",
      ru: "Структура Решения: Строка public CorporateInvoice findById(InvoiceKey id) — тихая перегрузка; она никогда не переопределяет findById(String)."
    },
    xpPenalty: 50,
    order: 3
  }
];
