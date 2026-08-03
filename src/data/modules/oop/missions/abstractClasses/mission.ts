import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ac_intro",
  missionId: "mis_abstract_classes",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where CardSettlementProcessor and WireSettlementProcessor skipped mandatory audit after capture — compliance found settlements with no audit trail.",
    ru: "Изучите инцидент на продакшене, где CardSettlementProcessor и WireSettlementProcessor пропустили обязательный audit после capture — compliance нашёл settlements без audit trail."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ac_problem",
  missionId: "mis_abstract_classes",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine AbstractSettlementProcessor: settle() is intended as validate → authorize → capture → audit, but subclasses override settle() entirely or mutate protected state, bypassing audit.",
    ru: "Изучите AbstractSettlementProcessor: settle() задуман как validate → authorize → capture → audit, но подклассы целиком переопределяют settle() или мутируют protected-состояние, обходя audit."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ac_think",
  missionId: "mis_abstract_classes",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why can a subclass of AbstractSettlementProcessor skip audit, and what language tools (final, abstract, protected) enforce the lifecycle contract?",
    ru: "Сформулируйте гипотезу: почему подкласс AbstractSettlementProcessor может пропустить audit, и какие языковые средства (final, abstract, protected) закрепляют контракт жизненного цикла?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ac_help",
  missionId: "mis_abstract_classes",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to abstract class theory: abstract vs interface, constructors/shared state, and documenting protected extension hooks.",
    ru: "Бесштрафной переход к теории абстрактных классов: abstract vs interface, конструкторы/общее состояние и документирование protected-хуков расширения."
  }
};

const stage5: TheoryStage = {
  id: "stg_ac_theory",
  missionId: "mis_abstract_classes",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering abstract classes, final settle() skeletons, protected hooks, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории об абстрактных классах, final-скелете settle(), protected-хуках и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_abstract_classes"
};

const stage6: BaseMissionStage = {
  id: "stg_ac_visual",
  missionId: "mis_abstract_classes",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Settlement Lifecycle Visualization", ru: "6. Визуализация Жизненного Цикла Settlement" },
  instructions: {
    en: "Compare a subclass that overrides settle() (skips audit) against a final settle() skeleton that always runs validate → authorize → capture → audit via protected hooks.",
    ru: "Сравните подкласс, переопределяющий settle() (пропуск audit), с final-скелетом settle(), который всегда выполняет validate → authorize → capture → audit через protected-хуки."
  }
};

const stage7: PracticeStage = {
  id: "stg_ac_practice",
  missionId: "mis_abstract_classes",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to lock AbstractSettlementProcessor's lifecycle: final settle(), abstract/protected authorize & capture hooks, private audit.",
    ru: "Соберите элементы кода для фиксации lifecycle AbstractSettlementProcessor: final settle(), abstract/protected хуки authorize и capture, private audit."
  },
  challengeId: "chl_ac_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ac_interview_q",
  missionId: "mis_abstract_classes",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about abstract-class extension contracts and settlement lifecycle hook bypass.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о контрактах расширения абстрактных классов и обходе хуков lifecycle settlement."
  },
  interviewQuestionId: "q_ac_settlement_01",
  challengeId: "chl_ac_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ac_interview_a",
  missionId: "mis_abstract_classes",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Abstract Class Mechanics + Extension Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Abstract Class + Компромиссы расширения) и отправьте на проверку."
  },
  interviewQuestionId: "q_ac_settlement_01",
  challengeId: "chl_ac_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ac_debug",
  missionId: "mis_abstract_classes",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: settle() Hook Bypass", ru: "10. Поиск Бага: Обход Хуков settle()" },
  instructions: {
    en: "Identify the line(s) where WireSettlementProcessor overrides settle() (or mutates protected state) and skips the mandatory audit step.",
    ru: "Найдите строку(и), где WireSettlementProcessor переопределяет settle() (или мутирует protected-состояние) и пропускает обязательный шаг audit."
  },
  challengeId: "chl_ac_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ac_related",
  missionId: "mis_abstract_classes",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to abstraction, inheritance, and Template Method — note this mission focuses on abstract class vs interface and protected state, not the full GoF Template Method catalog.",
    ru: "Исследуйте связи Графа Знаний к абстракции, наследованию и Template Method — эта миссия фокусируется на abstract class vs interface и protected-состоянии, а не на полном каталоге GoF Template Method."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ac_results",
  missionId: "mis_abstract_classes",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ac_reflection",
  missionId: "mis_abstract_classes",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a subclass that overrides a public lifecycle method instead of documented protected hooks.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните подкласс, переопределяющий публичный lifecycle-метод вместо документированных protected-хуков."
  }
};

