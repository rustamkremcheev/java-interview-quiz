import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_CLASSES_OBJECTS: TheoryArticle = {
  id: "art_theory_classes_objects",
  topicIds: ["top_oop_02"],
  conceptIds: ["cpt_class_vs_object", "cpt_object_reference", "cpt_independent_instances"],
  title: {
    en: "Classes, Objects, and References in Payment Import",
    ru: "Классы, Объекты и Ссылки в Payment Import"
  },
  summary: {
    en: "A class is a blueprint; an object is a heap instance with identity; variables hold references. Reusing one mutable PaymentInstruction across PaymentBatch entries aliases the same object — every slot reflects the last mutation.",
    ru: "Класс — чертёж; объект — экземпляр в куче с идентичностью; переменные хранят ссылки. Переиспользование одного мутабельного PaymentInstruction в PaymentBatch алиасит один объект — каждый слот отражает последнюю мутацию."
  },
  sections: [
    {
      id: "sec_co_definition",
      category: "DEFINITION",
      title: { en: "1. Class vs Object vs Reference", ru: "1. Class vs Object vs Reference" },
      blocks: [
        {
          id: "blk_co_def_1",
          type: "PARAGRAPH",
          content: {
            en: "PaymentInstruction is a class: fields and methods describing payment import rows. `new PaymentInstruction(...)` (or a factory) allocates a distinct object on the heap with its own identity. A local variable `draft` holds a reference to that object — not a deep copy of its fields. When PaymentImporter mutates `draft` and stores the reference in a list, the list does not snapshot values; it stores the pointer.",
            ru: "PaymentInstruction — класс: поля и методы, описывающие строки импорта. `new PaymentInstruction(...)` (или factory) выделяет отдельный объект в куче со своей идентичностью. Локальная переменная `draft` хранит ссылку на этот объект — не глубокую копию полей. Когда PaymentImporter мутирует `draft` и кладёт ссылку в список, список не снимает snapshot значений; он хранит указатель."
          }
        },
        {
          id: "blk_co_def_2",
          type: "CALLOUT",
          title: { en: "💡 Mental Model: N Adds ≠ N Objects", ru: "💡 Ментальная Модель: N Add ≠ N Объектов" },
          content: {
            en: "Calling `batch.add(draft)` N times with the same reference creates N list slots and one object. Debugging 'why are all rows equal?' without asking 'how many objects exist?' misses the failure mode.",
            ru: "Вызов `batch.add(draft)` N раз с одной ссылкой создаёт N слотов списка и один объект. Отладка «почему все строки равны?» без вопроса «сколько объектов существует?» пропускает failure mode."
          }
        }
      ]
    },
    {
      id: "sec_co_mechanics",
      category: "MECHANICS",
      title: { en: "2. Alias Mutation & Independent Instances", ru: "2. Мутация через Alias и Независимые Экземпляры" },
      blocks: [
        {
          id: "blk_co_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "After `batch.add(draft)`, further `draft.setAmount(...)` updates the single heap object. Every prior list entry still points there, so historical rows rewrite themselves. The fix is not 'clone the batch for audit' first — create an independent PaymentInstruction per CSV row via PaymentInstructionFactory (or `new`) before add. Shallow copies of a draft that still share nested mutable fields can reproduce the same bug class.",
            ru: "После `batch.add(draft)` дальнейший `draft.setAmount(...)` обновляет единственный объект в куче. Все предыдущие элементы списка всё ещё указывают туда, поэтому исторические строки переписывают сами себя. Фикс — не «клонировать батч для аудита» в первую очередь, а создавать независимый PaymentInstruction на CSV-строку через PaymentInstructionFactory (или `new`) до add. Shallow copy draft с общими nested mutable полями может воспроизвести тот же класс багов."
          }
        },
        {
          id: "blk_co_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Object Identity Matters in Retries", ru: "⚙️ Идентичность Объекта Важна при Retry" },
          content: {
            en: "Retries that re-walk the corrupted PaymentBatch re-post the last-row identity N times. Independent instances with distinct PaymentId values make audit and idempotency keys meaningful.",
            ru: "Retry, снова обходящий испорченный PaymentBatch, повторно проводит identity последней строки N раз. Независимые экземпляры с разными PaymentId делают аудит и ключи идемпотентности осмысленными."
          }
        }
      ]
    },
    {
      id: "sec_co_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Object Creation Cost vs Correctness", ru: "3. Компромиссы: Цена Создания vs Корректность" },
      blocks: [
        {
          id: "blk_co_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Allocating one object per row has a real GC cost on huge imports — but far cheaper than wrong settlements. Object pooling of mutable drafts is an advanced optimization that must reset identity carefully; premature pooling is how this incident happens. Prefer immutable PaymentInstruction after build so accidental reuse cannot rewrite stored rows.",
            ru: "Аллокация одного объекта на строку имеет реальную цену GC на огромных импортах — но гораздо дешевле неверных проводок. Object pooling мутабельных draft — продвинутая оптимизация, требующая аккуратного сброса identity; преждевременный pooling и есть этот инцидент. Предпочитайте immutable PaymentInstruction после сборки, чтобы случайный reuse не переписывал сохранённые строки."
          }
        }
      ]
    },
    {
      id: "sec_co_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_co_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Class vs object?' — Model Answer: Class is the blueprint; object is a runtime heap instance.",
            ru: "Доп. Вопрос 1: 'Class vs object?' — Модельный Ответ: Class — чертёж; object — runtime-экземпляр в куче."
          }
        },
        {
          id: "blk_co_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Can two references point to the same object?' — Model Answer: Yes — that is aliasing; mutations are visible through every reference.",
            ru: "Доп. Вопрос 2: 'Могут ли две ссылки указывать на один объект?' — Модельный Ответ: Да — это aliasing; мутации видны через каждую ссылку."
          }
        },
        {
          id: "blk_co_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What happens when the shared object is mutated?' — Model Answer: All aliases observe the new state — batch history rewrites.",
            ru: "Доп. Вопрос 3: 'Что происходит при мутации shared-объекта?' — Модельный Ответ: Все aliases видят новое состояние — история батча переписывается."
          }
        },
        {
          id: "blk_co_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why is object identity important?' — Model Answer: Business records need distinct instances/PaymentIds for audit and retries.",
            ru: "Доп. Вопрос 4: 'Почему важна идентичность объекта?' — Модельный Ответ: Бизнес-записям нужны разные экземпляры/PaymentId для аудита и retry."
          }
        },
        {
          id: "blk_co_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'How do shallow copies create production bugs?' — Model Answer: They may still share nested mutable state or reuse the outer draft pattern.",
            ru: "Доп. Вопрос 5: 'Как shallow copy создаёт продакшн-баги?' — Модельный Ответ: Они могут делить nested mutable state или повторять паттерн reuse draft."
          }
        },
        {
          id: "blk_co_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Is Arrays.asList(draft,draft) two payments?' — Model Answer: Two slots, one object — same failure class.",
            ru: "Доп. Вопрос 6: 'Arrays.asList(draft,draft) — два платежа?' — Модельный Ответ: Два слота, один объект — тот же класс сбоя."
          }
        },
        {
          id: "blk_co_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Where should creation live?' — Model Answer: Factory/new per row inside the importer loop, not a field reused across rows.",
            ru: "Доп. Вопрос 7: 'Где должна жить creation?' — Модельный Ответ: Factory/new на строку в цикле importer, не поле на все строки."
          }
        },
        {
          id: "blk_co_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Value types vs references in Java?' — Model Answer: Object variables are references; mutating fields changes the shared heap object.",
            ru: "Доп. Вопрос 8: 'Value types vs references в Java?' — Модельный Ответ: Переменные объектов — ссылки; мутация полей меняет общий объект в куче."
          }
        },
        {
          id: "blk_co_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Would immutability help?' — Model Answer: Yes — after build, reuse cannot silently rewrite prior batch entries.",
            ru: "Доп. Вопрос 9: 'Поможет ли immutability?' — Модельный Ответ: Да — после сборки reuse не сможет тихо переписать прошлые записи батча."
          }
        },
        {
          id: "blk_co_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How would you detect this in review?' — Model Answer: Look for a mutable field outside the loop added repeatedly to a collection.",
            ru: "Доп. Вопрос 10: 'Как поймать на ревью?' — Модельный Ответ: Ищите мутабельное поле вне цикла, многократно добавляемое в коллекцию."
          }
        },
        {
          id: "blk_co_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Does equals fix this?' — Model Answer: No — this is identity/lifecycle of instances, not equality contracts.",
            ru: "Доп. Вопрос 11: 'Починит ли equals?' — Модельный Ответ: Нет — это identity/lifecycle экземпляров, не контракты равенства."
          }
        },
        {
          id: "blk_co_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Relation to defensive copying?' — Model Answer: Related when exposing collections; here the primary bug is not creating instances.",
            ru: "Доп. Вопрос 12: 'Связь с defensive copying?' — Модельный Ответ: Связано при экспозиции коллекций; здесь главный баг — несоздание экземпляров."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_co_jls_objects", "src_co_oracle_objects", "src_co_ej_item17", "src_co_hf_ooad_objects"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#class", "#object", "#reference", "#payment-instruction"],
  estimatedMinutes: 14,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_CLASSES_OBJECTS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_co_1",
    theoryArticleId: "art_theory_classes_objects",
    question: { en: "Why do all PaymentBatch entries show the last CSV row values?", ru: "Почему все записи PaymentBatch показывают значения последней CSV-строки?" },
    explanation: { en: "One PaymentInstruction object was reused; the batch stores references to that single instance.", ru: "Переиспользовался один объект PaymentInstruction; батч хранит ссылки на этот единственный экземпляр." },
    options: [
      {
        id: "opt_co1_a",
        text: { en: "The batch holds many references to one mutated PaymentInstruction instance.", ru: "Батч держит много ссылок на один мутируемый PaymentInstruction." },
        isCorrect: true,
        feedback: { en: "Correct — aliasing one object.", ru: "Верно — aliasing одного объекта." }
      },
      {
        id: "opt_co1_b",
        text: { en: "CSV parsing always overwrites the database after import.", ru: "CSV-парсинг всегда перезаписывает БД после импорта." },
        isCorrect: false,
        feedback: { en: "Incorrect — the corruption is in-memory identity.", ru: "Неверно — порча в in-memory identity." }
      },
      {
        id: "opt_co1_c",
        text: { en: "PaymentId equals/hashCode is broken in HashMap.", ru: "Сломан equals/hashCode у PaymentId в HashMap." },
        isCorrect: false,
        feedback: { en: "Incorrect — this mission is about instance reuse, not hash maps.", ru: "Неверно — миссия про reuse экземпляров, не HashMap." }
      }
    ],
    order: 1
  },
  {
    id: "chk_co_2",
    theoryArticleId: "art_theory_classes_objects",
    question: { en: "What does a Java variable of type PaymentInstruction hold?", ru: "Что хранит Java-переменная типа PaymentInstruction?" },
    explanation: { en: "A reference to a heap object (or null), not an inline copy of all fields.", ru: "Ссылку на объект в куче (или null), не inline-копию всех полей." },
    options: [
      {
        id: "opt_co2_a",
        text: { en: "A reference to a heap object (or null).", ru: "Ссылку на объект в куче (или null)." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_co2_b",
        text: { en: "A deep clone of every field automatically.", ru: "Автоматический deep clone всех полей." },
        isCorrect: false,
        feedback: { en: "Incorrect — Java does not deep-copy on assignment.", ru: "Неверно — Java не делает deep-copy при присваивании." }
      },
      {
        id: "opt_co2_c",
        text: { en: "The class bytecode itself.", ru: "Сам bytecode класса." },
        isCorrect: false,
        feedback: { en: "Incorrect — that is Class metadata, not the variable.", ru: "Неверно — это Class metadata, не переменная." }
      }
    ],
    order: 2
  },
  {
    id: "chk_co_3",
    theoryArticleId: "art_theory_classes_objects",
    question: { en: "What is the primary production fix in PaymentImporter?", ru: "Какой главный продакшн-фикс в PaymentImporter?" },
    explanation: { en: "Create a new independent PaymentInstruction per CSV row before adding to the batch.", ru: "Создавать новый независимый PaymentInstruction на каждую CSV-строку до добавления в батч." },
    options: [
      {
        id: "opt_co3_a",
        text: { en: "Instantiate a new PaymentInstruction (factory/new) per row, then add that reference.", ru: "Создавать новый PaymentInstruction (factory/new) на строку и добавлять эту ссылку." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_co3_b",
        text: { en: "Keep one draft but call System.gc() between rows.", ru: "Оставить один draft, но вызывать System.gc() между строками." },
        isCorrect: false,
        feedback: { en: "Incorrect — GC does not create independent instances.", ru: "Неверно — GC не создаёт независимые экземпляры." }
      },
      {
        id: "opt_co3_c",
        text: { en: "Override equals so last-row values are ignored.", ru: "Переопределить equals, чтобы игнорировать значения последней строки." },
        isCorrect: false,
        feedback: { en: "Incorrect — equals does not fix alias mutation.", ru: "Неверно — equals не чинит alias mutation." }
      }
    ],
    order: 3
  },
  {
    id: "chk_co_4",
    theoryArticleId: "art_theory_classes_objects",
    question: { en: "Which statement best separates class from object?", ru: "Какое утверждение лучше разделяет class и object?" },
    explanation: { en: "The class is the blueprint; each new creates a distinct runtime instance.", ru: "Класс — чертёж; каждый new создаёт отдельный runtime-экземпляр." },
    options: [
      {
        id: "opt_co4_a",
        text: { en: "Class is the blueprint; each new/factory call can create a distinct heap instance.", ru: "Class — чертёж; каждый new/factory может создать отдельный экземпляр в куче." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_co4_b",
        text: { en: "Class and object are synonyms in the JVM.", ru: "Class и object — синонимы в JVM." },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_co4_c",
        text: { en: "Objects exist only in source code; classes exist only at runtime.", ru: "Объекты существуют только в исходниках; классы — только в runtime." },
        isCorrect: false,
        feedback: { en: "Incorrect — inverted.", ru: "Неверно — перевёрнуто." }
      }
    ],
    order: 4
  }
];
