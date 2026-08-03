import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_BUILDER_PATTERN: TheoryArticle = {
  id: "art_theory_builder_pattern",
  topicIds: ["top_oop_28"],
  conceptIds: ["cpt_builder_pattern", "cpt_telescoping_constructor", "cpt_build_time_validation"],
  title: {
    en: "Builder Pattern & Build-Time Validation for RiskAssessmentRequest",
    ru: "Паттерн Builder и Build-Time Валидация для RiskAssessmentRequest"
  },
  summary: {
    en: "Telescoping constructors for RiskAssessmentRequest invite omitted EvaluationWindow and RiskProfile. A Builder with build-time validation (Effective Java Item 2) produces immutable, complete requests for RiskAssessmentService — distinct from SettlementInstruction boolean-flag builders.",
    ru: "Телескопические конструкторы RiskAssessmentRequest провоцируют пропуск EvaluationWindow и RiskProfile. Builder с build-time валидацией (EJ Item 2) даёт immutable полные запросы для RiskAssessmentService — отлично от boolean-flag builders SettlementInstruction."
  },
  sections: [
    {
      id: "sec_bld_definition",
      category: "DEFINITION",
      title: {
        en: "1. Builder: Named Construction with a Validation Gate",
        ru: "1. Builder: Именованная Сборка с Воротами Валидации"
      },
      blocks: [
        {
          id: "blk_bld_def_1",
          type: "PARAGRAPH",
          content: {
            en: "The Builder pattern accumulates configuration through fluent named methods, then materializes an object in build(). For RiskAssessmentRequest, callers set PortfolioId, RiskProfile, and EvaluationWindow explicitly — no positional boolean soup. Effective Java Item 2 recommends Builder when constructors have many parameters, especially mixed mandatory and optional ones.",
            ru: "Паттерн Builder накапливает конфигурацию через fluent именованные методы и материализует объект в build(). Для RiskAssessmentRequest вызывающие явно задают PortfolioId, RiskProfile и EvaluationWindow — без позиционного boolean-супа. Effective Java Item 2 рекомендует Builder при многих параметрах конструктора, особенно при смеси mandatory и optional."
          }
        },
        {
          id: "blk_bld_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Mental Model: build() Is the Gate",
            ru: "💡 Ментальная Модель: build() — Это Ворота"
          },
          content: {
            en: "If an invalid RiskAssessmentRequest can exist, the gate failed. Null windows and inverted ranges must throw in build(), not later in RiskAssessmentService.",
            ru: "Если невалидный RiskAssessmentRequest может существовать — ворота не сработали. Null-окна и перевёрнутые диапазоны должны бросать в build(), не позже в RiskAssessmentService."
          }
        }
      ]
    },
    {
      id: "sec_bld_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Telescoping Constructors vs Build-Time Validation",
        ru: "2. Телескопические Конструкторы vs Build-Time Валидация"
      },
      blocks: [
        {
          id: "blk_bld_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Telescoping constructors overload (id), (id, profile), (id, profile, window), (id, profile, window, notes)... Callers pick the wrong overload or pass null for 'optional' slots that are actually mandatory for evaluation. Build-time validation centralizes: requireNonNull on PortfolioId/RiskProfile/EvaluationWindow; assert window.start <= window.end; then construct immutable RiskAssessmentRequest.",
            ru: "Телескопические конструкторы overload (id), (id, profile), (id, profile, window), (id, profile, window, notes)... Вызывающие выбирают неверный overload или передают null в «optional» слоты, обязательные для оценки. Build-time валидация централизует: requireNonNull для PortfolioId/RiskProfile/EvaluationWindow; assert start <= end; затем immutable RiskAssessmentRequest."
          }
        },
        {
          id: "blk_bld_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Distinct from SettlementInstruction Flag Mission",
            ru: "⚙️ Отличие от Миссии Флагов SettlementInstruction"
          },
          content: {
            en: "mis_object_creation_builder focuses on swapped boolean flags in SettlementInstruction. This mission focuses on missing mandatory risk configuration (window/profile) at build time for RiskAssessmentRequest.",
            ru: "mis_object_creation_builder фокусируется на swapped boolean flags в SettlementInstruction. Эта миссия — на пропуске обязательной risk-конфигурации (window/profile) на этапе build для RiskAssessmentRequest."
          }
        }
      ]
    },
    {
      id: "sec_bld_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Builder Boilerplate vs Safety",
        ru: "3. Компромиссы: Boilerplate Builder vs Безопасность"
      },
      blocks: [
        {
          id: "blk_bld_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Builders add nested types and verbosity. For two-field value types, a compact constructor may suffice. For risk requests with evolving optional overlays, Builder localizes change and keeps call sites readable. Staged builders buy compile-time mandatory order at more code cost.",
            ru: "Builders добавляют вложенные типы и verbosity. Для value types из двух полей хватит compact constructor. Для risk requests с эволюционирующими optional overlays Builder локализует изменения и делает call site читаемыми. Staged builders дают compile-time порядок обязательных шагов ценой большего кода."
          }
        }
      ]
    },
    {
      id: "sec_bld_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Builder",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Builder"
      },
      blocks: [
        { id: "blk_bld_fup_01", type: "PARAGRAPH", content: { en: "Follow-Up Q1: 'What problem does Item 2 solve?' — Model Answer: Telescoping constructors and unreadable/error-prone call sites with many parameters.", ru: "Доп. Вопрос 1: 'Какую проблему решает Item 2?' — Модельный Ответ: Телескопические конструкторы и нечитаемые/ошибочные call site с многими параметрами." } },
        { id: "blk_bld_fup_02", type: "PARAGRAPH", content: { en: "Follow-Up Q2: 'Where should mandatory checks live?' — Model Answer: In build() (and ideally also in the request's constructor as a last line of defense).", ru: "Доп. Вопрос 2: 'Где жить обязательным проверкам?' — Модельный Ответ: В build() (и желательно в конструкторе request как последний рубеж)." } },
        { id: "blk_bld_fup_03", type: "PARAGRAPH", content: { en: "Follow-Up Q3: 'Builder vs factory method?' — Model Answer: Factories suit simple/named variants; Builder suits many optional/mandatory fields assembled step-by-step.", ru: "Доп. Вопрос 3: 'Builder vs factory method?' — Модельный Ответ: Factory — для простых/именованных вариантов; Builder — для многих optional/mandatory полей, собираемых пошагово." } },
        { id: "blk_bld_fup_04", type: "PARAGRAPH", content: { en: "Follow-Up Q4: 'Should Builder be reusable after build()?' — Model Answer: Either document reuse carefully or create a fresh Builder per request to avoid leftover field bugs.", ru: "Доп. Вопрос 4: 'Можно ли переиспользовать Builder после build()?' — Модельный Ответ: Либо тщательно документировать reuse, либо создавать новый Builder на запрос, чтобы избежать leftover-полей." } },
        { id: "blk_bld_fup_05", type: "PARAGRAPH", content: { en: "Follow-Up Q5: 'How do you test build-time validation?' — Model Answer: Assert build() throws for null window/profile; assert happy path yields immutable evaluable request.", ru: "Доп. Вопрос 5: 'Как тестировать build-time валидацию?' — Модельный Ответ: Assert что build() бросает при null window/profile; happy path даёт immutable оценимный request." } },
        { id: "blk_bld_fup_06", type: "PARAGRAPH", content: { en: "Follow-Up Q6: 'Can records replace Builder here?' — Model Answer: Records help immutability; for many optional fields, a Builder (or withers) still clarifies construction.", ru: "Доп. Вопрос 6: 'Могут ли records заменить Builder?' — Модельный Ответ: Records помогают immutability; при многих optional полях Builder (или withers) всё ещё проясняет сборку." } },
        { id: "blk_bld_fup_07", type: "PARAGRAPH", content: { en: "Follow-Up Q7: 'What belongs optional on RiskAssessmentRequest?' — Model Answer: Notes/overrides — never EvaluationWindow or RiskProfile for evaluable requests.", ru: "Доп. Вопрос 7: 'Что optional на RiskAssessmentRequest?' — Модельный Ответ: Notes/overrides — никогда EvaluationWindow или RiskProfile для оценимных запросов." } },
        { id: "blk_bld_fup_08", type: "PARAGRAPH", content: { en: "Follow-Up Q8: 'Thread safety of Builder?' — Model Answer: Typical Builders are confined to one thread during assembly; share only the immutable built request.", ru: "Доп. Вопрос 8: 'Thread safety Builder?' — Модельный Ответ: Обычно Builder ограничен одним потоком при сборке; шарьте только immutable построенный request." } },
        { id: "blk_bld_fup_09", type: "PARAGRAPH", content: { en: "Follow-Up Q9: 'Why not public setters on the request?' — Model Answer: Setters allow post-build mutation and invalidate the construction invariant.", ru: "Доп. Вопрос 9: 'Почему не public setters на request?' — Модельный Ответ: Setters позволяют мутацию после build и ломают инвариант конструкции." } },
        { id: "blk_bld_fup_10", type: "PARAGRAPH", content: { en: "Follow-Up Q10: 'How is this different from the SettlementInstruction mission?' — Model Answer: That mission targets swapped booleans; this targets missing mandatory risk window/profile at build time.", ru: "Доп. Вопрос 10: 'Чем отличается от миссии SettlementInstruction?' — Модельный Ответ: Та миссия — swapped booleans; эта — пропуск обязательных risk window/profile на build." } },
        { id: "blk_bld_fup_11", type: "PARAGRAPH", content: { en: "Follow-Up Q11: 'IllegalArgumentException vs custom type?' — Model Answer: Either is fine if messages name the missing field; consistency across domain builders matters.", ru: "Доп. Вопрос 11: 'IllegalArgumentException vs кастомный тип?' — Модельный Ответ: Оба ок, если сообщения называют отсутствующее поле; важна согласованность across domain builders." } },
        { id: "blk_bld_fup_12", type: "PARAGRAPH", content: { en: "Follow-Up Q12: 'When do you reject a risk-request PR?' — Model Answer: When build() can return with null EvaluationWindow or when new telescoping overloads are added instead of Builder fields.", ru: "Доп. Вопрос 12: 'Когда отклонить PR risk-request?' — Модельный Ответ: Когда build() может вернуть null EvaluationWindow или когда добавляют новые телескопические overload вместо полей Builder." } }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_immutability"],
  sourceIds: ["src_bld_ej_item2", "src_bld_baeldung_builder", "src_bld_oracle_classes", "src_bld_hfdp_builder"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#builder-pattern", "#telescoping-constructor", "#risk-assessment"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_BUILDER_PATTERN: readonly TheoryCheckpoint[] = [
  {
    id: "chk_bld_1",
    theoryArticleId: "art_theory_builder_pattern",
    question: { en: "What is the primary hazard of telescoping RiskAssessmentRequest constructors?", ru: "Какой главный hazard телескопических конструкторов RiskAssessmentRequest?" },
    explanation: { en: "Callers omit mandatory fields via wrong overloads or nulls.", ru: "Вызывающие опускают обязательные поля через неверные overload или null." },
    options: [
      { id: "opt_bld1_a", text: { en: "Callers can omit EvaluationWindow/RiskProfile via wrong overloads or null arguments.", ru: "Вызывающие могут опустить EvaluationWindow/RiskProfile через неверные overload или null." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_bld1_b", text: { en: "Java forbids more than three constructor overloads.", ru: "Java запрещает больше трёх overload конструктора." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_bld1_c", text: { en: "Builders cannot represent PortfolioId.", ru: "Builder не может представить PortfolioId." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_bld_2",
    theoryArticleId: "art_theory_builder_pattern",
    question: { en: "Where should mandatory risk-field validation run first?", ru: "Где сначала должна выполняться валидация обязательных risk-полей?" },
    explanation: { en: "In Builder.build().", ru: "В Builder.build()." },
    options: [
      { id: "opt_bld2_a", text: { en: "In RiskAssessmentRequest.Builder.build() before the object escapes.", ru: "В RiskAssessmentRequest.Builder.build() до выхода объекта наружу." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_bld2_b", text: { en: "Only in overnight batch reports after evaluation.", ru: "Только в ночных batch-отчётах после оценки." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_bld2_c", text: { en: "Only in toString() for logging.", ru: "Только в toString() для логов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." }, misconceptionId: "err_bld_validate_in_service_only" }
    ],
    order: 2
  },
  {
    id: "chk_bld_3",
    theoryArticleId: "art_theory_builder_pattern",
    question: { en: "How does this mission differ from mis_object_creation_builder?", ru: "Чем эта миссия отличается от mis_object_creation_builder?" },
    explanation: { en: "Missing mandatory risk config vs swapped SettlementInstruction booleans.", ru: "Пропуск обязательной risk-конфигурации vs swapped boolean SettlementInstruction." },
    options: [
      { id: "opt_bld3_a", text: { en: "This targets missing EvaluationWindow/RiskProfile at build time; that targets swapped boolean flags on SettlementInstruction.", ru: "Эта нацелена на пропуск EvaluationWindow/RiskProfile на build; та — на swapped boolean flags SettlementInstruction." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_bld3_b", text: { en: "They are identical scenarios with different class names only.", ru: "Это идентичные сценарии, отличающиеся только именами классов." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_bld3_c", text: { en: "This mission forbids the Builder pattern entirely.", ru: "Эта миссия полностью запрещает паттерн Builder." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_bld_4",
    theoryArticleId: "art_theory_builder_pattern",
    question: { en: "After a correct build(), what should RiskAssessmentService receive?", ru: "После корректного build() что должен получить RiskAssessmentService?" },
    explanation: { en: "An immutable, fully validated RiskAssessmentRequest.", ru: "Immutable, полностью валидированный RiskAssessmentRequest." },
    options: [
      { id: "opt_bld4_a", text: { en: "An immutable RiskAssessmentRequest with PortfolioId, RiskProfile, and EvaluationWindow present.", ru: "Immutable RiskAssessmentRequest с присутствующими PortfolioId, RiskProfile и EvaluationWindow." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_bld4_b", text: { en: "A mutable Builder instance to continue editing during assess().", ru: "Мутабельный экземпляр Builder для правок во время assess()." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_bld4_c", text: { en: "A null window with a TODO comment.", ru: "Null window с комментарием TODO." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
