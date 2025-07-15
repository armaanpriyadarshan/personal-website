'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Scramble from './components/Scramble';
import { IoSchool, IoMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import Command from './components/Command';
import Experience from './components/Experience';
import FileManager from './components/FileManager';
import Project from './components/Project';
import Skills from './components/Skills';
import Hobby from './components/Hobby';
import Video from './components/Video';

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

  const skills = {
    languages: ["python", "java", "c/c++", "c#", "javascript", "typescript", "html", "css", "kotlin", "latex"],
    frameworks: ["react.js", "node.js", "django", "flask", "angularjs", "spring boot", "tensorflow", "pytorch"],
    "developer tools": ["unix", "bash", "figma", "aws", "azure", "git", "postman", "jira", "embedded electronics"],
  };

  const projects = [
    {
      name: "personal-website",
      size: "1.5G",
      lastModified: "2025-06-27",
      content: <Project project="personal portfolio website" github="https://github.com/armaanpriyadarshan/personal-website" description="a terminal-themed website for myself (this one)" stack={["next.js", "tailwind css", "react", "javascript"]} media="/img/projects/personal-website.png" />
    },
    {
      name: "post-it",
      size: "1.3G", 
      lastModified: "2025-04-27",
      content: <Project project="post.it" github="https://github.com/armaanpriyadarshan/post-it" description="a sticky-note-inspired creative writing app" stack={["next.js", "tailwind css", "supabase", "gemini", "react", "javascript"]} media="/img/projects/post-it.png" />
    },
    {
      name: "connextgen",
      size: "910M",
      lastModified: "2024-10-29", 
      content: <Project project="connextgen" github="https://github.com/ConnextGen/connextgen" description="a b2c portal for a 501c3 nonprofit organization" stack={["react", "mongodb", "node.js", "aws s3", "javascript"]} media="/img/projects/connextgen.png" />
    },
    {
      name: "medisign",
      size: "510M",
      lastModified: "2024-05-10",
      content: <Project project="medisign" github="https://github.com/armaanpriyadarshan/MediSign" description="a mobile app to aid deaf/hoh patients" stack={["react native", "expo", "firebase", "javascript"]} media="/img/projects/medisign.png" />
    },
    {
      name: "llm-data-optimization",
      size: "5.0G",
      lastModified: "2024-01-29",
      content: <Project project="llm research" description="filtering llm datasets by sentence completion" stack={["python", "huggingface", "google colab", "gpt-2"]} media="/img/projects/llms.png" />
    },
    {
      name: "ezap-companion",
      size: "448M",
      lastModified: "2024-04-26",
      content: <Project project="ezapcompanion" github="https://github.com/armaanpriyadarshan/EZAPCompanion" description="a platform to help prepare for ap calculus" stack={["django", "firebase", "latex", "javascript", "python"]} media="/img/projects/ezap.png" />
    },
    {
      name: "kevin",
      size: "44K",
      lastModified: "2024-05-26",
      content: <Project project="kevin" github="https://github.com/armaanpriyadarshan/kevin" description="a companion robot for meal settings" stack={["python", "raspberry pi", "embedded electronics", "aws", "openai api"]} media="/img/projects/kevin.jpg" />
    },
    {
      name: "rotation-tracking",
      size: "196K",
      lastModified: "2023-09-11",
      content: <Project project="rotation tracking" github="https://github.com/armaanpriyadarshan/Rotation-Tracking-OpenCV" description="scripts for tracking the rotation of objects" stack={["python", "opencv"]} media="/img/projects/rotation-tracking.png" />
    },
    {
      name: "ftc",
      size: "63M",
      lastModified: "2023-02-03",
      content: <Project project="first tech challenge" github="https://github.com/12589-PioneerRobotics/PowerPlay" description="top 40 robots from ftc 2023 powerplay" stack={["kotlin", "android studio", "opencv"]} media="/img/projects/ftc.JPG" />
    },
    {
      name: "drone",
      size: "56M",
      lastModified: "2020-06-17",
      content: <Project project="raspberry pi quadcopter" description="later added voice control and computer vision" stack={["python", "raspberry pi", "embedded electronics", "aws", "alexa", "caffe", "flask"]} media="/img/projects/drone.jpg" />
    },
    {
      name: "multimodal-glasses",
      size: "106K",
      lastModified: "2022-08-23",
      content: <Project project="multimodal glasses" github="https://github.com/armaanpriyadarshan/multimodal-glasses" description="vqa and captioning for the visually impaired" stack={["python", "esp32", "pytorch", "transformers", "flask"]} media="/img/projects/glasses.jpg" />
    },
    {
      name: "pill-counting",
      size: "16M",
      lastModified: "2020-06-16",
      content: <Project project="pill counting" github="https://github.com/armaanpriyadarshan/TensorFlow-2-Lite-Object-Detection-on-the-Raspberry-Pi" description="a pill counting poc with the raspberry pi" stack={["python", "raspberry pi", "tensorflow", "opencv"]} media="/img/projects/pills.png" />
    }
  ];

  const art = [
    {
      src: "/img/art/arm.jpg",
      width: 2941,
      height: 3656,
      caption: "reaching to become more"
    },
    {
      src: "/img/art/autumn.jpg",
      width: 2478,
      height: 3278,
      caption: "a collage of autumn-themed things"
    },
    {
      src: "/img/art/balloon.jpg",
      width: 2657,
      height: 3543,
      caption: "a balloon not content with earth"
    },
    {
      src: "/img/art/bear.jpg",
      width: 4222,
      height: 3745,
      caption: "my least favorite mascot"
    },
    {
      src: "/img/art/bike.jpg",
      width: 3582,
      height: 1479,
      caption: "it's my bike!"
    },
    {
      src: "/img/art/bird.JPG",
      width: 2761,
      height: 2033,
      caption: "a cool bird i saw in a tree"
    },
    {
      src: "/img/art/boat.JPG",
      width: 1544,
      height: 2016,
      caption: "a stormy seascape"
    },
    {
      src: "/img/art/brimstone.png",
      width: 1452,
      height: 1598,
      caption: "brimstone elemental from terraria"
    },
    {
      src: "/img/art/butterfly.jpg",
      width: 4032,
      height: 3024,
      caption: "a resting monarch butterfly"
    },
    {
      src: "/img/art/cabin.jpg",
      width: 4032,
      height: 3024,
      caption: "winter cabin during the festive season"
    },
    {
      src: "/img/art/candle.jpg",
      width: 4032,
      height: 3024,
      caption: "a candle's flickering flame"
    },
    {
      src: "/img/art/cathedral.jpg",
      width: 3520,
      height: 4694,
      caption: "a random church from hopedale, ma"
    },
    {
      src: "/img/art/cosmic_canvas.JPG",
      width: 3601,
      height: 2400,
      caption: "a cosmic canvas"
    },
    {
      src: "/img/art/eid.PNG",
      width: 1359,
      height: 763,
      caption: "eidolon wyrm from terraria"
    },
    {
      src: "/img/art/grayscal.png",
      width: 1850,
      height: 1802,
      caption: "greyscale without the e"
    },
    {
      src: "/img/art/hero.jpg",
      width: 1201,
      height: 1294,
      caption: "an original character"
    },
    {
      src: "/img/art/hive_mind.jpg",
      width: 2967,
      height: 3956,
      caption: "an original character"
    },
    {
      src: "/img/art/inside.jpg",
      width: 2451,
      height: 3268,
      caption: "a light inside"
    },
    {
      src: "/img/art/jerry.jpg",
      width: 4405,
      height: 3461,
      caption: "a peacock named jerry"
    },
    {
      src: "/img/art/jonan.png",
      width: 2350,
      height: 1920,
      caption: "an original character"
    },
    {
      src: "/img/art/knight.png",
      width: 2364,
      height: 2160,
      caption: "an original character"
    },
    {
      src: "/img/art/me.jpg",
      width: 3856,
      height: 5008,
      caption: "me holding a spyglass"
    },
    {
      src: "/img/art/nier.webp",
      width: 640,
      height: 887,
      caption: "2b getting bailed out"
    },
    {
      src: "/img/art/prismatic_helmet.png",
      width: 2160,
      height: 2160,
      caption: "an original character"
    },
    {
      src: "/img/art/pumpkin.jpg",
      width: 5712,
      height: 4284,
      caption: "a pumpkin from nearby"
    },
    {
      src: "/img/art/scal.png",
      width: 1552,
      height: 1794,
      caption: "supreme calamitas from terraria"
    },
    {
      src: "/img/art/scal_sin_pelo.JPG",
      width: 600,
      height: 450,
      caption: "supreme calamitas from terraria"
    },
    {
      src: "/img/art/shipwreck.jpg",
      width: 2285,
      height: 3070,
      caption: "the shipwreck ~ hubert robert"
    },
    {
      src: "/img/art/statue.jpg",
      width: 3483,
      height: 4550,
      caption: "a roman statue from the worcester art museum"
    },
    {
      src: "/img/art/thumbnail.jpg",
      width: 3163,
      height: 2513,
      caption: "autumn's doldrums"
    },
    {
      src: "/img/art/vase.jpg",
      width: 2205,
      height: 2901,
      caption: "a vase from the table"
    },
    {
      src: "/img/art/yharim.png",
      width: 1554,
      height: 1906,
      caption: "yharim from terraria"
    },
  ];

  const photography = [
    {
      src: "/img/photography/IMG_0804.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0805.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0806.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0807.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0808.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0809.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0810.JPG",
      width: 2511,
      height: 1674,
    },
    {
      src: "/img/photography/IMG_0811.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0813.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0814.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0815.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0817.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0819.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0820.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0821.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0822.JPG",
      width: 2592,
      height: 1469,
    },
    {
      src: "/img/photography/IMG_0823.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0824.JPG",
      width: 2316,
      height: 1544,
    },
    {
      src: "/img/photography/IMG_0825.JPG",
      width: 1920,
      height: 1080,
    },
    {
      src: "/img/photography/IMG_0826.JPG",
      width: 2592,
      height: 1456,
    },
    {
      src: "/img/photography/IMG_0827.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0828.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0829.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0830.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0831.JPG",
      width: 1920,
      height: 1080,
    },
    {
      src: "/img/photography/IMG_0832.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/IMG_0833.JPG",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/cachedImage.png",
      width: 2592,
      height: 1728,
    },
    {
      src: "/img/photography/cachedImage2.png",
      width: 2592,
      height: 1728,
    },
  ]

  const hobbies = [
    {
      name: "art",
      size: "44M",
      content: <Hobby hobby="digital & traditional art" description="developing my style through watercolor and procreate" media={art} thumbnail="/img/art/thumbnail.jpg" modalType="gallery" />
    },
    {
      name: "photography",
      size: "43M",
      content: <Hobby hobby="natural photography" description="shot on a canon eos rebel t3i" media={photography} thumbnail="/img/photography/IMG_0804.JPG" modalType="gallery" />
    },
    {
      name: "poetry",
      size: "1.2G",
      content: <Hobby hobby="poetry" description="embracing the mundane with imagery, metaphor, and whimsy" text="read a poem" thumbnail="/img/poetry.png" modalType="poetry" />
    },
    {
      name: "fiction",
      size: "17K",
      lastModified: "2024-03-20",
      content: (
        <Hobby
          hobby="fiction in consumption"
          description={
            <>
              <span role="img" aria-label="book">📖</span> currently reading: <i>dubliners</i>
              <br />
              <span role="img" aria-label="movie">📺</span> currently watching: <i>succession</i>
              <br />
              <span role="img" aria-label="music">🎧</span> currently listening: <i>MUSIC</i>
              <br />
              <br />
              <span className="font-bold uppercase">- favorites -</span>
              <br />
              <br />
              book: <i>musashi</i>
              <br />
              movie: <i>forrest gump</i>
              <br />
              tv show: <i>community</i>
              <br />
              album: <i>madvillainy</i>
              <br />

            </>
          }
          modalType="none"
        />
      )
    },
    {
      name: "pool",
      size: "",
      content: <Hobby hobby="pool" description="cue-sport (8-ball, 9-ball, snooker) enthusiast" thumbnail="/img/pool.jpg" modalType="none" />
    },
    {
      name: "etc",
      size: "600M",
      content: <Hobby hobby="etc" description="my other hobbies include biking, terraria, and tetris" thumbnail="/img/tetris.png" modalType="none" />
    }
  ];

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [lastHoveredLine, setLastHoveredLine] = useState(1);

  const commands = [
    {
      id: 'whoami',
      fileLocation: "~/about",
      commandText: "whoami",
      placeholder: "enter 'whoami'",
      content: (
        <div className="ml-4">
          <p className="font-mono">my name is armaan priyadarshan, and i&apos;m a student at dartmouth college pursuing computer science, mathematics, and potentially economics. my interests center around computational problem solving, especially in the field of artificial intelligence. i&apos;m currently a software engineer intern at fidelity investments.</p>
          <p className="mt-2 font-mono">
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
      )
    },
    {
      id: 'cd-experiences',
      fileLocation: "~/about",
      commandText: "ls experiences",
      placeholder: "enter 'ls experiences'",
      content: (
        <div className="ml-4 mt-4">
          {[
            {
              company: "fidelity investments",
              location: "merrimack, nh",
              startDate: "2025-06-02",
              endDate: null,
              role: "software engineer intern",
              description: "digital account management (dam) space"
            },
            {
              company: "telos",
              location: "remote",
              startDate: "2024-06-02",
              endDate: "2024-08-31",
              role: "front-end engineer intern",
              description: "design and implementation for llm-powered positive psychology mobile app"
            },
            {
              company: "social neuroscience of affective processes (snap) lab",
              location: "worcester, ma",
              startDate: "2024-05-02",
              endDate: "2025-06-31",
              role: "researcher",
              description: "data automation and generative ai — llms & vector databases — for psychological applications and research"
            },
            {
              company: "brown university school of engineering",
              location: "providence, ri",
              startDate: "2023-06-02",
              endDate: "2023-08-31",
              role: "researcher",
              description: "computer vision for data analysis within fluid mechanics research"
            }
          ].map((exp, i) => (
            <Experience key={exp.company}
              {...exp}
              delay={i * 0.3}
              isLast={i === 3}
            />
          ))}
        </div>
      )
    },
    {
      id: 'lf-projects',
      fileLocation: "~/about",
      commandText: "lf projects",
      placeholder: "enter 'lf projects'",
      content: (
        <div className="ml-4 mt-4">
          <FileManager 
            directory="projects" 
            subdirectories={projects} 
          />
        </div>
      )
    },
    {
      id: 'cat-skills',
      fileLocation: "~/about",
      commandText: "cat skills.txt",
      placeholder: "enter 'cat skills.txt'",
      content: (
        <div className="ml-4 mt-4">
          <Skills skills={skills} />
        </div>
      )
    },
    {
      id: 'lf-hobbies',
      fileLocation: "~/about",
      commandText: "lf hobbies",
      placeholder: "enter 'lf hobbies'",
      content: (
        <div className="ml-4 mt-4">
          <FileManager 
            directory="hobbies" 
            subdirectories={hobbies} 
          />
        </div>
      )
    },
    {
      id: 'sl',
      fileLocation: "~/about",
      commandText: "sl",
      placeholder: "enter 'sl'",
      content: <Video />
    }
  ];

  const [lineIndex, setLineIndex] = useState(-1);
  const [completedCommands, setCompletedCommands] = useState(new Set());

  const nextLine = useCallback(() => {
    setTimeout(() => {
      setLineIndex((i) => i + 1);
    }, 300);
  }, []);

  const handleCommandComplete = useCallback((commandId) => {
    setCompletedCommands(prev => new Set([...prev, commandId]));
  }, []);

  const renderCommands = () => {
    return commands.map((command, index) => {
      const isVisible = index === 0 || completedCommands.has(commands[index - 1].id);
      
      if (!isVisible) return null;
      
      return (
        <div key={command.id} className={index === 0 ? "mt-20" : "mt-12"}>
          <Command 
            fileLocation={command.fileLocation}
            commandText={command.commandText}
            placeholder={command.placeholder}
            onComplete={() => handleCommandComplete(command.id)}
            shouldScramble={index === 0}
          >
            {command.content}
          </Command>
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-36 pb-12">
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
            <div className="h-[32px] w-full pl-12 text-xl font-bold mb-2 font-mono">
              <Scramble text="ARMAAN PRIYADARSHAN" delay={400} onDone={nextLine} />
            </div>

            {/* Bracket Box */}
            <motion.div
              className="relative px-12 py-4 border border-transparent w-[480px] min-h-[180px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
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
                    <div className="flex items-center gap-2 font-bold font-mono">
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
                            delay={150}
                            onDone={nextLine}
                          />
                        </a>
                      ) : (
                        <Scramble
                          text={line.text}
                          delay={150}
                          onDone={nextLine}
                        />
                      )}
                    </div>
                  ) : i < lineIndex ? (
                    <div className="flex items-center gap-2 font-bold font-mono">
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
        {renderCommands()}
      </div>
    </main>
  );
}