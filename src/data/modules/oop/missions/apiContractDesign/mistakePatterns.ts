import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_API_CONTRACT_DESIGN: readonly MistakePattern[] = [
  {
    id: "err_api_null_collection_return",
    code: "ERR_API_NULL_COLLECTION_RETURN",
    title: {
      en: "Returning null Collections from Public APIs",
      ru: "Возврат null-коллекций из публичных API"
    },
    description: {
      en: "PaymentAuthorizationService returns null lists for decline reasons, forcing every client into null checks and NPEs when semantics change.",
      ru: "PaymentAuthorizationService возвращает null-списки причин отказа, вынуждая клиентов к null-проверкам и NPE при смене семантики."
    },
    conceptIds: ["cpt_null_vs_empty_collection", "cpt_api_contract"],
    exampleIncorrectReasoning: {
      en: "Null means no declines — callers can check for null.",
      ru: "Null значит нет отказов — вызывающие могут проверить на null."
    },
    correctedReasoning: {
      en: "Return empty immutable lists. Null is not a synonym for empty and breaks behavioral compatibility.",
      ru: "Возвращайте пустые immutable-списки. Null не синоним empty и ломает behavioral compatibility."
    },
    remediationMissionIds: ["mis_api_contract_design"]
  },
  {
    id: "err_api_exception_type_swap",
    code: "ERR_API_EXCEPTION_TYPE_SWAP",
    title: {
      en: "Swapping Exception Types Without Versioning",
      ru: "Смена Типов Исключений без Версионирования"
    },
    description: {
      en: "Changing PaymentAuthorizationException to a different runtime type while keeping the method signature — clients catch the old type and miss failures.",
      ru: "Замена PaymentAuthorizationException на другой runtime-тип при той же сигнатуре — клиенты ловят старый тип и пропускают сбои."
    },
    conceptIds: ["cpt_behavioral_compatibility", "cpt_api_contract"],
    exampleIncorrectReasoning: {
      en: "It is still a RuntimeException — catch-all will handle it.",
      ru: "Это всё ещё RuntimeException — catch-all обработает."
    },
    correctedReasoning: {
      en: "Exception contracts are part of the API. Prefer stable types or additive subtypes; treat removals as major/breaking.",
      ru: "Контракты исключений — часть API. Предпочитайте стабильные типы или additive subtypes; удаления — major/breaking."
    },
    remediationMissionIds: ["mis_api_contract_design"]
  },
  {
    id: "err_api_mutable_return_escape",
    code: "ERR_API_MUTABLE_RETURN_ESCAPE",
    title: {
      en: "Exposing Mutable Internal Collections",
      ru: "Экспозиция Мутабельных Внутренних Коллекций"
    },
    description: {
      en: "Returning a live ArrayList of DeclineReason lets clients mutate provider state and invents a hidden write API.",
      ru: "Возврат живого ArrayList DeclineReason позволяет клиентам мутировать состояние провайдера и создаёт скрытый write API."
    },
    conceptIds: ["cpt_api_contract"],
    exampleIncorrectReasoning: {
      en: "Returning the list is fine — documentation says do not modify.",
      ru: "Возвращать список нормально — в документации сказано не модифицировать."
    },
    correctedReasoning: {
      en: "Return unmodifiable copies or List.copyOf. Documentation is not an enforcement mechanism.",
      ru: "Возвращайте unmodifiable copies или List.copyOf. Документация не является механизмом enforcement."
    },
    remediationMissionIds: ["mis_api_contract_design"]
  },
  {
    id: "err_api_default_method_semantic_shift",
    code: "ERR_API_DEFAULT_METHOD_SEMANTIC_SHIFT",
    title: {
      en: "Changing Default Method Semantics Silently",
      ru: "Тихая Смена Семантики Default-Метода"
    },
    description: {
      en: "Altering a default method on PaymentAuthorizationService so existing implementors inherit new behavior without recompilation awareness.",
      ru: "Изменение default-метода PaymentAuthorizationService так, что существующие реализации наследуют новое поведение без осознания при компиляции."
    },
    conceptIds: ["cpt_behavioral_compatibility"],
    exampleIncorrectReasoning: {
      en: "Default methods are for evolution — any change is fine.",
      ru: "Default methods для эволюции — любое изменение нормально."
    },
    correctedReasoning: {
      en: "Default methods must preserve prior behavioral contracts or ship as a major version with migration notes.",
      ru: "Default methods должны сохранять прежние behavioral contracts или выходить как major с migration notes."
    },
    remediationMissionIds: ["mis_api_contract_design"]
  },
  {
    id: "err_api_signature_compat_enough",
    code: "ERR_API_SIGNATURE_COMPAT_ENOUGH",
    title: {
      en: "Treating Signature Compatibility as Sufficient",
      ru: "Считать Совместимость Сигнатур Достаточной"
    },
    description: {
      en: "Assuming that if client code still compiles, the API change is safe — ignoring nullability, mutability, and exception postconditions.",
      ru: "Предположение, что если клиентский код компилируется, изменение API безопасно — игнорируя nullability, mutability и postconditions исключений."
    },
    conceptIds: ["cpt_behavioral_compatibility", "cpt_api_contract"],
    exampleIncorrectReasoning: {
      en: "CI compiled all services — ship it.",
      ru: "CI скомпилировал все сервисы — можно выкатывать."
    },
    correctedReasoning: {
      en: "Behavioral compatibility is a third axis beyond source and binary compatibility. Contract tests must assert postconditions.",
      ru: "Behavioral compatibility — третья ось помимо source и binary. Contract-тесты должны проверять postconditions."
    },
    remediationMissionIds: ["mis_api_contract_design"]
  }
];
