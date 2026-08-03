import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ojc_intro",
  missionId: "mis_object_class_contracts",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the compliance audit incident where ComplianceEvent mishandled Object contracts — identity equals confusion, noisy default toString, broken clone, getClass vs instanceof, and obsolete finalize.",
    ru: "Изучите инцидент compliance-аудита, где ComplianceEvent нарушил контракты Object — путаница identity equals, шумный default toString, сломанный clone, getClass vs instanceof и устаревший finalize."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ojc_problem",
  missionId: "mis_object_class_contracts",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine ComplianceEvent relying on Object identity equals for business dedup, default toString in AuditSnapshot, shallow clone sharing mutable lists, getClass checks that reject subtypes, and finalize for resource cleanup.",
    ru: "Изучите ComplianceEvent с Object identity equals для бизнес-дедупа, default toString в AuditSnapshot, shallow clone с общими мутабельными списками, проверками getClass, отвергающими подтипы, и finalize для очистки ресурсов."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ojc_think",
  missionId: "mis_object_class_contracts",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why do duplicate ComplianceEvent rows survive repository dedup, AuditSnapshot dumps show Class@hex noise, cloned cases mutate together, EventClassifier rejects valid subtypes, and finalize never runs on time?",
    ru: "Сформулируйте гипотезу: почему дубликаты ComplianceEvent переживают дедуп репозитория, AuditSnapshot показывает Class@hex шум, клонированные кейсы мутируют вместе, EventClassifier отвергает валидные подтипы, а finalize не срабатывает вовремя?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ojc_help",
  missionId: "mis_object_class_contracts",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to java.lang.Object contracts overview: equals/hashCode intent, toString diagnostics, clone pitfalls, getClass vs instanceof, and finalize obsolescence (JEP 421).",
    ru: "Бесштрафной переход к обзору контрактов java.lang.Object: intent equals/hashCode, диагностический toString, ловушки clone, getClass vs instanceof и устаревание finalize (JEP 421)."
  }
};

const stage5: TheoryStage = {
  id: "stg_ojc_theory",
  missionId: "mis_object_class_contracts",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the theory sections covering Object contract overview, getClass vs instanceof, clone pitfalls, finalize obsolescence, and senior interview follow-ups.",
    ru: "Изучите разделы теории об обзоре контрактов Object, getClass vs instanceof, ловушках clone, устаревании finalize и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_object_class_contracts"
};

const stage6: BaseMissionStage = {
  id: "stg_ojc_visual",
  missionId: "mis_object_class_contracts",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Object-Contract Visualization", ru: "6. Визуализация Контрактов Object" },
  instructions: {
    en: "Compare identity-based equals vs value equals, default Class@hex toString vs meaningful diagnostics, shallow vs independent clone, and getClass-strict vs instanceof-tolerant classification.",
    ru: "Сравните equals по identity vs по значению, default Class@hex toString vs осмысленную диагностику, shallow vs независимый clone, и строгий getClass vs терпимый instanceof."
  }
};

const stage7: PracticeStage = {
  id: "stg_ojc_practice",
  missionId: "mis_object_class_contracts",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so ComplianceEvent respects Object contracts without turning this into a full equals/hashCode or PII-toString mission.",
    ru: "Соберите структурные исправления, чтобы ComplianceEvent соблюдал контракты Object — не превращая это в полную миссию equals/hashCode или PII-toString."
  },
  challengeId: "chl_ojc_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ojc_interview_q",
  missionId: "mis_object_class_contracts",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about Object contract misuse in ComplianceEvent: identity equals, clone pitfalls, getClass vs instanceof, and finalize obsolescence.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о misuse контрактов Object в ComplianceEvent: identity equals, ловушки clone, getClass vs instanceof и устаревание finalize."
  },
  interviewQuestionId: "q_ojc_object_contracts_01",
  challengeId: "chl_ojc_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ojc_interview_a",
  missionId: "mis_object_class_contracts",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Object Contract Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Контрактов Object + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ojc_object_contracts_01",
  challengeId: "chl_ojc_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ojc_debug",
  missionId: "mis_object_class_contracts",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Object Contract Misuse", ru: "10. Поиск Бага: Misuse Контрактов Object" },
  instructions: {
    en: "Identify the line(s) where ComplianceEvent / EventClassifier misuse Object contracts (identity equals for dedup, broken clone, getClass rejection, finalize cleanup).",
    ru: "Найдите строку(и), где ComplianceEvent / EventClassifier нарушают контракты Object (identity equals для дедупа, сломанный clone, отвержение getClass, cleanup через finalize)."
  },
  challengeId: "chl_ojc_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ojc_related",
  missionId: "mis_object_class_contracts",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to full equals/hashCode contracts, safe toString/logging, and immutability — without duplicating those dedicated missions.",
    ru: "Исследуйте связи к полным контрактам equals/hashCode, безопасному toString/logging и immutability — не дублируя эти отдельные миссии."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ojc_results",
  missionId: "mis_object_class_contracts",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ojc_reflection",
  missionId: "mis_object_class_contracts",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that relies on Object identity equals, broken clone, getClass-only checks, or finalize for compliance lifecycle.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, опирающийся на Object identity equals, сломанный clone, проверки только через getClass или finalize для lifecycle compliance."
  }
};

