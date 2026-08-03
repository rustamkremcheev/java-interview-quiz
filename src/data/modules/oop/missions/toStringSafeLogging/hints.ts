import { Hint } from '../../../../../types/domain';

export const HINTS_TOSTRING_SAFE_LOGGING: readonly Hint[] = [
  {
    id: "hnt_ts_1",
    challengeId: "chl_ts_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask which fields of CustomerVerificationRequest are allowed in durable logs — fullName, nationalId, and VerificationToken usually are not.",
      ru: "Направляющая Подсказка: Спросите, какие поля CustomerVerificationRequest допустимы в долгоживущих логах — fullName, nationalId и VerificationToken обычно нет."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ts_2",
    challengeId: "chl_ts_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: toString is for concise diagnostics (EJ Item 12). It is not a serialization or full audit-export API.",
      ru: "Напоминание Концепции: toString — для краткой диагностики (EJ Item 12). Это не API сериализации или полного audit-export."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ts_3",
    challengeId: "chl_ts_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: \"verify \" + request eagerly builds a string via toString. Prefer logger.info(\"verify customerId={}\", redactedId) with RedactionPolicy.",
      ru: "Механика: \"verify \" + request eagerly строит строку через toString. Предпочитайте logger.info(\"verify customerId={}\", redactedId) с RedactionPolicy."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ts_4",
    challengeId: "chl_ts_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Redacted toString + RedactionPolicy + parameterized safe args; reject concat logging and 'delete toString entirely' as the only fix.",
      ru: "Структура Решения: Redacted toString + RedactionPolicy + parameterized safe args; отклоните concat logging и «удалить toString полностью» как единственный фикс."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ts_bug_1",
    challengeId: "chl_ts_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for fullName, nationalId, verificationToken inside toString, and logger.info with string concatenation.",
      ru: "Направляющая Подсказка: Ищите fullName, nationalId, verificationToken внутри toString и logger.info со string concatenation."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ts_bug_2",
    challengeId: "chl_ts_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: AccountReference in toString may also be sensitive — but the clearest bugs here are raw PII, token, and concat log.",
      ru: "Напоминание Концепции: AccountReference в toString тоже может быть чувствителен — но здесь самые явные баги: сырой PII, token и concat log."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ts_bug_3",
    challengeId: "chl_ts_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag fullName, nationalId, token lines in toString, and the logger.info(\"verify \" + request) call site.",
      ru: "Структура Решения: Отметьте строки fullName, nationalId, token в toString и call site logger.info(\"verify \" + request)."
    },
    xpPenalty: 50,
    order: 3
  }
];
