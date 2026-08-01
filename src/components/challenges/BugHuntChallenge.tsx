import React, { useState } from 'react';
import { BugHuntChallenge } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { ConfidenceSelector } from '../workspace/ConfidenceSelector';
import { Bug, Trash2 } from 'lucide-react';

interface BugHuntChallengeProps {
  challenge: BugHuntChallenge;
  onAttemptSubmit: (selectedLineNumbers: number[]) => void;
  disabled?: boolean;
}

export const BugHuntChallengeView: React.FC<BugHuntChallengeProps> = ({
  challenge,
  onAttemptSubmit,
  disabled = false
}) => {
  const { languageMode } = useAppStore();
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<'CONFIDENT' | 'UNSURE' | 'GUESSING'>('UNSURE');

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  const handleLineClick = (lineNumber: number) => {
    if (disabled) return;
    if (selectedLines.includes(lineNumber)) {
      setSelectedLines(selectedLines.filter((l) => l !== lineNumber));
    } else {
      setSelectedLines([...selectedLines, lineNumber]);
    }
  };

  const handleClear = () => {
    if (disabled) return;
    setSelectedLines([]);
  };

  const handleSubmit = () => {
    if (selectedLines.length === 0 || disabled) return;
    onAttemptSubmit(selectedLines);
  };

  return (
    <div className="bughunt-challenge-workspace">
      <div className="challenge-prompt-header">
        <div className="prompt-title-row">
          <Bug size={20} className="text-warning" />
          <h3>{getText(challenge.title.en, challenge.title.ru)}</h3>
        </div>
        <p>{getText(challenge.prompt.en, challenge.prompt.ru)}</p>
      </div>

      {/* Code Viewer with Line Selection */}
      <div className="bughunt-code-frame">
        <div className="code-viewer-toolbar">
          <span className="code-title">AccountPeriod.java (Click line to flag vulnerability)</span>
          <span className="selected-lines-count">
            Selected: {selectedLines.length > 0 ? `Lines ${selectedLines.sort((a, b) => a - b).join(', ')}` : 'None'}
          </span>
        </div>

        <div className="code-scroll-pane">
          <table className="bughunt-table">
            <tbody>
              {challenge.payload.lines.map((lineObj) => {
                const lineNum = lineObj.lineNumber;
                const isSelected = selectedLines.includes(lineNum);

                return (
                  <tr
                    key={lineNum}
                    className={`bughunt-tr ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleLineClick(lineNum)}
                  >
                    <td className="line-num-td">{lineNum}</td>
                    <td className="code-td">
                      <pre className="code-pre">{lineObj.code}</pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selection Summary Bar */}
      <div className="bughunt-summary-bar">
        <span>Selected Vulnerabilities: {selectedLines.length} lines</span>
        {selectedLines.length > 0 && (
          <button type="button" className="btn-small-tertiary" onClick={handleClear} disabled={disabled}>
            <Trash2 size={13} /> Clear Lines
          </button>
        )}
      </div>

      <ConfidenceSelector value={confidence} onChange={setConfidence} disabled={disabled} />

      <div className="bughunt-submit-footer">
        <button
          type="button"
          className="btn-primary-action large"
          disabled={selectedLines.length === 0 || disabled}
          onClick={handleSubmit}
        >
          Submit Bug Hunt Diagnosis
        </button>
      </div>
    </div>
  );
};
