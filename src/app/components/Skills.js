import { useState } from 'react';
import { motion } from 'framer-motion';
import Scramble from './Scramble';

export default function Skills({ skills }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [lastHoveredLine, setLastHoveredLine] = useState(1);

  return (
    <div className="border border-[var(--grey)] p-4 relative">
      <div className="absolute top-0 left-4 mt-[-12px] bg-background px-2 font-semibold">
        skills.txt
      </div>
      <div className="flex flex-col mt-2 ml-2 font-mono">
        {Object.entries(skills).map(([category, techs], idx, arr) => (
          <div
            key={category}
            className="flex flex-col group"
            onMouseEnter={() => {
              setHoveredCategory(idx);
              setLastHoveredLine(idx * 3 + 1);
            }}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center">
              <span className="w-6 text-right select-none font-mono text-[var(--grey)]">{idx * 3 + 1}</span>
              <span className="inline-block" style={{ width: '1em' }}></span>
              <span className="whitespace-nowrap font-semibold text-purple-400 transition-colors px-1 group-hover:bg-purple-400 group-hover:text-background">
                <Scramble text={`# ${category}`} delay={10} />
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="w-6 text-right select-none font-mono text-[var(--grey)]">{idx * 3 + 2}</span>
              <span className="inline-block" style={{ width: '1em' }}></span>
              <span className="flex flex-row flex-wrap gap-2">
                {techs.map((tech, techIdx) => (
                  <motion.div
                    key={tech}
                    initial={{ x: -20, scale: 0.8 }}
                    animate={{ x: 0, scale: 1 }}
                    transition={{
                      delay: techIdx * 0.05,
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    className="font-mono text-sm text-[var(--grey)] group-hover:text-white transition-colors cursor-default"
                  >
                    [{tech}]
                  </motion.div>
                ))}
              </span>
            </div>
            {idx !== arr.length - 1 && (
              <div className="flex items-center">
                <span className="w-6 text-right select-none font-mono text-[var(--grey)]">{idx * 3 + 3}</span>
                <span className="inline-block" style={{ width: '1em' }}></span>
                <span>&nbsp;</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 px-2">
        <span className="font-mono text-white">normal mode</span>
        <span className="font-mono text-white">
          skills.txt // {lastHoveredLine},1
        </span>
      </div>
    </div>
  );
} 