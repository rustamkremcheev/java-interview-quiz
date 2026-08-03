import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_EQUALS_HASHCODE: readonly MistakePattern[] = [
  {
    id: "err_mutable_key_hash_decay",
    code: "ERR_MUTABLE_KEY_HASH_DECAY",
    title: {
      en: "Mutable HashMap Key Hash Code Decay",
      ru: "Изменение Хэш-Кода Мутабельного Ключа HashMap"
    },
    description: {
      en: "Using a mutable object as a HashMap key and modifying a field that participates in hashCode(), causing HashMap.get() to check the wrong bucket index while leaving the orphaned entry trapped in memory.",
      ru: "Использование изменяемого объекта в качестве ключа HashMap с последующей модификацией поля, входящего в hashCode(), из-за чего get() ищет не в том бакете, а запись остается осиротевшей в памяти."
    },
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
    exampleIncorrectReasoning: {
      en: "Mutating key fields is fine as long as equals() still compares transactionId.",
      ru: "Изменение полей ключа допустимо, пока equals() сравнивает transactionId."
    },
    correctedReasoning: {
      en: "Mutating key fields that participate in hashCode() alters the bucket index (n-1)&hash, causing get() to fail even if equals() would return true.",
      ru: "Изменение полей ключа, входящих в hashCode(), меняет бакет (n-1)&hash, вызывая сбой get(), даже если equals() вернул бы true."
    },
    remediationMissionIds: ["mis_equals_hashcode_contract"]
  },
  {
    id: "err_concurrent_hashmap_key_myth",
    code: "ERR_CONCURRENT_HASHMAP_KEY_MYTH",
    title: {
      en: "ConcurrentHashMap Does Not Fix Key Hash Instability",
      ru: "Заблуждение: ConcurrentHashMap Решает Проблему Мутабельности Ключа"
    },
    description: {
      en: "Mistakenly assuming that replacing HashMap with ConcurrentHashMap solves key field mutation bugs. ConcurrentHashMap provides thread-safe access to table nodes, but key hash routing remains identically broken under field mutation.",
      ru: "Ошибочное предположение, что замена HashMap на ConcurrentHashMap решает проблему изменения ключа. ConcurrentHashMap гарантирует потокобезопасность структуры, но маршрутизация по хэшу ключа ломается точно так же."
    },
    conceptIds: ["cpt_mutable_key_disaster", "cpt_hashcode_contract"],
    exampleIncorrectReasoning: {
      en: "ConcurrentHashMap makes key lookups thread-safe, so key mutation will not cause issues.",
      ru: "ConcurrentHashMap делает поиск по ключу потокобезопасным, поэтому изменение ключа не вызовет проблем."
    },
    correctedReasoning: {
      en: "ConcurrentHashMap guarantees table structure thread safety, NOT key hash stability under field mutation.",
      ru: "ConcurrentHashMap гарантирует потокобезопасность структуры таблицы, но НЕ стабильность хэша ключа при изменении его полей."
    },
    remediationMissionIds: ["mis_equals_hashcode_contract"]
  },
  {
    id: "err_jpa_entity_equality_transient_id",
    code: "ERR_JPA_ENTITY_EQUALITY_TRANSIENT_ID",
    title: {
      en: "JPA Entity Equality via Auto-Generated Database ID",
      ru: "Равенство Сущностей JPA через Автоматический Первичный Ключ"
    },
    description: {
      en: "Overriding equals() and hashCode() using `@GeneratedValue Long id`. Unpersisted (transient) entities have `id = null`. Inserting a transient entity into a HashSet/HashMap and saving it to the DB later mutates `id` from null to non-null, breaking hashCode bucket stability.",
      ru: "Переопределение equals() и hashCode() через `@GeneratedValue Long id`. До сохранения в БД id равен null. Вставка такой сущности в Set/Map с последующим сохранением меняет id с null на число, ломая бакеты хэша."
    },
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract"],
    exampleIncorrectReasoning: {
      en: "Using the database primary key for equals() and hashCode() is best practice.",
      ru: "Использование первичного ключа БД для equals() и hashCode() — лучшая практика."
    },
    correctedReasoning: {
      en: "Transient entities before database save have null IDs. Saving the entity mutates its ID and breaks hash bucket routing.",
      ru: "Несохраненные сущности до записи в БД имеют null ID. Сохранение меняет ID и ломает маршрутизацию по бакетам."
    },
    remediationMissionIds: ["mis_equals_hashcode_contract"]
  },
  {
    id: "err_equals_without_hashcode",
    code: "ERR_EQUALS_WITHOUT_HASHCODE",
    title: {
      en: "Overriding equals() Without Overriding hashCode()",
      ru: "Переопределение equals() Без Переопределения hashCode()"
    },
    description: {
      en: "Overriding equals() but inheriting Object.hashCode() (which returns memory address-derived identity hash). Logically equal objects receive completely different hash codes and land in different buckets, leading to duplicate entries in HashSet and failed lookups in HashMap.",
      ru: "Переопределение equals() при сохранении унаследованного Object.hashCode() (возвращающего хэш от адреса памяти). Логически равные объекты получают разные хэш-коды и попадают в разные бакеты, приводя к дубликатам в HashSet и сбоям поиска в HashMap."
    },
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract"],
    exampleIncorrectReasoning: {
      en: "hashCode() is only needed for sorting collections, not HashMaps.",
      ru: "hashCode() нужен только для сортировки коллекций, но не для HashMap."
    },
    correctedReasoning: {
      en: "HashMap uses hashCode() to determine bucket index first. Equal objects with different hash codes land in different buckets and cannot be found.",
      ru: "HashMap сначала использует hashCode() для вычисления бакета. Равные объекты с разными хэш-кодами попадают в разные бакеты и не находят друг друга."
    },
    remediationMissionIds: ["mis_equals_hashcode_contract"]
  }
];
