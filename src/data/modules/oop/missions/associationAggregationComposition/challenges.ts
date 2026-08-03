import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_AAC: FixBuilderChallenge = {
  id: "chl_aac_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_association_aggregation_composition",
  stageId: "stg_aac_practice",
  title: {
    en: "Fix Builder: Portfolio Ownership Semantics",
    ru: "Конструктор Исправления: Семантика Ownership Portfolio"
  },
  prompt: {
    en: "Portfolio delete destroys shared MarketInstrument/PricingFeed and/or getHoldings returns a live mutable list. Select ALL structural building blocks for correct ownership.",
    ru: "Удаление Portfolio уничтожает shared MarketInstrument/PricingFeed и/или getHoldings возвращает живой мутабельный список. Выберите ВСЕ элементы корректного ownership."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_association", "cpt_aggregation", "cpt_composition_ownership"],
  topicIds: ["top_oop_17"],
  tags: ["#association", "#aggregation", "#composition"],
  hintIds: ["hnt_aac_1", "hnt_aac_2", "hnt_aac_3", "hnt_aac_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_aac_portfolio_broken",
    solutionCodeArtifactId: "art_aac_portfolio_solution",
    options: [
      {
        id: "opt_aac_fix_1",
        text: {
          en: "Model Holdings as composition: Portfolio owns their lifecycle and may delete/clear holdings when the portfolio is closed.",
          ru: "Смоделировать Holdings как composition: Portfolio владеет их lifecycle и может удалять/очищать holdings при закрытии portfolio."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Holdings are owned parts of the portfolio aggregate.",
          ru: "Верно. Holdings — owned-части aggregate portfolio."
        }
      },
      {
        id: "opt_aac_fix_2",
        text: {
          en: "Keep MarketInstrument and PricingFeed as associations/aggregations — drop portfolio references on delete, do not destroy the shared objects.",
          ru: "Держать MarketInstrument и PricingFeed как association/aggregation — при delete сбрасывать ссылки portfolio, не уничтожать shared-объекты."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Shared catalog/feed must outlive a single portfolio.",
          ru: "Верно. Shared catalog/feed должен переживать один portfolio."
        }
      },
      {
        id: "opt_aac_fix_3",
        text: {
          en: "On Portfolio.delete(), also delete the MarketInstrument and shut down PricingFeed so nothing is left dangling.",
          ru: "В Portfolio.delete() также удалять MarketInstrument и гасить PricingFeed, чтобы ничего не висело."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That cascades onto shared associations and breaks other portfolios/BrokerageAccount views.",
          ru: "Неверно. Это cascade на shared associations и ломает другие portfolio/BrokerageAccount."
        }
      },
      {
        id: "opt_aac_fix_4",
        text: {
          en: "Expose holdings via an unmodifiable view or defensive copy — never return the live internal List.",
          ru: "Экспонировать holdings через unmodifiable view или defensive copy — никогда не возвращать живой внутренний List."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Composition ownership requires controlling mutation paths.",
          ru: "Верно. Composition ownership требует контроля путей мутации."
        }
      },
      {
        id: "opt_aac_fix_distractor_1",
        text: {
          en: "Make Portfolio extend MarketInstrument so ownership is expressed as inheritance (is-a).",
          ru: "Сделать Portfolio наследником MarketInstrument, чтобы ownership выразить через inheritance (is-a)."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. This is has-a ownership semantics, not composition-over-inheritance or is-a modeling.",
          ru: "Неверно. Это семантика has-a ownership, не composition-over-inheritance и не is-a."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_AAC: BugHuntChallenge = {
  id: "chl_aac_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_association_aggregation_composition",
  stageId: "stg_aac_debug",
  title: {
    en: "Bug Hunt: Cascade Delete & Live Holdings Leak",
    ru: "Поиск Бага: Cascade Delete и Утечка Живых Holdings"
  },
  prompt: {
    en: "Click the line(s) where Portfolio wrongly destroys shared MarketInstrument/PricingFeed or returns the live mutable holdings list.",
    ru: "Нажмите строку(и), где Portfolio ошибочно уничтожает shared MarketInstrument/PricingFeed или возвращает живой мутабельный список holdings."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_association", "cpt_composition_ownership"],
  topicIds: ["top_oop_17"],
  tags: ["#bug-hunt", "#ownership"],
  hintIds: ["hnt_aac_bug_1", "hnt_aac_bug_2", "hnt_aac_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_aac_bughunt",
    solutionCodeArtifactId: "art_aac_portfolio_solution",
    codeSnippet: `public class Portfolio {
    private final List<Holding> holdings = new ArrayList<>();
    private MarketInstrument instrument;
    private PricingFeed feed;
    public List<Holding> getHoldings() {
        return holdings; // Line 6 — BUG: live list
    }
    public void delete() {
        holdings.clear();
        instrument.delete(); // Line 10 — BUG: shared catalog
        feed.shutdown(); // Line 11 — BUG: shared feed
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class Portfolio {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    private final List<Holding> holdings = new ArrayList<>();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "    private MarketInstrument instrument;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    private PricingFeed feed;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    public List<Holding> getHoldings() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 6,
        code: "        return holdings;",
        isBug: true,
        explanation: {
          en: "Line 6: Returns the live mutable composed collection — callers can clear/mutate owned holdings.",
          ru: "Строка 6: Возвращает живую мутабельную composed-коллекцию — вызывающие могут clear/мутировать owned holdings."
        }
      },
      { lineNumber: 7, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "    public void delete() {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "        holdings.clear();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 10,
        code: "        instrument.delete();",
        isBug: true,
        explanation: {
          en: "Line 10: Cascades delete onto shared MarketInstrument — association mistaken for composition.",
          ru: "Строка 10: Cascade delete на shared MarketInstrument — association принята за composition."
        }
      },
      {
        lineNumber: 11,
        code: "        feed.shutdown();",
        isBug: true,
        explanation: {
          en: "Line 11: Shuts down shared PricingFeed used by other portfolios.",
          ru: "Строка 11: Гасит shared PricingFeed, используемый другими portfolio."
        }
      },
      { lineNumber: 12, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_AAC: InterviewAnswerChallenge = {
  id: "chl_aac_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_association_aggregation_composition",
  stageId: "stg_aac_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Portfolio Ownership",
    ru: "Устный Ответ на Senior-Интервью: Ownership Portfolio"
  },
  prompt: {
    en: "Deleting a Portfolio wiped MarketInstrument/PricingFeed used elsewhere, and getHoldings leaked a live list. Explain association vs aggregation vs composition, and your production fix.",
    ru: "Удаление Portfolio стёрло MarketInstrument/PricingFeed, нужные другим, а getHoldings утекал живой список. Объясните association vs aggregation vs composition и ваш продакшн-фикс."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_association", "cpt_aggregation", "cpt_composition_ownership"],
  topicIds: ["top_oop_17"],
  tags: ["#interview", "#ownership"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_aac_portfolio_ownership_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_association",
        label: { en: "Association", ru: "Association" },
        keywords: ["association", "knows", "reference", "ассоциац", "ссылк", "знает"]
      },
      {
        id: "cpt_aggregation",
        label: { en: "Aggregation", ru: "Aggregation" },
        keywords: ["aggregation", "shared", "outlive", "агрегац", "shared", "переживает"]
      },
      {
        id: "cpt_composition_ownership",
        label: { en: "Composition Ownership", ru: "Composition Ownership" },
        keywords: ["composition", "owns", "lifecycle", "holdings", "композиц", "владеет", "жизненн"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): We confused ownership. Holdings are composition — owned by Portfolio. MarketInstrument and PricingFeed are shared associations/aggregations — other portfolios and BrokerageAccount still need them. Delete clears holdings and drops references; it must not destroy the catalog or feed. Also never return the live holdings list — copyOf or unmodifiable view.",
      ru: "Elevator Pitch (30 сек): Мы перепутали ownership. Holdings — composition, ими владеет Portfolio. MarketInstrument и PricingFeed — shared association/aggregation — они нужны другим portfolio и BrokerageAccount. Delete очищает holdings и сбрасывает ссылки; не уничтожает catalog или feed. И никогда не возвращаем живой список holdings — copyOf или unmodifiable view."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Association is a knows-about link without lifecycle ownership. Aggregation is a whole-part where parts can be shared and outlive the whole. Composition is strong ownership: the part's lifecycle is bound to the whole — Portfolio creates/clears Holdings. Cascading ORM-style deletes or in-memory destroy() onto catalog instruments is a modeling error, not thorough cleanup. Leaking the internal List breaks encapsulation of the composed aggregate: callers become unofficial owners. This is has-a ownership, not an inheritance or composition-over-inheritance discussion.",
      ru: "Глубокая Механика (60 сек): Association — связь knows-about без владения lifecycle. Aggregation — whole-part, где части могут быть shared и переживать целое. Composition — сильное владение: lifecycle части связан с целым — Portfolio создаёт/очищает Holdings. Cascade ORM-delete или in-memory destroy() на catalog instruments — ошибка моделирования, не «тщательная очистка». Утечка внутреннего List ломает encapsulation composed aggregate: вызывающие становятся неофициальными владельцами. Это has-a ownership, не inheritance и не composition-over-inheritance."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Defensive copies cost allocations on hot read paths — unmodifiable wrappers are cheaper if callers only read. Document and enforce that subscription teardown ≠ feed teardown. In persistence, configure cascade types explicitly: CascadeType.ALL on shared instruments is a classic foot-gun.",
      ru: "Продакшн Компромиссы (30 сек): Defensive copies стоят аллокаций на горячих read-путях — unmodifiable wrappers дешевле, если только чтение. Явно зафиксируйте: teardown подписки ≠ teardown feed. В persistence явно настраивайте cascade: CascadeType.ALL на shared instruments — классический foot-gun."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Is aggregation just a weaker word for composition?'",
      ru: "Доп. Вопрос Интервьюера: 'Aggregation — просто более слабое слово для composition?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: In UML/OO teaching they differ by lifecycle: composition parts die with the whole; aggregation/association parts may be shared and survive. In code the distinction shows up as delete behavior and who allocates/disposes the object. If you cascade-delete shared MarketInstrument, you treated aggregation as composition — that is the bug.",
      ru: "Ответ на Доп. Вопрос: В UML/OO-обучении они различаются lifecycle: части composition умирают с целым; части aggregation/association могут быть shared и выжить. В коде различие — в delete-поведении и в том, кто аллоцирует/dispose'ит объект. Если вы cascade-delete shared MarketInstrument, вы приняли aggregation за composition — это и есть баг."
    }
  }
};

export const ALL_ASSOCIATION_AGGREGATION_COMPOSITION_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_AAC,
  APPLIED_BUG_HUNT_CHALLENGE_AAC,
  INTERVIEW_ANSWER_CHALLENGE_AAC
];
