import { Hint } from '../../../../../types/domain';

export const HINTS_DEPENDENCY_INJECTION: readonly Hint[] = [
  {
    id: "hnt_di_1",
    challengeId: "chl_di_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Unit tests use `new SettlementOrchestrator()` while Spring tests use the container. Which wiring path only the container performs?",
      ru: "Направляющая Подсказка: Юнит-тесты делают `new SettlementOrchestrator()`, Spring-тесты — через контейнер. Какую проводку выполняет только контейнер?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_di_2",
    challengeId: "chl_di_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Field @Autowired is invisible in the type signature and stays null without Spring. Constructor injection + final fields makes mandatory FxRateGateway/LedgerGateway explicit.",
      ru: "Напоминание Концепции: Field @Autowired невидим в сигнатуре типа и остаётся null без Spring. Constructor injection + final-поля делают обязательные FxRateGateway/LedgerGateway явными."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_di_3",
    challengeId: "chl_di_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Add SettlementOrchestrator(FxRateGateway, LedgerGateway), assign private final fields, remove field @Autowired, and delete `new LiveFxRateGateway()` from settle().",
      ru: "Механика Работы: Добавьте SettlementOrchestrator(FxRateGateway, LedgerGateway), назначьте private final поля, уберите field @Autowired и удалите `new LiveFxRateGateway()` из settle()."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_di_4",
    challengeId: "chl_di_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Depend only on FxRateGateway/LedgerGateway ports; composition root supplies LiveFxRateGateway. Unit test: `new SettlementOrchestrator(mockFx, mockLedger)`.",
      ru: "Структура Решения: Зависеть только от портов FxRateGateway/LedgerGateway; composition root поставляет LiveFxRateGateway. Юнит-тест: `new SettlementOrchestrator(mockFx, mockLedger)`."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_di_bug_1",
    challengeId: "chl_di_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look at how fxRates and ledger are declared, and whether settle() constructs any concrete gateway with `new`.",
      ru: "Направляющая Подсказка: Посмотрите, как объявлены fxRates и ledger, и создаёт ли settle() конкретный gateway через `new`."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_di_bug_2",
    challengeId: "chl_di_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: @Autowired on private fields does nothing under plain `new`. `new LiveFxRateGateway()` is a DIP smell even if it 'fixes' a null check.",
      ru: "Напоминание Концепции: @Autowired на private-полях ничего не делает при обычном `new`. `new LiveFxRateGateway()` — запах DIP, даже если 'чинит' null-check."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_di_bug_3",
    challengeId: "chl_di_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: Bug lines — private FxRateGateway fxRates field, private LedgerGateway ledger field, and `rates = new LiveFxRateGateway();` inside settle().",
      ru: "Механика Работы: Баговые строки — поле private FxRateGateway fxRates, поле private LedgerGateway ledger и `rates = new LiveFxRateGateway();` внутри settle()."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_di_bug_4",
    challengeId: "chl_di_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select the fxRates field line, the ledger field line, and/or the `new LiveFxRateGateway()` assignment in the Bug Hunt editor.",
      ru: "Структура Решения: Выберите строку поля fxRates, строку поля ledger и/или присвоение `new LiveFxRateGateway()` в редакторе Bug Hunt."
    },
    xpPenalty: 75,
    order: 4
  }
];
