import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_AP: FixBuilderChallenge = {
  id: "chl_ap_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_oop_anti_patterns",
  stageId: "stg_ap_practice",
  title: {
    en: "Fix Builder: Replace Anemic Order + God Class Fulfillment",
    ru: "Конструктор Исправления: Замена Anemic Order + God Class Fulfillment"
  },
  prompt: {
    en: "OrderFulfillmentService is a 4000-line God Class operating on an anemic Order DTO. Select ALL structural building blocks required to restore a rich Order aggregate with segregated InventoryService and PaymentCapturePort.",
    ru: "OrderFulfillmentService — God Class на 4000 строк над анемичным Order DTO. Выберите ВСЕ элементы, необходимые для богатого агрегата Order с выделенными InventoryService и PaymentCapturePort."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_anemic_domain_model", "cpt_god_class", "cpt_feature_envy"],
  topicIds: ["top_oop_32"],
  tags: ["#anti-patterns", "#god-class", "#anemic-model", "#tell-dont-ask"],
  hintIds: ["hnt_ap_1", "hnt_ap_2", "hnt_ap_3", "hnt_ap_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ap_fulfillment_broken",
    solutionCodeArtifactId: "art_ap_fulfillment_solution",
    options: [
      {
        id: "opt_ap_fix_1",
        text: {
          en: "Add Order.place(PaymentCapturePort) and Order.reserveInventory(InventoryService); remove public setters that bypass invariants.",
          ru: "Добавить Order.place(PaymentCapturePort) и Order.reserveInventory(InventoryService); убрать public setters, обходящие инварианты."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Rich aggregate behavior + Tell Don't Ask eliminates Feature Envy getters/setters and centralizes validation.",
          ru: "Верно. Богатое поведение агрегата + Tell Don't Ask устраняет Feature Envy getters/setters и централизует валидацию."
        }
      },
      {
        id: "opt_ap_fix_2",
        text: {
          en: "Keep all validation in OrderFulfillmentService but extract EmailSender and AuditWriter as private inner classes.",
          ru: "Оставить всю валидацию в OrderFulfillmentService, но извлечь EmailSender и AuditWriter как private inner classes."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Inner classes do not fix Anemic Domain Model or Feature Envy — rules still live outside Order.",
          ru: "Неверно. Inner classes не исправляют Anemic Domain Model или Feature Envy — правила всё ещё вне Order."
        }
      },
      {
        id: "opt_ap_fix_3",
        text: {
          en: "Segregate InventoryService and PaymentCapturePort; shrink OrderFulfillmentService to thin orchestration of place → capture → reserve → notify.",
          ru: "Выделить InventoryService и PaymentCapturePort; сжать OrderFulfillmentService до тонкой оркестрации place → capture → reserve → notify."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. ISP-style ports destroy the God Class wiring and restore independent testability.",
          ru: "Верно. Порты в стиле ISP разрушают проводку God Class и восстанавливают независимое тестирование."
        }
      },
      {
        id: "opt_ap_fix_4",
        text: {
          en: "Make Order extend OrderFulfillmentService so domain methods inherit from the God Class automatically.",
          ru: "Сделать Order наследником OrderFulfillmentService, чтобы доменные методы наследовались от God Class автоматически."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Inheritance worsens coupling and recreates a God hierarchy — prefer composition of ports.",
          ru: "Неверно. Наследование ухудшает coupling и воссоздаёт God-иерархию — предпочитайте композицию портов."
        }
      },
      {
        id: "opt_ap_fix_distractor_1",
        text: {
          en: "Split the 4000-line class into six ~700-line services that still call order.setStatus(...) / order.setReserved(...).",
          ru: "Разбить класс на 4000 строк на шесть сервисов ~700 строк, всё ещё вызывающих order.setStatus(...) / order.setReserved(...)."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Line-count splits without moving behavior leave anemia and Feature Envy intact.",
          ru: "Неверно. Разбиение по числу строк без переноса поведения оставляет анемию и Feature Envy."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_AP: BugHuntChallenge = {
  id: "chl_ap_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_oop_anti_patterns",
  stageId: "stg_ap_debug",
  title: {
    en: "Bug Hunt: Unpaid Inventory Shipped via Feature Envy Setters",
    ru: "Поиск Бага: Отгрузка Неоплаченного Инвентаря через Feature Envy Setters"
  },
  prompt: {
    en: "OrderFulfillmentService reserved warehouse stock and marked shipment READY before payment succeeded. Click the line(s) where Feature Envy setters mutate anemic Order ahead of charge.",
    ru: "OrderFulfillmentService зарезервировал склад и пометил отгрузку READY до успеха оплаты. Нажмите строку(и), где Feature Envy setters мутируют анемичный Order до charge."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_anemic_domain_model", "cpt_god_class", "cpt_feature_envy"],
  topicIds: ["top_oop_32"],
  tags: ["#anti-patterns", "#bug-hunt", "#feature-envy"],
  hintIds: ["hnt_ap_bug_1", "hnt_ap_bug_2", "hnt_ap_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ap_fulfillment_bughunt",
    solutionCodeArtifactId: "art_ap_fulfillment_solution",
    codeSnippet: `public void fulfill(Order order) {
    if (order.getLines() == null || order.getLines().isEmpty()) {
        throw new IllegalStateException("empty");
    }
    inventory.reserve(order.getLines()); // Line 5
    order.setReserved(true);             // Line 6
    order.setShipmentStatus("READY");    // Line 7
    payment.charge(order.getCardToken(), order.total()); // Line 8
    order.setStatus("PAID");
    mailer.sendConfirmation(order.getEmail());
}`,
    lines: [
      { lineNumber: 1, code: "public void fulfill(Order order) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "    if (order.getLines() == null || order.getLines().isEmpty()) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "        throw new IllegalStateException(\"empty\");", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 5,
        code: "    inventory.reserve(order.getLines());",
        isBug: true,
        explanation: {
          en: "Line 5 reserves stock via Feature Envy getters BEFORE payment — unpaid inventory can be held/shipped when charge fails.",
          ru: "Строка 5 резервирует остаток через Feature Envy getters ДО оплаты — неоплаченный инвентарь может быть удержан/отгружен при падении charge."
        }
      },
      {
        lineNumber: 6,
        code: "    order.setReserved(true);",
        isBug: true,
        explanation: {
          en: "Line 6 mutates anemic Order via setter with no invariant gate — bypasses place()/paid-before-reserve sequencing.",
          ru: "Строка 6 мутирует анемичный Order через setter без гейта инвариантов — обходит порядок place()/paid-before-reserve."
        }
      },
      {
        lineNumber: 7,
        code: "    order.setShipmentStatus(\"READY\");",
        isBug: true,
        explanation: {
          en: "Line 7 marks shipment READY before charge succeeds — the Black Friday unpaid-ship symptom.",
          ru: "Строка 7 помечает отгрузку READY до успеха charge — симптом Black Friday с неоплаченной отгрузкой."
        }
      },
      { lineNumber: 8, code: "    payment.charge(order.getCardToken(), order.total());", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "    order.setStatus(\"PAID\");", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "    mailer.sendConfirmation(order.getEmail());", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_AP: InterviewAnswerChallenge = {
  id: "chl_ap_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_oop_anti_patterns",
  stageId: "stg_ap_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Anemic Order & God Class",
    ru: "Устный Ответ на Senior-Интервью: Anemic Order и God Class"
  },
  prompt: {
    en: "Your team shipped unpaid inventory from a 4000-line OrderFulfillmentService that mutates an anemic Order via getters/setters. Explain the anti-patterns, root cause, and production refactor to the interviewer.",
    ru: "Команда отгрузила неоплаченный инвентарь из OrderFulfillmentService на 4000 строк, мутирующего анемичный Order через getters/setters. Объясните интервьюеру антипаттерны, корневую причину и продакшн-рефакторинг."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_anemic_domain_model", "cpt_god_class", "cpt_feature_envy"],
  topicIds: ["top_oop_32"],
  tags: ["#anti-patterns", "#god-class", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ap_order_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DOMAIN_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_anemic_domain_model",
        label: { en: "Anemic Domain Model (Fowler)", ru: "Anemic Domain Model (Fowler)" },
        keywords: ["anemic", "anemic domain", "getters", "setters", "fowler", "анемичн", "dto"]
      },
      {
        id: "cpt_god_class",
        label: { en: "God Class", ru: "God Class" },
        keywords: ["god class", "god-class", "4000", "low cohesion", "божественн", "монолит"]
      },
      {
        id: "cpt_feature_envy",
        label: { en: "Feature Envy / Tell Don't Ask", ru: "Feature Envy / Tell Don't Ask" },
        keywords: ["feature envy", "tell don't ask", "tell dont ask", "getLines", "setStatus"]
      },
      {
        id: "cpt_rich_order_ports",
        label: { en: "Rich Order + Segregated Ports", ru: "Богатый Order + Выделенные Порты" },
        keywords: ["place", "reserveInventory", "InventoryService", "PaymentCapturePort", "rich", "aggregate", "порт"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Order is an Anemic Domain Model — getters/setters only — while OrderFulfillmentService is a God Class that validates, reserves, charges, emails, ships, and audits via Feature Envy. It reserved and marked READY before payment succeeded. Fix: rich Order.place()/reserveInventory() with InventoryService and PaymentCapturePort; thin orchestration.",
      ru: "Elevator Pitch (30 сек): Order — Anemic Domain Model только с getters/setters, а OrderFulfillmentService — God Class, который валидирует, резервирует, списывает, шлёт email, отгружает и пишет audit через Feature Envy. Он резервировал и ставил READY до успеха оплаты. Фикс: богатый Order.place()/reserveInventory() с InventoryService и PaymentCapturePort; тонкая оркестрация."
    },
    modelAnswerDetailed: {
      en: "Deep Domain Mechanics (60 sec): Fowler's anemia pushes invariants into procedural services, so validation is duplicated and skippable. Tell Don't Ask says command Order instead of asking for guts. God Class low cohesion makes the pipeline untestable. Rich aggregate encapsulates place() (validate + capture) and reserveInventory(); ports segregate payment and stock; email/audit stay application concerns.",
      ru: "Глубокая Механика Домена (60 сек): Анемия по Fowler выносит инварианты в процедурные сервисы — валидация дублируется и пропускается. Tell Don't Ask — командовать Order вместо запроса внутренностей. Низкая cohesion God Class делает пайплайн нетестируемым. Богатый агрегат инкапсулирует place() (validate + capture) и reserveInventory(); порты разделяют оплату и остатки; email/audit остаются application concerns."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Strangle the God Class concern-by-concern — extract PaymentCapturePort first, move invariants onto Order, delete setters, add characterization tests. Keep API DTOs anemic at the boundary, but never use the same anemic Order as the write-side domain model. Avoid six mini God Classes that still call setters.",
      ru: "Продакшн Компромиссы (30 сек): Strangle God Class по concern — сначала PaymentCapturePort, перенос инвариантов на Order, удаление setters, characterization-тесты. API DTO на границе могут быть анемичными, но не используйте тот же анемичный Order как write-side домен. Избегайте шести mini God Class, всё ещё зовущих setters."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Should sending the confirmation email live on the Order aggregate itself?'",
      ru: "Доп. Вопрос Интервьюера: 'Должна ли отправка confirmation email жить на самом агрегате Order?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: No. Domain rules belong on Order; SMTP is infrastructure. Put mailer behind an application port called by the thin orchestrator after successful place()/reserve. Otherwise you recreate a God Aggregate coupling domain invariants to email templates.",
      ru: "Ответ на Доп. Вопрос: Нет. Доменные правила — на Order; SMTP — инфраструктура. Mailer — за application port, вызываемым тонким оркестратором после успешного place()/reserve. Иначе воссоздаётся God Aggregate, связывающий инварианты с email-шаблонами."
    }
  }
};

export const ALL_ANTI_PATTERNS_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_AP,
  APPLIED_BUG_HUNT_CHALLENGE_AP,
  INTERVIEW_ANSWER_CHALLENGE_AP
];
