import { Hint } from '../../../../../types/domain';

export const HINTS_JVM_MEMORY_OBJECT_LAYOUT: readonly Hint[] = [
  {
    id: "hnt_jol_1",
    challengeId: "chl_jol_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Field widths are not heap cost — headers, padding, boxes, and nested graphs count.",
      ru: "Направляющая Подсказка: Ширины полей — не стоимость кучи; считаются headers, padding, boxes и вложенные графы."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_jol_2",
    challengeId: "chl_jol_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Prefer primitives in PortfolioPosition; size cache from JOL retained footprint + map overhead.",
      ru: "Напоминание Концепции: Предпочитайте примитивы в PortfolioPosition; оценивайте кэш от JOL retained footprint + overhead map."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_jol_3",
    challengeId: "chl_jol_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Reject universal 'header = 12 bytes' constants and 'records are free structs'.",
      ru: "Механика: Отклоните универсальные константы «header = 12 байт» и «records — бесплатные структуры»."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_jol_4",
    challengeId: "chl_jol_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Flatten primitives + measure with JOL + include RiskBucket retained cost; reject fixed-header and record-as-struct myths.",
      ru: "Структура Решения: Уплотнить примитивы + измерить JOL + учесть retained RiskBucket; отклонить мифы о фиксированном header и record-as-struct."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_jol_bug_1",
    challengeId: "chl_jol_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for boxed Long and a BYTES_PER_ENTRY that only adds 8+8.",
      ru: "Направляющая Подсказка: Ищите boxed Long и BYTES_PER_ENTRY, который только складывает 8+8."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_jol_bug_2",
    challengeId: "chl_jol_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Dividing heapBytes by that constant is how capacity becomes fiction.",
      ru: "Напоминание Концепции: Деление heapBytes на эту константу превращает ёмкость в фикцию."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_jol_bug_3",
    challengeId: "chl_jol_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag the boxed quantity field, BYTES_PER_ENTRY = 8 + 8, and the maxEntries division.",
      ru: "Структура Решения: Отметьте boxed-поле quantity, BYTES_PER_ENTRY = 8 + 8 и деление в maxEntries."
    },
    xpPenalty: 50,
    order: 3
  }
];