export const ABSTRACT_CLASSES_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const ABSTRACT_CLASSES_MISSION: Mission = {
  id: "mis_abstract_classes",
  primaryTopicId: "top_oop_08",
  secondaryTopicIds: ["top_oop_07", "top_oop_10", "top_oop_29"],
  slug: "settlement-processor-hook-bypass",
  title: {
    en: "Skipped Lifecycle Steps: AbstractSettlementProcessor Hook Bypass",
    ru: "Пропущенные Шаги Жизненного Цикла: Обход Хуков AbstractSettlementProcessor"
  },
  description: {
    en: "Lock AbstractSettlementProcessor so settle() always runs validate → authorize → capture → audit. CardSettlementProcessor and WireSettlementProcessor currently override settle() or misuse protected state, leaving production settlements without an audit trail.",
    ru: "Зафиксируйте AbstractSettlementProcessor так, чтобы settle() всегда выполнял validate → authorize → capture → audit. CardSettlementProcessor и WireSettlementProcessor сейчас переопределяют settle() или злоупотребляют protected-состоянием, оставляя settlements на продакшене без audit trail."
  },
  scenarioIntroduction: {
    en: "Monday compliance review: overnight CARD and WIRE settlements cleared funds, but the audit ledger has gaps — capture succeeded, audit never ran. Root cause: AbstractSettlementProcessor documented a four-step settle() lifecycle, yet WireSettlementProcessor overrode settle() for a 'fast path' that called authorize + capture only. CardSettlementProcessor mutated protected fields mid-flow and short-circuited. The abstract class invited inheritance of state but never sealed the skeleton — Effective Java Item 19 in production form.",
    ru: "Понедельник, compliance-ревью: ночные CARD- и WIRE-settlements провели средства, но в audit ledger дыры — capture успешен, audit не вызывался. Корневая причина: AbstractSettlementProcessor документировал четырёхшаговый lifecycle settle(), но WireSettlementProcessor переопределил settle() для «fast path» только с authorize + capture. CardSettlementProcessor мутировал protected-поля mid-flow и оборвал цепочку. Абстрактный класс приглашал наследование состояния, но не закрепил скелет — Effective Java Item 19 в продакшн-форме."
  },
  engineeringProblem: {
    en: "AbstractSettlementProcessor.settle(SettlementContext) is meant to orchestrate validate → authorize → capture → audit and return SettlementResult. Subclasses (CardSettlementProcessor, WireSettlementProcessor) must vary only rail-specific authorize/capture. Broken design: settle() is overridable; protected mutable state is not documented. Subclasses skip audit or corrupt invariants. Solution: final settle() template; abstract/protected hooks for authorize and capture; private audit; document the extension contract (constructors, protected API) — abstract class for shared state, not a free-form override surface. Distinct from a full Template Method catalog mission: emphasis is abstract vs interface, constructors, and protected state discipline.",
    ru: "AbstractSettlementProcessor.settle(SettlementContext) должен оркестрировать validate → authorize → capture → audit и возвращать SettlementResult. Подклассы (CardSettlementProcessor, WireSettlementProcessor) должны варьировать только rail-specific authorize/capture. Сломанный дизайн: settle() переопределяем; protected мутабельное состояние не документировано. Подклассы пропускают audit или портят инварианты. Решение: final settle() template; abstract/protected хуки authorize и capture; private audit; документировать контракт расширения (конструкторы, protected API) — абстрактный класс для общего состояния, а не свободная поверхность override. Отличие от полной миссии Template Method: акцент на abstract vs interface, конструкторах и дисциплине protected-состояния."
  },
  learningObjectives: [
    {
      en: "Choose abstract class over interface when subclasses must share constructors, fields, and a controlled protected API",
      ru: "Выбирать абстрактный класс вместо интерфейса, когда подклассам нужны общие конструкторы, поля и контролируемый protected API"
    },
    {
      en: "Make the public lifecycle method final and expose only documented abstract/protected step hooks",
      ru: "Делать публичный lifecycle-метод final и открывать только документированные abstract/protected хуки шагов"
    },
    {
      en: "Prevent subclasses from bypassing mandatory steps (e.g., audit) by overriding settle()",
      ru: "Не давать подклассам обходить обязательные шаги (например, audit) через переопределение settle()"
    },
    {
      en: "Document the extension contract for protected state — design for inheritance or prohibit it (Effective Java Item 19)",
      ru: "Документировать контракт расширения для protected-состояния — проектировать для наследования или запрещать его (Effective Java Item 19)"
    }
  ],
  requiredConceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
  recommendedConceptIds: ["cpt_access_modifiers", "cpt_fragile_base_class", "cpt_composition_over_inheritance"],
  stageIds: ABSTRACT_CLASSES_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ac_fix_builder", "chl_ac_bughunt", "chl_ac_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
