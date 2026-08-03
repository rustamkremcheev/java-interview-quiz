import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OBSERVER_PATTERN: readonly CodeArtifact[] = [
  {
    id: "art_obs_domain", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Domain Types", ru: "Доменные Типы" },
    sourceCode: "package com.bank.monitoring;\n\npublic record TxEvent(String txId, long amountCents) {}\n\npublic interface TransactionObserver {\n    void onTransaction(TxEvent event);\n}\n\npublic final class ComplianceAlertObserver implements TransactionObserver {\n    @Override public void onTransaction(TxEvent event) { /* alert */ }\n}\n\npublic final class AuditObserver implements TransactionObserver {\n    @Override public void onTransaction(TxEvent event) { /* audit */ }\n}\n\npublic final class FraudAnalyticsObserver implements TransactionObserver {\n    @Override public void onTransaction(TxEvent event) { /* analytics */ }\n}\n",
    annotations: [{ id: "ann_obs_dom_1", startLine: 1, endLine: 1, category: "WHY_IT_EXISTS",
      title: { en: "Domain Anchor", ru: "Доменный Якорь" },
      explanation: { en: "Domain types anchor the mission scenario.", ru: "Доменные типы якорят сценарий миссии." },
      conceptDemonstrated: "cpt_observer_pattern" }],
    relatedQuestionIds: ["q_obs_dup_01"], conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], tags: ["#obs", "#domain"]
  },
  {
    id: "art_obs_broken", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Broken Baseline", ru: "Исходный Нарушенный Код" },
    sourceCode: "public final class TransactionEventPublisher {\n    private final List<TransactionObserver> observers = new ArrayList<>();\n    public void subscribe(TransactionObserver o) { observers.add(o); }\n    public void notifyObservers(TxEvent e) {\n        for (TransactionObserver o : observers) { o.onTransaction(e); }\n    }\n}",
    annotations: [{ id: "ann_obs_brk_1", startLine: 1, endLine: 3, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Failure Mode", ru: "Режим Отказа" },
      explanation: {"en":"In-process transaction monitoring (not Kafka) fired duplicate compliance alerts after redeploy: ComplianceAlertObserver subscribed twice because unsubscribe was","ru":"In-process мониторинг транзакций (не Kafka) слал дубли compliance alerts после redeploy: ComplianceAlertObserver подписался дважды — unsubscribe не вызывался. О"},
      conceptDemonstrated: "cpt_observer_pattern" }],
    relatedQuestionIds: ["q_obs_dup_01"], conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], tags: ["#obs", "#counter-example"]
  },
  {
    id: "art_obs_solution", type: "CORRECT_SOLUTION", language: "java", javaVersion: "17",
    title: { en: "Production Fix", ru: "Продакшн Фикс" },
    sourceCode: "public final class TransactionEventPublisher {\n    private final LinkedHashSet<TransactionObserver> observers = new LinkedHashSet<>();\n    public Subscription subscribe(TransactionObserver o) {\n        observers.add(o);\n        return () -> observers.remove(o);\n    }\n    public void notifyObservers(TxEvent e) {\n        for (TransactionObserver o : List.copyOf(observers)) {\n            try { o.onTransaction(e); }\n            catch (RuntimeException ex) { /* isolate + log */ }\n        }\n    }\n    @FunctionalInterface public interface Subscription { void unsubscribe(); }\n}",
    annotations: [{ id: "ann_obs_sol_1", startLine: 1, endLine: 5, category: "HOW_IT_FIXES_THE_PROBLEM",
      title: { en: "Structural Fix", ru: "Структурный Фикс" },
      explanation: {"en":"Elevator Pitch (30 sec): Duplicate compliance alerts came from double subscribe without unsubscribe; missing audit from a throwing observer aborting notify. Fix","ru":"Elevator Pitch (30 сек): Дубли compliance — от double subscribe без unsubscribe; пропуск audit — от падающего observer, обрывающего notify. Фикс: lifecycle Subs"},
      problemSolved: {"en":"Fix TransactionEventPublisher subscription lifecycle so ComplianceAlertObserver is not registered twice and observer exceptions cannot kill AuditObserver/FraudAnalyticsObserver notifications.","ru":"Исправьте lifecycle подписок TransactionEventPublisher, чтобы ComplianceAlertObserver не регистрировался дважды и исключения observer не убивали уведомления AuditObserver/FraudAnalyticsObserver."},
      conceptDemonstrated: "cpt_observer_pattern" }],
    relatedQuestionIds: ["q_obs_dup_01"], conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], tags: ["#obs", "#solution"]
  },
  {
    id: "art_obs_bughunt", type: "COUNTER_EXAMPLE", language: "java", javaVersion: "17",
    title: { en: "Bug Hunt Code", ru: "Код для Поиска Бага" },
    sourceCode: "public final class TransactionEventPublisher {\n    private final List<TransactionObserver> observers = new ArrayList<>();\n    public void subscribe(TransactionObserver o) { observers.add(o); }\n    public void notifyObservers(TxEvent e) {\n        for (TransactionObserver o : observers) { o.onTransaction(e); }\n    }\n}",
    annotations: [{ id: "ann_obs_bug_1", startLine: 1, endLine: 4, category: "PROBLEM_IN_ORIGINAL_CODE",
      title: { en: "Defect Region", ru: "Область Дефекта" },
      explanation: { en: "Defect lines match the bug hunt challenge.", ru: "Строки дефекта соответствуют challenge bug hunt." },
      conceptDemonstrated: "cpt_observer_pattern" }],
    relatedQuestionIds: ["q_obs_dup_01"], conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], tags: ["#obs", "#bug-hunt"]
  },
  {
    id: "art_obs_supplement", type: "QUESTION_CODE", language: "java", javaVersion: "17",
    title: { en: "Supplementary Collaborators", ru: "Дополнительные Сотрудники" },
    sourceCode: "public final class TransactionEventPublisher {\n    private final LinkedHashSet<TransactionObserver> observers = new LinkedHashSet<>();\n    public Subscription subscribe(TransactionObserver o) {\n        observers.add(o);\n        return () -> observers.remove(o);\n    }\n    public void notifyObservers(TxEvent e) {\n        for (TransactionObserver o : List.copyOf(observers)) {\n            try { o.onTransaction(e); }\n            catch (RuntimeException ex) { /* isolate + log */ }\n        }\n    }\n    @FunctionalInterface public interface Subscription { void unsubscribe(); }\n}",
    annotations: [{ id: "ann_obs_sup_1", startLine: 1, endLine: 2, category: "INTERVIEW_CONCEPT",
      title: { en: "Interview Talking Point", ru: "Точка для Интервью" },
      explanation: {"en":"Deep Mechanics (60 sec): Subject holds observers; subscribe/unsubscribe manage identity. Duplicates fire twice. notify must not let one fail","ru":"Глубокая Механика (60 сек): Subject держит observers; subscribe/unsubscribe управляют identity. Дубли стреляют дважды. notify не должен дава"},
      conceptDemonstrated: "cpt_subscription_lifecycle" }],
    relatedQuestionIds: ["q_obs_dup_01"], conceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle","cpt_observer_exception_isolation"], tags: ["#obs", "#supplement"]
  }
];
