import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OBJECT_CLASS_CONTRACTS: readonly MistakePattern[] = [
  {
    id: "err_ojc_identity_as_business_equals",
    code: "ERR_OC_IDENTITY_AS_BUSINESS_EQUALS",
    title: {
      en: "Treating Object Identity Equals as Business Uniqueness",
      ru: "Принятие Object Identity Equals за Бизнес-Уникальность"
    },
    description: {
      en: "Using List.contains / default equals on ComplianceEvent for repository dedup without an eventId key or deliberate value equals.",
      ru: "Использовать List.contains / default equals на ComplianceEvent для дедупа репозитория без ключа eventId или осознанного value equals."
    },
    conceptIds: ["cpt_java_lang_object"],
    exampleIncorrectReasoning: {
      en: "If two ComplianceEvent objects are 'the same event', contains will find them automatically.",
      ru: "Если два ComplianceEvent — «одно событие», contains найдёт их автоматически."
    },
    correctedReasoning: {
      en: "Default equals is identity. Business dedup needs an explicit key (eventId) or a designed value-equals policy.",
      ru: "Default equals — identity. Бизнес-дедупу нужен явный ключ (eventId) или спроектированная value-equals политика."
    },
    remediationMissionIds: ["mis_object_class_contracts"]
  },
  {
    id: "err_ojc_trust_default_tostring",
    code: "ERR_OC_TRUST_DEFAULT_TOSTRING",
    title: {
      en: "Trusting Default Class@hex toString in Audits",
      ru: "Доверие Default Class@hex toString в Аудитах"
    },
    description: {
      en: "Relying on Object.toString in AuditSnapshot, producing ComplianceEvent@hex noise instead of useful diagnostics.",
      ru: "Полагаться на Object.toString в AuditSnapshot, получая шум ComplianceEvent@hex вместо полезной диагностики."
    },
    conceptIds: ["cpt_java_lang_object"],
    exampleIncorrectReasoning: {
      en: "Logging the object reference is enough for compliance investigators.",
      ru: "Логирования ссылки на объект достаточно для compliance-расследователей."
    },
    correctedReasoning: {
      en: "Provide a deliberate diagnostic toString (without dumping secrets) so AuditSnapshot is readable.",
      ru: "Дайте осознанный диагностический toString (без дампа секретов), чтобы AuditSnapshot был читаемым."
    },
    remediationMissionIds: ["mis_object_class_contracts"]
  },
  {
    id: "err_ojc_shallow_clone_shared_state",
    code: "ERR_OC_SHALLOW_CLONE_SHARED_STATE",
    title: {
      en: "Assuming Object.clone Gives Independent Cases",
      ru: "Предположение, что Object.clone Даёт Независимые Кейсы"
    },
    description: {
      en: "Using ComplianceCase.clone() for investigation probes while nested evidence lists remain shared.",
      ru: "Использовать ComplianceCase.clone() для investigation probes, пока nested списки evidence остаются общими."
    },
    conceptIds: ["cpt_clone_pitfalls"],
    exampleIncorrectReasoning: {
      en: "clone() always deep-copies everything — annotating the probe cannot touch production.",
      ru: "clone() всегда deep-копирует всё — аннотации probe не затронут production."
    },
    correctedReasoning: {
      en: "Prefer explicit copy constructors/factories that allocate independent nested collections.",
      ru: "Предпочитайте явные copy constructors/factories, выделяющие независимые nested-коллекции."
    },
    remediationMissionIds: ["mis_object_class_contracts"]
  },
  {
    id: "err_ojc_getclass_rejects_subtypes",
    code: "ERR_OC_GETCLASS_REJECTS_SUBTYPES",
    title: {
      en: "Using getClass When instanceof Was Intended",
      ru: "Использование getClass, Когда Был Нужен instanceof"
    },
    description: {
      en: "EventClassifier rejects valid ComplianceEvent subtypes via exact getClass equality.",
      ru: "EventClassifier отвергает валидные подтипы ComplianceEvent через точное равенство getClass."
    },
    conceptIds: ["cpt_getclass_vs_instanceof"],
    exampleIncorrectReasoning: {
      en: "Only the exact ComplianceEvent class is ever valid — subtypes are always bugs.",
      ru: "Валиден только точный класс ComplianceEvent — подтипы всегда баги."
    },
    correctedReasoning: {
      en: "If the hierarchy is polymorphic, use instanceof (or sealed types). Reserve getClass for exact-type policies.",
      ru: "Если иерархия полиморфна, используйте instanceof (или sealed types). Оставляйте getClass для exact-type политик."
    },
    remediationMissionIds: ["mis_object_class_contracts"]
  },
  {
    id: "err_ojc_finalize_for_cleanup",
    code: "ERR_OC_FINALIZE_FOR_CLEANUP",
    title: {
      en: "Relying on finalize for Resource Cleanup",
      ru: "Полагание на finalize для Очистки Ресурсов"
    },
    description: {
      en: "Overriding finalize on EventClassifier / ComplianceEvent to close handles, despite JEP 421.",
      ru: "Переопределять finalize на EventClassifier / ComplianceEvent для закрытия handles вопреки JEP 421."
    },
    conceptIds: ["cpt_java_lang_object"],
    exampleIncorrectReasoning: {
      en: "GC will always run finalize before the process exits — safe enough for file handles.",
      ru: "GC всегда вызовет finalize до выхода процесса — достаточно безопасно для file handles."
    },
    correctedReasoning: {
      en: "finalize is deprecated for removal. Use try-with-resources, explicit close, or Cleaner.",
      ru: "finalize deprecated for removal. Используйте try-with-resources, явный close или Cleaner."
    },
    remediationMissionIds: ["mis_object_class_contracts"]
  }
];
