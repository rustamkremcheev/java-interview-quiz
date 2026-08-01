import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_BANK_ACCOUNT: readonly MistakePattern[] = [
  {
    id: "err_public_field_mutation",
    code: "ERR_PUBLIC_FIELD_MUTATION",
    title: {
      en: "Exposing Public Mutable Fields",
      ru: "Открытие Публичных Мутабельных Полей"
    },
    description: {
      en: "Declaring class fields as public allows external callers to bypass constructor invariants and set arbitrary or invalid state.",
      ru: "Декларация полей класса как public позволяет внешним вызовам обходить инварианты конструктора и устанавливать нелегитимные состояния."
    },
    conceptIds: ["cpt_encapsulation", "cpt_access_modifiers"],
    exampleIncorrectReasoning: {
      en: "Making fields public simplifies code by avoiding getter/setter boilerplate.",
      ru: "Сделать поля публичными проще, так как это избавляет от шаблона геттеров и сеттеров."
    },
    correctedReasoning: {
      en: "Public fields destroy state encapsulation because callers can mutate balance to negative amounts without validation.",
      ru: "Публичные поля разрушают инварианты, так как вызывающий код может установить отрицательный баланс без валидации."
    },
    remediationMissionIds: ["mis_bank_account_invariants"]
  },
  {
    id: "err_setter_invariant_bypass",
    code: "ERR_SETTER_INVARIANT_BYPASS",
    title: {
      en: "Unrestricted Setter Invariant Bypass",
      ru: "Обход Инвариантов Неограниченными Сеттерами"
    },
    description: {
      en: "Providing public setters for every field without guard validation allows callers to force illegal state transitions.",
      ru: "Предоставление публичных сеттеров без проверки условий позволяет принудительно переводить объект в нелегитимное состояние."
    },
    conceptIds: ["cpt_encapsulation", "cpt_invariants"],
    exampleIncorrectReasoning: {
      en: "Encapsulation means making fields private and adding public getters and setters for all of them.",
      ru: "Инкапсуляция — это сделать поля private и добавить к ним всем публичные геттеры и сеттеры."
    },
    correctedReasoning: {
      en: "Encapsulation requires protecting class invariants. Setters that allow negative balances violate encapsulation.",
      ru: "Инкапсуляция требует защиты инвариантов. Сеттеры, позволяющие отрицательный баланс, нарушают инкапсуляцию."
    },
    remediationMissionIds: ["mis_bank_account_invariants"]
  },
  {
    id: "err_double_for_monetary_value",
    code: "ERR_DOUBLE_FOR_MONEY",
    title: {
      en: "Using Double for Monetary Quantities",
      ru: "Использование Double для Денежных Величин"
    },
    description: {
      en: "Floating-point double arithmetic introduces IEEE 754 precision loss during addition and subtraction of monetary balances.",
      ru: "Арифметика с плавающей точкой в double приводит к потере точности по IEEE 754 при финансовых расчетах."
    },
    conceptIds: ["cpt_monetary_representation"],
    exampleIncorrectReasoning: {
      en: "double is convenient for currency values like 19.99.",
      ru: "double удобен для отображения валют, таких как 19.99."
    },
    correctedReasoning: {
      en: "Represent monetary balances in smallest sub-units (e.g., long cents) or BigDecimal to guarantee exact representation.",
      ru: "Представляйте баланс в минимальных единицах (например, long в центах) или в BigDecimal для гарантированной точности."
    },
    remediationMissionIds: ["mis_bank_account_invariants"]
  },
  {
    id: "err_mutable_reference_leak",
    code: "ERR_MUTABLE_REFERENCE_LEAK",
    title: {
      en: "Leaking Internal Mutable References",
      ru: "Утечка Ссылок на Внутренние Мутабельные Объекты"
    },
    description: {
      en: "Assigning or returning internal mutable reference objects (e.g. java.util.Date) directly without defensive copying.",
      ru: "Прямая запись или возврат внутренних мутабельных ссылок (например, java.util.Date) без защитного копирования."
    },
    conceptIds: ["cpt_defensive_copying"],
    exampleIncorrectReasoning: {
      en: "The field is private and final, so external code cannot modify it.",
      ru: "Поле приватное и final, поэтому внешний код не сможет его изменить."
    },
    correctedReasoning: {
      en: "A final reference prevents changing which object is referenced, but external code can still mutate the internal state of the referenced object.",
      ru: "Final-ссылка не дает изменить сам объект ссылки, но внешний код по-прежнему может изменить внутреннее состояние объекта по этой ссылке."
    },
    remediationMissionIds: ["mis_bank_account_invariants"]
  }
];
