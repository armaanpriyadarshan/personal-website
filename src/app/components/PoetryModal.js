import React from 'react';

export default function PoetryModal({ onClose }) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 mt-[-12px]">
        <span className="bg-background font-semibold text-[var(--green)] font-mono uppercase text-lg px-2">poem</span>
        <button
          className="bg-background font-mono text-white text-lg px-2 focus:outline-none hover:text-[var(--red)]"
          onClick={onClose}
          aria-label="Close"
          style={{ lineHeight: '1' }}
        >
          [x]
        </button>
      </div>
      {/* Poem content will go here */}
    </>
  );
} 