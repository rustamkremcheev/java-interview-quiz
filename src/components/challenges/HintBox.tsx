import React, { useState } from 'react';
import { LocalizedText, LanguageMode } from '../../types/mission';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface HintBoxProps {
  hints: LocalizedText[];
  languageMode: LanguageMode;
  onHintUsed: (count: number) => void;
}

export const HintBox: React.FC<HintBoxProps> = ({ hints, languageMode, onHintUsed }) => {
  const [revealedCount, setRevealedCount] = useState(0);

  if (hints.length === 0) return null;

  const handleRevealNext = () => {
    if (revealedCount < hints.length) {
      const nextCount = revealedCount + 1;
      setRevealedCount(nextCount);
      onHintUsed(nextCount);
    }
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en} (${text.ru})`;
    return text.en;
  };

  return (
    <div className="hint-box-container">
      {revealedCount < hints.length && (
        <button onClick={handleRevealNext} className="btn-hint">
          <Lightbulb size={16} /> Reveal Hint {revealedCount + 1} of {hints.length} (-6 XP)
        </button>
      )}

      {revealedCount > 0 && (
        <div className="revealed-hints-list">
          {hints.slice(0, revealedCount).map((hint, idx) => (
            <div key={idx} className="hint-item">
              <span className="hint-num">Hint #{idx + 1}:</span>
              <span className="hint-text">{getText(hint)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
