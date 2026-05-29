import React from 'react';
import { motion } from 'framer-motion';

const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-[3px]',
  lg: 'w-16 h-16 border-4',
};

export default function LoadingSpinner({ text = 'Loading...', size = 'md' }) {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`${spinnerSize} rounded-full border-on-surface/20 border-t-primary animate-spin`}
        role="status"
        aria-label={text}
      />
      {text && (
        <motion.p
          className="text-on-surface/60 text-body-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
