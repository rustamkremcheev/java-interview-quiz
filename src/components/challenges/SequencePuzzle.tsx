import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PuzzleItem, LocalizedText, LanguageMode } from '../../types/mission';
import { Check, X, GripVertical, AlertTriangle, Lightbulb } from 'lucide-react';

interface SequencePuzzleProps {
  items: PuzzleItem[];
  instruction: LocalizedText;
  languageMode: LanguageMode;
  onComplete: (correct: boolean) => void;
}

function SortablePuzzleCard({
  item,
  languageMode,
  isSelectedForTap,
  onTapCard
}: {
  item: PuzzleItem;
  languageMode: LanguageMode;
  isSelectedForTap: boolean;
  onTapCard: (item: PuzzleItem) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onTapCard(item)}
      className={`puzzle-card ${isSelectedForTap ? 'selected-tap' : ''}`}
    >
      <div className="drag-handle" {...attributes} {...listeners}>
        <GripVertical size={18} />
      </div>
      <div className="card-text">{getText(item.text)}</div>
    </div>
  );
}

export const SequencePuzzle: React.FC<SequencePuzzleProps> = ({
  items,
  instruction,
  languageMode,
  onComplete
}) => {
  // Initialize with shuffled items
  const [sequence, setSequence] = useState<PuzzleItem[]>(() => {
    return [...items].sort(() => Math.random() - 0.5);
  });
  const [selectedTapId, setSelectedTapId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSequence((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  // Mobile Tap-to-select support
  const handleTapCard = (item: PuzzleItem) => {
    if (isSubmitted) return;

    if (!selectedTapId) {
      setSelectedTapId(item.id);
    } else if (selectedTapId === item.id) {
      setSelectedTapId(null);
    } else {
      // Swap items
      setSequence((prev) => {
        const idx1 = prev.findIndex((i) => i.id === selectedTapId);
        const idx2 = prev.findIndex((i) => i.id === item.id);
        const updated = [...prev];
        const temp = updated[idx1];
        updated[idx1] = updated[idx2];
        updated[idx2] = temp;
        return updated;
      });
      setSelectedTapId(null);
    }
  };

  const handleCheckAnswer = () => {
    // Filter out distractors from user sequence
    const nonDistractorUserItems = sequence.filter((item) => !item.isDistractor);
    const distractorsInSequence = sequence.some((item, idx) => {
      // If a distractor is placed anywhere before non-distractors finish, or placed at all
      return item.isDistractor;
    });

    // Check if remaining non-distractor items are in strictly ascending correctOrder
    let correctSequence = true;
    for (let i = 0; i < nonDistractorUserItems.length - 1; i++) {
      if (
        (nonDistractorUserItems[i].correctOrder || 0) >
        (nonDistractorUserItems[i + 1].correctOrder || 0)
      ) {
        correctSequence = false;
        break;
      }
    }

    const passed = correctSequence && !distractorsInSequence;
    setIsCorrect(passed);
    setIsSubmitted(true);
    onComplete(passed);
  };

  const handleRemoveDistractor = (id: string) => {
    if (isSubmitted) return;
    setSequence((prev) => prev.filter((item) => item.id !== id));
  };

  const getInstruction = () => {
    if (languageMode === 'ru') return instruction.ru;
    if (languageMode === 'bilingual') return `${instruction.en} / ${instruction.ru}`;
    return instruction.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h3>{getInstruction()}</h3>
        <p className="touch-hint">
          <Lightbulb size={16} /> Drag & drop cards into order OR tap a card then tap another to swap (Mobile friendly).
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sequence.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="puzzle-list">
            {sequence.map((item, index) => (
              <div key={item.id} className="puzzle-row">
                <span className="row-number">#{index + 1}</span>
                <SortablePuzzleCard
                  item={item}
                  languageMode={languageMode}
                  isSelectedForTap={selectedTapId === item.id}
                  onTapCard={handleTapCard}
                />
                <button
                  onClick={() => handleRemoveDistractor(item.id)}
                  title="Remove card (if you think it is a distractor)"
                  className="remove-card-btn"
                  disabled={isSubmitted}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isSubmitted && (
        <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
          {isCorrect ? (
            <div className="feedback-content">
              <Check size={24} className="icon-success" />
              <div>
                <strong>Correct Sequence!</strong>
                <p>You accurately identified the bucket routing failure steps and rejected distractor cards.</p>
              </div>
            </div>
          ) : (
            <div className="feedback-content">
              <AlertTriangle size={24} className="icon-error" />
              <div>
                <strong>Sequence Incomplete or Incorrect</strong>
                <p>Make sure all distractor cards are removed and remaining steps follow chronological key hashing logic.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!isSubmitted && (
        <div className="challenge-footer">
          <button onClick={handleCheckAnswer} className="btn-primary">
            Check Sequence
          </button>
        </div>
      )}
    </div>
  );
};
