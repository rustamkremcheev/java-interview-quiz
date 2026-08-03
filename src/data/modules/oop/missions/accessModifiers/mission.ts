import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_am_intro",
  missionId: "mis_access_modifiers",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where InternalPostingPolicy was bypassed because GeneralLedger.postRaw was public/protected and called from another package.",
    ru: "Изучите инцидент, где InternalPostingPolicy обошли, потому что GeneralLedger.postRaw был public/protected и вызывался из другого пакета."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_am_problem",
  missionId: "mis_access_modifiers",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine GeneralLedger exposing postRaw, foreign-package ReconciliationHook subclasses using protected access, and JournalPostingFacade meant to be the only entry point.",
    ru: "Изучите GeneralLedger с открытым postRaw, subclasses ReconciliationHook из чужого пакета через protected, и JournalPostingFacade как единственную точку входа."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_am_think",
  missionId: "mis_access_modifiers",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: How do public and protected widen the package boundary so InternalPostingPolicy can be skipped, and what should package-private hide?",
    ru: "Сформулируйте гипотезу: как public и protected расширяют границу пакета так, что InternalPostingPolicy можно обойти, и что должен скрывать package-private?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_am_help",
  missionId: "mis_access_modifiers",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to Java access modifiers, package-private defaults, and why protected couples foreign subclasses to internals.",
    ru: "Бесштрафной переход к модификаторам доступа Java, package-private по умолчанию и почему protected связывает чужие subclasses с внутренностями."
  }
};

const stage5: TheoryStage = {
  id: "stg_am_theory",
  missionId: "mis_access_modifiers",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study access levels, package boundaries for GeneralLedger, protected coupling risks, and senior interview follow-ups.",
    ru: "Изучите уровни доступа, границы пакета для GeneralLedger, риски protected coupling и доп. вопросы Senior-интервью."
  },
  theoryArticleId: "art_theory_access_modifiers"
};

const stage6: BaseMissionStage = {
  id: "stg_am_visual",
  missionId: "mis_access_modifiers",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Package-Boundary Visualization", ru: "6. Визуализация Границы Пакета" },
  instructions: {
    en: "Compare public/protected postRaw callable from reporting packages versus package-private internals reachable only through JournalPostingFacade.",
    ru: "Сравните public/protected postRaw, вызываемый из reporting-пакетов, с package-private internals, доступными только через JournalPostingFacade."
  }
};

const stage7: PracticeStage = {
  id: "stg_am_practice",
  missionId: "mis_access_modifiers",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so ledger internals stay package-private and only JournalPostingFacade posts after InternalPostingPolicy.",
    ru: "Соберите структурные исправления, чтобы internals ledger остались package-private и постил только JournalPostingFacade после InternalPostingPolicy."
  },
  challengeId: "chl_am_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_am_interview_q",
  missionId: "mis_access_modifiers",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about package leaks, protected subclass coupling, and sealing ledger operations behind a facade.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о package leak, protected subclass coupling и закрытии ledger-операций за facade."
  },
  interviewQuestionId: "q_am_package_leak_01",
  challengeId: "chl_am_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_am_interview_a",
  missionId: "mis_access_modifiers",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Access Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Access + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_am_package_leak_01",
  challengeId: "chl_am_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_am_debug",
  missionId: "mis_access_modifiers",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Package Boundary Leak", ru: "10. Поиск Бага: Утечка Границы Пакета" },
  instructions: {
    en: "Identify the line(s) where public/protected postRaw or foreign-package subclass access bypasses InternalPostingPolicy.",
    ru: "Найдите строку(и), где public/protected postRaw или доступ subclass из чужого пакета обходит InternalPostingPolicy."
  },
  challengeId: "chl_am_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_am_related",
  missionId: "mis_access_modifiers",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to encapsulation, module boundaries, and facade entry points — without turning this into a full DI mission.",
    ru: "Исследуйте связи к encapsulation, границам модулей и facade entry points — не превращая это в полную DI-миссию."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_am_results",
  missionId: "mis_access_modifiers",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_am_reflection",
  missionId: "mis_access_modifiers",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that exposes protected/public internal ledger mutators across package boundaries.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, открывающий protected/public внутренние mutators ledger через границы пакетов."
  }
};

