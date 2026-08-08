import React, { useState } from 'react';
import { TraceScenario } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { ArrayFilmstrip } from '../ArrayFilmstrip';
import { SetTokenCloud } from '../SetTokenCloud';

interface TraceStageProps {
  main: TraceScenario;
  followUp: TraceScenario;
  stepIndex: number;
  correctSteps: number;
  totalAnswered: number;
  followUpAnswer?: boolean;
  followUpCorrect?: boolean;
  languageMode: LanguageMode;
  reducedMotion: boolean;
  onStepProgress: (correct: boolean, nextIndex: number) => void;
  onFollowUp: (answer: boolean, correct: boolean) => void;
  onComplete: () => void;
}

export const TraceStage: React.FC<TraceStageProps> = ({
  main,
  followUp,
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
  const [selectedAdd, setSelectedAdd] = useState<boolean | null>(null);
  const [selectedReturns, setSelectedReturns] = useState<boolean | null>(null);

  const completed = stepIndex >= main.steps.length;
  const current = !completed ? main.steps[stepIndex] : null;
  const displaySet = completed
    ? main.steps[main.steps.length - 1].setAfter
    : current?.setBefore ?? [];

  const submitStep = () => {
    if (!current) return;
    const addOk = selectedAdd === current.addSucceeded;
    const returnOk =
      current.returns === null
        ? selectedReturns === null || selectedReturns === false
        : selectedReturns === current.returns;
    // For non-return steps, learner should say "does not return yet"
    const expectsReturnChoice = current.returns !== null;
    const returnChoiceOk = expectsReturnChoice
      ? selectedReturns === true
      : selectedReturns === false || selectedReturns === null;

    const correct = addOk && (expectsReturnChoice ? selectedReturns === true : returnChoiceOk && returnOk);

    if (!correct) {
      setFeedback(
        languageMode === 'ru'
          ? 'Неверно. HashSet.add возвращает false, если значение уже было — тогда метод возвращает true.'
          : 'Not quite. HashSet.add returns false when the value already exists — then the method returns true.'
      );
      onStepProgress(false, stepIndex);
      return;
    }

    setFeedback(
      current.operation === 'DUPLICATE_FOUND'
        ? languageMode === 'ru'
          ? 'Дубликат: add не удался, метод возвращает true.'
          : 'Duplicate: add failed, method returns true.'
        : languageMode === 'ru'
          ? 'add успешен — значение новое и попадает в set.'
          : 'add succeeded — value is new and enters the set.'
    );
    setSelectedAdd(null);
    setSelectedReturns(null);
    const next = stepIndex + 1;
    onStepProgress(true, next);
    if (next >= main.steps.length && followUpCorrect) {
      onComplete();
    }
  };

  const handleFollowUp = (answer: boolean) => {
    const correct = answer === followUp.finalAnswer;
    onFollowUp(answer, correct);
    setFeedback(
      correct
        ? languageMode === 'ru'
          ? 'Верно: все значения различны → false.'
          : 'Correct: all distinct → false.'
        : languageMode === 'ru'
          ? 'Для [1,2,3] дубликатов нет → false.'
          : 'For [1,2,3] there is no duplicate → false.'
    );
    if (correct && stepIndex >= main.steps.length) {
      onComplete();
    }
  };

  return (
    <div className="alg-stage-card">
      <h2>{languageMode === 'ru' ? 'Трассировка выполнения' : 'Execution Trace'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Заполняйте один шаг за раз. Будущие строки скрыты.'
          : 'Fill one step at a time. Future rows stay hidden.'}
      </p>

      <ArrayFilmstrip values={main.input} currentIndex={completed ? null : current?.index ?? 0} />
      <SetTokenCloud
        values={displaySet}
        highlightValue={current?.currentValue ?? null}
        collide={!reducedMotion && current?.operation === 'DUPLICATE_FOUND'}
      />

      {!completed && current && (
        <div className="alg-trace-step">
          <p>
            <strong>
              {languageMode === 'ru' ? 'Шаг' : 'Step'} {stepIndex + 1}
            </strong>
            {' — '}
            current = <code>{current.currentValue}</code>
          </p>
          <fieldset>
            <legend>seen.add(number) succeeds?</legend>
            <label>
              <input
                type="radio"
                name="add"
                checked={selectedAdd === true}
                onChange={() => setSelectedAdd(true)}
              />{' '}
              true (new value)
            </label>
            <label>
              <input
                type="radio"
                name="add"
                checked={selectedAdd === false}
                onChange={() => setSelectedAdd(false)}
              />{' '}
              false (already present)
            </label>
          </fieldset>
          <fieldset>
            <legend>{languageMode === 'ru' ? 'Метод возвращает сейчас?' : 'Method returns now?'}</legend>
            <label>
              <input
                type="radio"
                name="ret"
                checked={selectedReturns === false}
                onChange={() => setSelectedReturns(false)}
              />{' '}
              {languageMode === 'ru' ? 'Ещё нет' : 'Not yet'}
            </label>
            <label>
              <input
                type="radio"
                name="ret"
                checked={selectedReturns === true}
                onChange={() => setSelectedReturns(true)}
              />{' '}
              return true
            </label>
          </fieldset>
          <button type="button" className="btn-primary-action" onClick={submitStep}>
            Commit Step
          </button>
        </div>
      )}

      {completed && (
        <div className="alg-followup">
          <h3>{languageMode === 'ru' ? 'Быстрый follow-up' : 'Quick follow-up'}</h3>
          <ArrayFilmstrip values={followUp.input} currentIndex={null} />
          <p>
            {languageMode === 'ru'
              ? 'Какой итоговый ответ без пошаговой трассировки?'
              : 'Final answer without stepping every cell?'}
          </p>
          <div className="alg-stage-actions">
            <button
              type="button"
              className={`btn-secondary-action ${followUpAnswer === true ? 'is-selected' : ''}`}
              onClick={() => handleFollowUp(true)}
            >
              true
            </button>
            <button
              type="button"
              className={`btn-secondary-action ${followUpAnswer === false ? 'is-selected' : ''}`}
              onClick={() => handleFollowUp(false)}
            >
              false
            </button>
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
