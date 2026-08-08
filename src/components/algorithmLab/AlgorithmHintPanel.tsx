import React from 'react';
import { AlgorithmHint, AlgorithmStageType } from '../../types/algorithmLab';
import { LanguageMode } from '../../types/domain';
import { getLocalizedText } from '../../lib/localized';
import { Lightbulb } from 'lucide-react';

interface AlgorithmHintPanelProps {
  hints: readonly AlgorithmHint[];
  stageType: AlgorithmStageType;
  revealedCount: number;
  languageMode: LanguageMode;
  onRevealNext: () => void;
}

export const AlgorithmHintPanel: React.FC<AlgorithmHintPanelProps> = ({
  hints,
  stageType,
  revealedCount,
  languageMode,
  onRevealNext
}) => {
  const stageHints = hints
    .filter((h) => h.stageType === stageType)
    .slice()
    .sort((a, b) => a.level - b.level);

  if (stageHints.length === 0) return null;

  const visible = stageHints.slice(0, revealedCount);
  const next = stageHints[revealedCount];

  return (
    <aside className="alg-hint-panel" aria-label="Hints">
      <h3><Lightbulb size={16} /> Hints</h3>
      <ol>
        {visible.map((hint) => (
          <li key={hint.id} className="alg-hint-item">
            <strong>Level {hint.level}</strong>
            <p>{getLocalizedText(hint.text, languageMode)}</p>
          </li>
        ))}
      </ol>
      {next && (
        <button type="button" className="btn-secondary-action" onClick={onRevealNext}>
          Reveal next hint (level {next.level})
        </button>
      )}
      {!next && visible.length > 0 && (
        <p className="alg-help">All hints for this stage are open.</p>
      )}
    </aside>
  );
};
