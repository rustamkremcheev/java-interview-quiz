import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_POLYMORPHISM: readonly MistakePattern[] = [
  {
    id: "err_type_switch_smell",
    code: "ERR_TYPE_SWITCH_SMELL",
    title: {
      en: "Growing instanceof Chain Couples Pipeline to Subtypes",
      ru: "Растущая Цепочка instanceof Связывает Pipeline с Подтипами"
    },
    description: {
      en: "Adding every new Transaction subtype by editing TransactionPipeline's instanceof / type-switch, forcing recompilation and re-testing of all existing rails.",
      ru: "Добавление каждого нового подтипа Transaction через правку instanceof / type-switch в TransactionPipeline, вынуждая перекомпиляцию и ретест всех существующих рейлов."
    },
    conceptIds: ["cpt_type_switch_smell", "cpt_polymorphism"],
    exampleIncorrectReasoning: {
      en: "An instanceof chain is fine — just add InstantTransaction when product invents Instant rail.",
      ru: "Цепочка instanceof нормальна — просто добавим InstantTransaction, когда продукт придумает Instant-рейл."
    },
    correctedReasoning: {
      en: "Give InstantTransaction its own process() (or register InstantTransactionHandler) — TransactionPipeline stays a thin delegator (design-level polymorphism).",
      ru: "Дайте InstantTransaction свой process() (или зарегистрируйте InstantTransactionHandler) — TransactionPipeline остаётся тонким делегатором (design-level полиморфизм)."
    },
    remediationMissionIds: ["mis_polymorphism"]
  },
  {
    id: "err_missing_instanceof_branch",
    code: "ERR_MISSING_INSTANCEOF_BRANCH",
    title: {
      en: "Missing InstantTransaction Branch Rejects Rail",
      ru: "Пропущенная Ветка InstantTransaction Отклоняет Рейл"
    },
    description: {
      en: "Shipping InstantTransaction in the type hierarchy without updating the pipeline's instanceof chain, so Instant payments hit else → FAILED or wrong ACH settlement.",
      ru: "Выкат InstantTransaction в иерархии типов без обновления цепочки instanceof в pipeline — Instant-платежи попадают в else → FAILED или неверный ACH settlement."
    },
    conceptIds: ["cpt_type_switch_smell", "cpt_polymorphism"],
    exampleIncorrectReasoning: {
      en: "If InstantTransaction extends Transaction, the pipeline will somehow process it automatically.",
      ru: "Если InstantTransaction extends Transaction, pipeline как-нибудь обработает его автоматически."
    },
    correctedReasoning: {
      en: "instanceof is an explicit closed set. Without a branch (or without polymorphic process()), Instant is unknown to the pipeline. Polymorphic dispatch makes the subtype bring its behavior.",
      ru: "instanceof — явное закрытое множество. Без ветки (или без полиморфного process()) Instant неизвестен pipeline. Полиморфная диспетчеризация заставляет подтип нести своё поведение."
    },
    remediationMissionIds: ["mis_polymorphism"]
  },
  {
    id: "err_poly_vs_strategy_confusion",
    code: "ERR_POLY_VS_STRATEGY_CONFUSION",
    title: {
      en: "Confusing Design Polymorphism with Strategy Pattern",
      ru: "Путаница Design-Полиморфизма с Паттерном Strategy"
    },
    description: {
      en: "Treating TransactionPipeline's type-switch as a FeeStrategy/PaymentChannel algorithm family problem, or claiming polymorphism only means HotSpot megamorphic call sites.",
      ru: "Считать type-switch TransactionPipeline проблемой семейства алгоритмов FeeStrategy/PaymentChannel или утверждать, что полиморфизм — только megamorphic call sites HotSpot."
    },
    conceptIds: ["cpt_polymorphism"],
    exampleIncorrectReasoning: {
      en: "This is just Strategy — map PaymentChannel to strategies. Or: we need invokevirtual megamorphism tuning.",
      ru: "Это просто Strategy — map PaymentChannel → strategies. Или: нужен тюнинг megamorphism invokevirtual."
    },
    correctedReasoning: {
      en: "Here the varying thing is the Transaction subtype's processing. Strategy selects interchangeable algorithms by context key; this mission is substitutable type behavior. Dynamic dispatch is the JVM mechanism — the interview answer is design-level polymorphism.",
      ru: "Здесь варьируется обработка подтипа Transaction. Strategy выбирает взаимозаменяемые алгоритмы по ключу контекста; эта миссия — подставляемое поведение типа. Dynamic dispatch — механизм JVM; ответ на интервью — design-level полиморфизм."
    },
    remediationMissionIds: ["mis_polymorphism"]
  },
  {
    id: "err_instanceof_then_cast_god_pipeline",
    code: "ERR_INSTANCEOF_THEN_CAST_GOD_PIPELINE",
    title: {
      en: "God Pipeline: instanceof then Cast then Inline Logic",
      ru: "God Pipeline: instanceof → Cast → Inline Логика"
    },
    description: {
      en: "Keeping all Card/Wire/Ach clearing logic inside TransactionPipeline after each cast, so the pipeline becomes a god class that knows every rail's internals.",
      ru: "Держать всю логику clearing Card/Wire/Ach внутри TransactionPipeline после каждого cast — pipeline становится god class, знающим внутренности каждого рейла."
    },
    conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
    exampleIncorrectReasoning: {
      en: "instanceof + cast is polymorphism because we handle multiple types in one method.",
      ru: "instanceof + cast — это полиморфизм, потому что мы обрабатываем много типов в одном методе."
    },
    correctedReasoning: {
      en: "That is procedural type discrimination. True subtype polymorphism moves behavior onto the type (or a dedicated handler) so the pipeline does not grow with every rail.",
      ru: "Это процедурная дискриминация типов. Настоящий полиморфизм подтипов переносит поведение на тип (или dedicated handler), чтобы pipeline не рос с каждым рейлом."
    },
    remediationMissionIds: ["mis_polymorphism"]
  },
  {
    id: "err_fake_poly_switch_selector",
    code: "ERR_FAKE_POLY_SWITCH_SELECTOR",
    title: {
      en: "Fake Polymorphism Still Selected by instanceof",
      ru: "Фальшивый Полиморфизм, Всё Ещё Выбираемый instanceof"
    },
    description: {
      en: "Extracting CardTransactionHandler etc. but still selecting them with a giant instanceof chain inside TransactionPipeline — the smell remains in the selector.",
      ru: "Вынесение CardTransactionHandler и т.д., но выбор через гигантскую цепочку instanceof внутри TransactionPipeline — smell остаётся в селекторе."
    },
    conceptIds: ["cpt_type_switch_smell", "cpt_polymorphism"],
    exampleIncorrectReasoning: {
      en: "If each branch calls a handler, we have applied polymorphism.",
      ru: "Если каждая ветка вызывает handler, мы применили полиморфизм."
    },
    correctedReasoning: {
      en: "Prefer txn.process(ctx), visitor accept(handler), or Class→handler registry populated at composition root — no growing instanceof in the process hot path.",
      ru: "Предпочитайте txn.process(ctx), visitor accept(handler) или Class→handler registry, наполняемый в composition root — без растущего instanceof в горячем пути process."
    },
    remediationMissionIds: ["mis_polymorphism"]
  }
];
