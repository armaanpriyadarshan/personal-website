import { IoLogoGithub } from "react-icons/io5";
import { motion } from 'framer-motion';
import Scramble from './Scramble';
import Image from 'next/image';
import { useState, useCallback } from 'react';

export default function Project({ project, github, description, stack, media }) {
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleImageLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  }, []);

  return (
    <div className="pr-4 h-full flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-3 pb-2 border-b border-[var(--grey)] w-fit">
          <div className="text-xl font-bold uppercase">
            - {project}
          </div>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="translate-x-0.25 -translate-y-0.25"
            >
              <IoLogoGithub className="text-2xl" />
            </a>
          )}
          <span className="text-xl font-bold select-none">-</span>
        </div>
      </div>
      {description && (
        <div className="text-sm font-mono">
          <Scramble 
            text={description} 
            delay={0}
          />
        </div>
      )}
      {stack && (
        <div className="flex flex-wrap gap-2 mt-2 leading-none">
          {stack.map((tech, index) => (
            <motion.div
              key={`${tech}-${index}-${project}`}
              initial={{ x: -20, scale: 0.8 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.2,
                ease: "easeOut"
              }}
              className="text-xs font-mono text-[var(--grey)] hover:text-white transition-all duration-200 cursor-default"
            >
              [{tech}]
            </motion.div>
          ))}
        </div>
      )}
      {media && (
        <div className="mt-8 flex-1 flex items-end">
          <div
            className="h-full relative"
            style={{ aspectRatio: aspectRatio }}
          >
            <Image
              src={media}
              alt={`${project} media`}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
} 