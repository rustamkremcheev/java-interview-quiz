import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_INTRO: FixBuilderChallenge = {
  id: "chl_intro_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_introduction_to_oop",
  stageId: "stg_intro_practice",
  title: {
    en: "Fix Builder: From Procedural Maps to ClearingPayment Objects",
    ru: "Конструктор Исправления: От Процедурных Maps к Объектам ClearingPayment"
  },
  prompt: {
    en: "The clearing script uses HashMap payloads, string statuses, and static helpers — new rails break inconsistently. Select ALL structural building blocks for a maintainable ClearingPayment object model.",
    ru: "Clearing-скрипт использует HashMap payload, строковые статусы и static-хелперы — новые rails ломаются несогласованно. Выберите ВСЕ элементы для поддерживаемой объектной модели ClearingPayment."
  },
  difficulty: "FOUNDATION",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_oop_paradigm", "cpt_procedural_vs_oop", "cpt_object_collaboration"],
  topicIds: ["top_oop_01"],
  tags: ["#oop", "#procedural-vs-oop", "#clearing-payment"],
  hintIds: ["hnt_intro_1", "hnt_intro_2", "hnt_intro_3", "hnt_intro_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_intro_procedural_broken",
    solutionCodeArtifactId: "art_intro_object_model_solution",
    options: [
      {
        id: "opt_intro_fix_1",
        text: {
          en: "Introduce ClearingPayment with ClearingPaymentId and ClearingPaymentStatus enum — stop using Map + string statuses as the domain model.",
          ru: "Ввести ClearingPayment с ClearingPaymentId и enum ClearingPaymentStatus — перестать использовать Map + строковые статусы как доменную модель."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Typed identity and status are the foundation of the object model.",
          ru: "Верно. Типизированные identity и status — фундамент объектной модели."
        }
      },
      {
        id: "opt_intro_fix_2",
        text: {
          en: "Let ClearingPaymentWorkflow and ClearingValidationPolicy collaborate with ClearingPaymentStore instead of scattered static helpers.",
          ru: "Пусть ClearingPaymentWorkflow и ClearingValidationPolicy сотрудничают с ClearingPaymentStore вместо размазанных static-хелперов."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Object collaboration localizes rail rules in named collaborators.",
          ru: "Верно. Сотрудничество объектов локализует правила rail в именованных сотрудниках."
        }
      },
      {
        id: "opt_intro_fix_3",
        text: {
          en: "Keep string statuses but put all helpers in one giant StaticClearingUtils class with static methods.",
          ru: "Оставить строковые статусы, но сложить все хелперы в один гигантский класс StaticClearingUtils со static-методами."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That is still procedural (and StaticClearingUtils collides with the LSP mission naming). OOP needs collaborating objects with behavior on instances.",
          ru: "Неверно. Это всё ещё процедурно (и StaticClearingUtils конфликтует с именованием миссии LSP). ООП нужны сотрудничающие объекты с поведением на экземплярах."
        }
      },
      {
        id: "opt_intro_fix_4",
        text: {
          en: "Move status transitions onto ClearingPayment / workflow methods so every rail path uses the same transition API.",
          ru: "Перенести переходы статуса на методы ClearingPayment / workflow, чтобы каждый путь rail использовал один API переходов."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Centralized transitions prevent inconsistent string writes across helpers.",
          ru: "Верно. Централизованные переходы предотвращают несогласованную запись строк в хелперах."
        }
      },
      {
        id: "opt_intro_fix_distractor_1",
        text: {
          en: "Add more string constants for the new rail and duplicate if/else blocks in each static helper.",
          ru: "Добавить больше строковых констант для нового rail и продублировать if/else в каждом static-хелпере."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Duplicating procedural branches is exactly how new rails break inconsistently.",
          ru: "Неверно. Дублирование процедурных веток — именно то, как новые rails ломаются несогласованно."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_INTRO: BugHuntChallenge = {
  id: "chl_intro_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_introduction_to_oop",
  stageId: "stg_intro_debug",
  title: {
    en: "Bug Hunt: Procedural Status Drift in Clearing",
    ru: "Поиск Бага: Дрейф Процедурных Статусов в Clearing"
  },
  prompt: {
    en: "A new clearing rail fails inconsistently. Click the line(s) where string statuses and shared map mutation cause the defect — not the harmless wiring lines.",
    ru: "Новый clearing rail падает несогласованно. Нажмите строку(и), где строковые статусы и мутация общей map дают дефект — не безобидные строки wiring."
  },
  difficulty: "FOUNDATION",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_procedural_vs_oop", "cpt_object_collaboration"],
  topicIds: ["top_oop_01"],
  tags: ["#oop", "#bug-hunt", "#procedural"],
  hintIds: ["hnt_intro_bug_1", "hnt_intro_bug_2", "hnt_intro_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_intro_procedural_bughunt",
    solutionCodeArtifactId: "art_intro_object_model_solution",
    codeSnippet: `public static void processClearing(Map<String, Object> payment) {
    String status = (String) payment.get("status"); // Line 2
    if ("NEW_RAIL".equals(payment.get("rail"))) {
        validateNewRail(payment); // Line 4 — helper A knows NEW_RAIL
    }
    if (status == null || status.equals("PEND")) {
        payment.put("status", "OK"); // Line 7 — BUG: bypasses rail rules
    }
    persist(payment); // Line 9
    markOkGlobal(payment); // Line 10 — BUG: second writer, different rules
}`,
    lines: [
      { lineNumber: 1, code: "public static void processClearing(Map<String, Object> payment) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    String status = (String) payment.get(\"status\");", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "    if (\"NEW_RAIL\".equals(payment.get(\"rail\"))) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "        validateNewRail(payment);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "    if (status == null || status.equals(\"PEND\")) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 7,
        code: "        payment.put(\"status\", \"OK\");",
        isBug: true,
        explanation: {
          en: "Line 7: Blind string status write ignores rail-specific transition rules — NEW_RAIL can be marked OK without the policy that validateNewRail intended to enforce end-to-end.",
          ru: "Строка 7: Слепая запись строкового статуса игнорирует rail-specific правила переходов — NEW_RAIL может стать OK без политики, которую validateNewRail должен был закрепить end-to-end."
        }
      },
      { lineNumber: 8, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "    persist(payment);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 10,
        code: "    markOkGlobal(payment);",
        isBug: true,
        explanation: {
          en: "Line 10: A second global helper mutates the same map with its own status conventions — procedural dual writers cause inconsistent rail behavior.",
          ru: "Строка 10: Второй глобальный хелпер мутирует ту же map со своими конвенциями статусов — процедурные dual writers дают несогласованное поведение rail."
        }
      },
      { lineNumber: 11, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_INTRO: InterviewAnswerChallenge = {
  id: "chl_intro_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_introduction_to_oop",
  stageId: "stg_intro_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Procedural Clearing to Objects",
    ru: "Устный Ответ на Senior-Интервью: От Процедурного Clearing к Объектам"
  },
  prompt: {
    en: "Your clearing payment flow is a procedural script of maps, string statuses, and global helpers — a new rail breaks inconsistently. Explain OOP paradigm, procedural vs objects, and your refactor to ClearingPayment collaborators.",
    ru: "Ваш clearing payment — процедурный скрипт из maps, строковых статусов и глобальных хелперов — новый rail ломается несогласованно. Объясните парадигму ООП, procedural vs objects и рефакторинг к сотрудникам ClearingPayment."
  },
  difficulty: "FOUNDATION",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_oop_paradigm", "cpt_procedural_vs_oop", "cpt_object_collaboration"],
  topicIds: ["top_oop_01"],
  tags: ["#oop", "#interview", "#clearing-payment"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_intro_procedural_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OOP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_oop_paradigm",
        label: { en: "OOP Paradigm", ru: "Парадигма ООП" },
        keywords: ["OOP", "object", "state", "behavior", "парадигм", "объект", "поведение"]
      },
      {
        id: "cpt_procedural_vs_oop",
        label: { en: "Procedural vs OOP", ru: "Процедурный vs ООП" },
        keywords: ["procedural", "map", "string status", "helper", "процедурн", "хелпер", "строк"]
      },
      {
        id: "cpt_object_collaboration",
        label: { en: "Object Collaboration", ru: "Сотрудничество Объектов" },
        keywords: ["collaborat", "workflow", "policy", "store", "сотруднич", "workflow", "политик"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Clearing was procedural — HashMaps, string statuses, static helpers. A new rail updated some helpers but not others, so paths diverged. Fix: ClearingPayment with typed id/status; ClearingPaymentWorkflow, ClearingValidationPolicy, and ClearingPaymentStore collaborate so transitions and persistence share one model.",
      ru: "Elevator Pitch (30 сек): Clearing был процедурным — HashMap, строковые статусы, static-хелперы. Новый rail правили в одних хелперах, но не в других — пути разошлись. Фикс: ClearingPayment с типизированными id/status; ClearingPaymentWorkflow, ClearingValidationPolicy и ClearingPaymentStore сотрудничают, чтобы переходы и persistence делили одну модель."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): OOP bundles state with behavior on objects that collaborate. ClearingPayment owns identity and status transitions. Workflow orchestrates validate → transition → persist. Policy holds rail rules. Store isolates I/O. Procedural code separates data (maps) from functions (helpers), so every new rail edits N helpers inconsistently. Prefer enums over magic strings; never rename this to StaticClearingUtils — keep Clearing* names to avoid LSP-mission collisions.",
      ru: "Глубокая Механика (60 сек): ООП объединяет state с behavior на объектах, которые сотрудничают. ClearingPayment владеет identity и переходами статуса. Workflow оркестрирует validate → transition → persist. Policy держит правила rail. Store изолирует I/O. Процедурный код отделяет данные (maps) от функций (helpers), поэтому каждый новый rail правит N хелперов несогласованно. Предпочитайте enum магическим строкам; не переименовывайте это в StaticClearingUtils — оставляйте Clearing*, чтобы избежать коллизий с миссией LSP."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): An object model costs more types upfront than a script, but localizes rail changes. For a throwaway ETL, maps can be fine; for multi-rail clearing with audit, typed collaborators pay for themselves. Migrate incrementally: introduce ClearingPayment at the boundary first, then shrink static helpers.",
      ru: "Продакшн Компромиссы (30 сек): Объектная модель стоит больше типов заранее, чем скрипт, но локализует изменения rail. Для одноразового ETL maps могут быть ок; для multi-rail clearing с аудитом типизированные сотрудники окупаются. Мигрируйте инкрементально: сначала ClearingPayment на границе, затем сжимайте static-хелперы."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Is putting everything in one ClearingPaymentService class still OOP?'",
      ru: "Доп. Вопрос Интервьюера: 'Если сложить всё в один класс ClearingPaymentService — это всё ещё ООП?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: A single service with static-like procedural methods over maps is OOP only cosmetically. Real OOP shows collaborating responsibilities — workflow, policy, store — with behavior close to the data that must stay consistent. A facade service can orchestrate, but domain rules should not remain stringly-typed helpers.",
      ru: "Ответ на Доп. Вопрос: Один сервис со static-подобными процедурными методами над maps — ООП лишь косметически. Настоящее ООП показывает сотрудничающие обязанности — workflow, policy, store — с поведением рядом с данными, которые должны оставаться согласованными. Facade-сервис может оркестрировать, но доменные правила не должны оставаться stringly-typed хелперами."
    }
  }
};

export const ALL_INTRODUCTION_TO_OOP_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_INTRO,
  APPLIED_BUG_HUNT_CHALLENGE_INTRO,
  INTERVIEW_ANSWER_CHALLENGE_INTRO
];
