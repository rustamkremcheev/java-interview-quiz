import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_IMMUTABILITY: readonly MistakePattern[] = [
  {
    id: "err_final_equals_immutable",
    code: "ERR_FINAL_EQUALS_IMMUTABLE",
    title: {
      en: "Assuming private final Fields Guarantee Immutability",
      ru: "Предположение, что private final Поля Гарантируют Неизменяемость"
    },
    description: {
      en: "Believing that declaring all fields as `private final` makes a class immutable. The `final` modifier only prevents reassigning the reference variable — mutable objects like ArrayList, BigDecimal (when shared), and Date remain fully mutable through their own APIs.",
      ru: "Убеждение, что объявление всех полей как `private final` делает класс неизменяемым. Модификатор `final` лишь запрещает переприсвоение ссылки — мутабельные объекты вроде ArrayList, BigDecimal (при шаринге) и Date остаются полностью мутабельными через свои API."
    },
    conceptIds: ["cpt_immutability"],
    exampleIncorrectReasoning: {
      en: "All fields are private and final, so CustomerSnapshot is immutable and thread-safe.",
      ru: "Все поля private и final, значит CustomerSnapshot неизменяем и потокобезопасен."
    },
    correctedReasoning: {
      en: "Deep immutability requires that no external caller can mutate any reachable state. Defensive copying or immutable value types (Instant, Money with long cents, List.copyOf) are required for mutable component types.",
      ru: "Глубокая неизменяемость требует, чтобы внешний вызывающий не мог изменить достижимое состояние. Для мутабельных компонентов нужно защитное копирование или неизменяемые value types (Instant, Money с long cents, List.copyOf)."
    },
    remediationMissionIds: ["mis_immutability_defensive_copy"]
  },
  {
    id: "err_constructor_copy_only",
    code: "ERR_CONSTRUCTOR_COPY_ONLY",
    title: {
      en: "Defensive Copying Only in Constructor, Not in Getters",
      ru: "Защитное Копирование Только в Конструкторе, но Не в Геттерах"
    },
    description: {
      en: "Applying defensive copying on constructor input but returning internal mutable references directly from getters. External callers mutate internal state through getter-returned references even when constructor input was copied (e.g., new ArrayList<>(transactions) still returns a mutable list).",
      ru: "Применение защитного копирования на входе конструктора, но возврат внутренних мутабельных ссылок напрямую из геттеров. Внешние вызывающие меняют внутреннее состояние через ссылки из геттеров, даже если вход конструктора был скопирован (например, new ArrayList<>(transactions) всё равно возвращает мутабельный список)."
    },
    conceptIds: ["cpt_defensive_copying"],
    exampleIncorrectReasoning: {
      en: "I copied the list in the constructor, so the class is safe. Returning the internal list from getTransactions() is fine for performance.",
      ru: "Я скопировал список в конструкторе, значит класс безопасен. Возвращать внутренний список из getTransactions() нормально для производительности."
    },
    correctedReasoning: {
      en: "Effective Java Item 50 requires defensive copying on BOTH constructor input AND getter output. Use List.copyOf (immutable snapshot) so getTransactions() cannot be mutated via .add(fakeTxn).",
      ru: "Effective Java Item 50 требует защитного копирования на входе конструктора И на выходе геттера. Используйте List.copyOf (неизменяемый снимок), чтобы getTransactions() нельзя было мутировать через .add(fakeTxn)."
    },
    remediationMissionIds: ["mis_immutability_defensive_copy"]
  },
  {
    id: "err_mutable_getter_leak",
    code: "ERR_MUTABLE_GETTER_LEAK",
    title: {
      en: "Leaking Mutable Collections Through Getters",
      ru: "Утечка Мутабельных Коллекций через Геттеры"
    },
    description: {
      en: "Returning internal mutable collection references (ArrayList of Transaction) directly from getter methods, enabling external callers to invoke .add(fakeTxn) and corrupt settlement totals without touching setters.",
      ru: "Возврат внутренних мутабельных ссылок на коллекции (ArrayList Transaction) напрямую из геттеров, позволяя внешним вызывающим вызывать .add(fakeTxn) и портить settlement-итоги без сеттеров."
    },
    conceptIds: ["cpt_defensive_copying", "cpt_immutability"],
    exampleIncorrectReasoning: {
      en: "Getters should return the actual internal collection so callers can iterate efficiently over transactions.",
      ru: "Геттеры должны возвращать реальную внутреннюю коллекцию, чтобы вызывающие могли эффективно итерировать транзакции."
    },
    correctedReasoning: {
      en: "Return immutable views or defensive copies. For read-only iteration, return List.copyOf(internal) or Collections.unmodifiableList(internal). Never expose mutable internal Transaction collections.",
      ru: "Возвращайте неизменяемые представления или защитные копии. Для read-only итерации возвращайте List.copyOf(internal) или Collections.unmodifiableList(internal). Никогда не открывайте мутабельные внутренние коллекции Transaction."
    },
    remediationMissionIds: ["mis_immutability_defensive_copy"]
  },
  {
    id: "err_date_in_immutable_class",
    code: "ERR_DATE_IN_IMMUTABLE_CLASS",
    title: {
      en: "Using java.util.Date / Mutable BigDecimal in Supposedly Immutable Classes",
      ru: "Использование java.util.Date / Мутабельного BigDecimal в Якобы Неизменяемых Классах"
    },
    description: {
      en: "Storing java.util.Date or leaking mutable BigDecimal in classes marketed as immutable. Date has setTime() and shared BigDecimal references allow fraud/ops to rewrite transaction timelines and Money amounts that feed settlement totals.",
      ru: "Хранение java.util.Date или утечка мутабельного BigDecimal в классах, позиционируемых как неизменяемые. Date имеет setTime(), а общие ссылки BigDecimal позволяют fraud/ops переписывать таймлайн транзакций и суммы Money для settlement."
    },
    conceptIds: ["cpt_immutability", "cpt_defensive_copying"],
    exampleIncorrectReasoning: {
      en: "Date and BigDecimal are standard Java types and work fine as final fields in immutable Money/Transaction classes.",
      ru: "Date и BigDecimal — стандартные типы Java и нормально работают как final-поля в неизменяемых классах Money/Transaction."
    },
    correctedReasoning: {
      en: "Model Money with immutable long amountCents (record). Replace Date with java.time.Instant. If Date is unavoidable for legacy compatibility, apply defensive copy with new Date(source.getTime()) on both constructor input and getter output.",
      ru: "Моделируйте Money через неизменяемые long amountCents (record). Замените Date на java.time.Instant. Если Date неизбежен для legacy-совместимости, применяйте защитное копирование new Date(source.getTime()) на входе конструктора и выходе геттера."
    },
    remediationMissionIds: ["mis_immutability_defensive_copy"]
  },
  {
    id: "err_record_shallow_immutable",
    code: "ERR_RECORD_SHALLOW_IMMUTABLE",
    title: {
      en: "Assuming Java 17 Records Are Automatically Deeply Immutable",
      ru: "Предположение, что Java 17 Records Автоматически Глубоко Неизменяемы"
    },
    description: {
      en: "Believing that converting a mutable class to a Java 17 record automatically achieves deep immutability. Records provide shallow immutability — mutable component types like Date and ArrayList remain mutable unless the compact constructor applies defensive copying.",
      ru: "Убеждение, что конвертация мутабельного класса в Java 17 record автоматически дает глубокую неизменяемость. Record обеспечивает поверхностную неизменяемость — мутабельные компоненты вроде Date и ArrayList остаются мутабельными, если компактный конструктор не применяет защитное копирование."
    },
    conceptIds: ["cpt_immutability"],
    exampleIncorrectReasoning: {
      en: "I converted CustomerSnapshot to a record, so it is now immutable and the settlement corruption bug is fixed.",
      ru: "Я конвертировал CustomerSnapshot в record, значит он теперь неизменяем и баг порчи settlement исправлен."
    },
    correctedReasoning: {
      en: "Records require compact constructor validation: transactions = List.copyOf(transactions), Money with long cents, and Instant instead of Date. Records eliminate boilerplate but do not replace defensive copying discipline for mutable component types.",
      ru: "Record требует валидации в компактном конструкторе: transactions = List.copyOf(transactions), Money с long cents и Instant вместо Date. Record убирает boilerplate, но не заменяет дисциплину защитного копирования для мутабельных компонентов."
    },
    remediationMissionIds: ["mis_immutability_defensive_copy"]
  }
];
