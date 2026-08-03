import { Hint } from '../../../../../types/domain';

export const HINTS_POLYMORPHISM: readonly Hint[] = [
  {
    id: "hnt_poly_1",
    challengeId: "chl_poly_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: TransactionPipeline should stop inspecting CardTransaction / WireTransaction / AchTransaction. Ask each Transaction (or its handler) to process itself.",
      ru: "Направляющая Подсказка: TransactionPipeline не должен инспектировать CardTransaction / WireTransaction / AchTransaction. Просите каждый Transaction (или его handler) обработать себя."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_poly_2",
    challengeId: "chl_poly_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Type-switch smell means InstantTransaction forces editing the pipeline. Polymorphism means a new subtype brings its own process()/handler without reopening instanceof.",
      ru: "Напоминание Концепции: Smell type-switch значит, что InstantTransaction вынуждает править pipeline. Полиморфизм — новый подтип несёт свой process()/handler без открытия instanceof."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_poly_3",
    challengeId: "chl_poly_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Common options — Transaction.process(PipelineContext), visitor accept(TransactionHandler), or Map<Class<?>, TransactionHandler> registry without hot-path instanceof sprawl.",
      ru: "Механика Работы: Варианты — Transaction.process(PipelineContext), visitor accept(TransactionHandler) или registry Map<Class<?>, TransactionHandler> без sprawl instanceof в горячем пути."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_poly_4",
    challengeId: "chl_poly_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Transaction interface + Card/Wire/Ach/Instant process overrides (or handlers) + thin TransactionPipeline that only delegates — no growing instanceof chain.",
      ru: "Структура Решения: интерфейс Transaction + overrides process у Card/Wire/Ach/Instant (или handlers) + тонкий TransactionPipeline только с делегированием — без растущей цепочки instanceof."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_poly_bug_1",
    challengeId: "chl_poly_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: InstantTransaction exists in the hierarchy, but Instant rail payments fail or settle wrong. Look for a missing instanceof branch or an else that mis-routes unknown types.",
      ru: "Направляющая Подсказка: InstantTransaction есть в иерархии, но Instant-платежи падают или settle неверно. Ищите пропущенную ветку instanceof или else, неверно маршрутизирующий неизвестные типы."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_poly_bug_2",
    challengeId: "chl_poly_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: instanceof chains are closed sets — a new subtype that is not listed falls through to else. That is the type-switch smell in production form.",
      ru: "Напоминание Концепции: цепочки instanceof — закрытые множества; новый подтип вне списка падает в else. Это smell type-switch в продакшн-форме."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_poly_bug_3",
    challengeId: "chl_poly_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: There is no InstantTransaction branch; the else rejects Instant (or applies ACH clearing). Those lines are the bug — polymorphism would not need that branch.",
      ru: "Структура Решения: Ветки InstantTransaction нет; else отклоняет Instant (или применяет ACH clearing). Эти строки — баг; полиморфизму эта ветка не нужна."
    },
    xpPenalty: 50,
    order: 3
  }
];
