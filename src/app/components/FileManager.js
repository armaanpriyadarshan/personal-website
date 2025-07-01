import { useState, useEffect, useRef } from 'react';

export default function FileManager({ directory, subdirectories = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

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

  return (
    <div className="font-mono" ref={containerRef} tabIndex={0}>
      <div className="border border-[var(--grey)] p-4 relative">
        <div className="absolute top-0 left-4 mt-[-12px] bg-background px-2">
          <span className="text-[var(--green)] font-semibold">armaan@arch</span>
          <span className="font-semibold">:</span>
          <span className="text-[var(--darkBlue)] font-semibold">~/about/{directory}/</span>
          {getActiveSubdirectory() && (
            <span className="font-semibold">{getActiveSubdirectory().name}</span>
          )}
        </div>
        
        {/* Folder display inline with first 'a' in armaan@arch */}
        <div className="mt-4 ml-2 flex">
          <div className="mt-0.5">
            <span className="bg-[var(--darkBlue)] text-[var(--background)] px-2 py-1 font-semibold">
              {directory}
            </span>
          </div>
          
          {/* Files list inline with '~' in path */}
          <div className="ml-6">
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
          
          {/* Subdirectory content display */}
          {getActiveSubdirectory() && (
            <div className="ml-8 flex-1">
              {getActiveSubdirectory().content}
            </div>
          )}
        </div>
        
        {/* File details line */}
        {getActiveSubdirectory() && (
          <div className="mt-4 ml-4 text-base">
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