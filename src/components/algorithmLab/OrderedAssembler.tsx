import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

export interface AssemblerItem {
  readonly id: string;
  readonly label: string;
  readonly code?: string;
  readonly indent?: number;
  readonly meta?: string;
}

interface OrderedAssemblerProps {
  readonly bankItems: readonly AssemblerItem[];
  readonly railIds: readonly string[];
  readonly discardedIds: readonly string[];
  readonly onRailChange: (railIds: string[]) => void;
  readonly onDiscardedChange: (discardedIds: string[]) => void;
  readonly codeMode?: boolean;
  /** When set (Code Mosaic), shows placed/required header and empty slot rows. */
  readonly requiredCount?: number;
  readonly ariaLabel: string;
}

function SortableRailItem({
  item,
  codeMode,
  selected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onRemove,
  onDiscard
}: {
  item: AssemblerItem;
  codeMode: boolean;
  selected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onDiscard: () => void;
}) {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const [lockedWidth, setLockedWidth] = useState<number | null>(null);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id
  });

  useEffect(() => {
    if (isDragging && itemRef.current && lockedWidth == null) {
      setLockedWidth(itemRef.current.getBoundingClientRect().width);
      return;
    }
    if (!isDragging && lockedWidth != null) {
      setLockedWidth(null);
    }
  }, [isDragging, lockedWidth]);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.55 : 1,
    paddingLeft: codeMode ? `${8 + (item.indent ?? 0) * 16}px` : undefined,
    width: isDragging && lockedWidth != null ? lockedWidth : undefined,
    minWidth: isDragging && lockedWidth != null ? lockedWidth : undefined,
    boxSizing: 'border-box'
  };

  return (
    <li
      ref={(node) => {
        itemRef.current = node;
        setNodeRef(node);
      }}
      style={style}
      className={`alg-tile ${codeMode ? 'alg-tile-code' : ''} ${selected ? 'is-selected' : ''} ${
        isDragging ? 'is-dragging' : ''
      }`}
    >
      <button
        type="button"
        className="alg-tile-main"
        onClick={onSelect}
        aria-pressed={selected}
      >
        <span
          className="alg-drag-handle"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          onPointerDown={(event) => {
            if (itemRef.current) {
              setLockedWidth(itemRef.current.getBoundingClientRect().width);
            }
            listeners?.onPointerDown?.(event);
          }}
        >
          <GripVertical size={16} />
        </span>
        <span className={codeMode ? 'alg-code-text' : 'alg-block-text'}>
          {codeMode ? item.code ?? item.label : item.label}
        </span>
      </button>
      <div className={`alg-tile-actions ${codeMode ? 'alg-tile-actions-inline' : ''}`}>
        <button type="button" className="alg-icon-btn" onClick={onMoveUp} aria-label="Move up" title="Move up">
          <ArrowUp size={16} />
        </button>
        <button type="button" className="alg-icon-btn" onClick={onMoveDown} aria-label="Move down" title="Move down">
          <ArrowDown size={16} />
        </button>
        <button
          type="button"
          className="alg-icon-btn"
          onClick={onRemove}
          aria-label="Remove to bank"
          title="Remove to bank"
        >
          {codeMode ? 'Rem' : 'Remove'}
        </button>
        <button
          type="button"
          className="alg-icon-btn danger"
          onClick={onDiscard}
          aria-label="Discard"
          title="Discard"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}

