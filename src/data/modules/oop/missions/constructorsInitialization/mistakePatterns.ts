import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_CONSTRUCTORS_INITIALIZATION: readonly MistakePattern[] = [
  {
    id: "err_ci_register_this_in_ctor",
    code: "ERR_CI_REGISTER_THIS_IN_CTOR",
    title: {
      en: "Registering this from the Constructor",
      ru: "Регистрация this из Конструктора"
    },
    description: {
      en: "Calling TradeRegistry.register(this) (or similar) before construction completes, allowing listeners to observe half-initialized state.",
      ru: "Вызов TradeRegistry.register(this) (или аналог) до завершения construction, позволяющий listeners наблюдать полуинициализированное состояние."
    },
    conceptIds: ["cpt_this_escape", "cpt_safe_construction"],
    exampleIncorrectReasoning: {
      en: "Register in the constructor so the trade is never forgotten.",
      ru: "Регистрируем в конструкторе, чтобы сделку никогда не забыли."
    },
    correctedReasoning: {
      en: "Finish construction first; register from a static factory after new returns a complete TradeRegistration.",
      ru: "Сначала завершите construction; регистрируйте из static factory после возврата new с полным TradeRegistration."
    },
    remediationMissionIds: ["mis_constructors_initialization"]
  },
  {
    id: "err_ci_overridable_from_ctor",
    code: "ERR_CI_OVERRIDABLE_FROM_CTOR",
    title: {
      en: "Calling Overridable Methods from Constructors",
      ru: "Вызов Переопределяемых Методов из Конструкторов"
    },
    description: {
      en: "Invoking protected/public validate() (or similar) from a constructor so subclass overrides run too early.",
      ru: "Вызов protected/public validate() (или аналог) из конструктора, из‑за чего override subclass выполняются слишком рано."
    },
    conceptIds: ["cpt_constructor_init_order", "cpt_safe_construction"],
    exampleIncorrectReasoning: {
      en: "Hooks in the constructor let subclasses customize validation naturally.",
      ru: "Хуки в конструкторе естественно дают subclass кастомизировать validation."
    },
    correctedReasoning: {
      en: "Use private/final validation during construction, or validate in the factory after the full object exists (EJ Item 19).",
      ru: "Используйте private/final validation во время construction или валидируйте в factory после существования полного объекта (EJ Item 19)."
    },
    remediationMissionIds: ["mis_constructors_initialization"]
  },
  {
    id: "err_ci_sync_this_in_ctor",
    code: "ERR_CI_SYNC_THIS_IN_CTOR",
    title: {
      en: "Believing synchronized(this) Makes Early Publish Safe",
      ru: "Вера, что synchronized(this) Делает Раннюю Публикацию Безопасной"
    },
    description: {
      en: "Wrapping constructor logic in synchronized(this) while still publishing this early to TradeRegistry.",
      ru: "Оборачивание логики конструктора в synchronized(this) при всё ещё ранней публикации this в TradeRegistry."
    },
    conceptIds: ["cpt_this_escape"],
    exampleIncorrectReasoning: {
      en: "If we lock on this, listeners cannot see inconsistent fields.",
      ru: "Если залочимся на this, listeners не увидят несогласованные поля."
    },
    correctedReasoning: {
      en: "Do not publish an unfinished object. Avoid synchronized(this) in constructors; use factory-after-build registration.",
      ru: "Не публикуйте незаконченный объект. Избегайте synchronized(this) в конструкторах; используйте регистрацию factory-after-build."
    },
    remediationMissionIds: ["mis_constructors_initialization"]
  },
  {
    id: "err_ci_assume_defaults_ok",
    code: "ERR_CI_ASSUME_DEFAULTS_OK",
    title: {
      en: "Treating Default Field Values as Valid Trade State",
      ru: "Принятие Default Values Полей за Валидное Состояние Сделки"
    },
    description: {
      en: "Assuming null Counterparty or zeroed settlement fields are acceptable while the constructor is still running.",
      ru: "Предположение, что null Counterparty или обнулённые settlement-поля допустимы, пока конструктор ещё выполняется."
    },
    conceptIds: ["cpt_constructor_init_order", "cpt_safe_construction"],
    exampleIncorrectReasoning: {
      en: "Listeners can ignore nulls until fields fill in a moment later.",
      ru: "Listeners могут игнорировать null, пока поля заполнятся через мгновение."
    },
    correctedReasoning: {
      en: "Published trades must already satisfy invariants — defaults are not business-ready state.",
      ru: "Опубликованные сделки уже должны удовлетворять инвариантам — defaults не бизнес-готовое состояние."
    },
    remediationMissionIds: ["mis_constructors_initialization"]
  },
  {
    id: "err_ci_thread_started_in_ctor",
    code: "ERR_CI_THREAD_STARTED_IN_CTOR",
    title: {
      en: "Starting Threads or Async Work with this in Constructors",
      ru: "Старт Потоков или Async с this в Конструкторах"
    },
    description: {
      en: "Launching listeners, timers, or workers that capture this before Counterparty / TradeSettlementTerms are set.",
      ru: "Запуск listeners, таймеров или worker'ов, захватывающих this до установки Counterparty / TradeSettlementTerms."
    },
    conceptIds: ["cpt_this_escape", "cpt_safe_construction"],
    exampleIncorrectReasoning: {
      en: "Start the settlement watcher thread in the constructor for convenience.",
      ru: "Для удобства стартуем поток settlement watcher в конструкторе."
    },
    correctedReasoning: {
      en: "Start async work only after construction completes and the instance is safely published.",
      ru: "Стартуйте async только после завершения construction и безопасной публикации экземпляра."
    },
    remediationMissionIds: ["mis_constructors_initialization"]
  }
];
