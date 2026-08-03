import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_INH: FixBuilderChallenge = {
  id: "chl_inh_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_inheritance",
  stageId: "stg_inh_practice",
  title: {
    en: "Fix Builder: Seal/Document BaseRegulatoryReport Extension Points",
    ru: "Конструктор Исправления: Seal/Документация Точек Расширения BaseRegulatoryReport"
  },
  prompt: {
    en: "LiquidityReport / RiskExposureReport / CapitalAdequacyReport silently filed wrong headers and double-serialized sections after BaseRegulatoryReport protected semantics changed. Select ALL structural building blocks for a production-safe inheritance fix focused on constructor-safe contracts and documented/sealed extension points (composition only as an optional trade-off).",
    ru: "LiquidityReport / RiskExposureReport / CapitalAdequacyReport молча сдали неверные заголовки и дважды сериализованные секции после смены protected-семантики BaseRegulatoryReport. Выберите ВСЕ элементы продакшн-безопасного фикса наследования: безопасные для конструктора контракты и документированные/sealed точки расширения (композиция только как опциональный компромисс)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
  topicIds: ["top_oop_10"],
  tags: ["#inheritance", "#inherited-state", "#regulatory-report"],
  hintIds: ["hnt_inh_1", "hnt_inh_2", "hnt_inh_3", "hnt_inh_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_inh_report_broken",
    solutionCodeArtifactId: "art_inh_report_solution",
    options: [
      {
        id: "opt_inh_fix_1",
        text: {
          en: "Pass header metadata (report code + headerVersion) into the BaseRegulatoryReport constructor so writeRegulatoryHeader runs with final values — no post-super mutation of inherited state.",
          ru: "Передавать метаданные заголовка (код отчёта + headerVersion) в конструктор BaseRegulatoryReport, чтобы writeRegulatoryHeader выполнялся с финальными значениями — без мутации унаследованного состояния после super."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Constructor chaining requires header-critical inherited state to be available during super().",
          ru: "Верно. Цепочка конструкторов требует, чтобы filing-критичное унаследованное состояние было доступно во время super()."
        }
      },
      {
        id: "opt_inh_fix_2",
        text: {
          en: "Document and seal extension points: final filing skeleton, @implSpec on protected hooks, and a single clear owner of section encoding (subclass must not pre-encode if base encodes).",
          ru: "Документировать и запечатать точки расширения: final-скелет filing, @implSpec на protected-хуках и один ясный владелец encoding секций (подкласс не должен pre-encode, если кодирует база)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Item 19: design/document for inheritance or prohibit accidental coupling to protected internals.",
          ru: "Верно. Item 19: проектируйте/документируйте для наследования или запретите случайную связность с protected-внутренностями."
        }
      },
      {
        id: "opt_inh_fix_3",
        text: {
          en: "Keep mutating this.headerVersion after super(...) and add Thread.sleep so the base rewrites the header asynchronously.",
          ru: "Продолжать мутировать this.headerVersion после super(...) и добавить Thread.sleep, чтобы база асинхронно переписала заголовок."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Timing tricks do not fix constructor-order coupling to inherited state.",
          ru: "Неверно. Трюки с таймингом не чинят связность унаследованного состояния из-за порядка конструкторов."
        }
      },
      {
        id: "opt_inh_fix_4",
        text: {
          en: "As a trade-off when IS-A was never designed: extract RegulatoryFilingAssembler / HeaderFormatter collaborators and stop subclassing an undesigned concrete base for mere formatting reuse.",
          ru: "Как компромисс, когда IS-A никогда не проектировали: вынести коллабораторы RegulatoryFilingAssembler / HeaderFormatter и прекратить subclassing неспроектированного concrete base ради reuse форматирования."
        },
        isCorrect: true,
        explanation: {
          en: "Correct as a trade-off path — composition for assembly when inheritance was undesigned — not the only narrative, but a valid structural option.",
          ru: "Верно как путь-компромисс — композиция сборки, когда наследование не проектировали — не единственный сюжет, но валидный структурный вариант."
        }
      },
      {
        id: "opt_inh_fix_distractor_1",
        text: {
          en: "Replace all report subclasses with one giant switch on report type inside BaseRegulatoryReport.renderFiling().",
          ru: "Заменить все подклассы отчётов одним гигантским switch по типу отчёта внутри BaseRegulatoryReport.renderFiling()."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. A central switch recreates OCP pain and ignores inheritance contract design.",
          ru: "Неверно. Центральный switch возвращает боль OCP и игнорирует дизайн контракта наследования."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_INH: BugHuntChallenge = {
  id: "chl_inh_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_inheritance",
  stageId: "stg_inh_debug",
  title: {
    en: "Bug Hunt: Late headerVersion Mutation & Double-Serialized LCR",
    ru: "Поиск Бага: Поздняя Мутация headerVersion и Дважды Сериализованный LCR"
  },
  prompt: {
    en: "LiquidityReport still couples to BaseRegulatoryReport protected internals. After the platform upgrade, filings show the wrong header version and double-encoded LCR sections. Click the line(s) responsible.",
    ru: "LiquidityReport всё ещё связан с protected-внутренностями BaseRegulatoryReport. После апгрейда платформы filings показывают неверную версию заголовка и дважды закодированные секции LCR. Нажмите ответственные строку(и)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
  topicIds: ["top_oop_10"],
  tags: ["#inheritance", "#bug-hunt", "#inherited-state"],
  hintIds: ["hnt_inh_bug_1", "hnt_inh_bug_2", "hnt_inh_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_inh_report_bughunt",
    solutionCodeArtifactId: "art_inh_report_solution",
    codeSnippet: `public class LiquidityReport extends BaseRegulatoryReport {
    public LiquidityReport(String lcrJson) {
        super("LIQUIDITY"); // Line 3 — base writes header with current headerVersion
        this.headerVersion = "LIQ-EXT-1"; // Line 4 — TOO LATE
        String encoded = Base64.getEncoder()
                .encodeToString(lcrJson.getBytes(StandardCharsets.UTF_8)); // Line 6
        appendSection("LCR", encoded); // Line 7 — base also encodes now
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class LiquidityReport extends BaseRegulatoryReport {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    public LiquidityReport(String lcrJson) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 3,
        code: "        super(\"LIQUIDITY\");",
        isBug: false,
        explanation: { en: "Not the defect line.", ru: "Не строка дефекта." }
      },
      {
        lineNumber: 4,
        code: "        this.headerVersion = \"LIQ-EXT-1\";",
        isBug: true,
        explanation: {
          en: "Line 4: Mutates inherited headerVersion AFTER super() already wrote the regulatory header with the base default — silent wrong header version.",
          ru: "Строка 4: Мутирует унаследованный headerVersion ПОСЛЕ того, как super() уже записал регуляторный заголовок с default базы — тихая неверная версия заголовка."
        }
      },
      { lineNumber: 5, code: "        String encoded = Base64.getEncoder()", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 6,
        code: "                .encodeToString(lcrJson.getBytes(StandardCharsets.UTF_8));",
        isBug: true,
        explanation: {
          en: "Line 6: Subclass pre-encodes the payload assuming appendSection concatenates raw strings — platform now encodes inside appendSection.",
          ru: "Строка 6: Подкласс заранее кодирует payload, предполагая, что appendSection конкатенирует raw-строки — платформа теперь кодирует внутри appendSection."
        }
      },
      {
        lineNumber: 7,
        code: "        appendSection(\"LCR\", encoded);",
        isBug: true,
        explanation: {
          en: "Line 7: Passes already-encoded bytes into appendSection which also Base64-wraps — double-serialized LCR section in the filing.",
          ru: "Строка 7: Передаёт уже закодированные байты в appendSection, который тоже Base64-оборачивает — дважды сериализованная секция LCR в filing."
        }
      },
      { lineNumber: 8, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_INH: InterviewAnswerChallenge = {
  id: "chl_inh_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_inheritance",
  stageId: "stg_inh_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: BaseRegulatoryReport Inheritance Risks",
    ru: "Устный Ответ на Senior-Интервью: Риски Наследования BaseRegulatoryReport"
  },
  prompt: {
    en: "After a BaseRegulatoryReport platform upgrade, LiquidityReport, RiskExposureReport, and CapitalAdequacyReport silently produced wrong header versions and double-serialized sections. Explain inheritance mechanics (IS-A, constructor order, protected coupling) and your production approach (document/seal extension points; composition only as trade-off).",
    ru: "После апгрейда платформы BaseRegulatoryReport LiquidityReport, RiskExposureReport и CapitalAdequacyReport молча выдали неверные версии заголовка и дважды сериализованные секции. Объясните механику наследования (IS-A, порядок конструкторов, protected-связность) и ваш продакшн-подход (документировать/запечатать точки расширения; композиция только как компромисс)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
  topicIds: ["top_oop_10"],
  tags: ["#inheritance", "#inherited-state", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_inh_report_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_inheritance",
        label: { en: "Inheritance / IS-A", ru: "Наследование / IS-A" },
        keywords: ["inheritance", "extends", "IS-A", "subclass", "superclass", "наследование", "подкласс", "суперкласс"]
      },
      {
        id: "cpt_inherited_state",
        label: { en: "Inherited Protected State", ru: "Унаследованное Protected-Состояние" },
        keywords: ["protected", "headerVersion", "inherited state", "constructor", "super", "унаследованное", "конструктор"]
      },
      {
        id: "cpt_fragile_base_class",
        label: { en: "Fragile / Brittle Base", ru: "Хрупкий Базовый Класс" },
        keywords: ["fragile", "brittle", "base class", "Item 19", "хрупк", "базов"]
      },
      {
        id: "cpt_item19_seal",
        label: { en: "Document or Seal Extension", ru: "Документировать или Запечатать Расширение" },
        keywords: ["document", "seal", "final", "@implSpec", "Item 19", "документир", "запечат"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): LiquidityReport and sibling reports extend BaseRegulatoryReport and coupled to undocumented protected headerVersion / appendSection semantics. Platform bumped the default version and made appendSection auto-encode — subclasses still compiled but filed wrong headers and double-serialized sections. Root cause is inheritance mechanics: constructor order + protected coupling — fix by designing/documenting or sealing extension points.",
      ru: "Elevator Pitch (30 сек): LiquidityReport и соседние отчёты extends BaseRegulatoryReport и связались с недокументированной семантикой protected headerVersion / appendSection. Платформа подняла default version и заставила appendSection авто-кодировать — подклассы компилировались, но сдали неверные заголовки и дважды сериализованные секции. Корень — механика наследования: порядок конструкторов + protected-связность — фикс через дизайн/документацию или seal точек расширения."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): IS-A means LiquidityReport is a BaseRegulatoryReport and inherits state/behavior. Construction calls super() first — base writeRegulatoryHeader snapshots headerVersion into the filing buffer. Assigning this.headerVersion afterward cannot rewrite that header. appendSection's encoding ownership was an undocumented behavioral contract; when the base started encoding, pre-encoded subclass payloads doubled. Compilers check signatures, not protected semantics — classic brittle base / inherited-state hazard (Effective Java Item 19).",
      ru: "Глубокая Механика (60 сек): IS-A значит LiquidityReport является BaseRegulatoryReport и наследует состояние/поведение. Конструирование сначала вызывает super() — база writeRegulatoryHeader фиксирует headerVersion в буфер filing. Позднее this.headerVersion не перепишет заголовок. Владение encoding в appendSection было недокументированным поведенческим контрактом; когда база начала кодировать, заранее закодированные payload подклассов удвоились. Компиляторы проверяют сигнатуры, не protected-семантику — классический brittle base / inherited-state (Effective Java Item 19)."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Prefer a designed inheritance surface — constructor args for header metadata, final skeleton, @implSpec hooks, golden filing tests. If the base was never designed for extension, seal/final it and use a RegulatoryFilingAssembler collaborator (composition as trade-off). Do not treat this as a decorator/counting rewrite — different domain, different lesson from composition-over-inheritance.",
      ru: "Продакшн Компромиссы (30 сек): Предпочитайте спроектированную поверхность наследования — args конструктора для метаданных заголовка, final-скелет, хуки @implSpec, golden filing тесты. Если base никогда не проектировали для расширения — seal/final и коллаборатор RegulatoryFilingAssembler (композиция как компромисс). Не трактовать как decorator/counting rewrite — другой домен, другой урок, чем composition-over-inheritance."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If we only add more unit tests on LiquidityReport, is that enough after this incident?'",
      ru: "Доп. Вопрос Интервьюера: 'Если добавить больше юнит-тестов на LiquidityReport — этого достаточно после инцидента?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Helpful but insufficient alone. You need contract-level protection: documented/sealed extension points and golden filing snapshots that fail when base protected semantics drift. Tests on one subclass do not stop RiskExposureReport / CapitalAdequacyReport from the same silent coupling, and they do not replace Item 19 design discipline on BaseRegulatoryReport itself.",
      ru: "Ответ на Доп. Вопрос: Полезно, но недостаточно. Нужна защита на уровне контракта: документированные/sealed точки расширения и golden snapshot filings, падающие при дрейфе protected-семантики базы. Тесты одного подкласса не спасают RiskExposureReport / CapitalAdequacyReport от той же тихой связности и не заменяют дисциплину Item 19 на самом BaseRegulatoryReport."
    }
  }
};

export const ALL_INHERITANCE_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_INH,
  APPLIED_BUG_HUNT_CHALLENGE_INH,
  INTERVIEW_ANSWER_CHALLENGE_INH
];