export const OrderedAssembler: React.FC<OrderedAssemblerProps> = ({
  bankItems,
  railIds,
  discardedIds,
  onRailChange,
  onDiscardedChange,
  codeMode = false,
  requiredCount,
  ariaLabel
}) => {
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [selectedRailId, setSelectedRailId] = useState<string | null>(null);

  const byId = useMemo(() => {
    const map = new Map<string, AssemblerItem>();
    for (const item of bankItems) map.set(item.id, item);
    return map;
  }, [bankItems]);

  const railItems = railIds.map((id) => byId.get(id)).filter((x): x is AssemblerItem => !!x);
  const availableBank = bankItems.filter(
    (item) => !railIds.includes(item.id) && !discardedIds.includes(item.id)
  );
  const discardedItems = discardedIds.map((id) => byId.get(id)).filter((x): x is AssemblerItem => !!x);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = railIds.indexOf(String(active.id));
    const newIndex = railIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onRailChange(arrayMove([...railIds], oldIndex, newIndex));
  };

  const placeBankItem = (id: string, atIndex?: number) => {
    if (railIds.includes(id)) return;
    const nextDiscarded = discardedIds.filter((d) => d !== id);
    const nextRail = [...railIds];
    if (typeof atIndex === 'number' && atIndex >= 0 && atIndex <= nextRail.length) {
      nextRail.splice(atIndex, 0, id);
    } else {
      nextRail.push(id);
    }
    onDiscardedChange([...nextDiscarded]);
    onRailChange(nextRail);
    setSelectedBankId(null);
  };

  const onBankTap = (id: string) => {
    if (selectedBankId === id) {
      placeBankItem(id);
      return;
    }
    setSelectedBankId(id);
    setSelectedRailId(null);
  };

  const onRailTap = (id: string) => {
    if (selectedBankId) {
      const idx = railIds.indexOf(id);
      placeBankItem(selectedBankId, idx);
      return;
    }
    setSelectedRailId((prev) => (prev === id ? null : id));
  };

  const moveRail = (id: string, delta: number) => {
    const idx = railIds.indexOf(id);
    const next = idx + delta;
    if (idx < 0 || next < 0 || next >= railIds.length) return;
    onRailChange(arrayMove([...railIds], idx, next));
  };

  const removeRail = (id: string) => {
    onRailChange(railIds.filter((x) => x !== id));
  };

  const discardFromRail = (id: string) => {
    onRailChange(railIds.filter((x) => x !== id));
    if (!discardedIds.includes(id)) onDiscardedChange([...discardedIds, id]);
  };

  const discardFromBank = (id: string) => {
    if (!discardedIds.includes(id)) onDiscardedChange([...discardedIds, id]);
    setSelectedBankId(null);
  };

  const restoreDiscarded = (id: string) => {
    onDiscardedChange(discardedIds.filter((x) => x !== id));
  };

  const emptySlotCount =
    codeMode && typeof requiredCount === 'number'
      ? Math.max(0, requiredCount - railItems.length)
      : 0;

  return (
    <div
      className={`alg-assembler ${codeMode ? 'alg-assembler--code' : ''}`}
      aria-label={ariaLabel}
    >
      <div className="alg-assembler-columns">
        <section className="alg-panel alg-panel-available">
          <div className="alg-panel-header">
            <h3>Available</h3>
          </div>
          <p className="alg-help">Tap a tile, then tap the rail (or tap again) to place. Drag optional on desktop.</p>
          <ul className="alg-tile-list">
            {availableBank.map((item) => (
              <li
                key={item.id}
                className={`alg-tile ${codeMode ? 'alg-tile-code' : ''} ${
                  selectedBankId === item.id ? 'is-selected' : ''
                }`}
              >
                <button type="button" className="alg-tile-main" onClick={() => onBankTap(item.id)}>
                  <span className={codeMode ? 'alg-code-text' : 'alg-block-text'}>
                    {codeMode ? item.code ?? item.label : item.label}
                  </span>
                </button>
                <button
                  type="button"
                  className={`alg-icon-btn danger ${codeMode ? 'alg-discard-compact' : ''}`}
                  onClick={() => discardFromBank(item.id)}
                  aria-label={`Discard ${item.label}`}
                  title="Discard"
                >
                  Discard
                </button>
              </li>
            ))}
            {availableBank.length === 0 && <li className="alg-empty">No remaining tiles</li>}
          </ul>
        </section>

        <section className="alg-panel alg-panel-rail">
          <div className="alg-panel-header">
            <h3>Assembly Rail</h3>
            {codeMode && typeof requiredCount === 'number' && (
              <span className="alg-rail-count" aria-live="polite">
                {railIds.length} / {requiredCount} placed
              </span>
            )}
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={[...railIds]} strategy={verticalListSortingStrategy}>
              <ol className={`alg-tile-list alg-rail ${codeMode ? 'alg-rail--code' : ''}`}>
                {railItems.map((item, index) => (
                  <SortableRailItem
                    key={item.id}
                    item={item}
                    codeMode={codeMode}
                    selected={selectedRailId === item.id}
                    onSelect={() => onRailTap(item.id)}
                    onMoveUp={() => moveRail(item.id, -1)}
                    onMoveDown={() => moveRail(item.id, 1)}
                    onRemove={() => removeRail(item.id)}
                    onDiscard={() => discardFromRail(item.id)}
                  />
                ))}
                {Array.from({ length: emptySlotCount }, (_, i) => {
                  const slotNumber = railItems.length + i + 1;
                  return (
                    <li key={`empty-${slotNumber}`} className="alg-empty-slot">
                      <span className="alg-empty-slot-index" aria-hidden>
                        {slotNumber}
                      </span>
                      <button
                        type="button"
                        className="alg-empty-slot-target"
                        onClick={() => {
                          if (selectedBankId) placeBankItem(selectedBankId);
                        }}
                      >
                        Place a tile here
                      </button>
                    </li>
                  );
                })}
                {!codeMode && railItems.length === 0 && (
                  <li className="alg-empty">Place blocks here in order</li>
                )}
              </ol>
            </SortableContext>
          </DndContext>
          {selectedBankId && (
            <button
              type="button"
              className="btn-secondary-action"
              onClick={() => placeBankItem(selectedBankId)}
            >
              Append selected to end
            </button>
          )}
        </section>
      </div>

      <section className="alg-panel alg-discard-zone" aria-label="Discard zone">
        <h3>Doesn’t belong</h3>
        <ul className="alg-tile-list">
          {discardedItems.map((item) => (
            <li key={item.id} className={`alg-tile ${codeMode ? 'alg-tile-code' : ''} is-discarded`}>
              <span className={codeMode ? 'alg-code-text' : 'alg-block-text'}>
                {codeMode ? item.code ?? item.label : item.label}
              </span>
              <button type="button" className="alg-icon-btn" onClick={() => restoreDiscarded(item.id)}>
                Restore
              </button>
            </li>
          ))}
          {discardedItems.length === 0 && <li className="alg-empty">Discard unnecessary tiles here</li>}
        </ul>
      </section>
    </div>
  );
};
