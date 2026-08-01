import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LanguageMode } from '../../types/domain';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { languageMode, setLanguageMode } = useAppStore();

  const handleSelect = (mode: LanguageMode) => {
    setLanguageMode(mode);
  };

  return (
    <div className="language-switcher-container" role="radiogroup" aria-label="Language Mode Selector">
      <Globe size={16} className="text-secondary" />
      <button
        type="button"
        role="radio"
        aria-checked={languageMode === 'en'}
        className={`lang-btn ${languageMode === 'en' ? 'active' : ''}`}
        onClick={() => handleSelect('en')}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={languageMode === 'ru'}
        className={`lang-btn ${languageMode === 'ru' ? 'active' : ''}`}
        onClick={() => handleSelect('ru')}
      >
        RU
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={languageMode === 'bilingual'}
        className={`lang-btn ${languageMode === 'bilingual' ? 'active' : ''}`}
        onClick={() => handleSelect('bilingual')}
      >
        EN+RU
      </button>
    </div>
  );
};
