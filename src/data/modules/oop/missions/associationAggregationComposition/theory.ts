import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_ASSOCIATION_AGGREGATION_COMPOSITION: TheoryArticle = {
  id: "art_theory_association_aggregation_composition",
  topicIds: ["top_oop_17"],
  conceptIds: ["cpt_association", "cpt_aggregation", "cpt_composition_ownership"],
  title: {
    en: "Association, Aggregation, and Composition in Portfolio Modeling",
    ru: "Association, Aggregation и Composition в Моделировании Portfolio"
  },
  summary: {
    en: "Has-a relationships differ by ownership: Portfolio composes Holdings, associates/aggregates shared MarketInstrument and PricingFeed, and must not leak live mutable holdings collections or cascade-delete shared catalog parts.",
    ru: "Has-a связи различаются ownership: Portfolio compose'ит Holdings, ассоциирует/агрегирует shared MarketInstrument и PricingFeed и не должен утекать живые мутабельные коллекции holdings или cascade-delete shared catalog-части."
  },
  sections: [
    {
      id: "sec_aac_definition",
      category: "DEFINITION",
      title: { en: "1. Three Has-a Flavors", ru: "1. Три Вкуса Has-a" },
      blocks: [
        {
          id: "blk_aac_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Association: an object knows another without claiming lifecycle ownership — Portfolio references MarketInstrument, PricingFeed, and BrokerageAccount. Aggregation: a whole-part relationship where parts may be shared and can outlive the whole — several portfolios may point at the same PricingFeed. Composition: strong ownership — Portfolio owns Holdings; when the portfolio is deleted, its holdings go with it (or are cleared as owned state). Confusing these words is how shared AAPL catalog rows disappear when one client closes an account.",
            ru: "Association: объект знает другой без владения lifecycle — Portfolio ссылается на MarketInstrument, PricingFeed и BrokerageAccount. Aggregation: whole-part, где части могут быть shared и переживать целое — несколько portfolio могут указывать на один PricingFeed. Composition: сильное владение — Portfolio владеет Holdings; при удалении portfolio его holdings уходят с ним (или очищаются как owned-состояние). Путаница этих слов — как shared строки каталога AAPL исчезают, когда один клиент закрывает счёт."
          }
        },
        {
          id: "blk_aac_def_2",
          type: "CALLOUT",
          title: { en: "💡 Mental Model: Ask Who Dies", ru: "💡 Ментальная Модель: Кто Умирает" },
          content: {
            en: "On Portfolio.delete(), which objects are allowed to be destroyed? If the answer includes MarketInstrument used by others, you modeled composition where association belonged.",
            ru: "При Portfolio.delete() какие объекты можно уничтожить? Если ответ включает MarketInstrument, нужный другим — вы смоделировали composition там, где нужна association."
          }
        }
      ]
    },
    {
      id: "sec_aac_mechanics",
      category: "MECHANICS",
      title: { en: "2. Delete Cascades & Collection Exposure", ru: "2. Delete Cascades и Экспозиция Коллекций" },
      blocks: [
        {
          id: "blk_aac_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Correct delete: clear or dispose owned Holdings; null/unsubscribe association references to MarketInstrument and PricingFeed; leave BrokerageAccount intact. Incorrect delete: instrument.delete() or feed.shutdown() as part of closing one portfolio. Separately, getHoldings() returning the internal ArrayList breaks composition: callers become co-owners and can clear positions mid-session. Fix with List.copyOf, unmodifiableList, or an immutable snapshot DTO. This mission is ownership semantics — not the separate design debate of composition-over-inheritance.",
            ru: "Корректный delete: очистить/dispose owned Holdings; null/unsubscribe association-ссылок на MarketInstrument и PricingFeed; BrokerageAccount оставить. Некорректный delete: instrument.delete() или feed.shutdown() при закрытии одного portfolio. Отдельно getHoldings(), возвращающий внутренний ArrayList, ломает composition: вызывающие становятся совладельцами и могут очистить позиции mid-session. Фикс — List.copyOf, unmodifiableList или immutable snapshot DTO. Миссия про ownership — не про composition-over-inheritance."
          }
        },
        {
          id: "blk_aac_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Persistence Cascades Amplify Mistakes", ru: "⚙️ Persistence Cascades Усиливают Ошибки" },
          content: {
            en: "ORM CascadeType.ALL/REMOVE on associations to shared catalog entities reproduces the same bug in the database. Map ownership explicitly.",
            ru: "ORM CascadeType.ALL/REMOVE на associations к shared catalog-сущностям воспроизводит тот же баг в БД. Явно мапьте ownership."
          }
        }
      ]
    },
    {
      id: "sec_aac_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Copies vs Views", ru: "3. Компромиссы: Copies vs Views" },
      blocks: [
        {
          id: "blk_aac_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Defensive copies allocate; unmodifiable wrappers are cheaper if mutation must only be blocked. Document that feed teardown is an ops/infrastructure action, not a portfolio close side effect. Evans-style aggregates help: Portfolio aggregate root owns Holdings; MarketInstrument lives in a catalog bounded context/shared kernel — not inside the portfolio aggregate's delete boundary.",
            ru: "Defensive copies аллоцируют; unmodifiable wrappers дешевле, если нужно только запретить мутацию. Зафиксируйте: teardown feed — ops/infrastructure, не side effect закрытия portfolio. Aggregates в стиле Evans помогают: aggregate root Portfolio владеет Holdings; MarketInstrument живёт в catalog bounded context/shared kernel — не внутри границы delete aggregate portfolio."
          }
        }
      ]
    },
    {
      id: "sec_aac_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_aac_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Association vs composition in one sentence?' — Model Answer: Association knows without owning lifecycle; composition owns the part's lifecycle.",
            ru: "Доп. Вопрос 1: 'Association vs composition в одном предложении?' — Модельный Ответ: Association знает без владения lifecycle; composition владеет lifecycle части."
          }
        },
        {
          id: "blk_aac_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Where does aggregation fit?' — Model Answer: Whole-part with shared parts that can outlive the whole.",
            ru: "Доп. Вопрос 2: 'Куда относится aggregation?' — Модельный Ответ: Whole-part с shared-частями, которые могут переживать целое."
          }
        },
        {
          id: "blk_aac_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What should Portfolio.delete destroy?' — Model Answer: Owned Holdings (composition) — not shared MarketInstrument/PricingFeed.",
            ru: "Доп. Вопрос 3: 'Что должен уничтожать Portfolio.delete?' — Модельный Ответ: Owned Holdings (composition) — не shared MarketInstrument/PricingFeed."
          }
        },
        {
          id: "blk_aac_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why is returning holdings dangerous?' — Model Answer: It leaks composition ownership; callers can mutate the aggregate secretly.",
            ru: "Доп. Вопрос 4: 'Почему опасен возврат holdings?' — Модельный Ответ: Утекает composition ownership; вызывающие могут тайно мутировать aggregate."
          }
        },
        {
          id: "blk_aac_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Is BrokerageAccount composed by Portfolio?' — Model Answer: Usually association/aggregation — the account outlives a single portfolio.",
            ru: "Доп. Вопрос 5: 'BrokerageAccount compose'ится Portfolio?' — Модельный Ответ: Обычно association/aggregation — account переживает один portfolio."
          }
        },
        {
          id: "blk_aac_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How do you express this in Java without UML?' — Model Answer: Fields + delete behavior + getter exposure policy encode ownership.",
            ru: "Доп. Вопрос 6: 'Как выразить это в Java без UML?' — Модельный Ответ: Поля + поведение delete + политика экспозиции getters кодируют ownership."
          }
        },
        {
          id: "blk_aac_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Is this composition-over-inheritance?' — Model Answer: No — this is has-a ownership among peers, not replacing extends with delegates.",
            ru: "Доп. Вопрос 7: 'Это composition-over-inheritance?' — Модельный Ответ: Нет — это has-a ownership между peer-объектами, не замена extends делегатами."
          }
        },
        {
          id: "blk_aac_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'ORM cascade foot-gun?' — Model Answer: CascadeType.REMOVE on shared associations deletes catalog rows unexpectedly.",
            ru: "Доп. Вопрос 8: 'ORM cascade foot-gun?' — Модельный Ответ: CascadeType.REMOVE на shared associations неожиданно удаляет строки каталога."
          }
        },
        {
          id: "blk_aac_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'copyOf vs unmodifiableList?' — Model Answer: copyOf snapshots; unmodifiable wraps — both block external mutation of the internal list.",
            ru: "Доп. Вопрос 9: 'copyOf vs unmodifiableList?' — Модельный Ответ: copyOf — snapshot; unmodifiable — обёртка; оба блокируют внешнюю мутацию внутреннего списка."
          }
        },
        {
          id: "blk_aac_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How would you review this PR?' — Model Answer: Trace delete() and every getter returning a collection field.",
            ru: "Доп. Вопрос 10: 'Как ревьюить такой PR?' — Модельный Ответ: Проследить delete() и каждый getter, возвращающий поле-коллекцию."
          }
        },
        {
          id: "blk_aac_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Can Holding embed a MarketInstrument reference?' — Model Answer: Yes as association; still do not cascade-delete the instrument with the holding/portfolio.",
            ru: "Доп. Вопрос 11: 'Может Holding держать ссылку на MarketInstrument?' — Модельный Ответ: Да как association; всё равно не cascade-delete instrument вместе с holding/portfolio."
          }
        },
        {
          id: "blk_aac_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Relation to Evans aggregates?' — Model Answer: Aggregate root Portfolio owns Holdings; shared instruments live outside that delete boundary.",
            ru: "Доп. Вопрос 12: 'Связь с aggregates Evans?' — Модельный Ответ: Aggregate root Portfolio владеет Holdings; shared instruments живут вне этой границы delete."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_aac_fowler_evans", "src_aac_oracle_object", "src_aac_hf_ooad_hasa", "src_aac_fowler_value_object"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#association", "#aggregation", "#composition", "#portfolio"],
  estimatedMinutes: 14,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_ASSOCIATION_AGGREGATION_COMPOSITION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_aac_1",
    theoryArticleId: "art_theory_association_aggregation_composition",
    order: 1,
    question: {
      en: "Why must Portfolio.delete not call MarketInstrument.delete()?",
      ru: "Почему Portfolio.delete не должен вызывать MarketInstrument.delete()?"
    },
    explanation: {
      en: "MarketInstrument is a shared association/aggregation — other portfolios still depend on it.",
      ru: "MarketInstrument — shared association/aggregation — другие portfolio всё ещё зависят от него."
    },
    options: [
      {
        id: "opt_aac1_a",
        text: {
          en: "It is a shared catalog association — destroying it breaks other portfolios.",
          ru: "Это shared catalog association — уничтожение ломает другие portfolio."
        },
        isCorrect: true,
        feedback: { en: "Correct — ownership mismatch.", ru: "Верно — неверный ownership." }
      },
      {
        id: "opt_aac1_b",
        text: {
          en: "Java forbids calling methods on associated objects.",
          ru: "Java запрещает вызывать методы на associated-объектах."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — the issue is lifecycle ownership, not language rules.", ru: "Неверно — вопрос lifecycle ownership, не правил языка." }
      },
      {
        id: "opt_aac1_c",
        text: {
          en: "Holdings must never be cleared when a portfolio closes.",
          ru: "Holdings никогда нельзя очищать при закрытии portfolio."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — holdings are composed and may be cleared.", ru: "Неверно — holdings composed и могут очищаться." }
      }
    ]
  },
  {
    id: "chk_aac_2",
    theoryArticleId: "art_theory_association_aggregation_composition",
    order: 2,
    question: {
      en: "What relationship should Portfolio have with Holdings?",
      ru: "Какая связь должна быть у Portfolio с Holdings?"
    },
    explanation: {
      en: "Composition — Portfolio owns the holdings lifecycle.",
      ru: "Composition — Portfolio владеет lifecycle holdings."
    },
    options: [
      {
        id: "opt_aac2_a",
        text: {
          en: "Composition — owned parts whose lifecycle is bound to the portfolio.",
          ru: "Composition — owned-части, чей lifecycle связан с portfolio."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_aac2_b",
        text: {
          en: "Inheritance — Portfolio extends Holding.",
          ru: "Inheritance — Portfolio extends Holding."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — this is has-a, not is-a.", ru: "Неверно — это has-a, не is-a." }
      },
      {
        id: "opt_aac2_c",
        text: {
          en: "No relationship — holdings live only in PricingFeed.",
          ru: "Нет связи — holdings живут только в PricingFeed."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_aac_3",
    theoryArticleId: "art_theory_association_aggregation_composition",
    order: 3,
    question: {
      en: "Why is `return holdings;` a defect in getHoldings()?",
      ru: "Почему `return holdings;` — дефект в getHoldings()?"
    },
    explanation: {
      en: "It returns the live mutable composed collection, leaking ownership.",
      ru: "Возвращается живая мутабельная composed-коллекция — утечка ownership."
    },
    options: [
      {
        id: "opt_aac3_a",
        text: {
          en: "Callers receive the live list and can mutate/clear owned holdings.",
          ru: "Вызывающие получают живой список и могут мутировать/очищать owned holdings."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_aac3_b",
        text: {
          en: "Java lists cannot be returned from methods.",
          ru: "Списки Java нельзя возвращать из методов."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — returning copies/views is fine.", ru: "Неверно — возвращать copies/views нормально." }
      },
      {
        id: "opt_aac3_c",
        text: {
          en: "It forces cascade-delete of PricingFeed.",
          ru: "Это принудительно cascade-delete PricingFeed."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — separate failure mode.", ru: "Неверно — отдельный failure mode." }
      }
    ]
  },
  {
    id: "chk_aac_4",
    theoryArticleId: "art_theory_association_aggregation_composition",
    order: 4,
    question: {
      en: "Which statement best separates this mission from composition-over-inheritance?",
      ru: "Какое утверждение лучше отделяет эту миссию от composition-over-inheritance?"
    },
    explanation: {
      en: "This mission is about has-a ownership among domain objects, not replacing inheritance with delegates.",
      ru: "Миссия про has-a ownership между доменными объектами, не про замену inheritance делегатами."
    },
    options: [
      {
        id: "opt_aac4_a",
        text: {
          en: "It teaches ownership of has-a links (who dies with whom), not preferring delegates over extends.",
          ru: "Она учит ownership has-a связей (кто умирает с кем), не предпочтению делегатов вместо extends."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_aac4_b",
        text: {
          en: "It requires Portfolio to extend PricingFeed via a bridge pattern.",
          ru: "Она требует, чтобы Portfolio наследовал PricingFeed через bridge."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_aac4_c",
        text: {
          en: "It forbids any field references between classes.",
          ru: "Она запрещает любые field-ссылки между классами."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — associations are field references.", ru: "Неверно — associations как раз field-ссылки." }
      }
    ]
  }
];
