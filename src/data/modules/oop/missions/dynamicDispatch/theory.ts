import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_DYNAMIC_DISPATCH: TheoryArticle = {
  id: "art_theory_dynamic_dispatch",
  topicIds: ["top_oop_12"],
  conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
  title: {
    en: "Dynamic Dispatch, Bytecode Instructions & Megamorphic Call Sites",
    ru: "Динамическая Диспетчеризация, Байткод-Инструкции и Мегаморфные Call Sites"
  },
  summary: {
    en: "JVMS 6.5 defines how Java method calls become invokestatic, invokevirtual, invokeinterface, or invokespecial. Instance overrides use runtime type (vtable/itable); static methods hide and bind at compile time. HotSpot further classifies call sites as monomorphic, bimorphic, or megamorphic — the last blocks aggressive inlining in RiskEventProcessor hot loops.",
    ru: "JVMS 6.5 определяет, как вызовы методов Java становятся invokestatic, invokevirtual, invokeinterface или invokespecial. Instance overrides используют runtime-тип (vtable/itable); static-методы скрывают и связываются на этапе компиляции. HotSpot дополнительно классифицирует call sites как monomorphic, bimorphic или megamorphic — последний блокирует агрессивный inlining в hot loops RiskEventProcessor."
  },
  sections: [
    {
      id: "sec_dd_definition",
      category: "DEFINITION",
      title: {
        en: "1. Dynamic Dispatch vs Static Binding",
        ru: "1. Динамическая Диспетчеризация vs Статическое Связывание"
      },
      blocks: [
        {
          id: "blk_dd_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Dynamic dispatch means the JVM selects which method body to execute based on the *runtime* type of the receiver. When RiskEventProcessor holds a `RiskHandler handler` and calls `handler.evaluate(event)`, the concrete class — CardExposureHandler, WireExposureHandler, AchExposureHandler, etc. — decides the implementation. Static binding means the compiler selects the target using the *compile-time* type (and method kind). Static methods, private methods, and constructors never participate in polymorphic override selection.",
            ru: "Динамическая диспетчеризация означает, что JVM выбирает тело метода по *runtime*-типу получателя. Когда RiskEventProcessor хранит `RiskHandler handler` и вызывает `handler.evaluate(event)`, конкретный класс — CardExposureHandler, WireExposureHandler, AchExposureHandler и т.д. — определяет реализацию. Статическое связывание означает, что компилятор выбирает цель по *compile-time*-типу (и виду метода). Static-методы, private-методы и конструкторы никогда не участвуют в полиморфном выборе override."
          }
        },
        {
          id: "blk_dd_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Receiver Type Decides Instance Calls",
            ru: "💡 Главная Ментальная Модель: Тип Получателя Решает Instance-Вызовы"
          },
          content: {
            en: "For instance methods, the reference type (`RiskHandler`) only constrains the compile-time API. The object on the heap (`new CardExposureHandler()`) selects the override via vtable (class) or itable (interface) lookup. If you replace that with `RiskHandlers.evaluate(handler, event)` as a static helper — or call a static `RiskHandler.evaluateStatic(event)` through a subclass reference — polymorphism disappears: bytecode becomes `invokestatic` and the base implementation always wins.",
            ru: "Для instance-методов тип ссылки (`RiskHandler`) лишь ограничивает compile-time API. Объект в куче (`new CardExposureHandler()`) выбирает override через vtable (класс) или itable (интерфейс). Если заменить это на `RiskHandlers.evaluate(handler, event)` как static helper — или вызвать static `RiskHandler.evaluateStatic(event)` через ссылку подкласса — полиморфизм исчезает: байткод становится `invokestatic`, и всегда побеждает базовая реализация."
          }
        }
      ]
    },
    {
      id: "sec_dd_jvms_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. JVMS 6.5: invokevirtual, invokestatic, invokeinterface",
        ru: "2. JVMS 6.5: invokevirtual, invokestatic, invokeinterface"
      },
      blocks: [
        {
          id: "blk_dd_jvms_1",
          type: "PARAGRAPH",
          content: {
            en: "JVMS Section 6.5 specifies the invoke family. `invokestatic` resolves a class/interface static method at link time — no receiver, no override. `invokevirtual` dispatches an instance method declared on a class using the receiver's vtable slot (virtual). `invokeinterface` dispatches an instance method declared on an interface using itable lookup (historically slightly heavier; HotSpot often optimizes common cases similarly). `invokespecial` covers constructors, private methods, and explicit `super` calls — non-virtual. In RiskEventProcessor, `handler.evaluate(event)` on an interface-typed field emits `invokeinterface`; the same call on an abstract-class field emits `invokevirtual`.",
            ru: "JVMS Раздел 6.5 специфицирует семейство invoke. `invokestatic` разрешает static-метод класса/интерфейса на этапе линковки — без получателя, без override. `invokevirtual` диспетчеризует instance-метод, объявленный на классе, через слот vtable получателя. `invokeinterface` диспетчеризует instance-метод интерфейса через itable (исторически чуть дороже; HotSpot часто оптимизирует похоже). `invokespecial` покрывает конструкторы, private-методы и явные вызовы `super` — невиртуальные. В RiskEventProcessor `handler.evaluate(event)` на поле типа интерфейса эмитит `invokeinterface`; тот же вызов на поле абстрактного класса — `invokevirtual`."
          }
        },
        {
          id: "blk_dd_jvms_2",
          type: "WARNING",
          title: {
            en: "⚙️ Static Method Hiding Is Not Overriding",
            ru: "⚙️ Static Method Hiding — Это Не Overriding"
          },
          content: {
            en: "If RiskHandler declares `static long evaluateStatic(RiskEvent e)` and CardExposureHandler declares another `static long evaluateStatic(RiskEvent e)`, the subclass *hides* the superclass method — it does not override it. Calling `RiskHandler.evaluateStatic(event)` or `RiskHandlers.evaluate(handler, event)` always binds to the compile-time named method. `@Override` is illegal on static methods. Only instance `evaluate(RiskEvent)` participates in dynamic dispatch.",
            ru: "Если RiskHandler объявляет `static long evaluateStatic(RiskEvent e)`, а CardExposureHandler — другой `static long evaluateStatic(RiskEvent e)`, подкласс *скрывает* метод суперкласса — он его не переопределяет. Вызов `RiskHandler.evaluateStatic(event)` или `RiskHandlers.evaluate(handler, event)` всегда связывается с методом, названным на этапе компиляции. `@Override` незаконен на static-методах. Только instance `evaluate(RiskEvent)` участвует в динамической диспетчеризации."
          }
        },
        {
          id: "blk_dd_jvms_3",
          type: "CALLOUT",
          title: {
            en: "📜 HotSpot Call-Site Polymorphism",
            ru: "📜 Полиморфизм Call Site в HotSpot"
          },
          content: {
            en: "At a given bytecode call site, HotSpot profiles receiver types. Monomorphic: one concrete type → inline aggressively. Bimorphic: two types → often still inline with a type check. Megamorphic: three or more (in practice, HotSpot's inline-cache degrades; with 8 RiskHandler implementations at one site, expect megamorphic behavior) → stop speculative inlining, pay repeated vtable/itable dispatch and miss CPU cache benefits. Reducing receiver cardinality at each hot site restores inlining headroom.",
            ru: "На каждом байткод call site HotSpot профилирует типы получателей. Monomorphic: один конкретный тип → агрессивный inline. Bimorphic: два типа → часто всё ещё inline с проверкой типа. Megamorphic: три и более (на практике inline-cache HotSpot деградирует; при 8 реализациях RiskHandler на одном сайте ожидайте megamorphic) → прекращение спекулятивного inlining, повторные vtable/itable dispatch и потеря выгод CPU cache. Снижение числа типов получателей на каждом hot site восстанавливает запас для inlining."
          }
        }
      ]
    },
    {
      id: "sec_dd_resolution_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Fix Strategies: Polymorphic Calls vs Sealed Split Sites",
        ru: "3. Стратегии Фикса: Полиморфные Вызовы vs Sealed Split Sites"
      },
      blocks: [
        {
          id: "blk_dd_res_1",
          type: "PARAGRAPH",
          content: {
            en: "The correctness fix for RiskEventProcessor is mandatory: delete the static helper path and call `handler.evaluate(event)` so bytecode is `invokeinterface`/`invokevirtual`. Example:\n```java\npublic final class RiskEventProcessor {\n    private final RiskHandler handler;\n    public long process(RiskEvent event) {\n        return handler.evaluate(event); // polymorphic\n    }\n}\n```\nAn `instanceof` switch that manually routes to Card/Wire/Ach static helpers reintroduces static binding and brittle maintenance — it is not a substitute for virtual dispatch.",
            ru: "Фикс корректности для RiskEventProcessor обязателен: удалить путь static helper и вызывать `handler.evaluate(event)`, чтобы байткод был `invokeinterface`/`invokevirtual`. Пример:\n```java\npublic final class RiskEventProcessor {\n    private final RiskHandler handler;\n    public long process(RiskEvent event) {\n        return handler.evaluate(event); // полиморфно\n    }\n}\n```\n`instanceof` switch с ручной маршрутизацией к static helpers Card/Wire/Ach возвращает static binding и хрупкую поддержку — это не замена виртуальной диспетчеризации."
          }
        },
        {
          id: "blk_dd_res_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Performance Fix: Sealed Hierarchy or Split Call Sites",
            ru: "🔧 Перформанс-Фикс: Sealed Hierarchy или Split Call Sites"
          },
          content: {
            en: "After correctness is restored, address megamorphism. Option A: seal RiskHandler to a small known set and keep processors typed to subtypes (CardRiskProcessor holds CardExposureHandler — monomorphic site). Option B: split the hot loop by portfolio channel so each loop body sees ≤2 concrete handlers (bimorphic). Option C: use pattern matching / switch on sealed types only when the set is tiny and stable — still prefer virtual calls for open extension. Trade-off: sealing limits extension; splitting adds wiring; both beat a megamorphic site at 1M events/sec.",
            ru: "После восстановления корректности устраните мегаморфизм. Вариант A: запечатать RiskHandler небольшим известным набором и типизировать процессоры подтипами (CardRiskProcessor держит CardExposureHandler — monomorphic site). Вариант B: разделить hot loop по каналу портфеля, чтобы каждое тело цикла видело ≤2 конкретных handler-а (bimorphic). Вариант C: pattern matching / switch по sealed-типам только когда набор мал и стабилен — для открытого расширения всё же предпочитайте virtual calls. Компромисс: sealing ограничивает расширение; splitting добавляет wiring; оба лучше мегаморфного сайта при 1M events/sec."
          }
        }
      ]
    },
    {
      id: "sec_dd_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Dynamic Dispatch & Megamorphism",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Динамическая Диспетчеризация и Мегаморфизм"
      },
      blocks: [
        {
          id: "blk_dd_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Which bytecode does handler.evaluate(event) emit when handler is typed as RiskHandler interface?' — Model Answer: `invokeinterface`. If RiskHandler were an abstract class, the same instance call would typically emit `invokevirtual`. Neither is `invokestatic`.",
            ru: "Доп. Вопрос 1: 'Какой байткод эмитит handler.evaluate(event), если handler типизирован как интерфейс RiskHandler?' — Модельный Ответ: `invokeinterface`. Если RiskHandler — абстрактный класс, тот же instance-вызов обычно эмитит `invokevirtual`. Ни то, ни другое не является `invokestatic`."
          }
        },
        {
          id: "blk_dd_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What does RiskHandlers.evaluate(handler, event) compile to?' — Model Answer: `invokestatic` on RiskHandlers. The helper may then call instance methods internally, but if the helper itself contains the business logic or calls static handlers by compile-time type, you lose polymorphic selection at the outer call site the profiler attributes.",
            ru: "Доп. Вопрос 2: 'Во что компилируется RiskHandlers.evaluate(handler, event)?' — Модельный Ответ: `invokestatic` на RiskHandlers. Helper может внутри вызывать instance-методы, но если helper сам содержит бизнес-логику или зовёт static handlers по compile-time типу, вы теряете полиморфный выбор на внешнем call site, который видит профилировщик."
          }
        },
        {
          id: "blk_dd_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'CardExposureHandler defines static evaluateStatic that 'overrides' RiskHandler.evaluateStatic — which runs?' — Model Answer: Neither overrides. Static methods hide. The method named by the compile-time qualifier runs. `RiskHandler.evaluateStatic(e)` always selects RiskHandler's static method even if the runtime object is CardExposureHandler.",
            ru: "Доп. Вопрос 3: 'CardExposureHandler определяет static evaluateStatic, который «переопределяет» RiskHandler.evaluateStatic — какой выполнится?' — Модельный Ответ: Ни один не override. Static-методы скрывают. Выполняется метод, названный compile-time квалификатором. `RiskHandler.evaluateStatic(e)` всегда выбирает static RiskHandler, даже если runtime-объект — CardExposureHandler."
          }
        },
        {
          id: "blk_dd_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Define monomorphic, bimorphic, and megamorphic call sites.' — Model Answer: Monomorphic — one receiver type observed; ideal for inlining. Bimorphic — two types; HotSpot can still inline with a branch. Megamorphic — many types (e.g., 8 RiskHandlers); inline caches fail to specialize, inlining stops, dispatch cost dominates the 1M events/sec loop.",
            ru: "Доп. Вопрос 4: 'Определите monomorphic, bimorphic и megamorphic call sites.' — Модельный Ответ: Monomorphic — один наблюдаемый тип получателя; идеален для inlining. Bimorphic — два типа; HotSpot всё ещё может inline с веткой. Megamorphic — много типов (например, 8 RiskHandler); inline caches не специализируются, inlining прекращается, стоимость dispatch доминирует в цикле 1M events/sec."
          }
        },
        {
          id: "blk_dd_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Why is invokeinterface sometimes slower than invokevirtual historically?' — Model Answer: Interface dispatch may require itable search rather than a fixed vtable offset. Modern HotSpot optimizes monomorphic interface calls heavily; the practical hot-loop killer is usually megamorphism and missed inlining, not the raw instruction name alone.",
            ru: "Доп. Вопрос 5: 'Почему invokeinterface исторически иногда медленнее invokevirtual?' — Модельный Ответ: Interface dispatch может требовать поиска в itable вместо фиксированного смещения vtable. Современный HotSpot сильно оптимизирует monomorphic interface calls; практический убийца hot loop — обычно мегаморфизм и пропущенный inlining, а не одно лишь имя инструкции."
          }
        },
        {
          id: "blk_dd_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Would an instanceof switch over 8 handlers fix megamorphism?' — Model Answer: It can make each branch monomorphic *if* you then call a concrete typed method, but it duplicates dispatch logic, breaks open-closed design, and often still megamorphs if branches share a polymorphic helper. Prefer sealed types with split processors or virtual calls on narrowed receiver fields.",
            ru: "Доп. Вопрос 6: 'Исправит ли instanceof switch по 8 handler-ам мегаморфизм?' — Модельный Ответ: Он может сделать каждую ветку monomorphic, *если* затем вызывать конкретно типизированный метод, но дублирует логику диспетчеризации, ломает open-closed и часто всё равно мегаморфится, если ветки делят полиморфный helper. Предпочитайте sealed-типы со split processors или virtual calls на суженных полях получателя."
          }
        },
        {
          id: "blk_dd_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do private and final methods dispatch?' — Model Answer: Private instance methods use `invokespecial` (non-virtual). Final instance methods still use `invokevirtual` at the bytecode level but the JVM may devirtualize them because no subclass can override — enabling inlining similar to monomorphic sites.",
            ru: "Доп. Вопрос 7: 'Как диспетчеризуются private и final методы?' — Модельный Ответ: Private instance-методы используют `invokespecial` (невиртуальные). Final instance-методы на уровне байткода всё ещё `invokevirtual`, но JVM может их девиртуализировать, потому что подкласс не может override — что открывает inlining, похожий на monomorphic sites."
          }
        },
        {
          id: "blk_dd_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Overloading vs overriding — which is dynamic?' — Model Answer: Overloading is compile-time selection among same-name methods by argument types (`evaluate(RiskEvent)` vs `evaluate(RiskEvent, Context)`). Overriding is runtime selection of the same signature across a type hierarchy. Mixing them in interviews is a common trap.",
            ru: "Доп. Вопрос 8: 'Overloading vs overriding — что динамическое?' — Модельный Ответ: Overloading — compile-time выбор среди одноимённых методов по типам аргументов (`evaluate(RiskEvent)` vs `evaluate(RiskEvent, Context)`). Overriding — runtime выбор одной сигнатуры по иерархии типов. Их смешение на интервью — частая ловушка."
          }
        },
        {
          id: "blk_dd_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'How would you confirm the bug with tooling?' — Model Answer: `javap -c RiskEventProcessor` to see `invokestatic` vs `invokeinterface`; JMH microbenchmarks on monomorphic vs megamorphic harnesses; async-profiler / perfasm to show missed inlining in the hot loop at 1M events/sec.",
            ru: "Доп. Вопрос 9: 'Как подтвердить баг инструментами?' — Модельный Ответ: `javap -c RiskEventProcessor` чтобы увидеть `invokestatic` vs `invokeinterface`; JMH микробенчмарки monomorphic vs megamorphic; async-profiler / perfasm для показа пропущенного inlining в hot loop на 1M events/sec."
          }
        },
        {
          id: "blk_dd_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Does sealing RiskHandler change bytecode of evaluate?' — Model Answer: Sealing primarily helps the compiler and JVM prove a closed world for pattern matching and optimization. The call may still be `invokeinterface`/`invokevirtual`, but HotSpot can more reliably monomorphize or optimize switches over permitted subtypes when cardinality is small and stable.",
            ru: "Доп. Вопрос 10: 'Меняет ли sealing RiskHandler байткод evaluate?' — Модельный Ответ: Sealing в первую очередь помогает компилятору и JVM доказать закрытый мир для pattern matching и оптимизаций. Вызов может оставаться `invokeinterface`/`invokevirtual`, но HotSpot надёжнее мономорфизует или оптимизирует switch по permitted subtypes, когда кардинальность мала и стабильна."
          }
        },
        {
          id: "blk_dd_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Why did production look 'randomly wrong' after the static helper refactor?' — Model Answer: If the static helper always called the base default logic, Card/Wire/Ach-specific exposure math never ran — silent pricing bias. Megamorphism alone raises latency without changing results; static binding can change *both* latency and correctness.",
            ru: "Доп. Вопрос 11: 'Почему после рефакторинга на static helper продакшн выглядел «случайно неверным»?' — Модельный Ответ: Если static helper всегда вызывал базовую default-логику, специализированная математика exposure Card/Wire/Ach не выполнялась — тихий pricing bias. Один мегаморфизм повышает латентность без изменения результатов; static binding может менять *и* латентность, *и* корректность."
          }
        },
        {
          id: "blk_dd_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How does this relate to JVM object headers / Klass pointers?' — Model Answer: Dynamic dispatch consults the object's class metadata (Klass) reachable from the object header to find vtable/itable entries. Understanding that the receiver's Klass — not the reference variable's static type — drives dispatch connects topic 12 to JVM memory layout questions in deeper Staff rounds.",
            ru: "Доп. Вопрос 12: 'Как это связано с JVM object headers / Klass pointers?' — Модельный Ответ: Динамическая диспетчеризация обращается к метаданным класса объекта (Klass) из заголовка объекта, чтобы найти записи vtable/itable. Понимание, что Klass получателя — а не static-тип переменной-ссылки — управляет диспетчеризацией, связывает тему 12 с вопросами JVM memory layout на более глубоких Staff-раундах."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_liskov_substitution"],
  sourceIds: [
    "src_jvms_65_invoke",
    "src_java_specialists_dispatch",
    "src_baeldung_jvm_bytecode",
    "src_glassdoor_hft_dispatch"
  ],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#dynamic-dispatch", "#invokevirtual", "#megamorphic", "#jvms-65"],
  estimatedMinutes: 18,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_DYNAMIC_DISPATCH: readonly TheoryCheckpoint[] = [
  {
    id: "chk_dd_1",
    theoryArticleId: "art_theory_dynamic_dispatch",
    question: {
      en: "Which bytecode instruction is emitted for handler.evaluate(event) when handler is a RiskHandler interface reference?",
      ru: "Какая байткод-инструкция эмитится для handler.evaluate(event), когда handler — ссылка типа интерфейса RiskHandler?"
    },
    explanation: {
      en: "Interface instance method calls compile to invokeinterface; invokestatic is for static methods only.",
      ru: "Instance-вызовы методов интерфейса компилируются в invokeinterface; invokestatic — только для static-методов."
    },
    options: [
      {
        id: "opt_dd1_a",
        text: {
          en: "invokeinterface — runtime polymorphic dispatch through the interface itable.",
          ru: "invokeinterface — runtime полиморфная диспетчеризация через itable интерфейса."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! RiskHandler as an interface yields invokeinterface for evaluate(event).",
          ru: "Верно! RiskHandler как интерфейс даёт invokeinterface для evaluate(event)."
        }
      },
      {
        id: "opt_dd1_b",
        text: {
          en: "invokestatic — the compiler binds evaluate at compile time for all handlers.",
          ru: "invokestatic — компилятор связывает evaluate на этапе компиляции для всех handler-ов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. invokestatic applies to static methods / static helpers, not instance interface calls.",
          ru: "Неверно. invokestatic относится к static-методам / static helpers, а не к instance-вызовам интерфейса."
        },
        misconceptionId: "err_static_bind_instance_call"
      },
      {
        id: "opt_dd1_c",
        text: {
          en: "invokespecial — all RiskHandler calls are non-virtual like constructors.",
          ru: "invokespecial — все вызовы RiskHandler невиртуальные, как конструкторы."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. invokespecial is for constructors, private methods, and super calls — not normal interface dispatch.",
          ru: "Неверно. invokespecial — для конструкторов, private-методов и вызовов super, не для обычной interface dispatch."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_dd_2",
    theoryArticleId: "art_theory_dynamic_dispatch",
    question: {
      en: "Why does CardExposureHandler.evaluateStatic NOT run when code calls RiskHandler.evaluateStatic(event)?",
      ru: "Почему CardExposureHandler.evaluateStatic НЕ выполняется при вызове RiskHandler.evaluateStatic(event)?"
    },
    explanation: {
      en: "Static methods hide rather than override; the compile-time qualifier RiskHandler selects the method.",
      ru: "Static-методы скрывают, а не переопределяют; compile-time квалификатор RiskHandler выбирает метод."
    },
    options: [
      {
        id: "opt_dd2_a",
        text: {
          en: "Static methods hide; binding uses the compile-time type/qualifier, not the runtime object type.",
          ru: "Static-методы скрывают; связывание использует compile-time тип/квалификатор, а не runtime-тип объекта."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is the classic static method hiding trap in risk-handler refactors.",
          ru: "Верно! Это классическая ловушка static method hiding в рефакторингах risk-handler."
        }
      },
      {
        id: "opt_dd2_b",
        text: {
          en: "The JVM always prefers the base class static method for security sandboxing.",
          ru: "JVM всегда предпочитает static-метод базового класса из соображений security sandboxing."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. There is no security preference — static binding simply ignores the runtime receiver type.",
          ru: "Неверно. Нет security-предпочтения — static binding просто игнорирует runtime-тип получателя."
        }
      },
      {
        id: "opt_dd2_c",
        text: {
          en: "evaluateStatic is final on RiskHandler, so subclasses cannot declare it.",
          ru: "evaluateStatic final на RiskHandler, поэтому подклассы не могут его объявить."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Subclasses may declare a hiding static method; it still will not be selected via a RiskHandler qualifier.",
          ru: "Неверно. Подклассы могут объявить скрывающий static-метод; он всё равно не будет выбран через квалификатор RiskHandler."
        },
        misconceptionId: "err_static_hiding_as_override"
      }
    ],
    order: 2
  },
  {
    id: "chk_dd_3",
    theoryArticleId: "art_theory_dynamic_dispatch",
    question: {
      en: "A single RiskEventProcessor call site observes 8 concrete RiskHandler types. What is the HotSpot classification and main risk?",
      ru: "Один call site RiskEventProcessor наблюдает 8 конкретных типов RiskHandler. Какова классификация HotSpot и главный риск?"
    },
    explanation: {
      en: "Eight receiver types make the site megamorphic; HotSpot stops speculative inlining and pays full dispatch cost in the hot loop.",
      ru: "Восемь типов получателей делают сайт мегаморфным; HotSpot прекращает спекулятивный inlining и платит полную стоимость dispatch в hot loop."
    },
    options: [
      {
        id: "opt_dd3_a",
        text: {
          en: "Megamorphic — JIT inlining is inhibited; vtable/itable dispatch dominates latency at 1M events/sec.",
          ru: "Megamorphic — JIT inlining подавлен; vtable/itable dispatch доминирует в латентности при 1M events/sec."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Split call sites or seal/narrow receivers to restore monomorphic/bimorphic profiles.",
          ru: "Верно! Разделяйте call sites или сужайте/запечатывайте получателей для восстановления monomorphic/bimorphic профилей."
        }
      },
      {
        id: "opt_dd3_b",
        text: {
          en: "Monomorphic — eight types still count as one because they share RiskHandler.",
          ru: "Monomorphic — восемь типов всё ещё считаются одним, потому что разделяют RiskHandler."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Polymorphism is counted by concrete receiver classes observed at the site, not the shared interface name.",
          ru: "Неверно. Полиморфизм считается по конкретным классам получателей на сайте, а не по общему имени интерфейса."
        },
        misconceptionId: "err_interface_counts_as_mono"
      },
      {
        id: "opt_dd3_c",
        text: {
          en: "Bimorphic — HotSpot always treats any interface call as exactly two targets.",
          ru: "Bimorphic — HotSpot всегда считает любой interface call ровно двумя целями."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Bimorphic means two concrete receiver types; eight types are megamorphic.",
          ru: "Неверно. Bimorphic означает два конкретных типа получателя; восемь типов — megamorphic."
        }
      }
    ],
    order: 3
  }
];
