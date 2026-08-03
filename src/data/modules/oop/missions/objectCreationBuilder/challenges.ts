import { Challenge } from '../../../../../types/domain';

export const ALL_OBJECT_CREATION_CHALLENGES: readonly Challenge[] = [
  {
    id: "chl_oc_fix_builder",
    type: "FIX_BUILDER",
    missionId: "mis_object_creation_builder",
    stageId: "stg_oc_practice",
    title: {
      en: "Fix Builder: Replace Telescoping Constructors with Builder & Static Factory",
      ru: "Конструктор Исправления: Builder и Статическая Фабрика вместо Телескопических Конструкторов"
    },
    prompt: {
      en: "Select ALL production-safe structural elements to refactor SettlementInstruction from 12-parameter telescoping constructors to Builder pattern with static factory methods.",
      ru: "Выберите ВСЕ безопасные элементы для рефакторинга SettlementInstruction с телескопических конструкторов на 12 параметров на Builder и статические фабричные методы."
    },
    difficulty: "SENIOR",
    assistanceLevel: "GUIDED",
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods", "cpt_immutability", "cpt_invariants"],
    topicIds: ["top_oop_25"],
    tags: ["#builder-pattern", "#static-factories", "#immutability"],
    hintIds: ["hnt_oc_1", "hnt_oc_2", "hnt_oc_3", "hnt_oc_4"],
    xpReward: 100,
    order: 7,
    payload: {
      baseCodeArtifactId: "art_settlement_instruction_broken",
      solutionCodeArtifactId: "art_settlement_instruction_solution",
      options: [
        {
          id: "opt_oc_fix_1",
          text: {
            en: "Replace telescoping constructors with public static SettlementInstructionBuilder builder() and package-private constructor called only from Builder.build().",
            ru: "Заменить телескопические конструкторы на public static SettlementInstructionBuilder builder() и package-private конструктор, вызываемый только из Builder.build()."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Package-private constructor ensures objects can only be created through validated Builder.build().",
            ru: "Верно. Package-private конструктор гарантирует создание объектов только через валидированный Builder.build()."
          }
        },
        {
          id: "opt_oc_fix_2",
          text: {
            en: "Add fluent named methods isTaxExempt(boolean) and isAudited(boolean) on Builder to eliminate adjacent boolean literal confusion.",
            ru: "Добавить fluent именованные методы isTaxExempt(boolean) и isAudited(boolean) в Builder для устранения путаницы смежных boolean-литералов."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Named fluent methods bind each boolean to its field name, preventing the swapped-flags disaster.",
            ru: "Верно. Именованные fluent-методы привязывают каждый boolean к имени поля, предотвращая катастрофу перепутанных флагов."
          }
        },
        {
          id: "opt_oc_fix_3",
          text: {
            en: "Add static factory SettlementInstruction.of(instructionId, payer, payee, amount) delegating to Builder for common creation paths.",
            ru: "Добавить статическую фабрику SettlementInstruction.of(instructionId, payer, payee, amount), делегирующую Builder для типовых путей создания."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Static factories provide readable entry points and can pre-set safe defaults via Builder delegation.",
            ru: "Верно. Статические фабрики дают читаемые точки входа и могут предустанавливать безопасные default через Builder."
          }
        },
        {
          id: "opt_oc_fix_4",
          text: {
            en: "Validate cross-field invariant in build(): if isTaxExempt then isAudited must be true, throwing IllegalStateException otherwise.",
            ru: "Проверить кросс-полевой инвариант в build(): если isTaxExempt, то isAudited должен быть true, иначе IllegalStateException."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. build() is the single choke point for domain invariant enforcement before immutable object construction.",
            ru: "Верно. build() — единая точка проверки доменных инвариантов перед созданием неизменяемого объекта."
          }
        },
        {
          id: "opt_oc_fix_distractor_1",
          text: {
            en: "Add @SuppressWarnings and JavaDoc comments documenting the correct boolean parameter order in the 12-arg constructor.",
            ru: "Добавить @SuppressWarnings и JavaDoc с документированием правильного порядка boolean-параметров в 12-arg конструкторе."
          },
          isCorrect: false,
          explanation: {
            en: "Incorrect. Documentation does not prevent compile-time-safe boolean swapping. Only named Builder methods eliminate the trap.",
            ru: "Неверно. Документация не предотвращает безопасное на уровне компиляции перепутывание boolean. Только именованные методы Builder устраняют ловушку."
          }
        },
        {
          id: "opt_oc_fix_distractor_2",
          text: {
            en: "Swap isTaxExempt and isAudited parameter order in the constructor signature to match developer mental model.",
            ru: "Поменять порядок isTaxExempt и isAudited в сигнатуре конструктора под ментальную модель разработчика."
          },
          isCorrect: false,
          explanation: {
            en: "Incorrect. Reordering parameters fixes one call site but breaks others. The telescoping constructor pattern itself is the root cause.",
            ru: "Неверно. Перестановка параметров чинит один вызов, но ломает другие. Корневая причина — сам паттерн телескопических конструкторов."
          }
        }
      ]
    }
  },
  {
    id: "chl_oc_bughunt",
    type: "BUG_HUNT",
    missionId: "mis_object_creation_builder",
    stageId: "stg_oc_debug",
    title: {
      en: "Bug Hunt: Swapped isAudited and isTaxExempt Boolean Flags",
      ru: "Поиск Бага: Перепутанные Флаги isAudited и isTaxExempt"
    },
    prompt: {
      en: "Inspect the SettlementInstructionFactory below. Click on the line where isAudited and isTaxExempt boolean arguments are swapped in the telescoping constructor call.",
      ru: "Изучите SettlementInstructionFactory ниже. Нажмите на строку, где аргументы isAudited и isTaxExempt перепутаны в вызове телескопического конструктора."
    },
    difficulty: "SENIOR",
    assistanceLevel: "APPLIED",
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods"],
    topicIds: ["top_oop_25"],
    tags: ["#bug-hunt", "#boolean-trap", "#telescoping-constructor"],
    hintIds: ["hnt_oc_bug_1", "hnt_oc_bug_2", "hnt_oc_bug_3", "hnt_oc_bug_4"],
    xpReward: 100,
    order: 10,
    payload: {
      baseCodeArtifactId: "art_settlement_instruction_broken",
      solutionCodeArtifactId: "art_settlement_instruction_solution",
      codeSnippet: `public final class SettlementInstructionFactory {

    public SettlementInstruction createTaxExemptWire(
            String instructionId,
            String payerAccountId,
            String payeeAccountId,
            long amountInCents) {
        // Developer intent: isAudited=true, isTaxExempt=true for tax-exempt wires
        return new SettlementInstruction(
                instructionId,
                payerAccountId,
                payeeAccountId,
                amountInCents,
                "USD",
                LocalDate.now(),
                Priority.HIGH,
                true,   // Line 16: intended isAudited
                true,   // Line 17: intended isTaxExempt
                "SWIFT-001",
                "Q3 tax-exempt wire",
                "BATCH-Q3-2026"
        );
    }
}`,
      lines: [
        { lineNumber: 1, code: "public final class SettlementInstructionFactory {", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 3, code: "    public SettlementInstruction createTaxExemptWire(", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 4, code: "            String instructionId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 5, code: "            String payerAccountId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 6, code: "            String payeeAccountId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 7, code: "            long amountInCents) {", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 8, code: "        // Developer intent: isAudited=true, isTaxExempt=true for tax-exempt wires", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 9, code: "        return new SettlementInstruction(", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 10, code: "                instructionId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 11, code: "                payerAccountId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 12, code: "                payeeAccountId,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 13, code: "                amountInCents,", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 14, code: "                \"USD\",", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 15, code: "                LocalDate.now(),", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 16, code: "                Priority.HIGH,", isBug: false, explanation: { en: "", ru: "" } },
        {
          lineNumber: 17,
          code: "                true,   // intended isAudited",
          isBug: true,
          explanation: {
            en: "Line 17: Developer intended isAudited=true here, but the 12-arg constructor signature is (…, boolean isTaxExempt, boolean isAudited, …). This literal binds to isTaxExempt, not isAudited — silently inverting tax classification.",
            ru: "Строка 17: Разработчик ожидал isAudited=true, но сигнатура 12-arg конструктора (…, boolean isTaxExempt, boolean isAudited, …). Этот литерал привязывается к isTaxExempt — тихо инвертируя налоговую классификацию."
          }
        },
        {
          lineNumber: 18,
          code: "                true,   // intended isTaxExempt",
          isBug: true,
          explanation: {
            en: "Line 18: Developer intended isTaxExempt=true here, but this literal binds to isAudited per constructor parameter order. Combined with Line 17, both flags are set but to the wrong fields — producing incorrect tax reports.",
            ru: "Строка 18: Разработчик ожидал isTaxExempt=true, но литерал привязывается к isAudited. Вместе со строкой 17 оба флага установлены, но в неправильные поля — порождая неверные налоговые отчеты."
          }
        },
        { lineNumber: 19, code: "                \"SWIFT-001\",", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 20, code: "                \"Q3 tax-exempt wire\",", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 21, code: "                \"BATCH-Q3-2026\"", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 22, code: "        );", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 23, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
        { lineNumber: 24, code: "}", isBug: false, explanation: { en: "", ru: "" } }
      ]
    }
  },
  {
    id: "chl_oc_interview_answer",
    type: "INTERVIEW_ANSWER",
    missionId: "mis_object_creation_builder",
    stageId: "stg_oc_interview_a",
    title: {
      en: "Senior Interview Challenge: Builder vs Telescoping Constructors",
      ru: "Сценарий Senior-Интервью: Builder vs Телескопические Конструкторы"
    },
    prompt: {
      en: "How would you refactor a SettlementInstruction class with 12 constructor parameters (4 mandatory, 8 optional) that caused silent boolean flag swapping bugs in production tax reports?",
      ru: "Как вы провели бы рефакторинг класса SettlementInstruction с 12 параметрами конструктора (4 обязательных, 8 опциональных), вызвавшего тихие баги перепутывания boolean-флагов в налоговых отчетах?"
    },
    difficulty: "SENIOR",
    assistanceLevel: "INTERVIEW",
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods", "cpt_immutability", "cpt_invariants"],
    topicIds: ["top_oop_25"],
    tags: ["#interview", "#builder-pattern", "#static-factories"],
    hintIds: [],
    xpReward: 100,
    order: 9,
    payload: {
      targetQuestionId: "q_oc_settlement_01",
      rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
      expectedConcepts: [
        {
          id: "cpt_builder_pattern",
          label: { en: "Builder Pattern with Named Fluent Methods", ru: "Builder с Именованными Fluent-Методами" },
          keywords: ["builder", "fluent", "isTaxExempt", "isAudited", "build()", "билдер", "fluent"]
        },
        {
          id: "cpt_static_factory_methods",
          label: { en: "Static Factory Methods (of, taxExemptWire)", ru: "Статические Фабрики (of, taxExemptWire)" },
          keywords: ["static factory", "of(", "valueOf", "factory method", "статическая фабрика", "of"]
        },
        {
          id: "cpt_boolean_trap",
          label: { en: "Adjacent Boolean Parameter Trap", ru: "Ловушка Смежных Boolean-Параметров" },
          keywords: ["boolean", "swapped", "adjacent", "positional", "telescoping", "перепутан", "boolean"]
        },
        {
          id: "cpt_invariants",
          label: { en: "Invariant Validation in build()", ru: "Валидация Инвариантов в build()" },
          keywords: ["invariant", "build()", "validation", "IllegalStateException", "инвариант", "валидация"]
        },
        {
          id: "cpt_immutability",
          label: { en: "Immutable SettlementInstruction", ru: "Неизменяемый SettlementInstruction" },
          keywords: ["immutable", "final fields", "no setters", "неизменяем", "final"]
        }
      ],
      modelAnswer30s: {
        en: "Elevator Pitch (30 sec): Telescoping constructors with 12 parameters — especially adjacent boolean flags — are a compile-time-safe trap. A developer swapped isAudited and isTaxExempt literals, silently corrupting tax reports for 847 instructions. The fix is Builder with named fluent methods plus static factory methods like of() and taxExemptWire() that delegate to Builder with pre-set flags.",
        ru: "Elevator Pitch (30 сек): Телескопические конструкторы на 12 параметров — особенно смежные boolean-флаги — ловушка, безопасная на этапе компиляции. Разработчик перепутал литералы isAudited и isTaxExempt, тихо испортив налоговые отчеты для 847 инструкций. Фикс — Builder с именованными fluent-методами плюс статические фабрики of() и taxExemptWire(), делегирующие Builder с предустановленными флагами."
      },
      modelAnswerDetailed: {
        en: "Deep Mechanics (60 sec): Replace all public telescoping constructors with a package-private constructor and public static Builder builder(). Mandatory fields (instructionId, payer, payee, amount) go into the Builder constructor. Optional fields use fluent named methods: .isTaxExempt(true).isAudited(true). The build() method validates mandatory fields and cross-field invariants (tax-exempt requires audit). Static factories like SettlementInstruction.of(id, payer, payee, amount) and taxExemptWire(...) provide readable entry points for common paths.",
        ru: "Глубокая Механика (60 сек): Заменить все публичные телескопические конструкторы на package-private конструктор и public static Builder builder(). Обязательные поля — в конструктор Builder. Опциональные — через fluent: .isTaxExempt(true).isAudited(true). build() проверяет обязательные поля и кросс-полевые инварианты (tax-exempt требует audit). Статические фабрики of() и taxExemptWire() дают читаемые точки входа."
      },
      modelAnswerTradeOffs: {
        en: "Production Trade-offs (30 sec): Builder adds boilerplate (~80 lines) but eliminates a class of silent production bugs. Lombok @Builder reduces boilerplate but hides cross-field invariant validation — for financial domain objects, hand-written build() validation is preferred. Java Records don't solve optional-parameter fluency for 12 fields. The Builder + static factory combination is the Effective Java Item 1 & 2 enterprise standard.",
        ru: "Продакшн Компромиссы (30 сек): Builder добавляет шаблон (~80 строк), но устраняет класс тихих продакшн-багов. Lombok @Builder сокращает шаблон, но скрывает кросс-полевую валидацию — для финансовых объектов предпочтителен ручной build(). Records не решают fluency для 12 опциональных полей. Builder + статическая фабрика — enterprise-стандарт Effective Java Items 1 & 2."
      },
      followUpQuestionText: {
        en: "Interviewer Follow-Up: 'At what parameter count would you mandate Builder pattern in your team's coding standards?'",
        ru: "Вопрос интервьюера: 'При каком количестве параметров вы введете обязательный Builder в стандартах команды?'"
      },
      followUpModelAnswerText: {
        en: "Model Answer: My team enforces Builder (or static factory with Builder delegation) at 5+ total parameters, or immediately when any boolean parameters exist alongside 3+ other parameters. Effective Java Item 2 recommends Builder when most parameters are optional. For financial domain objects with regulatory flags, we mandate Builder regardless of count.",
        ru: "Ответ: Моя команда требует Builder (или статическую фабрику с делегированием Builder) при 5+ параметрах, или немедленно при наличии boolean рядом с 3+ другими параметрами. Effective Java Item 2 рекомендует Builder, когда большинство параметров опциональны. Для финансовых объектов с регуляторными флагами мы требуем Builder независимо от количества."
      }
    }
  }
];
