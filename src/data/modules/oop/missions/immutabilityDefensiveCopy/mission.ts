import { Mission, MissionStage } from '../../../../../types/domain';

export const IMMUTABILITY_DEFENSIVE_COPY_MISSION_STAGES: readonly MissionStage[] = [
  {
    id: "stg_imm_intro",
    missionId: "mis_immutability_defensive_copy",
    type: "MISSION_INTRODUCTION",
    order: 1,
    title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
    instructions: {
      en: "Inspect the production settlement-corruption scenario below where a payment reconciliation service leaked mutable references from a supposedly immutable CustomerSnapshot.",
      ru: "Изучите сценарий порчи settlement-итогов на продакшене, где сервис сверки платежей утекал мутабельные ссылки из якобы неизменяемого CustomerSnapshot."
    }
  },
  {
    id: "stg_imm_problem",
    missionId: "mis_immutability_defensive_copy",
    type: "REAL_ENGINEERING_PROBLEM",
    order: 2,
    title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
    instructions: {
      en: "Examine the broken Money, Transaction, and CustomerSnapshot classes that expose internal List, BigDecimal, and Date references through getters despite private final fields.",
      ru: "Изучите классы Money, Transaction и CustomerSnapshot, которые отдают внутренние ссылки List, BigDecimal и Date через геттеры, несмотря на private final поля."
    }
  },
  {
    id: "stg_imm_think",
    missionId: "mis_immutability_defensive_copy",
    type: "THINK_YOURSELF",
    order: 3,
    title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
    instructions: {
      en: "Formulate your initial hypothesis: Why did `private final` fields fail to prevent settlement corruption, and which references (List, Money, Date) were leaked?",
      ru: "Сформулируйте гипотезу: почему `private final` поля не предотвратили порчу settlement-итогов и какие ссылки (List, Money, Date) утекли?"
    }
  },
  {
    id: "stg_imm_help",
    missionId: "mis_immutability_defensive_copy",
    type: "NEED_HELP",
    order: 4,
    title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
    instructions: {
      en: "No penalty bridge to transition into deep immutability theory and defensive copying mechanics.",
      ru: "Бесштрафной переход к изучению теории неизменяемости и механики защитного копирования."
    }
  },
  {
    id: "stg_imm_theory",
    missionId: "mis_immutability_defensive_copy",
    type: "THEORY",
    order: 5,
    title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
    instructions: {
      en: "Study the 3 theory sections, complete the interactive checkpoints, and review 10+ senior interview follow-up questions.",
      ru: "Изучите 3 раздела теории, пройдите интерактивные проверки и ознакомьтесь с 10+ вопросами Senior-интервью."
    },
    theoryArticleId: "art_theory_immutability"
  },
  {
    id: "stg_imm_visual",
    missionId: "mis_immutability_defensive_copy",
    type: "VISUALIZATION",
    order: 6,
    title: { en: "6. Interactive State Visualization", ru: "6. Визуализация Состояний Памяти" },
    instructions: {
      en: "Compare external mutation of leaked List/Money/Date references against a truly immutable CustomerSnapshot with defensive copies and immutable Money.",
      ru: "Сравните внешнюю мутацию утекших ссылок List/Money/Date с по-настоящему неизменяемым CustomerSnapshot с защитным копированием и неизменяемым Money."
    }
  },
  {
    id: "stg_imm_practice",
    missionId: "mis_immutability_defensive_copy",
    type: "INTERACTIVE_PRACTICE",
    order: 7,
    title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
    instructions: {
      en: "Assemble the structural code elements required to make Money, Transaction, and CustomerSnapshot genuinely immutable for multithreaded payment reconciliation.",
      ru: "Соберите элементы кода для обеспечения подлинной неизменяемости Money, Transaction и CustomerSnapshot в многопоточной сверке платежей."
    },
    challengeId: "chl_imm_fix_builder"
  },
  {
    id: "stg_imm_interview_q",
    missionId: "mis_immutability_defensive_copy",
    type: "INTERVIEW_QUESTION",
    order: 8,
    title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
    instructions: {
      en: "Review the authentic interview question about immutability and reference leaks tested in senior technical rounds.",
      ru: "Ознакомьтесь с реальным вопросом о неизменяемости и утечках ссылок на Senior-собеседованиях."
    },
    interviewQuestionId: "q_imm_snapshot_01",
    challengeId: "chl_imm_interview_answer"
  },
  {
    id: "stg_imm_interview_a",
    missionId: "mis_immutability_defensive_copy",
    type: "INTERVIEW_ANSWER",
    order: 9,
    title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
    instructions: {
      en: "Formulate your structured 90-second verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
      ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
    },
    interviewQuestionId: "q_imm_snapshot_01",
    challengeId: "chl_imm_interview_answer"
  },
  {
    id: "stg_imm_debug",
    missionId: "mis_immutability_defensive_copy",
    type: "DEBUG_COUNTER_EXAMPLE",
    order: 10,
    title: { en: "10. Applied Bug Hunt: CustomerSnapshot", ru: "10. Поиск Бага: Утечка Ссылки CustomerSnapshot" },
    instructions: {
      en: "Identify the line(s) in the code viewer where internal mutable List, Money, and Date references are leaked to external callers.",
      ru: "Найдите строку(и) в редакторе кода, где внутренние мутабельные ссылки List, Money и Date утекают к внешним вызывающим."
    },
    challengeId: "chl_imm_bughunt"
  },
  {
    id: "stg_imm_related",
    missionId: "mis_immutability_defensive_copy",
    type: "RELATED_TOPICS",
    order: 11,
    title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
    instructions: {
      en: "Explore lateral graph connections to encapsulation, equals/hashCode contracts, Java 17 records, and defensive copying patterns.",
      ru: "Исследуйте связи Графа Знаний для перехода к инкапсуляции, контрактам equals/hashCode, Java 17 record и защитному копированию."
    }
  },
  {
    id: "stg_imm_results",
    missionId: "mis_immutability_defensive_copy",
    type: "MISSION_RESULTS",
    order: 12,
    title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
    instructions: {
      en: "Review your performance metrics, concepts strengthened, and XP awarded.",
      ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
    }
  },
  {
    id: "stg_imm_reflection",
    missionId: "mis_immutability_defensive_copy",
    type: "REFLECTION",
    order: 13,
    title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
    instructions: {
      en: "Write a 1-sentence reflection on which immutability rule you will enforce in your next code review.",
      ru: "Напишите 1 предложение о том, какое правило неизменяемости вы введете на следующем код-ревью."
    }
  }
];

