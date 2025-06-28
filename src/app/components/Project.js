import { IoLogoGithub } from "react-icons/io5";
import { motion } from 'framer-motion';
import Scramble from './Scramble';
import Image from 'next/image';

export default function Project({ project, github, description, stack, media }) {
  return (
    <div className="pr-4">
      <div className="mb-4">
        <div className="flex items-center gap-3 pb-2 border-b border-[var(--grey)] w-fit">
          <div className="text-xl font-bold uppercase">
            - {project} -
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
              key={tech}
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
        <div className="mt-8">
          <Image
            src={media}
            alt={`${project} media`}
            width={200}
            height={200}
            className="rounded border border-[var(--grey)]"
          />
        </div>
      )}
    </div>
  );
} 