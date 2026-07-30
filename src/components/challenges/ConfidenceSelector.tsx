import React from 'react';
import { ConfidenceLevel } from '../../types/user';
import { ShieldCheck, HelpCircle, Dice5 } from 'lucide-react';

interface ConfidenceSelectorProps {
  currentConfidence: ConfidenceLevel;
  onSelect: (confidence: ConfidenceLevel) => void;
}

export const ConfidenceSelector: React.FC<ConfidenceSelectorProps> = ({
  currentConfidence,
  onSelect
}) => {
  return (
    <div className="confidence-selector-container">
      <span className="confidence-label">Set Your Confidence Level:</span>
      <div className="confidence-buttons">
        <button
          type="button"
          onClick={() => onSelect('confident')}
          className={`btn-conf ${currentConfidence === 'confident' ? 'selected-confident' : ''}`}
        >
          <ShieldCheck size={16} /> Confident
        </button>
        <button
          type="button"
          onClick={() => onSelect('unsure')}
          className={`btn-conf ${currentConfidence === 'unsure' ? 'selected-unsure' : ''}`}
        >
          <HelpCircle size={16} /> Unsure
        </button>
        <button
          type="button"
          onClick={() => onSelect('guessing')}
          className={`btn-conf ${currentConfidence === 'guessing' ? 'selected-guessing' : ''}`}
        >
          <Dice5 size={16} /> Guessing
        </button>
      </div>
    </div>
  );
};
