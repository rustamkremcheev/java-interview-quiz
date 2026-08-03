import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_inh_intro",
  missionId: "mis_inheritance",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where LiquidityReport, RiskExposureReport, and CapitalAdequacyReport silently emitted wrong regulatory filings after a BaseRegulatoryReport platform upgrade.",
    ru: "Изучите инцидент на продакшене, где LiquidityReport, RiskExposureReport и CapitalAdequacyReport молча выдали неверные регуляторные filings после апгрейда платформы BaseRegulatoryReport."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_inh_problem",
  missionId: "mis_inheritance",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine how subclasses coupled to undocumented protected fields/methods of BaseRegulatoryReport — constructor order and changed appendSection semantics produced wrong header versions and double-serialized sections.",
    ru: "Изучите, как подклассы связались с недокументированными protected-полями/методами BaseRegulatoryReport — порядок конструкторов и изменённая семантика appendSection дали неверные версии заголовка и дважды сериализованные секции."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_inh_think",
  missionId: "mis_inheritance",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why did changing BaseRegulatoryReport protected internals break LiquidityReport without a compile error, and what does constructor chaining imply for inherited state?",
    ru: "Сформулируйте гипотезу: почему изменение protected-внутренностей BaseRegulatoryReport сломало LiquidityReport без ошибки компиляции, и что цепочка конструкторов означает для унаследованного состояния?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_inh_help",
  missionId: "mis_inheritance",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to inheritance mechanics: IS-A, constructor order, protected coupling, and brittle base class risks.",
    ru: "Бесштрафной переход к механике наследования: IS-A, порядок конструкторов, protected-связность и риски хрупкого базового класса."
  }
};

const stage5: TheoryStage = {
  id: "stg_inh_theory",
  missionId: "mis_inheritance",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering inheritance, inherited protected state, constructor chaining, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о наследовании, унаследованном protected-состоянии, цепочке конструкторов и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_inheritance"
};

const stage6: BaseMissionStage = {
  id: "stg_inh_visual",
  missionId: "mis_inheritance",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Inheritance Chain Visualization", ru: "6. Визуализация Цепочки Наследования" },
  instructions: {
    en: "Compare fragile subclass coupling to BaseRegulatoryReport protected internals against a sealed/documented extension contract (and optional composition for report assembly).",
    ru: "Сравните хрупкую связность подклассов с protected-внутренностями BaseRegulatoryReport против sealed/документированного контракта расширения (и опциональной композиции для сборки отчёта)."
  }
};

const stage7: PracticeStage = {
  id: "stg_inh_practice",
  missionId: "mis_inheritance",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural elements required to stop silent subclass breakage: document/seal extension points and demonstrate safe constructor + protected contracts.",
    ru: "Соберите элементы, чтобы остановить тихую поломку подклассов: документировать/запечатать точки расширения и показать безопасный контракт конструкторов + protected."
  },
  challengeId: "chl_inh_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_inh_interview_q",
  missionId: "mis_inheritance",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about silent BaseRegulatoryReport subclass breakage after a platform protected-API change.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о тихой поломке подклассов BaseRegulatoryReport после изменения protected-API платформы."
  },
  interviewQuestionId: "q_inh_report_01",
  challengeId: "chl_inh_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_inh_interview_a",
  missionId: "mis_inheritance",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Inheritance Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Наследования + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_inh_report_01",
  challengeId: "chl_inh_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_inh_debug",
  missionId: "mis_inheritance",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Protected Coupling", ru: "10. Поиск Бага: Protected-Связность" },
  instructions: {
    en: "Identify the line(s) in LiquidityReport where late headerVersion mutation and double-serialized appendSection produce wrong filings.",
    ru: "Найдите строку(и) в LiquidityReport, где поздняя мутация headerVersion и двойная сериализация в appendSection портят filings."
  },
  challengeId: "chl_inh_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_inh_related",
  missionId: "mis_inheritance",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to abstract classes, composition vs inheritance, and method overriding.",
    ru: "Исследуйте связи Графа Знаний к абстрактным классам, композиции vs наследованию и переопределению методов."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_inh_results",
  missionId: "mis_inheritance",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_inh_reflection",
  missionId: "mis_inheritance",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject undocumented protected coupling to a shared base class in code review.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните недокументированную protected-связность с общим базовым классом."
  }
};

