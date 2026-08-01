import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface TagChipProps {
  tag: string;
  onClick?: (tag: string) => void;
}

export const TagChip: React.FC<TagChipProps> = ({ tag, onClick }) => {
  const { openSidebarWithTag } = useAppStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(tag);
    } else {
      openSidebarWithTag(tag);
    }
  };

  return (
    <button
      type="button"
      className="tag-chip-btn"
      onClick={handleClick}
      title={`Inspect concept details for ${tag}`}
    >
      <span className="tag-symbol">#</span>
      <span className="tag-name">{tag.replace(/^#/, '')}</span>
    </button>
  );
};
