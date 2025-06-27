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
      
      // Scroll into view on any keystroke
      containerRef.current?.scrollIntoView({ 
        block: 'center' 
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [subdirectories.length]);

  // Handle mouse interactions
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const getActiveProject = () => {
    return subdirectories[activeIndex] || null;
  };

  return (
    <div className="font-mono" ref={containerRef} tabIndex={0}>
      <div className="border border-[var(--grey)] p-4 relative">
        <div className="absolute top-0 left-4 mt-[-12px] bg-background px-2">
          <span className="text-[var(--green)] font-semibold">armaan@arch</span>
          <span className="text-white font-semibold">:</span>
          <span className="text-[var(--darkBlue)] font-semibold">~/about/{directory}</span>
          {getActiveProject() && (
            <span className="text-white font-semibold">/{getActiveProject().name}</span>
          )}
        </div>
        
        {/* Folder display inline with first 'a' in armaan@arch */}
        <div className="mt-4 ml-2 flex">
          <div>
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
          
          {/* Project content display */}
          {getActiveProject() && (
            <div className="ml-8 flex-1">
              <div className="text-[var(--foreground)] font-semibold">
                {getActiveProject().content}
              </div>
            </div>
          )}
        </div>
        
        {/* File details line */}
        {getActiveProject() && (
          <div className="mt-4 ml-4 text-base">
            <span className="text-[var(--lightBlue)]">drwxr-xr-x</span>
            <span className="text-white ml-2">armaan</span>
            <span className="text-white ml-2">{getActiveProject().size}</span>
            <span className="text-white ml-2">{getActiveProject().lastModified}</span>
          </div>
        )}
      </div>
    </div>
  );
} 