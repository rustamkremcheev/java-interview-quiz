import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_ABSTRACTION: readonly CodeArtifact[] = [
  {
    id: "art_ab_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: PaymentIntent & GatewayResult",
      ru: "Доменные Типы: PaymentIntent и GatewayResult"
    },
    sourceCode: `package com.bank.payments.gateway;

/** Domain charge request — no vendor SDK fields. */
public record PaymentIntent(
        long amountCents,
        String currencyCode,
        String merchantReference
) {
    public PaymentIntent {
        if (amountCents <= 0) {
            throw new IllegalArgumentException("amountCents must be > 0");
        }
        if (currencyCode == null || currencyCode.isBlank()) {
            throw new IllegalArgumentException("currencyCode required");
        }
    }
}

/** Domain charge outcome — success flag, provider ref, domain error code. */
public record GatewayResult(
        boolean success,
        String providerReference,
        String errorCode
) {
    public static GatewayResult ok(String providerReference) {
        return new GatewayResult(true, providerReference, null);
    }

    public static GatewayResult failed(String errorCode) {
        return new GatewayResult(false, null, errorCode);
    }
}`,
    annotations: [
      {
        id: "ann_ab_domain_1",
        startLine: 3,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Vendor-Neutral Intent", ru: "Vendor-Neutral Intent" },
        explanation: {
          en: "PaymentIntent speaks domain language — amount, currency, merchant reference — so PaymentOrchestrator never constructs StripeChargeRequest.",
          ru: "PaymentIntent говорит на языке домена — сумма, валюта, merchant reference — поэтому PaymentOrchestrator никогда не собирает StripeChargeRequest."
        },
        conceptDemonstrated: "cpt_abstraction"
      }
    ],
    relatedQuestionIds: ["q_ab_gateway_01"],
    conceptIds: ["cpt_abstraction"],
    tags: ["#payment-intent", "#gateway-result", "#abstraction"]
  },
  {
    id: "art_ab_orchestrator_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Leaky PaymentOrchestrator",
      ru: "Исходный Нарушенный Код: Дырявый PaymentOrchestrator"
    },
    sourceCode: `package com.bank.payments.orchestration;

import com.bank.payments.gateway.GatewayResult;
import com.bank.payments.gateway.PaymentGateway;
import com.bank.payments.gateway.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.model.StripeChargeRequest;
import com.stripe.model.StripeChargeResponse;

/**
 * LEAKY ABSTRACTION:
 * PaymentGateway field exists, but Stripe SDK types still drive the flow.
 * BankTransferGateway cannot substitute without rewriting this class.
 */
public class PaymentOrchestrator {

    private final PaymentGateway gateway;

    public PaymentOrchestrator(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public GatewayResult chargeCustomer(PaymentIntent intent) {
        try {
            StripeChargeRequest stripeReq = new StripeChargeRequest(
                    intent.amountCents(), intent.currencyCode());
            // Dead construction — still couples this class to Stripe
            GatewayResult result = gateway.charge(intent);
            StripeChargeResponse body = (StripeChargeResponse) result.rawPayload();
            if (body != null && !body.paid()) {
                return GatewayResult.failed("STRIPE_UNPAID");
            }
            return result;
        } catch (StripeException e) {
            return GatewayResult.failed(e.getCode());
        }
    }
}`,
    annotations: [
      {
        id: "ann_broken_ab_1",
        startLine: 5,
        endLine: 8,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Stripe Imports in Orchestrator", ru: "Импорты Stripe в Оркестраторе" },
        explanation: {
          en: "Importing StripeException / StripeChargeRequest means the orchestrator is not abstracted from the vendor.",
          ru: "Импорт StripeException / StripeChargeRequest значит, что оркестратор не абстрагирован от вендора."
        },
        problemSolved: {
          en: "Vendor types must not appear in orchestration-layer imports.",
          ru: "Типы вендора не должны появляться в импортах слоя оркестрации."
        },
        conceptDemonstrated: "cpt_leaky_abstraction"
      },
      {
        id: "ann_broken_ab_2",
        startLine: 28,
        endLine: 38,
        category: "PRODUCTION_RISK",
        title: { en: "Cast + Catch Couple to Stripe", ru: "Каст + Catch Связывают со Stripe" },
        explanation: {
          en: "Casting to StripeChargeResponse and catching StripeException break BankTransferGateway substitution.",
          ru: "Каст к StripeChargeResponse и catch StripeException ломают подстановку BankTransferGateway."
        },
        conceptDemonstrated: "cpt_leaky_abstraction"
      }
    ],
    relatedQuestionIds: ["q_ab_gateway_01"],
    conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
    tags: ["#leaky-abstraction", "#stripe-leak", "#orchestrator"]
  },
  {
    id: "art_ab_payment_gateway_interface",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PaymentGateway Interface & Adapters",
      ru: "Интерфейс PaymentGateway и Адаптеры"
    },
    sourceCode: `package com.bank.payments.gateway;

/** Stable charge port — implementations hide vendor SDKs. */
public interface PaymentGateway {
    GatewayResult charge(PaymentIntent intent);
}

package com.bank.payments.gateway.stripe;

import com.bank.payments.gateway.GatewayResult;
import com.bank.payments.gateway.PaymentGateway;
import com.bank.payments.gateway.PaymentIntent;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.StripeChargeRequest;

public final class StripeGatewayAdapter implements PaymentGateway {

    private final StripeClient client;

    public StripeGatewayAdapter(StripeClient client) {
        this.client = client;
    }

    @Override
    public GatewayResult charge(PaymentIntent intent) {
        try {
            StripeChargeRequest req = new StripeChargeRequest(
                    intent.amountCents(), intent.currencyCode());
            var response = client.charges().create(req);
            return response.paid()
                    ? GatewayResult.ok(response.id())
                    : GatewayResult.failed("DECLINED");
        } catch (StripeException e) {
            return GatewayResult.failed(e.getCode());
        }
    }
}

package com.bank.payments.gateway.banktransfer;

import com.bank.payments.gateway.GatewayResult;
import com.bank.payments.gateway.PaymentGateway;
import com.bank.payments.gateway.PaymentIntent;

public final class BankTransferGateway implements PaymentGateway {

    private final BankTransferClient client;

    public BankTransferGateway(BankTransferClient client) {
        this.client = client;
    }

    @Override
    public GatewayResult charge(PaymentIntent intent) {
        BankTransferReceipt receipt = client.initiateTransfer(
                intent.amountCents(), intent.currencyCode(), intent.merchantReference());
        return receipt.accepted()
                ? GatewayResult.ok(receipt.reference())
                : GatewayResult.failed(receipt.rejectionCode());
    }
}`,
    annotations: [
      {
        id: "ann_ab_iface_1",
        startLine: 3,
        endLine: 6,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Sealed Port Contract", ru: "Герметичный Контракт Порта" },
        explanation: {
          en: "PaymentGateway exposes only domain types — the abstraction clients must depend on.",
          ru: "PaymentGateway открывает только доменные типы — абстракция, от которой должны зависеть клиенты."
        },
        conceptDemonstrated: "cpt_abstraction"
      },
      {
        id: "ann_ab_iface_2",
        startLine: 20,
        endLine: 40,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Stripe SDK Stays in Adapter", ru: "Stripe SDK Остаётся в Адаптере" },
        explanation: {
          en: "StripeChargeRequest and StripeException are confined to StripeGatewayAdapter — orchestrator never sees them.",
          ru: "StripeChargeRequest и StripeException ограничены StripeGatewayAdapter — оркестратор их не видит."
        },
        conceptDemonstrated: "cpt_leaky_abstraction"
      }
    ],
    relatedQuestionIds: ["q_ab_gateway_01"],
    conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
    tags: ["#payment-gateway", "#adapter", "#abstraction"]
  },
  {
    id: "art_ab_orchestrator_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Orchestrator Depends Only on PaymentGateway",
      ru: "Продакшн Фикс: Оркестратор Зависит Только от PaymentGateway"
    },
    sourceCode: `package com.bank.payments.orchestration;

import com.bank.payments.gateway.GatewayResult;
import com.bank.payments.gateway.PaymentGateway;
import com.bank.payments.gateway.PaymentIntent;

import java.util.Objects;

/**
 * Thin orchestration — no vendor SDK imports.
 * Stripe vs BankTransfer is a composition-root wiring choice.
 */
public class PaymentOrchestrator {

    private final PaymentGateway gateway;

    public PaymentOrchestrator(PaymentGateway gateway) {
        this.gateway = Objects.requireNonNull(gateway);
    }

    public GatewayResult chargeCustomer(PaymentIntent intent) {
        GatewayResult result = gateway.charge(intent);
        if (!result.success()) {
            // domain-level handling only — no StripeException / casts
            return result;
        }
        return result;
    }
}`,
    annotations: [
      {
        id: "ann_sol_ab_1",
        startLine: 3,
        endLine: 5,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Domain Imports Only", ru: "Только Доменные Импорты" },
        explanation: {
          en: "No com.stripe.* — BankTransferGateway can be injected without touching this class.",
          ru: "Нет com.stripe.* — BankTransferGateway можно инжектить без правки этого класса."
        },
        problemSolved: {
          en: "Eliminates leaky vendor coupling in the orchestration layer.",
          ru: "Устраняет дырявое сцепление с вендором в слое оркестрации."
        },
        conceptDemonstrated: "cpt_abstraction"
      },
      {
        id: "ann_sol_ab_2",
        startLine: 22,
        endLine: 29,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Interpret GatewayResult Only", ru: "Интерпретировать Только GatewayResult" },
        explanation: {
          en: "Success/failure is read from domain GatewayResult — adapters already mapped vendor errors.",
          ru: "Success/failure читается из доменного GatewayResult — адаптеры уже замаппили ошибки вендора."
        },
        problemSolved: {
          en: "Error handling no longer pierces the PaymentGateway boundary.",
          ru: "Обработка ошибок больше не пробивает границу PaymentGateway."
        },
        conceptDemonstrated: "cpt_leaky_abstraction"
      }
    ],
    relatedQuestionIds: ["q_ab_gateway_01"],
    conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
    tags: ["#payment-orchestrator", "#abstraction", "#clean-boundary"]
  },
  {
    id: "art_ab_orchestrator_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Stripe Leak Lines",
      ru: "Код для Поиска Бага: Строки Утечки Stripe"
    },
    sourceCode: `package com.bank.payments.orchestration;

import com.bank.payments.gateway.GatewayResult;
import com.bank.payments.gateway.PaymentGateway;
import com.bank.payments.gateway.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.model.StripeChargeRequest;
import com.stripe.model.StripeChargeResponse;

public class PaymentOrchestrator {

    private final PaymentGateway gateway;

    public PaymentOrchestrator(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public GatewayResult chargeCustomer(PaymentIntent intent) {
        try {
            StripeChargeRequest stripeReq = toStripe(intent);
            GatewayResult result = gateway.charge(intent);
            StripeChargeResponse stripeBody =
                (StripeChargeResponse) result.rawPayload();
            if (!stripeBody.paid()) {
                return GatewayResult.failed("STRIPE_UNPAID");
            }
            return result;
        } catch (StripeException e) {
            return GatewayResult.failed(e.getCode());
        }
    }

    private StripeChargeRequest toStripe(PaymentIntent intent) {
        return new StripeChargeRequest(intent.amountCents(), intent.currencyCode());
    }
}`,
    annotations: [
      {
        id: "ann_bug_ab_1",
        startLine: 20,
        endLine: 30,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Three Leak Points", ru: "Три Точки Утечки" },
        explanation: {
          en: "StripeChargeRequest construction, StripeChargeResponse cast, and StripeException catch all pierce PaymentGateway.",
          ru: "Сборка StripeChargeRequest, каст StripeChargeResponse и catch StripeException — все пробивают PaymentGateway."
        },
        problemSolved: {
          en: "Demonstrates why a PaymentGateway field alone is not a sealed abstraction.",
          ru: "Демонстрирует, почему одного поля PaymentGateway недостаточно для герметичной абстракции."
        },
        conceptDemonstrated: "cpt_leaky_abstraction"
      }
    ],
    relatedQuestionIds: ["q_ab_gateway_01"],
    conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
    tags: ["#bug-hunt", "#leaky-abstraction", "#stripe"]
  }
];
