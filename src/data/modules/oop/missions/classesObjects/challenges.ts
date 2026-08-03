import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_CO: FixBuilderChallenge = {
  id: "chl_co_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_classes_objects",
  stageId: "stg_co_practice",
  title: {
    en: "Fix Builder: Independent PaymentInstruction per CSV Row",
    ru: "Конструктор Исправления: Независимый PaymentInstruction на CSV-строку"
  },
  prompt: {
    en: "PaymentImporter reuses one mutable PaymentInstruction and adds the same reference to PaymentBatch. Select ALL structural building blocks for a production-safe import.",
    ru: "PaymentImporter переиспользует один мутабельный PaymentInstruction и добавляет ту же ссылку в PaymentBatch. Выберите ВСЕ элементы для продакшн-безопасного импорта."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_class_vs_object", "cpt_object_reference", "cpt_independent_instances"],
  topicIds: ["top_oop_02"],
  tags: ["#class", "#object", "#reference"],
  hintIds: ["hnt_co_1", "hnt_co_2", "hnt_co_3", "hnt_co_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_co_importer_broken",
    solutionCodeArtifactId: "art_co_importer_solution",
    options: [
      {
        id: "opt_co_fix_1",
        text: {
          en: "Create a new PaymentInstruction via PaymentInstructionFactory (or new) inside the per-row loop before mutating/building fields.",
          ru: "Создавать новый PaymentInstruction через PaymentInstructionFactory (или new) внутри цикла на строку до заполнения полей."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Each row needs an independent heap instance.",
          ru: "Верно. Каждой строке нужен независимый экземпляр в куче."
        }
      },
      {
        id: "opt_co_fix_2",
        text: {
          en: "Add the newly created PaymentInstruction reference to PaymentBatch — never a field reused across iterations.",
          ru: "Добавлять в PaymentBatch ссылку на только что созданный PaymentInstruction — никогда поле, переиспользуемое между итерациями."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Distinct references break aliasing.",
          ru: "Верно. Разные ссылки устраняют aliasing."
        }
      },
      {
        id: "opt_co_fix_3",
        text: {
          en: "Keep one shared draft PaymentInstruction as a field and call clear() between rows to save allocations.",
          ru: "Оставить один shared draft PaymentInstruction полем и вызывать clear() между строками для экономии аллокаций."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Clearing and reusing still risks aliasing if any prior reference remains in the batch.",
          ru: "Неверно. Clear и reuse всё ещё рискуют aliasing, если прежняя ссылка осталась в батче."
        }
      },
      {
        id: "opt_co_fix_4",
        text: {
          en: "Prefer an immutable PaymentInstruction after build so accidental later mutation cannot rewrite batch history.",
          ru: "Предпочитать immutable PaymentInstruction после сборки, чтобы случайная поздняя мутация не переписала историю батча."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Immutability hardens the identity/lifecycle fix.",
          ru: "Верно. Immutability укрепляет фикс identity/lifecycle."
        }
      },
      {
        id: "opt_co_fix_distractor_1",
        text: {
          en: "Override equals/hashCode on PaymentInstruction so batch deduplication hides identical last-row values.",
          ru: "Переопределить equals/hashCode у PaymentInstruction, чтобы дедупликация батча скрыла одинаковые значения последней строки."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Equality contracts do not create independent instances or restore lost row data.",
          ru: "Неверно. Контракты равенства не создают независимые экземпляры и не восстанавливают потерянные данные строк."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_CO: BugHuntChallenge = {
  id: "chl_co_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_classes_objects",
  stageId: "stg_co_debug",
  title: {
    en: "Bug Hunt: Shared PaymentInstruction Draft",
    ru: "Поиск Бага: Shared Draft PaymentInstruction"
  },
  prompt: {
    en: "Click the line(s) where PaymentImporter aliases one draft into the batch (reuse + add of the same reference).",
    ru: "Нажмите строку(и), где PaymentImporter алиасит один draft в батч (reuse + add той же ссылки)."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_object_reference", "cpt_independent_instances"],
  topicIds: ["top_oop_02"],
  tags: ["#bug-hunt", "#reference"],
  hintIds: ["hnt_co_bug_1", "hnt_co_bug_2", "hnt_co_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_co_importer_bughunt",
    solutionCodeArtifactId: "art_co_importer_solution",
    codeSnippet: `public PaymentBatch importRows(List<String[]> rows) {
    PaymentBatch batch = new PaymentBatch();
    PaymentInstruction draft = new PaymentInstruction(); // Line 3 — shared draft
    for (String[] row : rows) {
        draft.setPaymentId(PaymentId.of(row[0])); // Line 5 — mutate shared
        draft.setAmountCents(Long.parseLong(row[1]));
        draft.setBeneficiary(row[2]);
        batch.add(draft); // Line 8 — BUG: same reference
    }
    return batch;
}`,
    lines: [
      { lineNumber: 1, code: "public PaymentBatch importRows(List<String[]> rows) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    PaymentBatch batch = new PaymentBatch();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 3,
        code: "    PaymentInstruction draft = new PaymentInstruction();",
        isBug: true,
        explanation: {
          en: "Line 3: Draft created once outside the loop — one object for all rows.",
          ru: "Строка 3: Draft создан один раз вне цикла — один объект на все строки."
        }
      },
      { lineNumber: 4, code: "    for (String[] row : rows) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 5,
        code: "        draft.setPaymentId(PaymentId.of(row[0]));",
        isBug: true,
        explanation: {
          en: "Line 5: Mutating the shared instance rewrites every previously added batch slot.",
          ru: "Строка 5: Мутация shared-экземпляра переписывает каждый ранее добавленный слот батча."
        }
      },
      { lineNumber: 6, code: "        draft.setAmountCents(Long.parseLong(row[1]));", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "        draft.setBeneficiary(row[2]);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 8,
        code: "        batch.add(draft);",
        isBug: true,
        explanation: {
          en: "Line 8: Adds the same reference repeatedly — N slots, one object.",
          ru: "Строка 8: Многократно добавляет ту же ссылку — N слотов, один объект."
        }
      },
      { lineNumber: 9, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "    return batch;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 11, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_CO: InterviewAnswerChallenge = {
  id: "chl_co_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_classes_objects",
  stageId: "stg_co_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Shared Draft Objects",
    ru: "Устный Ответ на Senior-Интервью: Shared Draft Objects"
  },
  prompt: {
    en: "PaymentImporter reused one PaymentInstruction for an entire CSV batch; every batch entry showed the last row. Explain class vs object vs reference, why identity matters, and your production fix.",
    ru: "PaymentImporter переиспользовал один PaymentInstruction на весь CSV-батч; каждая запись показывала последнюю строку. Объясните class vs object vs reference, почему важна identity, и ваш продакшн-фикс."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_class_vs_object", "cpt_object_reference", "cpt_independent_instances"],
  topicIds: ["top_oop_02"],
  tags: ["#interview", "#object"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_co_shared_draft_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_class_vs_object",
        label: { en: "Class vs Object", ru: "Class vs Object" },
        keywords: ["class", "object", "blueprint", "instance", "класс", "объект", "чертёж", "экземпляр"]
      },
      {
        id: "cpt_object_reference",
        label: { en: "References & Aliasing", ru: "Ссылки и Aliasing" },
        keywords: ["reference", "alias", "same object", "ссылк", "алиас", "один объект"]
      },
      {
        id: "cpt_independent_instances",
        label: { en: "Independent Instances", ru: "Независимые Экземпляры" },
        keywords: ["new", "factory", "per row", "independent", "factory", "на строку", "независим"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): We had a PaymentInstruction class but only one object. The importer mutated a shared draft and added the same reference to the batch N times — aliasing. Every slot showed the last CSV row. Fix: create an independent PaymentInstruction per row via factory/new, add distinct references, prefer immutability after build.",
      ru: "Elevator Pitch (30 сек): Был класс PaymentInstruction, но один объект. Importer мутировал shared draft и добавлял ту же ссылку в батч N раз — aliasing. Каждый слот показывал последнюю CSV-строку. Фикс: независимый PaymentInstruction на строку через factory/new, разные ссылки, предпочтительна immutability после сборки."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): In Java, variables hold references. batch.add(draft) stores the pointer, not a field snapshot. Mutating draft.setAmount after prior adds rewrites history for every alias. Object identity (distinct heap instances / PaymentId) is what makes audit and retries meaningful. Shallow reuse is not a domain-modeling problem first — it is a misunderstanding of class vs object vs reference at runtime.",
      ru: "Глубокая Механика (60 сек): В Java переменные хранят ссылки. batch.add(draft) сохраняет указатель, не snapshot полей. Мутация draft.setAmount после предыдущих add переписывает историю для каждого alias. Идентичность объекта (разные экземпляры / PaymentId) делает аудит и retry осмысленными. Shallow reuse — прежде всего непонимание class vs object vs reference в runtime, а не domain modeling."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Per-row allocation has GC cost; pooling mutable drafts is an optimization that must never leave aliases in collections. Immutable instructions after build cost a bit more ceremony but prevent silent rewrite. Do not 'fix' this with equals tricks.",
      ru: "Продакшн Компромиссы (30 сек): Аллокация на строку стоит GC; pooling мутабельных draft — оптимизация, которая никогда не должна оставлять aliases в коллекциях. Immutable instructions после сборки чуть дороже по ceremony, но предотвращают тихую перепись. Не «чините» это трюками equals."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If we clone the draft with clone() before add, is that enough?'",
      ru: "Доп. Вопрос Интервьюера: 'Если клонировать draft через clone() перед add — этого достаточно?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Only if the clone is a true independent deep copy of all mutable state and identity fields are regenerated correctly. Java's Object.clone is fragile and easy to get shallow-wrong. Prefer explicit factory construction of a new PaymentInstruction with copied values — clearer, safer, and interview-honest about identity.",
      ru: "Ответ на Доп. Вопрос: Только если clone — истинная независимая deep copy всего мутабельного состояния и поля identity корректно пересозданы. Object.clone хрупок и часто получается shallow. Предпочитайте явную factory-сборку нового PaymentInstruction с копией значений — яснее, безопаснее и честнее про identity на интервью."
    }
  }
};

export const ALL_CLASSES_OBJECTS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_CO,
  APPLIED_BUG_HUNT_CHALLENGE_CO,
  INTERVIEW_ANSWER_CHALLENGE_CO
];
