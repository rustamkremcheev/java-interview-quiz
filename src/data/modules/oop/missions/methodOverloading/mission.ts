import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ol_intro",
  missionId: "mis_method_overloading",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Ledger Amount Skew Incident", ru: "1. Инцидент Искажения Сумм в Леджере" },
  instructions: {
    en: "Inspect the production incident below where LedgerPostingService.settle(...) posted incorrect ledger amounts after an Integer/null argument resolved to the wrong overload.",
    ru: "Изучите инцидент на продакшене, где LedgerPostingService.settle(...) записал неверные суммы в леджер после разрешения Integer/null в неправильную перегрузку."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ol_problem",
  missionId: "mis_method_overloading",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine LedgerPostingService with settle(long), settle(Long), settle(BigDecimal), and settle(String) — four overloads that look convenient but resolve at compile time with surprising autoboxing and most-specific rules.",
    ru: "Изучите LedgerPostingService с settle(long), settle(Long), settle(BigDecimal) и settle(String) — четыре перегрузки, удобные на вид, но разрешаемые на этапе компиляции с неожиданным автобоксингом и правилом most-specific."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ol_think",
  missionId: "mis_method_overloading",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why did settle(null) fail to compile (or pick a surprising path), and why did an Integer cents value not behave like settle(Long) at runtime?",
    ru: "Сформулируйте гипотезу: почему settle(null) не компилировался (или выбрал неожиданный путь), и почему Integer-центы не вели себя как settle(Long) в рантайме?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ol_help",
  missionId: "mis_method_overloading",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty transition to JLS overload resolution phases, autoboxing traps, and compile-time vs runtime dispatch.",
    ru: "Бесштрафной переход к фазам разрешения перегрузок JLS, ловушкам автобоксинга и различию compile-time vs runtime диспетчеризации."
  }
};

const stage5: TheoryStage = {
  id: "stg_ol_theory",
  missionId: "mis_method_overloading",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the theory sections on overload resolution, autoboxing ambiguities, named-method API design, and 12 senior interview follow-up questions.",
    ru: "Изучите разделы теории о разрешении перегрузок, неоднозначностях автобоксинга, именованных API и 12 вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_overloading"
};

const stage6: BaseMissionStage = {
  id: "stg_ol_visual",
  missionId: "mis_method_overloading",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Overload Resolution Map", ru: "6. Визуализация Разрешения Перегрузок" },
  instructions: {
    en: "Compare which settle overload the compiler selects for int, Integer, Long, BigDecimal, String, and null — and contrast that with runtime override dispatch.",
    ru: "Сравните, какую перегрузку settle выбирает компилятор для int, Integer, Long, BigDecimal, String и null — и сопоставьте это с runtime-диспетчеризацией override."
  }
};

const stage7: PracticeStage = {
  id: "stg_ol_practice",
  missionId: "mis_method_overloading",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Select production-safe API redesigns that eliminate ambiguous settle overloads without losing cents vs decimal posting semantics.",
    ru: "Выберите безопасные решения, устраняющие неоднозначные перегрузки settle без потери семантики центов vs decimal."
  },
  challengeId: "chl_ol_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ol_interview_q",
  missionId: "mis_method_overloading",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about method overloading traps in ledger posting APIs.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о ловушках перегрузки методов в ledger posting API."
  },
  interviewQuestionId: "q_ol_ledger_01",
  challengeId: "chl_ol_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ol_interview_a",
  missionId: "mis_method_overloading",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your 90-second structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ol_ledger_01",
  challengeId: "chl_ol_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ol_debug",
  missionId: "mis_method_overloading",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Ambiguous Settle", ru: "10. Поиск Бага: Неоднозначный Settle" },
  instructions: {
    en: "Identify the lines where dangerous overloads are declared and where a client call resolves to the wrong settle path.",
    ru: "Найдите строки, где объявлены опасные перегрузки и где клиентский вызов разрешается в неверный путь settle."
  },
  challengeId: "chl_ol_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ol_related",
  missionId: "mis_method_overloading",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge & Follow-ups", ru: "11. Связанные Знания и Вопросы" },
  instructions: {
    en: "Review 12 senior interview follow-up questions and explore connections across Overriding, Constructors, and Object contracts.",
    ru: "Изучите 12 вопросов Senior-уровня и исследуйте связи с Переопределением, Конструкторами и контрактами Object."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ol_results",
  missionId: "mis_method_overloading",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Performance & Mistakes Summary", ru: "12. Итоги и Разбор Ошибок" },
  instructions: {
    en: "Review performance metrics and common candidate interview mistakes around overload resolution.",
    ru: "Просмотрите метрики прохождения и распространенные ошибки кандидатов при обсуждении разрешения перегрузок."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ol_reflection",
  missionId: "mis_method_overloading",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Production Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which overloading rule you will enforce during public API and ledger code reviews.",
    ru: "Напишите 1 предложение о том, какое правило перегрузки вы будете проверять на код-ревью публичных API и ledger-кода."
  }
};

