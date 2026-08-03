import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_TEMPLATE_METHOD_PATTERN: readonly MistakePattern[] = [
  {
    id: "err_tm_override_template",
    code: "ERR_TM_OVERRIDE_TEMPLATE",
    title: {
      en: "Allowing Subclasses to Override the Template Method",
      ru: "Разрешение Подклассам Переопределять Template Method"
    },
    description: {
      en: "CrossBorderSettlementProcessor overrides processBatch() and skips ComplianceCheck, breaking the invariant workflow.",
      ru: "CrossBorderSettlementProcessor переопределяет processBatch() и пропускает ComplianceCheck, ломая инвариантный workflow."
    },
    conceptIds: ["cpt_template_method", "cpt_final_template_skeleton"],
    exampleIncorrectReasoning: {
      en: "Cross-border needs a faster path — override the whole process.",
      ru: "Cross-border нужен быстрый путь — переопределим весь process."
    },
    correctedReasoning: {
      en: "Mark the template final. Vary only documented abstract/hook steps; keep compliance mandatory in the superclass.",
      ru: "Сделайте template final. Варьируйте только задокументированные abstract/hook шаги; compliance оставьте обязательным в суперклассе."
    },
    remediationMissionIds: ["mis_template_method_pattern"]
  },
  {
    id: "err_tm_confuse_with_strategy",
    code: "ERR_TM_CONFUSE_WITH_STRATEGY",
    title: {
      en: "Confusing Template Method with Strategy",
      ru: "Путаница Template Method и Strategy"
    },
    description: {
      en: "Replacing a sealed workflow with interchangeable strategies without preserving mandatory compliance ordering.",
      ru: "Замена герметичного workflow взаимозаменяемыми strategies без сохранения обязательного порядка compliance."
    },
    conceptIds: ["cpt_hook_vs_strategy", "cpt_template_method"],
    exampleIncorrectReasoning: {
      en: "Strategy is always better than inheritance templates.",
      ru: "Strategy всегда лучше inheritance templates."
    },
    correctedReasoning: {
      en: "Strategy varies whole algorithms; Template Method varies steps inside a fixed skeleton. Choose based on whether the invariant sequence must be enforced.",
      ru: "Strategy варьирует целые алгоритмы; Template Method — шаги внутри фиксированного скелета. Выбирайте по необходимости enforcement инвариантной последовательности."
    },
    remediationMissionIds: ["mis_template_method_pattern"]
  },
  {
    id: "err_tm_ctor_calls_hook",
    code: "ERR_TM_CTOR_CALLS_HOOK",
    title: {
      en: "Calling Overridable Hooks from Constructors",
      ru: "Вызов Overridable Hooks из Конструкторов"
    },
    description: {
      en: "Superclass constructor invokes an overridable settle hook before subclass fields initialize.",
      ru: "Конструктор суперкласса вызывает overridable settle-hook до инициализации полей подкласса."
    },
    conceptIds: ["cpt_template_method"],
    exampleIncorrectReasoning: {
      en: "Calling processBatch from the constructor ensures setup.",
      ru: "Вызов processBatch из конструктора обеспечивает setup."
    },
    correctedReasoning: {
      en: "Never invoke overridable methods from constructors. Run the template after full construction.",
      ru: "Никогда не вызывайте overridable methods из конструкторов. Запускайте template после полной конструкции."
    },
    remediationMissionIds: ["mis_template_method_pattern"]
  },
  {
    id: "err_tm_unprotected_hooks",
    code: "ERR_TM_UNPROTECTED_HOOKS",
    title: {
      en: "Undocumented Protected Hooks as Free Extension Surface",
      ru: "Недокументированные Protected Hooks как Свободная Поверхность Расширения"
    },
    description: {
      en: "Leaving many protected mutators without @implSpec invites subclasses to corrupt shared settlement state.",
      ru: "Много protected mutators без @implSpec приглашает подклассы портить общее settlement-состояние."
    },
    conceptIds: ["cpt_final_template_skeleton"],
    exampleIncorrectReasoning: {
      en: "Protected means subclasses may change anything.",
      ru: "Protected значит, что подклассы могут менять что угодно."
    },
    correctedReasoning: {
      en: "Document and minimize hooks. Prefer private helpers for mandatory steps.",
      ru: "Документируйте и минимизируйте hooks. Для обязательных шагов предпочитайте private helpers."
    },
    remediationMissionIds: ["mis_template_method_pattern"]
  },
  {
    id: "err_tm_duplicate_workflows",
    code: "ERR_TM_DUPLICATE_WORKFLOWS",
    title: {
      en: "Copy-Pasting EOD Workflows Across Processors",
      ru: "Copy-Paste EOD Workflows между Процессорами"
    },
    description: {
      en: "Domestic and CrossBorder each duplicate the six-step flow so compliance drifts independently.",
      ru: "Domestic и CrossBorder дублируют шестишаговый flow, поэтому compliance расходится независимо."
    },
    conceptIds: ["cpt_template_method"],
    exampleIncorrectReasoning: {
      en: "Duplication is clearer than inheritance.",
      ru: "Дублирование яснее наследования."
    },
    correctedReasoning: {
      en: "A final template centralizes the invariant sequence; subclasses supply rail-specific steps only.",
      ru: "Final template централизует инвариантную последовательность; подклассы дают только rail-specific шаги."
    },
    remediationMissionIds: ["mis_template_method_pattern"]
  }
];
