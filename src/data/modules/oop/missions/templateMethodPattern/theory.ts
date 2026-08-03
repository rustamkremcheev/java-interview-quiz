import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_TEMPLATE_METHOD_PATTERN: TheoryArticle = {
  id: "art_theory_template_method_pattern",
  topicIds: ["top_oop_29"],
  conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"],
  title: {"en":"Template Method for End-of-Day Settlement","ru":"Template Method для End-of-Day Settlement"},
  summary: {"en":"Lock EndOfDaySettlementProcessor so DomesticSettlementProcessor and CrossBorderSettlementProcessor cannot bypass ComplianceCheck and SettlementAudit — final template skeleton with hooks.","ru":"Зафиксируйте EndOfDaySettlementProcessor так, чтобы DomesticSettlementProcessor и CrossBorderSettlementProcessor не обходили ComplianceCheck и SettlementAudit — final skeleton с хуками."},
  sections: [
    {
      id: "sec_tm_definition", category: "DEFINITION",
      title: { en: "1. Definition & Core Model", ru: "1. Определение и Базовая Модель" },
      blocks: [
        { id: "blk_tm_def_1", type: "PARAGRAPH", content: {"en":"EndOfDaySettlementProcessor.processBatch(SettlementBatch) must run load → ComplianceCheck → settleRail → SettlementAudit. Subclasses vary settleRail only. Broken: overridable processBatch skips checks. Fix: final processBatch template; abstract/protected settleRail hook; private compliance/audit. Hooks ≠ Strategy (strategy is injected collaborator; hook is subclass step).","ru":"EndOfDaySettlementProcessor.processBatch(SettlementBatch) должен выполнять load → ComplianceCheck → settleRail → SettlementAudit. Подклассы варьируют только settleRail. Сломано: переопределяемый processBatch пропускает проверки. Фикс: final processBatch; abstract/protected хук settleRail; private compliance/audit. Hooks ≠ Strategy."} },
        { id: "blk_tm_def_2", type: "CALLOUT", title: { en: "💡 Core Mental Model", ru: "💡 Главная Ментальная Модель" }, content: {"en":"Elevator Pitch (30 sec): CrossBorderSettlementProcessor overrode processBatch and skipped ComplianceCheck/SettlementAudit. Fix: final template on EndOfDaySettlementProcessor; abstract settleRail hook for Domestic vs CrossBorder; private compliance/audit. Distinct from CARD/WIRE abstract-class mission.","ru":"Elevator Pitch (30 сек): CrossBorderSettlementProcessor переопределил processBatch и пропустил ComplianceCheck/SettlementAudit. Фикс: final template на EndOfDaySettlementProcessor; abstract хук settleRail для Domestic vs CrossBorder; private compliance/audit. Отличие от CARD/WIRE миссии."} }
      ]
    },
    {
      id: "sec_tm_mechanics", category: "MECHANICS",
      title: { en: "2. Mechanics", ru: "2. Механика" },
      blocks: [
        { id: "blk_tm_mech_1", type: "PARAGRAPH", content: {"en":"Deep Mechanics (60 sec): Template Method defines algorithm skeleton in a method; subclasses override hooks. final processBatch prevents skeleton bypass. Hooks vary rail settlement; Strategy would inject a collaborator instead of subclassing steps. SettlementBatch flows through sealed steps.","ru":"Глубокая Механика (60 сек): Template Method задаёт skeleton алгоритма в методе; подклассы переопределяют хуки. final processBatch предотвращает обход skeleton. Хуки варьируют rail settlement; Strategy инжектит сотрудника вместо subclassing шагов."} },
        { id: "blk_tm_mech_2", type: "WARNING", title: { en: "⚙️ Production Failure Mode", ru: "⚙️ Продакшн Режим Отказа" }, content: {"en":"EOD batch cleared Domestic and CrossBorder SettlementBatch items. Compliance found CrossBorderSettlementProcessor overrode processBatch() and skipped ComplianceCheck for speed. Distinct from mis_abstract_classes (CARD/WIRE AbstractSettlementProcessor): this mission is GoF Template Method for EOD Domestic vs CrossBorder with SettlementAudit.","ru":"EOD-батч провёл Domestic и CrossBorder SettlementBatch. Compliance нашёл, что CrossBorderSettlementProcessor переопределил processBatch() и пропустил ComplianceCheck ради скорости. Отличие от mis_abstract_classes (CARD/WIRE): здесь GoF Template Method для EOD Domestic vs CrossBorder с SettlementAudit."} }
      ]
    },
    {
      id: "sec_tm_tradeoffs", category: "TRADE_OFFS",
      title: { en: "3. Trade-offs", ru: "3. Компромиссы" },
      blocks: [
        { id: "blk_tm_trade_1", type: "PARAGRAPH", content: {"en":"Production Trade-offs (30 sec): Template Method couples variation to inheritance; Strategy is more flexible but needs explicit wiring. For a fixed EOD skeleton with few rail variants, final template + hooks is clear and audit-safe.","ru":"Продакшн Компромиссы (30 сек): Template Method связывает вариацию с наследованием; Strategy гибче, но требует явного wiring. Для фиксированного EOD skeleton с немногими rail — final template + hooks ясен и audit-safe."} }
      ]
    },
    {
      id: "sec_tm_interview_followups", category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-Up Questions", ru: "4. Дополнительные Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_tm_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What does final on the template method buy you?' — Model Answer: Subclasses cannot bypass the sealed algorithm skeleton.",
            ru: "Доп. Вопрос 1: 'What does final on the template method buy you?' — Модельный Ответ: Subclasses cannot bypass the sealed algorithm skeleton."
          }
        },
        {
          id: "blk_tm_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Hook vs Strategy in one sentence?' — Model Answer: Hook = subclass step in a template; Strategy = injected collaborator.",
            ru: "Доп. Вопрос 2: 'Hook vs Strategy in one sentence?' — Модельный Ответ: Hook = subclass step in a template; Strategy = injected collaborator."
          }
        },
        {
          id: "blk_tm_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why private audit instead of protected?' — Model Answer: Protected invites skipping or reordering; private keeps the skeleton honest.",
            ru: "Доп. Вопрос 3: 'Why private audit instead of protected?' — Модельный Ответ: Protected invites skipping or reordering; private keeps the skeleton honest."
          }
        },
        {
          id: "blk_tm_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'How is this different from mis_abstract_classes?' — Model Answer: That mission is CARD/WIRE AbstractSettlementProcessor lifecycle; this is GoF EOD Domestic/CrossBorder Template Method.",
            ru: "Доп. Вопрос 4: 'How is this different from mis_abstract_classes?' — Модельный Ответ: That mission is CARD/WIRE AbstractSettlementProcessor lifecycle; this is GoF EOD Domestic/CrossBorder Template Method."
          }
        },
        {
          id: "blk_tm_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Can default methods replace abstract hooks?' — Model Answer: Sometimes for optional hooks; mandatory steps stay in the final template.",
            ru: "Доп. Вопрос 5: 'Can default methods replace abstract hooks?' — Модельный Ответ: Sometimes for optional hooks; mandatory steps stay in the final template."
          }
        },
        {
          id: "blk_tm_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Where should ComplianceCheck live?' — Model Answer: As a private step invoked by the final template before settleRail.",
            ru: "Доп. Вопрос 6: 'Where should ComplianceCheck live?' — Модельный Ответ: As a private step invoked by the final template before settleRail."
          }
        },
        {
          id: "blk_tm_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you unit-test DomesticSettlementProcessor?' — Model Answer: Test settleRail in isolation; use a test subclass or package-visible hooks carefully.",
            ru: "Доп. Вопрос 7: 'How do you unit-test DomesticSettlementProcessor?' — Модельный Ответ: Test settleRail in isolation; use a test subclass or package-visible hooks carefully."
          }
        },
        {
          id: "blk_tm_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'What if CrossBorder needs an extra step?' — Model Answer: Extend the skeleton carefully in the base (new final step) or split templates — do not let subclasses override processBatch.",
            ru: "Доп. Вопрос 8: 'What if CrossBorder needs an extra step?' — Модельный Ответ: Extend the skeleton carefully in the base (new final step) or split templates — do not let subclasses override processBatch."
          }
        },
        {
          id: "blk_tm_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Is Hollywood Principle related?' — Model Answer: Yes — don't call us, we'll call you: base calls hooks.",
            ru: "Доп. Вопрос 9: 'Is Hollywood Principle related?' — Модельный Ответ: Yes — don't call us, we'll call you: base calls hooks."
          }
        },
        {
          id: "blk_tm_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'When do you reject an EOD PR?' — Model Answer: Any override of processBatch that skips ComplianceCheck or SettlementAudit.",
            ru: "Доп. Вопрос 10: 'When do you reject an EOD PR?' — Модельный Ответ: Any override of processBatch that skips ComplianceCheck or SettlementAudit."
          }
        },
        {
          id: "blk_tm_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Template Method vs composition?' — Model Answer: Composition (Strategy) avoids inheritance coupling; Template Method is fine for stable skeletons.",
            ru: "Доп. Вопрос 11: 'Template Method vs composition?' — Модельный Ответ: Composition (Strategy) avoids inheritance coupling; Template Method is fine for stable skeletons."
          }
        },
        {
          id: "blk_tm_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Does SettlementBatch belong in the base class state?' — Model Answer: Prefer passing SettlementBatch as a parameter to avoid fragile protected mutable state.",
            ru: "Доп. Вопрос 12: 'Does SettlementBatch belong in the base class state?' — Модельный Ответ: Prefer passing SettlementBatch as a parameter to avoid fragile protected mutable state."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_tm_gof_template","src_tm_hfdp_template","src_tm_refactoring_guru","src_tm_oracle_abstract"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#tm", "#oop"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_TEMPLATE_METHOD_PATTERN: readonly TheoryCheckpoint[] = [
  {
    id: "chk_tm_1",
    theoryArticleId: "art_theory_template_method_pattern",
    question: { en: "Checkpoint 1: key idea for The Bypassed Settlement Check?", ru: "Проверка 1: ключевая идея для Обойденная Settlement-Проверка?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_tm1_a", text: { en: "Declare processBatch final on EndOfDaySettlementProcessor to seal load → ComplianceCheck → settleRail → SettlementAudit.", ru: "Объявить processBatch final на EndOfDaySettlementProcessor, закрепив load → ComplianceCheck → settleRail → SettlementAudit." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_tm1_b", text: { en: "Allow CrossBorderSettlementProcessor to override processBatch and skip ComplianceCheck for latency.", ru: "Разрешить CrossBorderSettlementProcessor переопределять processBatch и пропускать ComplianceCheck ради latency." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_tm1_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 1
  },
  {
    id: "chk_tm_2",
    theoryArticleId: "art_theory_template_method_pattern",
    question: { en: "Checkpoint 2: key idea for The Bypassed Settlement Check?", ru: "Проверка 2: ключевая идея для Обойденная Settlement-Проверка?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_tm2_a", text: { en: "Declare processBatch final on EndOfDaySettlementProcessor to seal load → ComplianceCheck → settleRail → SettlementAudit.", ru: "Объявить processBatch final на EndOfDaySettlementProcessor, закрепив load → ComplianceCheck → settleRail → SettlementAudit." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_tm2_b", text: { en: "Allow CrossBorderSettlementProcessor to override processBatch and skip ComplianceCheck for latency.", ru: "Разрешить CrossBorderSettlementProcessor переопределять processBatch и пропускать ComplianceCheck ради latency." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_tm2_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 2
  },
  {
    id: "chk_tm_3",
    theoryArticleId: "art_theory_template_method_pattern",
    question: { en: "Checkpoint 3: key idea for The Bypassed Settlement Check?", ru: "Проверка 3: ключевая идея для Обойденная Settlement-Проверка?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_tm3_a", text: { en: "Declare processBatch final on EndOfDaySettlementProcessor to seal load → ComplianceCheck → settleRail → SettlementAudit.", ru: "Объявить processBatch final на EndOfDaySettlementProcessor, закрепив load → ComplianceCheck → settleRail → SettlementAudit." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_tm3_b", text: { en: "Allow CrossBorderSettlementProcessor to override processBatch and skip ComplianceCheck for latency.", ru: "Разрешить CrossBorderSettlementProcessor переопределять processBatch и пропускать ComplianceCheck ради latency." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_tm3_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 3
  },
  {
    id: "chk_tm_4",
    theoryArticleId: "art_theory_template_method_pattern",
    question: { en: "Checkpoint 4: key idea for The Bypassed Settlement Check?", ru: "Проверка 4: ключевая идея для Обойденная Settlement-Проверка?" },
    explanation: { en: "Core concept check for this mission.", ru: "Проверка ключевой концепции миссии." },
    options: [
      { id: "opt_tm4_a", text: { en: "Declare processBatch final on EndOfDaySettlementProcessor to seal load → ComplianceCheck → settleRail → SettlementAudit.", ru: "Объявить processBatch final на EndOfDaySettlementProcessor, закрепив load → ComplianceCheck → settleRail → SettlementAudit." }, isCorrect: true, feedback: { en: "Correct!", ru: "Верно!" } },
      { id: "opt_tm4_b", text: { en: "Allow CrossBorderSettlementProcessor to override processBatch and skip ComplianceCheck for latency.", ru: "Разрешить CrossBorderSettlementProcessor переопределять processBatch и пропускать ComplianceCheck ради latency." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } },
      { id: "opt_tm4_c", text: { en: "Ignore the design and only add logging.", ru: "Игнорировать дизайн и только добавить логирование." }, isCorrect: false, feedback: { en: "Incorrect.", ru: "Неверно." } }
    ],
    order: 4
  }
];
