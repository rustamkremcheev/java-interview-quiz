import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OVERRIDING_COVARIANT: readonly CodeArtifact[] = [
  {
    id: "art_ov_invoice_domain",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Invoice Domain: Invoice and CorporateInvoice",
      ru: "Домен Счетов: Invoice и CorporateInvoice"
    },
    sourceCode: `package com.billing.invoice;

/**
 * Base invoice entity for the billing service.
 */
public class Invoice {
    private final String id;
    private final long amountCents;

    public Invoice(String id, long amountCents) {
        this.id = id;
        this.amountCents = amountCents;
    }

    public String getId() { return id; }
    public long getAmountCents() { return amountCents; }
}

/**
 * Corporate invoice with tax residency enrichment required for settlement.
 */
public class CorporateInvoice extends Invoice {
    private String taxResidencyCode;

    public CorporateInvoice(Invoice base) {
        super(base.getId(), base.getAmountCents());
    }

    public void enrichTaxResidency() {
        this.taxResidencyCode = TaxResidencyDirectory.lookup(getId());
    }

    public String getTaxResidencyCode() { return taxResidencyCode; }
}`,
    annotations: [
      {
        id: "ann_ov_domain_1",
        startLine: 22,
        endLine: 24,
        category: "WHY_IT_EXISTS",
        title: { en: "Covariant Return Candidate Type", ru: "Тип-Кандидат для Ковариантного Возврата" },
        explanation: {
          en: "CorporateInvoice extends Invoice — the legal covariant return type for overriding findById that returns Invoice.",
          ru: "CorporateInvoice расширяет Invoice — легальный ковариантный возвращаемый тип для переопределения findById, возвращающего Invoice."
        },
        conceptDemonstrated: "cpt_covariant_returns"
      }
    ],
    relatedQuestionIds: ["q_ov_invoice_01"],
    conceptIds: ["cpt_covariant_returns", "cpt_method_overriding"],
    tags: ["#invoice", "#covariant-returns", "#billing"]
  },
  {
    id: "art_ov_invoice_repository_base",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Base InvoiceRepository.findById Contract",
      ru: "Базовый Контракт InvoiceRepository.findById"
    },
    sourceCode: `package com.billing.invoice.repo;

import com.billing.invoice.Invoice;
import com.billing.invoice.InvoiceNotFoundException;

/**
 * Base repository used by billing orchestration through InvoiceRepository references.
 */
public class InvoiceRepository {

    public Invoice findById(String id) throws InvoiceNotFoundException {
        Invoice invoice = InvoiceStore.load(id);
        if (invoice == null) {
            throw new InvoiceNotFoundException(id);
        }
        return invoice;
    }
}`,
    annotations: [
      {
        id: "ann_ov_base_1",
        startLine: 11,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Override Target Signature", ru: "Целевая Сигнатура для Override" },
        explanation: {
          en: "Subclasses must match findById(String) and may only return Invoice or a subtype; checked exceptions must not broaden beyond InvoiceNotFoundException.",
          ru: "Подклассы должны совпадать с findById(String) и могут возвращать только Invoice или подтип; checked-исключения не должны расширяться за InvoiceNotFoundException."
        },
        conceptDemonstrated: "cpt_method_overriding"
      }
    ],
    relatedQuestionIds: ["q_ov_invoice_01"],
    conceptIds: ["cpt_method_overriding"],
    tags: ["#repository", "#overriding", "#billing"]
  },
  {
    id: "art_ov_corporate_repo_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Silent Overload in CorporateInvoiceRepository",
      ru: "Исходный Нарушенный Код: Тихая Перегрузка в CorporateInvoiceRepository"
    },
    sourceCode: `package com.billing.invoice.repo;

import com.billing.invoice.CorporateInvoice;
import com.billing.invoice.InvoiceKey;
import com.billing.invoice.InvoiceNotFoundException;

/**
 * SILENT OVERLOAD BUG:
 * findById(InvoiceKey) does NOT override findById(String).
 * Missing @Override allowed this to compile.
 * Polymorphic InvoiceRepository callers skip corporate enrichment.
 */
public class CorporateInvoiceRepository extends InvoiceRepository {

    // ⚠️ Intended override — actually an overload (wrong parameter type, no @Override)
    public CorporateInvoice findById(InvoiceKey id) throws InvoiceNotFoundException {
        return loadCorporateInvoice(id.value());
    }

    // Illegal if used as @Override with matching params — broader checked exception
    public CorporateInvoice findByIdBroad(String id) throws Exception {
        return loadCorporateInvoice(id);
    }

    public CorporateInvoice loadCorporateInvoice(String id) throws InvoiceNotFoundException {
        CorporateInvoice invoice = new CorporateInvoice(super.findById(id));
        invoice.enrichTaxResidency();
        return invoice;
    }
}`,
    annotations: [
      {
        id: "ann_broken_ov_1",
        startLine: 15,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Silent Overload — Wrong Parameter Type", ru: "Тихая Перегрузка — Неверный Тип Параметра" },
        explanation: {
          en: "Lines 15-17: InvoiceKey vs String means the method is not override-equivalent. Without @Override, javac accepts a new overload.",
          ru: "Строки 15-17: InvoiceKey vs String — метод не override-equivalent. Без @Override javac принимает новую перегрузку."
        },
        problemSolved: {
          en: "Polymorphic InvoiceRepository.findById(String) never dispatches here — tax residency enrichment is skipped.",
          ru: "Полиморфный InvoiceRepository.findById(String) никогда сюда не диспетчеризуется — обогащение tax residency пропускается."
        },
        conceptDemonstrated: "cpt_method_overriding"
      },
      {
        id: "ann_broken_ov_2",
        startLine: 20,
        endLine: 22,
        category: "PRODUCTION_RISK",
        title: { en: "Illegal Broader Checked Exception Pattern", ru: "Нелегальный Паттерн Расширения Checked-Исключения" },
        explanation: {
          en: "Lines 20-22: throws Exception would be illegal on a true @Override of findById(String) that only declares InvoiceNotFoundException.",
          ru: "Строки 20-22: throws Exception было бы незаконно на истинном @Override findById(String), объявляющем только InvoiceNotFoundException."
        },
        conceptDemonstrated: "cpt_method_overriding"
      }
    ],
    relatedQuestionIds: ["q_ov_invoice_01"],
    conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
    tags: ["#silent-overload", "#counter-example", "#billing"]
  },
  {
    id: "art_ov_corporate_repo_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: @Override + Covariant CorporateInvoice Return",
      ru: "Продакшн Фикс: @Override + Ковариантный Возврат CorporateInvoice"
    },
    sourceCode: `package com.billing.invoice.repo;

import com.billing.invoice.CorporateInvoice;
import com.billing.invoice.InvoiceNotFoundException;

public class CorporateInvoiceRepository extends InvoiceRepository {

    // JLS 8.4.8 + Effective Java Item 40:
    // matching params, @Override, covariant return, narrowed/same checked exceptions
    @Override
    public CorporateInvoice findById(String id) throws InvoiceNotFoundException {
        return loadCorporateInvoice(id);
    }

    public CorporateInvoice loadCorporateInvoice(String id) throws InvoiceNotFoundException {
        CorporateInvoice invoice = new CorporateInvoice(super.findById(id));
        invoice.enrichTaxResidency();
        return invoice;
    }
}`,
    annotations: [
      {
        id: "ann_sol_ov_1",
        startLine: 9,
        endLine: 12,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "True Override with Covariant Return", ru: "Истинный Override с Ковариантным Возвратом" },
        explanation: {
          en: "Lines 9-12: @Override proves override-equivalence. CorporateInvoice is a legal covariant return. Polymorphic InvoiceRepository calls now enrich tax residency.",
          ru: "Строки 9-12: @Override доказывает override-equivalence. CorporateInvoice — легальный ковариантный возврат. Полиморфные вызовы через InvoiceRepository теперь обогащают tax residency."
        },
        problemSolved: {
          en: "Eliminates silent overload and restores corporate enrichment under InvoiceRepository references.",
          ru: "Устраняет тихую перегрузку и восстанавливает corporate-обогащение через ссылки InvoiceRepository."
        },
        conceptDemonstrated: "cpt_covariant_returns"
      },
      {
        id: "ann_sol_ov_2",
        startLine: 11,
        endLine: 11,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Checked Exception Not Broadened", ru: "Checked-Исключение Не Расширено" },
        explanation: {
          en: "throws InvoiceNotFoundException matches the parent — never throws Exception on an override.",
          ru: "throws InvoiceNotFoundException совпадает с родителем — никогда throws Exception на override."
        },
        conceptDemonstrated: "cpt_method_overriding"
      }
    ],
    relatedQuestionIds: ["q_ov_invoice_01"],
    conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
    tags: ["#override-annotation", "#covariant-returns", "#billing"]
  },
  {
    id: "art_ov_billing_lookup_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: BillingLookupService Polymorphic Miss",
      ru: "Код для Поиска Бага: Промах Полиморфизма в BillingLookupService"
    },
    sourceCode: `package com.billing.invoice.service;

import com.billing.invoice.Invoice;
import com.billing.invoice.repo.CorporateInvoiceRepository;
import com.billing.invoice.repo.InvoiceRepository;

public class BillingLookupService {

    private final InvoiceRepository repository = new CorporateInvoiceRepository();

    public Invoice loadForSettlement(String invoiceId) throws Exception {
        // Runtime type is CorporateInvoiceRepository, but parent findById runs
        // because subclass silently overloaded findById(InvoiceKey).
        return repository.findById(invoiceId);
    }
}

// Broken subclass (excerpt):
public class CorporateInvoiceRepository extends InvoiceRepository {

    // BUG: silent overload — not an override of findById(String)
    public CorporateInvoice findById(InvoiceKey id) throws InvoiceNotFoundException {
        return loadCorporateInvoice(id.value());
    }
}`,
    annotations: [
      {
        id: "ann_bug_ov_1",
        startLine: 22,
        endLine: 24,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Overloaded findById Never Reached Polymorphically", ru: "Перегруженный findById Никогда Не Достигается Полиморфно" },
        explanation: {
          en: "Lines 22-24: findById(InvoiceKey) is invisible to InvoiceRepository.findById(String) dispatch. Settlement receives plain Invoice without tax residency.",
          ru: "Строки 22-24: findById(InvoiceKey) невидим для диспетчеризации InvoiceRepository.findById(String). Settlement получает обычный Invoice без tax residency."
        },
        problemSolved: {
          en: "Demonstrates why missing @Override + wrong parameter type is worse than a compile error — silent production data loss.",
          ru: "Демонстрирует, почему отсутствие @Override + неверный тип параметра хуже ошибки компиляции — тихая потеря данных на продакшене."
        },
        conceptDemonstrated: "cpt_method_overriding"
      }
    ],
    relatedQuestionIds: ["q_ov_invoice_01"],
    conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
    tags: ["#bug-hunt", "#polymorphism", "#billing"]
  }
];
