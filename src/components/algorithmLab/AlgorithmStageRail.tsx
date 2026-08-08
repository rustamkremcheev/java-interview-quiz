import React from 'react';
import { AlgorithmStage, AlgorithmStageType, WorkshopProgress } from '../../types/algorithmLab';
import { LanguageMode } from '../../types/domain';
import { getLocalizedInline } from '../../lib/localized';
import { Check } from 'lucide-react';

export type StageNavStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'RECOMMENDED_NEXT';

const STATUS_LABEL: Record<StageNavStatus, { en: string; ru: string }> = {
  NOT_STARTED: { en: 'Not Started', ru: 'Не начато' },
  IN_PROGRESS: { en: 'In Progress', ru: 'В процессе' },
  COMPLETED: { en: 'Completed', ru: 'Завершено' },
  RECOMMENDED_NEXT: { en: 'Recommended Next', ru: 'Рекомендуется далее' }
};

function hasPartialWork(type: AlgorithmStageType, progress: WorkshopProgress): boolean {
  switch (type) {
    case 'CLARIFY':
      return progress.clarifySelectedOptionIds.length > 0;
    case 'STRATEGY':
      return !!progress.selectedStrategyId || progress.strategyJustificationChipIds.length > 0;
    case 'BLUEPRINT':
      return progress.blueprintAttempts > 0 || progress.blueprintOrder.length > 0;
    case 'CODE_MOSAIC':
      return progress.mosaicAttempts > 0 || progress.mosaicOrder.length > 0;
    case 'TRACE':
      return progress.traceTotalAnswered > 0 || progress.traceStepIndex > 0;
    case 'SUMMARY':
      return progress.reflectionText.trim().length > 0 || progress.markedForReview;
    default:
      return false;
  }
}

export function getRecommendedStageType(
  stages: readonly AlgorithmStage[],
  completed: readonly AlgorithmStageType[]
): AlgorithmStageType | undefined {
  return stages.find((s) => !completed.includes(s.type))?.type;
}

export function getStageNavStatus(
  stageType: AlgorithmStageType,
  stages: readonly AlgorithmStage[],
  progress: WorkshopProgress
): StageNavStatus {
  if (progress.completedStageTypes.includes(stageType)) return 'COMPLETED';
  const recommended = getRecommendedStageType(stages, progress.completedStageTypes);
  if (hasPartialWork(stageType, progress) || progress.currentStageType === stageType) {
    if (stageType === recommended && !hasPartialWork(stageType, progress)) {
      return 'RECOMMENDED_NEXT';
    }
    return 'IN_PROGRESS';
  }
  if (stageType === recommended) return 'RECOMMENDED_NEXT';
  return 'NOT_STARTED';
}

interface AlgorithmStageRailProps {
  stages: readonly AlgorithmStage[];
  current: AlgorithmStageType;
  progress: WorkshopProgress;
  languageMode: LanguageMode;
  onSelect: (type: AlgorithmStageType) => void;
}

export const AlgorithmStageRail: React.FC<AlgorithmStageRailProps> = ({
  stages,
  current,
  progress,
  languageMode,
  onSelect
}) => {
  return (
    <nav className="alg-stage-rail" aria-label="Workshop stages">
      <ol>
        {stages.map((stage) => {
          const status = getStageNavStatus(stage.type, stages, progress);
          const isCurrent = stage.type === current;
          const statusLabel =
            languageMode === 'ru' ? STATUS_LABEL[status].ru : STATUS_LABEL[status].en;
          const title = getLocalizedInline(stage.title, languageMode);

          return (
            <li key={stage.id}>
              <button
                type="button"
                className={`alg-stage-rail-item status-${status.toLowerCase()} ${
                  isCurrent ? 'is-current' : ''
                }`}
                onClick={() => onSelect(stage.type)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`${title}, ${statusLabel}${isCurrent ? ', current stage' : ''}`}
              >
                <span className="alg-stage-index" aria-hidden>
                  {status === 'COMPLETED' ? <Check size={14} /> : stage.order}
                </span>
                <span className="alg-stage-rail-copy">
                  <span className="alg-stage-rail-title">{title}</span>
                  <span className="alg-stage-rail-status">{statusLabel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
