import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ts_intro",
  missionId: "mis_tostring_safe_logging",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the PII logging incident where CustomerVerificationRequest.toString() leaked personal data and secrets into centralized KycAuditLogger logs.",
    ru: "Изучите инцидент PII-логирования, где CustomerVerificationRequest.toString() утекал персональные данные и секреты в централизованные логи KycAuditLogger."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ts_problem",
  missionId: "mis_tostring_safe_logging",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine CustomerVerificationRequest.toString dumping full name, nationalId, AccountReference, and VerificationToken, then logged via string concatenation in KycAuditLogger.",
    ru: "Изучите CustomerVerificationRequest.toString, выводящий полное имя, nationalId, AccountReference и VerificationToken, затем логируемый через string concatenation в KycAuditLogger."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ts_think",
  missionId: "mis_tostring_safe_logging",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why did a 'helpful' diagnostic toString create a regulatory logging incident, and what should safe toString / parameterized logging look like?",
    ru: "Сформулируйте гипотезу: почему «полезный» диагностический toString создал регуляторный logging-инцидент, и как должны выглядеть safe toString / parameterized logging?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ts_help",
  missionId: "mis_tostring_safe_logging",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to diagnostic toString design, PII redaction, and logging parameterization for KYC verification requests.",
    ru: "Бесштрафной переход к дизайну диагностического toString, redaction PII и parameterization логирования для KYC verification requests."
  }
};

const stage5: TheoryStage = {
  id: "stg_ts_theory",
  missionId: "mis_tostring_safe_logging",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the theory sections covering toString diagnostics, PII redaction, logging parameterization, and senior interview follow-ups.",
    ru: "Изучите разделы теории о диагностическом toString, redaction PII, parameterization логирования и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_tostring_safe_logging"
};

const stage6: BaseMissionStage = {
  id: "stg_ts_visual",
  missionId: "mis_tostring_safe_logging",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Logging Visualization", ru: "6. Визуализация Логирования" },
  instructions: {
    en: "Compare raw toString dumping PII into log aggregators versus redacted diagnostic toString with parameterized logger arguments.",
    ru: "Сравните сырой toString с дампом PII в log aggregators и redacted диагностический toString с parameterized аргументами логгера."
  }
};

const stage7: PracticeStage = {
  id: "stg_ts_practice",
  missionId: "mis_tostring_safe_logging",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so CustomerVerificationRequest.toString and KycAuditLogger never leak PII or VerificationToken secrets.",
    ru: "Соберите структурные исправления, чтобы CustomerVerificationRequest.toString и KycAuditLogger никогда не утекали PII или секреты VerificationToken."
  },
  challengeId: "chl_ts_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ts_interview_q",
  missionId: "mis_tostring_safe_logging",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about safe toString design, PII redaction, and parameterized logging for CustomerVerificationRequest.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о safe toString, redaction PII и parameterized logging для CustomerVerificationRequest."
  },
  interviewQuestionId: "q_ts_pii_tostring_01",
  challengeId: "chl_ts_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ts_interview_a",
  missionId: "mis_tostring_safe_logging",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + toString/Logging Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика toString/Logging + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ts_pii_tostring_01",
  challengeId: "chl_ts_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ts_debug",
  missionId: "mis_tostring_safe_logging",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: PII in toString", ru: "10. Поиск Бага: PII в toString" },
  instructions: {
    en: "Identify the line(s) where CustomerVerificationRequest.toString or KycAuditLogger leaks PII / VerificationToken into logs.",
    ru: "Найдите строку(и), где CustomerVerificationRequest.toString или KycAuditLogger утекает PII / VerificationToken в логи."
  },
  challengeId: "chl_ts_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ts_related",
  missionId: "mis_tostring_safe_logging",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to Object contracts overview, structured logging, and data-protection principles — without turning this into a full equals/hashCode mission.",
    ru: "Исследуйте связи к обзору контрактов Object, structured logging и принципам защиты данных — не превращая это в полную миссию equals/hashCode."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ts_results",
  missionId: "mis_tostring_safe_logging",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ts_reflection",
  missionId: "mis_tostring_safe_logging",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR whose toString or log statement can put PII or tokens into centralized logs.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, чей toString или log statement может положить PII или токены в централизованные логи."
  }
};

