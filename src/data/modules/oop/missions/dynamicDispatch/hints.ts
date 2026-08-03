import { Hint } from '../../../../../types/domain';

export const HINTS_DYNAMIC_DISPATCH: readonly Hint[] = [
  {
    id: "hnt_dd_1",
    challengeId: "chl_dd_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask what bytecode RiskHandlers.evaluate(...) emits — if it is invokestatic, polymorphism is already lost at the outer call.",
      ru: "Направляющая Подсказка: Спросите, какой байткод эмитит RiskHandlers.evaluate(...) — если invokestatic, полиморфизм уже потерян на внешнем вызове."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_dd_2",
    challengeId: "chl_dd_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Only instance methods override. Static evaluateStatic on RiskHandler hides; CardExposureHandler.evaluateStatic is never selected via a RiskHandler qualifier.",
      ru: "Напоминание Концепции: Только instance-методы переопределяются. Static evaluateStatic на RiskHandler скрывает; CardExposureHandler.evaluateStatic никогда не выбирается через квалификатор RiskHandler."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_dd_3",
    challengeId: "chl_dd_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Restore handler.evaluate(event) for invokeinterface dynamic dispatch, then reduce the 8-type megamorphic site via sealed hierarchy or channel-split processors.",
      ru: "Механика Работы: Восстановите handler.evaluate(event) для динамической диспетчеризации invokeinterface, затем снизьте 8-типовой megamorphic site через sealed hierarchy или channel-split processors."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_dd_4",
    challengeId: "chl_dd_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: return handler.evaluate(event); plus CardRiskEventProcessor holding CardExposureHandler (monomorphic) — delete RiskHandlers.evaluateStatic path.",
      ru: "Структура Решения: return handler.evaluate(event); плюс CardRiskEventProcessor с CardExposureHandler (monomorphic) — удалите путь RiskHandlers.evaluateStatic."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_dd_bug_1",
    challengeId: "chl_dd_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: ExposureRouter accepts a RiskHandler parameter but specialized Card exposure math never runs. Where is the receiver ignored?",
      ru: "Направляющая Подсказка: ExposureRouter принимает параметр RiskHandler, но специализированная математика Card никогда не выполняется. Где игнорируется получатель?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_dd_bug_2",
    challengeId: "chl_dd_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: A static helper that calls RiskHandler.evaluateStatic(event) binds with invokestatic — the handler argument does not participate in dispatch.",
      ru: "Напоминание Концепции: Static helper, вызывающий RiskHandler.evaluateStatic(event), связывается через invokestatic — аргумент handler не участвует в диспетчеризации."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_dd_bug_3",
    challengeId: "chl_dd_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Lines calling RiskHandlers.evaluate(...) and RiskHandler.evaluateStatic(event) are the bugs — replace with return handler.evaluate(event).",
      ru: "Структура Решения: Строки с RiskHandlers.evaluate(...) и RiskHandler.evaluateStatic(event) — баги; замените на return handler.evaluate(event)."
    },
    xpPenalty: 50,
    order: 3
  }
];
