import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/shared/components/Button';

export default function ErrorState({
  message = 'Something went wrong',
  onRetry,
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-error">
          error_outline
        </span>
      </div>

      <p className="text-on-surface/70 text-body-sm max-w-xs">{message}</p>

      {onRetry && (
        <Button
          variant="secondary"
          onClick={onRetry}
          className="mt-2 rounded-full"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
