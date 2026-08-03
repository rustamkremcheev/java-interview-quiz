import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_BLD: FixBuilderChallenge = {
  id: "chl_bld_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_builder_pattern",
  stageId: "stg_bld_practice",
  title: {
    en: "Fix Builder: Validate RiskAssessmentRequest at Build Time",
    ru: "Конструктор Исправления: Валидация RiskAssessmentRequest на Build"
  },
  prompt: {
    en: "Telescoping RiskAssessmentRequest constructors let incomplete EvaluationWindows reach RiskAssessmentService. Select ALL structural building blocks for a production-safe Builder with build-time validation.",
    ru: "Телескопические конструкторы RiskAssessmentRequest пропускают неполные EvaluationWindow в RiskAssessmentService. Выберите ВСЕ элементы для продакшн-безопасного Builder с build-time валидацией."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation", "cpt_telescoping_constructor"],
  topicIds: ["top_oop_28"],
  tags: ["#builder-pattern", "#risk-assessment", "#build-time-validation"],
  hintIds: ["hnt_bld_1", "hnt_bld_2", "hnt_bld_3", "hnt_bld_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_bld_request_broken",
    solutionCodeArtifactId: "art_bld_request_solution",
    options: [
      {
        id: "opt_bld_fix_1",
        text: {
          en: "Replace telescoping constructors with RiskAssessmentRequest.Builder and fluent named setters for PortfolioId, RiskProfile, EvaluationWindow.",
          ru: "Заменить телескопические конструкторы на RiskAssessmentRequest.Builder и fluent именованные setters для PortfolioId, RiskProfile, EvaluationWindow."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Named fluent steps remove overload ambiguity.",
          ru: "Верно. Именованные fluent-шаги убирают неоднозначность overload."
        }
      },
      {
        id: "opt_bld_fix_2",
        text: {
          en: "In build(), require non-null PortfolioId, RiskProfile, and EvaluationWindow (plus window start <= end) before constructing the immutable request.",
          ru: "В build() требовать non-null PortfolioId, RiskProfile и EvaluationWindow (плюс start <= end) перед созданием immutable request."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Build-time validation is the fail-fast gate.",
          ru: "Верно. Build-time валидация — fail-fast врата."
        }
      },
      {
        id: "opt_bld_fix_3",
        text: {
          en: "Keep telescoping constructors and validate only inside RiskAssessmentService after the request is already built.",
          ru: "Оставить телескопические конструкторы и валидировать только внутри RiskAssessmentService после сборки запроса."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Late validation allows invalid objects to exist and spread; Effective Java Item 2 pushes checks to build().",
          ru: "Неверно. Поздняя валидация позволяет невалидным объектам существовать и распространяться; EJ Item 2 требует проверок в build()."
        }
      },
      {
        id: "opt_bld_fix_4",
        text: {
          en: "Make RiskAssessmentRequest immutable after build and give RiskAssessmentService only fully validated instances.",
          ru: "Сделать RiskAssessmentRequest immutable после build и отдавать RiskAssessmentService только полностью валидированные экземпляры."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Immutability preserves the validated configuration.",
          ru: "Верно. Immutability сохраняет проверенную конфигурацию."
        }
      },
      {
        id: "opt_bld_fix_distractor_1",
        text: {
          en: "Add more boolean flags to the longest constructor so callers can omit windows via true/false literals.",
          ru: "Добавить больше boolean-флагов в самый длинный конструктор, чтобы вызывающие опускали окна через true/false литералы."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That recreates the SettlementInstruction flag-swapping hazard — wrong mission pattern.",
          ru: "Неверно. Это воссоздаёт hazard swapped flags SettlementInstruction — неверный паттерн миссии."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_BLD: BugHuntChallenge = {
  id: "chl_bld_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_builder_pattern",
  stageId: "stg_bld_debug",
  title: {
    en: "Bug Hunt: Incomplete RiskAssessmentRequest Build",
    ru: "Поиск Бага: Неполный Build RiskAssessmentRequest"
  },
  prompt: {
    en: "Incomplete risk requests reach evaluation. Click the line(s) where build/construction skips mandatory EvaluationWindow or RiskProfile validation.",
    ru: "Неполные risk-запросы доходят до оценки. Нажмите строку(и), где build/construction пропускает обязательную валидацию EvaluationWindow или RiskProfile."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation"],
  topicIds: ["top_oop_28"],
  tags: ["#builder-pattern", "#bug-hunt", "#risk"],
  hintIds: ["hnt_bld_bug_1", "hnt_bld_bug_2", "hnt_bld_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_bld_request_bughunt",
    solutionCodeArtifactId: "art_bld_request_solution",
    codeSnippet: `public RiskAssessmentRequest build() {
    // Line 1
    return new RiskAssessmentRequest(portfolioId, profile, window, notes); // Line 2 — BUG: no checks
}
public void evaluate(PortfolioId id, RiskProfile profile) {
    RiskAssessmentRequest req = new RiskAssessmentRequest(id, profile, null); // Line 5 — BUG
    service.assess(req); // Line 6
}`,
    lines: [
      { lineNumber: 1, code: "public RiskAssessmentRequest build() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    return new RiskAssessmentRequest(portfolioId, profile, window, notes);",
        isBug: true,
        explanation: {
          en: "Line 2: build() returns without validating mandatory PortfolioId/RiskProfile/EvaluationWindow — invalid requests escape.",
          ru: "Строка 2: build() возвращает без валидации обязательных PortfolioId/RiskProfile/EvaluationWindow — невалидные запросы утекают."
        }
      },
      { lineNumber: 3, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "public void evaluate(PortfolioId id, RiskProfile profile) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 5,
        code: "    RiskAssessmentRequest req = new RiskAssessmentRequest(id, profile, null);",
        isBug: true,
        explanation: {
          en: "Line 5: Telescoping constructor call passes null EvaluationWindow — misconfigured risk request.",
          ru: "Строка 5: Вызов телескопического конструктора передаёт null EvaluationWindow — misconfigured risk request."
        }
      },
      { lineNumber: 6, code: "    service.assess(req);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_BLD: InterviewAnswerChallenge = {
  id: "chl_bld_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_builder_pattern",
  stageId: "stg_bld_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: RiskAssessmentRequest Builder",
    ru: "Устный Ответ на Senior-Интервью: Builder RiskAssessmentRequest"
  },
  prompt: {
    en: "RiskAssessmentRequest reaches RiskAssessmentService without EvaluationWindow because of telescoping constructors. Explain Builder, build-time validation, and trade-offs.",
    ru: "RiskAssessmentRequest доходит до RiskAssessmentService без EvaluationWindow из-за телескопических конструкторов. Объясните Builder, build-time валидацию и компромиссы."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_builder_pattern", "cpt_build_time_validation", "cpt_telescoping_constructor"],
  topicIds: ["top_oop_28"],
  tags: ["#builder-pattern", "#interview", "#risk"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_bld_risk_01",
    rubricDimensions: ["ELEVATOR_PITCH", "BUILDER_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_builder_pattern",
        label: { en: "Builder Pattern", ru: "Паттерн Builder" },
        keywords: ["Builder", "fluent", "build()", "строител"]
      },
      {
        id: "cpt_telescoping_constructor",
        label: { en: "Telescoping Constructor", ru: "Телескопический Конструктор" },
        keywords: ["telescoping", "overload", "телескоп", "overload"]
      },
      {
        id: "cpt_build_time_validation",
        label: { en: "Build-Time Validation", ru: "Валидация на Build" },
        keywords: ["build-time", "validate", "mandatory", "валидац", "обязательн"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): RiskAssessmentRequest used telescoping constructors; callers omitted EvaluationWindow and RiskAssessmentService assumed completeness. Fix: fluent Builder; build() requires PortfolioId, RiskProfile, EvaluationWindow; immutable request thereafter. Distinct from SettlementInstruction boolean-flag bugs.",
      ru: "Elevator Pitch (30 сек): RiskAssessmentRequest использовал телескопические конструкторы; вызывающие опускали EvaluationWindow, а сервис предполагал полноту. Фикс: fluent Builder; build() требует PortfolioId, RiskProfile, EvaluationWindow; далее immutable. Отличие от boolean-flag багов SettlementInstruction."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Effective Java Item 2 — telescoping constructors do not scale. Builder accumulates fields with named methods, then build() is the single validation gate (null checks, window ordering). Optional notes stay optional; mandatory risk configuration never silently defaults. RiskAssessmentService receives only valid immutable requests.",
      ru: "Глубокая Механика (60 сек): Effective Java Item 2 — телескопические конструкторы не масштабируются. Builder накапливает поля именованными методами, build() — единственные врата валидации (null, порядок окна). Optional notes остаются optional; обязательная risk-конфигурация никогда не default-ится тихо. RiskAssessmentService получает только валидные immutable requests."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Builder adds boilerplate versus records with compact constructors for tiny types. For multi-field risk requests with mixed mandatory/optional fields, Builder wins. Prefer build() exceptions over half-valid objects; consider staged builders if you need compile-time mandatory sequencing.",
      ru: "Продакшн Компромиссы (30 сек): Builder добавляет boilerplate против records с compact constructors для крошечных типов. Для multi-field risk requests со смешанными mandatory/optional полями побеждает Builder. Предпочитайте исключения в build() полувалидным объектам; staged builders — если нужен compile-time порядок обязательных шагов."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Why not validate only in RiskAssessmentService?'",
      ru: "Доп. Вопрос Интервьюера: 'Почему не валидировать только в RiskAssessmentService?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Service-side validation is a backstop, not a substitute. Invalid requests should not exist or be cached/logged as if complete. Build-time validation keeps the type's construction invariant — every RiskAssessmentRequest instance is evaluable.",
      ru: "Ответ на Доп. Вопрос: Валидация в сервисе — страховка, не замена. Невалидные запросы не должны существовать или кэшироваться/логироваться как полные. Build-time валидация держит инвариант конструкции типа — каждый экземпляр RiskAssessmentRequest оценим."
    }
  }
};

export const ALL_BUILDER_PATTERN_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_BLD,
  APPLIED_BUG_HUNT_CHALLENGE_BLD,
  INTERVIEW_ANSWER_CHALLENGE_BLD
];
