import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_ACCESS_MODIFIERS: readonly MistakePattern[] = [
  {
    id: "err_am_public_postraw",
    code: "ERR_AM_PUBLIC_POSTRAW",
    title: {
      en: "Making Internal postRaw Public",
      ru: "Делать Внутренний postRaw Public"
    },
    description: {
      en: "Exposing GeneralLedger.postRaw as public so any service can write LedgerEntry rows without InternalPostingPolicy.",
      ru: "Открывать GeneralLedger.postRaw как public, чтобы любой сервис писал LedgerEntry без InternalPostingPolicy."
    },
    conceptIds: ["cpt_access_modifiers", "cpt_package_private"],
    exampleIncorrectReasoning: {
      en: "Reporting needs to post adjustments quickly — make postRaw public for convenience.",
      ru: "Reporting нужно быстро проводить корректировки — сделаем postRaw public для удобства."
    },
    correctedReasoning: {
      en: "Keep postRaw package-private; expose only JournalPostingFacade methods that enforce InternalPostingPolicy.",
      ru: "Держите postRaw package-private; открывайте только методы JournalPostingFacade, применяющие InternalPostingPolicy."
    },
    remediationMissionIds: ["mis_access_modifiers"]
  },
  {
    id: "err_am_protected_for_foreign_subclass",
    code: "ERR_AM_PROTECTED_FOREIGN_SUBCLASS",
    title: {
      en: "Using Protected to Enable Foreign-Package Subclasses",
      ru: "Использовать Protected для Subclasses из Чужого Пакета"
    },
    description: {
      en: "Marking ledger mutators protected so ReconciliationHook in another package can subclass and call them, bypassing the facade.",
      ru: "Помечать mutators ledger как protected, чтобы ReconciliationHook в другом пакете мог унаследовать и вызвать их, минуя facade."
    },
    conceptIds: ["cpt_protected_coupling", "cpt_access_modifiers"],
    exampleIncorrectReasoning: {
      en: "Protected is safer than public — subclasses in reporting can reuse posting.",
      ru: "Protected безопаснее public — subclasses в reporting могут переиспользовать постинг."
    },
    correctedReasoning: {
      en: "Protected still crosses package boundaries for subclasses. Prefer package-private + composition/hooks registered in-package, or a sealed hierarchy.",
      ru: "Protected всё равно пересекает границы пакета для subclasses. Предпочитайте package-private + composition/hooks в пакете или sealed hierarchy."
    },
    remediationMissionIds: ["mis_access_modifiers"]
  },
  {
    id: "err_am_ignore_package_private",
    code: "ERR_AM_IGNORE_PACKAGE_PRIVATE",
    title: {
      en: "Ignoring Default Package-Private as a Design Tool",
      ru: "Игнорирование Package-Private Как Инструмента Дизайна"
    },
    description: {
      en: "Treating the default (package) access level as an accident instead of the primary tool for co-locating GeneralLedger, policy, and facade.",
      ru: "Считать default (package) access случайностью, а не основным инструментом совместного размещения GeneralLedger, policy и facade."
    },
    conceptIds: ["cpt_package_private"],
    exampleIncorrectReasoning: {
      en: "If it is not public, it might as well be private — package visibility is unused.",
      ru: "Если не public, то всё равно что private — package visibility не нужна."
    },
    correctedReasoning: {
      en: "Package-private lets InternalPostingPolicy and JournalPostingFacade share internals without exporting them to the rest of the codebase.",
      ru: "Package-private позволяет InternalPostingPolicy и JournalPostingFacade делить internals без экспорта в остальной код."
    },
    remediationMissionIds: ["mis_access_modifiers"]
  },
  {
    id: "err_am_facade_optional",
    code: "ERR_AM_FACADE_OPTIONAL",
    title: {
      en: "Treating JournalPostingFacade as Optional Convenience",
      ru: "Считать JournalPostingFacade Опциональным Удобством"
    },
    description: {
      en: "Leaving a public facade while also allowing direct GeneralLedger access, so policy remains skippable.",
      ru: "Оставлять public facade и одновременно прямой доступ к GeneralLedger, так что policy можно пропустить."
    },
    conceptIds: ["cpt_access_modifiers", "cpt_package_private"],
    exampleIncorrectReasoning: {
      en: "Teams can choose facade or direct ledger — both are fine.",
      ru: "Команды могут выбирать facade или прямой ledger — оба варианта нормальны."
    },
    correctedReasoning: {
      en: "If the facade is the control point, internals must be inaccessible from outside the package so policy cannot be skipped.",
      ru: "Если facade — точка контроля, internals должны быть недоступны снаружи пакета, чтобы policy нельзя было обойти."
    },
    remediationMissionIds: ["mis_access_modifiers"]
  },
  {
    id: "err_am_widen_for_tests_only",
    code: "ERR_AM_WIDEN_FOR_TESTS",
    title: {
      en: "Widening Access Permanently for Tests",
      ru: "Постоянно Расширять Access Ради Тестов"
    },
    description: {
      en: "Making postRaw public/protected so unit tests in another package can drive the ledger, then shipping that visibility to production.",
      ru: "Делать postRaw public/protected, чтобы тесты в другом пакете драйвили ledger, и оставлять эту видимость в продакшне."
    },
    conceptIds: ["cpt_access_modifiers", "cpt_protected_coupling"],
    exampleIncorrectReasoning: {
      en: "Testability requires public mutators on GeneralLedger.",
      ru: "Тестируемость требует public mutators у GeneralLedger."
    },
    correctedReasoning: {
      en: "Prefer same-package tests, package-visible test fixtures, or testing through JournalPostingFacade — do not widen production API for foreign-package tests.",
      ru: "Предпочитайте same-package тесты, package-visible fixtures или тесты через JournalPostingFacade — не расширяйте production API ради тестов из чужого пакета."
    },
    remediationMissionIds: ["mis_access_modifiers"]
  }
];
