import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_JVM_MEMORY_OBJECT_LAYOUT: TheoryArticle = {
  id: "art_theory_jvm_memory_object_layout",
  topicIds: ["top_oop_37"],
  conceptIds: ["cpt_object_header", "cpt_compressed_oops", "cpt_shallow_vs_retained_size"],
  title: {
    en: "Java Object Layout for PositionCache Capacity",
    ru: "Java Object Layout для Ёмкости PositionCache"
  },
  summary: {
    en: "Heap cost is headers + alignment + fields + reachable graph — not field widths alone. Measure with JOL on your HotSpot config; do not invent a universal header size.",
    ru: "Стоимость кучи — headers + alignment + поля + reachable graph, а не только ширины полей. Измеряйте JOL на вашей конфигурации HotSpot; не изобретайте универсальный размер заголовка."
  },
  sections: [
    {
      id: "sec_jol_definition",
      category: "DEFINITION",
      title: { en: "1. Layout Model (JLS vs HotSpot vs JOL)", ru: "1. Модель Layout (JLS vs HotSpot vs JOL)" },
      blocks: [
        {
          id: "blk_jol_def_1",
          type: "PARAGRAPH",
          content: {
            en: "The JLS describes objects as class instances with identity — not a wire layout. HotSpot chooses concrete in-memory layout. JOL inspects a running JVM via Unsafe/JVMTI/SA. Capacity planning that ignores this stack fails on PositionCache.",
            ru: "JLS описывает объекты как экземпляры классов с identity — не wire layout. HotSpot выбирает конкретный in-memory layout. JOL исследует работающую JVM через Unsafe/JVMTI/SA. Планирование ёмкости, игнорирующее этот стек, ломается на PositionCache."
          }
        },
        {
          id: "blk_jol_def_2",
          type: "CALLOUT",
          title: { en: "💡 No Universal Header Size", ru: "💡 Нет Универсального Размера Заголовка" },
          content: {
            en: "On a common 64-bit HotSpot configuration with compressed oops/class pointers, objects carry mark/klass metadata plus alignment — but exact header bytes depend on JVM version, flags, and features (e.g. compressed klass pointers). Never claim one fixed size for all JVMs.",
            ru: "На типичной 64-bit конфигурации HotSpot с compressed oops/class pointers объекты несут mark/klass metadata плюс alignment — но точные байты заголовка зависят от версии JVM, флагов и фич (например compressed klass pointers). Никогда не утверждайте один фиксированный размер для всех JVM."
          }
        }
      ]
    },
    {
      id: "sec_jol_mechanics",
      category: "MECHANICS",
      title: { en: "2. Headers, Compressed Oops, Boxing, Retained Size", ru: "2. Headers, Compressed Oops, Boxing, Retained Size" },
      blocks: [
        {
          id: "blk_jol_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Compressed oops can shrink reference fields on many heaps under ~32 GB, improving density — still not 'free structs'. Alignment/padding can add empty bytes between fields. Boxing (`Long`, `Double`) allocates separate objects. Records do not eliminate object overhead.",
            ru: "Compressed oops могут сжимать reference-поля на многих кучах до ~32 GB, повышая плотность — это всё ещё не «бесплатные структуры». Alignment/padding может добавить пустые байты между полями. Boxing (`Long`, `Double`) аллоцирует отдельные объекты. Records не устраняют object overhead."
          }
        },
        {
          id: "blk_jol_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Shallow ≠ Retained", ru: "⚙️ Shallow ≠ Retained" },
          content: {
            en: "Shallow size is the PositionSnapshot object itself. Retained size includes exclusive reachable RiskBucket lists and boxed leaves. Cache capacity must track retained footprint × entry count + map structures.",
            ru: "Shallow size — сам объект PositionSnapshot. Retained size включает exclusive reachable списки RiskBucket и boxed-листья. Ёмкость кэша должна учитывать retained footprint × число записей + структуры map."
          }
        },
        {
          id: "blk_jol_mech_3",
          type: "CALLOUT",
          title: { en: "💡 Measure, Then Flatten", ru: "💡 Измерьте, Затем Уплотните" },
          content: {
            en: "Use JOL `internals` / `footprint` on PositionSnapshot samples. Prefer primitive fields in PortfolioPosition / PositionKey where domain allows; avoid accidental boxing in hot caches.",
            ru: "Используйте JOL `internals` / `footprint` на sample PositionSnapshot. Предпочитайте примитивные поля в PortfolioPosition / PositionKey, где домен позволяет; избегайте случайного boxing в горячих кэшах."
          }
        }
      ]
    },
    {
      id: "sec_jol_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Capacity Trade-offs", ru: "3. Компромиссы Ёмкости" },
      blocks: [
        {
          id: "blk_jol_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Flatter primitives reduce GC pressure but can hurt readability and nullability. Off-heap / primitive maps are further steps with operational cost. Turning off compressed oops for huge heaps can enlarge references — measure the new layout.",
            ru: "Более плоские примитивы снижают давление GC, но могут бить по читаемости и nullability. Off-heap / primitive maps — следующий шаг с operational cost. Отключение compressed oops на огромных кучах может увеличить ссылки — измерьте новый layout."
          }
        }
      ]
    },
    {
      id: "sec_jol_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_jol_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Is object header always 12 bytes?' — Model Answer: No — configuration-dependent; phrase as common HotSpot compressed setups and measure.",
            ru: "Доп. Вопрос 1: 'Заголовок всегда 12 байт?' — Модельный Ответ: Нет — зависит от конфигурации; формулируйте через типичные compressed-сетапы HotSpot и измеряйте."
          }
        },
        {
          id: "blk_jol_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What do compressed oops change?' — Model Answer: Often shrink heap references/klass pointers on eligible heaps; layout math changes.",
            ru: "Доп. Вопрос 2: 'Что меняют compressed oops?' — Модельный Ответ: Часто сжимают heap references/klass pointers на подходящих кучах; математика layout меняется."
          }
        },
        {
          id: "blk_jol_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Shallow vs retained?' — Model Answer: Shallow is the object; retained includes exclusive reachable graph.",
            ru: "Доп. Вопрос 3: 'Shallow vs retained?' — Модельный Ответ: Shallow — объект; retained — exclusive reachable graph."
          }
        },
        {
          id: "blk_jol_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Do records remove headers?' — Model Answer: No — records are still heap objects with identity/metadata.",
            ru: "Доп. Вопрос 4: 'Records убирают headers?' — Модельный Ответ: Нет — records всё ещё объекты в куче с identity/metadata."
          }
        },
        {
          id: "blk_jol_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Why did field sums fail?' — Model Answer: Ignored headers, padding, boxing, and nested RiskBucket retained cost.",
            ru: "Доп. Вопрос 5: 'Почему провалилась сумма полей?' — Модельный Ответ: Игнорировали headers, padding, boxing и retained стоимость RiskBucket."
          }
        },
        {
          id: "blk_jol_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How do you measure?' — Model Answer: JOL internals/footprint on representative samples under the same JVM flags.",
            ru: "Доп. Вопрос 6: 'Как измерять?' — Модельный Ответ: JOL internals/footprint на представительных sample при тех же JVM flags."
          }
        },
        {
          id: "blk_jol_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Alignment impact?' — Model Answer: Padding can round object size up; field order can matter.",
            ru: "Доп. Вопрос 7: 'Влияние alignment?' — Модельный Ответ: Padding может округлить размер объекта вверх; порядок полей может иметь значение."
          }
        },
        {
          id: "blk_jol_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Map overhead?' — Model Answer: ConcurrentHashMap nodes/arrays dwarf a naive per-entry field sum — include them.",
            ru: "Доп. Вопрос 8: 'Overhead map?' — Модельный Ответ: Узлы/массивы ConcurrentHashMap затмевают наивную сумму полей — учитывайте их."
          }
        },
        {
          id: "blk_jol_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Primitive vs boxed Long in cache?' — Model Answer: Prefer long fields; Long boxes allocate separately and hurt retained size.",
            ru: "Доп. Вопрос 9: 'Primitive vs boxed Long в кэше?' — Модельный Ответ: Предпочитайте long; Long boxes аллоцируются отдельно и бьют по retained size."
          }
        },
        {
          id: "blk_jol_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'JLS vs HotSpot?' — Model Answer: JLS is language semantics; HotSpot is one implementation's layout engine.",
            ru: "Доп. Вопрос 10: 'JLS vs HotSpot?' — Модельный Ответ: JLS — семантика языка; HotSpot — layout-движок одной реализации."
          }
        },
        {
          id: "blk_jol_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'When off-heap?' — Model Answer: After flattening/on-heap wins plateau and ops accepts complexity.",
            ru: "Доп. Вопрос 11: 'Когда off-heap?' — Модельный Ответ: После плато выигрыша flattening/on-heap и когда ops принимает сложность."
          }
        },
        {
          id: "blk_jol_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How to phrase in interview?' — Model Answer: 'On a common 64-bit HotSpot config with compressed oops… measured with JOL…'",
            ru: "Доп. Вопрос 12: 'Как формулировать на интервью?' — Модельный Ответ: «На типичной 64-bit конфигурации HotSpot с compressed oops… измерено JOL…»"
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_class_vs_object"],
  sourceIds: ["src_jol_github", "src_jol_openjdk_project", "src_jol_compressed_oops", "src_jol_jls_objects", "src_jol_jvms"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#object-header", "#compressed-oops", "#shallow-vs-retained", "#jol"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_JVM_MEMORY_OBJECT_LAYOUT: readonly TheoryCheckpoint[] = [
  {
    id: "chk_jol_1",
    theoryArticleId: "art_theory_jvm_memory_object_layout",
    question: {
      en: "Why is 'object header is always N bytes' a weak claim?",
      ru: "Почему утверждение «заголовок объекта всегда N байт» слабо?"
    },
    explanation: {
      en: "Header layout depends on HotSpot version/flags (e.g. compressed oops/class pointers).",
      ru: "Layout заголовка зависит от версии/флагов HotSpot (например compressed oops/class pointers)."
    },
    options: [
      {
        id: "opt_jol1_a",
        text: { en: "Header size is configuration-dependent; measure on the target JVM.", ru: "Размер заголовка зависит от конфигурации; измеряйте на целевой JVM." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_jol1_b",
        text: { en: "The JLS mandates exactly 12-byte headers worldwide.", ru: "JLS предписывает ровно 12-байтные заголовки везде." },
        isCorrect: false,
        feedback: { en: "Incorrect — JLS does not fix HotSpot header bytes.", ru: "Неверно — JLS не фиксирует байты заголовка HotSpot." }
      },
      {
        id: "opt_jol1_c",
        text: { en: "Records remove headers entirely.", ru: "Records полностью убирают заголовки." },
        isCorrect: false,
        feedback: { en: "Incorrect — records are still heap objects.", ru: "Неверно — records всё ещё объекты в куче." }
      }
    ],
    order: 1
  },
  {
    id: "chk_jol_2",
    theoryArticleId: "art_theory_jvm_memory_object_layout",
    question: {
      en: "What does retained size include beyond PositionSnapshot's own fields?",
      ru: "Что включает retained size сверх собственных полей PositionSnapshot?"
    },
    explanation: {
      en: "Exclusive reachable objects such as nested RiskBucket graphs and boxed leaves.",
      ru: "Exclusive reachable объекты вроде вложенных графов RiskBucket и boxed-листьев."
    },
    options: [
      {
        id: "opt_jol2_a",
        text: { en: "The exclusive reachable object graph from that entry.", ru: "Exclusive reachable object graph от этой записи." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_jol2_b",
        text: { en: "Only the sum of primitive field widths.", ru: "Только сумму ширин примитивных полей." },
        isCorrect: false,
        feedback: { en: "Incorrect — that is naive shallow field math.", ru: "Неверно — это наивная shallow-математика полей." }
      },
      {
        id: "opt_jol2_c",
        text: { en: "Only Metaspace class bytecode size.", ru: "Только размер bytecode класса в Metaspace." },
        isCorrect: false,
        feedback: { en: "Incorrect — retained size is about the instance graph.", ru: "Неверно — retained size про граф экземпляра." }
      }
    ],
    order: 2
  },
  {
    id: "chk_jol_3",
    theoryArticleId: "art_theory_jvm_memory_object_layout",
    question: {
      en: "How should you phrase layout claims in an interview?",
      ru: "Как формулировать утверждения о layout на интервью?"
    },
    explanation: {
      en: "Scope to a common HotSpot config and cite measurement (JOL), not universal constants.",
      ru: "Ограничьте типичной конфигурацией HotSpot и ссылайтесь на измерение (JOL), не на универсальные константы."
    },
    options: [
      {
        id: "opt_jol3_a",
        text: { en: "On a common 64-bit HotSpot config with compressed oops… measured with JOL…", ru: "На типичной 64-bit конфигурации HotSpot с compressed oops… измерено JOL…" },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_jol3_b",
        text: { en: "Every JVM everywhere uses identical 16-byte headers.", ru: "Каждая JVM везде использует идентичные 16-байтные заголовки." },
        isCorrect: false,
        feedback: { en: "Incorrect — overconfident and often wrong.", ru: "Неверно — излишне уверенно и часто ошибочно." }
      },
      {
        id: "opt_jol3_c",
        text: { en: "Ignore HotSpot; trust only field sizes from the IDE.", ru: "Игнорировать HotSpot; верить только размерам полей из IDE." },
        isCorrect: false,
        feedback: { en: "Incorrect — that caused the 40 GB surprise.", ru: "Неверно — именно это дало сюрприз 40 GB." }
      }
    ],
    order: 3
  },
  {
    id: "chk_jol_4",
    theoryArticleId: "art_theory_jvm_memory_object_layout",
    question: {
      en: "Why can boxing explode PositionCache memory?",
      ru: "Почему boxing может взорвать память PositionCache?"
    },
    explanation: {
      en: "Each Long/Double is a separate heap object with its own header/alignment cost.",
      ru: "Каждый Long/Double — отдельный объект в куче со своей стоимостью header/alignment."
    },
    options: [
      {
        id: "opt_jol4_a",
        text: { en: "Boxed numbers become extra objects beyond the snapshot fields.", ru: "Boxed-числа становятся лишними объектами сверх полей snapshot." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_jol4_b",
        text: { en: "Boxing compresses oops automatically to zero cost.", ru: "Boxing автоматически сжимает oops до нулевой стоимости." },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_jol4_c",
        text: { en: "Boxing lives only on the stack.", ru: "Boxing живёт только на стеке." },
        isCorrect: false,
        feedback: { en: "Incorrect — cached boxes live on the heap.", ru: "Неверно — закэшированные boxes живут в куче." }
      }
    ],
    order: 4
  },
  {
    id: "chk_jol_5",
    theoryArticleId: "art_theory_jvm_memory_object_layout",
    question: {
      en: "What roles do JLS, HotSpot, and JOL play?",
      ru: "Какие роли у JLS, HotSpot и JOL?"
    },
    explanation: {
      en: "JLS = language semantics; HotSpot = layout implementation; JOL = measurement toolbox.",
      ru: "JLS = семантика языка; HotSpot = реализация layout; JOL = toolbox измерений."
    },
    options: [
      {
        id: "opt_jol5_a",
        text: { en: "JLS semantics, HotSpot layout engine, JOL measurement.", ru: "Семантика JLS, layout-движок HotSpot, измерение JOL." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_jol5_b",
        text: { en: "All three are identical synonyms for bytecode.", ru: "Все три — синонимы bytecode." },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_jol5_c",
        text: { en: "JOL replaces the need for HotSpot entirely.", ru: "JOL полностью заменяет необходимость HotSpot." },
        isCorrect: false,
        feedback: { en: "Incorrect — JOL measures a JVM, it is not the runtime.", ru: "Неверно — JOL измеряет JVM, это не runtime." }
      }
    ],
    order: 5
  }
];
