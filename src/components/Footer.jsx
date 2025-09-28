import { useState } from "react";
import { motion } from "framer-motion";
import { assets, socialLinks } from "../assets/assets";
import { IoIosMail } from "react-icons/io";

const Footer = ({ isDarkMode }) => {
  const [tappedIndex, setTappedIndex] = useState(null);

  const handleTap = (index) => {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 600);
  };

  return (
    <footer className="mt-4 2xl:mt-5">
      {/* Footer Header */}
      <div className="text-center">
        <img
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="Ashique Rahman Logo"
          className="w-36 2xl:w-44 mx-auto mb-2 2xl:mb-3"
        />

        <div className="w-max flex items-center gap-1 2xl:gap-2 mx-auto">
          <IoIosMail className="text-2xl 2xl:text-3xl" />
          <a href="mailto:ashqrahmn@hotmail.com" className="hover:underline 2xl:text-lg">
            ashqrahmn@hotmail.com
          </a>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 2xl:mt-14 py-6 2xl:py-7">
        {/* Copyright Notice */}
        <p className="text-sm 2xl:text-base sm:text-base">
          © {new Date().getFullYear()} Ashique Rahman. All rights reserved.
        </p>

        {/* Social Media Links */}
        <ul className="flex items-center gap-2 2xl:gap-3 sm:gap-3 justify-center mt-4 sm:mt-0">
          {socialLinks.map(({ icon: Icon, href, label }, idx) => {
            const isTapped = tappedIndex === idx;
            return (
              <li key={idx}>
                <motion.a
                  whileTap={{ scale: 1.05 }}
                  onTouchStart={() => handleTap(idx)}
                  onClick={() => handleTap(idx)}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 2xl:w-9 h-8 2xl:h-9 rounded-full flex items-center justify-center text-[0.9rem] 2xl:text-[1.05rem] border transition-all duration-300 ease-in-out overflow-hidden relative group
                    ${isDarkMode ? "border-white text-white" : "border-black text-neutral-800"}
                    ${
                      isTapped
                        ? isDarkMode
                          ? "bg-darkHover/70 -translate-y-1 shadow-white"
                          : "bg-lightHover -translate-y-1 shadow-black"
                        : isDarkMode
                        ? "bg-transparent"
                        : "bg-white"
                    }
                    hover:scale-110
                    ${isDarkMode ? "hover:shadow-white" : "hover:shadow-black"}`}
                >
                  <span
                    className={`z-10 transition-transform duration-500 ease-in-out
                      ${isTapped ? "rotate-y-180" : ""}
                      group-hover:rotate-y-180`}
                  >
                    <Icon />
                  </span>
                  <span
                    className={`absolute inset-0 scale-y-0 origin-bottom transition-transform duration-500 rounded-full z-0
                      ${isDarkMode ? "bg-darkHover" : "bg-lightHover"}
                      group-hover:scale-y-100`}
                  />
                </motion.a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;