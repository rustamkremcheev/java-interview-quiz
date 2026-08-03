import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_jol_intro",
  missionId: "mis_jvm_memory_object_layout",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Investigate why PositionCache capacity math predicted ~8 GB but the heap climbed past 40 GB under load.",
    ru: "Разберитесь, почему расчёт ёмкости PositionCache предсказывал ~8 GB, а куча под нагрузкой выросла за 40 GB."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_jol_problem",
  missionId: "mis_jvm_memory_object_layout",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Inspect PositionSnapshot field sums versus HotSpot headers, alignment, boxing, and retained graphs measured with JOL.",
    ru: "Сравните сумму полей PositionSnapshot с заголовками HotSpot, alignment, boxing и retained graphs, измеренными через JOL."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_jol_think",
  missionId: "mis_jvm_memory_object_layout",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Hypothesize why summing field sizes underestimates heap: headers, compressed oops, padding, boxed numbers, nested RiskBucket graphs.",
    ru: "Сформулируйте гипотезу, почему сумма размеров полей занижает кучу: headers, compressed oops, padding, boxed numbers, вложенные графы RiskBucket."
  }
};

const stage4: BaseMissionStage = {
  id: "stg_jol_help",
  missionId: "mis_jvm_memory_object_layout",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to object headers, compressed oops, shallow vs retained size, and JOL vs JLS vs HotSpot.",
    ru: "Бесштрафной переход к object headers, compressed oops, shallow vs retained size и различию JOL vs JLS vs HotSpot."
  }
};

const stage5: TheoryStage = {
  id: "stg_jol_theory",
  missionId: "mis_jvm_memory_object_layout",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study four sections: layout model, HotSpot/JOL mechanics, capacity trade-offs, and senior follow-ups — without claiming a universal header size.",
    ru: "Изучите четыре раздела: модель layout, механика HotSpot/JOL, компромиссы ёмкости и senior follow-ups — без утверждения универсального размера заголовка."
  },
  theoryArticleId: "art_theory_jvm_memory_object_layout"
};

const stage6: BaseMissionStage = {
  id: "stg_jol_visual",
  missionId: "mis_jvm_memory_object_layout",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Object Layout Visualization", ru: "6. Визуализация Object Layout" },
  instructions: {
    en: "Picture one PositionSnapshot on a common 64-bit HotSpot config with compressed oops/class pointers: mark/klass metadata, aligned fields, then each boxed Long/Double as a separate object. Contrast with a flatter primitive PortfolioPosition. Zoom out to PositionCache retaining millions of snapshots plus nested RiskBucket lists — shallow field sums vs retained size. (Interactive MissionPage viz ships separately.)",
    ru: "Представьте один PositionSnapshot на типичной 64-bit конфигурации HotSpot с compressed oops/class pointers: mark/klass metadata, выровненные поля, затем каждый boxed Long/Double как отдельный объект. Сравните с более плоским примитивным PortfolioPosition. Отдалите взгляд на PositionCache с миллионами snapshots плюс вложенные списки RiskBucket — сумма shallow-полей vs retained size. (Интерактивная viz на MissionPage — отдельно.)"
  }
};

const stage7: PracticeStage = {
  id: "stg_jol_practice",
  missionId: "mis_jvm_memory_object_layout",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes: flatter primitive representation, correct capacity math including overhead, and JOL-based measurement — not field-byte slogans.",
    ru: "Соберите структурные исправления: более плоское примитивное представление, корректный расчёт ёмкости с overhead и измерение через JOL — не слоганы про байты полей."
  },
  challengeId: "chl_jol_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_jol_interview_q",
  missionId: "mis_jvm_memory_object_layout",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the staff prompt about heap surprise in a high-volume PositionCache and how you would explain layout costs.",
    ru: "Ознакомьтесь со staff-промптом о heap surprise в high-volume PositionCache и как вы объясните стоимость layout."
  },
  interviewQuestionId: "q_jol_cache_01",
  challengeId: "chl_jol_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_jol_interview_a",
  missionId: "mis_jvm_memory_object_layout",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Explain headers/alignment/boxing/retained size carefully (no fixed universal header claim) and your production fix path.",
    ru: "Аккуратно объясните headers/alignment/boxing/retained size (без фиксированного универсального заголовка) и путь продакшн-фикса."
  },
  interviewQuestionId: "q_jol_cache_01",
  challengeId: "chl_jol_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_jol_debug",
  missionId: "mis_jvm_memory_object_layout",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Capacity Math", ru: "10. Поиск Бага: Расчёт Ёмкости" },
  instructions: {
    en: "Find the defect lines: field-only byte estimate, boxed snapshot fields, and capacity from sizeof-fields alone.",
    ru: "Найдите строки дефекта: оценка только по полям, boxed-поля snapshot и ёмкость из одного sizeof-полей."
  },
  challengeId: "chl_jol_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_jol_related",
  missionId: "mis_jvm_memory_object_layout",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Connect to class/object identity and immutability — without treating records as zero-overhead structs.",
    ru: "Свяжите с class/object identity и immutability — не считая records zero-overhead структурами."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_jol_results",
  missionId: "mis_jvm_memory_object_layout",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики, укрепившиеся концепции и XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_jol_reflection",
  missionId: "mis_jvm_memory_object_layout",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write one sentence on when you will reject a capacity estimate that sums field sizes without JOL/retained analysis.",
    ru: "Одно предложение: когда вы отклоните оценку ёмкости, суммирующую размеры полей без JOL/retained анализа."
  }
};

