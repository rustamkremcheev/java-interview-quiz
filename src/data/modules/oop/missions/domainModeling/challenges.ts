import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_DM: FixBuilderChallenge = {
  id: "chl_dm_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_domain_modeling",
  stageId: "stg_dm_practice",
  title: {
    en: "Fix Builder: Typed LoanApplication Domain Model",
    ru: "Конструктор Исправления: Типизированная Доменная Модель LoanApplication"
  },
  prompt: {
    en: "LoanApplication's String/boolean/double/Map bag allowed REJECTED+approved and negative amounts. Select ALL structural building blocks required for a production-safe domain model: ApplicantId, LoanMoney, LoanStatus, CreditDecision, ApprovalPolicy, and behavior methods.",
    ru: "Мешок String/boolean/double/Map в LoanApplication допускал REJECTED+approved и отрицательные суммы. Выберите ВСЕ элементы продакшн-безопасной доменной модели: ApplicantId, LoanMoney, LoanStatus, CreditDecision, ApprovalPolicy и методы поведения."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
  topicIds: ["top_oop_33"],
  tags: ["#domain-modeling", "#value-objects", "#loan-application"],
  hintIds: ["hnt_dm_1", "hnt_dm_2", "hnt_dm_3", "hnt_dm_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_dm_loan_application_broken",
    solutionCodeArtifactId: "art_dm_loan_application_solution",
    options: [
      {
        id: "opt_dm_fix_1",
        text: {
          en: "Introduce ApplicantId and LoanMoney (long amountCents) records that self-validate in compact constructors.",
          ru: "Ввести records ApplicantId и LoanMoney (long amountCents), самовалидирующиеся в compact constructors."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Value objects cure Primitive Obsession for identity and money.",
          ru: "Верно. Value objects лечат Primitive Obsession для идентичности и денег."
        }
      },
      {
        id: "opt_dm_fix_2",
        text: {
          en: "Replace String status + boolean approved with LoanStatus enum and CreditDecision produced by ApprovalPolicy.",
          ru: "Заменить String status + boolean approved на enum LoanStatus и CreditDecision от ApprovalPolicy."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. A single typed outcome prevents REJECTED+approved contradictions.",
          ru: "Верно. Один типизированный исход предотвращает противоречия REJECTED+approved."
        }
      },
      {
        id: "opt_dm_fix_3",
        text: {
          en: "Keep public fields and add synchronized setters so concurrent writers cannot race.",
          ru: "Оставить public fields и добавить synchronized setters, чтобы concurrent writers не гонялись."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronization does not make illegal combinations unrepresentable.",
          ru: "Неверно. Synchronized не делает нелегальные комбинации непредставимыми."
        }
      },
      {
        id: "opt_dm_fix_4",
        text: {
          en: "Expose submit() / decide(CreditDecision) on LoanApplication so transitions enforce ApprovalPolicy invariants.",
          ru: "Открыть submit() / decide(CreditDecision) на LoanApplication, чтобы переходы защищали инварианты ApprovalPolicy."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Aggregate-boundary behavior methods replace free field mutation.",
          ru: "Верно. Методы поведения на границе агрегата заменяют свободную мутацию полей."
        }
      },
      {
        id: "opt_dm_fix_distractor_1",
        text: {
          en: "Drive status and amount exclusively from Map<String,Object> extras keys for flexibility.",
          ru: "Управлять status и amount исключительно ключами Map<String,Object> extras ради гибкости."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Open maps recreate Primitive Obsession and hide lending invariants.",
          ru: "Неверно. Открытые map воссоздают Primitive Obsession и прячут lending-инварианты."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_DM: BugHuntChallenge = {
  id: "chl_dm_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_domain_modeling",
  stageId: "stg_dm_debug",
  title: {
    en: "Bug Hunt: Public Fields Encode REJECTED + approved",
    ru: "Поиск Бага: Public Fields Кодируют REJECTED + approved"
  },
  prompt: {
    en: "LoanApplication still uses primitives and public writers. Compliance found REJECTED loans with approved=true and negative amounts. Click the line(s) that make those illegal states representable.",
    ru: "LoanApplication всё ещё использует примитивы и public writers. Compliance нашёл REJECTED-займы с approved=true и отрицательными суммами. Нажмите строку(и), делающие эти нелегальные состояния представимыми."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
  topicIds: ["top_oop_33"],
  tags: ["#domain-modeling", "#bug-hunt", "#primitive-obsession"],
  hintIds: ["hnt_dm_bug_1", "hnt_dm_bug_2", "hnt_dm_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_dm_loan_application_bughunt",
    solutionCodeArtifactId: "art_dm_loan_application_solution",
    codeSnippet: `public class LoanApplication {
    public String applicantId; // Line 2
    public String status;      // Line 3
    public boolean approved;   // Line 4
    public double amount;      // Line 5
    public Map<String, Object> extras = new HashMap<>(); // Line 6

    public void markRejectedButKeepApprovedFlag() { // Line 8
        this.status = "REJECTED"; // Line 9 — BUG path
        this.approved = true;     // Line 10 — contradicts status
    }

    public void setAmount(double amount) { // Line 13
        this.amount = amount; // Line 14 — allows negatives
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class LoanApplication {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    public String applicantId;",
        isBug: false,
        explanation: { en: "Not the defect line.", ru: "Не строка дефекта." }
      },
      {
        lineNumber: 3,
        code: "    public String status;",
        isBug: true,
        explanation: {
          en: "Line 3: Free-form String status allows typos and any combination with approved — illegal states are representable.",
          ru: "Строка 3: Свободный String status допускает опечатки и любую комбинацию с approved — нелегальные состояния представимы."
        }
      },
      {
        lineNumber: 4,
        code: "    public boolean approved;",
        isBug: true,
        explanation: {
          en: "Line 4: Independent approved flag can be true while status is REJECTED — the compliance contradiction.",
          ru: "Строка 4: Независимый флаг approved может быть true при status=REJECTED — противоречие compliance."
        }
      },
      {
        lineNumber: 5,
        code: "    public double amount;",
        isBug: true,
        explanation: {
          en: "Line 5: double amount admits negatives/NaN and floating-point money hazards with no constructor guard.",
          ru: "Строка 5: double amount допускает negatives/NaN и hazards денег с плавающей точкой без охраны конструктора."
        }
      },
      { lineNumber: 6, code: "    public Map<String, Object> extras = new HashMap<>();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "    public void markRejectedButKeepApprovedFlag() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 9,
        code: "        this.status = \"REJECTED\";",
        isBug: true,
        explanation: {
          en: "Line 9-10: Direct field writes encode REJECTED while leaving/setting approved=true — no invariant check.",
          ru: "Строки 9-10: Прямая запись полей кодирует REJECTED, оставляя/выставляя approved=true — без проверки инварианта."
        }
      },
      {
        lineNumber: 10,
        code: "        this.approved = true;",
        isBug: true,
        explanation: {
          en: "Line 10: Sets approved=true on a REJECTED path — the exact illegal combination exported to risk engines.",
          ru: "Строка 10: Выставляет approved=true на пути REJECTED — та самая нелегальная комбинация, ушедшая в risk engines."
        }
      },
      { lineNumber: 11, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 12, code: "", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "    public void setAmount(double amount) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 14,
        code: "        this.amount = amount;",
        isBug: true,
        explanation: {
          en: "Line 14: Setter assigns any double, including negative loan amounts with no LoanMoney guard.",
          ru: "Строка 14: Setter присваивает любой double, включая отрицательные суммы займа без охраны LoanMoney."
        }
      },
      { lineNumber: 15, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 16, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_DM: InterviewAnswerChallenge = {
  id: "chl_dm_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_domain_modeling",
  stageId: "stg_dm_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Illegal LoanApplication States",
    ru: "Устный Ответ на Senior-Интервью: Нелегальные Состояния LoanApplication"
  },
  prompt: {
    en: "Your LoanApplication allowed approved=true with status=REJECTED and negative double amounts via primitives. Explain how you make illegal states unrepresentable with ApplicantId, LoanMoney, LoanStatus, CreditDecision, and ApprovalPolicy to the interviewer.",
    ru: "LoanApplication допускал approved=true при status=REJECTED и отрицательные double через примитивы. Объясните интервьюеру, как сделать нелегальные состояния непредставимыми с ApplicantId, LoanMoney, LoanStatus, CreditDecision и ApprovalPolicy."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
  topicIds: ["top_oop_33"],
  tags: ["#domain-modeling", "#value-objects", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_dm_loan_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DOMAIN_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_domain_modeling",
        label: { en: "Illegal States Unrepresentable", ru: "Непредставимые Нелегальные Состояния" },
        keywords: ["illegal states", "unrepresentable", "domain modeling", "invariant", "нелегальные состояния", "непредставим", "доменн"]
      },
      {
        id: "cpt_value_objects",
        label: { en: "Value Objects / Primitive Obsession", ru: "Value Objects / Primitive Obsession" },
        keywords: ["value object", "primitive obsession", "ApplicantId", "LoanMoney", "value objects", "примитив"]
      },
      {
        id: "cpt_loan_status_decision",
        label: { en: "LoanStatus / CreditDecision", ru: "LoanStatus / CreditDecision" },
        keywords: ["LoanStatus", "CreditDecision", "approved", "REJECTED", "status", "decision"]
      },
      {
        id: "cpt_approval_policy",
        label: { en: "ApprovalPolicy Transitions", ru: "Переходы ApprovalPolicy" },
        keywords: ["ApprovalPolicy", "submit", "decide", "transition", "aggregate", "переход", "policy"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): LoanApplication used String status, boolean approved, and double amount — so REJECTED+approved=true and negative amounts were representable and shipped to risk. Refactor to ApplicantId + LoanMoney value objects, LoanStatus/CreditDecision instead of independent flags, and ApprovalPolicy-backed submit/decide methods so illegal combinations cannot be constructed.",
      ru: "Elevator Pitch (30 сек): LoanApplication использовал String status, boolean approved и double amount — поэтому REJECTED+approved=true и отрицательные суммы были представимы и ушли в risk. Рефакторим в value objects ApplicantId + LoanMoney, LoanStatus/CreditDecision вместо независимых флагов и методы submit/decide через ApprovalPolicy, чтобы нелегальные комбинации не конструировались."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Value objects self-validate: ApplicantId rejects blank ids; LoanMoney(long cents) rejects cents < 0 and avoids double money drift. Delete redundant approved — outcome lives in LoanStatus or CreditDecision. LoanApplication is the aggregate boundary lite: outsiders call submit()/decide(CreditDecision); ApprovalPolicy enforces allowed transitions (e.g. only SUBMITTED may be decided). Map extras must not drive status/amount. Persistence maps columns at the edge; domain stays typed.",
      ru: "Глубокая Механика (60 сек): Value objects самовалидируются: ApplicantId отвергает пустые id; LoanMoney(long cents) отвергает cents < 0 и избегает drift double. Удаляем избыточный approved — исход в LoanStatus или CreditDecision. LoanApplication — lite-граница агрегата: снаружи вызывают submit()/decide(CreditDecision); ApprovalPolicy защищает допустимые переходы (например decide только из SUBMITTED). Map extras не управляет status/amount. Persistence маппит колонки на границе; домен остаётся типизированным."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): More types and DTO/ORM mapping versus a primitive bag. Worth it wherever compliance cares about contradictory states. Prefer LoanMoney naming if another module already owns Money. Keep the scope tight — value objects + entity transitions, not a full DDD platform rewrite.",
      ru: "Продакшн Компромиссы (30 сек): Больше типов и DTO/ORM mapping против мешка примитивов. Окупается там, где compliance заботится о противоречивых состояниях. Предпочитайте имя LoanMoney, если другой модуль уже владеет Money. Держите scope узким — value objects + переходы сущности, не полный rewrite DDD-платформы."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If Bean Validation already annotates amount > 0 and status not blank, do we still need value objects?'",
      ru: "Доп. Вопрос Интервьюера: 'Если Bean Validation уже аннотирует amount > 0 и status not blank — value objects всё ещё нужны?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Annotations help at HTTP/JPA boundaries but do not stop in-memory public field writes, reflection, or contradictory approved vs status. Value objects + transition methods make illegal states unconstructable inside the domain, not only invalid at one validation gate.",
      ru: "Ответ на Доп. Вопрос: Аннотации помогают на границах HTTP/JPA, но не останавливают in-memory запись public fields, reflection или противоречие approved vs status. Value objects + методы перехода делают нелегальные состояния неконструируемыми внутри домена, а не только невалидными на одном validation gate."
    }
  }
};

export const ALL_DOMAIN_MODELING_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_DM,
  APPLIED_BUG_HUNT_CHALLENGE_DM,
  INTERVIEW_ANSWER_CHALLENGE_DM
];
