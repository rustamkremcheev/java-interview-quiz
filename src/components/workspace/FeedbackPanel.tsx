import React from 'react';
import { EvaluationResult } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

interface FeedbackPanelProps {
  evaluation: EvaluationResult;
  onNextAction?: () => void;
  nextActionLabel?: string;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  evaluation,
  onNextAction,
  nextActionLabel = "Continue to Next Stage"
}) => {
  const { languageMode } = useAppStore();

  const isCorrect = evaluation.correctness === 'CORRECT';
  const isPartial = evaluation.correctness === 'PARTIALLY_CORRECT';

  const getFeedbackText = () => {
    if (languageMode === 'ru') return evaluation.feedback.ru;
    return evaluation.feedback.en;
  };

  return (
    <div
      className={`feedback-panel-banner ${isCorrect ? 'status-correct' : isPartial ? 'status-partial' : 'status-incorrect'}`}
      role="alert"
      aria-live="polite"
    >
      <div className="banner-left-area">
        {isCorrect ? (
          <CheckCircle2 size={24} className="banner-icon text-success" />
        ) : isPartial ? (
          <AlertTriangle size={24} className="banner-icon text-warning" />
        ) : (
          <XCircle size={24} className="banner-icon text-danger" />
        )}

        <div className="banner-text-wrap">
          <h4 className="banner-status-heading">
            {isCorrect
              ? '🟢 Correct Attempt!'
              : isPartial
              ? '⚠️ Partially Correct'
              : '🔴 Incorrect — Misconception Detected'}
          </h4>
          <p className="banner-feedback-body">{getFeedbackText()}</p>
        </div>
      </div>

      {onNextAction && (
        <div className="banner-right-action">
          <button type="button" className="btn-primary-action" onClick={onNextAction}>
            <span>{nextActionLabel}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
