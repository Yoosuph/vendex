import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export default function VendexLogo({
  size = 'md',
  showText = true,
  badge = null,
  linkTo = '/',
  className = '',
  iconOnly = false,
}) {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-base', badge: 'text-[9px]' },
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-[10px]' },
    md: { icon: 'w-8 h-8 sm:w-9 sm:h-9', text: 'text-xl sm:text-2xl', badge: 'text-[10px]' },
    lg: { icon: 'w-10 h-10 sm:w-12 sm:h-12', text: 'text-2xl sm:text-3xl', badge: 'text-xs' },
    xl: { icon: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-3xl sm:text-4xl', badge: 'text-xs' },
    hero: { icon: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-4xl sm:text-5xl', badge: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      {/* 3D Geometric Luxury V Crest (Transparent / No Background) */}
      <div
        className={cn(
          'relative shrink-0 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center',
          currentSize.icon
        )}
      >
        <img
          src="/brand/logo.png"
          alt="Vendex Logo"
          className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(151,0,27,0.35)]"
        />
      </div>

      {/* Brand Typography */}
      {showText && !iconOnly ? (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'font-black tracking-tight text-on-surface group-hover:text-primary transition-colors font-sans',
                currentSize.text
              )}
            >
              Vendex
            </span>
            {badge && (
              <span
                className={cn(
                  'font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20',
                  currentSize.badge
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {size === 'xl' || size === 'hero' ? (
            <span className="text-[11px] font-mono tracking-widest uppercase text-secondary mt-1">
              Curated Commerce
            </span>
          ) : null}
        </div>
      ) : badge ? (
        <span
          className={cn(
            'font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20',
            currentSize.badge
          )}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
