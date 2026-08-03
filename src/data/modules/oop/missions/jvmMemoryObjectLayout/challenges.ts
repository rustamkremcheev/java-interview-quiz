import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_JOL: FixBuilderChallenge = {
  id: "chl_jol_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_jvm_memory_object_layout",
  stageId: "stg_jol_practice",
  title: {
    en: "Fix Builder: PositionCache Layout & Capacity",
    ru: "Конструктор Исправления: Layout и Ёмкость PositionCache"
  },
  prompt: {
    en: "PositionCache was sized from PositionSnapshot field widths only. Select ALL structural fixes for a production-safe high-volume cache.",
    ru: "PositionCache оценили только по ширинам полей PositionSnapshot. Выберите ВСЕ структурные исправления для продакшн-безопасного high-volume кэша."
  },
  difficulty: "STAFF",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_object_header", "cpt_compressed_oops", "cpt_shallow_vs_retained_size"],
  topicIds: ["top_oop_37"],
  tags: ["#object-header", "#jol", "#position-cache"],
  hintIds: ["hnt_jol_1", "hnt_jol_2", "hnt_jol_3", "hnt_jol_4"],
  xpReward: 120,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_jol_snapshot_bloated",
    solutionCodeArtifactId: "art_jol_cache_solution",
    options: [
      {
        id: "opt_jol_fix_1",
        text: {
          en: "Prefer a flatter PortfolioPosition / PositionSnapshot with primitive fields (long/double) instead of boxed Long/Double.",
          ru: "Предпочитать более плоский PortfolioPosition / PositionSnapshot с примитивными полями (long/double) вместо boxed Long/Double."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Boxing creates extra header-bearing objects per value.",
          ru: "Верно. Boxing создаёт лишние объекты с заголовками на каждое значение."
        }
      },
      {
        id: "opt_jol_fix_2",
        text: {
          en: "Size PositionCache from JOL-measured shallow/retained footprint × entries + map overhead — not field-byte slogans.",
          ru: "Оценивать PositionCache от измеренного JOL shallow/retained footprint × записи + overhead map — не от слоганов байт полей."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Measurement beats naive arithmetic.",
          ru: "Верно. Измерение побеждает наивную арифметику."
        }
      },
      {
        id: "opt_jol_fix_3",
        text: {
          en: "Account for nested RiskBucket graphs in retained size when estimating heap for PositionKey → snapshot maps.",
          ru: "Учитывать вложенные графы RiskBucket в retained size при оценке кучи для map PositionKey → snapshot."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Retained size dominates when lists hang off each snapshot.",
          ru: "Верно. Retained size доминирует, когда от каждого snapshot висят списки."
        }
      },
      {
        id: "opt_jol_fix_wrong_1",
        text: {
          en: "Assume every JVM object header is a fixed universal 12 bytes and multiply fields by that constant.",
          ru: "Считать заголовок каждого объекта JVM фиксированными универсальными 12 байтами и умножать поля на эту константу."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Header size is configuration-dependent — never claim a universal constant.",
          ru: "Неверно. Размер заголовка зависит от конфигурации — не утверждайте универсальную константу."
        }
      },
      {
        id: "opt_jol_fix_wrong_2",
        text: {
          en: "Switch PositionSnapshot to a record and treat it as a zero-overhead C-like struct.",
          ru: "Сделать PositionSnapshot record и считать его zero-overhead C-подобной структурой."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Records are still heap objects with identity/metadata overhead.",
          ru: "Неверно. Records всё ещё объекты в куче с overhead identity/metadata."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_JOL: BugHuntChallenge = {
  id: "chl_jol_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_jvm_memory_object_layout",
  stageId: "stg_jol_debug",
  title: {
    en: "Bug Hunt: Field-Only Capacity Math",
    ru: "Поиск Бага: Ёмкость Только по Полям"
  },
  prompt: {
    en: "Click the defect lines: boxed snapshot fields, field-only BYTES_PER_ENTRY, and capacity from that underestimate.",
    ru: "Нажмите строки дефекта: boxed-поля snapshot, BYTES_PER_ENTRY только по полям и ёмкость из этой заниженной оценки."
  },
  difficulty: "STAFF",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_shallow_vs_retained_size", "cpt_object_header"],
  topicIds: ["top_oop_37"],
  tags: ["#bug-hunt", "#capacity"],
  hintIds: ["hnt_jol_bug_1", "hnt_jol_bug_2", "hnt_jol_bug_3"],
  xpReward: 120,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_jol_cache_bughunt",
    solutionCodeArtifactId: "art_jol_cache_solution",
    codeSnippet: `public final class PositionSnapshot {
    private final Long quantity; // Line 2 — boxed
    private final Double px;
    private final List<RiskBucket> buckets;
    // ...
}
public final class PositionCachePlanner {
    // BUG: field widths only — ignores headers/alignment/boxing/retained
    static final int BYTES_PER_ENTRY = 8 + 8; // Line 9
    static int maxEntries(long heapBytes) {
        return (int) (heapBytes / BYTES_PER_ENTRY); // Line 11
    }
}`,
    lines: [
      { lineNumber: 1, code: "public final class PositionSnapshot {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    private final Long quantity; // boxed",
        isBug: true,
        explanation: {
          en: "Line 2: Boxed Long allocates a separate heap object — field width math misses it.",
          ru: "Строка 2: Boxed Long аллоцирует отдельный объект в куче — математика ширины поля это пропускает."
        }
      },
      { lineNumber: 3, code: "    private final Double px;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    private final List<RiskBucket> buckets;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    // ...", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "public final class PositionCachePlanner {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "    // BUG: field widths only — ignores headers/alignment/boxing/retained", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 9,
        code: "    static final int BYTES_PER_ENTRY = 8 + 8;",
        isBug: true,
        explanation: {
          en: "Line 9: Field-only constant ignores headers, padding, boxes, RiskBucket retained graph, map nodes.",
          ru: "Строка 9: Константа только по полям игнорирует headers, padding, boxes, retained граф RiskBucket, узлы map."
        }
      },
      { lineNumber: 10, code: "    static int maxEntries(long heapBytes) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "        return (int) (heapBytes / BYTES_PER_ENTRY);",
        isBug: true,
        explanation: {
          en: "Line 11: Capacity from the underestimate — the 40 GB surprise.",
          ru: "Строка 11: Ёмкость из заниженной оценки — сюрприз 40 GB."
        }
      },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_JOL: InterviewAnswerChallenge = {
  id: "chl_jol_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_jvm_memory_object_layout",
  stageId: "stg_jol_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Object Layout & Cache Footprint",
    ru: "Устный Ответ на Senior-Интервью: Object Layout и Footprint Кэша"
  },
  prompt: {
    en: "PositionCache estimated ~8 GB from field sizes but used 40 GB+. Explain headers/alignment/boxing/retained size carefully and your fix. Do not claim a fixed universal header size.",
    ru: "PositionCache оценили ~8 GB по размерам полей, а использовали 40 GB+. Аккуратно объясните headers/alignment/boxing/retained size и ваш фикс. Не утверждайте фиксированный универсальный размер заголовка."
  },
  difficulty: "STAFF",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_object_header", "cpt_compressed_oops", "cpt_shallow_vs_retained_size"],
  topicIds: ["top_oop_37"],
  tags: ["#interview", "#jol"],
  hintIds: [],
  xpReward: 180,
  order: 9,
  payload: {
    targetQuestionId: "q_jol_cache_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_object_header",
        label: { en: "Object Header", ru: "Object Header" },
        keywords: ["header", "mark", "klass", "alignment", "заголов", "mark", "klass", "alignment"]
      },
      {
        id: "cpt_compressed_oops",
        label: { en: "Compressed Oops", ru: "Compressed Oops" },
        keywords: ["compressed oops", "compressed", "HotSpot", "сжат", "compressed oops", "HotSpot"]
      },
      {
        id: "cpt_shallow_vs_retained_size",
        label: { en: "Shallow vs Retained", ru: "Shallow vs Retained" },
        keywords: ["shallow", "retained", "boxing", "JOL", "shallow", "retained", "boxing", "JOL"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (~30s): We sized PositionCache from field widths. On a common 64-bit HotSpot config with compressed oops/class pointers, each PositionSnapshot still has mark/klass metadata and alignment — not a universal fixed header. Boxing and RiskBucket lists blew retained size. Fix: flatter primitives, measure with JOL, size from retained footprint + map overhead.",
      ru: "Elevator Pitch (~30с): Мы оценили PositionCache по ширинам полей. На типичной 64-bit конфигурации HotSpot с compressed oops/class pointers каждый PositionSnapshot всё ещё имеет mark/klass metadata и alignment — не универсальный фиксированный заголовок. Boxing и списки RiskBucket взорвали retained size. Фикс: более плоские примитивы, измерение JOL, размер от retained footprint + overhead map."
    },
    modelAnswerDetailed: {
      en: "Mechanics (~40s): JLS defines objects with identity; HotSpot lays them out; JOL measures the running JVM. Shallow size ≠ retained size. Long/Double fields are objects. Records do not erase overhead. Compressed oops change reference density on eligible heaps — still measure, don't invent constants.",
      ru: "Механика (~40с): JLS определяет объекты с identity; HotSpot раскладывает их; JOL измеряет работающую JVM. Shallow size ≠ retained size. Поля Long/Double — объекты. Records не стирают overhead. Compressed oops меняют плотность ссылок на подходящих кучах — всё равно измеряйте, не изобретайте константы."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (~20s): Flattening costs readability/nullability. Off-heap is a later lever. Huge heaps may disable compressed oops and enlarge references — re-measure. Capacity gates should fail closed when JOL samples disagree with slogans.",
      ru: "Продакшн Компромиссы (~20с): Flattening стоит читаемости/nullability. Off-heap — следующий рычаг. Огромные кучи могут отключить compressed oops и увеличить ссылки — переизмерьте. Capacity gates должны fail closed, когда sample JOL расходятся со слоганами."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'So the header is 12 bytes, right?'",
      ru: "Доп. Вопрос: 'Значит заголовок 12 байт, верно?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: I won't claim a fixed universal size. On many 64-bit HotSpot setups with compressed oops/class pointers people observe compact headers, but version and flags matter. I'd run JOL internals on our build and quote that measurement.",
      ru: "Ответ на Доп. Вопрос: Я не буду утверждать фиксированный универсальный размер. На многих 64-bit сетапах HotSpot с compressed oops/class pointers наблюдают компактные заголовки, но важны версия и флаги. Я запущу JOL internals на нашем билде и процитирую это измерение."
    }
  }
};

export const ALL_JVM_MEMORY_OBJECT_LAYOUT_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_JOL,
  APPLIED_BUG_HUNT_CHALLENGE_JOL,
  INTERVIEW_ANSWER_CHALLENGE_JOL
];