export const INHERITANCE_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const INHERITANCE_MISSION: Mission = {
  id: "mis_inheritance",
  primaryTopicId: "top_oop_10",
  secondaryTopicIds: ["top_oop_16", "top_oop_08", "top_oop_15"],
  slug: "fragile-regulatory-report-base",
  title: {
    en: "Silent Subclass Breakage: Inheritance Risks in BaseRegulatoryReport",
    ru: "Тихая Поломка Подклассов: Риски Наследования в BaseRegulatoryReport"
  },
  description: {
    en: "Diagnose why LiquidityReport, RiskExposureReport, and CapitalAdequacyReport silently produced wrong regulatory filings after BaseRegulatoryReport protected field/method semantics changed — wrong header version and double-serialized sections — then design sealed/documented extension points (composition only as a trade-off).",
    ru: "Диагностируйте, почему LiquidityReport, RiskExposureReport и CapitalAdequacyReport молча выдали неверные регуляторные filings после изменения семантики protected-полей/методов BaseRegulatoryReport — неверная версия заголовка и дважды сериализованные секции — затем спроектируйте sealed/документированные точки расширения (композиция только как компромисс)."
  },
  scenarioIntroduction: {
    en: "Quarter-end regulatory filing night. Compliance opens LiquidityReport, RiskExposureReport, and CapitalAdequacyReport submissions and finds wrong header versions plus garbled (double-encoded) sections. No subclass failed to compile. The platform team had 'refactored' BaseRegulatoryReport: bumped the default protected headerVersion and made appendSection auto-Base64-wrap payloads. Subclasses that mutated headerVersion after super(...) and that already encoded payloads kept compiling — and silently filed wrong reports. This is inheritance mechanics failure: constructor order, protected coupling, and a brittle base — not a decorator/composition rewrite story.",
    ru: "Ночь квартальной регуляторной сдачи. Compliance открывает submissions LiquidityReport, RiskExposureReport и CapitalAdequacyReport и видит неверные версии заголовка плюс испорченные (дважды закодированные) секции. Ни один подкласс не перестал компилироваться. Платформенная команда 'отрефакторила' BaseRegulatoryReport: подняла default protected headerVersion и заставила appendSection автоматически Base64-оборачивать payload. Подклассы, мутирующие headerVersion после super(...) и уже кодирующие payload, продолжили компилироваться — и молча сдали неверные отчёты. Это сбой механики наследования: порядок конструкторов, protected-связность и хрупкий base — не история про decorator/composition rewrite."
  },
  engineeringProblem: {
    en: "BaseRegulatoryReport shares formatting/header logic via protected fields (headerVersion) and protected methods (writeRegulatoryHeader, appendSection). LiquidityReport / RiskExposureReport / CapitalAdequacyReport extend it (IS-A) and rely on undocumented internals: mutate headerVersion after super() (too late — header already written) and pass pre-encoded payloads into appendSection. Platform changed protected semantics (new default version; appendSection now encodes). Solution focus: design and document for inheritance or seal it — final skeleton, documented protected hooks, constructor-safe contracts — and treat composition for report assembly as an explicit trade-off when the base was never designed for extension.",
    ru: "BaseRegulatoryReport разделяет логику форматирования/заголовка через protected-поля (headerVersion) и protected-методы (writeRegulatoryHeader, appendSection). LiquidityReport / RiskExposureReport / CapitalAdequacyReport наследуют его (IS-A) и опираются на недокументированные внутренности: мутируют headerVersion после super() (слишком поздно — заголовок уже записан) и передают уже закодированные payload в appendSection. Платформа изменила protected-семантику (новый default version; appendSection теперь кодирует). Фокус решения: проектировать и документировать для наследования или запретить его — final-скелет, документированные protected-хуки, безопасные для конструктора контракты — а композицию сборки отчёта рассматривать как явный компромисс, когда base никогда не был спроектирован для расширения."
  },
  learningObjectives: [
    {
      en: "Explain IS-A inheritance, constructor chaining order, and how subclasses inherit state from a base class",
      ru: "Объяснить наследование IS-A, порядок цепочки конструкторов и как подклассы наследуют состояние базового класса"
    },
    {
      en: "Diagnose silent breakage when subclasses couple to undocumented protected fields/methods whose semantics change",
      ru: "Диагностировать тихую поломку, когда подклассы связываются с недокументированными protected-полями/методами с меняющейся семантикой"
    },
    {
      en: "Apply Effective Java Item 19: design and document for inheritance or else prohibit/seal it",
      ru: "Применить Effective Java Item 19: проектировать и документировать для наследования или запретить/запечатать его"
    },
    {
      en: "State composition for report assembly as a trade-off — without turning the mission into a composition-over-inheritance rewrite",
      ru: "Сформулировать композицию сборки отчёта как компромисс — не превращая миссию в rewrite composition-over-inheritance"
    }
  ],
  requiredConceptIds: ["cpt_inheritance", "cpt_inherited_state"],
  recommendedConceptIds: ["cpt_fragile_base_class", "cpt_access_modifiers", "cpt_abstract_class"],
  stageIds: INHERITANCE_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_inh_fix_builder", "chl_inh_bughunt", "chl_inh_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
