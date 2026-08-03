import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_DECORATOR_PATTERN: readonly CodeArtifact[] = [
  {
    id: "art_dec_domain", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Domain Types", ru: "Доменные Типы" },
    sourceCode: "package com.bank.transfer;\n\npublic record TransferRequest(String fromAccount, String toAccount, long amountCents) {}\npublic record TransferResult(boolean success, String reference) {}\n\npublic interface FundsTransferGateway {\n    TransferResult transfer(TransferRequest request);\n}\n\npublic final class CoreFundsTransferGateway implements FundsTransferGateway {\n    @Override public TransferResult transfer(TransferRequest request) {\n        return new TransferResult(true, \"CORE-\" + request.fromAccount());\n    }\n}\n",
    annotations: [{ id: "ann_dec_dom_1", startLine: 1, endLine: 1, category: "WHY_IT_EXISTS",
      title: { en: "Domain Anchor", ru: "Доменный Якорь" },
      explanation: { en: "Domain types anchor the mission scenario.", ru: "Доменные типы якорят сценарий миссии." },
      conceptDemonstrated: "cpt_decorator_pattern" }],
    relatedQuestionIds: ["q_dec_audit_01"], conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], tags: ["#dec", "#domain"]
  },
  {
    id: "art_dec_broken", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Broken Baseline", ru: "Исходный Нарушенный Код" },
    sourceCode: "FundsTransferGateway gw = new RetryingFundsTransferGateway(\n    new AuthorizedFundsTransferGateway(new CoreFundsTransferGateway()));\n// AuditedFundsTransferGateway missing",
    annotations: [{ id: "ann_dec_brk_1", startLine: 1, endLine: 3, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Failure Mode", ru: "Режим Отказа" },
      explanation: {"en":"Funds transfers gained Retrying and Authorized wrappers. Ops discovered transfers succeeded without audit rows — AuditedFundsTransferGateway was left out of the","ru":"У funds transfers появились обёртки Retrying и Authorized. Ops обнаружил успешные переводы без audit rows — AuditedFundsTransferGateway выпал из композиции или "},
      conceptDemonstrated: "cpt_decorator_pattern" }],
    relatedQuestionIds: ["q_dec_audit_01"], conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], tags: ["#dec", "#counter-example"]
  },
  {
    id: "art_dec_solution", type: "CORRECT_SOLUTION", language: "java", javaVersion: "17",
    title: { en: "Production Fix", ru: "Продакшн Фикс" },
    sourceCode: "FundsTransferGateway gw =\n    new AuthorizedFundsTransferGateway(\n      new AuditedFundsTransferGateway(\n        new RetryingFundsTransferGateway(\n          new CoreFundsTransferGateway())));",
    annotations: [{ id: "ann_dec_sol_1", startLine: 1, endLine: 5, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Structural Fix", ru: "Структурный Фикс" },
      explanation: {"en":"Elevator Pitch (30 sec): Retry/Auth wrappers were composed without AuditedFundsTransferGateway, so transfers lacked audit. Fix: Decorator stack on FundsTransfer","ru":"Elevator Pitch (30 сек): Обёртки Retry/Auth собрали без AuditedFundsTransferGateway — переводы без audit. Фикс: стек Decorator на FundsTransferGateway с явным п"},
      problemSolved: {"en":"Compose AuditedFundsTransferGateway, RetryingFundsTransferGateway, and AuthorizedFundsTransferGateway around CoreFundsTransferGateway so audit is never dropped when retry/auth wrappers are applied.","ru":"Скомпонуйте AuditedFundsTransferGateway, RetryingFundsTransferGateway и AuthorizedFundsTransferGateway вокруг CoreFundsTransferGateway так, чтобы audit не терялся при обёртках retry/auth."},
      conceptDemonstrated: "cpt_decorator_pattern" }],
    relatedQuestionIds: ["q_dec_audit_01"], conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], tags: ["#dec", "#solution"]
  },
  {
    id: "art_dec_bughunt", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Bug Hunt Code", ru: "Код для Поиска Бага" },
    sourceCode: "FundsTransferGateway gw = new RetryingFundsTransferGateway(\n    new AuthorizedFundsTransferGateway(new CoreFundsTransferGateway()));\n// AuditedFundsTransferGateway missing",
    annotations: [{ id: "ann_dec_bug_1", startLine: 1, endLine: 4, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Defect Region", ru: "Область Дефекта" },
      explanation: { en: "Defect lines match the bug hunt challenge.", ru: "Строки дефекта соответствуют challenge bug hunt." },
      conceptDemonstrated: "cpt_decorator_pattern" }],
    relatedQuestionIds: ["q_dec_audit_01"], conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], tags: ["#dec", "#bug-hunt"]
  },
  {
    id: "art_dec_supplement", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Supplementary Collaborators", ru: "Дополнительные Сотрудники" },
    sourceCode: "FundsTransferGateway gw =\n    new AuthorizedFundsTransferGateway(\n      new AuditedFundsTransferGateway(\n        new RetryingFundsTransferGateway(\n          new CoreFundsTransferGateway())));",
    annotations: [{ id: "ann_dec_sup_1", startLine: 1, endLine: 2, category: "INTERVIEW_CONCEPT",
      title: { en: "Interview Talking Point", ru: "Точка для Интервью" },
      explanation: {"en":"Deep Mechanics (60 sec): Each decorator implements FundsTransferGateway, holds a delegate, adds behavior before/after transfer. Order change","ru":"Глубокая Механика (60 сек): Каждый декоратор реализует FundsTransferGateway, держит delegate, добавляет поведение до/после transfer. Порядок"},
      conceptDemonstrated: "cpt_decorator_order" }],
    relatedQuestionIds: ["q_dec_audit_01"], conceptIds: ["cpt_decorator_pattern","cpt_decorator_order","cpt_decorator_vs_proxy"], tags: ["#dec", "#supplement"]
  }
];
