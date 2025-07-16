import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, children }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center overflow-y-auto"
          style={{ alignItems: 'flex-start', backgroundColor: 'rgba(15, 18, 18, 0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ borderWidth: 0, opacity: 0 }}
            animate={{ borderWidth: '1px', opacity: 1 }}
            exit={{ borderWidth: 0, opacity: 0 }}
            transition={{
              borderWidth: { duration: 0.5, ease: 'easeOut' },
              opacity: { duration: 0.3 }
            }}
            className="border border-[var(--grey)] p-6 relative bg-background flex flex-col w-[80vw] my-12"
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 