export const METHOD_OVERLOADING_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const METHOD_OVERLOADING_MISSION: Mission = {
  id: "mis_method_overloading",
  primaryTopicId: "top_oop_14",
  secondaryTopicIds: ["top_oop_15", "top_oop_04", "top_oop_19"],
  slug: "ambiguous-ledger-settle-overload",
  title: {
    en: "The Ambiguous Settle Call: Method Overloading Traps in LedgerPostingService",
    ru: "Неоднозначный Settle: Ловушки Перегрузки Методов в LedgerPostingService"
  },
  description: {
    en: "Diagnose why LedgerPostingService.settle(...) posted incorrect ledger amounts when Integer/null arguments resolved at compile time to surprising overloads — confusing cents paths with BigDecimal major-unit paths, and overload resolution with runtime overriding.",
    ru: "Диагностируйте, почему LedgerPostingService.settle(...) записал неверные суммы, когда аргументы Integer/null на этапе компиляции разрешились в неожиданные перегрузки — смешав пути центов с BigDecimal в основных единицах и перегрузку с runtime-переопределением."
  },
  scenarioIntroduction: {
    en: "At 09:41 UTC, ledger reconciliation flagged VIP accounts with amounts off by 100×. Downstream clients called postingService.settle(amount) where amount was sometimes an Integer (cents from a DTO), sometimes a Long, sometimes a parsed BigDecimal, and occasionally null for optional zero-settlements. LedgerPostingService exposed four overloads: settle(long), settle(Long), settle(BigDecimal), and settle(String). Unit tests used primitive long literals and never hit the ambiguous or autoboxed call sites.",
    ru: "В 09:41 UTC сверка леджера выявила VIP-счета с суммами, завышенными в 100 раз. Клиенты вызывали postingService.settle(amount), где amount был то Integer (центы из DTO), то Long, то распарсенный BigDecimal, а иногда null для опционального нулевого settle. LedgerPostingService экспонировал четыре перегрузки: settle(long), settle(Long), settle(BigDecimal) и settle(String). Юнит-тесты использовали примитивный long и никогда не попадали в неоднозначные или автобоксинг-вызовы."
  },
  engineeringProblem: {
    en: "Overload resolution is compile-time: the compiler picks among settle(long), settle(Long), settle(BigDecimal), and settle(String) using JLS applicability phases and the most-specific rule — not the runtime type the engineer 'meant'. settle(null) is ambiguous across reference overloads. Integer arguments prefer settle(long) via unboxing (NPE on null Integer). Mixing cents semantics on long/Long with major-unit semantics on BigDecimal/String makes a wrong overload a wrong ledger amount. This is unrelated to runtime method overriding.",
    ru: "Разрешение перегрузок — compile-time: компилятор выбирает среди settle(long), settle(Long), settle(BigDecimal) и settle(String) по фазам применимости JLS и правилу most-specific — а не по runtime-типу, который 'имел в виду' инженер. settle(null) неоднозначен между reference-перегрузками. Integer предпочитает settle(long) через unboxing (NPE на null Integer). Смешение семантики центов на long/Long с основными единицами на BigDecimal/String делает неверную перегрузку неверной суммой в леджере. Это не связано с runtime-переопределением методов."
  },
  learningObjectives: [
    {
      en: "Explain compile-time overload resolution versus runtime override dispatch",
      ru: "Объяснять compile-time разрешение перегрузок versus runtime-диспетчеризацию override"
    },
    {
      en: "Identify autoboxing, null-ambiguity, and most-specific traps in public overloads",
      ru: "Выявлять ловушки автобоксинга, null-неоднозначности и most-specific в публичных перегрузках"
    },
    {
      en: "Redesign LedgerPostingService with named methods (settleCents, settleDecimal) instead of ambiguous settle overloads",
      ru: "Перепроектировать LedgerPostingService с именованными методами (settleCents, settleDecimal) вместо неоднозначных перегрузок settle"
    },
    {
      en: "Apply Effective Java Item 41: use overloading sparingly and avoid confusing overload sets",
      ru: "Применять Effective Java Item 41: использовать перегрузку умеренно и избегать запутанных наборов перегрузок"
    }
  ],
  requiredConceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
  recommendedConceptIds: ["cpt_method_overriding", "cpt_encapsulation"],
  stageIds: METHOD_OVERLOADING_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ol_fix_builder", "chl_ol_bughunt", "chl_ol_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
