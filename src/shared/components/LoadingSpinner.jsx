import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export default function LoadingSpinner({ text = 'Loading...', size = 'md' }) {
  const iconSize = sizeMap[size] || sizeMap.md;

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse pointer-events-none" />
        <div className={cn('relative flex items-center justify-center emblem-pulse z-10', iconSize)}>
          <img
            src="/brand/logo.png"
            alt="Vendex Loading"
            className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(151,0,27,0.5)]"
          />
        </div>
      </div>
      {text && (
        <div className="flex items-center text-secondary text-body-sm font-mono tracking-wide mt-1">
          <span>{text}</span>
          <span className="blocking-loader-caret" />
        </div>
      )}
    </motion.div>
  );
}
