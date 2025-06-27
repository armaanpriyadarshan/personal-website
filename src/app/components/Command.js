import { useEffect, useState, useRef } from 'react';
import Scramble from './Scramble';

export default function Command({ fileLocation, commandText, placeholder, children, onComplete, shouldScramble = true }) {
  const [fileLocationDone, setFileLocationDone] = useState(false);
  const [timeDone, setTimeDone] = useState(false);
  const [input, setInput] = useState('');
  const [showBlock, setShowBlock] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  // Call onComplete when content is shown
  useEffect(() => {
    if (showContent && onComplete) {
      onComplete();
    }
  }, [showContent, onComplete]);

  // If shouldScramble is false, show everything immediately
  useEffect(() => {
    if (!shouldScramble) {
      setFileLocationDone(true);
      setTimeDone(true);
    }
  }, [shouldScramble]);

  // Blinking block only after time is done
  useEffect(() => {
    if (!timeDone) return;
    const interval = setInterval(() => {
      setShowBlock((b) => !b);
    }, 500);
    return () => clearInterval(interval);
  }, [timeDone]);

  // Focus input when it appears
  useEffect(() => {
    if (timeDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [timeDone]);

  // Handle input change
  const handleInput = (e) => {
    setInput(e.target.value);
    if (isError) setIsError(false);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim() === commandText) {
        setShowContent(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      // Only complete if input is a starting subsequence of commandText
      if (commandText.startsWith(input)) {
        setInput(commandText);
        if (isError) setIsError(false);
      }
    }
  };

  return (
    <div className="flex flex-col relative" ref={ref}>
      <div className="text-left w-full">
        <div
          className="text-lg md:text-xl font-mono px-4 rounded select-none font-semibold"
          style={{ color: 'var(--lightBlue)', letterSpacing: '0.03em' }}
        >
          {shouldScramble ? (
            <Scramble text={fileLocation} delay={0} onDone={() => setFileLocationDone(true)} />
          ) : (
            fileLocation
          )}
        </div>
        <div
          className="text-lg md:text-xl font-mono px-4 pt-1 rounded select-none flex items-center"
          style={{ letterSpacing: '0.03em' }}
        >
          [
          {shouldScramble ? (
            fileLocationDone && (
              <Scramble text="armaan@arch" delay={0} onDone={() => setTimeDone(true)} />
            )
          ) : (
            <span>armaan@arch</span>
          )}
          ]
          <span
            style={{
              color: 'var(--green)',
              marginLeft: '0.25em',
              marginRight: '0.5em',
              display: 'inline-block',
              transform: 'translateY(2px) scaleX(1.25)',
              fontWeight: 700,
              textShadow: '0 0 1px var(--green)',
              alignSelf: 'center',
            }}
          >
            ❭
          </span>
          {timeDone && (
            <div className="relative flex items-center" style={{ flex: 1 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none font-mono text-inherit text-lg md:text-xl w-full"
                style={{
                  color: 'transparent',
                  minWidth: '6ch',
                  textShadow: isError && input.length > 0 ? '0 0 0 var(--red)' : '0 0 0 var(--foreground)'
                }}
                autoComplete="off"
                spellCheck="false"
                placeholder={placeholder}
                disabled={showContent}
              />
              {input === '' && (
                <span
                  className="absolute left-0 pointer-events-none font-mono"
                  style={{ color: 'var(--grey)', zIndex: 1 }}
                >
                  {placeholder}
                </span>
              )}
            </div>
          )}
        </div>
        {showContent && (
          <div className="relative w-full" style={{ paddingTop: '1rem' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
} 