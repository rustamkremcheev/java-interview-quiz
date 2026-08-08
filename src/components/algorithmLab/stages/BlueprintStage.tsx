import React, { useMemo, useState } from 'react';
import { BlueprintGraph } from '../../../types/algorithmLab';
import { LanguageMode } from '../../../types/domain';
import { getLocalizedInline, getLocalizedText } from '../../../lib/localized';
import { OrderedAssembler, AssemblerItem } from '../OrderedAssembler';

interface BlueprintStageProps {
  blueprint: BlueprintGraph;
  railIds: readonly string[];
  discardedIds: readonly string[];
  languageMode: LanguageMode;
  onRailChange: (ids: string[]) => void;
  onDiscardedChange: (ids: string[]) => void;
  onAttempt: (correct: boolean) => void;
  onComplete: () => void;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export const BlueprintStage: React.FC<BlueprintStageProps> = ({
  blueprint,
  railIds,
  discardedIds,
  languageMode,
  onRailChange,
  onDiscardedChange,
  onAttempt,
  onComplete
}) => {
  const [feedback, setFeedback] = useState('');

  const items: AssemblerItem[] = useMemo(
    () =>
      blueprint.nodes.map((node) => ({
        id: node.id,
        label: getLocalizedInline(node.label, languageMode),
        meta: node.role
      })),
    [blueprint.nodes, languageMode]
  );

  const requiredIds = blueprint.nodes.filter((n) => n.role === 'REQUIRED').map((n) => n.id);

  const handleCheck = () => {
    const correctOrder = arraysEqual(railIds, blueprint.solutionOrder);
    const discardedRequired = discardedIds.some((id) => requiredIds.includes(id));
    const distractorsInRail = railIds.some((id) => {
      const node = blueprint.nodes.find((n) => n.id === id);
      return node?.role === 'DISTRACTOR';
    });

    if (correctOrder && !discardedRequired && !distractorsInRail) {
      setFeedback(
        languageMode === 'ru'
          ? 'Чертёж верен: память → цикл → проверка → ранний true / add → false.'
          : 'Blueprint correct: memory → loop → check → early true / add → false.'
      );
      onAttempt(true);
      onComplete();
      return;
    }

    onAttempt(false);
    if (distractorsInRail) {
      const bad = railIds
        .map((id) => blueprint.nodes.find((n) => n.id === id))
        .find((n) => n?.role === 'DISTRACTOR');
      setFeedback(
        bad?.distractorExplanation
          ? getLocalizedText(bad.distractorExplanation, languageMode)
          : languageMode === 'ru'
            ? 'В рельсе есть лишний блок. Отправьте distractors в Discard.'
            : 'A distractor is on the rail. Move distractors to Discard.'
      );
      return;
    }
    if (railIds.length < blueprint.solutionOrder.length) {
      setFeedback(
        languageMode === 'ru'
          ? 'Не хватает обязательных блоков. Сначала создайте память для seen-значений.'
          : 'Missing required blocks. Start by creating memory for seen values.'
      );
      return;
    }
    const firstMismatch = blueprint.solutionOrder.findIndex((id, i) => railIds[i] !== id);
    setFeedback(
      languageMode === 'ru'
        ? `Порядок неверен около позиции ${firstMismatch + 1}. Проверьте поток управления, не синтаксис.`
        : `Order is wrong near position ${firstMismatch + 1}. Check control flow, not syntax.`
    );
  };

  const handleReset = () => {
    onRailChange([]);
    onDiscardedChange([]);
    setFeedback('');
  };

  return (
    <div className="alg-stage-card">
      <h2>{languageMode === 'ru' ? 'Чертёж алгоритма' : 'Algorithm Blueprint'}</h2>
      <p className="alg-help">
        {languageMode === 'ru'
          ? 'Соберите логические блоки HashSet. Java ещё скрыт.'
          : 'Assemble HashSet logic blocks. Java is still hidden.'}
      </p>

      <OrderedAssembler
        bankItems={items}
        railIds={railIds}
        discardedIds={discardedIds}
        onRailChange={onRailChange}
        onDiscardedChange={onDiscardedChange}
        ariaLabel="Blueprint assembler"
      />

      <div className="alg-stage-actions">
        <button type="button" className="btn-secondary-action" onClick={handleReset}>
          Reset
        </button>
        <button type="button" className="btn-primary-action" onClick={handleCheck}>
          Check Blueprint
        </button>
      </div>
      {feedback && (
        <p className="alg-feedback" aria-live="polite">
          {feedback}
        </p>
      )}
    </div>
  );
};
