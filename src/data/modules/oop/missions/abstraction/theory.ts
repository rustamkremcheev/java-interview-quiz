import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_ABSTRACTION: TheoryArticle = {
  id: "art_theory_abstraction",
  topicIds: ["top_oop_07"],
  conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
  title: {
    en: "Abstraction Boundaries & Leaky Payment Gateways",
    ru: "Границы Абстракции и Дырявые Payment Gateway"
  },
  summary: {
    en: "Abstraction hides implementation details behind a stable interface. A PaymentGateway is useful only when PaymentOrchestrator depends on PaymentIntent and GatewayResult — not on StripeChargeRequest or StripeException. Adapters encapsulate vendor SDKs so BankTransferGateway can replace Stripe without rewriting orchestration.",
    ru: "Абстракция скрывает детали реализации за стабильным интерфейсом. PaymentGateway полезен только когда PaymentOrchestrator зависит от PaymentIntent и GatewayResult — не от StripeChargeRequest или StripeException. Адаптеры инкапсулируют vendor SDK, чтобы BankTransferGateway заменил Stripe без переписывания оркестрации."
  },
  sections: [
    {
      id: "sec_ab_definition",
      category: "DEFINITION",
      title: {
        en: "1. Abstraction: Stable Contracts over Vendor Details",
        ru: "1. Абстракция: Стабильные Контракты вместо Деталей Вендора"
      },
      blocks: [
        {
          id: "blk_ab_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Abstraction means clients program to a contract that expresses *what* must happen, not *how* a particular vendor does it. For charges, the contract is `GatewayResult charge(PaymentIntent intent)` on PaymentGateway. PaymentIntent carries amount, currency, and merchant reference in domain terms. GatewayResult carries success/failure, provider reference, and a domain error code — never StripeChargeRequest fields.",
            ru: "Абстракция значит, что клиенты программируют к контракту, выражающему *что* должно произойти, а не *как* это делает конкретный вендор. Для списаний контракт — `GatewayResult charge(PaymentIntent intent)` на PaymentGateway. PaymentIntent несёт сумму, валюту и merchant reference в доменных терминах. GatewayResult несёт success/failure, provider reference и доменный код ошибки — никогда поля StripeChargeRequest."
          }
        },
        {
          id: "blk_ab_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Depend on the Boundary, Not the SDK",
            ru: "💡 Главная Ментальная Модель: Зависеть от Границы, не от SDK"
          },
          content: {
            en: "If PaymentOrchestrator's import list contains `com.stripe.*`, the abstraction failed. Effective Java Item 20 argues for preferring interfaces as the type of parameters, return values, and fields — the orchestrator's field should be PaymentGateway, and its method signatures must not mention Stripe types.",
            ru: "Если в import-списке PaymentOrchestrator есть `com.stripe.*`, абстракция провалилась. Effective Java Item 20 рекомендует предпочитать интерфейсы как типы параметров, возвращаемых значений и полей — поле оркестратора должно быть PaymentGateway, а сигнатуры методов не должны упоминать типы Stripe."
          }
        }
      ]
    },
    {
      id: "sec_ab_leak_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Leaky Abstraction Mechanics & Adapter Encapsulation",
        ru: "2. Механика Дырявой Абстракции и Инкапсуляция в Адаптерах"
      },
      blocks: [
        {
          id: "blk_ab_leak_1",
          type: "PARAGRAPH",
          content: {
            en: "A leaky abstraction claims to hide complexity but still exposes implementation details. Common payment leaks: constructing StripeChargeRequest in the orchestrator, catching StripeException, casting GatewayResult to a Stripe payload, or branching on Stripe-specific status strings. When BankTransferGateway arrives, none of those paths compile or behave correctly — the orchestrator was never truly abstracted.",
            ru: "Дырявая абстракция обещает скрыть сложность, но всё равно раскрывает детали реализации. Типичные платёжные утечки: сборка StripeChargeRequest в оркестраторе, catch StripeException, каст GatewayResult к Stripe payload, ветвление по Stripe-специфичным status-строкам. Когда появляется BankTransferGateway, ни один из этих путей не компилируется и не работает корректно — оркестратор никогда не был по-настоящему абстрагирован."
          }
        },
        {
          id: "blk_ab_leak_2",
          type: "WARNING",
          title: {
            en: "⚙️ Catching Vendor Exceptions Pierces the Boundary",
            ru: "⚙️ Catch Vendor-Исключений Пробивает Границу"
          },
          content: {
            en: "`catch (StripeException e)` inside PaymentOrchestrator forces every new gateway to either fake StripeException or force orchestrator edits. Map vendor failures inside StripeGatewayAdapter / BankTransferGateway into domain GatewayResult (or a domain PaymentGatewayException). Callers handle one error model.",
            ru: "`catch (StripeException e)` внутри PaymentOrchestrator вынуждает каждый новый gateway либо подделывать StripeException, либо править оркестратор. Маппируйте сбои вендора внутри StripeGatewayAdapter / BankTransferGateway в доменный GatewayResult (или доменный PaymentGatewayException). Вызывающие работают с одной моделью ошибок."
          }
        },
        {
          id: "blk_ab_leak_3",
          type: "CALLOUT",
          title: {
            en: "📜 Adapter Contract: SDK Stays Behind the Interface",
            ru: "📜 Контракт Адаптера: SDK Остаётся за Интерфейсом"
          },
          content: {
            en: "StripeGatewayAdapter implements PaymentGateway: map PaymentIntent → StripeChargeRequest, call Stripe SDK, map response/exception → GatewayResult. BankTransferGateway does the same for bank rails. PaymentOrchestrator only calls `gateway.charge(intent)` and interprets GatewayResult. Switching rails is a composition-root wiring change, not an orchestrator rewrite.",
            ru: "StripeGatewayAdapter реализует PaymentGateway: map PaymentIntent → StripeChargeRequest, вызов Stripe SDK, map ответа/исключения → GatewayResult. BankTransferGateway делает то же для bank rails. PaymentOrchestrator только вызывает `gateway.charge(intent)` и интерпретирует GatewayResult. Смена rail — wiring в composition root, не переписывание оркестратора."
          }
        }
      ]
    },
    {
      id: "sec_ab_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Strict Boundaries vs Pragmatic Leaks",
        ru: "3. Компромиссы: Строгие Границы vs Прагматичные Утечки"
      },
      blocks: [
        {
          id: "blk_ab_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Strict abstraction adds mapping layers and domain error codes. For a throwaway spike with one vendor forever, a direct Stripe client may be acceptable. For multi-rail payments (Stripe today, BankTransfer tomorrow, maybe a card processor next), leaking vendor types into PaymentOrchestrator is technical debt that compounds on every rail launch. Prefer thin adapters early — mapping cost is cheaper than rewriting orchestration under go-live pressure.",
            ru: "Строгая абстракция добавляет слои маппинга и доменные коды ошибок. Для одноразового spike с одним вендором навсегда прямой Stripe-клиент может быть приемлем. Для multi-rail платежей (Stripe сегодня, BankTransfer завтра, возможно card processor следом) утечка vendor-типов в PaymentOrchestrator — техдолг, растущий с каждым запуском rail. Предпочитайте тонкие адаптеры рано — цена маппинга дешевле переписывания оркестрации под давлением go-live."
          }
        },
        {
          id: "blk_ab_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Abstract Class vs Interface for PaymentGateway",
            ru: "🔧 Abstract Class vs Interface для PaymentGateway"
          },
          content: {
            en: "Prefer a PaymentGateway interface (Effective Java Item 20) unless you need shared mutable template-method state across adapters. Interfaces keep StripeGatewayAdapter and BankTransferGateway free of forced hierarchy and play better with DI. Use abstract classes only when multiple adapters truly share skeletal implementation that cannot live in a package-private helper.",
            ru: "Предпочитайте интерфейс PaymentGateway (Effective Java Item 20), пока нет нужды в shared mutable template-method состоянии у адаптеров. Интерфейсы не навязывают иерархию StripeGatewayAdapter и BankTransferGateway и лучше работают с DI. Abstract class — только когда несколько адаптеров реально делят скелетную реализацию, которую нельзя вынести в package-private helper."
          }
        }
      ]
    },
    {
      id: "sec_ab_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Abstraction & Leaks",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Абстракция и Утечки"
      },
      blocks: [
        {
          id: "blk_ab_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is a leaky abstraction in one sentence?' — Model Answer: An abstraction that claims to hide details but still forces clients to know or depend on those details — e.g., PaymentOrchestrator catching StripeException despite a PaymentGateway interface.",
            ru: "Доп. Вопрос 1: 'Что такое дырявая абстракция в одном предложении?' — Модельный Ответ: Абстракция, которая обещает скрыть детали, но всё равно вынуждает клиентов знать или зависеть от них — например, PaymentOrchestrator ловит StripeException несмотря на интерфейс PaymentGateway."
          }
        },
        {
          id: "blk_ab_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How do you detect a leaky gateway in code review?' — Model Answer: Grep the orchestrator for vendor packages, SDK exception types, vendor DTOs in method signatures, and casts from domain results to vendor payloads. Any hit is a boundary violation.",
            ru: "Доп. Вопрос 2: 'Как поймать дырявый gateway на код-ревью?' — Модельный Ответ: Grep оркестратора на vendor-пакеты, типы исключений SDK, vendor DTO в сигнатурах методов и касты доменных результатов к vendor payload. Любое попадание — нарушение границы."
          }
        },
        {
          id: "blk_ab_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Should GatewayResult expose raw provider JSON for debugging?' — Model Answer: Prefer structured domain fields plus an optional opaque correlation id. Dumping raw Stripe JSON into callers reintroduces vendor schema coupling; keep raw payloads inside the adapter or a diagnostics sink.",
            ru: "Доп. Вопрос 3: 'Должен ли GatewayResult отдавать сырой provider JSON для отладки?' — Модельный Ответ: Предпочитайте структурированные доменные поля плюс опциональный opaque correlation id. Слив сырого Stripe JSON вызывающим снова связывает со схемой вендора; сырые payload оставляйте в адаптере или diagnostics sink."
          }
        },
        {
          id: "blk_ab_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Is Adapter the same as Facade here?' — Model Answer: Adapter converts an existing vendor API into your PaymentGateway contract. Facade simplifies a subsystem for clients. StripeGatewayAdapter is primarily an Adapter (and may also simplify) — the key goal is conforming to PaymentGateway without leaking Stripe types.",
            ru: "Доп. Вопрос 4: 'Adapter здесь то же, что Facade?' — Модельный Ответ: Adapter приводит существующий vendor API к вашему контракту PaymentGateway. Facade упрощает подсистему для клиентов. StripeGatewayAdapter — прежде всего Adapter (и может упрощать) — цель: соответствовать PaymentGateway без утечки типов Stripe."
          }
        },
        {
          id: "blk_ab_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Where should PaymentIntent validation live?' — Model Answer: In the domain type / orchestrator policy (amount > 0, currency present). Adapters may add vendor-specific constraints but must not force orchestrator to know Stripe's field names.",
            ru: "Доп. Вопрос 5: 'Где валидировать PaymentIntent?' — Модельный Ответ: В доменном типе / политике оркестратора (amount > 0, currency задана). Адаптеры могут добавить vendor-ограничения, но не должны заставлять оркестратор знать имена полей Stripe."
          }
        },
        {
          id: "blk_ab_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How does this relate to Dependency Inversion?' — Model Answer: High-level PaymentOrchestrator depends on the PaymentGateway abstraction; low-level Stripe/BankTransfer adapters depend on that same abstraction. DIP and clean abstraction boundaries reinforce each other.",
            ru: "Доп. Вопрос 6: 'Как это связано с Dependency Inversion?' — Модельный Ответ: Высокоуровневый PaymentOrchestrator зависит от абстракции PaymentGateway; низкоуровневые адаптеры Stripe/BankTransfer зависят от той же абстракции. DIP и чистые границы абстракции усиливают друг друга."
          }
        },
        {
          id: "blk_ab_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'What if one rail needs 3D Secure / redirect URLs another does not?' — Model Answer: Extend the domain contract carefully (e.g., optional AuthChallenge on GatewayResult) or split ports (ChargeGateway vs AuthenticatingChargeGateway). Do not return Stripe's Redirect URL type from PaymentGateway.",
            ru: "Доп. Вопрос 7: 'Что если одному rail нужен 3D Secure / redirect URL, а другому нет?' — Модельный Ответ: Аккуратно расширьте доменный контракт (например, optional AuthChallenge в GatewayResult) или разделите порты (ChargeGateway vs AuthenticatingChargeGateway). Не возвращайте тип Redirect URL Stripe из PaymentGateway."
          }
        },
        {
          id: "blk_ab_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How do you unit-test PaymentOrchestrator after the fix?' — Model Answer: Inject a fake/mock PaymentGateway returning canned GatewayResult. No Stripe test jars in orchestrator tests. Adapter tests alone exercise Stripe SDK mapping.",
            ru: "Доп. Вопрос 8: 'Как юнит-тестировать PaymentOrchestrator после фикса?' — Модельный Ответ: Инжектить fake/mock PaymentGateway с готовым GatewayResult. Без Stripe test jars в тестах оркестратора. Только тесты адаптера гоняют маппинг Stripe SDK."
          }
        },
        {
          id: "blk_ab_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can checked StripeException be part of PaymentGateway.charge throws clause?' — Model Answer: No — that bakes Stripe into the abstraction signature. Prefer GatewayResult failure states or a domain unchecked/checked exception owned by your package.",
            ru: "Доп. Вопрос 9: 'Может ли checked StripeException быть в throws у PaymentGateway.charge?' — Модельный Ответ: Нет — это вшивает Stripe в сигнатуру абстракции. Предпочитайте failure-состояния GatewayResult или доменное исключение, принадлежащее вашему пакету."
          }
        },
        {
          id: "blk_ab_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Abstract class PaymentGatewayBase with Stripe helpers — good idea?' — Model Answer: Risky. Shared 'Stripe helpers' in a base class tempt BankTransferGateway into inheriting irrelevant Stripe assumptions. Prefer interface + small package-private mappers per adapter.",
            ru: "Доп. Вопрос 10: 'Abstract class PaymentGatewayBase со Stripe helpers — хорошая идея?' — Модельный Ответ: Рискованно. Общие «Stripe helpers» в базе соблазняют BankTransferGateway наследовать нерелевантные Stripe-допущения. Предпочитайте интерфейс + небольшие package-private мапперы на адаптер."
          }
        },
        {
          id: "blk_ab_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'What ArchUnit rule would you add?' — Model Answer: Forbid `..orchestrator..` packages from depending on `com.stripe..` (and bank SDK packages). Only `..gateway.stripe..` / `..gateway.banktransfer..` adapters may depend on vendor SDKs.",
            ru: "Доп. Вопрос 11: 'Какое ArchUnit-правило добавить?' — Модельный Ответ: Запретить пакетам `..orchestrator..` зависеть от `com.stripe..` (и bank SDK). Только адаптеры `..gateway.stripe..` / `..gateway.banktransfer..` могут зависеть от vendor SDK."
          }
        },
        {
          id: "blk_ab_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How is abstraction different from encapsulation?' — Model Answer: Encapsulation hides an object's internal state/invariants behind its own methods. Abstraction hides which implementation (Stripe vs bank) sits behind a shared interface. You need both: GatewayResult encapsulation of fields, and PaymentGateway abstraction of the rail.",
            ru: "Доп. Вопрос 12: 'Чем абстракция отличается от инкапсуляции?' — Модельный Ответ: Инкапсуляция скрывает внутреннее состояние/инварианты объекта за его методами. Абстракция скрывает, какая реализация (Stripe vs bank) стоит за общим интерфейсом. Нужны оба: инкапсуляция полей GatewayResult и абстракция rail через PaymentGateway."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_interface_contracts"],
  sourceIds: ["src_ej_item20_interfaces", "src_fowler_abstraction", "src_baeldung_interfaces", "src_jls_interfaces"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#abstraction", "#leaky-abstraction", "#payment-gateway", "#interfaces"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_ABSTRACTION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ab_1",
    theoryArticleId: "art_theory_abstraction",
    question: {
      en: "What is the primary sign that PaymentGateway is a leaky abstraction for PaymentOrchestrator?",
      ru: "Какой главный признак, что PaymentGateway — дырявая абстракция для PaymentOrchestrator?"
    },
    explanation: {
      en: "Orchestrator imports or handles vendor SDK types (StripeChargeRequest, StripeException) despite the interface.",
      ru: "Оркестратор импортирует или обрабатывает типы vendor SDK (StripeChargeRequest, StripeException) несмотря на интерфейс."
    },
    options: [
      {
        id: "opt_ab1_a",
        text: {
          en: "PaymentOrchestrator still imports Stripe SDK types or catches StripeException.",
          ru: "PaymentOrchestrator всё ещё импортирует типы Stripe SDK или ловит StripeException."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Vendor details piercing the client are the textbook leaky abstraction.",
          ru: "Верно! Детали вендора, пробивающие клиента — классическая дырявая абстракция."
        }
      },
      {
        id: "opt_ab1_b",
        text: {
          en: "PaymentGateway is an interface instead of an abstract class.",
          ru: "PaymentGateway — интерфейс, а не абстрактный класс."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Preferring interfaces is usually good design, not a leak.",
          ru: "Неверно. Предпочтение интерфейсов — обычно хорошая практика, не утечка."
        }
      },
      {
        id: "opt_ab1_c",
        text: {
          en: "BankTransferGateway and StripeGatewayAdapter both implement PaymentGateway.",
          ru: "BankTransferGateway и StripeGatewayAdapter оба реализуют PaymentGateway."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Multiple implementations behind one interface is the desired abstraction.",
          ru: "Неверно. Несколько реализаций за одним интерфейсом — желаемая абстракция."
        },
        misconceptionId: "err_abstraction_means_one_impl"
      }
    ],
    order: 1
  },
  {
    id: "chk_ab_2",
    theoryArticleId: "art_theory_abstraction",
    question: {
      en: "Where should StripeChargeRequest be constructed after a clean boundary refactor?",
      ru: "Где должен создаваться StripeChargeRequest после чистого рефакторинга границы?"
    },
    explanation: {
      en: "Only inside StripeGatewayAdapter — never in PaymentOrchestrator.",
      ru: "Только внутри StripeGatewayAdapter — никогда в PaymentOrchestrator."
    },
    options: [
      {
        id: "opt_ab2_a",
        text: {
          en: "Inside StripeGatewayAdapter when mapping PaymentIntent to the Stripe SDK call.",
          ru: "Внутри StripeGatewayAdapter при маппинге PaymentIntent в вызов Stripe SDK."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! The adapter owns vendor DTOs; the orchestrator owns domain intents.",
          ru: "Верно! Адаптер владеет vendor DTO; оркестратор владеет доменными intent."
        }
      },
      {
        id: "opt_ab2_b",
        text: {
          en: "In PaymentOrchestrator before calling gateway.charge, then passed as Object.",
          ru: "В PaymentOrchestrator перед gateway.charge, затем передаётся как Object."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That still leaks Stripe construction into the orchestrator.",
          ru: "Неверно. Это всё равно утечка сборки Stripe в оркестратор."
        },
        misconceptionId: "err_orchestrator_builds_vendor_dto"
      },
      {
        id: "opt_ab2_c",
        text: {
          en: "In GatewayResult as a public field for all rails to reuse.",
          ru: "В GatewayResult как public-поле для переиспользования всеми rails."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Putting Stripe DTOs on GatewayResult couples every rail to Stripe.",
          ru: "Неверно. Stripe DTO в GatewayResult связывает каждый rail со Stripe."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_ab_3",
    theoryArticleId: "art_theory_abstraction",
    question: {
      en: "Why does catching StripeException in PaymentOrchestrator break BankTransferGateway substitution?",
      ru: "Почему catch StripeException в PaymentOrchestrator ломает подстановку BankTransferGateway?"
    },
    explanation: {
      en: "Bank transfer failures are not StripeException — the orchestrator is coupled to one vendor's error type.",
      ru: "Сбои bank transfer — не StripeException; оркестратор связан с типом ошибок одного вендора."
    },
    options: [
      {
        id: "opt_ab3_a",
        text: {
          en: "BankTransferGateway will not throw StripeException — vendor-specific catch couples the orchestrator to Stripe.",
          ru: "BankTransferGateway не бросит StripeException — vendor-specific catch связывает оркестратор со Stripe."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Error models must be domain-level at the PaymentGateway boundary.",
          ru: "Верно! Модель ошибок на границе PaymentGateway должна быть доменной."
        }
      },
      {
        id: "opt_ab3_b",
        text: {
          en: "Java forbids catch blocks when an interface is used as the field type.",
          ru: "Java запрещает catch, если тип поля — интерфейс."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Catch is legal; the design problem is vendor coupling.",
          ru: "Неверно. Catch законен; проблема дизайна — сцепление с вендором."
        }
      },
      {
        id: "opt_ab3_c",
        text: {
          en: "StripeException is unchecked, so BankTransferGateway automatically inherits it.",
          ru: "StripeException unchecked, поэтому BankTransferGateway автоматически его наследует."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Exception types are not inherited across unrelated gateway implementations.",
          ru: "Неверно. Типы исключений не наследуются между несвязанными реализациями gateway."
        },
        misconceptionId: "err_catch_vendor_exception"
      }
    ],
    order: 3
  },
  {
    id: "chk_ab_4",
    theoryArticleId: "art_theory_abstraction",
    question: {
      en: "After sealing the boundary, what must PaymentOrchestrator depend on to charge?",
      ru: "После герметизации границы, от чего должен зависеть PaymentOrchestrator для списания?"
    },
    explanation: {
      en: "Only PaymentGateway (plus domain PaymentIntent / GatewayResult) — no vendor types.",
      ru: "Только PaymentGateway (плюс доменные PaymentIntent / GatewayResult) — без vendor-типов."
    },
    options: [
      {
        id: "opt_ab4_a",
        text: {
          en: "PaymentGateway interface with PaymentIntent in and GatewayResult out.",
          ru: "Интерфейс PaymentGateway с PaymentIntent на входе и GatewayResult на выходе."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is a sealed abstraction boundary.",
          ru: "Верно! Это герметичная граница абстракции."
        }
      },
      {
        id: "opt_ab4_b",
        text: {
          en: "Concrete StripeGatewayAdapter type so the compiler knows charge exists.",
          ru: "Конкретный тип StripeGatewayAdapter, чтобы компилятор знал про charge."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Depending on the concrete adapter prevents BankTransfer substitution.",
          ru: "Неверно. Зависимость от конкретного адаптера мешает подстановке BankTransfer."
        },
        misconceptionId: "err_depend_on_concrete_adapter"
      },
      {
        id: "opt_ab4_c",
        text: {
          en: "Both Stripe and BankTransfer SDKs injected as fields for failover.",
          ru: "Оба SDK — Stripe и BankTransfer — инжектятся как поля для failover."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Dual SDK fields recreate vendor coupling; failover belongs behind PaymentGateway.",
          ru: "Неверно. Два SDK-поля снова связывают с вендорами; failover — за PaymentGateway."
        }
      }
    ],
    order: 4
  }
];
