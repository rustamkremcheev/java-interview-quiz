import React from 'react';
import { AlgorithmStage, WorkshopProgress } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedText, getLocalizedInline } from '../../../lib/localized';
import { getStageNavStatus } from '../AlgorithmStageRail';

interface SummaryStageProps {
  progress: WorkshopProgress;
  stages: readonly AlgorithmStage[];
  strategyTitle: string;
  languageMode: LanguageMode;
  reflectionPrompt: { en: string; ru: string };
  onReflectionChange: (text: string) => void;
  onRepeatMosaic: () => void;
  onRepeatTrace: () => void;
  onRestartWorkshop: () => void;
  onReturnLab: () => void;
  onMarkReview: () => void;
}

const LEARNING_STAGE_TYPES = new Set([
  'CLARIFY',
  'STRATEGY',
  'BLUEPRINT',
  'CODE_MOSAIC',
  'TRACE'
]);

export const SummaryStage: React.FC<SummaryStageProps> = ({
  progress,
  stages,
  strategyTitle,
  languageMode,
  reflectionPrompt,
  onReflectionChange,
  onRepeatMosaic,
  onRepeatTrace,
  onRestartWorkshop,
  onReturnLab,
  onMarkReview
}) => {
  const learningStages = stages.filter((s) => LEARNING_STAGE_TYPES.has(s.type));
  const learningCompleted = learningStages.filter((s) =>
    progress.completedStageTypes.includes(s.type)
  ).length;

  const traceAccuracy =
    progress.traceTotalAnswered > 0
      ? `${Math.round((progress.traceCorrectSteps / progress.traceTotalAnswered) * 100)}%`
      : 'Not available yet';

  const hintsUsed = Object.values(progress.hintsUsedByStage).reduce((a, b) => a + (b ?? 0), 0);

  const stageAttemptLabel = (type: string): string => {
    if (progress.completedStageTypes.includes(type as WorkshopProgress['currentStageType'])) {
      return languageMode === 'ru' ? 'Завершено' : 'Completed';
    }
    if (type === 'BLUEPRINT' && progress.blueprintAttempts === 0 && progress.blueprintOrder.length === 0) {
      return languageMode === 'ru' ? 'Не попыток' : 'Not attempted';
    }
    if (type === 'CODE_MOSAIC' && progress.mosaicAttempts === 0 && progress.mosaicOrder.length === 0) {
      return languageMode === 'ru' ? 'Не попыток' : 'Not attempted';
    }
    if (type === 'TRACE' && progress.traceTotalAnswered === 0) {
      return languageMode === 'ru' ? 'Не попыток' : 'Not attempted';
    }
    const status = getStageNavStatus(type as WorkshopProgress['currentStageType'], stages, progress);
    if (status === 'IN_PROGRESS') return languageMode === 'ru' ? 'В процессе' : 'In Progress';
    if (status === 'RECOMMENDED_NEXT') return languageMode === 'ru' ? 'Рекомендуется далее' : 'Recommended Next';
    return languageMode === 'ru' ? 'Не начато' : 'Not Started';
  };

  return (
    <div className="alg-stage-card">
      <h2>{languageMode === 'ru' ? 'Итоги воркшопа' : 'Workshop Summary'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Только честные производные метрики. Время не отслеживалось. Прогресс = завершённые этапы, не посещённые.'
          : 'Honest derived metrics only. Time was not tracked. Progress counts completed stages, not visits.'}
      </p>

      <p className="alg-summary-progress" aria-live="polite">
        {languageMode === 'ru'
          ? `Прогресс воркшопа: ${learningCompleted} / ${learningStages.length} учебных этапов завершено`
          : `Workshop progress: ${learningCompleted} / ${learningStages.length} learning stages completed`}
      </p>

      <ul className="alg-summary-stage-status">
        {learningStages.map((stage) => (
          <li key={stage.id}>
            <strong>{getLocalizedInline(stage.title, languageMode)}</strong>
            <span>{stageAttemptLabel(stage.type)}</span>
          </li>
        ))}
      </ul>

      <div className="alg-summary-grid">
        <div className="alg-metric">
          <span className="alg-metric-num">
            {learningCompleted}/{learningStages.length}
          </span>
          <span>Learning stages completed</span>
        </div>
        <div className="alg-metric">
          <span className="alg-metric-num">
            {progress.blueprintAttempts > 0 ? progress.blueprintAttempts : '—'}
          </span>
          <span>Blueprint attempts</span>
        </div>
        <div className="alg-metric">
          <span className="alg-metric-num">
            {progress.mosaicAttempts > 0 ? progress.mosaicAttempts : '—'}
          </span>
          <span>Mosaic attempts</span>
        </div>
        <div className="alg-metric">
          <span className="alg-metric-num">
            {progress.mosaicAttempts > 0 ? progress.mosaicCorrectDiscards : '—'}
          </span>
          <span>Correct discards (last check)</span>
        </div>
        <div className="alg-metric">
          <span className="alg-metric-num">{traceAccuracy}</span>
          <span>Trace accuracy</span>
        </div>
        <div className="alg-metric">
          <span className="alg-metric-num">{hintsUsed}</span>
          <span>Hints used</span>
        </div>
      </div>

      <ul className="alg-summary-list">
        <li>
          <strong>Strategy:</strong> {strategyTitle}
        </li>
        <li>
          <strong>Strategy changed:</strong> {progress.strategyChanged ? 'Yes' : 'No'}
        </li>
        <li>
          <strong>Mastery state:</strong> {progress.masteryState}
        </li>
        <li>
          <strong>Time:</strong> Not tracked
        </li>
      </ul>

      <label className="alg-reflection">
        <span>{getLocalizedText(reflectionPrompt, languageMode)}</span>
        <textarea
          rows={4}
          value={progress.reflectionText}
          onChange={(e) => onReflectionChange(e.target.value)}
          placeholder={
            languageMode === 'ru'
              ? 'Например: нужно ответить «видел ли я это значение?»'
              : 'e.g. The ask is membership: “have I seen this value before?”'
          }
        />
      </label>

      <div className="alg-stage-actions wrap">
        <button type="button" className="btn-secondary-action" onClick={onRepeatMosaic}>
          Repeat Code Mosaic
        </button>
        <button type="button" className="btn-secondary-action" onClick={onRepeatTrace}>
          Repeat Trace
        </button>
        <button type="button" className="btn-secondary-action" onClick={onRestartWorkshop}>
          Restart Workshop
        </button>
        <button type="button" className="btn-secondary-action" onClick={onMarkReview}>
          {progress.markedForReview ? 'Marked for Review' : 'Mark for Review'}
        </button>
        <button type="button" className="btn-primary-action" onClick={onReturnLab}>
          Return to Algorithm Lab
        </button>
      </div>
    </div>
  );
};
