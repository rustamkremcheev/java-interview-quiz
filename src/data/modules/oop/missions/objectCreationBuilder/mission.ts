import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_oc_intro",
  missionId: "mis_object_creation_builder",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the quarterly financial close incident below where tax-exempt settlement instructions were silently misclassified in regulatory reports.",
    ru: "Изучите инцидент квартального закрытия, когда инструкции расчета с налоговой льготой были тихо неправильно классифицированы в регуляторных отчетах."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_oc_problem",
  missionId: "mis_object_creation_builder",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine the broken SettlementInstruction class with 12-parameter telescoping constructors that caused isAudited and isTaxExempt boolean flags to be swapped.",
    ru: "Изучите класс SettlementInstruction с телескопическими конструкторами на 12 параметров, из-за которых перепутались флаги isAudited и isTaxExempt."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_oc_think",
  missionId: "mis_object_creation_builder",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why did unit tests pass while quarterly tax reports showed incorrect exemption totals for 847 settlement instructions?",
    ru: "Сформулируйте гипотезу: почему юнит-тесты прошли, а квартальные налоговые отчеты показали неверные суммы льгот для 847 инструкций расчета?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_oc_help",
  missionId: "mis_object_creation_builder",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to transition into Builder pattern mechanics and static factory method design from Effective Java.",
    ru: "Бесштрафной переход к изучению паттерна Builder и статических фабричных методов из Effective Java."
  }
};

const stage5: TheoryStage = {
  id: "stg_oc_theory",
  missionId: "mis_object_creation_builder",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 3 theory sections on static factories, Builder pattern, and boolean parameter traps. Complete the interactive checkpoints below.",
    ru: "Изучите 3 раздела теории о статических фабриках, Builder и ловушках boolean-параметров. Пройдите интерактивные проверки ниже."
  },
  theoryArticleId: "art_theory_object_creation"
};

const stage6: BaseMissionStage = {
  id: "stg_oc_visual",
  missionId: "mis_object_creation_builder",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Construction Visualization", ru: "6. Визуализация Построения Объекта" },
  instructions: {
    en: "Compare telescoping constructor call sites with ambiguous boolean literals against fluent Builder with named isAudited() and isTaxExempt() methods.",
    ru: "Сравните вызовы телескопических конструкторов с неоднозначными boolean-литералами и fluent Builder с именованными методами isAudited() и isTaxExempt()."
  }
};

const stage7: PracticeStage = {
  id: "stg_oc_practice",
  missionId: "mis_object_creation_builder",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to replace telescoping constructors with SettlementInstructionBuilder and static factory methods.",
    ru: "Соберите элементы кода для замены телескопических конструкторов на SettlementInstructionBuilder и статические фабричные методы."
  },
  challengeId: "chl_oc_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_oc_interview_q",
  missionId: "mis_object_creation_builder",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question on object creation patterns tested in financial services backend rounds.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о паттернах создания объектов в финансовых backend-системах."
  },
  interviewQuestionId: "q_oc_settlement_01",
  challengeId: "chl_oc_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_oc_interview_a",
  missionId: "mis_object_creation_builder",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_oc_settlement_01",
  challengeId: "chl_oc_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_oc_debug",
  missionId: "mis_object_creation_builder",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Swapped Flags", ru: "10. Поиск Бага: Перепутанные Флаги" },
  instructions: {
    en: "Identify the line in the code viewer where isAudited and isTaxExempt boolean arguments are swapped in the telescoping constructor call.",
    ru: "Найдите строку в редакторе кода, где аргументы isAudited и isTaxExempt перепутаны в вызове телескопического конструктора."
  },
  challengeId: "chl_oc_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_oc_related",
  missionId: "mis_object_creation_builder",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge & Follow-ups", ru: "11. Связанные Знания и Вопросы" },
  instructions: {
    en: "Review 12 senior interview follow-up questions and explore connections to immutability, invariants, and DDD value objects.",
    ru: "Изучите 12 вопросов Senior-уровня и исследуйте связи с неизменяемостью, инвариантами и DDD value objects."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_oc_results",
  missionId: "mis_object_creation_builder",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_oc_reflection",
  missionId: "mis_object_creation_builder",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which object creation rule you will enforce in code reviews for classes with 5+ parameters.",
    ru: "Напишите 1 предложение о том, какое правило создания объектов вы введете на код-ревью для классов с 5+ параметрами."
  }
};

