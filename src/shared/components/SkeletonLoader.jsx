import React from 'react';
import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-md skeleton-shimmer',
        className
      )}
      {...props}
    />
  );
}

export function ProductCardSkeleton({ compact = false }) {
  return (
    <div className={cn(
      'flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-subtle',
      compact ? 'p-0' : 'p-0'
    )}>
      {/* Media skeleton */}
      <div className={cn('relative w-full bg-surface-container-low', compact ? 'aspect-[4/5]' : 'aspect-[4/5] sm:aspect-[3/4]')}>
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content skeleton */}
      <div className={cn('flex flex-1 flex-col gap-2.5', compact ? 'p-3' : 'p-3.5 sm:p-4')}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-1/3 rounded-full" />
          <Skeleton className="h-3 w-10 rounded-full" />
        </div>
        <Skeleton className="h-4.5 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="mt-auto pt-3 flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, compact = false }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} compact={compact} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 md:py-10 space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded" />
        <span className="text-secondary">/</span>
        <Skeleton className="h-4 w-24 rounded" />
        <span className="text-secondary">/</span>
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
          <div className="grid grid-cols-4 gap-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-full rounded-lg" />
            <Skeleton className="h-8 sm:h-10 w-2/3 rounded-lg" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
            </div>
          </div>

          <Skeleton className="h-10 w-36 rounded-lg" />

          <div className="space-y-3 pt-4 border-t border-outline-variant/30">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>

          <div className="pt-6 space-y-4">
            <Skeleton className="h-14 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex gap-3 items-center">
            <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>
            <Skeleton className="h-6 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr className="border-b border-outline-variant/30">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full max-w-[120px] rounded" />
        </td>
      ))}
    </tr>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full overflow-hidden bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-subtle">
      <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-8 w-48 rounded-lg" />
      </div>
      <table className="w-full text-left">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-48 rounded" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-7 w-28 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

export default function SkeletonLoader({ type = 'card', count = 4, className }) {
  if (type === 'grid') return <ProductGridSkeleton count={count} />;
  if (type === 'table') return <TableSkeleton rows={count} />;
  if (type === 'detail') return <ProductDetailSkeleton />;
  if (type === 'orders') return <OrdersListSkeleton count={count} />;
  if (type === 'dashboard') return <DashboardOverviewSkeleton />;
  return <Skeleton className={className || 'h-32 w-full rounded-xl'} />;
}
