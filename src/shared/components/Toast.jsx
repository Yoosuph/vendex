import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig = {
  success: {
    icon: 'check_circle',
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    iconColor: 'text-green-500',
    progressBg: 'bg-green-500',
  },
  error: {
    icon: 'error',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-500',
    progressBg: 'bg-red-500',
  },
  warning: {
    icon: 'warning',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
    iconColor: 'text-amber-500',
    progressBg: 'bg-amber-500',
  },
  info: {
    icon: 'info',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-500',
    progressBg: 'bg-blue-500',
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
      className={`${config.bg} border rounded-xl shadow-modal min-w-[300px] max-w-[400px] overflow-hidden`}
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
