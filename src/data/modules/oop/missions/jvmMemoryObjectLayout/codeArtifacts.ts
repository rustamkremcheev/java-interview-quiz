import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_JVM_MEMORY_OBJECT_LAYOUT: readonly CodeArtifact[] = [
  {
    id: "art_jol_domain_keys",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: PositionKey & RiskBucket",
      ru: "Доменные Типы: PositionKey и RiskBucket"
    },
    sourceCode: `package com.risk.positions;

public record PositionKey(String bookId, String instrumentId) {
    public PositionKey {
        if (bookId == null || bookId.isBlank()) {
            throw new IllegalArgumentException("bookId required");
        }
        if (instrumentId == null || instrumentId.isBlank()) {
            throw new IllegalArgumentException("instrumentId required");
        }
    }
}

/** Nested graph contributor to retained size. */
public record RiskBucket(String bucketId, long notionalCents) {
    public RiskBucket {
        if (bucketId == null || bucketId.isBlank()) {
            throw new IllegalArgumentException("bucketId required");
        }
    }
}`,
    annotations: [
      {
        id: "ann_jol_domain_1",
        startLine: 16,
        endLine: 22,
        category: "WHY_IT_EXISTS",
        title: { en: "Records Still Heap Objects", ru: "Records Всё Ещё Объекты в Куче" },
        explanation: {
          en: "RiskBucket as a record still has object overhead — records are not C structs.",
          ru: "RiskBucket как record всё ещё имеет object overhead — records не C-структуры."
        },
        conceptDemonstrated: "cpt_object_header"
      }
    ],
    relatedQuestionIds: ["q_jol_cache_01"],
    conceptIds: ["cpt_object_header"],
    tags: ["#position-key", "#risk-bucket"]
  },
  {
    id: "art_jol_snapshot_bloated",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bloated PositionSnapshot with Boxing",
      ru: "Раздутый PositionSnapshot с Boxing"
    },
    sourceCode: `package com.risk.positions;

import java.util.ArrayList;
import java.util.List;

/**
 * BUG class: boxed fields + nested lists — field-width math underestimates heap.
 */
public final class PositionSnapshot {
    private final Long quantity;
    private final Double px;
    private final List<RiskBucket> buckets = new ArrayList<>();

    public PositionSnapshot(Long quantity, Double px) {
        this.quantity = quantity;
        this.px = px;
    }

    public void addBucket(RiskBucket bucket) {
        buckets.add(bucket);
    }

    public Long quantity() { return quantity; }
    public Double px() { return px; }
    public List<RiskBucket> buckets() { return List.copyOf(buckets); }
}`,
    annotations: [
      {
        id: "ann_jol_bloated_1",
        startLine: 10,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Boxed Leaves + Nested Graph", ru: "Boxed-Листья + Вложенный Граф" },
        explanation: {
          en: "Long/Double are objects; buckets list multiplies retained size per cache entry.",
          ru: "Long/Double — объекты; список buckets умножает retained size на каждую запись кэша."
        },
        conceptDemonstrated: "cpt_shallow_vs_retained_size"
      }
    ],
    relatedQuestionIds: ["q_jol_cache_01"],
    conceptIds: ["cpt_shallow_vs_retained_size", "cpt_object_header"],
    tags: ["#counter-example", "#boxing"]
  },
  {
    id: "art_jol_portfolio_flat",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Flatter PortfolioPosition with Primitives",
      ru: "Более Плоский PortfolioPosition с Примитивами"
    },
    sourceCode: `package com.risk.positions;

/**
 * Flatter representation for hot PositionCache entries.
 * Still a heap object — measure with JOL; do not assume zero overhead.
 */
public final class PortfolioPosition {
    private final long quantity;
    private final double px;
    private final long primaryBucketNotionalCents;

    public PortfolioPosition(long quantity, double px, long primaryBucketNotionalCents) {
        this.quantity = quantity;
        this.px = px;
        this.primaryBucketNotionalCents = primaryBucketNotionalCents;
    }

    public long quantity() { return quantity; }
    public double px() { return px; }
    public long primaryBucketNotionalCents() { return primaryBucketNotionalCents; }
}`,
    annotations: [
      {
        id: "ann_jol_flat_1",
        startLine: 8,
        endLine: 10,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Primitives in Hot Path", ru: "Примитивы на Hot Path" },
        explanation: {
          en: "Primitive fields avoid per-value box objects; keep heavy RiskBucket graphs out of the hottest map when possible.",
          ru: "Примитивные поля избегают box-объектов на значение; тяжёлые графы RiskBucket по возможности вне самой горячей map."
        },
        conceptDemonstrated: "cpt_shallow_vs_retained_size"
      }
    ],
    relatedQuestionIds: ["q_jol_cache_01"],
    conceptIds: ["cpt_shallow_vs_retained_size", "cpt_compressed_oops"],
    tags: ["#portfolio-position", "#primitives"]
  },
  {
    id: "art_jol_cache_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PositionCache Planner: Measured Capacity",
      ru: "PositionCache Planner: Измеренная Ёмкость"
    },
    sourceCode: `package com.risk.positions;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Capacity from measured bytesPerEntry (JOL footprint sample + map overhead),
 * not from summing field widths.
 */
public final class PositionCache {
    private final ConcurrentHashMap<PositionKey, PortfolioPosition> map = new ConcurrentHashMap<>();
    private final int maxEntries;

    public PositionCache(long measuredBytesPerEntry, long heapBudgetBytes) {
        if (measuredBytesPerEntry <= 0) {
            throw new IllegalArgumentException("measuredBytesPerEntry from JOL sample required");
        }
        this.maxEntries = (int) Math.max(1, heapBudgetBytes / measuredBytesPerEntry);
    }

    public void put(PositionKey key, PortfolioPosition position) {
        if (map.size() >= maxEntries) {
            throw new IllegalStateException("PositionCache capacity exceeded");
        }
        map.put(key, position);
    }

    public int maxEntries() { return maxEntries; }
}`,
    annotations: [
      {
        id: "ann_jol_sol_1",
        startLine: 12,
        endLine: 17,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Measured Bytes per Entry", ru: "Измеренные Байты на Запись" },
        explanation: {
          en: "Constructor demands a measured footprint — headers/alignment/retained/map costs folded in via JOL samples.",
          ru: "Конструктор требует измеренный footprint — headers/alignment/retained/map стоимость учтена через sample JOL."
        },
        conceptDemonstrated: "cpt_shallow_vs_retained_size"
      }
    ],
    relatedQuestionIds: ["q_jol_cache_01"],
    conceptIds: ["cpt_shallow_vs_retained_size", "cpt_object_header"],
    tags: ["#solution", "#position-cache"]
  },
  {
    id: "art_jol_cache_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Field-Only Planner",
      ru: "Сниппет Bug Hunt: Planner Только по Полям"
    },
    sourceCode: `public final class PositionSnapshot {
    private final Long quantity; // boxed
    private final Double px;
    private final List<RiskBucket> buckets;
    // ...
}
public final class PositionCachePlanner {
    // BUG: field widths only — ignores headers/alignment/boxing/retained
    static final int BYTES_PER_ENTRY = 8 + 8;
    static int maxEntries(long heapBytes) {
        return (int) (heapBytes / BYTES_PER_ENTRY);
    }
}`,
    annotations: [
      {
        id: "ann_jol_bug_1",
        startLine: 9,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Naive Capacity Constant", ru: "Наивная Константа Ёмкости" },
        explanation: {
          en: "8+8 field math plus divide — the defect that under-provisioned the heap.",
          ru: "Математика полей 8+8 плюс деление — дефект, из-за которого недооценили кучу."
        },
        conceptDemonstrated: "cpt_shallow_vs_retained_size"
      }
    ],
    relatedQuestionIds: ["q_jol_cache_01"],
    conceptIds: ["cpt_shallow_vs_retained_size"],
    tags: ["#bug-hunt"]
  }
];
