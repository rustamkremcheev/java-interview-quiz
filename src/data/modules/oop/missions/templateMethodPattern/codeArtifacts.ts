import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_TEMPLATE_METHOD_PATTERN: readonly CodeArtifact[] = [
  {
    id: "art_tm_domain", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Domain Types", ru: "Доменные Типы" },
    sourceCode: "package com.bank.settlement.eod;\n\npublic final class SettlementBatch {\n    private final String id;\n    public SettlementBatch(String id) { this.id = id; }\n    public String id() { return id; }\n}\n\npublic final class ComplianceCheck {\n    public void verify(SettlementBatch batch) {\n        if (batch == null) throw new IllegalArgumentException(\"batch\");\n    }\n}\n\npublic final class SettlementAudit {\n    public void record(SettlementBatch batch) { /* audit trail */ }\n}\n",
    annotations: [{ id: "ann_tm_dom_1", startLine: 1, endLine: 1, category: "WHY_IT_EXISTS",
      title: { en: "Domain Anchor", ru: "Доменный Якорь" },
      explanation: { en: "Domain types anchor the mission scenario.", ru: "Доменные типы якорят сценарий миссии." },
      conceptDemonstrated: "cpt_template_method" }],
    relatedQuestionIds: ["q_tm_eod_01"], conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], tags: ["#tm", "#domain"]
  },
  {
    id: "art_tm_broken", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Broken Baseline", ru: "Исходный Нарушенный Код" },
    sourceCode: "public abstract class EndOfDaySettlementProcessor {\n    public void processBatch(SettlementBatch batch) { // overridable — BUG risk\n        settleRail(batch);\n    }\n    protected abstract void settleRail(SettlementBatch batch);\n}\npublic final class CrossBorderSettlementProcessor extends EndOfDaySettlementProcessor {\n    @Override public void processBatch(SettlementBatch batch) {\n        settleRail(batch); // bypasses compliance + audit\n    }\n    @Override protected void settleRail(SettlementBatch batch) { /* cross-border */ }\n}",
    annotations: [{ id: "ann_tm_brk_1", startLine: 1, endLine: 3, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Failure Mode", ru: "Режим Отказа" },
      explanation: {"en":"EOD batch cleared Domestic and CrossBorder SettlementBatch items. Compliance found CrossBorderSettlementProcessor overrode processBatch() and skipped Compliance","ru":"EOD-батч провёл Domestic и CrossBorder SettlementBatch. Compliance нашёл, что CrossBorderSettlementProcessor переопределил processBatch() и пропустил Compliance"},
      conceptDemonstrated: "cpt_template_method" }],
    relatedQuestionIds: ["q_tm_eod_01"], conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], tags: ["#tm", "#counter-example"]
  },
  {
    id: "art_tm_solution", type: "CORRECT_SOLUTION", language: "java", javaVersion: "17",
    title: { en: "Production Fix", ru: "Продакшн Фикс" },
    sourceCode: "public abstract class EndOfDaySettlementProcessor {\n    private final ComplianceCheck compliance;\n    private final SettlementAudit audit;\n    protected EndOfDaySettlementProcessor(ComplianceCheck c, SettlementAudit a) {\n        this.compliance = c; this.audit = a;\n    }\n    public final void processBatch(SettlementBatch batch) {\n        compliance.verify(batch);\n        settleRail(batch);\n        audit.record(batch);\n    }\n    protected abstract void settleRail(SettlementBatch batch);\n}",
    annotations: [{ id: "ann_tm_sol_1", startLine: 1, endLine: 5, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Structural Fix", ru: "Структурный Фикс" },
      explanation: {"en":"Elevator Pitch (30 sec): CrossBorderSettlementProcessor overrode processBatch and skipped ComplianceCheck/SettlementAudit. Fix: final template on EndOfDaySettle","ru":"Elevator Pitch (30 сек): CrossBorderSettlementProcessor переопределил processBatch и пропустил ComplianceCheck/SettlementAudit. Фикс: final template на EndOfDay"},
      problemSolved: {"en":"Lock EndOfDaySettlementProcessor so DomesticSettlementProcessor and CrossBorderSettlementProcessor cannot bypass ComplianceCheck and SettlementAudit — final template skeleton with hooks.","ru":"Зафиксируйте EndOfDaySettlementProcessor так, чтобы DomesticSettlementProcessor и CrossBorderSettlementProcessor не обходили ComplianceCheck и SettlementAudit — final skeleton с хуками."},
      conceptDemonstrated: "cpt_template_method" }],
    relatedQuestionIds: ["q_tm_eod_01"], conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], tags: ["#tm", "#solution"]
  },
  {
    id: "art_tm_bughunt", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Bug Hunt Code", ru: "Код для Поиска Бага" },
    sourceCode: "public abstract class EndOfDaySettlementProcessor {\n    public void processBatch(SettlementBatch batch) { // overridable — BUG risk\n        settleRail(batch);\n    }\n    protected abstract void settleRail(SettlementBatch batch);\n}\npublic final class CrossBorderSettlementProcessor extends EndOfDaySettlementProcessor {\n    @Override public void processBatch(SettlementBatch batch) {\n        settleRail(batch); // bypasses compliance + audit\n    }\n    @Override protected void settleRail(SettlementBatch batch) { /* cross-border */ }\n}",
    annotations: [{ id: "ann_tm_bug_1", startLine: 1, endLine: 4, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Defect Region", ru: "Область Дефекта" },
      explanation: { en: "Defect lines match the bug hunt challenge.", ru: "Строки дефекта соответствуют challenge bug hunt." },
      conceptDemonstrated: "cpt_template_method" }],
    relatedQuestionIds: ["q_tm_eod_01"], conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], tags: ["#tm", "#bug-hunt"]
  },
  {
    id: "art_tm_supplement", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Supplementary Collaborators", ru: "Дополнительные Сотрудники" },
    sourceCode: "public abstract class EndOfDaySettlementProcessor {\n    private final ComplianceCheck compliance;\n    private final SettlementAudit audit;\n    protected EndOfDaySettlementProcessor(ComplianceCheck c, SettlementAudit a) {\n        this.compliance = c; this.audit = a;\n    }\n    public final void processBatch(SettlementBatch batch) {\n        compliance.verify(batch);\n        settleRail(batch);\n        audit.record(batch);\n    }\n    protected abstract void settleRail(SettlementBatch batch);\n}",
    annotations: [{ id: "ann_tm_sup_1", startLine: 1, endLine: 2, category: "INTERVIEW_CONCEPT",
      title: { en: "Interview Talking Point", ru: "Точка для Интервью" },
      explanation: {"en":"Deep Mechanics (60 sec): Template Method defines algorithm skeleton in a method; subclasses override hooks. final processBatch prevents skel","ru":"Глубокая Механика (60 сек): Template Method задаёт skeleton алгоритма в методе; подклассы переопределяют хуки. final processBatch предотвращ"},
      conceptDemonstrated: "cpt_final_template_skeleton" }],
    relatedQuestionIds: ["q_tm_eod_01"], conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], tags: ["#tm", "#supplement"]
  }
];
