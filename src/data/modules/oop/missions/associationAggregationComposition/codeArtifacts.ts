import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_ASSOCIATION_AGGREGATION_COMPOSITION: readonly CodeArtifact[] = [
  {
    id: "art_aac_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: Holding, MarketInstrument, PricingFeed",
      ru: "Доменные Типы: Holding, MarketInstrument, PricingFeed"
    },
    sourceCode: `package com.bank.wealth.portfolio;

import java.math.BigDecimal;

/** Composed part of a Portfolio — owned lifecycle. */
public final class Holding {
    private final String holdingId;
    private final String instrumentSymbol;
    private BigDecimal quantity;

    public Holding(String holdingId, String instrumentSymbol, BigDecimal quantity) {
        this.holdingId = holdingId;
        this.instrumentSymbol = instrumentSymbol;
        this.quantity = quantity;
    }

    public String holdingId() { return holdingId; }
    public String instrumentSymbol() { return instrumentSymbol; }
    public BigDecimal quantity() { return quantity; }
}

/** Shared market catalog entity — association, not owned by one portfolio. */
public final class MarketInstrument {
    private final String symbol;
    private final String mic;

    public MarketInstrument(String symbol, String mic) {
        this.symbol = symbol;
        this.mic = mic;
    }

    public String symbol() { return symbol; }
    public String mic() { return mic; }

    public void delete() {
        throw new UnsupportedOperationException("catalog instruments are not portfolio-owned");
    }
}

/** Shared pricing infrastructure — many portfolios may associate to it. */
public final class PricingFeed {
    private final String feedId;
    private boolean running = true;

    public PricingFeed(String feedId) { this.feedId = feedId; }
    public String feedId() { return feedId; }
    public boolean isRunning() { return running; }

    public void shutdown() { running = false; }
}`,
    annotations: [
      {
        id: "ann_aac_domain_1",
        startLine: 28,
        endLine: 45,
        category: "WHY_IT_EXISTS",
        title: { en: "Catalog vs Owned Holding", ru: "Catalog vs Owned Holding" },
        explanation: {
          en: "MarketInstrument is a shared catalog type; Holding is the portfolio-owned position that references a symbol.",
          ru: "MarketInstrument — shared catalog-тип; Holding — portfolio-owned позиция, ссылающаяся на symbol."
        },
        conceptDemonstrated: "cpt_association"
      }
    ],
    relatedQuestionIds: ["q_aac_portfolio_ownership_01"],
    conceptIds: ["cpt_association", "cpt_composition_ownership"],
    tags: ["#holding", "#market-instrument"]
  },
  {
    id: "art_aac_portfolio_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Cascade Delete & Live List",
      ru: "Исходный Нарушенный Код: Cascade Delete и Живой Список"
    },
    sourceCode: `package com.bank.wealth.portfolio;

import java.util.ArrayList;
import java.util.List;

/**
 * BUG: delete cascades onto shared instrument/feed; getHoldings leaks live list.
 */
public class Portfolio {
    private final String portfolioId;
    private final BrokerageAccount account;
    private final List<Holding> holdings = new ArrayList<>();
    private MarketInstrument primaryInstrument;
    private PricingFeed feed;

    public Portfolio(String portfolioId, BrokerageAccount account) {
        this.portfolioId = portfolioId;
        this.account = account;
    }

    public void link(MarketInstrument instrument, PricingFeed feed) {
        this.primaryInstrument = instrument;
        this.feed = feed;
    }

    public void addHolding(Holding holding) {
        holdings.add(holding);
    }

    public List<Holding> getHoldings() {
        return holdings;
    }

    public void delete() {
        holdings.clear();
        if (primaryInstrument != null) {
            primaryInstrument.delete();
        }
        if (feed != null) {
            feed.shutdown();
        }
        primaryInstrument = null;
        feed = null;
    }

    public BrokerageAccount account() { return account; }
    public String portfolioId() { return portfolioId; }
}`,
    annotations: [
      {
        id: "ann_broken_aac_1",
        startLine: 30,
        endLine: 30,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Live Holdings Leak", ru: "Утечка Живых Holdings" },
        explanation: {
          en: "Returning the internal list lets callers mutate composed state outside Portfolio.",
          ru: "Возврат внутреннего списка позволяет вызывающим мутировать composed-состояние вне Portfolio."
        },
        conceptDemonstrated: "cpt_composition_ownership"
      },
      {
        id: "ann_broken_aac_2",
        startLine: 36,
        endLine: 41,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Cascade onto Shared Parts", ru: "Cascade на Shared-Части" },
        explanation: {
          en: "Deleting/shutting shared MarketInstrument and PricingFeed breaks other portfolios.",
          ru: "Удаление/shutdown shared MarketInstrument и PricingFeed ломает другие portfolio."
        },
        conceptDemonstrated: "cpt_association"
      }
    ],
    relatedQuestionIds: ["q_aac_portfolio_ownership_01"],
    conceptIds: ["cpt_association", "cpt_composition_ownership"],
    tags: ["#counter-example", "#ownership"]
  },
  {
    id: "art_aac_portfolio_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed Portfolio: Compose Holdings, Associate Shared Catalog",
      ru: "Исправленный Portfolio: Compose Holdings, Associate Shared Catalog"
    },
    sourceCode: `package com.bank.wealth.portfolio;

import java.util.ArrayList;
import java.util.List;

public class Portfolio {
    private final String portfolioId;
    private final BrokerageAccount account;
    private final List<Holding> holdings = new ArrayList<>();
    private MarketInstrument primaryInstrument;
    private PricingFeed feed;

    public Portfolio(String portfolioId, BrokerageAccount account) {
        this.portfolioId = portfolioId;
        this.account = account;
    }

    public void link(MarketInstrument instrument, PricingFeed feed) {
        this.primaryInstrument = instrument;
        this.feed = feed;
    }

    public void addHolding(Holding holding) {
        holdings.add(holding);
    }

    /** Defensive exposure of composed holdings. */
    public List<Holding> getHoldings() {
        return List.copyOf(holdings);
    }

    /**
     * Composition: clear owned holdings.
     * Association: drop references only — do not destroy shared catalog/feed.
     */
    public void delete() {
        holdings.clear();
        primaryInstrument = null;
        feed = null;
    }

    public BrokerageAccount account() { return account; }
    public String portfolioId() { return portfolioId; }
    public MarketInstrument primaryInstrument() { return primaryInstrument; }
    public PricingFeed feed() { return feed; }
}`,
    annotations: [
      {
        id: "ann_sol_aac_1",
        startLine: 26,
        endLine: 28,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Copy, Don't Leak", ru: "Copy, Не Leak" },
        explanation: {
          en: "List.copyOf preserves composition ownership — callers cannot clear the internal list.",
          ru: "List.copyOf сохраняет composition ownership — вызывающие не могут очистить внутренний список."
        },
        conceptDemonstrated: "cpt_composition_ownership"
      },
      {
        id: "ann_sol_aac_2",
        startLine: 34,
        endLine: 38,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Drop References, Keep Shared Parts", ru: "Сбросить Ссылки, Сохранить Shared" },
        explanation: {
          en: "Nulling associations ends this portfolio's links without destroying MarketInstrument or PricingFeed.",
          ru: "Обнуление associations завершает связи этого portfolio без уничтожения MarketInstrument или PricingFeed."
        },
        conceptDemonstrated: "cpt_aggregation"
      }
    ],
    relatedQuestionIds: ["q_aac_portfolio_ownership_01"],
    conceptIds: ["cpt_aggregation", "cpt_composition_ownership"],
    tags: ["#solution", "#portfolio"]
  },
  {
    id: "art_aac_brokerage_account",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "BrokerageAccount: Association Partner",
      ru: "BrokerageAccount: Партнёр Association"
    },
    sourceCode: `package com.bank.wealth.portfolio;

/**
 * BrokerageAccount associates with many portfolios over time.
 * Closing one Portfolio must not delete the account.
 */
public final class BrokerageAccount {
    private final String accountNumber;

    public BrokerageAccount(String accountNumber) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("accountNumber required");
        }
        this.accountNumber = accountNumber;
    }

    public String accountNumber() {
        return accountNumber;
    }
}`,
    annotations: [
      {
        id: "ann_aac_account_1",
        startLine: 4,
        endLine: 7,
        category: "WHY_IT_EXISTS",
        title: { en: "Account Outlives Portfolio", ru: "Account Переживает Portfolio" },
        explanation: {
          en: "BrokerageAccount is an association partner — aggregation-style shared lifecycle relative to a single Portfolio.",
          ru: "BrokerageAccount — партнёр association — aggregation-style shared lifecycle относительно одного Portfolio."
        },
        conceptDemonstrated: "cpt_aggregation"
      }
    ],
    relatedQuestionIds: ["q_aac_portfolio_ownership_01"],
    conceptIds: ["cpt_association", "cpt_aggregation"],
    tags: ["#brokerage-account"]
  },
  {
    id: "art_aac_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Ownership Failures",
      ru: "Сниппет Bug Hunt: Сбои Ownership"
    },
    sourceCode: `public class Portfolio {
    private final List<Holding> holdings = new ArrayList<>();
    private MarketInstrument instrument;
    private PricingFeed feed;
    public List<Holding> getHoldings() {
        return holdings;
    }
    public void delete() {
        holdings.clear();
        instrument.delete();
        feed.shutdown();
    }
}`,
    annotations: [
      {
        id: "ann_bug_aac_1",
        startLine: 6,
        endLine: 6,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Live List Return", ru: "Возврат Живого Списка" },
        explanation: {
          en: "This line leaks the composed holdings collection by reference.",
          ru: "Эта строка утекает composed-коллекцию holdings по ссылке."
        },
        conceptDemonstrated: "cpt_composition_ownership"
      }
    ],
    relatedQuestionIds: ["q_aac_portfolio_ownership_01"],
    conceptIds: ["cpt_composition_ownership", "cpt_association"],
    tags: ["#bug-hunt"]
  }
];