export const JVM_MEMORY_OBJECT_LAYOUT_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const JVM_MEMORY_OBJECT_LAYOUT_MISSION: Mission = {
  id: "mis_jvm_memory_object_layout",
  primaryTopicId: "top_oop_37",
  secondaryTopicIds: ["top_oop_02", "top_oop_22"],
  slug: "heap-surprise-position-cache-layout",
  title: {
    en: "The 40-GB Heap Surprise: Java Object Layout in a High-Volume Position Cache",
    ru: "Сюрприз 40-GB Кучи: Java Object Layout в High-Volume Position Cache"
  },
  description: {
    en: "Fix PositionCache capacity planning that summed PositionSnapshot field sizes only — headers, alignment, boxing, and retained RiskBucket graphs made the heap several× larger.",
    ru: "Исправьте планирование ёмкости PositionCache, суммировавшее только размеры полей PositionSnapshot — headers, alignment, boxing и retained графы RiskBucket сделали кучу в несколько раз больше."
  },
  scenarioIntroduction: {
    en: "Risk engineering sized PositionCache for 50M PositionSnapshot entries by adding field widths: a few longs and doubles — about 40–48 bytes — times 50M ≈ 2–2.5 GB, plus map overhead 'maybe 8 GB total'. Overnight the HotSpot heap crossed 40 GB and GC stalled. JOL internals/footprint on a sample showed headers, alignment padding, and every boxed Long/Double as another object. Nested RiskBucket lists dominated retained size. Records did not make the problem disappear — they are still heap objects.",
    ru: "Risk engineering оценил PositionCache на 50M записей PositionSnapshot, сложив ширины полей: несколько long и double — около 40–48 байт — × 50M ≈ 2–2.5 GB плюс overhead map «может 8 GB всего». За ночь куча HotSpot перешагнула 40 GB, GC встал. JOL internals/footprint на sample показал headers, alignment padding и каждый boxed Long/Double как отдельный объект. Вложенные списки RiskBucket доминировали в retained size. Records проблему не убрали — это всё ещё объекты в куче."
  },
  engineeringProblem: {
    en: "Capacity used naive field-byte arithmetic. On a common 64-bit HotSpot configuration with compressed oops/class pointers, each object still carries mark/klass metadata and alignment; exact header bytes are configuration-dependent — never claim a single universal size. Boxing turns primitives into extra objects. Shallow size ≠ retained size when PositionSnapshot points at RiskBucket graphs. Fix: flatter primitive PortfolioPosition (or equivalent), measure with JOL, size cache from retained footprint + map overhead, not field slogans. JLS defines language objects; HotSpot chooses layout; JOL measures a running JVM.",
    ru: "Ёмкость считали наивной арифметикой байт полей. На типичной 64-bit конфигурации HotSpot с compressed oops/class pointers каждый объект всё ещё несёт mark/klass metadata и alignment; точные байты заголовка зависят от конфигурации — никогда не утверждайте единый универсальный размер. Boxing превращает примитивы в лишние объекты. Shallow size ≠ retained size, когда PositionSnapshot указывает на графы RiskBucket. Фикс: более плоский примитивный PortfolioPosition (или эквивалент), измерение через JOL, размер кэша от retained footprint + overhead map, не от слоганов полей. JLS определяет языковые объекты; HotSpot выбирает layout; JOL измеряет работающую JVM."
  },
  learningObjectives: [
    {
      en: "Explain object layout costs without claiming a fixed universal header size",
      ru: "Объяснять стоимость object layout без фиксированного универсального размера заголовка"
    },
    {
      en: "Distinguish JLS language model, HotSpot layout, and JOL measurements",
      ru: "Различать языковую модель JLS, layout HotSpot и измерения JOL"
    },
    {
      en: "Contrast shallow field sums with retained size including boxing and nested graphs",
      ru: "Противопоставлять сумму shallow-полей retained size с boxing и вложенными графами"
    },
    {
      en: "Redesign PositionSnapshot/PositionCache capacity math for high-volume caches",
      ru: "Перепроектировать PositionSnapshot/PositionCache и расчёт ёмкости для high-volume кэшей"
    }
  ],
  requiredConceptIds: ["cpt_object_header", "cpt_compressed_oops", "cpt_shallow_vs_retained_size"],
  recommendedConceptIds: ["cpt_class_vs_object", "cpt_immutability"],
  stageIds: JVM_MEMORY_OBJECT_LAYOUT_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_jol_fix_builder", "chl_jol_bughunt", "chl_jol_interview_answer"],
  estimatedMinutes: 35,
  difficulty: "STAFF",
  xpReward: 350,
  version: "1.0.0"
};
