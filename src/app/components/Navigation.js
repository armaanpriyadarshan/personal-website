import { motion } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';

const sectionIds = {
    whoami: 'section-whoami',
    experiences: 'section-experiences',
    projects: 'section-projects',
    skills: 'section-skills',
    hobbies: 'section-hobbies',
};

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

    const handleNavClick = (id) => {
        const el = document.getElementById(sectionIds[id]);
        if (el) {
            const offset = 40;
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            className="fixed left-0 top-0 h-screen bg-[var(--background)] z-50 flex flex-col items-center shadow-lg pt-36"
        >
            <div className="text-left flex flex-col px-12 font-mono gap-y-2">
                <span className="text-[var(--lightBlue)] font-bold select-none leading-none">~</span>
                <span className="font-bold select-none leading-none">
                    <span className="text-[var(--grey)]">└─ </span>
                    <span className="text-[var(--darkBlue)]"> about</span>
                </span>
                <motion.div
                    className="ml-8 relative mt-1 flex flex-col gap-y-2"
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
                                <span className="text-white ml-4 group-hover:text-background group-hover:bg-foreground px-1 rounded transition-colors duration-200"> {label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </motion.nav>
    );
}