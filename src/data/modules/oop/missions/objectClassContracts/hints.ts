import { Hint } from '../../../../../types/domain';

export const HINTS_OBJECT_CLASS_CONTRACTS: readonly Hint[] = [
  {
    id: "hnt_ojc_1",
    challengeId: "chl_ojc_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Object.equals defaults to identity. If ComplianceEventRepository never overrides equals and uses contains(event), logical duplicates slip through.",
      ru: "Направляющая Подсказка: Object.equals по умолчанию — identity. Если ComplianceEventRepository не переопределяет equals и использует contains(event), логические дубликаты проходят."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ojc_2",
    challengeId: "chl_ojc_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Object.clone is typically shallow — nested List references stay shared. Prefer an explicit ComplianceCase copy constructor/factory.",
      ru: "Напоминание Концепции: Object.clone обычно shallow — nested List-ссылки остаются общими. Предпочитайте явный copy constructor/factory для ComplianceCase."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ojc_3",
    challengeId: "chl_ojc_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: getClass() == X.class rejects subtypes; instanceof X accepts them. finalize is obsolete (JEP 421) — use try-with-resources / Cleaner.",
      ru: "Механика: getClass() == X.class отвергает подтипы; instanceof X принимает их. finalize устарел (JEP 421) — используйте try-with-resources / Cleaner."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ojc_4",
    challengeId: "chl_ojc_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Explicit eventId key (or deliberate equals) + copy constructor + instanceof when polymorphism intended + no finalize; reject PII-dumping toString as the 'fix'.",
      ru: "Структура Решения: Явный ключ eventId (или осознанный equals) + copy constructor + instanceof при polymorphism + без finalize; отклоните дамп PII в toString как «фикс»."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ojc_bug_1",
    challengeId: "chl_ojc_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for repo.contains(event), clone(), getClass() != ComplianceEvent.class, and finalize().",
      ru: "Направляющая Подсказка: Ищите repo.contains(event), clone(), getClass() != ComplianceEvent.class и finalize()."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ojc_bug_2",
    challengeId: "chl_ojc_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Identity dedup, shallow clone, exact-class checks, and finalize are four related Object-contract failure modes.",
      ru: "Напоминание Концепции: Дедуп по identity, shallow clone, exact-class checks и finalize — четыре связанных failure mode контрактов Object."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ojc_bug_3",
    challengeId: "chl_ojc_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag contains(event), clone() assignment, getClass inequality check, and the finalize method declaration.",
      ru: "Структура Решения: Отметьте contains(event), присваивание clone(), проверку неравенства getClass и объявление метода finalize."
    },
    xpPenalty: 50,
    order: 3
  }
];
