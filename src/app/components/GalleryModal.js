'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gallery } from './react-grid-gallery/src';
import Image from 'next/image';

export default function GalleryModal({ onClose, media }) {
  // State for expanded image
  const [expandedImage, setExpandedImage] = useState(null);

  // Handler to expand image
  const handleImageClick = (index, image, event) => {
    setExpandedImage(image);
  };

  // Handler to close expanded image
  const handleCloseExpanded = (e) => {
    e.stopPropagation();
    setExpandedImage(null);
  };

  return (
    <>
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
      <Gallery images={media} rowHeight={225} margin={4} enableImageSelection={false} onClick={handleImageClick} />
      {/* Expanded image overlay */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            key="expanded-image"
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 w-screen h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseExpanded}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={expandedImage.src}
                alt={expandedImage.alt || 'Expanded'}
                fill
                className="object-contain rounded shadow-lg"
                unoptimized
                priority
              />
              <button
                className="absolute top-2 right-2 text-xl font-mono hover:text-[var(--red)] focus:outline-none"
                onClick={handleCloseExpanded}
                aria-label="close expanded image"
              >
                [x]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 