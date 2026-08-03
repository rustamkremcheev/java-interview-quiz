import {
  FixBuilderChallenge, BugHuntChallenge, InterviewAnswerChallenge, Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_TM: FixBuilderChallenge = {
  id: "chl_tm_fix_builder", type: "FIX_BUILDER", missionId: "mis_template_method_pattern", stageId: "stg_tm_practice",
  title: { en: "Fix Builder: The Bypassed Settlement Check", ru: "Конструктор Исправления: Обойденная Settlement-Проверка" },
  prompt: { en: "Lock EndOfDaySettlementProcessor so DomesticSettlementProcessor and CrossBorderSettlementProcessor cannot bypass ComplianceCheck and SettlementAudit — final template skeleton with hooks.", ru: "Зафиксируйте EndOfDaySettlementProcessor так, чтобы DomesticSettlementProcessor и CrossBorderSettlementProcessor не обходили ComplianceCheck и SettlementAudit — final skeleton с хуками." },
  difficulty: "SENIOR", assistanceLevel: "GUIDED",
  conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], topicIds: ["top_oop_29"],
  tags: ["#tm", "#fix-builder"],
  hintIds: ["hnt_tm_1", "hnt_tm_2", "hnt_tm_3", "hnt_tm_4"],
  xpReward: 100, order: 7,
  payload: {
    baseCodeArtifactId: "art_tm_broken",
    solutionCodeArtifactId: "art_tm_solution",
    options: [
      {
        id: "opt_tm_fix_1",
        text: {"en":"Declare processBatch final on EndOfDaySettlementProcessor to seal load → ComplianceCheck → settleRail → SettlementAudit.","ru":"Объявить processBatch final на EndOfDaySettlementProcessor, закрепив load → ComplianceCheck → settleRail → SettlementAudit."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_tm_fix_2",
        text: {"en":"Let DomesticSettlementProcessor and CrossBorderSettlementProcessor implement only the settleRail hook.","ru":"Пусть DomesticSettlementProcessor и CrossBorderSettlementProcessor реализуют только хук settleRail."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_tm_fix_3",
        text: {"en":"Allow CrossBorderSettlementProcessor to override processBatch and skip ComplianceCheck for latency.","ru":"Разрешить CrossBorderSettlementProcessor переопределять processBatch и пропускать ComplianceCheck ради latency."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      },
      {
        id: "opt_tm_fix_4",
        text: {"en":"Keep compliance and audit private in the base template so subclasses cannot skip them.","ru":"Держать compliance и audit private в базовом шаблоне, чтобы подклассы не могли их пропустить."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_tm_fix_5",
        text: {"en":"Replace the template with a Strategy that subclasses inherit by copying processBatch.","ru":"Заменить шаблон на Strategy, которую подклассы наследуют копированием processBatch."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_TM: BugHuntChallenge = {
  id: "chl_tm_bughunt", type: "BUG_HUNT", missionId: "mis_template_method_pattern", stageId: "stg_tm_debug",
  title: { en: "Bug Hunt: The Bypassed Settlement Check", ru: "Поиск Бага: Обойденная Settlement-Проверка" },
  prompt: { en: "Click the defective line(s). Non-defect lines are distractors.", ru: "Нажмите дефектную строку(и). Остальные — дистракторы." },
  difficulty: "SENIOR", assistanceLevel: "APPLIED",
  conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], topicIds: ["top_oop_29"],
  tags: ["#tm", "#bug-hunt"],
  hintIds: ["hnt_tm_bug_1", "hnt_tm_bug_2", "hnt_tm_bug_3"],
  xpReward: 100, order: 10,
  payload: {
    baseCodeArtifactId: "art_tm_bughunt",
    solutionCodeArtifactId: "art_tm_solution",
    codeSnippet: `    public void processBatch(SettlementBatch batch) {\n        settleRail(batch); // Line 4 — subclass override skips compliance\n        // missing complianceCheck(batch);\n        // missing settlementAudit.record(batch);\n    }`,
    lines: [
      { lineNumber: 3, code: "    public void processBatch(SettlementBatch batch) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 4, code: "        settleRail(batch); // Line 4 — subclass override skips compliance", isBug: true, explanation: {"en":"Line 4: Overridden processBatch calls settleRail only — ComplianceCheck and SettlementAudit bypassed.","ru":"Строка 4: Переопределённый processBatch вызывает только settleRail — ComplianceCheck и SettlementAudit обойдены."} },
      { lineNumber: 5, code: "        // missing complianceCheck(batch);", isBug: true, explanation: {"en":"Line 5: Explicit omission of compliance step in the override.","ru":"Строка 5: Явный пропуск шага compliance в override."} },
      { lineNumber: 6, code: "        // missing settlementAudit.record(batch);", isBug: true, explanation: {"en":"Line 6: Audit step omitted — template skeleton not sealed.","ru":"Строка 6: Шаг audit пропущен — skeleton шаблона не закреплён."} },
      { lineNumber: 7, code: "    }", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_TM: InterviewAnswerChallenge = {
  id: "chl_tm_interview_answer", type: "INTERVIEW_ANSWER", missionId: "mis_template_method_pattern", stageId: "stg_tm_interview_a",
  title: { en: "Senior Interview Verbal Explanation", ru: "Устный Ответ на Senior-Интервью" },
  prompt: { en: "Lock EndOfDaySettlementProcessor so DomesticSettlementProcessor and CrossBorderSettlementProcessor cannot bypass ComplianceCheck and SettlementAudit — final template skeleton with hooks.", ru: "Зафиксируйте EndOfDaySettlementProcessor так, чтобы DomesticSettlementProcessor и CrossBorderSettlementProcessor не обходили ComplianceCheck и SettlementAudit — final skeleton с хуками." },
  difficulty: "SENIOR", assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_template_method","cpt_final_template_skeleton","cpt_hook_vs_strategy"], topicIds: ["top_oop_29"],
  tags: ["#tm", "#interview"], hintIds: [], xpReward: 150, order: 9,
  payload: {
    targetQuestionId: "q_tm_eod_01",
    rubricDimensions: ["ELEVATOR_PITCH", "MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [{"id":"cpt_template_method","label":{"en":"template method","ru":"template method"},"keywords":["template","method"]},{"id":"cpt_final_template_skeleton","label":{"en":"final template skeleton","ru":"final template skeleton"},"keywords":["final","template","skeleton"]},{"id":"cpt_hook_vs_strategy","label":{"en":"hook vs strategy","ru":"hook vs strategy"},"keywords":["hook","vs","strategy"]}],
    modelAnswer30s: {"en":"Elevator Pitch (30 sec): CrossBorderSettlementProcessor overrode processBatch and skipped ComplianceCheck/SettlementAudit. Fix: final template on EndOfDaySettlementProcessor; abstract settleRail hook for Domestic vs CrossBorder; private compliance/audit. Distinct from CARD/WIRE abstract-class mission.","ru":"Elevator Pitch (30 сек): CrossBorderSettlementProcessor переопределил processBatch и пропустил ComplianceCheck/SettlementAudit. Фикс: final template на EndOfDaySettlementProcessor; abstract хук settleRail для Domestic vs CrossBorder; private compliance/audit. Отличие от CARD/WIRE миссии."},
    modelAnswerDetailed: {"en":"Deep Mechanics (60 sec): Template Method defines algorithm skeleton in a method; subclasses override hooks. final processBatch prevents skeleton bypass. Hooks vary rail settlement; Strategy would inject a collaborator instead of subclassing steps. SettlementBatch flows through sealed steps.","ru":"Глубокая Механика (60 сек): Template Method задаёт skeleton алгоритма в методе; подклассы переопределяют хуки. final processBatch предотвращает обход skeleton. Хуки варьируют rail settlement; Strategy инжектит сотрудника вместо subclassing шагов."},
    modelAnswerTradeOffs: {"en":"Production Trade-offs (30 sec): Template Method couples variation to inheritance; Strategy is more flexible but needs explicit wiring. For a fixed EOD skeleton with few rail variants, final template + hooks is clear and audit-safe.","ru":"Продакшн Компромиссы (30 сек): Template Method связывает вариацию с наследованием; Strategy гибче, но требует явного wiring. Для фиксированного EOD skeleton с немногими rail — final template + hooks ясен и audit-safe."},
    followUpQuestionText: {"en":"Interviewer Follow-Up: 'When would you prefer Strategy over Template Method here?'","ru":"Доп. Вопрос: 'Когда предпочтёте Strategy вместо Template Method?'"},
    followUpModelAnswerText: {"en":"Follow-up: When settlement rails are numerous, runtime-swappable, or owned by different modules that should not subclass a shared processor — inject SettleRailStrategy instead of Domestic/CrossBorder subclasses.","ru":"Ответ: Когда rails много, runtime-сменяемы или принадлежат модулям, которым не следует наследовать общий processor — инжектите SettleRailStrategy вместо подклассов Domestic/CrossBorder."}
  }
};

export const ALL_TEMPLATE_METHOD_PATTERN_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_TM,
  APPLIED_BUG_HUNT_CHALLENGE_TM,
  INTERVIEW_ANSWER_CHALLENGE_TM
];
