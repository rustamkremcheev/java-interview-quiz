import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_STATE_BEHAVIOR_IDENTITY: readonly MistakePattern[] = [
  {
    id: "err_sbi_state_as_identity",
    code: "ERR_SBI_STATE_AS_IDENTITY",
    title: {
      en: "Treating Matching State as the Same Identity",
      ru: "Принятие Совпадающего State за Ту Же Identity"
    },
    description: {
      en: "Skipping or merging TransferRequest instances because amount/counterparty fields match, ignoring distinct TransferIds.",
      ru: "Пропуск или слияние TransferRequest из‑за совпадения полей amount/контрагента, игнорируя разные TransferId."
    },
    conceptIds: ["cpt_object_identity", "cpt_object_state"],
    exampleIncorrectReasoning: {
      en: "Same amount and beneficiary — must be the same transfer; drop the second.",
      ru: "Та же сумма и бенефициар — значит тот же перевод; второй отбрасываем."
    },
    correctedReasoning: {
      en: "Entities are distinguished by TransferId. Matching state is a review signal, not automatic identity collapse.",
      ru: "Сущности различаются по TransferId. Совпадение state — сигнал для review, не автоматическое слияние identity."
    },
    remediationMissionIds: ["mis_state_behavior_identity"]
  },
  {
    id: "err_sbi_public_setters_as_behavior",
    code: "ERR_SBI_PUBLIC_SETTERS_AS_BEHAVIOR",
    title: {
      en: "Using Public Setters Instead of Transitions",
      ru: "Публичные Setter'ы Вместо Переходов"
    },
    description: {
      en: "Exposing setTransferState / setAmount so callers rewrite state without transition rules.",
      ru: "Открытие setTransferState / setAmount, чтобы вызывающий код переписывал state без правил перехода."
    },
    conceptIds: ["cpt_object_behavior", "cpt_object_state"],
    exampleIncorrectReasoning: {
      en: "Setters are fine — callers know when to set SUBMITTED.",
      ru: "Setter'ы нормальны — вызывающий код знает, когда ставить SUBMITTED."
    },
    correctedReasoning: {
      en: "Behavior owns transitions: submit/settle/cancel validate, mutate, and support audit.",
      ru: "Behavior владеет переходами: submit/settle/cancel валидируют, мутируют и поддерживают audit."
    },
    remediationMissionIds: ["mis_state_behavior_identity"]
  },
  {
    id: "err_sbi_mutable_transfer_id",
    code: "ERR_SBI_MUTABLE_TRANSFER_ID",
    title: {
      en: "Rewriting TransferId After Creation",
      ru: "Перепись TransferId После Создания"
    },
    description: {
      en: "Allowing TransferId to change so 'duplicates' can be merged by overwriting identity.",
      ru: "Разрешение менять TransferId, чтобы «дубликаты» сливались перезаписью identity."
    },
    conceptIds: ["cpt_object_identity"],
    exampleIncorrectReasoning: {
      en: "If fields match, set both objects to the first TransferId.",
      ru: "Если поля совпали — выставим обоим объектам первый TransferId."
    },
    correctedReasoning: {
      en: "Identity is stable for the entity lifetime; correlate business intent separately if needed.",
      ru: "Identity стабильна на жизнь сущности; бизнес-намерение коррелируйте отдельно при необходимости."
    },
    remediationMissionIds: ["mis_state_behavior_identity"]
  },
  {
    id: "err_sbi_equals_hash_as_fix",
    code: "ERR_SBI_EQUALS_HASH_AS_FIX",
    title: {
      en: "Fixing Identity Bugs with equals/hashCode",
      ru: "Починка Багов Identity через equals/hashCode"
    },
    description: {
      en: "Proposing amount-based equals/hashCode so collections hide the second transfer.",
      ru: "Предложение equals/hashCode по amount, чтобы коллекции скрыли второй перевод."
    },
    conceptIds: ["cpt_object_identity"],
    exampleIncorrectReasoning: {
      en: "Put TransferRequest in a HashSet keyed by amount — duplicates disappear.",
      ru: "Положим TransferRequest в HashSet по amount — дубликаты исчезнут."
    },
    correctedReasoning: {
      en: "This is lifecycle/identity modeling, not a HashMap equality-contract mission.",
      ru: "Это моделирование lifecycle/identity, не миссия контракта равенства HashMap."
    },
    remediationMissionIds: ["mis_state_behavior_identity"]
  },
  {
    id: "err_sbi_ignore_audit_identity",
    code: "ERR_SBI_IGNORE_AUDIT_IDENTITY",
    title: {
      en: "Auditing Without Stable TransferId",
      ru: "Аудит Без Стабильного TransferId"
    },
    description: {
      en: "Writing TransferAuditEntry from field snapshots without binding to TransferId identity.",
      ru: "Писать TransferAuditEntry из snapshot полей без привязки к identity TransferId."
    },
    conceptIds: ["cpt_object_identity", "cpt_object_behavior"],
    exampleIncorrectReasoning: {
      en: "Audit only needs amount and beneficiary — ids are internal.",
      ru: "Аудиту нужны только amount и бенефициар — id внутренние."
    },
    correctedReasoning: {
      en: "Compliance and retries need TransferAuditEntry keyed by TransferId on each transition.",
      ru: "Compliance и retry требуют TransferAuditEntry с ключом TransferId на каждый переход."
    },
    remediationMissionIds: ["mis_state_behavior_identity"]
  }
];
