import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OBJECT_CLASS_CONTRACTS: readonly CodeArtifact[] = [
  {
    id: "art_ojc_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: ComplianceEvent, ComplianceCase, AuditSnapshot",
      ru: "Доменные Типы: ComplianceEvent, ComplianceCase, AuditSnapshot"
    },
    sourceCode: `package com.bank.compliance.audit;

import java.util.ArrayList;
import java.util.List;

public class ComplianceEvent {
    private final String eventId;
    private final String caseId;
    private final String severity;
    private ComplianceCase complianceCase;

    public ComplianceEvent(String eventId, String caseId, String severity) {
        this.eventId = eventId;
        this.caseId = caseId;
        this.severity = severity;
    }

    public String getEventId() { return eventId; }
    public String getCaseId() { return caseId; }
    public String getSeverity() { return severity; }
    public ComplianceCase getCase() { return complianceCase; }
    public void setCase(ComplianceCase complianceCase) { this.complianceCase = complianceCase; }
}

public class ComplianceCase implements Cloneable {
    private String caseId;
    private List<String> evidenceNotes = new ArrayList<>();

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    public void addEvidence(String note) { evidenceNotes.add(note); }
    public List<String> getEvidenceNotes() { return evidenceNotes; }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone(); // shallow — evidenceNotes shared
    }
}

public class AuditSnapshot {
    public String render(ComplianceEvent event) {
        return "snapshot=" + event; // default Object.toString → Class@hex
    }
}`,
    annotations: [
      {
        id: "ann_ojc_domain_1",
        startLine: 6,
        endLine: 20,
        category: "WHY_IT_EXISTS",
        title: { en: "Object Defaults Apply", ru: "Действуют Default Object" },
        explanation: {
          en: "ComplianceEvent inherits Object equals/toString/clone/finalize behavior until explicitly designed otherwise.",
          ru: "ComplianceEvent наследует поведение Object equals/toString/clone/finalize, пока явно не спроектировано иначе."
        },
        conceptDemonstrated: "cpt_java_lang_object"
      },
      {
        id: "ann_ojc_domain_2",
        startLine: 35,
        endLine: 37,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Shallow Clone", ru: "Shallow Clone" },
        explanation: {
          en: "super.clone() copies the List reference — probe and live case share evidenceNotes.",
          ru: "super.clone() копирует ссылку на List — probe и живой кейс делят evidenceNotes."
        },
        conceptDemonstrated: "cpt_clone_pitfalls"
      }
    ],
    relatedQuestionIds: ["q_ojc_object_contracts_01"],
    conceptIds: ["cpt_java_lang_object", "cpt_clone_pitfalls"],
    tags: ["#compliance-event", "#object"]
  },
  {
    id: "art_ojc_event_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: EventClassifier & Repository Dedup",
      ru: "Исходный Нарушенный Код: EventClassifier и Дедуп Репозитория"
    },
    sourceCode: `package com.bank.compliance.audit;

import java.util.ArrayList;
import java.util.List;

public class ComplianceEventRepository {
    private final List<ComplianceEvent> stored = new ArrayList<>();

    public boolean contains(ComplianceEvent event) {
        return stored.contains(event); // Object identity equals
    }

    public void save(ComplianceEvent event) {
        stored.add(event);
    }
}

public class EventClassifier {
    private AutoCloseable handle;

    public void ingest(ComplianceEvent event, ComplianceEventRepository repo) throws Exception {
        if (repo.contains(event)) {
            return;
        }
        ComplianceCase probe = (ComplianceCase) event.getCase().clone();
        probe.addEvidence("investigation-only");
        if (event.getClass() != ComplianceEvent.class) {
            throw new IllegalArgumentException("unsupported event type");
        }
        repo.save(event);
    }

    @Override
    protected void finalize() throws Throwable {
        if (handle != null) {
            handle.close();
        }
        super.finalize();
    }
}`,
    annotations: [
      {
        id: "ann_broken_ojc_1",
        startLine: 9,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Identity Dedup", ru: "Дедуп по Identity" },
        explanation: {
          en: "List.contains uses Object.equals — identity — so logical duplicates with the same eventId are stored again.",
          ru: "List.contains использует Object.equals — identity — поэтому логические дубликаты с одним eventId сохраняются снова."
        },
        conceptDemonstrated: "cpt_java_lang_object"
      },
      {
        id: "ann_broken_ojc_2",
        startLine: 24,
        endLine: 26,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "getClass Rejects Subtypes", ru: "getClass Отвергает Подтипы" },
        explanation: {
          en: "Exact class check rejects specialized ComplianceEvent subtypes that instanceof would accept.",
          ru: "Точная проверка класса отвергает специализированные подтипы ComplianceEvent, которые instanceof принял бы."
        },
        conceptDemonstrated: "cpt_getclass_vs_instanceof"
      },
      {
        id: "ann_broken_ojc_3",
        startLine: 31,
        endLine: 37,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Obsolete finalize", ru: "Устаревший finalize" },
        explanation: {
          en: "finalize is deprecated for removal (JEP 421) and unreliable for closing resources.",
          ru: "finalize deprecated for removal (JEP 421) и ненадёжен для закрытия ресурсов."
        },
        conceptDemonstrated: "cpt_java_lang_object"
      }
    ],
    relatedQuestionIds: ["q_ojc_object_contracts_01"],
    conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
    tags: ["#counter-example", "#object-contracts"]
  },
  {
    id: "art_ojc_copy_factory",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Explicit Copy: ComplianceCase Copy Constructor",
      ru: "Явная Копия: Copy Constructor ComplianceCase"
    },
    sourceCode: `package com.bank.compliance.audit;

import java.util.ArrayList;
import java.util.List;

public final class ComplianceCaseCopies {
    private ComplianceCaseCopies() {}

    public static ComplianceCase independentCopy(ComplianceCase source) {
        ComplianceCase copy = new ComplianceCase();
        copy.setCaseId(source.getCaseId());
        for (String note : source.getEvidenceNotes()) {
            copy.addEvidence(note);
        }
        return copy;
    }
}`,
    annotations: [
      {
        id: "ann_ojc_copy_1",
        startLine: 8,
        endLine: 15,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Independent Evidence List", ru: "Независимый Список Evidence" },
        explanation: {
          en: "Explicit copy allocates a new case and new evidence entries — no shared mutable List reference.",
          ru: "Явная копия выделяет новый кейс и новые evidence entries — без общей мутабельной List-ссылки."
        },
        conceptDemonstrated: "cpt_clone_pitfalls"
      }
    ],
    relatedQuestionIds: ["q_ojc_object_contracts_01"],
    conceptIds: ["cpt_clone_pitfalls"],
    tags: ["#copy-constructor", "#clone"]
  },
  {
    id: "art_ojc_event_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed Pipeline: Keys, instanceof, Copy, try-with-resources",
      ru: "Исправленный Pipeline: Ключи, instanceof, Копия, try-with-resources"
    },
    sourceCode: `package com.bank.compliance.audit;

import java.util.HashSet;
import java.util.Set;

public class ComplianceEventRepository {
    private final Set<String> eventIds = new HashSet<>();

    public boolean containsEventId(String eventId) {
        return eventIds.contains(eventId);
    }

    public void save(ComplianceEvent event) {
        eventIds.add(event.getEventId());
    }
}

public class EventClassifier implements AutoCloseable {
    private final AutoCloseable handle;

    public EventClassifier(AutoCloseable handle) {
        this.handle = handle;
    }

    public void ingest(ComplianceEvent event, ComplianceEventRepository repo) {
        if (repo.containsEventId(event.getEventId())) {
            return;
        }
        ComplianceCase probe = ComplianceCaseCopies.independentCopy(event.getCase());
        probe.addEvidence("investigation-only");
        if (!(event instanceof ComplianceEvent)) {
            throw new IllegalArgumentException("unsupported event type");
        }
        repo.save(event);
    }

    @Override
    public void close() throws Exception {
        handle.close();
    }
}`,
    annotations: [
      {
        id: "ann_sol_ojc_1",
        startLine: 8,
        endLine: 10,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Explicit Business Key", ru: "Явный Business Key" },
        explanation: {
          en: "Dedup by eventId avoids confusing Object identity equals with business uniqueness.",
          ru: "Дедуп по eventId избегает путаницы Object identity equals с бизнес-уникальностью."
        },
        conceptDemonstrated: "cpt_java_lang_object"
      },
      {
        id: "ann_sol_ojc_2",
        startLine: 28,
        endLine: 30,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "instanceof for Hierarchy", ru: "instanceof для Иерархии" },
        explanation: {
          en: "instanceof accepts ComplianceEvent subtypes when polymorphism is intended.",
          ru: "instanceof принимает подтипы ComplianceEvent, когда задуман polymorphism."
        },
        conceptDemonstrated: "cpt_getclass_vs_instanceof"
      }
    ],
    relatedQuestionIds: ["q_ojc_object_contracts_01"],
    conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
    tags: ["#solution", "#event-classifier"]
  },
  {
    id: "art_ojc_classifier_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: ingest + finalize",
      ru: "Сниппет Bug Hunt: ingest + finalize"
    },
    sourceCode: `public void ingest(ComplianceEvent event, ComplianceEventRepository repo) {
    if (repo.contains(event)) {
        return;
    }
    ComplianceCase probe = (ComplianceCase) event.getCase().clone();
    if (event.getClass() != ComplianceEvent.class) {
        throw new IllegalArgumentException("unsupported");
    }
    repo.save(event);
}
protected void finalize() throws Throwable {
    closeHandle();
    super.finalize();
}`,
    annotations: [
      {
        id: "ann_bug_ojc_1",
        startLine: 2,
        endLine: 2,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Identity contains", ru: "contains по Identity" },
        explanation: {
          en: "Repository contains uses default Object equals — identity, not business key.",
          ru: "Repository contains использует default Object equals — identity, не business key."
        },
        conceptDemonstrated: "cpt_java_lang_object"
      },
      {
        id: "ann_bug_ojc_2",
        startLine: 5,
        endLine: 6,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Shallow Clone + getClass", ru: "Shallow Clone + getClass" },
        explanation: {
          en: "clone shares mutable state; getClass rejects valid subtypes.",
          ru: "clone делит mutable state; getClass отвергает валидные подтипы."
        },
        conceptDemonstrated: "cpt_clone_pitfalls"
      }
    ],
    relatedQuestionIds: ["q_ojc_object_contracts_01"],
    conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
    tags: ["#bug-hunt"]
  }
];
