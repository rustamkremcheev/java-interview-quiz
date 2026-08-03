import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_BUILDER_PATTERN: readonly CodeArtifact[] = [
  {
    id: "art_bld_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: { en: "Domain Types: PortfolioId, RiskProfile, EvaluationWindow", ru: "Доменные Типы: PortfolioId, RiskProfile, EvaluationWindow" },
    sourceCode: `package com.bank.risk.model;

import java.time.LocalDate;

public record PortfolioId(String value) {
    public PortfolioId { if (value == null || value.isBlank()) throw new IllegalArgumentException("portfolio"); }
}

public record RiskProfile(String code, int riskTier) {
    public RiskProfile {
        if (code == null || code.isBlank()) throw new IllegalArgumentException("profile");
        if (riskTier < 1) throw new IllegalArgumentException("tier");
    }
}

public record EvaluationWindow(LocalDate start, LocalDate end) {
    public EvaluationWindow {
        if (start == null || end == null) throw new IllegalArgumentException("window");
        if (end.isBefore(start)) throw new IllegalArgumentException("end before start");
    }
}`,
    annotations: [{
      id: "ann_bld_domain_1", startLine: 16, endLine: 21, category: "WHY_IT_EXISTS",
      title: { en: "Window Invariants", ru: "Инварианты Окна" },
      explanation: { en: "EvaluationWindow rejects nulls and inverted ranges at construction.", ru: "EvaluationWindow отвергает null и перевёрнутые диапазоны при создании." },
      conceptDemonstrated: "cpt_build_time_validation"
    }],
    relatedQuestionIds: ["q_bld_risk_01"],
    conceptIds: ["cpt_build_time_validation"],
    tags: ["#risk", "#value-objects"]
  },
  {
    id: "art_bld_request_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: { en: "Broken Baseline: Telescoping RiskAssessmentRequest", ru: "Исходный Нарушенный Код: Телескопический RiskAssessmentRequest" },
    sourceCode: `package com.bank.risk.request;

import com.bank.risk.model.*;

public final class RiskAssessmentRequest {
    private final PortfolioId portfolioId;
    private final RiskProfile profile;
    private final EvaluationWindow window;
    private final String notes;

    public RiskAssessmentRequest(PortfolioId portfolioId) {
        this(portfolioId, null, null, null);
    }
    public RiskAssessmentRequest(PortfolioId portfolioId, RiskProfile profile) {
        this(portfolioId, profile, null, null);
    }
    public RiskAssessmentRequest(PortfolioId portfolioId, RiskProfile profile, EvaluationWindow window) {
        this(portfolioId, profile, window, null);
    }
    public RiskAssessmentRequest(PortfolioId portfolioId, RiskProfile profile, EvaluationWindow window, String notes) {
        this.portfolioId = portfolioId;
        this.profile = profile;
        this.window = window; // may be null
        this.notes = notes;
    }
}`,
    annotations: [{
      id: "ann_bld_broken_1", startLine: 8, endLine: 16, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Telescoping Overloads", ru: "Телескопические Overload" },
      explanation: { en: "Shorter overloads omit EvaluationWindow — misconfigured requests escape.", ru: "Короткие overload опускают EvaluationWindow — misconfigured requests утекают." },
      conceptDemonstrated: "cpt_telescoping_constructor"
    }],
    relatedQuestionIds: ["q_bld_risk_01"],
    conceptIds: ["cpt_telescoping_constructor"],
    tags: ["#telescoping", "#counter-example"]
  },
  {
    id: "art_bld_request_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: { en: "Production Fix: RiskAssessmentRequest.Builder", ru: "Продакшн Фикс: RiskAssessmentRequest.Builder" },
    sourceCode: `package com.bank.risk.request;

import com.bank.risk.model.*;
import java.util.Objects;

public final class RiskAssessmentRequest {
    private final PortfolioId portfolioId;
    private final RiskProfile profile;
    private final EvaluationWindow window;
    private final String notes;

    private RiskAssessmentRequest(Builder b) {
        this.portfolioId = b.portfolioId;
        this.profile = b.profile;
        this.window = b.window;
        this.notes = b.notes;
    }

    public static final class Builder {
        private PortfolioId portfolioId;
        private RiskProfile profile;
        private EvaluationWindow window;
        private String notes;

        public Builder portfolioId(PortfolioId id) { this.portfolioId = id; return this; }
        public Builder riskProfile(RiskProfile p) { this.profile = p; return this; }
        public Builder evaluationWindow(EvaluationWindow w) { this.window = w; return this; }
        public Builder notes(String n) { this.notes = n; return this; }

        public RiskAssessmentRequest build() {
            Objects.requireNonNull(portfolioId, "portfolioId");
            Objects.requireNonNull(profile, "riskProfile");
            Objects.requireNonNull(window, "evaluationWindow");
            return new RiskAssessmentRequest(this);
        }
    }
}`,
    annotations: [{
      id: "ann_bld_sol_1", startLine: 28, endLine: 33, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Build-Time Gate", ru: "Ворота Build-Time" },
      explanation: { en: "build() requires mandatory fields before the immutable request exists.", ru: "build() требует обязательные поля до существования immutable request." },
      problemSolved: { en: "Prevents null EvaluationWindow from reaching RiskAssessmentService.", ru: "Не даёт null EvaluationWindow дойти до RiskAssessmentService." },
      conceptDemonstrated: "cpt_builder_pattern"
    }],
    relatedQuestionIds: ["q_bld_risk_01"],
    conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation"],
    tags: ["#builder", "#solution"]
  },
  {
    id: "art_bld_service_usage",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: { en: "RiskAssessmentService Consumes Validated Requests", ru: "RiskAssessmentService Потребляет Валидированные Запросы" },
    sourceCode: `package com.bank.risk.service;

import com.bank.risk.request.RiskAssessmentRequest;

public final class RiskAssessmentService {
    public String assess(RiskAssessmentRequest request) {
        // request is immutable and complete — no null window checks here as primary gate
        return "OK:" + request.toString();
    }
}`,
    annotations: [{
      id: "ann_bld_svc_1", startLine: 5, endLine: 8, category: "INTERVIEW_CONCEPT",
      title: { en: "Service Assumes Completeness", ru: "Сервис Предполагает Полноту" },
      explanation: { en: "Primary validation belongs in Builder.build(), not scattered in assess().", ru: "Основная валидация принадлежит Builder.build(), не размазана по assess()." },
      conceptDemonstrated: "cpt_build_time_validation"
    }],
    relatedQuestionIds: ["q_bld_risk_01"],
    conceptIds: ["cpt_build_time_validation"],
    tags: ["#risk-service"]
  },
  {
    id: "art_bld_request_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: { en: "Bug Hunt Code: Null Window Escapes", ru: "Код для Поиска Бага: Утечка Null Window" },
    sourceCode: `package com.bank.risk.request;

import com.bank.risk.model.*;
import com.bank.risk.service.RiskAssessmentService;

public final class RiskBugHunt {
    private PortfolioId portfolioId;
    private RiskProfile profile;
    private EvaluationWindow window;
    private String notes;
    private final RiskAssessmentService service = new RiskAssessmentService();

    public RiskAssessmentRequest build() {
        return new RiskAssessmentRequest(portfolioId, profile, window, notes);
    }

    public void evaluate(PortfolioId id, RiskProfile profile) {
        RiskAssessmentRequest req = new RiskAssessmentRequest(id, profile, null);
        service.assess(req);
    }
}`,
    annotations: [{
      id: "ann_bld_bug_1", startLine: 13, endLine: 18, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "No Validation Gate", ru: "Нет Ворот Валидации" },
      explanation: { en: "build() and telescoping call both skip mandatory window checks.", ru: "build() и телескопический вызов оба пропускают обязательные проверки window." },
      conceptDemonstrated: "cpt_build_time_validation"
    }],
    relatedQuestionIds: ["q_bld_risk_01"],
    conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation"],
    tags: ["#bug-hunt"]
  }
];
