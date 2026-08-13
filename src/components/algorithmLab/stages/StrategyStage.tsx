import React, { useState } from 'react';
import { AlgorithmStrategyOption, CostBadgeKind } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedText, getLocalizedInline } from '../../../lib/localized';

const BADGE_LABEL: Record<CostBadgeKind, { en: string; ru: string }> = {
  QUADRATIC_TIME: { en: 'Quadratic time', ru: 'Квадратичное время' },
  MUTATES_OR_COPIES: { en: 'Mutates or copies input', ru: 'Мутирует или копирует вход' },
  EXTRA_MEMORY: { en: 'Extra memory', ru: 'Доп. память' },
  HIDES_MECHANICS: { en: 'Hides mechanics', ru: 'Скрывает механику' },
  RANGE_DEPENDENT: { en: 'Range-dependent', ru: 'Зависит от диапазона' }
};

interface StrategyStageProps {
  strategies: readonly AlgorithmStrategyOption[];
  targetStrategyId: string;
  selectedStrategyId?: string;
  justificationChipIds: readonly string[];
  languageMode: LanguageMode;
  onSelect: (strategyId: string) => void;
  onToggleChip: (chipKey: string) => void;
  onLockTargetPath: () => void;
}

export const StrategyStage: React.FC<StrategyStageProps> = ({
  strategies,
  targetStrategyId,
  selectedStrategyId,
  justificationChipIds,
  languageMode,
  onSelect,
  onToggleChip,
  onLockTargetPath
}) => {
  const [message, setMessage] = useState('');
  const selected = strategies.find((s) => s.id === selectedStrategyId);
  const target = strategies.find((s) => s.id === targetStrategyId);
  const targetTitle = target
    ? getLocalizedInline(target.title, languageMode)
    : languageMode === 'ru'
      ? 'целевая стратегия'
      : 'target strategy';

  const handleLock = () => {
    if (!selected) {
      setMessage(languageMode === 'ru' ? 'Сначала выберите стратегию.' : 'Select a strategy first.');
      return;
    }
    if (justificationChipIds.length === 0) {
      setMessage(
        languageMode === 'ru' ? 'Добавьте хотя бы одно обоснование.' : 'Add at least one justification chip.'
      );
      return;
    }
    if (selected.id !== targetStrategyId) {
      setMessage(
        languageMode === 'ru'
          ? `Стратегия принята с cost badge. Для этого воркшопа продолжите путь: ${targetTitle}.`
          : `Strategy accepted with a cost badge. This workshop continues on: ${targetTitle}.`
      );
      return;
    }
    onLockTargetPath();
  };

  return (
    <div className="alg-stage-card">
      <h2>{languageMode === 'ru' ? 'Выберите стратегию' : 'Choose a strategy'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Ни одна карточка не помечена как «правильная» заранее. Обоснуйте выбор.'
          : 'No card is pre-labeled “correct”. Justify your choice.'}
      </p>

      <div className="alg-strategy-grid">
        {strategies.map((strategy) => {
          const active = strategy.id === selectedStrategyId;
          return (
            <button
              key={strategy.id}
              type="button"
              className={`alg-strategy-card ${active ? 'is-selected' : ''}`}
              onClick={() => {
                setMessage('');
                onSelect(strategy.id);
              }}
              aria-pressed={active}
            >
              <h3>{getLocalizedInline(strategy.title, languageMode)}</h3>
              <p>{getLocalizedText(strategy.description, languageMode)}</p>
              <div className="alg-meta-row">
                <span>Time: {strategy.timeClass}</span>
                <span>Space: {strategy.spaceClass}</span>
              </div>
              <p className="alg-constraint-note">
                {getLocalizedText(strategy.importantConstraint, languageMode)}
              </p>
              <div className="alg-badge-row">
                {strategy.costBadges.map((badge) => (
                  <span key={badge} className="alg-cost-badge">
                    {languageMode === 'ru' ? BADGE_LABEL[badge].ru : BADGE_LABEL[badge].en}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="alg-justify">
          <h3>{languageMode === 'ru' ? 'Обоснование' : 'Justification'}</h3>
          <div className="alg-chip-row">
            {selected.justificationChips.map((chip, index) => {
              const key = `${selected.id}:${index}`;
              const on = justificationChipIds.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  className={`alg-chip ${on ? 'is-selected' : ''}`}
                  onClick={() => onToggleChip(key)}
                  aria-pressed={on}
                >
                  {getLocalizedInline(chip, languageMode)}
                </button>
              );
            })}
          </div>

          {selected.id !== targetStrategyId && (
            <div className="alg-cost-callout" role="status">
              <p>
                {languageMode === 'ru'
                  ? 'Это допустимый подход, но не целевой путь этого воркшопа.'
                  : 'Valid approach, but not the target path for this workshop.'}
              </p>
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => onSelect(targetStrategyId)}
              >
                {languageMode === 'ru' ? `Перейти к: ${targetTitle}` : `Switch to: ${targetTitle}`}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="alg-stage-actions">
        <button type="button" className="btn-primary-action" onClick={handleLock}>
          {selected?.id === targetStrategyId
            ? languageMode === 'ru'
              ? `Зафиксировать «${targetTitle}» и продолжить`
              : `Lock ${targetTitle} & Continue`
            : languageMode === 'ru'
              ? 'Проверить выбор'
              : 'Review Choice'}
        </button>
        {selected && selected.id !== targetStrategyId && justificationChipIds.length > 0 && (
          <button type="button" className="btn-primary-action" onClick={onLockTargetPath}>
            {languageMode === 'ru'
              ? `Принять cost badge и продолжить с «${targetTitle}»`
              : `Accept cost badge & continue with ${targetTitle}`}
          </button>
        )}
      </div>
      {message && (
        <p className="alg-feedback" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};
