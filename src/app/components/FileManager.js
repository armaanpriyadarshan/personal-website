import { useState, useEffect, useRef } from 'react';

export default function FileManager({ directory, subdirectories = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => Math.min(subdirectories.length - 1, prev + 1));
      }
      
      // Scroll into view on arrow key presses
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      containerRef.current?.scrollIntoView({ 
        block: 'center' 
      });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [subdirectories.length]);

  // Handle mouse interactions
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const getActiveSubdirectory = () => {
    return subdirectories[activeIndex] || null;
  };

  // Mobile arrow navigation
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(subdirectories.length - 1, prev + 1));
  };

  // Swipe functionality for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) { // threshold
        if (diff > 0) {
          // Swiped left
          handleNext();
        } else {
          // Swiped right
          handlePrev();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="font-mono" ref={containerRef} tabIndex={0}>
      <div className="border border-[var(--grey)] p-4 relative">
        <div className="absolute top-0 left-4 mt-[-12px] bg-background px-2 overflow-x-auto whitespace-nowrap max-w-[90%]">
          <span className="text-sm md:text-base text-[var(--green)] font-semibold">armaan@arch</span>
          <span className="text-sm md:text-base font-semibold">:</span>
          <span className="text-sm md:text-base text-[var(--darkBlue)] font-semibold">~/about/{directory}/</span>
          {getActiveSubdirectory() && (
            <span className="text-sm md:text-base font-semibold">{getActiveSubdirectory().name}</span>
          )}
        </div>
        {/* Folder display inline with first 'a' in armaan@arch */}
        <div className="mt-4 ml-2 flex">
          <div className="mt-0.5 hidden md:block">
            <span className="bg-[var(--darkBlue)] text-[var(--background)] px-2 py-1 font-semibold">
              {directory}
            </span>
          </div>
          {/* Files list inline with '~' in path */}
          <div className="ml-6 hidden md:block">
            {subdirectories.map((file, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={index} 
                  className={`font-semibold cursor-pointer px-2 py-0.5 ${
                    isActive 
                      ? 'bg-[var(--darkBlue)] text-[var(--background)]' 
                      : 'text-[var(--darkBlue)]'
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {file.name}
                </div>
              );
            })}
          </div>
          {/* Subdirectory content display with mobile arrows and swipe, desktop unchanged */}
          {getActiveSubdirectory() && (
            <>
              {/* Mobile: arrows + swipeable content */}
              <div className="flex items-center justify-center relative md:hidden">
                <button
                  className={`absolute -left-8 top-1/2 -translate-y-1/2 pt-1.5 text-[var(--green)] text-2xl focus:outline-none bg-[var(--background)] ${activeIndex === 0 ? 'invisible' : ''}`}
                  style={{ zIndex: 2 }}
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous"
                >
                  ❮
                </button>
                <div
                  className="w-full max-w-xs mx-auto"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {getActiveSubdirectory().content}
                </div>
                <button
                  className={`absolute -right-6 top-1/2 -translate-y-1/2 pt-1.5 text-[var(--green)] text-2xl focus:outline-none bg-[var(--background)] ${activeIndex === subdirectories.length - 1 ? 'invisible' : ''}`}
                  style={{ zIndex: 2 }}
                  onClick={handleNext}
                  disabled={activeIndex === subdirectories.length - 1}
                  aria-label="Next"
                >
                  ❯
                </button>
              </div>
              {/* Desktop: plain content */}
              <div className="md:ml-8 flex-1 hidden md:block w-full">
                {getActiveSubdirectory().content}
              </div>
            </>
          )}
        </div>
        {/* File details line */}
        {getActiveSubdirectory() && (
          <div className="mt-4 ml-2 md:ml-4 text-sm md:text-base">
            <span className="text-[var(--lightBlue)]">drwxr-xr-x</span>
            <span className="ml-2">armaan</span>
            <span className="ml-2">{getActiveSubdirectory().size}</span>
            <span className="ml-2">{getActiveSubdirectory().lastModified}</span>
          </div>
        )}
      </div>
    </div>
  );
} 