import React, { useState } from 'react';

export default function StarRating({
  rating = 0,
  count,
  interactive = false,
  onChange,
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = interactive && hoverRating ? hoverRating : rating;
  const maxStars = 5;

  const getStarType = (starIndex) => {
    if (displayRating >= starIndex) return 'full';
    if (displayRating >= starIndex - 0.5) return 'half';
    return 'empty';
  };

  const handleClick = (starIndex) => {
    if (interactive && onChange) {
      onChange(starIndex);
    }
  };

  const handleMouseEnter = (starIndex) => {
    if (interactive) setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (interactive) setHoverRating(0);
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    const type = getStarType(i);
    let icon;
    let colorClass;

    if (type === 'full') {
      icon = 'star';
      colorClass = 'text-amber-400';
    } else if (type === 'half') {
      icon = 'star_half';
      colorClass = 'text-amber-400';
    } else {
      icon = 'star';
      colorClass = 'text-on-surface/20';
    }

    stars.push(
      <span
        key={i}
        className={`material-symbols-outlined text-xl ${colorClass} ${
          interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''
        }`}
        style={interactive ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        role={interactive ? 'button' : undefined}
        aria-label={interactive ? `Rate ${i} star${i !== 1 ? 's' : ''}` : undefined}
      >
        {icon}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{stars}</div>
      {count !== undefined && (
        <span className="text-on-surface/40 text-body-sm ml-1.5">
          ({count})
        </span>
      )}
    </div>
  );
}
