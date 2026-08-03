import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionBySlug, ALL_TOPICS } from '../data';
import { OOP_DATA_PACKAGE } from '../data/modules/oop';
import { useAppStore } from '../store/useAppStore';
import { useMissionStore } from '../store/useMissionStore';
import {
  recordUserAttempt, updateConceptMastery, recordMistakeOccurrence,
  saveMissionProgress, saveReflectionNote,
  getAttemptsForMission, getMissionProgressRecord
} from '../db/database';
import type { UserAttempt, MissionProgress } from '../types/domain';
import { StageStepper } from '../components/workspace/StageStepper';
import { KnowledgeSidebar } from '../components/workspace/KnowledgeSidebar';
import { SourceContext } from '../components/workspace/SourceContext';
import { CodeViewer } from '../components/workspace/CodeViewer';
import { FeedbackPanel } from '../components/workspace/FeedbackPanel';
import { GuidedPuzzle } from '../components/challenges/GuidedPuzzle';
import { BugHuntChallengeView } from '../components/challenges/BugHuntChallenge';
import { InterviewAnswerChallengeView } from '../components/challenges/InterviewAnswerChallenge';
import { EvaluationResult, LocalizedText } from '../types/domain';
import { ArrowLeft, BookOpen, Clock, Play, HelpCircle, Trophy, RotateCcw, CheckCircle2 } from 'lucide-react';

