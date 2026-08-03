import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OBSERVER_PATTERN: readonly MistakePattern[] = [
  {
    id: "err_obs_duplicate_register",
    code: "ERR_OBS_DUPLICATE_REGISTER",
    title: {
      en: "Registering the Same Observer Twice",
      ru: "Двойная Регистрация Одного Observer"
    },
    description: {
      en: "ComplianceAlertObserver is added twice to TransactionEventPublisher, producing duplicate alerts and duplicate DB writes.",
      ru: "ComplianceAlertObserver добавляется дважды в TransactionEventPublisher, вызывая duplicate alerts и повторные записи в БД."
    },
    conceptIds: ["cpt_observer_pattern", "cpt_subscription_lifecycle"],
    exampleIncorrectReasoning: {
      en: "Calling subscribe on every request is harmless.",
      ru: "Вызов subscribe на каждый request безвреден."
    },
    correctedReasoning: {
      en: "Make registration idempotent or return a Subscription token; never accumulate duplicates.",
      ru: "Сделайте регистрацию идемпотентной или возвращайте Subscription token; никогда не накапливайте дубликаты."
    },
    remediationMissionIds: ["mis_observer_pattern"]
  },
  {
    id: "err_obs_never_unsubscribe",
    code: "ERR_OBS_NEVER_UNSUBSCRIBE",
    title: {
      en: "Never Unsubscribing Observers",
      ru: "Observer Никогда не Отписывается"
    },
    description: {
      en: "Strong references to observers keep components alive after their lifecycle ends, causing memory growth.",
      ru: "Сильные ссылки на observers удерживают компоненты после конца lifecycle, вызывая рост памяти."
    },
    conceptIds: ["cpt_subscription_lifecycle"],
    exampleIncorrectReasoning: {
      en: "GC will clean up listeners automatically.",
      ru: "GC сам почистит listeners."
    },
    correctedReasoning: {
      en: "Publisher holds strong refs. Explicit unsubscribe (or weak/event-bus policies) is required.",
      ru: "Publisher держит strong refs. Нужен явный unsubscribe (или weak/event-bus политики)."
    },
    remediationMissionIds: ["mis_observer_pattern"]
  },
  {
    id: "err_obs_exception_stops_fanout",
    code: "ERR_OBS_EXCEPTION_STOPS_FANOUT",
    title: {
      en: "One Observer Exception Aborts Remaining Notifications",
      ru: "Исключение Одного Observer Прерывает Остальные Уведомления"
    },
    description: {
      en: "An unchecked throw in FraudAnalyticsObserver prevents AuditObserver from running.",
      ru: "Непроверенный throw в FraudAnalyticsObserver мешает выполнению AuditObserver."
    },
    conceptIds: ["cpt_observer_exception_isolation"],
    exampleIncorrectReasoning: {
      en: "Fail-fast on any observer error is safer.",
      ru: "Fail-fast на любой ошибке observer безопаснее."
    },
    correctedReasoning: {
      en: "Isolate per-observer failures, log, and continue unless a documented atomic fanout is required.",
      ru: "Изолируйте сбои per-observer, логируйте и продолжайте, если не требуется документированный atomic fanout."
    },
    remediationMissionIds: ["mis_observer_pattern"]
  },
  {
    id: "err_obs_kafka_as_first_fix",
    code: "ERR_OBS_KAFKA_AS_FIRST_FIX",
    title: {
      en: "Escaping to Kafka Instead of Fixing In-Process Lifecycle",
      ru: "Побег в Kafka Вместо Фикса In-Process Lifecycle"
    },
    description: {
      en: "Treating broker migration as the fix for duplicate in-process subscriptions hides the real lifecycle bug.",
      ru: "Миграция на broker как фикс duplicate in-process subscriptions скрывает реальный lifecycle-баг."
    },
    conceptIds: ["cpt_observer_pattern"],
    exampleIncorrectReasoning: {
      en: "Move everything to Kafka and the duplicates disappear.",
      ru: "Перенесём всё в Kafka — дубликаты исчезнут."
    },
    correctedReasoning: {
      en: "Fix subscription idempotency and unsubscribe first. Brokers solve different distribution problems.",
      ru: "Сначала исправьте идемпотентность подписки и unsubscribe. Brokers решают другие задачи распределения."
    },
    remediationMissionIds: ["mis_observer_pattern"]
  },
  {
    id: "err_obs_hidden_ordering_assumptions",
    code: "ERR_OBS_HIDDEN_ORDERING",
    title: {
      en: "Assuming Observer Notification Order",
      ru: "Предположение о Порядке Уведомления Observers"
    },
    description: {
      en: "Clients rely on ComplianceAlertObserver running before AuditObserver without a documented contract.",
      ru: "Клиенты полагаются, что ComplianceAlertObserver выполняется до AuditObserver без документированного контракта."
    },
    conceptIds: ["cpt_observer_pattern"],
    exampleIncorrectReasoning: {
      en: "List iteration order is a permanent API.",
      ru: "Порядок итерации списка — постоянный API."
    },
    correctedReasoning: {
      en: "If order matters, document and test it, or compose explicit pipelines instead of free-form observers.",
      ru: "Если порядок важен — документируйте и тестируйте, или составьте явные pipelines вместо свободных observers."
    },
    remediationMissionIds: ["mis_observer_pattern"]
  }
];
