import React, { useMemo, useState } from 'react';
import { MosaicPuzzle } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedText } from '../../../lib/localized';
import { validateMosaicAssembly } from '../../../lib/algorithmLab/mosaicValidator';
import { OrderedAssembler, AssemblerItem } from '../OrderedAssembler';
import { useMosaicWorkspaceWidth } from '../useMosaicWorkspaceWidth';

interface CodeMosaicStageProps {
  mosaic: MosaicPuzzle;
  railIds: readonly string[];
  discardedIds: readonly string[];
  languageMode: LanguageMode;
  onRailChange: (ids: string[]) => void;
  onDiscardedChange: (ids: string[]) => void;
  onAttempt: (correct: boolean, correctDiscards: number) => void;
  onComplete: () => void;
}

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const CodeMosaicStage: React.FC<CodeMosaicStageProps> = ({
  mosaic,
  railIds,
  discardedIds,
  languageMode,
  onRailChange,
  onDiscardedChange,
  onAttempt,
  onComplete
}) => {
  const [feedback, setFeedback] = useState('');
  const [showAlt, setShowAlt] = useState(false);
  const [presentationKey, setPresentationKey] = useState(0);
  const mosaicWidth = useMosaicWorkspaceWidth(true);

  const bankItems: AssemblerItem[] = useMemo(() => {
    const mapped = mosaic.tiles.map((tile) => ({
      id: tile.id,
      label: tile.code,
      code: tile.code,
      indent: tile.indent
    }));
    return shuffle(mapped);
    // presentationKey intentionally reshuffles Available bank on Reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mosaic.tiles, presentationKey]);

  const distractorIds = mosaic.tiles.filter((t) => t.role !== 'REQUIRED').map((t) => t.id);

  const handleCheck = () => {
    const result = validateMosaicAssembly(railIds, mosaic);
    const correctDiscards = discardedIds.filter((id) => distractorIds.includes(id)).length;

    if (result.correct) {
      setFeedback(
        languageMode === 'ru'
          ? 'Мозаика собрана. !seen.add(number) детектирует уже существующее значение.'
          : 'Mosaic complete. !seen.add(number) detects an already-present value.'
      );
      setShowAlt(true);
      onAttempt(true, correctDiscards);
      onComplete();
      return;
    }

    onAttempt(false, correctDiscards);

    if (result.reason === 'DISTRACTOR_PRESENT' && result.distractorId) {
      const tile = mosaic.tiles.find((t) => t.id === result.distractorId);
      setFeedback(
        tile
          ? getLocalizedText(tile.explanation, languageMode)
          : languageMode === 'ru'
            ? 'На рельсе лишняя строка.'
            : 'An unnecessary line is on the rail.'
      );
      return;
    }

    if (result.reason === 'MISSING_REQUIRED') {
      setFeedback(
        languageMode === 'ru'
          ? 'Число обязательных плиток не совпадает. Проверьте discard и порядок.'
          : 'Required tile count mismatch. Check discard and order.'
      );
      return;
    }

    setFeedback(
      languageMode === 'ru'
        ? 'Порядок или структура неверны. Не раскрываем полное решение после одной ошибки.'
        : 'Order or structure is wrong. Full solution is not revealed after one miss.'
    );
  };

  return (
    <div
      ref={mosaicWidth.containerRef}
      className={`alg-stage-card alg-mosaic-workspace${mosaicWidth.isResizing ? ' is-resizing' : ''}`}
      style={mosaicWidth.style}
    >
      <h2>{languageMode === 'ru' ? 'Кодовая мозаика' : 'Code Mosaic'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Соберите Java 17 решение. Отбросьте distractors — некоторые компилируются, но логически неверны.'
          : 'Rebuild the Java 17 solution. Discard distractors — some compile but are logically wrong.'}
      </p>

      <OrderedAssembler
        bankItems={bankItems}
        railIds={railIds}
        discardedIds={discardedIds}
        onRailChange={onRailChange}
        onDiscardedChange={onDiscardedChange}
        codeMode
        requiredCount={mosaic.solutionOrder.length}
        ariaLabel="Code mosaic assembler"
      />

      <div className="alg-stage-actions">
        <button
          type="button"
          className="btn-secondary-action"
          onClick={() => {
            onRailChange([]);
            onDiscardedChange([]);
            setFeedback('');
            setShowAlt(false);
            setPresentationKey((k) => k + 1);
          }}
        >
          Reset
        </button>
        <button type="button" className="btn-primary-action" onClick={handleCheck}>
          Check Mosaic
        </button>
      </div>
      {feedback && (
        <p className="alg-feedback" aria-live="polite">
          {feedback}
        </p>
      )}
      {showAlt && (
        <p className="alg-alt-note">{getLocalizedText(mosaic.alternativeNote, languageMode)}</p>
      )}

      {mosaicWidth.handleProps && (
        <div
          className="alg-mosaic-resize-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label={
            languageMode === 'ru'
              ? 'Изменить ширину рабочей области Code Mosaic'
              : 'Resize Code Mosaic workspace'
          }
          {...mosaicWidth.handleProps}
        />
      )}
    </div>
  );
};
