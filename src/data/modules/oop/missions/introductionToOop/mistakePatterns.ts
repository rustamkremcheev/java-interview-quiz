import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_INTRODUCTION_TO_OOP: readonly MistakePattern[] = [
  {
    id: "err_intro_map_as_domain",
    code: "ERR_INTRO_MAP_AS_DOMAIN",
    title: {
      en: "Treating HashMap as the Domain Model",
      ru: "Считать HashMap Доменной Моделью"
    },
    description: {
      en: "Using Map<String,Object> as the clearing payment model so every helper casts fields and invents its own schema.",
      ru: "Использование Map<String,Object> как модели clearing payment, из-за чего каждый хелпер кастит поля и изобретает свою схему."
    },
    conceptIds: ["cpt_procedural_vs_oop", "cpt_oop_paradigm"],
    exampleIncorrectReasoning: {
      en: "Maps are flexible — we can add rail fields without creating classes.",
      ru: "Maps гибкие — можно добавлять поля rail без создания классов."
    },
    correctedReasoning: {
      en: "Flexibility without ownership becomes schema drift. Model ClearingPayment with typed fields and status.",
      ru: "Гибкость без владения становится дрейфом схемы. Моделируйте ClearingPayment с типизированными полями и статусом."
    },
    remediationMissionIds: ["mis_introduction_to_oop"]
  },
  {
    id: "err_intro_string_status",
    code: "ERR_INTRO_STRING_STATUS",
    title: {
      en: "String Status Vocabulary Drift",
      ru: "Дрейф Словаря Строковых Статусов"
    },
    description: {
      en: "Encoding statuses as \"PEND\"/\"OK\"/\"REJ\" strings that differ across helpers when a new rail arrives.",
      ru: "Кодирование статусов строками \"PEND\"/\"OK\"/\"REJ\", которые расходятся между хелперами при новом rail."
    },
    conceptIds: ["cpt_procedural_vs_oop"],
    exampleIncorrectReasoning: {
      en: "Strings are fine if we document the allowed values in a wiki.",
      ru: "Строки нормальны, если задокументировать допустимые значения в wiki."
    },
    correctedReasoning: {
      en: "Use ClearingPaymentStatus enum (or equivalent) and a single transition API.",
      ru: "Используйте enum ClearingPaymentStatus (или эквивалент) и единый API переходов."
    },
    remediationMissionIds: ["mis_introduction_to_oop"]
  },
  {
    id: "err_intro_global_helpers",
    code: "ERR_INTRO_GLOBAL_HELPERS",
    title: {
      en: "Business Rules in Global Static Helpers",
      ru: "Бизнес-Правила в Глобальных Static-Хелперах"
    },
    description: {
      en: "Scattering validate/mark/persist rules across static utilities that mutate shared maps independently.",
      ru: "Размазывание правил validate/mark/persist по static utilities, независимо мутирующим общие maps."
    },
    conceptIds: ["cpt_object_collaboration", "cpt_procedural_vs_oop"],
    exampleIncorrectReasoning: {
      en: "Static helpers are easy to call from anywhere — that is reuse.",
      ru: "Static-хелперы легко вызывать откуда угодно — это reuse."
    },
    correctedReasoning: {
      en: "Reuse without ownership creates dual writers. Collaborate via workflow, policy, and store.",
      ru: "Reuse без владения создаёт dual writers. Сотрудничайте через workflow, policy и store."
    },
    remediationMissionIds: ["mis_introduction_to_oop"]
  },
  {
    id: "err_intro_payment_processor_dump",
    code: "ERR_INTRO_PAYMENT_PROCESSOR_DUMP",
    title: {
      en: "Dumping Everything into StaticClearingUtils",
      ru: "Сваливание Всего в StaticClearingUtils"
    },
    description: {
      en: "Renaming the script to StaticClearingUtils with static methods — still procedural, and collides with LSP mission naming.",
      ru: "Переименование скрипта в StaticClearingUtils со static-методами — всё ещё процедурно и конфликтует с именованием миссии LSP."
    },
    conceptIds: ["cpt_oop_paradigm"],
    exampleIncorrectReasoning: {
      en: "If it is a class named StaticClearingUtils, we are doing OOP.",
      ru: "Если это класс с именем StaticClearingUtils — мы делаем ООП."
    },
    correctedReasoning: {
      en: "Use ClearingPayment collaborators with instance behavior. Avoid StaticClearingUtils as a name in this module.",
      ru: "Используйте сотрудников ClearingPayment с поведением на экземплярах. Избегайте имени StaticClearingUtils в этом модуле."
    },
    remediationMissionIds: ["mis_introduction_to_oop"]
  },
  {
    id: "err_intro_oop_means_inheritance",
    code: "ERR_INTRO_OOP_MEANS_INHERITANCE",
    title: {
      en: "Believing OOP Requires Deep Inheritance",
      ru: "Считать, что ООП Требует Глубокого Наследования"
    },
    description: {
      en: "Assuming the fix is a ClearingPayment inheritance tree rather than collaboration among workflow, policy, and store.",
      ru: "Предположение, что фикс — дерево наследования ClearingPayment, а не сотрудничество workflow, policy и store."
    },
    conceptIds: ["cpt_oop_paradigm", "cpt_object_collaboration"],
    exampleIncorrectReasoning: {
      en: "OOP means inventing a superclass for every rail subtype first.",
      ru: "ООП значит сначала изобрести суперкласс для каждого подтипа rail."
    },
    correctedReasoning: {
      en: "Start with encapsulation and collaboration. Inheritance is optional and often unnecessary for this refactor.",
      ru: "Начните с инкапсуляции и сотрудничества. Наследование опционально и часто не нужно для этого рефакторинга."
    },
    remediationMissionIds: ["mis_introduction_to_oop"]
  }
];
