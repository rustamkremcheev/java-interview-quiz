import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_OBJECT_CLASS_CONTRACTS: TheoryArticle = {
  id: "art_theory_object_class_contracts",
  topicIds: ["top_oop_19"],
  conceptIds: ["cpt_java_lang_object", "cpt_getclass_vs_instanceof", "cpt_clone_pitfalls"],
  title: {
    en: "Object Contracts Overview for ComplianceEvent",
    ru: "Обзор Контрактов Object для ComplianceEvent"
  },
  summary: {
    en: "java.lang.Object defaults — identity equals/hashCode, Class@hex toString, fragile clone, obsolete finalize — mislead ComplianceEvent audits when used as if they were business contracts. Choose getClass vs instanceof deliberately; prefer copy constructors; retire finalize (JEP 421).",
    ru: "Default java.lang.Object — identity equals/hashCode, Class@hex toString, хрупкий clone, устаревший finalize — вводят в заблуждение аудиты ComplianceEvent, когда их принимают за бизнес-контракты. Осознанно выбирайте getClass vs instanceof; предпочитайте copy constructors; откажитесь от finalize (JEP 421)."
  },
  sections: [
    {
      id: "sec_ojc_definition",
      category: "DEFINITION",
      title: { en: "1. What Object Gives You by Default", ru: "1. Что Object Даёт по Умолчанию" },
      blocks: [
        {
          id: "blk_ojc_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Every Java class inherits from java.lang.Object. Default equals and hashCode are identity-based. Default toString is ClassName@hexHash. clone is a protected native shallow field copy requiring Cloneable. finalize was a GC cleanup hook — now deprecated for removal. ComplianceEventRepository using contains(event) without overrides is asking identity, not 'same eventId'. AuditSnapshot concatenating event produces Class@hex noise — useful identity for debuggers, poor for compliance narratives.",
            ru: "Каждый Java-класс наследует java.lang.Object. Default equals и hashCode — по identity. Default toString — ClassName@hexHash. clone — protected native shallow copy полей, требующий Cloneable. finalize был GC cleanup hook — теперь deprecated for removal. ComplianceEventRepository с contains(event) без overrides спрашивает identity, не «тот же eventId». AuditSnapshot, склеивающий event, даёт шум Class@hex — полезно отладчикам, плохо для compliance-нарратива."
          }
        },
        {
          id: "blk_ojc_def_2",
          type: "CALLOUT",
          title: { en: "💡 Overview, Not Deep Equals Mission", ru: "💡 Обзор, Не Глубокая Миссия Equals" },
          content: {
            en: "This mission surveys Object contracts. Full equals/hashCode mathematics and PII-safe toString design are dedicated sibling missions — here we focus on misuse patterns and deliberate choices.",
            ru: "Эта миссия — обзор контрактов Object. Полная математика equals/hashCode и PII-safe toString — отдельные соседние миссии; здесь — паттерны misuse и осознанный выбор."
          }
        }
      ]
    },
    {
      id: "sec_ojc_mechanics",
      category: "MECHANICS",
      title: { en: "2. getClass vs instanceof, Clone Pitfalls, Finalize", ru: "2. getClass vs instanceof, Ловушки Clone, Finalize" },
      blocks: [
        {
          id: "blk_ojc_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "EventClassifier checking event.getClass() != ComplianceEvent.class rejects SanctionsComplianceEvent even when it is-a ComplianceEvent. instanceof ComplianceEvent accepts the hierarchy. Prefer getClass when exact runtime class must match (often final value types / symmetry-sensitive equals). Prefer instanceof when LSP subtypes should participate. Object.clone copies field references: ComplianceCase.evidenceNotes stays shared — probe.addEvidence mutates the live case. Prefer ComplianceCaseCopies.independentCopy. finalize may never run promptly, can resurrect objects, and is removed by policy under JEP 421 — use try-with-resources or Cleaner.",
            ru: "EventClassifier с event.getClass() != ComplianceEvent.class отвергает SanctionsComplianceEvent, даже когда это is-a ComplianceEvent. instanceof ComplianceEvent принимает иерархию. Предпочитайте getClass, когда нужен точный runtime class (часто final value types / symmetry-sensitive equals). Предпочитайте instanceof, когда LSP-подтипы должны участвовать. Object.clone копирует ссылки полей: ComplianceCase.evidenceNotes остаётся общим — probe.addEvidence мутирует живой кейс. Предпочитайте ComplianceCaseCopies.independentCopy. finalize может не сработать вовремя, может resurrect объекты и снимается политикой JEP 421 — используйте try-with-resources или Cleaner."
          }
        },
        {
          id: "blk_ojc_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Clone Is Not a Free Deep Copy", ru: "⚙️ Clone — Не Бесплатный Deep Copy" },
          content: {
            en: "Implementing Cloneable and calling super.clone() without independently copying nested mutables is a classic production footgun in investigation workflows.",
            ru: "Реализация Cloneable и вызов super.clone() без независимой копии nested mutables — классический продакшн-footgun в investigation workflows."
          }
        }
      ]
    },
    {
      id: "sec_ojc_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Keys, Hierarchy, Cleanup", ru: "3. Компромиссы: Ключи, Иерархия, Cleanup" },
      blocks: [
        {
          id: "blk_ojc_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Dedup by eventId in a Set is simpler and safer than inventing equals under time pressure — and avoids coupling repository behavior to equals evolution. Open event hierarchies favor instanceof; closed value types may favor getClass. Copy constructors cost more lines than clone but are reviewable. Migrating off finalize may surface missing try-with-resources — fix those leaks deliberately rather than hoping GC helps.",
            ru: "Дедуп по eventId в Set проще и безопаснее, чем изобретать equals под давлением сроков — и не связывает поведение репозитория с эволюцией equals. Открытые иерархии событий предпочитают instanceof; закрытые value types могут предпочитать getClass. Copy constructors дороже по строкам, чем clone, но ревьюабельны. Миграция с finalize может вскрыть отсутствующий try-with-resources — чините эти утечки осознанно, а не надеясь на GC."
          }
        }
      ]
    },
    {
      id: "sec_ojc_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_ojc_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What does Object.equals do by default?' — Model Answer: Reference identity equality.",
            ru: "Доп. Вопрос 1: 'Что делает Object.equals по умолчанию?' — Модельный Ответ: Equality по reference identity."
          }
        },
        {
          id: "blk_ojc_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What does default toString look like?' — Model Answer: ClassName@hex of identity hash — poor as a compliance narrative alone.",
            ru: "Доп. Вопрос 2: 'Как выглядит default toString?' — Модельный Ответ: ClassName@hex identity hash — плохо как единственный compliance-нарратив."
          }
        },
        {
          id: "blk_ojc_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why is clone dangerous?' — Model Answer: Often shallow; nested mutables stay shared.",
            ru: "Доп. Вопрос 3: 'Почему clone опасен?' — Модельный Ответ: Часто shallow; nested mutables остаются общими."
          }
        },
        {
          id: "blk_ojc_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'getClass vs instanceof?' — Model Answer: Exact class vs hierarchy membership; choose by design intent.",
            ru: "Доп. Вопрос 4: 'getClass vs instanceof?' — Модельный Ответ: Точный класс vs членство в иерархии; выбор по design intent."
          }
        },
        {
          id: "blk_ojc_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Why retire finalize?' — Model Answer: JEP 421 — unreliable timing, resurrection, GC cost; use try-with-resources/Cleaner.",
            ru: "Доп. Вопрос 5: 'Почему отказываться от finalize?' — Модельный Ответ: JEP 421 — ненадёжный тайминг, resurrection, цена GC; try-with-resources/Cleaner."
          }
        },
        {
          id: "blk_ojc_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Is eventId Set enough without equals?' — Model Answer: Yes for uniqueness-by-key; equals remains separate if collections need value semantics.",
            ru: "Доп. Вопрос 6: 'Достаточно ли Set eventId без equals?' — Модельный Ответ: Да для uniqueness-by-key; equals отдельно, если коллекциям нужна value semantics."
          }
        },
        {
          id: "blk_ojc_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'When is getClass preferred in equals?' — Model Answer: When rejecting subclass asymmetry that would break symmetry.",
            ru: "Доп. Вопрос 7: 'Когда getClass предпочтителен в equals?' — Модельный Ответ: Когда нужно отвергнуть subclass asymmetry, ломающую symmetry."
          }
        },
        {
          id: "blk_ojc_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Copy constructor vs clone?' — Model Answer: Copy constructor is explicit, type-safe, and reviewable; clone is fragile API.",
            ru: "Доп. Вопрос 8: 'Copy constructor vs clone?' — Модельный Ответ: Copy constructor явный, type-safe и ревьюабельный; clone — хрупкий API."
          }
        },
        {
          id: "blk_ojc_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Does System.identityHashCode relate to toString?' — Model Answer: Default toString often embeds it; do not confuse with value hashCode.",
            ru: "Доп. Вопрос 9: 'Связан ли System.identityHashCode с toString?' — Модельный Ответ: Default toString часто его включает; не путайте с value hashCode."
          }
        },
        {
          id: "blk_ojc_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How do you review Object misuse?' — Model Answer: Search for contains(thisType), clone(), getClass()==, and finalize overrides.",
            ru: "Доп. Вопрос 10: 'Как ревьюить misuse Object?' — Модельный Ответ: Ищите contains(thisType), clone(), getClass()== и overrides finalize."
          }
        },
        {
          id: "blk_ojc_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Relation to equals/hashCode mission?' — Model Answer: Sibling — here overview and pitfalls; there full contract math.",
            ru: "Доп. Вопрос 11: 'Связь с миссией equals/hashCode?' — Модельный Ответ: Соседняя — здесь обзор и ловушки; там полная математика контракта."
          }
        },
        {
          id: "blk_ojc_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Relation to safe toString/logging?' — Model Answer: Diagnostic toString helps audits; dumping PII is a separate security failure mode.",
            ru: "Доп. Вопрос 12: 'Связь с safe toString/logging?' — Модельный Ответ: Диагностический toString помогает аудитам; дамп PII — отдельный security failure mode."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_class_vs_object"],
  sourceIds: ["src_ojc_object_api", "src_ojc_jep_421", "src_ojc_ej_items_10_13", "src_ojc_instanceof_tutorial"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#object", "#clone", "#getclass", "#finalize", "#compliance-event"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OBJECT_CLASS_CONTRACTS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ojc_1",
    theoryArticleId: "art_theory_object_class_contracts",
    order: 1,
    question: {
      en: "Why can ComplianceEventRepository.contains(event) miss logical duplicates?",
      ru: "Почему ComplianceEventRepository.contains(event) может пропустить логические дубликаты?"
    },
    explanation: {
      en: "Default Object.equals is identity — two instances with the same eventId are not equal unless designed otherwise.",
      ru: "Default Object.equals — identity — два экземпляра с одним eventId не равны, пока это не спроектировано иначе."
    },
    options: [
      {
        id: "opt_ojc1_a",
        text: {
          en: "Default equals compares identity, not eventId business keys.",
          ru: "Default equals сравнивает identity, не business keys eventId."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ojc1_b",
        text: {
          en: "HashMap always drops the second insert silently.",
          ru: "HashMap всегда тихо отбрасывает вторую вставку."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — the issue is identity equals on List.contains.", ru: "Неверно — проблема в identity equals на List.contains." }
      },
      {
        id: "opt_ojc1_c",
        text: {
          en: "finalize deletes the first event before contains runs.",
          ru: "finalize удаляет первое событие до вызова contains."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_ojc_2",
    theoryArticleId: "art_theory_object_class_contracts",
    order: 2,
    question: {
      en: "What is the main risk of ComplianceCase.clone() via Object.clone?",
      ru: "Каков главный риск ComplianceCase.clone() через Object.clone?"
    },
    explanation: {
      en: "Shallow copy shares nested mutable collections such as evidenceNotes.",
      ru: "Shallow copy делит nested мутабельные коллекции вроде evidenceNotes."
    },
    options: [
      {
        id: "opt_ojc2_a",
        text: {
          en: "Nested mutable lists remain shared between original and clone.",
          ru: "Nested мутабельные списки остаются общими у оригинала и клона."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ojc2_b",
        text: {
          en: "clone always deep-copies every nested object in Java 17.",
          ru: "clone в Java 17 всегда deep-копирует каждый nested-объект."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — Object.clone is shallow for references.", ru: "Неверно — Object.clone shallow для ссылок." }
      },
      {
        id: "opt_ojc2_c",
        text: {
          en: "clone replaces equals with identity permanently.",
          ru: "clone навсегда заменяет equals на identity."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_ojc_3",
    theoryArticleId: "art_theory_object_class_contracts",
    order: 3,
    question: {
      en: "When should EventClassifier prefer instanceof over getClass?",
      ru: "Когда EventClassifier должен предпочесть instanceof вместо getClass?"
    },
    explanation: {
      en: "When subtype polymorphism is intended and subclasses should be accepted as ComplianceEvent.",
      ru: "Когда задуман subtype polymorphism и подклассы должны приниматься как ComplianceEvent."
    },
    options: [
      {
        id: "opt_ojc3_a",
        text: {
          en: "When valid subtypes must be accepted as ComplianceEvent.",
          ru: "Когда валидные подтипы должны приниматься как ComplianceEvent."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ojc3_b",
        text: {
          en: "Always — getClass is illegal in Java 17.",
          ru: "Всегда — getClass запрещён в Java 17."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — getClass remains valid for exact-type policies.", ru: "Неверно — getClass валиден для exact-type политик." }
      },
      {
        id: "opt_ojc3_c",
        text: {
          en: "Only inside finalize methods.",
          ru: "Только внутри методов finalize."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_ojc_4",
    theoryArticleId: "art_theory_object_class_contracts",
    order: 4,
    question: {
      en: "Why should Compliance pipelines retire finalize for handle cleanup?",
      ru: "Почему compliance-пайплайны должны отказаться от finalize для cleanup handles?"
    },
    explanation: {
      en: "JEP 421 deprecates finalization for removal; timing is unreliable — use try-with-resources / Cleaner.",
      ru: "JEP 421 deprecates finalization for removal; тайминг ненадёжен — используйте try-with-resources / Cleaner."
    },
    options: [
      {
        id: "opt_ojc4_a",
        text: {
          en: "finalize is obsolete (JEP 421) and unreliable; prefer try-with-resources / Cleaner.",
          ru: "finalize устарел (JEP 421) и ненадёжен; предпочитайте try-with-resources / Cleaner."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ojc4_b",
        text: {
          en: "finalize is faster than try-with-resources on HotSpot.",
          ru: "finalize быстрее try-with-resources на HotSpot."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ojc4_c",
        text: {
          en: "finalize is required for Cloneable types.",
          ru: "finalize обязателен для типов Cloneable."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  }
];
