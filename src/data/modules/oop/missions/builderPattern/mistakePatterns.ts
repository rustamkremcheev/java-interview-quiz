import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_BUILDER_PATTERN: readonly MistakePattern[] = [
  {
    id: "err_bld_telescoping_keep",
    code: "ERR_BLD_TELESCOPING_KEEP",
    title: { en: "Keeping Telescoping Overloads Beside Builder", ru: "Оставлять Телескопические Overload Рядом с Builder" },
    description: { en: "Adding a Builder but leaving short overloads that still accept null EvaluationWindow.", ru: "Добавление Builder, но оставление коротких overload, всё ещё принимающих null EvaluationWindow." },
    conceptIds: ["cpt_telescoping_constructor", "cpt_builder_pattern"],
    exampleIncorrectReasoning: { en: "We can keep the old constructors for convenience.", ru: "Старые конструкторы можно оставить для удобства." },
    correctedReasoning: { en: "Remove or privatize incomplete constructors so all paths go through validated build().", ru: "Удалите или сделайте private неполные конструкторы, чтобы все пути шли через валидированный build()." },
    remediationMissionIds: ["mis_builder_pattern"]
  },
  {
    id: "err_bld_validate_in_service_only",
    code: "ERR_BLD_VALIDATE_IN_SERVICE_ONLY",
    title: { en: "Validating Only Inside RiskAssessmentService", ru: "Валидация Только Внутри RiskAssessmentService" },
    description: { en: "Allowing incomplete requests to exist and checking windows only in assess().", ru: "Позволение неполным запросам существовать и проверка окон только в assess()." },
    conceptIds: ["cpt_build_time_validation"],
    exampleIncorrectReasoning: { en: "The service will catch bad windows anyway.", ru: "Сервис всё равно поймает плохие окна." },
    correctedReasoning: { en: "Build-time validation prevents invalid objects from circulating in caches, logs, and queues.", ru: "Build-time валидация не даёт невалидным объектам циркулировать в кэшах, логах и очередях." },
    remediationMissionIds: ["mis_builder_pattern"]
  },
  {
    id: "err_bld_mutable_after_build",
    code: "ERR_BLD_MUTABLE_AFTER_BUILD",
    title: { en: "Mutable RiskAssessmentRequest After Build", ru: "Мутабельный RiskAssessmentRequest После Build" },
    description: { en: "Public setters on the request allow clearing EvaluationWindow after validation.", ru: "Public setters на request позволяют обнулить EvaluationWindow после валидации." },
    conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation"],
    exampleIncorrectReasoning: { en: "Setters make tests easier to tweak fields.", ru: "Setters упростят подкрутку полей в тестах." },
    correctedReasoning: { en: "Keep the built request immutable; rebuild with Builder for changes.", ru: "Держите построенный request immutable; для изменений пересобирайте через Builder." },
    remediationMissionIds: ["mis_builder_pattern"]
  },
  {
    id: "err_bld_optional_mandatory",
    code: "ERR_BLD_OPTIONAL_MANDATORY",
    title: { en: "Treating EvaluationWindow as Optional", ru: "Считать EvaluationWindow Optional" },
    description: { en: "Documenting window as optional on evaluable risk requests, silently defaulting to empty ranges.", ru: "Документирование window как optional для оценимных risk requests с тихим default на пустые диапазоны." },
    conceptIds: ["cpt_build_time_validation"],
    exampleIncorrectReasoning: { en: "If window is missing, evaluate the whole history.", ru: "Если window нет — оценим всю историю." },
    correctedReasoning: { en: "Evaluable requests require an explicit EvaluationWindow; refuse to build otherwise.", ru: "Оценимные запросы требуют явный EvaluationWindow; иначе отказывайтесь build-ить." },
    remediationMissionIds: ["mis_builder_pattern"]
  },
  {
    id: "err_bld_boolean_flag_soup",
    code: "ERR_BLD_BOOLEAN_FLAG_SOUP",
    title: { en: "Adding Boolean Flags Instead of Named Window/Profile", ru: "Добавление Boolean-Флагов Вместо Именованных Window/Profile" },
    description: { en: "Extending telescoping constructors with booleans (wrong pattern from SettlementInstruction mission).", ru: "Расширение телескопических конструкторов boolean-ами (неверный паттерн из миссии SettlementInstruction)." },
    conceptIds: ["cpt_builder_pattern", "cpt_telescoping_constructor"],
    exampleIncorrectReasoning: { en: "A boolean useDefaultWindow flag is simpler than EvaluationWindow.", ru: "Boolean useDefaultWindow проще, чем EvaluationWindow." },
    correctedReasoning: { en: "Use named Builder methods for real domain types; do not recreate flag-swapping hazards.", ru: "Используйте именованные методы Builder для реальных доменных типов; не воссоздавайте hazard swapped flags." },
    remediationMissionIds: ["mis_builder_pattern"]
  }
];
