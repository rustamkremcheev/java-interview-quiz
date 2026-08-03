import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_UPCASTING_DOWNCASTING: readonly MistakePattern[] = [
  {
    id: "err_blind_downcast",
    code: "ERR_BLIND_DOWNCAST",
    title: {
      en: "Blind Downcast Without instanceof",
      ru: "Слепой Downcast Без instanceof"
    },
    description: {
      en: "Casting FraudEvent to CardFraudEvent or WireFraudEvent without a runtime type test, causing ClassCastException when AchFraudEvent (or any other subtype) arrives.",
      ru: "Cast FraudEvent к CardFraudEvent или WireFraudEvent без runtime-проверки типа, вызывающий ClassCastException при приходе AchFraudEvent (или любого другого подтипа)."
    },
    conceptIds: ["cpt_downcasting"],
    exampleIncorrectReasoning: {
      en: "The method only receives CARD and WIRE events, so (CardFraudEvent) event is fine.",
      ru: "Метод получает только CARD и WIRE, поэтому (CardFraudEvent) event нормален."
    },
    correctedReasoning: {
      en: "Any FraudEvent subtype can arrive. Use pattern matching instanceof or polymorphic extractEvidence() — never assume the concrete type.",
      ru: "Может прийти любой подтип FraudEvent. Используйте pattern matching instanceof или полиморфный extractEvidence() — никогда не предполагайте конкретный тип."
    },
    remediationMissionIds: ["mis_upcasting_downcasting"]
  },
  {
    id: "err_upcast_unsafe",
    code: "ERR_UPCAST_UNSAFE",
    title: {
      en: "Believing Upcasting Itself Is Unsafe",
      ru: "Убеждение, Что Сам Upcasting Небезопасен"
    },
    description: {
      en: "Blaming the FraudEvent API boundary (upcast) for ClassCastException instead of the later unsafe narrowing cast.",
      ru: "Обвинение API-границы FraudEvent (upcast) в ClassCastException вместо позднего небезопасного сужающего cast."
    },
    conceptIds: ["cpt_upcasting", "cpt_downcasting"],
    exampleIncorrectReasoning: {
      en: "We should stop accepting FraudEvent and require CardFraudEvent only so ACH cannot enter.",
      ru: "Нужно перестать принимать FraudEvent и требовать только CardFraudEvent, чтобы ACH не входил."
    },
    correctedReasoning: {
      en: "Upcasting to FraudEvent is correct and type-safe. Fix the downcast path (or eliminate it with polymorphism) so ACH is handled properly.",
      ru: "Upcast к FraudEvent корректен и типобезопасен. Исправьте путь downcast (или устраните его полиморфизмом), чтобы ACH обрабатывался правильно."
    },
    remediationMissionIds: ["mis_upcasting_downcasting"]
  },
  {
    id: "err_catch_classcastexception",
    code: "ERR_CATCH_CLASSCASTEXCEPTION",
    title: {
      en: "Catching ClassCastException as Control Flow",
      ru: "Ловля ClassCastException как Control Flow"
    },
    description: {
      en: "Wrapping blind casts in try/catch (ClassCastException) and returning empty evidence, silently dropping ACH investigations.",
      ru: "Оборачивание слепых cast'ов в try/catch (ClassCastException) с возвратом пустого evidence, тихо отбрасывая ACH-расследования."
    },
    conceptIds: ["cpt_downcasting"],
    exampleIncorrectReasoning: {
      en: "If the cast fails, catch ClassCastException and continue — safer than crashing the batch.",
      ru: "Если cast падает, поймаем ClassCastException и продолжим — безопаснее, чем крашить батч."
    },
    correctedReasoning: {
      en: "ClassCastException is a programming error. Use instanceof/polymorphism; catching hides bugs and can swallow unrelated cast failures.",
      ru: "ClassCastException — ошибка программирования. Используйте instanceof/полиморфизм; catch скрывает баги и может проглотить несвязанные сбои cast."
    },
    remediationMissionIds: ["mis_upcasting_downcasting"]
  },
  {
    id: "err_cast_instead_of_polymorphism",
    code: "ERR_CAST_INSTEAD_OF_POLYMORPHISM",
    title: {
      en: "Growing Cast / instanceof Chains Instead of Polymorphism",
      ru: "Растущие Цепочки Cast / instanceof Вместо Полиморфизма"
    },
    description: {
      en: "Treating pattern matching instanceof as the final design while every new fraud rail forces editing FraudInvestigationService.",
      ru: "Считать pattern matching instanceof финальным дизайном, пока каждый новый fraud-рейл вынуждает править FraudInvestigationService."
    },
    conceptIds: ["cpt_downcasting", "cpt_polymorphism"],
    exampleIncorrectReasoning: {
      en: "Pattern matching fixed ClassCastException — we can keep adding else-if branches forever.",
      ru: "Pattern matching исправил ClassCastException — можно бесконечно добавлять else-if ветки."
    },
    correctedReasoning: {
      en: "Pattern matching is a safe interim. Production-grade: FraudEvent.extractEvidence() overrides so new rails extend without editing the service.",
      ru: "Pattern matching — безопасный промежуточный шаг. Продакшн: overrides FraudEvent.extractEvidence(), чтобы новые рейлы расширялись без правки сервиса."
    },
    remediationMissionIds: ["mis_upcasting_downcasting"]
  },
  {
    id: "err_channel_string_cast_drift",
    code: "ERR_CHANNEL_STRING_CAST_DRIFT",
    title: {
      en: "Channel String Discriminator Diverges from Runtime Type",
      ru: "Строковый Дискриминатор Канала Расходится с Runtime-Типом"
    },
    description: {
      en: "Branching on event.channel() strings then casting to Card/Wire types, so ACH or mismatched payloads hit the wrong cast.",
      ru: "Ветвление по строкам event.channel() с последующим cast к типам Card/Wire, из-за чего ACH или рассинхронённые payload попадают в неверный cast."
    },
    conceptIds: ["cpt_downcasting"],
    exampleIncorrectReasoning: {
      en: "channel() and the concrete class always stay in sync, so string switches are equivalent to instanceof.",
      ru: "channel() и конкретный класс всегда синхронны, поэтому строковые switch эквивалентны instanceof."
    },
    correctedReasoning: {
      en: "Strings and types can drift under serialization, hotfixes, and new rails. Prefer instanceof/pattern matching or polymorphic methods tied to the actual type.",
      ru: "Строки и типы могут дрейфовать при сериализации, хотфиксах и новых рейлах. Предпочитайте instanceof/pattern matching или полиморфные методы, привязанные к фактическому типу."
    },
    remediationMissionIds: ["mis_upcasting_downcasting"]
  }
];
