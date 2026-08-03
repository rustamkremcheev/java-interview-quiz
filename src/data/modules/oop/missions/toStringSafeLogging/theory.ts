import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_TOSTRING_SAFE_LOGGING: TheoryArticle = {
  id: "art_theory_tostring_safe_logging",
  topicIds: ["top_oop_21"],
  conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
  title: {
    en: "Safe toString and Logging for CustomerVerificationRequest",
    ru: "Безопасный toString и Logging для CustomerVerificationRequest"
  },
  summary: {
    en: "Override toString for concise diagnostics, not a PII/secret dump. Apply RedactionPolicy, use parameterized logging, and keep lawful full-detail audits off everyday KycAuditLogger INFO lines.",
    ru: "Переопределяйте toString для краткой диагностики, не dump PII/секретов. Применяйте RedactionPolicy, используйте parameterized logging и держите законные full-detail аудиты вне повседневных INFO-строк KycAuditLogger."
  },
  sections: [
    {
      id: "sec_ts_definition",
      category: "DEFINITION",
      title: { en: "1. What toString Is For", ru: "1. Для Чего Нужен toString" },
      blocks: [
        {
          id: "blk_ts_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Object.toString should return a concise, useful representation for humans and tools. Effective Java Item 12 urges overriding it — but 'useful' for KYC does not mean 'every field'. CustomerVerificationRequest carries CustomerId, display name, nationalId, AccountReference, and VerificationToken. Emitting all of them turns every accidental log, exception message, or map key print into a personal-data and secret exposure.",
            ru: "Object.toString должен возвращать краткое полезное представление для людей и инструментов. Effective Java Item 12 советует переопределять его — но «полезно» для KYC не значит «каждое поле». CustomerVerificationRequest несёт CustomerId, display name, nationalId, AccountReference и VerificationToken. Вывод всех превращает каждый случайный лог, exception message или печать ключа map в exposure персональных данных и секретов."
          }
        },
        {
          id: "blk_ts_def_2",
          type: "CALLOUT",
          title: { en: "💡 Diagnostics ≠ Audit Export", ru: "💡 Диагностика ≠ Audit Export" },
          content: {
            en: "toString is not your regulatory audit payload API. When law requires full detail, use an explicit access-controlled audit channel — not INFO concatenation into SIEM.",
            ru: "toString — не ваш API regulatory audit payload. Когда закон требует полный detail, используйте явный access-controlled audit channel — не INFO concatenation в SIEM."
          }
        }
      ]
    },
    {
      id: "sec_ts_mechanics",
      category: "MECHANICS",
      title: { en: "2. Redaction & Parameterized Logging", ru: "2. Redaction и Parameterized Logging" },
      blocks: [
        {
          id: "blk_ts_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "RedactionPolicy centralizes masking: show only the last digits of CustomerId / IBAN, replace VerificationToken with [REDACTED_TOKEN], omit fullName and nationalId from toString entirely. KycAuditLogger must not do logger.info(\"verify \" + request) — concatenation eagerly calls toString and builds a string even when you later wish you had not. Prefer logger.info(\"verify customerId={}\", RedactionPolicy.customerId(...)). Parameterization supports structured logging backends and lets disabled levels skip formatting work.",
            ru: "RedactionPolicy централизует маскирование: показывать только последние цифры CustomerId / IBAN, заменять VerificationToken на [REDACTED_TOKEN], полностью опускать fullName и nationalId из toString. KycAuditLogger не должен делать logger.info(\"verify \" + request) — concatenation eagerly вызывает toString и строит строку, даже когда вы позже пожалеете. Предпочитайте logger.info(\"verify customerId={}\", RedactionPolicy.customerId(...)). Parameterization поддерживает structured logging backends и позволяет отключённым уровням пропускать formatting."
          }
        },
        {
          id: "blk_ts_mech_2",
          type: "WARNING",
          title: { en: "⚙️ OWASP: Do Not Log Secrets", ru: "⚙️ OWASP: Не Логируйте Секреты" },
          content: {
            en: "OWASP Logging Cheat Sheet guidance: avoid sensitive data in logs. Tokens, passwords, and session material must never ride along in toString 'for convenience'.",
            ru: "OWASP Logging Cheat Sheet: избегайте чувствительных данных в логах. Токены, пароли и session material никогда не должны ехать в toString «для удобства»."
          }
        }
      ]
    },
    {
      id: "sec_ts_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Supportability vs Privacy", ru: "3. Компромиссы: Supportability vs Privacy" },
      blocks: [
        {
          id: "blk_ts_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Over-redaction slows incident response — keep stable correlation IDs (masked customerId). Under-redaction is a regulatory incident with vendor and SIEM fan-out. Deleting toString to fall back to Class@hex avoids PII but hurts operators; the right fix is redacted diagnostics plus safe call sites. Full KYC payloads belong in controlled audit stores, not everyday application logs.",
            ru: "Чрезмерная redaction замедляет incident response — оставляйте стабильные correlation ID (masked customerId). Недостаточная redaction — регуляторный инцидент с fan-out на вендора и SIEM. Удаление toString до Class@hex избегает PII, но вредит operators; правильный фикс — redacted диагностика плюс безопасные call sites. Полные KYC payload принадлежат controlled audit stores, не повседневным application logs."
          }
        }
      ]
    },
    {
      id: "sec_ts_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_ts_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why override toString at all?' — Model Answer: Concise diagnostics beat Class@hex — but keep it redacted.",
            ru: "Доп. Вопрос 1: 'Зачем вообще override toString?' — Модельный Ответ: Краткая диагностика лучше Class@hex — но держите её redacted."
          }
        },
        {
          id: "blk_ts_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What must never appear in toString?' — Model Answer: Secrets (VerificationToken), and usually raw PII like nationalId/fullName.",
            ru: "Доп. Вопрос 2: 'Что никогда не должно быть в toString?' — Модельный Ответ: Секреты (VerificationToken) и обычно сырой PII вроде nationalId/fullName."
          }
        },
        {
          id: "blk_ts_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why is concatenation dangerous?' — Model Answer: It eagerly builds strings via toString into durable log pipelines.",
            ru: "Доп. Вопрос 3: 'Почему опасен concatenation?' — Модельный Ответ: Он eagerly строит строки через toString в долгоживущие log pipelines."
          }
        },
        {
          id: "blk_ts_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'What is parameterized logging?' — Model Answer: Pass template + safe args so frameworks format/structure without object dumps.",
            ru: "Доп. Вопрос 4: 'Что такое parameterized logging?' — Модельный Ответ: Передавать template + safe args, чтобы фреймворки форматировали/структурировали без object dumps."
          }
        },
        {
          id: "blk_ts_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Role of RedactionPolicy?' — Model Answer: One place to mask IDs and scrub tokens consistently.",
            ru: "Доп. Вопрос 5: 'Роль RedactionPolicy?' — Модельный Ответ: Одно место для согласованного маскирования ID и scrub токенов."
          }
        },
        {
          id: "blk_ts_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Is DEBUG-only safe?' — Model Answer: Not as a strategy — levels change during incidents.",
            ru: "Доп. Вопрос 6: 'Безопасен ли только DEBUG?' — Модельный Ответ: Не как стратегия — уровни меняют во время инцидентов."
          }
        },
        {
          id: "blk_ts_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do auditors get full detail?' — Model Answer: Separate access-controlled audit channel, not INFO SIEM dumps.",
            ru: "Доп. Вопрос 7: 'Как аудиторы получают полный detail?' — Модельный Ответ: Отдельный access-controlled audit channel, не INFO dump в SIEM."
          }
        },
        {
          id: "blk_ts_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Relation to Object contracts mission?' — Model Answer: Sibling — there Class@hex noise; here unsafe rich toString.",
            ru: "Доп. Вопрос 8: 'Связь с миссией Object contracts?' — Модельный Ответ: Соседняя — там шум Class@hex; здесь небезопасный богатый toString."
          }
        },
        {
          id: "blk_ts_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Can records auto-toString be unsafe?' — Model Answer: Yes — generated toString includes components; redact or avoid logging records wholesale.",
            ru: "Доп. Вопрос 9: 'Может ли auto-toString у record быть небезопасным?' — Модельный Ответ: Да — generated toString включает компоненты; редактируйте или не логируйте records целиком."
          }
        },
        {
          id: "blk_ts_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How do you review for this bug?' — Model Answer: Search toString bodies for PII fields and logs for '+ request' / '{ }', request).",
            ru: "Доп. Вопрос 10: 'Как ловить на ревью?' — Модельный Ответ: Ищите в toString поля PII и в логах '+ request' / '{ }', request)."
          }
        },
        {
          id: "blk_ts_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'What about exception messages?' — Model Answer: Same rule — do not put raw tokens/PII into exception text that may be logged.",
            ru: "Доп. Вопрос 11: 'А exception messages?' — Модельный Ответ: То же правило — не кладите сырые токены/PII в текст исключений, которые могут логироваться."
          }
        },
        {
          id: "blk_ts_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Vendor log export risk?' — Model Answer: Centralized logs often fan out — assume any logged string may leave your trust boundary.",
            ru: "Доп. Вопрос 12: 'Риск vendor log export?' — Модельный Ответ: Централизованные логи часто делают fan-out — считайте, что любая залогированная строка может покинуть trust boundary."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_java_lang_object"],
  sourceIds: ["src_ts_owasp_logging", "src_ts_ej_item12", "src_ts_object_tostring", "src_ts_slf4j_parameterized"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#tostring", "#pii", "#logging", "#redaction", "#kyc"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_TOSTRING_SAFE_LOGGING: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ts_1",
    theoryArticleId: "art_theory_tostring_safe_logging",
    order: 1,
    question: {
      en: "Why did CustomerVerificationRequest.toString cause a regulatory incident?",
      ru: "Почему CustomerVerificationRequest.toString вызвал регуляторный инцидент?"
    },
    explanation: {
      en: "It dumped PII and VerificationToken; KycAuditLogger concatenated that into centralized logs.",
      ru: "Он дампил PII и VerificationToken; KycAuditLogger склеивал это в централизованные логи."
    },
    options: [
      {
        id: "opt_ts1_a",
        text: {
          en: "toString included PII/secrets and was concatenated into durable logs.",
          ru: "toString включал PII/секреты и склеивался в долгоживущие логи."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ts1_b",
        text: {
          en: "equals/hashCode used nationalId as a HashMap key.",
          ru: "equals/hashCode использовал nationalId как ключ HashMap."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — this mission is about toString/logging.", ru: "Неверно — эта миссия про toString/logging." }
      },
      {
        id: "opt_ts1_c",
        text: {
          en: "finalize leaked the token after GC.",
          ru: "finalize утекал токен после GC."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_ts_2",
    theoryArticleId: "art_theory_tostring_safe_logging",
    order: 2,
    question: {
      en: "What should a safe CustomerVerificationRequest.toString emphasize?",
      ru: "На чём должен акцентироваться безопасный CustomerVerificationRequest.toString?"
    },
    explanation: {
      en: "Redacted diagnostic identifiers — not fullName, nationalId, or raw VerificationToken.",
      ru: "Redacted диагностические идентификаторы — не fullName, nationalId или сырой VerificationToken."
    },
    options: [
      {
        id: "opt_ts2_a",
        text: {
          en: "Masked CustomerId / account markers and redacted token — omit raw PII.",
          ru: "Masked CustomerId / маркеры account и redacted token — без сырого PII."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ts2_b",
        text: {
          en: "Every field including VerificationToken for maximum debuggability.",
          ru: "Каждое поле включая VerificationToken для максимальной отлаживаемости."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — that is the incident.", ru: "Неверно — это и есть инцидент." }
      },
      {
        id: "opt_ts2_c",
        text: {
          en: "Only the Class@hex from Object — never override.",
          ru: "Только Class@hex из Object — никогда не переопределять."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — prefer redacted useful toString.", ru: "Неверно — предпочитайте redacted полезный toString." }
      }
    ]
  },
  {
    id: "chk_ts_3",
    theoryArticleId: "art_theory_tostring_safe_logging",
    order: 3,
    question: {
      en: "Why prefer parameterized logging over \"verify \" + request?",
      ru: "Почему предпочитать parameterized logging вместо \"verify \" + request?"
    },
    explanation: {
      en: "Avoids eager unsafe toString dumps and supports structured safe field logging.",
      ru: "Избегает eager небезопасных dump toString и поддерживает structured логирование safe-полей."
    },
    options: [
      {
        id: "opt_ts3_a",
        text: {
          en: "Pass explicit safe arguments instead of concatenating the whole object.",
          ru: "Передавать явные safe-аргументы вместо склейки всего объекта."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ts3_b",
        text: {
          en: "Parameterized logging disables SIEM by law.",
          ru: "Parameterized logging по закону отключает SIEM."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ts3_c",
        text: {
          en: "Concatenation is illegal in Java 17.",
          ru: "Concatenation запрещён в Java 17."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_ts_4",
    theoryArticleId: "art_theory_tostring_safe_logging",
    order: 4,
    question: {
      en: "Is relying on WARN-only production log level enough to allow PII in toString?",
      ru: "Достаточно ли полагаться на WARN-only в production, чтобы держать PII в toString?"
    },
    explanation: {
      en: "No — levels change during incidents; make toString and call sites safe by default.",
      ru: "Нет — уровни меняют при инцидентах; делайте toString и call sites безопасными по умолчанию."
    },
    options: [
      {
        id: "opt_ts4_a",
        text: {
          en: "No — defense in depth: redact toString and log safe parameterized fields.",
          ru: "Нет — defense in depth: редактируйте toString и логируйте safe parameterized fields."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ts4_b",
        text: {
          en: "Yes — DEBUG can never be enabled in regulated banks.",
          ru: "Да — DEBUG никогда нельзя включить в regulated banks."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ts4_c",
        text: {
          en: "Yes — OWASP requires PII only at DEBUG.",
          ru: "Да — OWASP требует PII только на DEBUG."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — OWASP advises against logging sensitive data.", ru: "Неверно — OWASP советует не логировать чувствительные данные." }
      }
    ]
  }
];
