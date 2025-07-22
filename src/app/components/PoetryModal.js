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
      <div className="flex flex-col items-center justify-center w-full pt-4 pb-8 md:pb-4">
        <div className="font-mono text-center mb-4 select-none">
          <span role="img" aria-label="snowflake">❄</span> <span className="underline">melting</span> <span role="img" aria-label="snowflake">❄</span>
        </div>
        <div className="mx-auto text-center font-mono text-sm md:text-base leading-relaxed whitespace-pre-line text-[var(--grey)] hover:text-white transition-colors duration-200">
          <>
            <div className="text-center text-[var(--grey)] md:hover:text-white md:transition-colors md:duration-200 text-white md:text-[var(--grey)]">
              in this battered caravanserai, sojourn’s inertia lulls<br />
              portals ajar, yet none avoir, in pursuit of light apathy dulls<br />
              leaves wither, roads diverge, yet still, they stall and stay<br />
              with paths tread by the many, all lost in their own way
            </div>
            <div className="text-center my-4 text-xs text-[var(--grey)] select-none py-0.5" aria-hidden="true">⁂</div>
            <div className="text-center text-[var(--grey)] md:hover:text-white md:transition-colors md:duration-200 text-white md:text-[var(--grey)]">
              the grand cocytus ebbs and flows, daring hearts to seek<br />
              abode in limbo, blooms fade fast, turning faint and weak<br />
              the darkness subjugates the frost of the barren, boreal trail<br />
              grey swallows the sun; unbroken white and maddening winds assail
            </div>
            <div className="text-center my-4 text-xs text-[var(--grey)] select-none py-0.5" aria-hidden="true">⁂</div>
            <div className="text-center text-[var(--grey)] md:hover:text-white md:transition-colors md:duration-200 text-white md:text-[var(--grey)]">
              cacophonous silence, broken by thumping wings, oppresses<br />
              thoughts of warmth and tranquil sleep shatter as ice represses<br />
              the river&apos;s cold tears ooze through veins, a conquest enslaved<br />
              longing&apos;s embers long extinguished, by compunction depraved
            </div>
            <div className="text-center my-4 text-xs text-[var(--grey)] select-none py-0.5" aria-hidden="true">⁂</div>
            <div className="text-center text-[var(--grey)] md:hover:text-white md:transition-colors md:duration-200 text-white md:text-[var(--grey)]">
              lo, the caravanserai bore its quiet comforts still<br />
              weary smiles of travelers whispered of warmth at will<br />
              portals askew held eternities distant and vast<br />
              drops of imagination wrung fitfully, unadorned joys unsurpassed
            </div>
            <div className="text-center my-4 text-xs text-[var(--grey)] select-none py-0.5" aria-hidden="true">⁂</div>
            <div className="text-center text-[var(--grey)] md:hover:text-white md:transition-colors md:duration-200 text-white md:text-[var(--grey)]">
              a lichen-capped log bespeckled with the tiniest shoots<br />
              amidst delicate sprigs of mint, defying winter’s roots<br />
              the glacial nix drapes softly, blanket of the waking world<br />
              if only i hadn’t done anything - let life unfold <span role="leaf" aria-label="snowflake">🌿</span>
            </div>
          </>
        </div>
      </div>
    </>
  );
} 