export const OBJECT_CREATION_BUILDER_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const OBJECT_CREATION_BUILDER_MISSION: Mission = {
  id: "mis_object_creation_builder",
  primaryTopicId: "top_oop_25",
  secondaryTopicIds: ["top_oop_04", "top_oop_22", "top_oop_28"],
  slug: "settlement-instruction-builder-disaster",
  title: {
    en: "Swapped Flags Disaster: Builder & Static Factory for SettlementInstruction",
    ru: "Катастрофа Перепутанных Флагов: Builder и Статическая Фабрика для SettlementInstruction"
  },
  description: {
    en: "Investigate a silent tax reporting corruption caused by swapped boolean flags in a 12-parameter telescoping constructor, and refactor SettlementInstruction using Builder pattern and static factory methods.",
    ru: "Расследуйте тихую порчу налоговой отчетности из-за перепутанных boolean-флагов в телескопическом конструкторе на 12 параметров и проведите рефакторинг SettlementInstruction через Builder и статические фабрики."
  },
  scenarioIntroduction: {
    en: "During Q3 financial close, the regulatory reporting team discovered a $2.3M discrepancy in tax-exempt settlement totals. An audit traced the root cause to SettlementInstruction objects created over six months via telescoping constructors — 847 instructions had isAudited and isTaxExempt flags silently inverted at construction time.",
    ru: "При квартальном закрытии Q3 команда регуляторной отчетности обнаружила расхождение $2.3M в суммах налогово-льготных расчетов. Аудит выявил, что 847 инструкций SettlementInstruction были созданы через телескопические конструкторы с тихо инвертированными флагами isAudited и isTaxExempt."
  },
  engineeringProblem: {
    en: "SettlementInstruction requires 12 constructor parameters (4 mandatory: instructionId, payerAccountId, payeeAccountId, amountInCents; 8 optional including isAudited and isTaxExempt). Telescoping constructors placed adjacent boolean parameters at positions 8 and 9. A developer wrote `new SettlementInstruction(id, payer, payee, amount, currency, date, priority, true, false, routing, memo, batch)` intending isAudited=true and isTaxExempt=false, but the 12-arg constructor signature was `(…, boolean isTaxExempt, boolean isAudited, …)` — silently producing incorrect tax reports with no compile-time error.",
    ru: "SettlementInstruction требует 12 параметров конструктора (4 обязательных: instructionId, payerAccountId, payeeAccountId, amountInCents; 8 опциональных, включая isAudited и isTaxExempt). Телескопические конструкторы разместили смежные boolean на позициях 8 и 9. Разработчик написал `new SettlementInstruction(id, payer, payee, amount, currency, date, priority, true, false, routing, memo, batch)`, ожидая isAudited=true и isTaxExempt=false, но сигнатура 12-arg конструктора была `(…, boolean isTaxExempt, boolean isAudited, …)` — тихо порождая неверные налоговые отчеты без ошибки компиляции."
  },
  learningObjectives: [
    {
      en: "Understand when telescoping constructors become unmaintainable and error-prone for domain objects with many optional parameters",
      ru: "Понять, когда телескопические конструкторы становятся неподдерживаемыми и подверженными ошибкам для доменных объектов с множеством опциональных параметров"
    },
    {
      en: "Apply static factory methods (of, valueOf) to provide readable, self-documenting object creation APIs",
      ru: "Применять статические фабричные методы (of, valueOf) для читаемых, самодокументирующих API создания объектов"
    },
    {
      en: "Implement the Builder pattern with fluent named methods to eliminate boolean parameter swapping bugs",
      ru: "Реализовать паттерн Builder с fluent именованными методами для устранения багов перепутывания boolean-параметров"
    },
    {
      en: "Enforce mandatory parameter validation and domain invariants in Builder.build() before constructing immutable SettlementInstruction instances",
      ru: "Обеспечить валидацию обязательных параметров и доменных инвариантов в Builder.build() перед созданием неизменяемых экземпляров SettlementInstruction"
    }
  ],
  requiredConceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods"],
  recommendedConceptIds: ["cpt_immutability", "cpt_invariants"],
  stageIds: OBJECT_CREATION_BUILDER_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_oc_fix_builder", "chl_oc_bughunt", "chl_oc_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
