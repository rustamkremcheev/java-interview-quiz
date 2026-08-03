import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_COMPOSITION: readonly MistakePattern[] = [
  {
    id: "err_inheritance_double_count",
    code: "ERR_INHERITANCE_DOUBLE_COUNT",
    title: {
      en: "Double-Counting via Overridden Bulk and Single Methods",
      ru: "Двойной Подсчет через Переопределение Массовых и Одиночных Методов"
    },
    description: {
      en: "Subclassing a concrete NotificationService and overriding both single-element (send) and bulk (sendBatch) methods with independent counter increments, while the base class bulk method internally delegates to the single-element method.",
      ru: "Наследование конкретного NotificationService с переопределением одиночных (send) и массовых (sendBatch) методов с независимым инкрементом счетчика, пока массовый метод базового класса внутренне делегирует одиночному."
    },
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    exampleIncorrectReasoning: {
      en: "Override both send() and sendBatch() to ensure all delivery paths are instrumented.",
      ru: "Переопределить send() и sendBatch() для гарантии инструментирования всех путей доставки."
    },
    correctedReasoning: {
      en: "Instrument only ONE delivery point (send()). Let sendBatch() either delegate entirely or explicitly route through the instrumented send() — never pre-count AND delegate.",
      ru: "Инструментируйте только ОДНУ точку доставки (send()). sendBatch() либо полностью делегирует, либо явно маршрутизирует через instrumented send() — никогда не считайте заранее И не делегируйте."
    },
    remediationMissionIds: ["mis_composition_over_inheritance"]
  },
  {
    id: "err_fragile_base_class_subclass",
    code: "ERR_FRAGILE_BASE_CLASS_SUBCLASS",
    title: {
      en: "Extending Concrete Platform Bases for Behavior Addition",
      ru: "Расширение Конкретных Платформенных Баз для Добавления Поведения"
    },
    description: {
      en: "Using inheritance on concrete platform classes (NotificationService and similar) to add instrumentation or cross-cutting behavior, creating silent breakage when base class internal implementations change.",
      ru: "Использование наследования конкретных платформенных классов (NotificationService и аналогов) для добавления инструментирования или сквозного поведения, создавая тихие поломки при изменении внутренних реализаций базового класса."
    },
    conceptIds: ["cpt_fragile_base_class"],
    exampleIncorrectReasoning: {
      en: "Extending NotificationService is convenient because we get send() and sendBatch() for free.",
      ru: "Расширение NotificationService удобно, так как мы получаем send() и sendBatch() бесплатно."
    },
    correctedReasoning: {
      en: "Use composition with EmailSender and SmsSender strategies (or a CountingNotificationService wrapper over NotificationSender). You get the same functionality without depending on NotificationService internals.",
      ru: "Используйте композицию со стратегиями EmailSender и SmsSender (или CountingNotificationService поверх NotificationSender). Тот же функционал без зависимости от внутренностей NotificationService."
    },
    remediationMissionIds: ["mis_composition_over_inheritance"]
  },
  {
    id: "err_subclass_concrete_collection",
    code: "ERR_SUBCLASS_CONCRETE_COLLECTION",
    title: {
      en: "Removing Single-Element Override While Keeping Bulk Override",
      ru: "Удаление Переопределения Одиночного Метода при Сохранении Массового"
    },
    description: {
      en: "Attempting to fix double-counting by removing send() override and counting only in sendBatch(), which leaves individual send() calls uninstrumented and preserves fragile inheritance.",
      ru: "Попытка исправить двойной подсчет удалением переопределения send() и подсчетом только в sendBatch(), что оставляет одиночные send() неинструментированными и сохраняет хрупкое наследование."
    },
    conceptIds: ["cpt_composition_over_inheritance"],
    exampleIncorrectReasoning: {
      en: "Bulk delivery is the main use case, so instrumenting only sendBatch() is sufficient.",
      ru: "Массовая доставка — основной сценарий, поэтому инструментирования только sendBatch() достаточно."
    },
    correctedReasoning: {
      en: "All delivery paths must be consistently instrumented. Use composition with a single instrumented send() method, and route sendBatch() through it explicitly.",
      ru: "Все пути доставки должны быть последовательно инструментированы. Используйте композицию с единым instrumented send(), маршрутизируя sendBatch() через него явно."
    },
    remediationMissionIds: ["mis_composition_over_inheritance"]
  },
  {
    id: "err_sync_fixes_double_count",
    code: "ERR_SYNC_FIXES_DOUBLE_COUNT",
    title: {
      en: "Using Synchronization to Fix Deterministic Double-Counting",
      ru: "Использование Синхронизации для Исправления Детерминированного Двойного Подсчета"
    },
    description: {
      en: "Adding synchronized to send() and sendBatch() believing the double-count is a race condition, when it is actually deterministic single-threaded method call chain duplication.",
      ru: "Добавление synchronized к send() и sendBatch() в убеждении, что двойной подсчет — состояние гонки, когда на самом деле это детерминированное дублирование цепочки вызовов в одном потоке."
    },
    conceptIds: ["cpt_fragile_base_class", "cpt_composition_over_inheritance"],
    exampleIncorrectReasoning: {
      en: "The counter increments twice because two threads call send() concurrently during sendBatch().",
      ru: "Счетчик увеличивается дважды, потому что два потока вызывают send() одновременно во время sendBatch()."
    },
    correctedReasoning: {
      en: "Double-counting is deterministic: sendBatch() pre-counts, then super.sendBatch() calls send() per recipient. Fix the instrumentation logic via composition, not concurrency primitives.",
      ru: "Двойной подсчет детерминирован: sendBatch() предварительно считает, затем super.sendBatch() вызывает send() для каждого получателя. Исправьте логику инструментирования через композицию, а не примитивы конкурентности."
    },
    remediationMissionIds: ["mis_composition_over_inheritance"]
  }
];
