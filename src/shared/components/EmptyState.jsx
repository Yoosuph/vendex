import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/shared/components/Button';

export default function EmptyState({
  icon = 'inventory_2',
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-on-surface/30">
          {icon}
        </span>
      </div>

      <h3 className="text-on-surface/80 text-lg font-semibold mt-2">{title}</h3>

      {description && (
        <p className="text-on-surface/50 text-body-sm max-w-xs">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          className="mt-3 rounded-full"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
