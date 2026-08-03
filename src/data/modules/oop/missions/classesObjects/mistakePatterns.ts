import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_CLASSES_OBJECTS: readonly MistakePattern[] = [
  {
    id: "err_co_reuse_mutable_draft",
    code: "ERR_CO_REUSE_MUTABLE_DRAFT",
    title: {
      en: "Reusing One Mutable Draft Across Records",
      ru: "Переиспользование Одного Mutable Draft на Записи"
    },
    description: {
      en: "Keeping a single PaymentInstruction field/local outside the import loop and mutating it for every CSV row.",
      ru: "Держать один PaymentInstruction вне цикла импорта и мутировать его на каждую CSV-строку."
    },
    conceptIds: ["cpt_object_reference", "cpt_independent_instances"],
    exampleIncorrectReasoning: {
      en: "Creating objects is expensive — reuse one draft and overwrite fields.",
      ru: "Создавать объекты дорого — переиспользуем один draft и перезаписываем поля."
    },
    correctedReasoning: {
      en: "Correctness requires independent instances per business record; optimize only with safe pooling that never aliases into collections.",
      ru: "Корректность требует независимых экземпляров на бизнес-запись; оптимизируйте только безопасным pooling без aliasing в коллекциях."
    },
    remediationMissionIds: ["mis_classes_objects"]
  },
  {
    id: "err_co_confuse_class_with_instance",
    code: "ERR_CO_CONFUSE_CLASS_WITH_INSTANCE",
    title: {
      en: "Confusing Class Existence with Object Instances",
      ru: "Путаница Существования Класса с Экземплярами"
    },
    description: {
      en: "Assuming having a PaymentInstruction class somehow yields N independent payments without N allocations.",
      ru: "Предположение, что наличие класса PaymentInstruction само даёт N независимых платежей без N аллокаций."
    },
    conceptIds: ["cpt_class_vs_object"],
    exampleIncorrectReasoning: {
      en: "We already modeled PaymentInstruction — the batch should just work.",
      ru: "Мы уже смоделировали PaymentInstruction — батч должен просто работать."
    },
    correctedReasoning: {
      en: "A class is a blueprint. Runtime payments require distinct objects (or equivalent immutable values) per row.",
      ru: "Класс — чертёж. Runtime-платежам нужны отдельные объекты (или эквивалентные immutable values) на строку."
    },
    remediationMissionIds: ["mis_classes_objects"]
  },
  {
    id: "err_co_think_add_copies_fields",
    code: "ERR_CO_THINK_ADD_COPIES_FIELDS",
    title: {
      en: "Believing List.add Snapshots Field Values",
      ru: "Вера, что List.add Делает Snapshot Полей"
    },
    description: {
      en: "Thinking batch.add(draft) deep-copies field values into the list.",
      ru: "Думать, что batch.add(draft) глубоко копирует значения полей в список."
    },
    conceptIds: ["cpt_object_reference"],
    exampleIncorrectReasoning: {
      en: "Once added, the list has its own copy of amount and beneficiary.",
      ru: "После add у списка своя копия amount и beneficiary."
    },
    correctedReasoning: {
      en: "Java lists store references. Field mutations remain visible through every alias.",
      ru: "Списки Java хранят ссылки. Мутации полей видны через каждый alias."
    },
    remediationMissionIds: ["mis_classes_objects"]
  },
  {
    id: "err_co_equals_as_fix",
    code: "ERR_CO_EQUALS_AS_FIX",
    title: {
      en: "Trying to Fix Aliasing with equals/hashCode",
      ru: "Попытка Чинить Aliasing через equals/hashCode"
    },
    description: {
      en: "Proposing equals overrides to mask identical last-row values instead of creating instances.",
      ru: "Предлагать overrides equals, чтобы замаскировать одинаковые значения последней строки, вместо создания экземпляров."
    },
    conceptIds: ["cpt_class_vs_object"],
    exampleIncorrectReasoning: {
      en: "If equals ignores duplicates, the bug disappears.",
      ru: "Если equals игнорирует дубликаты, баг исчезнет."
    },
    correctedReasoning: {
      en: "Lost distinct PaymentIds/amounts are a creation/identity bug, not an equality-contract bug.",
      ru: "Потерянные разные PaymentId/суммы — баг creation/identity, не контракта равенства."
    },
    remediationMissionIds: ["mis_classes_objects"]
  },
  {
    id: "err_co_shallow_clone_pool",
    code: "ERR_CO_SHALLOW_CLONE_POOL",
    title: {
      en: "Unsafe Shallow Clone or Draft Pooling",
      ru: "Небезопасный Shallow Clone или Pooling Draft"
    },
    description: {
      en: "Using fragile clone()/object pools that still share mutable state across batch entries.",
      ru: "Использовать хрупкий clone()/object pool, всё ещё делящий мутабельное состояние между записями батча."
    },
    conceptIds: ["cpt_independent_instances"],
    exampleIncorrectReasoning: {
      en: "clone() before add is always a full independent payment.",
      ru: "clone() перед add всегда даёт полностью независимый платёж."
    },
    correctedReasoning: {
      en: "Prefer explicit factory construction; treat clone/pooling as advanced and easy to get shallow-wrong.",
      ru: "Предпочитайте явную factory-сборку; clone/pooling — advanced и легко получить shallow-wrong."
    },
    remediationMissionIds: ["mis_classes_objects"]
  }
];
