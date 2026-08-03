import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const OL_FIX_BUILDER_CHALLENGE: FixBuilderChallenge = {
  id: "chl_ol_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_method_overloading",
  stageId: "stg_ol_practice",
  title: {
    en: "Fix Builder: Safe Settle API for LedgerPostingService",
    ru: "Конструктор Исправления: Безопасный Settle API для LedgerPostingService"
  },
  prompt: {
    en: "Select ALL production-safe redesigns that eliminate ambiguous settle overloads and REJECT dangerous quick fixes that keep mixed cents/decimal semantics under one name.",
    ru: "Выберите ВСЕ безопасные решения, устраняющие неоднозначные перегрузки settle, и ОТКЛОНИТЕ опасные костыли, сохраняющие смешанную семантику центов/decimal под одним именем."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
  topicIds: ["top_oop_14"],
  tags: ["#overloading", "#ledger", "#api-design"],
  hintIds: ["hnt_ol_1", "hnt_ol_2", "hnt_ol_3", "hnt_ol_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ledger_settle_broken",
    solutionCodeArtifactId: "art_ledger_settle_solution",
    options: [
      {
        id: "opt_ol_fix_1",
        text: {
          en: "Replace settle overloads with named methods: settleCents(long) and settleDecimal(BigDecimal).",
          ru: "Заменить перегрузки settle именованными методами: settleCents(long) и settleDecimal(BigDecimal)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Explicit names encode monetary scale and remove compile-time ambiguity between related types.",
          ru: "Верно. Явные имена кодируют денежный масштаб и устраняют compile-time неоднозначность между связанными типами."
        }
      },
      {
        id: "opt_ol_fix_2",
        text: {
          en: "Remove settle(Long) and other null-applicable reference overloads that compete for settle(null).",
          ru: "Убрать settle(Long) и другие null-применимые reference-перегрузки, конкурирующие за settle(null)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Parallel Long/BigDecimal/String overloads make null ambiguous; prefer non-null primitives or explicit Optional handling.",
          ru: "Верно. Параллельные перегрузки Long/BigDecimal/String делают null неоднозначным; предпочитайте non-null примитивы или явный Optional."
        }
      },
      {
        id: "opt_ol_fix_3",
        text: {
          en: "Keep cents and major-unit posting on separately named APIs so Integer/autoboxing cannot silently change scale.",
          ru: "Держать проводки в центах и основных единицах на раздельно именованных API, чтобы Integer/автобоксинг не менял масштаб молча."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Mixed scales under one overload set turn a wrong resolution into a wrong ledger amount.",
          ru: "Верно. Смешанные масштабы в одном наборе перегрузок превращают неверное разрешение в неверную сумму леджера."
        }
      },
      {
        id: "opt_ol_fix_distractor_1",
        text: {
          en: "Keep all four settle overloads but add @Override on each so the compiler validates dispatch.",
          ru: "Оставить все четыре перегрузки settle, но добавить @Override на каждую для проверки диспетчеризации компилятором."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. @Override applies to overriding superclass methods, not to choosing among overloads.",
          ru: "Неверно. @Override относится к переопределению методов суперкласса, а не к выбору среди перегрузок."
        }
      },
      {
        id: "opt_ol_fix_distractor_2",
        text: {
          en: "Document that settle(long) is cents and settle(BigDecimal) is dollars, leaving the overload set unchanged.",
          ru: "Задокументировать, что settle(long) — центы, а settle(BigDecimal) — доллары, не меняя набор перегрузок."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Javadoc does not change JLS resolution or prevent 100× posting skew at production call sites.",
          ru: "Неверно. Javadoc не меняет разрешение JLS и не предотвращает искажение проводок в 100 раз на продакшн call site."
        }
      },
      {
        id: "opt_ol_fix_distractor_3",
        text: {
          en: "Cast every client argument to Object and add a single settle(Object) that inspects runtime type with instanceof.",
          ru: "Приводить каждый аргумент клиента к Object и добавить один settle(Object) с проверкой runtime-типа через instanceof."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Runtime type-switching reintroduces fragile dispatch, loses compile-time safety, and still mishandles null.",
          ru: "Неверно. Runtime-переключение по типу возвращает хрупкую диспетчеризацию, теряет compile-time безопасность и плохо обрабатывает null."
        }
      }
    ]
  }
};

export const OL_BUG_HUNT_CHALLENGE: BugHuntChallenge = {
  id: "chl_ol_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_method_overloading",
  stageId: "stg_ol_debug",
  title: {
    en: "Bug Hunt: Ambiguous Settle Overload Lines",
    ru: "Поиск Бага: Строки Неоднозначной Перегрузки Settle"
  },
  prompt: {
    en: "Identify the line(s) where the dangerous overload set is declared and where a client call resolves to the wrong settle path.",
    ru: "Найдите строку(и), где объявлен опасный набор перегрузок и где клиентский вызов разрешается в неверный путь settle."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
  topicIds: ["top_oop_14"],
  tags: ["#overloading", "#bug-hunt", "#ledger"],
  hintIds: ["hnt_ol_bug_1", "hnt_ol_bug_2", "hnt_ol_bug_3", "hnt_ol_bug_4"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ledger_settle_bughunt",
    solutionCodeArtifactId: "art_ledger_settle_solution",
    codeSnippet: `public class LedgerPostingService {
    public PostingResult settle(long cents) {
        return post(LedgerEntry.ofCents(cents));
    }

    public PostingResult settle(BigDecimal amount) {
        return post(LedgerEntry.ofDecimal(amount));
    }

    public PostingResult settle(String amount) {
        return settle(new BigDecimal(amount));
    }

    public PostingResult settle(Long cents) {
        return settle(cents.longValue());
    }
}

public class SettlementBatchJob {
    public void settleDto(LedgerPostingService svc, Integer amountCents) {
        svc.settle(amountCents);
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class LedgerPostingService {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 2,
        code: "    public PostingResult settle(long cents) {",
        isBug: true,
        explanation: {
          en: "Line 2: Part of the dangerous overload set — settle(long) encodes cents scale under the same name as decimal overloads.",
          ru: "Строка 2: Часть опасного набора перегрузок — settle(long) кодирует масштаб центов под тем же именем, что и decimal-перегрузки."
        }
      },
      { lineNumber: 3, code: "        return post(LedgerEntry.ofCents(cents));", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 6,
        code: "    public PostingResult settle(BigDecimal amount) {",
        isBug: true,
        explanation: {
          en: "Line 6: Conflicting overload — settle(BigDecimal) encodes major-unit scale under the same settle name, enabling 100× skew when the wrong overload wins.",
          ru: "Строка 6: Конфликтующая перегрузка — settle(BigDecimal) кодирует основные единицы под тем же именем settle, создавая риск искажения ×100."
        }
      },
      { lineNumber: 7, code: "        return post(LedgerEntry.ofDecimal(amount));", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "    public PostingResult settle(String amount) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "        return settle(new BigDecimal(amount));", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 14, code: "    public PostingResult settle(Long cents) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 15, code: "        return settle(cents.longValue());", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 16, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 17, code: "}", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 18, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 19, code: "public class SettlementBatchJob {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 20, code: "    public void settleDto(LedgerPostingService svc, Integer amountCents) {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 21,
        code: "        svc.settle(amountCents);",
        isBug: true,
        explanation: {
          en: "Line 21: Client call site — Integer resolves at compile time to settle(long) via unboxing (NPE if null); never settle(Long). This is where production DTOs hit the trap.",
          ru: "Строка 21: Клиентский call site — Integer на этапе компиляции разрешается в settle(long) через unboxing (NPE если null); никогда не settle(Long). Здесь продакшн-DTO попадают в ловушку."
        }
      },
      { lineNumber: 22, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 23, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const OL_INTERVIEW_ANSWER_CHALLENGE: InterviewAnswerChallenge = {
  id: "chl_ol_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_method_overloading",
  stageId: "stg_ol_interview_a",
  title: {
    en: "Senior Interview: Explaining Ambiguous Settle Overloads",
    ru: "Senior-Интервью: Объяснение Неоднозначных Перегрузок Settle"
  },
  prompt: {
    en: "Explain why LedgerPostingService.settle overloads caused incorrect ledger amounts (or ambiguity/NPE), how compile-time resolution differs from runtime overriding, and how you would redesign the API.",
    ru: "Объясните, почему перегрузки LedgerPostingService.settle вызвали неверные суммы леджера (или неоднозначность/NPE), чем compile-time разрешение отличается от runtime override, и как вы перепроектируете API."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
  topicIds: ["top_oop_14"],
  tags: ["#overloading", "#interview", "#ledger", "#jls"],
  hintIds: [],
  xpReward: 100,
  order: 9,
  payload: {
    targetQuestionId: "q_ol_ledger_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_method_overloading",
        label: { en: "Overload Set / Ambiguity", ru: "Набор Перегрузок / Неоднозначность" },
        keywords: ["overload", "overloading", "ambiguous", "settle", "перегруз", "неоднознач"]
      },
      {
        id: "cpt_compile_time_resolution",
        label: { en: "Compile-Time Resolution", ru: "Compile-Time Разрешение" },
        keywords: ["compile", "static", "jls", "phase", "most-specific", "компиля", "статич"]
      },
      {
        id: "cpt_autoboxing_trap",
        label: { en: "Autoboxing / Integer→long", ru: "Автобоксинг / Integer→long" },
        keywords: ["autobox", "unbox", "integer", "long", "null", "автобокс", "unboxing"]
      },
      {
        id: "cpt_named_methods",
        label: { en: "Named Methods Fix", ru: "Фикс Именованными Методами" },
        keywords: ["settlecents", "settledecimal", "named", "item 41", "именов"]
      }
    ],
    modelAnswer30s: {
      en: "Overloading is resolved at compile time from static argument types — not by the JVM at runtime. LedgerPostingService.settle mixed cents (long/Long) with major units (BigDecimal/String) under one name, so the wrong overload became a wrong ledger scale. settle(null) is ambiguous across reference overloads; Integer picks settle(long) via unboxing. Fix: settleCents and settleDecimal — Effective Java Item 41.",
      ru: "Перегрузка разрешается на этапе компиляции по статическим типам аргументов — не JVM в рантайме. LedgerPostingService.settle смешал центы (long/Long) с основными единицами (BigDecimal/String) под одним именем, поэтому неверная перегрузка стала неверным масштабом леджера. settle(null) неоднозначен между reference-перегрузками; Integer выбирает settle(long) через unboxing. Фикс: settleCents и settleDecimal — Effective Java Item 41."
    },
    modelAnswerDetailed: {
      en: "JLS §15.12 selects an overload using applicability phases and the most-specific rule based on compile-time types. That is fundamentally different from overriding, where the JVM dispatches on the runtime type of the receiver. In the ledger API, settle(long)/settle(Long) posted minor units while settle(BigDecimal)/settle(String) posted major units — same verb, conflicting domain semantics. Integer arguments never select settle(Long); they unbox to settle(long), and null Integer NPEs. null without a cast is ambiguous among Long, BigDecimal, and String. Production tests that only pass primitive longs miss these call sites entirely.",
      ru: "JLS §15.12 выбирает перегрузку по фазам применимости и most-specific на основе compile-time типов. Это принципиально отличается от override, где JVM диспетчеризует по runtime-типу получателя. В ledger API settle(long)/settle(Long) писали минорные единицы, а settle(BigDecimal)/settle(String) — основные: один глагол, конфликтующая доменная семантика. Integer никогда не выбирает settle(Long); он unboxится в settle(long), а null Integer даёт NPE. null без приведения неоднозначен между Long, BigDecimal и String. Продакшн-тесты только с примитивным long эти call site полностью пропускают."
    },
    modelAnswerTradeOffs: {
      en: "Named methods add API surface but eliminate entire classes of silent monetary bugs. A MoneyCents / MoneyDecimal type pair is even safer if the codebase can adopt it. Keeping convenience overloads is rarely worth the reconciliation incidents in financial systems.",
      ru: "Именованные методы расширяют API, но устраняют целые классы молчаливых денежных багов. Пара типов MoneyCents / MoneyDecimal ещё безопаснее, если кодовая база может её принять. Удобные перегрузки редко стоят инцидентов сверки в финансовых системах."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'How is this related to List.remove(int) vs remove(Object)? Would you mention that on a senior interview?'",
      ru: "Вопрос интервьюера: 'Как это связано с List.remove(int) vs remove(Object)? Уместно ли упомянуть это на Senior-интервью?'"
    },
    followUpModelAnswerText: {
      en: "Yes — same autoboxing overload trap. Passing Integer often selects remove(int) via unboxing (index removal) instead of remove(Object) (element removal). I would cite it as the JDK parallel, then return to LedgerPostingService where the cost is incorrect money, not just a wrong list index.",
      ru: "Да — та же ловушка автобоксинга. Передача Integer часто выбирает remove(int) через unboxing (удаление по индексу) вместо remove(Object). Я бы привёл это как параллель JDK, затем вернулся к LedgerPostingService, где цена — неверные деньги, а не только неверный индекс списка."
    }
  }
};

export const ALL_OVERLOADING_CHALLENGES: readonly Challenge[] = [
  OL_FIX_BUILDER_CHALLENGE,
  OL_BUG_HUNT_CHALLENGE,
  OL_INTERVIEW_ANSWER_CHALLENGE
];
