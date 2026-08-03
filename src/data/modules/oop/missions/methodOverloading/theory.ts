import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_OVERLOADING: TheoryArticle = {
  id: "art_theory_overloading",
  topicIds: ["top_oop_14"],
  conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
  title: {
    en: "Method Overloading & Compile-Time Resolution in LedgerPostingService",
    ru: "Перегрузка Методов и Compile-Time Разрешение в LedgerPostingService"
  },
  summary: {
    en: "Overloaded settle methods are resolved by the compiler using JLS applicability phases and the most-specific rule — not by runtime type. Autoboxing, null, and mixed cents/decimal semantics turn convenient overloads into incorrect ledger postings.",
    ru: "Перегруженные методы settle разрешаются компилятором по фазам применимости JLS и правилу most-specific — не по runtime-типу. Автобоксинг, null и смешанная семантика центов/decimal превращают удобные перегрузки в неверные проводки леджера."
  },
  sections: [
    {
      id: "sec_ol_definition",
      category: "DEFINITION",
      title: {
        en: "1. Overloading vs Overriding: Compile-Time vs Runtime",
        ru: "1. Перегрузка vs Переопределение: Compile-Time vs Runtime"
      },
      blocks: [
        {
          id: "blk_ol_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Method overloading means multiple methods share a name but differ in parameter lists. The compiler chooses which overload to call based on the static (compile-time) types of the arguments — see JLS §15.12. Method overriding means a subclass replaces a superclass instance method; the JVM chooses the implementation based on the runtime type of the receiver. Confusing these two is a classic senior-interview failure mode.",
            ru: "Перегрузка методов — несколько методов с одним именем, но разными списками параметров. Компилятор выбирает перегрузку по статическим (compile-time) типам аргументов — см. JLS §15.12. Переопределение — подкласс заменяет instance-метод суперкласса; JVM выбирает реализацию по runtime-типу получателя. Путаница этих двух — классический провал на Senior-интервью."
          }
        },
        {
          id: "blk_ol_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: The Compiler Picks Settle, Not the JVM",
            ru: "💡 Главная Ментальная Модель: Settle Выбирает Компилятор, Не JVM"
          },
          content: {
            en: "Ask: 'Given the declared types at the call site, which settle signature is applicable, and which is most specific?' Never ask: 'What is the runtime class of amount?' for overload selection — that question belongs to overriding.",
            ru: "Спросите: 'При объявленных типах в месте вызова какая сигнатура settle применима и какая наиболее специфична?' Никогда не спрашивайте: 'Какой runtime-класс у amount?' для выбора перегрузки — этот вопрос относится к override."
          }
        }
      ]
    },
    {
      id: "sec_ol_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. JLS Resolution Phases, Autoboxing & Most-Specific",
        ru: "2. Фазы Разрешения JLS, Автобоксинг и Most-Specific"
      },
      blocks: [
        {
          id: "blk_ol_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "JLS method invocation selects an overload in phases: (1) without boxing/unboxing or varargs, (2) with boxing/unboxing, (3) with varargs. Among applicable methods, the most-specific overload wins. For LedgerPostingService: an int literal prefers settle(long) via widening in phase 1. An Integer prefers settle(long) via unboxing in phase 2 — not settle(Long), because Integer→Long is not a valid method-invocation conversion. null is applicable to settle(Long), settle(BigDecimal), and settle(String) — hence ambiguous without a cast.",
            ru: "Вызов метода в JLS выбирает перегрузку по фазам: (1) без boxing/unboxing и varargs, (2) с boxing/unboxing, (3) с varargs. Среди применимых побеждает most-specific. Для LedgerPostingService: литерал int предпочитает settle(long) через widening в фазе 1. Integer предпочитает settle(long) через unboxing в фазе 2 — не settle(Long), потому что Integer→Long не является допустимым преобразованием вызова. null применим к settle(Long), settle(BigDecimal) и settle(String) — отсюда неоднозначность без приведения."
          }
        },
        {
          id: "blk_ol_mech_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: Wrong Overload = Wrong Ledger Scale",
            ru: "⚠️ Продакшн Риск: Неверная Перегрузка = Неверный Масштаб Леджера"
          },
          content: {
            en: "settle(long/Long) posts minor units (cents). settle(BigDecimal/String) posts major units (dollars) then scales to cents. Selecting the BigDecimal path for a value that was meant as cents multiplies the ledger entry by ~100. Integer null unboxing into settle(long) throws NPE at the call site before any ledger validation runs. Unit tests with primitive longs never expose these call sites.",
            ru: "settle(long/Long) пишет минорные единицы (центы). settle(BigDecimal/String) пишет основные единицы (доллары), затем масштабирует в центы. Выбор пути BigDecimal для значения, задуманного как центы, умножает проводку примерно на 100. Unboxing null Integer в settle(long) бросает NPE в месте вызова до любой валидации леджера. Юнит-тесты с примитивным long эти call site не покрывают."
          }
        }
      ]
    },
    {
      id: "sec_ol_production",
      category: "PRODUCTION_USE",
      title: {
        en: "3. Production Fix: Named Methods, Not Ambiguous Overloads",
        ru: "3. Продакшн-Фикс: Именованные Методы, Не Неоднозначные Перегрузки"
      },
      blocks: [
        {
          id: "blk_ol_prod_1",
          type: "PARAGRAPH",
          content: {
            en: "Effective Java Item 41: use overloading sparingly. Consolidate LedgerPostingService to settleCents(long cents) and settleDecimal(BigDecimal amount) — optionally settleDecimal(String) that parses explicitly. Reject null at API boundaries with Objects.requireNonNull or Optional. Never expose parallel long/Long/BigDecimal/String overloads that encode different monetary scales under the same name.",
            ru: "Effective Java Item 41: используйте перегрузку умеренно. Сведите LedgerPostingService к settleCents(long cents) и settleDecimal(BigDecimal amount) — опционально settleDecimal(String) с явным парсингом. Отклоняйте null на границах API через Objects.requireNonNull или Optional. Никогда не экспонируйте параллельные перегрузки long/Long/BigDecimal/String с разным денежным масштабом под одним именем."
          }
        },
        {
          id: "blk_ol_prod_2",
          type: "CALLOUT",
          title: {
            en: "🔍 Interview Note: List.remove(int) vs remove(Object)",
            ru: "🔍 Заметка для Интервью: List.remove(int) vs remove(Object)"
          },
          content: {
            en: "The JDK's List.remove(int index) vs remove(Object) is the canonical autoboxing overload trap: list.remove(Integer.valueOf(1)) can remove index 1 after unboxing instead of the element equal to 1. Use it as a parallel to LedgerPostingService.settle — then pivot back to cents vs decimal scale risk in financial APIs.",
            ru: "List.remove(int index) vs remove(Object) в JDK — каноническая ловушка автобоксинга: list.remove(Integer.valueOf(1)) может удалить индекс 1 после unboxing вместо элемента, равного 1. Используйте как параллель к LedgerPostingService.settle — затем возвращайтесь к риску масштаба центов vs decimal в финансовых API."
          }
        }
      ]
    },
    {
      id: "sec_ol_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions (12 Questions)",
        ru: "4. Вопросы Senior-Интервью для Закрепления (12 Вопросов)"
      },
      blocks: [
        {
          id: "blk_ol_fu_01",
          type: "CALLOUT",
          title: { en: "Q1: Overloading vs overriding in one sentence each", ru: "Q1: Перегрузка vs переопределение — по одному предложению" },
          content: {
            en: "Model Answer: Overloading — same name, different parameter lists, chosen by the compiler from static argument types. Overriding — subclass replaces an instance method; the JVM dispatches on the runtime type of the receiver.",
            ru: "Ответ: Перегрузка — одно имя, разные параметры, выбор компилятором по статическим типам аргументов. Переопределение — подкласс заменяет instance-метод; JVM диспетчеризует по runtime-типу получателя."
          }
        },
        {
          id: "blk_ol_fu_02",
          type: "CALLOUT",
          title: { en: "Q2: Which settle overload does settle(null) select?", ru: "Q2: Какую перегрузку settle выбирает settle(null)?" },
          content: {
            en: "Model Answer: None safely — null is applicable to settle(Long), settle(BigDecimal), and settle(String), so the call is ambiguous at compile time unless the programmer casts. settle(long) is not applicable because primitives cannot hold null.",
            ru: "Ответ: Ни одну безопасно — null применим к settle(Long), settle(BigDecimal) и settle(String), поэтому вызов неоднозначен на этапе компиляции без приведения. settle(long) неприменим, потому что примитивы не хранят null."
          }
        },
        {
          id: "blk_ol_fu_03",
          type: "CALLOUT",
          title: { en: "Q3: Why does Integer pick settle(long) instead of settle(Long)?", ru: "Q3: Почему Integer выбирает settle(long), а не settle(Long)?" },
          content: {
            en: "Model Answer: Integer→long is a valid unboxing (+ widening) conversion in phase 2. Integer→Long is not a method-invocation conversion — different wrapper types do not convert to each other. So settle(long) is the applicable overload; a null Integer NPEs on unboxing.",
            ru: "Ответ: Integer→long — допустимое unboxing (+ widening) преобразование в фазе 2. Integer→Long не является преобразованием вызова — разные wrapper-типы друг в друга не конвертируются. Значит применима settle(long); null Integer даёт NPE при unboxing."
          }
        },
        {
          id: "blk_ol_fu_04",
          type: "CALLOUT",
          title: { en: "Q4: What are the three JLS overload resolution phases?", ru: "Q4: Каковы три фазы разрешения перегрузок в JLS?" },
          content: {
            en: "Model Answer: Phase 1 — strict invocation (no boxing/unboxing, no varargs). Phase 2 — loose invocation (boxing/unboxing allowed). Phase 3 — variable-arity (varargs). The compiler stops at the first phase that finds applicable methods, then applies most-specific.",
            ru: "Ответ: Фаза 1 — строгий вызов (без boxing/unboxing и varargs). Фаза 2 — свободный (boxing/unboxing разрешён). Фаза 3 — переменная арность (varargs). Компилятор останавливается на первой фазе с применимыми методами, затем применяет most-specific."
          }
        },
        {
          id: "blk_ol_fu_05",
          type: "CALLOUT",
          title: { en: "Q5: How can the wrong overload corrupt ledger amounts?", ru: "Q5: Как неверная перегрузка портит суммы леджера?" },
          content: {
            en: "Model Answer: If settle(long) means cents and settle(BigDecimal) means dollars, resolving a cents-intended value onto the BigDecimal path scales incorrectly (often ~100×). Same name, different monetary unit — overload sets must not encode conflicting domain semantics.",
            ru: "Ответ: Если settle(long) — центы, а settle(BigDecimal) — доллары, разрешение центового значения в путь BigDecimal масштабирует неверно (часто ~100×). Одно имя, разные денежные единицы — набор перегрузок не должен кодировать конфликтующую доменную семантику."
          }
        },
        {
          id: "blk_ol_fu_06",
          type: "CALLOUT",
          title: { en: "Q6: What does Effective Java Item 41 recommend?", ru: "Q6: Что рекомендует Effective Java Item 41?" },
          content: {
            en: "Model Answer: Use overloading sparingly. Prefer distinct method names when parameter types are related or when overloads would confuse callers — especially across primitives, wrappers, and types with different conversions.",
            ru: "Ответ: Используйте перегрузку умеренно. Предпочитайте разные имена методов, когда типы параметров связаны или перегрузки путают вызывающий код — особенно между примитивами, wrapper и типами с разными преобразованиями."
          }
        },
        {
          id: "blk_ol_fu_07",
          type: "CALLOUT",
          title: { en: "Q7: How would you redesign LedgerPostingService?", ru: "Q7: Как перепроектировать LedgerPostingService?" },
          content: {
            en: "Model Answer: settleCents(long cents) and settleDecimal(BigDecimal amount). Optionally parse via settleDecimal(String) only if naming stays explicit. Remove settle(Long)/settle(null)-ambiguous overloads; require non-null at the boundary.",
            ru: "Ответ: settleCents(long cents) и settleDecimal(BigDecimal amount). Опционально settleDecimal(String) при явном имени. Убрать settle(Long)/null-неоднозначные перегрузки; требовать non-null на границе."
          }
        },
        {
          id: "blk_ol_fu_08",
          type: "CALLOUT",
          title: { en: "Q8: How is List.remove related to this bug class?", ru: "Q8: Как List.remove связан с этим классом багов?" },
          content: {
            en: "Model Answer: List has remove(int) and remove(Object). Passing an Integer often selects remove(int) via unboxing — removing by index, not by element. Same mechanism as Integer selecting settle(long): compile-time conversion beats the 'obvious' wrapper overload.",
            ru: "Ответ: У List есть remove(int) и remove(Object). Передача Integer часто выбирает remove(int) через unboxing — удаление по индексу, не по элементу. Тот же механизм, что Integer→settle(long): compile-time преобразование побеждает 'очевидную' wrapper-перегрузку."
          }
        },
        {
          id: "blk_ol_fu_09",
          type: "CALLOUT",
          title: { en: "Q9: Does @Override help with overloading bugs?", ru: "Q9: Помогает ли @Override при багах перегрузки?" },
          content: {
            en: "Model Answer: @Override catches accidental overloading when you meant to override (e.g. equals(MyType) vs equals(Object)). It does not help choose among intentional overloads like settle(long) vs settle(BigDecimal) — those need API design and named methods.",
            ru: "Ответ: @Override ловит случайную перегрузку, когда вы хотели override (например equals(MyType) vs equals(Object)). Он не помогает выбрать среди намеренных перегрузок settle(long) vs settle(BigDecimal) — тут нужны дизайн API и именованные методы."
          }
        },
        {
          id: "blk_ol_fu_10",
          type: "CALLOUT",
          title: { en: "Q10: Why did unit tests miss the ledger skew?", ru: "Q10: Почему юнит-тесты пропустили искажение леджера?" },
          content: {
            en: "Model Answer: Tests called settle(1000L) or settle(1000) — primitive paths that unambiguously hit settle(long). Production DTOs used Integer/Long/null/String. Overload bugs hide when tests never exercise the static types present in production call sites.",
            ru: "Ответ: Тесты вызывали settle(1000L) или settle(1000) — примитивные пути однозначно в settle(long). Продакшн-DTO использовали Integer/Long/null/String. Баги перегрузки скрываются, когда тесты не упражняют статические типы реальных call site."
          }
        },
        {
          id: "blk_ol_fu_11",
          type: "CALLOUT",
          title: { en: "Q11: What is the most-specific method rule?", ru: "Q11: Что такое правило most-specific method?" },
          content: {
            en: "Model Answer: When multiple overloads are applicable in the same phase, the compiler picks the most specific — roughly, the one whose parameter types can be converted to the others' but not vice versa. If neither is more specific (e.g. Long vs BigDecimal for null), the call is ambiguous.",
            ru: "Ответ: Когда несколько перегрузок применимы в одной фазе, компилятор выбирает наиболее специфичную — ту, чьи типы параметров можно преобразовать к другим, но не наоборот. Если ни одна не специфичнее (например Long vs BigDecimal для null), вызов неоднозначен."
          }
        },
        {
          id: "blk_ol_fu_12",
          type: "CALLOUT",
          title: { en: "Q12: Design a type-safe posting API for cents and decimals", ru: "Q12: Спроектируйте type-safe posting API для центов и decimal" },
          content: {
            en: "Model Answer: Separate types or names: MoneyCents record + settleCents, or MoneyDecimal + settleDecimal. Avoid one settle name with mixed scales. Prefer compile-time clarity over convenience overloading — financial incorrectness is worse than an extra method name.",
            ru: "Ответ: Разделите типы или имена: record MoneyCents + settleCents, или MoneyDecimal + settleDecimal. Избегайте одного имени settle со смешанными масштабами. Предпочитайте ясность на этапе компиляции удобной перегрузке — финансовая ошибка хуже лишнего имени метода."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_jls_15_12_method_invocation", "src_effective_java_item41", "src_baeldung_overloading"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#overloading", "#compile-time", "#autoboxing", "#ledger", "#jls"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OVERLOADING: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ol_1",
    theoryArticleId: "art_theory_overloading",
    question: {
      en: "When is the target overload of LedgerPostingService.settle(...) chosen?",
      ru: "Когда выбирается целевая перегрузка LedgerPostingService.settle(...)?"
    },
    explanation: {
      en: "Overload resolution happens at compile time based on static argument types (JLS §15.12), not at runtime based on the object's dynamic type.",
      ru: "Разрешение перегрузок происходит на этапе компиляции по статическим типам аргументов (JLS §15.12), а не в рантайме по динамическому типу объекта."
    },
    options: [
      {
        id: "opt_ol1_a",
        text: {
          en: "At runtime by the JVM based on the dynamic type of the amount argument.",
          ru: "В рантайме JVM по динамическому типу аргумента amount."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Runtime dispatch applies to overriding the receiver's method, not to choosing among overloads of settle.",
          ru: "Неверно. Runtime-диспетчеризация относится к override метода получателя, а не к выбору перегрузки settle."
        },
        misconceptionId: "err_overload_is_runtime"
      },
      {
        id: "opt_ol1_b",
        text: {
          en: "At compile time by the compiler using static argument types, applicability phases, and most-specific rules.",
          ru: "На этапе компиляции по статическим типам аргументов, фазам применимости и правилам most-specific."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Overloading is a compile-time decision; overriding is the runtime one.",
          ru: "Верно! Перегрузка — решение compile-time; переопределение — runtime."
        }
      },
      {
        id: "opt_ol1_c",
        text: {
          en: "At class-loading time by linking all settle methods into a single vtable slot.",
          ru: "При загрузке класса через связывание всех settle в один слот vtable."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Overloads are distinct methods with distinct descriptors; they are not merged into one vtable slot.",
          ru: "Неверно. Перегрузки — разные методы с разными дескрипторами; они не сливаются в один слот vtable."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_ol_2",
    theoryArticleId: "art_theory_overloading",
    question: {
      en: "Why is settle(null) problematic for LedgerPostingService's four overloads?",
      ru: "Почему settle(null) проблемен для четырёх перегрузок LedgerPostingService?"
    },
    explanation: {
      en: "null is applicable to Long, BigDecimal, and String overloads, making the call ambiguous; long is not applicable.",
      ru: "null применим к перегрузкам Long, BigDecimal и String, делая вызов неоднозначным; long неприменим."
    },
    options: [
      {
        id: "opt_ol2_a",
        text: {
          en: "Because null always selects settle(long) and posts zero cents silently.",
          ru: "Потому что null всегда выбирает settle(long) и молча пишет ноль центов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Primitive long cannot accept null — settle(long) is not applicable.",
          ru: "Неверно. Примитивный long не принимает null — settle(long) неприменим."
        }
      },
      {
        id: "opt_ol2_b",
        text: {
          en: "Because null is applicable to settle(Long), settle(BigDecimal), and settle(String), so the call is compile-time ambiguous without a cast.",
          ru: "Потому что null применим к settle(Long), settle(BigDecimal) и settle(String), поэтому вызов неоднозначен на этапе компиляции без приведения."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Reference overloads compete for null; the compiler cannot pick a most-specific winner.",
          ru: "Верно! Reference-перегрузки конкурируют за null; компилятор не может выбрать most-specific победителя."
        }
      },
      {
        id: "opt_ol2_c",
        text: {
          en: "Because null is a runtime-only value and overloading cannot see it until the JVM executes.",
          ru: "Потому что null существует только в рантайме, и перегрузка не видит его до выполнения JVM."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. null has a compile-time type (the null type) and participates in overload resolution immediately.",
          ru: "Неверно. У null есть compile-time тип (null type), и он сразу участвует в разрешении перегрузок."
        },
        misconceptionId: "err_null_overload_ok"
      }
    ],
    order: 2
  },
  {
    id: "chk_ol_3",
    theoryArticleId: "art_theory_overloading",
    question: {
      en: "What is the production-safe fix for ambiguous settle overloads with mixed cents/decimal semantics?",
      ru: "Какое безопасное решение для неоднозначных перегрузок settle со смешанной семантикой центов/decimal?"
    },
    explanation: {
      en: "Replace ambiguous settle overloads with explicitly named methods such as settleCents and settleDecimal.",
      ru: "Заменить неоднозначные перегрузки settle явно именованными методами settleCents и settleDecimal."
    },
    options: [
      {
        id: "opt_ol3_a",
        text: {
          en: "Keep the overloads but document in Javadoc which argument types map to cents vs dollars.",
          ru: "Оставить перегрузки, но задокументировать в Javadoc, какие типы аргументов — центы, а какие — доллары."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Documentation does not change compile-time resolution or prevent 100× ledger skew.",
          ru: "Неверно. Документация не меняет compile-time разрешение и не предотвращает искажение леджера в 100 раз."
        },
        misconceptionId: "err_document_overloads_enough"
      },
      {
        id: "opt_ol3_b",
        text: {
          en: "Consolidate the API to named methods (settleCents, settleDecimal) and avoid null-ambiguous reference overloads.",
          ru: "Свести API к именованным методам (settleCents, settleDecimal) и избегать null-неоднозначных reference-перегрузок."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Explicit names encode monetary scale in the API and eliminate ambiguous overload sets.",
          ru: "Верно! Явные имена кодируют денежный масштаб в API и устраняют неоднозначные наборы перегрузок."
        }
      },
      {
        id: "opt_ol3_c",
        text: {
          en: "Make all settle methods synchronized so the JVM picks the overload under a monitor.",
          ru: "Сделать все settle synchronized, чтобы JVM выбирала перегрузку под монитором."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Synchronization does not affect overload resolution — that remains a compile-time decision.",
          ru: "Неверно. Синхронизация не влияет на разрешение перегрузок — это по-прежнему решение compile-time."
        }
      }
    ],
    order: 3
  }
];
