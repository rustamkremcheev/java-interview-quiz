import { Hint } from '../../../../../types/domain';

export const HINTS_EQUALS_HASHCODE: readonly Hint[] = [
  {
    id: "hnt_eh_01",
    challengeId: "chl_payment_key_fix_builder",
    level: 1,
    text: {
      en: "Think about how HashMap bucket index is calculated: `index = (table.length - 1) & (hash ^ (hash >>> 16))`. What happens to `index` if key fields mutate?",
      ru: "Подумайте, как вычисляется индекс бакета в HashMap: `index = (table.length - 1) & hash`. Что происходит с `index`, если поля ключа изменяются?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_eh_02",
    challengeId: "chl_payment_key_fix_builder",
    level: 2,
    text: {
      en: "Immutability guarantees hash code stability. What modern Java 17 feature provides final fields, canonical constructors, and immutable equals/hashCode by default?",
      ru: "Неизменяемость гарантирует стабильность хэш-кода. Какая фича Java 17 предоставляет final поля, конструктор и неизменяемые equals/hashCode по умолчанию?"
    },
    xpPenalty: 15,
    order: 2
  },
  {
    id: "hnt_eh_03",
    challengeId: "chl_payment_key_bughunt",
    level: 1,
    text: {
      en: "Look at the field declarations and setters in `PaymentKey`. Is `status` final? Is `status` included inside `Objects.hash(...)`?",
      ru: "Посмотрите на поля и сеттеры в `PaymentKey`. Является ли `status` final-полем? Входит ли `status` в `Objects.hash(...)`?"
    },
    xpPenalty: 10,
    order: 1
  }
];
