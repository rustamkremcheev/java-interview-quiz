import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_TOSTRING_SAFE_LOGGING: readonly MistakePattern[] = [
  {
    id: "err_ts_dump_all_fields",
    code: "ERR_TS_DUMP_ALL_FIELDS",
    title: {
      en: "Dumping Every Field in toString",
      ru: "Дамп Всех Полей в toString"
    },
    description: {
      en: "Overriding CustomerVerificationRequest.toString to include fullName, nationalId, AccountReference, and VerificationToken.",
      ru: "Переопределять CustomerVerificationRequest.toString так, чтобы включать fullName, nationalId, AccountReference и VerificationToken."
    },
    conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction"],
    exampleIncorrectReasoning: {
      en: "More fields in toString always means better debugging.",
      ru: "Больше полей в toString всегда значит лучшую отладку."
    },
    correctedReasoning: {
      en: "toString should be concise and safe for accidental logging — redact PII and never emit secrets.",
      ru: "toString должен быть кратким и безопасным при случайном логировании — редактируйте PII и никогда не выводите секреты."
    },
    remediationMissionIds: ["mis_tostring_safe_logging"]
  },
  {
    id: "err_ts_concat_object_into_log",
    code: "ERR_TS_CONCAT_OBJECT_INTO_LOG",
    title: {
      en: "Concatenating Domain Objects into Log Messages",
      ru: "Склеивание Доменных Объектов в Log Messages"
    },
    description: {
      en: "Using logger.info(\"verify \" + request) so toString is eagerly embedded in durable logs.",
      ru: "Использовать logger.info(\"verify \" + request), чтобы toString eagerly попадал в долгоживущие логи."
    },
    conceptIds: ["cpt_logging_parameterization"],
    exampleIncorrectReasoning: {
      en: "String concatenation is the simplest way to log an object.",
      ru: "String concatenation — самый простой способ залогировать объект."
    },
    correctedReasoning: {
      en: "Use parameterized logging with explicitly chosen safe fields.",
      ru: "Используйте parameterized logging с явно выбранными безопасными полями."
    },
    remediationMissionIds: ["mis_tostring_safe_logging"]
  },
  {
    id: "err_ts_trust_log_level_alone",
    code: "ERR_TS_TRUST_LOG_LEVEL_ALONE",
    title: {
      en: "Relying Only on Log Level to Hide PII",
      ru: "Полагание Только на Log Level для Скрытия PII"
    },
    description: {
      en: "Assuming DEBUG-only concatenation of CustomerVerificationRequest is safe because production is WARN.",
      ru: "Предполагать, что DEBUG-only concatenation CustomerVerificationRequest безопасна, потому что в production WARN."
    },
    conceptIds: ["cpt_logging_parameterization", "cpt_pii_redaction"],
    exampleIncorrectReasoning: {
      en: "We never enable DEBUG in production, so PII in toString cannot leak.",
      ru: "Мы никогда не включаем DEBUG в production, поэтому PII в toString не утечёт."
    },
    correctedReasoning: {
      en: "Incidents flip levels; misconfigured collectors exist. Make toString and call sites safe by default.",
      ru: "При инцидентах уровни включают; бывают misconfigured collectors. Делайте toString и call sites безопасными по умолчанию."
    },
    remediationMissionIds: ["mis_tostring_safe_logging"]
  },
  {
    id: "err_ts_delete_tostring_only",
    code: "ERR_TS_DELETE_TOSTRING_ONLY",
    title: {
      en: "Deleting toString as the Only Remediation",
      ru: "Удаление toString как Единственная Remediation"
    },
    description: {
      en: "Removing the override to fall back to Class@hex without fixing logging call sites or providing redacted diagnostics.",
      ru: "Удалять override, откатываясь к Class@hex, без фикса call sites логирования и без redacted диагностики."
    },
    conceptIds: ["cpt_tostring_diagnostics"],
    exampleIncorrectReasoning: {
      en: "If toString is default Class@hex, the PII problem is solved forever.",
      ru: "Если toString — default Class@hex, проблема PII решена навсегда."
    },
    correctedReasoning: {
      en: "Prefer a redacted useful toString plus parameterized safe logging; Class@hex alone hurts operations.",
      ru: "Предпочитайте redacted полезный toString плюс parameterized safe logging; один Class@hex вредит operations."
    },
    remediationMissionIds: ["mis_tostring_safe_logging"]
  },
  {
    id: "err_ts_log_as_audit_export",
    code: "ERR_TS_LOG_AS_AUDIT_EXPORT",
    title: {
      en: "Using Everyday Logs as Full KYC Audit Export",
      ru: "Использование Повседневных Логов как Полный KYC Audit Export"
    },
    description: {
      en: "Treating KycAuditLogger INFO lines as the lawful full-detail audit store for verification payloads.",
      ru: "Считать INFO-строки KycAuditLogger законным full-detail audit store для verification payloads."
    },
    conceptIds: ["cpt_pii_redaction", "cpt_logging_parameterization"],
    exampleIncorrectReasoning: {
      en: "SIEM already stores everything — put full CustomerVerificationRequest there for auditors.",
      ru: "SIEM уже хранит всё — положим туда полный CustomerVerificationRequest для аудиторов."
    },
    correctedReasoning: {
      en: "Separate redacted operational logs from access-controlled audit channels that lawfully store full detail.",
      ru: "Отделяйте redacted operational logs от access-controlled audit channels, которые законно хранят полный detail."
    },
    remediationMissionIds: ["mis_tostring_safe_logging"]
  }
];
