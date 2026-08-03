import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_OC: FixBuilderChallenge = {
  id: "chl_ojc_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_object_class_contracts",
  stageId: "stg_ojc_practice",
  title: {
    en: "Fix Builder: ComplianceEvent Object Contract Hygiene",
    ru: "Конструктор Исправления: Гигиена Контрактов Object у ComplianceEvent"
  },
  prompt: {
    en: "ComplianceEvent mishandles Object contracts (identity equals for dedup, default toString noise, broken clone, getClass rejection, finalize cleanup). Select ALL structural building blocks for a production-safe fix.",
    ru: "ComplianceEvent нарушает контракты Object (identity equals для дедупа, шум default toString, сломанный clone, отвержение getClass, cleanup через finalize). Выберите ВСЕ элементы для продакшн-безопасного фикса."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
  topicIds: ["top_oop_19"],
  tags: ["#object", "#clone", "#getclass"],
  hintIds: ["hnt_ojc_1", "hnt_ojc_2", "hnt_ojc_3", "hnt_ojc_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ojc_event_broken",
    solutionCodeArtifactId: "art_ojc_event_solution",
    options: [
      {
        id: "opt_ojc_fix_1",
        text: {
          en: "Stop relying on Object identity equals for ComplianceEventRepository dedup — use an explicit eventId / business key (or a deliberate equals policy documented for value equality).",
          ru: "Перестать полагаться на Object identity equals для дедупа ComplianceEventRepository — использовать явный eventId / business key (или осознанную политику equals для value equality)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Default equals is identity; business dedup needs an explicit key or value policy.",
          ru: "Верно. Default equals — identity; бизнес-дедупу нужен явный ключ или value-политика."
        }
      },
      {
        id: "opt_ojc_fix_2",
        text: {
          en: "Prefer an explicit copy constructor / factory for ComplianceCase and AuditSnapshot instead of Object.clone() with shared mutable evidence lists.",
          ru: "Предпочитать явный copy constructor / factory для ComplianceCase и AuditSnapshot вместо Object.clone() с общими мутабельными списками evidence."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Clone is fragile and often shallow-wrong; explicit copies make independence clear.",
          ru: "Верно. Clone хрупок и часто shallow-wrong; явные копии делают независимость очевидной."
        }
      },
      {
        id: "opt_ojc_fix_3",
        text: {
          en: "Keep finalize() on ComplianceEvent to close file handles — GC will always run it before process exit.",
          ru: "Оставить finalize() на ComplianceEvent для закрытия file handles — GC всегда вызовет его до выхода процесса."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. finalize is obsolete (JEP 421); timing is unreliable. Use try-with-resources / Cleaner.",
          ru: "Неверно. finalize устарел (JEP 421); тайминг ненадёжен. Используйте try-with-resources / Cleaner."
        }
      },
      {
        id: "opt_ojc_fix_4",
        text: {
          en: "In EventClassifier, use instanceof when subtype polymorphism is intended; reserve getClass() equality only when exact runtime class must match.",
          ru: "В EventClassifier использовать instanceof, когда нужен subtype polymorphism; оставлять сравнение getClass() только когда требуется точное совпадение runtime class."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. getClass rejects valid subtypes; instanceof accepts the hierarchy when that is the design.",
          ru: "Верно. getClass отвергает валидные подтипы; instanceof принимает иерархию, когда это задумано."
        }
      },
      {
        id: "opt_ojc_fix_distractor_1",
        text: {
          en: "Override toString to dump every field including raw PII and secrets so AuditSnapshot always has maximum detail.",
          ru: "Переопределить toString так, чтобы выводить все поля включая сырой PII и секреты, чтобы AuditSnapshot всегда имел максимум деталей."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Diagnostic toString helps, but dumping PII/secrets is a logging incident — covered in a dedicated mission.",
          ru: "Неверно. Диагностический toString помогает, но дамп PII/секретов — logging-инцидент, покрытый отдельной миссией."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_OC: BugHuntChallenge = {
  id: "chl_ojc_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_object_class_contracts",
  stageId: "stg_ojc_debug",
  title: {
    en: "Bug Hunt: Object Contract Misuse in Compliance Pipeline",
    ru: "Поиск Бага: Misuse Контрактов Object в Compliance Pipeline"
  },
  prompt: {
    en: "Click the line(s) where Object contracts are misused: identity-based contains, shallow clone sharing mutable state, getClass rejecting subtypes, or finalize for cleanup.",
    ru: "Нажмите строку(и), где нарушены контракты Object: contains по identity, shallow clone с общим mutable state, getClass отвергающий подтипы, или finalize для cleanup."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
  topicIds: ["top_oop_19"],
  tags: ["#bug-hunt", "#object"],
  hintIds: ["hnt_ojc_bug_1", "hnt_ojc_bug_2", "hnt_ojc_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ojc_classifier_bughunt",
    solutionCodeArtifactId: "art_ojc_event_solution",
    codeSnippet: `public void ingest(ComplianceEvent event, ComplianceEventRepository repo) {
    if (repo.contains(event)) { // Line 2 — identity equals dedup
        return;
    }
    ComplianceCase probe = (ComplianceCase) event.getCase().clone(); // Line 5 — shallow clone
    if (event.getClass() != ComplianceEvent.class) { // Line 6 — rejects subtypes
        throw new IllegalArgumentException("unsupported");
    }
    repo.save(event);
}
protected void finalize() throws Throwable { // Line 11 — obsolete
    closeHandle();
    super.finalize();
}`,
    lines: [
      { lineNumber: 1, code: "public void ingest(ComplianceEvent event, ComplianceEventRepository repo) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    if (repo.contains(event)) {",
        isBug: true,
        explanation: {
          en: "Line 2: contains uses Object identity equals — logical duplicates with same eventId survive as 'distinct'.",
          ru: "Строка 2: contains использует Object identity equals — логические дубликаты с одним eventId считаются «разными»."
        }
      },
      { lineNumber: 3, code: "        return;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 5,
        code: "    ComplianceCase probe = (ComplianceCase) event.getCase().clone();",
        isBug: true,
        explanation: {
          en: "Line 5: Object.clone() is typically shallow — probe and live case share mutable evidence lists.",
          ru: "Строка 5: Object.clone() обычно shallow — probe и живой кейс делят мутабельные списки evidence."
        }
      },
      {
        lineNumber: 6,
        code: "    if (event.getClass() != ComplianceEvent.class) {",
        isBug: true,
        explanation: {
          en: "Line 6: Exact getClass check rejects valid ComplianceEvent subtypes that instanceof would accept.",
          ru: "Строка 6: Точная проверка getClass отвергает валидные подтипы ComplianceEvent, которые instanceof принял бы."
        }
      },
      { lineNumber: 7, code: "        throw new IllegalArgumentException(\"unsupported\");", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "    repo.save(event);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 10,
        code: "}",
        isBug: false,
        explanation: { en: "Not the defect line.", ru: "Не строка дефекта." }
      },
      {
        lineNumber: 11,
        code: "protected void finalize() throws Throwable {",
        isBug: true,
        explanation: {
          en: "Line 11: finalize is obsolete (JEP 421) and unreliable for closing handles — use try-with-resources / Cleaner.",
          ru: "Строка 11: finalize устарел (JEP 421) и ненадёжен для закрытия handles — используйте try-with-resources / Cleaner."
        }
      },
      { lineNumber: 12, code: "    closeHandle();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "    super.finalize();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 14, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_OC: InterviewAnswerChallenge = {
  id: "chl_ojc_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_object_class_contracts",
  stageId: "stg_ojc_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Object Contracts Overview",
    ru: "Устный Ответ на Senior-Интервью: Обзор Контрактов Object"
  },
  prompt: {
    en: "ComplianceEvent caused misleading audits via Object contract misuse. Explain default Object behavior, getClass vs instanceof, clone pitfalls, finalize obsolescence (JEP 421), and your production fix — without deep-diving into full equals/hashCode redesign or PII logging.",
    ru: "ComplianceEvent вызвал misleading-аудиты из-за misuse контрактов Object. Объясните default-поведение Object, getClass vs instanceof, ловушки clone, устаревание finalize (JEP 421) и ваш продакшн-фикс — без deep-dive в полный redesign equals/hashCode или PII logging."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
  topicIds: ["top_oop_19"],
  tags: ["#interview", "#object"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ojc_object_contracts_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_java_lang_object",
        label: { en: "java.lang.Object Contracts", ru: "Контракты java.lang.Object" },
        keywords: ["Object", "equals", "toString", "finalize", "identity", "контракт", "Object"]
      },
      {
        id: "cpt_getclass_vs_instanceof",
        label: { en: "getClass vs instanceof", ru: "getClass vs instanceof" },
        keywords: ["getClass", "instanceof", "subtype", "подтип", "иерарх"]
      },
      {
        id: "cpt_clone_pitfalls",
        label: { en: "Clone Pitfalls", ru: "Ловушки Clone" },
        keywords: ["clone", "shallow", "copy constructor", "shallow", "копир"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Object defaults are identity equals/hashCode, Class@hex toString, fragile clone, and obsolete finalize. Our ComplianceEventRepository treated identity as business uniqueness, AuditSnapshot logged Class@hex, clone shared mutable evidence, getClass rejected subtypes, and finalize never cleaned up reliably. Fix: explicit eventId keys, diagnostic toString, copy constructors, instanceof when polymorphism is intended, try-with-resources instead of finalize (JEP 421).",
      ru: "Elevator Pitch (30 сек): Default Object — identity equals/hashCode, Class@hex toString, хрупкий clone и устаревший finalize. ComplianceEventRepository принял identity за бизнес-уникальность, AuditSnapshot логировал Class@hex, clone делил mutable evidence, getClass отвергал подтипы, finalize не чистил надёжно. Фикс: явные ключи eventId, диагностический toString, copy constructors, instanceof при polymorphism, try-with-resources вместо finalize (JEP 421)."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): java.lang.Object.equals is reference equality unless overridden — List.contains and Set.add use that contract. Cloneable + Object.clone() copies field bits; nested List references remain shared (shallow). getClass() == X.class is exact-type; instanceof X accepts subclasses — choose based on whether LSP subtypes must participate. finalize is deprecated for removal: no guaranteed prompt execution, can resurrect objects, hurts GC — Cleaner or explicit close is the modern path. This mission is the Object overview; full equals/hashCode math and PII-safe toString are sibling topics.",
      ru: "Глубокая Механика (60 сек): java.lang.Object.equals — reference equality, пока не переопределён — List.contains и Set.add используют этот контракт. Cloneable + Object.clone() копирует биты полей; nested List-ссылки остаются общими (shallow). getClass() == X.class — точный тип; instanceof X принимает подклассы — выбор зависит от того, должны ли LSP-подтипы участвовать. finalize deprecated for removal: нет гарантированного timely execution, возможна resurrection, вред GC — Cleaner или явный close. Эта миссия — обзор Object; полная математика equals/hashCode и PII-safe toString — соседние темы."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Value equals needs careful hashCode pairing (dedicated mission). getClass is stricter for final value types; instanceof is friendlier for open hierarchies. Copy constructors are more code than clone but reviewable. Retiring finalize may require auditing legacy native/file cleanup paths — do it once, correctly.",
      ru: "Продакшн Компромиссы (30 сек): Value equals требует аккуратной пары с hashCode (отдельная миссия). getClass строже для final value types; instanceof дружелюбнее к открытым иерархиям. Copy constructors — больше кода, чем clone, но ревьюабельны. Отказ от finalize может потребовать аудита legacy native/file cleanup — сделайте один раз правильно."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'When would you still prefer getClass() over instanceof in equals?'",
      ru: "Доп. Вопрос Интервьюера: 'Когда вы всё же предпочтёте getClass() вместо instanceof в equals?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Prefer getClass when the type is effectively final / value-like and you must reject asymmetric subclass equality that would break the equals contract (symmetry). Prefer instanceof when the hierarchy is designed for substitutable subtypes and equals is carefully coordinated across the hierarchy — or better, avoid inheritance for equality-sensitive value types.",
      ru: "Ответ на Доп. Вопрос: Предпочитайте getClass, когда тип фактически final / value-like и нужно отвергнуть асимметричное subclass equality, ломающее контракт equals (symmetry). Предпочитайте instanceof, когда иерархия рассчитана на подставляемые подтипы и equals согласован по иерархии — или лучше избегайте inheritance для equality-sensitive value types."
    }
  }
};

export const ALL_OBJECT_CLASS_CONTRACTS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_OC,
  APPLIED_BUG_HUNT_CHALLENGE_OC,
  INTERVIEW_ANSWER_CHALLENGE_OC
];
