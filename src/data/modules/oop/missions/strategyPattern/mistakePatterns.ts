import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_STRATEGY: readonly MistakePattern[] = [
  {
    id: "err_switch_explosion_ocp",
    code: "ERR_SWITCH_EXPLOSION_OCP",
    title: {
      en: "Growing Enum Switch Violates Open-Closed",
      ru: "Растущий Switch по Enum Нарушает Open-Closed"
    },
    description: {
      en: "Adding every new PaymentChannel by editing PaymentFeeCalculator's switch, forcing recompilation and re-testing of all existing fee paths.",
      ru: "Добавление каждого нового PaymentChannel через правку switch в PaymentFeeCalculator, вынуждая перекомпиляцию и ретест всех существующих путей комиссий."
    },
    conceptIds: ["cpt_open_closed", "cpt_strategy_pattern"],
    exampleIncorrectReasoning: {
      en: "A switch is fine — just add another case when product invents a channel.",
      ru: "Switch нормален — просто добавим ещё один case, когда продукт придумает канал."
    },
    correctedReasoning: {
      en: "Register a new FeeStrategy implementation in FeeStrategyRegistry — PaymentFeeCalculator and existing strategies stay unmodified (OCP).",
      ru: "Зарегистрируйте новую реализацию FeeStrategy в FeeStrategyRegistry — PaymentFeeCalculator и существующие стратегии не меняются (OCP)."
    },
    remediationMissionIds: ["mis_strategy_pattern"]
  },
  {
    id: "err_switch_fallthrough_fee",
    code: "ERR_SWITCH_FALLTHROUGH_FEE",
    title: {
      en: "Missing Break / Fall-Through Corrupts feeCents",
      ru: "Пропущенный Break / Fall-Through Портит feeCents"
    },
    description: {
      en: "Omitting break after a PaymentChannel case so execution falls into the next case, posting 0 fee, double fee, or another channel's formula.",
      ru: "Пропуск break после case PaymentChannel, из-за чего выполнение падает в следующий case, выставляя 0, двойную комиссию или формулу другого канала."
    },
    conceptIds: ["cpt_strategy_pattern"],
    exampleIncorrectReasoning: {
      en: "Fall-through is a style choice; the CRYPTO case will just run and stop.",
      ru: "Fall-through — стилистический выбор; case CRYPTO просто выполнится и остановится."
    },
    correctedReasoning: {
      en: "Without break, CRYPTO falls into INSTANT (or assigns 0). Strategy objects eliminate shared mutable fee variables and fall-through entirely.",
      ru: "Без break CRYPTO падает в INSTANT (или присваивает 0). Объекты Strategy устраняют общие мутабельные fee-переменные и fall-through полностью."
    },
    remediationMissionIds: ["mis_strategy_pattern"]
  },
  {
    id: "err_strategy_inside_switch",
    code: "ERR_STRATEGY_INSIDE_SWITCH",
    title: {
      en: "Fake Strategy Still Selected by Switch",
      ru: "Фальшивый Strategy, Всё Ещё Выбираемый Switch"
    },
    description: {
      en: "Extracting CardFeeStrategy etc. but still using a giant switch that instantiates them — the OCP violation and fall-through risk remain in the selector.",
      ru: "Вынесение CardFeeStrategy и т.д., но сохранение гигантского switch, который их инстанцирует — нарушение OCP и риск fall-through остаются в селекторе."
    },
    conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
    exampleIncorrectReasoning: {
      en: "If each case returns a strategy object, we have applied Strategy Pattern.",
      ru: "Если каждый case возвращает объект strategy, мы применили паттерн Strategy."
    },
    correctedReasoning: {
      en: "True Strategy selection uses a registry/map (or DI binding) keyed by PaymentChannel — no growing switch in the calculator hot path.",
      ru: "Настоящий выбор Strategy — через registry/map (или DI-биндинг) по ключу PaymentChannel — без растущего switch в горячем пути калькулятора."
    },
    remediationMissionIds: ["mis_strategy_pattern"]
  },
  {
    id: "err_missing_registry_default",
    code: "ERR_MISSING_REGISTRY_DEFAULT",
    title: {
      en: "Silent Null Strategy for Unknown Channel",
      ru: "Тихий Null Strategy для Неизвестного Канала"
    },
    description: {
      en: "Looking up FeeStrategy from the registry without a fail-fast for unregistered PaymentChannel, returning null and posting 0 feeCents.",
      ru: "Поиск FeeStrategy в registry без fail-fast для незарегистрированного PaymentChannel, возврат null и выставление 0 feeCents."
    },
    conceptIds: ["cpt_strategy_pattern"],
    exampleIncorrectReasoning: {
      en: "If the map miss returns null, callers can treat fee as zero — safer than throwing.",
      ru: "Если map miss возвращает null, вызывающий может считать комиссию нулевой — безопаснее, чем бросать."
    },
    correctedReasoning: {
      en: "Unknown channel is a configuration bug. FeeStrategyRegistry must throw (or return Optional and force explicit handling) — never silently bill 0.",
      ru: "Неизвестный канал — ошибка конфигурации. FeeStrategyRegistry должен бросать (или Optional с явным handling) — никогда молча не биллить 0."
    },
    remediationMissionIds: ["mis_strategy_pattern"]
  },
  {
    id: "err_strategy_shared_mutable_state",
    code: "ERR_STRATEGY_SHARED_MUTABLE_STATE",
    title: {
      en: "Stateful Strategies Sharing Mutable fee Accumulators",
      ru: "Stateful Strategies с Общими Мутабельными fee-Накопителями"
    },
    description: {
      en: "Implementing FeeStrategy with instance fields mutated across requests, causing race conditions and double-fee symptoms under concurrency.",
      ru: "Реализация FeeStrategy с полями экземпляра, мутируемыми между запросами, вызывая гонки и симптомы двойной комиссии при конкуренции."
    },
    conceptIds: ["cpt_strategy_pattern"],
    exampleIncorrectReasoning: {
      en: "Strategies can keep a running feeCents field like the old switch variable.",
      ru: "Strategies могут хранить поле feeCents как старая переменная switch."
    },
    correctedReasoning: {
      en: "Prefer stateless strategies: computeFeeCents(PaymentFeeRequest) returns a new long each call. Share config via constructor immutables, not request-scoped mutation.",
      ru: "Предпочитайте stateless strategies: computeFeeCents(PaymentFeeRequest) возвращает новый long на каждый вызов. Конфиг — через immutable конструктор, не request-scoped мутацию."
    },
    remediationMissionIds: ["mis_strategy_pattern"]
  }
];