export const OBJECT_CLASS_CONTRACTS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const OBJECT_CLASS_CONTRACTS_MISSION: Mission = {
  id: "mis_object_class_contracts",
  primaryTopicId: "top_oop_19",
  secondaryTopicIds: ["top_oop_18", "top_oop_21"],
  slug: "misleading-audit-object-contracts",
  title: {
    en: "The Misleading Audit Object: Object Contract Failures in ComplianceEvent",
    ru: "Обманчивый Audit Object: Сбои Контрактов Object в ComplianceEvent"
  },
  description: {
    en: "Fix ComplianceEvent so Object contracts are used correctly — stop identity-equals dedup confusion, replace default toString noise, avoid broken clone, choose getClass vs instanceof deliberately, and retire finalize (JEP 421).",
    ru: "Исправьте ComplianceEvent так, чтобы контракты Object использовались корректно — уберите путаницу identity-equals дедупа, замените шум default toString, избегайте сломанного clone, осознанно выбирайте getClass vs instanceof и откажитесь от finalize (JEP 421)."
  },
  scenarioIntroduction: {
    en: "Compliance ops opened an AuditSnapshot for a high-risk ComplianceCase. Duplicate ComplianceEvent rows with the same caseId survived repository dedup because equals was never overridden — identity comparison treated logical duplicates as distinct. Logs showed ComplianceEvent@6d06d69c instead of useful fields. Cloning a case for investigation shared a mutable evidence list, so annotating the clone corrupted the live case. EventClassifier used getClass() and rejected a valid specialized subtype. A finalize() override meant to close a file handle never ran before the JVM recycled the process. This is an Object-contract overview failure — not a deep equals/hashCode redesign or a PII-toString mission.",
    ru: "Compliance ops открыл AuditSnapshot по high-risk ComplianceCase. Дубликаты ComplianceEvent с одним caseId пережили дедуп репозитория, потому что equals не переопределяли — сравнение по identity считало логические дубликаты разными. В логах было ComplianceEvent@6d06d69c вместо полезных полей. Клон кейса для расследования делил мутабельный список evidence, и аннотации клона портили живой кейс. EventClassifier через getClass() отверг валидный специализированный подтип. Override finalize() для закрытия file handle не успел сработать до перезапуска JVM. Это сбой обзора контрактов Object — не глубокий redesign equals/hashCode и не миссия PII-toString."
  },
  engineeringProblem: {
    en: "java.lang.Object provides default equals/hashCode (identity), toString (Class@hex), clone (fragile protected shallow copy), and obsolete finalize. ComplianceEventRepository dedup assumed value equality but got identity. AuditSnapshot concatenated default toString. ComplianceCase.clone() shared nested mutable state. EventClassifier.getClass() != ComplianceEvent.class rejected subtypes that instanceof would accept. finalize is deprecated for removal (JEP 421) — use try-with-resources / Cleaner. Fix: decide equality policy explicitly (or use eventId keys), provide diagnostic toString without PII deep-dive, prefer copy constructors over clone, choose instanceof when subtype polymorphism is intended, never rely on finalize.",
    ru: "java.lang.Object даёт default equals/hashCode (identity), toString (Class@hex), clone (хрупкая protected shallow copy) и устаревший finalize. ComplianceEventRepository дедуп ожидал value equality, а получил identity. AuditSnapshot склеивал default toString. ComplianceCase.clone() делил nested mutable state. EventClassifier.getClass() != ComplianceEvent.class отвергал подтипы, которые instanceof принял бы. finalize deprecated for removal (JEP 421) — используйте try-with-resources / Cleaner. Фикс: явно выбрать политику equality (или ключи eventId), дать диагностический toString без deep-dive в PII, предпочитать copy constructors вместо clone, выбирать instanceof при subtype polymorphism, никогда не полагаться на finalize."
  },
  learningObjectives: [
    {
      en: "Explain java.lang.Object default contracts: identity equals/hashCode, Class@hex toString, fragile clone, obsolete finalize",
      ru: "Объяснить default-контракты java.lang.Object: identity equals/hashCode, Class@hex toString, хрупкий clone, устаревший finalize"
    },
    {
      en: "Choose getClass vs instanceof deliberately for ComplianceEvent classification",
      ru: "Осознанно выбирать getClass vs instanceof для классификации ComplianceEvent"
    },
    {
      en: "Recognize clone pitfalls and prefer explicit copy construction for ComplianceCase / AuditSnapshot",
      ru: "Распознавать ловушки clone и предпочитать явную copy construction для ComplianceCase / AuditSnapshot"
    },
    {
      en: "Retire finalize in favor of try-with-resources / Cleaner per JEP 421",
      ru: "Отказываться от finalize в пользу try-with-resources / Cleaner по JEP 421"
    }
  ],
  requiredConceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
  recommendedConceptIds: ["cpt_equals_hashcode", "cpt_tostring_diagnostics"],
  stageIds: OBJECT_CLASS_CONTRACTS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ojc_fix_builder", "chl_ojc_bughunt", "chl_ojc_interview_answer"],
  estimatedMinutes: 28,
  difficulty: "APPLIED",
  xpReward: 275,
  version: "1.0.0"
};
