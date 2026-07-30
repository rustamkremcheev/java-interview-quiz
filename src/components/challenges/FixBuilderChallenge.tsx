import React, { useState } from 'react';
import { FixOption, LocalizedText, LanguageMode } from '../../types/mission';
import { Check, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface FixBuilderChallengeProps {
  instruction: LocalizedText;
  options: FixOption[];
  languageMode: LanguageMode;
  onComplete: (correct: boolean) => void;
}

export const FixBuilderChallenge: React.FC<FixBuilderChallengeProps> = ({
  instruction,
  options,
  languageMode,
  onComplete
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const toggleOption = (id: string) => {
    if (isSubmitted) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const correctIds = options.filter((o) => o.isCorrect).map((o) => o.id);
    const passed =
      selectedIds.length > 0 &&
      selectedIds.every((id) => correctIds.includes(id)) &&
      correctIds.every((id) => selectedIds.includes(id));

    setIsCorrect(passed);
    setIsSubmitted(true);
    onComplete(passed);
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h3>{getText(instruction)}</h3>
        <p className="touch-hint">Select all valid, production-safe fixes. Reject dangerous workarounds.</p>
      </div>

      <div className="options-list">
        {options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          let cardClass = 'option-card';
          if (isSelected) cardClass += ' selected';
          if (isSubmitted) {
            if (isSelected && opt.isCorrect) cardClass += ' correct-choice';
            else if (isSelected && !opt.isCorrect) cardClass += ' incorrect-choice';
            else if (!isSelected && opt.isCorrect) cardClass += ' missed-choice';
          }

          return (
            <div
              key={opt.id}
              className={cardClass}
              onClick={() => toggleOption(opt.id)}
            >
              <div className="checkbox-col">
                <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <Check size={16} />}
                </div>
              </div>
              <div className="option-body">
                <div className="option-text">{getText(opt.text)}</div>
                {isSubmitted && (
                  <div className={`option-explanation ${opt.isCorrect ? 'exp-success' : 'exp-error'}`}>
                    {opt.isCorrect ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
                    <span>{getText(opt.explanation)}</span>
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
            disabled={selectedIds.length === 0}
            className="btn-primary"
          >
            Verify Proposed Fixes ({selectedIds.length} selected)
          </button>
        </div>
      )}
    </div>
  );
};
