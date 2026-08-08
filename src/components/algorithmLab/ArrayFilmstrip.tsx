import React from 'react';

interface ArrayFilmstripProps {
  values: readonly number[];
  currentIndex: number | null;
}

export const ArrayFilmstrip: React.FC<ArrayFilmstripProps> = ({ values, currentIndex }) => {
  return (
    <div className="alg-filmstrip" role="list" aria-label="Array values">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          role="listitem"
          className={`alg-film-cell ${currentIndex === index ? 'is-current' : ''} ${
            currentIndex !== null && index < currentIndex ? 'is-past' : ''
          }`}
        >
          <span className="alg-film-index">[{index}]</span>
          <span className="alg-film-value">{value}</span>
        </div>
      ))}
    </div>
  );
};
