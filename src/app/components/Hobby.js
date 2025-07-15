import React, { useState, useCallback } from 'react';
import Scramble from './Scramble';
import Image from 'next/image';
import Modal from './Modal';
import GalleryModal from './GalleryModal';
import PoetryModal from './PoetryModal';

export default function Hobby({ hobby, description, media, thumbnail, modalType }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [modal, setModal] = useState({ type: null, data: null });

  const handleImageLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  }, []);

  const openGallery = (images) => {
    setModal({ type: 'gallery', data: images });
  };

  const openPoem = () => {
    setModal({ type: 'poem', data: null });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  const showGallery = modalType === 'gallery' && media;
  const showPoem = modalType === 'poetry';

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
          {typeof description === 'string' ? (
            <Scramble text={description} delay={0} />
          ) : (
            description
          )}
        </div>
      )}
      {showGallery && (
        <div className="mt-2 text-sm font-mono">
          <a
            href={typeof media === 'string' ? media : '#'}
            className="underline hover:bg-foreground hover:text-background hover:no-underline uppercase"
            onClick={e => {
              e.preventDefault();
              openGallery(media);
            }}
          >
            view gallery
          </a>
        </div>
      )}
      {showPoem && (
        <div className="mt-2 text-sm font-mono">
          <button
            className="underline hover:bg-foreground hover:text-background hover:no-underline uppercase"
            onClick={openPoem}
          >
            read a poem
          </button>
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
      <Modal isOpen={!!modal.type} onClose={closeModal}>
        {modal.type === 'gallery' && modalType === 'gallery' && <GalleryModal onClose={closeModal} media={modal.data} />}
        {modal.type === 'poem' && modalType === 'poetry' && <PoetryModal onClose={closeModal} />}
      </Modal>
    </div>
  );
} 