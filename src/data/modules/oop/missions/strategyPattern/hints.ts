import { Hint } from '../../../../../types/domain';

export const HINTS_STRATEGY: readonly Hint[] = [
  {
    id: "hnt_st_1",
    challengeId: "chl_st_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: PaymentFeeCalculator should stop owning fee formulas. Each PaymentChannel algorithm belongs in its own FeeStrategy implementation.",
      ru: "Направляющая Подсказка: PaymentFeeCalculator не должен владеть формулами комиссий. Алгоритм каждого PaymentChannel — в своей реализации FeeStrategy."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_st_2",
    challengeId: "chl_st_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Open-Closed means adding CRYPTO registers a new strategy — it must not require editing CardFeeStrategy or reopening a giant switch.",
      ru: "Напоминание Концепции: Open-Closed значит, что CRYPTO регистрирует новую strategy — без правки CardFeeStrategy и без открытия гигантского switch."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_st_3",
    challengeId: "chl_st_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: FeeStrategyRegistry holds Map<PaymentChannel, FeeStrategy>; calculateFeeCents resolves then delegates computeFeeCents(request).",
      ru: "Механика Работы: FeeStrategyRegistry хранит Map<PaymentChannel, FeeStrategy>; calculateFeeCents делает resolve и делегирует computeFeeCents(request)."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_st_4",
    challengeId: "chl_st_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: FeeStrategy interface + Card/Wire/Ach strategies + registry inject into PaymentFeeCalculator; unknown channel throws, never returns 0 silently.",
      ru: "Структура Решения: интерфейс FeeStrategy + стратегии Card/Wire/Ach + inject registry в PaymentFeeCalculator; неизвестный канал бросает, никогда молча не возвращает 0."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_st_bug_1",
    challengeId: "chl_st_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: After the CRYPTO case was added, INSTANT cleared with feeCents = 0. Look for missing break or a case that does not assign feeCents.",
      ru: "Направляющая Подсказка: После добавления case CRYPTO INSTANT проходил с feeCents = 0. Ищите пропущенный break или case без присваивания feeCents."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_st_bug_2",
    challengeId: "chl_st_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Classic switch fall-through continues into the next case — CRYPTO can execute INSTANT logic or skip assignment entirely.",
      ru: "Напоминание Концепции: Классический fall-through продолжается в следующий case — CRYPTO может выполнить логику INSTANT или полностью пропустить присваивание."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_st_bug_3",
    challengeId: "chl_st_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: The CRYPTO case is missing break, so control falls into INSTANT (or a path that leaves feeCents at 0). That line is the bug.",
      ru: "Структура Решения: У case CRYPTO нет break, поэтому управление падает в INSTANT (или в путь, оставляющий feeCents = 0). Эта строка — баг."
    },
    xpPenalty: 50,
    order: 3
  }
];
