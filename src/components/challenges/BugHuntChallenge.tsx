import React, { useState } from 'react';
import { BugLine, LocalizedText, LanguageMode } from '../../types/mission';
import { CheckCircle, AlertOctagon, Info } from 'lucide-react';

interface BugHuntChallengeProps {
  instruction: LocalizedText;
  code: string;
  lines: BugLine[];
  languageMode: LanguageMode;
  onComplete: (correct: boolean) => void;
}

export const BugHuntChallenge: React.FC<BugHuntChallengeProps> = ({
  instruction,
  code,
  lines,
  languageMode,
  onComplete
}) => {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const codeLineArray = code.split('\n');

  const toggleLine = (lineNum: number) => {
    if (isSubmitted) return;
    setSelectedLines((prev) =>
      prev.includes(lineNum) ? prev.filter((l) => l !== lineNum) : [...prev, lineNum]
    );
  };

  const handleSubmit = () => {
    const bugLineNumbers = lines.filter((l) => l.isBug).map((l) => l.lineNumber);
    
    // Check if user selected at least 1 actual bug line and NO non-bug lines
    const correctSelection =
      selectedLines.length > 0 &&
      selectedLines.every((l) => bugLineNumbers.includes(l)) &&
      bugLineNumbers.every((l) => selectedLines.includes(l));

    setIsCorrect(correctSelection);
    setIsSubmitted(true);
    onComplete(correctSelection);
  };

  const getInstruction = () => {
    if (languageMode === 'ru') return instruction.ru;
    if (languageMode === 'bilingual') return `${instruction.en} / ${instruction.ru}`;
    return instruction.en;
  };

  const getExplanation = (line: BugLine) => {
    if (languageMode === 'ru') return line.explanation.ru;
    if (languageMode === 'bilingual') return `${line.explanation.en} (${line.explanation.ru})`;
    return line.explanation.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h3>{getInstruction()}</h3>
        <p className="touch-hint">Click or tap code lines to flag suspicious/dangerous lines.</p>
      </div>

      <div className="code-editor-box">
        <div className="code-editor-header">
          <span className="file-name">PaymentKey.java</span>
          <span className="language-tag">Java 17</span>
        </div>
        <div className="code-lines-container">
          {codeLineArray.map((lineContent, idx) => {
            const lineNum = idx + 1;
            const isSelected = selectedLines.includes(lineNum);
            const lineMeta = lines.find((l) => l.lineNumber === lineNum);
            const isBugLine = lineMeta?.isBug;

            let lineClass = 'code-line';
            if (isSelected) lineClass += ' selected';
            if (isSubmitted) {
              if (isSelected && isBugLine) lineClass += ' correct-bug';
              else if (isSelected && !isBugLine) lineClass += ' false-positive';
              else if (!isSelected && isBugLine) lineClass += ' missed-bug';
            }

            return (
              <div
                key={lineNum}
                className={lineClass}
                onClick={() => toggleLine(lineNum)}
              >
                <span className="line-num">{lineNum}</span>
                <span className="line-code">{lineContent || ' '}</span>
                {isSelected && <span className="selected-indicator">FLAGGED</span>}
              </div>
            );
          })}
        </div>
      </div>

      {isSubmitted && (
        <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
          <div className="feedback-content">
            {isCorrect ? (
              <CheckCircle size={24} className="icon-success" />
            ) : (
              <AlertOctagon size={24} className="icon-error" />
            )}
            <div>
              <strong>{isCorrect ? 'Bug Identified!' : 'Bug Identification Incomplete'}</strong>
              <p>Review the flagged lines below:</p>
              <div className="line-explanations">
                {lines
                  .filter((l) => l.isBug)
                  .map((l) => (
                    <div key={l.lineNumber} className="explanation-item">
                      <Info size={16} /> <strong>Line {l.lineNumber}:</strong> {getExplanation(l)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isSubmitted && (
        <div className="challenge-footer">
          <button
            onClick={handleSubmit}
            disabled={selectedLines.length === 0}
            className="btn-primary"
          >
            Submit Bug Analysis ({selectedLines.length} flagged)
          </button>
        </div>
      )}
    </div>
  );
};
