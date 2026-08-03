import { Hint } from '../../../../../types/domain';

export const HINTS_DOMAIN_MODELING: readonly Hint[] = [
  {
    id: "hnt_dm_1",
    challengeId: "chl_dm_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: LoanApplication should stop exposing String/boolean/double knobs. Identity and money belong in self-validating value objects.",
      ru: "Направляющая Подсказка: LoanApplication не должен открывать ручки String/boolean/double. Идентичность и деньги — в самовалидирующих value objects."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_dm_2",
    challengeId: "chl_dm_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Independent approved beside status lets REJECTED+approved=true compile. One LoanStatus / CreditDecision removes the contradiction.",
      ru: "Напоминание Концепции: Независимый approved рядом со status позволяет REJECTED+approved=true компилироваться. Один LoanStatus / CreditDecision убирает противоречие."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_dm_3",
    challengeId: "chl_dm_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: ApprovalPolicy + submit()/decide(CreditDecision) are the write API; public fields and open Map extras must not drive lifecycle.",
      ru: "Механика Работы: ApprovalPolicy + submit()/decide(CreditDecision) — write API; public fields и открытый Map extras не должны управлять lifecycle."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_dm_4",
    challengeId: "chl_dm_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: ApplicantId + LoanMoney(long cents) + LoanStatus + CreditDecision + ApprovalPolicy; LoanApplication methods enforce transitions.",
      ru: "Структура Решения: ApplicantId + LoanMoney(long cents) + LoanStatus + CreditDecision + ApprovalPolicy; методы LoanApplication защищают переходы."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_dm_bug_1",
    challengeId: "chl_dm_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Compliance saw REJECTED with approved=true and negative amounts. Look for public fields or writers that set those without checks.",
      ru: "Направляющая Подсказка: Compliance видел REJECTED с approved=true и отрицательными суммами. Ищите public fields или writers, выставляющие это без проверок."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_dm_bug_2",
    challengeId: "chl_dm_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: When status and approved are independent primitives, any combination is representable — including contradictions.",
      ru: "Напоминание Концепции: Когда status и approved — независимые примитивы, представима любая комбинация — включая противоречия."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_dm_bug_3",
    challengeId: "chl_dm_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: The boolean approved field, String status, double amount, and the method that sets REJECTED while approved=true are the bug lines.",
      ru: "Структура Решения: Поле boolean approved, String status, double amount и метод, ставящий REJECTED при approved=true — строки бага."
    },
    xpPenalty: 50,
    order: 3
  }
];
