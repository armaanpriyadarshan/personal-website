import React, { useState, useCallback } from 'react';
import Scramble from './Scramble';
import Image from 'next/image';

export default function Hobby({ hobby, description, media, preview, thumbnail }) {
  const [aspectRatio, setAspectRatio] = useState(1);

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
      {media && preview && (
        <div className="mt-2 text-sm font-mono uppercase">
          <a
            href={media}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:bg-foreground hover:text-background hover:no-underline"
          >
            {preview}
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
    </div>
  );
} 