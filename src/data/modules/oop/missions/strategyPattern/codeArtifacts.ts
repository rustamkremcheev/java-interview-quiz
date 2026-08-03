import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_STRATEGY: readonly CodeArtifact[] = [
  {
    id: "art_st_payment_channel",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PaymentChannel Enum & PaymentFeeRequest",
      ru: "Enum PaymentChannel и PaymentFeeRequest"
    },
    sourceCode: `package com.bank.fees;

/** Payment rails that require distinct fee formulas. */
public enum PaymentChannel {
    CARD,
    WIRE,
    ACH,
    INSTANT,
    CRYPTO
}

/** Immutable fee calculation input (amounts in minor units / cents). */
public record PaymentFeeRequest(
        PaymentChannel channel,
        long amountCents,
        boolean overnightWire,
        String currencyCode
) {
    public PaymentFeeRequest {
        if (amountCents < 0) {
            throw new IllegalArgumentException("amountCents must be >= 0");
        }
    }
}`,
    annotations: [
      {
        id: "ann_st_channel_1",
        startLine: 4,
        endLine: 10,
        category: "WHY_IT_EXISTS",
        title: { en: "Channel Discriminator", ru: "Дискриминатор Канала" },
        explanation: {
          en: "PaymentChannel drives which fee algorithm applies — the smell appears when this enum feeds a growing switch inside PaymentFeeCalculator.",
          ru: "PaymentChannel определяет алгоритм комиссии — smell появляется, когда enum кормит растущий switch внутри PaymentFeeCalculator."
        },
        conceptDemonstrated: "cpt_strategy_pattern"
      }
    ],
    relatedQuestionIds: ["q_st_fee_01"],
    conceptIds: ["cpt_strategy_pattern"],
    tags: ["#payment-channel", "#fees", "#strategy-pattern"]
  },
  {
    id: "art_st_fee_calculator_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: PaymentFeeCalculator Switch Explosion",
      ru: "Исходный Нарушенный Код: Взрыв Switch в PaymentFeeCalculator"
    },
    sourceCode: `package com.bank.fees;

/**
 * OCP VIOLATION + PRODUCTION BUG CLASS:
 * Every new PaymentChannel edits this class.
 * Missing break after CRYPTO fell through — INSTANT posted 0 feeCents.
 */
public class PaymentFeeCalculator {

    public long calculateFeeCents(PaymentFeeRequest request) {
        long feeCents = 0;
        switch (request.channel()) {
            case CARD:
                feeCents = Math.max(25, request.amountCents() * 150 / 10_000); // 1.5% min $0.25
                break;
            case WIRE:
                feeCents = request.overnightWire() ? 4500 : 2500;
                break;
            case ACH:
                feeCents = request.amountCents() < 100_00 ? 25 : 100;
                break;
            case CRYPTO:
                feeCents = Math.max(100, request.amountCents() * 200 / 10_000);
                // ⚠️ HOTFIX forgot break — falls through!
            case INSTANT:
                feeCents = 0; // wrong for INSTANT; also wipes CRYPTO
                break;
            default:
                throw new IllegalArgumentException("Unknown channel: " + request.channel());
        }
        return feeCents;
    }
}`,
    annotations: [
      {
        id: "ann_broken_st_1",
        startLine: 12,
        endLine: 30,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Giant PaymentChannel Switch", ru: "Гигантский Switch по PaymentChannel" },
        explanation: {
          en: "All fee formulas live in one method — adding CRYPTO requires modifying PaymentFeeCalculator (OCP violation).",
          ru: "Все формулы комиссий в одном методе — добавление CRYPTO требует правки PaymentFeeCalculator (нарушение OCP)."
        },
        problemSolved: {
          en: "Centralized switch is brittle under channel growth and hotfix pressure.",
          ru: "Централизованный switch хрупок при росте каналов и давлении хотфиксов."
        },
        conceptDemonstrated: "cpt_open_closed"
      },
      {
        id: "ann_broken_st_2",
        startLine: 24,
        endLine: 28,
        category: "PRODUCTION_RISK",
        title: { en: "Missing Break Fall-Through", ru: "Fall-Through из-за Пропущенного Break" },
        explanation: {
          en: "CRYPTO falls into INSTANT which assigns feeCents = 0 — treasury sees free INSTANT and wiped CRYPTO fees.",
          ru: "CRYPTO падает в INSTANT, который присваивает feeCents = 0 — казначейство видит бесплатный INSTANT и обнулённый CRYPTO."
        },
        conceptDemonstrated: "cpt_strategy_pattern"
      }
    ],
    relatedQuestionIds: ["q_st_fee_01"],
    conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
    tags: ["#switch-explosion", "#ocp", "#fallthrough"]
  },
  {
    id: "art_st_fee_strategy_interface",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "FeeStrategy Interface & Channel Strategies",
      ru: "Интерфейс FeeStrategy и Стратегии Каналов"
    },
    sourceCode: `package com.bank.fees;

@FunctionalInterface
public interface FeeStrategy {
    long computeFeeCents(PaymentFeeRequest request);
}

public final class CardFeeStrategy implements FeeStrategy {
    @Override
    public long computeFeeCents(PaymentFeeRequest request) {
        return Math.max(25, request.amountCents() * 150 / 10_000);
    }
}

public final class WireFeeStrategy implements FeeStrategy {
    @Override
    public long computeFeeCents(PaymentFeeRequest request) {
        return request.overnightWire() ? 4500 : 2500;
    }
}

public final class AchFeeStrategy implements FeeStrategy {
    @Override
    public long computeFeeCents(PaymentFeeRequest request) {
        return request.amountCents() < 100_00 ? 25 : 100;
    }
}`,
    annotations: [
      {
        id: "ann_st_iface_1",
        startLine: 3,
        endLine: 6,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Interchangeable Fee Algorithm Contract", ru: "Контракт Взаимозаменяемого Алгоритма Комиссии" },
        explanation: {
          en: "FeeStrategy is the Strategy interface — clients depend on this abstraction, not on CARD/WIRE/ACH formulas.",
          ru: "FeeStrategy — интерфейс Strategy: клиенты зависят от этой абстракции, а не от формул CARD/WIRE/ACH."
        },
        conceptDemonstrated: "cpt_strategy_pattern"
      },
      {
        id: "ann_st_iface_2",
        startLine: 8,
        endLine: 28,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "One Class Per Channel Formula", ru: "Один Класс на Формулу Канала" },
        explanation: {
          en: "CardFeeStrategy, WireFeeStrategy, AchFeeStrategy isolate algorithms — independently testable and extensible.",
          ru: "CardFeeStrategy, WireFeeStrategy, AchFeeStrategy изолируют алгоритмы — независимо тестируемые и расширяемые."
        },
        conceptDemonstrated: "cpt_open_closed"
      }
    ],
    relatedQuestionIds: ["q_st_fee_01"],
    conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
    tags: ["#fee-strategy", "#strategy-pattern"]
  },
  {
    id: "art_st_fee_calculator_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: FeeStrategyRegistry + Thin Calculator",
      ru: "Продакшн Фикс: FeeStrategyRegistry + Тонкий Калькулятор"
    },
    sourceCode: `package com.bank.fees;

import java.util.EnumMap;
import java.util.Map;
import java.util.Objects;

/** Composition-root registry: PaymentChannel → FeeStrategy. */
public final class FeeStrategyRegistry {

    private final Map<PaymentChannel, FeeStrategy> strategies;

    public FeeStrategyRegistry(Map<PaymentChannel, FeeStrategy> strategies) {
        this.strategies = Map.copyOf(new EnumMap<>(strategies));
    }

    public static FeeStrategyRegistry standard() {
        Map<PaymentChannel, FeeStrategy> map = new EnumMap<>(PaymentChannel.class);
        map.put(PaymentChannel.CARD, new CardFeeStrategy());
        map.put(PaymentChannel.WIRE, new WireFeeStrategy());
        map.put(PaymentChannel.ACH, new AchFeeStrategy());
        map.put(PaymentChannel.INSTANT, req -> Math.max(99, req.amountCents() * 50 / 10_000));
        map.put(PaymentChannel.CRYPTO, req -> Math.max(100, req.amountCents() * 200 / 10_000));
        return new FeeStrategyRegistry(map);
    }

    public FeeStrategy resolve(PaymentChannel channel) {
        FeeStrategy strategy = strategies.get(channel);
        if (strategy == null) {
            throw new IllegalArgumentException("No FeeStrategy registered for " + channel);
        }
        return strategy;
    }
}

/** Thin context — closed for modification, open via registry extension. */
public class PaymentFeeCalculator {

    private final FeeStrategyRegistry registry;

    public PaymentFeeCalculator(FeeStrategyRegistry registry) {
        this.registry = Objects.requireNonNull(registry);
    }

    public long calculateFeeCents(PaymentFeeRequest request) {
        return registry.resolve(request.channel()).computeFeeCents(request);
    }
}`,
    annotations: [
      {
        id: "ann_sol_st_1",
        startLine: 8,
        endLine: 35,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Registry Map Dispatch", ru: "Диспетчеризация через Registry Map" },
        explanation: {
          en: "FeeStrategyRegistry selects strategies by channel key — no switch fall-through; unknown channels fail fast.",
          ru: "FeeStrategyRegistry выбирает strategies по ключу канала — нет fall-through; неизвестные каналы падают fail-fast."
        },
        problemSolved: {
          en: "Eliminates switch explosion and silent 0-fee paths from missing break / null.",
          ru: "Устраняет взрыв switch и тихие пути 0-комиссии из пропущенного break / null."
        },
        conceptDemonstrated: "cpt_strategy_pattern"
      },
      {
        id: "ann_sol_st_2",
        startLine: 38,
        endLine: 48,
        category: "INTERVIEW_CONCEPT",
        title: { en: "OCP: Thin Calculator Context", ru: "OCP: Тонкий Контекст Калькулятора" },
        explanation: {
          en: "calculateFeeCents only resolves + delegates. New channels register strategies without editing this class.",
          ru: "calculateFeeCents только resolve + delegate. Новые каналы регистрируют strategies без правки этого класса."
        },
        problemSolved: {
          en: "Open for extension, closed for modification.",
          ru: "Открыто для расширения, закрыто для модификации."
        },
        conceptDemonstrated: "cpt_open_closed"
      }
    ],
    relatedQuestionIds: ["q_st_fee_01"],
    conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
    tags: ["#fee-strategy-registry", "#ocp", "#strategy-pattern"]
  },
  {
    id: "art_st_fee_calculator_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: CRYPTO Fall-Through into INSTANT",
      ru: "Код для Поиска Бага: Fall-Through CRYPTO в INSTANT"
    },
    sourceCode: `package com.bank.fees;

public class PaymentFeeCalculator {

    public long calculateFeeCents(PaymentFeeRequest request) {
        long feeCents = 0;
        switch (request.channel()) {
            case CARD:
                feeCents = cardFee(request);
                break;
            case WIRE:
                feeCents = wireFee(request);
                break;
            case ACH:
                feeCents = achFee(request);
                break;
            case CRYPTO:
                feeCents = cryptoFee(request);
                // BUG: missing break — falls through!
            case INSTANT:
                feeCents = 0;
                break;
            default:
                throw new IllegalArgumentException("Unknown channel");
        }
        return feeCents;
    }

    private long cardFee(PaymentFeeRequest r) { return Math.max(25, r.amountCents() * 150 / 10_000); }
    private long wireFee(PaymentFeeRequest r) { return r.overnightWire() ? 4500 : 2500; }
    private long achFee(PaymentFeeRequest r) { return r.amountCents() < 100_00 ? 25 : 100; }
    private long cryptoFee(PaymentFeeRequest r) { return Math.max(100, r.amountCents() * 200 / 10_000); }
}`,
    annotations: [
      {
        id: "ann_bug_st_1",
        startLine: 17,
        endLine: 22,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Missing Break After CRYPTO", ru: "Пропущенный Break после CRYPTO" },
        explanation: {
          en: "CRYPTO computes a fee then falls into INSTANT which assigns 0 — production posts free INSTANT and wiped CRYPTO fees.",
          ru: "CRYPTO считает комиссию, затем падает в INSTANT с присваиванием 0 — продакшен выставляет бесплатный INSTANT и обнулённый CRYPTO."
        },
        problemSolved: {
          en: "Demonstrates why switch-centralized fee selection is a production hazard under hotfix pressure.",
          ru: "Демонстрирует, почему централизованный switch выбора комиссий опасен под давлением хотфиксов."
        },
        conceptDemonstrated: "cpt_strategy_pattern"
      }
    ],
    relatedQuestionIds: ["q_st_fee_01"],
    conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
    tags: ["#bug-hunt", "#fallthrough", "#fees"]
  }
];
