import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_ACCESS_MODIFIERS: readonly CodeArtifact[] = [
  {
    id: "art_am_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: LedgerEntry & InternalPostingPolicy",
      ru: "Доменные Типы: LedgerEntry и InternalPostingPolicy"
    },
    sourceCode: `package com.bank.ledger.core;

import java.math.BigDecimal;
import java.time.Instant;

public record LedgerEntry(
        String accountCode,
        BigDecimal debit,
        BigDecimal credit,
        Instant bookedAt
) {
    public LedgerEntry {
        if (accountCode == null || accountCode.isBlank()) {
            throw new IllegalArgumentException("accountCode required");
        }
        if (debit == null || credit == null) {
            throw new IllegalArgumentException("debit/credit required");
        }
    }
}

/** Package collaborator — validates journal rules before raw writes. */
final class InternalPostingPolicy {
    void validate(LedgerEntry entry) {
        if (entry.debit().signum() < 0 || entry.credit().signum() < 0) {
            throw new IllegalArgumentException("negative amounts forbidden");
        }
        if (entry.debit().signum() == 0 && entry.credit().signum() == 0) {
            throw new IllegalArgumentException("empty posting forbidden");
        }
    }
}`,
    annotations: [
      {
        id: "ann_am_domain_1",
        startLine: 28,
        endLine: 38,
        category: "WHY_IT_EXISTS",
        title: { en: "Policy Must Stay In-Package", ru: "Policy Должна Остаться В Пакете" },
        explanation: {
          en: "InternalPostingPolicy is package-private so only co-located posting paths can use it — not a substitute for sealing postRaw.",
          ru: "InternalPostingPolicy package-private, чтобы ею пользовались только соседние пути постинга — это не замена закрытию postRaw."
        },
        conceptDemonstrated: "cpt_package_private"
      }
    ],
    relatedQuestionIds: ["q_am_package_leak_01"],
    conceptIds: ["cpt_package_private"],
    tags: ["#ledger-entry", "#policy"]
  },
  {
    id: "art_am_ledger_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Protected postRaw Leak",
      ru: "Исходный Нарушенный Код: Утечка Protected postRaw"
    },
    sourceCode: `package com.bank.ledger.core;

import java.util.ArrayList;
import java.util.List;

/**
 * BUG: protected postRaw is callable from subclasses in other packages.
 */
public class GeneralLedger {
    private final List<LedgerEntry> entries = new ArrayList<>();

    protected void postRaw(LedgerEntry entry) {
        entries.add(entry);
    }

    public List<LedgerEntry> snapshot() {
        return List.copyOf(entries);
    }
}

package com.bank.reporting;

import com.bank.ledger.core.GeneralLedger;
import com.bank.ledger.core.LedgerEntry;

/** Foreign-package subclass bypasses JournalPostingFacade + policy. */
public class ReconciliationHook extends GeneralLedger {
    public void forceAdjust(LedgerEntry entry) {
        postRaw(entry);
    }
}`,
    annotations: [
      {
        id: "ann_broken_am_1",
        startLine: 12,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Protected Widens Across Packages", ru: "Protected Расширяет Через Пакеты" },
        explanation: {
          en: "protected members are visible to subclasses outside the package — reporting can skip the facade.",
          ru: "protected-члены видны subclasses вне пакета — reporting может обойти facade."
        },
        conceptDemonstrated: "cpt_protected_coupling"
      },
      {
        id: "ann_broken_am_2",
        startLine: 28,
        endLine: 28,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Bypass Call Site", ru: "Точка Обхода" },
        explanation: {
          en: "forceAdjust calls postRaw directly — InternalPostingPolicy never runs.",
          ru: "forceAdjust вызывает postRaw напрямую — InternalPostingPolicy никогда не выполняется."
        },
        conceptDemonstrated: "cpt_access_modifiers"
      }
    ],
    relatedQuestionIds: ["q_am_package_leak_01"],
    conceptIds: ["cpt_access_modifiers", "cpt_protected_coupling"],
    tags: ["#counter-example", "#package-leak"]
  },
  {
    id: "art_am_facade_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed: Package-Private Ledger + JournalPostingFacade",
      ru: "Исправлено: Package-Private Ledger + JournalPostingFacade"
    },
    sourceCode: `package com.bank.ledger.core;

import java.util.ArrayList;
import java.util.List;

/** Package-private ledger — not subclassable from reporting packages. */
final class GeneralLedger {
    private final List<LedgerEntry> entries = new ArrayList<>();

    void postRaw(LedgerEntry entry) {
        entries.add(entry);
    }

    List<LedgerEntry> snapshot() {
        return List.copyOf(entries);
    }
}

/** Sole public entry point for journal posts. */
public final class JournalPostingFacade {
    private final GeneralLedger ledger = new GeneralLedger();
    private final InternalPostingPolicy policy = new InternalPostingPolicy();

    public void post(LedgerEntry entry) {
        policy.validate(entry);
        ledger.postRaw(entry);
    }

    public List<LedgerEntry> entries() {
        return ledger.snapshot();
    }
}`,
    annotations: [
      {
        id: "ann_sol_am_1",
        startLine: 7,
        endLine: 7,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Final + Package-Private Class", ru: "Final + Package-Private Class" },
        explanation: {
          en: "GeneralLedger is not public and is final — foreign packages cannot subclass or call postRaw.",
          ru: "GeneralLedger не public и final — чужие пакеты не могут унаследовать или вызвать postRaw."
        },
        conceptDemonstrated: "cpt_package_private"
      },
      {
        id: "ann_sol_am_2",
        startLine: 22,
        endLine: 25,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Facade Enforces Policy", ru: "Facade Применяет Policy" },
        explanation: {
          en: "Every post goes through validate then package-visible postRaw — no alternate path.",
          ru: "Каждый пост идёт через validate, затем package-visible postRaw — без альтернативного пути."
        },
        conceptDemonstrated: "cpt_access_modifiers"
      }
    ],
    relatedQuestionIds: ["q_am_package_leak_01"],
    conceptIds: ["cpt_access_modifiers", "cpt_package_private"],
    tags: ["#solution", "#facade"]
  },
  {
    id: "art_am_hook_collaborator",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "ReconciliationHook as In-Package Collaborator",
      ru: "ReconciliationHook Как Collaborator В Пакете"
    },
    sourceCode: `package com.bank.ledger.core;

/**
 * Extension without protected inheritance across packages:
 * hooks are registered and invoked by the facade after policy.
 */
public interface ReconciliationHook {
    void afterPost(LedgerEntry entry);
}

public final class JournalPostingFacade {
    private final GeneralLedger ledger = new GeneralLedger();
    private final InternalPostingPolicy policy = new InternalPostingPolicy();
    private final ReconciliationHook hook;

    public JournalPostingFacade(ReconciliationHook hook) {
        this.hook = hook;
    }

    public void post(LedgerEntry entry) {
        policy.validate(entry);
        ledger.postRaw(entry);
        hook.afterPost(entry);
    }
}`,
    annotations: [
      {
        id: "ann_am_hook_1",
        startLine: 7,
        endLine: 9,
        category: "WHY_IT_EXISTS",
        title: { en: "Composition over Protected Subclassing", ru: "Composition вместо Protected Subclassing" },
        explanation: {
          en: "Reporting implements afterPost without inheriting GeneralLedger or seeing postRaw.",
          ru: "Reporting реализует afterPost без наследования GeneralLedger и без доступа к postRaw."
        },
        conceptDemonstrated: "cpt_protected_coupling"
      }
    ],
    relatedQuestionIds: ["q_am_package_leak_01"],
    conceptIds: ["cpt_protected_coupling", "cpt_access_modifiers"],
    tags: ["#reconciliation-hook", "#composition"]
  },
  {
    id: "art_am_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Protected Leak Call Site",
      ru: "Сниппет Bug Hunt: Точка Утечки Protected"
    },
    sourceCode: `package com.bank.ledger.core;
public class GeneralLedger {
    protected void postRaw(LedgerEntry entry) {
        entries.add(entry);
    }
}
package com.bank.reporting;
public class ReconciliationHook extends GeneralLedger {
    public void forceAdjust(LedgerEntry e) {
        postRaw(e);
    }
}`,
    annotations: [
      {
        id: "ann_bug_am_1",
        startLine: 3,
        endLine: 3,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Widened Declaration", ru: "Расширенное Объявление" },
        explanation: {
          en: "protected on postRaw is the access-control defect enabling cross-package subclass calls.",
          ru: "protected у postRaw — дефект access-control, открывающий вызовы из subclasses других пакетов."
        },
        conceptDemonstrated: "cpt_protected_coupling"
      }
    ],
    relatedQuestionIds: ["q_am_package_leak_01"],
    conceptIds: ["cpt_protected_coupling"],
    tags: ["#bug-hunt"]
  }
];
