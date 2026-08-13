import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { getWorkshopPackBySlug } from '../data/algorithms/packs';
import {
  createEmptyWorkshopProgress,
  getWorkshopProgress,
  recordWorkshopAttempt,
  saveWorkshopProgress,
  wasPersistenceFallbackUsed
} from '../db/database';
import { AlgorithmStageType, WorkshopProgress } from '../types/algorithmLab';
import {
  AlgorithmStageRail,
  getRecommendedStageType
} from '../components/algorithmLab/AlgorithmStageRail';
import { AlgorithmHintPanel } from '../components/algorithmLab/AlgorithmHintPanel';
import { ClarifyStage } from '../components/algorithmLab/stages/ClarifyStage';
import { StrategyStage } from '../components/algorithmLab/stages/StrategyStage';
import { BlueprintStage } from '../components/algorithmLab/stages/BlueprintStage';
import { CodeMosaicStage } from '../components/algorithmLab/stages/CodeMosaicStage';
import { TraceStage } from '../components/algorithmLab/stages/TraceStage';
import { SummaryStage } from '../components/algorithmLab/stages/SummaryStage';
import { getLocalizedInline } from '../lib/localized';
import { sanitizeMosaicProgress } from '../lib/algorithmLab/mosaicMigration';
import { ArrowLeft } from 'lucide-react';

function withCompleted(progress: WorkshopProgress, stage: AlgorithmStageType): WorkshopProgress {
  const completed = progress.completedStageTypes.includes(stage)
    ? progress.completedStageTypes
    : [...progress.completedStageTypes, stage];
  return { ...progress, completedStageTypes: completed };
}

function nextMastery(progress: WorkshopProgress): WorkshopProgress['masteryState'] {
  if (progress.completedStageTypes.includes('SUMMARY') || progress.completedStageTypes.includes('TRACE')) {
    if (progress.completedStageTypes.includes('SUMMARY')) return 'WORKSHOP_COMPLETE';
    return 'SIMULATING';
  }
  if (progress.completedStageTypes.includes('BLUEPRINT') || progress.completedStageTypes.includes('CODE_MOSAIC')) {
    return 'ASSEMBLING';
  }
  if (progress.completedStageTypes.length > 0) return 'LEARNING';
  return 'NOT_STARTED';
}

