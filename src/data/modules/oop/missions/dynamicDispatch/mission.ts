import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_dd_intro",
  missionId: "mis_dynamic_dispatch",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the latency regression below where RiskEventProcessor hot-loop p99 spiked after a static helper refactor in the risk pricing engine.",
    ru: "Изучите регрессию латентности, где p99 hot-loop RiskEventProcessor вырос после рефакторинга на static helper в risk pricing engine."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_dd_problem",
  missionId: "mis_dynamic_dispatch",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine RiskEventProcessor calling RiskHandlers.evaluate(handler, event) — a static helper that binds at compile time — while eight concrete RiskHandler types share one megamorphic call site.",
    ru: "Изучите RiskEventProcessor, вызывающий RiskHandlers.evaluate(handler, event) — static helper с compile-time связыванием — при восьми конкретных типах RiskHandler на одном мегаморфном call site."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_dd_think",
  missionId: "mis_dynamic_dispatch",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does a static helper (or static method on the base type) fail to select CardExposureHandler / WireExposureHandler / AchExposureHandler overrides at runtime?",
    ru: "Сформулируйте гипотезу: почему static helper (или static-метод на базовом типе) не выбирает overrides CardExposureHandler / WireExposureHandler / AchExposureHandler во время выполнения?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_dd_help",
  missionId: "mis_dynamic_dispatch",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to deep theory on JVMS 6.5 invokevirtual / invokestatic / invokeinterface, static method hiding, and HotSpot monomorphic vs megamorphic call sites.",
    ru: "Бесштрафной переход к теории JVMS 6.5 invokevirtual / invokestatic / invokeinterface, static method hiding и monomorphic vs megamorphic call sites в HotSpot."
  }
};

const stage5: TheoryStage = {
  id: "stg_dd_theory",
  missionId: "mis_dynamic_dispatch",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering bytecode dispatch instructions, call-site polymorphism, static hiding, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о байткод-инструкциях диспетчеризации, полиморфизме call site, static hiding и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_dynamic_dispatch"
};

const stage6: BaseMissionStage = {
  id: "stg_dd_visual",
  missionId: "mis_dynamic_dispatch",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Dispatch Path Visualization", ru: "6. Визуализация Пути Диспетчеризации" },
  instructions: {
    en: "Compare invokestatic binding (static helper) vs invokeinterface/invokevirtual polymorphic dispatch through RiskHandler.evaluate(event) in the hot loop.",
    ru: "Сравните связывание invokestatic (static helper) с полиморфной диспетчеризацией invokeinterface/invokevirtual через RiskHandler.evaluate(event) в hot loop."
  }
};

const stage7: PracticeStage = {
  id: "stg_dd_practice",
  missionId: "mis_dynamic_dispatch",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to restore polymorphic dispatch and reduce megamorphism in RiskEventProcessor.",
    ru: "Соберите элементы кода для восстановления полиморфной диспетчеризации и снижения мегаморфизма в RiskEventProcessor."
  },
  challengeId: "chl_dd_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_dd_interview_q",
  missionId: "mis_dynamic_dispatch",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about dynamic dispatch, bytecode instructions, and megamorphic hot loops in risk pricing engines.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о динамической диспетчеризации, байткод-инструкциях и мегаморфных hot loops в risk pricing engines."
  },
  interviewQuestionId: "q_dd_risk_01",
  challengeId: "chl_dd_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_dd_interview_a",
  missionId: "mis_dynamic_dispatch",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + JVMS Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика JVMS + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_dd_risk_01",
  challengeId: "chl_dd_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_dd_debug",
  missionId: "mis_dynamic_dispatch",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: ExposureRouter", ru: "10. Поиск Бага: ExposureRouter" },
  instructions: {
    en: "Identify the line in ExposureRouter where a static method call (or instanceof switch) prevents true polymorphic dispatch of RiskHandler.evaluate.",
    ru: "Найдите строку в ExposureRouter, где вызов static-метода (или instanceof switch) блокирует истинную полиморфную диспетчеризацию RiskHandler.evaluate."
  },
  challengeId: "chl_dd_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_dd_related",
  missionId: "mis_dynamic_dispatch",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to polymorphism, method overriding, and JVM memory / object layout for vtable understanding.",
    ru: "Исследуйте связи Графа Знаний для перехода к полиморфизму, переопределению методов и JVM memory / object layout для понимания vtable."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_dd_results",
  missionId: "mis_dynamic_dispatch",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_dd_reflection",
  missionId: "mis_dynamic_dispatch",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which dispatch or call-site rule you will enforce in hot-path code reviews.",
    ru: "Напишите 1 предложение о том, какое правило диспетчеризации или call site вы введете на код-ревью hot-path."
  }
};

