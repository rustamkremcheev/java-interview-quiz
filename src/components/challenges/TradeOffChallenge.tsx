import React, { useState } from 'react';
import { TradeOffOption, LocalizedText, LanguageMode } from '../../types/mission';
import { Scale, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface TradeOffChallengeProps {
  question: LocalizedText;
  options: TradeOffOption[];
  languageMode: LanguageMode;
  onComplete: (correct: boolean) => void;
}

export const TradeOffChallenge: React.FC<TradeOffChallengeProps> = ({
  question,
  options,
  languageMode,
  onComplete
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    const selected = options.find((o) => o.id === selectedId);
    const correct = !!selected?.isCorrect;
    setIsSubmitted(true);
    onComplete(correct);
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <div className="topic-badge">
          <Scale size={16} /> Senior Trade-Off Analysis
        </div>
        <h3>{getText(question)}</h3>
      </div>

      <div className="options-list">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let cardClass = 'tradeoff-card';
          if (isSelected) cardClass += ' selected';
          if (isSubmitted && isSelected) {
            cardClass += opt.isCorrect ? ' correct' : ' incorrect';
          }

          return (
            <div
              key={opt.id}
              className={cardClass}
              onClick={() => handleSelect(opt.id)}
            >
              <div className="radio-col">
                <div className={`radio ${isSelected ? 'checked' : ''}`} />
              </div>
              <div className="option-body">
                <div className="option-text">{getText(opt.text)}</div>
                {isSubmitted && isSelected && (
                  <div className={`feedback-note ${opt.isCorrect ? 'note-success' : 'note-warning'}`}>
                    {opt.isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <div>
                      <strong>Trade-Off Feedback:</strong>
                      <p>{getText(opt.feedback)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <div className="challenge-footer">
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className="btn-primary"
          >
            Confirm Choice & View Trade-Off Analysis <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
