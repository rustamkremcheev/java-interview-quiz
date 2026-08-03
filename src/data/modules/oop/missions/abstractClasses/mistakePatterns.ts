import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_ABSTRACT_CLASSES: readonly MistakePattern[] = [
  {
    id: "err_override_settle_skip_audit",
    code: "ERR_OVERRIDE_SETTLE_SKIP_AUDIT",
    title: {
      en: "Subclass Overrides settle() and Skips Audit",
      ru: "Подкласс Переопределяет settle() и Пропускает Audit"
    },
    description: {
      en: "Overriding the public lifecycle entry point to take a 'fast path' that authorizes and captures without running the superclass audit step.",
      ru: "Переопределение публичной точки входа lifecycle ради «fast path», который делает authorize и capture без шага audit суперкласса."
    },
    conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
    exampleIncorrectReasoning: {
      en: "Wire can override settle() for speed — audit is optional for trusted rails.",
      ru: "Wire может переопределить settle() ради скорости — audit опционален для доверенных rails."
    },
    correctedReasoning: {
      en: "Make settle() final so every rail always runs validate → authorize → capture → audit. Customize only authorize/capture hooks.",
      ru: "Сделайте settle() final, чтобы каждый rail всегда выполнял validate → authorize → capture → audit. Кастомизируйте только хуки authorize/capture."
    },
    remediationMissionIds: ["mis_abstract_classes"]
  },
  {
    id: "err_protected_state_mutation",
    code: "ERR_PROTECTED_STATE_MUTATION",
    title: {
      en: "Illegal Mutation of Protected Abstract-Class State",
      ru: "Незаконная Мутация Protected-Состояния Абстрактного Класса"
    },
    description: {
      en: "Subclass writes to undocumented protected fields mid-lifecycle, short-circuiting invariants or skipping later template steps.",
      ru: "Подкласс пишет в недокументированные protected-поля mid-lifecycle, ломая инварианты или пропуская последующие шаги шаблона."
    },
    conceptIds: ["cpt_abstract_class", "cpt_access_modifiers"],
    exampleIncorrectReasoning: {
      en: "Protected fields are for subclasses to use freely — Card can set audited=true without calling audit().",
      ru: "Protected-поля для свободного использования подклассами — Card может выставить audited=true без вызова audit()."
    },
    correctedReasoning: {
      en: "Keep lifecycle flags private; expose only documented protected hooks. Design for inheritance or prohibit it (Item 19).",
      ru: "Держите lifecycle-флаги private; открывайте только документированные protected-хуки. Проектируйте для наследования или запрещайте его (Item 19)."
    },
    remediationMissionIds: ["mis_abstract_classes"]
  },
  {
    id: "err_interface_instead_of_abstract",
    code: "ERR_INTERFACE_INSTEAD_OF_ABSTRACT",
    title: {
      en: "Interface Chosen When Shared State & Constructors Are Required",
      ru: "Выбран Интерфейс, Когда Нужны Общее Состояние и Конструкторы"
    },
    description: {
      en: "Modeling the settlement processor as an interface forces duplicated state, constructors, and audit wiring across Card/Wire — losing a single extension contract.",
      ru: "Моделирование settlement processor как интерфейса вынуждает дублировать состояние, конструкторы и wiring audit в Card/Wire — теряется единый контракт расширения."
    },
    conceptIds: ["cpt_abstract_class"],
    exampleIncorrectReasoning: {
      en: "Always prefer interfaces — abstract classes are legacy (Item 20 misapplied).",
      ru: "Всегда предпочитайте интерфейсы — абстрактные классы устарели (неверное применение Item 20)."
    },
    correctedReasoning: {
      en: "Item 20 prefers interfaces for capability contracts. When you need instance fields, constructors, and protected hooks with a final skeleton, an abstract class is the right tool.",
      ru: "Item 20 предпочитает интерфейсы для capability-контрактов. Когда нужны instance fields, конструкторы и protected-хуки с final-скелетом — правильный инструмент абстрактный класс."
    },
    remediationMissionIds: ["mis_abstract_classes"]
  },
  {
    id: "err_undocumented_hooks",
    code: "ERR_UNDOCUMENTED_HOOKS",
    title: {
      en: "Undocumented Protected Hooks Invite Fragile Overrides",
      ru: "Недокументированные Protected-Хуки Приглашают Хрупкие Override"
    },
    description: {
      en: "Exposing protected methods/fields without documenting when they are called, what invariants hold, and which overrides are legal.",
      ru: "Открытие protected-методов/полей без документации: когда вызываются, какие инварианты держатся и какие override законны."
    },
    conceptIds: ["cpt_template_hooks", "cpt_fragile_base_class"],
    exampleIncorrectReasoning: {
      en: "Protected is enough documentation — subclasses will figure out the call order.",
      ru: "Protected — достаточная документация; подклассы сами разберутся с порядком вызовов."
    },
    correctedReasoning: {
      en: "Document the extension contract: settle() is final; authorize/capture are the only hooks; audit is private and always runs after capture.",
      ru: "Документируйте контракт расширения: settle() final; authorize/capture — единственные хуки; audit private и всегда идёт после capture."
    },
    remediationMissionIds: ["mis_abstract_classes"]
  },
  {
    id: "err_confuse_with_full_template_method",
    code: "ERR_CONFUSE_WITH_FULL_TEMPLATE_METHOD",
    title: {
      en: "Treating Abstract-Class Discipline as Full Template Method Catalog",
      ru: "Путаница Дисциплины Abstract Class с Полным Каталогом Template Method"
    },
    description: {
      en: "Focusing only on GoF Template Method naming while missing abstract-vs-interface choice, constructor chaining, and protected-state rules that caused the audit gap.",
      ru: "Фокус только на названии GoF Template Method при игнорировании выбора abstract-vs-interface, цепочки конструкторов и правил protected-состояния, вызвавших дыру в audit."
    },
    conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
    exampleIncorrectReasoning: {
      en: "This is just Template Method — rename settle to templateMethod and we are done.",
      ru: "Это просто Template Method — переименуем settle в templateMethod и готово."
    },
    correctedReasoning: {
      en: "Template-style hooks are the mechanism; the interview focus is why an abstract class holds state/constructors and how final + documented hooks prevent lifecycle bypass.",
      ru: "Хуки в стиле Template — механизм; фокус интервью — почему абстрактный класс держит state/конструкторы и как final + документированные хуки предотвращают обход lifecycle."
    },
    remediationMissionIds: ["mis_abstract_classes"]
  }
];
