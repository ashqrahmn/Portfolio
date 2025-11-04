import { useState } from "react";
import { motion } from "framer-motion";

import { assets, infoList, toolsData } from "../assets/assets";

const About = ({ isDarkMode }) => {
  const [tappedInfoIndex, setTappedInfoIndex] = useState(null);
  const [tappedToolIndex, setTappedToolIndex] = useState(null);

  const handleInfoTap = (index) => {
    setTappedInfoIndex(index);
    setTimeout(() => setTappedInfoIndex(null), 600);
  };

  const handleToolTap = (index) => {
    setTappedToolIndex(index);
    setTimeout(() => setTappedToolIndex(null), 600);
  };

  return (
    <motion.div
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20 2xl:scroll-mt-34 2xl:py-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Section Title */}
      <motion.h4
        className="text-center mb-2 text-lg 2xl:text-xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Introduction
      </motion.h4>
      <motion.h2
        className="text-center text-5xl 2xl:text-6xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        About me
      </motion.h2>

      {/* Main Content Wrapper */}
      <motion.div
        className="flex w-full flex-col lg:flex-row items-center gap-20 2xl:gap-24 my-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Image */}
        <motion.div
          className="w-64 sm:w-80 2xl:w-96 rounded-3xl max-w-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={assets.user_image}
            alt="Profile picture"
            className="w-full rounded-3xl"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="mb-10 max-w-2xl font-ovo text-base 2xl:text-lg">
            I'm a full stack web developer and graphic designer with experience across both frontend and backend development. 
            I enjoy building real-world projects, working with modern design tools, and creating user-friendly, visually appealing websites.
          </p>

          {/* Info Cards */}
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {infoList.map(
              ({ icon: IconComponent, title, description }, index) => {
                const isTapped = tappedInfoIndex === index;
                return (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.05 }}
                    key={index}
                    onTouchStart={() => handleInfoTap(index)}
                    onClick={() => handleInfoTap(index)}
                    className={`border-[0.5px] rounded-xl p-6 cursor-pointer transition duration-500 transform
                      ${
                        isTapped
                          ? `${
                              !isDarkMode
                                ? "bg-lightHover -translate-y-1 shadow-black"
                                : "bg-darkHover -translate-y-1 shadow-white"
                            }`
                          : ""
                      }
                      ${
                        !isDarkMode
                          ? "border-gray-400 hover:-translate-y-1 hover:bg-lightHover hover:shadow-black"
                          : "border-white hover:-translate-y-1 hover:bg-darkHover hover:shadow-white"
                      }`}
                  >
                    <IconComponent
                      className={`w-7 h-7 2xl:w-9 2xl:h-9 mt-3 ${
                        isDarkMode ? "text-white" : "text-gray-700"
                      }`}
                    />
                    <h3
                      className={`my-4 font-semibold 2xl:text-lg ${
                        !isDarkMode ? "text-gray-700" : "text-white"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-sm 2xl:text-base ${
                        !isDarkMode ? "text-gray-600" : "text-white/80"
                      }`}
                    >
                      {description}
                    </p>
                  </motion.li>
                );
              }
            )}
          </motion.ul>

          {/* Tools Section */}
          <motion.h4
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`my-6 2xl:my-8 ${
              isDarkMode ? "text-white" : "text-gray-700"
            } font-ovo text-base 2xl:text-lg`}
          >
            Tools I use
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex items-center gap-3 sm:gap-5 2xl:gap-7"
          >
            {toolsData.map((tool, index) => {
              const isTapped = tappedToolIndex === index;
              return (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  key={index}
                  onTouchStart={() => handleToolTap(index)}
                  onClick={() => handleToolTap(index)}
                  className={`flex items-center justify-center w-12 sm:w-14 2xl:w-16 aspect-square border border-gray-400
                    rounded-lg cursor-pointer transition duration-500 transform
                    ${isTapped ? "-translate-y-1" : ""} hover:-translate-y-1`}
                >
                  <img
                    src={tool}
                    alt="Tool icon"
                    className="w-5 sm:w-7 2xl:w-8"
                  />
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;