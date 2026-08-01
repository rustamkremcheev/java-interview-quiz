import React from 'react';
import { Hint } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { Lightbulb, Unlock, ChevronDown } from 'lucide-react';

interface HintPanelProps {
  hints: readonly Hint[];
  revealedHintIds: readonly string[];
  onRevealHint: (hintId: string) => void;
}

export const HintPanel: React.FC<HintPanelProps> = ({
  hints,
  revealedHintIds,
  onRevealHint
}) => {
  const { languageMode } = useAppStore();

  if (!hints || hints.length === 0) return null;

  const sortedHints = [...hints].sort((a, b) => a.order - b.order);

  const getHintLevelTitle = (level: number) => {
    switch (level) {
      case 1:
        return "Level 1: Directional Clue (-10% XP)";
      case 2:
        return "Level 2: Concept Reminder (-25% XP)";
      case 3:
        return "Level 3: Mechanism Clue (-50% XP)";
      case 4:
        return "Level 4: Near-Solution Structure (-75% XP)";
      default:
        return `Level ${level} Hint`;
    }
  };

  return (
    <div className="hint-panel-container">
      <div className="hint-panel-header">
        <Lightbulb size={16} className="text-warning" />
        <strong>Progressive Hint Stack ({revealedHintIds.length} of {sortedHints.length} Unlocked)</strong>
      </div>

      <div className="hint-stack-list">
        {sortedHints.map((hint) => {
          const isRevealed = revealedHintIds.includes(hint.id);
          const hintText = languageMode === 'ru' ? hint.text.ru : hint.text.en;

          return (
            <div key={hint.id} className={`hint-stack-item ${isRevealed ? 'revealed' : 'locked'}`}>
              {isRevealed ? (
                <div className="hint-revealed-body">
                  <div className="hint-level-badge">{getHintLevelTitle(hint.level)}</div>
                  <p className="hint-text">{hintText}</p>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-unlock-hint"
                  onClick={() => onRevealHint(hint.id)}
                >
                  <Unlock size={14} />
                  <span>Unlock {getHintLevelTitle(hint.level)}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
