import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/shared/components/Button';

export default function ConfirmDialog({
  open = false,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}) {
  const overlayRef = useRef(null);

  const isDanger = variant === 'danger';

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current && onCancel) {
      onCancel();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-surface-container-low rounded-2xl p-6 max-w-sm w-full shadow-modal border border-outline-variant"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {title && (
              <h3 className="text-on-surface text-lg font-semibold mb-2">{title}</h3>
            )}
            {message && (
              <p className="text-on-surface/70 text-body-sm mb-6">{message}</p>
            )}

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button variant={isDanger ? 'danger' : 'primary'} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
