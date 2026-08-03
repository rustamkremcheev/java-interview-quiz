import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_AM: FixBuilderChallenge = {
  id: "chl_am_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_access_modifiers",
  stageId: "stg_am_practice",
  title: {
    en: "Fix Builder: Seal Ledger Internals Behind JournalPostingFacade",
    ru: "Конструктор Исправления: Закрыть Internals Ledger за JournalPostingFacade"
  },
  prompt: {
    en: "GeneralLedger.postRaw is reachable across packages and skips InternalPostingPolicy. Select ALL structural building blocks for a production-safe package boundary.",
    ru: "GeneralLedger.postRaw доступен через пакеты и обходит InternalPostingPolicy. Выберите ВСЕ элементы для продакшн-безопасной границы пакета."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_access_modifiers", "cpt_package_private", "cpt_protected_coupling"],
  topicIds: ["top_oop_06"],
  tags: ["#access-modifiers", "#package-private", "#facade"],
  hintIds: ["hnt_am_1", "hnt_am_2", "hnt_am_3", "hnt_am_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_am_ledger_broken",
    solutionCodeArtifactId: "art_am_facade_solution",
    options: [
      {
        id: "opt_am_fix_1",
        text: {
          en: "Make GeneralLedger.postRaw (and related mutators) package-private so only same-package collaborators can call them.",
          ru: "Сделать GeneralLedger.postRaw (и связанные mutators) package-private, чтобы их вызывали только collaborator'ы того же пакета."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Package-private restores the package boundary.",
          ru: "Верно. Package-private восстанавливает границу пакета."
        }
      },
      {
        id: "opt_am_fix_2",
        text: {
          en: "Expose only JournalPostingFacade as the public posting API; it must run InternalPostingPolicy before any raw write.",
          ru: "Открыть только JournalPostingFacade как public API постинга; он обязан прогнать InternalPostingPolicy до любой raw-записи."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. The facade is the control point.",
          ru: "Верно. Facade — точка контроля."
        }
      },
      {
        id: "opt_am_fix_3",
        text: {
          en: "Keep postRaw protected so ReconciliationHook subclasses in com.bank.reporting can reuse posting logic without the facade.",
          ru: "Оставить postRaw protected, чтобы subclasses ReconciliationHook в com.bank.reporting переиспользовали постинг без facade."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Protected still allows foreign-package subclasses to bypass policy — that is the leak.",
          ru: "Неверно. Protected всё ещё позволяет subclasses из чужого пакета обойти policy — это и есть утечка."
        }
      },
      {
        id: "opt_am_fix_4",
        text: {
          en: "Prevent foreign-package subclassing of GeneralLedger (final/sealed or package-private class) so protected coupling cannot reappear.",
          ru: "Запретить subclassing GeneralLedger из чужого пакета (final/sealed или package-private class), чтобы protected coupling не вернулся."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Closing the inheritance channel hardens access control.",
          ru: "Верно. Закрытие канала наследования укрепляет access control."
        }
      },
      {
        id: "opt_am_fix_distractor_1",
        text: {
          en: "Make postRaw public and document 'callers must invoke InternalPostingPolicy first' in a wiki.",
          ru: "Сделать postRaw public и задокументировать в wiki: «сначала вызывайте InternalPostingPolicy»."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Documentation is not an access boundary; callers will still skip policy under pressure.",
          ru: "Неверно. Документация — не граница доступа; вызывающие всё равно пропустят policy под давлением."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_AM: BugHuntChallenge = {
  id: "chl_am_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_access_modifiers",
  stageId: "stg_am_debug",
  title: {
    en: "Bug Hunt: Protected postRaw Package Leak",
    ru: "Поиск Бага: Утечка Protected postRaw"
  },
  prompt: {
    en: "Click the line(s) where widened access lets a foreign-package subclass call postRaw and skip InternalPostingPolicy.",
    ru: "Нажмите строку(и), где расширенный access позволяет subclass из чужого пакета вызвать postRaw и обойти InternalPostingPolicy."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_access_modifiers", "cpt_protected_coupling"],
  topicIds: ["top_oop_06"],
  tags: ["#bug-hunt", "#protected"],
  hintIds: ["hnt_am_bug_1", "hnt_am_bug_2", "hnt_am_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_am_bughunt",
    solutionCodeArtifactId: "art_am_facade_solution",
    codeSnippet: `package com.bank.ledger.core;
public class GeneralLedger {
    protected void postRaw(LedgerEntry entry) { // Line 3 — BUG: protected leak
        entries.add(entry);
    }
}
package com.bank.reporting;
public class ReconciliationHook extends GeneralLedger {
    public void forceAdjust(LedgerEntry e) {
        postRaw(e); // Line 10 — BUG: bypasses policy/facade
    }
}`,
    lines: [
      { lineNumber: 1, code: "package com.bank.ledger.core;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "public class GeneralLedger {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 3,
        code: "    protected void postRaw(LedgerEntry entry) {",
        isBug: true,
        explanation: {
          en: "Line 3: protected postRaw is callable from subclasses in other packages — package boundary leak.",
          ru: "Строка 3: protected postRaw вызываем из subclasses в других пакетах — утечка границы пакета."
        }
      },
      { lineNumber: 4, code: "        entries.add(entry);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "package com.bank.reporting;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "public class ReconciliationHook extends GeneralLedger {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "    public void forceAdjust(LedgerEntry e) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 10,
        code: "        postRaw(e);",
        isBug: true,
        explanation: {
          en: "Line 10: Foreign-package subclass invokes postRaw, skipping JournalPostingFacade and InternalPostingPolicy.",
          ru: "Строка 10: Subclass из чужого пакета вызывает postRaw, минуя JournalPostingFacade и InternalPostingPolicy."
        }
      },
      { lineNumber: 11, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 12, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_AM: InterviewAnswerChallenge = {
  id: "chl_am_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_access_modifiers",
  stageId: "stg_am_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Package Boundary Leak",
    ru: "Устный Ответ на Senior-Интервью: Утечка Границы Пакета"
  },
  prompt: {
    en: "A reporting service subclassed GeneralLedger and called protected postRaw, skipping InternalPostingPolicy. Explain access levels, package-private design, protected coupling, and your production fix with JournalPostingFacade.",
    ru: "Reporting-сервис унаследовал GeneralLedger и вызвал protected postRaw, минуя InternalPostingPolicy. Объясните уровни доступа, package-private дизайн, protected coupling и ваш продакшн-фикс с JournalPostingFacade."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_access_modifiers", "cpt_package_private", "cpt_protected_coupling"],
  topicIds: ["top_oop_06"],
  tags: ["#interview", "#access-modifiers"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_am_package_leak_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_access_modifiers",
        label: { en: "Access Modifiers", ru: "Модификаторы Доступа" },
        keywords: ["public", "private", "protected", "access", "модификатор", "доступ"]
      },
      {
        id: "cpt_package_private",
        label: { en: "Package-Private", ru: "Package-Private" },
        keywords: ["package-private", "default", "same package", "пакет", "без модификатора"]
      },
      {
        id: "cpt_protected_coupling",
        label: { en: "Protected Coupling", ru: "Protected Coupling" },
        keywords: ["protected", "subclass", "foreign package", "наследование", "чужой пакет"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): We leaked the ledger package. protected postRaw let a reporting subclass write LedgerEntry rows without InternalPostingPolicy or JournalPostingFacade. Fix: make mutators package-private, seal/finalize GeneralLedger against foreign subclassing, and expose only the facade that enforces policy before any post.",
      ru: "Elevator Pitch (30 сек): Мы протекли границу пакета ledger. protected postRaw позволил reporting-subclass писать LedgerEntry без InternalPostingPolicy и JournalPostingFacade. Фикс: mutators package-private, seal/final GeneralLedger против чужого subclassing, открыть только facade, который применяет policy до любого поста."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Java has four access levels. private is class-only; package-private is the default and the right tool for co-located GeneralLedger, InternalPostingPolicy, and JournalPostingFacade. protected adds subclass access even across packages — that is intentional language design, but it creates protected coupling: foreign services inherit into your invariant surface. public is world-visible. Documentation saying 'use the facade' fails when the compiler still allows postRaw. Effective Java Item 15: minimize accessibility so illegal states are unrepresentable from outside the package.",
      ru: "Глубокая Механика (60 сек): В Java четыре уровня доступа. private — только класс; package-private — default и правильный инструмент для соседних GeneralLedger, InternalPostingPolicy и JournalPostingFacade. protected добавляет доступ subclasses даже через пакеты — это дизайн языка, но создаёт protected coupling: чужие сервисы входят в поверхность инвариантов. public виден всем. Документация «используйте facade» не работает, пока компилятор разрешает postRaw. Effective Java Item 15: минимизируйте accessibility, чтобы незаконные состояния были невыразимы снаружи пакета."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Narrow access can make cross-package unit tests harder — prefer same-package tests or facade-level tests over widening production APIs. If extension is required, use explicit hooks registered in-package (ReconciliationHook as a collaborator interface), not protected inheritance. Module systems (JPMS) add another boundary but do not replace thoughtful package design.",
      ru: "Продакшн Компромиссы (30 сек): Узкий access усложняет cross-package unit-тесты — предпочитайте same-package или facade-level тесты, а не расширение production API. Если нужна расширяемость — явные hooks, регистрируемые в пакете (ReconciliationHook как collaborator interface), не protected inheritance. JPMS добавляет границу, но не заменяет продуманный дизайн пакетов."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Is protected always wrong in domain code?'",
      ru: "Доп. Вопрос Интервьюера: 'Protected всегда неправилен в domain-коде?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: No — protected is fine inside a designed inheritance hierarchy you control, ideally same package or sealed. It is wrong when it becomes an accidental public API for other teams' subclasses to poke internals and skip invariants. Prefer composition and package-private helpers for financial controls.",
      ru: "Ответ на Доп. Вопрос: Нет — protected уместен внутри контролируемой иерархии, лучше same package или sealed. Он вреден, когда становится случайным public API для subclasses других команд, ломающих инварианты. Для финансовых контролей предпочитайте composition и package-private helpers."
    }
  }
};

export const ALL_ACCESS_MODIFIERS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_AM,
  APPLIED_BUG_HUNT_CHALLENGE_AM,
  INTERVIEW_ANSWER_CHALLENGE_AM
];
