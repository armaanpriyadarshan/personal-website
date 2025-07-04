import React, { useState, useCallback } from 'react';
import Scramble from './Scramble';
import Image from 'next/image';
import GalleryModal from './GalleryModal';

export default function Hobby({ hobby, description, media, text, thumbnail }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleImageLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  }, []);

  return (
    <div className="pr-4 h-80 flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-3 pb-2 border-b border-[var(--grey)] w-fit">
          <div className="text-xl font-bold uppercase">
            - {hobby} -
          </div>
        </div>
      </div>
      {description && (
        <div className="text-sm font-mono">
          <Scramble text={description} delay={0} />
        </div>
      )}
      {media && text && (
        <div className="mt-2 text-sm font-mono uppercase">
          <a
            href={media}
            className="underline hover:bg-foreground hover:text-background hover:no-underline"
            onClick={e => {
              e.preventDefault();
              setIsGalleryOpen(true);
            }}
          >
            {text}
          </a>
        </div>
      )}
      {thumbnail && (
        <div className="mt-4 flex-1 flex items-end">
          <div className="h-full relative" style={{ aspectRatio: aspectRatio }}>
            <Image
              src={thumbnail}
              alt={`${hobby} thumbnail`}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      )}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} media={media} />
    </div>
  );
} 