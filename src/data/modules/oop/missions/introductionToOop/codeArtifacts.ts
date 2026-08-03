import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_INTRODUCTION_TO_OOP: readonly CodeArtifact[] = [
  {
    id: "art_intro_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: ClearingPayment Identity & Status",
      ru: "Доменные Типы: Identity и Status ClearingPayment"
    },
    sourceCode: `package com.bank.clearing.model;

public record ClearingPaymentId(String value) {
    public ClearingPaymentId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("id required");
        }
    }
}

public enum ClearingPaymentStatus {
    PENDING,
    VALIDATED,
    CLEARED,
    REJECTED
}

public final class ClearingPayment {
    private final ClearingPaymentId id;
    private ClearingPaymentStatus status;
    private final String rail;

    public ClearingPayment(ClearingPaymentId id, String rail) {
        this.id = id;
        this.rail = rail;
        this.status = ClearingPaymentStatus.PENDING;
    }

    public ClearingPaymentId id() { return id; }
    public ClearingPaymentStatus status() { return status; }
    public String rail() { return rail; }

    void transitionTo(ClearingPaymentStatus next) {
        this.status = next;
    }
}`,
    annotations: [
      {
        id: "ann_intro_domain_1",
        startLine: 12,
        endLine: 17,
        category: "WHY_IT_EXISTS",
        title: { en: "Typed Status Beats Strings", ru: "Типизированный Статус Лучше Строк" },
        explanation: {
          en: "ClearingPaymentStatus removes magic strings like \"PEND\"/\"OK\" that drift across helpers.",
          ru: "ClearingPaymentStatus убирает магические строки вроде \"PEND\"/\"OK\", дрейфующие по хелперам."
        },
        conceptDemonstrated: "cpt_oop_paradigm"
      }
    ],
    relatedQuestionIds: ["q_intro_procedural_01"],
    conceptIds: ["cpt_oop_paradigm", "cpt_procedural_vs_oop"],
    tags: ["#clearing-payment", "#enum", "#oop"]
  },
  {
    id: "art_intro_procedural_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Procedural Clearing Script",
      ru: "Исходный Нарушенный Код: Процедурный Clearing-Скрипт"
    },
    sourceCode: `package com.bank.clearing.legacy;

import java.util.HashMap;
import java.util.Map;

/** Procedural clearing — maps + string statuses + global helpers. */
public final class ClearingScripts {

    private ClearingScripts() {}

    public static void processClearing(Map<String, Object> payment) {
        String status = (String) payment.get("status");
        if ("NEW_RAIL".equals(payment.get("rail"))) {
            validateNewRail(payment);
        }
        if (status == null || "PEND".equals(status)) {
            payment.put("status", "OK"); // bypasses end-to-end policy
        }
        persist(payment);
        markOkGlobal(payment); // second writer
    }

    static void validateNewRail(Map<String, Object> payment) {
        if (payment.get("iban") == null) {
            payment.put("status", "REJ");
        }
    }

    static void markOkGlobal(Map<String, Object> payment) {
        if (!"REJ".equals(payment.get("status"))) {
            payment.put("status", "OK");
        }
    }

    static void persist(Map<String, Object> payment) {
        // pretend DB write of raw map
    }
}`,
    annotations: [
      {
        id: "ann_intro_broken_1",
        startLine: 14,
        endLine: 16,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Blind String Status Write", ru: "Слепая Запись Строкового Статуса" },
        explanation: {
          en: "put(\"status\",\"OK\") ignores rail policy ownership — new rails break inconsistently.",
          ru: "put(\"status\",\"OK\") игнорирует владение политикой rail — новые rails ломаются несогласованно."
        },
        problemSolved: {
          en: "Status transitions must be owned by ClearingPayment collaborators.",
          ru: "Переходы статуса должны принадлежать сотрудникам ClearingPayment."
        },
        conceptDemonstrated: "cpt_procedural_vs_oop"
      }
    ],
    relatedQuestionIds: ["q_intro_procedural_01"],
    conceptIds: ["cpt_procedural_vs_oop"],
    tags: ["#procedural", "#counter-example", "#clearing"]
  },
  {
    id: "art_intro_collaborators",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Collaborators: Workflow, Policy, Store",
      ru: "Сотрудники: Workflow, Policy, Store"
    },
    sourceCode: `package com.bank.clearing.workflow;

import com.bank.clearing.model.ClearingPayment;
import com.bank.clearing.model.ClearingPaymentStatus;
import com.bank.clearing.policy.ClearingValidationPolicy;
import com.bank.clearing.store.ClearingPaymentStore;

public final class ClearingPaymentWorkflow {
    private final ClearingValidationPolicy policy;
    private final ClearingPaymentStore store;

    public ClearingPaymentWorkflow(ClearingValidationPolicy policy, ClearingPaymentStore store) {
        this.policy = policy;
        this.store = store;
    }

    public void process(ClearingPayment payment) {
        if (!policy.isAcceptable(payment)) {
            payment.transitionTo(ClearingPaymentStatus.REJECTED);
            store.save(payment);
            return;
        }
        payment.transitionTo(ClearingPaymentStatus.VALIDATED);
        payment.transitionTo(ClearingPaymentStatus.CLEARED);
        store.save(payment);
    }
}`,
    annotations: [
      {
        id: "ann_intro_collab_1",
        startLine: 16,
        endLine: 25,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Objects Collaborate", ru: "Объекты Сотрудничают" },
        explanation: {
          en: "Workflow orchestrates policy and store through ClearingPayment — no shared map dual writers.",
          ru: "Workflow оркестрирует policy и store через ClearingPayment — без dual writers на общей map."
        },
        conceptDemonstrated: "cpt_object_collaboration"
      }
    ],
    relatedQuestionIds: ["q_intro_procedural_01"],
    conceptIds: ["cpt_object_collaboration"],
    tags: ["#collaboration", "#workflow", "#oop"]
  },
  {
    id: "art_intro_object_model_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: ClearingPayment Object Model",
      ru: "Продакшн Фикс: Объектная Модель ClearingPayment"
    },
    sourceCode: `package com.bank.clearing.app;

import com.bank.clearing.model.ClearingPayment;
import com.bank.clearing.model.ClearingPaymentId;
import com.bank.clearing.policy.ClearingValidationPolicy;
import com.bank.clearing.store.ClearingPaymentStore;
import com.bank.clearing.workflow.ClearingPaymentWorkflow;

public final class ClearingApplicationService {
    private final ClearingPaymentWorkflow workflow;
    private final ClearingPaymentStore store;

    public ClearingApplicationService(
            ClearingValidationPolicy policy,
            ClearingPaymentStore store) {
        this.store = store;
        this.workflow = new ClearingPaymentWorkflow(policy, store);
    }

    public void accept(String id, String rail) {
        ClearingPayment payment = new ClearingPayment(new ClearingPaymentId(id), rail);
        workflow.process(payment);
    }
}`,
    annotations: [
      {
        id: "ann_intro_sol_1",
        startLine: 18,
        endLine: 21,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Typed Entry, Collaborative Process", ru: "Типизированный Вход, Совместный Process" },
        explanation: {
          en: "No HashMap status strings — workflow owns the path for every rail.",
          ru: "Нет строковых статусов HashMap — workflow владеет путём для каждого rail."
        },
        problemSolved: {
          en: "Eliminates inconsistent helper updates when rails change.",
          ru: "Устраняет несогласованные правки хелперов при смене rails."
        },
        conceptDemonstrated: "cpt_object_collaboration"
      }
    ],
    relatedQuestionIds: ["q_intro_procedural_01"],
    conceptIds: ["cpt_oop_paradigm", "cpt_object_collaboration"],
    tags: ["#solution", "#clearing-payment", "#oop"]
  },
  {
    id: "art_intro_procedural_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Dual Status Writers",
      ru: "Код для Поиска Бага: Двойные Writers Статуса"
    },
    sourceCode: `package com.bank.clearing.legacy;

import java.util.Map;

public final class ClearingBugHunt {
    public static void processClearing(Map<String, Object> payment) {
        String status = (String) payment.get("status");
        if ("NEW_RAIL".equals(payment.get("rail"))) {
            validateNewRail(payment);
        }
        if (status == null || status.equals("PEND")) {
            payment.put("status", "OK");
        }
        persist(payment);
        markOkGlobal(payment);
    }

    private static void validateNewRail(Map<String, Object> payment) { /* ... */ }
    private static void persist(Map<String, Object> payment) { /* ... */ }
    private static void markOkGlobal(Map<String, Object> payment) { /* ... */ }
}`,
    annotations: [
      {
        id: "ann_intro_bug_1",
        startLine: 10,
        endLine: 13,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Two Writers, One Map", ru: "Два Writers, Одна Map" },
        explanation: {
          en: "Blind OK write plus markOkGlobal — procedural dual writers for status.",
          ru: "Слепая запись OK плюс markOkGlobal — процедурные dual writers статуса."
        },
        conceptDemonstrated: "cpt_procedural_vs_oop"
      }
    ],
    relatedQuestionIds: ["q_intro_procedural_01"],
    conceptIds: ["cpt_procedural_vs_oop"],
    tags: ["#bug-hunt", "#procedural"]
  }
];
