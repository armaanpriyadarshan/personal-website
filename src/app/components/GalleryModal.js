'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryModal({ isOpen, onClose, media }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: 'rgba(15, 18, 18, 0.6)' }}
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
            className="border border-[var(--grey)] p-6 relative bg-background flex flex-col w-[80vw] h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 mt-[-12px]">
              <span className="bg-background font-semibold text-[var(--green)] font-mono uppercase text-lg px-2">gallery</span>
              <button
                className="bg-background font-mono text-white text-lg px-2 focus:outline-none hover:text-[var(--red)]"
                onClick={onClose}
                aria-label="Close"
                style={{ lineHeight: '1' }}
              >
                [x]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 