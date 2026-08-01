import React, { useState } from 'react';
import { FixBuilderChallenge, SequencePuzzleChallenge } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { ConfidenceSelector } from '../workspace/ConfidenceSelector';
import { Check, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface GuidedPuzzleProps {
  challenge: FixBuilderChallenge | SequencePuzzleChallenge;
  onAttemptSubmit: (selectedOptionIds: string[]) => void;
  disabled?: boolean;
}

export const GuidedPuzzle: React.FC<GuidedPuzzleProps> = ({
  challenge,
  onAttemptSubmit,
  disabled = false
}) => {
  const { languageMode } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<'CONFIDENT' | 'UNSURE' | 'GUESSING'>('UNSURE');

  const isFixBuilder = challenge.type === 'FIX_BUILDER';
  const fixPayload = isFixBuilder ? (challenge as FixBuilderChallenge).payload : null;
  const seqPayload = !isFixBuilder ? (challenge as SequencePuzzleChallenge).payload : null;

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  const handleToggleOption = (id: string) => {
    if (disabled) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0 || disabled) return;
    const newArr = [...selectedIds];
    const temp = newArr[index - 1];
    newArr[index - 1] = newArr[index];
    newArr[index] = temp;
    setSelectedIds(newArr);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedIds.length - 1 || disabled) return;
    const newArr = [...selectedIds];
    const temp = newArr[index + 1];
    newArr[index + 1] = newArr[index];
    newArr[index] = temp;
    setSelectedIds(newArr);
  };

  const handleRemove = (id: string) => {
    if (disabled) return;
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const handleReset = () => {
    if (disabled) return;
    setSelectedIds([]);
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 || disabled) return;
    onAttemptSubmit(selectedIds);
  };

  return (
    <div className="guided-puzzle-workspace">
      <div className="puzzle-instruction-box">
        <h3>{getText(challenge.title.en, challenge.title.ru)}</h3>
        <p>{getText(challenge.prompt.en, challenge.prompt.ru)}</p>
      </div>

      {/* Available Options Pool */}
      {isFixBuilder && fixPayload && (
        <div className="options-pool-section">
          <h4>Available Solution Building Blocks (Tap to select):</h4>
          <div className="options-grid">
            {fixPayload.options.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  className={`puzzle-option-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleOption(opt.id)}
                >
                  <div className="chip-left">
                    <span className="check-box">{isSelected ? <Check size={14} /> : <Plus size={14} />}</span>
                    <span className="chip-text">{getText(opt.text.en, opt.text.ru)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isFixBuilder && seqPayload && (
        <div className="options-pool-section">
          <h4>Available Sequence Steps (Tap to add):</h4>
          <div className="options-grid">
            {seqPayload.items.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isSelected || disabled}
                  className={`puzzle-option-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleOption(item.id)}
                >
                  <span>{getText(item.text.en, item.text.ru)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Items & Touch Reordering Ergonomics */}
      <div className="selected-assembly-zone">
        <div className="assembly-header">
          <h4>Selected Solution Sequence ({selectedIds.length} items)</h4>
          {selectedIds.length > 0 && (
            <button type="button" className="btn-small-tertiary" onClick={handleReset} disabled={disabled}>
              <Trash2 size={13} /> Reset
            </button>
          )}
        </div>

        {selectedIds.length === 0 ? (
          <div className="empty-assembly-placeholder">
            <span>Tap options above to assemble your solution.</span>
          </div>
        ) : (
          <div className="assembly-list">
            {selectedIds.map((id, index) => {
              const optText = isFixBuilder && fixPayload
                ? fixPayload.options.find((o) => o.id === id)?.text
                : seqPayload?.items.find((i) => i.id === id)?.text;

              return (
                <div key={id} className="assembly-item-row">
                  <span className="item-order-num">{index + 1}.</span>
                  <span className="item-text">{optText ? getText(optText.en, optText.ru) : id}</span>
                  <div className="touch-controls">
                    <button
                      type="button"
                      className="btn-icon-control"
                      disabled={index === 0 || disabled}
                      onClick={() => handleMoveUp(index)}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon-control"
                      disabled={index === selectedIds.length - 1 || disabled}
                      onClick={() => handleMoveDown(index)}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon-control remove"
                      disabled={disabled}
                      onClick={() => handleRemove(id)}
                      title="Remove Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfidenceSelector value={confidence} onChange={setConfidence} disabled={disabled} />

      <div className="puzzle-submit-footer">
        <button
          type="button"
          className="btn-primary-action large"
          disabled={selectedIds.length === 0 || disabled}
          onClick={handleSubmit}
        >
          Submit Guided Solution Attempt
        </button>
      </div>
    </div>
  );
};
