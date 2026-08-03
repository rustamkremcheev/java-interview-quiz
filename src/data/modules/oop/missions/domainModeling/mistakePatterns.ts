import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_DOMAIN_MODELING: readonly MistakePattern[] = [
  {
    id: "err_redundant_approved_flag",
    code: "ERR_REDUNDANT_APPROVED_FLAG",
    title: {
      en: "Independent approved Flag Contradicts Status",
      ru: "Независимый Флаг approved Противоречит Status"
    },
    description: {
      en: "Keeping boolean approved beside free-form String/LoanStatus so REJECTED + approved=true remains representable and exportable to risk engines.",
      ru: "Сохранение boolean approved рядом со свободным String/LoanStatus, из-за чего REJECTED + approved=true остаётся представимым и уходит в risk engines."
    },
    conceptIds: ["cpt_domain_modeling"],
    exampleIncorrectReasoning: {
      en: "We need both status and approved for JSON compatibility and quick checks.",
      ru: "Нужны и status, и approved для совместимости JSON и быстрых проверок."
    },
    correctedReasoning: {
      en: "Derive approval from LoanStatus or a single CreditDecision. Map DTOs at the edge — do not keep contradictory domain flags.",
      ru: "Выводите approval из LoanStatus или одного CreditDecision. Маппьте DTO на границе — не держите противоречивые доменные флаги."
    },
    remediationMissionIds: ["mis_domain_modeling"]
  },
  {
    id: "err_double_money_loan",
    code: "ERR_DOUBLE_MONEY_LOAN",
    title: {
      en: "double amount Allows Negative / Imprecise Money",
      ru: "double amount Допускает Отрицательные / Неточные Деньги"
    },
    description: {
      en: "Modeling loan principal as double so negatives, NaN, and floating-point drift remain constructible without a value-object guard.",
      ru: "Моделирование основного долга как double, из-за чего negatives, NaN и drift плавающей точки остаются конструируемыми без охраны value object."
    },
    conceptIds: ["cpt_value_objects"],
    exampleIncorrectReasoning: {
      en: "double is fine for money if we round at display time.",
      ru: "double нормален для денег, если округлять при отображении."
    },
    correctedReasoning: {
      en: "Use LoanMoney(long amountCents) with constructor rejection of cents < 0 (or disciplined BigDecimal). Display rounding does not fix illegal stored amounts.",
      ru: "Используйте LoanMoney(long amountCents) с отвержением cents < 0 в конструкторе (или дисциплинированный BigDecimal). Округление при отображении не чинит нелегальные сохранённые суммы."
    },
    remediationMissionIds: ["mis_domain_modeling"]
  },
  {
    id: "err_public_field_transitions",
    code: "ERR_PUBLIC_FIELD_TRANSITIONS",
    title: {
      en: "Public Fields Bypass Aggregate Transitions",
      ru: "Public Fields Обходят Переходы Агрегата"
    },
    description: {
      en: "Mutating LoanApplication.status / approved / amount via public fields or unchecked setters instead of submit/decide + ApprovalPolicy.",
      ru: "Мутация LoanApplication.status / approved / amount через public fields или непроверяемые setters вместо submit/decide + ApprovalPolicy."
    },
    conceptIds: ["cpt_domain_modeling"],
    exampleIncorrectReasoning: {
      en: "Setters are simpler than behavior methods for underwriting hotfixes.",
      ru: "Setters проще методов поведения для хотфиксов андеррайтинга."
    },
    correctedReasoning: {
      en: "Hotfixes that write fields recreate illegal states. Transitions must go through ApprovalPolicy-backed methods so invariants hold.",
      ru: "Хотфиксы, пишущие в fields, воссоздают нелегальные состояния. Переходы — через методы с ApprovalPolicy, чтобы инварианты держались."
    },
    remediationMissionIds: ["mis_domain_modeling"]
  },
  {
    id: "err_extras_map_lifecycle",
    code: "ERR_EXTRAS_MAP_LIFECYCLE",
    title: {
      en: "Open Map extras Drives Domain Lifecycle",
      ru: "Открытый Map extras Управляет Доменным Lifecycle"
    },
    description: {
      en: "Storing status, amount, or approval decisions in Map<String,Object> extras, recreating Primitive Obsession behind a flexible-looking bag.",
      ru: "Хранение status, amount или решений approval в Map<String,Object> extras, воссоздавая Primitive Obsession за «гибким» мешком."
    },
    conceptIds: ["cpt_value_objects", "cpt_domain_modeling"],
    exampleIncorrectReasoning: {
      en: "extras lets product add fields without changing the LoanApplication class.",
      ru: "extras позволяет продукту добавлять поля без изменения класса LoanApplication."
    },
    correctedReasoning: {
      en: "Lifecycle-critical attributes stay typed on the aggregate. Use explicit optional fields or a typed notes VO — not an open map as the source of truth.",
      ru: "Критичные для lifecycle атрибуты остаются типизированными на агрегате. Явные optional-поля или типизированный notes VO — не открытый map как source of truth."
    },
    remediationMissionIds: ["mis_domain_modeling"]
  },
  {
    id: "err_anemic_loan_bag",
    code: "ERR_ANEMIC_LOAN_BAG",
    title: {
      en: "Anemic LoanApplication With Scattered Validators",
      ru: "Анемичный LoanApplication с Размазанными Валидаторами"
    },
    description: {
      en: "Leaving LoanApplication as a getter/setter bag while every service re-implements REJECTED≠approved and amount>0 checks — duplicated, missable rules.",
      ru: "Оставление LoanApplication мешком getter/setter, пока каждый сервис заново реализует проверки REJECTED≠approved и amount>0 — дублируемые, пропускаемые правила."
    },
    conceptIds: ["cpt_domain_modeling"],
    exampleIncorrectReasoning: {
      en: "Domain objects should only hold data; services own all validation.",
      ru: "Доменные объекты должны только держать данные; валидация — у сервисов."
    },
    correctedReasoning: {
      en: "Put lending invariants in value objects and LoanApplication transition methods. Keep application services thin coordinators.",
      ru: "Кладите lending-инварианты в value objects и методы перехода LoanApplication. Application services — тонкие координаторы."
    },
    remediationMissionIds: ["mis_domain_modeling"]
  }
];
