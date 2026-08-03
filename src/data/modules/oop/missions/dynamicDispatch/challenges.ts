import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_DD: FixBuilderChallenge = {
  id: "chl_dd_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_dynamic_dispatch",
  stageId: "stg_dd_practice",
  title: {
    en: "Fix Builder: Restore Polymorphic Dispatch in RiskEventProcessor",
    ru: "Конструктор Исправления: Восстановление Полиморфной Диспетчеризации в RiskEventProcessor"
  },
  prompt: {
    en: "RiskEventProcessor latency and correctness regressed after a static-helper refactor. Select ALL structural building blocks required to restore invokeinterface/invokevirtual polymorphic evaluate(event) and reduce megamorphism across eight RiskHandler types.",
    ru: "Латентность и корректность RiskEventProcessor деградировали после рефакторинга на static helper. Выберите ВСЕ элементы, необходимые для восстановления полиморфного evaluate(event) через invokeinterface/invokevirtual и снижения мегаморфизма среди восьми типов RiskHandler."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
  topicIds: ["top_oop_12"],
  tags: ["#dynamic-dispatch", "#invokevirtual", "#megamorphic"],
  hintIds: ["hnt_dd_1", "hnt_dd_2", "hnt_dd_3", "hnt_dd_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_dd_processor_broken",
    solutionCodeArtifactId: "art_dd_processor_solution",
    options: [
      {
        id: "opt_dd_fix_1",
        text: {
          en: "Call handler.evaluate(event) on the RiskHandler instance field so bytecode is invokeinterface/invokevirtual.",
          ru: "Вызывать handler.evaluate(event) на instance-поле RiskHandler, чтобы байткод был invokeinterface/invokevirtual."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Instance polymorphic calls select Card/Wire/Ach overrides at runtime via dynamic dispatch.",
          ru: "Верно. Instance-полиморфные вызовы выбирают overrides Card/Wire/Ach в runtime через динамическую диспетчеризацию."
        }
      },
      {
        id: "opt_dd_fix_2",
        text: {
          en: "Keep RiskHandlers.evaluate(handler, event) but mark the helper final for HotSpot inlining.",
          ru: "Оставить RiskHandlers.evaluate(handler, event), но пометить helper final для inlining HotSpot."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. final on a static helper does not restore polymorphic override selection of instance evaluate methods.",
          ru: "Неверно. final на static helper не восстанавливает полиморфный выбор instance-методов evaluate."
        }
      },
      {
        id: "opt_dd_fix_3",
        text: {
          en: "Replace polymorphic calls with a giant instanceof switch invoking each handler's static evaluateStatic.",
          ru: "Заменить полиморфные вызовы гигантским instanceof switch с вызовом static evaluateStatic каждого handler."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. instanceof + static helpers reintroduce invokestatic binding and brittle open-closed violations.",
          ru: "Неверно. instanceof + static helpers возвращают связывание invokestatic и хрупкие нарушения open-closed."
        }
      },
      {
        id: "opt_dd_fix_4",
        text: {
          en: "Seal RiskHandler (or split call sites by channel) so each hot site sees ≤2 concrete handlers for JIT inlining.",
          ru: "Запечатать RiskHandler (или разделить call sites по каналу), чтобы каждый hot site видел ≤2 конкретных handler-а для JIT inlining."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Reducing receiver cardinality restores monomorphic/bimorphic profiles and HotSpot inlining at 1M events/sec.",
          ru: "Верно. Снижение кардинальности получателей восстанавливает monomorphic/bimorphic профили и inlining HotSpot при 1M events/sec."
        }
      },
      {
        id: "opt_dd_fix_distractor_1",
        text: {
          en: "Cast handler to Object and use Method.invoke to force runtime lookup of evaluate.",
          ru: "Привести handler к Object и использовать Method.invoke для принудительного runtime lookup evaluate."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Reflection adds massive overhead in a 1M events/sec loop and is not the JVMS virtual-dispatch fix.",
          ru: "Неверно. Reflection добавляет огромные накладные расходы в цикле 1M events/sec и не является фиксом виртуальной диспетчеризации JVMS."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_DD: BugHuntChallenge = {
  id: "chl_dd_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_dynamic_dispatch",
  stageId: "stg_dd_debug",
  title: {
    en: "Bug Hunt: ExposureRouter Static Binding Trap",
    ru: "Поиск Бага: Ловушка Static Binding в ExposureRouter"
  },
  prompt: {
    en: "ExposureRouter compiles and runs, but CardExposureHandler specialized exposure math never executes — base RiskHandler static logic always wins. Click the line(s) responsible for preventing true polymorphic dispatch.",
    ru: "ExposureRouter компилируется и работает, но специализированная математика exposure CardExposureHandler никогда не выполняется — всегда побеждает static-логика базового RiskHandler. Нажмите строку(и), блокирующие истинную полиморфную диспетчеризацию."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
  topicIds: ["top_oop_12"],
  tags: ["#dynamic-dispatch", "#bug-hunt", "#invokestatic"],
  hintIds: ["hnt_dd_bug_1", "hnt_dd_bug_2", "hnt_dd_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_dd_exposure_router_bughunt",
    solutionCodeArtifactId: "art_dd_processor_solution",
    codeSnippet: `public final class ExposureRouter {

    public long route(RiskHandler handler, RiskEvent event) {
        // intended: polymorphic Card/Wire/Ach evaluate
        return RiskHandlers.evaluate(handler, event); // Line 5
    }
}

final class RiskHandlers {
    static long evaluate(RiskHandler handler, RiskEvent event) {
        return RiskHandler.evaluateStatic(event); // Line 11
    }
}`,
    lines: [
      { lineNumber: 1, code: "public final class ExposureRouter {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "    public long route(RiskHandler handler, RiskEvent event) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "        // intended: polymorphic Card/Wire/Ach evaluate", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 5,
        code: "        return RiskHandlers.evaluate(handler, event);",
        isBug: true,
        explanation: {
          en: "Line 5 uses a static helper (invokestatic). Combined with line 11, this never calls handler.evaluate(event) — Card/Wire/Ach instance overrides are skipped.",
          ru: "Строка 5 использует static helper (invokestatic). Вместе со строкой 11 это никогда не вызывает handler.evaluate(event) — instance overrides Card/Wire/Ach пропускаются."
        }
      },
      { lineNumber: 6, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "}", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "final class RiskHandlers {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "    static long evaluate(RiskHandler handler, RiskEvent event) {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 11,
        code: "        return RiskHandler.evaluateStatic(event);",
        isBug: true,
        explanation: {
          en: "Line 11 binds to RiskHandler.evaluateStatic via invokestatic — static hiding, not override. The handler parameter is ignored for dispatch.",
          ru: "Строка 11 связывается с RiskHandler.evaluateStatic через invokestatic — static hiding, не override. Параметр handler игнорируется для диспетчеризации."
        }
      },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_DD: InterviewAnswerChallenge = {
  id: "chl_dd_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_dynamic_dispatch",
  stageId: "stg_dd_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Dynamic Dispatch in Risk Hot Loops",
    ru: "Устный Ответ на Senior-Интервью: Динамическая Диспетчеризация в Risk Hot Loops"
  },
  prompt: {
    en: "Your risk pricing engine processes 1M RiskEvent/sec. After a refactor, RiskEventProcessor routes through RiskHandlers.evaluate(handler, event) and eight concrete handlers share one call site. Explain root cause (static binding + megamorphism), JVMS instructions, and your production fix to the interviewer.",
    ru: "Ваш risk pricing engine обрабатывает 1M RiskEvent/sec. После рефакторинга RiskEventProcessor идёт через RiskHandlers.evaluate(handler, event), и восемь конкретных handler-ов делят один call site. Объясните интервьюеру корневую причину (static binding + мегаморфизм), инструкции JVMS и ваш продакшн-фикс."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
  topicIds: ["top_oop_12"],
  tags: ["#dynamic-dispatch", "#megamorphic", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_dd_risk_01",
    rubricDimensions: ["ELEVATOR_PITCH", "JLS_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_dynamic_dispatch",
        label: { en: "Runtime Dynamic Dispatch", ru: "Runtime Динамическая Диспетчеризация" },
        keywords: ["dynamic dispatch", "polymorphic", "runtime type", "override", "динамическая диспетчеризация", "полиморф"]
      },
      {
        id: "cpt_invokevirtual",
        label: { en: "JVMS Invoke Instructions", ru: "Invoke-Инструкции JVMS" },
        keywords: ["invokevirtual", "invokeinterface", "invokestatic", "jvms", "bytecode", "байткод"]
      },
      {
        id: "cpt_static_hiding",
        label: { en: "Static Method Hiding", ru: "Скрытие Static-Методов" },
        keywords: ["static hiding", "hide", "evaluateStatic", "static method", "скрытие", "static"]
      },
      {
        id: "cpt_megamorphic",
        label: { en: "Megamorphic Call Site", ru: "Мегаморфный Call Site" },
        keywords: ["megamorphic", "monomorphic", "bimorphic", "inlining", "JIT", "мегаморф", "inline"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): The static helper compiles to invokestatic and cannot select Card/Wire/Ach instance overrides — that is static binding / hiding, not dynamic dispatch. Separately, eight concrete RiskHandlers at one site make it megamorphic, so HotSpot stops inlining. Fix: call handler.evaluate(event) polymorphically, then seal or split call sites.",
      ru: "Elevator Pitch (30 сек): Static helper компилируется в invokestatic и не может выбрать instance overrides Card/Wire/Ach — это static binding / hiding, не динамическая диспетчеризация. Отдельно восемь конкретных RiskHandler на одном сайте делают его мегаморфным, и HotSpot прекращает inlining. Фикс: полиморфный handler.evaluate(event), затем seal или split call sites."
    },
    modelAnswerDetailed: {
      en: "Deep JVMS Mechanics (60 sec): JVMS 6.5 — invokestatic binds static methods at link time; invokevirtual uses class vtables; invokeinterface uses itables. Instance evaluate on a RiskHandler reference is invokeinterface and resolves via the receiver Klass. Static evaluateStatic on RiskHandler hides in subclasses and never overrides. HotSpot profiles call sites: mono/bi can inline; megamorphic (≥3 concrete types, here 8) pays full dispatch in the 1M/sec loop.",
      ru: "Глубокая Механика JVMS (60 сек): JVMS 6.5 — invokestatic связывает static-методы на линковке; invokevirtual использует vtable классов; invokeinterface — itable. Instance evaluate на ссылке RiskHandler — invokeinterface и разрешается через Klass получателя. Static evaluateStatic на RiskHandler скрывается в подклассах и никогда не override. HotSpot профилирует call sites: mono/bi могут inline; megamorphic (≥3 конкретных типа, здесь 8) платит полный dispatch в цикле 1M/sec."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Correctness first — delete static helper / instanceof-to-static switches. For latency: sealed RiskHandler with channel-specific processors (monomorphic fields) or split loops keeping ≤2 types per site. Sealing limits extension; splitting adds wiring; both beat a megamorphic hot loop. Validate with javap and async-profiler.",
      ru: "Продакшн Компромиссы (30 сек): Сначала корректность — удалить static helper / instanceof-to-static switches. Для латентности: sealed RiskHandler с channel-specific processors (monomorphic поля) или split loops с ≤2 типами на сайт. Sealing ограничивает расширение; splitting добавляет wiring; оба лучше мегаморфного hot loop. Проверяйте javap и async-profiler."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If the static helper internally called handler.evaluate(event), would the outer invokestatic still be a problem?'",
      ru: "Доп. Вопрос Интервьюера: 'Если static helper внутри вызывал handler.evaluate(event), оставался бы внешний invokestatic проблемой?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Correctness would be restored because the inner call is invokeinterface. The outer invokestatic is a thin trampoline — usually fine. The remaining risk is megamorphism at the *inner* call site if eight concrete types still flow through that one evaluate call. Profile the inner site; seal or split if p99 stays high.",
      ru: "Ответ на Доп. Вопрос: Корректность восстановилась бы, потому что внутренний вызов — invokeinterface. Внешний invokestatic — тонкий trampoline, обычно нормален. Остающийся риск — мегаморфизм на *внутреннем* call site, если восемь конкретных типов всё ещё идут через один evaluate. Профилируйте внутренний сайт; seal или split, если p99 остаётся высоким."
    }
  }
};

export const ALL_DYNAMIC_DISPATCH_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_DD,
  APPLIED_BUG_HUNT_CHALLENGE_DD,
  INTERVIEW_ANSWER_CHALLENGE_DD
];
