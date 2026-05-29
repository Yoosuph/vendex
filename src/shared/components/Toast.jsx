import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig = {
  success: {
    icon: 'check_circle',
    bg: 'bg-success-container border-success/30',
    text: 'text-success',
    iconColor: 'text-success',
    progressBg: 'bg-success',
  },
  error: {
    icon: 'error',
    bg: 'bg-error-container border-error/30',
    text: 'text-error',
    iconColor: 'text-error',
    progressBg: 'bg-error',
  },
  warning: {
    icon: 'warning',
    bg: 'bg-warning-container border-warning/30',
    text: 'text-warning',
    iconColor: 'text-warning',
    progressBg: 'bg-warning',
  },
  info: {
    icon: 'info',
    bg: 'bg-info-container border-info/30',
    text: 'text-info',
    iconColor: 'text-info',
    progressBg: 'bg-info',
  },
};

function ToastItem({ toast, onClose }) {
  const { id, message, type = 'info' } = toast;
  const config = typeConfig[type] || typeConfig.info;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(100 - (currentStep / steps) * 100);
      if (currentStep >= steps) {
        clearInterval(timer);
        onClose(id);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${config.bg} border rounded-xl shadow-modal min-w-80 max-w-sm overflow-hidden`}
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`material-symbols-outlined text-xl ${config.iconColor} mt-0.5`}>
          {config.icon}
        </span>
        <p className={`${config.text} text-body-sm flex-1`}>{message}</p>
        <button
          onClick={() => onClose(id)}
          className={`${config.text}/60 hover:${config.text} transition-colors`}
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-black/5">
        <motion.div
          className={`h-full ${config.progressBg}`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.slice(0, 5).map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
