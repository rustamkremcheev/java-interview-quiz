import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OOP_REFACTORING_LEGACY: readonly CodeArtifact[] = [
  {
    id: "art_leg_domain", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Domain Types", ru: "Доменные Типы" },
    sourceCode: "package com.bank.credit.legacy;\n\npublic record CreditFacilityApplication(String id, String applicantId, long amountCents) {}\npublic record CreditFacilityDecision(String applicationId, boolean approved) {\n    public static CreditFacilityDecision approve(String id) { return new CreditFacilityDecision(id, true); }\n    public static CreditFacilityDecision deny(String id) { return new CreditFacilityDecision(id, false); }\n}\npublic interface ApplicantLookupPort { ApplicantView find(String applicantId); }\npublic interface DecisionAuditPort { void write(String applicationId, CreditFacilityDecision decision); }\npublic interface CreditPolicy {\n    CreditFacilityDecision decide(ApplicantView applicant, CreditFacilityApplication app);\n}\npublic record ApplicantView(String id, int score) {}\n",
    annotations: [{ id: "ann_leg_dom_1", startLine: 1, endLine: 1, category: "WHY_IT_EXISTS",
      title: { en: "Domain Anchor", ru: "Доменный Якорь" },
      explanation: { en: "Domain types anchor the mission scenario.", ru: "Доменные типы якорят сценарий миссии." },
      conceptDemonstrated: "cpt_characterization_test" }],
    relatedQuestionIds: ["q_leg_seam_01"], conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], tags: ["#leg", "#domain"]
  },
  {
    id: "art_leg_broken", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Broken Baseline", ru: "Исходный Нарушенный Код" },
    sourceCode: "public final class LegacyCreditDecisionEngine {\n    public CreditFacilityDecision decide(CreditFacilityApplication app) {\n        ApplicantRow row = JdbcApplicantDao.find(app.applicantId());\n        boolean ok = CreditPolicyStatic.eval(row, app);\n        AuditStatic.write(app.id(), ok);\n        return ok ? CreditFacilityDecision.approve(app.id()) : CreditFacilityDecision.deny(app.id());\n    }\n}",
    annotations: [{ id: "ann_leg_brk_1", startLine: 1, endLine: 3, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Failure Mode", ru: "Режим Отказа" },
      explanation: {"en":"LegacyCreditDecisionEngine decides CreditFacilityApplication outcomes with hardcoded JDBC and static audit calls — untestable in CI. Product needs CreditPolicy ","ru":"LegacyCreditDecisionEngine решает исходы CreditFacilityApplication с hardcoded JDBC и static audit — нетестируемо в CI. Продукту нужны еженедельные изменения Cr"},
      conceptDemonstrated: "cpt_characterization_test" }],
    relatedQuestionIds: ["q_leg_seam_01"], conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], tags: ["#leg", "#counter-example"]
  },
  {
    id: "art_leg_solution", type: "CORRECT_SOLUTION", language: "java", javaVersion: "17",
    title: { en: "Production Fix", ru: "Продакшн Фикс" },
    sourceCode: "public final class LegacyCreditDecisionEngine {\n    private final ApplicantLookupPort lookup;\n    private final DecisionAuditPort audit;\n    private final CreditPolicy policy;\n    public LegacyCreditDecisionEngine(ApplicantLookupPort lookup, DecisionAuditPort audit, CreditPolicy policy) {\n        this.lookup = lookup; this.audit = audit; this.policy = policy;\n    }\n    public CreditFacilityDecision decide(CreditFacilityApplication app) {\n        var applicant = lookup.find(app.applicantId());\n        CreditFacilityDecision d = policy.decide(applicant, app);\n        audit.write(app.id(), d);\n        return d;\n    }\n}",
    annotations: [{ id: "ann_leg_sol_1", startLine: 1, endLine: 5, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Structural Fix", ru: "Структурный Фикс" },
      explanation: {"en":"Elevator Pitch (30 sec): LegacyCreditDecisionEngine was untestable due to JDBC/static audit. We add characterization tests, extract ApplicantLookupPort/Decision","ru":"Elevator Pitch (30 сек): LegacyCreditDecisionEngine был нетестируем из-за JDBC/static audit. Добавляем characterization-тесты, извлекаем seams ApplicantLookupPo"},
      problemSolved: {"en":"Introduce characterization tests and seams (ApplicantLookupPort, DecisionAuditPort) so LegacyCreditDecisionEngine can be incrementally refactored around CreditFacilityApplication and CreditPolicy without a big-bang rewrite.","ru":"Введите characterization-тесты и seams (ApplicantLookupPort, DecisionAuditPort), чтобы инкрементально рефакторить LegacyCreditDecisionEngine вокруг CreditFacilityApplication и CreditPolicy без big-bang rewrite."},
      conceptDemonstrated: "cpt_characterization_test" }],
    relatedQuestionIds: ["q_leg_seam_01"], conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], tags: ["#leg", "#solution"]
  },
  {
    id: "art_leg_bughunt", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Bug Hunt Code", ru: "Код для Поиска Бага" },
    sourceCode: "public final class LegacyCreditDecisionEngine {\n    public CreditFacilityDecision decide(CreditFacilityApplication app) {\n        ApplicantRow row = JdbcApplicantDao.find(app.applicantId());\n        boolean ok = CreditPolicyStatic.eval(row, app);\n        AuditStatic.write(app.id(), ok);\n        return ok ? CreditFacilityDecision.approve(app.id()) : CreditFacilityDecision.deny(app.id());\n    }\n}",
    annotations: [{ id: "ann_leg_bug_1", startLine: 1, endLine: 4, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Defect Region", ru: "Область Дефекта" },
      explanation: { en: "Defect lines match the bug hunt challenge.", ru: "Строки дефекта соответствуют challenge bug hunt." },
      conceptDemonstrated: "cpt_characterization_test" }],
    relatedQuestionIds: ["q_leg_seam_01"], conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], tags: ["#leg", "#bug-hunt"]
  },
  {
    id: "art_leg_supplement", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Supplementary Collaborators", ru: "Дополнительные Сотрудники" },
    sourceCode: "public final class LegacyCreditDecisionEngine {\n    private final ApplicantLookupPort lookup;\n    private final DecisionAuditPort audit;\n    private final CreditPolicy policy;\n    public LegacyCreditDecisionEngine(ApplicantLookupPort lookup, DecisionAuditPort audit, CreditPolicy policy) {\n        this.lookup = lookup; this.audit = audit; this.policy = policy;\n    }\n    public CreditFacilityDecision decide(CreditFacilityApplication app) {\n        var applicant = lookup.find(app.applicantId());\n        CreditFacilityDecision d = policy.decide(applicant, app);\n        audit.write(app.id(), d);\n        return d;\n    }\n}",
    annotations: [{ id: "ann_leg_sup_1", startLine: 1, endLine: 2, category: "INTERVIEW_CONCEPT",
      title: { en: "Interview Talking Point", ru: "Точка для Интервью" },
      explanation: {"en":"Deep Mechanics (60 sec): A seam is a place to alter behavior without editing in that place — ports/fakes. Characterization tests document ac","ru":"Глубокая Механика (60 сек): Seam — место изменить поведение без правки в том месте — ports/fakes. Characterization-тесты документируют факти"},
      conceptDemonstrated: "cpt_seam_extraction" }],
    relatedQuestionIds: ["q_leg_seam_01"], conceptIds: ["cpt_characterization_test","cpt_seam_extraction","cpt_incremental_refactoring"], tags: ["#leg", "#supplement"]
  }
];
