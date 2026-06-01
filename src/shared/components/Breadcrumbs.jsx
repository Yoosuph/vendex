import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

function autoGenerateFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Home', path: '/' }];

  let accumulated = '';
  for (const seg of segments) {
    accumulated += `/${seg}`;
    // Capitalize and humanize the segment
    const label = seg
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ label, path: accumulated });
  }

  return items;
}

export default function Breadcrumbs({ items }) {
  const location = useLocation();
  const crumbs = useMemo(() => {
    if (items && items.length > 0) return items;
    return autoGenerateFromPath(location.pathname);
  }, [items, location.pathname]);

  if (!crumbs.length) return null;

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-body-sm text-secondary px-gutter py-2">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;

        return (
          <React.Fragment key={crumb.path || crumb.label}>
            {idx > 0 && (
              <ChevronRight size={14} className="text-on-surface/30 shrink-0" />
            )}

            {isLast || !crumb.path ? (
              <span
                className={cn(isLast ? 'font-bold text-on-surface' : 'text-secondary', 'truncate max-w-[180px]')}
                aria-current={isLast ? 'page' : undefined}
              >
                {idx === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home size={14} className="shrink-0" />
                    <span className="hidden sm:inline">{crumb.label}</span>
                  </span>
                ) : (
                  crumb.label
                )}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-primary transition-colors truncate max-w-[180px]"
              >
                {idx === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home size={14} className="shrink-0" />
                    <span className="hidden sm:inline">{crumb.label}</span>
                  </span>
                ) : (
                  crumb.label
                )}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
