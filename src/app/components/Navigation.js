import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';
import { IoFolderOutline, IoDocumentOutline } from 'react-icons/io5';

const sectionIds = {
    whoami: 'section-whoami',
    experiences: 'section-experiences',
    projects: 'section-projects',
    skills: 'section-skills',
    hobbies: 'section-hobbies',
};

function useIsNarrow() {
    const [isNarrow, setIsNarrow] = useState(false);
    useEffect(() => {
        const check = () => setIsNarrow(window.innerWidth <= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isNarrow;
}

export default function Navigation() {
    const { unlocked } = useNavigation();
    const allItems = [
        'whoami',
        'experiences',
        'projects',
        'skills',
        'hobbies',
    ];
    const items = allItems.filter(item => unlocked.includes(item));
    const isNarrow = useIsNarrow();
    const [open, setOpen] = useState(false);

    const handleNavClick = (id) => {
        const el = document.getElementById(sectionIds[id]);
        if (el) {
            const offset = 40;
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        if (isNarrow) setOpen(false);
    };

    // Desktop nav
    if (!isNarrow) {
        return (
            <motion.nav
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                className="fixed left-0 top-0 h-screen bg-[var(--background)] z-50 flex flex-col items-center shadow-lg pt-36"
            >
                <div className="text-left flex flex-col px-10 font-mono gap-y-2">
                    <span className="text-[var(--lightBlue)] font-bold select-none leading-none">~</span>
                    <span className="font-bold select-none leading-none flex items-center gap-1">
                        <span className="text-[var(--grey)]">└─ </span>
                        <IoFolderOutline className="inline text-[var(--darkBlue)] text-lg align-middle ml-2" />
                        <span className="text-[var(--darkBlue)] ml-1">about</span>
                    </span>
                    <motion.div
                        className="ml-9 relative mt-1 flex flex-col gap-y-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.12 } },
                        }}
                    >
                        <div className="absolute left-[4px] -top-1 bottom-4 w-px bg-[var(--grey)] z-0" />
                        {items.map((label, i) => {
                            const isLast = i === items.length - 1;
                            return (
                                <motion.button
                                    key={label}
                                    type="button"
                                    onClick={() => handleNavClick(label)}
                                    className={
                                        `flex items-start select-none relative z-10 leading-[1.25rem] w-full text-left group ` +
                                        `transition-colors duration-200 ` +
                                        `hover:bg-foreground hover:text-background`
                                    }
                                    variants={{
                                        hidden: { y: -30, opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 60, damping: 12 } },
                                    }}
                                >
                                    <span className="text-[var(--grey)] w-4">{isLast ? '└─' : '├─'} </span>
                                    <span className="text-white ml-2 group-hover:text-background group-hover:bg-foreground px-1 rounded transition-colors duration-200 flex items-center gap-2"><IoDocumentOutline className="inline align-middle" /> {label}</span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.nav>
        );
    }

    // Mobile/narrow nav
    return (
        <>
            <button
                className="fixed top-6 left-6 z-[100] bg-[var(--background)] text-[var(--lightBlue)] text-3xl font-bold shadow-lg p-2 focus:outline-none"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
                style={{ display: open ? 'none' : 'block' }}
            >
                ~
            </button>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            className="fixed inset-0 bg-black z-[98]"
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.35 }}
                            className="fixed left-0 top-0 h-screen bg-[var(--background)] z-[99] flex flex-col items-center shadow-lg pt-24 md:pt-36"
                        >
                            <button
                                className="fixed top-6 left-6 text-xl font-bold bg-transparent text-[var(--grey)] hover:text-[var(--red)] transition-colors z-[101] p-2"
                                onClick={() => setOpen(false)}
                                aria-label="Close navigation"
                            >
                                [x]
                            </button>
                            <div className="text-left flex flex-col px-10 font-mono gap-y-2 w-full">
                                <span className="text-[var(--lightBlue)] font-bold select-none leading-none">~</span>
                                <span className="font-bold select-none leading-none">
                                    <span className="text-[var(--grey)]">└─ </span>
                                    <IoFolderOutline className="inline text-[var(--darkBlue)] text-lg align-middle" />
                                    <span className="text-[var(--darkBlue)] ml-1">about</span>
                                </span>
                                <div className="ml-8 relative mt-1 flex flex-col gap-y-2">
                                    <div className="absolute left-[4px] -top-1 bottom-4 w-px bg-[var(--grey)] z-0" />
                                    {items.map((label, i) => {
                                        const isLast = i === items.length - 1;
                                        return (
                                            <button
                                                key={label}
                                                type="button"
                                                onClick={() => handleNavClick(label)}
                                                className={
                                                    `flex items-start select-none relative z-10 leading-[1.25rem] w-full text-left group ` +
                                                    `transition-colors duration-200 ` +
                                                    `hover:bg-foreground hover:text-background`
                                                }
                                            >
                                                <span className="text-[var(--grey)] w-4">{isLast ? '└─' : '├─'} </span>
                                                <span className="text-white ml-4 group-hover:text-background group-hover:bg-foreground px-1 rounded transition-colors duration-200 flex items-center gap-1"><IoDocumentOutline className="inline align-middle" /> {label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}