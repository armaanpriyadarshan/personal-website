import { useEffect, useState, useRef } from 'react';

const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function Scramble({ text, delay = 0, onDone = () => {} }) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Reset state when text changes
    setOutput('');
    setDone(false);
    
    let frame = 0;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (frame > text.length) {
          clearInterval(intervalRef.current);
          setDone(true);
          onDone();
          return;
        }

        const partial = text.substring(0, frame);
        const scramble = Array.from({ length: text.length - frame })
          .map(() => characters[Math.floor(Math.random() * characters.length)])
          .join('');
        setOutput(partial + scramble);
        frame++;
      }, 50);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, delay]);

  return (
    <span className="inline-block min-w-[ch]">
      {done ? text : output}
    </span>
  );
}