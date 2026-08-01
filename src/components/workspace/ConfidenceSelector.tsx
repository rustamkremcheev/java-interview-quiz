import React from 'react';
import { ConfidenceLevel } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle, HelpCircle, Shuffle } from 'lucide-react';

interface ConfidenceSelectorProps {
  value: ConfidenceLevel;
  onChange: (value: ConfidenceLevel) => void;
  disabled?: boolean;
}

export const ConfidenceSelector: React.FC<ConfidenceSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const { languageMode } = useAppStore();

  const getLabel = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  return (
    <div className="confidence-selector-box" role="radiogroup" aria-label="Confidence Level">
      <div className="selector-title">
        <span>{getLabel('Self-Evaluated Confidence:', 'Самооценка Уверенности:')}</span>
      </div>

      <div className="confidence-buttons-grid">
        <button
          type="button"
          role="radio"
          aria-checked={value === 'CONFIDENT'}
          disabled={disabled}
          className={`confidence-btn confident ${value === 'CONFIDENT' ? 'selected' : ''}`}
          onClick={() => onChange('CONFIDENT')}
        >
          <CheckCircle size={16} />
          <div className="btn-text-wrap">
            <strong>{getLabel('Confident', 'Уверен')}</strong>
            <span className="btn-subtext">{getLabel('I can explain this rule', 'Могу объяснить правило')}</span>
          </div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={value === 'UNSURE'}
          disabled={disabled}
          className={`confidence-btn unsure ${value === 'UNSURE' ? 'selected' : ''}`}
          onClick={() => onChange('UNSURE')}
        >
          <HelpCircle size={16} />
          <div className="btn-text-wrap">
            <strong>{getLabel('Unsure', 'Не уверен')}</strong>
            <span className="btn-subtext">{getLabel('Partial hypothesis', 'Частичная гипотеза')}</span>
          </div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={value === 'GUESSING'}
          disabled={disabled}
          className={`confidence-btn guessing ${value === 'GUESSING' ? 'selected' : ''}`}
          onClick={() => onChange('GUESSING')}
        >
          <Shuffle size={16} />
          <div className="btn-text-wrap">
            <strong>{getLabel('Guessing', 'Наугад')}</strong>
            <span className="btn-subtext">{getLabel('Testing a hunch', 'Проверяю догадку')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