export const ACCESS_MODIFIERS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const ACCESS_MODIFIERS_MISSION: Mission = {
  id: "mis_access_modifiers",
  primaryTopicId: "top_oop_06",
  secondaryTopicIds: ["top_oop_05", "top_oop_22"],
  slug: "package-boundary-ledger-leak",
  title: {
    en: "The Package Boundary Leak: Internal Ledger Operations Exposed to Other Services",
    ru: "Утечка Границы Пакета: Внутренние Операции Ledger Открыты Другим Сервисам"
  },
  description: {
    en: "Seal GeneralLedger so postRaw and policy hooks stay package-private; only JournalPostingFacade may post after InternalPostingPolicy — stop foreign-package ReconciliationHook subclasses from bypassing controls.",
    ru: "Закройте GeneralLedger так, чтобы postRaw и policy hooks остались package-private; постит только JournalPostingFacade после InternalPostingPolicy — остановите обход контролей subclasses ReconciliationHook из чужого пакета."
  },
  scenarioIntroduction: {
    en: "Month-end close showed unbalanced books: a reporting microservice had subclassed GeneralLedger, called protected postRaw, and wrote LedgerEntry rows that skipped InternalPostingPolicy and ReconciliationHook registration. Audit found debit/credit pairs that never passed journal validation. The facade existed — JournalPostingFacade — but public/protected internals made package boundaries meaningless. Ops rolled back thousands of raw posts. Root cause was access control, not accounting math.",
    ru: "Закрытие месяца показало несбалансированные книги: reporting-микросервис унаследовал GeneralLedger, вызвал protected postRaw и записал LedgerEntry, минуя InternalPostingPolicy и регистрацию ReconciliationHook. Аудит нашёл пары debit/credit без journal validation. Facade — JournalPostingFacade — существовал, но public/protected internals сделали границы пакета бессмысленными. Ops откатил тысячи raw posts. Причина — access control, не математика учёта."
  },
  engineeringProblem: {
    en: "Java access modifiers define who may call members. public and protected widen the surface: any package can call public; other-package subclasses can call protected. Internal ledger operations (postRaw, mutate entry lists) must be package-private (default) so only co-located JournalPostingFacade and InternalPostingPolicy share them. Prefer final classes or sealed hierarchies when subclassing across packages is not a design goal. Make the facade the sole public API.",
    ru: "Модификаторы доступа Java определяют, кто может вызывать члены. public и protected расширяют поверхность: любой пакет зовёт public; subclasses из других пакетов зовут protected. Внутренние операции ledger (postRaw, мутация списков entry) должны быть package-private (default), чтобы их делили только соседние JournalPostingFacade и InternalPostingPolicy. Предпочитайте final/sealed, если subclassing через пакеты не цель дизайна. Facade — единственный public API."
  },
  learningObjectives: [
    {
      en: "Apply private, package-private, protected, and public deliberately for ledger APIs",
      ru: "Осознанно применять private, package-private, protected и public для ledger API"
    },
    {
      en: "Explain how protected couples foreign-package subclasses to internal posting paths",
      ru: "Объяснить, как protected связывает subclasses из чужого пакета с внутренними путями постинга"
    },
    {
      en: "Keep GeneralLedger mutators package-private and route posts through JournalPostingFacade + InternalPostingPolicy",
      ru: "Держать mutators GeneralLedger package-private и проводить посты через JournalPostingFacade + InternalPostingPolicy"
    },
    {
      en: "Recognize package-boundary leaks as production encapsulation failures",
      ru: "Распознавать утечки границы пакета как продакшн-сбои encapsulation"
    }
  ],
  requiredConceptIds: ["cpt_access_modifiers", "cpt_package_private", "cpt_protected_coupling"],
  recommendedConceptIds: ["cpt_encapsulation", "cpt_facade"],
  stageIds: ACCESS_MODIFIERS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_am_fix_builder", "chl_am_bughunt", "chl_am_interview_answer"],
  estimatedMinutes: 28,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
