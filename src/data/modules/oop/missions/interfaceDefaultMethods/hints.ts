import { Hint } from '../../../../../types/domain';

export const HINTS_INTERFACE_DEFAULT_METHODS: readonly Hint[] = [
  {
    id: "hnt_idm_1",
    challengeId: "chl_idm_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Read the JLS 9.4.1.2 error message carefully — 'unrelated defaults' means Auditable and Traceable are sibling interfaces with no subtyping relationship.",
      ru: "Направляющая Подсказка: Внимательно прочитайте сообщение JLS 9.4.1.2 — 'unrelated defaults' означает, что Auditable и Traceable — «братские» интерфейсы без subtyping-связи."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_idm_2",
    challengeId: "chl_idm_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: JLS 9.4.1.2 requires an explicit @Override when unrelated superinterfaces supply defaults with the same signature.",
      ru: "Напоминание Концепции: JLS 9.4.1.2 требует явного @Override, когда несвязанные супер-интерфейсы предоставляют defaults с одинаковой сигнатурой."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_idm_3",
    challengeId: "chl_idm_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Inside the override, use InterfaceName.super.methodName() to invoke each specific default — Auditable.super.auditLog() and Traceable.super.auditLog().",
      ru: "Механика Работы: Внутри override используйте InterfaceName.super.methodName() для вызова каждого конкретного default — Auditable.super.auditLog() и Traceable.super.auditLog()."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_idm_4",
    challengeId: "chl_idm_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: @Override public void auditLog() { Auditable.super.auditLog(); Traceable.super.auditLog(); } — compliance first, then trace.",
      ru: "Структура Решения: @Override public void auditLog() { Auditable.super.auditLog(); Traceable.super.auditLog(); } — сначала compliance, затем trace."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_idm_bug_1",
    challengeId: "chl_idm_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: SettlementProcessor compiles successfully but compliance audit records are missing in production. Which superinterface default is NOT being called?",
      ru: "Направляющая Подсказка: SettlementProcessor компилируется, но compliance audit records отсутствуют на продакшене. Default какого супер-интерфейса НЕ вызывается?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_idm_bug_2",
    challengeId: "chl_idm_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Resolving the compile error with a partial override (calling only one Interface.super.method()) silently drops the other audit trail.",
      ru: "Напоминание Концепции: Разрешение ошибки компиляции частичным override (вызов только одного Interface.super.method()) молча отбрасывает другой аудит-трейл."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_idm_bug_3",
    challengeId: "chl_idm_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Line 5 calls Traceable.super.auditLog() only — Auditable.super.auditLog() is missing, causing compliance DB write loss.",
      ru: "Структура Решения: Строка 5 вызывает только Traceable.super.auditLog() — Auditable.super.auditLog() отсутствует, что приводит к потере записи в compliance DB."
    },
    xpPenalty: 50,
    order: 3
  }
];
