import { Concept, Tag } from '../../../types/domain';

export const OOP_CONCEPTS: readonly Concept[] = [
  {
    id: "cpt_encapsulation",
    slug: "encapsulation",
    title: {
      en: "State Invariant Encapsulation",
      ru: "Инкапсуляция Инвариантов Состояния"
    },
    summary: {
      en: "Encapsulation is the protection of class state invariants through controlled access boundaries and validation.",
      ru: "Инкапсуляция — это защита инвариантов состояния класса через контролируемые границы доступа и валидацию."
    },
    topicIds: ["top_oop_05"],
    canonicalTag: "#encapsulation",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_invariants",
    slug: "domain-invariants",
    title: {
      en: "Domain Invariants & Guard Contracts",
      ru: "Доменные Инварианты и Контракты Валидации"
    },
    summary: {
      en: "Rules that must evaluate to true throughout the lifetime of a valid object instance.",
      ru: "Правила, которые должны оставаться истинными на протяжении всего жизненного цикла легитимного объекта."
    },
    topicIds: ["top_oop_05", "top_oop_34"],
    canonicalTag: "#invariants",
    prerequisiteConceptIds: ["cpt_encapsulation"]
  },
  {
    id: "cpt_access_modifiers",
    slug: "access-modifiers",
    title: {
      en: "Access Modifier Visibility Boundaries",
      ru: "Границы Видимости Модификаторов Доступа"
    },
    summary: {
      en: "Restricting member access to private, package-private, protected, or public levels.",
      ru: "Ограничение доступа к членам класса уровнями private, package-private, protected или public."
    },
    topicIds: ["top_oop_05", "top_oop_06"],
    canonicalTag: "#access-modifiers",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_defensive_copying",
    slug: "defensive-copying",
    title: {
      en: "Defensive Copying of References",
      ru: "Защитное Копирование Ссылок"
    },
    summary: {
      en: "Creating copies of mutable objects passed in or returned from constructors and getters.",
      ru: "Создание копий мутабельных объектов, передаваемых в конструктор или возвращаемых из геттеров."
    },
    topicIds: ["top_oop_05", "top_oop_22"],
    canonicalTag: "#defensive-copying",
    prerequisiteConceptIds: ["cpt_encapsulation"]
  },
  {
    id: "cpt_monetary_representation",
    slug: "monetary-representation",
    title: {
      en: "Monetary Value Representation in Banking",
      ru: "Представление Денежных Величин в Банковских Системах"
    },
    summary: {
      en: "Avoiding floating-point rounding errors by using longs (cents) or BigDecimal for financial transactions.",
      ru: "Избежание ошибок округления с плавающей точкой путем использования long (в центах) или BigDecimal."
    },
    topicIds: ["top_oop_05", "top_oop_33"],
    canonicalTag: "#money",
    prerequisiteConceptIds: ["cpt_invariants"]
  }
];

export const OOP_TAGS: readonly Tag[] = [
  {
    id: "tag_encapsulation",
    slug: "encapsulation",
    displayName: { en: "#encapsulation", ru: "#инкапсуляция" },
    canonicalConceptId: "cpt_encapsulation",
    category: "OOP"
  },
  {
    id: "tag_invariants",
    slug: "invariants",
    displayName: { en: "#invariants", ru: "#инварианты" },
    canonicalConceptId: "cpt_invariants",
    category: "OOP"
  },
  {
    id: "tag_access_modifiers",
    slug: "access-modifiers",
    displayName: { en: "#access-modifiers", ru: "#модификаторы-доступа" },
    canonicalConceptId: "cpt_access_modifiers",
    category: "OOP"
  },
  {
    id: "tag_defensive_copying",
    slug: "defensive-copying",
    displayName: { en: "#defensive-copying", ru: "#защитное-копирование" },
    canonicalConceptId: "cpt_defensive_copying",
    category: "OOP"
  },
  {
    id: "tag_money",
    slug: "money",
    displayName: { en: "#money", ru: "#деньги" },
    canonicalConceptId: "cpt_monetary_representation",
    category: "ARCHITECTURE"
  }
];