export const DYNAMIC_DISPATCH_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const DYNAMIC_DISPATCH_MISSION: Mission = {
  id: "mis_dynamic_dispatch",
  primaryTopicId: "top_oop_12",
  secondaryTopicIds: ["top_oop_11", "top_oop_15", "top_oop_37"],
  slug: "megamorphic-risk-handler-dispatch",
  title: {
    en: "The Megamorphic Hot Loop: Dynamic Dispatch in RiskEventProcessor",
    ru: "Мегаморфный Hot Loop: Динамическая Диспетчеризация в RiskEventProcessor"
  },
  description: {
    en: "Restore correct polymorphic dispatch in a risk pricing hot loop where a static helper (invokestatic) hid runtime overrides, and eight concrete RiskHandler types made the call site megamorphic — blocking HotSpot inlining at 1M events/sec.",
    ru: "Восстановите корректную полиморфную диспетчеризацию в hot loop risk pricing, где static helper (invokestatic) скрыл runtime overrides, а восемь конкретных RiskHandler сделали call site мегаморфным — заблокировав inlining HotSpot при 1M events/sec."
  },
  scenarioIntroduction: {
    en: "The risk pricing engine processes one million RiskEvent records per second. After a 'cleanup' PR, RiskEventProcessor stopped calling handler.evaluate(event) directly and instead routed through RiskHandlers.evaluate(handler, event) — a static utility. Latency dashboards showed p99 climbing; async-profiler blamed megamorphic interface calls and missing inlining. Worse: some handlers appeared never to run their specialized exposure logic because static binding selected the base implementation.",
    ru: "Risk pricing engine обрабатывает миллион записей RiskEvent в секунду. После 'cleanup' PR RiskEventProcessor перестал вызывать handler.evaluate(event) напрямую и направил вызовы через RiskHandlers.evaluate(handler, event) — static utility. Дашборды латентности показали рост p99; async-profiler указал на мегаморфные interface calls и отсутствие inlining. Хуже: часть handler-ов, казалось, никогда не выполняла специализированную логику exposure из-за static binding базовой реализации."
  },
  engineeringProblem: {
    en: "RiskEventProcessor holds a RiskHandler reference and must invoke evaluate(RiskEvent) via invokeinterface/invokevirtual so CardExposureHandler, WireExposureHandler, AchExposureHandler (and five sibling handlers) resolve at runtime. The broken path uses RiskHandlers.evaluate(handler, event) or base-type static methods — emitted as invokestatic — which cannot polymorphic-dispatch. Separately, a single call site seeing 8 concrete types is megamorphic: HotSpot stops bimorphic inlining and pays full itable/vtable lookup cost. Fix: instance polymorphic calls plus sealed hierarchy or split call sites to restore monomorphic/bimorphic profiles.",
    ru: "RiskEventProcessor хранит ссылку RiskHandler и должен вызывать evaluate(RiskEvent) через invokeinterface/invokevirtual, чтобы CardExposureHandler, WireExposureHandler, AchExposureHandler (и пять соседних handler-ов) разрешались в runtime. Сломанный путь использует RiskHandlers.evaluate(handler, event) или static-методы базового типа — эмитится как invokestatic — и не может полиморфно диспетчеризовать. Отдельно, один call site с 8 конкретными типами мегаморфен: HotSpot прекращает bimorphic inlining и платит полную стоимость itable/vtable lookup. Фикс: instance-полиморфные вызовы плюс sealed hierarchy или split call sites для восстановления monomorphic/bimorphic профилей."
  },
  learningObjectives: [
    {
      en: "Distinguish invokestatic (compile-time bind) from invokevirtual / invokeinterface (runtime polymorphic dispatch)",
      ru: "Различать invokestatic (compile-time bind) и invokevirtual / invokeinterface (runtime полиморфная диспетчеризация)"
    },
    {
      en: "Explain static method hiding vs instance method overriding and why base-type static calls never select subclasses",
      ru: "Объяснить static method hiding vs instance method overriding и почему static-вызовы через базовый тип никогда не выбирают подклассы"
    },
    {
      en: "Classify HotSpot call sites as monomorphic, bimorphic, or megamorphic and relate them to JIT inlining",
      ru: "Классифицировать call sites HotSpot как monomorphic, bimorphic или megamorphic и связать с JIT inlining"
    },
    {
      en: "Apply sealed RiskHandler hierarchies or split call sites to reduce megamorphism in 1M events/sec hot loops",
      ru: "Применять sealed-иерархии RiskHandler или split call sites для снижения мегаморфизма в hot loops на 1M events/sec"
    }
  ],
  requiredConceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
  recommendedConceptIds: ["cpt_liskov_substitution"],
  stageIds: DYNAMIC_DISPATCH_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_dd_fix_builder", "chl_dd_bughunt", "chl_dd_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
