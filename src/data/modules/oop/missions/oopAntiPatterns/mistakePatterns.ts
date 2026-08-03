import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_ANTI_PATTERNS: readonly MistakePattern[] = [
  {
    id: "err_anemic_order_dto",
    code: "ERR_ANEMIC_ORDER_DTO",
    title: {
      en: "Treating Anemic Order DTO as Core Domain Model",
      ru: "Использование Анемичного Order DTO как Ядра Домена"
    },
    description: {
      en: "Keeping Order as getters/setters only while all fulfillment invariants live in OrderFulfillmentService, causing duplicated validation and bypassable rules.",
      ru: "Оставлять Order только с getters/setters, пока все инварианты fulfillment живут в OrderFulfillmentService, вызывая дублированную валидацию и обходимые правила."
    },
    conceptIds: ["cpt_anemic_domain_model"],
    exampleIncorrectReasoning: {
      en: "Order is just data — services should own all business logic for cleaner separation.",
      ru: "Order — просто данные — сервисы должны владеть всей бизнес-логикой для чистого разделения."
    },
    correctedReasoning: {
      en: "Fowler's Anemic Domain Model is an anti-pattern for write-side domains. Move place()/reserveInventory() onto a rich Order aggregate so invariants cannot be skipped.",
      ru: "Anemic Domain Model по Fowler — антипаттерн для write-side домена. Перенесите place()/reserveInventory() на богатый агрегат Order, чтобы инварианты нельзя было пропустить."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  },
  {
    id: "err_god_class_fulfillment",
    code: "ERR_GOD_CLASS_FULFILLMENT",
    title: {
      en: "OrderFulfillmentService God Class Owning All Concerns",
      ru: "God Class OrderFulfillmentService, Владеющий Всеми Concerns"
    },
    description: {
      en: "Concentrating validation, inventory, payment, email, shipment, and audit into one 4000-line class with low cohesion and untestable wiring.",
      ru: "Концентрация валидации, инвентаря, оплаты, email, отгрузки и audit в одном классе на 4000 строк с низкой cohesion и нетестируемой проводкой."
    },
    conceptIds: ["cpt_god_class"],
    exampleIncorrectReasoning: {
      en: "One service class for the whole fulfill() pipeline is simpler than many small collaborators.",
      ru: "Один сервисный класс на весь пайплайн fulfill() проще, чем много мелких коллабораторов."
    },
    correctedReasoning: {
      en: "God Class destroys testability and SRP. Segregate InventoryService and PaymentCapturePort; keep a thin orchestrator; put domain rules on Order.",
      ru: "God Class убивает тестируемость и SRP. Выделите InventoryService и PaymentCapturePort; оставьте тонкий оркестратор; доменные правила — на Order."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  },
  {
    id: "err_feature_envy_setters",
    code: "ERR_FEATURE_ENVY_SETTERS",
    title: {
      en: "Feature Envy Setters Bypassing Order Invariants",
      ru: "Feature Envy Setters, Обходящие Инварианты Order"
    },
    description: {
      en: "Mutating Order via getLines()/setStatus()/setReserved()/setShipmentStatus() from the service instead of telling Order to place() or reserveInventory().",
      ru: "Мутация Order через getLines()/setStatus()/setReserved()/setShipmentStatus() из сервиса вместо команды Order.place() или reserveInventory()."
    },
    conceptIds: ["cpt_feature_envy", "cpt_anemic_domain_model"],
    exampleIncorrectReasoning: {
      en: "Calling setters from the service is fine because the service is the owner of the workflow.",
      ru: "Вызов setters из сервиса нормален, потому что сервис — владелец workflow."
    },
    correctedReasoning: {
      en: "Tell Don't Ask: Order.place(payment) and Order.reserveInventory(inventory) enforce fail-closed sequencing so unpaid inventory cannot ship.",
      ru: "Tell Don't Ask: Order.place(payment) и Order.reserveInventory(inventory) обеспечивают fail-closed порядок, чтобы неоплаченный инвентарь не отгружался."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  },
  {
    id: "err_split_god_without_behavior",
    code: "ERR_SPLIT_GOD_WITHOUT_BEHAVIOR",
    title: {
      en: "Splitting God Class Without Moving Domain Behavior",
      ru: "Разбиение God Class Без Переноса Доменного Поведения"
    },
    description: {
      en: "Extracting smaller service classes that still operate on anemic Order setters, preserving Feature Envy and duplicated validation.",
      ru: "Извлечение меньших сервисных классов, всё ещё работающих через setters анемичного Order, сохраняя Feature Envy и дублированную валидацию."
    },
    conceptIds: ["cpt_god_class", "cpt_anemic_domain_model"],
    exampleIncorrectReasoning: {
      en: "If each file is under 700 lines, the God Class and anemia problems are solved.",
      ru: "Если каждый файл короче 700 строк, проблемы God Class и анемии решены."
    },
    correctedReasoning: {
      en: "Line-count splits without rich Order behavior leave the Anemic Domain Model intact. Move invariants onto the aggregate, then thin the orchestrator.",
      ru: "Разбиение по числу строк без богатого поведения Order оставляет Anemic Domain Model. Перенесите инварианты на агрегат, затем истончите оркестратор."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  },
  {
    id: "err_lines_equal_anemic",
    code: "ERR_LINES_EQUAL_ANEMIC",
    title: {
      en: "Confusing God Class Line Count with Anemic Domain Model",
      ru: "Путаница Числа Строк God Class с Anemic Domain Model"
    },
    description: {
      en: "Assuming any large class is an Anemic Domain Model, or that a short Order with setters is rich because the service file is large.",
      ru: "Предположение, что любой большой класс — Anemic Domain Model, или что короткий Order с setters богат, потому что файл сервиса большой."
    },
    conceptIds: ["cpt_anemic_domain_model", "cpt_god_class"],
    exampleIncorrectReasoning: {
      en: "OrderFulfillmentService is 4000 lines, so Order itself must be the Anemic Domain Model solely because of that size.",
      ru: "OrderFulfillmentService — 4000 строк, значит Order анемичен только из-за этого размера."
    },
    correctedReasoning: {
      en: "Anemia is about behaviorless domain objects; God Class is about low-cohesion mega-services. They often co-occur but are distinct smells.",
      ru: "Анемия — про доменные объекты без поведения; God Class — про низко-cohesion мега-сервисы. Часто встречаются вместе, но это разные запахи."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  },
  {
    id: "err_lsp_for_feature_envy",
    code: "ERR_LSP_FOR_FEATURE_ENVY",
    title: {
      en: "Mislabeling Feature Envy as LSP Violation",
      ru: "Ошибочная Маркировка Feature Envy как Нарушения LSP"
    },
    description: {
      en: "Diagnosing getter-based service orchestration of Order as a Liskov Substitution problem instead of Feature Envy / Tell Don't Ask.",
      ru: "Диагностика оркестрации Order через getters как проблемы LSP вместо Feature Envy / Tell Don't Ask."
    },
    conceptIds: ["cpt_feature_envy"],
    exampleIncorrectReasoning: {
      en: "OrderLine cannot substitute for Order, so the fulfillment bug is an LSP violation.",
      ru: "OrderLine не может заменить Order, значит баг fulfillment — нарушение LSP."
    },
    correctedReasoning: {
      en: "LSP concerns behavioral subtyping. The unpaid-shipment bug is Feature Envy setters on an anemic Order inside a God Class.",
      ru: "LSP касается поведенческого subtyping. Баг неоплаченной отгрузки — Feature Envy setters на анемичном Order внутри God Class."
    },
    remediationMissionIds: ["mis_oop_anti_patterns"]
  }
];
