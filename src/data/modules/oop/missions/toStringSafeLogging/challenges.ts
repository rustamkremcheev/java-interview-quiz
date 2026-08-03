import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_TS: FixBuilderChallenge = {
  id: "chl_ts_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_tostring_safe_logging",
  stageId: "stg_ts_practice",
  title: {
    en: "Fix Builder: Safe toString for CustomerVerificationRequest",
    ru: "Конструктор Исправления: Safe toString для CustomerVerificationRequest"
  },
  prompt: {
    en: "CustomerVerificationRequest.toString dumps PII and VerificationToken; KycAuditLogger concatenates the object into INFO logs. Select ALL structural building blocks for a production-safe fix.",
    ru: "CustomerVerificationRequest.toString дампит PII и VerificationToken; KycAuditLogger склеивает объект в INFO-логи. Выберите ВСЕ элементы для продакшн-безопасного фикса."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
  topicIds: ["top_oop_21"],
  tags: ["#tostring", "#pii", "#logging"],
  hintIds: ["hnt_ts_1", "hnt_ts_2", "hnt_ts_3", "hnt_ts_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ts_request_broken",
    solutionCodeArtifactId: "art_ts_request_solution",
    options: [
      {
        id: "opt_ts_fix_1",
        text: {
          en: "Override toString to emit only redacted diagnostic identifiers (e.g. masked CustomerId) — never raw nationalId, full name, or VerificationToken.",
          ru: "Переопределить toString так, чтобы выводить только redacted диагностические идентификаторы (например masked CustomerId) — никогда сырой nationalId, полное имя или VerificationToken."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. toString must stay useful without becoming a PII dump.",
          ru: "Верно. toString должен оставаться полезным, не становясь dump PII."
        }
      },
      {
        id: "opt_ts_fix_2",
        text: {
          en: "Route sensitive fields through RedactionPolicy before any log-facing representation.",
          ru: "Пропускать чувствительные поля через RedactionPolicy перед любым log-facing представлением."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Central redaction policy keeps masking consistent across call sites.",
          ru: "Верно. Центральная RedactionPolicy держит маскирование согласованным по call sites."
        }
      },
      {
        id: "opt_ts_fix_3",
        text: {
          en: "Keep logger.info(\"verify \" + request) — concatenation is fine if log level is INFO only in production.",
          ru: "Оставить logger.info(\"verify \" + request) — concatenation нормален, если в production только уровень INFO."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Concatenation eagerly builds a string with whatever toString returns and still ships PII to aggregators.",
          ru: "Неверно. Concatenation eagerly строит строку с тем, что вернул toString, и всё равно отправляет PII в aggregators."
        }
      },
      {
        id: "opt_ts_fix_4",
        text: {
          en: "Use parameterized logging with safe arguments (e.g. logger.info(\"verify customerId={}\", redactedId)), not object concatenation.",
          ru: "Использовать parameterized logging с безопасными аргументами (например logger.info(\"verify customerId={}\", redactedId)), не concatenation объекта."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Parameterization supports structured logs and avoids accidental full-object dumps.",
          ru: "Верно. Parameterization поддерживает structured logs и избегает случайных full-object dumps."
        }
      },
      {
        id: "opt_ts_fix_distractor_1",
        text: {
          en: "Delete toString entirely and rely on default Class@hex forever so no PII can appear.",
          ru: "Удалить toString полностью и навсегда полагаться на default Class@hex, чтобы PII не появлялся."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Default Class@hex avoids PII but cripples diagnostics; the goal is redacted useful toString plus safe logging.",
          ru: "Неверно. Default Class@hex избегает PII, но калечит диагностику; цель — redacted полезный toString плюс safe logging."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_TS: BugHuntChallenge = {
  id: "chl_ts_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_tostring_safe_logging",
  stageId: "stg_ts_debug",
  title: {
    en: "Bug Hunt: PII Leak via toString and Concatenation",
    ru: "Поиск Бага: Утечка PII через toString и Concatenation"
  },
  prompt: {
    en: "Click the line(s) where PII or VerificationToken is included in toString or eagerly concatenated into a log message.",
    ru: "Нажмите строку(и), где PII или VerificationToken включается в toString или eagerly склеивается в log message."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
  topicIds: ["top_oop_21"],
  tags: ["#bug-hunt", "#pii"],
  hintIds: ["hnt_ts_bug_1", "hnt_ts_bug_2", "hnt_ts_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ts_logger_bughunt",
    solutionCodeArtifactId: "art_ts_request_solution",
    codeSnippet: `public String toString() {
    return "CustomerVerificationRequest{" +
        "customerId=" + customerId +
        ", fullName=" + fullName + // Line 4 — PII
        ", nationalId=" + nationalId + // Line 5 — PII
        ", account=" + accountReference +
        ", token=" + verificationToken + // Line 7 — secret
        '}';
}
public void logReceived(CustomerVerificationRequest request) {
    logger.info("verify " + request); // Line 11 — concatenation leak
}`,
    lines: [
      { lineNumber: 1, code: "public String toString() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    return \"CustomerVerificationRequest{\" +", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "        \"customerId=\" + customerId +", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 4,
        code: "        \", fullName=\" + fullName +",
        isBug: true,
        explanation: {
          en: "Line 4: fullName is PII — must not appear in toString destined for logs.",
          ru: "Строка 4: fullName — PII — не должен появляться в toString, попадающем в логи."
        }
      },
      {
        lineNumber: 5,
        code: "        \", nationalId=\" + nationalId +",
        isBug: true,
        explanation: {
          en: "Line 5: nationalId is sensitive personal data.",
          ru: "Строка 5: nationalId — чувствительные персональные данные."
        }
      },
      { lineNumber: 6, code: "        \", account=\" + accountReference +", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 7,
        code: "        \", token=\" + verificationToken +",
        isBug: true,
        explanation: {
          en: "Line 7: VerificationToken is a secret — never emit via toString.",
          ru: "Строка 7: VerificationToken — секрет — никогда не выводить через toString."
        }
      },
      { lineNumber: 8, code: "        '}';", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "public void logReceived(CustomerVerificationRequest request) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "    logger.info(\"verify \" + request);",
        isBug: true,
        explanation: {
          en: "Line 11: String concatenation eagerly calls toString and ships the dump into centralized logs.",
          ru: "Строка 11: String concatenation eagerly вызывает toString и отправляет dump в централизованные логи."
        }
      },
      { lineNumber: 12, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_TS: InterviewAnswerChallenge = {
  id: "chl_ts_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_tostring_safe_logging",
  stageId: "stg_ts_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Safe toString & Logging",
    ru: "Устный Ответ на Senior-Интервью: Safe toString и Logging"
  },
  prompt: {
    en: "CustomerVerificationRequest.toString leaked PII and VerificationToken into KycAuditLogger. Explain diagnostic toString design, PII redaction, parameterized logging, and your production fix.",
    ru: "CustomerVerificationRequest.toString утекал PII и VerificationToken в KycAuditLogger. Объясните дизайн диагностического toString, redaction PII, parameterized logging и ваш продакшн-фикс."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
  topicIds: ["top_oop_21"],
  tags: ["#interview", "#tostring", "#pii"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ts_pii_tostring_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_tostring_diagnostics",
        label: { en: "Diagnostic toString", ru: "Диагностический toString" },
        keywords: ["toString", "diagnostic", "concise", "диагностик", "краткий"]
      },
      {
        id: "cpt_pii_redaction",
        label: { en: "PII Redaction", ru: "Redaction PII" },
        keywords: ["PII", "redact", "mask", "token", "персональн", "маск", "секрет"]
      },
      {
        id: "cpt_logging_parameterization",
        label: { en: "Logging Parameterization", ru: "Parameterization Логирования" },
        keywords: ["parameterized", "logger", "concatenation", "structured", "параметр", "логгер", "concatenation"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): toString is for concise diagnostics, not a field dump. Our CustomerVerificationRequest included fullName, nationalId, AccountReference, and VerificationToken; KycAuditLogger did info(\"verify \" + request), shipping PII to SIEM. Fix: redacted toString via RedactionPolicy, never log secrets, parameterized logging with safe IDs, and a separate lawful audit channel when full detail is required.",
      ru: "Elevator Pitch (30 сек): toString — для краткой диагностики, не dump полей. CustomerVerificationRequest включал fullName, nationalId, AccountReference и VerificationToken; KycAuditLogger делал info(\"verify \" + request), отправляя PII в SIEM. Фикс: redacted toString через RedactionPolicy, никогда не логировать секреты, parameterized logging с safe ID и отдельный законный audit channel, когда нужен полный detail."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Effective Java Item 12 — override toString usefully, but usefulness for KYC must exclude secrets and minimize PII. Any code path that concatenates an object into a log invokes toString eagerly; even if log level is later filtered at the sink, the string may already be built and retained in buffers. Parameterized logging passes arguments to the framework: disabled levels can skip formatting, and structured backends capture fields without one giant opaque string. RedactionPolicy centralizes masking of CustomerId / AccountReference and replaces VerificationToken with a constant redacted marker.",
      ru: "Глубокая Механика (60 сек): Effective Java Item 12 — переопределяйте toString полезно, но полезность для KYC должна исключать секреты и минимизировать PII. Любой путь, склеивающий объект в лог, eagerly вызывает toString; даже если уровень потом фильтруется на sink, строка уже может быть построена и удержана в буферах. Parameterized logging передаёт аргументы фреймворку: отключённые уровни могут пропустить formatting, а structured backends сохраняют поля без одной гигантской opaque-строки. RedactionPolicy централизует маскирование CustomerId / AccountReference и заменяет VerificationToken константным redacted marker."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Over-redaction makes support harder — keep stable correlation IDs. Under-redaction is a regulatory incident. Separate secure audit stores with access control when law requires full payloads. Do not 'fix' leaks by deleting toString entirely; fix the representation and the logging call sites.",
      ru: "Продакшн Компромиссы (30 сек): Чрезмерная redaction усложняет support — оставляйте стабильные correlation ID. Недостаточная redaction — регуляторный инцидент. Отдельные secure audit stores с access control, когда закон требует полных payload. Не «чините» утечки удалением toString; исправьте представление и call sites логирования."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If log level is WARN-only in production, is concatenating request in a DEBUG line still safe?'",
      ru: "Доп. Вопрос Интервьюера: 'Если в production только WARN, безопасна ли concatenation request в DEBUG-строке?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Safer than INFO, but not a design strategy. DEBUG can be enabled during incidents; misconfigured collectors may still ingest; and other call sites may use INFO. Always make toString redacted and prefer parameterized safe fields — defense in depth, not reliance on log level alone.",
      ru: "Ответ на Доп. Вопрос: Безопаснее, чем INFO, но не стратегия дизайна. DEBUG могут включить во время инцидента; misconfigured collectors всё ещё могут принимать; другие call sites могут использовать INFO. Всегда делайте toString redacted и предпочитайте parameterized safe fields — defense in depth, а не ставка только на log level."
    }
  }
};

export const ALL_TOSTRING_SAFE_LOGGING_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_TS,
  APPLIED_BUG_HUNT_CHALLENGE_TS,
  INTERVIEW_ANSWER_CHALLENGE_TS
];
