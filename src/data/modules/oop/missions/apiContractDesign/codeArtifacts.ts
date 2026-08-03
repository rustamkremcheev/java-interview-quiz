import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_API_CONTRACT_DESIGN: readonly CodeArtifact[] = [
  {
    id: "art_api_domain", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Domain Types", ru: "Доменные Типы" },
    sourceCode: "package com.bank.authz;\n\nimport java.util.List;\n\npublic record AuthorizationRequest(String id, long amountCents) {}\npublic enum DeclineReason { POLICY, LIMIT, FRAUD }\npublic record AuthorizationResult(boolean approved, String requestId, List<DeclineReason> reasons) {\n    public static AuthorizationResult approved(String id, List<DeclineReason> reasons) {\n        return new AuthorizationResult(true, id, reasons);\n    }\n    public static AuthorizationResult declined(String id, List<DeclineReason> reasons) {\n        return new AuthorizationResult(false, id, reasons);\n    }\n}\npublic class PaymentAuthorizationException extends RuntimeException {\n    public PaymentAuthorizationException(String msg) { super(msg); }\n}\n",
    annotations: [{ id: "ann_api_dom_1", startLine: 1, endLine: 1, category: "WHY_IT_EXISTS",
      title: { en: "Domain Anchor", ru: "Доменный Якорь" },
      explanation: { en: "Domain types anchor the mission scenario.", ru: "Доменные типы якорят сценарий миссии." },
      conceptDemonstrated: "cpt_api_contract" }],
    relatedQuestionIds: ["q_api_auth_01"], conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], tags: ["#api", "#domain"]
  },
  {
    id: "art_api_broken", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Broken Baseline", ru: "Исходный Нарушенный Код" },
    sourceCode: "public AuthorizationResult authorize(AuthorizationRequest req) {\n    if (!policy.allows(req)) {\n        throw new PaymentAuthorizationException(\"DECLINED\");\n    }\n    return AuthorizationResult.approved(req.id(), null); // null reasons\n}",
    annotations: [{ id: "ann_api_brk_1", startLine: 1, endLine: 3, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Failure Mode", ru: "Режим Отказа" },
      explanation: {"en":"PaymentAuthorizationService changed declineReasons from null (none) to empty list, and started throwing PaymentAuthorizationException where clients expected Aut","ru":"PaymentAuthorizationService сменил declineReasons с null (нет причин) на empty list и начал бросать PaymentAuthorizationException там, где клиенты ждали Authori"},
      conceptDemonstrated: "cpt_api_contract" }],
    relatedQuestionIds: ["q_api_auth_01"], conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], tags: ["#api", "#counter-example"]
  },
  {
    id: "art_api_solution", type: "CORRECT_SOLUTION", language: "java", javaVersion: "17",
    title: { en: "Production Fix", ru: "Продакшн Фикс" },
    sourceCode: "public AuthorizationResult authorize(AuthorizationRequest req) {\n    if (!policy.allows(req)) {\n        return AuthorizationResult.declined(req.id(), List.of(DeclineReason.POLICY));\n    }\n    return AuthorizationResult.approved(req.id(), List.of());\n}",
    annotations: [{ id: "ann_api_sol_1", startLine: 1, endLine: 5, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Structural Fix", ru: "Структурный Фикс" },
      explanation: {"en":"Elevator Pitch (30 sec): PaymentAuthorizationService broke clients by switching declines to exceptions and flipping null vs empty declineReasons. API contract i","ru":"Elevator Pitch (30 сек): PaymentAuthorizationService сломал клиентов сменой declines на exceptions и переворотом null vs empty. API-контракт — поведенческий. Фи"},
      problemSolved: {"en":"Evolve PaymentAuthorizationService so AuthorizationResult, DeclineReason, and null-vs-empty collection semantics stay behaviorally compatible — no silent client failures.","ru":"Эволюционируйте PaymentAuthorizationService так, чтобы AuthorizationResult, DeclineReason и семантика null-vs-empty коллекций оставались поведенчески совместимы — без тихих провалов клиентов."},
      conceptDemonstrated: "cpt_api_contract" }],
    relatedQuestionIds: ["q_api_auth_01"], conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], tags: ["#api", "#solution"]
  },
  {
    id: "art_api_bughunt", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Bug Hunt Code", ru: "Код для Поиска Бага" },
    sourceCode: "public AuthorizationResult authorize(AuthorizationRequest req) {\n    if (!policy.allows(req)) {\n        throw new PaymentAuthorizationException(\"DECLINED\");\n    }\n    return AuthorizationResult.approved(req.id(), null); // null reasons\n}",
    annotations: [{ id: "ann_api_bug_1", startLine: 1, endLine: 4, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Defect Region", ru: "Область Дефекта" },
      explanation: { en: "Defect lines match the bug hunt challenge.", ru: "Строки дефекта соответствуют challenge bug hunt." },
      conceptDemonstrated: "cpt_api_contract" }],
    relatedQuestionIds: ["q_api_auth_01"], conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], tags: ["#api", "#bug-hunt"]
  },
  {
    id: "art_api_supplement", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Supplementary Collaborators", ru: "Дополнительные Сотрудники" },
    sourceCode: "public AuthorizationResult authorize(AuthorizationRequest req) {\n    if (!policy.allows(req)) {\n        return AuthorizationResult.declined(req.id(), List.of(DeclineReason.POLICY));\n    }\n    return AuthorizationResult.approved(req.id(), List.of());\n}",
    annotations: [{ id: "ann_api_sup_1", startLine: 1, endLine: 2, category: "INTERVIEW_CONCEPT",
      title: { en: "Interview Talking Point", ru: "Точка для Интервью" },
      explanation: {"en":"Deep Mechanics (60 sec): PublishedInterface means clients depend on documented behavior. AuthorizationRequest/Result/DeclineReason form the ","ru":"Глубокая Механика (60 сек): PublishedInterface значит клиенты зависят от документированного поведения. AuthorizationRequest/Result/DeclineRe"},
      conceptDemonstrated: "cpt_behavioral_compatibility" }],
    relatedQuestionIds: ["q_api_auth_01"], conceptIds: ["cpt_api_contract","cpt_behavioral_compatibility","cpt_null_vs_empty_collection"], tags: ["#api", "#supplement"]
  }
];
