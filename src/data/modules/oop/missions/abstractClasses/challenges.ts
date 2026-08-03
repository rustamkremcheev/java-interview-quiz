import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_AC: FixBuilderChallenge = {
  id: "chl_ac_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_abstract_classes",
  stageId: "stg_ac_practice",
  title: {
    en: "Fix Builder: Lock Settlement Lifecycle with Final settle()",
    ru: "Конструктор Исправления: Фиксация Lifecycle Settlement через Final settle()"
  },
  prompt: {
    en: "CardSettlementProcessor and WireSettlementProcessor bypassed audit by overriding settle() or mutating protected state. Select ALL structural building blocks for a production-safe AbstractSettlementProcessor extension contract.",
    ru: "CardSettlementProcessor и WireSettlementProcessor обошли audit, переопределив settle() или мутируя protected-состояние. Выберите ВСЕ элементы для продакшн-безопасного контракта расширения AbstractSettlementProcessor."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
  topicIds: ["top_oop_08"],
  tags: ["#abstract-class", "#template-hooks", "#settlement"],
  hintIds: ["hnt_ac_1", "hnt_ac_2", "hnt_ac_3", "hnt_ac_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ac_settlement_broken",
    solutionCodeArtifactId: "art_ac_settlement_solution",
    options: [
      {
        id: "opt_ac_fix_1",
        text: {
          en: "Keep AbstractSettlementProcessor as an abstract class with constructor-injected collaborators and shared SettlementContext state.",
          ru: "Оставить AbstractSettlementProcessor абстрактным классом с constructor-injected коллабораторами и общим состоянием SettlementContext."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Shared state + constructors justify an abstract class over a pure interface.",
          ru: "Верно. Общее состояние + конструкторы оправдывают абстрактный класс вместо чистого интерфейса."
        }
      },
      {
        id: "opt_ac_fix_2",
        text: {
          en: "Declare public final SettlementResult settle(SettlementContext) that always runs validate → authorize → capture → audit.",
          ru: "Объявить public final SettlementResult settle(SettlementContext), всегда выполняющий validate → authorize → capture → audit."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. final settle() prevents Wire's fast-path override from skipping audit.",
          ru: "Верно. final settle() не даёт fast-path override Wire пропустить audit."
        }
      },
      {
        id: "opt_ac_fix_3",
        text: {
          en: "Expose only protected abstract (or documented protected) authorize/capture hooks; keep audit private.",
          ru: "Открыть только protected abstract (или документированные protected) хуки authorize/capture; audit оставить private."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Documented hooks are the legal extension points; audit stays non-overridable.",
          ru: "Верно. Документированные хуки — законные точки расширения; audit остаётся непереопределяемым."
        }
      },
      {
        id: "opt_ac_fix_4",
        text: {
          en: "Replace the abstract class with an interface and duplicate audit code in every Card/Wire implementor.",
          ru: "Заменить абстрактный класс интерфейсом и продублировать audit-код в каждом implementor Card/Wire."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That misapplies Item 20 and recreates skipped/duplicated audit risks.",
          ru: "Неверно. Это неверное применение Item 20 и воспроизводит риски пропущенного/дублированного audit."
        }
      },
      {
        id: "opt_ac_fix_distractor_1",
        text: {
          en: "Leave settle() overridable but add a comment asking subclasses to call super.settle().",
          ru: "Оставить settle() переопределяемым, но добавить комментарий с просьбой вызывать super.settle()."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Comments are not enforcement — Wire already skipped super and production lost audit trails.",
          ru: "Неверно. Комментарии не enforce — Wire уже пропустил super, и продакшен потерял audit trails."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_AC: BugHuntChallenge = {
  id: "chl_ac_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_abstract_classes",
  stageId: "stg_ac_debug",
  title: {
    en: "Bug Hunt: WireSettlementProcessor Overrides settle() Skipping Audit",
    ru: "Поиск Бага: WireSettlementProcessor Переопределяет settle() и Пропускает Audit"
  },
  prompt: {
    en: "Wire settlements capture funds but leave no audit trail. Click the line(s) where WireSettlementProcessor bypasses the abstract lifecycle (override settle / skip audit).",
    ru: "WIRE-settlements проводят средства, но не оставляют audit trail. Нажмите строку(и), где WireSettlementProcessor обходит абстрактный lifecycle (override settle / пропуск audit)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
  topicIds: ["top_oop_08"],
  tags: ["#abstract-class", "#bug-hunt", "#settlement"],
  hintIds: ["hnt_ac_bug_1", "hnt_ac_bug_2", "hnt_ac_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ac_settlement_bughunt",
    solutionCodeArtifactId: "art_ac_settlement_solution",
    codeSnippet: `public class WireSettlementProcessor extends AbstractSettlementProcessor {
    public WireSettlementProcessor(AuditLedger ledger) {
        super(ledger); // Line 3
    }

    @Override
    public SettlementResult settle(SettlementContext ctx) { // Line 7 — BUG: overrides skeleton
        validate(ctx); // Line 8
        Authorization auth = authorize(ctx); // Line 9
        CaptureReceipt receipt = capture(ctx, auth); // Line 10
        return SettlementResult.ok(receipt); // Line 11 — skips audit!
    }

    @Override
    protected Authorization authorize(SettlementContext ctx) { // Line 15
        return wireAuthorize(ctx);
    }

    @Override
    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) { // Line 20
        return wireCapture(ctx, auth);
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class WireSettlementProcessor extends AbstractSettlementProcessor {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    public WireSettlementProcessor(AuditLedger ledger) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "        super(ledger);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "    @Override", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 7,
        code: "    public SettlementResult settle(SettlementContext ctx) {",
        isBug: true,
        explanation: {
          en: "Line 7: Overriding non-final settle() replaces the abstract lifecycle — subclasses own the step list and can omit audit.",
          ru: "Строка 7: Переопределение не-final settle() подменяет абстрактный lifecycle — подкласс владеет списком шагов и может опустить audit."
        }
      },
      { lineNumber: 8, code: "        validate(ctx);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "        Authorization auth = authorize(ctx);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "        CaptureReceipt receipt = capture(ctx, auth);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "        return SettlementResult.ok(receipt);",
        isBug: true,
        explanation: {
          en: "Line 11: Returns after capture without audit — production missing audit trail for WIRE settlements.",
          ru: "Строка 11: Возврат после capture без audit — на продакшене нет audit trail для WIRE-settlements."
        }
      },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 14, code: "    @Override", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 15, code: "    protected Authorization authorize(SettlementContext ctx) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 16, code: "        return wireAuthorize(ctx);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 17, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 18, code: "", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 19, code: "    @Override", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 20, code: "    protected CaptureReceipt capture(SettlementContext ctx, Authorization auth) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 21, code: "        return wireCapture(ctx, auth);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 22, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 23, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_AC: InterviewAnswerChallenge = {
  id: "chl_ac_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_abstract_classes",
  stageId: "stg_ac_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: AbstractSettlementProcessor Hooks",
    ru: "Устный Ответ на Senior-Интервью: Хуки AbstractSettlementProcessor"
  },
  prompt: {
    en: "WireSettlementProcessor skipped audit by overriding settle(), and Card mutated protected state. Explain abstract class vs interface, final lifecycle skeletons, and your production fix to the interviewer.",
    ru: "WireSettlementProcessor пропустил audit, переопределив settle(), а Card мутировал protected-состояние. Объясните интервьюеру abstract class vs interface, final lifecycle-скелеты и ваш продакшн-фикс."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
  topicIds: ["top_oop_08"],
  tags: ["#abstract-class", "#template-hooks", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ac_settlement_01",
    rubricDimensions: ["ELEVATOR_PITCH", "ABSTRACT_CLASS_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_abstract_class",
        label: { en: "Abstract Class", ru: "Абстрактный Класс" },
        keywords: [
          "abstract class",
          "abstract",
          "vs interface",
          "constructor",
          "shared state",
          "абстрактный класс",
          "интерфейс"
        ]
      },
      {
        id: "cpt_template_hooks",
        label: { en: "Final Skeleton & Protected Hooks", ru: "Final-Скелет и Protected-Хуки" },
        keywords: [
          "final",
          "hook",
          "hooks",
          "settle",
          "authorize",
          "capture",
          "audit",
          "protected",
          "хук",
          "хуки"
        ]
      },
      {
        id: "cpt_item19",
        label: { en: "Document Extension Contract (Item 19)", ru: "Документировать Контракт Расширения (Item 19)" },
        keywords: [
          "item 19",
          "document",
          "extension contract",
          "inheritance",
          "документир",
          "контракт расширения"
        ]
      },
      {
        id: "cpt_audit_bypass",
        label: { en: "Lifecycle / Audit Bypass Hazard", ru: "Обход Lifecycle / Audit" },
        keywords: [
          "audit",
          "bypass",
          "override settle",
          "skip",
          "lifecycle",
          "обход",
          "пропуск"
        ]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): AbstractSettlementProcessor shared settlement state but left settle() overridable — Wire replaced it with authorize+capture and skipped audit; Card mutated protected flags. Fix: abstract class keeps constructors/state; public final settle() always runs validate → authorize → capture → audit; subclasses only implement protected authorize/capture hooks; document the extension contract (Item 19).",
      ru: "Elevator Pitch (30 сек): AbstractSettlementProcessor делил состояние settlement, но settle() был переопределяемым — Wire заменил его на authorize+capture и пропустил audit; Card мутировал protected-флаги. Фикс: абстрактный класс сохраняет конструкторы/state; public final settle() всегда делает validate → authorize → capture → audit; подклассы реализуют только protected authorize/capture; документируем контракт расширения (Item 19)."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Choose abstract class over interface because processors need instance fields, constructor injection of AuditLedger, and a protected hook API. JLS abstract classes are incomplete types completed by Card/Wire. final settle() is the non-overridable skeleton; authorize/capture are abstract protected hooks; validate/audit are private. This uses template-style hooks but the interview point is abstract-class discipline and protected-state control — not a full GoF Template Method essay. Item 19: every protected member is API — document call order and invariants or prohibit inheritance (sealed/final).",
      ru: "Глубокая Механика (60 сек): Абстрактный класс вместо интерфейса, потому что нужны instance fields, constructor injection AuditLedger и protected hook API. JLS: abstract classes — неполные типы, завершаемые Card/Wire. final settle() — непереопределяемый скелет; authorize/capture — abstract protected hooks; validate/audit — private. Это template-style hooks, но точка интервью — дисциплина abstract class и контроль protected-состояния, не эссе по полному GoF Template Method. Item 19: каждый protected member — API; документируйте порядок и инварианты или запретите наследование (sealed/final)."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Hierarchy couples rails — if CRYPTO needs a different step order, switch to composition/pipeline. Sealed permits Card/Wire still needs final settle(). ArchUnit: forbid settle() declarations in subclasses. Prefer private state over protected fields; if protected fields exist, document them ruthlessly.",
      ru: "Продакшн Компромиссы (30 сек): Иерархия связывает rails — если CRYPTO нужен другой порядок шагов, переходите на composition/pipeline. Sealed permits Card/Wire всё равно требует final settle(). ArchUnit: запретить объявления settle() в подклассах. Предпочитайте private-состояние protected-полям; если protected-поля есть — документируйте жёстко."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Effective Java says prefer interfaces to abstract classes — why didn't you?'",
      ru: "Доп. Вопрос Интервьюера: 'Effective Java говорит предпочитать интерфейсы абстрактным классам — почему вы так не сделали?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Item 20 prefers interfaces for flexible capability contracts without single inheritance. AbstractSettlementProcessor needs shared mutable/immutable instance state, a constructor for AuditLedger, and a protected hook surface under one final skeleton — exactly when an abstract class is appropriate. I would still expose a narrow SettlementProcessor interface for clients if needed, with the abstract class as the skeletal implementation.",
      ru: "Ответ на Доп. Вопрос: Item 20 предпочитает интерфейсы для гибких capability-контрактов без single inheritance. AbstractSettlementProcessor нуждается в общем instance-состоянии, конструкторе для AuditLedger и protected hook surface под одним final-скелетом — как раз случай абстрактного класса. При необходимости клиентам можно дать узкий интерфейс SettlementProcessor, а абстрактный класс оставить skeletal implementation."
    }
  }
};

export const ALL_ABSTRACT_CLASSES_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_AC,
  APPLIED_BUG_HUNT_CHALLENGE_AC,
  INTERVIEW_ANSWER_CHALLENGE_AC
];
