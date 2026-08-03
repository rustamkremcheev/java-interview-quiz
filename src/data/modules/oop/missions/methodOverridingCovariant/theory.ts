import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_OVERRIDING_COVARIANT: TheoryArticle = {
  id: "art_theory_overriding_covariant",
  topicIds: ["top_oop_15"],
  conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
  title: {
    en: "Method Overriding, @Override Validation & Covariant Returns",
    ru: "Переопределение Методов, Валидация @Override и Ковариантные Возвраты"
  },
  summary: {
    en: "JLS 8.4.8 defines when a subclass method overrides a superclass method. Accidental signature mismatches without @Override silently create overloads — polymorphic InvoiceRepository callers never reach CorporateInvoice enrichment. Covariant returns and checked-exception narrowing are legal; broader exceptions and reduced visibility are not.",
    ru: "JLS 8.4.8 определяет, когда метод подкласса переопределяет метод суперкласса. Случайные расхождения сигнатуры без @Override тихо создают перегрузки — полиморфные вызывающие через InvoiceRepository никогда не достигают обогащения CorporateInvoice. Ковариантные возвраты и сужение checked-исключений легальны; более широкие исключения и сужение видимости — нет."
  },
  sections: [
    {
      id: "sec_ov_definition",
      category: "DEFINITION",
      title: {
        en: "1. Overriding vs Overloading in Invoice Repositories",
        ru: "1. Переопределение vs Перегрузка в Invoice-Репозиториях"
      },
      blocks: [
        {
          id: "blk_ov_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Method overriding replaces a superclass instance method with a subclass implementation that has an override-equivalent signature. At runtime, `invokevirtual` dispatches to the most specific override based on the object's dynamic type. Method overloading declares multiple methods with the same name but different parameter lists; the compiler picks the target at compile time from the static reference type and argument types.",
            ru: "Переопределение метода заменяет instance-метод суперкласса реализацией подкласса с override-equivalent сигнатурой. В runtime `invokevirtual` направляет вызов к наиболее специфичному override по динамическому типу объекта. Перегрузка объявляет несколько методов с одним именем, но разными списками параметров; компилятор выбирает цель на этапе компиляции по статическому типу ссылки и типам аргументов."
          }
        },
        {
          id: "blk_ov_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Silent Overload Disaster",
            ru: "💡 Главная Ментальная Модель: Катастрофа Тихой Перегрузки"
          },
          content: {
            en: "In the invoice billing service, `InvoiceRepository.findById(String)` returns `Invoice`. A developer on `CorporateInvoiceRepository` wrote `findById(InvoiceKey)` intending a covariant override returning `CorporateInvoice`. Without `@Override`, javac accepted the declaration as a new overload. Calls of the form `InvoiceRepository repo = new CorporateInvoiceRepository(); repo.findById(id)` still invoke the parent method — corporate tax residency enrichment never runs.",
            ru: "В сервисе биллинга `InvoiceRepository.findById(String)` возвращает `Invoice`. Разработчик в `CorporateInvoiceRepository` написал `findById(InvoiceKey)`, намереваясь ковариантный override с возвратом `CorporateInvoice`. Без `@Override` javac принял объявление как новую перегрузку. Вызовы вида `InvoiceRepository repo = new CorporateInvoiceRepository(); repo.findById(id)` по-прежнему вызывают метод родителя — обогащение tax residency никогда не выполняется."
          }
        }
      ]
    },
    {
      id: "sec_ov_jls_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. JLS 8.4.8: Override Rules, @Override, Exceptions, Covariant Returns",
        ru: "2. JLS 8.4.8: Правила Override, @Override, Исключения, Ковариантные Возвраты"
      },
      blocks: [
        {
          id: "blk_ov_jls_1",
          type: "PARAGRAPH",
          content: {
            en: "JLS Section 8.4.8 ('Inheritance, Overriding, and Hiding') requires an override-equivalent signature: same name and compatible parameter types after type erasure. The return type may be covariant — a subtype of the overridden method's return type (Java 5+). Access may stay the same or widen (e.g., protected → public) but must never narrow. Checked exceptions in the override may only be the same, fewer, or subtypes of those declared by the parent — never broader (e.g., `throws Exception` when the parent declares `throws InvoiceNotFoundException`).",
            ru: "JLS Раздел 8.4.8 ('Наследование, Переопределение и Сокрытие') требует override-equivalent сигнатуру: то же имя и совместимые типы параметров после type erasure. Возвращаемый тип может быть ковариантным — подтипом возвращаемого типа переопределяемого метода (Java 5+). Видимость может остаться той же или расшириться (например, protected → public), но никогда не сужаться. Checked-исключения в override могут быть только теми же, меньшим числом или подтипами объявленных родителем — никогда более широкими (например, `throws Exception` при `throws InvoiceNotFoundException` у родителя)."
          }
        },
        {
          id: "blk_ov_jls_2",
          type: "WARNING",
          title: {
            en: "⚙️ Effective Java Item 40: Always Use @Override",
            ru: "⚙️ Effective Java Item 40: Всегда Используйте @Override"
          },
          content: {
            en: "`@Override` forces the compiler to verify that a method truly overrides a superclass or interface method. If the signature is wrong — typo in the name, wrong parameter type, accidental overload — compilation fails immediately. Without the annotation, silent overloads compile cleanly and fail only at runtime through missing behavior. Joshua Bloch's classic example is `equals(MyClass)` vs `equals(Object)`; the invoice analogue is `findById(InvoiceKey)` vs `findById(String)`.",
            ru: "`@Override` заставляет компилятор проверить, что метод действительно переопределяет метод суперкласса или интерфейса. Если сигнатура неверна — опечатка в имени, неверный тип параметра, случайная перегрузка — компиляция падает сразу. Без аннотации тихие перегрузки компилируются чисто и ломаются только в runtime отсутствием поведения. Классический пример Bloch — `equals(MyClass)` vs `equals(Object)`; аналог в биллинге — `findById(InvoiceKey)` vs `findById(String)`."
          }
        },
        {
          id: "blk_ov_jls_3",
          type: "CALLOUT",
          title: {
            en: "📜 Valid Covariant Fix for CorporateInvoiceRepository",
            ru: "📜 Валидный Ковариантный Фикс для CorporateInvoiceRepository"
          },
          content: {
            en: "Legal override:\n```java\n@Override\npublic CorporateInvoice findById(String id) throws InvoiceNotFoundException {\n    return loadCorporateInvoice(id); // enrichment included\n}\n```\n`CorporateInvoice` is a subtype of `Invoice` (covariant return). Parameter list matches. Checked exceptions are not broadened. `@Override` proves the contract to javac.",
            ru: "Легальный override:\n```java\n@Override\npublic CorporateInvoice findById(String id) throws InvoiceNotFoundException {\n    return loadCorporateInvoice(id); // enrichment included\n}\n```\n`CorporateInvoice` — подтип `Invoice` (ковариантный возврат). Список параметров совпадает. Checked-исключения не расширены. `@Override` доказывает контракт компилятору."
          }
        }
      ]
    },
    {
      id: "sec_ov_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Production Trade-offs: Covariant Repositories vs Explicit APIs",
        ru: "3. Продакшн Компромиссы: Ковариантные Репозитории vs Явные API"
      },
      blocks: [
        {
          id: "blk_ov_res_1",
          type: "PARAGRAPH",
          content: {
            en: "Covariant returns let callers holding a `CorporateInvoiceRepository` reference avoid casts when they need tax residency fields. Callers holding only `InvoiceRepository` still see `Invoice` and remain binary-compatible. The cost: inheritance couples corporate enrichment to the base repository lifecycle, and any future signature change in the base class silently breaks overrides that omit `@Override`.",
            ru: "Ковариантные возвраты позволяют вызывающим со ссылкой `CorporateInvoiceRepository` избежать кастов при доступе к tax residency. Вызывающие только с `InvoiceRepository` по-прежнему видят `Invoice` и остаются бинарно совместимыми. Цена: наследование связывает corporate-обогащение с жизненным циклом базового репозитория, а любое будущее изменение сигнатуры базового класса тихо ломает overrides без `@Override`."
          }
        },
        {
          id: "blk_ov_res_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Alternative: Explicit Corporate Lookup Port",
            ru: "🔧 Альтернатива: Явный Corporate Lookup Port"
          },
          content: {
            en: "Senior designs sometimes avoid deep repository inheritance entirely: keep `InvoiceRepository.findById` returning `Invoice`, and expose a separate `CorporateInvoiceLookup.findCorporateById(String)` port. No covariant override risk, clearer API intent, slightly more surface area. Choose inheritance + `@Override` when the subtype truly is a behavioral specialization; choose a separate port when enrichment is a different use case.",
            ru: "Senior-дизайн иногда полностью избегает глубокого наследования репозиториев: оставляют `InvoiceRepository.findById` с возвратом `Invoice` и выносят отдельный порт `CorporateInvoiceLookup.findCorporateById(String)`. Нет риска ковариантного override, яснее намерение API, чуть больше поверхности. Выбирайте наследование + `@Override`, когда подтип — истинная поведенческая специализация; отдельный порт — когда обогащение является другим use case."
          }
        }
      ]
    },
    {
      id: "sec_ov_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Overriding & Covariant Returns",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Переопределение и Ковариантные Возвраты"
      },
      blocks: [
        {
          id: "blk_ov_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why does Effective Java Item 40 insist on @Override for every override?' — Model Answer: Because signature mistakes compile as overloads without it. The annotation turns a silent runtime behavior bug into a compile-time error. In InvoiceRepository hierarchies, that is the difference between missing corporate enrichment in production and a failed CI build.",
            ru: "Доп. Вопрос 1: 'Почему Effective Java Item 40 настаивает на @Override для каждого override?' — Модельный Ответ: Потому что ошибки сигнатуры без неё компилируются как перегрузки. Аннотация превращает тихий runtime-баг поведения в ошибку компиляции. В иерархиях InvoiceRepository это разница между отсутствием corporate-обогащения на продакшене и упавшим CI."
          }
        },
        {
          id: "blk_ov_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Is returning CorporateInvoice from an override of findById that returns Invoice legal?' — Model Answer: Yes — covariant return types (Java 5+). The subclass return type must be a subtype of the superclass return type. Callers using the subclass type get CorporateInvoice; callers using InvoiceRepository still see Invoice.",
            ru: "Доп. Вопрос 2: 'Легально ли возвращать CorporateInvoice из override findById, который возвращает Invoice?' — Модельный Ответ: Да — ковариантные возвращаемые типы (Java 5+). Тип возврата подкласса должен быть подтипом типа возврата суперкласса. Вызывающие с типом подкласса получают CorporateInvoice; с InvoiceRepository по-прежнему видят Invoice."
          }
        },
        {
          id: "blk_ov_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Can the override change findById(String) to findById(InvoiceKey)?' — Model Answer: No for overriding. That is a different parameter type, so it overloads. Polymorphic dispatch will not select it. Fix the parameter list to match String (or change the base API intentionally and update all call sites).",
            ru: "Доп. Вопрос 3: 'Может ли override сменить findById(String) на findById(InvoiceKey)?' — Модельный Ответ: Нет для переопределения. Это другой тип параметра — перегрузка. Полиморфная диспетчеризация его не выберет. Исправьте список параметров на String (или намеренно меняйте базовый API и все call sites)."
          }
        },
        {
          id: "blk_ov_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Parent throws InvoiceNotFoundException. Can the override throw Exception?' — Model Answer: No. Broadening checked exceptions is illegal. The override may throw InvoiceNotFoundException, a subtype, or declare no checked exceptions. Unchecked exceptions (RuntimeException) are unconstrained by this rule but still part of the behavioral contract.",
            ru: "Доп. Вопрос 4: 'Родитель бросает InvoiceNotFoundException. Может ли override бросать Exception?' — Модельный Ответ: Нет. Расширение checked-исключений незаконно. Override может бросать InvoiceNotFoundException, подтип или не объявлять checked-исключений. Unchecked (RuntimeException) этим правилом не ограничены, но всё ещё часть поведенческого контракта."
          }
        },
        {
          id: "blk_ov_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Can you override a public method as protected?' — Model Answer: No. Visibility cannot be reduced. You may widen (protected → public) but not narrow (public → protected/package-private/private).",
            ru: "Доп. Вопрос 5: 'Можно ли переопределить public-метод как protected?' — Модельный Ответ: Нет. Видимость нельзя сужать. Можно расширять (protected → public), но не сужать (public → protected/package-private/private)."
          }
        },
        {
          id: "blk_ov_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'What happens if CorporateInvoiceRepository.findById is static?' — Model Answer: Static methods hide, they do not override. Resolution is compile-time by reference type. InvoiceRepository repo = corporateRepo; repo.findById(id) still calls the parent's static method if both are static — no polymorphic enrichment.",
            ru: "Доп. Вопрос 6: 'Что если CorporateInvoiceRepository.findById static?' — Модельный Ответ: Static-методы скрывают, а не переопределяют. Разрешение — compile-time по типу ссылки. InvoiceRepository repo = corporateRepo; repo.findById(id) вызовет static родителя, если оба static — без полиморфного обогащения."
          }
        },
        {
          id: "blk_ov_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Does @Override work for interface method implementations?' — Model Answer: Yes. Since Java 6, @Override is valid when implementing interface methods. Use it for repository interfaces too — a typo in an implementing class becomes a compile error instead of an abstract leftover or accidental overload.",
            ru: "Доп. Вопрос 7: 'Работает ли @Override для реализаций методов интерфейса?' — Модельный Ответ: Да. С Java 6 @Override валиден при реализации методов интерфейса. Используйте и для repository-интерфейсов — опечатка в реализующем классе станет ошибкой компиляции вместо abstract leftover или случайной перегрузки."
          }
        },
        {
          id: "blk_ov_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How does bridge method generation relate to covariant returns?' — Model Answer: The compiler emits a synthetic bridge method returning Invoice that delegates to the CorporateInvoice override, preserving binary compatibility for callers compiled against the parent signature while still exposing the covariant method to subclass-typed callers.",
            ru: "Доп. Вопрос 8: 'Как bridge-методы связаны с ковариантными возвратами?' — Модельный Ответ: Компилятор генерирует synthetic bridge-метод, возвращающий Invoice и делегирующий в CorporateInvoice override, сохраняя бинарную совместимость для вызывающих, скомпилированных против родительской сигнатуры, и одновременно отдавая ковариантный метод вызывающим с типом подкласса."
          }
        },
        {
          id: "blk_ov_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can final methods be overridden?' — Model Answer: No. A final instance method cannot be overridden. Attempting @Override on a same-signature method in a subclass is a compile error. Use final on InvoiceRepository helpers that must not be specialized.",
            ru: "Доп. Вопрос 9: 'Можно ли переопределять final-методы?' — Модельный Ответ: Нет. Final instance-метод нельзя переопределить. Попытка @Override с той же сигнатурой в подклассе — ошибка компиляции. Помечайте final хелперы InvoiceRepository, которые не должны специализироваться."
          }
        },
        {
          id: "blk_ov_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Overloading vs overriding — which is resolved when?' — Model Answer: Overloading is compile-time (static) resolution based on reference type and argument types. Overriding is runtime (dynamic) dispatch based on the object's class. Mixing them without @Override is the classic senior trap.",
            ru: "Доп. Вопрос 10: 'Перегрузка vs переопределение — что когда разрешается?' — Модельный Ответ: Перегрузка — compile-time (статическое) разрешение по типу ссылки и аргументам. Переопределение — runtime (динамическая) диспетчеризация по классу объекта. Их смешение без @Override — классическая Senior-ловушка."
          }
        },
        {
          id: "blk_ov_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'How would you catch this class of bug in CI?' — Model Answer: Mandate @Override via Checkstyle/Error Prone/ArchUnit-adjacent lint rules; add a polymorphic integration test: InvoiceRepository repo = new CorporateInvoiceRepository(); assertThat(repo.findById(id)).isInstanceOf(CorporateInvoice.class) and assert enrichment fields.",
            ru: "Доп. Вопрос 11: 'Как поймать этот класс багов в CI?' — Модельный Ответ: Обязательный @Override через Checkstyle/Error Prone; полиморфный интеграционный тест: InvoiceRepository repo = new CorporateInvoiceRepository(); assertThat(repo.findById(id)).isInstanceOf(CorporateInvoice.class) и проверка enrichment-полей."
          }
        },
        {
          id: "blk_ov_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'When would you reject covariant repository inheritance in design review?' — Model Answer: When corporate enrichment is not a behavioral specialization of the base find contract, or when callers need guaranteed CorporateInvoice without depending on runtime type. Prefer an explicit CorporateInvoiceLookup port over deep inheritance that invites silent overload bugs.",
            ru: "Доп. Вопрос 12: 'Когда отклонить ковариантное наследование репозитория на дизайн-ревью?' — Модельный Ответ: Когда corporate-обогащение не является поведенческой специализацией базового find-контракта, или когда вызывающим нужен гарантированный CorporateInvoice без зависимости от runtime-типа. Предпочитайте явный порт CorporateInvoiceLookup глубокому наследованию, провоцирующему тихие перегрузки."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_liskov_substitution"],
  sourceIds: ["src_jls_848_overriding", "src_effective_java_item40", "src_oracle_overriding_tutorial"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#overriding", "#covariant-returns", "#override-annotation", "#jls-848"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OVERRIDING_COVARIANT: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ov_1",
    theoryArticleId: "art_theory_overriding_covariant",
    question: {
      en: "Why did CorporateInvoiceRepository.findById(InvoiceKey) fail to run under an InvoiceRepository reference?",
      ru: "Почему CorporateInvoiceRepository.findById(InvoiceKey) не выполнялся через ссылку InvoiceRepository?"
    },
    explanation: {
      en: "Different parameter types make the method an overload, not an override — polymorphic dispatch still hits the parent findById(String).",
      ru: "Разные типы параметров делают метод перегрузкой, а не override — полиморфная диспетчеризация по-прежнему попадает в родительский findById(String)."
    },
    options: [
      {
        id: "opt_ov1_a",
        text: {
          en: "The parameter type mismatch created a silent overload instead of an override.",
          ru: "Расхождение типа параметра создало тихую перегрузку вместо переопределения."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Without @Override and with InvoiceKey vs String, javac never wired polymorphic dispatch to the corporate method.",
          ru: "Верно! Без @Override и с InvoiceKey vs String javac никогда не связал полиморфную диспетчеризацию с corporate-методом."
        }
      },
      {
        id: "opt_ov1_b",
        text: {
          en: "Covariant returns are illegal in Java, so the JVM ignored the subclass method.",
          ru: "Ковариантные возвраты незаконны в Java, поэтому JVM игнорировала метод подкласса."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Covariant returns are legal since Java 5. The bug is the parameter mismatch / missing override.",
          ru: "Неверно. Ковариантные возвраты легальны с Java 5. Баг — расхождение параметра / отсутствие override."
        },
        misconceptionId: "err_covariant_return_confused_with_param"
      },
      {
        id: "opt_ov1_c",
        text: {
          en: "InvoiceRepository is final, so subclasses cannot specialize findById.",
          ru: "InvoiceRepository final, поэтому подклассы не могут специализировать findById."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The base repository is not final in this scenario — the method was overloaded, not blocked by final.",
          ru: "Неверно. Базовый репозиторий в сценарии не final — метод был перегружен, а не заблокирован final."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_ov_2",
    theoryArticleId: "art_theory_overriding_covariant",
    question: {
      en: "Which return type is legal when overriding Invoice findById(String)?",
      ru: "Какой возвращаемый тип легален при переопределении Invoice findById(String)?"
    },
    explanation: {
      en: "Covariant returns allow a subtype: CorporateInvoice extends Invoice.",
      ru: "Ковариантные возвраты допускают подтип: CorporateInvoice extends Invoice."
    },
    options: [
      {
        id: "opt_ov2_a",
        text: {
          en: "CorporateInvoice — a subtype of Invoice (covariant return).",
          ru: "CorporateInvoice — подтип Invoice (ковариантный возврат)."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Return type substitutability allows CorporateInvoice while preserving InvoiceRepository substitutability.",
          ru: "Верно! Подставляемость возвращаемого типа допускает CorporateInvoice с сохранением подставляемости InvoiceRepository."
        }
      },
      {
        id: "opt_ov2_b",
        text: {
          en: "Object — any supertype of Invoice is always allowed.",
          ru: "Object — любой супертип Invoice всегда разрешён."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Contravariant/wider returns are illegal. Only same type or a subtype is allowed.",
          ru: "Неверно. Контравариантные/более широкие возвраты незаконны. Разрешён только тот же тип или подтип."
        }
      },
      {
        id: "opt_ov2_c",
        text: {
          en: "List<Invoice> — collections of Invoice are covariant-compatible.",
          ru: "List<Invoice> — коллекции Invoice ковариантно совместимы."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. List<Invoice> is not a subtype of Invoice for return-type substitutability purposes.",
          ru: "Неверно. List<Invoice> не является подтипом Invoice для целей подставляемости возвращаемого типа."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_ov_3",
    theoryArticleId: "art_theory_overriding_covariant",
    question: {
      en: "Parent findById throws InvoiceNotFoundException. Which throws clause is illegal on the override?",
      ru: "Родительский findById бросает InvoiceNotFoundException. Какой throws на override незаконен?"
    },
    explanation: {
      en: "Broader checked exceptions such as throws Exception violate JLS override rules.",
      ru: "Более широкие checked-исключения вроде throws Exception нарушают правила override JLS."
    },
    options: [
      {
        id: "opt_ov3_a",
        text: {
          en: "throws Exception — broader checked exception than the parent declares.",
          ru: "throws Exception — более широкое checked-исключение, чем объявил родитель."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Overrides may narrow or omit checked exceptions, never broaden them.",
          ru: "Верно! Override может сужать или опускать checked-исключения, но никогда расширять."
        },
        misconceptionId: "err_broader_checked_exception_override"
      },
      {
        id: "opt_ov3_b",
        text: {
          en: "throws InvoiceNotFoundException — same checked exception as the parent.",
          ru: "throws InvoiceNotFoundException — то же checked-исключение, что у родителя."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — this is legal. Same checked exception as the parent is always allowed.",
          ru: "Неверно — это легально. То же checked-исключение, что у родителя, всегда разрешено."
        }
      },
      {
        id: "opt_ov3_c",
        text: {
          en: "No throws clause — fewer checked exceptions than the parent.",
          ru: "Без throws — меньше checked-исключений, чем у родителя."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — declaring fewer checked exceptions is legal and often desirable.",
          ru: "Неверно — объявление меньшего числа checked-исключений легально и часто желательно."
        }
      }
    ],
    order: 3
  }
];
