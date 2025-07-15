import { useEffect } from "react";
import { IoMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

export default function Video() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight});
        }, 50);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="mt-8 flex flex-col items-center">
            <video src="/sl.mov" autoPlay loop muted />
            <p>thanks for visiting!</p>
            <div className="flex flex-row gap-4 mt-2">
                <a href="mailto:armaanp4423@gmail.com" target="_blank" rel="noopener noreferrer" className="group">
                    <IoMail className="text-2xl group-hover:text-white hover:scale-110 transition-transform" />
                </a>
                <a href="https://github.com/armaanpriyadarshan" target="_blank" rel="noopener noreferrer" className="group">
                    <IoLogoGithub className="text-2xl group-hover:text-white hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/armaanpriyadarshan/" target="_blank" rel="noopener noreferrer" className="group">
                    <IoLogoLinkedin className="text-2xl group-hover:text-white hover:scale-110 transition-transform" />
                </a>
            </div>
        </div>
    )
}