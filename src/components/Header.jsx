import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { RxDownload } from "react-icons/rx";
import { GoArrowRight } from "react-icons/go";

const texts = ["web developer", "graphic designer", "ui/ux designer"];

const Header = ({ isDarkMode, visitorId }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [resumeClicked, setResumeClicked] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentText = texts[index];
    if (!deleting && subIndex === currentText.length) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => setSubIndex((prev) => prev + (deleting ? -1 : 1)), deleting ? 50 : 200);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting]);

  useEffect(() => setText(texts[index].substring(0, subIndex)), [subIndex, index]);

  // Resume download
  const handleResumeDownload = async () => {
    if (!visitorId || sessionStorage.getItem("resume_clicked")) return;

    try {
      await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorId, resume_download: true }),
      });
      sessionStorage.setItem("resume_clicked", "true");
      setResumeClicked(true);
    } catch (error) {
      console.error("Failed to log resume download", error);
    }
  };

  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 relative 2xl:gap-6">
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
        <img src={assets.profile_img} alt="Profile" className="rounded-full w-32 2xl:w-40" />
      </motion.div>

      <motion.h3 initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-end gap-2 text-xl md:text-2xl 2xl:text-3xl font-ovo">
        Hi! I'm Ashique Rahman
        <motion.img src={assets.hand_icon} alt="Waving hand" role="img" className="w-6 2xl:w-8" animate={{ rotate: [0, 20, -10, 20, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
      </motion.h3>

      <motion.h1 initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-3xl sm:text-6xl lg:text-[66px] 2xl:text-[80px] font-ovo flex justify-center">
        {text === "" ? "\u00A0" : text}
        <span className="border-r-2 border-current animate-blink ml-1" />
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="max-w-2xl mx-auto font-ovo text-base 2xl:text-lg">
        I'm a full stack web developer with a design background. I like building real projects that work fast, feel smooth, and look clean.
      </motion.p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 2xl:gap-6">
        <motion.a initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover="hover" whileTap="tap" transition={{ duration: 0.6, delay: 1 }} href="#contact" className={`px-10 py-3 2xl:px-12 2xl:py-4 border rounded-full flex items-center gap-2 border-white text-white ${isDarkMode ? "bg-transparent" : "bg-darkTheme"}`}>
          Contact me
          <motion.span variants={{ hover: { y: -4 }, tap: { y: -2 } }} transition={{ type: "spring", stiffness: 300 }}>
            <GoArrowRight className="text-xl 2xl:text-2xl" aria-label="Arrow right icon" />
          </motion.span>
        </motion.a>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/MS-ASHIQUE-RAHMAN.pdf"
          download
          onClick={handleResumeDownload}
          className={`group px-10 py-3 2xl:px-12 2xl:py-4 border rounded-full border-gray-500 flex items-center gap-2 transition-all duration-300 ${isDarkMode ? "bg-white text-black" : ""}`}
          whileHover="wiggle"
          whileTap="wiggle"
        >
          my resume
          <motion.div variants={{ wiggle: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.5, ease: "easeInOut" } } }} className="text-xl 2xl:text-2xl">
            <RxDownload aria-label="Download resume icon" />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default Header;