import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_COUPLING_COHESION: readonly CodeArtifact[] = [
  {
    id: "art_cc_recon_batch",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "ReconciliationBatch & Ledger Row Types",
      ru: "Типы ReconciliationBatch и Ledger Row"
    },
    sourceCode: `package com.bank.reconciliation;

import java.time.LocalDate;
import java.util.List;

/** Input period for a nightly ledger reconciliation run. */
public record ReconciliationBatch(String batchId, LocalDate periodStart, LocalDate periodEnd) {
    public ReconciliationBatch {
        if (batchId == null || batchId.isBlank()) {
            throw new IllegalArgumentException("batchId required");
        }
        if (periodEnd.isBefore(periodStart)) {
            throw new IllegalArgumentException("periodEnd before periodStart");
        }
    }

    public LocalDate period() {
        return periodStart;
    }
}

/** Immutable ledger mismatch row used by reporting and alerting. */
public record LedgerRow(String accountId, long expectedCents, long actualCents) {
    public boolean isMismatch() {
        return expectedCents != actualCents;
    }
}

public record ReconciliationResult(byte[] pdfBytes, String alertChannel) {}`,
    annotations: [
      {
        id: "ann_cc_batch_1",
        startLine: 8,
        endLine: 20,
        category: "WHY_IT_EXISTS",
        title: { en: "Stable Domain Input", ru: "Стабильный Доменный Вход" },
        explanation: {
          en: "Batch identity and period are shared across validate/load/report/alert — coupling problems appear when one class owns all of those steps plus infrastructure SDKs.",
          ru: "Идентичность батча и период общие для validate/load/report/alert — проблемы coupling появляются, когда один класс владеет всеми шагами плюс инфраструктурными SDK."
        },
        conceptDemonstrated: "cpt_cohesion"
      }
    ],
    relatedQuestionIds: ["q_cc_recon_01"],
    conceptIds: ["cpt_cohesion"],
    tags: ["#reconciliation", "#domain"]
  },
  {
    id: "art_cc_recon_service_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: ReconciliationService Change Amplification",
      ru: "Исходный Нарушенный Код: Усиление Изменений в ReconciliationService"
    },
    sourceCode: `package com.bank.reconciliation;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * LOW COHESION + HIGH COUPLING:
 * validate + JDBC + PDF + alert + retry in one class.
 * Slack alert hotfix mutated ReportContext → empty PDFs + full CI retest.
 */
public class ReconciliationService {

    private final DataSource dataSource;
    private final PdfRenderer pdfRenderer;
    private final SmtpClient smtpClient;

    public ReconciliationService(DataSource dataSource, PdfRenderer pdfRenderer, SmtpClient smtpClient) {
        this.dataSource = dataSource;
        this.pdfRenderer = pdfRenderer;
        this.smtpClient = smtpClient;
    }

    public ReconciliationResult reconcile(ReconciliationBatch batch) {
        ReportContext ctx = new ReportContext();
        validate(batch);
        ctx.rows = loadRows(batch);
        int attempts = 0;
        while (true) {
            try {
                if (hasMismatches(ctx.rows)) {
                    ctx.channelTag = "SLACK"; // hotfix: was "EMAIL"
                    publishAlert(ctx);
                    ctx.rows.clear(); // "save memory" — couples alert to PDF
                }
                byte[] pdf = pdfRenderer.render(ctx);
                return new ReconciliationResult(pdf, ctx.channelTag);
            } catch (TransientLedgerException ex) {
                if (++attempts >= 3) throw ex;
            }
        }
    }

    private void validate(ReconciliationBatch batch) { /* rules... */ }

    private List<LedgerRow> loadRows(ReconciliationBatch batch) {
        List<LedgerRow> rows = new ArrayList<>();
        try (Connection c = dataSource.getConnection();
             PreparedStatement ps = c.prepareStatement("SELECT ...")) {
            // JDBC mapping...
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                rows.add(new LedgerRow(rs.getString(1), rs.getLong(2), rs.getLong(3)));
            }
        } catch (Exception e) {
            throw new TransientLedgerException(e);
        }
        return rows;
    }

    private void publishAlert(ReportContext ctx) {
        smtpClient.send("ops@bank.com", "Mismatch", "channel=" + ctx.channelTag);
    }

    private boolean hasMismatches(List<LedgerRow> rows) {
        return rows.stream().anyMatch(LedgerRow::isMismatch);
    }

    /** Shared mutable bag — content coupling between alert and PDF. */
    static final class ReportContext {
        List<LedgerRow> rows = List.of();
        String channelTag = "EMAIL";
    }
}`,
    annotations: [
      {
        id: "ann_broken_cc_1",
        startLine: 14,
        endLine: 22,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Concrete Efferent Coupling Cluster", ru: "Кластер Конкретного Efferent Coupling" },
        explanation: {
          en: "DataSource + PdfRenderer + SmtpClient on one class means an alert-channel change sits beside JDBC and PDF dependencies — high coupling, low cohesion.",
          ru: "DataSource + PdfRenderer + SmtpClient на одном классе значит, что смена канала алертов соседствует с зависимостями JDBC и PDF — высокий coupling, низкая cohesion."
        },
        problemSolved: {
          en: "Blast radius of alert edits includes unrelated infrastructure.",
          ru: "Blast radius правок алертов включает несвязанную инфраструктуру."
        },
        conceptDemonstrated: "cpt_coupling"
      },
      {
        id: "ann_broken_cc_2",
        startLine: 32,
        endLine: 38,
        category: "PRODUCTION_RISK",
        title: { en: "Shared Mutable ReportContext Amplification", ru: "Усиление через Shared Mutable ReportContext" },
        explanation: {
          en: "Alert branch sets channelTag and clears rows before PDF render — content coupling that turned a Slack hotfix into empty reports and forced full suite retests.",
          ru: "Ветка алертов ставит channelTag и чистит rows до рендера PDF — content coupling, превративший Slack-хотфикс в пустые отчёты и полный ретест suite."
        },
        conceptDemonstrated: "cpt_cohesion"
      }
    ],
    relatedQuestionIds: ["q_cc_recon_01"],
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    tags: ["#change-amplification", "#coupling", "#cohesion"]
  },
  {
    id: "art_cc_recon_ports",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "High-Cohesion Ports: Validator, Ledger, Reporter, Alert",
      ru: "Высоко-Cohesive Порты: Validator, Ledger, Reporter, Alert"
    },
    sourceCode: `package com.bank.reconciliation;

import java.util.List;

public interface LedgerRepository {
    List<LedgerRow> loadRows(ReconciliationBatch batch);
}

public interface AlertPublisher {
    void publish(AlertPayload payload);
}

public interface ReconciliationReporter {
    byte[] render(ReportModel model);
}

public final class ReconciliationValidator {
    public void validate(ReconciliationBatch batch) {
        if (batch == null) {
            throw new IllegalArgumentException("batch required");
        }
        // domain rules only — no JDBC / PDF / SMTP
    }
}

/** Immutable payloads destroy content coupling across concerns. */
public record AlertPayload(String channelHint, List<LedgerRow> mismatches) {}
public record ReportModel(List<LedgerRow> rows) {}`,
    annotations: [
      {
        id: "ann_cc_ports_1",
        startLine: 5,
        endLine: 15,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Separated Interfaces Shrink Blast Radius", ru: "Separated Interfaces Сужают Blast Radius" },
        explanation: {
          en: "LedgerRepository and AlertPublisher are Separated Interfaces — coordinator depends on ports; Slack/JDBC adapters change independently.",
          ru: "LedgerRepository и AlertPublisher — Separated Interfaces: coordinator зависит от портов; адаптеры Slack/JDBC меняются независимо."
        },
        conceptDemonstrated: "cpt_coupling"
      },
      {
        id: "ann_cc_ports_2",
        startLine: 17,
        endLine: 24,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Validator Cohesion: Rules Only", ru: "Cohesion Validator: Только Правила" },
        explanation: {
          en: "ReconciliationValidator has one reason to change — domain rules — testable without DataSource or PDF libraries.",
          ru: "У ReconciliationValidator одна причина меняться — доменные правила — тестируется без DataSource и PDF-библиотек."
        },
        conceptDemonstrated: "cpt_cohesion"
      }
    ],
    relatedQuestionIds: ["q_cc_recon_01"],
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    tags: ["#ports", "#cohesion", "#coupling"]
  },
  {
    id: "art_cc_recon_service_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Thin Coordinator + High-Cohesion Modules",
      ru: "Продакшн Фикс: Тонкий Coordinator + Высоко-Cohesive Модули"
    },
    sourceCode: `package com.bank.reconciliation;

import java.util.List;
import java.util.Objects;

/** Thin application coordinator — depends on abstractions only. */
public final class ReconciliationCoordinator {

    private final ReconciliationValidator validator;
    private final LedgerRepository ledger;
    private final ReconciliationReporter reporter;
    private final AlertPublisher alerts;
    private final int maxAttempts;

    public ReconciliationCoordinator(
            ReconciliationValidator validator,
            LedgerRepository ledger,
            ReconciliationReporter reporter,
            AlertPublisher alerts,
            int maxAttempts) {
        this.validator = Objects.requireNonNull(validator);
        this.ledger = Objects.requireNonNull(ledger);
        this.reporter = Objects.requireNonNull(reporter);
        this.alerts = Objects.requireNonNull(alerts);
        this.maxAttempts = maxAttempts;
    }

    public ReconciliationResult reconcile(ReconciliationBatch batch) {
        validator.validate(batch);
        int attempts = 0;
        while (true) {
            try {
                List<LedgerRow> rows = ledger.loadRows(batch);
                List<LedgerRow> mismatches = rows.stream().filter(LedgerRow::isMismatch).toList();
                if (!mismatches.isEmpty()) {
                    alerts.publish(new AlertPayload("SLACK", List.copyOf(mismatches)));
                }
                byte[] pdf = reporter.render(new ReportModel(List.copyOf(rows)));
                return new ReconciliationResult(pdf, mismatches.isEmpty() ? "NONE" : "SLACK");
            } catch (TransientLedgerException ex) {
                if (++attempts >= maxAttempts) throw ex;
            }
        }
    }
}

/** Alert adapter — changing Slack/email does not touch reporter or JDBC. */
public final class SlackWebhookAlertPublisher implements AlertPublisher {
    private final SlackClient client;

    public SlackWebhookAlertPublisher(SlackClient client) {
        this.client = client;
    }

    @Override
    public void publish(AlertPayload payload) {
        client.post("#recon-alerts", "mismatches=" + payload.mismatches().size());
    }
}`,
    annotations: [
      {
        id: "ann_sol_cc_1",
        startLine: 7,
        endLine: 48,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Coordinator Orchestrates Without Owning Details", ru: "Coordinator Оркестрирует Без Владения Деталями" },
        explanation: {
          en: "Retry and sequencing live here; immutable copies feed alert and report separately — no shared mutable ReportContext.",
          ru: "Retry и sequencing живут здесь; immutable копии кормят alert и report раздельно — нет shared mutable ReportContext."
        },
        problemSolved: {
          en: "Alert-channel adapter swaps no longer clear rows or force PDF/JDBC retests.",
          ru: "Смены адаптера канала алертов больше не чистят rows и не форсят ретест PDF/JDBC."
        },
        conceptDemonstrated: "cpt_coupling"
      },
      {
        id: "ann_sol_cc_2",
        startLine: 51,
        endLine: 64,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Alert Adapter Blast Radius Contained", ru: "Blast Radius Адаптера Алертов Изолирован" },
        explanation: {
          en: "SlackWebhookAlertPublisher implements AlertPublisher — ops channel churn stays in one cohesive module.",
          ru: "SlackWebhookAlertPublisher реализует AlertPublisher — churn ops-каналов остаётся в одном cohesive-модуле."
        },
        problemSolved: {
          en: "High cohesion for alerting; low coupling to ledger/PDF.",
          ru: "Высокая cohesion алертов; низкий coupling к ledger/PDF."
        },
        conceptDemonstrated: "cpt_cohesion"
      }
    ],
    relatedQuestionIds: ["q_cc_recon_01"],
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    tags: ["#coordinator", "#ports", "#change-amplification"]
  },
  {
    id: "art_cc_recon_service_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Alert Clears Rows Before PDF",
      ru: "Код для Поиска Бага: Alert Чистит Rows до PDF"
    },
    sourceCode: `package com.bank.reconciliation;

public class ReconciliationService {

    private final LedgerGateway ledger;
    private final PdfRenderer pdfRenderer;

    public ReconciliationResult reconcile(ReconciliationBatch batch) {
        ReportContext ctx = new ReportContext();
        validate(batch);
        ctx.rows = ledger.load(batch.period());
        if (hasMismatches(ctx.rows)) {
            ctx.channelTag = "SLACK";
            publishAlert(ctx);
            ctx.rows.clear(); // BUG: couples alert memory tweak to PDF input
        }
        byte[] pdf = pdfRenderer.render(ctx);
        return new ReconciliationResult(pdf, ctx.channelTag);
    }

    private void validate(ReconciliationBatch batch) { /* ... */ }
    private void publishAlert(ReportContext ctx) { /* Slack/email */ }
    private boolean hasMismatches(java.util.List<LedgerRow> rows) {
        return rows.stream().anyMatch(LedgerRow::isMismatch);
    }

    static final class ReportContext {
        java.util.List<LedgerRow> rows = java.util.List.of();
        String channelTag = "EMAIL";
    }
}`,
    annotations: [
      {
        id: "ann_bug_cc_1",
        startLine: 12,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Content Coupling on ReportContext", ru: "Content Coupling на ReportContext" },
        explanation: {
          en: "Alert path writes channelTag and clears rows that PDF still needs — the coupling edge that amplified the Slack hotfix into empty reports.",
          ru: "Путь алертов пишет channelTag и чистит rows, которые ещё нужны PDF — ребро coupling, усилившее Slack-хотфикс до пустых отчётов."
        },
        problemSolved: {
          en: "Shows why shared mutable cross-concern state is a coupling metric, not just a style issue.",
          ru: "Показывает, почему shared mutable cross-concern state — метрика coupling, а не просто стиль."
        },
        conceptDemonstrated: "cpt_coupling"
      }
    ],
    relatedQuestionIds: ["q_cc_recon_01"],
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    tags: ["#bug-hunt", "#content-coupling", "#reconciliation"]
  }
];
