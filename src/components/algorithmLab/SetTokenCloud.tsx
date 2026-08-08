import React from 'react';

interface SetTokenCloudProps {
  values: readonly number[];
  highlightValue?: number | null;
  collide?: boolean;
}

export const SetTokenCloud: React.FC<SetTokenCloudProps> = ({
  values,
  highlightValue = null,
  collide = false
}) => {
  return (
    <div
      className={`alg-set-cloud ${collide ? 'is-collide' : ''}`}
      aria-label={`Set contents: ${values.length ? values.join(', ') : 'empty'}`}
    >
      {values.length === 0 && <span className="alg-empty">∅ empty</span>}
      {values.map((value) => (
        <span
          key={value}
          className={`alg-set-token ${highlightValue === value ? 'is-hot' : ''}`}
        >
          {value}
        </span>
      ))}
    </div>
  );
};
