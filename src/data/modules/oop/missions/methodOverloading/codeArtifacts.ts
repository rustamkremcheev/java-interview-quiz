import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OVERLOADING: readonly CodeArtifact[] = [
  {
    id: "art_ledger_settle_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: LedgerPostingService Settle Overloads",
      ru: "Исходный Нарушенный Код: Перегрузки Settle в LedgerPostingService"
    },
    sourceCode: `package com.finance.ledger.posting;

import java.math.BigDecimal;
import java.util.Objects;

public record LedgerEntry(long amountCents, String currency) {
    public static LedgerEntry ofCents(long cents) {
        return new LedgerEntry(cents, "USD");
    }

    /** Interprets amount as major units (dollars) and scales to cents. */
    public static LedgerEntry ofDecimal(BigDecimal amount) {
        return new LedgerEntry(amount.movePointRight(2).longValueExact(), "USD");
    }
}

public record PostingResult(String entryId, long amountCents, boolean success) {}

/**
 * PRODUCTION BUG: Four settle overloads mix cents and major-unit semantics
 * under one name. Compile-time resolution + autoboxing pick surprising paths.
 */
public class LedgerPostingService {

    /** Posts minor units (cents). */
    public PostingResult settle(long cents) {
        return post(LedgerEntry.ofCents(cents));
    }

    /** Posts major units (dollars) then converts to cents. */
    public PostingResult settle(BigDecimal amount) {
        return post(LedgerEntry.ofDecimal(amount));
    }

    public PostingResult settle(String amount) {
        return settle(new BigDecimal(amount));
    }

    public PostingResult settle(Long cents) {
        Objects.requireNonNull(cents, "cents");
        return settle(cents.longValue());
    }

    private PostingResult post(LedgerEntry entry) {
        return new PostingResult("le-" + entry.amountCents(), entry.amountCents(), true);
    }
}

/** Client DTO path — Integer resolves to settle(long) via unboxing, not settle(Long). */
public class SettlementBatchJob {
    public void settleDto(LedgerPostingService svc, Integer amountCents) {
        // COMPILE-TIME: Integer → settle(long) (phase 2 unboxing). null Integer → NPE.
        svc.settle(amountCents);
    }
}`,
    annotations: [
      {
        id: "ann_ol_broken_1",
        startLine: 28,
        endLine: 42,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Mixed-Scale Settle Overload Set", ru: "Набор Перегрузок Settle со Смешанным Масштабом" },
        explanation: {
          en: "settle(long/Long) means cents; settle(BigDecimal/String) means dollars. Same method name, conflicting domain units — a wrong overload becomes a wrong ledger amount (~100×).",
          ru: "settle(long/Long) — центы; settle(BigDecimal/String) — доллары. Одно имя метода, конфликтующие доменные единицы — неверная перегрузка становится неверной суммой леджера (~100×)."
        },
        problemSolved: {
          en: "Ambiguous public overload set with conflicting monetary semantics.",
          ru: "Неоднозначный публичный набор перегрузок с конфликтующей денежной семантикой."
        },
        conceptDemonstrated: "cpt_method_overloading"
      },
      {
        id: "ann_ol_broken_2",
        startLine: 48,
        endLine: 52,
        category: "PRODUCTION_RISK",
        title: { en: "Integer Call Site Hits settle(long)", ru: "Call Site с Integer Попадает в settle(long)" },
        explanation: {
          en: "Integer never selects settle(Long). Unboxing targets settle(long); null Integer throws NPE at the call site. settle(null) among Long/BigDecimal/String is compile-time ambiguous.",
          ru: "Integer никогда не выбирает settle(Long). Unboxing ведёт в settle(long); null Integer бросает NPE в месте вызова. settle(null) среди Long/BigDecimal/String неоднозначен на этапе компиляции."
        },
        conceptDemonstrated: "cpt_compile_time_resolution"
      }
    ],
    relatedQuestionIds: ["q_ol_ledger_01"],
    conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
    tags: ["#overloading", "#ledger", "#autoboxing"]
  },
  {
    id: "art_ledger_settle_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Named SettleCents / SettleDecimal API",
      ru: "Продакшн Рефакторинг: Именованный API SettleCents / SettleDecimal"
    },
    sourceCode: `package com.finance.ledger.posting;

import java.math.BigDecimal;
import java.util.Objects;

public record LedgerEntry(long amountCents, String currency) {
    public static LedgerEntry ofCents(long cents) {
        return new LedgerEntry(cents, "USD");
    }

    public static LedgerEntry ofDecimal(BigDecimal amount) {
        return new LedgerEntry(amount.movePointRight(2).longValueExact(), "USD");
    }
}

public record PostingResult(String entryId, long amountCents, boolean success) {}

/**
 * Named methods encode monetary scale. No ambiguous settle(null) overload set.
 */
public class LedgerPostingService {

    public PostingResult settleCents(long cents) {
        return post(LedgerEntry.ofCents(cents));
    }

    public PostingResult settleDecimal(BigDecimal amount) {
        Objects.requireNonNull(amount, "amount");
        return post(LedgerEntry.ofDecimal(amount));
    }

    /** Explicit parse path — name still advertises decimal (major-unit) semantics. */
    public PostingResult settleDecimal(String amount) {
        Objects.requireNonNull(amount, "amount");
        return settleDecimal(new BigDecimal(amount));
    }

    private PostingResult post(LedgerEntry entry) {
        return new PostingResult("le-" + entry.amountCents(), entry.amountCents(), true);
    }
}

public class SettlementBatchJob {
    public void settleDto(LedgerPostingService svc, Integer amountCents) {
        Objects.requireNonNull(amountCents, "amountCents");
        svc.settleCents(amountCents.longValue());
    }
}`,
    annotations: [
      {
        id: "ann_ol_sol_1",
        startLine: 20,
        endLine: 28,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Named Methods Encode Scale", ru: "Именованные Методы Кодируют Масштаб" },
        explanation: {
          en: "settleCents vs settleDecimal makes the monetary unit part of the API name. Callers cannot accidentally resolve cents onto a major-unit path via overload selection.",
          ru: "settleCents vs settleDecimal делает денежную единицу частью имени API. Вызывающий код не может случайно разрешить центы в путь основных единиц через выбор перегрузки."
        },
        conceptDemonstrated: "cpt_method_overloading"
      },
      {
        id: "ann_ol_sol_2",
        startLine: 30,
        endLine: 34,
        category: "WHY_IT_EXISTS",
        title: { en: "Explicit String Parse Remains Named", ru: "Явный Парсинг String Остаётся Именованным" },
        explanation: {
          en: "A String overload is acceptable only when the name still says decimal. Prefer requireNonNull over null-ambiguous Long/BigDecimal/String triples named settle.",
          ru: "Перегрузка String допустима, только если имя по-прежнему говорит decimal. Предпочитайте requireNonNull вместо null-неоднозначной тройки Long/BigDecimal/String с именем settle."
        },
        conceptDemonstrated: "cpt_compile_time_resolution"
      },
      {
        id: "ann_ol_sol_3",
        startLine: 40,
        endLine: 44,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Client Converts Integer Explicitly", ru: "Клиент Явно Конвертирует Integer" },
        explanation: {
          en: "DTOs convert Integer → long at the boundary with null checks. No reliance on autoboxing to pick among conflicting settle overloads.",
          ru: "DTO конвертируют Integer → long на границе с проверкой null. Нет зависимости от автобоксинга для выбора среди конфликтующих перегрузок settle."
        },
        conceptDemonstrated: "cpt_compile_time_resolution"
      }
    ],
    relatedQuestionIds: ["q_ol_ledger_01"],
    conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
    tags: ["#overloading", "#api-design", "#ledger"]
  },
  {
    id: "art_ledger_settle_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Ambiguous Settle Overloads",
      ru: "Код для Поиска Бага: Неоднозначные Перегрузки Settle"
    },
    sourceCode: `package com.finance.ledger.posting;

import java.math.BigDecimal;

public class LedgerPostingService {
    public PostingResult settle(long cents) {
        return post(LedgerEntry.ofCents(cents));
    }

    public PostingResult settle(BigDecimal amount) {
        // Major units — conflicting scale under the same name "settle"
        return post(LedgerEntry.ofDecimal(amount));
    }

    public PostingResult settle(String amount) {
        return settle(new BigDecimal(amount));
    }

    public PostingResult settle(Long cents) {
        return settle(cents.longValue());
    }

    private PostingResult post(LedgerEntry entry) {
        return new PostingResult("le-" + entry.amountCents(), entry.amountCents(), true);
    }
}

public class SettlementBatchJob {
    public void settleDto(LedgerPostingService svc, Integer amountCents) {
        // COMPILE-TIME: Integer → settle(long) via unboxing — not settle(Long)
        svc.settle(amountCents);
    }
}`,
    annotations: [
      {
        id: "ann_ol_bug_1",
        startLine: 5,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Cents vs Decimal Overloads Share Name", ru: "Перегрузки Центов и Decimal Делят Имя" },
        explanation: {
          en: "Lines declaring settle(long) and settle(BigDecimal) establish conflicting monetary scales under one overload set — the root API design bug.",
          ru: "Строки с settle(long) и settle(BigDecimal) задают конфликтующие денежные масштабы в одном наборе перегрузок — корневой баг дизайна API."
        },
        conceptDemonstrated: "cpt_method_overloading"
      },
      {
        id: "ann_ol_bug_2",
        startLine: 28,
        endLine: 31,
        category: "PRODUCTION_RISK",
        title: { en: "Integer Call Site Resolution Trap", ru: "Ловушка Разрешения Call Site с Integer" },
        explanation: {
          en: "svc.settle(amountCents) is where production DTOs hit compile-time unboxing into settle(long). null Integer NPEs; engineers expecting settle(Long) are wrong.",
          ru: "svc.settle(amountCents) — место, где продакшн-DTO попадают в compile-time unboxing в settle(long). null Integer даёт NPE; ожидание settle(Long) ошибочно."
        },
        conceptDemonstrated: "cpt_compile_time_resolution"
      }
    ],
    relatedQuestionIds: ["q_ol_ledger_01"],
    conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
    tags: ["#overloading", "#bug-hunt", "#ledger"]
  }
];
