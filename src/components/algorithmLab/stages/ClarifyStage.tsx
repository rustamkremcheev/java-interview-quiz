import React, { useState } from 'react';
import { AlgorithmProblem, ClarifyQuestion } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedText, getLocalizedInline } from '../../../lib/localized';

interface ClarifyStageProps {
  problem: AlgorithmProblem;
  questions: readonly ClarifyQuestion[];
  selectedOptionIds: readonly string[];
  languageMode: LanguageMode;
  onChange: (ids: string[]) => void;
  onComplete: (ids: string[]) => void;
}

export const ClarifyStage: React.FC<ClarifyStageProps> = ({
  problem,
  questions,
  selectedOptionIds,
  languageMode,
  onChange,
  onComplete
}) => {
  const [feedback, setFeedback] = useState<string>('');
  const [checked, setChecked] = useState(false);

  const toggle = (question: ClarifyQuestion, optionId: string) => {
    setChecked(false);
    setFeedback('');
    if (question.multiSelect) {
      const next = selectedOptionIds.includes(optionId)
        ? selectedOptionIds.filter((id) => id !== optionId)
        : [...selectedOptionIds, optionId];
      onChange([...next]);
      return;
    }
    const questionOptionIds = new Set(question.options.map((o) => o.id));
    const cleared = selectedOptionIds.filter((id) => !questionOptionIds.has(id));
    onChange([...cleared, optionId]);
  };

  const handleCheck = () => {
    const missing = questions.filter(
      (q) => !q.options.some((o) => o.isCorrect && selectedOptionIds.includes(o.id))
    );
    if (missing.length > 0) {
      setChecked(true);
      setFeedback(
        languageMode === 'ru'
          ? `Ещё неверно: ${missing.length} вопрос(ов). Перечитайте ограничения.`
          : `Not yet: ${missing.length} question(s) need the decision-relevant answer.`
      );
      return;
    }
    setChecked(true);
    setFeedback(
      languageMode === 'ru'
        ? 'Ограничения зафиксированы. Можно выбирать стратегию.'
        : 'Constraints locked. You can choose a strategy next.'
    );
    onComplete([...selectedOptionIds]);
  };

  return (
    <div className="alg-stage-card">
      <h2>{getLocalizedInline(problem.stages[0].title, languageMode)}</h2>
      <p className="alg-statement">{getLocalizedText(problem.statement, languageMode)}</p>

      <div className="alg-examples">
        {problem.examples.map((ex) => (
          <div key={ex.id} className="alg-example">
            <code>{ex.input}</code>
            <span>→</span>
            <code>{ex.output}</code>
            <p>{getLocalizedText(ex.explanation, languageMode)}</p>
          </div>
        ))}
      </div>

      <ul className="alg-constraints">
        {problem.constraints.map((c) => (
          <li key={c.id}>{getLocalizedText(c.text, languageMode)}</li>
        ))}
      </ul>

      <p className="alg-provenance">{getLocalizedText(problem.provenanceNote, languageMode)}</p>

      <div className="alg-clarify-list">
        {questions.map((q) => (
          <fieldset key={q.id} className="alg-clarify-q">
            <legend>{getLocalizedText(q.prompt, languageMode)}</legend>
            <div className="alg-option-grid">
              {q.options.map((opt) => {
                const selected = selectedOptionIds.includes(opt.id);
                return (
                  <label key={opt.id} className={`alg-option ${selected ? 'is-selected' : ''}`}>
                    <input
                      type={q.multiSelect ? 'checkbox' : 'radio'}
                      name={q.id}
                      checked={selected}
                      onChange={() => toggle(q, opt.id)}
                    />
                    <span>{getLocalizedText(opt.text, languageMode)}</span>
                  </label>
                );
              })}
            </div>
            {checked &&
              q.options
                .filter((o) => selectedOptionIds.includes(o.id))
                .map((o) => (
                  <p
                    key={o.id}
                    className={`alg-feedback ${o.isCorrect ? 'ok' : 'bad'}`}
                    aria-live="polite"
                  >
                    {getLocalizedText(o.feedback, languageMode)}
                  </p>
                ))}
          </fieldset>
        ))}
      </div>

      <div className="alg-stage-actions">
        <button type="button" className="btn-primary-action" onClick={handleCheck}>
          Check Understanding
        </button>
      </div>
      {feedback && (
        <p className="alg-feedback" aria-live="polite">
          {feedback}
        </p>
      )}
    </div>
  );
};
