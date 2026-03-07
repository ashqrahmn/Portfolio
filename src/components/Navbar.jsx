import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { GoArrowUpRight } from "react-icons/go";
import { IoMoonOutline, IoSunnyOutline, IoCloseOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef();

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Background Image */}
      <div className="fixed top-0 right-0 w-11/12 -z-40 translate-y-[-80%]">
        {!isDarkMode && (
          <img src={assets.header_bg_color} alt="" className="w-full" />
        )}
      </div>

      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] 2xl:px-[9%] py-4 2xl:py-5 flex items-center justify-between z-50
        ${
          isScroll
            ? `${isDarkMode ? "bg-darkTheme shadow-white/20" : "bg-white/50 shadow-sm"} backdrop-blur-lg`
            : ""
        } 2xl:text-lg`}
      >
        {/* Logo */}
        <a href="#top">
          <img
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logo"
            className="w-28 2xl:w-32 cursor-pointer mr-14"
          />
        </a>

        {/* Desktop Navigation */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 2xl:gap-10 rounded-full px-12 py-3 2xl:px-14 2xl:py-4
          ${
            isScroll
              ? ""
              : "bg-white/50 shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"
          }`}
        >
          <li><a className="font-ovo" href="#top">Home</a></li>
          <li><a className="font-ovo" href="#about">About</a></li>
          <li><a className="font-ovo" href="#services">Services</a></li>
          <li><a className="font-ovo" href="#projects">Projects</a></li>
          <li>
            <a
              className="font-ovo"
              href="https://nublog-omega.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>

        {/* Right-Side Action Buttons */}
        <div className="flex items-center gap-4 2xl:gap-5">
          <button onClick={() => setIsDarkMode((prev) => !prev)} className="cursor-pointer">
            {isDarkMode ? (
              <IoSunnyOutline className="w-6 h-6 2xl:w-7 2xl:h-7" />
            ) : (
              <IoMoonOutline className="w-6 h-6 2xl:w-7 2xl:h-7 text-gray-700" />
            )}
          </button>

          <a
            href="#contact"
            className={`group hidden lg:flex items-center gap-1 px-10 py-2.5 2xl:px-12 2xl:py-3 border rounded-full ml-4 font-ovo
            ${isDarkMode ? "border-white/50" : "border-gray-500"}`}
          >
            Contact
            <GoArrowUpRight className="text-xl 2xl:text-2xl transform transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden ml-3 cursor-pointer relative w-8 h-8 2xl:w-9 2xl:h-9"
            onClick={isMenuOpen ? closeMenu : openMenu}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <IoCloseOutline
                    className={`w-8 h-8 2xl:w-9 2xl:h-9 ${isDarkMode ? "text-white" : "text-black"}`}
                  />
                ) : (
                  <RiMenu3Fill
                    className={`w-8 h-8 2xl:w-9 2xl:h-9 ${isDarkMode ? "text-white" : "text-black"}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Side Menu */}
        <ul
          ref={sideMenuRef}
          className={`flex md:hidden flex-col gap-5 2xl:gap-6 py-20 px-10 2xl:py-24 2xl:px-12
          fixed -right-64 top-0 bottom-0 w-64 2xl:w-72 z-50 h-screen transition duration-500
          ${isDarkMode ? "bg-darkHover text-white" : "bg-rose-50 text-black"}`}
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <IoCloseOutline
              className={`w-9 h-9 2xl:w-10 2xl:h-10 cursor-pointer ${isDarkMode ? "text-white" : "text-black"}`}
            />
          </div>

          <li><a className="font-ovo" onClick={closeMenu} href="#top">Home</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#about">About</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#services">Services</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#projects">Projects</a></li>
          <li>
            <a
              className="font-ovo"
              onClick={closeMenu}
              href="https://nublog-omega.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;