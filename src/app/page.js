'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Scramble from './components/Scramble';
import { IoSchool, IoMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import Command from './components/Command';

export default function Home() {
  const infoLines = [
    {
      icon: <IoSchool className="text-[var(--red)]" />,
      text: "computer science & mathematics",
      color: "bg-[var(--red)]",
    },
    {
      icon: <FaSchool className="text-[var(--green)]" />,
      text: "dartmouth college",
      color: "bg-[var(--green)]",
    },
    {
      icon: <IoMail className="text-[var(--lightBlue)]" />,
      text: "armaanp4423@gmail.com",
      color: "bg-[var(--lightBlue)]",
      href: "mailto:armaanp4423@gmail.com",
    },
    {
      icon: <IoLogoGithub className="text-[var(--purple)]" />,
      text: "github.com/armaanpriyadarshan",
      color: "bg-[var(--purple)]",
      href: "https://github.com/armaanpriyadarshan",
    },
    {
      icon: <IoLogoLinkedin className="text-[var(--darkBlue)]" />,
      text: "linkedin.com/in/armaanpriyadarshan",
      color: "bg-[var(--darkBlue)]",
      href: "https://www.linkedin.com/in/armaanpriyadarshan/",
    },
  ];

  const [lineIndex, setLineIndex] = useState(-1);

  const nextLine = useCallback(() => {
    setTimeout(() => {
      setLineIndex((i) => i + 1);
    }, 500);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="flex items-center gap-20">
          {/* Image */}
          <div className="w-[300px] h-[300px] relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src="/img/hero.jpg"
                alt="Hero"
                width={250}
                height={250}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                quality={100}
              />
            </motion.div>
          </div>

          {/* Text + Brackets + Circles */}
          <div className="flex flex-col items-center">
            {/* Name */}
            <div className="h-[32px] w-full pl-12 text-xl font-bold mb-6">
              <Scramble text="armaan priyadarshan" delay={800} onDone={nextLine} />
            </div>

            {/* Bracket Box */}
            <motion.div
              className="relative px-12 py-6 border border-transparent w-[480px] min-h-[180px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              style={{ transformOrigin: 'center' }}
            >
              {/* Brackets */}
              <div className="absolute top-0 left-4 h-2 border-l border-white" />
              <div className="absolute top-0 right-4 h-2 border-r border-white" />
              <div className="absolute top-0 left-4 right-4 border-t border-white" />
              <div className="absolute bottom-0 left-4 h-2 border-l border-white" />
              <div className="absolute bottom-0 right-4 h-2 border-r border-white" />
              <div className="absolute bottom-0 left-4 right-4 border-b border-white" />

              {/* Info lines */}
              {infoLines.map((line, i) => (
                <div key={i} className="h-[32px] flex items-center">
                  {i === lineIndex ? (
                    <div className="flex items-center gap-2 font-bold">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        {line.icon}
                        <span>:</span>
                      </motion.div>
                      {line.href ? (
                        <a
                          href={line.href}
                          className="hover:bg-foreground hover:text-background"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Scramble
                            text={line.text}
                            delay={300}
                            onDone={nextLine}
                          />
                        </a>
                      ) : (
                        <Scramble
                          text={line.text}
                          delay={300}
                          onDone={nextLine}
                        />
                      )}
                    </div>
                  ) : i < lineIndex ? (
                    <div className="flex items-center gap-2 font-bold">
                      {line.icon}
                      <span>:</span>
                      {line.href ? (
                        <a
                          href={line.href}
                          className="hover:bg-foreground hover:text-background"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {line.text}
                        </a>
                      ) : (
                        line.text
                      )}
                    </div>
                  ) : (
                    <div className="h-[24px]" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Centered Circles Under Bracket Box */}
            <div className="mt-6 h-6 flex justify-center w-[480px]">
              <div className="flex gap-4">
                {infoLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className={`w-4 h-4 rounded-full ${line.color}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i <= lineIndex ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20" style={{ minHeight: '70px' }}>
          <Command fileLocation={"~/about"} commandText={"whoami"} placeholder={"enter 'whoami'"}>
            <div className="ml-4">
              <p>my name is armaan priyadarshan, and i&apos;m a student at dartmouth college pursuing computer science, mathematics, and potentially economics. my interests center around computational problem solving, especially in the field of artificial intelligence. i&apos;m currently a software engineer intern at fidelity investments.</p>
              <p className="mt-2">
                view my <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span className="underline hover:bg-foreground hover:text-background hover:no-underline">
                    resume
                  </span>
                </a>
              </p>
            </div>
          </Command>
        </div>
      </div>
    </main>
  );
}