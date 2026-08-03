import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_FACTORY: readonly CodeArtifact[] = [
  {
    id: "art_fa_compliance_report_interface",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "ComplianceReport Interface & Concrete Formats",
      ru: "Интерфейс ComplianceReport и Конкретные Форматы"
    },
    sourceCode: `package com.bank.compliance.export;

/**
 * Product hierarchy for regulatory compliance filings.
 */
public interface ComplianceReport {
    String contentType();
    byte[] render(FilingPayload payload);
}

public final class PdfComplianceReport implements ComplianceReport {
    @Override public String contentType() { return "application/pdf"; }
    @Override public byte[] render(FilingPayload payload) { /* PDF render */ return new byte[0]; }
}

public final class CsvComplianceReport implements ComplianceReport {
    @Override public String contentType() { return "text/csv"; }
    @Override public byte[] render(FilingPayload payload) { /* CSV render */ return new byte[0]; }
}

public final class XmlComplianceReport implements ComplianceReport {
    @Override public String contentType() { return "application/xml"; }
    @Override public byte[] render(FilingPayload payload) { /* XML render */ return new byte[0]; }
}`,
    annotations: [
      {
        id: "ann_fa_iface_1",
        startLine: 5,
        endLine: 8,
        category: "WHY_IT_EXISTS",
        title: { en: "Product Abstraction", ru: "Абстракция Продукта" },
        explanation: {
          en: "ComplianceReport is the product interface exporters should depend on — never the Pdf/Csv/Xml concrete classes.",
          ru: "ComplianceReport — product-интерфейс, от которого должны зависеть экспортёры — никогда не от конкретных Pdf/Csv/Xml классов."
        },
        conceptDemonstrated: "cpt_creational_decoupling"
      }
    ],
    relatedQuestionIds: ["q_fa_compliance_01"],
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    tags: ["#factory-pattern", "#compliance", "#interfaces"]
  },
  {
    id: "art_fa_export_service_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Scattered new in ComplianceExportService",
      ru: "Исходный Нарушенный Код: Разбросанные new в ComplianceExportService"
    },
    sourceCode: `package com.bank.compliance.export;

/**
 * PRODUCTION INCIDENT:
 * CSV regulatory filings delivered as PDF binaries.
 * Root cause: typo "CVS" + silent default-to-PDF.
 */
public class ComplianceExportService {

    public byte[] export(String formatCode, FilingPayload payload) {
        ComplianceReport report;
        if ("PDF".equalsIgnoreCase(formatCode)) {
            report = new PdfComplianceReport();
        } else if ("CVS".equalsIgnoreCase(formatCode)) { // typo — should be CSV
            report = new CsvComplianceReport();
        } else if ("XML".equalsIgnoreCase(formatCode)) {
            report = new XmlComplianceReport();
        } else {
            // ⚠️ Silent wrong product — unrecognized / mistyped codes become PDF
            report = new PdfComplianceReport();
        }
        return report.render(payload);
    }
}`,
    annotations: [
      {
        id: "ann_broken_fa_1",
        startLine: 14,
        endLine: 16,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Format String Typo CVS", ru: "Опечатка в Строке Формата CVS" },
        explanation: {
          en: "Lines 14-16: Compares against \"CVS\" instead of \"CSV\" — CSV requests never enter the CsvComplianceReport branch.",
          ru: "Строки 14-16: Сравнение с \"CVS\" вместо \"CSV\" — CSV-запросы никогда не попадают в ветку CsvComplianceReport."
        },
        problemSolved: {
          en: "Causes fallthrough to silent PDF default for all real CSV filings.",
          ru: "Вызывает fallthrough в тихий PDF default для всех реальных CSV filing."
        },
        conceptDemonstrated: "cpt_factory_pattern"
      },
      {
        id: "ann_broken_fa_2",
        startLine: 19,
        endLine: 22,
        category: "PRODUCTION_RISK",
        title: { en: "Silent Default-to-PDF", ru: "Тихий Default-to-PDF" },
        explanation: {
          en: "Lines 19-22: Unrecognized format codes (including the CSV typo path) construct PdfComplianceReport with no exception.",
          ru: "Строки 19-22: Нераспознанные коды формата (включая путь с опечаткой CSV) создают PdfComplianceReport без исключения."
        },
        conceptDemonstrated: "cpt_creational_decoupling"
      }
    ],
    relatedQuestionIds: ["q_fa_compliance_01"],
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    tags: ["#scattered-new", "#compliance", "#bug"]
  },
  {
    id: "art_fa_factory_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: ComplianceReportFactory with Fail-Fast Validation",
      ru: "Продакшн Фикс: ComplianceReportFactory с Fail-Fast Валидацией"
    },
    sourceCode: `package com.bank.compliance.export;

public final class ComplianceReportFactory {

    private ComplianceReportFactory() {}

    public static ComplianceReport create(String formatCode) {
        if (formatCode == null || formatCode.isBlank()) {
            throw new UnknownReportFormatException(formatCode);
        }
        return switch (formatCode.trim().toUpperCase()) {
            case "PDF" -> new PdfComplianceReport();
            case "CSV" -> new CsvComplianceReport();
            case "XML" -> new XmlComplianceReport();
            default -> throw new UnknownReportFormatException(formatCode);
        };
    }
}

public class ComplianceExportService {

    public byte[] export(String formatCode, FilingPayload payload) {
        ComplianceReport report = ComplianceReportFactory.create(formatCode);
        return report.render(payload);
    }
}`,
    annotations: [
      {
        id: "ann_sol_fa_1",
        startLine: 7,
        endLine: 15,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Centralized Factory with Fail-Fast Codes", ru: "Централизованная Factory с Fail-Fast Кодами" },
        explanation: {
          en: "Lines 7-15: Single creation point validates normalized format codes and throws on unknowns — no silent PDF default.",
          ru: "Строки 7-15: Единая точка создания валидирует нормализованные коды формата и бросает на неизвестных — без тихого PDF default."
        },
        problemSolved: {
          en: "Eliminates scattered new and CVS-typo fallthrough to wrong product.",
          ru: "Устраняет разбросанные new и fallthrough с опечаткой CVS к неверному продукту."
        },
        conceptDemonstrated: "cpt_factory_pattern"
      },
      {
        id: "ann_sol_fa_2",
        startLine: 20,
        endLine: 23,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Exporter Depends on Abstraction", ru: "Экспортёр Зависит от Абстракции" },
        explanation: {
          en: "ComplianceExportService only sees ComplianceReport — creational decoupling from Pdf/Csv/Xml concrete classes.",
          ru: "ComplianceExportService видит только ComplianceReport — creational decoupling от конкретных Pdf/Csv/Xml классов."
        },
        conceptDemonstrated: "cpt_creational_decoupling"
      }
    ],
    relatedQuestionIds: ["q_fa_compliance_01"],
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    tags: ["#factory-pattern", "#fail-fast", "#compliance"]
  },
  {
    id: "art_fa_bughunt_export",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: CVS Typo + Silent PDF Default",
      ru: "Код для Поиска Бага: Опечатка CVS + Тихий PDF Default"
    },
    sourceCode: `package com.bank.compliance.export;

public class ComplianceExportService {

    public ComplianceReport createReport(String format) {
        if ("PDF".equalsIgnoreCase(format)) {
            return new PdfComplianceReport();
        }
        if ("CVS".equalsIgnoreCase(format)) { // BUG: typo — never matches "CSV"
            return new CsvComplianceReport();
        }
        if ("XML".equalsIgnoreCase(format)) {
            return new XmlComplianceReport();
        }
        return new PdfComplianceReport(); // BUG: silent default
    }
}`,
    annotations: [
      {
        id: "ann_bug_fa_1",
        startLine: 9,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Typo Branch Never Matches CSV", ru: "Ветка с Опечаткой Никогда Не Совпадает с CSV" },
        explanation: {
          en: "Line 9: \"CVS\" typo means real \"CSV\" requests skip CsvComplianceReport and hit the silent PDF default.",
          ru: "Строка 9: Опечатка \"CVS\" означает, что реальные \"CSV\"-запросы пропускают CsvComplianceReport и попадают в тихий PDF default."
        },
        problemSolved: {
          en: "Demonstrates why format validation must live in a tested factory, not ad-hoc if-else.",
          ru: "Демонстрирует, почему валидация формата должна жить в протестированной factory, а не в ad-hoc if-else."
        },
        conceptDemonstrated: "cpt_factory_pattern"
      },
      {
        id: "ann_bug_fa_2",
        startLine: 15,
        endLine: 15,
        category: "PRODUCTION_RISK",
        title: { en: "Silent PDF Fallthrough", ru: "Тихий PDF Fallthrough" },
        explanation: {
          en: "Line 15: Default branch returns PdfComplianceReport — compiles, non-null tests pass, regulators reject filings.",
          ru: "Строка 15: Default-ветка возвращает PdfComplianceReport — компилируется, non-null тесты зелёные, регулятор отклоняет filing."
        },
        conceptDemonstrated: "cpt_creational_decoupling"
      }
    ],
    relatedQuestionIds: ["q_fa_compliance_01"],
    conceptIds: ["cpt_factory_pattern", "cpt_creational_decoupling"],
    tags: ["#bug-hunt", "#compliance", "#factory-pattern"]
  }
];
