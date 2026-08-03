import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_STRATEGY: TheoryArticle = {
  id: "art_theory_strategy",
  topicIds: ["top_oop_26"],
  conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
  title: {
    en: "Strategy Pattern & Open-Closed Fee Calculation",
    ru: "Паттерн Strategy и Open-Closed Расчёт Комиссий"
  },
  summary: {
    en: "Strategy encapsulates interchangeable algorithms behind a common interface. Combined with Open-Closed Principle, PaymentFeeCalculator stops growing a PaymentChannel switch — new channels register FeeStrategy implementations in FeeStrategyRegistry without modifying existing fee code.",
    ru: "Strategy инкапсулирует взаимозаменяемые алгоритмы за общим интерфейсом. Вместе с Open-Closed Principle PaymentFeeCalculator перестаёт растить switch по PaymentChannel — новые каналы регистрируют реализации FeeStrategy в FeeStrategyRegistry без изменения существующего кода комиссий."
  },
  sections: [
    {
      id: "sec_st_definition",
      category: "DEFINITION",
      title: {
        en: "1. Strategy Pattern: Encapsulating Fee Algorithms",
        ru: "1. Паттерн Strategy: Инкапсуляция Алгоритмов Комиссий"
      },
      blocks: [
        {
          id: "blk_st_def_1",
          type: "PARAGRAPH",
          content: {
            en: "GoF Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. Clients depend on a Strategy interface, not on concrete formulas. In fee calculation, CARD (bps + cap), WIRE (flat + overnight surcharge), ACH (tiered), INSTANT (premium flat), and CRYPTO (volatility buffer) are separate algorithms that share the same contract: `long computeFeeCents(PaymentFeeRequest request)`.",
            ru: "GoF Strategy определяет семейство алгоритмов, инкапсулирует каждый и делает их взаимозаменяемыми. Клиенты зависят от интерфейса Strategy, а не от конкретных формул. В расчёте комиссий CARD (bps + cap), WIRE (flat + overnight surcharge), ACH (tiered), INSTANT (premium flat) и CRYPTO (volatility buffer) — отдельные алгоритмы с одним контрактом: `long computeFeeCents(PaymentFeeRequest request)`."
          }
        },
        {
          id: "blk_st_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Replace Conditionals with Polymorphism",
            ru: "💡 Главная Ментальная Модель: Заменить Условия Полиморфизмом"
          },
          content: {
            en: "A giant `switch (channel)` is procedural selection of algorithms. Strategy moves each algorithm into its own class (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy). PaymentFeeCalculator becomes a thin context: resolve strategy → delegate. Selection belongs in FeeStrategyRegistry (Map keyed by PaymentChannel), not in branching inside the calculator.",
            ru: "Гигантский `switch (channel)` — процедурная выборка алгоритмов. Strategy переносит каждый алгоритм в свой класс (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy). PaymentFeeCalculator становится тонким контекстом: найти strategy → делегировать. Выбор принадлежит FeeStrategyRegistry (Map по ключу PaymentChannel), а не ветвлению внутри калькулятора."
          }
        }
      ]
    },
    {
      id: "sec_st_ocp_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Open-Closed Principle & FeeStrategyRegistry Mechanics",
        ru: "2. Open-Closed Principle и Механика FeeStrategyRegistry"
      },
      blocks: [
        {
          id: "blk_st_ocp_1",
          type: "PARAGRAPH",
          content: {
            en: "Open-Closed Principle (OCP): software entities should be open for extension but closed for modification. When product adds CRYPTO, you should NOT reopen PaymentFeeCalculator to insert another case (and risk missing `break`). Instead, implement `CryptoFeeStrategy` and register it: `registry.register(PaymentChannel.CRYPTO, new CryptoFeeStrategy(config))`. Existing CARD/WIRE/ACH strategies and the calculator's `calculateFeeCents` body remain untouched.",
            ru: "Open-Closed Principle (OCP): программные сущности открыты для расширения и закрыты для модификации. Когда продукт добавляет CRYPTO, НЕ нужно открывать PaymentFeeCalculator для ещё одного case (и рисковать пропущенным `break`). Вместо этого реализуйте `CryptoFeeStrategy` и зарегистрируйте: `registry.register(PaymentChannel.CRYPTO, new CryptoFeeStrategy(config))`. Существующие стратегии CARD/WIRE/ACH и тело `calculateFeeCents` калькулятора не трогаются."
          }
        },
        {
          id: "blk_st_ocp_2",
          type: "WARNING",
          title: {
            en: "⚙️ Switch Fall-Through: Production feeCents Corruption",
            ru: "⚙️ Fall-Through в Switch: Порча feeCents на Продакшене"
          },
          content: {
            en: "Classic Java switch without `break` falls through. After a CRYPTO hotfix, execution continued into INSTANT (or left `feeCents` at 0). Treasury saw INSTANT free and occasional CARD double-fees where cases shared a mutable accumulator. Strategy classes return a computed `long` with no shared switch variable — fall-through disappears by construction.",
            ru: "Классический Java switch без `break` проваливается дальше. После хотфикса CRYPTO выполнение продолжилось в INSTANT (или оставило `feeCents` = 0). Казначейство видело бесплатный INSTANT и иногда двойные CARD, где case'ы делили мутабельный аккумулятор. Классы Strategy возвращают вычисленный `long` без общей switch-переменной — fall-through исчезает конструктивно."
          }
        },
        {
          id: "blk_st_ocp_3",
          type: "CALLOUT",
          title: {
            en: "📜 Registry Contract: Fail-Fast on Unknown Channel",
            ru: "📜 Контракт Registry: Fail-Fast на Неизвестном Канале"
          },
          content: {
            en: "FeeStrategyRegistry.resolve(channel) must never silently return null. Unknown PaymentChannel is a configuration bug — throw IllegalArgumentException (or IllegalStateException) so CI/integration tests catch missing registration before production bills 0 feeCents. Prefer immutable Map built at composition root; register strategies once at startup.",
            ru: "FeeStrategyRegistry.resolve(channel) никогда не должен молча возвращать null. Неизвестный PaymentChannel — ошибка конфигурации: бросайте IllegalArgumentException (или IllegalStateException), чтобы CI/интеграционные тесты ловили отсутствующую регистрацию до того, как продакшен выставит 0 feeCents. Предпочитайте immutable Map, собранный в composition root; регистрируйте стратегии один раз при старте."
          }
        }
      ]
    },
    {
      id: "sec_st_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Strategy Registry vs Switch vs Functional Map",
        ru: "3. Компромиссы: Strategy Registry vs Switch vs Functional Map"
      },
      blocks: [
        {
          id: "blk_st_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Strategy + class-per-algorithm adds types and wiring boilerplate. For 2–3 stable channels with trivial formulas, a well-tested switch may be acceptable. Past ~4 channels with divergent rules (overnight wire cutoffs, ACH tiers, crypto buffers), Strategy wins: independent unit tests per strategy, parallel team ownership, and OCP-safe launches. A Map<PaymentChannel, FeeStrategy> (or EnumMap) is the usual registry; Spring can inject `Map<PaymentChannel, FeeStrategy>` beans automatically.",
            ru: "Strategy + класс-на-алгоритм добавляет типы и wiring boilerplate. Для 2–3 стабильных каналов с тривиальными формулами хорошо протестированный switch может быть приемлем. После ~4 каналов с расходящимися правилами (overnight wire cutoffs, ACH tiers, crypto buffers) побеждает Strategy: независимые юнит-тесты на стратегию, параллельное владение командами и OCP-безопасные запуски. Map<PaymentChannel, FeeStrategy> (или EnumMap) — обычный registry; Spring может инжектить `Map<PaymentChannel, FeeStrategy>` beans автоматически."
          }
        },
        {
          id: "blk_st_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Alternative: Functional Strategies (Java Lambdas)",
            ru: "🔧 Альтернатива: Функциональные Strategies (Java Lambdas)"
          },
          content: {
            en: "If formulas stay small, `FeeStrategy` can be a `@FunctionalInterface` and registry values can be method references / lambdas. Prefer named classes when formulas need collaborators (FxRateGateway, holiday calendar) or grow beyond a few lines — named strategies document domain language (WireFeeStrategy) better in stack traces and code review.",
            ru: "Если формулы остаются маленькими, `FeeStrategy` может быть `@FunctionalInterface`, а значения registry — method references / lambdas. Предпочитайте именованные классы, когда формулам нужны коллабораторы (FxRateGateway, holiday calendar) или они вырастают за несколько строк — именованные strategies лучше документируют домен (WireFeeStrategy) в stack traces и на код-ревью."
          }
        }
      ]
    },
    {
      id: "sec_st_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Strategy & OCP",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Strategy и OCP"
      },
      blocks: [
        {
          id: "blk_st_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What problem does Strategy solve that a switch does not?' — Model Answer: Strategy localizes each algorithm, enables independent extension/testing, and removes fall-through / shared mutable accumulator hazards. Switch centralizes selection and forces modification of one class for every new variant (OCP violation).",
            ru: "Доп. Вопрос 1: 'Какую проблему решает Strategy, которую switch не решает?' — Модельный Ответ: Strategy локализует каждый алгоритм, даёт независимое расширение/тестирование и убирает риски fall-through / общего мутабельного аккумулятора. Switch централизует выбор и вынуждает менять один класс на каждый новый вариант (нарушение OCP)."
          }
        },
        {
          id: "blk_st_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Is Strategy the same as polymorphism?' — Model Answer: Strategy uses polymorphism as the mechanism. Polymorphism is the language feature (dynamic dispatch on FeeStrategy). Strategy is the design pattern: a family of interchangeable algorithms selected by context/registry.",
            ru: "Доп. Вопрос 2: 'Strategy — это то же самое, что полиморфизм?' — Модельный Ответ: Strategy использует полиморфизм как механизм. Полиморфизм — языковая фича (dynamic dispatch по FeeStrategy). Strategy — паттерн проектирования: семейство взаимозаменяемых алгоритмов, выбираемых контекстом/registry."
          }
        },
        {
          id: "blk_st_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'How does Strategy relate to Open-Closed?' — Model Answer: OCP is the principle; Strategy is a common way to achieve it for algorithm variation. New PaymentChannel → new FeeStrategy class + registry entry, without editing CardFeeStrategy or calculateFeeCents.",
            ru: "Доп. Вопрос 3: 'Как Strategy связан с Open-Closed?' — Модельный Ответ: OCP — принцип; Strategy — частый способ достичь его для вариации алгоритмов. Новый PaymentChannel → новый класс FeeStrategy + запись в registry, без правки CardFeeStrategy или calculateFeeCents."
          }
        },
        {
          id: "blk_st_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Where should the Map be populated — inside PaymentFeeCalculator or outside?' — Model Answer: Outside, at the composition root (Spring config / factory). Calculator receives FeeStrategyRegistry via constructor. Hard-wiring `new CardFeeStrategy()` inside the calculator reintroduces closed-for-extension coupling.",
            ru: "Доп. Вопрос 4: 'Где наполнять Map — внутри PaymentFeeCalculator или снаружи?' — Модельный Ответ: Снаружи, в composition root (Spring config / factory). Калькулятор получает FeeStrategyRegistry через конструктор. Жёсткий `new CardFeeStrategy()` внутри калькулятора снова связывает и закрывает расширение."
          }
        },
        {
          id: "blk_st_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'What if two channels share 90% of fee logic?' — Model Answer: Extract shared helpers or a package-private base with protected hooks — carefully. Prefer composition (shared FeeTierTable collaborator) over deep strategy inheritance to avoid fragile base class issues.",
            ru: "Доп. Вопрос 5: 'Что если два канала делят 90% логики комиссии?' — Модельный Ответ: Вынесите shared helpers или package-private base с protected hooks — осторожно. Предпочитайте композицию (общий коллаборатор FeeTierTable) глубокому наследованию strategies, чтобы избежать fragile base class."
          }
        },
        {
          id: "blk_st_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Strategy vs State pattern for fees?' — Model Answer: Strategy selects an algorithm independent of object lifecycle. State models transitions of one object's behavior over time. Fee channel is a request attribute, not a lifecycle state of PaymentFeeCalculator — Strategy fits; State would be overkill/misuse.",
            ru: "Доп. Вопрос 6: 'Strategy vs State для комиссий?' — Модельный Ответ: Strategy выбирает алгоритм независимо от жизненного цикла объекта. State моделирует переходы поведения одного объекта во времени. Канал комиссии — атрибут запроса, не lifecycle-состояние PaymentFeeCalculator — подходит Strategy; State был бы overkill/misuse."
          }
        },
        {
          id: "blk_st_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you unit-test fee strategies?' — Model Answer: Test each FeeStrategy in isolation with PaymentFeeRequest fixtures (edge amounts, overnight wire flags). Separately test registry resolve/fail-fast. Calculator tests become thin: mock registry, assert delegation — no combinatorial channel matrix in one class.",
            ru: "Доп. Вопрос 7: 'Как юнит-тестировать fee strategies?' — Модельный Ответ: Тестируйте каждый FeeStrategy изолированно с фикстурами PaymentFeeRequest (граничные суммы, overnight wire flags). Отдельно — resolve/fail-fast registry. Тесты калькулятора тонкие: mock registry, assert делегирования — без комбинаторной матрицы каналов в одном классе."
          }
        },
        {
          id: "blk_st_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'In our incident, why did INSTANT become 0 after CRYPTO was added?' — Model Answer: Missing `break` after CRYPTO (or uninitialized feeCents with fall-through into a case that did not assign). Switch fall-through is a control-flow bug amplified by OCP-violating centralization — one edit broke an unrelated channel.",
            ru: "Доп. Вопрос 8: 'Почему INSTANT стал 0 после добавления CRYPTO?' — Модельный Ответ: Пропущенный `break` после CRYPTO (или неинициализированный feeCents с fall-through в case без присваивания). Fall-through — баг control-flow, усиленный OCP-нарушающей централизацией: одна правка сломала несвязанный канал."
          }
        },
        {
          id: "blk_st_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Should FeeStrategy be an interface or abstract class?' — Model Answer: Prefer interface (or functional interface) unless you have proven shared mutable template-method state. Interfaces keep strategies free of forced hierarchy and play better with DI maps and lambdas.",
            ru: "Доп. Вопрос 9: 'FeeStrategy — интерфейс или абстрактный класс?' — Модельный Ответ: Предпочитайте интерфейс (или functional interface), пока нет доказанной нужды в shared mutable template-method состоянии. Интерфейсы не навязывают иерархию и лучше работают с DI maps и lambdas."
          }
        },
        {
          id: "blk_st_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How does Strategy interact with Dependency Injection?' — Model Answer: DI wires the registry and concrete strategies at the composition root. PaymentFeeCalculator depends only on FeeStrategyRegistry abstraction. Field-injecting every strategy into the calculator recreates a fat context — inject the registry instead.",
            ru: "Доп. Вопрос 10: 'Как Strategy взаимодействует с Dependency Injection?' — Модельный Ответ: DI связывает registry и конкретные strategies в composition root. PaymentFeeCalculator зависит только от абстракции FeeStrategyRegistry. Field-injection каждой strategy в калькулятор снова делает толстый контекст — инжектите registry."
          }
        },
        {
          id: "blk_st_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Can sealed interfaces + switch expressions replace Strategy here?' — Model Answer: Java sealed PaymentChannel with switch expressions gives exhaustiveness checking (compiler forces new cases). That improves safety vs classic switch but still modifies the calculator for every channel — weaker OCP than registering external strategy classes owned by feature teams.",
            ru: "Доп. Вопрос 11: 'Могут ли sealed interfaces + switch expressions заменить Strategy?' — Модельный Ответ: Sealed PaymentChannel со switch expressions даёт exhaustiveness (компилятор требует новые case). Это безопаснее классического switch, но всё равно меняет калькулятор на каждый канал — слабее OCP, чем регистрация внешних strategy-классов, которыми владеют feature-команды."
          }
        },
        {
          id: "blk_st_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What ArchUnit / review rule would you add after this incident?' — Model Answer: Forbid switch/if chains on PaymentChannel inside `..fee..` packages except FeeStrategyRegistry bootstrap. Require each PaymentChannel enum constant to have a registered strategy in an integration test that iterates EnumSet.allOf(PaymentChannel.class).",
            ru: "Доп. Вопрос 12: 'Какое ArchUnit / review правило добавить после инцидента?' — Модельный Ответ: Запретить switch/if по PaymentChannel в пакетах `..fee..`, кроме bootstrap FeeStrategyRegistry. Требовать для каждой константы enum PaymentChannel зарегистрированную strategy в интеграционном тесте, итерирующем EnumSet.allOf(PaymentChannel.class)."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_interface_contracts"],
  sourceIds: ["src_gof_strategy", "src_head_first_strategy", "src_baeldung_strategy", "src_clean_architecture_ocp"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#strategy-pattern", "#ocp", "#fee-calculator", "#behavioral"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_STRATEGY: readonly TheoryCheckpoint[] = [
  {
    id: "chk_st_1",
    theoryArticleId: "art_theory_strategy",
    question: {
      en: "What is the primary Open-Closed benefit of FeeStrategyRegistry over a PaymentChannel switch in PaymentFeeCalculator?",
      ru: "В чём главный Open-Closed выигрыш FeeStrategyRegistry перед switch по PaymentChannel в PaymentFeeCalculator?"
    },
    explanation: {
      en: "New channels add a FeeStrategy + registry entry without modifying existing calculator or strategy classes.",
      ru: "Новые каналы добавляют FeeStrategy + запись в registry без изменения существующего калькулятора или классов стратегий."
    },
    options: [
      {
        id: "opt_st1_a",
        text: {
          en: "New PaymentChannel strategies can be registered without editing existing fee calculation code.",
          ru: "Новые стратегии PaymentChannel можно регистрировать без правки существующего кода расчёта комиссий."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is OCP: open for extension, closed for modification.",
          ru: "Верно! Это OCP: открыто для расширения, закрыто для модификации."
        }
      },
      {
        id: "opt_st1_b",
        text: {
          en: "The registry makes feeCents calculations run on the GPU.",
          ru: "Registry заставляет расчёты feeCents выполняться на GPU."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Strategy/registry is about structure and extension, not hardware acceleration.",
          ru: "Неверно. Strategy/registry — про структуру и расширение, не про аппаратное ускорение."
        }
      },
      {
        id: "opt_st1_c",
        text: {
          en: "Switch statements are illegal in Java 17, so a registry is mandatory.",
          ru: "Switch-операторы запрещены в Java 17, поэтому registry обязателен."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Switch is legal; the issue is maintainability and OCP, not language bans.",
          ru: "Неверно. Switch законен; проблема в поддерживаемости и OCP, не в запрете языка."
        },
        misconceptionId: "err_switch_explosion_ocp"
      }
    ],
    order: 1
  },
  {
    id: "chk_st_2",
    theoryArticleId: "art_theory_strategy",
    question: {
      en: "How does extracting FeeStrategy classes prevent the CRYPTO hotfix fall-through bug class?",
      ru: "Как вынесение классов FeeStrategy предотвращает класс багов fall-through хотфикса CRYPTO?"
    },
    explanation: {
      en: "Each strategy returns its own computed long; there is no shared switch variable or break to forget.",
      ru: "Каждая strategy возвращает свой вычисленный long; нет общей switch-переменной и break, который можно забыть."
    },
    options: [
      {
        id: "opt_st2_a",
        text: {
          en: "Each strategy returns a computed fee independently — no shared switch fall-through path.",
          ru: "Каждая strategy независимо возвращает комиссию — нет общего пути fall-through switch."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Fall-through is a switch control-flow hazard eliminated by per-strategy methods.",
          ru: "Верно! Fall-through — hazard control-flow switch, устраняемый методами отдельных strategies."
        }
      },
      {
        id: "opt_st2_b",
        text: {
          en: "Strategies automatically insert break statements into bytecode.",
          ru: "Strategies автоматически вставляют break в байткод."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. There is no switch to break — delegation replaces branching.",
          ru: "Неверно. Switch для break нет — делегирование заменяет ветвление."
        },
        misconceptionId: "err_switch_fallthrough_fee"
      },
      {
        id: "opt_st2_c",
        text: {
          en: "The JVM forbids multiple PaymentChannel values once Strategy is used.",
          ru: "JVM запрещает несколько значений PaymentChannel после использования Strategy."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Enum channels still exist; selection moves to the registry.",
          ru: "Неверно. Enum-каналы остаются; выбор переносится в registry."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_st_3",
    theoryArticleId: "art_theory_strategy",
    question: {
      en: "What should FeeStrategyRegistry do when PaymentChannel has no registered strategy?",
      ru: "Что должен делать FeeStrategyRegistry, когда для PaymentChannel нет зарегистрированной strategy?"
    },
    explanation: {
      en: "Fail fast with an exception — never silently bill feeCents = 0.",
      ru: "Fail-fast с исключением — никогда молча не биллить feeCents = 0."
    },
    options: [
      {
        id: "opt_st3_a",
        text: {
          en: "Throw a clear exception (fail-fast) so missing registration is caught before production billing.",
          ru: "Бросить понятное исключение (fail-fast), чтобы отсутствующая регистрация ловилась до биллинга на продакшене."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Silent 0 fees hide configuration bugs and recreate the incident class.",
          ru: "Верно! Тихие 0 комиссий скрывают ошибки конфигурации и воспроизводят класс инцидента."
        }
      },
      {
        id: "opt_st3_b",
        text: {
          en: "Return null and let calculateFeeCents treat null as zero fee.",
          ru: "Вернуть null и пусть calculateFeeCents считает null нулевой комиссией."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Silent zero fees caused the treasury incident class of bugs.",
          ru: "Неверно. Тихие нулевые комиссии — тот же класс багов, что инцидент казначейства."
        },
        misconceptionId: "err_missing_registry_default"
      },
      {
        id: "opt_st3_c",
        text: {
          en: "Fall back to CARD fee formula for any unknown channel.",
          ru: "Откатываться к формуле CARD для любого неизвестного канала."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Wrong-channel pricing is a compliance/revenue risk — fail loud instead.",
          ru: "Неверно. Ценообразование чужого канала — риск compliance/выручки — лучше падать явно."
        }
      }
    ],
    order: 3
  }
];