export const TOSTRING_SAFE_LOGGING_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const TOSTRING_SAFE_LOGGING_MISSION: Mission = {
  id: "mis_tostring_safe_logging",
  primaryTopicId: "top_oop_21",
  secondaryTopicIds: ["top_oop_19", "top_oop_03"],
  slug: "pii-logging-tostring-incident",
  title: {
    en: "The PII Logging Incident: Safe toString() Design for CustomerVerificationRequest",
    ru: "Инцидент PII-Логирования: Безопасный toString() для CustomerVerificationRequest"
  },
  description: {
    en: "Fix CustomerVerificationRequest.toString and KycAuditLogger so diagnostics stay useful without logging PII, AccountReference details, or VerificationToken secrets — apply RedactionPolicy and parameterized logging.",
    ru: "Исправьте CustomerVerificationRequest.toString и KycAuditLogger так, чтобы диагностика оставалась полезной без логирования PII, деталей AccountReference или секретов VerificationToken — примените RedactionPolicy и parameterized logging."
  },
  scenarioIntroduction: {
    en: "Security reviewed centralized KYC logs after a vendor support ticket. KycAuditLogger lines contained full customer names, national IDs, account references, and live VerificationToken values — because developers overrode toString to be 'debuggable' and logged with string concatenation: logger.info(\"verify \" + request). Log retention shipped copies to SIEM and a third-party analytics export. Regulators treated it as a personal-data exposure. Root cause was not a broken logger framework — it was treating toString as a dumping ground for every field, then interpolating that string into durable logs.",
    ru: "Security проверил централизованные KYC-логи после тикета вендора. Строки KycAuditLogger содержали полные имена клиентов, national ID, account references и живые VerificationToken — потому что разработчики переопределили toString «для отладки» и логировали через concatenation: logger.info(\"verify \" + request). Retention отправил копии в SIEM и third-party analytics export. Регуляторы расценили это как exposure персональных данных. Причина не в сломанном logger framework — в том, что toString стал dump всех полей, а затем эта строка попала в долгоживущие логи."
  },
  engineeringProblem: {
    en: "Object.toString is for concise diagnostics, not a serialization or audit export API. CustomerVerificationRequest held CustomerId, display name, nationalId, AccountReference, and VerificationToken. A naive toString included everything. KycAuditLogger concatenated the object into INFO logs. Fix: override toString with redacted identifiers only (CustomerId masked, token redacted via RedactionPolicy); never include secrets; use parameterized logging logger.info(\"verify customerId={}\", safeId) so disabled log levels skip work and formatters stay structured; keep a separate explicit secure audit channel when full detail is lawfully required.",
    ru: "Object.toString — для краткой диагностики, не API сериализации или audit export. CustomerVerificationRequest держал CustomerId, display name, nationalId, AccountReference и VerificationToken. Наивный toString включал всё. KycAuditLogger склеивал объект в INFO-логи. Фикс: переопределить toString только с redacted идентификаторами (маскированный CustomerId, токен через RedactionPolicy); никогда не включать секреты; использовать parameterized logging logger.info(\"verify customerId={}\", safeId), чтобы отключённые уровни не делали лишнюю работу и форматтеры оставались structured; отдельный явный secure audit channel, когда полный detail законно требуется."
  },
  learningObjectives: [
    {
      en: "Design toString as concise diagnostics, not a full field dump of CustomerVerificationRequest",
      ru: "Проектировать toString как краткую диагностику, а не полный dump полей CustomerVerificationRequest"
    },
    {
      en: "Apply PII redaction / RedactionPolicy for names, national IDs, AccountReference, and VerificationToken",
      ru: "Применять redaction PII / RedactionPolicy для имён, national ID, AccountReference и VerificationToken"
    },
    {
      en: "Use parameterized logging instead of string concatenation of domain objects",
      ru: "Использовать parameterized logging вместо string concatenation доменных объектов"
    },
    {
      en: "Separate everyday logs from lawful full-detail audit channels",
      ru: "Отделять повседневные логи от законных full-detail audit channels"
    }
  ],
  requiredConceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
  recommendedConceptIds: ["cpt_java_lang_object", "cpt_immutability"],
  stageIds: TOSTRING_SAFE_LOGGING_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ts_fix_builder", "chl_ts_bughunt", "chl_ts_interview_answer"],
  estimatedMinutes: 26,
  difficulty: "APPLIED",
  xpReward: 275,
  version: "1.0.0"
};
