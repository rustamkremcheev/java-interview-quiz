import { Hint } from '../../../../../types/domain';

export const HINTS_ABSTRACT_CLASSES: readonly Hint[] = [
  {
    id: "hnt_ac_1",
    challengeId: "chl_ac_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Subclasses must customize authorize/capture — they must never be able to skip audit by rewriting settle().",
      ru: "Направляющая Подсказка: Подклассы кастомизируют authorize/capture — они не должны иметь возможности пропустить audit, переписав settle()."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ac_2",
    challengeId: "chl_ac_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: An abstract class is justified here because processors share SettlementContext state, a constructor, and a protected extension API — not because you needed a marker interface.",
      ru: "Напоминание Концепции: Абстрактный класс оправдан здесь, потому что процессоры делят состояние SettlementContext, конструктор и protected API расширения — не потому что нужен marker interface."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ac_3",
    challengeId: "chl_ac_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: public final SettlementResult settle(...) { validate; authorize; capture; audit; }. Make authorize/capture abstract or protected hooks; keep audit private.",
      ru: "Механика Работы: public final SettlementResult settle(...) { validate; authorize; capture; audit; }. Сделайте authorize/capture abstract или protected hooks; audit оставьте private."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ac_4",
    challengeId: "chl_ac_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: AbstractSettlementProcessor with final settle(); abstract authorize/capture; private validate/audit; document protected fields. Card/Wire only implement hooks.",
      ru: "Структура Решения: AbstractSettlementProcessor с final settle(); abstract authorize/capture; private validate/audit; документируйте protected-поля. Card/Wire только реализуют hooks."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ac_bug_1",
    challengeId: "chl_ac_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Production audits are missing after WIRE capture. Find where WireSettlementProcessor replaces the base lifecycle instead of filling a hook.",
      ru: "Направляющая Подсказка: После WIRE capture audit'ы отсутствуют. Найдите, где WireSettlementProcessor подменяет базовый lifecycle вместо заполнения хука."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ac_bug_2",
    challengeId: "chl_ac_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Overriding a non-final settle() lets a subclass call authorize + capture and return — audit in the superclass never runs.",
      ru: "Напоминание Концепции: Переопределение не-final settle() позволяет подклассу вызвать authorize + capture и вернуться — audit в суперклассе никогда не выполняется."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ac_bug_3",
    challengeId: "chl_ac_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: The @Override of settle() that returns after capture without calling audit (or super.settle) is the bug — that method must not be overridable.",
      ru: "Структура Решения: @Override settle(), возвращающий результат после capture без audit (или super.settle) — это баг; этот метод не должен быть переопределяемым."
    },
    xpPenalty: 50,
    order: 3
  }
];