export const MissionPage: React.FC = () => {
  const { missionSlug, id } = useParams<{ missionSlug?: string; id?: string }>();
  const navigate = useNavigate();
  const slug = missionSlug || id || 'protecting-bank-account-invariants';

  const mission = getMissionBySlug(slug);
  const stages = mission
    ? OOP_DATA_PACKAGE.stages.filter((s) => s.missionId === mission.id)
    : [];

  const { languageMode, addXP, toggleSidebar } = useAppStore();
  const {
    currentStageId, setCurrentStageId,
    hypothesisText, setHypothesisText,
    confidence,
    hintsRevealedIds,
    reflectionText, setReflectionText
  } = useMissionStore();

  const [completedStageIds, setCompletedStageIds] = useState<string[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [sessionStartedAt] = useState(() => Date.now());
  const [missionAttempts, setMissionAttempts] = useState<UserAttempt[]>([]);
  const [missionProgressRecord, setMissionProgressRecord] = useState<MissionProgress | undefined>();

  // Theory Checkpoints Local State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, string>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, { isCorrect: boolean; text: LocalizedText }>>({});

  useEffect(() => {
    if (stages.length > 0 && (!currentStageId || !stages.some((s) => s.id === currentStageId))) {
      setCurrentStageId(stages[0].id);
    }
  }, [currentStageId, setCurrentStageId, stages]);

  useEffect(() => {
    if (!mission) return;
    let cancelled = false;
    (async () => {
      const [attempts, progress] = await Promise.all([
        getAttemptsForMission(mission.id),
        getMissionProgressRecord(mission.id)
      ]);
      if (!cancelled) {
        setMissionAttempts(attempts);
        setMissionProgressRecord(progress);
      }
    })();
    return () => { cancelled = true; };
  }, [mission?.id, evaluation, completedStageIds.length]);

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  if (!mission) {
    return (
      <div className="mission-workspace-page">
        <div className="stage-card">
          <h2>Mission Not Found</h2>
          <p>No mission matches route slug <code>{slug}</code>.</p>
          <button type="button" className="btn-primary-action" onClick={() => navigate('/modules')}>
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex((s) => s.id === currentStageId);
  const currentStage = stages[currentStageIndex] || stages[0];
  if (!currentStage) {
    return (
      <div className="mission-workspace-page">
        <div className="stage-card">
          <h2>Mission Stages Missing</h2>
          <p>Mission <code>{mission.id}</code> has no registered stages.</p>
        </div>
      </div>
    );
  }

  // Dynamic entity resolution scoped strictly to the active mission — no cross-mission fallbacks
  const theoryStage = stages.find((s) => s.type === 'THEORY') as { theoryArticleId?: string } | undefined;
  const theoryArticleId = (currentStage as any)?.theoryArticleId || theoryStage?.theoryArticleId;
  const theoryArticle = OOP_DATA_PACKAGE.theoryArticles.find((a) => a.id === theoryArticleId);

  const theoryCheckpoints = theoryArticle
    ? OOP_DATA_PACKAGE.theoryCheckpoints.filter((c) => c.theoryArticleId === theoryArticle.id)
    : [];

  const fixBuilderChallenge = OOP_DATA_PACKAGE.challenges.find((c) => c.missionId === mission.id && c.type === 'FIX_BUILDER');
  const bugHuntChallenge = OOP_DATA_PACKAGE.challenges.find((c) => c.missionId === mission.id && c.type === 'BUG_HUNT');
  const interviewAnswerChallenge = OOP_DATA_PACKAGE.challenges.find((c) => c.missionId === mission.id && c.type === 'INTERVIEW_ANSWER');

  const missionBrokenArtifactId =
    (fixBuilderChallenge as any)?.payload?.baseCodeArtifactId as string | undefined;
  const codeArtifact = OOP_DATA_PACKAGE.codeArtifacts.find((a) => a.id === (currentStage as any)?.codeArtifactId) ||
    OOP_DATA_PACKAGE.codeArtifacts.find((a) => a.id === missionBrokenArtifactId);

  const missionSourceIds = new Set(theoryArticle?.sourceIds ?? []);
  const missionSources = OOP_DATA_PACKAGE.sources.filter((s) => missionSourceIds.has(s.id));
  const missionSourceReferences = OOP_DATA_PACKAGE.sourceReferences.filter((r) => missionSourceIds.has(r.sourceId));

  if (process.env.NODE_ENV !== 'production') {
    if (!theoryArticle && currentStage?.type === 'THEORY') {
      console.error(`[MissionPage] Missing theory article for mission ${mission.id}`);
    }
    if (!fixBuilderChallenge || !bugHuntChallenge || !interviewAnswerChallenge) {
      console.error(`[MissionPage] Missing challenge(s) for mission ${mission.id}`);
    }
    if (!codeArtifact && (currentStage?.type === 'MISSION_INTRODUCTION' || currentStage?.type === 'REAL_ENGINEERING_PROBLEM')) {
      console.error(`[MissionPage] Missing code artifact for mission ${mission.id}`);
    }
  }

  const primaryTopic = ALL_TOPICS.find((t) => t.id === mission.primaryTopicId);
  const relatedTopics = [mission.primaryTopicId, ...mission.secondaryTopicIds]
    .map((tid) => ALL_TOPICS.find((t) => t.id === tid))
    .filter((t): t is NonNullable<typeof t> => !!t)
    .slice(0, 3);
  const exitTopicPath = primaryTopic
    ? `/modules/${primaryTopic.moduleId}/topics/${primaryTopic.slug}`
    : '/modules/object-oriented-programming/topics/encapsulation';

  const missionVisualizations: Record<string, { brokenTitle: string; brokenCode: string; brokenDesc: string; fixedTitle: string; fixedCode: string; fixedDesc: string }> = {
    mis_bank_account_invariants: {
      brokenTitle: 'Unprotected Direct Field Mutation',
      brokenCode: 'account.balance = -500.0;',
      brokenDesc: 'Bypasses pre-condition guards ──► Corrupts Heap Memory State!',
      fixedTitle: 'Encapsulated Behavior Execution',
      fixedCode: 'account.withdraw(50000);',
      fixedDesc: 'Validates amount & funds ──► Throws IllegalStateException!'
    },
    mis_equals_hashcode_contract: {
      brokenTitle: 'Key Mutation & Bucket Mismatch',
      brokenCode: 'put(key, val) ──► Bucket #4',
      brokenDesc: 'key.setStatus("COMPLETED") mutates hashCode() ──► get(key) checks Bucket #11 (EMPTY)! Returns null!',
      fixedTitle: 'Java 17 Record Key Immutability',
      fixedCode: 'public record PaymentKey(String transactionId)',
      fixedDesc: 'Identity is strictly immutable ──► Hash Code Remains 100% Stable ──► O(1) Cache Hit!'
    },
    mis_immutability_defensive_copy: {
      brokenTitle: 'CustomerSnapshot Reference Leak',
      brokenCode: 'snapshot.getTransactions().add(fakeTxn);',
      brokenDesc: 'Leaked mutable List/Money ──► Settlement totals corrupt without calling a setter!',
      fixedTitle: 'Deep Immutability via List.copyOf + Money record',
      fixedCode: 'this.transactions = List.copyOf(transactions);',
      fixedDesc: 'Immutable Money (long cents) + Instant ──► External mutation throws UnsupportedOperationException!'
    },
    mis_composition_over_inheritance: {
      brokenTitle: 'Fragile Base Class Double-Count',
      brokenCode: 'sendBatch() → calls send() internally',
      brokenDesc: 'EmailNotificationService increments counter in BOTH methods ──► delivery metrics ×2!',
      fixedTitle: 'Composition: EmailSender + SmsSender',
      fixedCode: 'dispatcher.send(channel, notification);',
      fixedDesc: 'NotificationDispatcher delegates to EmailSender/SmsSender ──► single instrumentation point!'
    },
    mis_liskov_substitution_principle: {
      brokenTitle: 'BankTransfer Breaks PaymentProcessor Contract',
      brokenCode: 'processor.refund(request);',
      brokenDesc: 'BankTransfer.refund() throws UnsupportedOperationException ──► chargeback batch crashes!',
      fixedTitle: 'Segregated RefundablePaymentProcessor',
      fixedCode: 'if (p instanceof RefundablePaymentProcessor r) r.refund(req);',
      fixedDesc: 'CardPayment implements refund; BankTransfer stays process-only ──► LSP preserved!'
    },
    mis_object_creation_builder: {
      brokenTitle: 'Telescoping Constructor Flag Swap',
      brokenCode: 'new SettlementInstruction(..., isAudited, isTaxExempt)',
      brokenDesc: 'Boolean parameters swapped silently ──► incorrect tax reports in financial statements!',
      fixedTitle: 'Builder + Static Factory',
      fixedCode: 'SettlementInstruction.taxExemptWire(id, payer, amount)',
      fixedDesc: 'Named factories + fluent Builder ──► mandatory fields validated before build()!'
    },
    mis_interface_default_methods: {
      brokenTitle: 'Diamond Default Method Conflict',
      brokenCode: 'implements Auditable, Traceable',
      brokenDesc: 'Both define default void auditLog() ──► compile error: inherits unrelated defaults!',
      fixedTitle: 'Explicit Interface.super Resolution',
      fixedCode: 'Auditable.super.auditLog(); Traceable.super.auditLog();',
      fixedDesc: 'Override + Interface.super chain ──► both compliance and trace audit trails preserved!'
    },
    mis_dynamic_dispatch: {
      brokenTitle: 'Static Binding in Hot Loop',
      brokenCode: 'RiskHandlers.evaluate(handler, event)',
      brokenDesc: 'invokestatic binds at compile time ──► specialized RiskHandler logic skipped + megamorphic p99 spike!',
      fixedTitle: 'Polymorphic Instance Dispatch',
      fixedCode: 'handler.evaluate(event)',
      fixedDesc: 'invokeinterface/invokevirtual + sealed/split call sites ──► runtime type + JIT-friendly profiles!'
    },
    mis_method_overriding_covariant: {
      brokenTitle: 'Silent Overload (Missing @Override)',
      brokenCode: 'findById(InvoiceKey) // not override',
      brokenDesc: 'CorporateInvoiceRepository never runs via InvoiceRepository reference ──► enrichment skipped!',
      fixedTitle: '@Override + Covariant CorporateInvoice',
      fixedCode: '@Override CorporateInvoice findById(String id)',
      fixedDesc: 'True override + covariant return ──► polymorphic callers hit corporate enrichment!'
    },
    mis_method_overloading: {
      brokenTitle: 'Ambiguous Overload Resolution',
      brokenCode: 'settle(amount) // long vs BigDecimal vs String',
      brokenDesc: 'Compile-time most-specific rule + autoboxing ──► wrong ledger scale posted!',
      fixedTitle: 'Named Methods (No Ambiguity)',
      fixedCode: 'settleCents(long) / settleDecimal(BigDecimal)',
      fixedDesc: 'Explicit API names ──► no null/autoboxing overload traps!'
    },
    mis_dependency_injection: {
      brokenTitle: 'Field @Autowired Hidden Dependencies',
      brokenCode: '@Autowired private FxRateGateway fx;',
      brokenDesc: 'new SettlementOrchestrator() in tests ──► NPE; DIP broken by new LiveFxRateGateway()!',
      fixedTitle: 'Constructor Injection + Abstractions',
      fixedCode: 'SettlementOrchestrator(FxRateGateway, LedgerGateway)',
      fixedDesc: 'final fields + constructor DI ──► testable, DIP-compliant!'
    },
    mis_strategy_pattern: {
      brokenTitle: 'Fee Switch Fall-Through',
      brokenCode: 'switch (channel) { case CARD: ... // missing break',
      brokenDesc: 'OCP violation + fall-through ──► 0 fee or double fee in production!',
      fixedTitle: 'FeeStrategy Registry',
      fixedCode: 'strategies.get(channel).calculate(request)',
      fixedDesc: 'Open for new channels via new FeeStrategy ──► calculator closed for modification!'
    },
    mis_factory_pattern: {
      brokenTitle: 'Scattered new + Format Typo',
      brokenCode: 'if ("CVS".equals(fmt)) return new Csv...',
      brokenDesc: 'Typo CVS vs CSV ──► silent PdfComplianceReport when CSV requested!',
      fixedTitle: 'ComplianceReportFactory',
      fixedCode: 'ComplianceReportFactory.create(formatCode)',
      fixedDesc: 'Centralized creation + fail-fast validation ──► clients depend on interface!'
    },
    mis_oop_anti_patterns: {
      brokenTitle: 'Anemic Order + God Class Service',
      brokenCode: 'service.fulfill(order) // 4000 lines',
      brokenDesc: 'Order is DTO; OrderFulfillmentService owns all rules ──► Feature Envy / untestable!',
      fixedTitle: 'Rich Aggregate + Ports',
      fixedCode: 'order.place(paymentPort); order.reserveInventory(inv)',
      fixedDesc: 'Tell Don\'t Ask ──► cohesive Order + segregated Inventory/Payment ports!'
    },
    mis_abstraction: {
      brokenTitle: 'Leaky Stripe Types in Orchestrator',
      brokenCode: 'orchestrator.charge(new StripeChargeRequest(...))',
      brokenDesc: 'Vendor SDK types leak into PaymentOrchestrator ──► BankTransfer switch rewrites core flow!',
      fixedTitle: 'PaymentGateway Boundary',
      fixedCode: 'gateway.charge(new PaymentIntent(...))',
      fixedDesc: 'StripeGatewayAdapter / BankTransferGateway hide vendors ──► stable business intent!'
    },
    mis_abstract_classes: {
      brokenTitle: 'Subclass Bypasses Audit Hook',
      brokenCode: 'WireSettlementProcessor.settle() overrides template',
      brokenDesc: 'Overrides settle() skipping audit ──► missing regulatory trail!',
      fixedTitle: 'final settle() + Protected Hooks',
      fixedCode: 'final settle() { validate; authorize; capture; audit; }',
      fixedDesc: 'Subclasses only implement authorize/capture ──► lifecycle enforced!'
    },
    mis_inheritance: {
      brokenTitle: 'Fragile BaseRegulatoryReport Change',
      brokenCode: 'protected headerVersion mutated in base',
      brokenDesc: 'Base protected semantics change ──► Liquidity/Risk/Capital reports silently wrong!',
      fixedTitle: 'Documented Extension Contract',
      fixedCode: 'sealed hooks / composed ReportAssembler',
      fixedDesc: 'Constructor order + protected coupling made explicit ──► no silent filing corruption!'
    },
    mis_polymorphism: {
      brokenTitle: 'Growing instanceof Pipeline',
      brokenCode: 'if (t instanceof CardTransaction) ...',
      brokenDesc: 'Type switch in TransactionPipeline ──► InstantTransaction forgotten → FAILED!',
      fixedTitle: 'Polymorphic process()',
      fixedCode: 'transaction.process(pipelineContext)',
      fixedDesc: 'New types extend contract ──► no central type switch edits!'
    },
    mis_upcasting_downcasting: {
      brokenTitle: 'Unsafe Downcast on FraudEvent',
      brokenCode: 'CardFraudEvent c = (CardFraudEvent) event;',
      brokenDesc: 'ACH event arrives ──► ClassCastException at 02:00!',
      fixedTitle: 'Pattern Match or Polymorphism',
      fixedCode: 'if (event instanceof CardFraudEvent c) ... / event.extractEvidence()',
      fixedDesc: 'Safe Java 17 pattern matching or subtype methods ──► no blind casts!'
    },
    mis_coupling_cohesion: {
      brokenTitle: 'Change Amplification Monolith',
      brokenCode: 'ReconciliationService: validate+DB+PDF+alert+retry',
      brokenDesc: 'Slack alert change retests JDBC and PDF ──► high coupling, low cohesion!',
      fixedTitle: 'Cohesive Collaborators',
      fixedCode: 'Validator / LedgerRepository / Reporter / AlertPublisher',
      fixedDesc: 'Thin coordinator + interfaces ──► change isolation & testability!'
    },
    mis_domain_modeling: {
      brokenTitle: 'Primitive Obsession LoanApplication',
      brokenCode: 'String status; boolean approved; double amount',
      brokenDesc: 'Illegal states representable (approved + REJECTED) ──► silent lending bugs!',
      fixedTitle: 'Value Objects + Invariants',
      fixedCode: 'LoanMoney / LoanStatus / CreditDecision / ApprovalPolicy',
      fixedDesc: 'Typed transitions ──► illegal states unrepresentable!'
    },
    mis_classes_objects: {
      brokenTitle: 'Shared Draft Alias',
      brokenCode: 'batch.add(draft); // same ref N times',
      brokenDesc: 'One PaymentInstruction mutated per CSV row ──► all batch slots show last values!',
      fixedTitle: 'Independent Instances',
      fixedCode: 'factory.fromCsvRow(row); batch.add(instruction)',
      fixedDesc: 'New object per row ──► distinct references & audit-safe identity!'
    },
    mis_state_behavior_identity: {
      brokenTitle: 'Value-Only Transfer Confusion',
      brokenCode: 'if (a.amount==b.amount) skip;',
      brokenDesc: 'Distinct TransferIds treated interchangeable ──► lost operations!',
      fixedTitle: 'Identity + Transitions',
      fixedCode: 'TransferId identity; submit()/approve()',
      fixedDesc: 'Business identity + behavior-guarded state ──► no false duplicates!'
    },
    mis_constructors_initialization: {
      brokenTitle: 'This Escapes Mid-Construction',
      brokenCode: 'registry.register(this); // in ctor',
      brokenDesc: 'Observers see null counterparty / defaults ──► half-initialized trade!',
      fixedTitle: 'Safe Publication After Init',
      fixedCode: 'build fully → then register(trade)',
      fixedDesc: 'No this-escape; invariants complete before publish!'
    },
    mis_access_modifiers: {
      brokenTitle: 'Public Internal Ledger Hooks',
      brokenCode: 'public void postRaw(...); protected forceReconcile()',
      brokenDesc: 'Foreign packages bypass InternalPostingPolicy ──► unaudited posts!',
      fixedTitle: 'Minimal Visibility API',
      fixedCode: 'private internals; public JournalPostingFacade',
      fixedDesc: 'Package boundary sealed ──► policy + audit enforced!'
    },
    mis_association_aggregation_composition: {
      brokenTitle: 'Wrong Ownership Graph',
      brokenCode: 'portfolio.delete() → instruments.clear()',
      brokenDesc: 'Shared MarketInstrument/PricingFeed destroyed ──► orphaned books!',
      fixedTitle: 'Lifecycle Ownership',
      fixedCode: 'compose Holdings; associate Instruments',
      fixedDesc: 'Holdings die with Portfolio; shared refs survive!'
    },
    mis_object_class_contracts: {
      brokenTitle: 'Object Contract Misuse',
      brokenCode: 'default toString; fragile clone(); getClass()',
      brokenDesc: 'Audit dedupe/logs/snapshots break ──► Object methods mishandled!',
      fixedTitle: 'Deliberate Object Overrides',
      fixedCode: 'careful equals/hashCode/toString; no clone/finalize',
      fixedDesc: 'Object as foundation contracts ──► not accidental defaults!'
    },
    mis_tostring_safe_logging: {
      brokenTitle: 'PII in toString → Logs',
      brokenCode: 'logger.info("req=" + request)',
      brokenDesc: 'Name, account, gov-id, token in centralized logs ──► breach!',
      fixedTitle: 'Redacted Diagnostics',
      fixedCode: 'RedactionPolicy + structured safe fields',
      fixedDesc: 'toString for humans without secrets ──► observability + security!'
    },
    mis_introduction_to_oop: {
      brokenTitle: 'Procedural Clearing Script',
      brokenCode: 'Map statuses + global helpers + shared mutables',
      brokenDesc: 'New rail edits scatter across unrelated functions ──► inconsistent clearing!',
      fixedTitle: 'Collaborating Objects',
      fixedCode: 'ClearingPayment + Workflow + ValidationPolicy + Store',
      fixedDesc: 'State+behavior+identity per payment ──► polymorphic rails, clear ownership!'
    },
    mis_builder_pattern: {
      brokenTitle: 'Telescoping Risk Constructor',
      brokenCode: 'new RiskAssessmentRequest(id,null,true,false,...)',
      brokenDesc: 'Wrong-order booleans silently enable incorrect risk mode!',
      fixedTitle: 'Validated Named Builder',
      fixedCode: 'RiskAssessmentRequest.builder()...build()',
      fixedDesc: 'Required/optional named steps + build-time validation ──► safe immutable request!'
    },
    mis_template_method_pattern: {
      brokenTitle: 'Bypassed EOD Compliance Step',
      brokenCode: 'CrossBorder overrides process() skips ComplianceCheck',
      brokenDesc: 'Mandatory audit/compliance omitted ──► inconsistent settlement!',
      fixedTitle: 'Final Template Skeleton',
      fixedCode: 'final processBatch(): load→cutoff→reserve→exec→audit',
      fixedDesc: 'Hooks vary rails; compliance step sealed in superclass!'
    },
    mis_observer_pattern: {
      brokenTitle: 'Duplicate Observer Registration',
      brokenCode: 'publisher.subscribe(obs); // twice, never remove',
      brokenDesc: 'Duplicate alerts + retained refs ──► memory growth & storms!',
      fixedTitle: 'Subscription Lifecycle',
      fixedCode: 'Subscription token + unsubscribe + isolate failures',
      fixedDesc: 'Idempotent register, safe teardown, exception isolation!'
    },
    mis_decorator_pattern: {
      brokenTitle: 'Bypassable Cross-Cutting Controls',
      brokenCode: 'if (audit) ...; core.transfer() // sometimes bare',
      brokenDesc: 'Some paths skip audit/auth/retry ──► missing control layers!',
      fixedTitle: 'Composable Gateway Decorators',
      fixedCode: 'Authorized(Retrying(Audited(Core)))',
      fixedDesc: 'Same contract wrappers; composition root enforces order!'
    },
    mis_api_contract_design: {
      brokenTitle: 'Behaviorally Breaking API',
      brokenCode: 'return null; throw OtherEx; mutable List',
      brokenDesc: 'Clients still compile ──► silent null/exception/mutability failures!',
      fixedTitle: 'Stable Behavioral Contract',
      fixedCode: 'empty immutable lists; documented exceptions',
      fixedDesc: 'Source+binary+behavioral compatibility for multi-service APIs!'
    },
    mis_oop_refactoring_legacy: {
      brokenTitle: 'Untestable Static Decision Blob',
      brokenCode: 'static DB in LegacyCreditDecisionEngine.decide()',
      brokenDesc: 'No seams ──► cannot unit-test under live regulatory traffic!',
      fixedTitle: 'Characterization + Seams',
      fixedCode: 'CreditPolicy pure + ApplicantLookupPort + AuditPort',
      fixedDesc: 'Incremental extract while preserving behavior!'
    },
    mis_senior_oop_tradeoffs: {
      brokenTitle: 'Slogan-Driven Payment Architecture',
      brokenCode: 'AbstractPaymentBase → 5-level rails + interface-per-class',
      brokenDesc: 'Every new rail reopens the hierarchy; debugging crosses Strategy + Decorator + Factory!',
      fixedTitle: 'Constraint-Driven Decision Map',
      fixedCode: 'volatility × seams × ops-debug → choose A/B/C (no permanent winner)',
      fixedDesc: 'Composition + explicit orchestration when constraints demand — revise when scale changes!'
    },
    mis_jvm_memory_object_layout: {
      brokenTitle: 'Field-Sum Capacity Fantasy',
      brokenCode: 'estimate = long+int+ref+boolean  (ignore header/pad/box)',
      brokenDesc: 'Tens of millions of PositionSnapshot ──► heap several× larger; GC stalls!',
      fixedTitle: 'Illustrative HotSpot Layout',
      fixedCode: 'header + fields + refs + padding → shallow vs retained (config-specific)',
      fixedDesc: 'Verify with JOL on a stated JVM; not a JLS guarantee!'
    }
  };
  const viz = missionVisualizations[mission.id];

  const handleNextStage = () => {
    if (!completedStageIds.includes(currentStage.id)) {
      setCompletedStageIds([...completedStageIds, currentStage.id]);
    }
    setEvaluation(null);
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageId(stages[currentStageIndex + 1].id);
    }
  };

  // Stage 3 Hypothesis Submission
  const handleHypothesisSubmit = async () => {
    if (!hypothesisText.trim()) return;

    const evalRes: EvaluationResult = {
      correctness: "CORRECT",
      score: 1.0,
      feedback: {
        en: "Great initial diagnostic hypothesis! You identified key invariant vulnerabilities.",
        ru: "Отличная первичная гипотеза! Вы определили ключевые уязвимости инвариантов."
      },
      matchedConceptIds: mission.requiredConceptIds,
      missingConceptIds: [],
      detectedMistakePatternIds: []
    };
    setEvaluation(evalRes);
    await addXP(25);
  };

  // Stage 5 Theory Checkpoint Selection
  const handleCheckpointSelect = (checkpointId: string, optionId: string) => {
    const chk = theoryCheckpoints.find((c) => c.id === checkpointId);
    if (!chk) return;
    const opt = chk.options.find((o) => o.id === optionId);
    if (!opt) return;

    setCheckpointAnswers({ ...checkpointAnswers, [checkpointId]: optionId });
    setCheckpointFeedback({
      ...checkpointFeedback,
      [checkpointId]: {
        isCorrect: opt.isCorrect,
        text: opt.feedback
      }
    });

    if (!opt.isCorrect && opt.misconceptionId) {
      recordMistakeOccurrence(opt.misconceptionId, confidence === 'CONFIDENT');
    }
  };

  // Stage 7 Guided FixBuilder Submission
  const handleGuidedSubmit = async (selectedOptionIds: string[]) => {
    if (!fixBuilderChallenge || fixBuilderChallenge.type !== 'FIX_BUILDER') return;
    const correctOptions = (fixBuilderChallenge as any).payload.options.filter((o: any) => o.isCorrect).map((o: any) => o.id);

    const isFullyCorrect = correctOptions.every((optId: string) => selectedOptionIds.includes(optId)) &&
      selectedOptionIds.length === correctOptions.length;

    const evalRes: EvaluationResult = {
      correctness: isFullyCorrect ? "CORRECT" : selectedOptionIds.length > 0 ? "PARTIALLY_CORRECT" : "INCORRECT",
      score: isFullyCorrect ? 1.0 : 0.5,
      feedback: isFullyCorrect
        ? {
            en: "Flawless solution! You selected the production-safe architectural fixes.",
            ru: "Идеальное решение! Вы выбрали безопасные архитектурные исправления."
          }
        : {
            en: "Partial match. Ensure you select all production-safe fixes and reject dangerous quick-fixes.",
            ru: "Частично верно. Убедитесь, что выбрали все безопасные исправления и отклонили быстрые костыли."
          },
      matchedConceptIds: mission.requiredConceptIds,
      missingConceptIds: [],
      detectedMistakePatternIds: isFullyCorrect ? [] : []
    };

    setEvaluation(evalRes);
    await updateConceptMastery(mission.requiredConceptIds, evalRes.correctness, confidence, hintsRevealedIds.length);
    await recordUserAttempt({
      userId: 'local-user',
      challengeId: fixBuilderChallenge.id,
      missionId: mission.id,
      stageId: currentStage.id,
      challengeType: fixBuilderChallenge.type,
      answerPayloadJson: JSON.stringify(selectedOptionIds),
      submittedAt: new Date().toISOString(),
      durationMs: 120000,
      confidence,
      hintsUsedCount: hintsRevealedIds.length,
      hintsUsedIds: hintsRevealedIds,
      evaluation: evalRes,
      xpAwarded: isFullyCorrect ? 100 : 50
    });

    if (isFullyCorrect) {
      await addXP(100);
    }
  };

  // Stage 9 Interview Answer Submission
  const handleInterviewSubmit = async (responseText: string, matchedConceptIds: string[]) => {
    if (!interviewAnswerChallenge) return;
    const isGood = matchedConceptIds.length >= 2;

    const evalRes: EvaluationResult = {
      correctness: isGood ? "CORRECT" : "PARTIALLY_CORRECT",
      score: isGood ? 1.0 : 0.6,
      feedback: isGood
        ? {
            en: "Strong verbal answer! You correctly explained the core mechanics and trade-offs.",
            ru: "Сильный устный ответ! Вы верно объяснили ключевую механику и компромиссы."
          }
        : {
            en: "Answer recorded. Review the model 3-tier speech script below to refine your pitch.",
            ru: "Ответ записан. Изучите модель устного ответа ниже для улучшения ответа."
          },
      matchedConceptIds,
      missingConceptIds: [],
      detectedMistakePatternIds: []
    };

    setEvaluation(evalRes);
    await updateConceptMastery(mission.requiredConceptIds, evalRes.correctness, confidence, 0);
    await recordUserAttempt({
      userId: 'local-user',
      challengeId: interviewAnswerChallenge.id,
      missionId: mission.id,
      stageId: currentStage.id,
      challengeType: interviewAnswerChallenge.type,
      answerPayloadJson: JSON.stringify({ responseText, matchedConceptIds }),
      submittedAt: new Date().toISOString(),
      durationMs: Math.max(0, Date.now() - sessionStartedAt),
      confidence,
      hintsUsedCount: 0,
      hintsUsedIds: [],
      evaluation: evalRes,
      xpAwarded: isGood ? 100 : 50
    });
    await addXP(isGood ? 100 : 50);
  };

  // Stage 10 Bug Hunt Submission
  const handleBugHuntSubmit = async (selectedLines: number[]) => {
    if (!bugHuntChallenge) return;
    const payload = (bugHuntChallenge as any).payload;
    const fromFlags = Array.isArray(payload?.lines)
      ? payload.lines.filter((l: any) => l.isBug).map((l: any) => l.lineNumber as number)
      : [];
    const targetLines = Array.isArray(payload?.targetLines) && payload.targetLines.length > 0
      ? payload.targetLines as number[]
      : fromFlags;
    if (targetLines.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[MissionPage] BUG_HUNT ${bugHuntChallenge.id} has no isBug lines or targetLines`);
      }
      return;
    }
    const isCorrect = selectedLines.some((line) => targetLines.includes(line));

    const evalRes: EvaluationResult = {
      correctness: isCorrect ? "CORRECT" : "INCORRECT",
      score: isCorrect ? 1.0 : 0.0,
      feedback: isCorrect
        ? {
            en: "Vulnerability identified! You located the defective line(s) for this mission.",
            ru: "Уязвимость найдена! Вы нашли дефектную строку(и) для этой миссии."
          }
        : {
            en: "Incorrect line selected. Re-read the production failure mode for this mission and flag the root-cause line(s).",
            ru: "Неверно выбранная строка. Перечитайте продакшн-сбой этой миссии и отметьте строку(и) первопричины."
          },
      matchedConceptIds: mission.requiredConceptIds,
      missingConceptIds: [],
      detectedMistakePatternIds: []
    };

    setEvaluation(evalRes);
    await updateConceptMastery(mission.requiredConceptIds, evalRes.correctness, confidence, hintsRevealedIds.length);
    await recordUserAttempt({
      userId: 'local-user',
      challengeId: bugHuntChallenge.id,
      missionId: mission.id,
      stageId: currentStage.id,
      challengeType: bugHuntChallenge.type,
      answerPayloadJson: JSON.stringify(selectedLines),
      submittedAt: new Date().toISOString(),
      durationMs: Math.max(0, Date.now() - sessionStartedAt),
      confidence,
      hintsUsedCount: hintsRevealedIds.length,
      hintsUsedIds: hintsRevealedIds,
      evaluation: evalRes,
      xpAwarded: isCorrect ? 100 : 0
    });
    if (isCorrect) {
      await addXP(100);
    }
  };

  // Stage 13 Reflection Submission
  const handleReflectionSubmit = async () => {
    if (!reflectionText.trim()) return;
    const latestAttempts = await getAttemptsForMission(mission.id);
    const xpFromAttempts = latestAttempts.reduce((sum, a) => sum + (a.xpAwarded || 0), 0);
    const bestScore = latestAttempts.length
      ? Math.round(Math.max(...latestAttempts.map((a) => a.evaluation.score)) * 100)
      : 0;
    await saveReflectionNote(mission.id, reflectionText);
    await saveMissionProgress({
      userId: 'local-user',
      missionId: mission.id,
      state: "MASTERED",
      currentStageId: currentStage.id,
      completedStageIds: stages.map((s) => s.id),
      startedAt: missionProgressRecord?.startedAt || new Date(sessionStartedAt).toISOString(),
      lastActivityAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completionPercentage: 100,
      bestScore,
      totalAttempts: latestAttempts.length
    });
    await addXP(50);
    void xpFromAttempts;
    navigate('/progress');
  };

  return (
    <div className="mission-workspace-page">
      {/* Workspace Navigation Header */}
      <div className="mission-workspace-header">
        <div className="header-left-group">
          <button type="button" className="btn-exit-mission" onClick={() => navigate(exitTopicPath)}>
            <ArrowLeft size={16} /> Exit Mission
          </button>
          <div className="mission-title-area">
            <h2>{getText(mission.title.en, mission.title.ru)}</h2>
            <span className="topic-badge">
              {primaryTopic ? (languageMode === 'ru' ? primaryTopic.title.ru : primaryTopic.title.en) : 'Topic'}
            </span>
          </div>
        </div>

        <div className="header-right-group">
          <div className="xp-reward-tag">
            <Trophy size={14} className="text-warning" />
            <span>+{mission.xpReward || 250} XP</span>
          </div>
          <button type="button" className="btn-sidebar-trigger" onClick={() => toggleSidebar()}>
            <BookOpen size={16} />
            <span>Knowledge Sidebar</span>
          </button>
        </div>
      </div>

      {/* Stage Stepper Navigation Bar */}
      <StageStepper
        stages={stages}
        currentStageId={currentStage.id}
        completedStageIds={completedStageIds}
        onSelectStage={(stgId) => setCurrentStageId(stgId)}
      />

      {/* Main Workspace Active Stage Viewport */}
      <div className="mission-stage-viewport">
        {/* STAGE 1: MISSION INTRODUCTION */}
        {currentStage.type === 'MISSION_INTRODUCTION' && (
          <div className="stage-card intro-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 01</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="scenario-story">{getText(mission.scenarioIntroduction.en, mission.scenarioIntroduction.ru)}</p>

            {codeArtifact ? <CodeViewer artifact={codeArtifact} /> : (
              <p className="dev-missing-content">Missing mission code artifact (check FIX_BUILDER baseCodeArtifactId).</p>
            )}

            <SourceContext
              classification="CURATED_INTERVIEW_BANK"
              sources={missionSources}
              sourceReferences={missionSourceReferences}
            />

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Real Engineering Problem</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: REAL ENGINEERING PROBLEM */}
        {currentStage.type === 'REAL_ENGINEERING_PROBLEM' && (
          <div className="stage-card problem-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 02</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="problem-text">{getText(mission.engineeringProblem.en, mission.engineeringProblem.ru)}</p>

            {codeArtifact ? <CodeViewer artifact={codeArtifact} /> : (
              <p className="dev-missing-content">Missing mission code artifact (check FIX_BUILDER baseCodeArtifactId).</p>
            )}

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Think Yourself Diagnostic</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: THINK YOURSELF */}
        {currentStage.type === 'THINK_YOURSELF' && (
          <div className="stage-card think-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 03</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>{currentStage.instructions ? getText(currentStage.instructions.en, currentStage.instructions.ru) : ''}</p>

            <textarea
              className="hypothesis-textarea"
              rows={4}
              value={hypothesisText}
              onChange={(e) => setHypothesisText(e.target.value)}
              placeholder="Write your diagnostic hypothesis here..."
            />

            <div className="think-actions">
              <button type="button" className="btn-secondary-action" onClick={handleNextStage}>
                <HelpCircle size={16} /> I'm not sure (Skip to Theory)
              </button>
              <button
                type="button"
                className="btn-primary-action"
                disabled={!hypothesisText.trim()}
                onClick={handleHypothesisSubmit}
              >
                Submit Diagnostic Hypothesis
              </button>
            </div>

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Theory Stage"
              />
            )}
          </div>
        )}

        {/* STAGE 4: NEED HELP */}
        {currentStage.type === 'NEED_HELP' && (
          <div className="stage-card help-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 04</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>{currentStage.instructions ? getText(currentStage.instructions.en, currentStage.instructions.ru) : ''}</p>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Open Core Theory & Checkpoints</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5: THEORY */}
        {currentStage.type === 'THEORY' && (
          <div className="stage-card theory-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 05</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {/* Theory Sections */}
            <div className="theory-sections-container">
              {!theoryArticle && (
                <p className="dev-missing-content">Missing theory article for this mission (check THEORY stage theoryArticleId).</p>
              )}
              {theoryArticle?.sections.map((sec) => (
                <div key={sec.id} className="theory-section-block">
                  <h3>{getText(sec.title.en, sec.title.ru)}</h3>
                  {sec.blocks.map((b) => (
                    <p key={b.id} className="theory-p">{getText((b as any).content.en, (b as any).content.ru)}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Theory Checkpoints */}
            <div className="theory-checkpoints-container">
              <h3>Theory Checkpoints ({theoryCheckpoints.length} Learning Checks)</h3>
              {theoryCheckpoints.map((chk, idx) => {
                const feedback = checkpointFeedback[chk.id];

                return (
                  <div key={chk.id} className="checkpoint-card">
                    <h4>Checkpoint {idx + 1}: {getText(chk.question.en, chk.question.ru)}</h4>
                    <div className="options-stack">
                      {chk.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className={`checkpoint-option-btn ${checkpointAnswers[chk.id] === opt.id ? 'selected' : ''}`}
                          onClick={() => handleCheckpointSelect(chk.id, opt.id)}
                        >
                          <span>{getText(opt.text.en, opt.text.ru)}</span>
                        </button>
                      ))}
                    </div>

                    {feedback && (
                      <div className={`checkpoint-feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                        <span>{getText(feedback.text.en, feedback.text.ru)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Interactive Visualization</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 6: VISUALIZATION */}
        {currentStage.type === 'VISUALIZATION' && (
          <div className="stage-card visual-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 06</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {viz ? (
              <div className="visualization-comparison-box">
                <div className="visual-column broken">
                  <h4>🔴 {viz.brokenTitle}</h4>
                  <div className="memory-flow-box">
                    <code>{viz.brokenCode}</code>
                    <p>{viz.brokenDesc}</p>
                  </div>
                </div>

                <div className="visual-column protected">
                  <h4>🟢 {viz.fixedTitle}</h4>
                  <div className="memory-flow-box">
                    <code>{viz.fixedCode}</code>
                    <p>{viz.fixedDesc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="dev-missing-content">Missing visualization mapping for mission {mission.id}.</p>
            )}

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Guided FixBuilder Practice</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 7: INTERACTIVE PRACTICE */}
        {currentStage.type === 'INTERACTIVE_PRACTICE' && (
          <div className="stage-card practice-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 07</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {fixBuilderChallenge ? (
              <GuidedPuzzle
                challenge={fixBuilderChallenge as any}
                onAttemptSubmit={handleGuidedSubmit}
              />
            ) : (
              <p className="dev-missing-content">Missing FIX_BUILDER challenge for mission {mission.id}.</p>
            )}

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Senior Interview Question"
              />
            )}
          </div>
        )}

        {/* STAGE 8: INTERVIEW QUESTION */}
        {currentStage.type === 'INTERVIEW_QUESTION' && (
          <div className="stage-card interview-q-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 08</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="scenario-statement">
              {interviewAnswerChallenge
                ? getText(
                    (interviewAnswerChallenge as any).payload?.questionStatement?.en || (interviewAnswerChallenge as any).prompt.en,
                    (interviewAnswerChallenge as any).payload?.questionStatement?.ru || (interviewAnswerChallenge as any).prompt.ru
                  )
                : `Missing INTERVIEW_ANSWER challenge for mission ${mission.id}.`}
            </p>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Verbal Answer Formulation</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 9: INTERVIEW ANSWER */}
        {currentStage.type === 'INTERVIEW_ANSWER' && (
          <div className="stage-card interview-a-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 09</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {interviewAnswerChallenge ? (
              <InterviewAnswerChallengeView
                challenge={interviewAnswerChallenge as any}
                onAttemptSubmit={handleInterviewSubmit}
                isSubmitted={!!evaluation}
              />
            ) : (
              <p className="dev-missing-content">Missing INTERVIEW_ANSWER challenge for mission {mission.id}.</p>
            )}

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Applied Bug Hunt"
              />
            )}
          </div>
        )}

        {/* STAGE 10: DEBUG COUNTER-EXAMPLE */}
        {currentStage.type === 'DEBUG_COUNTER_EXAMPLE' && (
          <div className="stage-card debug-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 10</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {bugHuntChallenge ? (
              <BugHuntChallengeView
                challenge={bugHuntChallenge as any}
                onAttemptSubmit={handleBugHuntSubmit}
              />
            ) : (
              <p className="dev-missing-content">Missing BUG_HUNT challenge for mission {mission.id}.</p>
            )}

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Related Topics"
              />
            )}
          </div>
        )}

        {/* STAGE 11: RELATED TOPICS */}
        {currentStage.type === 'RELATED_TOPICS' && (
          <div className="stage-card related-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 11</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>Explore lateral knowledge connections to reinforce concepts across the OOP module graph.</p>

            <div className="related-nodes-grid">
              {relatedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="node-card"
                  onClick={() => navigate(`/modules/${topic.moduleId}/topics/${topic.slug}`)}
                >
                  <h4>{getText(topic.title.en, topic.title.ru)}</h4>
                  <p>{getText(topic.description.en, topic.description.ru)}</p>
                </div>
              ))}
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>View Mission Results Summary</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 12: MISSION RESULTS */}
        {currentStage.type === 'MISSION_RESULTS' && (
          <div className="stage-card results-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 12</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <div className="results-summary-card">
              <Trophy size={48} className="text-warning hero-trophy" />
              <h3>Mission Completed!</h3>
              <p>{getText(mission.description.en, mission.description.ru)}</p>

              {(() => {
                const challengeIds = new Set(
                  OOP_DATA_PACKAGE.challenges.filter((c) => c.missionId === mission.id).map((c) => c.id)
                );
                const totalChallenges = challengeIds.size;
                const attempts = missionAttempts;
                const submitted = attempts.length;
                const byChallenge = new Map<string, UserAttempt>();
                for (const a of attempts) {
                  const prev = byChallenge.get(a.challengeId);
                  if (!prev || a.submittedAt > prev.submittedAt) byChallenge.set(a.challengeId, a);
                }
                const completedChallenges = [...byChallenge.values()].filter(
                  (a) => a.evaluation.correctness === 'CORRECT' || a.evaluation.correctness === 'PARTIALLY_CORRECT'
                ).length;
                const correct = attempts.filter((a) => a.evaluation.correctness === 'CORRECT').length;
                const partial = attempts.filter((a) => a.evaluation.correctness === 'PARTIALLY_CORRECT').length;
                const incorrect = attempts.filter((a) => a.evaluation.correctness === 'INCORRECT').length;
                const hintsOpened = Math.max(
                  hintsRevealedIds.length,
                  ...attempts.map((a) => a.hintsUsedCount),
                  0
                );
                const xpEarned = attempts.reduce((sum, a) => sum + (a.xpAwarded || 0), 0);
                const confidenceCounts = attempts.reduce(
                  (acc, a) => {
                    acc[a.confidence] = (acc[a.confidence] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>
                );
                const confidentCorrect = attempts.filter(
                  (a) => a.confidence === 'CONFIDENT' && a.evaluation.correctness === 'CORRECT'
                ).length;
                const confidentTotal = attempts.filter((a) => a.confidence === 'CONFIDENT').length;
                const confidenceAccuracy =
                  confidentTotal > 0
                    ? `${Math.round((confidentCorrect / confidentTotal) * 100)}%`
                    : 'Not available yet';
                const accuracy =
                  submitted > 0
                    ? `${Math.round((correct / submitted) * 100)}%`
                    : 'Not available yet';
                let timeLabel = 'Not available yet';
                if (missionProgressRecord?.startedAt && missionProgressRecord?.lastActivityAt) {
                  const ms =
                    new Date(missionProgressRecord.lastActivityAt).getTime() -
                    new Date(missionProgressRecord.startedAt).getTime();
                  if (Number.isFinite(ms) && ms >= 0) {
                    const mins = Math.round(ms / 60000);
                    timeLabel = mins < 1 ? '<1m' : `${mins}m`;
                  }
                } else if (sessionStartedAt) {
                  const mins = Math.round((Date.now() - sessionStartedAt) / 60000);
                  timeLabel = `${mins < 1 ? '<1' : mins}m (session estimate)`;
                }
                const mistakeIds = [
                  ...new Set(attempts.flatMap((a) => a.evaluation.detectedMistakePatternIds || []))
                ];

                const metric = (num: string, lbl: string) => (
                  <div className="metric-box" key={lbl}>
                    <span className="metric-num">{num}</span>
                    <span className="metric-lbl">{lbl}</span>
                  </div>
                );

                return (
                  <>
                    <div className="stats-metric-grid">
                      {metric(`${completedChallenges}/${totalChallenges || '—'}`, 'Challenges Done')}
                      {metric(String(submitted), 'Submitted Attempts')}
                      {metric(accuracy, 'Attempt Accuracy')}
                      {metric(String(hintsOpened), 'Hints Opened')}
                      {metric(xpEarned > 0 ? `+${xpEarned}` : 'Not available yet', 'XP from Attempts')}
                      {metric(timeLabel, 'Time Spent')}
                    </div>
                    <div className="results-detail-list" style={{ marginTop: '1rem', textAlign: 'left' }}>
                      <p><strong>Correct / Partial / Incorrect:</strong> {correct} / {partial} / {incorrect}</p>
                      <p>
                        <strong>Confidence selections:</strong>{' '}
                        {submitted > 0
                          ? Object.entries(confidenceCounts).map(([k, v]) => `${k}: ${v}`).join(' · ')
                          : 'Not available yet'}
                      </p>
                      <p><strong>Confidence accuracy:</strong> {confidenceAccuracy}</p>
                      <p>
                        <strong>Detected mistake patterns:</strong>{' '}
                        {mistakeIds.length > 0 ? mistakeIds.join(', ') : 'None recorded'}
                      </p>
                      <p>
                        <strong>Scheduled reviews:</strong> Not available yet
                        <span style={{ opacity: 0.7 }}> (review queue is concept-scoped; mission filter pending)</span>
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Engineering Reflection</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 13: REFLECTION */}
        {currentStage.type === 'REFLECTION' && (
          <div className="stage-card reflection-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 13</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>Write a 1-sentence engineering reflection on what production rule you will apply in your daily code:</p>

            <textarea
              className="reflection-textarea"
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="e.g. Write one production rule from this mission you will enforce in code reviews..."
            />

            <div className="stage-actions">
              <button
                type="button"
                className="btn-primary-action large"
                disabled={!reflectionText.trim()}
                onClick={handleReflectionSubmit}
              >
                Save Reflection & View Progress Matrix
              </button>
            </div>
          </div>
        )}
      </div>

      <KnowledgeSidebar />
    </div>
  );
};
