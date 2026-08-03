import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_INHERITANCE: readonly CodeArtifact[] = [
  {
    id: "art_inh_report_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Regulatory Report Hierarchy (IS-A)",
      ru: "Иерархия Регуляторных Отчётов (IS-A)"
    },
    sourceCode: `package com.bank.regulatory;

/**
 * Shared filing envelope — subclasses claim IS-A BaseRegulatoryReport.
 * Platform owns this base; product teams own Liquidity / Risk / Capital reports.
 */
public abstract class BaseRegulatoryReport {
    protected String headerVersion = "REG-HDR-2"; // platform-bumped default
    protected final StringBuilder filing = new StringBuilder();

    protected BaseRegulatoryReport(String reportCode) {
        writeRegulatoryHeader(reportCode);
    }

    protected void writeRegulatoryHeader(String reportCode) {
        filing.append("HDR|").append(headerVersion).append("|").append(reportCode).append('\n');
    }

    protected void appendSection(String sectionId, String payload) {
        // platform change: auto-wrap / encode section payloads
        String encoded = java.util.Base64.getEncoder()
                .encodeToString(payload.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        filing.append("SEC|").append(sectionId).append("|").append(encoded).append('\n');
    }

    public final String renderFiling() {
        return filing.toString();
    }
}

/** Liquidity Coverage Ratio filing. */
public class LiquidityReport extends BaseRegulatoryReport { /* ... */ }

/** Risk-weighted exposure filing. */
public class RiskExposureReport extends BaseRegulatoryReport { /* ... */ }

/** Capital adequacy ratio filing. */
public class CapitalAdequacyReport extends BaseRegulatoryReport { /* ... */ }`,
    annotations: [
      {
        id: "ann_inh_types_1",
        startLine: 7,
        endLine: 12,
        category: "WHY_IT_EXISTS",
        title: { en: "IS-A Shared Envelope", ru: "Общий Конверт IS-A" },
        explanation: {
          en: "BaseRegulatoryReport centralizes header/section formatting. Subclasses inherit state and protected helpers — powerful and dangerous when undocumented.",
          ru: "BaseRegulatoryReport централизует форматирование header/section. Подклассы наследуют состояние и protected-хелперы — мощно и опасно без документации."
        },
        conceptDemonstrated: "cpt_inheritance"
      },
      {
        id: "ann_inh_types_2",
        startLine: 14,
        endLine: 22,
        category: "PRODUCTION_RISK",
        title: { en: "Protected Semantics Owned by Platform", ru: "Protected-Семантика во Владении Платформы" },
        explanation: {
          en: "headerVersion default and appendSection encoding are protected behavioral contracts — changing them silently breaks LiquidityReport / RiskExposureReport / CapitalAdequacyReport.",
          ru: "Default headerVersion и кодирование appendSection — protected поведенческие контракты: их смена тихо ломает LiquidityReport / RiskExposureReport / CapitalAdequacyReport."
        },
        conceptDemonstrated: "cpt_inherited_state"
      }
    ],
    relatedQuestionIds: ["q_inh_report_01"],
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    tags: ["#inheritance", "#regulatory-report"]
  },
  {
    id: "art_inh_report_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: LiquidityReport Protected Coupling",
      ru: "Исходный Нарушенный Код: Protected-Связность LiquidityReport"
    },
    sourceCode: `package com.bank.regulatory;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * BRITTLE SUBCLASS: relies on undocumented protected internals.
 * After platform upgrade → wrong HDR version + double-serialized LCR.
 */
public class LiquidityReport extends BaseRegulatoryReport {

    public LiquidityReport(String lcrJson) {
        super("LIQUIDITY");
        // BUG: header already written inside super() with REG-HDR-2
        this.headerVersion = "LIQ-EXT-1";

        // BUG: assumes appendSection concatenates raw strings
        String encoded = Base64.getEncoder()
                .encodeToString(lcrJson.getBytes(StandardCharsets.UTF_8));
        appendSection("LCR", encoded);
    }
}

public class RiskExposureReport extends BaseRegulatoryReport {
    public RiskExposureReport(String rwaJson) {
        super("RISK_EXPOSURE");
        this.headerVersion = "RWA-EXT-1"; // same late-mutation pattern
        String encoded = Base64.getEncoder()
                .encodeToString(rwaJson.getBytes(StandardCharsets.UTF_8));
        appendSection("RWA", encoded);
    }
}

public class CapitalAdequacyReport extends BaseRegulatoryReport {
    public CapitalAdequacyReport(String carJson) {
        super("CAPITAL_ADEQUACY");
        this.headerVersion = "CAR-EXT-1";
        String encoded = Base64.getEncoder()
                .encodeToString(carJson.getBytes(StandardCharsets.UTF_8));
        appendSection("CAR", encoded);
    }
}`,
    annotations: [
      {
        id: "ann_broken_inh_1",
        startLine: 14,
        endLine: 16,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Late Inherited State Mutation", ru: "Поздняя Мутация Унаследованного Состояния" },
        explanation: {
          en: "headerVersion is assigned after super() — writeRegulatoryHeader already consumed the platform default.",
          ru: "headerVersion присваивается после super() — writeRegulatoryHeader уже использовал platform default."
        },
        problemSolved: {
          en: "Constructor order makes post-super mutation of filing-critical inherited state ineffective.",
          ru: "Порядок конструкторов делает пост-super мутацию filing-критичного унаследованного состояния бесполезной."
        },
        conceptDemonstrated: "cpt_inherited_state"
      },
      {
        id: "ann_broken_inh_2",
        startLine: 18,
        endLine: 22,
        category: "PRODUCTION_RISK",
        title: { en: "Double Serialization via Protected Method", ru: "Двойная Сериализация через Protected-Метод" },
        explanation: {
          en: "Subclass pre-encodes; platform appendSection also encodes — silent double-serialized regulatory sections.",
          ru: "Подкласс заранее кодирует; платформенный appendSection тоже кодирует — тихие дважды сериализованные регуляторные секции."
        },
        conceptDemonstrated: "cpt_inherited_state"
      }
    ],
    relatedQuestionIds: ["q_inh_report_01"],
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    tags: ["#fragile-base", "#protected-coupling"]
  },
  {
    id: "art_inh_report_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Documented Constructor-Safe Extension Contract",
      ru: "Продакшн Фикс: Документированный Безопасный для Конструктора Контракт Расширения"
    },
    sourceCode: `package com.bank.regulatory;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

/**
 * Designed for inheritance (Effective Java Item 19) OR seal if undesigned.
 * @implSpec Constructor writes the header using caller-supplied headerVersion.
 *           appendSection accepts RAW UTF-8 section payloads (base owns encoding).
 *           Subclasses must not mutate header fields after super(...) and must not pre-encode.
 */
public abstract class BaseRegulatoryReport {

    private final StringBuilder filing = new StringBuilder();

    /**
     * @param reportCode     regulator report code (e.g. LIQUIDITY)
     * @param headerVersion  filing header version — required at construction time
     */
    protected BaseRegulatoryReport(String reportCode, String headerVersion) {
        Objects.requireNonNull(reportCode, "reportCode");
        Objects.requireNonNull(headerVersion, "headerVersion");
        writeRegulatoryHeader(reportCode, headerVersion);
    }

    private void writeRegulatoryHeader(String reportCode, String headerVersion) {
        filing.append("HDR|").append(headerVersion).append("|").append(reportCode).append('\n');
    }

    /** Final encoding ownership — subclasses pass raw payloads only. */
    protected final void appendSection(String sectionId, String rawPayload) {
        String encoded = java.util.Base64.getEncoder()
                .encodeToString(rawPayload.getBytes(StandardCharsets.UTF_8));
        filing.append("SEC|").append(sectionId).append("|").append(encoded).append('\n');
    }

    public final String renderFiling() {
        return filing.toString();
    }
}

public final class LiquidityReport extends BaseRegulatoryReport {
    public LiquidityReport(String lcrJson) {
        super("LIQUIDITY", "LIQ-EXT-1"); // header written with correct version
        appendSection("LCR", Objects.requireNonNull(lcrJson)); // RAW payload
    }
}

public final class RiskExposureReport extends BaseRegulatoryReport {
    public RiskExposureReport(String rwaJson) {
        super("RISK_EXPOSURE", "RWA-EXT-1");
        appendSection("RWA", Objects.requireNonNull(rwaJson));
    }
}

public final class CapitalAdequacyReport extends BaseRegulatoryReport {
    public CapitalAdequacyReport(String carJson) {
        super("CAPITAL_ADEQUACY", "CAR-EXT-1");
        appendSection("CAR", Objects.requireNonNull(carJson));
    }
}

/** Trade-off when inheritance was never designed: compose an assembler instead of subclassing. */
public final class RegulatoryFilingAssembler {
    public String assemble(String reportCode, String headerVersion,
                           String sectionId, String rawPayload) {
        StringBuilder filing = new StringBuilder();
        filing.append("HDR|").append(headerVersion).append("|").append(reportCode).append('\n');
        String encoded = java.util.Base64.getEncoder()
                .encodeToString(rawPayload.getBytes(StandardCharsets.UTF_8));
        filing.append("SEC|").append(sectionId).append("|").append(encoded).append('\n');
        return filing.toString();
    }
}`,
    annotations: [
      {
        id: "ann_sol_inh_1",
        startLine: 16,
        endLine: 24,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Constructor-Safe Header Metadata", ru: "Безопасные для Конструктора Метаданные Заголовка" },
        explanation: {
          en: "headerVersion is a constructor argument — writeRegulatoryHeader sees the real value during super(), eliminating late mutation.",
          ru: "headerVersion — аргумент конструктора: writeRegulatoryHeader видит реальное значение во время super(), устраняя позднюю мутацию."
        },
        problemSolved: {
          en: "Wrong header versions from post-super field assignment.",
          ru: "Неверные версии заголовка из присваивания поля после super."
        },
        conceptDemonstrated: "cpt_inherited_state"
      },
      {
        id: "ann_sol_inh_2",
        startLine: 30,
        endLine: 38,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Item 19: Documented / Final Extension Surface", ru: "Item 19: Документированная / Final Поверхность Расширения" },
        explanation: {
          en: "final appendSection owns encoding; renderFiling is final; @implSpec documents the raw-payload contract for subclasses.",
          ru: "final appendSection владеет encoding; renderFiling — final; @implSpec документирует контракт raw-payload для подклассов."
        },
        problemSolved: {
          en: "Silent double serialization from undocumented protected semantics.",
          ru: "Тихая двойная сериализация из недокументированной protected-семантики."
        },
        conceptDemonstrated: "cpt_inheritance"
      },
      {
        id: "ann_sol_inh_3",
        startLine: 64,
        endLine: 75,
        category: "TRADE_OFF",
        title: { en: "Composition Trade-off for Assembly", ru: "Компромисс Композиции для Сборки" },
        explanation: {
          en: "RegulatoryFilingAssembler shows composition when a designed IS-A hierarchy is not warranted — mentioned as trade-off, not the composition-over-inheritance mission.",
          ru: "RegulatoryFilingAssembler показывает композицию, когда спроектированная иерархия IS-A не оправдана — упомянуто как компромисс, не миссия composition-over-inheritance."
        },
        conceptDemonstrated: "cpt_inheritance"
      }
    ],
    relatedQuestionIds: ["q_inh_report_01"],
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    tags: ["#item-19", "#extension-contract", "#regulatory-report"]
  },
  {
    id: "art_inh_report_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: LiquidityReport Late Mutation + Double Encode",
      ru: "Код для Поиска Бага: Поздняя Мутация LiquidityReport + Двойной Encode"
    },
    sourceCode: `package com.bank.regulatory;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class LiquidityReport extends BaseRegulatoryReport {

    public LiquidityReport(String lcrJson) {
        super("LIQUIDITY");
        this.headerVersion = "LIQ-EXT-1";
        String encoded = Base64.getEncoder()
                .encodeToString(lcrJson.getBytes(StandardCharsets.UTF_8));
        appendSection("LCR", encoded);
    }
}`,
    annotations: [
      {
        id: "ann_bug_inh_1",
        startLine: 9,
        endLine: 13,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Two Silent Inheritance Bugs", ru: "Два Тихих Бага Наследования" },
        explanation: {
          en: "Late headerVersion mutation (wrong HDR) and pre-encode + appendSection encode (double-serialized LCR).",
          ru: "Поздняя мутация headerVersion (неверный HDR) и pre-encode + encode в appendSection (дважды сериализованный LCR)."
        },
        problemSolved: {
          en: "Demonstrates constructor-order and protected-semantics hazards unique to inheritance coupling.",
          ru: "Демонстрирует hazards порядка конструкторов и protected-семантики, уникальные для связности наследования."
        },
        conceptDemonstrated: "cpt_inherited_state"
      }
    ],
    relatedQuestionIds: ["q_inh_report_01"],
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    tags: ["#bug-hunt", "#inheritance"]
  }
];
