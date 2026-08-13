import React, { useState } from 'react';
import { TraceScenario } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedInline, getLocalizedText } from '../../../lib/localized';
import { ArrayFilmstrip } from '../ArrayFilmstrip';
import { SetTokenCloud } from '../SetTokenCloud';

interface TraceStageProps {
  trace: TraceScenario;
  stepIndex: number;
  correctSteps: number;
  totalAnswered: number;
  followUpAnswer?: string | boolean;
  followUpCorrect?: boolean;
  languageMode: LanguageMode;
  reducedMotion: boolean;
  onStepProgress: (correct: boolean, nextIndex: number) => void;
  onFollowUp: (answerId: string, correct: boolean) => void;
  onComplete: () => void;
}

export const TraceStage: React.FC<TraceStageProps> = ({
  trace,
  stepIndex,
  followUpAnswer,
  followUpCorrect,
  languageMode,
  reducedMotion,
  onStepProgress,
  onFollowUp,
  onComplete
}) => {
  const [feedback, setFeedback] = useState('');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const completed = stepIndex >= trace.steps.length;
  const current = !completed ? trace.steps[stepIndex] : null;

  const submitStep = () => {
    if (!current || !selectedChoiceId) return;
    const correct = selectedChoiceId === current.correctChoiceId;
    if (!correct) {
      setFeedback(getLocalizedText(current.feedbackIncorrect, languageMode));
      onStepProgress(false, stepIndex);
      return;
    }
    setFeedback(getLocalizedText(current.feedbackCorrect, languageMode));
    setSelectedChoiceId(null);
    const next = stepIndex + 1;
    onStepProgress(true, next);
    if (next >= trace.steps.length && followUpCorrect) {
      onComplete();
    }
  };

  const handleFollowUp = (answerId: string) => {
    const correct = answerId === trace.followUpCorrectChoiceId;
    onFollowUp(answerId, correct);
    setFeedback(
      getLocalizedText(
        correct ? trace.followUpFeedbackCorrect : trace.followUpFeedbackIncorrect,
        languageMode
      )
    );
    if (correct && stepIndex >= trace.steps.length) {
      onComplete();
    }
  };

  const selectedFollowUpId =
    typeof followUpAnswer === 'string'
      ? followUpAnswer
      : followUpAnswer === true
        ? 'true'
        : followUpAnswer === false
          ? 'false'
          : undefined;

  return (
    <div className="alg-stage-card">
      <h2>{languageMode === 'ru' ? 'Трассировка выполнения' : 'Execution Trace'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Один шаг за раз. Смотрите состояние, специфичное для алгоритма.'
          : 'One step at a time. Watch algorithm-specific state.'}
      </p>

      <p className="alg-meta-row">
        <span>{getLocalizedText(trace.inputSummary, languageMode)}</span>
        <span className="alg-cost-badge">{trace.kind}</span>
      </p>

      {trace.arrayInput && (
        <ArrayFilmstrip
          values={trace.arrayInput}
          currentIndex={completed ? null : current?.highlightIndex ?? null}
        />
      )}

      {trace.kind === 'HASH_STATE' && (
        <SetTokenCloud
          values={current?.setValues ?? []}
          highlightValue={current?.highlightSetValue ?? null}
          collide={!reducedMotion && current?.correctChoiceId === 'return_true'}
        />
      )}

      {!completed && current && (
        <div className="alg-trace-step">
          <p>
            <strong>{getLocalizedInline(current.title, languageMode)}</strong>
          </p>
          <p className="alg-help">{getLocalizedText(current.narrative, languageMode)}</p>
          <dl className="alg-trace-state">
            {Object.entries(current.state).map(([key, value]) => (
              <div key={key} className="alg-trace-state-row">
                <dt>{key}</dt>
                <dd>
                  <code>{value}</code>
                </dd>
              </div>
            ))}
          </dl>
          <fieldset>
            <legend>{getLocalizedText(current.question, languageMode)}</legend>
            {current.choices.map((choice) => (
              <label key={choice.id}>
                <input
                  type="radio"
                  name={`trace-${current.id}`}
                  checked={selectedChoiceId === choice.id}
                  onChange={() => setSelectedChoiceId(choice.id)}
                />{' '}
                {getLocalizedInline(choice.text, languageMode)}
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            className="btn-primary-action"
            onClick={submitStep}
            disabled={!selectedChoiceId}
          >
            Commit Step
          </button>
        </div>
      )}

      {completed && (
        <div className="alg-followup">
          <h3>{languageMode === 'ru' ? 'Быстрый follow-up' : 'Quick follow-up'}</h3>
          <p>{getLocalizedText(trace.followUpQuestion, languageMode)}</p>
          <div className="alg-stage-actions">
            {trace.followUpChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className={`btn-secondary-action ${selectedFollowUpId === choice.id ? 'is-selected' : ''}`}
                onClick={() => handleFollowUp(choice.id)}
              >
                {getLocalizedInline(choice.text, languageMode)}
              </button>
            ))}
          </div>
          {followUpCorrect && (
            <button type="button" className="btn-primary-action" onClick={onComplete}>
              {languageMode === 'ru' ? 'К итогам' : 'Continue to Summary'}
            </button>
          )}
        </div>
      )}

      {feedback && (
        <p className="alg-feedback" aria-live="polite">
          {feedback}
        </p>
      )}
    </div>
  );
};
