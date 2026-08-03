import {
  FixBuilderChallenge, BugHuntChallenge, InterviewAnswerChallenge, Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_OBS: FixBuilderChallenge = {
  id: "chl_obs_fix_builder", type: "FIX_BUILDER", missionId: "mis_observer_pattern", stageId: "stg_obs_practice",
  title: { en: "Fix Builder: The Duplicate Compliance Alert", ru: "Конструктор Исправления: Дублирующий Compliance Alert" },
  prompt: { en: "Fix TransactionEventPublisher subscription lifecycle so ComplianceAlertObserver is not registered twice and observer exceptions cannot kill AuditObserver/FraudAnalyticsObserver notifications.", ru: "Исправьте lifecycle подписок TransactionEventPublisher, чтобы ComplianceAlertObserver не регистрировался дважды и исключения observer не убивали уведомления AuditObserver/FraudAnalyticsObserver." },
  difficulty: "SENIOR", assistanceLevel: "GUIDED",
  conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], topicIds: ["top_oop_30"],
  tags: ["#obs", "#fix-builder"],
  hintIds: ["hnt_obs_1", "hnt_obs_2", "hnt_obs_3", "hnt_obs_4"],
  xpReward: 100, order: 7,
  payload: {
    baseCodeArtifactId: "art_obs_broken",
    solutionCodeArtifactId: "art_obs_solution",
    options: [
      {
        id: "opt_obs_fix_1",
        text: {"en":"Track Subscriptions and make subscribe idempotent (or return a Subscription token used to unsubscribe).","ru":"Вести Subscriptions и сделать subscribe идемпотентным (или возвращать токен Subscription для unsubscribe)."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_obs_fix_2",
        text: {"en":"In notifyObservers, catch per-observer exceptions so AuditObserver still runs if FraudAnalyticsObserver throws.","ru":"В notifyObservers ловить исключения per-observer, чтобы AuditObserver выполнялся, если FraudAnalyticsObserver бросает."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_obs_fix_3",
        text: {"en":"Push all alerts through Kafka topics instead of fixing in-process Observer lifecycle.","ru":"Прогнать все alerts через Kafka вместо фикса in-process lifecycle Observer."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      },
      {
        id: "opt_obs_fix_4",
        text: {"en":"Ensure ComplianceAlertObserver is unsubscribed on shutdown/redeploy paths.","ru":"Гарантировать unsubscribe ComplianceAlertObserver на путях shutdown/redeploy."},
        isCorrect: true,
        explanation: {"en":"Correct. Required structural fix.","ru":"Верно. Необходимый структурный фикс."}
      },
      {
        id: "opt_obs_fix_5",
        text: {"en":"Keep adding the same observer instance on every request for reliability.","ru":"Продолжать добавлять тот же observer на каждый request ради надёжности."},
        isCorrect: false,
        explanation: {"en":"Incorrect. This recreates the failure mode.","ru":"Неверно. Это воссоздаёт режим отказа."}
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_OBS: BugHuntChallenge = {
  id: "chl_obs_bughunt", type: "BUG_HUNT", missionId: "mis_observer_pattern", stageId: "stg_obs_debug",
  title: { en: "Bug Hunt: The Duplicate Compliance Alert", ru: "Поиск Бага: Дублирующий Compliance Alert" },
  prompt: { en: "Click the defective line(s). Non-defect lines are distractors.", ru: "Нажмите дефектную строку(и). Остальные — дистракторы." },
  difficulty: "SENIOR", assistanceLevel: "APPLIED",
  conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], topicIds: ["top_oop_30"],
  tags: ["#obs", "#bug-hunt"],
  hintIds: ["hnt_obs_bug_1", "hnt_obs_bug_2", "hnt_obs_bug_3"],
  xpReward: 100, order: 10,
  payload: {
    baseCodeArtifactId: "art_obs_bughunt",
    solutionCodeArtifactId: "art_obs_solution",
    codeSnippet: `public void notifyObservers(TxEvent e) {\n    for (TransactionObserver o : observers) {\n        o.onTransaction(e); // Line 3 — BUG: no try/catch isolation\n    }\n}\npublic void subscribe(TransactionObserver o) { observers.add(o); } // Line 6 — BUG: no dedupe`,
    lines: [
      { lineNumber: 1, code: "public void notifyObservers(TxEvent e) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 2, code: "    for (TransactionObserver o : observers) {", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 3, code: "        o.onTransaction(e); // Line 3 — BUG: no try/catch isolation", isBug: true, explanation: {"en":"Line 3: Uncaught observer exception aborts the loop — later observers never run.","ru":"Строка 3: Непойманное исключение observer обрывает цикл — последующие не вызываются."} },
      { lineNumber: 4, code: "    }", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 5, code: "}", isBug: false, explanation: {"en":"Not the defect line.","ru":"Не строка дефекта."} },
      { lineNumber: 6, code: "public void subscribe(TransactionObserver o) { observers.add(o); } // Line 6 — BUG: no dedupe", isBug: true, explanation: {"en":"Line 6: Unconditional add allows duplicate ComplianceAlertObserver registrations.","ru":"Строка 6: Безусловный add допускает дубли ComplianceAlertObserver."} }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_OBS: InterviewAnswerChallenge = {
  id: "chl_obs_interview_answer", type: "INTERVIEW_ANSWER", missionId: "mis_observer_pattern", stageId: "stg_obs_interview_a",
  title: { en: "Senior Interview Verbal Explanation", ru: "Устный Ответ на Senior-Интервью" },
  prompt: { en: "Fix TransactionEventPublisher subscription lifecycle so ComplianceAlertObserver is not registered twice and observer exceptions cannot kill AuditObserver/FraudAnalyticsObserver notifications.", ru: "Исправьте lifecycle подписок TransactionEventPublisher, чтобы ComplianceAlertObserver не регистрировался дважды и исключения observer не убивали уведомления AuditObserver/FraudAnalyticsObserver." },
  difficulty: "SENIOR", assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], topicIds: ["top_oop_30"],
  tags: ["#obs", "#interview"], hintIds: [], xpReward: 150, order: 9,
  payload: {
    targetQuestionId: "q_obs_dup_01",
    rubricDimensions: ["ELEVATOR_PITCH", "MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [{"id":"cpt_observer_pattern","label":{"en":"observer pattern","ru":"observer pattern"},"keywords":["observer","pattern"]},{"id":"cpt_subscription_lifecycle","label":{"en":"subscription lifecycle","ru":"subscription lifecycle"},"keywords":["subscription","lifecycle"]},{"id":"cpt_observer_exception_isolation","label":{"en":"observer exception isolation","ru":"observer exception isolation"},"keywords":["observer","exception","isolation"]}],
    modelAnswer30s: {"en":"Elevator Pitch (30 sec): Duplicate compliance alerts came from double subscribe without unsubscribe; missing audit from a throwing observer aborting notify. Fix: Subscription lifecycle + per-observer exception isolation in TransactionEventPublisher. In-process Observer, not Kafka.","ru":"Elevator Pitch (30 сек): Дубли compliance — от double subscribe без unsubscribe; пропуск audit — от падающего observer, обрывающего notify. Фикс: lifecycle Subscription + изоляция исключений в TransactionEventPublisher. In-process Observer, не Kafka."},
    modelAnswerDetailed: {"en":"Deep Mechanics (60 sec): Subject holds observers; subscribe/unsubscribe manage identity. Duplicates fire twice. notify must not let one failure stop others — isolate, log, continue. Subscription tokens clarify ownership of registration.","ru":"Глубокая Механика (60 сек): Subject держит observers; subscribe/unsubscribe управляют identity. Дубли стреляют дважды. notify не должен давать одному сбою остановить других — isolate, log, continue. Токены Subscription проясняют владение регистрацией."},
    modelAnswerTradeOffs: {"en":"Production Trade-offs (30 sec): Sync in-process observers are simple but couple latency; async handoff adds complexity. Exception isolation hides observer bugs unless you metric/alert on failures. Prefer idempotent subscribe.","ru":"Продакшн Компромиссы (30 сек): Sync in-process observers просты, но связывают latency; async усложняет. Изоляция исключений скрывает баги observer без метрик. Предпочитайте идемпотентный subscribe."},
    followUpQuestionText: {"en":"Interviewer Follow-Up: 'Is this the same as Kafka consumer groups?'","ru":"Доп. Вопрос: 'Это то же, что Kafka consumer groups?'"},
    followUpModelAnswerText: {"en":"Follow-up: No. This mission is in-process Observer inside the JVM. Kafka is a distributed log with different delivery/offset semantics. Do not conflate patterns.","ru":"Ответ: Нет. Эта миссия — in-process Observer в JVM. Kafka — распределённый лог с другой семантикой delivery/offset. Не смешивайте паттерны."}
  }
};

export const ALL_OBSERVER_PATTERN_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_OBS,
  APPLIED_BUG_HUNT_CHALLENGE_OBS,
  INTERVIEW_ANSWER_CHALLENGE_OBS
];