export const IMMUTABILITY_DEFENSIVE_COPY_MISSION: Mission = {
  id: "mis_immutability_defensive_copy",
  primaryTopicId: "top_oop_22",
  secondaryTopicIds: ["top_oop_05", "top_oop_20", "top_oop_28"],
  slug: "mutable-snapshot-transaction-leak",
  title: {
    en: "The Corrupted Snapshot: Money & Transaction Reference Leak",
    ru: "Испорченный Снимок: Утечка Ссылок Money и Transaction"
  },
  description: {
    en: "Investigate a production settlement corruption in a payment reconciliation service where CustomerSnapshot was marketed as immutable but leaked mutable List, Money, and Date references to fraud/ops code.",
    ru: "Расследуйте порчу settlement-итогов в сервисе сверки платежей, где CustomerSnapshot позиционировался как неизменяемый, но утекал мутабельные ссылки List, Money и Date во fraud/ops код."
  },
  scenarioIntroduction: {
    en: "At 03:17 UTC during nightly reconciliation, settlement totals diverged from the ledger by millions. Post-incident forensics traced the root cause to a payment reconciliation service that cached CustomerSnapshot objects — each holding Money amounts and a List of Transaction records — in a shared registry consumed by fraud and ops tooling during multithreaded settlement.",
    ru: "В 03:17 UTC во время ночной сверки settlement-итоги разошлись с ledger на миллионы. Форензика выявила, что сервис сверки платежей кэшировал объекты CustomerSnapshot — с суммами Money и List записей Transaction — в общем реестре, используемом fraud/ops инструментами при многопоточном settlement."
  },
  engineeringProblem: {
    en: "CustomerSnapshot was marketed as immutable with `private final` fields. However, `getTransactions()` returned the internal `ArrayList` directly, and Money leaked a mutable `BigDecimal` while Transaction stored a mutable `java.util.Date`. Fraud/ops code invoked `snapshot.getTransactions().add(fakeTxn)` and mutated Money via the leaked BigDecimal — corrupting cached settlement totals without ever calling a setter on CustomerSnapshot.",
    ru: "CustomerSnapshot позиционировался как неизменяемый с `private final` полями. Однако `getTransactions()` возвращал внутренний `ArrayList` напрямую, Money утекал мутабельный `BigDecimal`, а Transaction хранил мутабельный `java.util.Date`. Fraud/ops код вызывал `snapshot.getTransactions().add(fakeTxn)` и мутировал Money через утекший BigDecimal — портя кэшированные settlement-итоги без вызова сеттера CustomerSnapshot."
  },
  learningObjectives: [
    {
      en: "Distinguish between reference immutability (`final` fields) and true object immutability (deep unmodifiable state)",
      ru: "Различать неизменяемость ссылки (`final` поля) и подлинную неизменяемость объекта (глубокое неизменяемое состояние)"
    },
    {
      en: "Apply defensive copying on constructor input and getter output for mutable collections and monetary/temporal objects",
      ru: "Применять защитное копирование на входе конструктора и выходе геттеров для мутабельных коллекций и денежных/временных объектов"
    },
    {
      en: "Model Money with immutable long cents (not mutable BigDecimal) and replace java.util.Date with java.time.Instant",
      ru: "Моделировать Money через неизменяемые long cents (не мутабельный BigDecimal) и заменить java.util.Date на java.time.Instant"
    },
    {
      en: "Use List.copyOf() and Collections.unmodifiableList() to publish immutable Transaction collection views in Java 17",
      ru: "Использовать List.copyOf() и Collections.unmodifiableList() для публикации неизменяемых представлений List<Transaction> в Java 17"
    }
  ],
  requiredConceptIds: ["cpt_immutability", "cpt_defensive_copying"],
  recommendedConceptIds: ["cpt_encapsulation", "cpt_invariants"],
  stageIds: IMMUTABILITY_DEFENSIVE_COPY_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_imm_fix_builder", "chl_imm_bughunt", "chl_imm_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