export const AlgorithmWorkshopPage: React.FC = () => {
  const { problemSlug } = useParams<{ problemSlug: string }>();
  const navigate = useNavigate();
  const { languageMode, reducedMotion } = useAppStore();
  const pack = getWorkshopPackBySlug(problemSlug || '');
  const problem = pack?.problem;

  const [progress, setProgress] = useState<WorkshopProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [persistWarning, setPersistWarning] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');

  const persist = useCallback(async (next: WorkshopProgress) => {
    const withMastery = { ...next, masteryState: nextMastery(next) };
    setProgress(withMastery);
    const result = await saveWorkshopProgress(withMastery);
    if (result.usedFallback || wasPersistenceFallbackUsed()) setPersistWarning(true);
  }, []);

  const mosaic = useMemo(
    () => (pack ? pack.resolveMosaic(progress?.selectedStrategyId) : null),
    [pack, progress?.selectedStrategyId]
  );

  useEffect(() => {
    if (!pack || !problem) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const row = await getWorkshopProgress(problem.id);
      if (cancelled) return;
      const puzzle = pack.resolveMosaic(row.selectedStrategyId);
      const sanitized = sanitizeMosaicProgress(row, puzzle);
      setProgress(sanitized);
      const changed =
        JSON.stringify(sanitized.mosaicOrder) !== JSON.stringify(row.mosaicOrder) ||
        JSON.stringify(sanitized.mosaicDiscardedIds) !== JSON.stringify(row.mosaicDiscardedIds) ||
        sanitized.mosaicSolutionId !== row.mosaicSolutionId ||
        sanitized.mosaicSolutionVersion !== row.mosaicSolutionVersion;
      if (changed) {
        await saveWorkshopProgress(sanitized);
      }
      setPersistWarning(wasPersistenceFallbackUsed());
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [pack, problem]);

  const stage = progress?.currentStageType ?? 'CLARIFY';

  const strategyTitle = useMemo(() => {
    if (!pack) return '—';
    const strat = pack.strategies.find((s) => s.id === progress?.selectedStrategyId);
    return strat ? getLocalizedInline(strat.title, languageMode) : '—';
  }, [pack, progress?.selectedStrategyId, languageMode]);

  const targetTitle = pack
    ? getLocalizedInline(
        pack.strategies.find((s) => s.id === pack.targetStrategyId)?.title ?? {
          en: 'target path',
          ru: 'целевой путь'
        },
        languageMode
      )
    : '';

  if (!pack || !problem) {
    return (
      <div className="alg-stage-card">
        <h2>Problem not found</h2>
        <button type="button" className="btn-primary-action" onClick={() => navigate('/algorithms')}>
          Back to Algorithm Lab
        </button>
      </div>
    );
  }

  if (loading || !progress || !mosaic) {
    return <div className="alg-stage-card">Loading workshop…</div>;
  }

  const goStage = async (type: AlgorithmStageType) => {
    setLiveMessage(`Stage ${type}`);
    await persist({ ...progress, currentStageType: type });
  };

  const markCompleteAndAdvance = async (type: AlgorithmStageType, next: AlgorithmStageType) => {
    const updated = withCompleted(progress, type);
    setLiveMessage(`Completed ${type}`);
    await persist({ ...updated, currentStageType: next });
  };

  const recommended = getRecommendedStageType(problem.stages, progress.completedStageTypes);
  const advisories: string[] = [];
  if (
    (stage === 'CODE_MOSAIC' || stage === 'TRACE' || stage === 'BLUEPRINT') &&
    !progress.selectedStrategyId
  ) {
    advisories.push(
      languageMode === 'ru'
        ? `Стратегия не выбрана — путь воркшопа по умолчанию: ${targetTitle}.`
        : `Strategy not selected — default workshop path: ${targetTitle}.`
    );
  }
  if (stage === 'CODE_MOSAIC' && !progress.completedStageTypes.includes('BLUEPRINT')) {
    advisories.push(
      languageMode === 'ru'
        ? 'Рекомендуется: сначала завершите Blueprint, чтобы понять структуру алгоритма.'
        : 'Recommended: complete Blueprint first to understand the algorithm structure.'
    );
  }
  if (stage === 'TRACE' && !progress.completedStageTypes.includes('CODE_MOSAIC')) {
    advisories.push(
      languageMode === 'ru'
        ? 'Рекомендуется: собрать Code Mosaic перед трассировкой — можно продолжить с каноническим trace.'
        : 'Recommended: assemble Code Mosaic before tracing — you can continue with the canonical trace.'
    );
  }
  if (stage === 'SUMMARY' && recommended && recommended !== 'SUMMARY') {
    advisories.push(
      languageMode === 'ru'
        ? 'Итоги доступны в любой момент. Незавершённые этапы не отмечаются выполненными.'
        : 'Summary is available anytime. Incomplete stages are not marked completed.'
    );
  }
  if (recommended && stage !== recommended && !progress.completedStageTypes.includes(stage)) {
    const recTitle = problem.stages.find((s) => s.type === recommended);
    if (recTitle && stage !== 'SUMMARY') {
      if (!advisories.some((a) => a.includes('Recommended') || a.includes('Рекомендуется'))) {
        advisories.push(
          languageMode === 'ru'
            ? `Рекомендуется далее: ${recTitle.title.ru}`
            : `Recommended next: ${recTitle.title.en}`
        );
      }
    }
  }

  return (
    <div className={`alg-workshop-page ${stage === 'CODE_MOSAIC' ? 'is-mosaic-workspace' : ''}`}>
      <div className="alg-workshop-top">
        <button
          type="button"
          className="alg-back-btn"
          onClick={() => navigate('/algorithms')}
          aria-label="Back to Algorithm Lab"
        >
          <ArrowLeft size={16} /> Algorithm Lab
        </button>
        <div>
          <h1>{getLocalizedInline(problem.title, languageMode)}</h1>
          <p className="alg-help">
            {getLocalizedInline(
              problem.stages.find((s) => s.type === stage)?.instructions ?? problem.summary,
              languageMode
            )}
          </p>
        </div>
      </div>

      {persistWarning && (
        <div className="alg-persist-warning" role="status">
          IndexedDB unavailable — progress kept in memory for this session only.
        </div>
      )}

      {advisories.length > 0 && (
        <div className="alg-soft-advisory" role="status" aria-live="polite">
          {advisories.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}

      <div className="alg-workshop-layout">
        <AlgorithmStageRail
          stages={problem.stages}
          current={stage}
          progress={progress}
          languageMode={languageMode}
          onSelect={(type) => void goStage(type)}
        />

        <div className="alg-workshop-main">
          {stage === 'CLARIFY' && (
            <ClarifyStage
              problem={problem}
              questions={pack.clarify}
              selectedOptionIds={progress.clarifySelectedOptionIds}
              languageMode={languageMode}
              onChange={(ids) =>
                void persist({ ...progress, clarifySelectedOptionIds: ids, masteryState: 'LEARNING' })
              }
              onComplete={(ids) => {
                void recordWorkshopAttempt({
                  problemId: problem.id,
                  stageType: 'CLARIFY',
                  submittedAt: new Date().toISOString(),
                  payloadJson: JSON.stringify(ids),
                  correct: true
                });
                void markCompleteAndAdvance('CLARIFY', 'STRATEGY');
              }}
            />
          )}

          {stage === 'STRATEGY' && (
            <StrategyStage
              strategies={pack.strategies}
              targetStrategyId={pack.targetStrategyId}
              selectedStrategyId={progress.selectedStrategyId}
              justificationChipIds={progress.strategyJustificationChipIds}
              languageMode={languageMode}
              onSelect={(strategyId) => {
                const changed =
                  !!progress.selectedStrategyId && progress.selectedStrategyId !== strategyId;
                const previous = progress.selectedStrategyId
                  ? [...progress.previousStrategyIds, progress.selectedStrategyId]
                  : progress.previousStrategyIds;
                void persist({
                  ...progress,
                  selectedStrategyId: strategyId,
                  strategyChanged: progress.strategyChanged || changed,
                  previousStrategyIds: previous,
                  strategyJustificationChipIds: []
                });
              }}
              onToggleChip={(chipKey) => {
                const exists = progress.strategyJustificationChipIds.includes(chipKey);
                const next = exists
                  ? progress.strategyJustificationChipIds.filter((id) => id !== chipKey)
                  : [...progress.strategyJustificationChipIds, chipKey];
                void persist({ ...progress, strategyJustificationChipIds: next });
              }}
              onLockTargetPath={() => {
                void recordWorkshopAttempt({
                  problemId: problem.id,
                  stageType: 'STRATEGY',
                  submittedAt: new Date().toISOString(),
                  payloadJson: JSON.stringify({
                    selected: progress.selectedStrategyId,
                    locked: pack.targetStrategyId
                  }),
                  correct: true
                });
                void persist({
                  ...withCompleted(progress, 'STRATEGY'),
                  selectedStrategyId: pack.targetStrategyId,
                  currentStageType: 'BLUEPRINT'
                });
              }}
            />
          )}

          {stage === 'BLUEPRINT' && (
            <BlueprintStage
              blueprint={pack.blueprint}
              railIds={progress.blueprintOrder}
              discardedIds={progress.blueprintDiscardedIds}
              languageMode={languageMode}
              helpText={pack.blueprintHelp}
              successMessage={pack.blueprintSuccessMessage}
              onRailChange={(ids) => void persist({ ...progress, blueprintOrder: ids })}
              onDiscardedChange={(ids) => void persist({ ...progress, blueprintDiscardedIds: ids })}
              onAttempt={(correct) => {
                void recordWorkshopAttempt({
                  problemId: problem.id,
                  stageType: 'BLUEPRINT',
                  submittedAt: new Date().toISOString(),
                  payloadJson: JSON.stringify(progress.blueprintOrder),
                  correct
                });
                void persist({
                  ...progress,
                  blueprintAttempts: progress.blueprintAttempts + 1,
                  masteryState: 'ASSEMBLING'
                });
              }}
              onComplete={() => void markCompleteAndAdvance('BLUEPRINT', 'CODE_MOSAIC')}
            />
          )}

          {stage === 'CODE_MOSAIC' && (
            <CodeMosaicStage
              mosaic={mosaic}
              railIds={progress.mosaicOrder}
              discardedIds={progress.mosaicDiscardedIds}
              languageMode={languageMode}
              successMessage={pack.mosaicSuccessMessage}
              onRailChange={(ids) =>
                void persist({
                  ...progress,
                  mosaicOrder: ids,
                  mosaicSolutionId: mosaic.solutionId,
                  mosaicSolutionVersion: mosaic.solutionVersion
                })
              }
              onDiscardedChange={(ids) =>
                void persist({
                  ...progress,
                  mosaicDiscardedIds: ids,
                  mosaicSolutionId: mosaic.solutionId,
                  mosaicSolutionVersion: mosaic.solutionVersion
                })
              }
              onAttempt={(correct, correctDiscards) => {
                void recordWorkshopAttempt({
                  problemId: problem.id,
                  stageType: 'CODE_MOSAIC',
                  submittedAt: new Date().toISOString(),
                  payloadJson: JSON.stringify({
                    solutionId: mosaic.solutionId,
                    solutionVersion: mosaic.solutionVersion,
                    mosaicOrder: progress.mosaicOrder
                  }),
                  correct
                });
                void persist({
                  ...progress,
                  mosaicAttempts: progress.mosaicAttempts + 1,
                  mosaicCorrectDiscards: correctDiscards,
                  mosaicSolutionId: mosaic.solutionId,
                  mosaicSolutionVersion: mosaic.solutionVersion,
                  masteryState: 'ASSEMBLING'
                });
              }}
              onComplete={() => void markCompleteAndAdvance('CODE_MOSAIC', 'TRACE')}
            />
          )}

          {stage === 'TRACE' && (
            <TraceStage
              trace={pack.trace}
              stepIndex={progress.traceStepIndex}
              correctSteps={progress.traceCorrectSteps}
              totalAnswered={progress.traceTotalAnswered}
              followUpAnswer={progress.followUpTraceAnswer}
              followUpCorrect={progress.followUpTraceCorrect}
              languageMode={languageMode}
              reducedMotion={reducedMotion}
              onStepProgress={(correct, nextIndex) => {
                void persist({
                  ...progress,
                  traceStepIndex: nextIndex,
                  traceCorrectSteps: progress.traceCorrectSteps + (correct ? 1 : 0),
                  traceTotalAnswered: progress.traceTotalAnswered + 1,
                  masteryState: 'SIMULATING'
                });
              }}
              onFollowUp={(answer, correct) => {
                void persist({
                  ...progress,
                  followUpTraceAnswer: answer,
                  followUpTraceCorrect: correct,
                  traceCorrectSteps: progress.traceCorrectSteps + (correct ? 1 : 0),
                  traceTotalAnswered: progress.traceTotalAnswered + 1
                });
              }}
              onComplete={() =>
                void persist({
                  ...withCompleted(withCompleted(progress, 'TRACE'), 'SUMMARY'),
                  currentStageType: 'SUMMARY',
                  masteryState: 'WORKSHOP_COMPLETE',
                  bestCompletedAt: progress.bestCompletedAt ?? new Date().toISOString()
                })
              }
            />
          )}

          {stage === 'SUMMARY' && (
            <SummaryStage
              progress={progress}
              stages={problem.stages}
              strategyTitle={
                progress.selectedStrategyId
                  ? strategyTitle
                  : languageMode === 'ru'
                    ? `Не выбрана (по умолчанию ${targetTitle})`
                    : `Not selected (default ${targetTitle})`
              }
              languageMode={languageMode}
              reflectionPrompt={pack.reflectionPrompt}
              summary={pack.summary}
              onReflectionChange={(text) => void persist({ ...progress, reflectionText: text })}
              onRepeatMosaic={() => void goStage('CODE_MOSAIC')}
              onRepeatTrace={() =>
                void persist({
                  ...progress,
                  currentStageType: 'TRACE',
                  traceStepIndex: 0,
                  followUpTraceAnswer: undefined,
                  followUpTraceCorrect: undefined
                })
              }
              onRestartWorkshop={async () => {
                const fresh = createEmptyWorkshopProgress(problem.id);
                await persist({ ...fresh, bestCompletedAt: progress.bestCompletedAt });
              }}
              onReturnLab={() => navigate('/algorithms')}
              onMarkReview={() => void persist({ ...progress, markedForReview: true })}
            />
          )}
        </div>

        <AlgorithmHintPanel
          hints={pack.hints}
          stageType={stage}
          revealedCount={progress.hintsUsedByStage[stage] ?? 0}
          languageMode={languageMode}
          onRevealNext={() => {
            const currentCount = progress.hintsUsedByStage[stage] ?? 0;
            void persist({
              ...progress,
              hintsUsedByStage: {
                ...progress.hintsUsedByStage,
                [stage]: currentCount + 1
              }
            });
          }}
        />
      </div>

      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>
    </div>
  );
};
