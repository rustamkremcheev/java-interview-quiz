import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_OV: FixBuilderChallenge = {
  id: "chl_ov_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_method_overriding_covariant",
  stageId: "stg_ov_practice",
  title: {
    en: "Fix Builder: Restore Covariant findById Override",
    ru: "Конструктор Исправления: Восстановить Ковариантный Override findById"
  },
  prompt: {
    en: "CorporateInvoiceRepository silently overloads findById. Select ALL structural building blocks required to correctly override InvoiceRepository.findById with a covariant CorporateInvoice return per JLS 8.4.8 and Effective Java Item 40.",
    ru: "CorporateInvoiceRepository тихо перегружает findById. Выберите ВСЕ элементы, необходимые для корректного переопределения InvoiceRepository.findById с ковариантным возвратом CorporateInvoice согласно JLS 8.4.8 и Effective Java Item 40."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
  topicIds: ["top_oop_15"],
  tags: ["#overriding", "#covariant-returns", "#override-annotation"],
  hintIds: ["hnt_ov_1", "hnt_ov_2", "hnt_ov_3", "hnt_ov_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ov_corporate_repo_broken",
    solutionCodeArtifactId: "art_ov_corporate_repo_solution",
    options: [
      {
        id: "opt_ov_fix_1",
        text: {
          en: "@Override public CorporateInvoice findById(String id) throws InvoiceNotFoundException { return loadCorporateInvoice(id); }",
          ru: "@Override public CorporateInvoice findById(String id) throws InvoiceNotFoundException { return loadCorporateInvoice(id); }"
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Matching String parameter, @Override validation, covariant CorporateInvoice return, and non-broadened checked exceptions restore polymorphic enrichment.",
          ru: "Верно. Совпадающий параметр String, валидация @Override, ковариантный возврат CorporateInvoice и нерасширенные checked-исключения восстанавливают полиморфное обогащение."
        }
      },
      {
        id: "opt_ov_fix_2",
        text: {
          en: "Keep findById(InvoiceKey id) but add @Override — the annotation alone converts the overload into an override.",
          ru: "Оставить findById(InvoiceKey id), но добавить @Override — одной аннотации достаточно, чтобы превратить перегрузку в override."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. @Override with a non-matching signature fails compilation — it does not magically rewrite InvoiceKey into String.",
          ru: "Неверно. @Override с несовпадающей сигнатурой падает на компиляции — он не превращает InvoiceKey в String волшебным образом."
        }
      },
      {
        id: "opt_ov_fix_3",
        text: {
          en: "@Override public CorporateInvoice findById(String id) throws Exception { return loadCorporateInvoice(id); }",
          ru: "@Override public CorporateInvoice findById(String id) throws Exception { return loadCorporateInvoice(id); }"
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. throws Exception broadens the parent's InvoiceNotFoundException — illegal under JLS override rules.",
          ru: "Неверно. throws Exception расширяет InvoiceNotFoundException родителя — незаконно по правилам override JLS."
        }
      },
      {
        id: "opt_ov_fix_4",
        text: {
          en: "Match the parent parameter list (String), keep or narrow checked exceptions, and rely on covariant return CorporateInvoice under @Override.",
          ru: "Совпасть со списком параметров родителя (String), сохранить или сузить checked-исключения и использовать ковариантный возврат CorporateInvoice под @Override."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. These are the JLS 8.4.8 structural requirements for a legal specialized repository override.",
          ru: "Верно. Это структурные требования JLS 8.4.8 для легального специализированного override репозитория."
        }
      },
      {
        id: "opt_ov_fix_distractor_1",
        text: {
          en: "Change the parent return type to Object so both repositories can return anything without covariant rules.",
          ru: "Сменить возвращаемый тип родителя на Object, чтобы оба репозитория возвращали что угодно без правил ковариантности."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Weakening the base API to Object destroys type safety for all billing callers and is not a production fix.",
          ru: "Неверно. Ослабление базового API до Object уничтожает типобезопасность всех вызывающих биллинга и не является продакшн-фиксом."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_OV: BugHuntChallenge = {
  id: "chl_ov_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_method_overriding_covariant",
  stageId: "stg_ov_debug",
  title: {
    en: "Bug Hunt: BillingLookupService Missing Corporate Enrichment",
    ru: "Поиск Бага: Отсутствие Corporate-Обогащения в BillingLookupService"
  },
  prompt: {
    en: "Nightly corporate settlement posts incomplete tax residency data. Click the line(s) in CorporateInvoiceRepository responsible for the silent overload that prevents polymorphic findById dispatch.",
    ru: "Ночной corporate settlement постит неполные данные tax residency. Нажмите строку(и) в CorporateInvoiceRepository, ответственные за тихую перегрузку, блокирующую полиморфную диспетчеризацию findById."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
  topicIds: ["top_oop_15"],
  tags: ["#overriding", "#bug-hunt", "#silent-overload"],
  hintIds: ["hnt_ov_bug_1", "hnt_ov_bug_2", "hnt_ov_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ov_billing_lookup_bughunt",
    solutionCodeArtifactId: "art_ov_corporate_repo_solution",
    codeSnippet: `public class CorporateInvoiceRepository extends InvoiceRepository {

    // intended covariant override — missing @Override!
    public CorporateInvoice findById(InvoiceKey id) throws InvoiceNotFoundException { // Line 4
        return loadCorporateInvoice(id.value());
    }

    public CorporateInvoice loadCorporateInvoice(String id) throws InvoiceNotFoundException {
        CorporateInvoice invoice = new CorporateInvoice(super.findById(id));
        invoice.enrichTaxResidency();
        return invoice;
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class CorporateInvoiceRepository extends InvoiceRepository {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "    // intended covariant override — missing @Override!", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 4,
        code: "    public CorporateInvoice findById(InvoiceKey id) throws InvoiceNotFoundException {",
        isBug: true,
        explanation: {
          en: "Line 4: findById(InvoiceKey) is NOT override-equivalent to findById(String). Without @Override this compiles as a silent overload — InvoiceRepository polymorphic calls never enter this method.",
          ru: "Строка 4: findById(InvoiceKey) НЕ override-equivalent к findById(String). Без @Override это компилируется как тихая перегрузка — полиморфные вызовы через InvoiceRepository никогда не входят в этот метод."
        }
      },
      { lineNumber: 5, code: "        return loadCorporateInvoice(id.value());", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "    public CorporateInvoice loadCorporateInvoice(String id) throws InvoiceNotFoundException {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "        CorporateInvoice invoice = new CorporateInvoice(super.findById(id));", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "        invoice.enrichTaxResidency();", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "        return invoice;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_OV: InterviewAnswerChallenge = {
  id: "chl_ov_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_method_overriding_covariant",
  stageId: "stg_ov_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Silent Overload & Covariant Returns",
    ru: "Устный Ответ на Senior-Интервью: Тихая Перегрузка и Ковариантные Возвраты"
  },
  prompt: {
    en: "Corporate invoice enrichment never runs when services call findById through an InvoiceRepository reference, even though CorporateInvoiceRepository exists. Explain the root cause, JLS overriding rules including covariant returns and exception narrowing, and your production fix.",
    ru: "Corporate-обогащение счетов никогда не выполняется, когда сервисы вызывают findById через ссылку InvoiceRepository, хотя CorporateInvoiceRepository существует. Объясните корневую причину, правила переопределения JLS включая ковариантные возвраты и сужение исключений, и ваш продакшн-фикс."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
  topicIds: ["top_oop_15"],
  tags: ["#overriding", "#covariant-returns", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ov_invoice_01",
    rubricDimensions: ["ELEVATOR_PITCH", "JLS_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_method_overriding",
        label: { en: "Override vs Silent Overload", ru: "Override vs Тихая Перегрузка" },
        keywords: ["override", "overloading", "silent overload", "@Override", "override-equivalent", "переопределение", "перегрузка"]
      },
      {
        id: "cpt_covariant_returns",
        label: { en: "Covariant Return Types", ru: "Ковариантные Возвращаемые Типы" },
        keywords: ["covariant", "CorporateInvoice", "return type", "subtype", "ковариант", "возвращаемый тип"]
      },
      {
        id: "cpt_checked_exception_narrowing",
        label: { en: "Checked Exception Narrowing", ru: "Сужение Checked-Исключений" },
        keywords: ["checked exception", "throws", "narrower", "InvoiceNotFoundException", "broader", "исключени"]
      },
      {
        id: "cpt_polymorphic_dispatch",
        label: { en: "Polymorphic Dispatch via InvoiceRepository", ru: "Полиморфная Диспетчеризация через InvoiceRepository" },
        keywords: ["polymorphic", "InvoiceRepository", "invokevirtual", "runtime type", "полиморф", "диспетчеризац"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): CorporateInvoiceRepository declared findById(InvoiceKey) without @Override. That signature is not override-equivalent to InvoiceRepository.findById(String), so it is a silent overload. Polymorphic calls via InvoiceRepository still hit the parent method and skip corporate enrichment. Fix: @Override, matching String parameter, covariant CorporateInvoice return, no broader checked exceptions.",
      ru: "Elevator Pitch (30 сек): CorporateInvoiceRepository объявил findById(InvoiceKey) без @Override. Сигнатура не override-equivalent к InvoiceRepository.findById(String) — тихая перегрузка. Полиморфные вызовы через InvoiceRepository попадают в метод родителя и пропускают corporate-обогащение. Фикс: @Override, параметр String, ковариантный возврат CorporateInvoice, без более широких checked-исключений."
    },
    modelAnswerDetailed: {
      en: "Deep JLS Mechanics (60 sec): JLS 8.4.8 requires override-equivalent names and parameters. Return types may be covariant — CorporateInvoice subtype of Invoice. Access cannot narrow. Checked exceptions may only be the same, fewer, or subtypes — throws Exception is illegal when the parent declares InvoiceNotFoundException. @Override (Effective Java Item 40) turns signature mistakes into compile errors. The compiler also emits a bridge method returning Invoice for binary compatibility.",
      ru: "Глубокая Механика JLS (60 сек): JLS 8.4.8 требует override-equivalent имена и параметры. Возвращаемые типы могут быть ковариантными — CorporateInvoice подтип Invoice. Видимость нельзя сужать. Checked-исключения — только те же, меньше или подтипы; throws Exception незаконен при InvoiceNotFoundException у родителя. @Override (Effective Java Item 40) превращает ошибки сигнатуры в ошибки компиляции. Компилятор также генерирует bridge-метод с возвратом Invoice для бинарной совместимости."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Covariant repository inheritance gives subclass-typed callers CorporateInvoice without casts, but couples enrichment to the base API and invites silent overloads if @Override is omitted. Senior alternative: keep InvoiceRepository returning Invoice and expose an explicit CorporateInvoiceLookup port — clearer intent, no override traps, slightly more API surface.",
      ru: "Продакшн Компромиссы (30 сек): Ковариантное наследование репозитория даёт вызывающим с типом подкласса CorporateInvoice без кастов, но связывает обогащение с базовым API и провоцирует тихие перегрузки без @Override. Senior-альтернатива: оставить InvoiceRepository с Invoice и вынести явный порт CorporateInvoiceLookup — яснее намерение, нет ловушек override, чуть больше поверхности API."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If we add @Override but keep throws Exception, does the code compile?'",
      ru: "Доп. Вопрос Интервьюера: 'Если добавить @Override, но оставить throws Exception, код скомпилируется?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: No. Once the signature matches and @Override applies, javac enforces exception rules — broader checked exceptions than InvoiceNotFoundException are a compile-time error. You must narrow to InvoiceNotFoundException (or a subtype) or declare none.",
      ru: "Ответ на Доп. Вопрос: Нет. Как только сигнатура совпадает и применяется @Override, javac применяет правила исключений — более широкие checked-исключения, чем InvoiceNotFoundException, дают ошибку компиляции. Нужно сузить до InvoiceNotFoundException (или подтипа) либо не объявлять."
    }
  }
};

export const ALL_OVERRIDING_COVARIANT_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_OV,
  APPLIED_BUG_HUNT_CHALLENGE_OV,
  INTERVIEW_ANSWER_CHALLENGE_OV
];
