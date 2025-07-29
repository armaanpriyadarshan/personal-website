import { useEffect, useState, useRef } from 'react';
import Scramble from './Scramble';

export default function Command({ fileLocation, commandText, placeholder, children, onComplete, shouldScramble = true }) {
  const [fileLocationDone, setFileLocationDone] = useState(false);
  const [timeDone, setTimeDone] = useState(false);
  const [input, setInput] = useState('');
  const [showBlock, setShowBlock] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutRef = useRef(null);
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
      inputRef.current.scrollIntoView({ block: "center" });
      inputRef.current.focus();
    }
  }, [timeDone]);

  // Show info overlay if user hasn't started typing after 3 seconds
  useEffect(() => {
    if (timeDone && input === '' && !showContent) {
      timeoutRef.current = setTimeout(() => {
        setShowOverlay(true);
      }, 3000); // 3 seconds
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [timeDone, input, showContent]);

  // Hide overlay as soon as user starts typing
  useEffect(() => {
    if (input !== '') {
      setShowOverlay(false);
      clearTimeout(timeoutRef.current);
    }
  }, [input]);

  // Handle input change
  const handleInput = (e) => {
    setInput(e.target.value);
    if (isError) setIsError(false);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim().toLowerCase() === commandText.toLowerCase()) {
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
          className="text-base md:text-xl font-mono px-2 md:px-4 rounded select-none font-semibold"
          style={{ color: 'var(--lightBlue)', letterSpacing: '0.03em' }}
        >
          {shouldScramble ? (
            <Scramble text={fileLocation} delay={0} onDone={() => setFileLocationDone(true)} />
          ) : (
            fileLocation
          )}
        </div>
        <div
          className="text-base md:text-xl font-mono px-2 md:px-4 pt-1 rounded select-none flex items-center"
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
              transform: 'scaleX(1.25)',
              fontWeight: 700,
              textShadow: '0 0 1px var(--green)',
              alignSelf: 'center',
            }}
            className="md:translate-y-[2px]"
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
                className="bg-transparent outline-none border-none font-mono text-inherit text-base md:text-xl w-full"
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
        {showOverlay && (
          <div className="ml-2 md:ml-4 pt-2 text-[var(--grey)]">
            ⓘ type in the command to proceed
          </div>
        )}
        {showContent && (
          <div className="relative w-full -ml-2 md:ml-0 pt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}