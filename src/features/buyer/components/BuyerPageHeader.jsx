import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Editorial page header used across the buyer portal.
 * eyebrow → mono index label; title → Inter; meta → mono secondary.
 */
export default function BuyerPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow && <p className="buyer-eyebrow">{eyebrow}</p>}
        <h1 className="text-headline-md md:text-headline-lg font-bold text-on-surface tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-body-sm text-on-surface-variant max-w-xl">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-sm shrink-0">{actions}</div>
      )}
    </div>
  );
}
