import { Hint } from '../../../../../types/domain';

export const HINTS_INHERITANCE: readonly Hint[] = [
  {
    id: "hnt_inh_1",
    challengeId: "chl_inh_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: The failure is inheritance mechanics — constructor order and protected contracts — not a decorator-style rewrite of the reporting pipeline.",
      ru: "Направляющая Подсказка: Сбой в механике наследования — порядок конструкторов и protected-контракты — не decorator-rewrite отчётного пайплайна."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_inh_2",
    challengeId: "chl_inh_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Effective Java Item 19 — design and document for inheritance or else prohibit/seal it. Protected visibility alone is not an extension API.",
      ru: "Напоминание Концепции: Effective Java Item 19 — проектируйте и документируйте для наследования или запретите/запечатайте. Одна видимость protected — не API расширения."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_inh_3",
    challengeId: "chl_inh_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Pass header metadata into the base constructor; keep render/appendSection contracts final and documented; subclasses only implement typed section hooks.",
      ru: "Механика Работы: Передавайте метаданные заголовка в конструктор базы; держите контракты render/appendSection final и документированными; подклассы реализуют только типизированные хуки секций."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_inh_4",
    challengeId: "chl_inh_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Documented/sealed extension points + constructor-safe header args + clear encoding ownership. Composition for assembly is an optional trade-off, not the only correct checkbox.",
      ru: "Структура Решения: Документированные/sealed точки расширения + безопасные для конструктора args заголовка + ясное владение encoding. Композиция сборки — опциональный компромисс, не единственный верный checkbox."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_inh_bug_1",
    challengeId: "chl_inh_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for work done after super(...) that tries to change headerVersion, and for encoding done both in the subclass and inside appendSection.",
      ru: "Направляющая Подсказка: Ищите работу после super(...), которая пытается менять headerVersion, и кодирование и в подклассе, и внутри appendSection."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_inh_bug_2",
    challengeId: "chl_inh_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Inherited state written during the base constructor cannot be fixed by later field assignment in the subclass body.",
      ru: "Напоминание Концепции: Унаследованное состояние, записанное в конструкторе базы, нельзя исправить поздним присваиванием поля в теле подкласса."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_inh_bug_3",
    challengeId: "chl_inh_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: The late this.headerVersion = ... line and the pre-Base64 before appendSection are the bug lines — wrong header + double serialization.",
      ru: "Структура Решения: Поздняя строка this.headerVersion = ... и предварительный Base64 перед appendSection — строки бага: неверный заголовок + двойная сериализация."
    },
    xpPenalty: 50,
    order: 3
  }
];
