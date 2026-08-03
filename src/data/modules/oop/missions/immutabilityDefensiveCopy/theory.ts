import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_IMMUTABILITY: TheoryArticle = {
  id: "art_theory_immutability",
  topicIds: ["top_oop_22"],
  conceptIds: ["cpt_immutability", "cpt_defensive_copying", "cpt_encapsulation", "cpt_invariants"],
  title: {
    en: "Immutability, Defensive Copying & Reference Leak Prevention",
    ru: "Неизменяемость, Защитное Копирование и Предотвращение Утечек Ссылок"
  },
  summary: {
    en: "True immutability requires that no caller can mutate internal state after construction — not merely declaring fields `private final`. Defensive copying on input and output boundaries prevents mutable List, Money, Date, and BigDecimal reference leaks in payment reconciliation domains.",
    ru: "Подлинная неизменяемость требует, чтобы ни один вызывающий не мог изменить внутреннее состояние после создания — а не просто объявить поля `private final`. Защитное копирование на границах входа и выхода предотвращает утечки мутабельных ссылок List, Money, Date и BigDecimal в доменах сверки платежей."
  },
  sections: [
    {
      id: "sec_imm_definition",
      category: "DEFINITION",
      title: {
        en: "1. What Immutability Actually Means in Java",
        ru: "1. Что На самом Деле Означает Неизменяемость в Java"
      },
      blocks: [
        {
          id: "blk_imm_def_1",
          type: "PARAGRAPH",
          content: {
            en: "In senior interviews, immutability is frequently misdefined as 'all fields are private and final.' In payment reconciliation services, this definition is dangerously incomplete. A `private final List<Transaction> transactions` field prevents re-assigning the reference variable, but external code can still invoke `snapshot.getTransactions().add(fakeTxn)` if the getter returns the internal list directly — corrupting cached settlement totals.",
            ru: "На Senior-интервью неизменяемость часто ошибочно определяют как 'все поля private и final'. В сервисах сверки платежей это определение опасно неполно. Поле `private final List<Transaction> transactions` запрещает переприсвоение ссылки, но внешний код может вызвать `snapshot.getTransactions().add(fakeTxn)`, если геттер возвращает внутренний список напрямую — портя кэшированные settlement-итоги."
          }
        },
        {
          id: "blk_imm_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Deep vs Shallow Immutability",
            ru: "💡 Главная Ментальная Модель: Глубокая vs Поверхностная Неизменяемость"
          },
          content: {
            en: "Shallow immutability: the reference variable cannot be reassigned (`final`). Deep immutability: the object graph reachable from the instance cannot be mutated by any external caller after construction. CustomerSnapshot requires deep immutability because Transaction lists and Money totalExposure participate in settlement invariants.",
            ru: "Поверхностная неизменяемость: переменная-ссылка не может быть переприсвоена (`final`). Глубокая неизменяемость: граф объектов, достижимый из экземпляра, не может быть изменен внешним вызывающим после создания. CustomerSnapshot требует глубокой неизменяемости, так как списки Transaction и Money totalExposure участвуют в инвариантах settlement."
          }
        }
      ]
    },
    {
      id: "sec_defensive_copy_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Defensive Copying: Constructor Input & Getter Output",
        ru: "2. Защитное Копирование: Вход Конструктора и Выход Геттера"
      },
      blocks: [
        {
          id: "blk_dc_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Effective Java Item 50 mandates defensive copying in BOTH directions. On constructor input: `this.transactions = List.copyOf(transactions)` prevents the caller from retaining a reference to the same mutable list and mutating it after construction. On getter output: returning `List.copyOf(this.transactions)` or storing an already-unmodifiable List.copyOf result prevents the caller from mutating internal state through the returned reference.",
            ru: "Effective Java Item 50 требует защитного копирования в ОБОИХ направлениях. На входе конструктора: `this.transactions = List.copyOf(transactions)` не дает вызывающему сохранить ссылку на тот же мутабельный список и изменить его после создания. На выходе геттера: возврат `List.copyOf(this.transactions)` или хранение уже неизменяемого результата List.copyOf не дает вызывающему изменить внутреннее состояние через возвращенную ссылку."
          }
        },
        {
          id: "blk_dc_mech_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: Mutable Money (BigDecimal) & Date Timestamp Leaks",
            ru: "⚠️ Продакшн Риск: Утечки Мутабельного Money (BigDecimal) и Timestamp через Date"
          },
          content: {
            en: "A `private final Date bookedAt` field is NOT immutable — external code can invoke `txn.getBookedAt().setTime(0)` to rewrite reconciliation timelines. A Money class that stores and returns `BigDecimal` by reference leaks mutable monetary state into settlement math. Modern Java 17 code should use `java.time.Instant` and model Money as an immutable record with `long amountCents`. If legacy Date is unavoidable, defensive copy with `new Date(bookedAt.getTime())` is required on both constructor input and getter output.",
            ru: "Поле `private final Date bookedAt` НЕ является неизменяемым — внешний код может вызвать `txn.getBookedAt().setTime(0)`, переписывая таймлайн сверки. Класс Money, хранящий и возвращающий `BigDecimal` по ссылке, утекает мутабельное денежное состояние в settlement-математику. Современный Java 17 код должен использовать `java.time.Instant` и моделировать Money как неизменяемый record с `long amountCents`. Если Date неизбежен, требуется защитное копирование `new Date(bookedAt.getTime())` на входе и выходе."
          }
        }
      ]
    },
    {
      id: "sec_imm_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Java 17 Records, List.copyOf(), and Performance Trade-offs",
        ru: "3. Java 17 Records, List.copyOf() и Компромиссы Производительности"
      },
      blocks: [
        {
          id: "blk_imm_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Java 17 records (`public record Money(long amountCents, String currency) {}`) provide compact immutable data carriers with auto-generated equals/hashCode/toString. However, records provide SHALLOW immutability: if a component type is mutable (e.g., `Date` or a raw `ArrayList`), the record is NOT deeply immutable. A `CustomerSnapshot` record with `List<Transaction> transactions` must apply `transactions = List.copyOf(transactions)` in a compact constructor to enforce deep immutability.",
            ru: "Java 17 record (`public record Money(long amountCents, String currency) {}`) предоставляет компактные неизменяемые носители данных с auto-generated equals/hashCode/toString. Однако record обеспечивает ПОВЕРХНОСТНУЮ неизменяемость: если тип компонента мутабелен (например, `Date` или сырой `ArrayList`), record НЕ является глубоко неизменяемым. Record `CustomerSnapshot` с `List<Transaction> transactions` должен применять `transactions = List.copyOf(transactions)` в компактном конструкторе для глубокой неизменяемости."
          }
        },
        {
          id: "blk_imm_trade_2",
          type: "CALLOUT",
          title: {
            en: "⚖️ Trade-off: Allocation Overhead vs Settlement Integrity",
            ru: "⚖️ Компромисс: Накладные Расходы Аллокации vs Целостность Settlement"
          },
          content: {
            en: "Defensive copying on every construction allocates new wrapper objects on the heap. For reconciliation caches processing thousands of CustomerSnapshot reads per second, this overhead is negligible compared to the cost of corrupted settlement totals. In ultra-hot paths, prefer returning immutable views (`Collections.unmodifiableList`) on getter output while still copying on constructor input. Modeling Money with long cents also avoids BigDecimal allocation churn.",
            ru: "Защитное копирование при каждом создании аллоцирует новые объекты-обертки в куче. Для кэшей сверки с тысячами чтений CustomerSnapshot в секунду эти накладные расходы несущественны по сравнению с ценой испорченных settlement-итогов. В ultra-hot путях предпочитайте возвращать неизменяемые представления (`Collections.unmodifiableList`) из геттера, сохраняя копирование на входе конструктора. Моделирование Money через long cents также избегает churn аллокаций BigDecimal."
          }
        }
      ]
    },
    {
      id: "sec_imm_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Immutability & Defensive Copying",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Неизменяемость и Защитное Копирование"
      },
      blocks: [
        {
          id: "blk_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Your CustomerSnapshot has all fields declared private final. Why is it still mutable?' — Model Answer: `final` only prevents reassigning the reference variable. If the referenced object (ArrayList, Date, shared BigDecimal) is itself mutable, external callers mutate internal state through getters without ever touching the field assignment. True immutability requires deep unmodifiable state.",
            ru: "Доп. Вопрос 1: 'У CustomerSnapshot все поля private final. Почему он все еще мутабелен?' — Модельный Ответ: `final` лишь запрещает переприсвоение ссылки. Если объект по ссылке (ArrayList, Date, общий BigDecimal) мутабелен, внешние вызывающие меняют состояние через геттеры, не затрагивая присвоение поля. Подлинная неизменяемость требует глубокого неизменяемого состояния."
          }
        },
        {
          id: "blk_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What is the difference between Collections.unmodifiableList() and List.copyOf()?' — Model Answer: `unmodifiableList` wraps the original list — if the caller retains a reference to the source list, they can still mutate it, and changes propagate to the wrapper. `List.copyOf` creates an independent immutable snapshot; mutations to the source list after copyOf do not affect the copy.",
            ru: "Доп. Вопрос 2: 'В чем разница между Collections.unmodifiableList() и List.copyOf()?' — Модельный Ответ: `unmodifiableList` оборачивает исходный список — если вызывающий сохранил ссылку на исходный список, он может его менять, и изменения пройдут в обертку. `List.copyOf` создает независимый неизменяемый снимок; мутации исходного списка после copyOf не влияют на копию."
          }
        },
        {
          id: "blk_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Should defensive copying happen in the constructor, the getter, or both?' — Model Answer: Both, per Effective Java Item 50. Constructor input copying prevents aliasing attacks where the caller mutates the passed-in Transaction collection after construction. Getter output copying (or returning an immutable view) prevents callers from mutating internal state through the returned reference.",
            ru: "Доп. Вопрос 3: 'Где нужно защитное копирование — в конструкторе, геттере или в обоих?' — Модельный Ответ: В обоих, согласно Effective Java Item 50. Копирование на входе конструктора предотвращает aliasing-атаки, когда вызывающий меняет переданную коллекцию Transaction после создания. Копирование на выходе геттера (или возврат неизменяемого представления) предотвращает мутацию внутреннего состояния через возвращенную ссылку."
          }
        },
        {
          id: "blk_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why replace java.util.Date with java.time.Instant in Transaction.bookedAt, and BigDecimal with long cents in Money?' — Model Answer: `Date` is mutable via `setTime()`. `Instant` is a value type with no mutators. Modeling Money with `long amountCents` in a record eliminates shared mutable BigDecimal reference hazards in settlement math without defensive copy boilerplate.",
            ru: "Доп. Вопрос 4: 'Зачем заменять java.util.Date на java.time.Instant в Transaction.bookedAt, а BigDecimal на long cents в Money?' — Модельный Ответ: `Date` мутабелен через `setTime()`. `Instant` — value type без мутаторов. Моделирование Money через `long amountCents` в record устраняет риски общих мутабельных ссылок BigDecimal в settlement-математике без шаблона защитного копирования."
          }
        },
        {
          id: "blk_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Are Java 17 records automatically deeply immutable?' — Model Answer: No. Records provide shallow immutability — component references cannot be reassigned, but mutable component types (Date, ArrayList, arrays) remain mutable through their own APIs. A record with `List<Transaction> transactions` must use a compact constructor with `transactions = List.copyOf(transactions)` to achieve deep immutability.",
            ru: "Доп. Вопрос 5: 'Java 17 record автоматически глубоко неизменяем?' — Модельный Ответ: Нет. Record обеспечивает поверхностную неизменяемость — ссылки компонентов нельзя переприсвоить, но мутабельные типы компонентов (Date, ArrayList, массивы) остаются мутабельными через свои API. Record с `List<Transaction> transactions` должен использовать компактный конструктор с `transactions = List.copyOf(transactions)` для глубокой неизменяемости."
          }
        },
        {
          id: "blk_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How does immutability relate to thread safety in payment reconciliation?' — Model Answer: Immutable objects are inherently thread-safe for reads — no locks required because state cannot change. In a multithreaded reconciliation pipeline where multiple worker threads read CustomerSnapshot from a shared cache, immutability guarantees each thread sees a consistent Transaction list and Money totalExposure without synchronized blocks.",
            ru: "Доп. Вопрос 6: 'Как неизменяемость связана с потокобезопасностью в сверке платежей?' — Модельный Ответ: Неизменяемые объекты по природе потокобезопасны для чтения — блокировки не нужны, так как состояние не может измениться. В многопоточном pipeline сверки, где несколько worker-потоков читают CustomerSnapshot из общего кэша, неизменяемость гарантирует согласованный список Transaction и Money totalExposure без synchronized."
          }
        },
        {
          id: "blk_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'What about arrays? How do you make a byte[] field immutable?' — Model Answer: Arrays are always mutable in Java — there is no immutable array type. Defensive copy with `Arrays.copyOf(source, source.length)` on constructor input, and return `Arrays.copyOf(internal, internal.length)` on getter output. Alternatively, wrap with an immutable facade or use `List<Byte>` with `List.copyOf()`.",
            ru: "Доп. Вопрос 7: 'А массивы? Как сделать поле byte[] неизменяемым?' — Модельный Ответ: Массивы в Java всегда мутабельны — неизменяемого типа массива не существует. Защитное копирование через `Arrays.copyOf(source, source.length)` на входе конструктора и `Arrays.copyOf(internal, internal.length)` на выходе геттера. Альтернатива — обертка с неизменяемым фасадом или `List<Byte>` с `List.copyOf()`."
          }
        },
        {
          id: "blk_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'When would you choose a Builder pattern over a record for CustomerSnapshot?' — Model Answer: When the object has many optional fields, complex validation rules, or evolves frequently. However, the Builder must also apply defensive copying in its `build()` method — copying all mutable inputs before constructing the immutable CustomerSnapshot. A record with a compact constructor is preferred when the field set is stable and small.",
            ru: "Доп. Вопрос 8: 'Когда выбрать Builder вместо record для CustomerSnapshot?' — Модельный Ответ: Когда у объекта много опциональных полей, сложные правила валидации или частая эволюция. Однако Builder тоже должен применять защитное копирование в `build()` — копировать все мутабельные входы перед созданием неизменяемого CustomerSnapshot. Record с компактным конструктором предпочтителен при стабильном небольшом наборе полей."
          }
        },
        {
          id: "blk_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can serialization break immutability?' — Model Answer: Yes. Deserialization can bypass constructors entirely, creating instances with mutable internal state. For immutable classes, implement `readObject()` or `readResolve()` to defensively copy deserialized mutable fields, or use serialization proxies (Effective Java Item 88). This is a common senior-level trap in reconciliation snapshot caching with Redis/JPA.",
            ru: "Доп. Вопрос 9: 'Может ли сериализация нарушить неизменяемость?' — Модельный Ответ: Да. Десериализация может обойти конструкторы, создавая экземпляры с мутабельным внутренним состоянием. Для неизменяемых классов реализуйте `readObject()` или `readResolve()` для защитного копирования десериализованных мутабельных полей, или используйте serialization proxy (Effective Java Item 88). Частая ловушка Senior-уровня при кэшировании reconciliation-снимков через Redis/JPA."
          }
        },
        {
          id: "blk_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How would you test that CustomerSnapshot is truly immutable?' — Model Answer: Write mutation tests: obtain internal state via every getter, attempt `.add(fakeTxn)`, `.setTime()`, BigDecimal mutation via shared refs. Use reflection to verify all fields are final. Use ArchUnit rule `classes().that().areAnnotatedWith(Immutable.class).should().haveOnlyFinalFields()`. For records, verify compact constructor applies List.copyOf on mutable components.",
            ru: "Доп. Вопрос 10: 'Как протестировать, что CustomerSnapshot по-настоящему неизменяем?' — Модельный Ответ: Напишите mutation-тесты: получите внутреннее состояние через каждый геттер, попробуйте `.add(fakeTxn)`, `.setTime()`, мутацию BigDecimal через общие ссылки. Через reflection проверьте, что все поля final. Используйте ArchUnit: `classes().that().areAnnotatedWith(Immutable.class).should().haveOnlyFinalFields()`. Для record проверьте, что компактный конструктор применяет List.copyOf к мутабельным компонентам."
          }
        },
        {
          id: "blk_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Does marking a class final guarantee immutability?' — Model Answer: No. `final` on a class prevents subclassing, which helps immutability (subclasses could add mutators), but says nothing about field mutability. A `public final class CustomerSnapshot` with a getter returning a mutable ArrayList is still fully mutable from the caller's perspective.",
            ru: "Доп. Вопрос 11: 'Делает ли final на классе гарантию неизменяемости?' — Модельный Ответ: Нет. `final` на классе запрещает наследование (подклассы могли бы добавить мутаторы), но ничего не говорит о мутабельности полей. `public final class CustomerSnapshot` с геттером, возвращающим мутабельный ArrayList, остается полностью мутабельным с точки зрения вызывающего."
          }
        },
        {
          id: "blk_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'In our incident, fraud/ops called getTransactions().add(fakeTxn). Could @Immutable from Error Prone or SpotBugs have caught this?' — Model Answer: Static analysis can flag classes annotated @Immutable that expose mutable getters, but only if the annotation is present and the analyzer understands collection leak patterns. Code review checklists should include: 'Every getter returning a collection, Money, or temporal type must return an immutable view or defensive copy.' Automated ArchUnit tests are more reliable than annotations alone.",
            ru: "Доп. Вопрос 12: 'В нашем инциденте fraud/ops вызвал getTransactions().add(fakeTxn). Могла ли @Immutable от Error Prone или SpotBugs поймать это?' — Модельный Ответ: Статический анализ может пометить классы с @Immutable, экспонирующие мутабельные геттеры, но только при наличии аннотации и понимании анализатором паттернов утечки коллекций. Чеклист код-ревью: 'Каждый геттер, возвращающий коллекцию, Money или temporal type, должен возвращать неизменяемое представление или защитную копию.' ArchUnit-тесты надежнее одних аннотаций."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_encapsulation"],
  sourceIds: ["src_effective_java_item17_50", "src_jep_395_records", "src_baeldung_immutability"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#immutability", "#defensive-copying", "#records", "#payment-reconciliation"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_IMMUTABILITY: readonly TheoryCheckpoint[] = [
  {
    id: "chk_imm_1",
    theoryArticleId: "art_theory_immutability",
    question: {
      en: "What does `private final List<Transaction> transactions` guarantee regarding immutability?",
      ru: "Что гарантирует объявление `private final List<Transaction> transactions` в плане неизменяемости?"
    },
    explanation: {
      en: "`final` prevents reassigning the transactions reference variable, but external code can still mutate the ArrayList contents through a leaked getter reference via getTransactions().add(fakeTxn).",
      ru: "`final` запрещает переприсвоение ссылки transactions, но внешний код может изменить содержимое ArrayList через утекшую ссылку из геттера через getTransactions().add(fakeTxn)."
    },
    options: [
      {
        id: "opt_imm1_a",
        text: {
          en: "It guarantees the List and all its Transaction elements are 100% immutable and cannot be modified by anyone.",
          ru: "Это гарантирует, что List и все его элементы Transaction на 100% неизменяемы и никоим образом не могут быть изменены."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. final reference != immutable object. ArrayList has mutating methods like add() and remove().",
          ru: "Неверно. final-ссылка != неизменяемый объект. ArrayList имеет мутирующие методы add() и remove()."
        },
        misconceptionId: "err_final_equals_immutable"
      },
      {
        id: "opt_imm1_b",
        text: {
          en: "It only prevents reassigning the `transactions` reference variable to point to a different List instance.",
          ru: "Это запрещает лишь переприсвоение переменной `transactions` другой ссылки на другой экземпляр List."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! To achieve true immutability, use List.copyOf() in the constructor and return immutable views from getters.",
          ru: "Верно! Для подлинной неизменяемости используйте List.copyOf() в конструкторе и возвращайте неизменяемые представления из геттеров."
        }
      },
      {
        id: "opt_imm1_c",
        text: {
          en: "It automatically makes the List thread-safe for concurrent reads in payment reconciliation.",
          ru: "Это автоматически делает List потокобезопасным для конкурентного чтения при сверке платежей."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. A mutable ArrayList is NOT thread-safe. Concurrent add() from multiple threads causes ConcurrentModificationException or data corruption.",
          ru: "Неверно. Мутабельный ArrayList НЕ потокобезопасен. Конкурентный add() из нескольких потоков вызывает ConcurrentModificationException или порчу данных."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_imm_2",
    theoryArticleId: "art_theory_immutability",
    question: {
      en: "Where must defensive copying be applied for a mutable collection field in an immutable CustomerSnapshot?",
      ru: "Где необходимо применять защитное копирование для мутабельного поля-коллекции в неизменяемом CustomerSnapshot?"
    },
    explanation: {
      en: "Effective Java Item 50 requires defensive copying on BOTH constructor input (prevent aliasing) AND getter output (prevent external mutation via getTransactions().add).",
      ru: "Effective Java Item 50 требует защитного копирования на входе конструктора (против aliasing) И на выходе геттера (против внешней мутации через getTransactions().add)."
    },
    options: [
      {
        id: "opt_imm2_a",
        text: {
          en: "Only in the constructor, to copy the incoming Transaction collection before storing it.",
          ru: "Только в конструкторе, чтобы скопировать входящую коллекцию Transaction перед сохранением."
        },
        isCorrect: false,
        feedback: {
          en: "Incomplete. Constructor copying alone (e.g. new ArrayList<>) does not prevent mutation through getter-returned references.",
          ru: "Неполно. Копирование только в конструкторе (например new ArrayList<>) не предотвращает мутацию через ссылки, возвращаемые геттером."
        },
        misconceptionId: "err_constructor_copy_only"
      },
      {
        id: "opt_imm2_b",
        text: {
          en: "In both the constructor (input copy via List.copyOf) and the getter (output copy or immutable view).",
          ru: "И в конструкторе (копия на входе через List.copyOf), и в геттере (копия на выходе или неизменяемое представление)."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Both boundaries must be defended to achieve deep immutability of CustomerSnapshot.",
          ru: "Верно! Обе границы должны быть защищены для достижения глубокой неизменяемости CustomerSnapshot."
        }
      },
      {
        id: "opt_imm2_c",
        text: {
          en: "Only in the getter, because the constructor already validated the input.",
          ru: "Только в геттере, потому что конструктор уже провалидировал вход."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Without constructor copying, the caller can mutate the passed-in Transaction list after construction via their retained reference.",
          ru: "Неверно. Без копирования в конструкторе вызывающий может изменить переданный список Transaction после создания через сохраненную ссылку."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_imm_3",
    theoryArticleId: "art_theory_immutability",
    question: {
      en: "Why is java.time.Instant preferred over java.util.Date for Transaction.bookedAt, and long cents over BigDecimal for Money?",
      ru: "Почему java.time.Instant предпочтительнее java.util.Date для Transaction.bookedAt, а long cents — BigDecimal для Money?"
    },
    explanation: {
      en: "Instant is an immutable value type with no mutators. Date has setTime() which allows external callers to rewrite booking times through a leaked getter. Long cents in a Money record eliminate shared mutable BigDecimal reference hazards in settlement math.",
      ru: "Instant — неизменяемый value type без мутаторов. Date имеет setTime(), позволяющий внешним вызывающим переписывать время бронирования через утекшую ссылку. Long cents в Money record устраняют риски общих мутабельных ссылок BigDecimal в settlement-математике."
    },
    options: [
      {
        id: "opt_imm3_a",
        text: {
          en: "Instant and long-cents Money are inherently immutable — no setTime() or shared BigDecimal mutation — eliminating reference leak attacks on settlement data.",
          ru: "Instant и Money на long cents по природе неизменяемы — нет setTime() и мутации через общий BigDecimal — устраняя атаки через утечку ссылок на settlement-данные."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Instant and immutable Money with long cents are the modern Java 17 standard for temporal and monetary values in payment reconciliation.",
          ru: "Верно! Instant и неизменяемый Money с long cents — современный стандарт Java 17 для временных и денежных значений в сверке платежей."
        }
      },
      {
        id: "opt_imm3_b",
        text: {
          en: "Instant and long use less heap memory than Date and BigDecimal, which is the primary reason for the change.",
          ru: "Instant и long используют меньше памяти в куче, чем Date и BigDecimal, и это главная причина замены."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The primary reason is immutability and API safety, not memory footprint.",
          ru: "Неверно. Главная причина — неизменяемость и безопасность API, а не объем памяти."
        }
      },
      {
        id: "opt_imm3_c",
        text: {
          en: "Date and BigDecimal are deprecated since Java 17 and cannot be used in production payment services.",
          ru: "Date и BigDecimal deprecated с Java 17 и не могут использоваться в продакшн платежных сервисах."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Neither is removed from Java 17, but Date is legacy and mutable — Instant and immutable long-cents Money are the recommended replacements for deep immutability.",
          ru: "Неверно. Ни то ни другое не удалено из Java 17, но Date — legacy и мутабелен — Instant и неизменяемый Money на long cents рекомендуются для глубокой неизменяемости."
        },
        misconceptionId: "err_date_deprecated_myth"
      }
    ],
    order: 3
  }
];
